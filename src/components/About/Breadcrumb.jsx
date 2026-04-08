import React, { useState } from "react";
import AppointmentConfirmationModal from "../Profile/AppointmentConfirmationModal";
import { Link } from "react-router-dom";

export default function Breadcrumb() {
  const [open, setOpen] = useState(false);
  const [confirmationopen, setConfirmationOpen] = useState(false);

  return (
    <div className="font-serif text-gray-800 mt-30">
      {/* Mission Section */}
      <section className="bg-[#F8F9FA] text-center py-16 px-6 md:px-20">
        <h4 className="text-lg uppercase tracking-widest text-gray-500 mb-3 font-heading">
          Our Mission
        </h4>
        <h1 className="text-6xl mb-3 text-[#0A1E33] font-heading">
          MindSoul is on a mission to reimagine <br /> family mental wellness
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          The best counselors. The latest virtual care technology and mental
          health insights. Personalized, high-quality care for families wherever
          they are.
        </p>
      </section>

      {/* Story Section */}
      <section className="gradient-bg text-white py-16  flex flex-col md:flex-row items-center ">
        {/* Left Text */}
        <div className="md:w-1/2 space-y-6 px-8 lg:px-28">
          <h4 className="text-light text-lg uppercase font-medium font-heading">
            Our Story
          </h4>
          <h2 className="text-6xl font-semibold leading-snug font-heading">
            Created by a family, for all families
          </h2>
          <p className="text-lg leading-relaxed text-black font-body">
            Founded by a passionate team of therapists and caregivers, MindSoul
            Wellness provides families with comprehensive emotional and mental
            health care. Our mission is to ensure every family has access to the
            tools and experts needed for a healthy mind and heart.
          </p>
          <p className="text-lg leading-relaxed text-black font-body">
            With years of combined experience in child psychology and emotional
            care, our founders built MindSoul to connect families with
            empathetic professionals who understand what truly matters —
            emotional balance, communication, and well-being.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/counselors/rutambara-1.jpg"
            alt="Founders"
            className="rounded-lg w-full max-w-md object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Awards Section */}
      <section className=" gradient-bg  text-black py-10 flex flex-wrap justify-center gap-10 border-t border-accent">
        {[
          "Best Family Therapy",
          "Best Online Counseling",
          "Best Care for Kids",
          "Best Parent Support",
        ].map((award, i) => (
          <div key={i} className="text-center space-y-2 font-body">
            <p className="text-xl uppercase ">{award}</p>
            <p className="text-textDark text-lg">
              Recognized by Wellness Awards
            </p>
          </div>
        ))}
      </section>

      <section className="w-full bg-gray-50 py-12 md:py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/3">
                <img
                  src="/chief-operation.jpeg" // replace with actual image
                  alt="Profile"
                  className="w-full h-[350px] md:h-full object-cover rounded-br-4xl rounded-tr-4xl"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-2/3 p-6 md:p-10">
                {/* Name */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Pallavi Kothari
                </h2>

                {/* Designation */}
                <p className="text-[#344556] font-semibold mb-4 text-3xl">
                  Chief Operations Strategy Officer
                </p>

                {/* Divider */}
                <div className="w-16 h-1 bg-[#344556] mb-6 rounded"></div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  A forward-thinking operations and talent strategist, I
                  specialize in building and scaling organizations at the pace
                  of innovation. With over seven years of global experience, I
                  partner with leadership teams to transform ambitious visions
                  into executable growth strategies—aligning people, processes,
                  and performance to drive sustainable scale.
                </p>

                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  My work spans North America, the U.K., and APAC, where I have
                  led high-impact talent and workforce initiatives across
                  healthcare, SaaS, fintech, and financial services. I bring a
                  deep understanding of how to build from zero to
                  scale—designing agile hiring systems, strengthening employer
                  brands, and embedding operational rigor into fast-growing
                  environments.
                </p>

                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  I have a strong track record in healthcare talent strategy,
                  enabling organizations to scale critical clinical and
                  non-clinical teams across complex care ecosystems. From
                  frontline healthcare professionals to specialized program
                  leadership, I have consistently delivered talent solutions
                  that balance speed, quality, and long-term organizational
                  resilience.
                </p>

                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Beyond hiring, I focus on building the infrastructure for
                  growth—developing scalable frameworks, driving
                  cross-functional alignment, and creating high-performance
                  cultures. I am passionate about enabling organizations to not
                  only grow fast, but grow right.
                </p>

                <p className="text-gray-600 text-lg leading-relaxed">
                  I hold a Postgraduate Certificate in Human Resource Management
                  from George Brown College, Toronto, and a Bachelor of Commerce
                  in Financial Markets from the University of Mumbai. I am
                  driven by the belief that great organizations are built
                  through intentional strategy, empowered people, and
                  disciplined execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className=" py-16 px-6 md:px-20 w-[95%] mx-auto">
        <h4 className="text-lg uppercase tracking-widest text-gray-500 mb-3 font-heading">
          Our Values
        </h4>
        <h2 className="text-5xl font-medium font-heading mb-8 text-[#0A1E33]">
          High-quality care for <em>every</em> family
        </h2>

        <div className="border-t border-gray-200">
          {[
            {
              title: "Rooted in science",
              desc: "Evidence-based care backed by the latest research in family mental health.",
            },
            {
              title: "Personalized, integrated care",
              desc: "Our therapists deliver customized, data-informed support to each family.",
            },
            {
              title: "Family-focused",
              desc: "Parents, children, and relationships are at the center of every session.",
            },
            {
              title: "Setting a new standard",
              desc: "Exceptional quality care, backed by measurable outcomes at every step.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row border-b border-gray-200 py-4 font-body"
            >
              <div className="md:w-1/3 font-medium text-[#0A1E33] text-lg">
                {item.title}
              </div>
              <div className="md:w-2/3 text-gray-600 text-lg">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Boxes */}
      <section className="grid md:grid-cols-2 ">
        <div className="bg-primary p-10 text-center">
          <h4 className="uppercase  text-light text-lg font-body">
            For Families
          </h4>
          <h3 className="text-2xl font-medium mt-2 mb-4 font-heading text-light">
            Want to learn more?
          </h3>
          <p className="text-light mb-6 text-lg">
            Discover how MindSoul can help your family thrive emotionally.
          </p>
          <a href="/contacts">
            <button className="border border-light px-5 py-2 rounded-md hover:bg-gray-800 hover:text-white transition text-lg cursor-pointer">
              Contact us
            </button>
          </a>
        </div>

        <div className="bg-accent p-10 text-center">
          <h4 className="uppercase text-lg text-gray-500">For Partners</h4>
          <h3 className="text-2xl font-medium mt-2 mb-4 font-heading">
            Partner with us
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Get in touch about partnership opportunities with MindSoul.
          </p>
          <a href="/contacts">
            <button className="border border-gray-700 px-5 py-2 rounded-md hover:bg-gray-800 hover:text-white transition text-lg cursor-pointer">
              Contact us
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
