import { MdLocationOn, MdDateRange, MdAttachMoney } from "react-icons/md";
import url from "../../../constants/url";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}/event/get-event`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const time = date.toTimeString().slice(0, 5); // Extract HH:mm
    return `${day} ${month} ${year} ${time}`;
  };

  const handleDetail = (id, name) => {
    navigate(`/event/${name}`, {
      state: { id: id },
    });
  };

  // const events = [
  //   {
  //     imgUrl:
  //       "https://dice-media.imgix.net/attachments/2024-10-11/0c695299-9be0-4a1a-b12f-bba7432a0453.jpg?rect=0%2C0%2C1200%2C1200&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1g",
  //     title: "Music Concert",
  //     date: "Sat, Oct 28",
  //     venue: "Central Park",
  //     price: "$50",
  //   },
  //   {
  //     imgUrl:
  //       "https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
  //     title: "Art Exhibition",
  //     date: "Fri, Nov 10",
  //     venue: "City Gallery",
  //     price: "$25",
  //   },
  //   {
  //     imgUrl:
  //       "https://dice-media.imgix.net/attachments/2024-10-02/98028c4b-3487-443d-b7a6-74f16099edef.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
  //     title: "Food Festival",
  //     date: "Sun, Nov 12",
  //     venue: "Town Square",
  //     price: "$15",
  //   },
  //   {
  //     imgUrl:
  //       "https://dice-media.imgix.net/attachments/2024-10-14/58f3f487-b230-4449-ab50-8cc7e690f48f.jpg?rect=0%2C0%2C2000%2C2000&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1g",
  //     title: "Tech Meetup",
  //     date: "Wed, Nov 15",
  //     venue: "Tech Hub",
  //     price: "Free",
  //   },
  //   {
  //     imgUrl:
  //       "https://dice-media.imgix.net/attachments/2024-10-14/58f3f487-b230-4449-ab50-8cc7e690f48f.jpg?rect=0%2C0%2C2000%2C2000&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1g",
  //     title: "Tech Meetup",
  //     date: "Wed, Nov 15",
  //     venue: "Tech Hub",
  //     price: "Free",
  //   },
  //   {
  //     imgUrl:
  //       "https://dice-media.imgix.net/attachments/2024-10-02/98028c4b-3487-443d-b7a6-74f16099edef.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
  //     title: "Food Festival",
  //     date: "Sun, Nov 12",
  //     venue: "Town Square",
  //     price: "$15",
  //   },
  //   {
  //     imgUrl:
  //       "https://dice-media.imgix.net/attachments/2024-10-11/0c695299-9be0-4a1a-b12f-bba7432a0453.jpg?rect=0%2C0%2C1200%2C1200&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1g",
  //     title: "Music Concert",
  //     date: "Sat, Oct 28",
  //     venue: "Central Park",
  //     price: "$50",
  //   },
  //   {
  //     imgUrl:
  //       "https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
  //     title: "Art Exhibition",
  //     date: "Fri, Nov 10",
  //     venue: "City Gallery",
  //     price: "$25",
  //   },
  // ];

  return (
    <div className="bg-primary py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-start gap-4 mb-14 sm:flex-row">
          <div className="w-24 h-12 bg-[#222222] text-white flex items-center justify-center rounded-md shadow-md">
            <MdLocationOn className="mr-1" />
            <span className="text-center text-sm">Location</span>
          </div>
          <div className="w-24 h-12 bg-[#222222] text-white flex items-center justify-center rounded-md shadow-md">
            <MdDateRange className="mr-1" />
            <span className="text-center text-sm">Date</span>
          </div>
          <div className="w-24 h-12 bg-[#222222] text-white flex items-center justify-center rounded-md shadow-md">
            <MdAttachMoney className="mr-1" />
            <span className="text-center text-sm">Price</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-white font-bold mb-6">
            Browse Events{" "}
            {/* <span className="text-xl text-gray-500">in Hawaii</span> */}
          </h2>
        </div>
        <div className="flex justify-center">
          {events.filter(event => event.explore === "YES").length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {events
                .filter(event => event.explore === "YES")
                .map((event, index) => (
                  <button
                    onClick={() => handleDetail(event._id, event.event_name.replace(/\s+/g, '-'))}
                    key={index}
                    className="rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:scale-105"
                  >
                    <div className="w-[300px] h-[300px] relative">
                      <img
                        src={event.flyer}
                        alt={event.event_name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="py-4">
                      <h3 className="text-lg text-white font-semibold">{event.event_name}</h3>
                      <p className="text-yellow-300">{formatDate(event.start_date)}</p>
                      <p className="text-gray-300">{event.venue_name}</p>
                      <p className="text-gray-200 font-bold">Starting: ${event.ticket_start_price}</p>
                    </div>
                  </button>
                ))}
            </div>
          ) : (
            <div className="text-center text-white mt-8 mb-20">
              <h2 className="text-xl font-semibold">No events are available</h2>
              <p className="text-gray-400">Please check back later for upcoming events.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
