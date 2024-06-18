import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowRight } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";

const MainComp = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  const navigate = useNavigate();

  const handleContinueTeaching = () => {
    navigate("/teach/create-course");
  };

  return (
    <div className="max-w-screen max-h-screen bg-black h-screen flex flex-col text-center justify-center">
      <div>
        <div className="flex flex-col items-center">
          <div
            data-aos="zoom-in-up"
            className="text-white text-4xl font-semibold p-2"
          >
            Enjoy the seamless experience of teaching on
          </div>
          <div
            data-aos="zoom-in-up"
            className="text-blue-700 text-5xl font-semibold p-4"
          >
            Bits and Bytes
          </div>
        </div>
        <div data-aos="zoom-in-up" className="w-max mx-auto">
          <button
            className="flex items-center justify-center text-white bg-blue-700 rounded-full px-4 py-2 mt-4 transition duration-300 transform hover:scale-105 text-xl shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] shadow-blue-700"
            onClick={handleContinueTeaching}
          >
            Continue Teaching
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-8 text-gray-500">
        <FaAngleDown className="text-gray-500 inline-block text-3xl ml-2 animate-bounce" />
      </div>
    </div>
  );
};

export default MainComp;
