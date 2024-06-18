import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, onWishlist }) => {
  const navigate = useNavigate();

  const handleEnrollNow = () => {
    // Navigate to the '/course' page with course data
    navigate('/course', { state: { courseData: course } });
  };

  const handleWishlist = () => {
    // Call the onWishlist callback with the course data
    onWishlist(course);
  };

  return (
    <div className="w-full sm:w-72 rounded-xl overflow-hidden m-4 ml-5 mr-2 inline-block h-auto sm:h-80 hover:translate hover:scale-110 transform transition-all duration-200 shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)] shadow-blue-900 hover:shadow-[0_0px_10px_5px_rgba(0,0,0,0.3)] hover:shadow-blue-900">
      <img src={course.image} alt={course.title} className="w-full h-36 border border-gray-300 rounded object-cover" />
      <div className="p-4 h-auto sm:h-48">
        <h3 className="text-lg mb-2 text-white overflow-hidden overflow-ellipsis whitespace-nowrap">{course.title}</h3>
        <p className="text-sm text-white mb-2">{course.description}</p>
        <p className="text-xs text-white mb-2">Instructor: {course.instructor}</p>
        <button onClick={handleEnrollNow} className="px-3 py-1 border border-blue-700 rounded-full mr-7 ml-2 cursor-pointer text-white bg-blue-700 transition-colors duration-200 shadow-[0_0px_3px_3px_rgba(0,0,0,0.3)] shadow-blue-900 hover:bg-blue-900">Enroll Now</button>
        <button onClick={handleWishlist} className="px-3 py-1 border text-blue-700 rounded-full ml-7 cursor-pointer bg-white transition-colors duration-200 hover:bg-blue-900 hover:text-white shadow-[0_0px_3px_3px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-blue-900 hover:shadow-[0_0px_5px_4px_rgba(0,0,0,0.3)] hover:border-blue-900">Wishlist</button>
      </div>
    </div>
  );
};

export default CourseCard;
