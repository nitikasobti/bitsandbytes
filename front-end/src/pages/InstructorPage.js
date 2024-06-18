import React, { useEffect } from "react";
import MainComp from "../components/instructorpage/MainComp";
import BottomCont from "../components/BottomCont";

const InstructorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <MainComp />
      <BottomCont />
    </div>
  );
};

export default InstructorPage;
