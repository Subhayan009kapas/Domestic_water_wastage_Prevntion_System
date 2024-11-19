// src/admin/setlimit.jsx

import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';  // Adjust the path as necessary
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../allCss/setlimit.css'; // Import your CSS for admin page styling

const SetLimit = () => {
  const [maxLimit, setMaxLimit] = useState('');
  const [penaltyLimit, setPenaltyLimit] = useState('');
  const [regularLimit, setRegularLimit] = useState('');
  const [loading, setLoading] = useState(true);
  const limitDocRef = doc(db, 'admin', 'limit');

  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const docSnap = await getDoc(limitDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMaxLimit(data.max || '');
          setPenaltyLimit(data.penalty || '');
          setRegularLimit(data.regular || '');
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLimits();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await setDoc(limitDocRef, {
        max: parseFloat(maxLimit),
        penalty: parseFloat(penaltyLimit),
        regular: parseFloat(regularLimit),
      });
      alert('Limits updated successfully');
    } catch (error) {
      console.error("Error updating document: ", error);
      alert('Failed to update limits');
    }
  };

  // if (loading) return <p className='load'>Loading...</p>;

  return (
    <div className="setlimit-container">
      <header className="setlimit-header">
        <h1>Set Limits</h1>
      </header>
      {loading ? (
        <div className="loading-container">
          <p className="load">Loading...</p>
        </div>
      ) : (
      <main className="setlimit-main">
        <form onSubmit={handleSubmit} className="setlimit-form">
          <label>
            Max Limit:
            <input
              type="number"
              step="0.01"
              value={maxLimit}
              onChange={(e) => setMaxLimit(e.target.value)}
              required
            />
          </label>
          
          <label>
            Penalty Limit:
            <input
              type="number"
              step="0.01"
              value={penaltyLimit}
              onChange={(e) => setPenaltyLimit(e.target.value)}
              required
            />
          </label>
          
          <label>
            Regular Limit:
            <input
              type="number"
              step="0.01"
              value={regularLimit}
              onChange={(e) => setRegularLimit(e.target.value)}
              required
            />
          </label>
          
          <button type="submit">Update Limits</button>
        </form>
      </main>
      )}
    
    </div>
  );
};

export default SetLimit;
