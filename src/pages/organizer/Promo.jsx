import React, { useEffect } from 'react';
import SidebarComponent from '../../components/layouts/SidebarComponent';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import url from '../../constants/url';
import axios from 'axios';

const Promo = () => {
    const { id } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState('');
    const [ticket, setTicket] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState('');
    const [selectedPromo, setSelectedPromo] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [limitedQty, setLimitedQty] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [tickets, setTickets] = useState([]);

    const generatePromoCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let promoCode = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            promoCode += characters.charAt(randomIndex);
        }
        return promoCode;
    };

    useEffect(() => {
        const promoCode = generatePromoCode();
        setCode(promoCode);
    }, []);

    const handleSendTickets = async () => {
        // if(!code || !selectedTicket || !selectedPromo || startDate || endDate){
        //     alert("Please fill the below details")
        //     return 
        // }
        try {
            const payload = {
                event_id: id,
                code,
                type: selectedTicket,
                amount: quantity,
                limit: selectedPromo,
                limit_count: limitedQty || 0,
                start_date: startDate,
                end_date: endDate,
            };

            const response = await axios.post(`${url}/promo/add-promo`, payload);

            if (response.status === 201) {
                alert('Promo Code created successfully!');
                window.location.reload()
            } else {
                alert('Failed to send Promo. Please try again.');
            }
        } catch (error) {
            console.error('Error sending Promo:', error);
            alert('An error occurred. Please try again later.');
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
            const response = await axios.get(`${url}/promo/get-promo/${id}`);
            const eventData = response.data;
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvent();
        fetchEvents();
    }, [id]);

    return (
        <>
            <div className="flex h-screen bg-black">
                <SidebarComponent />
                <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold text-white">Promo Codes</h1>
                        <div className="flex justify-between items-center gap-4">
                            <button
                                className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                onClick={() => setIsModalOpen(true)}
                            >
                                + Add Promo Code
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
                                        <p className="text-lg text-white font-bold">{ticket.code}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            <p className="text-sm font-semibold">Type:</p>
                                            <p className="text-sm capitalize">{ticket.type}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold capitalize">{ticket.type}:</p>
                                            <p className="text-sm">{ticket.amount}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-white text-lg">
                                No Promo Codes are available.
                            </div>
                        )}
                    </div>

                    {isModalOpen && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">Add Promo Code</h2>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Promo Code
                                    </label>
                                    <input
                                        type="text"
                                        id="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Promo Code"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="ticket"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Select Limit
                                    </label>
                                    <select
                                        id="ticket"
                                        value={selectedPromo}
                                        onChange={(e) => setSelectedPromo(e.target.value)}
                                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Choose a Limit
                                        </option>
                                        <option value="limited">
                                            Limited
                                        </option>
                                        <option value="unlimited">
                                            Unlimited
                                        </option>
                                    </select>
                                </div>
                                {selectedPromo === "limited" && (
                                    <div className="mb-4">
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium text-gray-700 capitalize"
                                        >
                                            Limited Count
                                        </label>
                                        <input
                                            type="number"
                                            id="limitedQty"
                                            value={limitedQty}
                                            onChange={(e) => {
                                                const newQuantity = e.target.value;
                                                setLimitedQty(newQuantity);
                                            }}
                                            className="mt-1 p-2 block border w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            min="1"
                                        />
                                    </div>
                                )}
                                <div className="mb-4 flex flex-wrap -mx-2">
                                    <div className="w-full sm:w-1/2 px-2">
                                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id="start-date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2 px-2">
                                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id="end-date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="ticket"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Select Type
                                    </label>
                                    <select
                                        id="ticket"
                                        value={selectedTicket}
                                        onChange={(e) => setSelectedTicket(e.target.value)}
                                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Choose a Type
                                        </option>
                                        <option value="amount">
                                            Amount
                                        </option>
                                        <option value="percentage">
                                            Percentage
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-gray-700 capitalize"
                                    >
                                        {selectedTicket || "Choose Type"}
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => {
                                            const newQuantity = e.target.value;
                                            if (selectedTicket === "percentage" && newQuantity > 100) {
                                                setQuantity(100);
                                            } else {
                                                setQuantity(newQuantity);
                                            }
                                        }}
                                        className="mt-1 p-2 block border w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Add
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

export default Promo;
