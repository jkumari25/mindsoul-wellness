import React, { useState, useEffect } from "react";
import { FiX, FiStar, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function BookAppointmentModal({
  isOpen,
  onClose,
  counsellorId,
}) {
  const [selectedDay, setSelectedDay] = useState("");
  const [openMorning, setOpenMorning] = useState(true);
  const [openAfternoon, setOpenAfternoon] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [counsellor, setCounsellor] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate next 7 days
  const generateNext7Days = () => {
    const labels = ["Today", "Tomorrow"];
    const days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      const label = labels[i]
        ? labels[i]
        : d.toLocaleDateString("en-US", { weekday: "short" });

      const date = d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      });

      days.push({ label, date });
    }
    return days;
  };

  const days = generateNext7Days();

  // Generate slots function
  const generateSlots = (start, end) => {
    if (!start || !end) return [];

    const slots = [];
    let current = new Date(`2000-01-01T${start}`);
    const last = new Date(`2000-01-01T${end}`);

    while (current < last) {
      const next = new Date(current.getTime() + 30 * 60000);

      const formatTime = (date) =>
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

      slots.push(`${formatTime(current)} - ${formatTime(next)}`);
      current = next;
    }

    return slots;
  };

  // Fetch counsellor details
  useEffect(() => {
    if (!counsellorId || !isOpen) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const safeId = encodeURIComponent(counsellorId);

        const res = await fetch(
          `https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/${safeId}`
        );

        const data = await res.json();

        if (data?.counsellor) {
          setCounsellor(data.counsellor);
          setSelectedDay(days[0].label);
        }
      } catch (err) {
        console.error("Error fetching counsellor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [counsellorId, isOpen]);

  if (!isOpen) return null;

  // Extract working hours
  const morningSlots = counsellor?.workingHours?.morning
    ? generateSlots(
        counsellor.workingHours.morning.start,
        counsellor.workingHours.morning.end
      )
    : [];

  const afternoonSlots = counsellor?.workingHours?.afternoon
    ? generateSlots(
        counsellor.workingHours.afternoon.start,
        counsellor.workingHours.afternoon.end
      )
    : [];

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
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
        >
          <FiX />
        </button>

        {/* Title */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Book Appointment
          </h2>
        </div>

        {/* Counsellor Section */}
        <div className="px-6 mt-4 flex items-center gap-4">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : counsellor ? (
            <>
              <img
                src={counsellor.imageUrl}
                alt={counsellor.firstName}
                className="w-16 h-16 rounded-full object-cover bg-gray-200"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {counsellor.firstName} {counsellor.lastName}
                </h3>
                <p className="text-gray-500 text-sm">
                  {counsellor.experience
                    ? counsellor.experience.toLowerCase().includes("year")
                      ? counsellor.experience
                      : `${counsellor.experience} years`
                    : "Experience N/A"}{" "}
                  Experience
                </p>
                <p className="text-gray-500 text-sm">
                  {counsellor.expertise?.join(", ")}
                </p>
              </div>
            </>
          ) : (
            <p className="text-red-500">Counsellor not found</p>
          )}
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
            <span className="font-medium">Morning Slots</span>
            {openMorning ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openMorning && morningSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {morningSlots.map((time) => (
                <SlotCard key={time} time={time} />
              ))}
            </div>
          ) : (
            openMorning && (
              <p className="text-gray-500 text-sm italic">No morning slots</p>
            )
          )}
        </div>

        {/* Afternoon Slots */}
        <div className="px-6 mb-4">
          <button
            onClick={() => setOpenAfternoon(!openAfternoon)}
            className="flex justify-between w-full items-center mb-2"
          >
            <span className="font-medium">Afternoon Slots</span>
            {openAfternoon ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openAfternoon && afternoonSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {afternoonSlots.map((time) => (
                <SlotCard key={time} time={time} />
              ))}
            </div>
          ) : (
            openAfternoon && (
              <p className="text-gray-500 text-sm italic">No afternoon slots</p>
            )
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
