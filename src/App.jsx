import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./components/Registration.jsx";
import Profile from "./pages/Profile.jsx";
import CounselorProfile from "./components/Home/CounselorProfile.jsx";
import CounsellorSlider from "./components/Home/CounsellorSlider.jsx";
import AppointmentForm from "./components/Appointments/AppointmentForm.jsx";
import Breadcrumb from "./components/About/Breadcrumb.jsx";
import Contacts from "./pages/Contacts.jsx";
import CounsellorProfileUpdate from "./components/Profile/CounsellorProfileUpdate.jsx";
import Counsellors from "./components/Counsellor/Counsellors.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import BookingPage from "./components/Booking/BookingPage.jsx";
import OtpPage from "./components/Counsellor/OtpPage.jsx";
import ProtectedCounsellorRoute from "./routes/ProtectedCounsellorRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> */}
      <Route path="/counsellor/:id" element={<CounselorProfile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/appointment" element={<AppointmentForm />} />
      <Route path="/about" element={<Breadcrumb />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route
        path="/counsellor/profile"
        element={
          <ProtectedCounsellorRoute>
            <CounsellorProfileUpdate />
          </ProtectedCounsellorRoute>
        }
      />
      <Route path="/otp" element={<OtpPage />} />
      <Route
        path="/counsellors"
        element={
          // <ProtectedRoute>
          <Counsellors />
          // </ProtectedRoute>
        }
      />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  );
}

export default App;
