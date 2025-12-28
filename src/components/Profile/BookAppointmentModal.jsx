// import React, { useState, useEffect } from "react";
// import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
// import AppointmentConfirmationModal from "./AppointmentConfirmationModal";

// const BASE_URL =
//   "https://mindsoul-backend-772700176760.asia-south1.run.app/api";

// export default function BookAppointmentModal({
//   isOpen,
//   onClose,
//   counsellorId,
// }) {
//   const [counsellor, setCounsellor] = useState(null);
//   const [availableDays, setAvailableDays] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);

//   const [slots, setSlots] = useState({
//     morning: [],
//     afternoon: [],
//     evening: [],
//   });

//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [loadingSlots, setLoadingSlots] = useState(false);

//   const [openMorning, setOpenMorning] = useState(true);
//   const [openAfternoon, setOpenAfternoon] = useState(false);
//   const [openEvening, setOpenEvening] = useState(false);

//   const [isBooked, setIsBooked] = useState(false);
//   const [appointmentData, setAppointmentData] = useState(null);

//   /* -------------------------------------------
//      GENERATE NEXT 14 DAYS
//   ------------------------------------------- */
//   const generateNextDays = (count = 14) => {
//     const days = [];
//     for (let i = 0; i < count; i++) {
//       const d = new Date();
//       d.setDate(d.getDate() + i);

//       days.push({
//         label:
//           i === 0
//             ? "Today"
//             : d.toLocaleDateString("en-US", { weekday: "short" }),
//         date: d.toLocaleDateString("en-US", {
//           day: "2-digit",
//           month: "short",
//         }),
//         fullDate: d.toISOString().split("T")[0],
//       });
//     }
//     return days;
//   };

//   /* -------------------------------------------
//      FETCH COUNSELLOR
//   ------------------------------------------- */
//   useEffect(() => {
//     if (!isOpen || !counsellorId) return;

//     async function fetchCounsellor() {
//       try {
//         setLoading(true);

//         const res = await fetch(`${BASE_URL}/counsellor/${counsellorId}`);
//         const data = await res.json();

//         console.log("Counsellor API:", data);

//         if (data?.counsellor) {
//           setCounsellor(data.counsellor);
//           const days = generateNextDays();
//           setAvailableDays(days);
//           setSelectedDay(days[0]);
//         }
//       } catch (err) {
//         console.error("Fetch counsellor error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCounsellor();
//   }, [isOpen, counsellorId]);

//   /* -------------------------------------------
//      LOAD SLOTS (COOKIE AUTH)
//   ------------------------------------------- */
//   const loadSlotsForDate = async (date) => {
//     try {
//       setLoadingSlots(true);
//       setSelectedSlot(null);

//       // 1️⃣ Refresh slots
//       const refreshRes = await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/refresh?date=${date}`,
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );

//       console.log("Refresh slots status:", refreshRes.status);

//       // 2️⃣ Available slots
//       const resAvail = await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/slots?date=${date}`,
//         { credentials: "include" }
//       );
//       const availData = await resAvail.json();
//       console.log("Available slots:", availData);

//       // 3️⃣ Booked slots
//       const resBooked = await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/booked?date=${date}`,
//         { credentials: "include" }
//       );
//       const bookedData = await resBooked.json();
//       console.log("Booked slots:", bookedData);

//       const slotMap = new Map();

//       ["morning", "afternoon", "evening"].forEach((period) => {
//         (availData.slots?.[period] || []).forEach((s) => {
//           slotMap.set(s.startTime, { ...s, isBooked: false });
//         });
//       });

//       (bookedData.bookedSlots || []).forEach((s) => {
//         slotMap.set(s.startTime, { ...s, isBooked: true });
//       });

//       let mergedSlots = Array.from(slotMap.values());

//       // Remove past slots if today
//       if (date === new Date().toISOString().split("T")[0]) {
//         const now = new Date();
//         mergedSlots = mergedSlots.filter((slot) => {
//           const [h, m] = slot.startTime.split(":").map(Number);
//           const slotTime = new Date();
//           slotTime.setHours(h, m, 0, 0);
//           return slotTime > now;
//         });
//       }

//       const grouped = { morning: [], afternoon: [], evening: [] };

//       mergedSlots.forEach((s) => {
//         const hour = parseInt(s.startTime.split(":")[0], 10);
//         if (hour < 12) grouped.morning.push(s);
//         else if (hour < 17) grouped.afternoon.push(s);
//         else grouped.evening.push(s);
//       });

//       setSlots(grouped);
//     } catch (err) {
//       console.error("Load slots error:", err);
//       setSlots({ morning: [], afternoon: [], evening: [] });
//     } finally {
//       setLoadingSlots(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedDay) {
//       loadSlotsForDate(selectedDay.fullDate);
//     }
//   }, [selectedDay]);

//   /* -------------------------------------------
//      BOOK APPOINTMENT (COOKIE AUTH)
//   ------------------------------------------- */
//   // const bookAppointment = async () => {
//   //   if (!selectedSlot || !selectedDay) return;

//   //   try {
//   //     const res = await fetch(`${BASE_URL}/appointment`, {
//   //       method: "POST",
//   //       credentials: "include",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         counsellorId,
//   //         date: selectedDay.fullDate,
//   //         timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}`,
//   //       }),
//   //     });

//   //     const data = await res.json();
//   //     console.log("Book appointment response:", data);

//   //     if (data.success) {
//   //       setAppointmentData(data.appointment);
//   //       setIsBooked(true);
//   //     }
//   //   } catch (err) {
//   //     console.error("Book appointment error:", err);
//   //   }
//   // };

//   const bookAppointment = async () => {
//     if (!selectedSlot || !selectedDay) return;

//     try {
//       const token = localStorage.getItem("token"); // ✅ USER TOKEN

//       if (!token) {
//         alert("Please login again");
//         return;
//       }

//       const res = await fetch(`${BASE_URL}/appointment`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // ✅ REQUIRED
//         },
//         body: JSON.stringify({
//           counsellorId,
//           date: selectedDay.fullDate,
//           timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}`,
//         }),
//       });

//       const data = await res.json();
//       console.log("Booking response:", data);

//       if (!res.ok) {
//         throw new Error(data.message || "Booking failed");
//       }

//       if (data.success) {
//         setAppointmentData(data.appointment);
//         setIsBooked(true);
//       }
//     } catch (err) {
//       console.error("Book appointment error:", err);
//       alert("Booking failed");
//     }
//   };

//   const SlotCard = ({ slot }) => {
//     const isSelected =
//       selectedSlot?.startTime === slot.startTime &&
//       selectedSlot?.endTime === slot.endTime;

//     return (
//       <button
//         disabled={slot.isBooked}
//         onClick={() => setSelectedSlot(slot)}
//         className={`border rounded-lg px-4 py-2 text-sm transition
//           ${
//             slot.isBooked
//               ? "bg-red-100 text-red-500 cursor-not-allowed"
//               : "hover:border-indigo-500"
//           }
//           ${isSelected ? "bg-indigo-600 text-white" : ""}
//         `}
//       >
//         {slot.startTime} - {slot.endTime}
//       </button>
//     );
//   };

//   if (!isOpen) return null;

//   if (isBooked && appointmentData) {
//     return (
//       <AppointmentConfirmationModal
//         isOpen
//         appointment={appointmentData}
//         onClose={onClose}
//       />
//     );
//   }

//   /* -------------------------------------------
//      UI
//   ------------------------------------------- */
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative h-auto max-h-[90vh] overflow-y-auto">
//         <button onClick={onClose} className="absolute top-4 right-4 text-xl">
//           <FiX />
//         </button>

//         <div className="px-6 pt-6">
//           <h2 className="text-2xl font-semibold">Book Appointment</h2>
//         </div>

//         <div className="px-6 mt-4 flex items-center gap-4">
//           {loading ? (
//             <p>Loading...</p>
//           ) : counsellor ? (
//             <>
//               <img
//                 src={counsellor.imageUrl}
//                 className="w-16 h-16 rounded-full object-cover"
//                 alt=""
//               />
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {counsellor.firstName} {counsellor.lastName}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   {counsellor.experience} Experience
//                 </p>
//               </div>
//             </>
//           ) : null}
//         </div>

//         <div className="px-6 mt-6">
//           <p className="font-medium mb-3">Available Days</p>
//           <div className="flex gap-3 overflow-x-auto pb-2">
//             {availableDays.map((day) => (
//               <button
//                 key={day.fullDate}
//                 onClick={() => setSelectedDay(day)}
//                 className={`px-4 py-2 min-w-[100px] rounded-lg border ${
//                   selectedDay?.fullDate === day.fullDate
//                     ? "bg-indigo-600 text-white"
//                     : ""
//                 }`}
//               >
//                 <div className="font-semibold">{day.label}</div>
//                 <div className="text-sm">{day.date}</div>
//               </button>
//             ))}
//           </div>
//         </div>

//         <hr className="my-4" />

//         {["morning", "afternoon", "evening"].map((period) => (
//           <div key={period} className="px-6 mb-4">
//             <button className="flex justify-between w-full font-medium">
//               {period.charAt(0).toUpperCase() + period.slice(1)} Slots
//             </button>

//             {loadingSlots ? (
//               <p className="text-sm mt-2">Loading...</p>
//             ) : slots[period]?.length ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
//                 {slots[period].map((slot) => (
//                   <SlotCard key={slot.startTime} slot={slot} />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm italic text-gray-500 mt-2">
//                 No {period} slots
//               </p>
//             )}
//           </div>
//         ))}

//         <div className="px-6 py-4 border-t">
//           <button
//             onClick={bookAppointment}
//             disabled={!selectedSlot}
//             className={`w-full py-3 rounded-lg text-white ${
//               selectedSlot ? "bg-indigo-600" : "bg-gray-300"
//             }`}
//           >
//             Book Appointment Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import AppointmentConfirmationModal from "./AppointmentConfirmationModal";

const BASE_URL =
  "https://mindsoul-backend-772700176760.asia-south1.run.app/api";

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
        date: d.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        }),
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

    async function fetchCounsellor() {
      try {
        setLoading(true);

        const res = await fetch(`${BASE_URL}/counsellor/${counsellorId}`);
        const data = await res.json();

        if (data?.counsellor) {
          setCounsellor(data.counsellor);
          const days = generateNextDays();
          setAvailableDays(days);
          setSelectedDay(days[0]);
        }
      } catch (err) {
        console.error("Fetch counsellor error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounsellor();
  }, [isOpen, counsellorId]);

  /* -------------------------------------------
     LOAD SLOTS
  ------------------------------------------- */
  const loadSlotsForDate = async (date) => {
    try {
      setLoadingSlots(true);
      setSelectedSlot(null);

      const refreshRes = await fetch(
        `${BASE_URL}/timeslots/counsellor/${counsellorId}/refresh?date=${date}`,
        { method: "POST", credentials: "include" }
      );

      console.log("Refresh slots status:", refreshRes.status);

      const resAvail = await fetch(
        `${BASE_URL}/timeslots/counsellor/${counsellorId}/slots?date=${date}`,
        { credentials: "include" }
      );
      const availData = await resAvail.json();

      const resBooked = await fetch(
        `${BASE_URL}/timeslots/counsellor/${counsellorId}/booked?date=${date}`,
        { credentials: "include" }
      );
      const bookedData = await resBooked.json();

      const slotMap = new Map();

      ["morning", "afternoon", "evening"].forEach((period) => {
        (availData.slots?.[period] || []).forEach((s) => {
          slotMap.set(s.startTime, { ...s, isBooked: false });
        });
      });

      (bookedData.bookedSlots || []).forEach((s) => {
        slotMap.set(s.startTime, { ...s, isBooked: true });
      });

      let mergedSlots = Array.from(slotMap.values());

      if (date === new Date().toISOString().split("T")[0]) {
        const now = new Date();
        mergedSlots = mergedSlots.filter((slot) => {
          const [h, m] = slot.startTime.split(":").map(Number);
          const slotTime = new Date();
          slotTime.setHours(h, m, 0, 0);
          return slotTime > now;
        });
      }

      const grouped = { morning: [], afternoon: [], evening: [] };

      mergedSlots.forEach((s) => {
        const hour = parseInt(s.startTime.split(":")[0], 10);
        if (hour < 12) grouped.morning.push(s);
        else if (hour < 17) grouped.afternoon.push(s);
        else grouped.evening.push(s);
      });

      setSlots(grouped);
    } catch (err) {
      console.error("Load slots error:", err);
      setSlots({ morning: [], afternoon: [], evening: [] });
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedDay) {
      loadSlotsForDate(selectedDay.fullDate);
    }
  }, [selectedDay]);

  /* -------------------------------------------
     LOAD RAZORPAY SCRIPT
  ------------------------------------------- */
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* -------------------------------------------
     BOOK APPOINTMENT + RAZORPAY PAYMENT
  ------------------------------------------- */
  const handlePaymentAndBooking = async () => {
    if (!selectedSlot || !selectedDay) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again");
        return;
      }

      // 1️⃣ Create appointment
      const res = await fetch(`${BASE_URL}/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          counsellorId,
          date: selectedDay.fullDate,
          timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Booking failed");
      }

      const appointment = data.appointment;

      // 2️⃣ Load Razorpay
      const resScript = await loadRazorpayScript();
      if (!resScript) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // 3️⃣ Razorpay options
      const options = {
        key: "rzp_test_Rv3rhMFLbflgAX", // Replace with your Razorpay Key
        amount: appointment.amount * 100, // in paise
        currency: "INR",
        name: "MindSoul Counselling",
        description: `Session with ${appointment.counsellorProfileSnapshot.firstName}`,
        order_id: appointment.orderId, // if backend provides
        handler: async function (response) {
          console.log("Payment success:", response);

          // 4️⃣ Confirm payment with backend
          const confirmRes = await fetch(
            `${BASE_URL}/appointment/confirm-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                appointmentId: appointment.appointmentId,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }),
            }
          );

          const confirmData = await confirmRes.json();
          if (confirmData.success) {
            setAppointmentData(confirmData.appointment);
            setIsBooked(true);
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          email: appointment.studentEmail,
        },
        theme: { color: "#6366f1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Booking/payment error:", err);
      alert(err.message || "Something went wrong");
    }
  };

  const SlotCard = ({ slot }) => {
    const isSelected =
      selectedSlot?.startTime === slot.startTime &&
      selectedSlot?.endTime === slot.endTime;

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
          ${isSelected ? "bg-indigo-600 text-white" : ""}`}
      >
        {slot.startTime} - {slot.endTime}
      </button>
    );
  };

  if (!isOpen) return null;

  if (isBooked && appointmentData) {
    return (
      <AppointmentConfirmationModal
        isOpen
        appointment={appointmentData}
        onClose={onClose}
      />
    );
  }

  /* -------------------------------------------
     UI
  ------------------------------------------- */
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative h-auto max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          <FiX />
        </button>

        <div className="px-6 pt-6">
          <h2 className="text-2xl font-semibold">Book Appointment</h2>
        </div>

        <div className="px-6 mt-4 flex items-center gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : counsellor ? (
            <>
              <img
                src={counsellor.imageUrl}
                className="w-16 h-16 rounded-full object-cover"
                alt=""
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {counsellor.firstName} {counsellor.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {counsellor.experience} Experience
                </p>
              </div>
            </>
          ) : null}
        </div>

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
                    : ""
                }`}
              >
                <div className="font-semibold">{day.label}</div>
                <div className="text-sm">{day.date}</div>
              </button>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {["morning", "afternoon", "evening"].map((period) => (
          <div key={period} className="px-6 mb-4">
            <button className="flex justify-between w-full font-medium">
              {period.charAt(0).toUpperCase() + period.slice(1)} Slots
            </button>

            {loadingSlots ? (
              <p className="text-sm mt-2">Loading...</p>
            ) : slots[period]?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                {slots[period].map((slot) => (
                  <SlotCard key={slot.startTime} slot={slot} />
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-gray-500 mt-2">
                No {period} slots
              </p>
            )}
          </div>
        ))}

        <div className="px-6 py-4 border-t">
          <button
            onClick={handlePaymentAndBooking}
            disabled={!selectedSlot}
            className={`w-full py-3 rounded-lg text-white ${
              selectedSlot ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            Book & Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
