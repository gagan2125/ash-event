import axios from "axios";
import { useEffect, useState } from "react";
import url from "../../../constants/url";


const people = [
  {
    name: "Leslie Alexander",
    email: "Palace Ground",
    role: "$25",
    imageUrl:
      "https://dice-media.imgix.net/attachments/2024-10-11/0c695299-9be0-4a1a-b12f-bba7432a0453.jpg?rect=0%2C0%2C1200%2C1200&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    lastSeen: "5 Days After",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "Bobs Bar",
    role: "$20",
    imageUrl:
      "https://dice-media.imgix.net/attachments/2024-10-09/8cd6a549-33dd-4ba4-8688-8223faa95d34.jpg?rect=0%2C0%2C768%2C768&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    lastSeen: "2 Days After",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "BGY",
    role: "$45",
    imageUrl:
      "https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "VRO",
    role: "$30",
    imageUrl:
      "https://dice-media.imgix.net/attachments/2024-10-14/58f3f487-b230-4449-ab50-8cc7e690f48f.jpg?rect=0%2C0%2C2000%2C2000&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    lastSeen: "2 Days Back",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "Pump House",
    role: "$32",
    imageUrl:
      "https://dice-media.imgix.net/attachments/2024-10-18/01efd05e-aabc-4514-95c8-2074b1294756.jpg?rect=569%2C0%2C1195%2C1195&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    lastSeen: "a week back",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "House of Dragon",
    role: "$44",
    imageUrl:
      "https://dice-media.imgix.net/attachments/2024-10-09/ee5c386b-4e09-4d0b-89c3-8e64ee6db97f.jpg?rect=0%2C1%2C4500%2C4500&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
    lastSeen: null,
  },
];

const TicketList = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedUserId = localStorage.getItem('userID');
      setUserId(storedUserId);
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

  const fetchBook = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/get-booking-lists/${userId}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [userId]);

  console.log(book)
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div className="bg-primary px-10 md:px-72">
          <h3 className="text-white text-2xl mt-5">My Bookings</h3>
          {book.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No bookings are present.</p>
          ) : (
            <ul role="list" className="divide-y divide-gray-800 mt-6">
              {book.map((item) => (
                <a href={`qr-ticket/${item._id}`} key={item._id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      alt=""
                      src={item.party_id.flyer}
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-100">
                        {item.party_id.event_name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                        {item.party_id.venue_name}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-300">${item.amount / 100}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      <time dateTime={item.party_id.start_date}>
                        {new Date(item.createdAt).toLocaleString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true, // For AM/PM format
                        })}
                      </time>
                    </p>
                  </div>
                </a>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketList;
