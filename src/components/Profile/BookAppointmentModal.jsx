// NEW FINAL CODE:
// import React, { useState, useEffect } from "react";
// import { FiX } from "react-icons/fi";
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
//   const [processingPayment, setProcessingPayment] = useState(false);
//   const [isBooked, setIsBooked] = useState(false);
//   const [appointmentData, setAppointmentData] = useState(null);

//   /* -------------------- Generate Next 14 Days -------------------- */
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
//         date: d.toLocaleDateString("en-US", { day: "2-digit", month: "short" }),
//         fullDate: d.toISOString().split("T")[0],
//       });
//     }
//     console.log("Generated next 14 days:", days);
//     return days;
//   };

//   /* -------------------- Fetch Counsellor -------------------- */
//   useEffect(() => {
//     if (!isOpen || !counsellorId) return;
//     async function fetchCounsellor() {
//       try {
//         setLoading(true);
//         const res = await fetch(`${BASE_URL}/counsellor/${counsellorId}`);
//         const data = await res.json();
//         console.log("Fetched counsellor data:", data);
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

//   /* -------------------- Load Slots -------------------- */
//   const loadSlotsForDate = async (date) => {
//     try {
//       setLoadingSlots(true);
//       setSelectedSlot(null);

//       console.log("Refreshing slots for date:", date);
//       await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/refresh?date=${date}`,
//         { method: "POST", credentials: "include" }
//       );

//       const resAvail = await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/slots?date=${date}`,
//         { credentials: "include" }
//       );
//       const availData = await resAvail.json();
//       // console.log("Available slots data:", availData);

//       const resBooked = await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/booked?date=${date}`,
//         { credentials: "include" }
//       );
//       const bookedData = await resBooked.json();
//       // console.log("Booked slots data:", bookedData);

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

//       // console.log("Grouped slots:", grouped);
//       setSlots(grouped);
//     } catch (err) {
//       console.error("Load slots error:", err);
//       setSlots({ morning: [], afternoon: [], evening: [] });
//     } finally {
//       setLoadingSlots(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedDay) loadSlotsForDate(selectedDay.fullDate);
//   }, [selectedDay]);

//   /* -------------------- Load Razorpay Script -------------------- */
//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   /* -------------------- Book + Payment -------------------- */
//   const handlePaymentAndBooking = async () => {
//     if (!selectedSlot || !selectedDay) return;

//     try {
//       setProcessingPayment(true);
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please login again");

//       // console.log("Booking slot:", selectedSlot, "on day:", selectedDay);

//       /* 1️⃣ CREATE APPOINTMENT */
//       const res = await fetch(`${BASE_URL}/appointment`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           counsellorId,
//           date: selectedDay.fullDate,
//           timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}`,
//         }),
//       });
//       const data = await res.json();
//       console.log("Appointment creation response:", data);
//       if (!res.ok || !data.success)
//         throw new Error(data.message || "Booking failed");
//       const appointment = data.appointment;

//       /* 2️⃣ CREATE RAZORPAY ORDER */
//       const orderRes = await fetch(`${BASE_URL}/payment/create-order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ appointmentId: appointment.appointmentId }),
//       });
//       const orderData = await orderRes.json();
//       console.log("Razorpay order creation response:", orderData);
//       if (!orderRes.ok || !orderData.success)
//         throw new Error("Failed to create Razorpay order");

//       const loaded = await loadRazorpayScript();
//       if (!loaded) throw new Error("Razorpay SDK failed to load");

//       /* 3️⃣ RAZORPAY PAYMENT */
//       const options = {
//         key: "rzp_test_Rv3rhMFLbflgAX",
//         amount: orderData.order.amount,
//         currency: "INR",
//         name: "MindSoul Counselling",
//         description: `Session with ${appointment.counsellorProfileSnapshot.firstName}`,
//         order_id: orderData.order.id,
//         handler: async (response) => {
//           try {
//             // console.log("Razorpay payment success response:", response);

//             /* 4️⃣ VERIFY PAYMENT */
//             const verifyRes = await fetch(
//               `${BASE_URL}/payment/verify-payment`,
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                   appointmentId: appointment.appointmentId,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_signature: response.razorpay_signature,
//                 }),
//               }
//             );
//             const verifyData = await verifyRes.json();
//             console.log("Verify payment response:", verifyData);
//             if (!verifyRes.ok || !verifyData.success)
//               throw new Error("Verification failed");

//             /* 5️⃣ UPDATE SLOT UI */
//             setSlots((prev) => {
//               const updated = { ...prev };
//               Object.keys(updated).forEach((p) => {
//                 updated[p] = updated[p].map((s) =>
//                   s.startTime === selectedSlot.startTime
//                     ? { ...s, isBooked: true }
//                     : s
//                 );
//               });
//               return updated;
//             });

//             const finalAppointment = verifyData.appointment || appointment;
//             // console.log("Final appointment data:", finalAppointment);

//             setAppointmentData(finalAppointment);
//             setIsBooked(true);
//           } catch (err) {
//             console.error("Payment handler error:", err);
//             alert("Payment successful but verification failed");
//           }
//         },
//         prefill: { email: appointment.studentEmail },
//         theme: { color: "#778DA9" },
//       };

//       console.log("Razorpay options:", options);
//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error("Booking & Payment Error:", err);
//       alert(err.message || "Something went wrong");
//     } finally {
//       setProcessingPayment(false);
//     }
//   };

//   /* -------------------- Slot Card -------------------- */
//   const SlotCard = ({ slot }) => {
//     const isSelected =
//       selectedSlot?.startTime === slot.startTime &&
//       selectedSlot?.endTime === slot.endTime;

//     return (
//       <button
//         disabled={slot.isBooked}
//         onClick={() => {
//           console.log("Selected slot:", slot);
//           setSelectedSlot(slot);
//         }}
//         className={`border rounded-lg px-4 py-2 text-sm transition
//           ${
//             slot.isBooked
//               ? "bg-red-100 text-red-500 cursor-not-allowed"
//               : "hover:border-accent"
//           }
//           ${isSelected ? "bg-primary text-white" : ""}`}
//       >
//         {slot.startTime} - {slot.endTime}
//         {slot.isBooked && (
//           <span className="ml-2 text-xs text-green-600">(Scheduled)</span>
//         )}
//       </button>
//     );
//   };

//   if (!isOpen) return null;
//   if (isBooked && appointmentData) {
//     console.log("Opening AppointmentConfirmationModal:", appointmentData);
//     return (
//       <AppointmentConfirmationModal
//         isOpen
//         appointment={appointmentData}
//         onClose={onClose}
//       />
//     );
//   }

//   /* -------------------- UI -------------------- */
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
//         <button onClick={onClose} className="absolute top-4 right-4 text-xl">
//           <FiX />
//         </button>

//         <div className="px-6 pt-6">
//           <h2 className="text-2xl font-semibold font-heading text-textDark">
//             Book Appointment
//           </h2>
//         </div>

//         {/* Counsellor Info */}
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

//         {/* Available Days */}
//         <div className="px-6 mt-6">
//           <p className="font-medium mb-3">Available Days</p>
//           <div className="flex gap-3 overflow-x-auto pb-2">
//             {availableDays.map((day) => (
//               <button
//                 key={day.fullDate}
//                 onClick={() => {
//                   console.log("Selected day:", day);
//                   setSelectedDay(day);
//                 }}
//                 className={`px-4 py-2 min-w-[100px] rounded-lg border ${
//                   selectedDay?.fullDate === day.fullDate
//                     ? "bg-primary text-light"
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

//         {/* Slots */}
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

//         {/* Book & Pay */}
//         <div className="px-6 py-4 border-t">
//           <button
//             onClick={handlePaymentAndBooking}
//             disabled={!selectedSlot || processingPayment}
//             className={`w-full py-3 rounded-lg text-white ${
//               selectedSlot ? "bg-primary" : "bg-gray-300"
//             }`}
//           >
//             {processingPayment ? "Processing..." : "Book & Pay Now"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// GITHUB CODE -
// import React, { useState, useEffect } from "react";
// import { FiX } from "react-icons/fi";
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
//   const [processingPayment, setProcessingPayment] = useState(false);
//   const [isBooked, setIsBooked] = useState(false);
//   const [appointmentData, setAppointmentData] = useState(null);
//   const [showFinalLoader, setShowFinalLoader] = useState(false);

//   const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

//   /* -------------------- Generate Next 14 Days -------------------- */
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

//   /* -------------------- Fetch Counsellor -------------------- */
//   useEffect(() => {
//     if (!isOpen || !counsellorId) return;

//     const fetchCounsellor = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${BASE_URL}/counsellor/${counsellorId}`);
//         const data = await res.json();

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
//     };

//     fetchCounsellor();
//   }, [isOpen, counsellorId]);

//   /* -------------------- Load Slots -------------------- */
//   const loadSlotsForDate = async (date) => {
//     try {
//       setLoadingSlots(true);
//       setSelectedSlot(null);

//       await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/refresh?date=${date}`,
//         { method: "POST", credentials: "include" },
//       );

//       const resAvail = await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/slots?date=${date}`,
//         { credentials: "include" },
//       );
//       const availData = await resAvail.json();

//       const resBooked = await fetch(
//         `${BASE_URL}/timeslots/counsellor/${counsellorId}/booked?date=${date}`,
//         { credentials: "include" },
//       );
//       const bookedData = await resBooked.json();

//       const slotMap = new Map();

//       ["morning", "afternoon", "evening"].forEach((period) => {
//         (availData.slots?.[period] || []).forEach((s) => {
//           slotMap.set(s.startTime, { ...s, isBooked: false });
//         });
//       });

//       (bookedData.bookedSlots || []).forEach((s) => {
//         slotMap.set(s.startTime, { ...s, isBooked: true });
//       });

//       const grouped = { morning: [], afternoon: [], evening: [] };

//       Array.from(slotMap.values()).forEach((s) => {
//         const hour = parseInt(s.startTime.split(":")[0], 10);
//         if (hour < 12) grouped.morning.push(s);
//         else if (hour < 16) grouped.afternoon.push(s);
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
//     if (selectedDay) loadSlotsForDate(selectedDay.fullDate);
//   }, [selectedDay]);

//   /* -------------------- Razorpay Script -------------------- */
//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   /* -------------------- Book + Payment -------------------- */
//   const handlePaymentAndBooking = async () => {
//     if (!selectedSlot || !selectedDay) return;

//     try {
//       setProcessingPayment(true);
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please login again");

//       const res = await fetch(`${BASE_URL}/appointment`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           counsellorId,
//           date: selectedDay.fullDate,
//           timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}`,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok || !data.success)
//         throw new Error(data.message || "Booking failed");

//       const appointment = data.appointment;

//       const orderRes = await fetch(`${BASE_URL}/payment/create-order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ appointmentId: appointment.appointmentId }),
//       });

//       const orderData = await orderRes.json();
//       if (!orderRes.ok || !orderData.success)
//         throw new Error("Failed to create Razorpay order");

//       const loaded = await loadRazorpayScript();
//       if (!loaded) throw new Error("Razorpay SDK failed to load");

//       new window.Razorpay({
//         key: razorpayKey,
//         amount: orderData.order.amount,
//         currency: "INR",
//         name: "MindSoul Counselling",
//         description: "Counselling Session",
//         order_id: orderData.order.id,
//         handler: async (response) => {
//           // 🔒 SHOW FINAL LOADER
//           setShowFinalLoader(true);
//           const verifyRes = await fetch(`${BASE_URL}/payment/verify-payment`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               appointmentId: appointment.appointmentId,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             }),
//           });

//           const verifyData = await verifyRes.json();
//           if (!verifyRes.ok || !verifyData.success)
//             throw new Error("Payment verification failed");

//           setAppointmentData(verifyData.appointment || appointment);
//           setIsBooked(true);
//           setShowFinalLoader(false);
//         },
//         theme: { color: "#778DA9" },
//       }).open();
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Something went wrong");
//       setShowFinalLoader(false);
//     } finally {
//       setProcessingPayment(false);
//     }
//   };

//   /* -------------------- Slot Card -------------------- */
//   const SlotCard = ({ slot }) => {
//     const isSelected =
//       selectedSlot?.startTime === slot.startTime &&
//       selectedSlot?.endTime === slot.endTime;

//     const isPast =
//       selectedDay?.fullDate === new Date().toISOString().split("T")[0] &&
//       (() => {
//         const [h, m] = slot.startTime.split(":").map(Number);
//         const t = new Date();
//         t.setHours(h, m, 0, 0);
//         return t <= new Date();
//       })();

//     return (
//       <button
//         disabled={slot.isBooked || isPast}
//         onClick={() => !slot.isBooked && !isPast && setSelectedSlot(slot)}
//         className={`border rounded-lg px-4 py-2 text-sm
//           ${
//             slot.isBooked
//               ? "bg-red-100 text-red-500 cursor-not-allowed"
//               : isPast
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "hover:border-accent"
//           }
//           ${isSelected ? "bg-primary text-white" : ""}

//         `}
//       >
//         {slot.startTime} - {slot.endTime}
//         {/* {slot.isBooked && (
//           <span className="ml-2 text-xs text-green-600">(Scheduled)</span>
//         )} */}
//       </button>
//     );
//   };

//   if (!isOpen) return null;

//   /* -------------------- FINAL LOADER UI -------------------- */
//   if (showFinalLoader) {
//     return (
//       <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
//         <div className="bg-white rounded-2xl p-8 text-center max-w-md">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
//           <h3 className="text-lg font-semibold mb-2">
//             Confirming Your Appointment
//           </h3>
//           <p className="text-sm text-gray-600">
//             Please do not refresh or close this page.
//             <br />
//             Your payment is being verified.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isBooked && appointmentData) {
//     return (
//       <AppointmentConfirmationModal
//         isOpen
//         appointment={appointmentData}
//         onClose={onClose}
//       />
//     );
//   }

//   /* -------------------- UI -------------------- */
//   // return (
//   //   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//   //     <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative">
//   //       <button onClick={onClose} className="absolute top-4 right-4 text-xl">
//   //         <FiX />
//   //       </button>

//   //       <div className="px-6 pt-6">
//   //         <h2 className="text-2xl font-semibold">Book Appointment</h2>
//   //       </div>

//   //       {/* Counsellor Info */}
//   //       <div className="px-6 mt-4 flex items-center gap-4">
//   //         {loading ? (
//   //           <p>Loading...</p>
//   //         ) : counsellor ? (
//   //           <>
//   //             <img
//   //               src={counsellor.imageUrl}
//   //               className="w-16 h-16 rounded-full object-cover"
//   //               alt=""
//   //             />
//   //             <div>
//   //               <h3 className="text-lg font-semibold">
//   //                 {counsellor.firstName} {counsellor.lastName}
//   //               </h3>
//   //               <p className="text-sm text-gray-500">
//   //                 {counsellor.experience} Experience
//   //               </p>
//   //             </div>
//   //           </>
//   //         ) : null}
//   //       </div>

//   //       {/* Days */}
//   //       <div className="px-6 mt-4 flex gap-3 overflow-x-auto">
//   //         {availableDays.map((day) => (
//   //           <button
//   //             key={day.fullDate}
//   //             onClick={() => setSelectedDay(day)}
//   //             className={`px-4 py-2 rounded-lg border ${
//   //               selectedDay?.fullDate === day.fullDate
//   //                 ? "bg-primary text-white"
//   //                 : ""
//   //             }`}
//   //           >
//   //             <div>{day.label}</div>
//   //             <div className="text-sm">{day.date}</div>
//   //           </button>
//   //         ))}
//   //       </div>

//   //       {/* Slots */}
//   //       {["morning", "afternoon", "evening"].map((period) => (
//   //         <div key={period} className="px-6 mt-4">
//   //           <p className="font-medium capitalize">{period} Slots</p>
//   //           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 ">
//   //             {slots[period].map((slot) => (
//   //               <SlotCard key={slot.startTime} slot={slot} />
//   //             ))}
//   //           </div>
//   //         </div>
//   //       ))}

//   //       {/* Book */}
//   //       <div className="px-6 py-4">
//   //         <button
//   //           onClick={handlePaymentAndBooking}
//   //           disabled={!selectedSlot || processingPayment}
//   //           className={`w-full py-3 rounded-lg text-white cursor-pointer ${
//   //             selectedSlot ? "bg-primary" : "bg-gray-300"
//   //           }`}
//   //         >
//   //           {processingPayment ? "Processing..." : "Book & Pay Now"}
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   /* -------------------- UI -------------------- */
//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
//       {/* Modal Container */}
//       <div
//         className="
//       bg-white w-full
//       h-[95vh] sm:h-auto
//       sm:max-w-2xl
//       rounded-t-3xl sm:rounded-2xl
//       shadow-xl
//       relative
//       flex flex-col
//     "
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-xl z-10"
//         >
//           <FiX />
//         </button>

//         {/* Scrollable Content */}
//         <div className="overflow-y-auto flex-1 pb-4">
//           {/* Header */}
//           <div className="px-4 sm:px-6 pt-6">
//             <h2 className="text-xl sm:text-2xl font-semibold">
//               Book Appointment
//             </h2>
//           </div>

//           {/* Counsellor Info */}
//           <div className="px-4 sm:px-6 mt-4 flex items-center gap-3 sm:gap-4">
//             {loading ? (
//               <p>Loading...</p>
//             ) : counsellor ? (
//               <>
//                 <img
//                   src={counsellor.imageUrl}
//                   className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
//                   alt=""
//                 />
//                 <div>
//                   <h3 className="text-base sm:text-lg font-semibold leading-tight">
//                     {counsellor.firstName} {counsellor.lastName}
//                   </h3>
//                   <p className="text-xs sm:text-sm text-gray-500">
//                     {counsellor.experience} Experience
//                   </p>
//                 </div>
//               </>
//             ) : null}
//           </div>

//           {/* Days */}
//           <div className="px-4 sm:px-6 mt-4 flex gap-2 sm:gap-3 overflow-x-auto pb-2">
//             {availableDays.map((day) => (
//               <button
//                 key={day.fullDate}
//                 onClick={() => setSelectedDay(day)}
//                 className={`
//                 min-w-[80px]
//                 px-3 sm:px-4 py-2
//                 rounded-lg border text-sm
//                 ${
//                   selectedDay?.fullDate === day.fullDate
//                     ? "bg-primary text-white"
//                     : "bg-white"
//                 }
//               `}
//               >
//                 <div>{day.label}</div>
//                 <div className="text-xs sm:text-sm">{day.date}</div>
//               </button>
//             ))}
//           </div>

//           {/* Slots */}
//           {["morning", "afternoon", "evening"].map((period) => (
//             <div key={period} className="px-4 sm:px-6 mt-4">
//               <p className="font-medium capitalize text-sm sm:text-base">
//                 {period} Slots
//               </p>

//               <div
//                 className="
//               grid
//               grid-cols-2
//               sm:grid-cols-3
//               md:grid-cols-4
//               gap-2 sm:gap-3
//               mt-2
//             "
//               >
//                 {slots[period].map((slot) => (
//                   <SlotCard key={slot.startTime} slot={slot} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Sticky Book Button */}
//         <div className="px-4 sm:px-6 py-3 border-t bg-white">
//           <button
//             onClick={handlePaymentAndBooking}
//             disabled={!selectedSlot || processingPayment}
//             className={`
//             w-full py-3 rounded-lg text-white text-sm sm:text-base
//             ${selectedSlot ? "bg-primary" : "bg-gray-300"}
//           `}
//           >
//             {processingPayment ? "Processing..." : "Book & Pay Now"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
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
  const [processingPayment, setProcessingPayment] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showFinalLoader, setShowFinalLoader] = useState(false);
  const clickLockRef = useRef(false);
  const [errorMsg, setErrorMsg] = useState("");

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  /* -------------------- Generate Next 14 Days -------------------- */
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

  /* -------------------- Fetch Counsellor -------------------- */
  useEffect(() => {
    if (!isOpen || !counsellorId) return;

    const fetchCounsellor = async () => {
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
    };

    fetchCounsellor();
  }, [isOpen, counsellorId]);

  /* -------------------- Load Slots -------------------- */
  // const loadSlotsForDate = async (date) => {
  //   try {
  //     setLoadingSlots(true);
  //     setSelectedSlot(null);

  //     await fetch(
  //       `${BASE_URL}/timeslots/counsellor/${counsellorId}/refresh?date=${date}`,
  //       { method: "POST", credentials: "include" },
  //     );

  //     const resAvail = await fetch(
  //       `${BASE_URL}/timeslots/counsellor/${counsellorId}/slots?date=${date}`,
  //       { credentials: "include" },
  //     );
  //     const availData = await resAvail.json();

  //     const resBooked = await fetch(
  //       `${BASE_URL}/timeslots/counsellor/${counsellorId}/booked?date=${date}`,
  //       { credentials: "include" },
  //     );
  //     const bookedData = await resBooked.json();

  //     const slotMap = new Map();

  //     ["morning", "afternoon", "evening"].forEach((period) => {
  //       (availData.slots?.[period] || []).forEach((s) => {
  //         slotMap.set(s.startTime, { ...s, isBooked: false });
  //       });
  //     });

  //     // ✅ FIX: merge instead of overwrite
  //     (bookedData.bookedSlots || []).forEach((s) => {
  //       slotMap.set(s.startTime, {
  //         ...(slotMap.get(s.startTime) || {}),
  //         ...s,
  //         isBooked: true,
  //       });
  //     });

  //     const grouped = { morning: [], afternoon: [], evening: [] };

  //     Array.from(slotMap.values()).forEach((s) => {
  //       const hour = parseInt(s.startTime.split(":")[0], 10);
  //       if (hour < 12) grouped.morning.push(s);
  //       else if (hour < 16) grouped.afternoon.push(s);
  //       else grouped.evening.push(s);
  //     });

  //     setSlots(grouped);
  //   } catch (err) {
  //     console.error("Load slots error:", err);
  //     setSlots({ morning: [], afternoon: [], evening: [] });
  //   } finally {
  //     setLoadingSlots(false);
  //   }
  // };

  const loadSlotsForDate = async (date) => {
    try {
      setLoadingSlots(true);
      setSelectedSlot(null);

      await fetch(
        `${BASE_URL}/timeslots/counsellor/${counsellorId}/refresh?date=${date}`,
        { method: "POST", credentials: "include" },
      );

      const resAvail = await fetch(
        `${BASE_URL}/timeslots/counsellor/${counsellorId}/slots?date=${date}`,
        { credentials: "include" },
      );
      const availData = await resAvail.json();

      const resBooked = await fetch(
        `${BASE_URL}/timeslots/counsellor/${counsellorId}/booked?date=${date}`,
        { credentials: "include" },
      );
      const bookedData = await resBooked.json();

      const slotMap = new Map();

      ["morning", "afternoon", "evening"].forEach((period) => {
        (availData.slots?.[period] || []).forEach((s) => {
          slotMap.set(s.startTime, { ...s, isBooked: false });
        });
      });

      // merge booked
      (bookedData.bookedSlots || []).forEach((s) => {
        slotMap.set(s.startTime, {
          ...(slotMap.get(s.startTime) || {}),
          ...s,
          isBooked: true,
        });
      });

      const grouped = { morning: [], afternoon: [], evening: [] };

      // ✅ FIX: sort first
      const allSlots = Array.from(slotMap.values());

      allSlots.sort((a, b) => {
        const [ah, am] = a.startTime.split(":").map(Number);
        const [bh, bm] = b.startTime.split(":").map(Number);
        return ah * 60 + am - (bh * 60 + bm);
      });

      // ✅ then group
      allSlots.forEach((s) => {
        const hour = parseInt(s.startTime.split(":")[0], 10);
        if (hour < 12) grouped.morning.push(s);
        else if (hour < 16) grouped.afternoon.push(s);
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
    if (selectedDay) loadSlotsForDate(selectedDay.fullDate);
  }, [selectedDay]);

  /* -------------------- Razorpay Script -------------------- */
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  /* -------------------- Book + Payment -------------------- */
  // const handlePaymentAndBooking = async () => {
  //   if (!selectedSlot || !selectedDay) return;

  //   try {
  //     setProcessingPayment(true);
  //     const token = localStorage.getItem("token");
  //     if (!token) return alert("Please login again");

  //     const res = await fetch(`${BASE_URL}/appointment`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         counsellorId,
  //         date: selectedDay.fullDate,
  //         timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}`,
  //       }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok || !data.success)
  //       throw new Error(data.message || "Booking failed");

  //     const appointment = data.appointment;

  //     const orderRes = await fetch(`${BASE_URL}/payment/create-order`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ appointmentId: appointment.appointmentId }),
  //     });

  //     const orderData = await orderRes.json();
  //     if (!orderRes.ok || !orderData.success)
  //       throw new Error("Failed to create Razorpay order");

  //     const loaded = await loadRazorpayScript();
  //     if (!loaded) throw new Error("Razorpay SDK failed to load");

  //     new window.Razorpay({
  //       key: razorpayKey,
  //       amount: orderData.order.amount,
  //       currency: "INR",
  //       name: "MindSoul Counselling",
  //       description: "Counselling Session",
  //       order_id: orderData.order.id,

  //       handler: async (response) => {
  //         setShowFinalLoader(true);

  //         const verifyRes = await fetch(`${BASE_URL}/payment/verify-payment`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify({
  //             appointmentId: appointment.appointmentId,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_signature: response.razorpay_signature,
  //           }),
  //         });

  //         const verifyData = await verifyRes.json();
  //         if (!verifyRes.ok || !verifyData.success)
  //           throw new Error("Payment verification failed");

  //         setAppointmentData(verifyData.appointment || appointment);
  //         setIsBooked(true);
  //         setShowFinalLoader(false);
  //       },

  //       // ✅ MAIN FIX: refresh page on cancel
  //       modal: {
  //         ondismiss: () => {
  //           window.location.reload();
  //         },
  //       },

  //       theme: { color: "#778DA9" },
  //     }).open();
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message || "Something went wrong");
  //     setShowFinalLoader(false);
  //   } finally {
  //     setProcessingPayment(false);
  //   }
  // };

  const handlePaymentAndBooking = async () => {
    if (!selectedSlot || !selectedDay) return;

    // ✅ HARD LOCK (prevents rapid clicks instantly)
    if (clickLockRef.current) return;
    clickLockRef.current = true;

    try {
      setErrorMsg("");
      setProcessingPayment(true);

      const token = localStorage.getItem("token");
      if (!token) {
        clickLockRef.current = false;
        return alert("Please login again");
      }

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

      // ✅ HANDLE 429
      if (res.status === 429) {
        setErrorMsg("Too many requests. Please wait a few seconds.");
        throw new Error("Too many requests");
      }

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Booking failed");

      const appointment = data.appointment;

      const orderRes = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ appointmentId: appointment.appointmentId }),
      });

      // ✅ HANDLE 429 AGAIN
      if (orderRes.status === 429) {
        setErrorMsg("Too many requests. Please wait before retrying.");
        throw new Error("Too many requests");
      }

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success)
        throw new Error("Failed to create Razorpay order");

      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Razorpay SDK failed to load");

      new window.Razorpay({
        key: razorpayKey,
        amount: orderData.order.amount,
        currency: "INR",
        name: "MindSoul Counselling",
        description: "Counselling Session",
        order_id: orderData.order.id,

        handler: async (response) => {
          setShowFinalLoader(true);

          const verifyRes = await fetch(`${BASE_URL}/payment/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              appointmentId: appointment.appointmentId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok || !verifyData.success)
            throw new Error("Payment verification failed");

          setAppointmentData(verifyData.appointment || appointment);
          setIsBooked(true);
          setShowFinalLoader(false);
        },

        modal: {
          ondismiss: () => {
            window.location.reload();
          },
        },

        theme: { color: "#778DA9" },
      }).open();
    } catch (err) {
      console.error(err);

      if (!errorMsg) {
        setErrorMsg(err.message || "Something went wrong");
      }

      setShowFinalLoader(false);
    } finally {
      setProcessingPayment(false);

      // ✅ release lock AFTER delay (prevents spam retry)
      setTimeout(() => {
        clickLockRef.current = false;
      }, 2000);
    }
  };

  /* -------------------- Slot Card -------------------- */
  const SlotCard = ({ slot }) => {
    const isSelected =
      selectedSlot?.startTime === slot.startTime &&
      selectedSlot?.endTime === slot.endTime;

    const isPast =
      selectedDay?.fullDate === new Date().toISOString().split("T")[0] &&
      (() => {
        const [h, m] = slot.startTime.split(":").map(Number);
        const t = new Date();
        t.setHours(h, m, 0, 0);
        return t <= new Date();
      })();

    return (
      <button
        disabled={slot.isBooked || isPast}
        onClick={() => !slot.isBooked && !isPast && setSelectedSlot(slot)}
        className={`border rounded-lg px-4 py-2 text-sm
          ${
            slot.isBooked
              ? "bg-red-100 text-red-500 cursor-not-allowed"
              : isPast
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:border-accent"
          }
          ${isSelected ? "bg-primary text-white" : ""}
        `}
      >
        {slot.startTime} - {slot.endTime}
      </button>
    );
  };

  if (!isOpen) return null;

  if (showFinalLoader) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">
            Confirming Your Appointment
          </h3>
          <p className="text-sm text-gray-600">
            Please do not refresh or close this page.
          </p>
        </div>
      </div>
    );
  }

  if (isBooked && appointmentData) {
    return (
      <AppointmentConfirmationModal
        isOpen
        appointment={appointmentData}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full h-[95vh] sm:h-auto sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-xl relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl z-10"
        >
          <FiX />
        </button>

        <div className="overflow-y-auto flex-1 pb-4">
          <div className="px-4 sm:px-6 pt-6">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Book Appointment
            </h2>
          </div>

          <div className="px-4 sm:px-6 mt-4 flex items-center gap-3">
            {loading ? (
              <p>Loading...</p>
            ) : counsellor ? (
              <>
                <img
                  src={counsellor.imageUrl}
                  className="w-14 h-14 rounded-full object-cover"
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold">
                    {counsellor.firstName} {counsellor.lastName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {counsellor.experience} Experience
                  </p>
                </div>
              </>
            ) : null}
          </div>

          <div className="px-4 sm:px-6 mt-4 flex gap-2 overflow-x-auto">
            {availableDays.map((day) => (
              <button
                key={day.fullDate}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  selectedDay?.fullDate === day.fullDate
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                <div>{day.label}</div>
                <div className="text-xs">{day.date}</div>
              </button>
            ))}
          </div>

          {["morning", "afternoon", "evening"].map((period) => (
            <div key={period} className="px-4 sm:px-6 mt-4">
              <p className="font-medium text-sm capitalize">{period} Slots</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {slots[period].map((slot) => (
                  <SlotCard key={slot.startTime} slot={slot} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-6 py-3 border-t">
          {errorMsg && (
            <p className="text-red-500 text-sm text-center mb-2">{errorMsg}</p>
          )}
          {/* <button
            onClick={handlePaymentAndBooking}
            disabled={!selectedSlot || processingPayment}
            className={`w-full py-3 rounded-lg text-white ${
              selectedSlot ? "bg-primary" : "bg-gray-300"
            }`}
          >
            {processingPayment ? "Processing..." : "Book & Pay Now"}
          </button> */}
          <button
            onClick={handlePaymentAndBooking}
            disabled={
              !selectedSlot || processingPayment || clickLockRef.current
            }
            className={`w-full py-3 rounded-lg text-white ${
              selectedSlot ? "bg-primary" : "bg-gray-300"
            }`}
          >
            {processingPayment ? "Processing..." : "Book & Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
