import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const HomeMember = () => {
    const { id } = useParams()
    return (
        <div className="flex items-center justify-center min-h-screen bg-primary">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full p-4">
                <a href='#' className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">My Events</h2>
                    <p className="text-sm text-gray-600 text-center">View your assigned events</p>
                </a>
                <a href={`/member-qr-scanner/${id}`} className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Scan Tickets</h2>
                    <p className="text-sm text-gray-600 text-center">Scan tickets for entry</p>
                </a>
                <a href='#' className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Profile</h2>
                    <p className="text-sm text-gray-600 text-center">View and update profile</p>
                </a>
            </div>
        </div>
    );
};

export default HomeMember;
