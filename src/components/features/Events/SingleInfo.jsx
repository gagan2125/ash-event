/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import {
  IoMdInformationCircleOutline,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { TfiAnnouncement } from "react-icons/tfi";
import { LuDoorOpen } from "react-icons/lu";

const SingleInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState("Tickets");

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

  return (
    <div className="flex justify-start sm:px-72 items-start min-h-screen bg-primary -mt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-opacity-50"
        style={{
          backgroundImage: `url("https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=328&h=328&fit=crop&crop=faces%2Ccenter&dpr=1"), 
                         linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-90"></div>

      <div className="relative isolate overflow-hidden px-6 py-24 sm:py-20 lg:overflow-visible lg:px-0 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-y-10 lg:gap-y-0 lg:gap-x-0">
          <div className="flex justify-center lg:justify-center lg:sticky lg:top-4 flex-col items-center lg:items-center">
            <img
              alt=""
              src="https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=328&h=328&fit=crop&crop=faces%2Ccenter&dpr=1"
              className="w-[20rem] sm:w-[25rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
            />
            <p className="mt-4 text-sm font-normal text-gray-100">
              ASANA protects fans and artists from <br /> resellers. Tickets
              will be securely stored <br />
              in the app.
            </p>
            <p className="mt-4 text-md font-bold text-gray-100">Got a Code ?</p>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center transition-opacity duration-300 ease-in-out">
              <div className="bg-white rounded-2xl shadow-2xl p-10 w-80 md:w-[700px] h-auto max-w-2xl text-center relative flex flex-col space-y-2 transition duration-500 ease-in-out">
                <button
                  onClick={togglePopup}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-2xl focus:outline-none"
                >
                  &times;
                </button>
                <div className="flex justify-start">
                  <button
                    className={`font-semibold ${
                      activeTab === "Tickets" ? "hidden" : "text-gray-500"
                    }`}
                    onClick={() => handleTabSwitch("Tickets")}
                  >
                    <IoMdArrowRoundBack color="black" size={24} />
                  </button>
                </div>

                {activeTab === "Tickets" && (
                  <>
                    <h4 className="font-bold text-lg">Choose Ticket</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg hover:border hover:border-black transition cursor-pointer"
                          onClick={() => handleTabSwitch("Checkout")}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-md font-medium text-gray-600">
                              Event {index + 1}
                            </h3>
                            <p className="text-md text-gray-900 font-bold">
                              ${(index + 1) * 20}
                            </p>
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
                        src="https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=300&h=300&fit=crop&crop=faces%2Ccenter&dpr=1"
                        alt="Event"
                        className="w-32 h-32 rounded-lg mb-4"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          Concert Night
                        </h2>
                        <p className="text-md text-gray-600">
                          Venue: Madison Square Garden
                        </p>
                        <p className="text-md text-gray-600">
                          Price: $20 per ticket
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
                        <input
                          type="number"
                          value={count}
                          readOnly
                          className="w-20 outline-none text-center border border-gray-300 rounded-md p-2 text-xl font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button
                          onClick={increment}
                          className="hover:border-green-400 text-primary rounded-full border-2 border-green-200 w-8 h-8 flex items-center justify-center text-lg font-light transition-all duration-200"
                        >
                          +
                        </button>
                      </div>
                      <a
                        href="/checkout"
                        className="mt-5 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-blue-500 text-white py-2 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                      >
                        Checkout - ${count * 20}
                      </a>
                      <p className="text-gray-400 text-sm">
                        Logged in as Gagan, 8431065562
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <div className="max-w-screen-2xl mb-10">
              <p className="text-base font-semibold leading-7 text-secondary">
                Fast Filling
              </p>
              <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
                MARCO CASTELLO solo acustico
              </h1>
              <p className="mt-2 text-lg leading-8 text-gray-300">
                Alcazar Live
              </p>
              <p className="text-lg leading-8 text-yellow-300">
                Wed, Jan 8, 2025, 8:00 PM GMT+1
              </p>
              <div className="flex flex-wrap justify-start gap-4 mb-4 sm:flex-row mt-2">
                <div className="text-white flex items-center justify-center rounded-md shadow-md">
                  <MdLocationOn className="mr-1" />
                  <span className="text-center text-sm">Rome</span>
                </div>
              </div>
              <div className="bg-[#2c2c2c] p-3 rounded-lg shadow-md flex justify-between items-center w-full sm:w-full">
                <span className="text-lg font-bold text-gray-200">$30.00</span>
                <h3
                  onClick={togglePopup}
                  className="text-black bg-gray-200 flex gap-2 p-2 px-7 rounded-full font-bold text-md cursor-pointer hover:bg-gray-300"
                >
                  <span>
                    <BiPurchaseTagAlt className="mt-1" size={20} />
                  </span>
                  Book Now
                </h3>
              </div>
            </div>

            <div className="mt-0">
              <h3 className="text-2xl font-medium leading-7 text-white mb-6">
                About
              </h3>
              <p className="text-md font-medium leading-7 text-gray-400">
                Marco Castello è un musicista e cantautore siracusano. Col suo
                primo album “Contenta tu” (2021, Bubbles records/42 Records) si
                fa apprezzare in Italia e all’estero. Vanta numerose
                collaborazioni fra cui Erlend Oye & La Comitiva, Nu Genea,
                Fulminacci, Mace, Calibro 35. Particolarmente affezionato alle
                sonorità degli anni settanta, ricerca minuziosamente la
                naturalezza degli strumenti che suona, riducendo al massimo
                l’uso di effetti e post produzioni.
              </p>
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
                Alcazar Live
              </p>
              <p className="text-sm font-medium leading-7 text-gray-50">
                Via Cardinale Merry del Val, 14b, 00153 Roma RM, Italy
              </p>
              <div className="flex flex-wrap justify-start gap-4 mb-4 sm:flex-row mt-2">
                <div className="flex items-center justify-center rounded-md shadow-md">
                  <LuDoorOpen className="mr-1 text-gray-400" />
                  <p className="text-gray-500 text-md">
                    Doors Open{" "}
                    <span className="text-nowrap text-white text-lg">
                      8.00 PM GMT+1
                    </span>
                  </p>
                </div>
              </div>
              <hr className="my-12 border-t border-[#3f3f3f] w-5/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInfo;
