import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const InstructorInfo = ({ courseData }) => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <div className="bg-black max-w-screen">
      <div data-aos="zoom-in-up" className="text-white text-2xl font-semibold p-6 ml-12">
        Instructor Info
      </div>
      <div data-aos="zoom-in-up" className="p-4 ml-16">
        <div className="text-white text-3xl font-semibold p-2">
          {courseData.instructor}
        </div>
        <div className="text-white text-2xl p-2">
          {courseData.instructorInfo}
        </div>
      </div>
    </div>
  );
};

export default InstructorInfo;
