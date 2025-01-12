/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { CiBag1 } from "react-icons/ci";
import { FiSearch, FiFilter, FiMoreVertical } from "react-icons/fi";
import { PiDotsThreeVertical } from "react-icons/pi";
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

const Finance = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [events, setEvents] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [oragnizerId, setOragnizerId] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [accountBalance, setSetAccountBalance] = useState({
    available: [],
    instant_available: [],
    pending: [],
  });
  const [transferedAmount, setTransferedAmount] = useState("")
  const [payoutList, setPayoutList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputAmount, setInputAmount] = useState("");

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [1200, 1900, 3000, 500, 2000, 3400],
        backgroundColor: "#003186",
      },
      {
        label: "Expense",
        data: [800, 1700, 2000, 600, 1500, 2800],
        backgroundColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Money Flow",
      },
    },
  };
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
      progressData: [0, 20, 40, 60, 80, 100],
    },
    {
      id: 2,
      title: "Event 2",
      price: "$75",
      image: "https://wallpaperaccess.com/full/127147.jpg",
      startDate: "Bangalore, India",
      endDate: "2025-01-15",
      status: "Live",
      progressData: [0, 20, 40, 60, 80, 100],
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
      progressData: [0, 20, 40, 60, 80, 100],
    },
    {
      id: 1,
      title: "Event 1",
      price: "$50",
      image: "https://d.newsweek.com/en/full/1611005/party.jpg",
      startDate: "Bangalore, India",
      endDate: "2024-12-31",
      status: "Draft",
      progressData: [0, 20, 40, 60, 80, 100],
    },
    {
      id: 2,
      title: "Event 2",
      price: "$75",
      image: "https://wallpaperaccess.com/full/127147.jpg",
      startDate: "Bangalore, India",
      endDate: "2025-01-15",
      status: "Live",
      progressData: [0, 20, 40, 60, 80, 100],
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
      progressData: [0, 20, 40, 60, 80, 100],
    },
  ];
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Progress",
        data: [0, 20, 40, 60, 80, 100],
        borderColor: "#ccc",
        backgroundColor: "#ccc",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
        },
      },
    },
  };

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

  const handlePayoutClick = () => {
    try {
      const payout = axios.post(`${url}/instant-payout`, {
        account_id: accountId,
        amount: inputAmount,
        currency: "usd"
      });
      alert("Transfered successfully");
      window.location.reload()
      setShowModal(false);
    } catch (error) {
      console.error("Error processing refund or updating status:", error);
      alert("Instant Payout Failed. Please try again.");
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
                  <h1 className="text-3xl font-semibold text-white">Wallet</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-200">
                        ${accountBalance?.available?.[0]?.amount ? accountBalance.available[0].amount / 100 : 0}
                      </div>

                      <div className="flex space-x-2">
                        <PiDotsThreeVertical
                          size={24}
                          className="text-white cursor-pointer hover:text-gray-200"
                        />
                      </div>
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-gray-500">
                      Balance
                    </h3>
                  </div>

                  <div className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105" onClick={() => setShowModal(true)}>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-200">
                        ${accountBalance?.instant_available?.[0]?.amount ? accountBalance.instant_available[0].amount / 100 : 0}
                      </div>

                      <div className="flex space-x-2">
                        <PiDotsThreeVertical
                          size={24}
                          className="text-white cursor-pointer hover:text-gray-200"
                        />
                      </div>
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-gray-500">
                      Available <br /><span className="hover:underline cursor-pointer">Instant Available: ${accountBalance?.instant_available?.[0]?.amount ? accountBalance.instant_available[0].amount / 100 : 0}</span>
                    </h3>
                  </div>
                  {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-bold text-gray-800">Instant Payout (Max Limit: ${accountBalance?.instant_available[0]?.amount / 100})</h2>
                          <button
                            className="text-gray-500 hover:text-gray-800"
                            onClick={() => setShowModal(false)}
                          >
                            X
                          </button>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="payoutAmount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                          </label>
                          <input
                            type="number"
                            id="payoutAmount"
                            value={inputAmount}
                            onChange={(e) => {
                              const enteredAmount = e.target.value;
                              const enteredAmountNum = parseFloat(enteredAmount);
                              const maxAmount = accountBalance?.instant_available?.[0]?.amount / 100 || 0;
                              if (enteredAmount === "") {
                                setInputAmount("");
                              } else if (!isNaN(enteredAmountNum) && enteredAmountNum <= maxAmount) {
                                setInputAmount(enteredAmount);
                              } else if (enteredAmountNum > maxAmount) {
                                setInputAmount(maxAmount.toFixed(2));
                              }
                            }}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter amount"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setShowModal(false)}
                            className="bg-red-800 text-white font-medium py-2 px-4 rounded-md hover:bg-red-900 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handlePayoutClick}
                            className="bg-blue-800 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-900 transition-colors"
                          >
                            Payout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <div className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-200">
                        ${accountBalance?.pending?.[0]?.amount ? accountBalance.pending[0].amount / 100 : 0}
                      </div>

                      <div className="flex space-x-2">
                        <PiDotsThreeVertical
                          size={24}
                          className="text-white cursor-pointer hover:text-gray-200"
                        />
                      </div>
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-gray-500">
                      Pending
                    </h3>
                  </div> */}

                  <div className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-200">
                        ${transferedAmount.totalAmountTransferred || 0}
                      </div>

                      <div className="flex space-x-2">
                        <PiDotsThreeVertical
                          size={24}
                          className="text-white cursor-pointer hover:text-gray-200"
                        />
                      </div>
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-gray-500">
                      Total Payout
                    </h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
                  <a href="/disputes" className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-200">
                        {accountBalance?.available?.[0]?.amount ? accountBalance.available[0].amount / 100 : 0}
                      </div>

                      <div className="flex space-x-2">
                        <PiDotsThreeVertical
                          size={24}
                          className="text-white cursor-pointer hover:text-gray-200"
                        />
                      </div>
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-gray-500">
                      Disputes
                    </h3>
                  </a>
                </div>
                <div className="bg-[#000] text-white p-6 rounded-lg shadow-md mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-3xl sm:text-2xl font-semibold">Finance Flow</h2>
                    <div className="flex items-center gap-2">
                      <div>
                        <label
                          htmlFor="fromDate"
                          className="block text-xs text-gray-400 mb-1"
                        >
                          From
                        </label>
                        <input
                          type="date"
                          id="fromDate"
                          className="p-1 rounded-lg bg-[#000] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-gray-700"
                          style={{
                            colorScheme: "dark",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="toDate"
                          className="block text-xs text-gray-400 mb-1"
                        >
                          To
                        </label>
                        <input
                          type="date"
                          id="toDate"
                          style={{
                            colorScheme: "dark",
                          }}
                          className="p-1 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Bar data={data} options={options} className="h-40" />
                  </div>
                </div>

              </div>
              <div className="w-1/5 bg-black text-white flex flex-col p-6 overflow-y-auto border-l border-gray-800">
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
                  All Payouts
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
                        No payouts are available.
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
                              <p className="text-lg font-medium">${(payout.amount).toFixed(2)}</p>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};

export default Finance;
