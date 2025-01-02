import React, { useState } from 'react';
import FileInput from '../components/features/Events/FileInput';
import ImageCropper from '../components/features/Events/ImageCropper';

const Test = () => {
    const [image, setImage] = useState();
    const [currentPage, setCurrentPage] = useState('choose-img');
    const [imgAfterCrop, setImgAfterCrop] = useState('');

    const onImageSelected = (selectedImg) => {
        setImage(selectedImg);
        setCurrentPage('crop-img');
    };

    const onCropDone = (imgCroppedArea) => {
        const canvasEle = document.createElement('canvas');
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;

        const context = canvasEle.getContext('2d');
        const imageObj1 = new Image();

        imageObj1.src = image;

        imageObj1.onload = function () {
            context.drawImage(
                imageObj1,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );

            const dataURL = canvasEle.toDataURL('image/webp');
            setImgAfterCrop(dataURL);
            setCurrentPage('img-cropped');
        };

        imageObj1.onerror = function () {
            console.error('Failed to load the image for cropping.');
        };
    };

    const onCropCancel = () => {
        setCurrentPage('choose-img');
        setImage('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                {currentPage === 'choose-img' ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Choose an Image</h1>
                        <FileInput onImageSelected={onImageSelected} />
                    </div>
                ) : currentPage === 'crop-img' ? (
                    <div>
                        <h1 className="text-xl font-semibold text-gray-700 mb-4 text-center">Crop Your Image</h1>
                        <ImageCropper image={image} onCropDone={onCropDone} onCropCancel={onCropCancel} />
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Cropped Image</h1>
                        <div className="flex justify-center mb-4">
                            <img
                                src={imgAfterCrop}
                                className="cropped-img border border-gray-300 rounded-lg shadow-md max-w-full max-h-96"
                                alt="Cropped"
                            />
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setCurrentPage('crop-img')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Re-Crop
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentPage('choose-img');
                                    setImage('');
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                            >
                                New Image
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Test;
