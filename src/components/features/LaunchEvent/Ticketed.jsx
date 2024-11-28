/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { BackgroundBeams } from "../../ui/BeamBackground";
import { useState } from "react";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import the CSS for the editor

const Ticketed = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [image, setImage] = useState(null);
  const [eventDescription, setEventDescription] = useState(""); // State for text editor
  const [eventTitle, setEventTitle] = useState(""); // State for event title

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex justify-center bg-primary">
      <BackgroundBeams className="absolute inset-0 w-full h-full" />
      <div className="bg-primary shadow-lg rounded-lg p-8 flex flex-col md:flex-row space-y-6 md:space-y-0 w-full max-w-7xl mt-5 z-10">
        <div className="flex-1 flex flex-col md:space-x-28">
          <h2 className="text-white text-xl mb-4 font-bold md:mx-28">Flyer</h2>
          <div className="relative w-full h-[400px] max-w-[300px] border-2 border-gray-300 rounded-md overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Selected"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <span>Click to add Flyer</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col space-y-6">
          <div className="border-b border-gray-300 pb-4">
            <h2 className="text-white text-2xl mb-4 font-bold">
              Event Details
            </h2>

            {/* Event Title Input */}
            <textarea
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="block w-full h-20 rounded-md border py-3 px-4 border-gray-300 bg-primary text-gray-200 outline-none placeholder:text-gray-400 
             shadow-md focus:shadow-orange-500 transition duration-200 ease-in-out focus:border-red-600"
            />

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <input
                type="text"
                placeholder="Venue Name"
                className="block w-full rounded-md border border-gray-300 py-4 px-4 text-gray-200 bg-primary outline-none placeholder:text-gray-400 shadow-md focus:shadow-orange-500 transition duration-200 ease-in-out focus:border-red-600"
              />
              <input
                type="text"
                placeholder="Address"
                className="block w-full rounded-md border border-gray-300 py-4 px-4 text-gray-200 bg-primary outline-none placeholder:text-gray-400 shadow-md focus:shadow-orange-500 transition duration-200 ease-in-out focus:border-red-600"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
              <div className="flex-1">
                <a className="text-white mb-2 block" htmlFor="start-date">
                  Start Date
                </a>
                <input
                  type="date"
                  id="start-date" // Added an id for better accessibility
                  className="block w-full rounded-md border border-gray-300 py-4 px-4 text-gray-200 bg-primary outline-none placeholder:text-gray-400 shadow-md focus:shadow-orange-500 transition duration-200 ease-in-out focus:border-red-600"
                />
              </div>
              <div className="flex-1">
                <a className="text-white mb-2 block" htmlFor="end-date">
                  End Date
                </a>
                <input
                  type="date"
                  id="end-date" // Added an id for better accessibility
                  className="block w-full rounded-md border border-gray-300 py-4 px-4 text-gray-200 bg-primary outline-none placeholder:text-gray-400 shadow-md focus:shadow-orange-500 transition duration-200 ease-in-out focus:border-red-600"
                />
              </div>
            </div>
          </div>

          {/* Text Editor Area */}
          <div className="border-b border-gray-300 pb-4">
            <ReactQuill
              value={eventDescription}
              onChange={setEventDescription}
              className="h-72 text-white" // Adjusted height for better usability
              placeholder="Describe your event here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticketed;
