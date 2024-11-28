/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { PiDotsThreeVertical } from "react-icons/pi";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const OrgEvent = () => {
  const [activeTab, setActiveTab] = useState("All");

  const cards = [
    { title: "Total Events", count: "25" },
    { title: "Total Earnings", count: "$3000" },
    { title: "Total Payout", count: "$2500" },
  ];
  const tabs = ["All", "Live", "Past", "Draft", "Cancelled"];

  const cardsData = [
    {
      id: 1,
      title: "Event 1",
      price: "$50",
      image: "https://d.newsweek.com/en/full/1611005/party.jpg",
      startDate: "Bangalore, India",
      endDate: "2024-12-31",
      status: "Draft",
    },
    {
      id: 2,
      title: "Event 2",
      price: "$75",
      image: "https://wallpaperaccess.com/full/127147.jpg",
      startDate: "Bangalore, India",
      endDate: "2025-01-15",
      status: "Live",
    },
    {
      id: 3,
      title: "Event 3",
      price: "$100",
      image:
        "https://wallpaperbat.com/img/113857-crowd-party-streamers-and-confetti-hd-wallpaper-and-background.jpg",
      startDate: "Bangalore, India",
      endDate: "2025-02-01",
      status: "Past",
    },
    {
      id: 1,
      title: "Event 1",
      price: "$50",
      image: "https://d.newsweek.com/en/full/1611005/party.jpg",
      startDate: "Bangalore, India",
      endDate: "2024-12-31",
      status: "Draft",
    },
    {
      id: 2,
      title: "Event 2",
      price: "$75",
      image: "https://wallpaperaccess.com/full/127147.jpg",
      startDate: "Bangalore, India",
      endDate: "2025-01-15",
      status: "Live",
    },
    {
      id: 3,
      title: "Event 3",
      price: "$100",
      image:
        "https://wallpaperbat.com/img/113857-crowd-party-streamers-and-confetti-hd-wallpaper-and-background.jpg",
      startDate: "Bangalore, India",
      endDate: "2025-02-01",
      status: "Past",
    },
  ];

  return (
    <>
      <div className="flex h-screen">
        <SidebarComponent />
        <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-white">Events</h1>

            <a
              className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              href="/create-event"
            >
              + Add Event
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-200">
                    {card.count}
                  </div>

                  <div className="flex space-x-2">
                    <PiDotsThreeVertical
                      size={24}
                      className="text-white cursor-pointer hover:text-gray-200"
                    />
                  </div>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-gray-500">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
          <div className="mb-4 mt-10">
            <div className="flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 text-md font-medium rounded-md transition-colors ${
                    activeTab === tab
                      ? "bg-white text-black"
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 bg-black rounded-lg shadow-lg ">
            {activeTab === "All" && (
              <>
                <div className="-mx-8 flex justify-start items-start my-4">
                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      className="w-full px-4 py-2 pl-10 bg-black border border-[#191919] text-gray-200 rounded-md outline-none"
                      placeholder="Search events..."
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FaSearch className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="-mx-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cardsData.map((card) => (
                    <div
                      key={card.id}
                      className="max-w-sm p-4 bg-[#0a0a0a] shadow-md rounded-lg hover:border mb-5 cursor-pointer hover:border-gray-800 flex flex-col sm:flex-row items-start sm:items-start space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                      <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-200">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Price: {card.price}
                        </p>
                        <div className="text-sm text-gray-400 mt-2">
                          <p>{card.startDate}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button className="text-white hover:text-white px-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v.01M12 12v.01M12 18v.01"
                            />
                          </svg>
                        </button>
                        <p className="text-sm text-black mt-10 py-1 px-3 font-semibold bg-gray-400 rounded-full">
                          {card.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {activeTab === "Live" && (
              <p className="text-white">Live events will be listed here.</p>
            )}
            {activeTab === "Past" && (
              <p className="text-white">Past events will be listed here.</p>
            )}
            {activeTab === "Draft" && (
              <p className="text-white">Draft events will be listed here.</p>
            )}
            {activeTab === "Cancelled" && (
              <p className="text-white">Canceled events will be listed here.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgEvent;
