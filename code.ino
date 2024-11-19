#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <ESP32Servo.h>  // Use the ESP32-specific servo library
#include <addons/TokenHelper.h>
#include <ArduinoJson.h>
#include <time.h>

// Wi-Fi and Firebase credentials
#define WIFI_SSID "AB"        // Replace with your Wi-Fi SSID
#define WIFI_PASSWORD "akashbera" // Replace with your Wi-Fi password
#define FIREBASE_PROJECT_ID "waterflow-dashboard"
#define FIREBASE_DATABASE_ID "(default)"
#define API_KEY "AIzaSyCaQ4-CXMn-2HB0RdMKZvDmVm6SGtXPnk8"
#define USER_EMAIL "ab@gmail.com"  // Ensure this matches the Firestore document ID
#define USER_PASSWORD "123456"

// Pins
#define FLOW_SENSOR_PIN 15
#define SERVO_PIN 18  // Servo motor connected to GPIO 18

// Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Variables for flow sensor and water usage
volatile int pulseCount = 0;
float flowRate = 0.0;
float totalUsage = 0.0;  // This will be updated from Firestore
unsigned long oldTime = 0;
Servo myServo;  // Servo object

// Time setup
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 0;
const int daylightOffset_sec = 0;

// Function to count pulses from flow sensor
void IRAM_ATTR pulseCounter() {
  pulseCount++;
}

// Function to reconnect to Wi-Fi
void reconnectWiFi() {
  Serial.print("Attempting to connect to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    delay(5000);  // Wait 5 seconds before retrying
  }
  Serial.println("Connected to WiFi");
}

// Function to get current month name (e.g., "currentMonth")
String getCurrentMonthName() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return "currentMonth";  // Fallback
  }

  // For simplicity, returning "currentMonth". Enhance this to handle actual month names if needed.
  return "currentMonth";
}

void setup() {
  Serial.begin(115200);
  delay(1000); // Delay to allow serial monitor to initialize

  // Initialize Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("\nConnecting to Wi-Fi");
  reconnectWiFi();  // Ensure Wi-Fi is connected

  // Initialize time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
  }

  // Firebase setup
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Flow sensor setup
  pinMode(FLOW_SENSOR_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(FLOW_SENSOR_PIN), pulseCounter, FALLING);

  // Servo setup
  myServo.attach(SERVO_PIN);
  
  // Fetch initial totalUsage from Firestore
  String currentMonth = getCurrentMonthName();  // e.g., "currentMonth"
  String documentPathWaterflow = "users/" + String(USER_EMAIL) + "/" + currentMonth + "/waterflowSensor";

  if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_ID, documentPathWaterflow)) {
    Serial.println("Fetched initial totalUsage from Firestore successfully.");
    StaticJsonDocument<1024> doc;
    DeserializationError error = deserializeJson(doc, fbdo.payload().c_str());

    if (!error) {
      JsonObject fields = doc["fields"];
      if (fields.containsKey("totalusages")) {
        totalUsage = fields["totalusages"]["doubleValue"].as<float>(); // Use doubleValue
        Serial.print("Initial Total Usage: ");
        Serial.println(totalUsage);
      } else {
        Serial.println("Error: totalusages field not found.");
      }
    } else {
      Serial.print("Error: JSON deserialization failed: ");
      Serial.println(error.c_str());
    }
  } else {
    Serial.println("Error fetching Firestore document for totalUsage.");
    Serial.println(fbdo.errorReason());
  }

  // Fetch initial servoState from Firestore
  String documentPathServo = "users/" + String(USER_EMAIL) + "/" + currentMonth + "/servoControl";

  if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_ID, documentPathServo)) {
    Serial.println("Fetched initial servoState from Firestore successfully.");
    StaticJsonDocument<1024> doc;
    DeserializationError error = deserializeJson(doc, fbdo.payload().c_str());

    if (!error) {
      JsonObject fields = doc["fields"];
      if (fields.containsKey("servoState")) {
        bool servoState = fields["servoState"]["booleanValue"].as<bool>(); // Use booleanValue
        Serial.print("Initial Servo State: ");
        Serial.println(servoState);
        myServo.write(servoState ? 180 : 0);  // Initialize servo position based on servoState
      } else {
        Serial.println("Error: servoState field not found.");
      }
    } else {
      Serial.print("Error: JSON deserialization failed: ");
      Serial.println(error.c_str());
    }
  } else {
    Serial.println("Error fetching Firestore document for servoState.");
    Serial.println(fbdo.errorReason());
  }

  Serial.println("Setup complete");
}

void loop() {
  // Check Wi-Fi connection and reconnect if needed
  if (WiFi.status() != WL_CONNECTED) {
    reconnectWiFi();  // Attempt to reconnect
  }

  // Every second, calculate flow rate and send data to Firestore
  if ((millis() - oldTime) > 1000) {
    detachInterrupt(digitalPinToInterrupt(FLOW_SENSOR_PIN));

    // Calculate flow rate in liters per second (or your preferred unit)
    flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / 7.5;
    oldTime = millis();
    pulseCount = 0;

    // Add the current flow rate to total usage
    totalUsage += flowRate;

    // Get current month name
    String currentMonth = getCurrentMonthName();  // e.g., "currentMonth"

    // Prepare Firestore paths
    String documentPathWaterflow = "users/" + String(USER_EMAIL) + "/" + currentMonth + "/waterflowSensor";
    String documentPathServo = "users/" + String(USER_EMAIL) + "/" + currentMonth + "/servoControl";

    // Send water usage data to Firestore
    FirebaseJson contentWaterflow;
    contentWaterflow.set("fields/totalusages/doubleValue", totalUsage);

    if (Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_ID, documentPathWaterflow, contentWaterflow.raw(), "", "", "")) {
      Serial.println("Water flow data sent to Firestore successfully");
      Serial.print("Flow Rate: ");
      Serial.println(flowRate);
      Serial.print("Total Usage: ");
      Serial.println(totalUsage);
    } else {
      Serial.println("Failed to send water flow data to Firestore");
      Serial.println(fbdo.errorReason());
    }

    // Fetch servoState from Firestore and control servo
    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_ID, documentPathServo)) {
      Serial.println("Fetched Firestore document successfully.");
      StaticJsonDocument<1024> doc;
      DeserializationError error = deserializeJson(doc, fbdo.payload().c_str());

      if (!error) {
        JsonObject fields = doc["fields"];
        if (fields.containsKey("servoState")) {
          bool servoState = fields["servoState"]["booleanValue"].as<bool>(); // Use booleanValue
          Serial.print("Servo State: ");
          Serial.println(servoState);

          // Control the servo based on the servoState value
          myServo.write(servoState ? 180 : 0);  // Move servo based on servoState
          Serial.println(servoState ? "Servo moved to 180 degrees." : "Servo moved to 0 degrees.");
        } else {
          Serial.println("Error: servoState field not found.");
        }
      } else {
        Serial.print("Error: JSON deserialization failed: ");
        Serial.println(error.c_str());
      }
    } else {
      Serial.println("Error fetching Firestore document.");
      Serial.println(fbdo.errorReason());
    }

    attachInterrupt(digitalPinToInterrupt(FLOW_SENSOR_PIN), pulseCounter, FALLING);
  }

  // Delay before the next loop
  delay(1000);
}
