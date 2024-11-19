import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, onSnapshot , updateDoc } from 'firebase/firestore';
import { collection, getDocs, getDoc } from "firebase/firestore";
// import { monthCode } from '../assets/globalMonthData';  // Import your global monthCode data
import '../allCss/newPayment.css';
// import { data } from 'framer-motion/client';
import { jsPDF } from "jspdf";


function NewPayment({userId}) {
    
    const [loading, setLoading] = useState(true);
    const [monthlyData, setMonthlyData] = useState({});
    const [adminData, setAdminData] = useState({ limit: {}, price: {}  , currentMonthAdmin:{}});
    
    // const [filteredMonths, setFilteredMonths] = useState([]);
    const [filteredMonthData, setFilteredMonthData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const[selectedMonth, setSelectedMonth] = useState({})


    const[userDetails, setUserDetails ] = useState([])
    const[  totalPrice, setTotalPrice ] = useState(0)
  
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(db, 'users', userId);
                const userDocSnap = await getDoc(userDocRef);
    
                if (!userDocSnap.exists()) {
                    console.log("No user data found!");
                    return;
                }
    
                const userData = userDocSnap.data().userDetails;
                setUserDetails(userData);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchUserData(); // Call the async function inside useEffect
    }, [userId]);
    

// for receipt 


    const openModal = (month) => {
        setIsModalOpen(true);
        setSelectedMonth(month)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    async function downloadPDF(usedWater) {

        if (!usedWater || isNaN(usedWater) || usedWater <= 0) {
            alert('Invalid water usage value for the last month.');
            return;
        }
        //here i have to implement the total price  bassed on limits 
        const regularLimit = adminData?.limit?.regular;
        const maxLimit = adminData?.limit?.max;
        const regularPrice = adminData?.price?.regularPrice;
        const penaltyPrice = adminData?.price?.penaltyPrice;

        if (regularLimit == null || maxLimit == null || regularPrice == null || penaltyPrice == null) {
            console.error("Admin data is incomplete or not loaded.");
            return 0;
        }
        let extraPrice22 = 0;
        let totalPrice22 = 0;
        let regularprice22 = 0 ;

        if (usedWater <= regularLimit) {
            totalPrice22 = usedWater * regularPrice; // Regular charge
            regularprice22 = totalPrice22 ;
            setTotalPrice(totalPrice22)
        } else if (usedWater > regularLimit && usedWater <= maxLimit) {
             let extraWater = usedWater - regularLimit; 
              extraPrice22 = extraWater * penaltyPrice; 
              regularprice22 = regularLimit * regularPrice ;
             totalPrice22 = extraPrice22 + regularprice22
        } else {
            console.warn("Usage exceeds max limit - additional charges may apply.");
            totalPrice22 = usedWater * penaltyPrice;
            setTotalPrice(totalPrice22)
        }
        // console.log(userDetails);
        // console.log(selectedMonth);
        const doc = new jsPDF();
        // Header section
        const logo = 'https://i.ibb.co/9hcFtsn/dwp-logo.png';
        doc.addImage(logo, 'PNG', 10, 10, 20, 20); // Add logo
        doc.setFontSize(18);
        doc.text("Domestic Water Wastage Prevention System", 40, 15);
        doc.setFontSize(12);
        doc.text("ONLINE BILL", 40, 25);
    
        // Bill Details Section
        doc.setFontSize(10);
        doc.text(`Bill Month: ${selectedMonth.month.toUpperCase().slice(0,3) + `_20` + selectedMonth.month.toUpperCase().slice(-2)}`, 10, 40);
        doc.text(`Consumer Name: ${userDetails[0]} `, 120, 40);
        doc.text(`Bill ID: ${selectedMonth.razorpay_payment_id}`, 10, 45);
        doc.text(`Contact No: ${userDetails[1]}`, 120, 45);
        doc.text(`Bill Date: ${selectedMonth.paid_date}`, 10, 50);
        doc.text(`Valid ID: ${userDetails[2]}`, 120, 50);
        doc.text(`Payment Status: ${selectedMonth.paid ? 'paid':'not paid'}`, 10, 55);
        doc.text(`Consumer Number: ${userDetails[3]}`, 120, 55);
    
        // Line separator
        doc.line(10, 60, 200, 60);
    
        // Reading Details Table
        doc.setFontSize(10);
        doc.text(`Payment Date: ${selectedMonth.paid_date}`, 10, 100);
        // doc.text("Reading", 60, 70);
        doc.text(`Consumption : ${selectedMonth.totalusages}`, 160, 100);
        doc.line(10, 72, 200, 72); // Header underline
    
        // Additional Amount Details Table
        // doc.text("Additional Amount Details", 10, 100);
        doc.line(10, 102, 200, 102);
        doc.text("Particulars", 10, 110);
        doc.text("Amount", 160, 110);
        doc.line(10, 112, 200, 112);
    
        // Sample rows for additional charges
        let yPosition = 120;
        const charges = [
            { name: "Fare Price", amount: `${regularprice22}` },
            { name: "Fine", amount: `${extraPrice22}` },
        ];
        charges.forEach(charge => {
            doc.text(charge.name, 10, yPosition);
            doc.text(charge.amount, 160, yPosition);
            yPosition += 10;
        });
    
        // Footer with Total
        doc.setFontSize(16);
        doc.text(`Total Amount: ${totalPrice22}`, 130, yPosition + 10 );
        doc.line(10, yPosition + 15, 200, yPosition + 15);
    
        // Authorized Signatory Section
        doc.setFontSize(10);
        doc.text("Authorized Signatory", 10, yPosition + 30);
        const ok = 'https://i.ibb.co/W67L2fK/pngwing-com.png';
        doc.addImage(ok, 'PNG', 50,yPosition + 25, 10, 10); 
    
        // Footer with Download Date
        const downloadDate = new Date().toLocaleDateString();
        doc.text(`Downloaded on: ${downloadDate}`, 150, yPosition + 30);
    
        // Save PDF
        doc.save("water_bill_receipt.pdf");
    }
    
    
    // async function handleViewReceipt(month) {
    //     console.log(month);
    // }
    useEffect(() => {   
        
        // for user data 
        const fetchMonthlyData = async () => {
            const collections = ['currentMonth', 'jan24', 'feb24', 'mar24', 'apr24', 'may24', 'jun24', 'jul24', 'aug24', 'sep24', 'oct24', 'nov24', 'dec24'];
            const data = {};

            for (const collection of collections) {
                try {
                    if (!userId) throw new Error("User 'userId' is undefined");
                    // const servoControlDocRef = doc(db, 'users', userId, collection, 'servoControl');
                    const waterflowSensorDocRef = doc(db, 'users', userId, collection, 'waterflowSensor');
                    const paidStatusDocRef = doc(db, 'users', userId, collection, 'paidStatus');
                    // const  = await getDoc(servoControlDocRef);
                    const waterflowSensorDoc = await getDoc(waterflowSensorDocRef);
                    const paidStatusDoc = await getDoc(paidStatusDocRef);

                    data[collection] = {
                        totalusages: waterflowSensorDoc.exists() ? waterflowSensorDoc.data().totalusages : 0,
                        paid: paidStatusDoc.exists() ? paidStatusDoc.data().paid : false,
                        paid_date: paidStatusDoc.exists() ? paidStatusDoc.data().paid_date : '',
                        razorpay_payment_id: paidStatusDoc.exists() ? paidStatusDoc.data().razorpay_payment_id : ''
                    };
                } catch (error) {
                    console.error(`Error fetching data for ${collection}:`, error);
                }
            }

            setMonthlyData(data);
        };
            //for admin datat

            const fetchAdminData = async () => {
                try {
                    // References to 'admin' documents
                    const limitDocRef = doc(db, 'admin', 'limit');
                    const priceDocRef = doc(db, 'admin', 'price');
                    const currentMonthDocRef = doc(db, 'admin', 'currentMonthAdmin');
                    // Fetch documents
                    const limitDoc = await getDoc(limitDocRef);
                    const priceDoc = await getDoc(priceDocRef);
                    const currentMonthDoc = await getDoc(currentMonthDocRef);
    
                    setAdminData({
                        limit: limitDoc.exists() ? limitDoc.data() : {},
                        price: priceDoc.exists() ? priceDoc.data() : {},
                        currentMonthAdmin: currentMonthDoc.exists() ? currentMonthDoc.data() : {},
                    });
                } catch (error) {
                    console.error("Error fetching admin data:", error);
                }
            };
        fetchMonthlyData();
        fetchAdminData();
    }, [userId]);

    // Data of those months who have non zero totaluse values 
    useEffect(() => {
        if (Object.keys(monthlyData).length > 0) {  // Ensures monthlyData is ready
            const monthsWithUsages = Object.keys(monthlyData)
                .filter(month => monthlyData[month].totalusages !== 0)
                .map(month => ({
                    month,
                    paid: monthlyData[month].paid,
                    paid_date: monthlyData[month].paid_date,
                    razorpay_payment_id: monthlyData[month].razorpay_payment_id,
                    totalusages: monthlyData[month].totalusages
                }));
            const filteredData = monthsWithUsages.filter(item => item.month !== 'currentMonth');

            setFilteredMonthData(filteredData);
            setLoading(false); // Set loading to false only after data is processed
        }
    }, [monthlyData ]);

   console.log(filteredMonthData);
    
    // console.log(filteredMonthData);
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };
    
    async function handlePayment (usedWater , month)  {
        console.log(usedWater);
        
        if (!usedWater || isNaN(usedWater) || usedWater <= 0) {
            alert('Invalid water usage value for the last month.');
            return;
        }
        //here i have to implement the total price  bassed on limits 
        const regularLimit = adminData?.limit?.regular;
        const maxLimit = adminData?.limit?.max;
        const regularPrice = adminData?.price?.regularPrice;
        const penaltyPrice = adminData?.price?.penaltyPrice;

        if (regularLimit == null || maxLimit == null || regularPrice == null || penaltyPrice == null) {
            console.error("Admin data is incomplete or not loaded.");
            return 0;
        }
        let totalPrice = 0;

        if (usedWater <= regularLimit) {
            totalPrice = usedWater * regularPrice; // Regular charge
        } else if (usedWater > regularLimit && usedWater <= maxLimit) {
             let extraWater = usedWater - regularLimit; 
             let extraPrice = extraWater * penaltyPrice; 
             let regularprice = regularLimit * regularPrice ;
             totalPrice = extraPrice + regularprice
        } else {
            console.warn("Usage exceeds max limit - additional charges may apply.");
            totalPrice = usedWater * penaltyPrice;
            setTotalPrice(totalPrice)
        }

        const res = await loadRazorpayScript();
    
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }
        
        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY; 
    
        const options = {
            key: razorpayKey, 
            amount: Math.floor(totalPrice) * 100, 
            currency: 'INR',
            name: 'DWP Payments',
            description: 'Payment for water usage',
            image: 'https://i.ibb.co/r6LcWZ3/dwp-black-log.png', 
            handler: async function (response) {
    
              alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
              const paidDate = new Date().toLocaleDateString("en-GB"); 
              const currentMonthRef = doc(db, 'users', userId, month, 'paidStatus');
              try {
                  await updateDoc(currentMonthRef, {
                      paid: true, 
                      paid_date: paidDate, 
                      razorpay_payment_id: response.razorpay_payment_id 
                  });
              } catch (error) {
                  console.error("Error updating document: ", error);
              }
          },
            prefill: {
                name: userId, 
                userId: userId,
                contact: userId, 
            },
            notes: {
                address: 'Customer Address', 
            },
            theme: {
                color: '#8448ed',
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };  


    return (
        <div className="payment-container">
            <header className="payment-header">
                <h1>Monthly Payment</h1>
            </header>
            <div className="outer-payment-main">
                <main className="payment-main">
                    <div className="data-list">
                        {/* <h3>Payment History</h3> */}
                        {loading ? (
                            <div className="stunning-loader">
                            <div className="spinner"></div>
                          </div>
                        ) : (
                        <div className="ledger-container">
                            <h2 className="ledger-title">Payment History</h2>
                            <table className="ledger-table">
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Status</th>
                                        <th>Total Usages</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMonthData?.map((months, index) => (
                                        <tr key={index}>
                                            <td>
                                                {months.month.charAt(0).toUpperCase() + months.month.slice(1).toLowerCase()}
                                            </td>
                                            <td>{months.paid ? 'Paid' : 'Not Paid'}</td>
                                            <td>{months.totalusages}</td>
                                            <td className="pay-and-view">
                                                <button
                                                    className={`view-receipt ${!months.paid ? 'not-allowed' : ''}`}
                                                    onClick={() => openModal(months)}
                                                    style={{ cursor: months.paid ? 'pointer' : 'not-allowed' }}
                                                    disabled={!months.paid}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="pay-button"
                                                    onClick={() => handlePayment(months.totalusages, months.month)}
                                                    disabled={months.paid}
                                                >
                                                    Pay
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        )}

                        {isModalOpen && (
                            <div className="modal">
                                <div className="modal-content receipt">
                                    <h2 className="receipt-title">Receipt</h2>
                                    <div className="receipt-details">
                                        <hr />
                                        <p><strong>For:</strong> {selectedMonth.month}</p>
                                        <hr />
                                        <p><strong>Paid Status:</strong> {selectedMonth.paid ? 'Done' : 'Not Done'}</p>
                                        <hr />
                                        <p><strong>Date:</strong> {selectedMonth.paid_date}</p>
                                        <hr />
                                        <p><strong>Payment ID:</strong> {selectedMonth.razorpay_payment_id}</p>
                                        <hr />
                                    </div>
                                    <div className="receipt-actions">
                                        <button onClick={() => downloadPDF(selectedMonth.totalusages)} className="download-button">
                                            Download Receipt
                                        </button>
                                        <button onClick={closeModal} className="close-modal-button">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}

export default NewPayment