/* eslint-disable no-unused-vars */
import React from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";

const Profile = () => {
  return (
    <>
      <div className="flex h-screen">
        <SidebarComponent />
        <div className="flex-1 flex flex-col p-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-white">Profile</h1>

            <a
              className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              href="/create-event"
            >
              Manage
            </a>
          </div>
          <div className="overflow-y-auto no-scrollbar">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-5">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
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
                    </div>
                    <div className="col-span-full">
                      <div className="mt-2 flex items-center gap-x-3">
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
                        <h3 className="text-white text-3xl flex items-center gap-x-2">
                          Bobs Bar Party
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText("Bobs Bar Party")
                            }
                            className="p-1 rounded hover:bg-gray-700 focus:outline-none"
                            aria-label="Copy text"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="w-6 h-6 text-gray-300 hover:text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 16h8m-4-8h4m-2-4h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2Zm0 8h4m-4-4h2"
                              />
                            </svg>
                          </button>
                        </h3>
                      </div>
                    </div>
                    <div className="col-span-full px-10">
                      <label
                        htmlFor="about"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Biography
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows="3"
                          className="block w-full rounded-md border-0 py-1.5 bg-black text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        ></textarea>
                      </div>
                      <p className="mt-3 text-sm/6 text-gray-400">
                        Write a few sentences about yourself.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12 px-10">
                  <h2 className="text-base/7 font-semibold text-gray-200">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-500">
                    Please fill correct details below
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        First name *
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Last name *
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 bg-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-200"
                      >
                        Phone Number *
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

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
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-black border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm/6 font-semibold text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
