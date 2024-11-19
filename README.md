# Domestic Water Wastage Prevention System

    This project is a *Domestic Water Wastage Prevention System* that interfaces with Firebase Firestore to manage water flow data, control servo gates, and facilitate user payments through a React frontend. The system encompasses various functionalities, including:
    - *Servo Control*: For opening and closing the servo-controlled gate.
    - *WaterFlow Data*: For displaying real-time water usage and flow rate.
    - *Payment Integration*: Users can make payments for the services offered by the Domestic Water Wastage Prevention System through Razorpay, supporting multiple payment methods and providing instant confirmation of transactions.
## Table of Contents
    - [Project Structure](#project-structure)
    - [Features](#features)
    - [Technologies Used](#technologies-used)
    - [Installation](#installation)
    - [Firebase Configuration](#firebase-configuration)
    - [Usage](#usage)
    - [Folder Structure](#folder-structure)
    - [Payment Integration](#payment-integration)
    - [License](#license)
    - [Contributors](#contributors)

    ---
## Project Structure

    The project consists of two main components:

    1. *ServoControl*: Allows the admin to open and close a gate by controlling the servo motor. This updates the servoState field in Firestore.
    2. *WaterFlow*: Displays the water flow data, including flowRate and totalUsage, fetched from the Firestore WaterFlow collection in real-time.

    ---

## Features

    - *Servo Control*: Open and close the gate using buttons that update the Firestore servoState field.
    - *Real-Time Water Data*: Fetch and display real-time flowRate and totalUsage from Firestore, with automatic updates upon changes.
    - *Firebase Firestore Integration*: Seamless interaction with Firebase for fetching and updating data.
    - *Payment Integration*:  Users can make payments for the services offered by the Domestic Water Wastage Prevention System through Razorpay, supporting multiple payment methods and providing instant confirmation of transactions

    ---

## Technologies Used

    - *React* (18.x)
    - *Firebase* (Firestore)
    - *React Router* (for routing)
    - *Vite* (for fast builds)
    - *Razorpay* (for Payment Integration)

    ---

## Installation

    Follow these steps to run the project on your local machine.

### 1. Clone the repository
    bash
    git clone https://github.com/your-username/waterflow-management-system.git
    cd waterflow-management-system
    

### 2. Install dependencies
    bash
    npm install
    npm install -g firebase-tools
    firebase init functions
    cd functions
    npm install firebase-admin

    npm i firebase
    npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
    npm install react-chartjs-2 chart.js
    npm install react-scroll
    npm install dotenv
    

### 3. Firebase Setup

    Ensure you have a Firebase project set up with Firestore. You need two collections:
    - *WaterFlow*: With documents Sensor1 (for flowRate, totalUsage) and ServoControl (for servoState).

    ---

## Firebase Configuration

    Set up Firebase by providing your Firebase project's credentials.

    1. Go to src/firebase/waterflow.jsx and replace the Firebase configuration object with your own:

    javascript
    const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
    };
    

    2. Ensure your Firestore database has the following structure:
    
    users[ 
        user1[ 
            currentMonth[ 
                servoControl[servoState:1], 
                waterflowSensor[totalusages:214] 
            ], 
            jan24[ 
                servoControl[servoState:1], 
                waterflowSensor[totalusages:214] 
            ], 
            feb24[ 
                servoControl[servoState:1], 
                waterflowSensor[totalusages:214] 
            ] 
        ], 
        user2[ 
            currentMonth[ 
                servoControl[servoState:1], 
                waterflowSensor[totalusages:214] 
            ], 
            jan24[ 
                servoControl[servoState:1], 
                waterflowSensor[totalusages:214] 
            ], 
            feb24[ 
                servoControl[servoState:1], 
                waterflowSensor[totalusages:214] 
            ] 
        ] 
    ]

    admin[ 
        limit[max:200,penalty:150, regular:100], 
        price[penaltyPrice:2, regularPrice:0.4], 
        01ListOfAdmin[admins:["admin@gmail.com", "admin2@gmail.com"]] 
        currentMonthAdmin[currentMonth:'oct'] 
    ]
    
    3.Firebase Security Rules 

        service cloud.firestore {
    match /databases/{database}/documents {

    // Admin settings (limit, price, etc.)
    match /admin/{setting} {
      // Allow read to all authenticated users
      allow read: if request.auth != null;
      
      // Allow write only if the user is an admin
      allow write: if isAdmin();
    }

    // Admin List - This document contains the list of admins
    match /admin/01ListOfAdmin {
      // Allow read and write only for admins
      allow read, write: if isAdmin();
    }

    // User data - Only allow access to their own data or admin access
    match /users/{userEmail} {
      // Allow user to read/write their own data
      allow read, write: if isUser(userEmail) || isAdmin();
    }

    // User data for subcollections (month-based data)
    match /users/{userEmail}/{month}/{document} {
      // Allow user to read/write their own subcollection data
      allow read, write: if isUser(userEmail) || isAdmin();
    }

    // Helper functions
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.email in get(/databases/$(database)/documents/admin/01ListOfAdmin).data.admins;
    }

    function isUser(userEmail) {
      return request.auth != null && 
             request.auth.token.email == userEmail;
    }
  }
}

    ---

    ## Usage

    ### Start the development server

    bash
    npm run dev
    

    Navigate to http://localhost:3000 to view the project.

    - *Servo Control*: Open/close the gate using the buttons in the ServoControl component.
    - *Water Flow Data*: Real-time display of flowRate and totalUsage in the WaterFlow component, with updates whenever changes occur in Firestore.

    ---

## Payment Integration

    The project includes payment functionality using *Razorpay*. The integration allows users to make payments for the services offered by the Domestic Water Wastage Prevention System.

    1. Ensure you have your Razorpay credentials, which should be added in the .env file:
    plaintext
    REACT_APP_RAZORPAY_KEY=YOUR_RAZORPAY_KEY
    

    2. In your payment component, initialize Razorpay using the credentials and handle the payment process.

    3. Refer to the Razorpay documentation for detailed integration steps.

    ---

## Folder Structure

    
    waterflow-management-system/
    ├── public/
    ├── src/
    │   ├── admin/
    │   │   ├── SetPrice.jsx
    │   │   ├── SetLimit.jsx
    │   │   ├── AdminViewAllUsers.jsx
    │   │   └── ListOfAmdin.jsx
    │   │   └── ...rest_of_the_files...
    │   ├── user/
    │   │   ├── ServoControl.jsx
    │   │   └── WaterFlow.jsx
    │   │   └── ...rest_of_the_files...
    │   ├── css/
    │   │   └──SetPrice.css
    │   │   └──WaterFlow.css
    │   │   └──...rest_of_the_files...
    │   ├── assets/
    │   │   └── globalMonthData.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── README.md
    └── .env
    

### Explanation:
    - *components/*: Contains the React components for handling the servo control (ServoControl.jsx) and water flow data (WaterFlow.jsx).
    - *firebase/*: Contains Firebase configuration (waterflow.jsx) to interact with Firestore.
    - *App.jsx*: Main application file that renders components.
    - *main.jsx*: React entry point that renders App.

    ---

## License

    This project is open-source and available under the [MIT License](LICENSE).

    ---

## Contributors

    - Akash Bera - [Developer](https://www.linkedin.com/in/akash-bera-5a3009250/)
    - Subhayan Kapas - [Developer](https://www.linkedin.com/in/subhayan-kapas-003009250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

    ---