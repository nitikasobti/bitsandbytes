import React, { useState, useEffect,useContext} from "react";
import BottomCont from "../components/BottomCont";
import TopNavbar from "../components/TopNavbar";
import UserBasics from "../components/userpage/UserBasics";
import UserCourses from "../components/userpage/UserCourses";
import UserPhoto from "../components/userpage/UserPhoto";
import UserPasswordChange from "../components/userpage/UserPasswordChange";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IdContext,AuthContext } from "..";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("basics");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const {userId, setUserId} = useContext(IdContext);
  const[isLoggedIn, setIsLoggedIn]=useContext(AuthContext)
  useEffect(() => {
    AOS.init({ duration: 1500 });
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      console.log(userId);
      const response = await axios.get(`http://localhost:4000/user/${userId}`,{withCredentials:true}); // Adjust the URL as per your backend endpoint
      console.log(response.data);
      setUserName(response.data.fullname); // Assuming the response contains the user's name
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "logOut") {
      handleLogOut();
    }
  };

  const handleLogOut = async () => {
    try {
      const response=await axios.get("http://localhost:4000/logout",{withCredentials:true}); // Adjust the URL as per your backend logout endpoint
      
      if(response.status===200){
        navigate("/"); // Navigate to the homepage
        setIsLoggedIn(false);
      }
      else{
        alert("Error logging out")
      }
    } catch (error) {
      console.error("Error logging out:", error);
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <TopNavbar />
      <div className="pt-16"></div>
      <div className="flex flex-row justify-center bg-black max-w-screen">
        <div data-aos="zoom-in-right" className="w-1/4 h-4/5 mb-32 bg-blue-800 text-white p-8 m-8 rounded-xl shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] shadow-blue-900">
          <div className="mb-4">
            <div className="w-24 h-24 flex flex-col items-center rounded-full overflow-hidden border-2 border-white">
              <img
                src="/images/person.jpg"
                alt="User Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            {userName}
          </h2>
          <ul>
            <li
              className={`cursor-pointer py-2 ${
                activeTab === "basics" &&
                "bg-blue-500 rounded-full p-4 max-w-60 translate-x-0 scale-110 shadow-md"
              }`}
              onClick={() => handleTabClick("basics")}
            >
              Basics
            </li>
            <li
              className={`cursor-pointer py-2 ${
                activeTab === "photo" &&
                "bg-blue-500 rounded-full p-4 max-w-60 translate-x-0 scale-110 shadow-md"
              }`}
              onClick={() => handleTabClick("photo")}
            >
              Photo
            </li>
            <li
              className={`cursor-pointer py-2 ${
                activeTab === "myCourses" &&
                "bg-blue-500 rounded-full p-4 max-w-60 translate-x-0 scale-110 shadow-md"
              }`}
              onClick={() => handleTabClick("myCourses")}
            >
              My Courses
            </li>
            <li
              className={`cursor-pointer py-2 ${
                activeTab === "security" &&
                "bg-blue-500 rounded-full p-4 max-w-60 translate-x-0 scale-110 shadow-md"
              }`}
              onClick={() => handleTabClick("security")}
            >
              Security
            </li>
            <li
              className={`cursor-pointer py-2 ${
                activeTab === "logOut" &&
                "bg-red-500 rounded-full p-4 max-w-60 translate-x-0 scale-110 shadow-md"
              }`}
              onClick={() => handleTabClick("logOut")}
            >
              Log Out
            </li>
            <li
              className={`cursor-pointer py-2 ${
                activeTab === "deleteAccount" &&
                "bg-red-500 rounded-full p-4 max-w-60 translate-x-0 scale-110 shadow-md"
              }`}
              onClick={() => handleTabClick("deleteAccount")}
            >
              Delete Account
            </li>
          </ul>
        </div>

        <div data-aos="zoom-in-left" className="w-3/4 p-8 ml-16 max-w-3xl">
          {activeTab === "basics" && <UserBasics />}
          {activeTab === "photo" && <UserPhoto />}
          {activeTab === "myCourses" && <UserCourses />}
          {activeTab === "security" && <UserPasswordChange />}
          {activeTab === "logOut" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Log Out
              </h2>
              <h2 className="text-xl text-white mb-4">
                Are you sure you want to logout?
              </h2>

              <button
                type="button"
                className="px-4 py-2 mt-2 border-2 border-red-500 bg-red-500 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-red-700 hover:border-red-700"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          )}
          {activeTab === "deleteAccount" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Delete Account
              </h2>
              <h2 className="text-xl text-white mb-4">
                Remember you won't be able to fetch your account back if deleted!
              </h2>

              <button
                type="button"
                className="px-4 py-2 mt-2 border-2 border-red-500 bg-red-500 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-red-700 hover:border-red-700"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomCont />
    </div>
  );
};

export default UserPage;
