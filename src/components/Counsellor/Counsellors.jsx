import React, { useState } from "react";
import {
  Search,
  MapPin,
  Globe,
  Calendar,
  Star,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

export default function Counsellors() {
  const counsellors = [
    {
      id: 1,
      name: "Sarabsri Kaur",
      image: "/counselors/1.png",
      rating: 4.0,
      experience: "5 Years Experience · English | Hindi",
      location: "Bengaluru",
      languages: "English | Hindi | Marathi | Telugu",
      days: "Mon, Tue, Wed, Thu, Fri, Sat",
      prices: "3,500",
    },
    {
      id: 2,
      name: "Ridhi",
      image: "/counselors/2.png",
      rating: 4.0,
      experience: "8 Years Experience · Hindi | English",
      location: "Pune",
      languages: "Hindi | Marathi | English",
      days: "Mon, Tue, Wed, Thu, Fri, Sat, Sun",
      prices: "1,500",
    },
  ];

  const [selectedLang, setSelectedLang] = useState({
    Hindi: true,
    English: false,
    Kannada: false,
    Marathi: false,
    Tamil: false,
    Telugu: false,
  });

  const toggleLang = (lang) => {
    setSelectedLang({ ...selectedLang, [lang]: !selectedLang[lang] });
  };

  return (
    <div className="w-full bg-gray-50 mt-30 py-10">
      {/* Main Grid Layout */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
        {/* Sidebar Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm h-fit md:sticky top-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Filters</h2>
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
              2
            </span>
          </div>

          <div className="mt-4">
            {/* Experience */}
            <label className="font-semibold text-gray-700 text-sm flex items-center justify-between">
              Experience <ChevronDown size={16} />
            </label>
            <select className="w-full border rounded-lg mt-2 p-2 text-sm bg-gray-50">
              <option>Select Experience</option>
            </select>
          </div>

          {/* Languages */}
          <div className="mt-4">
            <label className="font-semibold text-gray-700 text-sm flex items-center justify-between">
              Languages <ChevronDown size={16} />
            </label>

            <div className="flex flex-col mt-2 gap-2">
              {Object.keys(selectedLang).map((lang) => (
                <label key={lang} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedLang[lang]}
                    onChange={() => toggleLang(lang)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          {/* City */}
          <div className="mt-4">
            <label className="font-semibold text-gray-700 text-sm flex items-center justify-between">
              City <ChevronDown size={16} />
            </label>
            <input
              type="text"
              placeholder="Search Cities"
              className="w-full border rounded-lg mt-2 p-2 text-sm bg-gray-50"
            />
          </div>
        </div>

        {/* Right Section (Counsellor Cards) */}
        <div className="md:col-span-3">
          {/* Top Title + Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Find experienced education counsellors.
              </h2>
              <p className="text-sm text-gray-500">
                Filter by expertise, language, availability, and pricing.
              </p>
            </div>

            <select className="border p-2 rounded-lg text-sm bg-white mt-3 md:mt-0">
              <option>Popularity</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>

          {/* Counsellor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {counsellors.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center mb-1">
                    <Star size={16} className="text-yellow-500" />
                    <span className="ml-1 text-sm font-semibold">
                      {c.rating}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-gray-800">{c.name}</h3>

                  {/* Verified */}
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium mt-1">
                    <CheckCircle size={16} />
                    Verified
                  </div>

                  {/* Experience */}
                  <p className="text-sm text-gray-600 mt-1">{c.experience}</p>

                  {/* Location */}
                  <div className="flex items-center text-sm mt-2 text-gray-600">
                    <MapPin size={14} className="mr-1" />
                    {c.location}
                  </div>

                  {/* Languages */}
                  <p className="text-sm text-gray-600 mt-1">{c.languages}</p>

                  {/* Working Days */}
                  <div className="bg-blue-50 text-blue-600 text-xs font-medium p-2 rounded-lg mt-3">
                    {c.days}
                  </div>

                  {/* Prices */}
                  <div className="grid grid-cols-3 mt-4 gap-2 text-center">
                    <div>
                      <p className="font-semibold text-gray-800">₹{c.prices}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 items-center gap-4">
            <button className="px-4 py-2 border rounded-lg bg-white text-sm">
              Previous
            </button>
            <span className="text-sm text-gray-600">Page 1 of 3</span>
            <button className="px-4 py-2 border rounded-lg bg-accent text-white text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
