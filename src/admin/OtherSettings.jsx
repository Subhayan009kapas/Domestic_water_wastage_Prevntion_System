import React, { useState, useEffect } from 'react';
//import { firestore } from '../firebaseConfig'; // Ensure the Firestore import is correct
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import '../allCss/otherSettings.css'; // Your existing CSS file

const OtherSettings = () => {
  const [currentMonth, setCurrentMonth] = useState(''); // Holds the current month from Firestore
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  // Fetch the current month from Firestore and check against the actual current month
  useEffect(() => {
    const fetchCurrentMonth = async () => {
      try {
        setLoading(true);
        const monthDocRef = doc(firestore, 'admin', 'currentMonthAdmin'); // Reference to the document
        const monthDoc = await getDoc(monthDocRef); // Fetch the document
        
        const today = new Date();
        const actualCurrentMonth = months[today.getMonth()]; // Get the actual current month from the date

        if (monthDoc.exists()) {
          const firestoreCurrentMonth = monthDoc.data().currentMonth; // Get current month from Firestore
          setCurrentMonth(firestoreCurrentMonth); // Set the current month in state
          
          // If the Firestore month does not match the actual current month, update Firestore
          if (firestoreCurrentMonth !== actualCurrentMonth) {
            await updateDoc(monthDocRef, {
              currentMonth: actualCurrentMonth,
            });
            setCurrentMonth(actualCurrentMonth); // Update the state to reflect the new current month
          }
        } else {
          // If no document exists, set the current month in Firestore
          await updateDoc(monthDocRef, {
            currentMonth: actualCurrentMonth,
          });
          setCurrentMonth(actualCurrentMonth);
        }
      } catch (error) {
        console.error('Error fetching or updating current month:', error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchCurrentMonth();
    calculateDaysRemaining();

    // Set up an interval to check for the end of the month
    const checkEndOfMonth = setInterval(() => {
      const today = new Date();
      const isLastDayOfMonth = today.getDate() === new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

      if (isLastDayOfMonth && currentMonth !== months[today.getMonth()]) {
        saveCurrentMonth();
      }
    }, 86400000); // Check every day (24 hours in milliseconds)

    return () => clearInterval(checkEndOfMonth); // Clean up the interval on component unmount
  }, [currentMonth]); // Include currentMonth as a dependency

  // Save the current month in Firestore (for end of month logic)
  const saveCurrentMonth = async () => {
    const today = new Date();
    const actualCurrentMonth = months[today.getMonth()]; // Get the actual current month from the date

    if (currentMonth !== actualCurrentMonth) {
      try {
        setLoading(true); // Set loading state while saving

        // Update Firestore with the new current month
        const monthDocRef = doc(firestore, 'admin', 'currentMonthAdmin');
        await updateDoc(monthDocRef, {
          currentMonth: actualCurrentMonth,
        });

        alert(`Current month successfully updated to ${actualCurrentMonth}`);
        setCurrentMonth(actualCurrentMonth); // Update the state with the new current month
      } catch (error) {
        console.error('Error saving current month:', error);
      } finally {
        setLoading(false); // Stop loading state
      }
    }
  };

  // Calculate the number of days remaining until the next month
  const calculateDaysRemaining = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const diffTime = Math.abs(lastDayOfMonth - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
  };

  return (
    <div className={`month-selection-container ${loading ? 'loading' : ''}`}> 
      {loading ? (
        <div className="load"></div>
      ) : (
        <div className="glass-card-22">
          <h2>Current Month</h2>
          <p>{currentMonth}</p>
          <p>Days remaining until next month: {daysRemaining}</p>
        </div>
      )}
    </div>
  );
};

export default  OtherSettings ;
