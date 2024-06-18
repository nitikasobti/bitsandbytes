import React, { useState } from "react";

const UserPasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <div>
      <h2 className="text-2xl text-white font-bold mb-4">Security</h2>
      <form className="p-4">
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-xl font-medium text-white p-4"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-2 p-2 w-7/12 border rounded-md text-sm"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-xl font-medium text-white p-4"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mt-2 p-2 w-7/12 border rounded-md text-sm"
            placeholder="Re-enter your password"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 mt-2 border-2 border-blue-700 bg-blue-700 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-900"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserPasswordChange;
