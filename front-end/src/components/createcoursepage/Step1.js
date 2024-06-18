import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Step1 = ({ onNextStep }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const phrases = [
    "   Web Development Bootcamp",
    "   Data Science Foundations",
    "   Master basics of English ",
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const [courseTitle, setCourseTitle] = useState(""); // State to store course title

  const handleInputChange = (event) => {
    setCourseTitle(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onNextStep(courseTitle);
    }
  };

  return (
    <div className="max-w-screen max-h-screen bg-black h-screen flex flex-col text-center justify-center">
      <div data-aos="zoom-in-up">
        <div className="flex flex-col items-center text-blue-700 text-5xl font-bold p-8">
          Step 1
        </div>
        <div className="flex flex-col items-center text-white text-4xl font-semibold p-8">
          Give a title to your course
          <div className="mt-4 p-8">
            <input
              className="w-96 h-14 p-8 px-4 py-2 border rounded-full text-base justify-center items-center text-black border-gray-300 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
              type="text"
              placeholder={phrases[currentPhraseIndex]}
              onChange={handleInputChange} // Update state on input change
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
