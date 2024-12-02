/* eslint-disable no-unused-vars */
import React from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { FaReact } from "react-icons/fa";

const Analytics = () => {
  return (
    <>
      <>
        <div className="flex h-screen bg-black">
          <SidebarComponent />
          <div className="flex flex-1 flex-col items-center justify-center">
            <FaReact className="text-blue-500 text-8xl animate-spin" />
            <p className="text-gray-300 text-5xl mt-4 font-bold">Coming Soon</p>
          </div>
        </div>
      </>
    </>
  );
};

export default Analytics;
