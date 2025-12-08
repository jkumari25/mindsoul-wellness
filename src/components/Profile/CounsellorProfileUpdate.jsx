import React, { useState } from "react";
import axios from "axios";
import api from "../../api/axios";

export default function CounsellorProfileUpdate() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    description: "",
    expertise: [],
    experience: "",
    languages: [],
    sessionPrice: "",
    focusAreas: [],
    slotDuration: "",
    workingHours: {
      morning: { start: "", end: "" },
      afternoon: { start: "", end: "" },
    },
    workingDays: [],
    profileImage: null,
  });

  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const expertiseOptions = [
    "Therapist",
    "Clinical Psychologist",
    "Child Specialist",
    "Counselling Psychologist",
  ];

  const focusAreaOptions = [
    "Emotional Behavior",
    "Communication Skills",
    "Self Esteem",
    "Family Issues",
  ];

  const languageOptions = ["English", "Hindi", "Punjabi", "French"];

  const toggleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  // --------------------------------------------------
  //  FINAL SUBMIT HANDLER (FIXED FOR 404 ISSUE)
  // --------------------------------------------------
  const handleSubmit = async () => {
    try {
      const apiBody = new FormData();

      // SIMPLE FIELDS
      apiBody.append("email", formData.email);
      apiBody.append("firstName", formData.firstName);
      apiBody.append("lastName", formData.lastName);
      apiBody.append("phoneNumber", formData.phoneNumber);
      apiBody.append("description", formData.description);
      apiBody.append("experience", formData.experience);
      apiBody.append("sessionPrice", formData.sessionPrice);
      apiBody.append("slotDuration", formData.slotDuration);

      // ARRAY FIELDS
      formData.expertise.forEach((item) => apiBody.append("expertise[]", item));
      formData.languages.forEach((item) => apiBody.append("languages[]", item));
      formData.focusAreas.forEach((item) =>
        apiBody.append("focusAreas[]", item)
      );
      formData.workingDays.forEach((item) =>
        apiBody.append("workingDays[]", item)
      );

      // WORKING HOURS AS JSON STRING
      apiBody.append("workingHours", JSON.stringify(formData.workingHours));

      // IMAGE (optional)
      if (formData.profileImage) {
        apiBody.append("profileImage", formData.profileImage);
      }

      // AUTH TOKEN
      const token = localStorage.getItem("token");

      // DEBUG LOG
      console.log("------ FINAL FORMDATA SENT -------");
      for (let p of apiBody.entries()) {
        console.log(p[0], p[1]);
      }

      // API CALL
      // const response = await axios.post(
      //   "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/update-profile",
      //   apiBody,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      const response = await api.post(
        "/api/counsellor/update-profile",
        apiBody,
        {
          withCredentials: true, // ⭐ sends cookie automatically
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("UPDATE RESPONSE:", response.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Something went wrong while updating!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-36 mb-24">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Update Counsellor Profile
      </h2>

      {/* FORM UI STARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Phone */}
        <div>
          <label className="font-medium">Phone Number</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </div>

        {/* First Name */}
        <div>
          <label className="font-medium">First Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="font-medium">Last Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>

        {/* Experience */}
        <div>
          <label className="font-medium">Experience</label>
          <input
            type="text"
            placeholder="e.g. 5 years"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-medium">Session Price (₹)</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg mt-1"
            value={formData.sessionPrice}
            onChange={(e) =>
              setFormData({ ...formData, sessionPrice: e.target.value })
            }
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="font-medium">Short Description</label>
        <textarea
          rows="4"
          className="w-full p-3 border rounded-lg mt-1"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>

      {/* Expertise */}
      <div className="mt-6">
        <label className="font-medium">Expertise</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {expertiseOptions.map((exp) => (
            <button
              key={exp}
              onClick={() => toggleMultiSelect("expertise", exp)}
              className={`px-4 py-2 rounded-full border ${
                formData.expertise.includes(exp)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-6">
        <label className="font-medium">Languages</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {languageOptions.map((lang) => (
            <button
              key={lang}
              onClick={() => toggleMultiSelect("languages", lang)}
              className={`px-4 py-2 rounded-full border ${
                formData.languages.includes(lang)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mt-6">
        <label className="font-medium">Focus Areas</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {focusAreaOptions.map((f) => (
            <button
              key={f}
              onClick={() => toggleMultiSelect("focusAreas", f)}
              className={`px-4 py-2 rounded-full border ${
                formData.focusAreas.includes(f)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div className="mt-8">
        <label className="font-medium text-lg">Working Hours</label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
          {/* Morning */}
          <div>
            <p className="font-semibold mb-2">Morning</p>
            <div className="flex gap-3">
              <input
                type="time"
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workingHours: {
                      ...formData.workingHours,
                      morning: {
                        ...formData.workingHours.morning,
                        start: e.target.value,
                      },
                    },
                  })
                }
              />
              <input
                type="time"
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workingHours: {
                      ...formData.workingHours,
                      morning: {
                        ...formData.workingHours.morning,
                        end: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Afternoon */}
          <div>
            <p className="font-semibold mb-2">Afternoon</p>
            <div className="flex gap-3">
              <input
                type="time"
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workingHours: {
                      ...formData.workingHours,
                      afternoon: {
                        ...formData.workingHours.afternoon,
                        start: e.target.value,
                      },
                    },
                  })
                }
              />
              <input
                type="time"
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workingHours: {
                      ...formData.workingHours,
                      afternoon: {
                        ...formData.workingHours.afternoon,
                        end: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Working Days */}
      <div className="mt-8">
        <label className="font-medium text-lg">Working Days</label>
        <div className="flex flex-wrap gap-3 mt-3">
          {daysList.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-full border ${
                formData.workingDays.includes(day)
                  ? "bg-green-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Slot Duration */}
      <div className="mt-6">
        <label className="font-medium">Slot Duration (Minutes)</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg mt-1"
          value={formData.slotDuration}
          onChange={(e) =>
            setFormData({ ...formData, slotDuration: e.target.value })
          }
        />
      </div>

      {/* Profile Image */}
      <div className="mt-6">
        <label className="font-medium">Profile Image</label>
        <input
          type="file"
          className="w-full p-3 border rounded-lg mt-1"
          onChange={(e) =>
            setFormData({ ...formData, profileImage: e.target.files[0] })
          }
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold"
      >
        Save Changes
      </button>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import api from "../../api/axios";

// export default function CounsellorProfileForm() {
//   const [loading, setLoading] = useState(false);
//   const counsellorId = localStorage.getItem("counsellorId");
//   const email = localStorage.getItem("email");

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     description: "",
//     languages: [],
//     sessionPrice: "",
//     focusAreas: [],
//     expertise: [],
//     experience: "",
//     workingHours: {
//       morning: { start: "09:00", end: "12:00" },
//       afternoon: { start: "13:00", end: "17:00" },
//     },
//     workingDays: [],
//     slotDuration: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMultiSelect = (name, value) => {
//     setForm((prev) => ({
//       ...prev,
//       [name]: prev[name].includes(value)
//         ? prev[name].filter((v) => v !== value)
//         : [...prev[name], value],
//     }));
//   };

//   const handleWorkingHours = (period, field, value) => {
//     setForm((prev) => ({
//       ...prev,
//       workingHours: {
//         ...prev.workingHours,
//         [period]: {
//           ...prev.workingHours[period],
//           [field]: value,
//         },
//       },
//     }));
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const fd = new FormData();
//       fd.append("email", email);
//       fd.append("counsellorId", counsellorId);

//       Object.keys(form).forEach((key) => {
//         if (key === "image" && form.image) {
//           fd.append("image", form.image);
//         } else if (key === "workingHours") {
//           fd.append("workingHours", JSON.stringify(form.workingHours));
//         } else if (Array.isArray(form[key])) {
//           form[key].forEach((val) => fd.append(key, val));
//         } else {
//           fd.append(key, form[key]);
//         }
//       });

//       const res = await api.post("/api/counsellor/update-profile", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       alert("Profile Updated Successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Profile update failed");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-30">
//       <h2 className="text-2xl font-semibold mb-4 text-center">
//         Update Counsellor Profile
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* NAME ROW */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             name="firstName"
//             placeholder="First Name"
//             className="input"
//             value={form.firstName}
//             onChange={handleChange}
//           />
//           <input
//             name="lastName"
//             placeholder="Last Name"
//             className="input"
//             value={form.lastName}
//             onChange={handleChange}
//           />
//         </div>

//         {/* PHONE */}
//         <input
//           name="phoneNumber"
//           placeholder="Phone Number"
//           className="input w-full"
//           value={form.phoneNumber}
//           onChange={handleChange}
//         />

//         {/* DESCRIPTION */}
//         <textarea
//           name="description"
//           placeholder="Write about yourself..."
//           className="input w-full h-24"
//           value={form.description}
//           onChange={handleChange}
//         ></textarea>

//         {/* EXPERIENCE */}
//         <input
//           name="experience"
//           placeholder="Experience (e.g., 5 Years)"
//           className="input w-full"
//           value={form.experience}
//           onChange={handleChange}
//         />

//         {/* SESSION PRICE */}
//         <input
//           name="sessionPrice"
//           placeholder="Session Price (₹)"
//           className="input w-full"
//           value={form.sessionPrice}
//           onChange={handleChange}
//         />

//         {/* SLOT DURATION */}
//         <input
//           name="slotDuration"
//           placeholder="Slot Duration (minutes)"
//           className="input w-full"
//           value={form.slotDuration}
//           onChange={handleChange}
//         />

//         {/* MULTI SELECT FIELDS */}
//         <div>
//           <label className="font-semibold">Languages</label>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {["English", "Hindi", "Bengali", "Tamil", "Marathi"].map((l) => (
//               <button
//                 type="button"
//                 key={l}
//                 className={`px-3 py-1 rounded border ${
//                   form.languages.includes(l)
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//                 onClick={() => handleMultiSelect("languages", l)}
//               >
//                 {l}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="font-semibold">Expertise</label>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {["Stress", "Anxiety", "Depression", "Relationships"].map((e) => (
//               <button
//                 type="button"
//                 key={e}
//                 className={`px-3 py-1 rounded border ${
//                   form.expertise.includes(e)
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//                 onClick={() => handleMultiSelect("expertise", e)}
//               >
//                 {e}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="font-semibold">Focus Areas</label>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {["Career", "Family", "Trauma", "Confidence"].map((f) => (
//               <button
//                 type="button"
//                 key={f}
//                 className={`px-3 py-1 rounded border ${
//                   form.focusAreas.includes(f)
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//                 onClick={() => handleMultiSelect("focusAreas", f)}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* WORKING DAYS */}
//         <div>
//           <label className="font-semibold">Working Days</label>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
//               <button
//                 type="button"
//                 key={d}
//                 className={`px-3 py-1 rounded border ${
//                   form.workingDays.includes(d)
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//                 onClick={() => handleMultiSelect("workingDays", d)}
//               >
//                 {d}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* WORKING HOURS */}
//         <div className="mt-4">
//           <label className="font-semibold">Working Hours</label>

//           {["morning", "afternoon"].map((period) => (
//             <div key={period} className="grid grid-cols-2 gap-4 mt-2">
//               <div>
//                 <label className="text-sm">{period} Start</label>
//                 <input
//                   type="time"
//                   value={form.workingHours[period].start}
//                   onChange={(e) =>
//                     handleWorkingHours(period, "start", e.target.value)
//                   }
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm">{period} End</label>
//                 <input
//                   type="time"
//                   value={form.workingHours[period].end}
//                   onChange={(e) =>
//                     handleWorkingHours(period, "end", e.target.value)
//                   }
//                   className="input"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* IMAGE UPLOAD */}
//         <div>
//           <label className="font-semibold">Profile Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="mt-2"
//             onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//           />
//         </div>

//         {/* SUBMIT */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// }
