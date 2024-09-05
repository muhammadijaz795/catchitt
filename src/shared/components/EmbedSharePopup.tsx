import React from 'react';

const EmbedSharePopup = ({
    videoUrl,
    embedCode,
    copyEmbedCodeHandler,
    setIsEmbedModalOpen,
}: any) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-2/5">
                <h2 className="text-xl font-bold mb-4 text-black text-left">Embed Video</h2>
                <div className="w-full h-[1px] bg-gray-300 mb-3 -mt-2" />
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className={'h-[400px] w-1/2'}>
                        <video
                            className="h-full w-full rounded-md object-cover"
                            loop={true}
                            controls={false}
                            autoPlay={true}
                            width="300px"
                            preload="auto"
                            playsInline
                            src={videoUrl}
                        />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between items-center h-[400px]">
                        <textarea
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-full bg-gray-100"
                            value={embedCode}
                        />
                        <div>
                            <button
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={copyEmbedCodeHandler}
                            >
                                Copy Embed Code
                            </button>
                            <button
                                className="mt-4 w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                                onClick={() => setIsEmbedModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmbedSharePopup;
