import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CounselorLogin({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "/how-it-work-img-2.jpg",
      title: "Connect With Child Experts",
      text: "Schedule caring one-on-one guidance to help children grow emotionally, socially and confidently.",
    },
    {
      img: "/how-it-work-img-1.jpg",
      title: "Personalized Support",
      text: "Our experts provide customized care plans tailored to your child’s emotional and developmental needs.",
    },
    {
      img: "/how-it-work-img-3.jpg",
      title: "Grow With Confidence",
      text: "Help your child build confidence and resilience with structured expert-led consultations.",
    },
  ];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row py-12">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-8 relative">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo.png" className="w-8 h-8" alt="MindSoul" />
            <h2 className="text-xl font-semibold text-gray-900 font-body">
              MindSoul Wellness
            </h2>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-body">
            Log in or Sign up
          </h1>

          <p className="text-gray-500 text-sm mb-6 font-body">
            Support for emotional, behavioral & developmental well-being.
          </p>

          {/* EMAIL INPUT */}
          <div className="border rounded-lg flex items-center px-3 py-3 bg-gray-50">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent outline-none text-gray-800 font-body"
            />
          </div>

          {/* Continue Button */}
          <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition font-body">
            Continue
          </button>

          <p className="text-xs text-gray-500 text-center mt-4 font-body">
            By continuing, you agree to MindSoul’s{" "}
            <a href="#" className="text-indigo-600 underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-600 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* RIGHT SIDE AUTO-SLIDER */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gray-50 p-8 text-center relative overflow-hidden font-body">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-4 text-gray-400 hover:text-gray-600 font-body"
          >
            <X size={24} />
          </button>

          {/* Slider Container */}
          <div
            className="w-full transition-all duration-700 flex "
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex flex-col items-center"
              >
                <img src={slide.img} alt="slide" className="w-64 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-body">
                  {slide.title}
                </h3>
                <p className="text-gray-500 text-sm max-w-sm px-12 font-body">
                  {slide.text}
                </p>
              </div>
            ))}
          </div>

          {/* Slider Dots */}
          <div className="flex space-x-2 mt-6">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === i ? "bg-indigo-600" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
