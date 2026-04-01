import React, { useState, useEffect } from "react";
import { FaHeart, FaPlay, FaGoogle } from "react-icons/fa";
import Registration from "./Registration";
import { useAuth } from "../context/AuthContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../FirebaseConfig";

export default function LoginPage({
  isOpen,
  onClose,
  onUserLoginSuccess,
  defaultEmail,
}) {
  const { login } = useAuth();

  const [email, setEmail] = useState(defaultEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setEmail(defaultEmail || "");
  }, [defaultEmail]);

  // if (!isOpen) return null;
  if (!isOpen && !showRegister) return null;

  const API_LOGIN =
    "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/login";

  const API_GOOGLE =
    "https://mindsoul-backend-772700176760.asia-south1.run.app/api/auth/google";

  // ---------------------------------------------------
  // EMAIL LOGIN
  // ---------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await res.json();

      if (!res.ok) {
        setError(response.message || "Wrong credentials.");
        return;
      }

      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token || !user) {
        setError("Invalid backend response.");
        return;
      }

      // SAVE TOKEN
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("isUserLoggedIn", "true"); // 🔥 Important

      login(user, token);

      // 🔥 Notify navbar AFTER successfully storing login state
      onUserLoginSuccess && onUserLoginSuccess();

      onClose();
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------
  // GOOGLE LOGIN
  // ---------------------------------------------------
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      auth.languageCode = "en";

      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      const idToken = await googleUser.getIdToken();

      const res = await fetch(API_GOOGLE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (!res.ok || !data?.data?.user || !data?.data?.token) {
        setError(data.message || "Google login failed.");
        return;
      }

      const backendUser = data.data.user;
      const backendToken = data.data.token;

      localStorage.setItem("token", backendToken);
      localStorage.setItem("role", backendUser.role);
      localStorage.setItem("isUserLoggedIn", "true");

      login(backendUser, backendToken);

      // 🔥 Notify navbar
      onUserLoginSuccess && onUserLoginSuccess();

      onClose();
    } catch (error) {
      console.error("Google Error:", error);
      setError("Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  const accent = "#7a3cff";

  // return (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
  //     <div className="relative bg-transparent shadow-2xl w-[90%] md:w-[850px] h-auto md:h-[500px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white">
  //       {/* LEFT SECTION */}
  //       <div
  //         className="hidden md:flex flex-col justify-between w-[55%] p-10 rounded-tl-2xl rounded-bl-2xl bg-primary"
  //         // style={{ backgroundColor: accent }}
  //       >
  //         <div className="flex items-center gap-3 font-medium cursor-pointer font-serif">
  //           <FaHeart className="text-2xl" />
  //           <p className="text-2xl">MindSoul</p>
  //         </div>

  //         <div className="flex flex-col gap-6 font-sans">
  //           <p className="text-3xl font-medium max-w-[90%] leading-snug font-serif">
  //             Supporting children to grow emotionally, socially, and
  //             confidently.
  //           </p>
  //           <button className="w-[165px] h-[45px] flex items-center justify-center gap-3 bg-[#15171B] rounded-full hover:bg-black transition">
  //             <FaPlay className="text-white" />
  //             Our Approach
  //           </button>
  //         </div>
  //       </div>

  //       {/* RIGHT SECTION */}
  //       <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 rounded-tr-2xl rounded-br-2xl space-y-5 relative">
  //         <button
  //           onClick={onClose}
  //           className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
  //         >
  //           ×
  //         </button>

  //         <div className="text-left space-y-2 w-[285px]">
  //           <h3 className="font-medium text-xl font-serif">Welcome Back</h3>
  //           <p className="text-[12px] text-gray-400">
  //             Continue your journey of mindful growth.
  //           </p>
  //         </div>

  //         <form
  //           onSubmit={handleLogin}
  //           className="flex flex-col gap-4 w-[285px]"
  //         >
  //           <input
  //             type="email"
  //             placeholder="Your email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //             className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm"
  //           />

  //           <input
  //             type="password"
  //             placeholder="********"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //             className="w-full h-[42px] bg-black/60 px-3 rounded-md text-white text-sm"
  //           />

  //           {error && (
  //             <p className="text-red-400 text-xs text-center">{error}</p>
  //           )}

  //           <button
  //             type="submit"
  //             disabled={loading}
  //             className="w-[285px] h-[45px] bg-primary hover:bg-light hover:text-textDark rounded-md transition"
  //           >
  //             {loading ? "Logging in..." : "Continue"}
  //           </button>
  //         </form>

  //         {/* GOOGLE LOGIN */}
  //         <div className="flex flex-col items-center gap-3">
  //           {/* <p className="text-lg">Or Login with Google</p>

  //           <FaGoogle
  //             onClick={handleGoogleLogin}
  //             className="text-2xl cursor-pointer hover:scale-110 transition"
  //           /> */}

  //           <p
  //             // onClick={() => setRegisterOpen(true)}
  //             onClick={() => setShowRegister(true)}
  //             className="text-light hover:underline cursor-pointer mt-2 text-md"
  //           >
  //             Don’t have an account?{" "}
  //             <span className="hover:text-indigo-500">Sign Up</span>
  //           </p>

  //           <Registration
  //             isOpen={isRegisterOpen}
  //             onClose={() => setRegisterOpen(false)}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <>
      {/* LOGIN MODAL */}
      {isOpen && !showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-transparent shadow-2xl w-[90%] md:w-[850px] h-auto md:h-[450px] rounded-2xl overflow-hidden flex flex-col md:flex-row text-white">
            {/* LEFT */}
            <div className="hidden md:flex flex-col justify-between w-[55%] p-10 bg-primary">
              <div className="flex items-center gap-3 font-serif">
                <FaHeart className="text-2xl" />
                <p className="text-2xl">MindSoul</p>
              </div>

              <p className="text-3xl font-serif">
                Supporting children to grow emotionally, socially, and
                confidently.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center justify-center bg-[#16181C] w-full md:w-[45%] p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-3 right-4 text-2xl"
              >
                ×
              </button>

              <div className="text-left space-y-2 w-[285px]">
                <h3 className="font-medium text-2xl font-serif">
                  Welcome Back
                </h3>
                <p className="text-[14px] text-gray-400 pb-4">
                  Continue your journey of mindful growth.
                </p>
              </div>

              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4 w-full max-w-[285px]"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="h-[42px] bg-black/60 px-3 rounded-md"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="h-[42px] bg-black/60 px-3 rounded-md"
                />

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-[45px] bg-primary rounded-md"
                >
                  {loading ? "Logging in..." : "Continue"}
                </button>
              </form>

              {/* SWITCH */}
              <p
                onClick={() => setShowRegister(true)}
                className="cursor-pointer mt-4 text-md text-light hover:underline"
              >
                Don’t have an account? <span>Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegister && (
        <Registration
          isOpen={true}
          onClose={() => {
            setShowRegister(false);
            onClose(); // fully close modal
          }}
        />
      )}
    </>
  );
}
