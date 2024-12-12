import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import url from "../../constants/url"
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { IoMdArrowDropdown } from "react-icons/io";
import { Loader } from 'rsuite';
import SidebarComponent from "../../components/layouts/SidebarComponent";

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const [showValidDates, setShowValidDates] = useState(false);
  const [limit, setLimit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [oragnizerId, setOragnizerId] = useState(null);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [venueName, setVenueName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("")
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('')
  const [minAge, setMinAge] = useState();
  const [agePrice, setAgePrice] = useState('')

  const [isEditSidebarVisible, setIsEditSidebarVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketName, setTicketName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [startSale, setStartSale] = useState("");
  const [endSale, setEndSale] = useState("");
  const [startValid, setStartValid] = useState("");
  const [endValid, setEndValid] = useState("");
  const [minLimit, setMinLimit] = useState("");
  const [maxLimit, setMaxLimit] = useState("")
  const [ticketDescription, setTicketDescription] = useState("");
  const [isExplore, setIsExplore] = useState(true);
  const [file, setFile] = useState(null);
  const [accountId, setAccountId] = useState("");

  const [isAddLoading, setIsAddLoading] = useState(false)

  const items = [
    ...(accountId
      ? [
        {
          label: 'Live Event',
          key: 'live',
        },
      ]
      : []),
    {
      label: 'Save as Draft',
      key: 'draft',
    },
  ];


  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedAccountID = localStorage.getItem("accountId");
      setAccountId(storedAccountID || "");
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

  const getPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleDescriptionChange = (value) => {
    setTicketDescription(value);
    console.log("Plain text:", getPlainText(value));
  };

  const handleAddTicket = () => {
    const newTicket = {
      ticketName, quantity, price, ticketDescription,
      startSale, endSale, showDates, startValid, endValid,
      showValidDates, limit, minLimit, maxLimit
    };
    setTickets([...tickets, newTicket]);
    setTicketName("");
    setQuantity("");
    setPrice("");
    setShowDates(false)
    setStartSale("")
    setEndSale("")
    setStartValid("")
    setEndValid("")
    setMinLimit("")
    setMaxLimit("")
    setLimit(false)
    setShowValidDates(false)
    setTicketDescription('')
    setIsSidebarVisible(false);
  };
  const handleEditClick = (ticket, index) => {
    setSelectedTicket({ ...ticket, index });
    setIsEditSidebarVisible(true);
  };
  const handleUpdateTicket = (index) => {
    const updatedTickets = tickets.map((ticket, i) =>
      i === index ? selectedTicket : ticket
    );
    setTickets(updatedTickets);
    setIsEditSidebarVisible(false);
  };
  const closeEditSidebar = () => {
    setIsEditSidebarVisible(false);
    setSelectedTicket(null);
  };

  const handleImageChange = (event) => {
    const file_upload = event.target.files[0];
    setFile(file_upload);

    if (file_upload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file_upload);
    }
  };
  const handleAddTicketClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };
  const handleCheckboxChange = () => {
    setShowDates(!showDates);
  };
  const handleCheckboxValidChange = () => {
    setShowValidDates(!showValidDates);
  };
  const handleLimitChange = () => {
    setLimit(!limit);
  };
  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  const formattedTickets = tickets.map((ticket) => ({
    ticket_name: ticket.ticketName,
    qty: ticket.quantity,
    price: ticket.price,
    sale_start: ticket.startSale,
    sale_end: ticket.endSale,
    valid_start: ticket.startValid,
    valid_end: ticket.endValid,
    min_count: ticket.minLimit,
    max_count: ticket.maxLimit,
    ticket_description: ticket.ticketDescription
  }));

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

  const handleAddEvent = async (isExplore) => {
    //e.preventDefault();

    const formData = new FormData();
    formData.append('organizer_id', oragnizerId);
    formData.append('event_name', name);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('open_time', openTime);
    formData.append('category', category);
    formData.append('venue_name', venueName);
    formData.append('address', address);
    formData.append('event_description', eventDescription);
    formData.append('flyer', file);
    formData.append('language', language);
    formData.append('duration', duration);
    formData.append('min_age', minAge);
    formData.append('min_age_ticket', agePrice);
    formData.append('ticket_start_price', startPrice);
    formData.append('font', "");
    formData.append('color', "");
    formData.append('explore', isExplore ? "YES" : "NO");

    formattedTickets.forEach((ticket, index) => {
      for (const key in ticket) {
        formData.append(`tickets[${index}][${key}]`, ticket[key]);
      }
    });

    try {
      setIsAddLoading(true)
      const response = await axios.post(`${url}/event/add-event`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Event added successfully!');
      window.location.href = "/org-event";
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add event. Please try again.');
    } finally {
      setIsAddLoading(false)
    }
  };

  const handleDeleteClick = (indexToDelete) => {
    setTickets((prevTickets) => prevTickets.filter((_, index) => index !== indexToDelete));
  }

  const handleMenuClick = ({ key }) => {
    if (key === 'live') {
      handleAddEvent(true);
    } else if (key === 'draft') {
      handleAddEvent(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarComponent />
      <div className="flex flex-col p-10">
        <div className="flex justify-between items-center">
          <a href="/org-event" className="text-xl font-semibold underline cursor-pointer">
            Cancel
          </a>

          {/* <button
            onClick={handleAddEvent}
            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            Create Event
          </button> */}
          <Dropdown
            className="bg-gray-300 text-black text-sm font-md py-1 px-2 rounded-md hover:bg-gray-400 transition-colors"
            menu={{
              items,
              onClick: handleMenuClick,
            }}
          >
            <button>
              <Space>
                {isAddLoading ? (
                  <>
                    Loading...
                  </>
                ) : (
                  <>
                    Create Event
                    <IoMdArrowDropdown />
                  </>
                )}
              </Space>
            </button>
          </Dropdown>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10 w-full max-w-6xl px-4">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  className="p-4 w-full bg-black rounded-md focus:outline-none text-white text-xl border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Enter Event Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-gray-400 mb-1 block">Start Date</label>
                  <input
                    type="datetime-local"
                    className="p-3 w-full bg-[#000] text-white rounded-md focus:outline-none border border-[#5d5d5d] focus:border-gray-400 shadow-lg shadow-[#3f3f3f] focus:shadow-md"
                    style={{
                      colorScheme: "dark",
                    }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-gray-400 mb-1 block">End Date</label>
                  <input
                    type="datetime-local"
                    className="p-3 w-full bg-[#000] text-white rounded-md focus:outline-none border border-[#5d5d5d] focus:border-gray-400 shadow-lg shadow-[#3f3f3f] focus:shadow-md"
                    style={{
                      colorScheme: "dark",
                    }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-gray-400 mb-1 block">Opening Time</label>
                  <input
                    type="time"
                    className="p-3 w-full bg-[#000] text-white rounded-md focus:outline-none border border-[#5d5d5d] focus:border-gray-400 shadow-lg shadow-[#3f3f3f] focus:shadow-md"
                    style={{
                      colorScheme: "dark",
                    }}
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-gray-400 mb-1 block">Starting Pirce ($)</label>
                  <input
                    type="number"
                    className="p-3 w-full bg-[#000] text-white rounded-md focus:outline-none border border-[#5d5d5d] focus:border-gray-400 shadow-lg shadow-[#3f3f3f] focus:shadow-md"
                    placeholder="Starting Price"
                    style={{
                      colorScheme: "dark",
                    }}
                    value={startPrice}
                    onChange={(e) => setStartPrice(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="p-3 w-full bg-black rounded-md focus:outline-none text-white border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Enter Venue Name"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="p-3 w-full bg-black rounded-md focus:outline-none text-white border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {/* <div className="flex items-center space-x-4 mt-10">
                <h1 className="text-white">Show Event on Explore</h1>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isExplore}
                    onChange={(e) => setIsExplore(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300"></div>
                  <div className="absolute inset-y-0 left-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                </label>
              </div> */}
              <div>
                <input
                  type="text"
                  className="p-3 w-full bg-black rounded-md focus:outline-none text-white border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Choose Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <ReactQuill
                  value={eventDescription}
                  onChange={setEventDescription}
                  className="h-72 text-white"
                  placeholder="Describe your event here..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex bg-black rounded-lg">
                <div className="w-[500px] h-[600px] bg-black rounded-md flex justify-center border border-gray-100 shadow-xl shadow-[#3e3e3e] items-center relative overflow-hidden transition-transform transform hover:scale-105">
                  {/* Text Overlay */}
                  <div className="absolute text-white text-xl font-semibold">
                    {selectedImage ? "" : "Upload Your Event Flyer"}
                  </div>

                  {/* Image */}
                  <img
                    src={
                      selectedImage ||
                      "https://cdn.photoroom.com/v1/assets-cached.jpg?path=backgrounds_v3/black/Photoroom_black_background_extremely_fine_texture_only_black_co_bc8c725e-7ec8-4d6b-b024-98be7544d757.jpg"
                    }
                    alt="Event"
                    className="object-cover w-full h-full"
                  />

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className={`px-72 mt-24 ${isSidebarVisible ? "filter blur-sm" : ""
              }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Tickets</h2>
              <button
                onClick={handleAddTicketClick}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-colors border border-gray-400"
              >
                + Add Ticket
              </button>
            </div>
            <hr className="border-t border-gray-600 mb-6" />
            <div className="mt-10 space-y-4">
              {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#1f1f1f] text-white p-4 rounded-lg shadow-lg"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{ticket.ticketName}</h3>
                      <p className="text-lg mt-3">${ticket.price}</p>
                      <p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: ticket.ticketDescription }}></p>
                    </div>
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => handleEditClick(ticket, index)}
                        className="bg-gray-300 text-black p-2 rounded-full hover:bg-gray-400 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(index)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 mt-10">
                  No tickets are available.
                </div>
              )}
            </div>

          </div>

          {isSidebarVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"></div>
          )}

          {isSidebarVisible && (
            <div className="fixed right-0 top-0 w-[800px] h-full bg-[#131313] p-6 shadow-xl z-50 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Add Ticket</h2>
                <button
                  onClick={closeSidebar}
                  className="text-white text-xl hover:text-gray-400"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="mb-4">
                <label className="text-gray-400">Ticket Name</label>
                <input
                  type="text"
                  className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                  placeholder="Enter Ticket Name"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="text-gray-400">Quantity</label>
                  <input
                    type="number"
                    className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-gray-400">Price</label>
                  <input
                    type="text"
                    className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                    placeholder="Enter ticket price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4 mt-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="showDates"
                      className="w-5 h-5"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="showDates" className="text-gray-400">
                      Sale Period
                    </label>
                  </div>
                  {showDates && (
                    <div className="flex space-x-4">
                      <div>
                        <label className="text-gray-400">Start Date</label>
                        <input
                          type="date"
                          className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                          value={startSale}
                          onChange={(e) => setStartSale(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-gray-400">End Date</label>
                        <input
                          type="date"
                          className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                          value={endSale}
                          onChange={(e) => setEndSale(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-4 mt-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="showValidDates"
                        className="w-5 h-5"
                        onChange={handleLimitChange}
                      />
                      <label htmlFor="showValidDates" className="text-gray-400">
                        Ticket Purchase limit
                      </label>
                    </div>
                    {limit && (
                      <div className="flex space-x-4">
                        <div>
                          <label className="text-gray-400">Minimum</label>
                          <input
                            type="number"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                            value={minLimit}
                            onChange={(e) => setMinLimit(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">Maximum</label>
                          <input
                            type="number"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                            value={maxLimit}
                            onChange={(e) => setMaxLimit(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <label className="text-gray-400">Decription</label>
              <div className="mb-4 mt-3">
                <ReactQuill
                  value={ticketDescription}
                  onChange={handleDescriptionChange}
                  className="h-72 text-white"
                  placeholder="Describe your event here..."
                />
              </div>
              <div className="flex justify-end mt-20">
                <button onClick={handleAddTicket} className="bg-[#1e1e1e] text-white border border-gray-400 py-4 px-6 rounded-full transition-colors">
                  Add Ticket
                </button>
              </div>
            </div>
          )}

          {isEditSidebarVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"></div>
          )}

          {isEditSidebarVisible && (
            <div className="fixed right-0 top-0 w-[800px] h-full bg-[#131313] p-6 shadow-xl z-50 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Edit Ticket</h2>
                <button
                  onClick={closeEditSidebar}
                  className="text-white text-xl hover:text-gray-400"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="mb-4">
                <label className="text-gray-400">Ticket Name</label>
                <input
                  type="text"
                  className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                  placeholder="Enter Ticket Name"
                  value={selectedTicket.ticketName || ""}
                  onChange={(e) => setSelectedTicket((prev) => ({ ...prev, ticketName: e.target.value }))}
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="text-gray-400">Quantity</label>
                  <input
                    type="number"
                    className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                    placeholder="Enter quantity"
                    value={selectedTicket.quantity || ""}
                    onChange={(e) => setSelectedTicket((prev) => ({ ...prev, quantity: e.target.value }))}
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-gray-400">Price</label>
                  <input
                    type="text"
                    className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                    placeholder="Enter ticket price"
                    value={selectedTicket.price || ""}
                    onChange={(e) => setSelectedTicket((prev) => ({ ...prev, price: e.target.value }))}
                  />
                </div>
              </div>
              <div className="mb-4 mt-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="showDates"
                      className="w-5 h-5"
                      onChange={() =>
                        setSelectedTicket((prev) => ({
                          ...prev,
                          showDates: !prev.showDates,
                        }))
                      }
                      checked={selectedTicket?.showDates || false}
                    />
                    <label htmlFor="showDates" className="text-gray-400">Sale Period</label>
                  </div>
                  {selectedTicket.showDates && (
                    <div className="flex space-x-4">
                      <div>
                        <label className="text-gray-400">Start Date</label>
                        <input
                          type="date"
                          className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                          value={selectedTicket.startSale || ""}
                          onChange={(e) => setSelectedTicket((prev) => ({ ...prev, startSale: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-gray-400">End Date</label>
                        <input
                          type="date"
                          className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                          value={selectedTicket.endSale || ""}
                          onChange={(e) => setSelectedTicket((prev) => ({ ...prev, endSale: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-4 mt-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="showValidDates"
                        className="w-5 h-5"
                        onChange={() =>
                          setSelectedTicket((prev) => ({
                            ...prev,
                            limit: !prev.limit,
                          }))
                        }
                        checked={selectedTicket?.limit || false}
                      />
                      <label htmlFor="showValidDates" className="text-gray-400">
                        limit Purchase only
                      </label>
                    </div>
                    {selectedTicket.limit && (
                      <div className="flex space-x-4">
                        <div>
                          <label className="text-gray-400">Minimum</label>
                          <input
                            type="number"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                            value={selectedTicket.minLimit || ""}
                            onChange={(e) => setSelectedTicket((prev) => ({ ...prev, minLimit: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">Maximum</label>
                          <input
                            type="number"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                            value={selectedTicket.maxLimit || ""}
                            onChange={(e) => setSelectedTicket((prev) => ({ ...prev, maxLimit: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <label className="text-gray-400">Decription</label>
              <div className="mb-4 mt-3">
                <ReactQuill
                  value={selectedTicket?.ticketDescription || ""}
                  onChange={(text) => setSelectedTicket((prev) => ({ ...prev, ticketDescription: text }))}
                  className="h-72 text-white"
                  placeholder="Describe your event here..."
                />
              </div>
              <div className="flex justify-end mt-20">
                <button onClick={() => handleUpdateTicket(selectedTicket.index)} className="bg-[#1e1e1e] text-white border border-gray-400 py-4 px-6 rounded-full transition-colors">
                  Update Ticket
                </button>
              </div>
            </div>
          )}
        </div>
        {/* <div className="flex justify-center items-center bg-black text-white p-4">
          <div className="w-full max-w-3xl bg-black rounded-lg shadow-md p-6">
            <div
              className="flex justify-between items-center cursor-pointer mb-4 border-b border-gray-600 pb-2"
              onClick={toggleSection}
            >
              <span className="text-lg font-semibold">Additional Information</span>
              <span
                className={`transform transition-transform ${isOpen ? 'rotate-180' : ''
                  }`}
              >
                ▲
              </span>
            </div>
            {isOpen && (
              <>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      id="language"
                      placeholder="Language"
                      className="w-full bg-black text-white border border-gray-600 p-2 rounded-md focus:outline-none"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="duration"
                      placeholder="Duration of event"
                      className="w-full bg-black text-white border border-gray-600 p-2 rounded-md focus:outline-none"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      id="language"
                      placeholder="Minimum Age Limit"
                      className="w-full bg-black text-white border border-gray-600 p-2 rounded-md focus:outline-none"
                      value={minAge}
                      onChange={(e) => setMinAge(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="duration"
                      placeholder="Minimum Age Ticket Price"
                      className="w-full bg-black text-white border border-gray-600 p-2 rounded-md focus:outline-none"
                      value={agePrice}
                      onChange={(e) => setAgePrice(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Create;
