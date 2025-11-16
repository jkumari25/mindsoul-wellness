// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Star, Calendar, MessageCircle, ShieldCheck } from "lucide-react";

// export default function CounselorProfile() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   if (!state) return <div className="p-10">Counsellor Not Found</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col lg:flex-row gap-8 mt-32">
//       {/* LEFT MAIN CONTENT */}
//       <div className="flex-1 space-y-8">
//         {/* PROFILE CARD */}
//         <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <img
//               src={state.image}
//               alt={state.name}
//               className="w-36 h-36 object-cover rounded-xl"
//             />

//             <div className="flex-1">
//               <h2 className="text-2xl font-semibold text-gray-900 font-body">
//                 {state.name}
//               </h2>
//               <p className="text-gray-600 font-body">{state.location}</p>

//               <div className="flex gap-6 mt-4 text-gray-700 text-sm">
//                 <div className="flex items-center gap-1 font-body">
//                   <Calendar size={16} /> {state.experience} Experience
//                 </div>
//                 <div className="flex items-center gap-1 font-body">
//                   <MessageCircle size={16} /> {state.languages}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* PLANS */}
//           <div className="mt-8">
//             <h3 className="font-semibold text-gray-900 mb-3 font-body">
//               Session Plans
//             </h3>

//             <div className="grid md:grid-cols-3 gap-3">
//               <div className="p-4 border rounded-xl text-center bg-purple-50 font-body">
//                 <p className="font-semibold text-purple-700">Intro Session</p>
//                 <p className="text-gray-700 mt-1">₹499</p>
//               </div>

//               <div className="p-4 border rounded-xl text-center bg-orange-50 font-body">
//                 <p className="font-semibold text-orange-700">Standard Plan</p>
//                 <p className="text-gray-700 mt-1">₹1499</p>
//               </div>

//               <div className="p-4 border rounded-xl text-center bg-blue-50 font-body">
//                 <p className="font-semibold text-blue-700">Premium Care</p>
//                 <p className="text-gray-700 mt-1">₹2999</p>
//               </div>
//             </div>

//             <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-body">
//               Book Appointment
//             </button>
//           </div>
//         </div>

//         {/* ABOUT */}
//         <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200">
//           <div className="flex justify-between items-center">
//             <h3 className="font-semibold text-gray-900 font-body">
//               About {state.name}
//             </h3>
//             <span className="flex items-center gap-1 text-yellow-500 font-medium">
//               <Star size={18} /> {state.rating}.0
//             </span>
//           </div>

//           <p className="mt-3 text-gray-700 leading-relaxed font-body">
//             {state.name} is a compassionate mental wellness practitioner
//             specializing in supporting children facing emotional, behavioral,
//             and developmental challenges. With a warm, child-friendly approach,
//             they help children express feelings, build confidence, develop
//             coping skills, and strengthen parent-child communication through
//             therapy sessions rooted in empathy and psychological understanding.
//           </p>

//           <h4 className="mt-5 font-semibold text-gray-900 font-body">
//             Focus Areas
//           </h4>
//           <div className="flex gap-2 flex-wrap mt-2 font-body">
//             <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
//               Emotional Behavior
//             </span>
//             <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
//               Child Anxiety
//             </span>
//             <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
//               Communication Skills
//             </span>
//             <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
//               Parent Counseling
//             </span>
//           </div>
//         </div>

//         {/* REVIEW LOCKED */}
//         {/* <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200 text-center text-gray-600">
//           <ShieldCheck className="mx-auto text-gray-400" size={28} />
//           <p className="mt-2">You must book a session to write a review.</p>
//         </div> */}

//         {/* RECENT REVIEWS */}
//         {/* <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200">
//           <div className="flex justify-between items-center">
//             <h3 className="font-semibold text-gray-900">Recent Reviews</h3>
//             <button className="text-sm text-blue-600">See All</button>
//           </div>
//           <p className="text-gray-500 mt-3">No reviews yet.</p>
//         </div> */}
//       </div>

//       {/* RIGHT SIDEBAR */}
//       <div className="w-full lg:w-80 space-y-6">
//         <div className="bg-white shadow-sm border rounded-2xl p-6">
//           <h3 className="font-semibold text-gray-900">Free Child Assessment</h3>
//           <p className="text-gray-600 text-sm mt-1">
//             20-minute exploration session
//           </p>
//           <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg">
//             Book Free Session
//           </button>
//         </div>

//         <div className="bg-white shadow-sm border rounded-2xl p-6">
//           <h3 className="font-semibold text-gray-900 mb-3">
//             Recommended Workshops
//           </h3>

//           <div className="border rounded-lg p-3 text-sm text-gray-700">
//             Emotional Strength Building • Online
//           </div>

//           <div className="border rounded-lg p-3 text-sm text-gray-700 mt-2">
//             Parent-Child Communication Masterclass
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star, Calendar, MessageCircle } from "lucide-react";
import LoginPage from "../LoginPage";
import AppointmentFormModal from "../Appointments/AppointmentFormModal";

export default function CounselorProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);
  }, []);

  if (!state) return <div className="p-10">Counsellor Not Found</div>;

  const handleBookAppointment = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setShowAppointmentForm(true);
    } else {
      setShowLoginModal(true);
    }
  };

  // After successful login
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    setTimeout(() => setShowAppointmentForm(true), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col lg:flex-row gap-8 mt-32">
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-8">
        {/* PROFILE CARD */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={state.image}
              alt={state.name}
              className="w-36 h-36 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-gray-900 font-body ">
                {state.name}
              </h2>
              <p className="text-gray-600 font-body text-lg">
                {state.location}
              </p>

              <div className="flex gap-6 mt-4 text-gray-700 text-md">
                <div className="flex items-center gap-1 font-body ">
                  <Calendar size={16} /> {state.experience} Experience
                </div>
                <div className="flex items-center gap-1 font-body">
                  <MessageCircle size={16} /> {state.languages}
                </div>
              </div>
            </div>
          </div>

          {/* PLANS */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-3 font-body text-lg">
              Session Plans
            </h3>

            <div className="grid md:grid-cols-3 gap-3 text-lg">
              <div className="p-4 border rounded-xl text-center bg-purple-50 font-body">
                <p className="font-semibold text-purple-700">Intro Session</p>
                <p className="text-gray-700 mt-1">₹{state.price}</p>
              </div>

              {/* <div className="p-4 border rounded-xl text-center bg-orange-50 font-body">
                <p className="font-semibold text-orange-700">Standard Plan</p>
                <p className="text-gray-700 mt-1">₹1499</p>
              </div>

              <div className="p-4 border rounded-xl text-center bg-blue-50 font-body">
                <p className="font-semibold text-blue-700">Premium Care</p>
                <p className="text-gray-700 mt-1">₹2999</p>
              </div> */}
            </div>

            {/* ✅ Conditional booking logic */}
            <button
              onClick={handleBookAppointment}
              className="mt-6 w-full bg-accent hover:bg-primary text-white hover:text-black py-3 rounded-lg font-body transition text-xl"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* ABOUT */}
        <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 font-body text-2xl">
              About {state.name}
            </h3>
            <span className="flex items-center gap-1 text-yellow-500 font-medium">
              <Star size={18} /> {state.rating}.0
            </span>
          </div>

          <p className="mt-3 text-gray-700 leading-relaxed font-body text-md">
            {state.name} is a compassionate mental wellness practitioner
            specializing in supporting children facing emotional, behavioral,
            and developmental challenges. With a warm, child-friendly approach,
            they help children express feelings, build confidence, develop
            coping skills, and strengthen parent-child communication through
            therapy sessions rooted in empathy and psychological understanding.
          </p>

          <h4 className="mt-5 font-semibold text-gray-900 font-body text-md">
            Focus Areas
          </h4>
          <div className="flex gap-2 flex-wrap mt-2 font-body text-md">
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
              Emotional Behavior
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
              Child Anxiety
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
              Communication Skills
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
              Parent Counseling
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full lg:w-80 space-y-6 font-body">
        <div className="bg-white shadow-sm border rounded-2xl p-6 ">
          <h3 className="font-semibold text-gray-900 text-lg">
            Free Child Assessment
          </h3>
          <p className="text-gray-600 mt-1 text-md">
            20-minute exploration session
          </p>
          <button
            onClick={handleBookAppointment}
            className="mt-4 w-full bg-accent hover:bg-primary hover:text-black text-white py-3 rounded-lg text-xl"
          >
            Book Free Session
          </button>
        </div>

        <div className="bg-white shadow-sm border rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-lg">
            Recommended Workshops
          </h3>

          <div className="border rounded-lg p-3 text-sm text-gray-700 text-md">
            Emotional Strength Building • Online
          </div>

          <div className="border rounded-lg p-3 text-sm text-gray-700 mt-2 text-md">
            Parent-Child Communication Masterclass
          </div>
        </div>
      </div>

      {/* ✅ Modals */}
      <LoginPage
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess} // pass callback
      />

      <AppointmentFormModal
        isOpen={showAppointmentForm}
        onClose={() => setShowAppointmentForm(false)}
        counselor={state}
      />
    </div>
  );
}
