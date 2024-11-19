// import React from "react";
// import "../allCss/landing.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFaucetDrip,
//   faPaperPlane,
//   faHeartPulse,
//   faHandHoldingDroplet,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-scroll";
// import { NavLink } from "react-router-dom";
// function Home() {
//   return (
//     <>
//       <div className="hero" id="home">
//         <div className="overlay">
//           <div className="header">
//             <div className="logo">
//               <h1>
//                 <FontAwesomeIcon
//                   icon={faHandHoldingDroplet}
//                   className="logo-icon"
//                 />
//               </h1>
//             </div>
//             <div className="nav">
//               <ul>
//                 <li>
//                   <Link to="home">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="about">About Us</Link>
//                 </li>
//                 <li>
//                   <Link to="vision">Vision</Link>
//                 </li>
//                 <li>
//                   <Link to="blogs">Blogs</Link>
//                 </li>
//                 <li>
//                   <Link to="contact">Contact us</Link>
//                 </li>
//                 <li className="login">
//                   <NavLink to="/auth">
//                     {" "}
//                     <button>Login</button>
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="hero-text">
//             <h1 id="first-line">
//               Save Water <FontAwesomeIcon icon={faFaucetDrip} />{" "}
//             </h1>
//             <br></br>
//             <h1 id="second-line">
//               Save Life <FontAwesomeIcon icon={faHeartPulse} />{" "}
//             </h1>
//           </div>
//         </div>
//       </div>
//       {/* <NavLink to="/user/waterflow">user/waterflow</NavLink><br/>
//       <NavLink to="/user/servoControl">user/servo</NavLink><br/>
//       <NavLink to="/user/viewanalytics">user/viewanalytics</NavLink><br/>

//       <NavLink to="/admin/setlimit">/admin/setlimit</NavLink><br/>
//       <NavLink to="/admin/setprice">admin/setprice</NavLink><br/>
//       <NavLink to="/admin/viewusers">/admin/viewusers</NavLink><br/> */}

//        {/* About Section */}

//       <div className="about">
//         <div className="heading">
//           <h1
//             align="center"
//             style={{ fontSize: "2.5rem" }}
//             className="heading-text"
//           >
//             About us
//           </h1>
//         </div>

//         <div className="about-content">
//           <div className="text">
//             Efficient water management is essential for sustainable living. Our
//             Domestic Water Provision System, utilizing IoT kits, offers a
//             cutting-edge solution for household water needs. By providing
//             real-time monitoring and control, it minimizes water wastage,
//             optimizes distribution, and alerts users to potential issues. This
//             advanced system ensures that water resources are used efficiently,
//             supports conservation efforts, and helps households manage their
//             water needs effectively, making it a vital tool for a sustainable
//             future.
//           </div>
//           <div className="img">
//             <img
//               src="https://i.ibb.co/y6xqc5b/8d6a6f8d-b8aa-4d2c-8632-b1de2e939702.webp"
//               alt="8d6a6f8d-b8aa-4d2c-8632-b1de2e939702"
//               border="0"
//             />
//           </div>
//         </div>
//       </div>

//          {/* Vision Section */}

//       <div className="vision" id="vision">
//         <div className="heading">
//           <h1
//             align="center"
//             style={{ fontSize: "2.5rem" }}
//             className="heading-text"
//           >
//             Our Vision
//           </h1>
//         </div>

//         <div className="vision-content">
//           <div className="img">
//             <img
//               src="https://i.ibb.co/JC4D6wN/Firefly-createa-iamge-where-there-wilbw-one-one-monitor-by-which-the-the-authority-of-water-of-a-can.jpg"
//               alt="Firefly-createa-iamge-where-there-wilbw-one-one-monitor-by-which-the-the-authority-of-water-of-a-can"
//               border="0"
//             />
//           </div>
//           <div className="text">
//             Our vision for the Domestic Water Provision System is to
//             revolutionize water management in households by leveraging advanced
//             IoT technology. We aim to create a future where every home can
//             efficiently monitor and control their water usage, leading to
//             significant reductions in wastage and enhanced sustainability. By
//             providing innovative solutions that promote responsible water use,
//             we aspire to contribute to global conservation efforts and ensure a
//             reliable water supply for generations to come.
//           </div>
//         </div>
//       </div>

//       <div className="blogs" id="blogs">
//         <div className="heading">
//           <h1
//             align="center"
//             style={{ fontSize: "2.5rem" }}
//             className="heading-text"
//           >
//             Blogs
//           </h1>
//         </div>

//         <div className="blogs-content">
//           <div className="card">
//             <div className="img1"></div>
//             <br></br>
//             <FontAwesomeIcon icon={faFaucetDrip} className="tap" />
//             <h3>
//               <i className="fa-solid fa-faucet-drif"></i> Bengaluru Water Crisis
//               (2024):
//             </h3>
//             <br></br>
//             <p>
//               Bengaluru has been facing severe water shortages, exacerbated by
//               rapid urbanization and the destruction of lakes. The city's
//               over-reliance on groundwater, poor water management, with limited
//               access to clean water.
//             </p>
//           </div>
//           <div className="card">
//             <div className="img2"></div>
//             <br></br>
//             <FontAwesomeIcon icon={faFaucetDrip} className="tap" />
//             <h3>Hyderabad Water Crisis (2024): </h3>
//             <br></br>
//             <p>
//               Hyderabad is facing water stress due to irregular monsoons and
//               over-extraction of groundwater. The city's fast-growing population
//               has compounded the issue, leading to severe water shortages in
//               some regions.
//             </p>
//           </div>
//           <div className="card">
//             <div className="img3"></div>
//             <br></br>
//             <FontAwesomeIcon icon={faFaucetDrip} className="tap" />
//             <h3>Delhi Water Crisis (2024):</h3>
//             <br></br>
//             <p>
//               Delhi continues to struggle with water shortages due to a growing
//               population and depleting groundwater resources. Contaminated water
//               supplies and distribution inefficiencies have worsened the
//               situation
//             </p>
//           </div>
//           <div className="card">
//             <div className="img4"></div>
//             <br></br>
//             <FontAwesomeIcon icon={faFaucetDrip} className="tap" />
//             <h3>Mumbai Water Crisis (2024): </h3>
//             <br></br>
//             <p>
//               Despite receiving substantial rainfall, Mumbai suffers from water
//               shortages due to infrastructure inefficiencies and leakages. Many
//               densely populated areas frequently experience limited water
//               supply.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Contact Section */}

//       <div className="contact" id="contact">
//         <div className="heading">
//           <h1
//             align="center"
//             style={{ fontSize: "2.5rem" }}
//             className="heading-text"
//           >
//             Contact Us
//           </h1>
//         </div>

//         <div className="contact-content">
//           <div className="address-details">
//             <div className="over">
//               <img src="https://i.ibb.co/qWXNJYv/png-pic-contact.png" />
//             </div>
//           </div>
//           <div className="form">
//             <form>
//               <input type="text" placeholder="Your Name " />
//               <br></br>
//               <input type="email" placeholder="Your Email " />
//               <br></br>
//               <textarea
//                 id="messageBox"
//                 class="message-box"
//                 placeholder="Send Msg"
//               ></textarea>
//               <br></br>
//               <button>
//                 Send <FontAwesomeIcon icon={faPaperPlane} shake />
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <br></br>
//       <br></br>
//       <hr></hr>
//       <div className="copy-right">
//         <p>©2024 SKAB. All rights reserved.</p>
//       </div>
//     </>
//   );
// }

// export default Home;
import React, { useState } from "react";
import "../allCss/landing.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaucetDrip,
  faPaperPlane,
  faHeartPulse,
  faHandHoldingDroplet,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
function Home() {
  const [activetab , setActivetab]=useState(null)
  const navactive=(index)=>{
    setActivetab(index)
  }
  const tabStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "color 0.3s", // Smooth transition for color change
    color: "#333", // Default text color
  };

  // Active style for the active tab
  const activeStyle = {
    color: "transparent", // Make the actual text color transparent
    background: "linear-gradient(to right, #510ce5, #2faeed)", // Gradient for text
    WebkitBackgroundClip: "text", // For WebKit-based browsers
    backgroundClip: "text", // Standard syntax
    fontWeight: "bold", // Optional: Make it bold
  };

  const [sidePanelWidth, setSidePanelWidth] = useState("0");

  const openNav = () => {
    setSidePanelWidth("250px");
  };

  const closeNav = () => {
    setSidePanelWidth("0");
  };
  return (
    < div className="puro">
     <div
        id="mySidepanel"
        className="sidepanel"
        style={{ width: sidePanelWidth }}
      >
        <button className="closebtn" onClick={closeNav}>
          ×
        </button>
        <Link to="home"><img src="https://i.ibb.co/qrKzr3Z/home.png" alt="home" border="0" height={"35px"} style={{position:"relative" , top:"5px"}}/> Home</Link>
        <br></br>
        <Link to="about"><img src="https://i.ibb.co/0F49Dwp/resume.png" alt="resume" border="0" height={"35px"} style={{position:"relative" , top:"5px"}}/>About</Link>
        <br></br>
        <Link  to="vision"><img src="https://i.ibb.co/D16QSfj/vision-setting.png"alt="vision-setting" border="0" height={"35px"}></img> Vision</Link>
        <br></br>
        <Link  to="blogs"><img src="https://i.ibb.co/pj8xRDV/blogging-feed.png" alt="blogging-feed" border="0" height={"35px"}></img> Blogs</Link>
        <br></br>
        <Link to="contact"><img src="https://i.ibb.co/pK63FJN/contact-us-3.png" alt="contact-us-3" border="0" height={"35px"}/>  Contact</Link>
      </div>

      <div className="hero" id="home">
        <div className="overlay">
          <div className="header">
            <div className="logo">
              <img src="https://i.ibb.co/9hcFtsn/dwp-logo.png" />
            </div>

            <div className="nav">
              <ul >
                <li  style={activetab === 0 ? { ...tabStyle, ...activeStyle } : tabStyle }>
                  <Link to="home" onClick={()=>navactive(0)} >Home</Link>
                </li>
                <li   style={activetab === 1 ? { ...tabStyle, ...activeStyle } : tabStyle }>
                  <Link to="about" onClick={()=>navactive(1)} >About Us</Link>
                </li>
                <li  style={activetab === 2 ? { ...tabStyle, ...activeStyle } : tabStyle}>
                  <Link to="vision"  onClick={()=>navactive(2)}>Vision</Link>
                </li>
                <li  style={activetab === 3 ? { ...tabStyle, ...activeStyle } : tabStyle}>
                  <Link to="blogs"  onClick={()=>navactive(3)}>Blogs</Link>
                </li>
                <li style={activetab === 4 ? { ...tabStyle, ...activeStyle } : tabStyle } >
                  <Link to="contact" onClick={()=>navactive(4)}  >Contact us</Link>
                </li>
                <li className="login">
                  <NavLink to="/auth">
                    {" "}
                    <button>Login</button>
                  </NavLink>
                </li>
                 <button className="openbtn" onClick={openNav}>☰ 
      </button>
              </ul>
            </div>
          </div>
          {/* <div className="hero-text">
            <h1 id="first-line">
              Save Water <FontAwesomeIcon icon={faFaucetDrip} />{" "}
            </h1>
            <br></br>
            <h1 id="second-line">
              Save Life <FontAwesomeIcon icon={faHeartPulse} />{" "}
            </h1>
          </div> */}

      <motion.div
            className="hero-text"
            initial={{ x: "-100vw" }}  // Start off-screen to the left
            animate={{ x: 0 }}         // Animate to its original position
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }} // Add a spring effect with some delay
          >
            <h2 className="top-heading"><span style={{color:"darkblue"}}>Domestic Water Wastage  </span> <span style={{color:"white" , fontWeight:"100" ,textShadow:" 0px 0px 10px rgb(18, 15, 15)" , fontSize:"3.6rem"}}>Prevention System</span> <FontAwesomeIcon
                  icon={faHandHoldingDroplet}
                  
                /></h2>
           
             <h1 id="first-line">
              Save Water <FontAwesomeIcon icon={faFaucetDrip}  />{" "}
            </h1> 
            <br></br>
             <h1 id="second-line">
              Save Life <FontAwesomeIcon icon={faHeartPulse} beat/>{" "}
            </h1> 
            <div className="get_service">
            <NavLink to="/auth">
                          {" "}
                          <button>Get OurService</button>
                        </NavLink>
      </div>
      
     
    </motion.div>
        </div>
      </div>

       {/* About Section */}

      <div className="about">
        <div className="heading">
          <h1
            align="center"
            style={{ fontSize: "2.5rem" }}
            className="heading-text"
          >
           <img src="https://i.ibb.co/0F49Dwp/resume.png" alt="resume" border="0" height={"50px"} style={{position:"relative" , top:"5px"}}/> About us 
          </h1>
        </div>

        <div className="about-content">
          <div className="text">
            Efficient water management is essential for sustainable living. Our
            Domestic Water Provision System, utilizing IoT kits, offers a
            cutting-edge solution for household water needs. By providing
            real-time monitoring and control, it minimizes water wastage,
            optimizes distribution, and alerts users to potential issues. This
            advanced system ensures that water resources are used efficiently,
            supports conservation efforts, and helps households manage their
            water needs effectively, making it a vital tool for a sustainable
            future.
          </div>
          <div className="img">
            <img
              src="https://i.ibb.co/y6xqc5b/8d6a6f8d-b8aa-4d2c-8632-b1de2e939702.webp"
              alt="8d6a6f8d-b8aa-4d2c-8632-b1de2e939702"
              border="0"
            />
          </div>
        </div>
      </div>

         {/* Vision Section */}

      <div className="vision" id="vision">
        <div className="heading">
          <h1
            align="center"
            style={{ fontSize: "2.5rem" }}
            className="heading-text"
          >
            Our Vision <img src="https://i.ibb.co/D16QSfj/vision-setting.png"alt="vision-setting" border="0" height={"60px"}></img>
          </h1>
        </div>

        <div className="vision-content">
          <div className="img">
            <img
              src="https://i.ibb.co/JC4D6wN/Firefly-createa-iamge-where-there-wilbw-one-one-monitor-by-which-the-the-authority-of-water-of-a-can.jpg"
              alt="Firefly-createa-iamge-where-there-wilbw-one-one-monitor-by-which-the-the-authority-of-water-of-a-can"
              border="0"
            />
          </div>
          <div className="text">
            Our vision for the Domestic Water Provision System is to
            revolutionize water management in households by leveraging advanced
            IoT technology. We aim to create a future where every home can
            efficiently monitor and control their water usage, leading to
            significant reductions in wastage and enhanced sustainability. By
            providing innovative solutions that promote responsible water use,
            we aspire to contribute to global conservation efforts and ensure a
            reliable water supply for generations to come.
          </div>
        </div>
      </div>

      <div className="blogs" id="blogs">
        <div className="heading">
          <h1
            align="center"
            style={{ fontSize: "2.5rem" }}
            className="heading-text"
          >
            Blogs <img src="https://i.ibb.co/pj8xRDV/blogging-feed.png" alt="blogging-feed" border="0" height={"50px"}></img>
          </h1>
        </div>

        <div className="blogs-content">
          <div className="card">
            <div className="img1"></div>
            <br></br>
            <FontAwesomeIcon icon={faFaucetDrip} className="tap" />
            <h3>
              <i className="fa-solid fa-faucet-drif"></i> Bengaluru Water Crisis
              (2024):
            </h3>
            <br></br>
            <p>
              Bengaluru has been facing severe water shortages, exacerbated by
              rapid urbanization and the destruction of lakes. The city's
              over-reliance on groundwater, poor water management, with limited
              access to clean water.
            </p>
          </div>
          <div className="card">
            <div className="img2"></div>
            <br></br>
            <FontAwesomeIcon icon={faFaucetDrip} className="tap" />
            <h3>Hyderabad Water Crisis (2024): </h3>
            <br></br>
            <p>
              Hyderabad is facing water stress due to irregular monsoons and
              over-extraction of groundwater. The city's fast-growing population
              has compounded the issue, leading to severe water shortages in
              some regions.
            </p>
          </div>
          <div className="card">
            <div className="img3"></div>
            <br></br>
            <FontAwesomeIcon icon={faFaucetDrip} className="tap" />
            <h3>Delhi Water Crisis (2024):</h3>
            <br></br>
            <p>
              Delhi continues to struggle with water shortages due to a growing
              population and depleting groundwater resources. Contaminated water
              supplies and distribution inefficiencies have worsened the
              situation
            </p>
          </div>
          <div className="card">
            <div className="img4"></div>
            <br></br>
            <FontAwesomeIcon icon={faFaucetDrip} className="tap" />
            <h3>Mumbai Water Crisis (2024): </h3>
            <br></br>
            <p>
              Despite receiving substantial rainfall, Mumbai suffers from water
              shortages due to infrastructure inefficiencies and leakages. Many
              densely populated areas frequently experience limited water
              supply.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}

      <div className="contact" id="contact">
        <div className="heading">
          <h1
            align="center"
            style={{ fontSize: "2.5rem" }}
            className="heading-text"
          >
            <img src="https://i.ibb.co/pK63FJN/contact-us-3.png" alt="contact-us-3" border="0" height={"50px"}/>Contact Us
          </h1>
        </div>

        <div className="contact-content">
          <div className="address-details">
            <div className="over">
              <img src="https://i.ibb.co/qWXNJYv/png-pic-contact.png" />
            </div>
          </div>
          <div className="form">
            <form>
              <input type="text" placeholder="Your Name " />
              <br></br>
              <input type="email" placeholder="Your Email " />
              <br></br>
              <textarea
                id="messageBox"
                class="message-box"
                placeholder="Send Msg"
              ></textarea>
              <br></br>
              <button>
                Send <FontAwesomeIcon icon={faPaperPlane} shake />
              </button>
            </form>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <hr></hr>
      <div className="copy-right">
        <p>©2024 SKAB. All rights reserved.</p>
      </div>

      
    </div>
  );
}

export default Home;