import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Star, Briefcase, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function CounsellorSlider() {
  const navigate = useNavigate();
  const [counsellors, setCounsellors] = useState([]);

  useEffect(() => {
    // console.log("Fetching counsellors...");

    fetch(
      "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/list",
    )
      .then((res) => {
        // console.log("🟢 API status:", res.status);
        return res.json();
      })
      .then((data) => {
        // console.log("🟢 API response data:", data);

        if (data?.counsellors) {
          // console.log("🟢 Counsellors found:", data.counsellors.length);
          setCounsellors(data.counsellors);
        } else {
          console.log("🔴 API response missing counsellors array");
        }
      })
      .catch((err) => console.log("🔴 Fetch error:", err));
  }, []);

  const openProfile = (c) => {
    navigate(`/counsellor/${c.counsellorId}`, { state: c });
  };

  return (
    <div id="counsellor-section" className="max-w-7xl mx-auto px-5 py-12 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 font-heading">
          Counsellors
        </h2>
        <a href="/counsellors">
          <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 font-body transition cursor-pointer">
            See All <ArrowUpRight size={18} />
          </button>
        </a>
      </div>

      <Swiper
        // modules={[Navigation, Pagination]}
        // spaceBetween={25}
        // slidesPerView={1.2}
        // pagination={{ clickable: true }}
        // breakpoints={{
        //   640: { slidesPerView: 2.2 },
        //   1024: { slidesPerView: 3.2 },
        //   1280: { slidesPerView: 4 },
        // }}
        // className="pb-10"

        modules={[Navigation, Pagination]}
        spaceBetween={25}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        grabCursor={true}
        simulateTouch={true}
        allowTouchMove={true}
        mousewheel={true}
        touchRatio={1}
        touchAngle={45}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {counsellors.map((c) => (
          <SwiperSlide key={c.counsellorId}>
            <div
              // onClick={() => openProfile(c)}
              className="cursor-pointer shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition pt-10 pb-10 bg-accent"
            >
              {/* <LazyLoadImage
                src={c.imageUrl || "https://via.placeholder.com/300"}
                alt={c.firstName}
                effect="blur"
                className="w-full h-56 object-cover"
              /> */}
              <div className="w-[90%] mx-auto">
                <img
                  src={c?.imageUrl}
                  alt={c.firstName}
                  className="w-full h-80 md:h-70  object-cover"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
                />
              </div>
              <div className="p-4 font-body">
                <h3 className="text-xl font-semibold text-gray-900">
                  {c.firstName} {c.lastName}
                </h3>

                <p className="text-textDark text-md mt-1">
                  {c.languages?.join(" | ") || "Languages not specified"}
                </p>

                <p className="text-textDark text-md">
                  {c.location || "Location not provided"}
                </p>

                <div className="flex items-center gap-3 text-sm text-textDark mt-3">
                  {/* <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} /> {c.rating || "4.5"}
                  </span> */}

                  <span className="flex items-center gap-1">
                    <Briefcase size={16} />
                    {c.experience
                      ? c.experience.toLowerCase().includes("year")
                        ? c.experience
                        : `${c.experience} years`
                      : "Experience N/A"}
                  </span>

                  <button
                    onClick={() => openProfile(c)}
                    className="bg-primary px-4 py-2 text-light text-md text-body rounded-sm cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
