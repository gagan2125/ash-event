import { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css";

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const [showValidDates, setShowValidDates] = useState(false);
  const [limit, setLimit] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold underline cursor-pointer">
            Cancel
          </h1>

          <a
            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            href="/org-event"
          >
            Create Event
          </a>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10 w-full max-w-6xl px-4">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  className="p-4 w-full bg-black rounded-md focus:outline-none text-white text-xl border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Enter Event Title"
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
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  className="p-3 w-full bg-black rounded-md focus:outline-none text-white border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Enter Venue Name"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="p-3 w-full bg-black rounded-md focus:outline-none text-white border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Enter Address"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="p-3 w-full bg-black rounded-md focus:outline-none text-white border border-[#5d5d5d] focus:border-[#ccc] shadow-lg shadow-[#3f3f3f] focus:shadow-md focus:shadow-white"
                  placeholder="Choose Category"
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
            className={`px-72 mt-24 ${
              isSidebarVisible ? "filter blur-sm" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Tickets</h2>
              <button
                onClick={handleAddTicketClick} // Trigger toggle when button is clicked
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-colors border border-gray-400"
              >
                + Add Ticket
              </button>
            </div>
            <hr className="border-t border-gray-600 mb-6" />
            <div className="flex items-center bg-[#1f1f1f] text-white p-4 rounded-lg shadow-lg">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">VIP Ticket</h3>
                <p className="text-lg mt-3">$50</p>
              </div>
              <div className="ml-4">
                <button className="bg-gray-300 text-black p-2 rounded-full hover:bg-gray-400 transition-colors">
                  <FaEdit />
                </button>
              </div>
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
                <label className="text-gray-400">Name</label>
                <input
                  type="text"
                  className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="text-gray-400">Quantity</label>
                  <input
                    type="number"
                    className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-gray-400">Price</label>
                  <input
                    type="text"
                    className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                    placeholder="Enter ticket price"
                  />
                </div>
              </div>
              <div className="mb-4 mt-10">
                {/* Sale Period Section */}
                <div className="flex items-center justify-between">
                  {/* Checkbox and Label */}
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
                  {/* Date Inputs */}
                  {showDates && (
                    <div className="flex space-x-4">
                      <div>
                        <label className="text-gray-400">Start Date</label>
                        <input
                          type="date"
                          className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400">End Date</label>
                        <input
                          type="date"
                          className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
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
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">End Date</label>
                          <input
                            type="date"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
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
                            type="date"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">Maximum</label>
                          <input
                            type="date"
                            className="w-full p-3 mt-2 bg-[#131313] text-white rounded-md border border-gray-800"
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
                  value={eventDescription}
                  onChange={setEventDescription}
                  className="h-72 text-white"
                  placeholder="Describe your event here..."
                />
              </div>
              <div className="flex justify-end mt-20">
                <button className="bg-[#1e1e1e] text-white border border-gray-400 py-4 px-6 rounded-full transition-colors">
                  Add Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
