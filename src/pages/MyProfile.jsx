import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../constants/url';

const MyProfile = () => {
    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        if (userId) {
            setLoading(true);
            axios
                .get(`${url}/auth/get-user-by-id/${userId}`)
                .then((response) => {
                    const userData = response.data;
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setEmail(userData.email);
                    setPhoneNumber(userData.phoneNumber);
                    setSelectedCountryCode(userData.phoneNumber.substring(0, 3));
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                    setLoading(false);
                });
        }
    }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            firstName,
            lastName,
            email,
            phoneNumber,
        };

        axios
            .put(`${url}/auth/update-user/${userId}`, updatedData)
            .then((response) => {
                alert('Profile updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
            </div>

            {loading ? (
                <div className="text-center text-white">Loading...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="border border-gray-700 p-2 bg-black rounded mt-1 focus:outline-none text-white"
                                placeholder="Enter First Name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="border border-gray-700 p-2 bg-black rounded mt-1 focus:outline-none text-white"
                                placeholder="Enter Last Name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-700 p-2 bg-black rounded mt-1 focus:outline-none text-white"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                            <div className="flex flex-col flex-1">
                                <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="border border-gray-700 p-2 bg-black rounded mt-1 focus:outline-none text-white"
                                    placeholder="Enter Phone Number"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                        >
                            Update
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default MyProfile;
