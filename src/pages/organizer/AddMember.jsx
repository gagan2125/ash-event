/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import url from "../../constants/url";

const AddMember = () => {
    const [oragnizerId, setOragnizerId] = useState(null);

    const [formData, setFormData] = useState({
        organizer_id: null,
        name: "",
        email: "",
        phone_number: "",
        password: "",
        role: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/member/add-member`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Member added successfully!");
                window.location.href = '/members'
                setFormData({
                    organizer_id: oragnizerId,
                    name: "",
                    email: "",
                    phone_number: "",
                    password: "",
                    role: "",
                });
            } else {
                alert("Failed to add member. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };
    useEffect(() => {
        const loadFromLocalStorage = () => {
            const storedUserOrganizerId = localStorage.getItem("organizerId");
            setOragnizerId(storedUserOrganizerId || null);
        };
        loadFromLocalStorage();

        const handleStorageChange = () => {
            loadFromLocalStorage();
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            organizer_id: oragnizerId,
        }));
    }, [oragnizerId]);

    return (
        <>
            <div className="flex h-screen bg-black">
                <SidebarComponent />
                <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold text-white">Add Member</h1>
                        <div className="flex justify-between items-center gap-4">
                            <a
                                className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                href="/members"
                            >
                                Back
                            </a>
                        </div>
                    </div>

                    <div className="bg-black p-6 rounded-lg shadow-md w-full mx-auto">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-200 font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-primary border text-white border-gray-700 rounded-md focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-200 font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-primary border text-white border-gray-700 rounded-md focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-200 font-medium mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-primary border text-white border-gray-700 rounded-md focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-200 font-medium mb-2">Passcode</label>
                                <input
                                    type="text"
                                    placeholder="Enter passcode"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-primary border text-white border-gray-700 rounded-md focus:outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-200 font-medium mb-2">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-primary text-white border border-gray-700 rounded-md focus:outline-none"
                                >
                                    <option value="">Select role</option>
                                    <option value="door">Door Guy</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-white text-black font-semibold py-2 px-6 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Add Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddMember;