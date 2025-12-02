import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Globe,
  Calendar,
  Star,
  CheckCircle,
  ChevronDown,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Counsellors() {
  const [allCounsellors, setAllCounsellors] = useState([]);
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedLang, setSelectedLang] = useState({
    Hindi: false,
    English: false,
    Kannada: false,
    Marathi: false,
    Tamil: false,
    Telugu: false,
  });

  const [selectedExpertise, setSelectedExpertise] = useState({
    Therapist: false,
    "Clinical Psychologist": false,
    "Child Specialist": false,
    "Counselling Psychologist": false,
  });

  const toggleLang = (lang) => {
    setSelectedLang({ ...selectedLang, [lang]: !selectedLang[lang] });
  };

  const toggleExpertise = (item) => {
    setSelectedExpertise((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // ⭐ CLEAR ALL FILTERS FUNCTION
  const clearAllFilters = () => {
    setSelectedLang({
      Hindi: false,
      English: false,
      Kannada: false,
      Marathi: false,
      Tamil: false,
      Telugu: false,
    });

    setSelectedExpertise({
      Therapist: false,
      "Clinical Psychologist": false,
      "Child Specialist": false,
      "Counselling Psychologist": false,
    });

    // Show full unfiltered data
    setCounsellors(allCounsellors);
  };

  // Count total filters selected
  const filterCount = [
    ...Object.values(selectedLang),
    ...Object.values(selectedExpertise),
  ].filter(Boolean).length;

  // Fetch Counsellors
  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await fetch(
          "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/list"
        );

        const data = await res.json();
        console.log("API RESPONSE:", data);

        if (data?.counsellors) {
          setAllCounsellors(data.counsellors);
          setCounsellors(data.counsellors);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching counsellors:", error);
        setLoading(false);
      }
    };

    fetchCounsellors();
  }, []);

  // APPLY FILTERS
  useEffect(() => {
    let filtered = allCounsellors;

    const activeLangs = Object.keys(selectedLang).filter(
      (l) => selectedLang[l] === true
    );

    if (activeLangs.length > 0) {
      filtered = filtered.filter((c) =>
        c.languages?.some((lang) => activeLangs.includes(lang))
      );
    }

    const activeExpertise = Object.keys(selectedExpertise).filter(
      (e) => selectedExpertise[e] === true
    );

    if (activeExpertise.length > 0) {
      filtered = filtered.filter((c) => activeExpertise.includes(c.expertise));
    }

    setCounsellors(filtered);
  }, [selectedLang, selectedExpertise, allCounsellors]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center font-heading">
        <p className="text-2xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  const openProfile = (c) => {
    navigate(`/counsellor/${c._id}`, { state: c });
  };

  return (
    <div className="w-full bg-gray-50 mt-30 py-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
        {/* Sidebar */}
        <div className="bg-white p-4 rounded-xl shadow-sm h-fit md:sticky top-4 font-body">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 text-2xl">Filters</h2>

            <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">
              {filterCount}
            </span>
          </div>

          {/* Expertise */}
          <div className="mt-4 font-body">
            <label className="font-semibold text-gray-700 text-xl flex items-center justify-between">
              Expertise <ChevronDown size={18} />
            </label>

            <div className="flex flex-col mt-2 gap-2">
              {Object.keys(selectedExpertise).map((exp) => (
                <label key={exp} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedExpertise[exp]}
                    onChange={() => toggleExpertise(exp)}
                    className="w-4 h-4"
                  />
                  <span className="text-md text-gray-700">{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mt-4 font-body">
            <label className="font-semibold text-gray-700 text-xl flex items-center justify-between">
              Languages <ChevronDown size={18} />
            </label>

            <div className="flex flex-col mt-2 gap-2 ">
              {Object.keys(selectedLang).map((lang) => (
                <label key={lang} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedLang[lang]}
                    onChange={() => toggleLang(lang)}
                    className="w-4 h-4"
                  />
                  <span className="text-md text-gray-700">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          {/* City */}
          {/* <div className="mt-4 font-body">
            <label className="font-semibold text-gray-700 text-xl flex items-center justify-between">
              City <ChevronDown size={18} />
            </label>
            <input
              type="text"
              placeholder="Search Cities"
              className="w-full border rounded-lg mt-2 p-2 text-md bg-gray-50"
            />
          </div> */}

          {/* ⭐ CLEAR ALL FILTERS BUTTON ⭐ */}
          <button
            onClick={clearAllFilters}
            className="w-full mt-4 bg-accent text-white py-2 rounded-lg text-xl font-medium hover:bg-primary "
          >
            Clear All Filters
          </button>
        </div>

        {/* Right Section */}
        <div className="md:col-span-3 font-body">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800">
                Find experienced education counsellors.
              </h2>
              <p className="text-md text-gray-500">
                Filter by expertise, language, availability, and pricing.
              </p>
            </div>

            <select className="border-2 border-primary p-2 rounded-lg text-md bg-white mt-3 md:mt-0 font-semibold mb-10">
              <option>Popularity</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-body">
            {counsellors.map((c) => (
              <div
                key={c.email}
                onClick={() => openProfile(c)}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={c?.imageUrl}
                  alt={c.firstName}
                  className="w-full h-52 object-cover"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
                />

                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <Star size={16} className="text-yellow-500" />
                    <span className="ml-1 text-md font-semibold">
                      {c.rating || "4.0"}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-800 text-xl">
                    {c.firstName} {c.lastName}
                  </h3>

                  <div className="flex items-center gap-1 text-green-600 text-md font-medium mt-1">
                    <CheckCircle size={16} />
                    Verified
                  </div>

                  {/* <p className="text-md text-gray-600 mt-1">
                    {c.experience || "Experience Not Available"}
                  </p> */}

                  <span className="flex items-center gap-1">
                    <Briefcase size={16} />
                    {c.experience
                      ? c.experience.toLowerCase().includes("year")
                        ? c.experience
                        : `${c.experience} years`
                      : "Experience N/A"}
                  </span>

                  {/* <div className="flex items-center text-md mt-2 text-gray-600">
                    <MapPin size={14} className="mr-1" />
                    {c.city || "Location Not Available"}
                  </div> */}

                  <p className="text-md text-gray-600 mt-1">
                    {c.languages?.join(" | ") || "Languages Not Available"}
                  </p>

                  <div className="bg-blue-50 text-blue-600 text-md font-medium p-2 rounded-lg mt-3">
                    {c.availableDays?.join(", ") || "Availability Not Provided"}
                  </div>

                  <div className="grid grid-cols-3 mt-4 gap-2 text-center">
                    <div>
                      <p className="font-semibold text-gray-800 text-md">
                        ₹{c.sessionPrice || "1500"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16 items-center gap-4 font-body">
            <button className="px-4 py-2 border rounded-lg bg-white text-md">
              Previous
            </button>
            <span className="text-md text-gray-600">Page 1 of 3</span>
            <button className="px-4 py-2 border rounded-lg bg-accent text-white text-md">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
