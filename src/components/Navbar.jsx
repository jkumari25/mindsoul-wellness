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

//   // USER LOGIN CHECK
//   useEffect(() => {
//     const loggedIn = localStorage.getItem("isUserLoggedIn") === "true";
//     setIsUserLoggedIn(loggedIn);
//   }, []);

//   // USER LOGOUT
//   const handleUserLogout = () => {
//     logout();
//     localStorage.removeItem("isUserLoggedIn");
//     setIsUserLoggedIn(false);
//   };

//   // COUNSELLOR LOGOUT
//   const handleCounsellorLogout = () => {
//     logout(); // AuthContext logout
//   };

//   const primary = "#C5B4E3";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";
//   const light = "#ffffff";

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50"
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
//             {["HOME", "ABOUT", "COUNSELLORS", "CONTACTS"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="text-white"
//               >
//                 {item}
//               </a>
//             ))}

//             {/* SEARCH */}
//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-10 pr-4 py-2 rounded-full text-white bg-white/10 border border-white/20"
//               />
//             </div>

//             {/* USER LOGIN / LOGOUT */}
//             {!isUserLoggedIn ? (
//               <button
//                 onClick={() => setUserLoginOpen(true)}
//                 className="px-5 py-2 rounded-full font-semibold"
//                 style={{ backgroundColor: primary, color: textDark }}
//               >
//                 User Login
//               </button>
//             ) : (
//               <button
//                 onClick={handleUserLogout}
//                 className="px-5 py-2 rounded-full bg-red-500 text-white"
//               >
//                 Logout
//               </button>
//             )}

//             {/* COUNSELLOR LOGIN / LOGOUT */}
//             {role === "counsellor" ? (
//               <button
//                 onClick={handleCounsellorLogout}
//                 className="px-5 py-2 rounded-full bg-red-500 text-white"
//               >
//                 Counsellor Logout
//               </button>
//             ) : (
//               <button
//                 onClick={() => setLoginOpen(true)}
//                 className="bg-[#c5b4e3] text-black px-5 py-2 rounded-full font-semibold"
//               >
//                 Counsellor Login
//               </button>
//             )}
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

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 z-50 transform transition-transform ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ backgroundColor: primary }}
//       >
//         <div className="flex justify-between items-center p-5 border-b">
//           <span className="text-xl font-semibold">Menu</span>
//           <button onClick={() => setIsOpen(false)}>
//             <X size={26} />
//           </button>
//         </div>

//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Counsellors", "Contacts"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </a>
//           ))}

//           {/* USER LOGIN / LOGOUT */}
//           {!isUserLoggedIn ? (
//             <button
//               onClick={() => {
//                 setUserLoginOpen(true);
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full bg-indigo-600 text-white"
//             >
//               User Login
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 handleUserLogout();
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full bg-red-500 text-white"
//             >
//               Logout
//             </button>
//           )}

//           {/* COUNSELLOR LOGIN / LOGOUT */}
//           {role === "counsellor" ? (
//             <button
//               onClick={() => {
//                 handleCounsellorLogout();
//                 setIsOpen(false);
//               }}
//               className="px-6 py-2 rounded-full bg-red-500 text-white"
//             >
//               Logout
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 setLoginOpen(true);
//                 setIsOpen(false);
//               }}
//               className="bg-[#c5b4e3] text-black px-4 py-2 rounded-lg"
//             >
//               Counsellor Login
//             </button>
//           )}
//         </div>
//       </div>

//       {/* USER LOGIN MODAL */}
//       <LoginPage
//         isOpen={userLoginOpen}
//         onClose={() => {
//           setUserLoginOpen(false);
//           const loggedIn = localStorage.getItem("isUserLoggedIn") === "true";
//           setIsUserLoggedIn(loggedIn);
//         }}
//       />

//       {/* COUNSELLOR LOGIN MODAL */}
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

import { useState, useEffect, useContext, useRef } from "react";
import { Menu, X, Search, User } from "lucide-react";
import CounselorLogin from "./CounselorLogin";
import LoginPage from "./LoginPage";
import OtpPage from "./Counsellor/OtpPage";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userLoginOpen, setUserLoginOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // USER LOGIN CHECK
  useEffect(() => {
    const loggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    setIsUserLoggedIn(loggedIn);
  }, []);

  // CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // USER LOGOUT
  const handleUserLogout = () => {
    logout();
    localStorage.removeItem("isUserLoggedIn");
    setIsUserLoggedIn(false);
    setProfileOpen(false);
    navigate("/");
  };

  // COUNSELLOR LOGOUT
  const handleCounsellorLogout = () => {
    logout();
    navigate("/");
  };

  const primary = "#C5B4E3";
  const accent = "#7a3cff";
  const textDark = "#1a1a1a";

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 w-full shadow-md z-50"
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
                className="text-white"
              >
                {item}
              </a>
            ))}

            {/* SEARCH */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full text-white bg-white/10 border border-white/20"
              />
            </div>

            {/* USER LOGIN / PROFILE */}
            {!isUserLoggedIn ? (
              <button
                onClick={() => setUserLoginOpen(true)}
                className="px-5 py-2 rounded-full font-semibold"
                style={{ backgroundColor: primary, color: textDark }}
              >
                User Login
              </button>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                >
                  <User size={20} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={() => {
                        navigate("/user-dashboard");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleUserLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* COUNSELLOR LOGIN / LOGOUT */}
            {role === "counsellor" ? (
              <button
                onClick={handleCounsellorLogout}
                className="px-5 py-2 rounded-full bg-red-500 text-white"
              >
                Counsellor Logout
              </button>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-[#c5b4e3] text-black px-5 py-2 rounded-full font-semibold"
              >
                Counsellor Login
              </button>
            )}
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

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: primary }}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col mt-6 space-y-6 px-6">
          {["Home", "About", "Counsellors", "Contacts"].map((item) => (
            <a
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}

          {!isUserLoggedIn ? (
            <button
              onClick={() => {
                setUserLoginOpen(true);
                setIsOpen(false);
              }}
              className="px-6 py-2 rounded-full bg-indigo-600 text-white"
            >
              User Login
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/user-dashboard");
                  setIsOpen(false);
                }}
                className="px-6 py-2 rounded-full bg-white"
              >
                Dashboard
              </button>
              <button
                onClick={handleUserLogout}
                className="px-6 py-2 rounded-full bg-red-500 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* USER LOGIN MODAL */}
      <LoginPage
        isOpen={userLoginOpen}
        onClose={() => {
          setUserLoginOpen(false);
          setIsUserLoggedIn(localStorage.getItem("isUserLoggedIn") === "true");
        }}
      />

      {/* COUNSELLOR LOGIN MODAL */}
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
