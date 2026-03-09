import React from "react";
import Breadcrumb from "./Breadcrumb";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="font-serif text-gray-800 mt-30">
      <Helmet>
        <title>
          About The Mind Soul | Online Psychologist & Mental Wellness
        </title>
        <meta
          name="description"
          content="Learn about The Mind Soul and our mission to provide professional online counselling, mental health therapy, and emotional wellbeing support across India."
        />
      </Helmet>
      <Breadcrumb />
    </div>
  );
};

export default AboutUs;
