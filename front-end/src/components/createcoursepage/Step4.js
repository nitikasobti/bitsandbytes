import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Step4 = ({ onNextStep, onPrevStep }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handlenav = () => {
    if (imagePreview) {
      onNextStep(imagePreview);
    } else {
      alert("Please upload an image first.");
    }
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onNextStep(imagePreview);
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
          Step 4
        </div>
        <div className="flex flex-col items-center text-white text-3xl font-semibold p-8">
          Upload an image/banner of the course
          <div className="mt-4 p-8">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="imageInput"
            />
            <label htmlFor="imageInput" className="cursor-pointer">
              <div className="w-96 h-60 border border-gray-300 rounded-md overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    <span>Upload Preview</span>
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="mt-4">
            <button
              className="w-48 h-14 px-4 py-2 border rounded-full text-base text-white bg-blue-700 border-blue-900 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-blue-900 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-900"
              onClick={handlenav}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
