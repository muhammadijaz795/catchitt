import React from 'react';
import { cross } from '../../icons';
interface EmbedSharePopupProps {
    videoUrl: string;
    embedCode: string;
    copyEmbedCodeHandler: () => void;
    setIsEmbedModalOpen: (isOpen: boolean) => void;
    chevronUpIconVideo?: any;
    chevronDownIconVideo?: any;
    isLiked?: any;
    redHeartIcon?: any;
    whiteHeartIcon?: any;
    videoLikes?: any;
    commentIcon?: any;
    videoComments?: any;
    isSaved?: any;
    savedIcon?: any;
    saveIcon?: any;
    videoSaves?: any;
    shareIcon?: any;
    videoShares?: any;
    musicIcon?: any;
    userName?: any;
    musicTitle?: any;
    videoDescription?: any;
}

const EmbedSharePopup: React.FC<EmbedSharePopupProps> = ({
    videoUrl,
    embedCode,
    copyEmbedCodeHandler,
    setIsEmbedModalOpen,
    chevronUpIconVideo,
    chevronDownIconVideo,
    isLiked,
    redHeartIcon,
    whiteHeartIcon,
    videoLikes,
    commentIcon,
    videoComments,
    isSaved,
    savedIcon,
    saveIcon,
    videoSaves,
    shareIcon,
    videoShares,
    musicIcon,
    userName,
    musicTitle,
    videoDescription
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white px-6 py-12 rounded-md shadow-lg w-2/5 h-fit">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-black text-left">Embed Video</h2>
                    <img
                        onClick={() => setIsEmbedModalOpen(false)}
                        className="object-contain h-8 w-8 cursor-pointer"
                        src={cross}
                    />
                </div>
                <div className="w-full h-[1px] bg-gray-300 mb-3 -mt-2" />
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className={'h-fit w-1/3 relative border border-gray-100 rounded-b-md'}>
                        <video
                            className="h-[350px] w-full rounded-t-md object-cover"
                            loop={true}
                            controls={false}
                            autoPlay={true}
                            width="300px"
                            preload="auto"
                            playsInline
                            src={videoUrl}
                        />
                        <div className="text-left px-1 py-2">
                            <p className="font-medium text-[0.6rem]">@{userName}</p>
                            <p className="font-medium text-[0.6rem] mt-[0.2rem]">
                                {videoDescription}
                            </p>
                            <div className="flex flex-row items-center gap-1 mt-[0.2rem]">
                                <img
                                    className={`w-2.5 h-2.5 object-contain`}
                                    src={musicIcon}
                                    alt="music-icon"
                                />
                                <p className="font-normal text-[0.6rem] whitespace-nowrap">
                                    {musicTitle?.toLowerCase()} -{' '}
                                </p>
                                <h4 className="font-normal text-[0.6rem] whitespace-nowrap">
                                    {userName}
                                </h4>
                            </div>
                        </div>
                        <div className="absolute flex flex-col justify-between items-center gap-2.5 bottom-20 right-2 w-10 text-white">
                            {/* Video next and previous */}
                            <div className="text-center flex flex-col justify-between items-center gap-3 mb-2 shadow rounded-full bg-[#5755556a] px-2 py-1">
                                <img
                                    className="h-5 w-5 object-contain cursor-pointer"
                                    src={chevronUpIconVideo}
                                />
                            </div>
                            <div className="text-center">
                                <img
                                    className="h-5 w-5 object-contain"
                                    src={isLiked ? redHeartIcon : whiteHeartIcon}
                                />
                                <p className="font-bold text-[0.5rem] mt-1 text-white">
                                    {videoLikes}
                                </p>
                            </div>
                            <div className="text-center">
                                <img className="h-5 w-5 object-contain" src={commentIcon} />
                                <p className="font-bold text-[0.5rem] mt-1 text-white">
                                    {videoComments?.length}
                                </p>
                            </div>
                            <div className="text-center">
                                <img
                                    className="h-5 w-5 object-contain"
                                    src={isSaved ? savedIcon : saveIcon}
                                />
                                <p className="font-bold text-[0.5rem] mt-1 text-white">
                                    {videoSaves}
                                </p>
                            </div>
                            <div className="text-center relative">
                                <img className="h-5 w-5 object-contain" src={shareIcon} />
                                <p className="font-bold text-[0.5rem] mt-1 text-white">
                                    {videoShares}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 flex flex-col justify-between items-center h-[400px]">
                        <h4 className="font-medium text-lg text-black text-left mr-auto mb-3.5 -mt-2">
                            Copy code to embed this video
                        </h4>
                        <textarea
                            readOnly
                            className="w-full p-2 border border-gray-300 text-justify rounded-md mb-4 h-full bg-gray-100"
                            value={embedCode}
                        />
                        <div className="w-full">
                            <button
                                className="w-full px-4 py-2 bg-white border border-gray-100 text-black rounded-md"
                                onClick={copyEmbedCodeHandler}
                            >
                                Copy Code
                            </button>
                            <p className="font-normal text-sm text-gray-500 text-justify mt-2 tracking-normal">
                                By embedding this video, you confirm that you agree to our{' '}
                                <span className="underline cursor-pointer">Terms of Service </span>{' '}
                                and acknowledge you have read and understood our{' '}
                                <span className="underline cursor-pointer">Privacy Policy</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmbedSharePopup;
