import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import url from "../constants/url";

const Checkout = () => {
  const location = useLocation();
  const { selectedTicketPrice, count, eventId, selectedTicketId, selectedTicketName } = location.state || {};
  const [event, setEvent] = useState({});
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [organizerId, setOrganizerId] = useState(null);
  

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${url}/event/get-event-by-id/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    const storedOrganizerId = localStorage.getItem("organizerId");
    setUserId(storedUserId);
    setOrganizerId(storedOrganizerId);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const time = date.toTimeString().slice(0, 5);
    return `${day} ${month} ${year} ${time}`;
  };

  const calculateTotal = () => {
    const subtotal = count * selectedTicketPrice;
    const platformFee = subtotal * 0.02;
    return (subtotal + platformFee).toFixed(2);
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setPaymentProcessing(true);
    setPaymentError(null);

    try {
      const response = await axios.post(`${url}/create-payment-intent`, {
        amount: Math.round(parseFloat(calculateTotal()) * 100),
        organizerId: organizerId,
        userId: userId,
        eventId: eventId,
        date: Date.now(),
        status: "pending",
        count: count,
        ticketId: selectedTicketId
      });

      const { clientSecret, paymentId } = response.data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        window.location.href = `/qr-ticket/${paymentId}`;
      }
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#fff',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${url}/get-qr-ticket-details/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className="p-4 bg-primary min-h-screen flex flex-col items-center">
      <div className="bg-[#0b0b0b] text-white p-4 rounded-lg w-full max-w-md flex items-center justify-between">
        <div className="flex-shrink-0">
          <img
            src={event.flyer}
            alt="Event"
            className="w-24 h-24 object-cover rounded"
          />
        </div>
        <div className="flex-grow mx-6">
          <h3 className="text-lg font-bold">{event.event_name}</h3>
          <p className="text-sm text-gray-400">{formatDate(event.start_date)}</p>
          <p className="text-sm text-gray-400">{event.venue_name}</p>
          <p className="text-md text-gray-400">{selectedTicketName}</p>
        </div>
      </div>
      <div className="bg-[#0b0b0b] p-4 rounded-lg w-full max-w-md mt-4">
        <div className="flex justify-between mb-3">
          <span className="text-white">Tickets ({count}x)</span>
          <span className="text-white">${(count * selectedTicketPrice).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-white">Platform Fee (2%)</span>
          <span className="text-white">${(count * selectedTicketPrice * 0.02).toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-600 my-3" />
        <div className="flex justify-between">
          <span className="text-white font-bold">Total</span>
          <span className="text-white font-bold">${calculateTotal()}</span>
        </div>
      </div>
      <form onSubmit={handlePayment} className="w-full max-w-md mt-4">
        <div className="bg-[#0b0b0b] p-4 rounded-lg">
          <label className="text-white block mb-2">
            Card Details
          </label>
          <div className="bg-[#1a1a1a] p-3 rounded">
            <CardElement options={cardElementOptions} />
          </div>

          {paymentError && (
            <div className="text-red-500 mt-2 text-sm">
              {paymentError}
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || paymentProcessing}
            className={`w-full mt-4 py-3 rounded-lg font-bold ${paymentProcessing
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-primary hover:bg-[#171717]'
              } text-white`}
          >
            {paymentProcessing ? 'Processing...' : `Pay $${calculateTotal()}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;