import React, { useEffect, useState } from 'react';
import SidebarComponent from '../../components/layouts/SidebarComponent';
import { useParams } from 'react-router-dom';
import url from '../../constants/url';
import axios from 'axios';

const TicketInfo = () => {
    const { id } = useParams();
    const [payment, setPayment] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchPayment = async () => {
        try {
            const response = await axios.get(`${url}/get-payment-details/${id}`);
            setPayment(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayment();
    }, [id]);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
        const time = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        return { formattedDate, time };
    };

    const { formattedDate, time } = payment?.party_id
        ? formatDate(payment.party_id.start_date)
        : { formattedDate: 'Not Available', time: '' };

    const formatDated = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
        return formattedDate;
    };


    return (
        <div className="flex h-screen bg-black">
            <SidebarComponent />
            <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-semibold text-white">Ticket Info</h1>
                    <div className="flex justify-between items-center gap-4">
                        <a
                            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                            href="/create-event"
                        >
                            Send Ticket
                        </a>
                        <a
                            className="bg-red-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-900 transition-colors"
                            href="/create-event"
                        >
                            Refund
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className='text-lg text-gray-500 mt-5 underline'>Personal Information</h1>
                        <div className='flex justify-between items-center mt-5 gap-10'>
                            <p className='text-white mb-3'>
                                <span className='text-sm text-gray-300'>Full Name:</span>{" "}
                                {payment?.user_id
                                    ? `${payment.user_id.firstName} ${payment.user_id.lastName}`
                                    : 'Not Available'}
                            </p>
                            <p className='text-white mb-3'>
                                <span className='text-sm text-gray-300'>Mobile Number:</span>{" "}
                                {payment?.user_id
                                    ? `${payment.user_id.phoneNumber}`
                                    : 'Not Available'}
                            </p>
                            <p className='text-white mb-3'>
                                <span className='text-sm text-gray-300'>Email ID:</span>{" "}
                                {payment?.user_id
                                    ? `${payment.user_id.email}`
                                    : 'Not Available'}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='text-lg text-gray-500 mt-5 underline'>Event Information</h1>
                    <div className='flex justify-between items-center mt-5 gap-10'>
                        <p className='text-white mb-3'>
                            <span className='text-sm text-gray-300'>Event Name:</span>{" "}
                            {payment?.party_id
                                ? `${payment.party_id.event_name}`
                                : 'Not Available'}
                        </p>
                        <p className="text-white mb-3">
                            <span className="text-sm text-gray-300">Start Date:</span>{" "}
                            {payment?.party_id ? `${formattedDate}` : 'Not Available'}
                            {time && `, ${time}`}
                        </p>
                        <p className='text-white mb-3'>
                            <span className='text-sm text-gray-300'>Venue Name:</span>{" "}
                            {payment?.party_id
                                ? `${payment.party_id.venue_name}`
                                : 'Not Available'}
                        </p>
                    </div>
                </div>
                <div>
                    <h1 className='text-lg text-gray-500 mt-5 underline'>Booking Information</h1>
                    <div className='flex justify-between items-center mt-5 gap-10'>
                        <p className='text-white mt-5 mb-3'>
                            <span className='text-sm text-gray-300'>Total Amount:</span>{" $"}
                            {payment
                                ? `${(payment.amount / 100).toFixed(2)}`
                                : 'Not Available'}
                        </p>
                        <p className="text-white mb-3">
                            <span className="text-sm text-gray-300">Booking Date:</span>{" "}
                            {payment && payment.date
                                ? formatDated(payment.date)
                                : 'Not Available'}
                        </p>
                        <p className='text-white mb-3'>
                            <span className='text-sm text-gray-300'>Ticket Status:</span>{" "}
                            {payment
                                ? `${payment.qr_status === 'true' ? 'Checked In' : "Not Checked In"}`
                                : 'Not Available'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketInfo;
