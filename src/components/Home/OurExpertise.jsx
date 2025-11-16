import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function OurExpertise() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#7A3CFF] to-[#C5B4E3] text-white py-20 md:py-32 ">
      {/* Curved Shape Background */}
      <div className="absolute top-0 left-0 w-full h-full pt-28">
        <svg
          className="absolute top-0 left-0 w-full h-auto"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#7A3CFF"
            d="M0,64L60,74.7C120,85,240,107,360,106.7C480,107,600,85,720,106.7C840,128,960,192,1080,213.3C1200,235,1320,213,1380,202.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 pt-28">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left max-w-xl"
        >
          <p className="text-primary font-semibold mb-4 uppercase tracking-widest font-body">
            Our Expertise
          </p>

          <h1 className="text-6xl font-semibold leading-tight mb-6 font-heading">
            Nurturing Minds. Supporting Families. Healing Together.
          </h1>

          <p className="text-lg text-gray-200 leading-relaxed mb-4 font-body">
            At MindSoul Wellness, we specialize in supporting children and teens
            who are experiencing emotional, behavioral, or developmental
            challenges. Our approach is warm, nurturing, and rooted in clinical
            research — helping young minds grow stronger and families feel
            understood and supported.
          </p>

          <p className="text-lg text-gray-200 leading-relaxed font-body">
            Our team of child psychologists, developmental experts, and mental
            health therapists work collaboratively to create personalized care
            plans. We focus on early intervention, emotional regulation, and
            building healthy relationships — ensuring that every child feels
            seen, heard, and valued.
          </p>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="relative w-[400px] h-[500px] overflow-hidden shadow-2xl ">
            <LazyLoadImage
              src="/rutambara.jpg" // replace with MindSoul clinician / therapy image
              alt="MindSoul Wellness"
              effect="blur"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
