/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import axios from "axios";
import url from "../../constants/url";
import { FaCopy } from "react-icons/fa";
import { MdCopyAll } from "react-icons/md";

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const [oragnizerId, setOragnizerId] = useState(null);
  const [organizer, setOrganizer] = useState({
    bio: "",
    name: "",
    email: "",
    phone: "",
    instagram: "",
    twitter: "",
    website: "",
    url: ""
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null)


  const handleCopy = (e) => {
    e.preventDefault();
    const formattedName = organizer.url.replace(/\s+/g, '-');
    navigator.clipboard.writeText(`http://localhost:5173/profile-url/${organizer._id}/${formattedName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedUserOrganizerId = localStorage.getItem('organizerId');
      if (storedUserOrganizerId) {
        setOragnizerId(storedUserOrganizerId);
      } else {
        console.warn("No organizerId found in localStorage");
      }
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

  const fetchOrganizer = async () => {
    if (oragnizerId) {
      try {
        const response = await axios.get(`${url}/get-organizer/${oragnizerId}`);
        setOrganizer(response.data);
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    } else {
      console.log("not found")
    }
  };

  useEffect(() => {
    if (oragnizerId) {
      fetchOrganizer();
    }
  }, [oragnizerId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('bio', organizer.bio);
      formData.append('name', organizer.name);
      formData.append('email', organizer.email);
      formData.append('phone', organizer.phone);
      formData.append('instagram', organizer.instagram);
      formData.append('twitter', organizer.twitter);
      formData.append('website', organizer.website);
      formData.append('url', organizer.url);

      if (profilePhoto) {
        formData.append('profile_image', profilePhoto || organizer.profile_image);
      }

      const response = await axios.put(`${url}/update-organizer/${oragnizerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Organizer updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating organizer:", error);
      alert("Failed to update organizer. Please try again.");
    }
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

  const triggerFileInput = () => {
    document.getElementById("profilePhotoInput").click();
  };

  return (
    <>
      <div className="flex h-screen bg-black">
        <SidebarComponent />
        <div className="flex-1 flex flex-col p-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-white">Profile</h1>

            <button
              onClick={handleUpdate}
              className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              href="/create-event"
            >
              Update
            </button>
          </div>
          <div className="overflow-y-auto no-scrollbar">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-5">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-200/25 px-6 py-10">
                        <div className="text-center">
                          <svg
                            className="mx-auto size-12 text-gray-300"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-black font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs/5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-span-full">
                      <div className="flex items-center gap-x-3">
                        <div onClick={triggerFileInput} className="cursor-pointer">
                          {profilePhoto || organizer.profile_image ? (
                            <img
                              src={selectedImage || organizer.profile_image}
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
                        <h3 className="text-white text-3xl flex items-center gap-x-2">
                          {organizer.name || ""}
                          <button
                            onClick={handleCopy}
                            className="p-1 rounded hover:bg-gray-700 focus:outline-none"
                            aria-label="Copy text"
                          >
                            <MdCopyAll size={22} />
                          </button>
                        </h3>
                      </div>
                      {/* Hidden file input */}
                      <input
                        id="profilePhotoInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="col-span-full px-10">
                      <label
                        htmlFor="about"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows="3"
                          value={organizer.bio === 'undefined' ? "" : organizer.bio}
                          onChange={(e) =>
                            setOrganizer((prev) => ({ ...prev, bio: e.target.value }))
                          }
                          className="block w-full rounded-md border-0 px-3 py-1.5 bg-black text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        ></textarea>
                      </div>
                      <p className="mt-3 text-sm/6 text-gray-400">
                        Write a few sentences about organization.
                      </p>
                    </div>
                  </div>
                </div><div className="border-b border-gray-900/10 pb-0 px-10">
                  <h2 className="text-base/7 font-semibold text-gray-200">
                    Custom Profile URL
                  </h2>
                  <div className="mt-5 grid grid-cols-1 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-200 mt-3"
                      >
                        https://ash-event.vercel.app/
                      </label>
                    </div>
                    <div className="sm:col-span-3">
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={organizer.url === 'undefined' ? "" : organizer.url}
                          onChange={(e) => {
                            const regex = /^[a-z1-9\-]*$/;
                            const value = e.target.value;
                            if (regex.test(value)) {
                              setOrganizer((prev) => ({ ...prev, url: value }));
                            }
                          }}
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-200 px-3 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                          placeholder="Enter lowercase and special characters"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-900/10 pb-0 px-10">
                  <h2 className="text-base/7 font-semibold text-gray-200">
                    Personal Information
                  </h2>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Organization Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={organizer.name === 'undefined' ? "" : organizer.name}
                          onChange={(e) =>
                            setOrganizer((prev) => ({ ...prev, name: e.target.value }))
                          }
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-200 px-3 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    {/* <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Stripe Account ID
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          value={organizer.stripeAccountId || ""}
                          autoComplete="family-name"
                          readOnly
                          className="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-500 text-gray-900 focus:outline-none shadow-sm placeholder:text-gray-400 sm:text-sm/6"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="border-b border-gray-900/10 pb-0 px-10">
                  <h2 className="text-base/7 font-semibold text-gray-200">
                    Contact Information
                  </h2>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Email ID
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={organizer.email === 'undefined' ? "" : organizer.email}
                          onChange={(e) =>
                            setOrganizer((prev) => ({ ...prev, email: e.target.value }))
                          }
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-200 px-3 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Mobile Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          value={organizer.phone === 'undefined' ? "" : organizer.phone}
                          onChange={(e) =>
                            setOrganizer((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          autoComplete="family-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-200 px-3 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12 px-10">
                  <h2 className="text-base/7 font-semibold text-gray-200">
                    Social Media Links
                  </h2>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Instagram URL
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={organizer.instagram === 'undefined' ? "" : organizer.instagram}
                          onChange={(e) =>
                            setOrganizer((prev) => ({ ...prev, instagram: e.target.value }))
                          }
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-200 px-3 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        X URL
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          value={organizer.twitter === 'undefined' ? "" : organizer.twitter}
                          onChange={(e) =>
                            setOrganizer((prev) => ({ ...prev, twitter: e.target.value }))
                          }
                          autoComplete="family-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-200 px-3 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Website URL
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          value={organizer.website === 'undefined' ? "" : organizer.website}
                          onChange={(e) =>
                            setOrganizer((prev) => ({ ...prev, website: e.target.value }))
                          }
                          autoComplete="family-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-200 px-3 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm/6 font-semibold text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
