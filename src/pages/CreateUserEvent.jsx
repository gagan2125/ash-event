import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import url from "../constants/url"

const CreateUserEvent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const [showValidDates, setShowValidDates] = useState(false);
  const [limit, setLimit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [orgModal, setOrgModal] = useState(false);

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
  const [isExplore, setIsExplore] = useState(false);

  const [userSeverId, setUserServerId] = useState("")
  const [userOragnizerId, setUserOragnizerId] = useState("")
  const [userId, setUserId] = useState(null);
  const [oragnizerId, setOragnizerId] = useState(null);
  const [file, setFile] = useState(null);

  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    countryCode: '+1',
    phoneNumber: '',
    otp: '',
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const numberWithCode = formData.countryCode + formData.phoneNumber;

  const handleNextStep = async () => {
    if (step === 1 && !otpSent) {
      try {
        const response = await axios.post(`${url}/auth/send-otp`, { phoneNumber: numberWithCode });
        if (response.data.success) {
          setOtpSent(true);
        } else {
          alert('Error', response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert('Failed to send OTP');
      }

    } else if (otpSent) {
      try {
        const response = await axios.post(`${url}/auth/verify-otp`, { phoneNumber: numberWithCode, otp: formData.otp });

        if (response.data.success) {
          const { userID, authToken } = response.data;
          setUserServerId(userID)

          if (userID && authToken) {
            localStorage.setItem('userID', userID);
            localStorage.setItem('authToken', authToken);
            setStep(2);
          } else {
            alert('Error', 'Invalid response data from server.');
          }
        } else {
          alert('Error', response.data.message);
        }
      } catch (error) {
        console.error('Verification failed:', error);
        alert('Failed to login');
      }
    }
  };

  const handleFinish = async () => {
    try {
      const basicInfoResponse = await axios.post(`${url}/auth/basic-info/${userSeverId}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });

      if (basicInfoResponse.data.success) {
        const connectedAccountResponse = await axios.post(`${url}/create-connected-account`, {
          name: formData.businessName,
          userId: userSeverId
        });

        if (connectedAccountResponse.data.success) {
          const { accountLink, organizerId } = connectedAccountResponse.data;
          setUserOragnizerId(organizerId);
          localStorage.setItem('organizerId', organizerId);
          localStorage.setItem('accountLink', accountLink);

          alert("Success", "Profile Created Successfully!");
          setTimeout(() => {
            handleAddEvent();
          }, 500);
          setStep(0);
        } else {
          alert("Error", connectedAccountResponse.data.message || "Failed to create connected account!");
          console.log("error of connect")
        }
      } else {
        alert("Error", basicInfoResponse.data.message || "Failed to update profile!");
        console.log("error of basic")
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error", "An error occurred. Please try again.");
    }
  };

  const handleOrgModal = () => {
    setOrgModal(true)
  }

  const handleOrgFinish = async () => {
    try {
      const response = await axios.post(`${url}/create-connected-account`, {
        name: formData.businessName,
        userId: userId
      });
      if (response.data.success) {
        const { accountLink, organizerId } = response.data;
        setUserOragnizerId(organizerId);
        localStorage.setItem('organizerId', organizerId);
        localStorage.setItem('accountLink', accountLink);

        alert("Profile Created Successfully!");
        setOrgModal(false)
        setOragnizerId(organizerId)
      } else {
        alert("Error", response.data.message || "Failed to create connected account!");
        console.log("error of connect")
      }
    } catch (error) {
      console.error('Adding Organizer:', error);
    }
  }


  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedUserId = localStorage.getItem('userID');
      const storedUserOrganizerId = localStorage.getItem('organizerId');
      setUserId(storedUserId);
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
  }, [userOragnizerId]);

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

  const handleAddEvent = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col p-10">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-semibold underline cursor-pointer">
            Cancel
          </a>

          {
            !userId && !oragnizerId ? (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Create Event
                </button>
              </>
            ) : userId && !oragnizerId ? (
              <>
                <button
                  onClick={handleOrgModal}
                  className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Create Event
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAddEvent}
                  className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Create Event
                </button>
              </>
            )
          }
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
              <div className="flex items-center space-x-4 mt-10 hidden">
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
              </div>
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
                    </div>
                    <div className="ml-4">
                      <button onClick={() => handleEditClick(ticket, index)} className="bg-gray-300 text-black p-2 rounded-full hover:bg-gray-400 transition-colors">
                        <FaEdit />
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
                        onChange={handleCheckboxValidChange}
                      />
                      <label htmlFor="showValidDates" className="text-gray-400">
                        Validity Period
                      </label>
                    </div>
                    {showValidDates && (
                      <div className="flex space-x-4">
                        <div>
                          <label className="text-gray-400">Start Date</label>
                          <input
                            type="date"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                            value={startValid}
                            onChange={(e) => setStartValid(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">End Date</label>
                          <input
                            type="date"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                            value={endValid}
                            onChange={(e) => setEndValid(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
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
                        limit Purchase only
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
                            showValidDates: !prev.showValidDates,
                          }))
                        }
                        checked={selectedTicket?.showValidDates || false}
                      />
                      <label htmlFor="showValidDates" className="text-gray-400">
                        Validity Period
                      </label>
                    </div>
                    {selectedTicket.showValidDates && (
                      <div className="flex space-x-4">
                        <div>
                          <label className="text-gray-400">Start Date</label>
                          <input
                            type="date"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                            value={selectedTicket.startValid || ""}
                            onChange={(e) => setSelectedTicket((prev) => ({ ...prev, startValid: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">End Date</label>
                          <input
                            type="date"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                            value={selectedTicket.endValid || ""}
                            onChange={(e) => setSelectedTicket((prev) => ({ ...prev, endValid: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
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
        <div className="flex justify-center items-center bg-black text-white p-4">
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
        </div>
        <div className={step > 0 ? 'blur-background' : ''}>
          {step > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-black w-full max-w-lg p-6 rounded-lg shadow-lg relative border border-gray-600">
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Login</h2>
                    <div className="flex gap-2 mb-4">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="border-b outline-none border-gray-800 p-2 w-1/3 bg-black"
                      >
                        <option value="+1">+1</option>
                        <option value="+91">+91</option>
                        <option value="+44">+44</option>
                      </select>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="border-b outline-none border-gray-800 p-2 flex-1 bg-black"
                      />
                      <button
                        onClick={handleNextStep}
                        className="bg-gray-500 text-white font-semibold px-4 rounded-md hover:bg-gray-600 transition-colors"
                      >
                        OTP
                      </button>
                    </div>
                    {otpSent && (
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        className="border-b outline-none border-gray-800 p-2 w-full mb-4 bg-black"
                      />
                    )}
                    {otpSent && (
                      <button
                        onClick={handleNextStep}
                        className="bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors w-full"
                      >
                        Login
                      </button>
                    )}
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Basic Details</h2>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email ID"
                      className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4"
                    />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleFinish}
                        className="bg-green-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                      >
                        Finish & Create Event
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <>
                    <button
                      onClick={() => setStep(0)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                      ✖
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          {orgModal && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-black w-full max-w-lg p-6 rounded-lg shadow-lg relative border border-gray-600">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Business Details</h2>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleOrgFinish}
                        className="bg-green-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                      >
                        Finish & Create Event
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setOrgModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default CreateUserEvent;
