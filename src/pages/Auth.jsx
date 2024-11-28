/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Auth = () => {
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen flex justify-center p-4 py-20">
      <div className="w-full max-w-lg  p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-white mb-10">
          Login / Register
        </h2>

        <h5 className="text-white mb-2">Mobile Number</h5>
        <div className="flex items-center space-x-3 mb-4">
          <select className="bg-black  border-b border-gray-300  p-2 text-gray-200 outline-none">
            <option value="+1">+1</option>
            <option value="+91">+91</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
          </select>
          <input
            type="text"
            placeholder="eg. 9876543210"
            className="flex-1 border-b bg-black border-gray-300  p-2 text-white outline-none"
          />
          <button
            onClick={handleSendOtp}
            className="bg-[#2c2c2c] text-white px-4 py-2 rounded-md hover:bg-[#2c2c2c] transition"
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
                className="w-full border-b bg-black border-gray-300 p-2 text-gray-700 outline-none"
              />
            </div>
            <a className="w-full bg-white text-black py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition">
              Login / Register
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
