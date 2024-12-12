import React, { useEffect, useState } from "react";
import SimilarEvent from "../../components/features/Events/SimilarEvent";
import { useParams } from "react-router-dom";
import axios from "axios";
import url from "../../constants/url";

const eventData = [
  {
    id: 1,
    imgSrc:
      "https://dice-media.imgix.net/attachments/2024-09-16/d8dc8341-7dc7-4d78-94ca-2a6d540e8860.jpg?rect=0%2C0%2C2000%2C2000&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    title: "Event Title 1",
    price: "$20",
    date: "October 25, 2024",
    venue: "Venue 1",
  },
  {
    id: 2,
    imgSrc:
      "https://dice-media.imgix.net/attachments/2024-10-08/e8e1a897-1363-4a1f-a8a7-ff16e7dede54.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    title: "Event Title 2",
    price: "$30",
    date: "October 28, 2024",
    venue: "Venue 2",
  },
  {
    id: 2,
    imgSrc:
      "https://dice-media.imgix.net/attachments/2024-10-07/9f7e61d4-cc49-4dbb-8812-b23ab975a012.jpg?rect=0%2C0%2C1800%2C1800&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    title: "Event Title 2",
    price: "$30",
    date: "October 28, 2024",
    venue: "Venue 2",
  },
  {
    id: 2,
    imgSrc:
      "https://dice-media.imgix.net/attachments/2024-10-03/843abf66-1b33-47b4-b15f-7b88c3afd3d3.jpg?rect=0%2C0%2C2000%2C2000&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    title: "Event Title 2",
    price: "$30",
    date: "October 28, 2024",
    venue: "Venue 2",
  },
  {
    id: 2,
    imgSrc:
      "https://dice-media.imgix.net/attachments/2024-10-09/ee5c386b-4e09-4d0b-89c3-8e64ee6db97f.jpg?rect=0%2C1%2C4500%2C4500&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    title: "Event Title 2",
    price: "$30",
    date: "October 28, 2024",
    venue: "Venue 2",
  },
  {
    id: 2,
    imgSrc:
      "https://dice-media.imgix.net/attachments/2024-09-16/d8dc8341-7dc7-4d78-94ca-2a6d540e8860.jpg?rect=0%2C0%2C2000%2C2000&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=10",
    title: "Event Title 2",
    price: "$30",
    date: "October 28, 2024",
    venue: "Venue 2",
  },
  {
    id: 2,
    imgSrc:
      "https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=328&h=328&fit=crop&crop=faces%2Ccenter&dpr=1",
    title: "Event Title 2",
    price: "$30",
    date: "October 28, 2024",
    venue: "Venue 2",
  },
  {
    id: 2,
    imgSrc:
      "https://dice-media.imgix.net/attachments/2024-10-17/95d76011-e54f-41f4-92ed-10810410133f.jpg?rect=0%2C13%2C1125%2C1125&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    title: "Event Title 2",
    price: "$30",
    date: "October 28, 2024",
    venue: "Venue 2",
  },
  // Add more events as needed
];

const ProfileUrl = () => {
  const { id, name } = useParams();
  const [organizer, setOrganizer] = useState({});

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

  useEffect(() => {
    if (id) {
      fetchOrganizer();
    }
  }, [id]);

  return (
    <div className="mx-auto bg-black px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-white  text-center">{organizer.name || ""}</h1>
      <p className="text-md font-medium text-white py-2 text-center">{organizer.bio || ""}</p>
      <div className="relative w-full h-56 sm:h-72 lg:h-96 mt-5">
        <img
          src="https://cdn.pixabay.com/photo/2022/06/02/15/01/music-7238254_1280.jpg"
          alt="Banner"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-8">
        <div className="bg-black py-6 px-4 sm:px-8 lg:px-16">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Live Events
          </h2>
          <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
            {eventData.map((event) => (
              <div
                key={event.id}
                className="flex-none w-80 sm:w-96 bg-black rounded-lg shadow-lg p-4"
              >
                <img
                  src={event.imgSrc}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4 text-start">
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-300">{event.price}</p>
                  <p className="text-sm text-gray-300">{event.date}</p>
                  <p className="text-sm text-gray-300">{event.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-black py-6 px-4 sm:px-8 lg:px-16">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Past Events
          </h2>
          <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
            {eventData.map((event) => (
              <div
                key={event.id}
                className="flex-none w-80 sm:w-96 bg-black rounded-lg shadow-lg p-4"
              >
                <img
                  src={event.imgSrc}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4 text-start">
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-300">{event.price}</p>
                  <p className="text-sm text-gray-300">{event.date}</p>
                  <p className="text-sm text-gray-300">{event.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileUrl;