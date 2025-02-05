import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";
import url from "../../constants/url";
import { Spin } from "antd";

const QrScan = () => {
    const [data, setData] = useState(null);
    const [isScanning, setIsScanning] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [facingMode, setFacingMode] = useState(
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ? "environment" : "user"
    );

    const handleScan = async (result) => {
        if (result && isScanning) {
            setIsScanning(false);
            setLoading(true);
            try {
                const parsedData = JSON.parse(result.text);
                const { qrcode } = parsedData;

                const response = await fetch(`${url}/fetchDataByQRCode`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ qrcode_number: qrcode }),
                });

                const fetchedData = await response.json();
                if (response.ok) {
                    setData(fetchedData);
                } else {
                    setData({ error: fetchedData.error });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ error: 'Invalid QR Code data' });
            } finally {
                setLoading(false);
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
        console.log(data.payment);
        if (data?.payment?._id) {
            try {
                const response = await axios.post(`${url}/updateQRCodeStatus`, {
                    id: data.payment._id,
                });

                if (response.status === 200) {
                    alert("QR Code status updated successfully!");
                    window.location.reload();
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
                            <a
                                href="/org-event"
                                className="mt-4 text-white text-sm rounded transition hover:underline"
                            >
                                Back
                            </a>
                            <button
                                onClick={handleClose}
                                className="mt-4 text-white text-sm rounded transition hover:underline"
                            >
                                Close Scanner
                            </button>
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
                    {loading ? (
                        <Spin tip="Loading..." />
                    ) : data ? (
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
                                                <td className="border-b border-gray-800 px-4 py-2">
                                                    ${(data.payment.amount / 100).toFixed(2) || "N/A"}
                                                </td>
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
                                                <td className="border-b border-gray-800 px-4 py-2">
                                                    {data.user.firstName || "Complimentary"} {data.user.lastName || "Ticket"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-800 px-4 py-2 font-medium">Email id</td>
                                                <td className="border-b border-gray-800 px-4 py-2">{data.payment.email || "N/A"}</td>
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
                    <>
                        <p className="text-white mt-5">Already scanned</p>
                        <button onClick={() => window.location.reload()} className="text-black text-sm px-4 py-1 bg-yellow-600 hover:bg-yellow-500 rounded-full mt-2">Rescan</button>
                    </>
                ): (
                    ""
                )}
            </div>
        </div>
    );
};

export default QrScan;
