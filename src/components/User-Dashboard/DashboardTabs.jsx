import { useNavigate } from "react-router-dom";

export default function DashboardTabs() {
  const navigate = useNavigate();

  const tabs = ["My Info", "Appointments", "Counsellors"];

  const handleTabClick = (tab) => {
    if (tab === "Counsellors") {
      navigate("/counsellors");
    }
  };

  return (
    <div className="border-b overflow-x-auto">
      <div className="flex gap-8 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`pb-4 font-medium ${
              tab === "Appointments"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SUB FILTER */}
      <div className="flex gap-4 mt-6">
        {["All"].map((item) => (
          <button
            key={item}
            className="px-4 py-1.5 rounded-full text-sm bg-indigo-100 text-indigo-600"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
