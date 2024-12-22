/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarComponent from "../../components/layouts/SidebarComponent";
import { FaReact } from "react-icons/fa";
import { PiDotsThreeVertical } from "react-icons/pi";
import axios from "axios";
import url from "../../constants/url";
import { Delete, Edit, Edit2Icon } from "lucide-react";
import { DeleteFilled } from "@ant-design/icons";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";


const Members = () => {
  const [oragnizerId, setOragnizerId] = useState(null);
  const [members, setMembers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const cards = [
    { title: "Total Members", count: members.length },
    { title: "Active Members", count: 0 },
    { title: "Vacant Members", count: 0 },
  ];

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

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${url}/member/get-organizer-member/${oragnizerId}`);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [oragnizerId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${url}/member/delete-member/${selectedMemberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMembers((prev) => prev.filter((m) => m._id !== selectedMemberId));
        alert("Member deleted successfully!");
      } else {
        alert("Failed to delete the member. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex h-screen bg-black">
        <SidebarComponent />
        <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-white">Members</h1>
            <div className="flex justify-between items-center gap-4">
              <a
                className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                href="/add-member"
              >
                + Add Member
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="p-4 bg-black border border-[#2f2f2f] hover:border-[#585858] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-200">
                    {card.count}
                  </div>

                  <div className="flex space-x-2">
                    <PiDotsThreeVertical
                      size={24}
                      className="text-white cursor-pointer hover:text-gray-200"
                    />
                  </div>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-gray-500">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
          <h1 className="text-white mt-5 text-lg">All Members</h1>
          <div className="p-6 bg-black rounded-lg shadow-lg ">
            <div className="-mx-8">
              {members.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  <p className="text-lg">No members are available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {members.map((card) => (
                    <a
                      key={card._id}
                      className="relative p-4 bg-[#0a0a0a] shadow-md rounded-lg hover:border mb-5 cursor-pointer hover:border-gray-800 flex flex-col space-y-2"
                    >
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-lg font-semibold text-gray-200">
                          {card.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        Phone: {card.phone_number}
                      </p>
                      <div className="flex-shrink-0">
                        <button className="text-gray-500 hover:text-white">
                          Passcode: {card.password}
                        </button>
                      </div>
                      <div className="absolute bottom-2 right-2 flex space-x-3">
                        <a
                          href={`/edit-member/${card._id}`}
                          className="text-blue-500 hover:text-blue-700 mt-1"
                        >
                          <Edit size={16} />
                        </a>
                        <div
                          onClick={() => {
                            setSelectedMemberId(card._id);
                            setModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <DeleteFilled />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onClose={() => setModalOpen(false)}
              center
              classNames={{
                overlay: "customOverlay",
                modal: "customModal",
              }}
            >
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
              <p className="text-sm text-gray-500 my-4">
                Are you sure you want to delete this member?
                <br/>This action cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Members;
