import React, { useState } from "react";

const UserBasics = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Basics</h2>
      <form className="p-4">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-xl font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="mt-2 p-2 w-7/12 border rounded-md text-sm"
            placeholder="Akarshit Chauhan"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-xl font-medium text-white"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            value={bio}
            onChange={handleBioChange}
            className="mt-2 p-2 w-7/12 border rounded-md text-sm"
            placeholder="Student at JIIT"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-xl font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-2 p-2 w-7/12 border rounded-md text-sm"
            placeholder="xyz@gmail.com"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-xl font-medium text-white"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={handleAgeChange}
            className="mt-2 p-2 w-7/12 border rounded-md text-sm"
            placeholder="20"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-xl font-medium text-white"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
            className="mt-2 p-2 w-7/12 border rounded-md text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 mt-2 border-2  border-blue-700 bg-blue-700 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-900"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserBasics;
