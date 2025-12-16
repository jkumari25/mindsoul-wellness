import React, { useState, useEffect } from "react";
import { Star, CheckCircle, ChevronDown, Briefcase } from "lucide-react";
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
    setSelectedLang((prev) => ({ ...prev, [lang]: !prev[lang] }));
  };

  const toggleExpertise = (exp) => {
    setSelectedExpertise((prev) => ({ ...prev, [exp]: !prev[exp] }));
  };

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

    setCounsellors(allCounsellors);
  };

  const filterCount = [
    ...Object.values(selectedLang),
    ...Object.values(selectedExpertise),
  ].filter(Boolean).length;

  // FETCH DATA
  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await fetch(
          "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/list"
        );
        const data = await res.json();

        if (data?.counsellors) {
          setAllCounsellors(data.counsellors);
          setCounsellors(data.counsellors);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellors();
  }, []);

  // APPLY FILTERS
  useEffect(() => {
    let filtered = allCounsellors;

    // Languages filter
    const activeLangs = Object.keys(selectedLang).filter(
      (l) => selectedLang[l]
    );

    if (activeLangs.length > 0) {
      filtered = filtered.filter((c) =>
        c.languages?.some((lang) => activeLangs.includes(lang))
      );
    }

    // ✅ FIXED EXPERTISE FILTER
    const activeExpertise = Object.keys(selectedExpertise).filter(
      (e) => selectedExpertise[e]
    );

    if (activeExpertise.length > 0) {
      filtered = filtered.filter((c) =>
        c.expertise?.some((exp) => activeExpertise.includes(exp))
      );
    }

    setCounsellors(filtered);
  }, [selectedLang, selectedExpertise, allCounsellors]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  const openProfile = (c) => {
    navigate(`/counsellor/${c.counsellorId}`, { state: c });
  };

  return (
    <div className="w-full bg-gray-50 mt-30 py-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
        {/* FILTER SIDEBAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm h-fit sticky top-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
              {filterCount}
            </span>
          </div>

          {/* Expertise */}
          <div className="mt-4">
            <label className="font-semibold flex justify-between">
              Expertise <ChevronDown size={18} />
            </label>
            {Object.keys(selectedExpertise).map((exp) => (
              <label key={exp} className="flex gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={selectedExpertise[exp]}
                  onChange={() => toggleExpertise(exp)}
                />
                {exp}
              </label>
            ))}
          </div>

          {/* Languages */}
          <div className="mt-4">
            <label className="font-semibold flex justify-between">
              Languages <ChevronDown size={18} />
            </label>
            {Object.keys(selectedLang).map((lang) => (
              <label key={lang} className="flex gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={selectedLang[lang]}
                  onChange={() => toggleLang(lang)}
                />
                {lang}
              </label>
            ))}
          </div>

          <button
            onClick={clearAllFilters}
            className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg"
          >
            Clear All Filters
          </button>
        </div>

        {/* CARDS */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {counsellors.map((c) => (
            <div
              key={c.counsellorId}
              onClick={() => openProfile(c)}
              className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer"
            >
              <img
                src={c.imageUrl}
                alt={c.firstName}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500" />
                  <span>{c.rating || "4.0"}</span>
                </div>

                <h3 className="text-xl font-semibold">
                  {c.firstName} {c.lastName}
                </h3>

                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={16} /> Verified
                </div>

                <div className="flex items-center gap-1 mt-1">
                  <Briefcase size={16} />
                  {c.experience || "Experience N/A"}
                </div>

                <p className="text-gray-600 mt-1">{c.languages?.join(" | ")}</p>

                <p className="mt-2 font-semibold">
                  ₹{c.sessionPrice || "1500"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
