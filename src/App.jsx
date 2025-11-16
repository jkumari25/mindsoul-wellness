import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./components/Registration.jsx";
import Profile from "./pages/Profile.jsx";
import CounselorProfile from "./components/Home/CounselorProfile.jsx";
import CounsellorSlider from "./components/Home/CounsellorSlider.jsx";
import AppointmentForm from "./components/Appointments/AppointmentForm.jsx";
import Breadcrumb from "./components/About/Breadcrumb.jsx";
import Contacts from "./pages/Contacts.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> */}
        <Route path="/counsellor/:id" element={<CounselorProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/about" element={<Breadcrumb />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
}

export default App;
