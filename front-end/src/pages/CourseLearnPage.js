import React, { useState, useRef, useEffect } from "react";

const CourseLearnPage = () => {
  const sections = [
    {
      id: 1,
      title: "Section 1",
      subsections: ["Subsection 1.1", "Subsection 1.2", "Subsection 1.3"],
    },
    {
      id: 2,
      title: "Section 2",
      subsections: ["Subsection 2.1", "Subsection 2.2"],
    },
    {
      id: 3,
      title: "Section 3",
      subsections: ["Subsection 3.1", "Subsection 3.2"],
    },
    {
      id: 4,
      title: "Section 4",
      subsections: ["Subsection 4.1", "Subsection 4.2"],
    },
    {
      id: 5,
      title: "Section 5",
      subsections: ["Subsection 5.1", "Subsection 5.2"],
    },
  ];

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
  const [quizPromptShown, setQuizPromptShown] = useState(false); 

  const videoRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    // Clear the timeout when component unmounts or when the selectedSubsection changes
    return () => {
      clearTimeout(pauseTimeoutRef.current);
    };
  }, [selectedSubsection]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setSelectedSubsection(null); // Reset selected subsection when a section is clicked
  };

  const handleSubsectionClick = (subsection) => {
    setSelectedSubsection(subsection);
    setVideoPaused(false); // Reset video pause status when a subsection is clicked
  };

  const handlePauseAndShowCard = () => {
    setVideoPaused(true);
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setVideoPaused(false);
      // Show the quiz prompt again after 20 seconds
      videoRef.current.play(); // Start the video where it was paused
    }, 20000); // 20 seconds in milliseconds
  };

  const handleContinue = (option) => {
    if (option === "Dancing") {
      setVideoPaused(false); // Close the quiz prompt only if "Dancing" option is selected
      setSelectedOption(null); // Reset selected option
      // Start the video where it was paused
      videoRef.current.play();
    } else {
      // Show error for wrong option
      alert("Wrong option chosen.");
    }
  };

  const handleVideoTimeUpdate = () => {
    const currentTime = Math.floor(videoRef.current.currentTime);
    if (currentTime === 20 && !videoPaused && !quizPromptShown) {
      videoRef.current.pause();
      handlePauseAndShowCard();
      setQuizPromptShown(true); // Set the flag to indicate that quiz prompt has been shown
    }
  };

  const handleSeeking = (e) => {
    // Prevent default seeking behavior
    e.preventDefault();
  };

  const handleSeeked = () => {
    // Reset the video's current time to prevent manual seeking
    alert("Manual seeking disabled.");
  };
function handleVisibilityChange() {
  alert("Tab was Switched");
  console.log("Don't switch tab");
  // Remove the event listener
  document.removeEventListener("visibilitychange", handleVisibilityChange);
}

document.addEventListener("visibilitychange", handleVisibilityChange);
  return (
    <div className="flex h-screen">
      {/* Side Navbar for Sections and Subsections */}
      <div className="w-1/4 bg-blue-900 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        {sections.map((section, index) => (
          <div key={section.id}>
            <div
              className={`cursor-pointer mb-2 ${
                selectedSection === section.id ? "font-semibold" : ""
              }`}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.title}
            </div>
            {selectedSection === section.id && (
              <ul className="ml-4">
                {section.subsections.map((subsection, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer ${
                      selectedSubsection === subsection ? "font-semibold" : ""
                    }`}
                    onClick={() => handleSubsectionClick(subsection)}
                  >
                    {subsection}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Video Component */}
      <div className="flex-1 bg-black text-white p-4">
        <h2 className="text-xl font-semibold mb-4">{selectedSubsection}</h2>
        {selectedSubsection && (
          <div>
            <video
              ref={videoRef}
              controls
              controlsList="nodownload"
              className="max-w-screen max-h-3/4 mx-auto"
              onTimeUpdate={handleVideoTimeUpdate}
              onSeeking={handleSeeking} // Disable seeking
              onSeeked={handleSeeked}
            >
              <source src="/images/temp.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {videoPaused && (
              <div className="p-4 absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="bg-gray-400 p-4 rounded-lg">
                  <p className="text-2xl">Quiz Time!</p>
                  <p className="mt-2 text-lg">
                    What did you see the person doing?
                  </p>
                  <button
                    onClick={() => handleContinue("Dancing")}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Dancing
                  </button>
                  <button
                    onClick={() => handleContinue("Playing")}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Playing
                  </button>
                  <button
                    onClick={() => handleContinue("Fighting")}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Fighting
                  </button>
                  <button
                    onClick={() => handleContinue("Sleeping")}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Sleeping
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLearnPage;
