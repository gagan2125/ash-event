import React, { useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(4 / 3);

    const onCropComplete = (_, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const getCroppedImage = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.src = image;
        await new Promise((resolve) => {
            img.onload = resolve;
        });

        const { width, height } = croppedArea;
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(
            img,
            croppedArea.x * scaleX,
            croppedArea.y * scaleY,
            width * scaleX,
            height * scaleY,
            0,
            0,
            width,
            height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(URL.createObjectURL(blob));
            }, "image/jpeg");
        });
    };

    return (
        <div className="flex flex-col items-center space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden border border-gray-300 shadow-md">
                <Cropper
                    image={image}
                    aspect={aspectRatio}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    style={{
                        containerStyle: { width: "100%", height: "100%" },
                    }}
                />
            </div>

            <div className="flex flex-col items-center space-y-4 w-full">
                {/* Aspect Ratio Selection */}
                <div className="flex flex-wrap justify-center space-x-3">
                    {[
                        { value: 1 / 1, label: "1:1" },
                        { value: 2 / 3, label: "2:3" },
                        { value: 3 / 2, label: "3:2" },
                        { value: 16 / 9, label: "16:9" },
                        { value: 3 / 1, label: "3:1" },
                    ].map((ratio) => (
                        <label key={ratio.value} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value={ratio.value}
                                name="ratio"
                                onChange={(e) => setAspectRatio(parseFloat(e.target.value))}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{ratio.label}</span>
                        </label>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                        onClick={onCropCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        onClick={async () => {
                            const croppedImage = await getCroppedImage();
                            onCropDone(croppedImage);
                        }}
                    >
                        Crop & Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper