import React from "react";
import QuoteHero from "../components/Contact Us/QuoteHero";
import StatsSection from "../components/Contact Us/StatsSection";
import ROISection from "../components/Contact Us/ROISection";
import TrustedCompanies from "../components/Contact Us/TrustedCompanies";
import { Helmet } from "react-helmet-async";

const Contacts = () => {
  return (
    <div className="mt-30">
      <Helmet>
        <title>Contact Online Psychologist | Book Counselling Session</title>
        <meta
          name="description"
          content="Contact The Mind Soul to book confidential online counselling sessions for anxiety, stress, relationships, and emotional wellbeing with expert psychologists."
        />
      </Helmet>
      <QuoteHero />
      <StatsSection />
      {/* <ROISection /> */}
      {/* <TrustedCompanies /> */}
    </div>
  );
};

export default Contacts;
