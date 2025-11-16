// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   // Color palette based on your logo
//   const primary = "#C5B4E3"; // light lavender background
//   const accent = "#7a3cff"; // deep purple accent
//   const textDark = "#1a1a1a"; // dark text for contrast
//   const light = "#ffffff"; // white for buttons and contrast

//   return (
//     <>
//       {/* Top Navbar */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300"
//         style={{ backgroundColor: accent }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           {/* Logo */}
//           <div
//             className="text-2xl md:text-3xl font-serif font-bold tracking-wider"
//             style={{ color: primary }}
//           >
//             <a href="/">
//               <img
//                 src="/logo_white.png"
//                 alt="logo"
//                 className="h-[70px] w-[90px]"
//               />
//             </a>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["HOME", "ABOUT", "CONTACT US"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="font-sans transition-colors"
//                 style={{
//                   color: light,
//                 }}
//                 onMouseOver={(e) => (e.target.style.color = primary)}
//                 onMouseOut={(e) => (e.target.style.color = light)}
//               >
//                 {item}
//               </a>
//             ))}
//             <a href="/login">
//               <button
//                 className="ml-4 px-5 py-2 rounded-full font-sans font-semibold transition-all border-2"
//                 style={{
//                   backgroundColor: primary,
//                   color: textDark,
//                   borderColor: primary,
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.backgroundColor = accent;
//                   e.target.style.color = light;
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.backgroundColor = primary;
//                   e.target.style.color = textDark;
//                 }}
//               >
//                 Login
//               </button>
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden focus:outline-none"
//             style={{ color: light }}
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Side Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ backgroundColor: primary }}
//       >
//         <div
//           className="flex justify-between items-center p-5 border-b"
//           style={{ borderColor: accent }}
//         >
//           <span
//             className="text-xl font-serif font-semibold"
//             style={{ color: accent }}
//           >
//             Menu
//           </span>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="focus:outline-none"
//             style={{ color: textDark }}
//           >
//             <X size={26} />
//           </button>
//         </div>

//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Contact Us"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               className="font-sans text-lg transition"
//               style={{ color: textDark }}
//               onMouseOver={(e) => (e.target.style.color = accent)}
//               onMouseOut={(e) => (e.target.style.color = textDark)}
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </a>
//           ))}
//           <a href="/login">
//             <button
//               className="px-6 py-2 rounded-full font-sans font-semibold transition-all"
//               style={{
//                 backgroundColor: accent,
//                 color: light,
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = textDark)}
//               onMouseOut={(e) => (e.target.style.backgroundColor = accent)}
//               onClick={() => setIsOpen(false)}
//             >
//               Login
//             </button>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }

// import { useState } from "react";
// import { Menu, X, Search } from "lucide-react";
// import CounselorLogin from "./CounselorLogin";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);

//   // Your color palette
//   const primary = "#C5B4E3";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";
//   const light = "#ffffff";

//   return (
//     <>
//       {/* Top Navbar */}
//       <nav
//         className="fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300"
//         style={{ backgroundColor: accent }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           {/* Logo */}
//           <div
//             className="text-2xl md:text-3xl font-serif font-bold tracking-wider"
//             style={{ color: primary }}
//           >
//             <a href="/">
//               <img
//                 src="/logo_white.png"
//                 alt="logo"
//                 className="h-[70px] w-[90px]"
//               />
//             </a>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["HOME", "ABOUT", "CONTACT US"].map((item) => (
//               <a
//                 key={item}
//                 href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
//                 className="font-sans transition-colors"
//                 style={{ color: light }}
//                 onMouseOver={(e) => (e.target.style.color = primary)}
//                 onMouseOut={(e) => (e.target.style.color = light)}
//               >
//                 {item}
//               </a>
//             ))}

//             {/* Search Bar */}
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

//             <a href="/login">
//               <button
//                 className="ml-4 px-5 py-2 rounded-full font-sans font-semibold transition-all border-2"
//                 style={{
//                   backgroundColor: primary,
//                   color: textDark,
//                   borderColor: primary,
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.backgroundColor = accent;
//                   e.target.style.color = light;
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.backgroundColor = primary;
//                   e.target.style.color = textDark;
//                 }}
//               >
//                 Login
//               </button>
//             </a>

//             <button
//               onClick={() => setLoginOpen(true)}
//               className="bg-[#c5b4e3] border-white  ml-4 px-5 py-2 rounded-full font-sans font-semibold transition-all border-2"
//             >
//               Counselor Login
//             </button>

//             <CounselorLogin
//               isOpen={loginOpen}
//               onClose={() => setLoginOpen(false)}
//             />
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden focus:outline-none"
//             style={{ color: light }}
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Mobile Side Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         style={{ backgroundColor: primary }}
//       >
//         <div
//           className="flex justify-between items-center p-5 border-b"
//           style={{ borderColor: accent }}
//         >
//           <span
//             className="text-xl font-serif font-semibold"
//             style={{ color: accent }}
//           >
//             Menu
//           </span>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="focus:outline-none"
//             style={{ color: textDark }}
//           >
//             <X size={26} />
//           </button>
//         </div>

//         {/* Mobile Search Bar */}
//         <div className="px-6 mt-5">
//           <div className="relative">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-black/60"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col mt-6 space-y-6 px-6">
//           {["Home", "About", "Contact Us"].map((item) => (
//             <a
//               key={item}
//               href={`/${item === "Home" ? "" : item.toLowerCase()}`}
//               className="font-sans text-lg transition"
//               style={{ color: textDark }}
//               onMouseOver={(e) => (e.target.style.color = accent)}
//               onMouseOut={(e) => (e.target.style.color = textDark)}
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </a>
//           ))}

//           <a href="/login">
//             <button
//               className="px-6 py-2 rounded-full font-sans font-semibold transition-all"
//               style={{
//                 backgroundColor: accent,
//                 color: light,
//               }}
//               onMouseOut={(e) => (e.target.style.backgroundColor = accent)}
//               onClick={() => setIsOpen(false)}
//             >
//               Login
//             </button>
//           </a>

//           <button
//             onClick={() => setLoginOpen(true)}
//             className="bg-[#c5b4e3] text-black px-4 py-2 rounded-lg"
//           >
//             Counselor Login
//           </button>

//           <CounselorLogin
//             isOpen={loginOpen}
//             onClose={() => setLoginOpen(false)}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import CounselorLogin from "./CounselorLogin";
import LoginPage from "./LoginPage";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false); // Counselor login modal
  const [userLoginOpen, setUserLoginOpen] = useState(false); // ✅ User login modal

  // Color palette
  const primary = "#C5B4E3";
  const accent = "#7a3cff";
  const textDark = "#1a1a1a";
  const light = "#ffffff";

  return (
    <>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300"
        style={{ backgroundColor: accent }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          {/* Logo */}
          <div
            className="text-2xl md:text-3xl font-serif font-bold tracking-wider"
            style={{ color: primary }}
          >
            <a href="/">
              <img
                src="/logo_white.png"
                alt="logo"
                className="h-[70px] w-[90px]"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["HOME", "ABOUT", "CONTACTS"].map((item) => (
              <a
                key={item}
                href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
                className="font-sans transition-colors"
                style={{ color: light }}
                onMouseOver={(e) => (e.target.style.color = primary)}
                onMouseOut={(e) => (e.target.style.color = light)}
              >
                {item}
              </a>
            ))}

            {/* Search Bar */}
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

            {/* ✅ User Login Button */}
            <button
              onClick={() => setUserLoginOpen(true)}
              className="ml-4 px-5 py-2 rounded-full font-sans font-semibold transition-all border-2"
              style={{
                backgroundColor: primary,
                color: textDark,
                borderColor: primary,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = accent;
                e.target.style.color = light;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = primary;
                e.target.style.color = textDark;
              }}
            >
              Login
            </button>

            {/* Counselor Login Button */}
            <button
              onClick={() => setLoginOpen(true)}
              className="bg-[#c5b4e3] border-white ml-4 px-5 py-2 rounded-full font-sans font-semibold transition-all border-2 text-black hover:bg-[#b39ce0]"
            >
              Counselor Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden focus:outline-none"
            style={{ color: light }}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Background overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: primary }}
      >
        <div
          className="flex justify-between items-center p-5 border-b"
          style={{ borderColor: accent }}
        >
          <span
            className="text-xl font-serif font-semibold"
            style={{ color: accent }}
          >
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="focus:outline-none"
            style={{ color: textDark }}
          >
            <X size={26} />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-6 mt-5">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black/60"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col mt-6 space-y-6 px-6">
          {["Home", "About", "Contacts"].map((item) => (
            <a
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="font-sans text-lg transition"
              style={{ color: textDark }}
              onMouseOver={(e) => (e.target.style.color = accent)}
              onMouseOut={(e) => (e.target.style.color = textDark)}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}

          {/* ✅ Mobile User Login Button */}
          <button
            onClick={() => {
              setUserLoginOpen(true);
              setIsOpen(false);
            }}
            className="px-6 py-2 rounded-full font-sans font-semibold transition-all"
            style={{
              backgroundColor: accent,
              color: light,
            }}
          >
            Login
          </button>

          {/* Counselor Login Button */}
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

      {/* ✅ User Login Modal */}
      <LoginPage
        isOpen={userLoginOpen}
        onClose={() => setUserLoginOpen(false)}
      />

      {/* 👩‍⚕️ Counselor Login Modal */}
      <CounselorLogin isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
