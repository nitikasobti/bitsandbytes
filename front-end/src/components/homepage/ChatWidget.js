import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handlePromptClick = (responseText, destination) => {
    if (destination) {
      // Navigate to the specified destination URL
      window.location.href = destination;
    }
      // Display the prompt text within the chat window
      setResponseMessage(responseText);

  };

  const toggleChatWindow = () => {
    // Toggle the chat window open/close
    setIsChatOpen((prevState) => !prevState);

    // Clear the response message when closing the chat window
    if (!isChatOpen) {
      setResponseMessage('');
    }
  };


  return (
    <div className="fixed bottom-4 right-4 z-50"> {}
      {/* Chat Icon */}
      <div
        className="bg-blue-500 text-white rounded-full p-4 cursor-pointer flex items-center justify-center"
        style={{ width: '60px', height: '60px' }}
        onClick={toggleChatWindow}
      >
        <FaRobot size={30} />{}
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="bg-white border rounded-lg p-4 mt-4 shadow-md z-50 w-80"> {/* Ensure the chat window is also on top */}
         <p className="text-lg font-bold mb-2 text-center">Welcome to Bits and Bytes!</p>
          <p className="text-lg font-semibold mb-4">How may I help you today?</p>
          <p
            className="text-gray-700 cursor-pointer mb-2 hover:text-blue-500"
            onClick={() => handlePromptClick(': Go to your desired course, scroll down to "Instructor Info" and voila!', null)}
          >
            How can I check teacher details of a particular course?
          </p>
          <p
            className="text-gray-700 cursor-pointer mb-2 hover:text-blue-500"
            onClick={() => handlePromptClick('How can I check teacher details of a particular course?',"/teach")}
          >
            How can I access the teacher portal?
          </p>
          <p
            className="text-gray-700 cursor-pointer mb-2 hover:text-blue-500"
            onClick={() => handlePromptClick(': Please reach out to us at bitsandbytessupport@mail.com', null)}
          >
            Payment related queries?
          </p>
          <p
            className="text-gray-700 cursor-pointer mb-2 hover:text-blue-500"
            onClick={() => handlePromptClick(': Please reach out to us at bitsandbytessupport@mail.com',null)}
          >
           Others
          </p>
          {responseMessage && (
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center">
                <FaRobot size={20} className="mr-2 text-blue-500" />
                <p className="text-blue-700">{responseMessage}</p>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ChatWidget;