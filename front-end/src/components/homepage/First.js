import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const First = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <div className="max-w-screen h-58 bg-blue-900 text-center">
      <div
        data-aos="zoom-in-up"
        className="text-white p-2 pt-4 text-3xl font-semibold"
      >
        Explore some trending topics!
      </div>
      <div
        data-aos="zoom-in-up"
        className="flex flex-wrap gap-8 p-8 justify-center "
      >
        <div
          className="w-40 h-40 rounded-lg hover:translate hover:scale-110 transform transition-all duration-200 shadow-[0_0px_8px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
          style={{
            backgroundImage: `url('images/first1.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="w-40 h-40 rounded-lg hover:translate hover:scale-110 transform transition-all duration-200 shadow-[0_0px_8px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
          style={{
            backgroundImage: `url('images/first2.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="w-40 h-40 rounded-lg hover:translate hover:scale-110 transform transition-all duration-200 shadow-[0_0px_8px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
          style={{
            backgroundImage: `url('images/first3.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="w-40 h-40 rounded-lg hover:translate hover:scale-110 transform transition-all duration-200 shadow-[0_0px_8px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
          style={{
            backgroundImage: `url('images/first4.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="w-40 h-40 rounded-lg hover:translate hover:scale-110 transform transition-all duration-200 shadow-[0_0px_8px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
          style={{
            backgroundImage: `url('images/first5.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="w-40 h-40 rounded-lg hover:translate hover:scale-110 transform transition-all duration-200 shadow-[0_0px_8px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
          style={{
            backgroundImage: `url('images/first6.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        
      </div>
      <div className="p-2"></div>
    </div>
  );
};

export default First;
