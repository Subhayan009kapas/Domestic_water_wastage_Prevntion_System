import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Adjust import as necessary
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../allCss/listofAdmin.css'; // Ensure this file is imported

const ListOfAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminDocRef = doc(db, 'admin', '01ListOfAdmin');
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          const adminData = adminDoc.data();
          setAdmins(adminData.admins || []);
        } else {
          setError('Admin document does not exist.');
        }
      } catch (err) {
        setError('Failed to fetch admins.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchAdmins();
  }, []);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setNewEmail(admins[index]);
    setError(''); // Clear any existing errors
  };

  const handleSaveClick = () => {
    setShowPasswordModal(true); // Show password modal
  };

  const handlePasswordSubmit = async () => {
    if (password !== 'your_password_here') { // Replace with your actual password check
      setError('Incorrect password. Please try again.');
      return;
    }

    if (!newEmail.trim()) {
      setError('Email cannot be empty.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const updatedAdmins = [...admins];
      updatedAdmins[editIndex] = newEmail.trim();

      const adminDocRef = doc(db, 'admin', '01ListOfAdmin');
      await setDoc(adminDocRef, { admins: updatedAdmins });

      setAdmins(updatedAdmins);
      setEditIndex(null);
      setNewEmail('');
      setError('');
      setShowPasswordModal(false); // Hide the password modal
      setPassword(''); // Reset password
    } catch (err) {
      setError('Failed to update admin.');
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setNewEmail('');
    setError('');
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setPassword('');
  };

  if (loading) {
    // return <p  className='load' style={{  color: '#f5f5f5' }}>Loading ...</p>;
  }

  return (
    <div className="admin-list-container">
      <header className="list-of-admin-header">
        <h1>Admin List</h1>
      </header>
      {loading ? (
        <div className="loading-container">
          <p className="load">Loading...</p>
        </div>
      ) : (
      <div className="admin-list-main">
      <ul>
        {admins.map((admin, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div className="edit-mode">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="New Admin Email"
                />
                <button onClick={handleSaveClick}>Save</button>
                <button className='cancel-click' onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div className="admin-info">
                <span className="admin-email">{admin}</span>
                <button onClick={() => handleEditClick(index)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      </div> 
    )}

    {/* Password Modal */}
    {showPasswordModal && (
      <div className="modal-admin">
        <div className="modal-admin-content">
          
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          /> {error && <p className="error-message">{error}</p>}
          <button onClick={handlePasswordSubmit}>Submit</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default ListOfAdmin;
