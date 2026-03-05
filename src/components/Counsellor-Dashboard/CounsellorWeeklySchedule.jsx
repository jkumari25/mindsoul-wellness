import { useEffect, useState } from "react";

const BASE_URL =
  "https://mindsoul-backend-772700176760.asia-south1.run.app/api";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PERIODS = ["morning", "afternoon", "evening"];

const actionBtnStyle = {
  padding: "8px 14px",
  background: "#ede9fe",
  color: "#4c1d95",
  border: "1px solid #c4b5fd",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export default function CounsellorWeeklySchedule() {
  const [counsellorId, setCounsellorId] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* -------------------------------
     GET counsellorId (OTP login)
  ------------------------------- */
  useEffect(() => {
    const storedCounsellorId = localStorage.getItem("counsellorId");
    const isLoggedIn = localStorage.getItem("isCounsellorLoggedIn");

    console.log("Stored counsellorId:", storedCounsellorId);
    console.log("Is counsellor logged in:", isLoggedIn);

    if (storedCounsellorId && isLoggedIn === "true") {
      setCounsellorId(storedCounsellorId);
    } else {
      console.error("Counsellor not logged in");
      setLoading(false);
    }
  }, []);

  /* -------------------------------
     FETCH Weekly Schedule
  ------------------------------- */
  useEffect(() => {
    if (!counsellorId) return;

    async function fetchSchedule() {
      try {
        console.log("Fetching schedule for:", counsellorId);

        const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
          credentials: "include",
        });

        console.log("GET status:", res.status);

        const data = await res.json();
        console.log("GET response data:", data);

        if (!res.ok) {
          throw new Error(data?.message || "Unauthorized");
        }

        const initial = data.weeklySchedule || data.schedulePreferences || {};

        setSchedule(initial);
      } catch (err) {
        console.error("Failed to fetch schedule:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, [counsellorId]);

  /* -------------------------------
     Toggle All
  ------------------------------- */
  function toggleAll(value) {
    const updated = {};
    DAYS.forEach((day) => {
      updated[day] = {
        morning: value,
        afternoon: value,
        evening: value,
      };
    });
    setSchedule(updated);
  }

  /* -------------------------------
     Toggle Slot
  ------------------------------- */
  function toggle(day, period) {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [period]: !prev[day]?.[period],
      },
    }));
  }

  /* -------------------------------
     SAVE Weekly Schedule
  ------------------------------- */
  async function saveSchedule() {
    if (!counsellorId) return;

    setSaving(true);

    try {
      console.log("Saving schedule:", schedule);

      const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weekly: schedule }),
      });

      console.log("PATCH status:", res.status);

      const data = await res.json();
      console.log("PATCH response data:", data);

      if (!res.ok) {
        throw new Error(data?.message || "Unauthorized");
      }

      alert("Weekly schedule updated");
    } catch (err) {
      console.error("Failed to save schedule:", err.message);
      alert("Session expired. Please login again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading schedule...</p>;

  return (
    <div style={{ maxWidth: "1100px", margin: "auto" }} className="font-body">
      <p className="text-md font-body">
        <span className="text-red-600 font-bold text-lg">Important Note:</span>
        <br /> To ensure your availability is visible to users, it is{" "}
        <strong>
          mandatory to update your weekly schedule every weekend.
        </strong>{" "}
        The schedule you set will be used to display your availability for the
        upcoming week to users. If the weekly schedule is not updated, your next
        week’s slots may not appear for booking.
      </p>
      <h2 className="text-lg mt-8">Weekly Availability</h2>

      <div
        style={{ marginBottom: "16px", display: "flex", gap: "12px" }}
        className="mt-2"
      >
        <button onClick={() => toggleAll(true)} style={actionBtnStyle}>
          Select All
        </button>
        <button onClick={() => toggleAll(false)} style={actionBtnStyle}>
          Clear All
        </button>
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse" }}
        className="text-lg"
      >
        <thead>
          <tr>
            <th align="left">Day</th>
            {PERIODS.map((p) => (
              <th key={p}>{p}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {DAYS.map((day) => (
            <tr key={day}>
              <td style={{ padding: "10px 0" }}>{day}</td>
              {PERIODS.map((period) => (
                <td key={period} align="center">
                  <input
                    type="checkbox"
                    checked={schedule?.[day]?.[period] || false}
                    onChange={() => toggle(day, period)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={saveSchedule}
        disabled={saving}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          background: "#778DA9",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        {saving ? "Saving..." : "Save Weekly Schedule"}
      </button>
    </div>
  );
}

// import { useEffect, useState } from "react";

// const BASE_URL =
//   "https://mindsoul-backend-772700176760.asia-south1.run.app/api";

// const DAYS = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const PERIODS = ["morning", "afternoon", "evening"];

// export default function CounsellorWeeklySchedule() {
//   const [counsellorId, setCounsellorId] = useState(null);
//   const [schedule, setSchedule] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   /* -------------------------------
//      GET counsellorId
//   ------------------------------- */
//   useEffect(() => {
//     const storedCounsellorId = localStorage.getItem("counsellorId");
//     const isLoggedIn = localStorage.getItem("isCounsellorLoggedIn");

//     if (storedCounsellorId && isLoggedIn === "true") {
//       setCounsellorId(storedCounsellorId);
//     } else {
//       console.error("Counsellor not logged in");
//       setLoading(false);
//     }
//   }, []);

//   /* -------------------------------
//      FETCH Weekly Schedule
//   ------------------------------- */
//   useEffect(() => {
//     if (!counsellorId) return;

//     async function fetchSchedule() {
//       try {
//         const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
//           credentials: "include",
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data?.message || "Unauthorized");
//         }

//         const initial = data.weeklySchedule || data.schedulePreferences || {};
//         setSchedule(initial);
//       } catch (err) {
//         console.error("Failed to fetch schedule:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSchedule();
//   }, [counsellorId]);

//   /* -------------------------------
//      Toggle All
//   ------------------------------- */
//   function toggleAll(value) {
//     const updated = {};
//     DAYS.forEach((day) => {
//       updated[day] = {
//         morning: value,
//         afternoon: value,
//         evening: value,
//       };
//     });
//     setSchedule(updated);
//   }

//   /* -------------------------------
//      Toggle Slot
//   ------------------------------- */
//   function toggle(day, period) {
//     setSchedule((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         [period]: !prev[day]?.[period],
//       },
//     }));
//   }

//   /* -------------------------------
//      SAVE Weekly Schedule
//   ------------------------------- */
//   async function saveSchedule() {
//     if (!counsellorId) return;

//     setSaving(true);

//     try {
//       const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ weekly: schedule }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.message || "Unauthorized");
//       }

//       alert("Weekly schedule updated");
//     } catch (err) {
//       console.error("Failed to save schedule:", err.message);
//       alert("Session expired. Please login again.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-40">
//         <p className="text-gray-600">Loading schedule...</p>
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 font-body">
//       {/* Important Note */}
//       <p className="text-sm md:text-md leading-relaxed">
//         <span className="text-red-600 font-bold text-base md:text-lg">
//           Important Note:
//         </span>
//         <br />
//         To ensure your availability is visible to users, it is{" "}
//         <strong>
//           mandatory to update your weekly schedule every weekend.
//         </strong>{" "}
//         The schedule you set will be used to display your availability for the
//         upcoming week to users. If the weekly schedule is not updated, your next
//         week’s slots may not appear for booking.
//       </p>

//       <h2 className="text-lg md:text-xl font-semibold mt-8">
//         Weekly Availability
//       </h2>

//       {/* Action Buttons */}
//       <div className="flex flex-wrap gap-3 mt-4">
//         <button
//           onClick={() => toggleAll(true)}
//           className="px-4 py-2 bg-purple-100 text-purple-900 border border-purple-300 rounded-md text-sm md:text-base"
//         >
//           Select All
//         </button>

//         <button
//           onClick={() => toggleAll(false)}
//           className="px-4 py-2 bg-purple-100 text-purple-900 border border-purple-300 rounded-md text-sm md:text-base"
//         >
//           Clear All
//         </button>
//       </div>

//       {/* TABLE WRAPPER (SCROLLABLE FOR MOBILE) */}
//       <div className="overflow-x-auto mt-6">
//         <table className="min-w-[500px] w-full border-collapse text-sm md:text-base">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left py-3">Day</th>

//               {PERIODS.map((p) => (
//                 <th key={p} className="text-center capitalize">
//                   {p}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {DAYS.map((day) => (
//               <tr key={day} className="border-b">
//                 <td className="py-3 font-medium">{day}</td>

//                 {PERIODS.map((period) => (
//                   <td key={period} className="text-center">
//                     <input
//                       type="checkbox"
//                       checked={schedule?.[day]?.[period] || false}
//                       onChange={() => toggle(day, period)}
//                       className="w-4 h-4 cursor-pointer"
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* SAVE BUTTON */}
//       <button
//         onClick={saveSchedule}
//         disabled={saving}
//         className="mt-8 w-full md:w-auto px-6 py-3 bg-[#778DA9] text-white rounded-lg text-base md:text-lg hover:opacity-90 transition"
//       >
//         {saving ? "Saving..." : "Save Weekly Schedule"}
//       </button>
//     </div>
//   );
// }
