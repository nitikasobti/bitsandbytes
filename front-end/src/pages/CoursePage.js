import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BottomCont from "../components/BottomCont";
import CPFirst from "../components/coursepage/CPFirst";
import Content from "../components/coursepage/Content";
import InstructorInfo from "../components/coursepage/InstructorInfo";
import Prerequisites from "../components/coursepage/Prerequisites";

const CoursePage = () => {
  const location = useLocation();
  const { courseData } = location.state || {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);


  console.log(courseData);
  return (
    <div>
      <TopNavbar />
      <div className="pt-16"></div>
      <CPFirst courseData={courseData} />
      <Content />
      <InstructorInfo courseData={courseData} />
      <Prerequisites courseData={courseData} />
      <BottomCont />
    </div>
  );
};

export default CoursePage;
