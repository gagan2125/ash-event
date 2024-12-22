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

    const [activeTab, setActiveTab] = useState("Basic");
    const [privacyStatus, setPrivacyStatus] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null)
    const [profileImage, setProfileImage] = useState(null);


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
                    setProfileImage(userData.profile_image)
                    //setSelectedCountryCode(userData.phoneNumber.substring(0, 3));
                    console.log("show in events", response.data)
                    if (userData.showInEvent === "YES") {
                        setPrivacyStatus(true);
                    } else {
                        setPrivacyStatus(false);
                    }
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
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        if (profilePhoto) {
            formData.append('profile_image', profilePhoto);
        }

        axios
            .put(`${url}/auth/update-user/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                alert('Profile updated successfully!');
                window.location.reload()
                localStorage.setItem('userName', firstName);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    const handlePrivacyChange = async (checked) => {
        setPrivacyStatus(checked);

        try {
            const response = await fetch(`${url}/update-privacy-showin-event/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    showInEvent: checked ? "YES" : "NO",
                }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Failed to update privacy status', error);
        }
    };

    const triggerFileInput = () => {
        document.getElementById("profilePhotoInput").click();
    };

    const handleImageUpload = (event) => {
        const file_upload = event.target.files[0];
        setProfilePhoto(file_upload)

        if (file_upload) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file_upload);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "Basic":
                return (
                    <div>
                        <h2 className="text-xl font-bold text-white">Basic Information</h2>
                        <div onClick={triggerFileInput} className="cursor-pointer">
                            {profilePhoto || profileImage ? (
                                <img
                                    src={selectedImage || profileImage}
                                    alt="Profile"
                                    className="size-40 rounded-full object-cover"
                                />
                            ) : (
                                <svg
                                    className="size-40 text-gray-300"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                        <input
                            id="profilePhotoInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                        />
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
                    </div>
                );
            case "Privacy":
                return (
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Privacy</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-white text-sm">
                                Hide me from Guest Lists:{" "}
                                <span className="text-xl">{privacyStatus ? "Visible" : "Hidden"}</span>
                            </p>
                            <input
                                type="checkbox"
                                checked={privacyStatus} // This should reflect the state value
                                onChange={(e) => handlePrivacyChange(e.target.checked)} // This triggers the state change
                                className="h-6 w-6"
                            />
                        </div>
                    </div>
                );
            case "Settings":
                return <div className="text-white">Settings Content</div>;
            default:
                return null;
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-8 mt-20">
            <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/4 w-full sm:border-r border-gray-700">
                    <ul className="flex sm:flex-col flex-row sm:space-y-4 space-x-4 sm:space-x-0 text-gray-400">
                        {[
                            { name: "Basic", label: "Basic Info" },
                            { name: "Privacy", label: "Privacy" },
                            { name: "Settings", label: "Settings" },
                        ].map((tab) => (
                            <li
                                key={tab.name}
                                className={`cursor-pointer p-2 rounded-lg text-sm font-semibold text-center hover:text-white hover:bg-gray-700 transition ${activeTab === tab.name ? "text-white bg-gray-700" : ""
                                    }`}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                {tab.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sm:w-3/4 w-full sm:pl-6 mt-4 sm:mt-0">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
