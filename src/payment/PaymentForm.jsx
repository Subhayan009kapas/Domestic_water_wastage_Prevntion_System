// // src/PaymentForm.js
// import React, { useState } from 'react';

// const PaymentForm = () => {
//   const [amount, setAmount] = useState('');

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       alert('Please enter a valid amount.');
//       return;
//     }

//     const res = await loadRazorpayScript();

//     if (!res) {
//       alert('Razorpay SDK failed to load. Are you online?');
//       return;
//     }

//     const options = {
//       key: 'rzp_test_v4UV05zNfrIcEE',
//       amount: Number(amount) * 100, 
//       currency: 'INR',
//       name: 'Your Company Name',
//       description: 'Test Transaction',
//       image: 'https://your-logo-url.com/logo.png', // Optional
//       handler: function (response) {
//         alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
//         // Optionally, you can handle the payment response here
//       },
//       prefill: {
//         name: 'Customer Name',
//         email: 'customer@example.com',
//         contact: '9999999999',
//       },
//       notes: {
//         address: 'Customer Address',
//       },
//       theme: {
//         color: '#8448ed',
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Make a Payment</h2>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder="Enter amount in INR"
//         style={styles.input}
//       />
//       <button onClick={handlePayment} style={styles.button}>
//         Make Payment
//       </button>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: 'black',
//     marginLeft:'20vw',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     marginBottom: '20px',
//     width: '300px',
//     border: '1px solid black',
//     borderRadius: '4px',
//     color:'black',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: '#3399cc',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
// };

// export default PaymentForm;
