import React, { useEffect, useRef } from "react";
import TagCloud from "TagCloud";

const TopicCloud = () => {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current) {
      const container = ".content";
      const texts = [
        "ReactJS",
        "React Native",
        "Machine Learning",
        "JavaScript",
        "MySQl",
        "C++/C",
        "Cloud Computing",
        "BlockChain",
        "Data Science",
        "Python",
        "Mobile Development",
        "iOS Development",
        "Business Analyst",
      ];
      const options = {
        radius: 250,
        maxSpeed: "medium",
        initSpeed: "medium",
        direction: 135,
        keep: true,
      };

      TagCloud(container, texts, options);
      console.log("TagCloud initialized");

      isInitializedRef.current = true;
    }
  }, []);

  return (
    <div className="main">
      <span className="content"></span>
    </div>
  );
};

export default TopicCloud;
