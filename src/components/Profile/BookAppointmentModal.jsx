import React, { useState, useEffect } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import AppointmentConfirmationModal from "./AppointmentConfirmationModal";

export default function BookAppointmentModal({
  isOpen,
  onClose,
  counsellorId,
}) {
  const [counsellor, setCounsellor] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [openMorning, setOpenMorning] = useState(true);
  const [openAfternoon, setOpenAfternoon] = useState(false);
  const [openEvening, setOpenEvening] = useState(false);

  /* 🔁 SWITCH MODAL CONTENT */
  const [isBooked, setIsBooked] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  /* -------------------------------------------
     GENERATE NEXT 14 DAYS
  ------------------------------------------- */
  const generateNextDays = (count = 14) => {
    const days = [];
    for (let i = 0; i < count; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      days.push({
        label:
          i === 0
            ? "Today"
            : d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.toLocaleDateString("en-US", { day: "2-digit", month: "short" }),
        fullDate: d.toISOString().split("T")[0],
      });
    }
    return days;
  };

  /* -------------------------------------------
     FETCH COUNSELLOR
  ------------------------------------------- */
  useEffect(() => {
    if (!isOpen || !counsellorId) return;

    const fetchCounsellor = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/${encodeURIComponent(
            counsellorId
          )}`
        );

        const data = await res.json();

        if (data?.counsellor) {
          setCounsellor(data.counsellor);
          const days = generateNextDays();
          setAvailableDays(days);
          setSelectedDay(days[0]);
        }
      } catch (err) {
        console.error("Error fetching counsellor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellor();
  }, [isOpen, counsellorId]);

  /* -------------------------------------------
     FETCH SLOTS
  ------------------------------------------- */
  const fetchSlots = async (date) => {
    try {
      setLoadingSlots(true);
      setSelectedSlot(null);

      const res = await fetch(
        `https://mindsoul-backend-772700176760.asia-south1.run.app/api/timeslots/counsellor/${counsellorId}/slots?date=${date}`
      );

      const data = await res.json();

      if (data.success) {
        setSlots(data.slots);
      } else {
        setSlots({ morning: [], afternoon: [], evening: [] });
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedDay) {
      fetchSlots(selectedDay.fullDate);
    }
  }, [selectedDay]);

  /* -------------------------------------------
     BOOK APPOINTMENT
  ------------------------------------------- */
  const bookAppointment = async () => {
    if (!selectedSlot || !selectedDay) return;

    try {
      const token = localStorage.getItem("token");

      const payload = {
        counsellorId,
        date: selectedDay.fullDate,
        timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}`,
      };

      const res = await fetch(
        "https://mindsoul-backend-772700176760.asia-south1.run.app/api/appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      if (data.success) {
        setAppointmentData(data.appointment);
        setIsBooked(true); // 🔁 Replace modal content
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  /* -------------------------------------------
     SLOT CARD
  ------------------------------------------- */
  const SlotCard = ({ slot }) => {
    const isSelected = selectedSlot?.id === slot.id;

    return (
      <button
        disabled={slot.isBooked}
        onClick={() => setSelectedSlot(slot)}
        className={`border rounded-lg px-4 py-2 text-sm transition
          ${
            slot.isBooked
              ? "bg-red-100 text-red-500 cursor-not-allowed"
              : "hover:border-indigo-500"
          }
          ${isSelected ? "bg-indigo-600 text-white" : ""}
        `}
      >
        {slot.startTime} - {slot.endTime}
      </button>
    );
  };

  if (!isOpen) return null;

  /* -------------------------------------------
     🔁 SWITCH UI AFTER BOOKING
  ------------------------------------------- */
  if (isBooked && appointmentData) {
    return (
      <AppointmentConfirmationModal
        isOpen={true}
        appointment={appointmentData}
        onClose={onClose}
      />
    );
  }

  /* -------------------------------------------
     BOOKING UI
  ------------------------------------------- */
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          <FiX />
        </button>

        <div className="px-6 pt-6">
          <h2 className="text-2xl font-semibold">Book Appointment</h2>
        </div>

        {/* COUNSELLOR INFO */}
        <div className="px-6 mt-4 flex items-center gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : counsellor ? (
            <>
              <img
                src={counsellor.imageUrl}
                alt={counsellor.firstName}
                className="w-16 h-16 rounded-full object-cover bg-gray-200"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {counsellor.firstName} {counsellor.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {counsellor.experience} Experience
                </p>
                <p className="text-sm text-gray-500">
                  {counsellor.expertise?.join(", ")}
                </p>
              </div>
            </>
          ) : null}
        </div>

        {/* DATE SELECTOR */}
        <div className="px-6 mt-6">
          <p className="font-medium mb-3">Available Days</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {availableDays.map((day) => (
              <button
                key={day.fullDate}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 min-w-[100px] rounded-lg border ${
                  selectedDay?.fullDate === day.fullDate
                    ? "bg-indigo-600 text-white"
                    : "bg-white"
                }`}
              >
                <div className="font-semibold">{day.label}</div>
                <div className="text-sm">{day.date}</div>
              </button>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {/* SLOT SECTIONS */}
        {["morning", "afternoon", "evening"].map((period) => (
          <div key={period} className="px-6 mb-4">
            <button
              onClick={() =>
                period === "morning"
                  ? setOpenMorning(!openMorning)
                  : period === "afternoon"
                  ? setOpenAfternoon(!openAfternoon)
                  : setOpenEvening(!openEvening)
              }
              className="flex justify-between w-full font-medium"
            >
              {period.charAt(0).toUpperCase() + period.slice(1)} Slots
              {(period === "morning" && openMorning) ||
              (period === "afternoon" && openAfternoon) ||
              (period === "evening" && openEvening) ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </button>

            {((period === "morning" && openMorning) ||
              (period === "afternoon" && openAfternoon) ||
              (period === "evening" && openEvening)) && (
              <>
                {loadingSlots ? (
                  <p className="text-sm text-gray-500 mt-2">Loading...</p>
                ) : slots[period]?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {slots[period].map((slot) => (
                      <SlotCard key={slot.id} slot={slot} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm italic text-gray-500 mt-2">
                    No {period} slots
                  </p>
                )}
              </>
            )}
          </div>
        ))}

        {/* FOOTER */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={bookAppointment}
            disabled={!selectedSlot}
            className={`w-full py-3 rounded-lg text-white ${
              selectedSlot ? "bg-indigo-600" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Book Appointment Now
          </button>
        </div>
      </div>
    </div>
  );
}
