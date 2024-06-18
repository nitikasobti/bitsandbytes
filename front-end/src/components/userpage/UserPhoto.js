import React, { useState } from "react";

const UserPhoto = () => {
  const [currentImage, setCurrentImage] = useState("/images/person.jpg");
  const [newImage, setNewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    if (newImage) {
      setCurrentImage(newImage);
    }
    setNewImage(null);
  };
  return (
    <div className="max-w-screen">
      <h2 className="text-2xl font-serif font-bold mb-4">Photo</h2>
      <div className="mb-4">
        <h3 className="text-xl font-serif font-medium text-gray-600 mb-2">
          Current Image
        </h3>
        <img
          src={currentImage}
          alt="Current User Photo"
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-serif font-medium text-gray-600 mb-2">
          Upload New Image
        </h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 p-2 w-7/12 border rounded-md text-sm"
        />
        {newImage && (
          <img
            src={newImage}
            alt="New User Photo Preview"
            className="mt-2 w-24 h-24 object-cover rounded-full border-2 border-gray-300"
          />
        )}
      </div>
      <button
        onClick={handleSaveChanges}
        className="px-4 py-2 mt-2 border-2 font-serif border-blue-700 bg-blue-700 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-900"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserPhoto;
