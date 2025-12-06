// import { useState, useEffect } from "react";
// import { Menu, X, Search } from "lucide-react";
// import CounselorLogin from "./CounselorLogin";
// import LoginPage from "./LoginPage";
// import OtpPage from "./Counsellor/OtpPage";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [userLoginOpen, setUserLoginOpen] = useState(false);
//   const [otpOpen, setOtpOpen] = useState(false);

//   // Track user login status
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

//   // Check login status on mount
//   useEffect(() => {
//     const loggedIn = localStorage.getItem("userLoggedIn") === "true";
//     setIsUserLoggedIn(loggedIn);
//   }, []);

//   // Handle user logout
//   const handleLogout = () => {
//     localStorage.removeItem("userLoggedIn");
//     setIsUserLoggedIn(false);
//   };

//   const primary = "#C5B4E3";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";
//   const light = "#ffffff";

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300"
//         style={{ backgroundColor: accent }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           {/* Logo */}
//           <a href="/">
//             <img
//               src="/logo_white.png"
//               alt="logo"
//               className="h-[70px] w-[90px]"
//             />
//           </a>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["HOME", "ABOUT", "CONTACTS", "COUNSELLORS"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="font-sans transition-colors text-white"
//               >
//                 {item}
//               </a>
//             ))}

//             {/* Search */}
//             <div className="relative group">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-full text-white placeholder-white/70 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
//               />
//             </div>

//             {/* ==== LOGIN / LOGOUT BUTTONS ==== */}

//             {/* USER LOGIN / LOGOUT */}
//             {!isUserLoggedIn ? (
//               <button
//                 onClick={() => setUserLoginOpen(true)}
//                 className="ml-4 px-5 py-2 rounded-full font-semibold"
//                 style={{ backgroundColor: primary, color: textDark }}
//               >
//                 User Login
//               </button>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="ml-4 px-5 py-2 rounded-full font-semibold bg-red-400 text-white"
//               >
//                 Logout
//               </button>
//             )}

//             {/* COUNSELOR LOGIN (ALWAYS SHOW) */}
//             <button
//               onClick={() => setLoginOpen(true)}
//               className="bg-[#c5b4e3] text-black ml-4 px-5 py-2 rounded-full font-semibold"
//             >
//               Counselor Login
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* BACKDROP */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ backgroundColor: primary }}
//       >
//         <div className="flex justify-between items-center p-5 border-b">
//           <span className="text-xl font-semibold" style={{ color: accent }}>
//             Menu
//           </span>
//           <button onClick={() => setIsOpen(false)} style={{ color: textDark }}>
//             <X size={26} />
//           </button>
//         </div>

//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Contacts"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               onClick={() => setIsOpen(false)}
//               className="text-lg"
//             >
//               {item}
//             </a>
//           ))}

//           {/* MOBILE USER LOGIN / LOGOUT */}
//           {!isUserLoggedIn ? (
//             <button
//               onClick={() => {
//                 setUserLoginOpen(true);
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full"
//               style={{ backgroundColor: accent, color: light }}
//             >
//               User Login
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full bg-red-400 text-white"
//             >
//               Logout
//             </button>
//           )}

//           {/* COUNSELOR LOGIN ALWAYS SHOW */}
//           <button
//             onClick={() => {
//               setLoginOpen(true);
//               setIsOpen(false);
//             }}
//             className="bg-[#c5b4e3] text-black px-4 py-2 rounded-lg"
//           >
//             Counselor Login
//           </button>
//         </div>
//       </div>

//       {/* USER LOGIN MODAL */}
//       <LoginPage
//         isOpen={userLoginOpen}
//         onClose={() => {
//           setUserLoginOpen(false);
//           setIsUserLoggedIn(localStorage.getItem("userLoggedIn") === "true");
//         }}
//       />

//       {/* COUNSELOR LOGIN MODAL */}
//       <CounselorLogin
//         isOpen={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         openOtpModal={() => setOtpOpen(true)}
//       />

//       {/* OTP Modal */}
//       {otpOpen && <OtpPage onClose={() => setOtpOpen(false)} />}
//     </>
//   );
// }

// import { useState, useEffect, useContext } from "react";
// import { Menu, X, Search } from "lucide-react";
// import CounselorLogin from "./CounselorLogin";
// import LoginPage from "./LoginPage";
// import OtpPage from "./Counsellor/OtpPage";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [userLoginOpen, setUserLoginOpen] = useState(false);
//   const [otpOpen, setOtpOpen] = useState(false);
//   const { user, role, logout } = useContext(AuthContext);

//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

//   // Check login state on mount
//   useEffect(() => {
//     const loggedIn = localStorage.getItem("isUserLoggedIn") === "true"; // FIXED
//     setIsUserLoggedIn(loggedIn);
//   }, []);

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("isUserLoggedIn"); // FIXED
//     setIsUserLoggedIn(false);
//   };

//   const primary = "#C5B4E3";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";
//   const light = "#ffffff";

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300"
//         style={{ backgroundColor: accent }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           <a href="/">
//             <img
//               src="/logo_white.png"
//               alt="logo"
//               className="h-[70px] w-[90px]"
//             />
//           </a>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["HOME", "ABOUT", "CONTACTS", "COUNSELLORS"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="font-sans transition-colors text-white"
//               >
//                 {item}
//               </a>
//             ))}

//             {/* SEARCH */}
//             <div className="relative group">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-full text-white placeholder-white/70 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
//               />
//             </div>

//             {/* USER LOGIN / LOGOUT */}
//             {!isUserLoggedIn ? (
//               <button
//                 onClick={() => setUserLoginOpen(true)}
//                 className="ml-4 px-5 py-2 rounded-full font-semibold"
//                 style={{ backgroundColor: primary, color: textDark }}
//               >
//                 User Login
//               </button>
//             ) : (
//               <button
//                 onClick={logout}
//                 className="ml-4 px-5 py-2 rounded-full font-semibold bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             )}

//             {/* COUNSELOR LOGIN */}
//             <button
//               onClick={() => setLoginOpen(true)}
//               className="bg-[#c5b4e3] text-black ml-4 px-5 py-2 rounded-full font-semibold"
//             >
//               Counselor Login
//             </button>
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* BACKDROP */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ backgroundColor: primary }}
//       >
//         <div className="flex justify-between items-center p-5 border-b">
//           <span className="text-xl font-semibold" style={{ color: accent }}>
//             Menu
//           </span>
//           <button onClick={() => setIsOpen(false)} style={{ color: textDark }}>
//             <X size={26} />
//           </button>
//         </div>

//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Contacts"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               onClick={() => setIsOpen(false)}
//               className="text-lg"
//             >
//               {item}
//             </a>
//           ))}

//           {/* MOBILE USER LOGIN / LOGOUT */}
//           {!isUserLoggedIn ? (
//             <button
//               onClick={() => {
//                 setUserLoginOpen(true);
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full"
//               style={{ backgroundColor: accent, color: light }}
//             >
//               User Login
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full bg-red-500 text-white"
//             >
//               Logout
//             </button>
//           )}

//           {/* COUNSELOR LOGIN */}
//           <button
//             onClick={() => {
//               setLoginOpen(true);
//               setIsOpen(false);
//             }}
//             className="bg-[#c5b4e3] text-black px-4 py-2 rounded-lg"
//           >
//             Counselor Login
//           </button>
//         </div>
//       </div>

//       {/* USER LOGIN MODAL */}
//       <LoginPage
//         isOpen={userLoginOpen}
//         onClose={() => {
//           setUserLoginOpen(false);

//           // Update login state after modal closes
//           const loggedIn = localStorage.getItem("isUserLoggedIn") === "true"; // FIXED
//           setIsUserLoggedIn(loggedIn);
//         }}
//       />

//       {/* COUNSELOR LOGIN */}
//       <CounselorLogin
//         isOpen={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         openOtpModal={() => setOtpOpen(true)}
//       />

//       {/* OTP MODAL */}
//       {otpOpen && <OtpPage onClose={() => setOtpOpen(false)} />}
//     </>
//   );
// }

import { useState, useEffect, useContext } from "react";
import { Menu, X, Search } from "lucide-react";
import CounselorLogin from "./CounselorLogin";
import LoginPage from "./LoginPage";
import OtpPage from "./Counsellor/OtpPage";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userLoginOpen, setUserLoginOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const { user, role, logout } = useContext(AuthContext);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    setIsUserLoggedIn(loggedIn);
  }, []);

  // 👉 Unified logout handler
  const handleUserLogout = () => {
    logout(); // Firebase/context logout
    localStorage.removeItem("isUserLoggedIn");
    setIsUserLoggedIn(false);
  };

  const primary = "#C5B4E3";
  const accent = "#7a3cff";
  const textDark = "#1a1a1a";
  const light = "#ffffff";

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300"
        style={{ backgroundColor: accent }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="/">
            <img
              src="/logo_white.png"
              alt="logo"
              className="h-[70px] w-[90px]"
            />
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            {["HOME", "ABOUT", "COUNSELLORS", "CONTACTS"].map((item) => (
              <a
                key={item}
                href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
                className="font-sans transition-colors text-white"
              >
                {item}
              </a>
            ))}

            {/* SEARCH */}
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full text-white placeholder-white/70 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
            </div>

            {/* USER LOGIN / LOGOUT */}
            {!isUserLoggedIn ? (
              <button
                onClick={() => setUserLoginOpen(true)}
                className="ml-4 px-5 py-2 rounded-full font-semibold"
                style={{ backgroundColor: primary, color: textDark }}
              >
                User Login
              </button>
            ) : (
              <button
                onClick={handleUserLogout}
                className="ml-4 px-5 py-2 rounded-full font-semibold bg-red-500 text-white"
              >
                Logout
              </button>
            )}

            {/* COUNSELOR LOGIN */}
            <button
              onClick={() => setLoginOpen(true)}
              className="bg-[#c5b4e3] text-black ml-4 px-5 py-2 rounded-full font-semibold"
            >
              Counselor Login
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: primary }}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <span className="text-xl font-semibold" style={{ color: accent }}>
            Menu
          </span>
          <button onClick={() => setIsOpen(false)} style={{ color: textDark }}>
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col mt-6 space-y-6 px-6">
          {["Home", "About", "Counsellors", "Contacts"].map((item) => (
            <a
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-lg"
            >
              {item}
            </a>
          ))}

          {/* MOBILE USER LOGIN / LOGOUT */}
          {!isUserLoggedIn ? (
            <button
              onClick={() => {
                setUserLoginOpen(true);
                setIsOpen(false);
              }}
              className="px-6 py-2 rounded-full"
              style={{ backgroundColor: accent, color: light }}
            >
              User Login
            </button>
          ) : (
            <button
              onClick={() => {
                handleUserLogout();
                setIsOpen(false);
              }}
              className="px-6 py-2 rounded-full bg-red-500 text-white"
            >
              Logout
            </button>
          )}

          {/* COUNSELOR LOGIN */}
          <button
            onClick={() => {
              setLoginOpen(true);
              setIsOpen(false);
            }}
            className="bg-[#c5b4e3] text-black px-4 py-2 rounded-lg"
          >
            Counselor Login
          </button>
        </div>
      </div>

      {/* USER LOGIN MODAL */}
      <LoginPage
        isOpen={userLoginOpen}
        onClose={() => {
          setUserLoginOpen(false);
          const loggedIn = localStorage.getItem("isUserLoggedIn") === "true";
          setIsUserLoggedIn(loggedIn);
        }}
      />

      {/* COUNSELOR LOGIN */}
      <CounselorLogin
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        openOtpModal={() => setOtpOpen(true)}
      />

      {/* OTP MODAL */}
      {otpOpen && <OtpPage onClose={() => setOtpOpen(false)} />}
    </>
  );
}

// import { useState } from "react";
// import { Menu, X, Search } from "lucide-react";
// import CounselorLogin from "./CounselorLogin";
// import LoginPage from "./LoginPage";
// import OtpPage from "./Counsellor/OtpPage";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [userLoginOpen, setUserLoginOpen] = useState(false);
//   const [otpOpen, setOtpOpen] = useState(false);

//   // UI colors
//   const primary = "#C5B4E3";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";
//   const light = "#ffffff";

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300"
//         style={{ backgroundColor: accent }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           {/* Logo */}
//           <a href="/">
//             <img
//               src="/logo_white.png"
//               alt="logo"
//               className="h-[70px] w-[90px]"
//             />
//           </a>

//           {/* Desktop menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["HOME", "ABOUT", "CONTACTS", "COUNSELLORS"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="font-sans transition-colors text-white"
//               >
//                 {item}
//               </a>
//             ))}

//             {/* Search */}
//             <div className="relative group">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-full text-white placeholder-white/70 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
//               />
//             </div>

//             {/* 🔥 Always show Login + Counselor Login (Logout removed) */}
//             <button
//               onClick={() => setUserLoginOpen(true)}
//               className="ml-4 px-5 py-2 rounded-full font-semibold"
//               style={{ backgroundColor: primary, color: textDark }}
//             >
//               Login
//             </button>

//             <button
//               onClick={() => setLoginOpen(true)}
//               className="bg-[#c5b4e3] text-black ml-4 px-5 py-2 rounded-full font-semibold"
//             >
//               Counselor Login
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ backgroundColor: primary }}
//       >
//         <div className="flex justify-between items-center p-5 border-b">
//           <span className="text-xl font-semibold" style={{ color: accent }}>
//             Menu
//           </span>
//           <button onClick={() => setIsOpen(false)} style={{ color: textDark }}>
//             <X size={26} />
//           </button>
//         </div>

//         {/* mobile search */}
//         <div className="px-6 mt-5">
//           <div className="relative">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-black/60"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow-sm"
//             />
//           </div>
//         </div>

//         {/* Links */}
//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Contacts"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               className="text-lg"
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </a>
//           ))}

//           {/* 🔥 Mobile Login buttons only */}
//           <button
//             onClick={() => {
//               setUserLoginOpen(true);
//               setIsOpen(false);
//             }}
//             className="px-6 py-2 rounded-full"
//             style={{ backgroundColor: accent, color: light }}
//           >
//             Login
//           </button>

//           <button
//             onClick={() => {
//               setLoginOpen(true);
//               setIsOpen(false);
//             }}
//             className="bg-[#c5b4e3] text-black px-4 py-2 rounded-lg"
//           >
//             Counselor Login
//           </button>
//         </div>
//       </div>

//       {/* USER LOGIN MODAL */}
//       <LoginPage
//         isOpen={userLoginOpen}
//         onClose={() => setUserLoginOpen(false)}
//       />

//       {/* COUNSELOR LOGIN MODAL */}
//       <CounselorLogin
//         isOpen={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         openOtpModal={() => setOtpOpen(true)}
//       />

//       {/* OTP MODAL */}
//       {otpOpen && <OtpPage onClose={() => setOtpOpen(false)} />}
//     </>
//   );
// }

// import { useState, useContext } from "react";
// import { Menu, X, Search } from "lucide-react";
// import CounselorLogin from "./CounselorLogin";
// import LoginPage from "./LoginPage";
// import OtpPage from "./Counsellor/OtpPage";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, role, logout } = useContext(AuthContext);

//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [userLoginOpen, setUserLoginOpen] = useState(false);
//   const [otpOpen, setOtpOpen] = useState(false);

//   // UI colors
//   const primary = "#C5B4E3";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";
//   const light = "#ffffff";

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300"
//         style={{ backgroundColor: accent }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           {/* Logo */}
//           <a href="/">
//             <img
//               src="/logo_white.png"
//               alt="logo"
//               className="h-[70px] w-[90px]"
//             />
//           </a>

//           {/* Desktop menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["HOME", "ABOUT", "CONTACTS", "COUNSELLORS"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="font-sans transition-colors text-white"
//               >
//                 {item}
//               </a>
//             ))}

//             {/* Search */}
//             <div className="relative group">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-full text-white placeholder-white/70 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
//               />
//             </div>

//             {/* 🔥 Desktop Login / Logout Logic */}

//             {/* If ANY user (role === user OR counsellor) is logged in → show logout */}
//             {user ? (
//               <button
//                 onClick={logout}
//                 className="ml-4 px-5 py-2 rounded-full font-semibold bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 {/* USER LOGIN */}
//                 <button
//                   onClick={() => setUserLoginOpen(true)}
//                   className="ml-4 px-5 py-2 rounded-full font-semibold"
//                   style={{ backgroundColor: primary, color: textDark }}
//                 >
//                   Login
//                 </button>

//                 {/* COUNSELLOR LOGIN — only hide if counsellor already logged in */}
//                 {role !== "counsellor" && (
//                   <button
//                     onClick={() => setLoginOpen(true)}
//                     className="bg-[#c5b4e3] text-black ml-4 px-5 py-2 rounded-full font-semibold"
//                   >
//                     Counselor Login
//                   </button>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ backgroundColor: primary }}
//       >
//         <div className="flex justify-between items-center p-5 border-b">
//           <span className="text-xl font-semibold" style={{ color: accent }}>
//             Menu
//           </span>
//           <button onClick={() => setIsOpen(false)} style={{ color: textDark }}>
//             <X size={26} />
//           </button>
//         </div>

//         {/* mobile search */}
//         <div className="px-6 mt-5">
//           <div className="relative">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-black/60"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow-sm"
//             />
//           </div>
//         </div>

//         {/* Links */}
//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Contacts"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               className="text-lg"
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </a>
//           ))}

//           {/* 🔥 Mobile Login / Logout */}

//           {user ? (
//             <button
//               onClick={() => {
//                 logout();
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full bg-red-500 text-white"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={() => {
//                   setUserLoginOpen(true);
//                   setIsOpen(false);
//                 }}
//                 className="px-6 py-2 rounded-full"
//                 style={{ backgroundColor: accent, color: light }}
//               >
//                 Login
//               </button>

//               {/* Hide counsellor login only if counsellor is already logged in */}
//               {role !== "counsellor" && (
//                 <button
//                   onClick={() => {
//                     setLoginOpen(true);
//                     setIsOpen(false);
//                   }}
//                   className="bg-[#c5b4e3] text-black px-4 py-2 rounded-lg"
//                 >
//                   Counselor Login
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Modals */}

//       <LoginPage
//         isOpen={userLoginOpen}
//         onClose={() => setUserLoginOpen(false)}
//       />

//       <CounselorLogin
//         isOpen={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         openOtpModal={() => setOtpOpen(true)}
//       />

//       {otpOpen && <OtpPage onClose={() => setOtpOpen(false)} />}
//     </>
//   );
// }
