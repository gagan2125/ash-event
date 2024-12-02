/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { CiBag1 } from "react-icons/ci";
import { FiSearch, FiFilter, FiMoreVertical } from "react-icons/fi";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import url from "../../constants/url";
import { useParams } from "react-router-dom";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const Eventinfo = () => {
    const { id } = useParams()
    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accountId, setAccountId] = useState("");
    const [oragnizerId, setOragnizerId] = useState(null);
    const [organizer, setOrganizer] = useState(null);
    const [accountBalance, setSetAccountBalance] = useState({
        available: [],
        instant_available: [],
        pending: [],
    });
    const [transferedAmount, setTransferedAmount] = useState("")
    const [payoutList, setPayoutList] = useState([])
    const [book, setBook] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [soldTickets, setSoldTickets] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const fetchOrganizer = async () => {
        if (oragnizerId) {
            try {
                const response = await axios.get(`${url}/get-organizer/${oragnizerId}`);
                setOrganizer(response.data);
            } catch (error) {
                console.error("Error fetching organizer:", error);
            }
        }
    };

    useEffect(() => {
        const loadFromLocalStorage = () => {
            const storedUserOrganizerId = localStorage.getItem("organizerId");
            const storedAccountID = localStorage.getItem("accountId");
            setAccountId(storedAccountID || "");
            setOragnizerId(storedUserOrganizerId || null);
        };
        loadFromLocalStorage();

        const handleStorageChange = () => {
            loadFromLocalStorage();
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (oragnizerId) {
            fetchOrganizer();
        }
    }, [oragnizerId]);

    const fetchBalance = async () => {
        if (organizer && organizer.stripeAccountId) {
            try {
                const response = await axios.get(
                    `${url}/check-user-balance/${organizer.stripeAccountId}`
                );
                setSetAccountBalance(response.data || { available: [], instant_available: [], pending: [] });
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        }
    };

    useEffect(() => {
        if (organizer && organizer.stripeAccountId) {
            fetchBalance();
        }
    }, [organizer]);

    const fetchTransfer = async () => {
        if (organizer && organizer.stripeAccountId) {
            try {
                const response = await axios.get(
                    `${url}/total-transferred-amount?accountId=${organizer.stripeAccountId}`
                );
                setTransferedAmount(response.data);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        }
    };

    useEffect(() => {
        if (organizer && organizer.stripeAccountId) {
            fetchTransfer();
        }
    }, [organizer]);

    const fetchPayouts = async () => {
        if (organizer && organizer.stripeAccountId) {
            try {
                const response = await axios.get(
                    `${url}/payout-list?accountId=${organizer.stripeAccountId}`
                );
                setPayoutList(response.data.payouts);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        }
    };

    useEffect(() => {
        if (organizer && organizer.stripeAccountId) {
            fetchPayouts();
        }
    }, [organizer]);

    const handleClick = () => {
        if (organizer && organizer.stripeAccountId) {
            axios.post(`${url}/generate-onboarding-url`, { accountId: organizer.stripeAccountId })
                .then(response => {
                    window.location.href = response.data.url;
                })
                .catch(error => {
                    console.error('Error generating onboarding URL:', error);
                });
        }
    }

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
    }, [oragnizerId]);

    const fetchBook = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/get-event-payment-list/${id}`);
            setBook(response.data);

            const total = response.data.reduce((acc, event) => acc + event.amount, 0);
            setTotalAmount(total);

            const soldTickets = response.data.reduce((acc, event) => acc + Number(event.count), 0);
            setSoldTickets(soldTickets)
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="flex h-screen bg-black">
                <SidebarComponent />
                {
                    !accountId ? (
                        <>
                            <div className="flex flex-grow justify-center items-center bg-black">
                                <div className="text-white">
                                    <button
                                        onClick={handleClick}
                                        className="px-4 py-2 text-sm bg-[#171717] text-white rounded hover:bg-[#1d1d1d] transition">
                                        Complete Onboarding and get full access
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-3xl font-semibold text-white">Finance {"-"} {event.event_name}</h1>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-32">

                                    <div className="bg-black text-white p-6 rounded-lg shadow-md flex flex-col items-start mt-10">
                                        <CiBag1 className="text-2xl mb-1" />
                                        <p className="text-3xl font-medium mb-1">
                                            ${(totalAmount / 100).toFixed(2) || 0}
                                        </p>
                                        <p className="text-lg font-normal text-gray-400">Revenue</p>
                                    </div>

                                    <div className="bg-black text-white p-6 rounded-lg shadow-md flex flex-col items-start mt-10">
                                        <CiBag1 className="text-2xl mb-1" />
                                        <p className="text-3xl font-medium mb-1">
                                            {book.length || 0}
                                        </p>
                                        <p className="text-lg font-normal text-gray-400">Members</p>
                                    </div>

                                    <div className="bg-black text-white p-6 rounded-lg shadow-md flex flex-col items-start mt-10">
                                        <CiBag1 className="text-2xl mb-1" />
                                        <p className="text-3xl font-medium mb-1">
                                            {soldTickets || 0}
                                        </p>
                                        <p className="text-lg font-normal text-gray-400">Sold Out</p>
                                    </div>

                                    <div className="bg-black text-white p-6 rounded-lg shadow-md flex flex-col items-start mt-10">
                                        <CiBag1 className="text-2xl mb-1" />
                                        <p className="text-3xl font-medium mb-1">
                                            {totalQuantity - soldTickets || 0}
                                        </p>
                                        <p className="text-lg font-normal text-gray-400">Remaining</p>
                                    </div>
                                </div>
                                <h2 className="text-xl text-white font-semibold mb-4 mt-10 flex items-center justify-between">
                                    Bookings
                                    <button className="ml-4 p-2 bg-transparent hover:bg-gray-700 rounded-lg">
                                        <FiMoreVertical className="text-gray-400 text-xl" />
                                    </button>
                                </h2>
                                <div className="flex-1 overflow-y-auto no-scrollbar">
                                    <ul className="space-y-4">
                                        {book.length === 0 ? (
                                            <li className="bg-[#000] p-4 rounded-lg text-center text-gray-400">
                                                No Bookings are available.
                                            </li>
                                        ) : (
                                            book.map((payout, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="bg-[#101010] p-4 rounded-lg flex justify-between hover:border hover:border-gray-700"
                                                    >
                                                        <div>
                                                            <p className="text-lg text-white font- mb-2">{payout.user_id.firstName} {payout.user_id.lastName}</p>
                                                            <p className="text-sm text-gray-400">Transaction ID: {payout.transaction_id}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg text-white font-medium mb-2">${(payout.amount / 100).toFixed(2)}</p>
                                                            <p className="text-sm text-gray-400">
                                                                {new Date(payout.date).toLocaleDateString('en-GB', {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                                -
                                                                {new Date(payout.date).toLocaleTimeString('en-GB', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    hour12: true,
                                                                })}
                                                            </p>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        )}
                                    </ul>

                                </div>
                            </div>
                            {/* <div className="w-1/5 bg-black text-white flex flex-col p-6 overflow-y-auto border-l border-gray-800">
                                <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
                                    All Bookings
                                    <button className="ml-4 p-2 bg-transparent hover:bg-gray-700 rounded-lg">
                                        <FiMoreVertical className="text-gray-400 text-xl" />
                                    </button>
                                </h2>

                                <div className="flex items-center mb-6 mt-2">
                                    <div className="relative flex-1">
                                        <FiSearch className="absolute right-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full p-2 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none border border-gray-700 focus:ring-2 focus:ring-gray-600"
                                        />
                                    </div>
                                    <button className="ml-4 p-2 bg-black rounded-lg">
                                        <FiFilter className="text-gray-400 text-xl" />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto no-scrollbar">
                                    <ul className="space-y-4">
                                        {payoutList.length === 0 ? (
                                            <li className="bg-[#000] p-4 rounded-lg text-center text-gray-400">
                                                No Bookings are available.
                                            </li>
                                        ) : (
                                            payoutList.map((payout, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="bg-[#101010] p-4 rounded-lg flex justify-between hover:border hover:border-gray-700"
                                                    >
                                                        <div>
                                                            <p className="text-lg font-medium">Transaction {index + 1}</p>
                                                            <p className="text-sm text-gray-400">{payout.created}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-medium">${(payout.amount / 100).toFixed(2)}</p>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        )}
                                    </ul>

                                </div>

                            </div> */}
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Eventinfo;
