// import AppointmentCard from "../components/User-Dashboard/AppointmentCard";
// import DashboardTabs from "../components/User-Dashboard/DashboardTabs";
// import ProfileHeader from "../components/User-Dashboard/ProfileHeader";
// import UserAppointments from "../components/User-Dashboard/UserAppointments";

// export default function UserDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ProfileHeader />

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <DashboardTabs />

//         <div className="mt-8 space-y-6">
//           {/* <AppointmentCard
//             name="John William"
//             subtitle="Counselling Session"
//             date="14 Nov, Friday"
//             time="12:00 PM - 12:30 PM"
//             status="Completed"
//             image="https://i.pravatar.cc/150?img=12"
//           /> */}
//           <UserAppointments />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import DashboardTabs from "../components/User-Dashboard/DashboardTabs";
import ProfileHeader from "../components/User-Dashboard/ProfileHeader";
import UserAppointments from "../components/User-Dashboard/UserAppointments";
import MyInfoSection from "../components/User-Dashboard/MyInfoSection";
import TransactionsTab from "../components/User-Dashboard/TransactionTab";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("Appointments");

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-8">
          {activeTab === "My Info" && <MyInfoSection />}
          {activeTab === "Appointments" && <UserAppointments />}
          {activeTab === "Transactions" && <TransactionsTab />}
        </div>
      </div>
    </div>
  );
}
