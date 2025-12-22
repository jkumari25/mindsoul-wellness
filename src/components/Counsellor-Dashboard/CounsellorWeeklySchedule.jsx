// import { useEffect, useState } from "react";

// const BASE_URL =
//   "https://mindsoul-backend-772700176760.asia-south1.run.app/api";
// const counsellorId = "WmHMDgixzJcw6s8D7qSZ"; // TEMP for local testing

// const DAYS = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];
// const actionBtnStyle = {
//   padding: "8px 14px",
//   background: "#ede9fe",
//   color: "#4c1d95",
//   border: "1px solid #c4b5fd",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontSize: "14px",
// };

// const PERIODS = ["morning", "afternoon", "evening"];

// export default function CounsellorWeeklySchedule() {
//   const [schedule, setSchedule] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

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
//      GET Schedule Info
//      GET /api/schedule/:counsellorId
//   ------------------------------- */
//   useEffect(() => {
//     async function fetchSchedule() {
//       const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`);
//       const data = await res.json();

//       // Fallback to schedulePreferences if weeklySchedule not set
//       const initial = data.weeklySchedule || data.schedulePreferences || {};

//       setSchedule(initial);
//       setLoading(false);
//     }

//     fetchSchedule();
//   }, []);

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
//      PATCH /api/schedule/:counsellorId
//   ------------------------------- */
//   async function saveSchedule() {
//     setSaving(true);

//     await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ weekly: schedule }),
//     });

//     setSaving(false);
//     alert("Weekly schedule updated");
//   }

//   if (loading) return <p>Loading schedule...</p>;

//   return (
//     <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
//       <h2>Weekly Availability</h2>

//       <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
//         <button onClick={() => toggleAll(true)} style={actionBtnStyle}>
//           Select All
//         </button>

//         <button onClick={() => toggleAll(false)} style={actionBtnStyle}>
//           Clear All
//         </button>
//       </div>

//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th align="left">Day</th>
//             {PERIODS.map((p) => (
//               <th key={p}>{p}</th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {DAYS.map((day) => (
//             <tr key={day}>
//               <td style={{ padding: "10px 0" }}>{day}</td>

//               {PERIODS.map((period) => (
//                 <td key={period} align="center">
//                   <input
//                     type="checkbox"
//                     checked={schedule?.[day]?.[period] || false}
//                     onChange={() => toggle(day, period)}
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         onClick={saveSchedule}
//         disabled={saving}
//         style={{
//           marginTop: "30px",
//           padding: "12px 24px",
//           background: "#6a5acd",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         {saving ? "Saving..." : "Save Weekly Schedule"}
//       </button>
//     </div>
//   );
// }

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

// const actionBtnStyle = {
//   padding: "8px 14px",
//   background: "#ede9fe",
//   color: "#4c1d95",
//   border: "1px solid #c4b5fd",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontSize: "14px",
// };

// export default function CounsellorWeeklySchedule() {
//   const [counsellorId, setCounsellorId] = useState(null);
//   const [schedule, setSchedule] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   /* -------------------------------
//      GET LOGGED-IN COUNSELLOR ID
//      (from OTP login)
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
//      GET Weekly Schedule
//      GET /api/schedule/:counsellorId
//   ------------------------------- */
//   useEffect(() => {
//     if (!counsellorId) return;

//     async function fetchSchedule() {
//       try {
//         const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`);
//         const data = await res.json();

//         const initial = data.weeklySchedule || data.schedulePreferences || {};

//         setSchedule(initial);
//       } catch (err) {
//         console.error("Failed to fetch schedule:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSchedule();
//   }, [counsellorId]);

//   /* -------------------------------
//      Toggle All Slots
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
//      Toggle Single Slot
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
//      PATCH /api/schedule/:counsellorId
//   ------------------------------- */
//   async function saveSchedule() {
//     if (!counsellorId) return;

//     setSaving(true);

//     try {
//       await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ weekly: schedule }),
//       });

//       alert("Weekly schedule updated");
//     } catch (err) {
//       console.error("Failed to save schedule:", err);
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) return <p>Loading schedule...</p>;

//   return (
//     <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
//       <h2>Weekly Availability</h2>

//       <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
//         <button onClick={() => toggleAll(true)} style={actionBtnStyle}>
//           Select All
//         </button>

//         <button onClick={() => toggleAll(false)} style={actionBtnStyle}>
//           Clear All
//         </button>
//       </div>

//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th align="left">Day</th>
//             {PERIODS.map((p) => (
//               <th key={p}>{p}</th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {DAYS.map((day) => (
//             <tr key={day}>
//               <td style={{ padding: "10px 0" }}>{day}</td>

//               {PERIODS.map((period) => (
//                 <td key={period} align="center">
//                   <input
//                     type="checkbox"
//                     checked={schedule?.[day]?.[period] || false}
//                     onChange={() => toggle(day, period)}
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         onClick={saveSchedule}
//         disabled={saving}
//         style={{
//           marginTop: "30px",
//           padding: "12px 24px",
//           background: "#6a5acd",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         {saving ? "Saving..." : "Save Weekly Schedule"}
//       </button>
//     </div>
//   );
// }

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

// const actionBtnStyle = {
//   padding: "8px 14px",
//   background: "#ede9fe",
//   color: "#4c1d95",
//   border: "1px solid #c4b5fd",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontSize: "14px",
// };

// export default function CounsellorWeeklySchedule() {
//   const [counsellorId, setCounsellorId] = useState(null);
//   const [schedule, setSchedule] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   /* -------------------------------
//      GET counsellorId (OTP login)
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
//      (COOKIE AUTH)
//   ------------------------------- */
//   useEffect(() => {
//     if (!counsellorId) return;

//     async function fetchSchedule() {
//       try {
//         const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
//           credentials: "include", // ⭐ REQUIRED
//         });

//         if (!res.ok) throw new Error("Unauthorized");

//         const data = await res.json();
//         const initial = data.weeklySchedule || data.schedulePreferences || {};

//         setSchedule(initial);
//       } catch (err) {
//         console.error("Failed to fetch schedule:", err);
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
//      (COOKIE AUTH)
//   ------------------------------- */
//   async function saveSchedule() {
//     if (!counsellorId) return;

//     setSaving(true);

//     try {
//       const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
//         method: "PATCH",
//         credentials: "include", // ⭐ REQUIRED
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ weekly: schedule }),
//       });

//       if (!res.ok) throw new Error("Unauthorized");

//       alert("Weekly schedule updated");
//     } catch (err) {
//       console.error("Failed to save schedule:", err);
//       alert("Session expired. Please login again.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) return <p>Loading schedule...</p>;

//   return (
//     <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
//       <h2>Weekly Availability</h2>

//       <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
//         <button onClick={() => toggleAll(true)} style={actionBtnStyle}>
//           Select All
//         </button>
//         <button onClick={() => toggleAll(false)} style={actionBtnStyle}>
//           Clear All
//         </button>
//       </div>

//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th align="left">Day</th>
//             {PERIODS.map((p) => (
//               <th key={p}>{p}</th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {DAYS.map((day) => (
//             <tr key={day}>
//               <td style={{ padding: "10px 0" }}>{day}</td>
//               {PERIODS.map((period) => (
//                 <td key={period} align="center">
//                   <input
//                     type="checkbox"
//                     checked={schedule?.[day]?.[period] || false}
//                     onChange={() => toggle(day, period)}
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         onClick={saveSchedule}
//         disabled={saving}
//         style={{
//           marginTop: "30px",
//           padding: "12px 24px",
//           background: "#6a5acd",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         {saving ? "Saving..." : "Save Weekly Schedule"}
//       </button>
//     </div>
//   );
// }

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
  fontSize: "14px",
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
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2>Weekly Availability</h2>

      <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
        <button onClick={() => toggleAll(true)} style={actionBtnStyle}>
          Select All
        </button>
        <button onClick={() => toggleAll(false)} style={actionBtnStyle}>
          Clear All
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
          background: "#6a5acd",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {saving ? "Saving..." : "Save Weekly Schedule"}
      </button>
    </div>
  );
}
