import React, { useState, useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { IdContext } from "..";
import TopNavbar from "../components/TopNavbar";


const clientId = "650192598457-51acedo7s8bfmqdug8p3uohuiu4m5q6d.apps.googleusercontent.com";

const LoginPage = () => {
  const { userId, setUserId } = useContext(IdContext);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoginClicked, setIsLoginClicked] = useState(true);
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    contact: "",
    confirmPassword: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const handleFormToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLoginButtonClick = () => {
    setIsLoginClicked(true);
    setIsSignupClicked(false);
  };

  const handleSignupButtonClick = () => {
    setIsLoginClicked(false);
    setIsSignupClicked(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: formData.email,
        password: formData.password,
      },{
        withCredentials:true
      });
      console.log("Login Success:", response.data);
      await setUserId(response.data._id);
      console.log(response.data._id);
      navigate("/", { state: { isLoggedIn: true } });
      // Redirect or perform other actions upon successful login
    } catch (error) {
      console.error("Login Error:", error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:4000/register", {
        fullname: formData.fullname,
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },{withCredentials:true});
      console.log("Signup Success:", response.data);
      await setUserId(response.data._id);
      navigate("/", { state: { isLoggedIn: true } });
      // Redirect or perform other actions upon successful signup
    } catch (error) {
      console.error("Signup Error:", error);
      setSignupError("An error occurred during signup. Please try again.");
    }
  };

  const [user, setUser] = useState({});
  // TopNavbar.TopNavbar.useLoggedIn(true);
  

  function handleCallbackResponse(response) {
    console.log("Encoded JWT Id Token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    // document.getElementById("signInDiv").hidden = true;
    navigate("/", { state: { isLoggedIn: true } });
  }

  function handleSignOut(event) {
    setUser({});
    // document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      theme: "filled_blue",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline", 
        size: "large",
      }
    );
    google.accounts.id.prompt();
  }, [isLoginForm]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-blue-800 text-white flex flex-col justify-center items-center">
        <h1 data-aos="fade-right" className="text-4xl mb-8">
          Bits & Bytes
        </h1>
        <img
          data-aos="fade-right"
          src="/images/login.gif"
          alt="Logo"
          className="w-96 rounded-full"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-0">
        <div className="flex flex-col justify-center items-center w-full sm:w-3/4 lg:w-1/2">
          <div data-aos="fade-left" className="flex justify-between mb-8">
            <span
              className={`text-3xl cursor-pointer ${
                isLoginClicked ? "text-blue-800" : "text-gray-500"
              }`}
              onClick={() => {
                handleLoginButtonClick();
                handleFormToggle();
              }}
            >
              Log In
            </span>
            <div className="border-l-2 border-gray-300 h-12 mx-10"></div>
            <span
              className={`text-3xl cursor-pointer ${
                isSignupClicked ? "text-blue-800" : "text-gray-500"
              }`}
              onClick={() => {
                handleSignupButtonClick();
                handleFormToggle();
              }}
            >
              Sign Up
            </span>
          </div>
          <div
            data-aos="fade-left"
            className="border-b-2 border-blue-600 w-3/4 mb-8"
          ></div>
          {isLoginForm ? (
            <div data-aos="fade-left">
              <div className="text-xl mb-4">Email/Phone No. :</div>
              <div className="mb-4">
                <input
                  className="border border-gray-300 rounded-full py-2 px-4 w-72 hover:border-gray-500"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email/phone no."
                />
              </div>
              <div className="text-xl mb-4">Password :</div>
              <div className="mb-4">
                <input
                  className="border border-gray-300 rounded-full py-2 px-4 w-72 hover:border-gray-500"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
              {loginError && (
                <div className="text-red-500 mb-4">{loginError}</div>
              )}
              <div className="flex justify-center">
                <button
                  onClick={handleLogin}
                  className="border-2 border-blue-700 text-blue-700 rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-700 hover:text-white py-2 px-8 mb-4"
                >
                  Log In
                </button>
              </div>
                <div className="flex justify-center">
                <div id="signInDiv"></div>
                  {
                    user &&
                    <div>
                    <h3>{user.name}</h3>
                    </div>
                  }
                </div>
                <div className="flex justify-center">
                {
                  Object.keys(user).length !== 0 &&
                   <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                }
                </div>
              </div>
          ) : (
            <div data-aos="fade-left">
              <div className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-transparent">
                <div className="text-xl mb-4">Full Name :</div>
                <div className="mb-4">
                  <input
                    className="border border-gray-300 rounded-full py-2 px-4 w-72 hover:border-gray-500"
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="text-xl mb-4">Email :</div>
                <div className="mb-4">
                  <input
                    className="border border-gray-300 rounded-full py-2 px-4 w-72 hover:border-gray-500"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="text-xl mb-4">Phone No. :</div>
                <div className="mb-4">
                  <input
                    className="border border-gray-300 rounded-full py-2 px-4 w-72 hover:border-gray-500"
                    type="number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter your phone no."
                  />
                </div>
                <div className="text-xl mb-4">Password :</div>
                <div className="mb-4">
                  <input
                    className="border border-gray-300 rounded-full py-2 px-4 w-72 hover:border-gray-500"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="text-xl mb-4">Re-type password :</div>
                <div className="mb-4">
                  <input
                    className="border border-gray-300 rounded-full py-2 px-4 w-72 hover:border-gray-500"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-type your password"
                  />
                </div>
              </div>
              {signupError && (
                <div className="text-red-500 mb-4">{signupError}</div>
              )}
              <div className="flex justify-center">
                <button
                  onClick={handleSignup}
                  className="border-2 border-blue-700 text-blue-700 rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-700 hover:text-white py-2 px-8 mb-4"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex justify-center">
              <div id="signInDiv"></div>
                  {
                    user &&
                    <div>
                    <h3>{user.name}</h3>
                    </div>
                  }
                </div>
                <div className="flex justify-center">
                {
                  Object.keys(user).length !== 0 &&
                   <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                }
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;