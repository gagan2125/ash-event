import React, { useState } from 'react';
import axios from 'axios';
import url from '../../constants/url';
import { useNavigate } from 'react-router-dom';

const LoginMember = () => {
    const [passcode, setPasscode] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${url}/member/member-login`, { passcode });
            if (response.data.success === true) {
                const userData = response.data.data;
                navigate(`/home-member/${userData._id}`);
            } else {
                setError(response.data.error || 'Unexpected response format');
            }
        } catch (err) {
            console.error('Error occurred:', err);
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-primary text-white">
            <div className="w-full max-w-md bg-primary shadow-md rounded-lg p-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="passcode" className="block text-sm font-medium mb-1">
                            Enter Organization Passcode
                        </label>
                        <input
                            type="text"
                            id="passcode"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            placeholder="Enter your passcode"
                            className="w-full px-4 py-3 border-b bg-primary border-gray-600 focus:outline-none rounded text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                {error && (
                    <div className="mt-4 text-center text-red-400">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginMember;
