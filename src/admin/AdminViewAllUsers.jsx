import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc,onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // Adjust the path as necessary
import { onAuthStateChanged } from "firebase/auth";
import { monthCode } from '../assets/globalMonthData'; 
import '../allCss/adminViewAllUser.css'; 

const AdminDashboard = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search
  
  const [user, setUser] = useState(null);
  const [penaltyPrice, setPenaltyPrice] = useState(0);
  const [regularPrice, setRegularPrice] = useState(0);
  const [regularLimit, setRegularLimit] = useState(100); // Regular limit set to 100 liters
  const [penaltyLimit, setPenaltyLimit] = useState(150); // Penalty limit set to 150 liters

  const [isPriceFetched, setIsPriceFetched] = useState(false);
  const [isLimitFetched, setIsLimitFetched] = useState(false);

  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    aadharNumber: '',
    address: ''
  });

   // Track auth state and user details in Firestore  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Fetch Firestore user details
        const docRef = doc(db, `users/${user.email}`);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          const userDetails = userDoc.data().userDetails;
          setUserData({
            displayName: user.displayName || userDetails[0],
            email: user.email,
            phoneNumber: userDetails[1],
            aadharNumber: userDetails[2],
            address: userDetails[3]
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);


  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);

      const allUsersData = [];

      // Iterate through each user document
      querySnapshot.forEach((doc) => {
        allUsersData.push({
          userId: doc.id,
        });
      });

      return allUsersData;
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  // Fetch a specific user's data for a given month
  const fetchUserDataForMonth = async (userId, month) => {
    try {
      const servoControlDocRef = doc(db, 'users', userId, month, 'servoControl');
      const waterFlowDocRef = doc(db, 'users', userId, month, 'waterflowSensor');

      const [servoControlSnap, waterFlowSnap] = await Promise.all([
        getDoc(servoControlDocRef),
        getDoc(waterFlowDocRef),
      ]);

      return {
        servoState: servoControlSnap.exists() ? servoControlSnap.data().servoState : 'No Data',
        totalUsage: waterFlowSnap.exists() ? waterFlowSnap.data().totalusages : 'No Data',
      };
    } catch (error) {
      console.error("Error fetching user's monthly data: ", error);
    }
  };

  // Fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const docRef = doc(db, `users/${userId}`);
      const userDoc = await getDoc(docRef);
      
      if (userDoc.exists()) {
        const userDetails = userDoc.data().userDetails;
        return {
          displayName: userDetails[0],
          phoneNumber: userDetails[1],
          aadharNumber: userDetails[2],
          address: userDetails[3],
        };
      }
      return {}; // Return an empty object if user does not exist
    } catch (error) {
      console.error("Error fetching user details: ", error);
      return {};
    }
  };

  // Fetch data for all users
  const fetchAllUsersData = async () => {
    try {
      const allUsers = await fetchAllUsers();

      const allUsersDataWithDetails = await Promise.all(
        allUsers.map(async (user) => {
          const currentMonthData = await fetchUserDataForMonth(user.userId, 'currentMonth');
          const jan24Data = await fetchUserDataForMonth(user.userId, 'jan24');
          const feb24Data = await fetchUserDataForMonth(user.userId, 'feb24');
          const mar24Data = await fetchUserDataForMonth(user.userId, 'mar24');
          const apr24Data = await fetchUserDataForMonth(user.userId, 'apr24');
          const may24Data = await fetchUserDataForMonth(user.userId, 'may24');
          const jun24Data = await fetchUserDataForMonth(user.userId, 'jun24');
          const jul24Data = await fetchUserDataForMonth(user.userId, 'jul24');
          const aug24Data = await fetchUserDataForMonth(user.userId, 'aug24');
          const sep24Data = await fetchUserDataForMonth(user.userId, 'sep24');
          const oct24Data = await fetchUserDataForMonth(user.userId, 'oct24');
          const nov24Data = await fetchUserDataForMonth(user.userId, 'nov24');
          const dec24Data = await fetchUserDataForMonth(user.userId, 'dec24');

          return {
            userId: user.userId,
            currentMonth: currentMonthData,
            jan24: jan24Data,
            feb24: feb24Data,
            mar24: mar24Data,
            apr24: apr24Data,
            may24: may24Data,
            jun24: jun24Data,
            jul24: jul24Data,
            aug24: aug24Data,
            sep24: sep24Data,
            oct24: oct24Data,
            nov24: nov24Data,
            dec24: dec24Data,
          };
        })
      );

      setAllUsersData(allUsersDataWithDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all users' data: ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
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
      unsubscribePrice();
      unsubscribeLimit();
    };
  }, [user]);
  // Fetch data on component mount
  useEffect(() => {
    fetchAllUsersData();
  }, []);

  // Handler for viewing user details
  async function handleViewDetails (user)  {
    const userDetails = await fetchUserDetails(user.userId); // Fetch user details
    setSelectedUser({ ...user, userDetails }); // Set selected user with fetched details
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  // Filter users based on search query
  const filteredUsers = allUsersData.filter(user =>
    user.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const totalUsage = selectedUser?.currentMonth.totalUsage || 0; // Default to 0 if null
  console.log( selectedUser?.currentMonth.totalUsage);
  
  const regularUsage = Math.min(totalUsage, regularLimit) || 0;
  const penaltyUsage = totalUsage > regularLimit ? totalUsage - regularLimit : 0 || 0;

  const regularPriceTotal = regularUsage * regularPrice || 0;
  const penaltyPriceTotal = penaltyUsage * penaltyPrice || 0;
  const totalPrice = regularPriceTotal + penaltyPriceTotal || 0;

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h1>All Users Data</h1>
      </header>
      
      <main className="admin-dashboard-main">
        {loading ? (
          <div className="loading-container">
            <p className="load">Loading...</p>
          </div>
        ) : (
          <>
            <div className="search-and-table">
              <div className="search-bar-User">
                <input 
                  type="text" 
                  placeholder='Search by ID'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg 
                  version="1.1" 
                  id="Layer_1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlnsXlink="http://www.w3.org/1999/xlink" 
                  width="20px" 
                  height="20px" 
                  viewBox="0 0 122.879 119.799" 
                  enableBackground="new 0 0 122.879 119.799" 
                  xmlSpace="preserve"
                  className="search-icon"
                >
                    <path fill='#ffff' d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z"/>
                </svg>
              </div>

              <table className="admin-dashboard-table">
                <thead className='search-bar-user-heading'>
                  <tr>
                    <th>User ID</th>  
                    <th>Current Servo State</th>
                    <th>Current Month Usage</th> 
                    <th>Due Bill</th>
                    <th>View  </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const totalUsage = user.currentMonth.totalUsage || 0; // Default to 0 if null
                    const regularUsage = Math.min(totalUsage, regularLimit);
                    const penaltyUsage = totalUsage > regularLimit ? totalUsage - regularLimit : 0;

                    const regularPriceTotal = regularUsage * regularPrice;
                    const penaltyPriceTotal = penaltyUsage * penaltyPrice;
                    const totalPrice = regularPriceTotal + penaltyPriceTotal;

                    return (
                      <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td style={{ backgroundColor: user.currentMonth.servoState ? 'rgba(58, 255, 76, 0.35)' : 'rgba(254, 0, 0, 0.42)', textAlign:'center' , borderRadius:'1rem'}}>{user.currentMonth.servoState ? 'On' : 'Off'}</td>
                        <td style={{textAlign:'center'}}>{user.currentMonth.totalUsage}</td>
                        <td style={{textAlign:'center'}}>{totalPrice.toFixed(2)} {/* Format to 2 decimal places */}</td>
                        <td>
                          <button 
                            className='userViewDetails' 
                            onClick={() => handleViewDetails(user)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </>
        )}
      </main>

      {/* Modal for User Details */}
      {selectedUser && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content-selected-user" onClick={(e) => e.stopPropagation()}>
          
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <div className="user-details">
          
                {/* <div className="curve-path"></div> */}
                <button className="close-button" onClick={handleCloseModal}>X</button>
                  <div className="basic-user-details-">
                    <h2>User Details</h2>
                    <span className="profile-email-show-user">{selectedUser.userId}</span>
                    <span className="profile-name-show-user">Name: {selectedUser.userDetails.displayName  || "N/A"}</span>
                  </div>
                  <hr />
                  <div className="profile-info-show-user">
                    <div className="profile-phone-show-user">Phone Number: {selectedUser.userDetails.phoneNumber ||"N/A"}</div>
                    <div className="profile-aadhar-show-user">Aadhar Number: {selectedUser.userDetails.aadharNumber ||"N/A"}</div>
                    <div className="profile-address-show-user">Address: {selectedUser.userDetails.address ||"N/A"}</div>
                  </div> 
                   <hr/>  
              <h2>Usages Details</h2>
              <div className="user-view-used-details">
                <div className="servo-and-price-box">
                  <div className="servo-state-box ">
                    <p><strong>Servo State :</strong> {selectedUser.currentMonth.servoState ? 'On' : 'Off'}</p>
                  </div>
                  <div className=" servo-state-box price-box">
                    <p><strong>Due Bills :</strong> {totalPrice.toFixed(2)}</p>
                  </div>
                </div>

{/* new */}
                
                {/* {Object.keys(monthCode).map((key) => {
                  const monthData = selectedUser[key + '24'];
                  
                  if (monthData) {
                    return (
                      <div key={key} className="month-box">
                           <h4>{monthCode[key]}</h4>
                            <p><strong>Total Usaged:</strong> {monthData.totalUsage}</p>
                      </div>
                    );
                  }
                  return null;
                })} */}
                {Object.keys(monthCode).map((key, index) => {
                  const monthData = selectedUser[key + '24'];
                  
                  // Check if the month has valid data and usage is not zero
                  if (monthData && monthData.totalUsage > 0) {
                    return (
                      <div key={key} className="month-box">
                        <h4>{monthCode[key]}</h4>
                        <p><strong>Total Usage:</strong> {monthData.totalUsage}</p>
                      </div>
                    );
                  }

                    return null; // Skip the months after the first zero-usage month
                  })}

                 <div className=' current-month-box'><h4>Current month </h4>
                   <p> Total Usage: {selectedUser.currentMonth.totalUsage}</p>
                 </div> 
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
