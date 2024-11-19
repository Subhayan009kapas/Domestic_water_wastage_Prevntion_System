// // src/main.jsx

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';
// // import './allCss/landing.css'; // Import your global styles
// // import './allCss/admin.css';   // Import admin-specific styles
// // import other CSS files if needed
// import './index.css'
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './authentication/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);