import React from "react";
import TopNavbar from "../components/TopNavbar";
import About from "../components/homepage/About";
import First from "../components/homepage/First";
import Second from "../components/homepage/Second";
import Third from "../components/homepage/Third";
import BottomCont from "../components/BottomCont";
import ChatWidget from "../components/homepage/ChatWidget";

const HomePage = () => {
  return (
    <div>
      <TopNavbar />
      <div className="pt-16"></div>
      <First />
      <About />
      <Second />
      <ChatWidget />
      <Third />
      <BottomCont />
    </div>
  );
};

export default HomePage;
