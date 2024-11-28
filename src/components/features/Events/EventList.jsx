import { MdLocationOn, MdDateRange, MdAttachMoney } from "react-icons/md";
const EventList = () => {
  const events = [
    {
      imgUrl:
        "https://dice-media.imgix.net/attachments/2024-10-11/0c695299-9be0-4a1a-b12f-bba7432a0453.jpg?rect=0%2C0%2C1200%2C1200&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1g",
      title: "Music Concert",
      date: "Sat, Oct 28",
      venue: "Central Park",
      price: "$50",
    },
    {
      imgUrl:
        "https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
      title: "Art Exhibition",
      date: "Fri, Nov 10",
      venue: "City Gallery",
      price: "$25",
    },
    {
      imgUrl:
        "https://dice-media.imgix.net/attachments/2024-10-02/98028c4b-3487-443d-b7a6-74f16099edef.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
      title: "Food Festival",
      date: "Sun, Nov 12",
      venue: "Town Square",
      price: "$15",
    },
    {
      imgUrl:
        "https://dice-media.imgix.net/attachments/2024-10-14/58f3f487-b230-4449-ab50-8cc7e690f48f.jpg?rect=0%2C0%2C2000%2C2000&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1g",
      title: "Tech Meetup",
      date: "Wed, Nov 15",
      venue: "Tech Hub",
      price: "Free",
    },
    {
      imgUrl:
        "https://dice-media.imgix.net/attachments/2024-10-14/58f3f487-b230-4449-ab50-8cc7e690f48f.jpg?rect=0%2C0%2C2000%2C2000&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1g",
      title: "Tech Meetup",
      date: "Wed, Nov 15",
      venue: "Tech Hub",
      price: "Free",
    },
    {
      imgUrl:
        "https://dice-media.imgix.net/attachments/2024-10-02/98028c4b-3487-443d-b7a6-74f16099edef.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
      title: "Food Festival",
      date: "Sun, Nov 12",
      venue: "Town Square",
      price: "$15",
    },
    {
      imgUrl:
        "https://dice-media.imgix.net/attachments/2024-10-11/0c695299-9be0-4a1a-b12f-bba7432a0453.jpg?rect=0%2C0%2C1200%2C1200&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1g",
      title: "Music Concert",
      date: "Sat, Oct 28",
      venue: "Central Park",
      price: "$50",
    },
    {
      imgUrl:
        "https://dice-media.imgix.net/attachments/2024-10-18/d2c702f5-9867-40de-95cb-ce91c4bcfc9f.jpg?rect=0%2C0%2C1080%2C1080&auto=format%2Ccompress&q=80&w=204&h=204&fit=crop&crop=faces%2Ccenter&dpr=1",
      title: "Art Exhibition",
      date: "Fri, Nov 10",
      venue: "City Gallery",
      price: "$25",
    },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <a
              href="/single-event"
              key={index}
              className="rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={event.imgUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="py-4">
                <h3 className="text-lg text-white font-semibold">
                  {event.title}
                </h3>
                <p className="text-yellow-300">{event.date}</p>
                <p className="text-gray-300">{event.venue}</p>
                <p className="text-gray-200 font-bold">{event.price}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center items-center mt-5">
          <div>
            <button className="text-white border-secondary border-2 py-3 px-7 rounded-full">
              Load More !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
