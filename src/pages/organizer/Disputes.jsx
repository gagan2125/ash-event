import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarComponent from '../../components/layouts/SidebarComponent';
import { useParams } from 'react-router-dom';
import url from '../../constants/url';
import { MdQrCodeScanner } from 'react-icons/md';

const Disputes = () => {
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accountId, setAccountId] = useState("");
    const [oragnizerId, setOragnizerId] = useState(null);

    useEffect(() => {
        const loadFromLocalStorage = () => {
            const storedUserOrganizerId = localStorage.getItem("organizerId");
            const storedAccountID = localStorage.getItem("accountId");
            setAccountId(storedAccountID || "");
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

    const fetchBook = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/disputes/${accountId}`);

            // Ensure that response.data is an array before setting the state
            if (Array.isArray(response.data)) {
                setBook(response.data);
            } else {
                setBook([]); // Fallback to an empty array if data is not an array
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setBook([]); // Set an empty array if an error occurs
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [accountId]);

    return (
        <div className="flex h-screen bg-black">
            <SidebarComponent />
            <div className="flex-1 flex flex-col p-10 overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-semibold text-white">Disputes</h1>
                    <div className="flex justify-between items-center mb-4 gap-2">
                        <a href="/qr-scanner">
                            <MdQrCodeScanner color="white" size={28} />
                        </a>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    <ul className="space-y-4">
                        {loading ? (
                            <li className="bg-[#000] p-4 rounded-lg text-center text-gray-400">
                                Loading...
                            </li>
                        ) : book.length === 0 ? (
                            <li className="bg-[#000] p-4 rounded-lg text-center text-gray-400">
                                No Disputes are Found
                            </li>
                        ) : (
                            book.filter((payout) => payout.qr_status === 'true').length === 0 ? (
                                <li className="bg-[#000] p-4 rounded-lg text-center text-gray-400">
                                    No Disputes are Found.
                                </li>
                            ) : (
                                book
                                    .filter((payout) => payout.qr_status === 'true')
                                    .map((payout, index) => (
                                        <li
                                            key={index}
                                            className="bg-[#101010] p-4 rounded-lg flex justify-between hover:border hover:border-gray-700"
                                        >
                                            <div>
                                                <p className="text-lg text-white mb-2">
                                                    {payout?.user_id?.firstName || 'N/A'}{' '}
                                                    {payout?.user_id?.lastName || ''}
                                                </p>
                                                <p className="text-sm text-gray-300 mb-1">{payout?.email}</p>
                                                <p className="text-sm text-gray-400">
                                                    {payout?.date
                                                        ? new Date(payout.date).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })
                                                        : 'N/A'}{' '}
                                                    -{' '}
                                                    {payout?.date
                                                        ? new Date(payout.date).toLocaleTimeString('en-GB', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })
                                                        : ''}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl text-white font-medium mb-2">
                                                    ${payout?.amount ? (payout.amount / 100).toFixed(2) : '0.00'}
                                                </p>
                                                <p className="text-sm text-gray-600 font-medium mb-2">
                                                    {payout?.qr_status === 'true' ? 'Checked In' : ''}
                                                </p>
                                            </div>
                                        </li>
                                    ))
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Disputes;
