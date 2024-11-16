import React, { useEffect, useState } from 'react';
import { cross, defaultAvatar } from '../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import style from './embed.module.scss'
import { followingsMethod } from '../../redux/AsyncFuncs';

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
    videoOwner?: any;
    videoOwnerId?: any;
    videoOwnerAvatar?: any;
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
    videoDescription,
    videoOwner,
    videoOwnerId,
    videoOwnerAvatar,
}) => {

    const navigate: any = useNavigate();
    const dispatch = useDispatch();

    const followers = useSelector((store: { reducers: { followings: any } }) => store.reducers.followings);
    const [followBtnLoading, setfollowBtnLoading] = useState(false);
    const [followimgbtnId, setFollowimgbtnId] = useState('');

    const follow_Unfollow_handler = async (id: any) => {
        setFollowimgbtnId(id);
        setfollowBtnLoading(true);
        try {
            dispatch(followingsMethod(id)).then(() => setfollowBtnLoading(false));
        } catch (error) {
            alert('Somthing went wrong');
            console.log(error);
        }
    };

    // useEffect(() => {
    //   console.log(post)
    // }, [post])
    

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
                            <p className="font-medium text-[0.9rem]">@{videoOwner}</p>
                            <p className="font-normal text-[0.8rem] mt-[0.2rem]">
                                {videoDescription?.length > 50
                                    ? `${videoDescription?.slice(0, 60)}... See more`
                                    : videoDescription}
                            </p>
                            <div className="mt-[0.2rem]">
                                <img
                                    className={`w-2.5 h-2.5 object-contain inline-block mr-1`}
                                    src={musicIcon}
                                    alt="music-icon"
                                />
                                <span className="font-normal text-[0.7rem]">
                                    {musicTitle?.toLowerCase()} -{' '}
                                </span>
                                <span className="font-normal text-[0.7rem]">
                                    {videoOwner}
                                </span>
                            </div>
                        </div>
                        <div className="absolute flex flex-col justify-between items-center gap-2.5 top-32 right-2 w-10 text-white">
                            {/* Video next and previous */}
                            <div className="text-center flex flex-col justify-between items-center gap-3 rounded-full px-2">
                                {/* <img
                                    className="h-5 w-5 object-contain cursor-pointer"
                                    src={chevronUpIconVideo}
                                /> */}
                                <div className={style.DivAvatarActionItemContainer}>
                                    <a
                                        className="e1g2yhv83 css-1w9wqra-StyledLink-AvatarLink er1vbsz0"
                                        href="#"
                                        onClick={() =>
                                            navigate(`/profile/${videoOwner}`)
                                        }
                                    >
                                        <div
                                            className={style.AvatarDivContainer}
                                            style={{ width: '35px', height: '35px' }}
                                        >
                                            <span
                                                className={style.SpanAvatarContainer}
                                                style={{
                                                    width: '35px',
                                                    height: '35px',
                                                }}
                                            >
                                                <img
                                                    loading="lazy"
                                                    alt="sherjangkhan5"
                                                    src={ videoOwnerAvatar ||
                                                        defaultAvatar
                                                    }
                                                    className="css-1zpj2q-ImgAvatar e1e9er4e1"
                                                />
                                            </span>
                                        </div>
                                    </a>

                                    <button
                                        className={style.AvatarFollowButton}
                                        data-e2e="feed-follow"
                                        onClick={() =>
                                            follow_Unfollow_handler(videoOwnerId)
                                        }
                                    >
                                        <span className={style.ColorButtonContent}>
                                            {followBtnLoading &&
                                                followimgbtnId === videoOwnerId ? (
                                                <CircularProgress
                                                    style={{ width: 3, height: 3 }}
                                                />
                                            ) : followers?.data?.some(
                                                (user: any) =>
                                                    user.followed_userID._id ===
                                                videoOwnerId
                                            ) ? (
                                                <svg
                                                    fill="white"
                                                    viewBox="0 0 48 48"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="1em"
                                                    height="1em"
                                                >
                                                    <path d="m19.71 36.03 19.73-30.5a1 1 0 0 1 1.39-.3l2.35 1.53c.46.3.6.92.3 1.38L22.01 41.3a2.4 2.4 0 0 1-3.83.28L4.85 26.33a1 1 0 0 1 .1-1.4l2.1-1.85a1 1 0 0 1 1.42.1L19.7 36.02Z"></path>
                                                </svg>
                                            ) : (
                                                <svg
                                                    fill="white"
                                                    viewBox="0 0 48 48"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="1em"
                                                    height="1em"
                                                >
                                                    <path d="M26 7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v15H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h15v15a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V26h15a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H26V7Z"></path>
                                                </svg>
                                            )}
                                        </span>
                                    </button>
                                </div>
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
                                    {videoComments}
                                </p>
                            </div>
                            {/* <div className="text-center">
                                <img
                                    className="h-5 w-5 object-contain"
                                    src={isSaved ? savedIcon : saveIcon}
                                />
                                <p className="font-bold text-[0.5rem] mt-1 text-white">
                                    {videoSaves}
                                </p>
                            </div> */}
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
                            className="w-full p-2 border border-gray-300 text-justify rounded-md mb-4 h-full bg-gray-100 text-gray-500"
                            value={embedCode.replace(/\s{2,}/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<').trim()}
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
