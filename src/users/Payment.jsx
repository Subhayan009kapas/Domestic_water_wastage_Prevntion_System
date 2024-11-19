  import React, { useState, useEffect } from 'react';
  import { db } from '../firebaseConfig';
  import { doc, onSnapshot } from 'firebase/firestore';
  import { collection, getDocs, getDoc } from "firebase/firestore";
  import { monthCode } from '../assets/globalMonthData';  // Import your global monthCode data
  import '../allCss/payment.css';



  const Payment = ({ userId }) => {
    
    const [loading, setLoading] = useState(true);
    const [totalUsage, setTotalUsage] = useState(0);
    const [penaltyPrice, setPenaltyPrice] = useState(0);
    const [regularPrice, setRegularPrice] = useState(0);
    const [regularLimit, setRegularLimit] = useState(100);  
    const [penaltyLimit, setPenaltyLimit] = useState(150);
    const [maxLimit, setMaxLimit] = useState(200);

    const [isWaterFlowFetched, setIsWaterFlowFetched] = useState(false);
    const [isPriceFetched, setIsPriceFetched] = useState(false);
    const [isLimitFetched, setIsLimitFetched] = useState(false);

    const [donePayment, setDonePayment] = useState({});
    const [lastrenderedMonth, setLastrenderedMonth] = useState('');
    const usageDataObject = {};
    const [usageData, setUsageData] = useState({
      jan24: 0,
      feb24: 0,
      mar24: 0,
      apr24: 0,
      may24: 0,
      jun24: 0, // Include June
      jul24: 0,
      aug24: 0,
      sep24: 0,
      oct24: 0,
      nov24: 0,
      dec24: 0,
      currentMonth: 0,
    });
    // for payment status 
    const fetchPaidStatus = async (userId) => {
      let paidStatusData = {}; // Local variable to hold the fetched data
      try {
        let allmonthcode = Object.keys(monthCode).map(code => code + '24');
  
        // Use for...of to handle async properly
        for (const month of allmonthcode) {
          const paidStatusRef = doc(db, 'users', userId, month, 'paidStatus');
          const docSnap = await getDoc(paidStatusRef);
          if (docSnap.exists()) {
            // Add the paid status to the object, using the month as the key
            paidStatusData[month] = docSnap.data().paid;
          } else {
            console.log(`No document found for ${month}`);
          }
        }
  
        // Fetch the paid status for the current month
        const currentMonthRef = doc(db, 'users', userId, 'currentMonth', 'paidStatus');
        const currentMonthSnap = await getDoc(currentMonthRef);
        if (currentMonthSnap.exists()) {
          // Add the current month's paid status to the object
          paidStatusData['currentMonth'] = currentMonthSnap.data().paid;
        } else {
          console.log("No document found for currentMonth");
        }
  
        // Set the fetched data into the state
        setDonePayment(paidStatusData);
      } catch (error) {
        console.error("Error fetching paid status:", error);
      } finally {
        setLoading(false); // Update loading state
      }
    };
    useEffect(() => {
      if (userId) {
        fetchPaidStatus(userId); 
      }
    }, [userId]);

    useEffect(() => {
      const unsubscribeJan24 = onSnapshot(doc(db, 'users', userId, 'jan24', 'waterflowSensor'), (jan24Snap) => {
        setUsageData(prev => ({
          ...prev,
          jan24: jan24Snap.exists() ? jan24Snap.data().totalusages : 0,
        }));
        setLoading(false); // Set loading to false after fetching data
      });

      const unsubscribeFeb24 = onSnapshot(doc(db, 'users', userId, 'feb24', 'waterflowSensor'), (feb24Snap) => {
        setUsageData(prev => ({
          ...prev,
          feb24: feb24Snap.exists() ? feb24Snap.data().totalusages : 0,
        }));
      });

      const unsubscribeMar24 = onSnapshot(doc(db, 'users', userId, 'mar24', 'waterflowSensor'), (mar24Snap) => {
        setUsageData(prev => ({
          ...prev,
          mar24: mar24Snap.exists() ? mar24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeApr24 = onSnapshot(doc(db, 'users', userId, 'apr24', 'waterflowSensor'), (apr24Snap) => {
        setUsageData(prev => ({
          ...prev,
          apr24: apr24Snap.exists() ? apr24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeMay24 = onSnapshot(doc(db, 'users', userId, 'may24', 'waterflowSensor'), (may24Snap) => {
        setUsageData(prev => ({
          ...prev,
          may24: may24Snap.exists() ? may24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeJun24= onSnapshot(doc(db, 'users', userId, 'jun24', 'waterflowSensor'), (jun24Snap) => {
        setUsageData(prev => ({
          ...prev,
          jun24: jun24Snap.exists() ? jun24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeJul24= onSnapshot(doc(db, 'users', userId, 'jul24', 'waterflowSensor'), (jul24Snap) => {
        setUsageData(prev => ({
          ...prev,
          jul24: jul24Snap.exists() ? jul24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeAug24= onSnapshot(doc(db, 'users', userId, 'aug24', 'waterflowSensor'), (aug24Snap) => {
        setUsageData(prev => ({
          ...prev,
          aug24: aug24Snap.exists() ? aug24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeSep24= onSnapshot(doc(db, 'users', userId, 'sep24', 'waterflowSensor'), (sep24Snap) => {
        setUsageData(prev => ({
          ...prev,
          sep24: sep24Snap.exists() ? sep24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeOct24= onSnapshot(doc(db, 'users', userId, 'oct24', 'waterflowSensor'), (oct24Snap) => {
        setUsageData(prev => ({
          ...prev,
          oct24: oct24Snap.exists() ? oct24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeNov24= onSnapshot(doc(db, 'users', userId, 'nov24', 'waterflowSensor'), (nov24Snap) => {
        setUsageData(prev => ({
          ...prev,
          nov24: nov24Snap.exists() ? nov24Snap.data().totalusages : 0,
        }));
      });
      const unsubscribeDec24= onSnapshot(doc(db, 'users', userId, 'dec24', 'waterflowSensor'), (dec24Snap) => {
        setUsageData(prev => ({
          ...prev,
          dec24: dec24Snap.exists() ? dec24Snap.data().totalusages : 0,
        }));
      });

      // Fetch current month data
      const unsubscribeCurrentMonth = onSnapshot(doc(db, 'users', userId, 'currentMonth', 'waterflowSensor'), (currentMonthSnap) => {
        setUsageData(prev => ({
          ...prev,
          currentMonth: currentMonthSnap.exists() ? currentMonthSnap.data().totalusages : 0,
        }));
      });

      // Cleanup listeners when the component unmounts
      return () => {
        unsubscribeJan24();
        unsubscribeFeb24();
        unsubscribeMar24();
        unsubscribeApr24();
        unsubscribeMay24();
        unsubscribeJun24();
        unsubscribeJul24();
        unsubscribeAug24();
        unsubscribeSep24();
        unsubscribeOct24();
        unsubscribeNov24();
        unsubscribeDec24();
        unsubscribeCurrentMonth(); // Unsubscribe from current month
      };
    }, [userId]);


    let currentMonthFound = false;
    // const usageDataObject = {};

    for (const [key, monthName] of Object.entries(monthCode)) {
      const usageKey = key.toLowerCase() + '24'; // Assuming keys are like 'jan24', 'feb24', etc.

      // Check if data for the month exists
      if (!usageData[usageKey]) {
        if (!currentMonthFound) {
          currentMonthFound = true; // This is the first missing data month
        } else {
          break; 
        }
      }
      else {
        usageDataObject[monthName] = usageData[usageKey]; // Store month name and usage
      }
     
    }
    const renderedMonths = Object.entries(usageDataObject).map(([monthName, usage]) => (
      <li key={monthName} className='month-box'>
        <strong>{monthName} 2024: </strong>
    
        <div className='month-details'>
          {/* Payment status with styles for done and not done */}
          <div className={donePayment[monthName.toLowerCase().slice(0, 3) + '24'] ? 'status done' : 'status not-done'}>
            {donePayment[monthName.toLowerCase().slice(0, 3) + '24'] ? 'Done' : 'Not done'}
          </div>
          <div className='usage'>
            {usage} liters
          </div>
        </div>
      </li>
    ));
    
    


    
    const getPreviousMonth =  () => {
      const userMonthNamelist =[]
        for (let month of renderedMonths) {
          userMonthNamelist.push(month.key.slice(0,3).toLowerCase());
        }
        console.log('inside func',userMonthNamelist[userMonthNamelist.length -1]+'24');
        setLastrenderedMonth(userMonthNamelist[userMonthNamelist.length -1]+'24')
     return (userMonthNamelist[userMonthNamelist.length -1]+'24')
    }
   
    // lastt -1 month
    useEffect(() => {

      const lastRenderedMonth = getPreviousMonth(); 
      console.log('this is last',lastRenderedMonth);
      const unsubscribeWaterFlow = onSnapshot(
    
        doc(db, 'users', userId, lastRenderedMonth, 'waterflowSensor'),
        (waterFlowDocSnap) => {
          if (waterFlowDocSnap.exists()) {
            setTotalUsage(waterFlowDocSnap.data().totalusages || 0);
            setIsWaterFlowFetched(true);
            console.log("Water usage updated:", waterFlowDocSnap.data().totalusages || 0);
            console.log('manual', totalUsage , waterFlowDocSnap.data().totalusages);
            
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
    }, [userId ,usageData]);
  
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
  
  


  //   payment 
  // const [amount, setAmount] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };



  const handlePayment = async () => {
    // Extract the last month's usage value from the renderedMonths array
    const lastRenderedMonth = renderedMonths[renderedMonths.length - 1];
    let lastMonthUsage = lastRenderedMonth.props.children[2]; 
    console.log('last month ', lastMonthUsage); 
    lastMonthUsage= totalUsage 
    console.log('last month ', totalUsage);  

    const usageAmount = parseFloat(lastMonthUsage);
    console.log(usageAmount ,lastMonthUsage ,lastRenderedMonth);
    
    if (!usageAmount || isNaN(usageAmount) || usageAmount <= 0) {
        alert('Invalid water usage value for the last month.');
        return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
    }
    
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY; 

    const options = {
        key: razorpayKey, 
        amount: Math.floor(totalPrice) * 100, 
        // amount: totalPrice.toFixed(0)* 100, 
        currency: 'INR',
        name: 'Water Usage Payment',
        description: 'Payment for water usage',
        image: 'https://tse2.mm.bing.net/th?id=OIP.osTgZjm-g1thhxdSa8BtYQHaHa&pid=Api&P=0&h=180', // Optional
        handler: function (response) {
            alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id} `);
            console.log(response);
            
        },
        prefill: {
            name: userId, // Make sure userId is defined in your component
            email: userId,
            contact: userId, // Ensure userId is a valid contact number or replace with an appropriate value
        },
        notes: {
            address: 'Customer Address', // Optionally customize this
        },
        theme: {
            color: '#8448ed',
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

    


    return (
      <div className="payment-container">
        <header className="payment-header">
          <h1>Monthly Payment</h1>
        </header>
        {loading ? (
          <div className="loading-container">
            <p className="load">Loading...</p>
          </div>
        ) : (<div className='outer-payment-main'>
            <main className="payment-main">
              <div className="data-list">
              <h3>Payment History</h3>
                <p className="current-month-info">
                  <strong>
                    {currentMonthFound
                      ? monthCode[
                          Object.keys(monthCode).find(
                            key => !usageData[key.toLowerCase() + '24']
                          )
                        ] + ' 2024'
                      : 'N/A'}
                  </strong>
                  : {usageData.currentMonth} liters...
                </p>
                <ul className="reversed-months">{renderedMonths}</ul>  {/* Apply reverse order here */}
              </div> 
              <button className="pay-button" onClick={handlePayment}>
               Pay ₹{totalPrice.toFixed(0)}
              </button>  
            </main>
           
        </div>)}
      </div>

    );
  };

  export default Payment;
