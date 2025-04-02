import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboards";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import OtpVerification from "./Pages/OtpVerification";
import ResetPassword from "./Pages/ResetPassword";
import ChangePassword from "./Pages/CHangePassword";
import FakeDataGenerator from "./Pages/FakeDataGenerator";

function App() {
  // Redux store to get the theme
  const theme = useSelector((state) => state.theme.theme); // FIX: Access `theme` property
  return (
    <Router >
      {/* <Login/>
      <Signup/>
      <OtpVerification/>
      <ResetPassword/>
      <ChangePassword/> */}
      <div className={`flex font-robotoMono min-h-screen bg-${
        theme === "dark" ? "darkBg" : "lightBg"
        }`}>
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-5 mt-16"> {/* Adjust for Navbar height */}
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/login" element={<Signup/>} />
              <Route path="/fake-data" element={<Login/>} />
              <Route path="/breach-check" element={<FakeDataGenerator/>} />
              <Route path="/settings" element={<h1 className="text-2xl font-bold">⚙️ Settings</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
