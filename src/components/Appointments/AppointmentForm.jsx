import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
} from "react-icons/fa";

export default function AppointmentForm({ user }) {
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    counselor: "",
    sessionType: "",
    mode: "Online",
    date: "",
    time: "",
    concern: "",
    language: "",
    genderPreference: "No Preference",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please agree to the consent terms before booking.");
      return;
    }
    alert(
      `✅ Appointment booked successfully for ${formData.date} at ${formData.time}!`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-[#f3f1ff] to-[#fff] text-gray-900 mt-30">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-6 md:p-10">
        <h2 className="text-3xl font-semibold text-center text-[#6C4FFF] mb-6 font-serif">
          Book Your MindSoul Appointment 💜
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name, Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="flex items-center bg-gray-100 rounded-md px-3">
                <FaUser className="text-gray-500" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full bg-transparent px-2 py-2 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="flex items-center bg-gray-100 rounded-md px-3">
                <FaEnvelope className="text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  placeholder="your@email.com"
                  className="w-full bg-transparent px-2 py-2 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Phone, Counselor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="flex items-center bg-gray-100 rounded-md px-3">
                <FaPhone className="text-gray-500" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., +91 98765 43210"
                  required
                  className="w-full bg-transparent px-2 py-2 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Select Counselor
              </label>
              <select
                name="counselor"
                value={formData.counselor}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
              >
                <option value="">Choose Counselor</option>
                <option value="Dr. Meera Kapoor">Dr. Meera Kapoor</option>
                <option value="Mr. Rahul Sharma">Mr. Rahul Sharma</option>
                <option value="Ms. Ananya Verma">Ms. Ananya Verma</option>
              </select>
            </div>
          </div>

          {/* Row 3: Session Type, Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Session Type
              </label>
              <select
                name="sessionType"
                value={formData.sessionType}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
              >
                <option value="">Select Type</option>
                <option value="Child Counseling">Child Counseling</option>
                <option value="Family Therapy">Family Therapy</option>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Anxiety & Stress Support">
                  Anxiety & Stress Support
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mode</label>
              <div className="flex gap-4">
                {["Online", "In-Person"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="mode"
                      value={mode}
                      checked={formData.mode === mode}
                      onChange={handleChange}
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <div className="flex items-center bg-gray-100 rounded-md px-3">
                <FaCalendarAlt className="text-gray-500" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-2 py-2 outline-none"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Time Slot
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
              >
                <option value="">Select Time</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                <option value="4:30 PM - 5:30 PM">4:30 PM - 5:30 PM</option>
              </select>
            </div>
          </div>

          {/* Row 5: Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Counselor Gender Preference
              </label>
              <select
                name="genderPreference"
                value={formData.genderPreference}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
              >
                <option value="No Preference">No Preference</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Concern / Goal */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Brief Concern / Goal
            </label>
            <textarea
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              placeholder="Tell us a bit about what you'd like to discuss..."
              rows={3}
              className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
            ></textarea>
          </div>

          {/* Consent */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-gray-700">
              I consent to receive therapy services and agree to MindSoul’s
              privacy policy.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-[#6C4FFF] hover:bg-[#5436F0] text-white py-3 px-6 rounded-md font-medium transition-all mx-auto block"
          >
            Book My Session
          </button>
        </form>
      </div>
    </div>
  );
}
