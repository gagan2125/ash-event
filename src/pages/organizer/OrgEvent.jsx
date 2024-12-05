/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { PiDotsThreeVertical } from "react-icons/pi";
import url from "../../constants/url"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

const OrgEvent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [events, setEvents] = useState([]);
  const [oragnizerId, setOragnizerId] = useState(null);

  const items = [
    {
      key: '1',
      label: 'Change Status',
      extra: '⌘P',
    },
    {
      key: '2',
      label: 'Settings',
      extra: '⌘S',
    },
  ];

  const cards = [
    { title: "Total Live Events", count: events.filter(event => event.explore === "YES").length },
    { title: "Total Draft Events", count: events.filter(event => event.explore === "NO").length },
    { title: "Total Past Events", count: 0 },
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
      <div className="flex h-screen bg-black">
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
                  className={`py-2 px-4 text-md font-medium rounded-md transition-colors ${activeTab === tab
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
                      placeholder="Search all events..."
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FaSearch className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="-mx-8">
                  {events.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">
                      <p className="text-lg">No events are available</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                      {events.map((card) => (
                        <a
                          href={`/event-info/${card._id}`}
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
                            <Dropdown
                              className="text-gray-400 cursor-pointe"
                              menu={{
                                items,
                              }}
                            >
                              <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                  <BiDotsVerticalRounded size={20} />
                                </Space>
                              </a>
                            </Dropdown>
                          </div>
                          <p className="text-sm text-gray-400">Price: {card.ticket_start_price}</p>
                          <div className="text-sm text-gray-400">
                            <p>{formatDate(card.start_date)}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <button className="text-gray-500 hover:text-white">
                              {card.explore === "NO" ? "Draft" : "Live"}
                            </button>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            {activeTab === "Live" && (
              <>
                <div className="-mx-8 flex justify-start items-start my-4">
                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      className="w-full px-4 py-2 pl-10 bg-black border border-[#191919] text-gray-200 rounded-md outline-none"
                      placeholder="Search live events..."
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FaSearch className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="-mx-8">
                  {events.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">
                      <p className="text-lg">No events are available</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                      {events
                        .filter(event => event.explore === "YES")
                        .map((card) => (
                          <a
                            href={`/event-info/${card._id}`}
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
                              <div className="text-gray-400 cursor-pointer">
                                <BiDotsVerticalRounded size={24} />
                              </div>
                            </div>
                            <p className="text-sm text-gray-400">Price: {card.ticket_start_price}</p>
                            <div className="text-sm text-gray-400">
                              <p>{formatDate(card.start_date)}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <button className="text-gray-500 hover:text-white">
                                {card.explore === "NO" ? "Draft" : "Live"}
                              </button>
                            </div>
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              </>
            )}
            {activeTab === "Past" && (
              <p className="text-white">Past events will be listed here.</p>
            )}
            {activeTab === "Draft" && (
              <>
                <div className="-mx-8 flex justify-start items-start my-4">
                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      className="w-full px-4 py-2 pl-10 bg-black border border-[#191919] text-gray-200 rounded-md outline-none"
                      placeholder="Search draft events..."
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FaSearch className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="-mx-8">
                  {events.filter(event => event.explore === "NO").length === 0 ? (
                    <div className="text-center text-gray-400 py-10">
                      <p className="text-lg">No draft events are available</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                      {events
                        .filter(event => event.explore === "NO")
                        .map((card) => (
                          <a
                            href={`/event-info/${card._id}`}
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
                              <div className="text-gray-400 cursor-pointer">
                                <BiDotsVerticalRounded size={24} />
                              </div>
                            </div>
                            <p className="text-sm text-gray-400">Price: {card.ticket_start_price}</p>
                            <div className="text-sm text-gray-400">
                              <p>{formatDate(card.start_date)}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <button className="text-gray-500 hover:text-white">
                                {card.explore === "NO" ? "Draft" : "Live"}
                              </button>
                            </div>
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              </>
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
