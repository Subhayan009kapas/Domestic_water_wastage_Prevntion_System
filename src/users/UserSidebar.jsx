import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../allCss/sidebar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from '../firebaseConfig'; // Import Firebase auth
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure you import Firestore database

function UserSidebar() {
  const [username, setUsername] = useState(""); // State to hold username
  const[isExpanded, setIsExpanded] = useState(true)

   function HandleExpansion(){
    const newvar = !isExpanded
    setIsExpanded(!isExpanded)
  }
  const user = auth.currentUser; // Get the logged-in user

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.email); // Reference to the user's document
        const userDoc = await getDoc(userDocRef); // Get the document
        
        if (userDoc.exists()) {
          const userDetails = userDoc.data().userDetails; // Access userDetails array
          setUsername(userDetails[0]); // Set the username from the 0th index
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserDetails();
  }, [user]);
  return (
    <>
        <button className='expand-sidenavabr' onClick={HandleExpansion}> 
        {isExpanded ?(<div className='sidebar-close-button'><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.883px" height="122.882px" viewBox="0 0 122.883 122.882" enable-background="new 0 0 122.883 122.882" xml:space="preserve"><g><path fill='#ffff' d="M61.441,0L61.441,0l0.001,0.018c16.974,0,32.335,6.872,43.443,17.98s17.98,26.467,17.98,43.441h0.018v0.002l0,0h-0.018 c0,16.976-6.873,32.335-17.98,43.443c-11.109,11.107-26.467,17.979-43.442,17.979v0.018h-0.002l0,0v-0.018 c-16.975,0-32.335-6.872-43.443-17.98C6.89,93.775,0.018,78.417,0.018,61.442H0v-0.001V61.44h0.018 c0-16.975,6.872-32.334,17.98-43.443C29.106,6.89,44.465,0.018,61.44,0.018L61.441,0L61.441,0L61.441,0z M71.701,42.48 c1.908-1.962,1.863-5.101-0.098-7.009c-1.963-1.909-5.102-1.865-7.01,0.097L42.755,58.088l3.553,3.456l-3.568-3.46 c-1.911,1.971-1.863,5.118,0.108,7.029c0.058,0.056,0.116,0.109,0.175,0.162l21.571,22.057c1.908,1.962,5.047,2.006,7.01,0.097 c1.961-1.908,2.006-5.047,0.098-7.01L53.227,61.529L71.701,42.48L71.701,42.48z"/></g></svg></div> )
        :
       (<div className='sidebar-open-button'><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.88px" height="122.88px" viewBox="0 0 122.88 122.88" enable-background="new 0 0 122.88 122.88" xml:space="preserve"><g><path fill='#ffff' d="M61.439,0L61.439,0v0.016c-16.976,0-32.335,6.874-43.443,17.981S0.016,44.464,0.016,61.438H0v0.002l0,0h0.016 c0,16.978,6.874,32.336,17.981,43.444c11.107,11.106,26.467,17.98,43.441,17.98v0.016h0.002l0,0v-0.016 c16.977,0,32.336-6.874,43.443-17.98c11.107-11.108,17.981-26.467,17.981-43.441h0.016v-0.003l0,0h-0.016 c0-16.976-6.874-32.335-17.981-43.442S78.416,0.016,61.442,0.016V0H61.439L61.439,0z M51.181,42.479 c-1.909-1.964-1.864-5.1,0.098-7.01c1.961-1.909,5.1-1.866,7.009,0.098l21.838,22.519l-3.554,3.456l3.569-3.458 c1.91,1.971,1.862,5.116-0.108,7.027c-0.057,0.057-0.115,0.109-0.175,0.161L58.288,87.329c-1.909,1.963-5.048,2.007-7.009,0.097 c-1.962-1.907-2.007-5.045-0.098-7.009l18.473-18.889L51.181,42.479L51.181,42.479z"/></g></svg></div>)}</button>
        
      <div style={{width:isExpanded ? '80%':'5rem'}} className="sidenav">
        <br></br>
        {isExpanded? (
         <img src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png" height={"150rem"} className='user-profile-icon-sidebar'/>
        ):( <div className="sidenavimg"></div> )}
        <br></br>
        
          <h1 >{username}</h1>
         
        <br></br>
        {/* <br></br> */}
        
        
        <div className="nav-item">
          <NavLink to="/user/waterflow" className="nav-link">
            <div className="userIinnerNavbar">
              <svg 
                style={{width:'1.4rem'}}
                version="1.1" 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                // x="0px" 
                // y="0px" 
                viewBox="0 0 122.88 122.566" 
                enableBackground="new 0 0 122.88 122.566" 
                xmlSpace="preserve"
                >
                <g>
                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        fill="#ffff" 
                        d="M3.78,66.082h47.875c2.045,0,3.717,1.988,3.717,4.414v46.479c0,2.43-1.671,4.416-3.717,4.416H3.78 c-2.043,0-3.717-1.986-3.717-4.416V70.496C0.063,68.07,1.737,66.082,3.78,66.082L3.78,66.082z M71.224,0H119.1 c2.046,0,3.717,1.986,3.717,4.415v46.479c0,2.429-1.671,4.413-3.717,4.413H71.224c-2.045,0-3.714-1.984-3.714-4.413V4.415 C67.51,1.986,69.179,0,71.224,0L71.224,0z M3.714,0h47.878c2.045,0,3.717,1.986,3.717,4.415v46.479c0,2.429-1.671,4.413-3.717,4.413H3.714 C1.671,55.307,0,53.323,0,50.894V4.415C0,1.986,1.671,0,3.714,0L3.714,0z M71.287,67.26h47.876c2.043,0,3.717,1.986,3.717,4.416v46.479 c0,2.426-1.674,4.412-3.717,4.412H71.287c-2.045,0-3.717-1.986-3.717-4.412V71.676C67.57,69.246,69.242,67.26,71.287,67.26L71.287,67.26z"
                    />
                </g>
            </svg>
           <p className='nav-name'>Dashboard </p> 
          </div>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/user/servocontrol" className="nav-link">
          <div className="userIinnerNavbar">
                <svg 
                  version="1.1" 
                  id="Layer_1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlnsXlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 122.23 122.88" 
                  style={{ enableBackground: 'new 0 0 122.23 122.88' ,width:'1.4rem'}} 
                  xmlSpace="preserve"
                 // Maintain aspect ratio
              >
                  <style type="text/css">{`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}</style>
                  <g>
                      <path fill="#ffff" 
                          className="st0" 
                          d="M122.23,12.35v10.54c0,1.29-1.21,2.35-2.69,2.35H77.85c-2.84,5.92-8.89,10.01-15.9,10.01c-7,0-13.05-4.09-15.89-10.01H2.69C1.22,25.24,0,24.18,0,22.89V12.35C0,11.06,1.21,10,2.69,10h43.37c2.84-5.92,8.89-10,15.89-10c7,0,13.05,4.09,15.89,10h41.69C121.02,10,122.23,11.06,122.23,12.35L122.23,12.35L122.23,12.35z M49.57,112.88c-2.84,5.92-8.89,10-15.9,10c-7,0-13.05-4.08-15.89-10l-15.09,0c-1.48,0-2.69-1.06-2.69-2.35V99.99c0-1.29,1.21-2.35,2.69-2.35l15.09,0c2.84-5.92,8.89-10.01,15.89-10.01c7,0,13.05,4.09,15.89,10.01h69.97c1.48,0,2.69,1.06,2.69,2.35v10.54c0,1.29-1.22,2.35-2.69,2.35L49.57,112.88L49.57,112.88z M104.12,69.73c-2.84,5.92-8.89,10.01-15.89,10.01c-7,0-13.05-4.09-15.9-10.01H2.69C1.22,69.73,0,68.67,0,67.38V56.85c0-1.29,1.21-2.35,2.69-2.35h69.64c2.84-5.92,8.89-10,15.89-10c7,0,13.05,4.09,15.89,10h15.42c1.48,0,2.69,1.06,2.69,2.35v10.53c0,1.29-1.21,2.35-2.69,2.35H104.12L104.12,69.73z"
                      />
                  </g>
              </svg>
            <p className='nav-name'>Gate Control</p>
          </div>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/user/viewanalytics" className="nav-link">
           <div className="userIinnerNavbar" style={{width: "90%"}}>
           <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 513.11"><path fill-rule="nonzero" fill='#ffff' d="M210.48 160.8c0-14.61 11.84-26.46 26.45-26.46s26.45 11.85 26.45 26.46v110.88l73.34 32.24c13.36 5.88 19.42 21.47 13.54 34.82-5.88 13.35-21.47 19.41-34.82 13.54l-87.8-38.6c-10.03-3.76-17.16-13.43-17.16-24.77V160.8zM5.4 168.54c-.76-2.25-1.23-4.64-1.36-7.13l-4-73.49c-.75-14.55 10.45-26.95 25-27.69 14.55-.75 26.95 10.45 27.69 25l.74 13.6a254.258 254.258 0 0136.81-38.32c17.97-15.16 38.38-28.09 61.01-38.18 64.67-28.85 134.85-28.78 196.02-5.35 60.55 23.2 112.36 69.27 141.4 132.83.77 1.38 1.42 2.84 1.94 4.36 27.86 64.06 27.53 133.33 4.37 193.81-23.2 60.55-69.27 112.36-132.83 141.39a26.24 26.24 0 01-12.89 3.35c-14.61 0-26.45-11.84-26.45-26.45 0-11.5 7.34-21.28 17.59-24.92 7.69-3.53 15.06-7.47 22.09-11.8.8-.66 1.65-1.28 2.55-1.86 11.33-7.32 22.1-15.7 31.84-25.04.64-.61 1.31-1.19 2-1.72 20.66-20.5 36.48-45.06 46.71-71.76 18.66-48.7 18.77-104.46-4.1-155.72l-.01-.03C418.65 122.16 377.13 85 328.5 66.37c-48.7-18.65-104.46-18.76-155.72 4.1a203.616 203.616 0 00-48.4 30.33c-9.86 8.32-18.8 17.46-26.75 27.29l3.45-.43c14.49-1.77 27.68 8.55 29.45 23.04 1.77 14.49-8.55 27.68-23.04 29.45l-73.06 9c-13.66 1.66-26.16-7.41-29.03-20.61zM283.49 511.5c20.88-2.34 30.84-26.93 17.46-43.16-5.71-6.93-14.39-10.34-23.29-9.42-15.56 1.75-31.13 1.72-46.68-.13-9.34-1.11-18.45 2.72-24.19 10.17-12.36 16.43-2.55 39.77 17.82 42.35 19.58 2.34 39.28 2.39 58.88.19zm-168.74-40.67c7.92 5.26 17.77 5.86 26.32 1.74 18.29-9.06 19.97-34.41 3.01-45.76-12.81-8.45-25.14-18.96-35.61-30.16-9.58-10.2-25.28-11.25-36.11-2.39a26.436 26.436 0 00-2.55 38.5c13.34 14.2 28.66 27.34 44.94 38.07zM10.93 331.97c2.92 9.44 10.72 16.32 20.41 18.18 19.54 3.63 36.01-14.84 30.13-33.82-4.66-15-7.49-30.26-8.64-45.93-1.36-18.33-20.21-29.62-37.06-22.33C5.5 252.72-.69 262.86.06 274.14c1.42 19.66 5.02 39 10.87 57.83z"/></svg>
            <p className='nav-name'>History</p>
            </div>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/user/payment" className="nav-link">
           <div className="userIinnerNavbar" style={{width: "90%"}}>
           <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 117.34 122.88"
                style={{ enableBackground: "new 0 0 117.34 122.88" }}
                xmlSpace="preserve"
              >
                <style type="text/css">
                  {`.st0 { fill-rule: evenodd; clip-rule: evenodd; }`}
                </style>
                <g>
                  <path
                    className="st0" fill='#ffff'
                    d="M85.14,14.83L43.26,40.28h11.91l30.92-18.79l4.54-2.76l13.09,21.55h7.62c1.66,0,3.16,0.68,4.25,1.76l0,0
                      c1.09,1.09,1.77,2.59,1.77,4.24v70.59c0,1.65-0.68,3.15-1.76,4.23v0.01c-1.09,1.09-2.59,1.76-4.25,1.76l-105.33,0
                      c-1.66,0-3.16-0.67-4.25-1.76v-0.01C0.68,120.02,0,118.52,0,116.88V46.28c0-1.65,0.68-3.16,1.76-4.24
                      c1.09-1.09,2.59-1.76,4.25-1.76h2.5L73.53,0.77v0C74.36,0.27,75.3,0,76.27,0c0.42,0,0.84,0.05,1.25,0.15
                      c1.36,0.33,2.54,1.19,3.26,2.39v0l6.63,10.91L85.14,14.83L85.14,14.83L85.14,14.83z M5.89,45.62c-0.23,0.25-0.42,0.53-0.56,0.84
                      v8.69h106.68v-8.87c0-0.19-0.07-0.36-0.19-0.47h-0.01c-0.12-0.12-0.29-0.2-0.48-0.2H6.01C5.97,45.61,5.93,45.61,5.89,45.62
                      L5.89,45.62z M15.98,84.71h19.05v7.13H15.98V84.71L15.98,84.71z M15.98,101.59h53.25v6.43H15.98V101.59L15.98,101.59z
                      M86.21,84.71h19.05v7.13H86.21V84.71L86.21,84.71z M62.8,84.71h19.05v7.13H62.8V84.71L62.8,84.71z M39.39,84.71h19.05v7.13H39.39
                      V84.71L39.39,84.71z M112.01,75.14H5.33v41.73c0,0.19,0.07,0.36,0.2,0.48l0.01,0c0.13,0.13,0.3,0.2,0.47,0.2l105.33,0
                      c0.18,0,0.35-0.08,0.48-0.2l0,0c0.13-0.13,0.2-0.3,0.2-0.48v0V75.14L112.01,75.14z"
                  />
                </g>
              </svg>
             {isExpanded?(''):('')}
             <p className='nav-name'>Payments</p>
            </div>
          </NavLink>
        </div>

      </div>
    </>
  );
}

export default UserSidebar;