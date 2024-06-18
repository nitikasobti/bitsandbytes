import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { IdContext } from "../..";

const Step5 = ({ courseTitle, courseInfo, imagePreview, coursePrice, onNextStep, onPrevStep }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const navigate = useNavigate();

  const { userId, setUserId } = useContext(IdContext);
  const [coursePlaylist, setCoursePlaylist] = useState("");

  const handleInputChange = (event) => {
    setCoursePlaylist(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await sendCourseDataToBackend();
    }
  };
  console.log(userId);
  console.log(courseTitle);
  console.log(courseInfo);
  console.log(coursePrice);
  console.log(coursePlaylist);

  const sendCourseDataToBackend = async () => {
    try {
      // Make POST request to backend with course data
      const response = await axios.post("http://localhost:4000/course/create", {
        courseTitle: courseTitle,
        courseInfo: courseInfo,
        coursePrice: coursePrice,
        coursePlaylist: coursePlaylist,
      },{withCredentials:true});
      console.log("Data sent to backend:", response.data);
      navigate("/instructor-dashboard");
      // Handle success, e.g., show success message
    } catch (error) {
      console.error("Error sending data to backend:", error);
      // Handle error, e.g., show error message
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
          Step 5
        </div>
        <div className="flex flex-col items-center text-white text-3xl font-semibold p-8">
          Provide the link of the youtube playlist
          <div className="mt-4 p-8">
            <input
              className="w-96 h-14 p-8 px-4 py-2 border rounded-full text-base justify-center items-center text-black border-gray-300 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
              type="text"
              placeholder="Please provide youtube link here"
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
