import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IdContext } from "..";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(IdContext);

  const [courses, setCourses] = useState([]);
  const [showInfoPopup, setShowInfoPopup] = useState(false); // State to manage popup visibility
  const [showQuizPopup, setShowQuizPopup] = useState(false); // State to manage popup visibility
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [addQuiz, setAddQuiz] = useState(false);
  const [numVideos, setNumVideos] = useState(0); // State to store number of videos for the selected course
  const [quizzes, setQuizzes] = useState({});
  const [enterQuiz, setEnterQuiz] = useState({
    courseId: "",
    questions: [
      {
        ques: "",
        ans: "",
        correct: false,
      },
    ],
  });

  useEffect(() => {
    // Fetch courses from the backend when component mounts
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/instructor/${userId}`,
        { withCredentials: true }
      );
      const courseIds = response.data.courses;
      // console.log(courseIds);

      const courseDetailsPromises = courseIds.map(async (id) => {
        const response = await axios.get(`http://localhost:4000/course/${id}`, {
          withCredentials: true,
        });
        return response.data;
      });

      const courseDetails = await Promise.all(courseDetailsPromises);
      console.log(courseDetails);
      setCourses(courseDetails);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const flatCourses = [].concat(...courses);

  const handleNav = () => {
    navigate("/teach");
  };

  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
    // Add your logic here to send the course for verification
  };

  const handleQuizbutton = () => {
    setShowQuizPopup(true);
  };

  const handleAddQuiz = (course) => {
    setSelectedCourse(course);
    setNumVideos(course.noOfVideos); // Set the number of videos for the selected course
    setShowInfoPopup(true);
    // setShowQuizPopup(true);
    console.log(`ID: ${course._id.toString()}`);
    if (course) {
      setEnterQuiz((prevState) => ({
        ...prevState,
        courseId: course._id,
      }));
    }
  };
  const navigateHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "question") {
      setEnterQuiz((prevState) => ({
        ...prevState,
        questions: [
          {
            ...prevState.questions[0],
            ques: value,
          },
        ],
      }));
    } else if (name === "correctOption") {
      setEnterQuiz((prevState) => ({
        ...prevState,
        questions: [
          {
            ...prevState.questions[0],
            ans: value,
          },
        ],
      }));
    } else {
      // Handle other input fields if needed
    }
  };

  const handleMakeQuiz = async () => {
    console.log(enterQuiz);
    console.log(`Course Id: ${enterQuiz.courseId}`);

    try {
      const response = await axios.post(
        "http://localhost:4000/quiz/create",
        {
          courseId: enterQuiz.courseId,
          questions: [
            {
              ques: enterQuiz.questions[0].ques,
              ans: enterQuiz.questions[0].ans,
              correct: enterQuiz.questions[0].correct,
            },
          ],
        },
        { withCredentials: true }
      );
      console.log("Quiz Added Successfully", response.data);
      setShowQuizPopup(false);
    } catch (error) {
      console.error("Quiz Not Added: ", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-900 text-white p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold" onClick={navigateHome}>
            Bits and Bytes
          </h1>
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <nav>
          <ul>
            <li className="py-2">
              <a
                href="#"
                className="flex items-center text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Dashboard
              </a>
            </li>
            <li className="py-2">
              <a
                href="#"
                className="flex items-center text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Courses
              </a>
            </li>
            <li className="py-2">
              <a
                href="#"
                className="flex items-center text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Settings
              </a>
            </li>
            <li className="py-2">
              <a
                href="#"
                className="flex items-center text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="bg-white rounded-md p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-700">
            Here you can manage your courses, view analytics, and more.
          </p>
        </div>
        <div className="mt-8">
          <button
            className="px-4 py-2 border-2 border-blue-700 bg-blue-700 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-900 hover:border-blue-900 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-blue-700 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-900"
            onClick={handleNav}
          >
            Add new course!
          </button>
        </div>
        {/* Display courses */}
        <div className="mt-8">
          {flatCourses.length > 0 ? (
            flatCourses.map((course, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-md p-6 shadow-md mt-4"
                >
                  <h2 className="text-xl font-semibold">
                    {course.courseTitle || "No title"}
                  </h2>
                  <p className="text-gray-700">
                    Price: {course.coursePrice || "No price"}
                  </p>
                  <p className="text-gray-700">
                    Info: {course.courseInfo || "No videos"}
                  </p>
                  <button
                    onClick={() => handleAddQuiz(course)} // Pass the course to the handler
                    className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-900"
                  >
                    More Info
                  </button>
                  {!isVerified && (
                    <button
                      className="bg-blue-700 ml-12 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-900"
                      onClick={handleVerify}
                    >
                      Verify
                    </button>
                  )}
                  {isVerified && (
                    <div className="popup-card mt-4 bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-900">
                      <p>Your course has been sent for verification.</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="mt-4 text-gray-700">No courses available.</p>
          )}
        </div>
        {/* Popup Container */}
        {showInfoPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Add Quiz to {selectedCourse?.courseTitle}
              </h2>
              {/* Add sub-card like containers for each YouTube video */}
              {Array.from({ length: numVideos }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-md p-4 mt-4 flex items-center justify-between"
                >
                  <img
                    src={selectedCourse?.videoDetails[index].thumbnailUrl}
                    alt="Video thumbnail"
                    className=" rounded-xl h-[70px] w-auto object-cover"
                  />
                  <h3 className="text-lg font-semibold mb-0 mr-16 ml-2">
                    {selectedCourse?.videoDetails[index].title.substring(0, 25)}
                  </h3>
                  {/* Add Quiz button for each video */}
                  <button
                    onClick={handleQuizbutton}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-900"
                  >
                    {addQuiz ? "Quiz Added" : "Add Quiz"}
                  </button>
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowInfoPopup(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Popup Container for adding quiz */}
        {showQuizPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Add Quiz to {selectedCourse?.courseTitle}
              </h2>
              {/* Add quiz form fields */}
              <div className="mt-4">
                <label htmlFor="question" className="block font-semibold mb-2">
                  Question:
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={enterQuiz.questions.ques}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                  placeholder="Enter your question"
                />
              </div>
              <div className="mt-4">
                <p className="block font-semibold mb-2">Options:</p>
                <div>
                  <input
                    type="text"
                    id="option1"
                    name="option1"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Option 1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="option2"
                    name="option2"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Option 2"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="option3"
                    name="option3"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Option 3"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="option4"
                    name="option4"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Option 4"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="correctOption"
                    name="correctOption"
                    value={enterQuiz.questions.ans}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Correct Option"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowQuizPopup(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-red-600"
                >
                  Cancel
                </button>
                {/* Add Quiz button */}
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded-md ml-4 cursor-pointer transition-colors duration-300 hover:bg-blue-900"
                  // Add onClick handler to save the quiz
                  onClick={handleMakeQuiz}
                >
                  Add Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;

/*
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IdContext } from "..";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(IdContext);

  const [courses, setCourses] = useState([]);
  const [showQuizPopup, setShowQuizPopup] = useState(false); // State to manage popup visibility
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enterQuiz, setEnterQuiz] = useState({
    courseId: "",
    questions: [
      {
        ques: "",
        ans: "",
        correct: false
      },
    ]
  });

  useEffect(() => {
    // Fetch courses from the backend when component mounts
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/instructor/${userId}`,
        { withCredentials: true }
      );
      const courseIds = response.data.courses;
      // console.log(courseIds);

      const courseDetailsPromises = courseIds.map(async (id) => {
        const response = await axios.get(`http://localhost:4000/course/${id}`, {
          withCredentials: true,
        });
        return response.data;
      });

      const courseDetails = await Promise.all(courseDetailsPromises);
      console.log(courseDetails);
      setCourses(courseDetails);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const flatCourses = [].concat(...courses);

  const handleNav = () => {
    navigate("/teach");
  };

  const handleAddQuiz = (course) => {
    setSelectedCourse(course);
    setShowQuizPopup(true);
    console.log(`ID: ${(course._id).toString()}`);
    if (course) {
      setEnterQuiz((prevState) => ({
        ...prevState,
        courseId: course._id
      }));
    }
  };

  const navigateHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "question") {
      setEnterQuiz((prevState) => ({
        ...prevState,
        questions: [
          {
            ...prevState.questions[0],
            ques: value,
          },
        ],
      }));
    } else if (name === "correctOption") {
      setEnterQuiz((prevState) => ({
        ...prevState,
        questions: [
          {
            ...prevState.questions[0],
            ans: value,
          },
        ],
      }));
    } else {
      // Handle other input fields if needed
    }
  };

  const handleMakeQuiz = async () => {
    console.log(enterQuiz);
    console.log(`Checker: ${enterQuiz.questions[0].ques}`);

    try {
      const response = await axios.post("http://localhost:4000/api/quizzes", {
        courseId: enterQuiz.courseId,
        questions: [
          {
            ques: enterQuiz.questions[0].ques,
            ans: enterQuiz.questions[0].ans,
            correct: enterQuiz.questions[0].correct,
          }
        ]
      },{withCredentials:true});
      console.log("Quiz Added Successfully", response.data);
    } catch (error) {
      console.error("Quiz Not Added: ", error);
    }
  };

  return (
    <div className="flex h-screen">
      // {Sidebar}
      <div className="w-1/4 bg-blue-900 text-white p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold" onClick={navigateHome}>Bits and Bytes</h1>
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <nav>
          <ul>
            <li className="py-2">
              <a
                href="#"
                className="flex items-center text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Dashboard
              </a>
            </li>
            <li className="py-2">
              <a
                href="#"
                className="flex items-center text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Courses
              </a>
            </li>
            <li className="py-2">
              <a
                href="#"
                className="flex items-center text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Settings
              </a>
            </li>
            <li className="py-2">
              <a
                href="#"
                className="flex items-center text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      // {Content Area}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="bg-white rounded-md p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-700">
            Here you can manage your courses, view analytics, and more.
          </p>
        </div>
        <div className="mt-8">
          <button
            className="px-4 py-2 border-2 border-blue-700 bg-blue-700 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-900 hover:border-blue-900 shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] shadow-blue-700 hover:shadow-[0_0px_6px_3px_rgba(0,0,0,0.3)] hover:shadow-blue-900"
            onClick={handleNav}
          >
            Add new course!
          </button>
        </div>
        // {Display courses}
        <div className="mt-8">
          {flatCourses.length > 0 ? (
            flatCourses.map((course, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-md p-6 shadow-md mt-4"
                >
                  <h2 className="text-xl font-semibold">
                    {course.courseTitle || "No title"}
                  </h2>
                  <p className="text-gray-700">
                    Price: {course.coursePrice || "No price"}
                  </p>
                  <p className="text-gray-700">
                    Info: {course.courseInfo || "No videos"}
                  </p>
                  <button
                    onClick={() => handleAddQuiz(course)} // Pass the course to the handler
                    className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-900"
                  >
                    Add Quiz
                  </button>
                </div>
              );
            })
          ) : (
            <p className="mt-4 text-gray-700">No courses available.</p>
          )}
        </div>
        // {Popup Container}
        {showQuizPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Add Quiz to {selectedCourse?.courseTitle}
              </h2>
              // {Add quiz form fields}
              <div className="mt-4">
                <label htmlFor="question" className="block font-semibold mb-2">
                  Question:
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={enterQuiz.questions.ques}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                  placeholder="Enter your question"
                />
              </div>
              <div className="mt-4">
                <p className="block font-semibold mb-2">Options:</p>
                <div>
                  <input
                    type="text"
                    id="option1"
                    name="option1"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Option 1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="option2"
                    name="option2"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Option 2"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="option3"
                    name="option3"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Option 3"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="option4"
                    name="option4"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Option 4"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="correctOption"
                    name="correctOption"
                    value={enterQuiz.questions.ans}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                    placeholder="Correct Option"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowQuizPopup(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-red-600"
                >
                  Cancel
                </button>
                // {Add Quiz button}
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded-md ml-4 cursor-pointer transition-colors duration-300 hover:bg-blue-900"
                  // Add onClick handler to save the quiz
                  onClick={handleMakeQuiz}
                >
                  Add Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;

*/
