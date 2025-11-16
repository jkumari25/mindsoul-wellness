import React, { useState } from "react";
import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../FirebaseConfig";
import Registration from "./Registration";

export default function LoginPage({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToSignup,
}) {
  if (!isOpen) return null;

  const accent = "#7a3cff";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  // -----------------------------
  // EMAIL & PASSWORD LOGIN
  // -----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (err) {
      if (err.code === "auth/wrong-password")
        setError("❌ Incorrect password.");
      else if (err.code === "auth/user-not-found")
        setError("⚠️ Account not found.");
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // GOOGLE LOGIN (AUTO REGISTRATION)
  // -----------------------------
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const result = await signInWithPopup(auth, provider);

      // Firebase automatically registers the user if they don't exist
      const user = result.user;
      console.log("Google User:", user);

      alert("✅ Logged in successfully with Google!");
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Google Sign-In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-transparent shadow-2xl w-[90%] md:w-[850px] h-auto md:h-[500px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white">
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
            <p className="text-3xl font-medium max-w-[90%] leading-snug font-serif">
              Supporting children to grow emotionally, socially, and
              confidently.
            </p>
            <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
              <FaPlay className="text-white" />
              Our Approach
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-tr-2xl rounded-br-2xl space-y-5 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>

          <div className="text-left space-y-2 w-[285px]">
            <h3 className="font-medium text-xl font-serif">Welcome Back</h3>
            <p className="text-[12px] text-gray-400 leading-relaxed">
              Continue your journey of mindful growth and emotional support.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
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
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>

          <div className="flex flex-col items-center gap-3 text-[11px]">
            <p className="text-lg">Or Login with Google</p>
            <FaGoogle
              onClick={handleGoogleLogin}
              className="text-2xl cursor-pointer hover:scale-110 transition"
            />

            <p
              onClick={() => setRegisterOpen(true)}
              className="text-[#4A62FF] hover:underline cursor-pointer mt-2"
            >
              Don’t have an account? Sign Up
            </p>

            <Registration
              isOpen={isRegisterOpen}
              onClose={() => setRegisterOpen(false)}
              onSignupSuccess={() => alert("Welcome to MindSoul!")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
