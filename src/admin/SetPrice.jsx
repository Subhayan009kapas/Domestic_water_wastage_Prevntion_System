// src/admin/setprice.jsx

import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';  // Adjust the path as necessary
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../allCss/setprice.css';  // Import your CSS for admin page styling

const SetPrice = () => {
  const [penaltyPrice, setPenaltyPrice] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const priceDocRef = doc(db, 'admin', 'price');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const docSnap = await getDoc(priceDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPenaltyPrice(data.penaltyPrice || '');
          setRegularPrice(data.regularPrice || '');
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await setDoc(priceDocRef, {
        penaltyPrice: parseFloat(penaltyPrice),
        regularPrice: parseFloat(regularPrice),
      });
      alert('Prices updated successfully');
    } catch (error) {
      console.error("Error updating document: ", error);
      alert('Failed to update prices');
    }
  };

  // if (loading) return <p className='load'>Loading...</p>;

  return (
    <div className="setprice-container">
      <header className="setprice-header">
        <h1>Set Pricing</h1>
      </header>
      {loading ? (
        <div className="loading-container">
          <p className="load">Loading...</p>
        </div>
      ) : (
      <main className="setprice-main">
        <form onSubmit={handleSubmit} className="setprice-form">
          <label>
            Penalty Price:
            <input
              type="number"
              step="0.01"
              value={penaltyPrice}
              onChange={(e) => setPenaltyPrice(e.target.value)}
              required
            />
          </label>
          
          <label>
            Regular Price:
            <input
              type="number"
              step="0.01"
              value={regularPrice}
              onChange={(e) => setRegularPrice(e.target.value)}
              required
            />
          </label>
          
          <button type="submit">Update Prices</button>
        </form>
      </main>
      )}
     
    </div>
  );
};

export default SetPrice;
