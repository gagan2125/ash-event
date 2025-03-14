import React, { useEffect } from 'react';
import SidebarComponent from '../../components/layouts/SidebarComponent';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import url from '../../constants/url';
import axios from 'axios';

const Complimentary = () => {
    const { id } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [ticket, setTicket] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState('');
    const [quantity, setQuantity] = useState(1);

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState("");
    const [selectedTickets, setSelectedTickets] = useState([]);

    const handleSendTickets = async () => {
        try {
            setLoading(true);

            const payload = {
                event_id: id,
                email,
                ticket_id: selectedTicket,
                qty: quantity,
                date: currentDateTime,
                tickets: selectedTickets,
                firstName: firstName,
                lastName: lastName
            };

            const response = await axios.post(`${url}/complimentary/add-complimentary`, payload);

            if (response.status === 200) {
                alert('Ticket sent successfully!');
                window.location.reload();
            } else {
                alert('Failed to send tickets. Please try again.');
            }
        } catch (error) {
            console.error('Error sending tickets:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`${url}/event/get-event-by-id/${id}`);
            const eventData = response.data;
            setTicket(response.data.tickets)
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${url}/complimentary/get-ticket-by-event-id/${id}`);
            const eventData = response.data;
            const mappedTickets = eventData.map((item) => {
                const matchingTicket = item.event_id.tickets.find(ticket => ticket._id === item.ticket_id);
                return {
                    ...item,
                    ticket_name: matchingTicket ? matchingTicket.ticket_name : 'Unknown',
                };
            });
            setTickets(mappedTickets);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvent();
        fetchEvents();
    }, [id]);

    useEffect(() => {
        const now = new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
        setCurrentDateTime(now);
    }, []);

    const handleTicketChange = (e) => {
        const selectedTicketId = e.target.value;
        setSelectedTicket(selectedTicketId);

        const selectedTicketObj = ticket.find((t) => t._id === selectedTicketId);
        setSelectedTickets(selectedTicketObj)

        // if (selectedTicketObj && selectedTicketObj.complimentary) {
        //     console.log("Complimentary ticket selected:", selectedTicketObj);
        // } else {
        //     console.log("Non-complimentary ticket selected:", selectedTicketObj);
        // }
    };

    return (
        <>
            <div className="flex h-screen bg-black">
                <SidebarComponent />
                <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold text-white">Complimentary Tickets</h1>
                        <div className="flex justify-between items-center gap-4">
                            <button
                                className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                onClick={() => setIsModalOpen(true)}
                            >
                                + Send Tickets
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tickets.length > 0 ? (
                            tickets.map((ticket, index) => (
                                <div
                                    key={index}
                                    className="bg-black border border-gray-700 text-white rounded-lg p-4 shadow-md flex flex-col justify-between"
                                >
                                    <div>
                                        <p className="text-sm text-gray-400">{ticket.email}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            <p className="text-sm font-semibold">Ticket:</p>
                                            <p className="text-sm">{ticket.ticket_name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold">Quantity:</p>
                                            <p className="text-sm">{ticket.qty}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-white text-lg">
                                No Complimentary tickets are available.
                            </div>
                        )}
                    </div>

                    {isModalOpen && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">Send Tickets</h2>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="firstName"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter First Name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="lastName"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email ID
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter email id"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="ticket"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Select Ticket
                                    </label>
                                    <select
                                        id="ticket"
                                        value={selectedTicket}
                                        onChange={handleTicketChange}
                                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Choose a ticket
                                        </option>
                                        {ticket.map((option, index) => (
                                            <option key={index} value={option._id}>
                                                {option.ticket_name} - ${option.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        min="1"
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSendTickets}
                                        disabled={loading}
                                        className={`bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
                                    >
                                        {loading ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            "Send"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default Complimentary;
