import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { dummyCourses } from "../dummy/dummy-courses";
import CourseCard from "./CourseCard";

const Second = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <div className="max-w-screen bg-black text-center">
      <div data-aos="zoom-in-up" className="text-white text-3xl font-semibold p-4 pt-4">
        Most Popular courses
      </div>
      <div data-aos="zoom-in-up" className="flex flex-wrap bg-black max-w-screen justify-center gap-6">
        {dummyCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Second;
