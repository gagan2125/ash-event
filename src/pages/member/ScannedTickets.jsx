import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import url from '../../constants/url';

const ScannedTickets = () => {
    const { id } = useParams();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState();
    const [book, setBook] = useState([]);

    // const handleSearch = (event) => {
    //     const query = event.target.value.toLowerCase();
    //     setSearchQuery(query);
    //     const filtered = eventData.filter((event) =>
    //         event.party_id.event_name.toLowerCase().includes(query) ||
    //         event.user_name.toLowerCase().includes(query)
    //     );
    //     setFilteredEvents(filtered);
    // };

    const fetchBook = async () => {
        try {
            const response = await axios.get(`${url}/get-member-ticket-list/${id}`);
            setBook(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
    useEffect(() => {
        fetchBook();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // 12-hour format with AM/PM
        }).format(date);
    };

    return (
        <div className="px-4">
            <input
                type="text"
                className="w-full mt-10 p-2 mb-4 border text-white rounded bg-black focus:outline-none"
                placeholder="Search by event name or user name"
                value={searchQuery}
                onChange={() => {}}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {book.length > 0 ? (
                    book.map((event) => (
                        <div key={event.id} className="bg-[#0d0d0d] text-white p-4 rounded-lg shadow-lg hover:border hover:border-gray-700">
                            <h3 className="text-xl font-bold">{event.party_id.event_name}</h3>
                            <p><strong>User Name:</strong> {event.user_id.firstName} {event.user_id.lastName}</p>
                            <p><strong>Ticket Price:</strong> ${event.amount / 100}</p>
                            <p><strong>Checked In Time:</strong> {formatDate(event.updatedAt)}</p>
                            <p><strong>Tickets:</strong> {event.count}</p>
                        </div>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
}

export default ScannedTickets;
