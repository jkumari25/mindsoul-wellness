import React, { useState } from "react";
import {
  FiX,
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiCalendar,
} from "react-icons/fi";

export default function BookAppointmentModal({ isOpen, onClose }) {
  const [selectedDay, setSelectedDay] = useState("Tomorrow");
  const [openMorning, setOpenMorning] = useState(true);
  const [openAfternoon, setOpenAfternoon] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!isOpen) return null;

  const days = [
    { label: "Today", date: "13 Nov" },
    { label: "Tomorrow", date: "14 Nov" },
    { label: "Sat", date: "15 Nov" },
  ];

  const morningSlots = [
    "09:00–09:30 AM",
    "09:30–10:00 AM",
    "10:00–10:30 AM",
    "10:30–11:00 AM",
    "11:00–11:30 AM",
    "11:30–12:00 AM",
  ];

  const SlotCard = ({ time }) => (
    <label className="flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer bg-white hover:bg-gray-50 shadow-sm">
      <input
        type="radio"
        name="slot"
        className="w-4 h-4"
        checked={selectedSlot === time}
        onChange={() => setSelectedSlot(time)}
      />
      <span className="text-gray-700 text-sm">{time}</span>
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-fadeIn relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
        >
          <FiX />
        </button>

        {/* Header */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Book Appointment
          </h2>
        </div>

        {/* Counselor Section */}
        <div className="px-6 mt-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-semibold text-indigo-700">
            MS
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Manish Sharma
            </h3>
            <p className="text-gray-500 text-sm">Pune</p>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <FiStar className="text-yellow-400" />
            <span className="text-gray-700 text-sm font-medium">4 (1)</span>
          </div>
        </div>

        {/* Date Selector */}
        <div className="px-6 mt-6">
          <p className="text-gray-600 font-medium mb-3">Available This Week</p>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day.label}
                onClick={() => setSelectedDay(day.label)}
                className={`flex flex-col border rounded-lg px-4 py-2 min-w-[100px] text-center ${
                  selectedDay === day.label
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <span className="font-semibold">{day.label}</span>
                <span className="text-sm">{day.date}</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {/* Morning Slots */}
        <div className="px-6">
          <button
            onClick={() => setOpenMorning(!openMorning)}
            className="flex justify-between w-full items-center mb-2"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://img.icons8.com/color/48/sunrise.png"
                alt="sun"
                className="w-6"
              />
              <span className="font-medium">Morning Slots</span>
            </div>
            {openMorning ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openMorning && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {morningSlots.map((time) => (
                <SlotCard key={time} time={time} />
              ))}
            </div>
          )}
        </div>

        {/* Afternoon Slots */}
        <div className="px-6 mb-4">
          <button
            onClick={() => setOpenAfternoon(!openAfternoon)}
            className="flex justify-between w-full items-center mb-2"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://img.icons8.com/color/48/sun.png"
                alt="afternoon"
                className="w-6"
              />
              <span className="font-medium">Afternoon Slots</span>
            </div>
            {openAfternoon ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openAfternoon && (
            <p className="text-gray-500 text-sm italic">No slots available</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t flex justify-center">
          <button
            disabled={!selectedSlot}
            className={`w-full py-3 rounded-lg font-medium text-white transition ${
              selectedSlot
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Book Appointment Now
          </button>
        </div>
      </div>
    </div>
  );
}
