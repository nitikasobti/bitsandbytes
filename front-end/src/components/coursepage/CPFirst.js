import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CPFirst = ({ courseData }) => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <div className="max-w-screen bg-blue-900">
      <div className="flex flex-row p-4 justify-around">
        <div data-aos="zoom-in-right" className="flex flex-col justify-center">
          <div className="text-4xl text-white font-semibold p-2">
            {courseData.title}
          </div>
          <div className="text-2xl text-white p-2">
            {courseData.description}
          </div>
          <div className="text-2xl text-white p-2">{courseData.instructor}</div>
          <div className="text-3xl text-white p-2 font-semibold">
            {courseData.price}
          </div>
        </div>
        <div data-aos="zoom-in-left" className="flex flex-col justify-center">
          <div
            className="w-96 h-48 rounded-lg mt-4 shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] shadow-gray-300"
            style={{
              backgroundImage: `url(${courseData.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex justify-center mt-6">
            <button className="w-28 h-12 text-semibold rounded-3xl mr-7 ml-2 cursor-pointer text-blue-700 bg-white transition-colors duration-200 shadow-[0_0px_3px_3px_rgba(0,0,0,0.3)] shadow-gray-300 hover:bg-blue-700 hover:text-white hover:shadow-[0_0px_3px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-700">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
      <div className="p-2"></div>
    </div>
  );
};

export default CPFirst;
