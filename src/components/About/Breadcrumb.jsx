import React, { useState } from "react";
import EditProfileModal from "../Profile/EditProfileModal";
import BookAppointmentModal from "../Profile/BookAppointmentModal";
import AppointmentConfirmationModal from "../Profile/AppointmentConfirmationModal";

export default function Breadcrumb() {
  const [open, setOpen] = useState(false);
  const [appointmentopen, setAppointmentOpen] = useState(false);
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

        {/* Modal Buttons start */}
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 bg-accent text-white rounded-lg mt-10 font-body text-xl"
        >
          Open Edit Profile
        </button>

        <EditProfileModal isOpen={open} onClose={() => setOpen(false)} />
        <br />
        <button
          onClick={() => setAppointmentOpen(true)}
          className="px-6 py-3 bg-accent text-white rounded-lg mt-10 font-body text-xl"
        >
          Book Appointment
        </button>

        <BookAppointmentModal
          isOpen={appointmentopen}
          onClose={() => setAppointmentOpen(false)}
        />

        <button
          onClick={() => setConfirmationOpen(true)}
          className="px-6 py-3 bg-accent text-white rounded-lg mt-10 font-body text-xl"
        >
          Open Confirmation Modal
        </button>

        <AppointmentConfirmationModal
          isOpen={confirmationopen}
          onClose={() => setConfirmationOpen(false)}
        />

        {/* Modal Buttons ends */}
      </section>

      {/* Story Section */}
      <section className="bg-gradient-to-r from-[#7A3CFF] to-[#C5B4E3] text-white py-16  flex flex-col md:flex-row items-center ">
        {/* Left Text */}
        <div className="md:w-1/2 space-y-6 px-28">
          <h4 className="text-[#F2C94C] text-lg uppercase font-medium font-heading">
            Our Story
          </h4>
          <h2 className="text-5xl font-semibold leading-snug">
            Created by a family, for <em>all families</em>
          </h2>
          <p className="text-lg leading-relaxed text-gray-200">
            Founded by a passionate team of therapists and caregivers, MindSoul
            Wellness provides families with comprehensive emotional and mental
            health care. Our mission is to ensure every family has access to the
            tools and experts needed for a healthy mind and heart.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
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
      <section className="bg-gradient-to-r from-[#7A3CFF] to-[#C5B4E3] text-white py-10 flex flex-wrap justify-center gap-10 border-t border-[#b8a0ee]">
        {[
          "Best Family Therapy",
          "Best Online Counseling",
          "Best Care for Kids",
          "Best Parent Support",
        ].map((award, i) => (
          <div key={i} className="text-center space-y-2">
            <p className="text-xl uppercase tracking-wider">{award}</p>
            <p className="text-gray-300 text-md">
              Recognized by Wellness Awards
            </p>
          </div>
        ))}
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
              className="flex flex-col md:flex-row border-b border-gray-200 py-4"
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
      <section className="grid md:grid-cols-2">
        <div className="bg-[#F7F4EC] p-10 text-center">
          <h4 className="uppercase  text-gray-500 text-lg">For Families</h4>
          <h3 className="text-2xl font-medium mt-2 mb-4 font-heading">
            Want to learn more?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Discover how MindSoul can help your family thrive emotionally.
          </p>
          <button className="border border-gray-700 px-5 py-2 rounded-md hover:bg-gray-800 hover:text-white transition text-lg">
            Contact us
          </button>
        </div>

        <div className="bg-[#F1F2F6] p-10 text-center">
          <h4 className="uppercase text-lg text-gray-500">For Partners</h4>
          <h3 className="text-2xl font-medium mt-2 mb-4 font-heading">
            Partner with us
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Get in touch about partnership opportunities with MindSoul.
          </p>
          <button className="border border-gray-700 px-5 py-2 rounded-md hover:bg-gray-800 hover:text-white transition text-lg">
            Contact us
          </button>
        </div>
      </section>
    </div>
  );
}
