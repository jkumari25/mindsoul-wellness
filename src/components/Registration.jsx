// import React from "react";
// import {
//   FaHeart,
//   FaPlay,
//   FaGoogle,
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
// } from "react-icons/fa";

// export default function Registration() {
//   // Color palette
//   const primary = "#d9cdee";
//   const accent = "#7a3cff";
//   const textDark = "#1a1a1a";
//   const light = "#ffffff";

//   return (
//     <main className="flex flex-col md:flex-row w-full max-w-[950px] h-auto md:h-[520px] bg-transparent shadow-2xl overflow-hidden mx-auto text-white mt-44 mb-28 rounded-2xl">
//       {/* Left Section */}
//       <div
//         className="hidden md:flex flex-col justify-between bg-[#7155F9] w-[60%] h-full p-10 text-white rounded-bl-2xl rounded-tl-2xl"
//         style={{ backgroundColor: accent }}
//       >
//         <span className="flex items-center gap-3 font-medium cursor-pointer font-serif">
//           <FaHeart className="text-2xl" />
//           <p className="text-2xl">MindSoul</p>
//         </span>

//         <div className="flex flex-col gap-6 font-sans">
//           <p className="text-4xl font-medium max-w-[90%] leading-snug font-serif">
//             Empowering young minds to grow emotionally, socially, and
//             confidently.
//           </p>
//           <button className="w-[165px] h-[50px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
//             <FaPlay className="text-white" />
//             Learn More
//           </button>
//         </div>
//       </div>

//       {/* Right Section (Registration Form) */}
//       <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-br-2xl rounded-tr-2xl space-y-6">
//         {/* Title */}
//         <div className="text-left space-y-2 w-[285px]">
//           <h3 className="font-medium text-xl font-serif text-white">
//             Create your MindSoul account
//           </h3>
//           {/* <p className="text-[12px] text-gray-400 leading-relaxed">
//             Join our community of caring families. Sign up to begin your journey
//             of mindful growth and emotional support.
//           </p> */}
//         </div>

//         {/* Registration Form */}
//         <form className="flex flex-col gap-4 w-[285px]">
//           {/* Name */}
//           <span className="flex items-center bg-black/60 rounded-md px-2">
//             <svg
//               className="w-5 h-5"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="#ffffff"
//               viewBox="0 0 448 512"
//             >
//               <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm89.6 32h-11.8c-22.3 10.3-47 16-73.8 16s-51.6-5.7-73.8-16h-11.8C64.5 288 0 352.5 0 432v16c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64v-16c0-79.5-64.5-144-142.4-144z" />
//             </svg>
//             <input
//               type="text"
//               placeholder="Your full name"
//               className="w-full h-[42px] bg-transparent px-2 text-white text-sm outline-none placeholder-gray-400"
//             />
//           </span>

//           {/* Email */}
//           <span className="flex items-center bg-black/60 rounded-md px-2">
//             <svg
//               className="w-5 h-5"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="#ffffff"
//               viewBox="0 0 512 512"
//             >
//               <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
//             </svg>
//             <input
//               type="email"
//               placeholder="Your email address"
//               className="w-full h-[42px] bg-transparent px-2 text-white text-sm outline-none placeholder-gray-400"
//             />
//           </span>

//           {/* Password */}
//           <span className="flex items-center bg-black/60 rounded-md px-2">
//             <svg
//               className="w-5 h-5"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="#ffffff"
//               viewBox="0 0 448 512"
//             >
//               <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
//             </svg>
//             <input
//               type="password"
//               placeholder="Create a password"
//               className="w-full h-[42px] bg-transparent px-2 text-white text-sm outline-none placeholder-gray-400"
//             />
//           </span>
//         </form>

//         {/* Create Account Button */}
//         <button className="w-[285px] h-[45px] bg-[#5E40F0] hover:bg-[#4621FF] rounded-md transition text-white text-sm mt-2">
//           Create Account
//         </button>

//         {/* Social Logins */}
//         <div className="flex flex-col items-center gap-3 text-[11px] mt-3">
//           <p>Or sign up with</p>
//           <div className="flex gap-4">
//             <FaGoogle className="text-2xl cursor-pointer" />
//             <FaFacebook className="text-2xl cursor-pointer" />
//             <FaTwitter className="text-2xl cursor-pointer" />
//             <FaInstagram className="text-2xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Already have an account */}
//         <p className="text-[11px] text-gray-400 mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-[#6B4EFF] hover:underline">
//             Log in
//           </a>
//         </p>
//       </div>
//     </main>
//   );
// }

import React, { useState } from "react";
import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, provider } from "../FirebaseConfig";

export default function Registration({
  isOpen,
  onClose,
  onSignupSuccess,
  onSwitchToLogin,
}) {
  if (!isOpen) return null;

  const accent = "#7a3cff";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError("⚠️ Account already exists. Please log in instead.");
        setLoading(false);
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Account created successfully!");
      if (onSignupSuccess) onSignupSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithPopup(auth, provider);
      alert("✅ Signed up successfully with Google!");
      if (onSignupSuccess) onSignupSuccess();
      onClose();
    } catch (error) {
      console.error("Google Sign-Up Error:", error);
      setError("Google Sign-Up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm px-3">
      <div className="relative bg-transparent shadow-2xl w-full max-w-[850px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white animate-fadeIn">
        {/* Left Section */}
        <div
          className="hidden md:flex flex-col justify-between w-[55%] p-10 rounded-tl-2xl rounded-bl-2xl"
          style={{ backgroundColor: accent }}
        >
          <div className="flex items-center gap-3 font-medium cursor-pointer font-serif">
            <FaHeart className="text-2xl" />
            <p className="text-2xl">MindSoul</p>
          </div>

          <div className="flex flex-col gap-6 font-sans">
            <p className="text-3xl font-medium leading-snug font-serif">
              Join MindSoul and begin your emotional wellness journey today.
            </p>
            <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
              <FaPlay className="text-white" />
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-2xl md:rounded-tr-2xl md:rounded-br-2xl space-y-5 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>

          <div className="text-left space-y-2 w-[285px]">
            <h3 className="font-medium text-xl font-serif">
              Create an Account
            </h3>
            <p className="text-[12px] text-gray-400 leading-relaxed">
              Join MindSoul Wellness to explore emotional healing and growth.
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="flex flex-col gap-4 w-[285px]"
          >
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm outline-none placeholder-gray-400"
            />

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-[285px] h-[45px] bg-[#5E40F0] hover:bg-[#4621FF] rounded-md transition text-white text-sm disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="flex flex-col items-center gap-3 text-[11px]">
            <p className="text-lg">Or Sign Up with Google</p>
            <FaGoogle
              onClick={handleGoogleSignup}
              className="text-2xl cursor-pointer hover:scale-110 transition"
            />
            <p
              onClick={onSwitchToLogin}
              className="text-[#4A62FF] hover:underline cursor-pointer mt-2"
            >
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
