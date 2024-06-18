import "./App.css";
import CourseLearnPage from "./pages/CourseLearnPage";
import CoursePage from "./pages/CoursePage";
import CreateCourse from "./pages/CreateCourse";
import HomePage from "./pages/HomePage";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorPage from "./pages/InstructorPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext,IdContext } from ".";
import { useState } from "react";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/course", element: <CoursePage /> },
  { path: "/course/course-learn", element: <CourseLearnPage /> },
  { path: "/teach", element: <InstructorPage /> },
  { path: "/teach/create-course", element: <CreateCourse /> },
  { path: "/instructor-dashboard", element: <InstructorDashboard /> },
]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  return (
    <div>
      <AuthContext.Provider
        value={[isLoggedIn, setIsLoggedIn]}
      >
        <IdContext.Provider value={{userId, setUserId}}>
        <RouterProvider router={router} />
        </IdContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
