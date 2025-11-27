import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Star, Calendar, MessageCircle } from "lucide-react";
import LoginPage from "../LoginPage";
import AppointmentFormModal from "../Appointments/AppointmentFormModal";

export default function CounselorProfile() {
  const { state } = useLocation();
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
              className="w-36 h-36 object-cover rounded-xl shadow"
            />

            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-gray-900">
                {state.name}
              </h2>

              {state.location && (
                <p className="text-gray-600 mt-1">{state.location}</p>
              )}

              <div className="flex gap-6 mt-4 text-gray-700 text-md">
                {state.experience && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} /> {state.experience}
                  </div>
                )}

                {state.languages && (
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} /> {state.languages}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SESSION PLANS */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">
              Session Plans
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-4 border rounded-xl text-center bg-purple-50">
                <p className="font-semibold text-purple-700">Intro Session</p>
                <p className="text-gray-700 mt-1">₹{state.price}</p>
              </div>
            </div>

            <button
              onClick={handleBookAppointment}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition text-lg"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 text-2xl">
              About {state.name}
            </h3>

            {state.rating && (
              <span className="flex items-center gap-1 text-yellow-500 font-medium">
                <Star size={18} /> {state.rating}
              </span>
            )}
          </div>

          {/* BIO */}
          {state.bio && (
            <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
              {state.bio}
            </p>
          )}

          {/* FOCUS AREAS - Only if array has values */}
          {state.focusAreas?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Focus Areas
              </h4>

              <div className="flex flex-wrap gap-2">
                {state.focusAreas.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-lg text-gray-700 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* APPROACH */}
          {state.approach?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Therapeutic Approach
              </h4>

              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                {state.approach.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* TRAINING */}
          {state.training && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Training & Background
              </h4>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {state.training}
              </p>
            </div>
          )}

          {/* WHY PARENTS APPRECIATE */}
          {state.appreciation?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Why Parents Appreciate {state.name}
              </h4>

              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                {state.appreciation.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white shadow-sm border rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 text-lg">
            Free Child Assessment
          </h3>
          <p className="text-gray-600 mt-1">20-minute exploration session</p>

          <button
            onClick={handleBookAppointment}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-xl"
          >
            Book Free Session
          </button>
        </div>

        <div className="bg-white shadow-sm border rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-lg">
            Recommended Workshops
          </h3>

          <div className="border rounded-lg p-3 text-gray-700">
            Emotional Strength Building • Online
          </div>

          <div className="border rounded-lg p-3 text-gray-700 mt-2">
            Parent-Child Communication Masterclass
          </div>
        </div>
      </div>

      {/* MODALS */}
      <LoginPage
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AppointmentFormModal
        isOpen={showAppointmentForm}
        onClose={() => setShowAppointmentForm(false)}
        counselor={state}
      />
    </div>
  );
}
