import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TopicCloud from "./TopicCloud";

const Third = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <div className="max-w-screen bg-black  p-4">
      <div data-aos="zoom-in-up" className="text-white text-3xl text-center mt-4">
        Get yourself job ready{" "}
      </div>
      <div
        data-aos="fade-up"
        className="flex flex-wrap flex-row justify-center items-center content-around"
      >
        <div data-aos="zoom-in-right">
          <img
            src="/images/trending.gif"
            alt="trending gif"
            className="h-96 mt-8 mr-8 rounded-lg shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)] shadow-gray-300"
          />
        </div>
        <div data-aos="zoom-in-left">
          <TopicCloud className="tagcloud-wrap" />
          <style jsx>{`
            .tagcloud {
              color: #1565c0;
              font-family: "Poppins", sans-serif;
              font-size: 20px;
              font-weight: 650;
              margin: 1% auto;
            }

            .tagcloud--item:hover {
              color: #2196f3;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Third;
