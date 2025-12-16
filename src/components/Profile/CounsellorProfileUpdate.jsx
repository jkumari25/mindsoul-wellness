import React, { useState } from "react";
import axios from "axios";

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

  const languageOptions = [
    "English",
    "Hindi",
    "Kannada",
    "Marathi",
    "Tamil",
    "Telugu",
    "Punjabi",
    "French",
  ];

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
  //  SUBMIT HANDLER (BACKEND-COMPATIBLE)
  // --------------------------------------------------
  const handleSubmit = async () => {
    try {
      const apiBody = new FormData();
      const counsellorId = localStorage.getItem("counsellorId");

      if (!counsellorId) {
        alert("Counsellor ID missing. Please login again.");
        return;
      }

      // REQUIRED
      apiBody.append("counsellorId", counsellorId);
      if (formData.email) apiBody.append("email", formData.email);

      // BASIC FIELDS (send only if present)
      if (formData.firstName) apiBody.append("firstName", formData.firstName);
      if (formData.lastName) apiBody.append("lastName", formData.lastName);
      if (formData.phoneNumber)
        apiBody.append("phoneNumber", formData.phoneNumber);
      if (formData.description)
        apiBody.append("description", formData.description);
      if (formData.experience)
        apiBody.append("experience", formData.experience);
      if (formData.sessionPrice)
        apiBody.append("sessionPrice", formData.sessionPrice);

      // SLOT DURATION (must be positive number)
      if (formData.slotDuration && Number(formData.slotDuration) > 0) {
        apiBody.append("slotDuration", Number(formData.slotDuration));
      }

      // Expertise
      formData.expertise.forEach((item) => {
        apiBody.append("expertise", item.trim());
      });

      // Languages
      formData.languages.forEach((item) => {
        apiBody.append("languages", item.trim());
      });

      // Focus Areas
      formData.focusAreas.forEach((item) => {
        apiBody.append("focusAreas", item.trim());
      });

      // WORKING DAYS — MUST BE ARRAY (NOT JSON STRING)
      formData.workingDays.forEach((day) => {
        apiBody.append("workingDays", day);
      });

      // WORKING HOURS — SEND ONLY FILLED SLOTS
      const wh = {};

      if (
        formData.workingHours.morning.start &&
        formData.workingHours.morning.end
      ) {
        wh.morning = formData.workingHours.morning;
      }

      if (
        formData.workingHours.afternoon.start &&
        formData.workingHours.afternoon.end
      ) {
        wh.afternoon = formData.workingHours.afternoon;
      }

      if (Object.keys(wh).length > 0) {
        apiBody.append("workingHours", JSON.stringify(wh));
      }

      // IMAGE
      if (formData.profileImage) {
        apiBody.append("profileImage", formData.profileImage);
      }

      // DEBUG LOG (keep once)
      console.log("------ FINAL PAYLOAD ------");
      for (let p of apiBody.entries()) {
        console.log(p[0], p[1]);
      }

      const response = await axios.post(
        "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/update-profile",
        apiBody,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("UPDATE RESPONSE:", response.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Update failed");
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
