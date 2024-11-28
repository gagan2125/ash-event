/* eslint-disable no-unused-vars */
import React from "react";

const Checkout = () => {
  return (
    <div className="p-4 bg-black min-h-screen flex flex-col items-center">
      <div className="bg-[#131313] text-white p-4 rounded-lg w-full max-w-md flex items-center justify-between">
        <div className="flex-shrink-0">
          <img
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=audience-band-celebration-1190298.jpg&fm=jpg"
            alt="Event"
            className="w-24 h-24 object-cover rounded"
          />
        </div>
        <div className="flex-grow mx-6">
          <h3 className="text-lg font-bold">Event Title</h3>
          <p className="text-sm text-gray-400">2024-11-29</p>
          <p className="text-sm text-gray-400">Conference Hall A</p>
        </div>
        <div className="flex-shrink-0">
          <button className="text-white text-xl">
            <span>⋮</span>
          </button>
        </div>
      </div>
      <div className="bg-black p-1 rounded-lg w-full max-w-md flex items-center justify-between mt-5">
        <div className="bg-[#f4f4f4] text-black font-bold text-lg w-8 h-8 flex items-center justify-center rounded-lg">
          3
        </div>
        <div className="flex-grow mx-4">
          <h4 className="text-sm font-bold text-white">VIP Ticket</h4>
        </div>
        <div className="text-white text-md font-bold">$100.00</div>
      </div>
      <hr className="border-t border-gray-600 w-full max-w-md my-4" />
      <div className="bg-black p-0 rounded-lg w-full max-w-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="card" className="text-white text-sm">
            Pay Through Credit or Debit Card
          </label>
        </div>
        <button className="bg-gray-600 text-white text-xs px-3 py-2 rounded-lg font-bold hover:bg-gray-500">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
