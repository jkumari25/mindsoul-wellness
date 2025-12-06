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

      const response = await axios.post(
        "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/update-profile",
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
