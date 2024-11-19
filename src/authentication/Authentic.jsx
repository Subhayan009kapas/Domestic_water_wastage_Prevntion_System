import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import '../allCss/authentic.css';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebaseConfig';

const Authentic = () => {
   const [isUserLogin, setIsUserLogin] = useState(true);
   const [isLoginMode, setIsLoginMode] = useState(true);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState(''); // Name field
   const [phoneNumber, setPhoneNumber] = useState(''); // Phone field
   const [aadharNumber, setAadharNumber] = useState(''); // Aadhar field
   const [address, setAddress] = useState(''); // Address field
   const [loading, setLoading] = useState(false); // Loader state
   const [popupMessage, setPopupMessage] = useState(''); // Popup message
   const [isAdmin, setIsAdmin] = useState(false); // Track the user role
   const navigate = useNavigate();

   const handleToggleRole = () => setIsUserLogin(!isUserLogin);
   const handleToggleMode = () => setIsLoginMode(!isLoginMode);

   const showPopup = (message) => {
      setPopupMessage(message);
      setTimeout(() => {
         setPopupMessage('');
      }, 3000);
   };

   const handleLogin = async () => {
      setLoading(true); // Show loader
      try {
        // Step 1: Attempt to sign in the user
        await signInWithEmailAndPassword(auth, email, password);
        
        // Step 2: Get the currently authenticated user's email
        const userEmail = auth.currentUser?.email;
        
        if (!userEmail) {
          throw new Error('Authentication failed: No user logged in');
        }
    
        // Step 3: Check if the authenticated user is an admin
        const adminDocRef = doc(db, 'admin', '01ListOfAdmin');
        const adminDoc = await getDoc(adminDocRef);
    
        if (adminDoc.exists()) {
          const adminData = adminDoc.data();
          const isAdmin = adminData.admins.includes(userEmail); // Check if the user is an admin
    
          // Step 4: Navigate based on the user's role
          if (isAdmin) {
            // User is an admin, navigate to the admin dashboard
            navigate('/admin/setlimit'); // Adjust this route based on your app
          } else {
            // User is a regular user, navigate to user-specific page
            navigate('/user/waterflow'); // Adjust this route based on your app
          }
        } else {
          // If the admin document doesn't exist, assume the user is not an admin
          console.error('Admin document not found');
          navigate('/user/waterflow'); // Redirect to the user dashboard as fallback
        }
    
      } catch (error) {
        // Handle errors (e.g., incorrect credentials, Firestore access issues)
        showPopup(`Login Error: ${error.message}`);
      } finally {
        setLoading(false); // Hide loader
      }
    };

    const handleRegister = async () => {
      setLoading(true); // Show loader
      try {
        // Step 1: Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userEmail = userCredential.user.email; // Get the email of the newly registered user
    
        if (!userEmail) {
          throw new Error('Registration failed: No user email found');
        }
    
        // Step 2: Check if the user is an admin
        const adminDocRef = doc(db, 'admin', '01ListOfAdmin');
        const adminDoc = await getDoc(adminDocRef);
    
        if (adminDoc.exists()) {
          const adminData = adminDoc.data();
          if (isAdmin) {
            // If the user is an admin, add them to the admin list
            const updatedAdmins = [...adminData.admins, userEmail];
            await updateDoc(adminDocRef, { admins: updatedAdmins });
          }
        } else {
          // If admin document does not exist, create it with the new admin if needed
          if (isAdmin) {
            await setDoc(adminDocRef, { admins: [userEmail] });
          }
        }
    
        // Step 3: Create a user document in Firestore under 'users/{email}'
        const userDocRef = doc(db, 'users', userEmail); // Using email as user document ID
        await setDoc(userDocRef, {
          userDetails: [name, phoneNumber, aadharNumber, address] // Save user details
        });
    
        // Step 4: Set up default collections (monthly collections)
        const collections = ['currentMonth', 'jan24', 'feb24', 'mar24', 'apr24', 'may24', 'jun24', 'jul24', 'aug24', 'sep24', 'oct24', 'nov24', 'dec24'];
        for (const collection of collections) {
          // Create documents for each monthly collection
          const servoControlDocRef = doc(db, 'users', userEmail, collection, 'servoControl');
          const waterflowSensorDocRef = doc(db, 'users', userEmail, collection, 'waterflowSensor');
          const padiConformationDocRef = doc(db, 'users', userEmail, collection, 'paidStatus');
          await setDoc(servoControlDocRef, { servoState: false });
          await setDoc(waterflowSensorDocRef, { totalusages: 0 });
          await setDoc(padiConformationDocRef, { paid: false, paid_date: '', razorpay_payment_id: '' });
        }
    
        // Step 5: Show success message and navigate based on user role
        showPopup('Registration successful!');
        navigate(isAdmin ? "/admin/setlimit" : "/user/waterflow");
    
      } catch (error) {
        // Handle errors
        showPopup(`Registration Error: ${error.message}`);
      } finally {
        setLoading(false); // Hide loader
      }
    };
   const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();
      try {
         const result = await signInWithPopup(auth, provider);
         const user = result.user;
         const email = user.email; // Get user's email from the Google account
         
         // Check if the user is already registered in Firestore
         const userDocRef = doc(db, 'users', email);
         const userDoc = await getDoc(userDocRef);
         
         if (!userDoc.exists()) {
            // If user doesn't exist in Firestore, create a new entry
            await setDoc(userDocRef, {
               userDetails: [user.displayName, '', '', ''] // Only name available from Google, rest can be updated later
            });
   
            // Create subcollections and documents for currentMonth, jan24, feb24, etc.
            const collections = ['currentMonth', 'jan24', 'feb24', 'mar24', 'apr24', 'may24', 'jun24' , 'jul24' , 'aug24', 'sep24', 'oct24', 'nov24' , 'dec24']; // Add more months as needed
            for (const collection of collections) {
               const servoControlDocRef = doc(db, 'users', email, collection, 'servoControl');
               const waterflowSensorDocRef = doc(db, 'users', email, collection, 'waterflowSensor');
               const padiConformationDocRef = doc(db, 'users', email, collection, 'paidStatus');
      
               // Initialize servoControl and waterflowSensor documents
               await setDoc(servoControlDocRef, { servoState: false }); // Default state
               await setDoc(waterflowSensorDocRef, { totalusages: 0 }); // Default usage
               await setDoc(padiConformationDocRef, { paid: false });
            }
         }
   
         // Check if the user is an admin
         const adminDocRef = doc(db, 'admin', '01ListOfAdmin');
         const adminDoc = await getDoc(adminDocRef);
         
         if (adminDoc.exists()) {
            const adminData = adminDoc.data();
            const isAdmin = adminData.admins.includes(email); // Check if the email is in the admins array
   
            // Throw error if user selects wrong role
            if (isUserLogin && isAdmin) {
               setError('This account belongs to an admin. Please select Authority to log in.');
            } else if (!isUserLogin && !isAdmin) {
               setError('This account belongs to a user. Please select User to log in.');
            } else {
               // Navigate based on role
               navigate(isUserLogin ? "/user/waterflow" : "/admin/setlimit");
            }
         } else {
            console.error("Admin document does not exist.");
            navigate("/user/waterflow"); // Redirect to user page as a fallback
         }
      } catch (error) {
         setError(`Google Login Error: ${error.message}`);
      }
   };
         

   return (
      <div className="auth-container">
         <div className="auth-header">
            <button className={`role-button ${isUserLogin ? 'active' : ''}`} onClick={handleToggleRole}>
               User
            </button>
            <button className={`role-button ${!isUserLogin ? 'active' : ''}`} onClick={handleToggleRole}>
               Authority
            </button>
         </div>
         <div className="auth-card">
            <h1>{isUserLogin ? (isLoginMode ? "User Login" : "User Register") : (isLoginMode ? "Authority Login" : "Authority Register")}</h1>
            {!isLoginMode && (
               <>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Name"
                     className="auth-input"
                  />
                  <input
                     type="text"
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     placeholder="Phone Number"
                     className="auth-input"
                  />
                  <input
                     type="text"
                     value={aadharNumber}
                     onChange={(e) => setAadharNumber(e.target.value)}
                     placeholder="Aadhar Number"
                     className="auth-input"
                  />
                  <input
                     type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     placeholder="Address"
                     className="auth-input"
                  />
               </>
            )}
            <input
               type="text"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Email"
               className="auth-input"
            />
            <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Password"
               className="auth-input"
            />
            {popupMessage && (
               <div className="popup-auth">
                  <div className="popup-message">{popupMessage}</div>
               </div>
            )}
            {loading &&   <div className="popup-auth"><div className="loader-auth"></div></div>} {/* Loader */}
            {isLoginMode ? (
               <>
                  <button onClick={handleLogin} className="auth-button">Login</button>
                  <button onClick={handleGoogleLogin} className="google-button">Sign in with Google</button>
                  {isUserLogin && (
                     <p style={{color:"white"}}>Don't have an account? <button onClick={handleToggleMode} className="toggle-button-register">Register</button></p>
                  )}
               </>
            ) : (
               <>
                  <button onClick={handleRegister} className="auth-button">Register</button>
                  <p style={{color:"white"}}>Already have an account? </p>
                  <button onClick={handleToggleMode} className="toggle-button">Login</button>
               </>
            )}
         </div>
      </div>
   );
};

export default Authentic;

