/* eslint-disable no-unused-vars */
import React from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { PiDotsThreeVertical } from "react-icons/pi";
import url from "../../constants/url";
import { useState, useEffect } from "react";
import axios from "axios";

const Analytics = () => {
  const cards = [
    { title: "Revenue", count: 0 },
    { title: "Visitors", count: 0 },
    { title: "Refunds", count: "coming soon" },
  ];

  const stats = [
    { count: 100, label: "Revenue" },
    { count: 250, label: "Visitors" },
    { count: 50, label: "Sold" },
  ];
  const [events, setEvents] = useState([]);
  const [oragnizerId, setOragnizerId] = useState(null);

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedUserOrganizerId = localStorage.getItem('organizerId');
      setOragnizerId(storedUserOrganizerId);
    };
    loadFromLocalStorage();
    const handleStorageChange = () => {
      loadFromLocalStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}/event/get-event-by-organizer-id/${oragnizerId}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [oragnizerId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const time = date.toTimeString().slice(0, 5); // Extract HH:mm
    return `${day} ${month} ${year} ${time}`;
  };
  return (
    <>
      <>
        <div className="flex h-screen bg-black">
          <SidebarComponent />
          <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-semibold text-white">Analytics</h1>
              {/* <div className="flex justify-between items-center gap-4">
                <a
                  className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  href="/create-event"
                >
                  + Add Event
                </a>
              </div> */}
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
            <div className="p-6 bg-black rounded-lg shadow-lg ">
              <div className="-mx-8">
                {events.length === 0 ? (
                  <div className="text-center text-gray-400 py-10">
                    <p className="text-lg">No events are available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {events.map((card) => (
                      <a
                        href={`/event-analytics/${card._id}`}
                        key={card._id}
                        className="p-4 bg-[#0a0a0a] shadow-md rounded-lg hover:border mb-5 cursor-pointer hover:border-gray-800 flex flex-col space-y-2"
                      >
                        <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden">
                          <img
                            src={card.flyer}
                            alt={card.event_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-lg font-semibold text-gray-200">
                            {card.event_name}
                          </h3>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-2 bg-[#0a0a0a]">
                          {stats.map((stat, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center w-full sm:w-auto bg-[#0a0a0a] border-gray-200 rounded-lg p-1 shadow"
                            >
                              <div className="text-lg font-bold text-gray-200">{stat.count}</div>
                              <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Analytics;
