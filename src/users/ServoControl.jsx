import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';  // Adjust the path as necessary
import { doc, getDoc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';  // Import updateDoc for updating fields
import '../allCss/servocontrol.css';  // Import your CSS for user page styling

const ServoControl = ({ userId }) => {
  const [servoState, setServoState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalUsage, setTotalUsage] = useState(0); // Track total water usage
  const [maxLimit, setMaxLimit] = useState(200); // Assuming default max limit
  const [penaltyLimit, setPenaltyLimit] = useState(150);
  const [regularLimit, setRegularLimit] = useState(100);
  const [blink, setBlink] = useState(false); // State for blinking effect

  // Define Firestore document references
  const servoControlDocRef = doc(db, 'users', userId, 'currentMonth', 'servoControl');
  const waterFlowDocRef = doc(db, 'users', userId, 'currentMonth', 'waterflowSensor'); // Reference for water usage
  const limitDocRef = doc(db, 'admin', 'limit'); // Assuming limit is stored in admin collection

  useEffect(() => {
    // Fetch initial servo state and limits
    const fetchInitialData = async () => {
      try {
        const [servoSnap, limitSnap] = await Promise.all([
          getDoc(servoControlDocRef),
          getDoc(limitDocRef),
        ]);

        if (servoSnap.exists()) {
          setServoState(servoSnap.data().servoState);
          // console.log("Initial servoState:", servoSnap.data().servoState);
        } else {
          console.log("No such servoControl document!");
        }

        if (limitSnap.exists()) {
          const data = limitSnap.data();
          setMaxLimit(data.max || 200);
          setPenaltyLimit(data.penalty || 150);
          setRegularLimit(data.regular || 100);
          // console.log("Limits fetched:", data);
        } else {
          console.log("No such limit document!");
        }
      } catch (error) {
        console.error("Error fetching initial data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // Real-time listener for water usage
    const unsubscribeWaterUsage = onSnapshot(waterFlowDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setTotalUsage(docSnap.data().totalusages || 0);
        // console.log("Water usage updated:", docSnap.data().totalusages || 0);
      } else {
        console.log("No such waterflowSensor document!");
      }
    });

    // Real-time listener for servoControl
    const unsubscribeServoControl = onSnapshot(servoControlDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setServoState(docSnap.data().servoState);
        // console.log("Servo state updated via Firestore:", docSnap.data().servoState);
      } else {
        console.log("No such servoControl document!");
      }
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeWaterUsage();
      unsubscribeServoControl();
    };
  }, [userId, servoControlDocRef, waterFlowDocRef, limitDocRef]);

  useEffect(() => {
    // Monitor totalUsage and update servoState if necessary
    const checkUsageAndUpdateServo = async () => {
      if (totalUsage >= maxLimit && servoState) {
        try {
          await updateDoc(servoControlDocRef, { servoState: false });
          setServoState(false);
          // console.log("Max limit exceeded. Servo turned off.");
        } catch (error) {
          console.error("Error updating servoControl document: ", error);
        }
      }
    };

    checkUsageAndUpdateServo();
  }, [totalUsage, maxLimit, servoState, servoControlDocRef]);

  const handleToggle = async () => {
    const newState = !servoState;

    // Prevent toggling on if usage exceeds max limit
    if (newState && totalUsage >= maxLimit) {
      alert("Cannot turn on servo. Max water usage limit exceeded.");
      return;
    }

    try {
      await updateDoc(servoControlDocRef, { servoState: newState });
      setServoState(newState);
      // console.log(`Servo state updated to: ${newState}`);
    } catch (error) {
      console.error("Error updating servoControl document: ", error);
    }
  };

  const handleIncrementUsage = async () => {
    const newUsage = totalUsage + 1; // Increment usage by 1
    try {
      await updateDoc(waterFlowDocRef, { totalusages: newUsage }); // Update total usage in Firestore
      setTotalUsage(newUsage); // Update local state
      // console.log(`Total usage incremented to: ${newUsage}`);
    } catch (error) {
      console.error("Error updating total usage: ", error);
    }
  };

  const handleDecrementUsage = async () => {
    const newUsage = totalUsage > 0 ? totalUsage - 1 : 0; // Decrement usage by 1, min 0
    try {
      await updateDoc(waterFlowDocRef, { totalusages: newUsage }); // Update total usage in Firestore
      setTotalUsage(newUsage); // Update local state
      // console.log(`Total usage decremented to: ${newUsage}`);
    } catch (error) {
      console.error("Error updating total usage: ", error);
    }
  };

  const getBarColor = () => {
    if (totalUsage < regularLimit) return '#90EE90'; // Green
    if (totalUsage >= regularLimit && totalUsage < maxLimit) return '#ff9900'; // Orange
    return 'red'; // Red
  };

  const getUsagePercentage = () => {
    if (totalUsage <= penaltyLimit) {
      return (totalUsage / maxLimit) * 100;
    } else {
      return 100; // Cap at 100%
    }
  };
  const isUsageExceeded = totalUsage >= maxLimit;

  const getUsageMessage = () => {
    if (totalUsage < regularLimit) return "You are in safe usage.";
    if (totalUsage >= regularLimit && totalUsage < maxLimit) return "You're using more water than regular.";
    else{
       return "Sorry, the water supply is cut due to excessive use and will be renewed next month.";
    }
  };

  // Start blinking effect
  useEffect(() => {
    if (!loading) {
      setBlink(true);
      const blinkInterval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 500); // 500ms blinking speed

      return () => clearInterval(blinkInterval);
    }
  }, [loading]);

  // if (loading) return <p className='load'>Loading...</p>;

  const greenWidth = Math.min(totalUsage, regularLimit);
  const orangeWidth = Math.min(Math.max(totalUsage - regularLimit, 0), penaltyLimit - regularLimit);
  const redWidth = Math.min(Math.max(totalUsage - penaltyLimit, 0), maxLimit - penaltyLimit);

  return (
    <div className="servo-control-container">
      <header className="servo-control-header-all">
        <h1>Gate Control</h1>
      </header>
      {loading ? (
         <div className="loading-container">
         <div className="spinner"></div>
         <p className="load">Loading...</p>
       </div>
     ) : (
      <main className="servo-control-main">
        <p className='usages-title '>Water Supply Status:<strong>{servoState !== null ? (servoState ? 'On' : 'Off') : 'N/A'}</strong></p>
      <div className='toggle-and-bar'>
        <div className="servo-control-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={servoState && !isUsageExceeded}
              onChange={handleToggle}
              disabled={isUsageExceeded}
              aria-label="Toggle Servo State"
            />
            <span className="slider"></span>
          </label>
        </div>

       
          <div className="bar-container">
            {(totalUsage<regularLimit)?(<>
            <div className="bar">
              <div className="bar-green" style={{ width: `${(greenWidth / regularLimit) * 100}%` }}></div>
              {/* <div className="bar-orange" style={{ width: `${(orangeWidth / maxLimit) * 100}%` }}></div>
              <div className="bar-red" style={{ width: `${(redWidth / maxLimit) * 100}%` }}></div> */}
              </div>
             <div className="total-usage-on-servo">{`Total Usage:${totalUsage}`}</div>
             </>):(<>
              <div className="bar">
                <div className="bar-green" style={{ width: `${(greenWidth / maxLimit) * 100}%` }}></div>
                <div className="bar-orange" style={{ width: `${(orangeWidth / maxLimit) * 100}%` }}></div>
                <div className="bar-red" style={{ width: `${(redWidth / maxLimit) * 100}%` }}></div>
                </div>
              <div className="total-usage-on-servo">{`Total Usage: ${Math.round(totalUsage)} L`}</div>
             </>)} 
          </div>
         
         

        </div>
        {/* Increment and Decrement Usage Buttons */}
        {/* <div className="usage-buttons">
          <button onClick={handleIncrementUsage}>Increment Usage</button>
          <button onClick={handleDecrementUsage}>Decrement Usage</button>
        </div> */}

        {/* Usage Message with Blinking Effect */}
        <div className={`usages-message ${blink ? 'blink' : ''}`}>
          <p>{getUsageMessage()}</p>
        </div>
      </main>
      )}
    </div>
  );
};

export default ServoControl;
