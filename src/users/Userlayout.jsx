import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import UserSidebar from "./UserSidebar";
import "../allCss/userlayout.css";

function Userlayout() {
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    aadharNumber: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch Firestore user details
        const docRef = doc(db, `users/${currentUser.email}`);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          const userDetails = userDoc.data().userDetails;
          setUserData({
            displayName: currentUser.displayName || userDetails[0],
            email: currentUser.email,
            phoneNumber: userDetails[1],
            aadharNumber: userDetails[2],
            address: userDetails[3],
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
    setShowUpdateUser(false); // Ensure update form is closed when opening profile
  };

  const toggleUpdateUser = () => {
    setShowUpdateUser(!showUpdateUser);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: userData.displayName,
      });

      const docRef = doc(db, `users/${auth.currentUser.email}`);

      await updateDoc(docRef, {
        userDetails: [
          userData.displayName,
          userData.phoneNumber,
          userData.aadharNumber,
          userData.address,
        ],
      });

      alert("Profile updated successfully!");
      setShowUpdateUser(false); // Close update form
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="user-layout">
      <div className="ocean">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={`bubble bubble--${index + 1}`}></div>
        ))}
      </div>
      <UserSidebar />

      <div className="profile-container">
        {/* Circular User Icon */}
        <div className="profile-icon" onClick={toggleExpansion}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="#ffffff"
          >
            <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 12c-5.523 0-10 4.477-10 10h2c0-4.418 3.582-8 8-8s8 3.582 8 8h2c0-5.523-4.477-10-10-10z" />
          </svg>
        </div>

        {/* Glass Effect Card */}
        {isExpanded && (
          <div className="profile-card">
            {user ? (
              <>
                <span className="profile-email">{user.email}</span>
                <div className="profile-actions">
                  <button
                    className="profile-action-button"
                    onClick={toggleUserProfile}
                  >
                    Edit Details
                  </button>
                  <button
                    className="profile-action-button"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <span>Loading user info...</span>
            )}
          </div>
        )}
      </div>

      {/* Overlay for User Profile */}
      {showUserProfile && (
        <div className="overlay22">
          <div
            className="profile-container-show-user"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className="curve-path"></div> */}
            <button
              className="close-button"
              onClick={() => setShowUserProfile(false)}
            >
              X
            </button>
            <div className="basic-user-details">
              <span className="profile-email-show-user">{userData.email}</span>
              <span className="profile-name-show-user">
                Name: {userData.displayName || "error"}
              </span>
            </div>
            <hr />
            <div className="profile-info-show-user">
              <div className="profile-phone-show-user">
                Phone Number: {userData.phoneNumber}
              </div>
              <div className="profile-aadhar-show-user">
                Aadhar Number: {userData.aadharNumber}
              </div>
              <div className="profile-address-show-user">
                Address: {userData.address}
              </div>
            </div>
            <hr />
            <button className="update-button" onClick={toggleUpdateUser}>
              Update Details
            </button>
          </div>
        </div>
      )}

      {/* Overlay for Update User Details */}
      {showUpdateUser && (
        <div className="overlay22">
          <div
            className="update-form-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className="close-button-container"> 
             
            </div> */}
            <button
              className="close-button "
              onClick={() => setShowUpdateUser(false)}
            >
              X
            </button>
            <h3>Update Your Details</h3>

            <label>
              Display Name:
              <input
                type="text"
                name="displayName"
                value={userData.displayName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Aadhar Number:
              <input
                type="text"
                name="aadharNumber"
                value={userData.aadharNumber}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button onClick={handleUpdate}>Save Changes</button>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Userlayout;
