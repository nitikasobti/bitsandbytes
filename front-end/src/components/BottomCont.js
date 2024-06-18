import React from "react";

const BottomCont = () => {
  return (
    <div className="bg-gray-900 max-w-screen h-72">
      <div className="bg-gray-900 h-2 max-w-screen shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] shadow-gray-900"></div>
      <div className="p-8">
        <div className="flex flew-row p-8">
          <div className="text-2xl text-white font-semibold">
            Top companies choose
          </div>
          <div className="text-2xl text-blue-700 mr-2 ml-2 font-semibold">
            Bits & Bytes
          </div>
          <div className="text-2xl text-white font-semibold">
            to grow their companies
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-white text-xl font-semibold ml-16">
            <div className="flex flex-row gap-24 p-4">
              <div className="hover:text-blue-700 w-40">Terms</div>
              <div className="hover:text-blue-700 w-40">About Us</div>
              <div className="hover:text-blue-700 w-40">Privacy Policy</div>
            </div>
            <div className="flex flex-row gap-24 p-4 justify-start">
              <div className="hover:text-blue-700 w-40">Contact</div>
              <div className="hover:text-blue-700 w-40">Be an instructor</div>
              <div className="hover:text-blue-700 w-40">
                Help & Support<div></div>
              </div>
            </div>
          </div>
          <div className="text-5xl text-blue-700 font-semibold mr-8 mt-4">@Bits & Bytes</div>
        </div>
      </div>
    </div>
  );
};

export default BottomCont;
