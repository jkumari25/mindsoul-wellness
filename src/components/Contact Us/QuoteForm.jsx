import React from "react";

export default function QuoteForm() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="form-input" placeholder="First Name*" />
        <input className="form-input" placeholder="Last Name*" />

        <input className="form-input" placeholder="Business Email*" />
        <input className="form-input" placeholder="Company*" />

        <input className="form-input" placeholder="Job Title*" />
        <input className="form-input" placeholder="Phone*" />

        <select className="form-input">
          <option>Select Country</option>
          <option>India</option>
          <option>USA</option>
          <option>Canada</option>
        </select>

        <select className="form-input">
          <option># of Employees</option>
          <option>1 - 50</option>
          <option>50 - 200</option>
          <option>200 - 1000</option>
          <option>1000+</option>
        </select>
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-2 mt-4 text-gray-700">
        <input type="checkbox" className="accent-teal-600" />
        MindSoul may send me updates and communications.
      </label>

      <button className="w-full mt-6 bg-accent hover:bg-primary text-white hover:text-black font-semibold py-3 rounded-xl transition text-lg">
        Schedule your quote
      </button>

      <p className="text-xs text-gray-500 mt-4 leading-relaxed">
        By submitting, you agree that we may store and use your personal
        information to contact you regarding services. View our Privacy Policy
        for more.
      </p>
    </>
  );
}
