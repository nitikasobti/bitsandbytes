import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <div className="flex flex-wrap justify-center gap-24 max-w-screen p-4 bg-black text-white">
      <div data-aos="zoom-in-right" className="mt-4">
        <div className="flex flex-row">
          <div className="text-3xl font-semibold">Why considering</div>
          <div className="text-3xl font-semibold ml-2 text-blue-700">
            Bits & Bytes?{" "}
          </div>
        </div>
        <div className="text-lg p-4 max-w-96 ml-6 mt-4 text-justify">
          Bits and Bytes offers a cutting-edge learning experience, blending
          innovative technology with personalized instruction. With its
          intuitive interface and adaptive learning features, students can
          engage with course materials in a dynamic and interactive manner.
          Educators benefit from comprehensive tools for creating and managing
          content, fostering collaboration, and tracking student progress.
          Embracing the future of education, Bits and Bytes empowers both
          learners and educators to thrive in a digital age.
        </div>
      </div>
      <div data-aos="zoom-in-left" className="p-8">
        <img
          className="h-72 rounded-lg mt-12 shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] shadow-gray-300"
          src="images/gif1.gif"
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default About;
