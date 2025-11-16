import React from "react";
import QuoteForm from "./QuoteForm";

export default function QuoteHero() {
  return (
    <section className="w-full px-6 lg:px-20 py-20 bg-white flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-between">
      {/* LEFT SIDE */}
      <div className="lg:w-1/2">
        <h1 className="text-6xl font-bold text-gray-900 leading-tight font-heading">
          Request Your Custom <br />
          Quote
        </h1>

        <p className="text-gray-600 mt-4 text-lg font-body">
          See how MindSoul can meet your workforce’s mental health needs with a
          value-based approach focused on better outcomes.
        </p>

        <ul className="mt-6 space-y-3 text-gray-700 font-body text-lg">
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Custom plans based on team size, needs, and location
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Long-term value pricing with quality care at lower cost
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Expert guidance from day one
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Whole-person care with access to specialists
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-accent text-xl">✔</span>
            Clear ROI and measurable care outcomes
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE FORM BLOCK */}
      <div className="lg:w-1/2 flex justify-center">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_6px_30px_rgba(0,0,0,0.08)] p-10 border border-gray-200 text-md font-body">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
