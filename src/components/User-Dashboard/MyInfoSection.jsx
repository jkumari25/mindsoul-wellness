// import {
//   User,
//   Mail,
//   Phone,
//   Calendar,
//   HeartPulse,
//   Stethoscope,
//   Users,
// } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// export default function MyInfoSection() {
//   const { user } = useAuth();

//   if (!user) return null;

//   const profile = user.profile || {};

//   return (
//     <div className="mt-10 max-w-5xl">
//       {/* HEADER CARD */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold">{user.name}</h2>
//             <p className="text-indigo-100 flex items-center gap-2 mt-1">
//               <Mail size={16} /> {user.email}
//             </p>
//           </div>

//           <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium">
//             User Profile
//           </span>
//         </div>
//       </div>

//       {/* DETAILS */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <InfoCard icon={<Calendar />} label="Age" value={profile.age || "-"} />
//         <InfoCard
//           icon={<Users />}
//           label="Gender"
//           value={profile.gender || "-"}
//         />
//         <InfoCard icon={<Phone />} label="Phone" value={profile.phone || "-"} />
//         <InfoCard
//           icon={<HeartPulse />}
//           label="Medications"
//           value={profile.medications?.length > 0 ? profile.medications : ["-"]}
//           isList
//         />
//         <InfoCard
//           icon={<Stethoscope />}
//           label="Medical History"
//           value={
//             profile.medicalHistory?.length > 0 ? profile.medicalHistory : ["-"]
//           }
//           isList
//         />
//       </div>
//     </div>
//   );
// }

// /* ================= INFO CARD ================= */

// function InfoCard({ icon, label, value, isList = false }) {
//   return (
//     <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">
//       <div className="flex items-center gap-3 mb-3">
//         <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
//           {icon}
//         </div>
//         <p className="text-gray-500 text-sm font-medium">{label}</p>
//       </div>

//       {isList ? (
//         <div className="flex flex-wrap gap-2">
//           {value.map((item, idx) => (
//             <span
//               key={idx}
//               className="px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700"
//             >
//               {item}
//             </span>
//           ))}
//         </div>
//       ) : (
//         <p className="text-lg font-semibold text-gray-800">{value}</p>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, User, Calendar, HeartPulse } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function MyInfoSection() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://mindsoul-backend-772700176760.asia-south1.run.app/api/users/user-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile information");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading profile information...
      </div>
    );
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition">
      <div className="flex items-center gap-3 text-indigo-600">
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </div>
      <p className="mt-2 text-gray-800 font-semibold break-words">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="mt-10 max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Personal Information
        </h2>
        <p className="text-gray-500 text-sm">
          Your personal and medical details
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard icon={User} label="Name" value={profile.name} />
        <InfoCard icon={Mail} label="Email" value={profile.email} />
        <InfoCard icon={Calendar} label="Age" value={profile.age} />
        <InfoCard icon={User} label="Gender" value={profile.gender} />
        <InfoCard icon={Phone} label="Phone" value={profile.phone} />
        <InfoCard
          icon={HeartPulse}
          label="Medications"
          value={
            profile.medications?.length ? profile.medications.join(", ") : "-"
          }
        />
        <InfoCard
          icon={HeartPulse}
          label="Medical History"
          value={
            profile.medicalHistory?.length
              ? profile.medicalHistory.join(", ")
              : "-"
          }
        />
      </div>
    </div>
  );
}
