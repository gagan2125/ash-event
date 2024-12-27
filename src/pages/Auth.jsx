/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import url from "../constants/url";
import axios from "axios";
import { Button, Modal, Space } from 'antd';

const Auth = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');

  const numberWithCode = selectedCountryCode + phone;

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${url}/auth/send-otp`, { phone: numberWithCode });
      if (response.data.success) {
        setOtpSent(true);
        alert('OTP sent to your Mobile Number');
      } else {
        setOtpSent(true);
        alert('OTP sent to your Mobile Number');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP');
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(`${url}/auth/verify-otp`, { phone: numberWithCode, otp });
      if (response.data.success) {
        const { userID, authToken, user, organizer } = response.data;

        if (userID && authToken) {
          localStorage.setItem('userID', userID);
          localStorage.setItem('authToken', authToken);

          if (user?.firstName) {
            localStorage.setItem('userName', user.firstName);
          }

          if (organizer) {
            localStorage.setItem('organizerId', organizer._id);
            localStorage.setItem('accountId', organizer.stripeAccountId);
          }

          Modal.success({
            title: 'Successfully Logged in',
            content: 'Continue your browsing events',
            onOk: () => {
              window.history.back();
            },
          });
        } else {
          alert('Error: Invalid response data from server.');
        }
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4 bg-primary">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-md bg-primary">
        <h2 className="text-3xl font-semibold text-white mb-10 text-start">Login / Register</h2>

        <h5 className="text-white mb-2">Mobile Number</h5>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-4">
          <select
            className="form-select bg-primary text-gray-200 border-b border-gray-700 p-2 outline-none sm:w-auto w-full"
            value={selectedCountryCode}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
          </select>
          <input
            type="number"
            placeholder="eg. 9876543210"
            className="form-input flex-1 bg-primary text-white border-b-2 border-gray-700 p-2 outline-none focus:ring-0 mt-2 sm:mt-0"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            onClick={handleSendOtp}
            className="bg-[#080808] text-white px-4 py-2 rounded-md hover:bg-[#0c0c0c] transition mt-2 sm:mt-0"
          >
            Continue
          </button>
        </div>
        <p className="text-gray-500 text-sm text-justify">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          We’ll text you a code to verify your account (usual rates may apply).
          We’ll also text you if you opt into text updates about events (frequency varies).
          To opt out of texts, reply STOP to any of them.
        </p>

        {otpSent && (
          <>
            <div className="mb-6 mt-8">
              <input
                type="text"
                placeholder="Enter OTP"
                className="form-input w-full bg-primary text-white border-b-2 border-gray-700 p-2 outline-none focus:ring-0"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-white text-primary py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition"
              onClick={handleVerify}
            >
              Login / Register
            </button>
          </>
        )}
      </div>
    </div>

  );
};

export default Auth;
