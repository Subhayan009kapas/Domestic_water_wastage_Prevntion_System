import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./landing/LandingPage";
import SetLimit from "./admin/SetLimit";

import SetPrice from "./admin/SetPrice";
import AdminViewAllUsers from "./admin/AdminViewAllUsers";
import Laout from "./admin/Laout";
import ServoControl from "./users/ServoControl";
import Waterflow from "./users/WaterFlow";
import ViewAnalytics from "./users/ViewAnalytics";
import Userlayout from "./users/Userlayout";
import Authentic from "./authentication/Authentic"; // Adjust the import path as needed
import { UserContext } from "./authentication/UserContext";
import ListOfAdmin from "./admin/ListOfAdmin";
import OtherSettings from "./admin/OtherSettings";
// import PaymentForm from './payment/PaymentForm';
import Payment from "./users/Payment";
import NewPayment from "./users/NewPayment";
import Testing from "./assets/testing_components/Dashboard.jsx";
import ToggleSwitch from "./assets/testing_components/ToggleSwitch.jsx";
import WaterUsageGraph from "./assets/testing_components/Graph.jsx";
import Servo_Control from "./assets/testing_components/Servo_Control.jsx";
import PaymentsDashboard from "./assets/testing_components/PaymentsDashboard.jsx";
import Subscription from "./assets/testing_components/Subscription.jsx";
import Online_Status from "./assets/testing_components/Online_Status.jsx";
import DashboardCard from "./assets/testing_components/DashboardCard.jsx";
import RaiseComplaint from "./assets/testing_components/RaiseComplain.jsx";
import Admin_main from "./assets/New  Admin/Admin_main.jsx";
import Admin_View_user from "./assets/New  Admin/Admin_View_user.jsx";
import Admin_Limit_user from "./assets/New  Admin/Admin_Limit_user.jsx";
import Admin_setPrice from "./assets/New  Admin/Admin_setPrice.jsx";
import Admin_Broadcast from "./assets/New  Admin/Admin_Broadcast.jsx";
import NewDWWPAuth from "./assets/New Authentication 2.0/New_dwwp_auth.jsx";
import AdminDashboard from "./admin/AdminViewAllUsers";
import New_AdminDashboard from "./assets/New  Admin/New_AdminDashboard.jsx";
import AppPerformance from "./assets/New  Admin/App_performance.jsx";
import Admin_see_UserFeedBack from "./assets/New  Admin/Admin_see_UserFeedBack.jsx";
import New_Dwwp2_0_landing from "./assets/New_Dwwp2_0_landing.jsx";
import UserSettingsSection from "./assets/testing_components/User_section_settings.jsx";

function App() {
  const user = useContext(UserContext);

  return (
    <Router basename="/Domestic_Water_Prevention-System">
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<New_Dwwp2_0_landing />} />

        {/* Authentication Route */}
        <Route path="/auth" element={<Authentic />} />

        {/* Admin Routes */}
        <Route path="admin/" element={<Laout />}>
          <Route path="setlimit" element={<SetLimit />} />
          <Route path="setprice" element={<SetPrice />} />
          <Route path="viewusers" element={<AdminViewAllUsers />} />
          <Route path="listofadmin" element={<ListOfAdmin />} />
          <Route path="other-settings" element={<OtherSettings />} />
        </Route>

        {/* DWP 2.0 */}

        {/* // dwp 2.0 user */}

        <Route path="test/" element={<Testing />}>
          <Route path="gateControl" element={<Servo_Control />} />
          <Route path="graph" element={<WaterUsageGraph />} />
          <Route path="pay" element={<PaymentsDashboard />} />
          <Route path="topup" element={<Subscription />} />
          <Route
            path="onlineStatus"
            element={<Online_Status status={"offline"} days={14} />}
          />
          <Route path="dashboard" element={<DashboardCard />} />
          <Route path="complain" element={<RaiseComplaint />} />
          <Route path="user_settings" element={<UserSettingsSection />} />
        </Route>

        {/* // dwp 2.0 Admin */}

        <Route path="newadmin" element={<Admin_main />}>
          <Route path="admin_view_user" element={<Admin_View_user />} />
          <Route path="admin_limit_user" element={<Admin_Limit_user />} />
          <Route path="admin_setPrice" element={<Admin_setPrice />} />
          <Route path="admin_Brodcast" element={<Admin_Broadcast />} />
          <Route path="admin_Dashboard" element={<New_AdminDashboard />} />
          <Route path="app_performence" element={<AppPerformance />} />
          <Route
            path="Admin_see_UserFeedback"
            element={<Admin_see_UserFeedBack />}
          />
        </Route>

        {/* //Authentication  2.0*/}
        <Route path="/newAuth" element={<NewDWWPAuth />}></Route>

        <Route path="land" element={<New_Dwwp2_0_landing />}></Route>

        {/* DWP 2.0 */}

        {/* User Routes */}
        <Route path="user/" element={<Userlayout />}>
          {user ? (
            <>
              <Route
                path="servoControl"
                element={<ServoControl userId={user.email} />}
              />
              <Route
                path="waterflow"
                element={<Waterflow userId={user.email} />}
              />
              <Route
                path="viewanalytics"
                element={<ViewAnalytics userId={user.email} />}
              />
              {/* <Route path="pay" element={<PaymentForm />} /> */}
              <Route
                path="payment"
                element={<NewPayment userId={user.email} />}
              />
            </>
          ) : (
            <Route path="*" element={<Authentic />} /> // Redirect to login if not authenticated
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
