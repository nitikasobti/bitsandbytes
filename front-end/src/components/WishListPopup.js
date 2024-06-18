import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WishListPopup = ({ courses, onClose }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div data-aos="zoom-in" className="fixed inset-0 bg-black backdrop-filter backdrop-blur-lg bg-opacity-50 z-40">
      <div className="fixed top-1/2 left-1/2 w-96 h-96 transform -translate-x-1/2 -translate-y-1/2 bg-black p-5 rounded-2xl shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] shadow-gray-300  z-50">
        <h2 className="text-center text-white text-3xl font-semibold">Wishlisted Courses</h2>
        {courses.length === 0 ? (
          <p className="text-white h-64 text-center">No courses in the wishlist</p>
        ) : (
          <ul className="overflow-auto max-h-64 text-white">
            {courses.map((course, index) => (
              <li key={index}>{course}</li> 
            ))}
          </ul>
        )}
        <button className="mt-2 px-4 py-2 ml-32 bg-red-500 rounded-xl hover:bg-red-700 shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] shadow-red-500 cursor-pointer text-white" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WishListPopup;
