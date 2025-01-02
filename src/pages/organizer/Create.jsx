import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import url from "../../constants/url"
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { IoMdArrowDropdown } from "react-icons/io";
import { Loader } from 'rsuite';
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { X, ChevronDown } from 'lucide-react';
import { useParams } from "react-router-dom";
import ImageCropper from '../../components/features/Events/ImageCropper';

const Create = () => {
  const { type } = useParams()
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
  const [tax, setTax] = useState("");
  const [errorTax, setErrorTax] = useState('');
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
  const [isShow, setIsShow] = useState(true);
  const [file, setFile] = useState(null);
  const [accountId, setAccountId] = useState("");

  const [isAddLoading, setIsAddLoading] = useState(false)
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const inputWrapperRef = useRef(null);
  const [members, setMembers] = useState([]);

  const suggestions = members.map(member => member.name);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [isCropperVisible, setCropperVisible] = useState(false);

  const [showInputs, setShowInputs] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState({
    line_name: "",
    line_profile_photo: null,
    line_instagram_link: "",
    line_time: "",
  });
  const [files, setFiles] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleTaxChange = (e) => {
    const value = e.target.value;
    if (parseFloat(value) > 9.56) {
      setTax('9.56'); 
      setError("Tax can't be greater than 9.56");
    } else {
      setTax(value);
      setError('');
    }
  };

  const handleLineChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        line_profile_photo: file,
      }));
    }
  };

  const handleAddOrUpdateProfile = () => {
    if (isEditing) {
      setProfiles((prevProfiles) =>
        prevProfiles.map((p, index) =>
          index === editIndex ? profile : p
        )
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setProfiles((prevProfiles) => [...prevProfiles, profile]);
    }
    setProfile({
      line_name: "",
      line_profile_photo: null,
      line_instagram_link: "",
      line_time: "",
    });
    setFiles(null);
  };

  const handleEditProfile = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    const selectedProfile = profiles[index];
    setProfile({
      line_name: selectedProfile.line_name,
      line_profile_photo: selectedProfile.line_profile_photo,
      line_instagram_link: selectedProfile.line_instagram_link,
      line_time: selectedProfile.line_time,
    });
  };

  const handleDeleteProfile = (index) => {
    setProfiles((prevProfiles) => prevProfiles.filter((_, i) => i !== index));
  };


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

    if (file_upload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setCropperVisible(true);
      };
      reader.readAsDataURL(file_upload);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    if (!dataurl || !dataurl.startsWith("data:image/")) {
      console.error("Invalid data URL:", dataurl);
      return null;
    }

    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const blobURLToFile = async (blobURL, filename) => {
    try {
      const response = await fetch(blobURL);
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error("Error converting blob URL to file:", error);
      return null;
    }
  };

  const handleCropDone = async (croppedImage) => {
    console.log("Cropped Image:", croppedImage);
    try {
      let croppedFile;
      if (croppedImage.startsWith("data:image/")) {
        croppedFile = dataURLtoFile(croppedImage, 'cropped-image.webp');
      } else if (croppedImage.startsWith("blob:")) {
        croppedFile = await blobURLToFile(croppedImage, 'cropped-image.webp');
      }
      if (croppedFile) {
        setFile(croppedFile);
        setSelectedImage(URL.createObjectURL(croppedFile));
      } else {
        console.error("Failed to handle cropped image");
      }
    } catch (error) {
      console.error("Error handling cropped image:", error);
    }
    setCropperVisible(false);
  };

  const handleCropCancel = () => {
    setCropperVisible(false);
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

  const formattedLineUp = profiles.map((ticket) => ({
    name: ticket.line_name,
    instagram_link: ticket.line_instagram_link,
    time: ticket.line_time,
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
    formData.append('event_type', type);
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
    formData.append('tax', tax);
    formData.append('explore', isExplore ? "YES" : "NO");
    formData.append('show', isShow ? "YES" : "NO");

    formattedTickets.forEach((ticket, index) => {
      for (const key in ticket) {
        formData.append(`tickets[${index}][${key}]`, ticket[key]);
      }
    });

    tags.forEach((tag, index) => {
      formData.append(`members[${index}]`, tag.id);
    });

    formattedLineUp.forEach((line, index) => {
      for (const key in line) {
        formData.append(`social_profiles[${index}][${key}]`, line[key]);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const newSuggestions = members.map(member => member.name);
    setFilteredSuggestions(newSuggestions);
  }, [members]);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setInput(userInput);

    const filtered = suggestions.filter(
      suggestion => suggestion.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const addTag = (tag) => {
    const memberData = members.find(member => member.name === tag);
    if (memberData && !tags.some(t => t.name === tag)) {
      setTags([...tags, {
        name: tag,
        id: memberData._id
      }]);
    }
    setInput('');
    setFilteredSuggestions(suggestions);
  };

  const removeTag = (tagName) => {
    setTags(tags.filter(tag => tag.name !== tagName));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      const matchedSuggestion = suggestions.find(
        suggestion => suggestion.toLowerCase() === input.toLowerCase()
      );
      if (matchedSuggestion) {
        addTag(matchedSuggestion);
      }
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1].name);
    }
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${url}/member/get-organizer-member/${oragnizerId}`);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [oragnizerId]);

  return (
    <div className="min-h-screen bg-black text-white">
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
                {type !== 'rsvp' && (
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
                )}
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
                <h1 className="text-white">Show Attendes on Page</h1>
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
              <div className="flex items-center space-x-4 mt-10">
                <h1 className="text-white">Show Attendes on Page</h1>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isShow}
                    onChange={(e) => setIsShow(e.target.checked)}
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
              <div>
                <input
                  type="text"
                  className="p-3 w-full bg-black rounded-md focus:outline-none text-white border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Enter Tax in % (Optional)"
                  value={tax}
                  onChange={handleTaxChange}
                />
                <p className="text-gray-500 mt-2">
                  Tax should not be greater than 9.56%
                </p>
              </div>
              <div className="w-full" ref={wrapperRef}>
                <div className="border rounded-lg p-2 bg-black">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                      >
                        {tag.name}
                        <button
                          onClick={() => removeTag(tag.name)}
                          className="hover:text-blue-600 focus:outline-none"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <div ref={inputWrapperRef} className="relative flex-1">
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={input}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          onFocus={() => setShowSuggestions(true)}
                          className="w-full min-w-[120px] outline-none bg-black"
                          placeholder={tags.length === 0 ? "Add members..." : ""}
                        />
                        <button
                          onClick={toggleSuggestions}
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <ChevronDown
                            size={20}
                            className={`transform transition-transform ${showSuggestions ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                      {showSuggestions && (
                        <div className="absolute left-0 right-0 mt-1 bg-black border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                          {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                                onClick={() => addTag(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-gray-500">No members found</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-4">
                <ReactQuill
                  value={eventDescription}
                  onChange={setEventDescription}
                  className="h-72 text-white"
                  placeholder="Describe your event here..."
                />
              </div>
              <div className="mb-4 py-10">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={(e) => setShowInputs(e.target.checked)}
                  />
                  <span>Add Social Profile</span>
                </label>
              </div>

              {showInputs && (
                <div className="space-y-4 border p-4 rounded-lg mb-4">
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      name="line_name"
                      value={profile.line_name}
                      onChange={handleLineChange}
                      placeholder="Name"
                      className="border p-2 rounded bg-black text-white"
                    />
                    <input
                      type="file"
                      name="line_profile_photo"
                      onChange={handleFileChange}
                      className="border p-2 rounded bg-black text-white"
                    />
                    <input
                      type="text"
                      name="line_instagram_link"
                      value={profile.line_instagram_link}
                      onChange={handleLineChange}
                      placeholder="Instagram Link"
                      className="border p-2 rounded bg-black text-white"
                    />
                    <input
                      type="time"
                      name="line_time"
                      value={profile.line_time}
                      onChange={handleLineChange}
                      className="border p-2 rounded bg-black text-white"
                    />
                  </div>
                  <button
                    onClick={handleAddOrUpdateProfile}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {isEditing ? "Update Profile" : "Add Profile"}
                  </button>
                </div>
              )}

              {/* Display added profiles */}
              <div className="grid grid-cols-2 gap-4">
                {profiles.map((p, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow-md flex flex-col items-start"
                  >
                    <h3 className="font-bold">{p.line_name}</h3>
                    {p.line_profile_photo && (
                      <img
                        src={
                          p.line_profile_photo instanceof File
                            ? URL.createObjectURL(p.line_profile_photo)
                            : p.line_profile_photo
                        }
                        alt={`${p.line_name} profile`}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    )}
                    <p>
                      Instagram:{" "}
                      <a
                        href={p.line_instagram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {p.line_instagram_link}
                      </a>
                    </p>
                    <p>Time: {p.line_time}</p>
                    <div className="space-x-2 mt-2">
                      <button
                        onClick={() => handleEditProfile(index)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProfile(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="space-y-4">

              <div className="flex bg-black rounded-lg">
                {isCropperVisible ? (
                  <ImageCropper
                    image={selectedImage}
                    onCropDone={handleCropDone}
                    onCropCancel={handleCropCancel}
                  />
                ) : (
                  <div className="w-[500px] h-[600px] bg-black rounded-md flex justify-center border border-gray-100 shadow-xl shadow-[#3e3e3e] items-center relative overflow-hidden transition-transform transform hover:scale-105">
                    <div className="absolute text-white text-xl font-semibold">
                      {selectedImage ? "" : "Upload Your Event Flyer"}
                    </div>
                    <img
                      src={
                        selectedImage ||
                        "https://cdn.photoroom.com/v1/assets-cached.jpg?path=backgrounds_v3/black/Photoroom_black_background_extremely_fine_texture_only_black_co_bc8c725e-7ec8-4d6b-b024-98be7544d757.jpg"
                      }
                      alt="Event"
                      className="object-cover w-full h-full"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
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
                      {type !== 'rsvp' && (
                        <p className="text-lg mt-3">${ticket.price}</p>
                      )}
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
                {
                  type !== 'rsvp' && (
                    <>
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
                    </>
                  )
                }
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
                {
                  type !== 'rsvp' && (
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
                  )
                }
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
