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
import { useNavigate, useParams } from "react-router-dom";
import { PiDotsThreeVertical } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Dropdown, Space } from 'antd';

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
    const navigate = useNavigate();
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
    const [visitData, setVisitData] = useState({});
    const [error, setError] = useState(null);

    const items = [
        {
            key: '1',
            label: 'Complimentary Tickets',
            extra: '⌘C',
            onClick: () => navigate(`/complimentary/${id}`),
        },
        {
            key: '2',
            label: 'Promo Code',
            extra: '⌘P',
            onClick: () => navigate(`/promo/${id}`),
        },
    ];

    useEffect(() => {
        const fetchVisitData = async () => {
            try {
                const response = await fetch(`${url}/visit/get-visit/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch visit data");
                }

                const data = await response.json();
                setVisitData(data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchVisitData();
    }, [id]);

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

    const handleCopyLink = () => {
        const url = `https://avenue.tickets/event-copy/${event._id}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert("Event Link copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy the link: ", err);
            });
    };

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
                                    <h1 className="text-3xl font-semibold text-white"><span onClick={handleCopyLink} className="cursor-pointer hover:underline">{event.event_name}</span> <span className="text-lg">({visitData.count} Visits)</span></h1>
                                    <div className="flex justify-between items-center mb-4 gap-2">
                                        <a
                                            className="bg-black text-white font-semibold py-2 px-4 rounded-md transition-colors"
                                            href={`/tickets/${id}`}
                                        >
                                            Scanned Tickets
                                        </a>
                                        <a
                                            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                            href={`/event-preview/${id}`}
                                        >
                                            View Event
                                        </a>
                                        <a
                                            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                            href={`/edit-event/${id}`}
                                        >
                                            Update Event
                                        </a>
                                        <Dropdown
                                            className="text-gray-400 cursor-pointer"
                                            menu={{
                                                items,
                                            }}
                                            trigger={['click']}
                                        >
                                            <Space>
                                                <BiDotsVerticalRounded size={20} />
                                            </Space>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                                    <div
                                        className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="text-2xl font-bold text-gray-200">
                                                ${(totalAmount / 100).toFixed(2) || 0}
                                            </div>

                                            <div className="flex space-x-2">
                                                <PiDotsThreeVertical
                                                    size={24}
                                                    className="text-white cursor-pointer hover:text-gray-200"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="mt-1 text-lg font-semibold text-gray-500">
                                            Revenue
                                        </h3>
                                    </div>

                                    <div
                                        className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="text-2xl font-bold text-gray-200">
                                                {book.length || 0}
                                            </div>

                                            <div className="flex space-x-2">
                                                <PiDotsThreeVertical
                                                    size={24}
                                                    className="text-white cursor-pointer hover:text-gray-200"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="mt-1 text-lg font-semibold text-gray-500">
                                            Attendes
                                        </h3>
                                    </div>

                                    <div
                                        className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="text-2xl font-bold text-gray-200">
                                                {soldTickets || 0}
                                            </div>

                                            <div className="flex space-x-2">
                                                <PiDotsThreeVertical
                                                    size={24}
                                                    className="text-white cursor-pointer hover:text-gray-200"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="mt-1 text-lg font-semibold text-gray-500">
                                            Sold
                                        </h3>
                                    </div>

                                    <div
                                        className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="text-2xl font-bold text-gray-200">
                                                {totalQuantity - soldTickets || 0}
                                            </div>

                                            <div className="flex space-x-2">
                                                <PiDotsThreeVertical
                                                    size={24}
                                                    className="text-white cursor-pointer hover:text-gray-200"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="mt-1 text-lg font-semibold text-gray-500">
                                            Remaining
                                        </h3>
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
                                                        onClick={() => navigate(`/ticket-info/${payout._id}`)}
                                                        key={index}
                                                        className="bg-[#101010] p-4 rounded-lg flex justify-between hover:border hover:border-gray-700"
                                                    >
                                                        <div>
                                                            <p className="text-lg text-white font- mb-2">{payout.user_id.firstName} {payout.user_id.lastName}</p>
                                                            <p className="text-sm text-gray-300 mb-1">{payout.email}</p>
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
                                                            {/* <p className="text-sm text-gray-400">Transaction ID: {payout.transaction_id}</p> */}
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xl text-white font-medium mb-2">${(payout.amount / 100).toFixed(2)}</p>
                                                            <p className="text-sm text-gray-600 font-medium mb-2">{payout.qr_status === 'true' ? "Checked In" : ""}</p>
                                                            <div className="flex justify-between items-center gap-2 mt-3">
                                                                {
                                                                    payout.qr_status === 'true' ? (
                                                                        <>
                                                                            <a
                                                                                className="bg-gray-600 text-black font-medium py-1 px-2 text-sm rounded-md hover:bg-gray-400 transition-colors"
                                                                                href=''
                                                                            >
                                                                                Checked In
                                                                            </a>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <a
                                                                                className="bg-gray-300 text-black font-medium py-1 px-2 text-sm rounded-md hover:bg-gray-400 transition-colors"
                                                                                href=''
                                                                            >
                                                                                Send Ticket
                                                                            </a>
                                                                        </>
                                                                    )
                                                                }
                                                                <a
                                                                    className="bg-red-800 text-white font-medium py-1 px-2 text-sm rounded-md hover:bg-red-900 transition-colors"
                                                                    href=''
                                                                >
                                                                    Refund
                                                                </a>
                                                            </div>
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
