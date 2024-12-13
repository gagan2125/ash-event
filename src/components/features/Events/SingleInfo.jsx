/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import {
  IoMdInformationCircleOutline,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { TfiAnnouncement } from "react-icons/tfi";
import { LuDoorOpen } from "react-icons/lu";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import url from "../../../constants/url";

const SingleInfo = () => {
  const { name } = useParams()
  const [showPopup, setShowPopup] = useState(false);
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState("Tickets");
  const [event, setEvent] = useState({})
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [selectedTicketName, setSelectedTicketName] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  const { id } = location.state || {};

  console.log("id:", id)

  const handleCheckout = () => {
    navigate("/checkout", {
      state: { selectedTicketPrice, count, eventId: event._id, selectedTicketId, selectedTicketName },
    });
  };

  const cards = [
    {
      id: 1,
      title: "Concert Ticket",
      amount: "$20",
      image: "https://example.com/concert.jpg",
    },
    {
      id: 2,
      title: "Movie Ticket",
      amount: "$15",
      image: "https://example.com/movie.jpg",
    },
    {
      id: 3,
      title: "Food Voucher",
      amount: "$10",
      image: "https://example.com/food.jpg",
    },
    {
      id: 4,
      title: "Game Pass",
      amount: "$25",
      image: "https://example.com/game.jpg",
    },
    {
      id: 5,
      title: "Event Pass",
      amount: "$30",
      image: "https://example.com/event.jpg",
    },
    {
      id: 6,
      title: "Travel Coupon",
      amount: "$50",
      image: "https://example.com/travel.jpg",
    },
  ];

  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
  };

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  const togglePopup = () => setShowPopup(!showPopup);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${url}/event/get-event-by-id/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const time = date.toTimeString().slice(0, 5); // Extract HH:mm
    return `${day} ${month} ${year} ${time}`;
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID');
    setUserId(storedUserId);
  }, []);

  const loginDirect = () => {
    navigate('/auth');
  }

  return (
    <div className="flex justify-start sm:px-72 items-start min-h-screen bg-black -mt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-opacity-50"
        style={{
          backgroundImage: `url("${event.flyer}"), 
                         linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-90"></div>

      <div className="relative isolate overflow-hidden px-6 py-24 sm:py-20 lg:overflow-visible lg:px-0 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-y-10 lg:gap-y-0 lg:gap-x-0">

          <div>
            <div className="max-w-screen-2xl mb-10">

              <div class="flex flex-wrap items-center justify-between text-white rounded-lg shadow-md">
                <div class="flex items-center space-x-4">
                  <div class="bg-gray-50 rounded-full overflow-hidden">
                    <img className="size-20 rounded-full object-cover" src={event?.organizer_id?.profile_image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"} />
                  </div>

                  <div class="flex flex-col">
                    <h3 class="text-xl font-semibold">{event?.organizer_id?.name}</h3>
                    <a href="profile_link_here" class="text-sm text-gray-400 hover:underline">Visit Profile</a>
                  </div>
                </div>
                <div class="flex space-x-4">
                  <a href="https://img.freepik.com/premium-vector/logo-instagram-icons-instgagram_1367689-33.jpg?semt=ais_hybrid" target="_blank" class="text-xl hover:text-yellow-300">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="https://static.vecteezy.com/system/resources/previews/031/737/206/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png" target="_blank" class="text-xl hover:text-yellow-300">
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
              </div>

              {/* <p className="text-base font-semibold leading-7 text-secondary">
                Fast Filling
              </p> */}
              <h1 className="mt-8 text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
                {event.event_name}
              </h1>
              <p className="text-sm leading-8 text-yellow-300">
                {formatDate(event.start_date)} - {formatDate(event.end_date)}
              </p>
              <p className="mt-2 text-lg leading-8 text-gray-300">
                {event.venue_name}
              </p>
              <div className="flex flex-wrap justify-start gap-4 mb-4 sm:flex-row mt-2">
                <div className="text-white flex items-center justify-center rounded-md shadow-md">
                  <MdLocationOn className="mr-1" />
                  <span className="text-center text-sm">{event.address}</span>
                </div>
              </div>
              <div className="bg-[#2c2c2c] p-3 rounded-lg shadow-md flex justify-between items-center w-full sm:w-full">
                <span className="text-md font-bold text-gray-200">Starting at: ${event.ticket_start_price}</span>
                {
                  userId ? (
                    <>
                      <h3
                        onClick={togglePopup}
                        className="text-black bg-gray-200 flex gap-2 p-2 px-7 rounded-full font-bold text-md cursor-pointer hover:bg-gray-300"
                      >
                        <span>
                          <BiPurchaseTagAlt className="mt-1" size={20} />
                        </span>
                        Book Now
                      </h3>
                    </>
                  ) : (
                    <>
                      <h3
                        onClick={loginDirect}
                        className="text-black bg-gray-200 flex gap-2 p-2 px-7 rounded-full font-bold text-md cursor-pointer hover:bg-gray-300"
                      >
                        <span>
                          <BiPurchaseTagAlt className="mt-1" size={20} />
                        </span>
                        Login & Book
                      </h3>
                    </>
                  )
                }
              </div>
            </div>

            <div className="mt-0">
              <h3 className="text-2xl font-medium leading-7 text-white mb-6">
                About
              </h3>
              <p
                className="text-md font-medium leading-7 text-gray-400"
                style={{
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: event.event_description }}
              ></p>
              <div className="flex flex-wrap justify-start gap-4 mb-4 sm:flex-row mt-2">
                <div className="text-gray-400 flex items-center justify-center rounded-md shadow-md">
                  <IoMdInformationCircleOutline className="mr-1" />
                  <span className="text-center text-sm">
                    Presentato da Live Srl.
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-start gap-4 mb-4 sm:flex-row mt-2">
                <div className="text-gray-400 flex items-center justify-center rounded-md shadow-md">
                  <TfiAnnouncement className="mr-1" />
                  <span className="text-center text-sm">
                    Questo è un evento 16+
                  </span>
                </div>
              </div>
              <hr className="my-12 border-t border-[#3f3f3f] w-5/5" />
            </div>
            <div className="mt-0">
              <h3 className="text-xl font-medium leading-7 text-white mb-2">
                Venue
              </h3>
              <p className="text-3xl font-medium leading-7 text-gray-50 mb-2">
                {event.venue_name}
              </p>
              <p className="text-sm font-medium leading-7 text-gray-50">
                {event.address}
              </p>
              <div className="flex flex-wrap justify-start gap-4 mb-4 sm:flex-row mt-2">
                <div className="flex items-center justify-center rounded-md shadow-md">
                  <LuDoorOpen className="mr-1 text-gray-400" />
                  <p className="text-gray-500 text-md">
                    Doors Open{" "}
                    <span className="text-nowrap text-white text-lg">
                      {event.open_time}
                    </span>
                  </p>
                </div>
              </div>
              <hr className="my-12 border-t border-[#3f3f3f] w-5/5" />
            </div>
          </div>

          <div className="flex justify-center lg:justify-center lg:sticky lg:top-4 flex-col items-center lg:items-center">
            <img
              alt=""
              src={`${event.flyer}`}
              className="w-[20rem] sm:w-[20rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
            />
            <p className="mt-4 text-sm font-normal text-gray-100">
              ASH protects fans and artists from <br /> resellers. Tickets
              will be securely stored. <br />
            </p>
            <p className="mt-4 text-md font-bold text-gray-100">Got a Code ?</p>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-primary bg-opacity-50 backdrop-blur-md flex items-center justify-center transition-opacity duration-300 ease-in-out">
              <div className="bg-white rounded-2xl shadow-2xl p-10 w-80 md:w-[700px] h-auto max-w-2xl text-center relative flex flex-col space-y-2 transition duration-500 ease-in-out">
                <button
                  onClick={togglePopup}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-2xl focus:outline-none"
                >
                  &times;
                </button>
                <div className="flex justify-start">
                  <button
                    className={`font-semibold ${activeTab === "Tickets" ? "hidden" : "text-gray-500"
                      }`}
                    onClick={() => handleTabSwitch("Tickets")}
                  >
                    <IoMdArrowRoundBack color="black" size={24} />
                  </button>
                </div>

                {activeTab === "Tickets" && (
                  <>
                    <h4 className="font-bold text-lg">Choose Ticket</h4>
                    <div
                      className={`grid gap-4 mt-3 sm:grid-cols-1 ${event.tickets.length === 1
                        ? "md:grid-cols-1"
                        : event.tickets.length === 2
                          ? "md:grid-cols-2"
                          : "md:grid-cols-3"
                        }`}
                    >
                      {event.tickets.map((ticket, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg hover:border hover:border-black transition cursor-pointer"
                          onClick={() => { setSelectedTicketName(ticket.ticket_name); setSelectedTicketId(ticket._id); setSelectedTicketPrice(ticket.price); handleTabSwitch("Checkout") }}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-md font-medium text-gray-600">{ticket.ticket_name}</h3>
                            <p className="text-md text-gray-900 font-bold">${ticket.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </>
                )}
                {activeTab === "Checkout" && (
                  <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-0">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:w-1/2">
                      <img
                        src={`${event.flyer}`}
                        alt="Event"
                        className="w-32 h-32 rounded-lg mb-4"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {event.event_name}
                        </h2>
                        <p className="text-md text-gray-600">
                          Venue: {event.venue_name}
                        </p>
                        <p className="text-md text-gray-600">
                          Price: ${selectedTicketPrice} per ticket
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center space-y-5 md:w-1/2">
                      <h2 className="flex items-center gap-3 text-2xl text-gray-800 font-bold mb-3">
                        <span className="text-black">Checkout</span>
                        <FaLongArrowAltRight className="mt-1" />
                        <span className="text-gray-300">Payment</span>
                      </h2>
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={decrement}
                          className="hover:border-red-400 text-primary rounded-full border-2 border-red-200 w-8 h-8 flex items-center justify-center text-lg font-light transition-all duration-200"
                        >
                          -
                        </button>
                        <div className="w-20 h-12 flex items-center justify-center border-2 border-gray-300 rounded-md text-xl font-semibold bg-white text-center">
                          {count}
                        </div>

                        <button
                          onClick={increment}
                          className="hover:border-green-400 text-primary rounded-full border-2 border-green-200 w-8 h-8 flex items-center justify-center text-lg font-light transition-all duration-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="mt-5 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-blue-500 text-white py-2 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                      >
                        Checkout - ${count * selectedTicketPrice}
                      </button>
                      {/* <p className="text-gray-400 text-sm">
                        Logged in as Gagan, 8431065562
                      </p> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleInfo;
