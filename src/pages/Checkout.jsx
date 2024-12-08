import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import url from "../constants/url";
import { Button, Modal, Space } from 'antd';

const Checkout = () => {
  const location = useLocation();
  const { selectedTicketPrice, count, eventId, selectedTicketId, selectedTicketName } = location.state || {};
  const [event, setEvent] = useState({});
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [organizerId, setOrganizerId] = useState(null);

  const [details, setDetails] = useState(false)
  const [basicModal, setBasicModal] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });


  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (userId) {
      axios
        .get(`${url}/auth/get-user-by-id/${userId}`)
        .then((response) => {
          const userData = response.data;
          setFormData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          })
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, [userId]);

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
    const userName = localStorage.getItem("userName")
    setUserId(storedUserId);
    setUserName(userName)
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

    if (!userName) {
      setDetails(true);
      return;
    }

    setPaymentProcessing(true);
    setPaymentError(null);

    try {
      const response = await axios.post(`${url}/create-payment-intent`, {
        amount: Math.round(parseFloat(count * selectedTicketPrice) * 100),
        organizerId: organizerId,
        userId: userId,
        eventId: eventId,
        date: Date.now(),
        status: "pending",
        count: count,
        ticketId: selectedTicketId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
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

  // const fetchBook = async () => {
  //   try {
  //     const response = await axios.get(`${url}/get-qr-ticket-details/${id}`);
  //     setBook(response.data);
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchBook();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinish = async () => {
    try {
      const basicInfoResponse = await axios.post(`${url}/auth/basic-info/${userId}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      if (basicInfoResponse.data.success) {
        localStorage.setItem('userName', formData.firstName);
        Modal.success({
          title: 'Successfully Updated Profile',
          content: 'continue with you booking',
          onOk: () => {
            setDetails(false);
            window.location.reload()
          },
          okButtonProps: {
            style: { backgroundColor: 'black', borderColor: 'black', color: 'white' },
          },
          cancelButtonProps: {
            style: { display: 'none' },
          },
          maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
          style: { color: 'white', backgroundColor: '#000', borderRadius: '8px', borderColor: '#ccc' },
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error", "An error occurred. Please try again.");
    }
  }

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
      {userName && (
        <>
          <form className="w-full max-w-md mt-4">
            <div className="bg-[#0b0b0b] p-4 rounded-lg">
              <label className="text-white block">Basic Info</label>
              <div className="flex justify-between items-center pt-4">
                <span className="text-white">{formData.firstName}</span>
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                  onClick={() => setBasicModal(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </>
      )}

      <div>
        {details && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-black w-full max-w-lg p-6 rounded-lg shadow-lg relative border border-gray-600">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-white">Please fill Basic Details</h2>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4 text-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4 text-white"
                  />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email ID"
                    className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4 text-white"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleFinish}
                      className="bg-green-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setDetails(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        {basicModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-black w-full max-w-lg p-6 rounded-lg shadow-lg relative border border-gray-600">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-white">Basic Details</h2>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4 text-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4 text-white"
                  />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email ID"
                    className="border-b p-2 outline-none border-gray-800 bg-black w-full mb-4 text-white"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleFinish}
                      className="bg-green-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setBasicModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;