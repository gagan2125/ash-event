import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";
import url from "../../constants/url";
import { useParams } from "react-router-dom";

const MemberQRScanner = () => {
    const { id } = useParams()
    const [data, setData] = useState(null);
    const [isScanning, setIsScanning] = useState(true);
    const [error, setError] = useState(null);
    const [facingMode, setFacingMode] = useState(
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ? "environment" : "user"
    );

    const handleScan = async (result) => {
        if (result) {
            try {
                const parsedData = JSON.parse(result.text);
                const { paymentIntentId } = parsedData;

                const response = await fetch(`${url}/fetchDataByQRCode`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ transaction_id: paymentIntentId }),
                });

                const fetchedData = await response.json();
                console.log(fetchedData)
                if (response.ok) {
                    setData(fetchedData);
                } else {
                    setData({ error: fetchedData.error });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ error: 'Invalid QR Code data' });
            }
        }
    };

    const handleError = (error) => {
        console.error(error);
        setError("QR Scanner error.");
    };

    const handleClose = () => {
        setIsScanning(false);
    };

    const handleSave = async () => {
        console.log(data.payment)
        if (data?.payment?._id) {
            try {
                const response = await axios.post(`${url}/updateQRCodeStatus`, {
                    id: data?.payment?._id,
                    member_id: id
                });

                if (response.status === 200) {
                    alert("QR Code status updated successfully!");
                    window.location.reload()
                    setData((prevData) => ({
                        ...prevData,
                        payment: {
                            ...prevData.payment,
                            qr_status: "true",
                        },
                    }));
                } else {
                    alert("Failed to update QR Code status.");
                }
            } catch (error) {
                console.error("Error updating QR Code status:", error);
                alert("An error occurred while updating QR Code status.");
            }
        }
    };


    return (
        <div className="flex bg-black justify-center min-h-screen">
            <div className="text-center w-full max-w-md bg-black rounded-lg p-4 shadow-md">
                {isScanning ? (
                    <>
                        <div className="w-full max-w-sm mx-auto">
                            <QrScanner
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: "100%" }}
                                constraints={{
                                    video: { facingMode: facingMode },
                                }}
                            />
                        </div>
                        <div className="flex justify-between px-4">
                            <a href={`/home-member/${id}`} className="mt-4 text-white text-sm rounded transition hover:underline">
                                Back
                            </a>
                            <a
                                //onClick={handleClose}
                                href={`/scanned-tickets/${id}`}
                                className="mt-4 text-white text-sm rounded transition hover:underline"
                            >
                                Scanned Tickets
                            </a>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 text-white text-sm rounded transition hover:underline"
                            >
                                Rescan
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-700">Scanner Closed</p>
                )}

                <div className="mt-10 text-white px-4">
                    {error && <p className="text-red-500">{error}</p>}
                    {data ? (
                        data.event && data.event.members.includes(id) ? (
                            data.error ? (
                                <p>{data.error}</p>
                            ) : (
                                <table className="table-auto w-full text-left border-collapse">
                                    <tbody>
                                        {data.payment && (
                                            <>
                                                <tr>
                                                    <td className="border-b border-gray-800 px-4 py-2 font-medium">Tickets</td>
                                                    <td className="border-b border-gray-800 px-4 py-2">{data.payment.count || "N/A"}</td>
                                                </tr>
                                                <tr>
                                                    <td className="border-b border-gray-800 px-4 py-2 font-medium">Amount</td>
                                                    <td className="border-b border-gray-800 px-4 py-2">${(data.payment.amount / 100).toFixed(2) || "N/A"}</td>
                                                </tr>
                                            </>
                                        )}
                                        {data.event && (
                                            <tr>
                                                <td className="border-b border-gray-800 px-4 py-2 font-medium">Event Name</td>
                                                <td className="border-b border-gray-800 px-4 py-2">{data.event.event_name || "N/A"}</td>
                                            </tr>
                                        )}
                                        {data.user && (
                                            <>
                                                <tr>
                                                    <td className="border-b border-gray-800 px-4 py-2 font-medium">Name</td>
                                                    <td className="border-b border-gray-800 px-4 py-2">{data.user.firstName || "N/A"} {data.user.lastName || "N/A"}</td>
                                                </tr>
                                                <tr>
                                                    <td className="border-b border-gray-800 px-4 py-2 font-medium">Phone Number</td>
                                                    <td className="border-b border-gray-800 px-4 py-2">{data.user.phoneNumber || "N/A"}</td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            )
                        ) : (
                            <p>You are not authorized for this.</p>
                        )
                    ) : (
                        <p>No QR scanned yet.</p>
                    )}
                </div>


                {data?.payment?.qr_status === 'false' && data ? (
                    <button
                        onClick={handleSave}
                        className="mt-4 bg-gray-100 text-black py-1 px-2 rounded hover:bg-gray-300"
                    >
                        Done
                    </button>
                ) : data ? (
                    <p className="mt-5 text-green-600">Already Checked In.</p>
                ) : ""}
            </div>
        </div>
    );
};

export default MemberQRScanner;
