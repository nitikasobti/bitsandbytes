import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Prerequisites = ({ courseData }) => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <div className="bg-black max-w-screen">
      <div data-aos="zoom-in-up" className="text-white text-2xl font-semibold p-6 ml-12">
        Prerequisites
      </div>
      <div data-aos="zoom-in-up" className="p-4 ml-16">
        <div className="text-white text-2xl p-2">
          {courseData.prerequisites}
        </div>
      </div>
    </div>
  );
};

export default Prerequisites;
