import React, { useState, useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import WishListPopup from "./WishListPopup";
import { AuthContext ,IdContext} from "..";
import axios from "axios"

const TopNavbar = () => {
  const phrases = [
    "  What's on your mind today? 🤔",
    "  What are you thinking of studying? 🤔",
    "   What's your area of interest? 🤔",
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  const { userId } = useContext(IdContext);
  const [isInstructor, setIsInstructor] = useState(false);
  useEffect(() => {
    const checkInstructorStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/instructor/${userId}`,
          { withCredentials: true }
        );
        if (response.data !== "Instructor not found.") {
          setIsInstructor(true);
        } else {
          setIsInstructor(false);
        }
      } catch (error) {
        console.error("Failed to check instructor status:", error);
      }
    };

    checkInstructorStatus();
  }, []); 

  const location = useLocation();
  useEffect(() => {
    // Check if the user is returning from the login page
    if (location.state && location.state.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [location.state]);
  const [isWishListOpen, setisWishListOpen] = useState(false);
  const [wishlistCourses, setWishlistCourses] = useState([]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      console.log("Search:", event.target.value);
    }
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const userProfile = () => {
    navigate("/user");
  };

  const instructorPage = async() => {
    try {
      const response = await axios.get(
        `http://localhost:4000/instructor/${userId}`,
        { withCredentials: true }
      );
      if (response.data !== "Instructor not found.") {
        navigate("/instructor-dashboard");
      } else{
         try {
           const res2 = await axios.post(
             "http://localhost:4000/instructor/becomeInstructor",
             {},
             { withCredentials: true }
           );
           if (res2.status === 200) {
             navigate("/instructor-dashboard");
           } else {
             alert("Error occurred");
           }
         } catch (error) {
           console.error(error);
           // Handle error here
         }
      }
      
    } catch (error) {
      
    }
  };

  const handleWishlistClick = () => {
    setisWishListOpen(true);
  };

  const handleClosePopup = () => {
    setisWishListOpen(false);
  };

  const handleWishlist = (course) => {
    // Add the course to the wishlist
    setWishlistCourses([...wishlistCourses, course]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [phrases.length]);

  return (
    <div>
      <div className="max-w-screen fixed top-0 left-0 right-0 z-50 bg-black flex flex-row justify-between">
        <div className="text-white text-xl font-semibold p-6">Bits & Bytes</div>
        <div className="flex flex-row p-4 gap-4">
          <input
            className="w-full sm:w-96 h-10 mt-1 px-2 border rounded-full justify-center items-center text-black border-gray-300 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-gray-300 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-gray-300"
            type="text"
            placeholder={phrases[currentPhraseIndex]}
            onKeyDown={handleSearch}
          />
          {isLoggedIn ? (
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <button
                onClick={instructorPage}
                className="px-4 py-2 border-2 border-blue-700 text-blue-700 rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-700 hover:text-white shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-blue-700 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-700"
              >
                {isInstructor ? "Instructor Dashboard" : "Be an instructor!"}
              </button>
              <button
                className="px-4 py-2 border-2 border-blue-700 text-blue-700 rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-700 hover:text-white shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-blue-700 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-700"
                onClick={handleWishlistClick}
              >
                Wishlist
              </button>
              <button
                className="px-4 py-2 border-2 border-blue-700 bg-blue-700 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-900 hover:border-blue-900 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-blue-700 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-900"
                onClick={userProfile}
              >
                Profile
              </button>
            </div>
          ) : (
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <button
                className="px-4 py-2 border-2 border-blue-700 bg-blue-700 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-900 hover:border-blue-900 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-blue-700 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-900"
                onClick={handleLogin}
              >
                Log in / Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      {isWishListOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}
      {isWishListOpen && (
        <WishListPopup courses={wishlistCourses} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default TopNavbar;
