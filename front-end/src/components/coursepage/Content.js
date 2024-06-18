import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Content = () => {
  const [sections, setSections] = useState([
    { id: 1, title: "Section 1", isOpen: false },
    { id: 2, title: "Section 2", isOpen: false },
    { id: 3, title: "Section 3", isOpen: false },
    { id: 4, title: "Section 4", isOpen: false },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const toggleSection = (id) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  };

  const navigateToCourseLearn = () => {
    navigate("/course/course-learn");
  };

  return (
    <div className="bg-black max-w-screen">
      <div data-aos="zoom-in-up" className="text-white text-2xl font-semibold p-6 ml-12">
        Course Content
      </div>
      <div className="text-white ml-48">
        {sections.map((section, index) => (
          <div data-aos="zoom-in-up" key={section.id}>
            <div
              className="flex items-center justify-center cursor-pointer w-4/6 h-14 bg-gray-900 rounded-full shadow-[0_0px_8px_2px_rgba(0,0,0,0.3)] shadow-gray-900 hover:shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-900 mt-8"
              onClick={() => toggleSection(section.id)}
            >
              <div className="text-xl font-semibold">{section.title}</div>
              <div className="flex items-center justify-center ml-2 h-full">
                {section.isOpen ? (
                  <BsChevronUp className="text-white" />
                ) : (
                  <BsChevronDown className="text-white" />
                )}
              </div>
            </div>
            {section.isOpen && (
              <div className="pl-12 mt-4">
                <div onClick={navigateToCourseLearn} className="hover:cursor-pointer">Subsection 1</div>
                <div onClick={navigateToCourseLearn} className="hover:cursor-pointer">Subsection 2</div>
                <div onClick={navigateToCourseLearn} className="hover:cursor-pointer">Subsection 3</div>
                <div onClick={navigateToCourseLearn} className="hover:cursor-pointer">Subsection 4</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
