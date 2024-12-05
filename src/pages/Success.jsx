import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Success = () => {
    const { accountId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (accountId) {
            localStorage.setItem('accountId', accountId);
            console.log('Account successfully onboarded:', accountId);
            setTimeout(() => {
                navigate('/org-event');
            }, 2000);
        } else {
            console.error('No accountId found in URL.');
            navigate('/error');
        }
    }, [accountId, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100">
            <h1 className="text-3xl font-bold text-green-600">Success!</h1>
            <p className="text-lg">Your account has been successfully set up.</p>
            <p>Redirecting you to your dashboard...</p>
        </div>
    );
};

export default Success;
