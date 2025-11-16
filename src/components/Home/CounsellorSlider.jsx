// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import { Star, Briefcase, ArrowUpRight } from "lucide-react";
// import "swiper/css";
// import "swiper/css/pagination";

// const counsellors = [
//   {
//     name: "Ananya Verma",
//     image: "/c1.jpg",
//     languages: "Hindi | English | Marathi",
//     location: "Bengaluru, India",
//     rating: 4,
//     experience: "4 Years",
//     price: "5,000 ProCoins",
//   },
//   {
//     name: "Harshit Sharma",
//     image: "/c2.jpg",
//     languages: "Hindi",
//     location: "Mumbai",
//     rating: 5,
//     experience: "3 Years",
//     price: "5,000 ProCoins",
//   },
//   {
//     name: "Nitish Kumar",
//     image: "/c3.jpg",
//     languages: "English | Hindi | Marathi",
//     location: "Bengaluru",
//     rating: 4,
//     experience: "4 Years",
//     price: "10,000 ProCoins",
//   },
//   {
//     name: "Rithika Singh",
//     image: "/placeholder.png",
//     languages: "English | Hindi",
//     location: "Bengaluru",
//     rating: 4,
//     experience: "7 Years",
//     price: "5,000 ProCoins",
//   },
// ];

// export default function CounsellorSlider() {
//   return (
//     <div className="max-w-7xl mx-auto px-5 py-12 bg-[#FAF9F6]">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-semibold text-gray-900">Counsellors</h2>
//         <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
//           See All <ArrowUpRight size={18} />
//         </button>
//       </div>

//       {/* Slider */}
//       <Swiper
//         modules={[Navigation, Pagination]}
//         spaceBetween={25}
//         slidesPerView={1.2}
//         pagination={{ clickable: true }}
//         breakpoints={{
//           640: { slidesPerView: 2.2 },
//           1024: { slidesPerView: 3.2 },
//           1280: { slidesPerView: 4 },
//         }}
//         className="pb-10"
//       >
//         {counsellors.map((c, index) => (
//           <SwiperSlide key={index}>
//             <div className=" shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition pt-10 pb-10">
//               <img
//                 src={c.image}
//                 alt={c.name}
//                 className="w-full h-56 object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   {c.name}
//                 </h3>

//                 <p className="text-gray-600 text-sm mt-1">{c.languages}</p>
//                 <p className="text-gray-500 text-sm">{c.location}</p>

//                 {/* Rating & Experience */}
//                 <div className="flex items-center gap-3 text-sm text-gray-700 mt-3">
//                   <span className="flex items-center gap-1 text-yellow-500">
//                     <Star size={16} /> {c.rating}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Briefcase size={16} /> {c.experience}
//                   </span>
//                 </div>

//                 {/* Price */}
//                 {/* <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
//                   <img src="/coin.png" alt="coin" className="w-6 h-6" />
//                   <span className="font-semibold text-gray-900">{c.price}</span>
//                 </div> */}
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Star, Briefcase, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const counsellors = [
  {
    id: 1,
    name: "Sarabsri",
    image: "/counselors/1.png",
    languages: "Hindi | English | Marathi",
    location: "Bengaluru, India",
    rating: 4,
    experience: "4 Years",
    price: "3,500",
    bio: "Ananya specializes in child emotional growth and personality building...",
  },
  {
    id: 2,
    name: "Ridhi",
    image: "/counselors/2.png",
    languages: "Hindi",
    location: "Mumbai",
    rating: 5,
    experience: "3 Years",
    price: "1,500",
    bio: "Harshit focuses on developing confidence and communication skills...",
  },
  {
    id: 3,
    name: "Priyanka",
    image: "/counselors/3.png",
    languages: "English | Hindi | Marathi",
    location: "Bengaluru",
    rating: 4,
    experience: "4 Years",
    price: "1,500 ",
    bio: "Nitish works with children facing social anxiety and learning struggles...",
  },
  {
    id: 4,
    name: "Rithika Singh",
    image: "/counselors/c4.jpg",
    languages: "English | Hindi",
    location: "Bengaluru",
    rating: 4,
    experience: "7 Years",
    price: "2,500",
    bio: "Rithika is experienced in emotional and behavioral therapy...",
  },
];

export default function CounsellorSlider() {
  const navigate = useNavigate();

  const openProfile = (counsellor) => {
    navigate(`/counsellor/${counsellor.id}`, { state: counsellor });
  };

  return (
    <div
      id="counsellor-section"
      className="max-w-7xl mx-auto px-5 py-12 bg-[#FAF9F6]"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-semibold text-gray-900 font-heading">
          Counsellors
        </h2>
        <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 font-body transition">
          See All <ArrowUpRight size={18} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={25}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {counsellors.map((c) => (
          <SwiperSlide key={c.id}>
            <div
              onClick={() => openProfile(c)}
              className="cursor-pointer shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition pt-10 pb-10"
            >
              <LazyLoadImage
                src={c.image}
                alt={c.name}
                effect="blur"
                className="w-full h-56 object-cover"
              />

              <div className="p-4 font-body">
                <h3 className="text-xl font-semibold text-gray-900">
                  {c.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{c.languages}</p>
                <p className="text-gray-500 text-sm">{c.location}</p>

                <div className="flex items-center gap-3 text-sm text-gray-700 mt-3">
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} /> {c.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={16} /> {c.experience}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
