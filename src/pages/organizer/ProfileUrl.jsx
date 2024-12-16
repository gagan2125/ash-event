import React, { useEffect, useState } from "react";
import SimilarEvent from "../../components/features/Events/SimilarEvent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import url from "../../constants/url";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";


const ProfileUrl = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [organizer, setOrganizer] = useState({});
  const [events, setEvents] = useState([]);

  const fetchOrganizer = async () => {
    if (id) {
      try {
        const response = await axios.get(`${url}/get-organizer/${id}`);
        setOrganizer(response.data);
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    } else {
      console.log("not found")
    }
  };

  const fetchEvents = async () => {
    if (id) {
      try {
        const response = await axios.get(`${url}/event/get-event-by-organizer-id/${id}`);
        setEvents(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    } else {
      console.log("not found")
    }
  }

  useEffect(() => {
    if (id) {
      fetchOrganizer();
      fetchEvents()
    }
  }, [id]);

  const handleDetail = (id, name) => {
    navigate(`/event/${name}`, {
      state: { id: id },
    });
  };

  return (
    <div className="mx-auto bg-black px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-start justify-between bg-black p-2 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              src={organizer.profile_image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border-4 border-gray-700"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{organizer.name || ""}</h1>
            <div className="flex space-x-3 mt-2">
              <a
                href={organizer.instagram === 'undefined' ? "#" : organizer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600"
              >
                <FaInstagram />
              </a>
              <a
                href={organizer.twitter === 'undefined' ? "#" : organizer.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                <FaXTwitter />
              </a>
              <a
                href={organizer.website === 'undefined' ? "#" : organizer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600"
              >
                <TbWorldWww />
              </a>
            </div>
          </div>
        </div>

        <div className="text-white text-center">
          <div className="flex justify-center space-x-8">
            <div>
              <h2 className="text-xl font-bold">{events.length}</h2>
              <p className="text-sm font-medium">Events</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">{events.filter((event) => event.explore === "YES").length}</h2>
              <p className="text-sm font-medium">Live</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">{events.filter((event) => event.explore === "NO").length}</h2>
              <p className="text-sm font-medium">Past</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-2">
          <p className="text-md font-medium text-white py-2 text-left">
            {organizer.bio === "undefined" ? "" : organizer.bio}
          </p>
        </div>
      </div>
      <div className="relative w-full h-56 sm:h-64 lg:h-96 mt-5">
        <img
          src={`${organizer.cover_image}`}
          alt="Banner"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-8">
        <div className="bg-black py-6 px-4 sm:px-8 lg:px-16">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Live Events
          </h2>
          <div className="flex flex-col items-center justify-center">
            {events.filter((event) => event.explore === "YES").length > 0 ? (
              <div
                className="flex overflow-x-auto space-x-4 hide-scrollbar"
              >
                {events
                  .filter((event) => event.explore === "YES")
                  .map((event) => (
                    <button
                      onClick={() => handleDetail(event._id, event.event_name.replace(/\s+/g, "-"))}
                      key={event._id}
                      className="flex-none w-80 sm:w-96 bg-black rounded-lg shadow-lg p-4"
                    >
                      <img
                        src={event.flyer}
                        alt={event.event_name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="mt-4 text-start">
                        <h3 className="text-lg font-semibold text-white">
                          {event.event_name}
                        </h3>
                        <p className="text-sm text-gray-300">{event.start_date}</p>
                        <p className="text-sm text-gray-300">{event.venue_name}</p>
                      </div>
                    </button>
                  ))}
              </div>
            ) : (
              <div className="text-center text-white mt-10">
                <h2 className="text-xl font-bold">No live events are available</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-black py-6 px-4 sm:px-8 lg:px-16">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Past Events
          </h2>
          <div className="flex flex-col items-center justify-center">
            {events.filter((event) => event.explore === "NO").length > 0 ? (
              <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
                {events
                  .filter((event) => event.explore === "NO")
                  .map((event) => (
                    <button
                      onClick={() => handleDetail(event._id, event.event_name.replace(/\s+/g, "-"))}
                      key={event._id}
                      className="flex-none w-80 sm:w-96 bg-black rounded-lg shadow-lg p-4"
                    >
                      <img
                        src={event.flyer}
                        alt={event.event_name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="mt-4 text-start">
                        <h3 className="text-lg font-semibold text-white">
                          {event.event_name}
                        </h3>
                        <p className="text-sm text-gray-300">{event.start_date}</p>
                        <p className="text-sm text-gray-300">{event.venue_name}</p>
                      </div>
                    </button>
                  ))}
              </div>
            ) : (
              <div className="text-center text-white mt-10">
                <h2 className="text-xl font-bold">No past events are available</h2>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileUrl;
