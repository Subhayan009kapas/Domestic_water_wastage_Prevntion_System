import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { monthCode } from '../assets/globalMonthData';  // Import your global monthCode data
import '../allCss/viewAnalytics.css';
import { color } from 'chart.js/helpers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ViewAnalytics = ({ userId }) => {
  const [loading, setLoading] = useState(true); 
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

  // Prepare data for rendering months and current month
  const renderedMonths = [];
  let currentMonthFound = false;

  for (const [key, monthName] of Object.entries(monthCode)) {
    const usageKey = key.toLowerCase() + '24'; // Assuming keys are like 'jan24', 'feb24', etc.

    // Check if data for the month exists
    if (!usageData[usageKey]) {
      if (!currentMonthFound) {
        currentMonthFound = true; // This is the first missing data month
      } else {
        break; // Stop showing months after the first missing one
      }
    }

    if (usageData[usageKey]) {
      renderedMonths.push(
        <li key={key} className='month-box'>
          <strong>{monthName} 2024 : {  ''}</strong>  { usageData[usageKey]} liters
        </li>
      );
    }
  }

  // Data for the chart
  const data = {
    labels: [...renderedMonths.map((_, i) => Object.values(monthCode)[i] + ' 2024'), 'Current Month'],
    datasets: [
      {
        label: 'Total Water Usage (liters)',
        data: [...renderedMonths.map((_, i) => usageData[Object.keys(monthCode)[i].toLowerCase() + '24']), usageData.currentMonth],
        fill: false,
        borderColor: '#4CAF50',
        color:'white',
        tension: 0.1,
      },
    ],
  };

  return (
    
    <div className="view-analytics-container">
          <header className="view-analytics-header-all">
        <h1>View Monthly Analytics</h1>
      </header>
      {loading ? (
        <div className="loading-container">
          <p className="load">Loading...</p>
        </div>
      ) : (
        <main className="view-analytics-main">
          <div className="chart-container">
            <Line data={data} />
          </div>
          
          <div className="data-list-monthly ">
             <ul> 
              <strong>{currentMonthFound ? monthCode[Object.keys(monthCode).find(key => !usageData[key.toLowerCase() + '24'])] + ' 2024' : 'N/A'}</strong>  : {usageData.currentMonth} liters
            </ul>
            <ul className="reversed-months">{renderedMonths}</ul>
    
          </div>

          
        </main>
          
      )}

    </div>
   
    
  );
};

export default ViewAnalytics;
