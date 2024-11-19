import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';  // Adjust the path as necessary
import { doc, onSnapshot } from 'firebase/firestore'; // Import onSnapshot
import '../allCss/waterflow.css';

const WaterFlow = ({ userId }) => {
  const [totalUsage, setTotalUsage] = useState(0);
  const [penaltyPrice, setPenaltyPrice] = useState(0);
  const [regularPrice, setRegularPrice] = useState(0);
  const [regularLimit, setRegularLimit] = useState(100); // Regular limit set to 100 liters
  const [penaltyLimit, setPenaltyLimit] = useState(150); // Penalty limit set to 150 liters

  const [loading, setLoading] = useState(true); // Loading state

  const [maxLimit, setMaxLimit] = useState(200)

  // States to track if each data point has been fetched
  const [isWaterFlowFetched, setIsWaterFlowFetched] = useState(false);
  const [isPriceFetched, setIsPriceFetched] = useState(false);
  const [isLimitFetched, setIsLimitFetched] = useState(false);

  useEffect(() => {
    // Listener for waterflowSensor
    const unsubscribeWaterFlow = onSnapshot(
      doc(db, 'users', userId, 'currentMonth', 'waterflowSensor'),
      (waterFlowDocSnap) => {
        if (waterFlowDocSnap.exists()) {
          setTotalUsage(waterFlowDocSnap.data().totalusages || 0);
          setIsWaterFlowFetched(true);
          console.log("Water usage updated:", waterFlowDocSnap.data().totalusages || 0);
        } else {
          console.log("No such waterflowSensor document!");
          setIsWaterFlowFetched(true); // Even if document doesn't exist, consider it fetched
        }
      },
      (error) => {
        console.error("Error fetching waterflowSensor document: ", error);
        setIsWaterFlowFetched(true); // Prevent indefinite loading on error
      }
    );

    // Listener for price
    const unsubscribePrice = onSnapshot(
      doc(db, 'admin', 'price'),
      (priceDocSnap) => {
        if (priceDocSnap.exists()) {
          const data = priceDocSnap.data();
          setPenaltyPrice(data.penaltyPrice || 0);
          setRegularPrice(data.regularPrice || 0);
          setIsPriceFetched(true);
          console.log("Prices fetched:", data);
        } else {
          console.log("No such price document!");
          setIsPriceFetched(true); // Even if document doesn't exist, consider it fetched
        }
      },
      (error) => {
        console.error("Error fetching price document: ", error);
        setIsPriceFetched(true); // Prevent indefinite loading on error
      }
    );

    // Listener for limit
    const unsubscribeLimit = onSnapshot(
      doc(db, 'admin', 'limit'),
      (limitDocSnap) => {
        if (limitDocSnap.exists()) {
          const data = limitDocSnap.data();
          setPenaltyLimit(data.penalty || 150);
          setRegularLimit(data.regular || 100);
          setIsLimitFetched(true);
          console.log("Limits fetched:", data);
        } else {
          console.log("No such limit document!");
          setIsLimitFetched(true); // Even if document doesn't exist, consider it fetched
        }
      },
      (error) => {
        console.error("Error fetching limit document: ", error);
        setIsLimitFetched(true); // Prevent indefinite loading on error
      }
    );

    // Cleanup the listeners when the component unmounts
    return () => {
      unsubscribeWaterFlow();
      unsubscribePrice();
      unsubscribeLimit();
    };
  }, [userId]);

  useEffect(() => {
    // Check if all data has been fetched
    if (isWaterFlowFetched && isPriceFetched && isLimitFetched) {
      setLoading(false);
    }
  }, [isWaterFlowFetched, isPriceFetched, isLimitFetched]);

  // Calculate the regular usage and penalty usage
  const regularUsage = Math.min(totalUsage, regularLimit);
  const penaltyUsage = totalUsage > regularLimit ? totalUsage - regularLimit : 0;

  const regularPriceTotal = regularUsage * regularPrice;
  const penaltyPriceTotal = penaltyUsage * penaltyPrice;
  const totalPrice = regularPriceTotal + penaltyPriceTotal;






  // useEffect(() => {
  //   // Monitor totalUsage and update servoState if necessary
  //   const checkUsageAndUpdateServo = async () => {
  //     if (totalUsage >= maxLimit && servoState) {
  //       try {
  //         await updateDoc(servoControlDocRef, { servoState: false });
  //         setServoState(false);
  //         // console.log("Max limit exceeded. Servo turned off.");
  //       } catch (error) {
  //         console.error("Error updating servoControl document: ", error);
  //       }
  //     }
  //   };

  //   checkUsageAndUpdateServo();
  // }, [totalUsage, maxLimit, servoState, servoControlDocRef]);

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
  
  const greenWidth = Math.min(totalUsage, regularLimit);
  const orangeWidth = Math.min(Math.max(totalUsage - regularLimit, 0), penaltyLimit - regularLimit);
  const redWidth = Math.min(Math.max(totalUsage - penaltyLimit, 0), maxLimit - penaltyLimit);

  return (
    <div className="waterflow-container">
     <header className="waterflow-header-all">
        <h1>Water Usage for This Month</h1>
      </header>
      {loading ? (
        <div className="loading-container">
          <p className="load">Loading...</p>
        </div>
      ) : (
        <div className="before-main">
          <p className='usages-title '>Total Usage :<strong> {totalUsage} L</strong></p>

          <div className="bar-container">
            {(totalUsage<regularLimit)?(
            <div className="bar">
              <div className="bar-green" style={{ width: `${(greenWidth / regularLimit) * 100}%` }}></div>
            </div>
             ):(
              <div className="bar">
                <div className="bar-green" style={{ width: `${(greenWidth / maxLimit) * 100}%` }}></div>
                <div className="bar-orange" style={{ width: `${(orangeWidth / maxLimit) * 100}%` }}></div>
                <div className="bar-red" style={{ width: `${(redWidth / maxLimit) * 100}%` }}></div>
              </div>
             )} 
          </div>

          <main className="waterflow-main">
            {/* Regular Price Section */}
            <div className="price-row">
              <div className="price-box regular">
                <h2>Regular Price : {regularPrice} ₹/L</h2><hr/>
                <p className="usage-regular"><strong>Price for {regularUsage} liters:</strong> ₹{regularPriceTotal.toFixed(2)}</p>
              </div>
              <div className="price-box penalty">
                <h2>Penalty Price :  {penaltyPrice} ₹/L </h2><hr/>
                <p className="usage-penalty"><strong>Penalty for {Math.round(penaltyUsage)} liters:</strong> ₹{penaltyPriceTotal.toFixed(2)}</p>
              </div>
            </div>

            {/* Total Price */}
            <div className="total-price">
              <p>Total Price : ₹ {totalPrice.toFixed(2)}</p>
            </div>       
          </main> 

         
          


        </div>
      )}
    </div>
  );
};

export default WaterFlow;
