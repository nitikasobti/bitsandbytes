import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Step2 = ({ onNextStep, onPrevStep }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [courseInfo, setCourseInfo] = useState("");

  const handleInputChange = (event) => {
    setCourseInfo(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onNextStep(courseInfo);
    }
  };

  return (
    <div className="max-w-screen max-h-screen bg-black h-screen flex flex-col text-center justify-center">
      <div
        className="absolute left-10 top-8 text-gray-500"
        onClick={onPrevStep}
      >
        <FaArrowLeft className="text-gray-500 inline-block text-3xl ml-2" />
      </div>
      <div data-aos="zoom-in-up">
        <div className="flex flex-col items-center text-blue-700 text-5xl font-bold p-8">
          Step 2
        </div>
        <div className="flex flex-col items-center text-white text-4xl font-semibold p-8">
          Give a description to your course
          <div className="mt-4 p-8">
            <input
              className="w-96 h-14 p-8 px-4 py-2 border rounded-full text-base justify-center items-center text-black border-gray-300 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
              type="text"
              placeholder="This course is all about..."
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
