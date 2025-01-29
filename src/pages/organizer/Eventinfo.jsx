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
    const [showModal, setShowModal] = useState(false);
    const [refundDetails, setRefundDetails] = useState({
        firstName: "",
        lastName: "",
        amount: 0,
        paymentId: ""
    });
    const [inputAmount, setInputAmount] = useState(0);
    const [remain, setRemain] = useState([])
    const [compCount, setCompCount] = useState(0)

    const fetchRemainEvent = async (id) => {
        try {
            const response = await axios.get(`${url}/remain-tickets/${id}`);

            if (response.data) {
                setRemain(response.data);
            }
        } catch (error) {
            console.error("Error fetching remain events:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchRemainEvent(id);
        }
    }, [id]);

    const remainingTicketsSum = remain.reduce((sum, ticket) => sum + ticket.remaining_tickets, 0);

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

            // const total = response.data.reduce((acc, payout) => {
            //     const payoutAmount = ((payout?.tickets?.price * payout.count) + (payout ? parseFloat(payout.tax || 0) / 100 : 0)).toFixed(2)
            //     return acc + parseFloat(payoutAmount);
            // }, 0);
            // setTotalAmount(total);

            const total = response.data.reduce((acc, payout) => {
                if (!payout.transaction_id) return acc;

                const payoutAmount = (
                    (payout?.tickets?.price * payout.count) +
                    (payout.tax ? parseFloat(payout.tax || 0) / 100 : 0)
                ).toFixed(2);

                return acc + parseFloat(payoutAmount);
            }, 0);
            setTotalAmount(total);

            const countEmptyTransactionId = response.data.reduce((count, payout) => {
                if (!payout.transaction_id) {
                    return count + 1;
                }
                return count;
            }, 0);
            console.log(countEmptyTransactionId)
            setCompCount(countEmptyTransactionId)



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

    const handleInputChange = (e) => {
        const { value } = e.target;
        setRefundDetails((prevDetails) => ({
            ...prevDetails,
            amount: value,
        }));
    };

    const handleRefundClick = (payout) => {
        console.log(payout)
        const ticketId = payout.ticketId;
        const matchingParty = payout?.party_id?.tickets?.find(party => party._id === ticketId);

        const ticketPrice = payout.count * matchingParty.price;

        if (matchingParty) {
            const ticketPriceWithTax = ticketPrice + (payout?.party_id?.tax / 100);
            setRefundDetails({
                firstName: payout?.user_id?.firstName || "Complimentary",
                lastName: payout?.user_id?.lastName || "Ticket",
                amount: ticketPriceWithTax.toFixed(2),
                partyDetails: matchingParty,
                paymentId: payout.transaction_id
            });
            setInputAmount(ticketPriceWithTax.toFixed(2));
        }
        else {
            console.error(`No matching party found for ticketId: ${ticketId}`);
        }

        setShowModal(true);
    };

    const handleRefund = async () => {
        try {
            const refundRequest = axios.post(`${url}/refund`, {
                paymentIntentId: refundDetails.paymentId,
                amount: refundDetails.amount,
            });

            const updateStatusRequest = axios.post(`${url}/updateRefundStatus`, {
                paymentId: refundDetails.paymentId,
                refund: true,
            });

            const [refundResponse, statusResponse] = await Promise.all([refundRequest, updateStatusRequest]);

            alert("Refund processed successfully");
            window.location.reload()
            setShowModal(false);

            console.log("Refund Response:", refundResponse.data);
            console.log("Status Update Response:", statusResponse.data);
        } catch (error) {
            console.error("Error processing refund or updating status:", error);
            alert("Refund or status update failed. Please try again.");
        }
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
                                                ${(totalAmount).toFixed(2) || 0}
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
                                                {remainingTicketsSum - compCount || 0}
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
                                                        key={index}
                                                        className="bg-[#101010] p-4 rounded-lg flex justify-between hover:border hover:border-gray-700"
                                                    >
                                                        <div onClick={() => navigate(`/ticket-info/${payout._id}`)}>
                                                            <p className="text-lg text-white font- mb-2">{payout?.user_id?.firstName || "Complimentary"} {payout?.user_id?.lastName || "Ticket"}</p>
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
                                                            <p className="text-xl text-white font-medium mb-2">
                                                                ${!payout?.transaction_id ? "0" :
                                                                    `${(
                                                                        (payout?.tickets?.price * payout.count) +
                                                                        (payout.tax ? parseFloat(payout?.tax || 0) / 100 : 0)
                                                                    ).toFixed(2)}`}
                                                            </p>
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
                                                                {
                                                                    payout.refund === 'true' ? (
                                                                        <>
                                                                            <a
                                                                                className="bg-green-800 text-white font-medium py-1 px-2 text-sm rounded-md hover:bg-green-900 transition-colors cursor-pointer"
                                                                            >
                                                                                Refunded
                                                                            </a>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <a
                                                                                className="bg-red-800 text-white font-medium py-1 px-2 text-sm rounded-md hover:bg-red-900 transition-colors cursor-pointer"
                                                                                onClick={() => handleRefundClick(payout)}
                                                                            >
                                                                                Refund
                                                                            </a>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        )}
                                    </ul>
                                </div>
                            </div>
                            {showModal && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-bold text-gray-800">Send Refund for {refundDetails.firstName} {refundDetails.lastName}</h2>
                                            <button
                                                className="text-gray-500 hover:text-gray-800"
                                                onClick={() => setShowModal(false)}
                                            >
                                                X
                                            </button>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="refundAmount"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Refund Amount
                                            </label>
                                            <input
                                                type="number"
                                                id="refundAmount"
                                                value={inputAmount}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    if (isNaN(value) || value <= parseFloat(refundDetails.amount)) {
                                                        setInputAmount(e.target.value);
                                                    }
                                                }}
                                                onBlur={() => {
                                                    const value = parseFloat(inputAmount);
                                                    if (!isNaN(value) && value <= parseFloat(refundDetails.amount)) {
                                                        setRefundDetails((prev) => ({
                                                            ...prev,
                                                            amount: value.toFixed(2),
                                                        }));
                                                    }
                                                }}
                                                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter refund amount"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={handleRefund}
                                                className="bg-red-800 text-white font-medium py-2 px-4 rounded-md hover:bg-red-900 transition-colors"
                                            >
                                                Refund
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
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
