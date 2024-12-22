/* eslint-disable no-unused-vars */
import React from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { PiDotsThreeVertical } from "react-icons/pi";
import url from "../../constants/url";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventAnalytics = () => {
    const { id } = useParams()
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
    const [event, setEvent] = useState([]);
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

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`${url}/event/get-event-by-id/${id}`);
            setEvent(response.data);
            const total = response.data.tickets.reduce((acc, ticket) => acc + ticket.qty, 0);
            setTotalQuantity(total);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id]);

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
                            <h1 className="text-3xl font-semibold text-white">{event.event_name}</h1>
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
                    </div>
                </div>
            </>
        </>
    );
};

export default EventAnalytics;
