import React from "react";
import { FiX, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

export default function AppointmentConfirmationModal({
  isOpen,
  onClose,
  counselor = {
    initials: "MS",
    name: "Manish Sharma",
    date: "Nov 14, 2025",
    time: "12:00–12:30 PM",
    duration: "30 Minutes",
    format: "Online",
  },
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-fadeIn relative p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          <FiX />
        </button>

        {/* Header */}
        <div className="text-center mt-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Appointment Confirmation
          </h2>

          {/* Success Icon */}
          <div className="flex justify-center mt-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-indigo-700 mt-4">
            Appointment Confirmed
          </h3>

          <p className="text-gray-500 mt-1 text-sm">
            Thank you for booking! Your session has been scheduled successfully.
          </p>
        </div>

        {/* Session Card */}
        <div className="bg-gray-50 mt-8 rounded-xl p-5 shadow-sm">
          {/* Counselor Block */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-semibold text-indigo-700">
              {counselor.initials}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Counselling Session
              </h4>
              <p className="text-gray-600 text-sm">with {counselor.name}</p>
            </div>
          </div>

          {/* Date & Time Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {/* Date */}
            <div className="bg-white border rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <FiCalendar className="text-indigo-600 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-medium text-gray-800">{counselor.date}</p>
              </div>
            </div>

            {/* Time */}
            <div className="bg-white border rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <FiClock className="text-indigo-600 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Timing</p>
                <p className="font-medium text-gray-800">{counselor.time}</p>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="mt-6">
            <h5 className="text-gray-700 font-semibold mb-2">
              Session Details
            </h5>

            <div className="flex flex-col gap-2 text-gray-600">
              <div className="flex items-center gap-2">
                <FiClock className="text-indigo-600" />
                <span>Duration: {counselor.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiMapPin className="text-indigo-600" />
                <span>Format: {counselor.format}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
