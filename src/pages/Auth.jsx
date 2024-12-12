/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import url from "../constants/url";
import axios from "axios";
import { Button, Modal, Space } from 'antd';

const Auth = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');

  const numberWithCode = selectedCountryCode + phoneNumber;

  const success = () => {
    Modal.success({
      content: 'some messages...some messages...',
    });
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${url}/auth/send-otp`, { phoneNumber: numberWithCode });
      if (response.data.success) {
        setOtpSent(true);
      } else {
        alert('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP');
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(`${url}/auth/verify-otp`, { phoneNumber: numberWithCode, otp });

      if (response.data.success) {
        const { userID, authToken, user, organizer } = response.data;

        if (userID && authToken) {
          localStorage.setItem('userID', userID);
          localStorage.setItem('authToken', authToken);
          if (user.firstName) {
            localStorage.setItem('userName', user.firstName)
          }
          if(organizer){
            localStorage.setItem('organizerId', organizer._id);
            localStorage.setItem('accountId', organizer.stripeAccountId);
          }
          
          Modal.success({
            title: 'Successfully Logged in',
            content: 'continue your browsing events',
            onOk: () => {
              window.history.back();
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

        } else {
          alert('Error', 'Invalid response data from server.');
        }
      } else {
        alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Failed to login');
    }
  };



  return (
    <div className="h-screen flex justify-center p-4 py-20">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-white mb-10">Login / Register</h2>

        <h5 className="text-white mb-2">Mobile Number</h5>
        <div className="flex items-center space-x-3 mb-4">
          <select
            className="form-select bg-primary text-gray-200 border-b border-gray-300 p-2 outline-none"
            value={selectedCountryCode}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
          </select>
          <input
            type="text"
            placeholder="eg. 9876543210"
            className="form-input flex-1 bg-primary text-white border-b-2 border-gray-300 p-2 outline-none focus:ring-0"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            onClick={handleSendOtp}
            className="bg-[#080808] text-white px-4 py-2 rounded-md hover:bg-[#0c0c0c] transition"
          >
            OTP
          </button>
        </div>
        <p className="text-gray-500">
          By continuing, you agree to use Terms of Service and Privacy Policy
        </p>

        {otpSent && (
          <>
            <div className="mb-6 mt-8">
              <input
                type="text"
                placeholder="Enter OTP"
                className="form-input w-full bg-primary text-white border-b-2 border-gray-300 p-2 outline-none focus:ring-0"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button className="w-full bg-white text-primary py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition" onClick={handleVerify}>
              Login / Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
