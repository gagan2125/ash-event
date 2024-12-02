import axios from 'axios';
import React, { useEffect, useState } from 'react';
import url from '../constants/url';

const BasicDetails = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userID');
        setUserId(storedUserId);
    }, []);

    const handleFinish = async () => {
        try {
            const response = await axios.post(`${url}/auth/basic-info/${userId}`, {
                firstName: firstName,
                lastName: lastName,
                emailId: email,
            });

            if (response.data.success) {
                alert("Success", "Profile updated successfully!");
                window.location.href = "/"
            } else {
                alert("Error", response.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Error", "Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-primary p-4 py-20">
            <div className="w-full max-w-md p-6 bg-primary text-white rounded-lg shadow-md flex flex-col">
                <h2 className="text-2xl font-semibold mb-6">Basic Details</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">First Name *</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="eg. John"
                        className="w-full bg-primary text-white border-b border-gray-600 p-2 focus:outline-none"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Last Name *</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="eg. Doe"
                        className="w-full bg-primary text-white border-b border-gray-600 p-2  focus:outline-none"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email ID</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="eg. johndoe@gmail.com"
                        className="w-full bg-primary text-white border-b border-gray-600 p-2  focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleFinish}
                    className="w-full bg-[#080808] text-white font-bold py-2 px-4 rounded-md hover:bg-[#080808] transition"
                >
                    Finish
                </button>
            </div>
        </div>
    );
};

export default BasicDetails;
