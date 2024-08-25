import { useParams } from 'react-router-dom';
import Layout from '../../shared/layout';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './video-page.module.scss';
import musicIcon from './svg-components/music-icon.svg';
import atTheRateOf from './svg-components/at-the-rate-of.svg';
import commentIcon from './svg-components/comment-icon.svg';
import horizontalElipsisMenuIcon from './svg-components/horizontal-elipsis-icon.svg';
import reportFlagIcon from './svg-components/report-flag-icon.svg';
import emptyHeartIcon from './svg-components/empty-heart-icon.svg';
import redHeartIcon from './svg-components/red-heart-icon.svg';
import chevronDownIcon from './svg-components/chevron-down-icon.svg';
import chevronTopIcon from './svg-components/chevron-top-icon.svg';
import { COMMENTS, showToastSuccess } from '../../utils/constants';
import PopupForReport from '../profile/popups/PopupForReport';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import likesIcon from '../../../public/images/icons/Heart2.svg';
import { cross } from '../../icons';

const VideoPage = () => {
    // hooks
    const { videoId } = useParams();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [comment, setComment] = useState('');
    const [commentReply, setCommentReply] = useState('');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isReportElipsisVisible, setIsReportElipsisVisible] = useState(false);
    const [toggleImage, setToggleImage] = useState(false);
    const [isEmptyHeart, setIsEmptyHeart] = useState(true);
    const [currentCommentIndex, setCurrentCommentIndex] = useState(-1);
    const [currentCommentReplyIndex, setCurrentCommentReplyIndex] = useState(-1);
    const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});
    const [commentsArray, setCommentsArray] = useState<any>([]);
    const [reportPopup, setReportPopup] = useState(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [videoLikes, setVideoLikes] = useState(0);
    const [videoShares, setVideoShares] = useState(0);
    const [videoViews, setVideoViews] = useState(0);
    const [videoDescription, setVideoDescription] = useState('');
    const [videoComments, setVideoComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [youMayLikeVideos, setYouMayLikeVideos] = useState<any>([]);
    const [muteStates, setMuteStates] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [commenterName, setCommenterName] = useState('');
    const [commenterAvatar, setCommenterAvatar] = useState('');
    const [isReplyToCommentClicked, setIsReplyToCommentClicked] = useState(false);

    const [isFollowed, setUserIsFollowed] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [followToggleLoading, setFollowToggleLoading] = useState(false);

    // hooks for comment replies
    const [isCommentReplyTooltipVisible, setCommentReplyIsTooltipVisible] = useState(false);
    const [isCommentReplyReportElipsisVisible, setCommentReplyIsReportElipsisVisible] =
        useState(false);
    const [toggleCommentReplyImage, setToggleCommentReplyImage] = useState(false);
    const [likedReplies, setLikedReplies] = useState<{ [key: string]: boolean }>({});

    // functions related to comment
    const atRateHandler = () => {
        setComment((prev) => prev + '@');
    };

    const commentLikeToggler = async (commentId: number) => {
        setLikedComments((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));

        try {
            const addCommentResponse = await fetch(
                `${API_KEY}/media-content/like/comment/${commentId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ comment }),
                }
            );
            await addCommentResponse.json();
            fetchMediaById();
        } catch (error) {
            console.log('🚀 ~ addCommentHandler ~ error:', error);
        }
    };

    const addCommentHandler = async () => {
        try {
            const addCommentResponse = await fetch(`${API_KEY}/media-content/comment/${videoId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment }),
            });
            await addCommentResponse.json();
            setComment('');
            showToastSuccess('Comment posted');
            fetchMediaById();
        } catch (error) {
            console.log('🚀 ~ addCommentHandler ~ error:', error);
        }
    };

    const replyToCommentHandler = async (commentId: number) => {
        setIsReplyToCommentClicked(true);
        try {
            const addCommentResponse = await fetch(`${API_KEY}/media-content/comment/${videoId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment: commentReply, commentId }),
            });
            await addCommentResponse.json();
            setCommentReply('');
            showToastSuccess('Comment reply posted');
            fetchMediaById();
        } catch (error) {
            console.log('🚀 ~ addCommentHandler ~ error:', error);
        }
    };

    // functions related to comment replies
    const commentReplyLikeToggler = async (commentId: number, replyId: number) => {
        setLikedReplies((prev) => ({
            ...prev,
            [replyId]: !prev[replyId],
        }));

        try {
            const addCommentResponse = await fetch(
                `${API_KEY}/media-content/like/comment/${commentId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ comment, replyId }),
                }
            );
            await addCommentResponse.json();
            fetchMediaById();
        } catch (error) {
            console.log('🚀 ~ commentReplyLikeToggler ~ error:', error);
        }
    };

    const [visibleReplies, setVisibleReplies] = useState<any>({});

    const toggleRepliesVisibility = (commentId: number) => {
        setVisibleReplies((prev: any) => ({
            ...prev,
            [commentId]: !prev[commentId], // Toggles the visibility
        }));
    };

    const fetchMediaById = async (videoIdPassed?: number) => {
        try {
            const fetchMediaResponse = await fetch(
                `${API_KEY}/media-content/videos/${videoIdPassed ?? videoId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await fetchMediaResponse.json();
            setUserId(data?.user?._id);
            setName(data?.user?.name);
            setUserName(data?.user?.username);
            setUserAvatar(data?.user?.avatar);
            setUserIsFollowed(data?.user?.isFollowed);
            setVideoLikes(data?.likes);
            setVideoShares(data?.shares);
            setVideoViews(data?.views);
            setVideoDescription(data?.description);
            setVideoComments(data?.comments);
            setVideoUrl(data?.reducedVideoUrl);
        } catch (error) {
            console.log('🚀 ~ fetchMediaById ~ error:', error);
        }
    };

    const toggleFollow = async () => {
        setFollowToggleLoading(true);
        try {
            const fetchMediaResponse = await fetch(`${API_KEY}/profile/follow/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            await fetchMediaResponse.json();
            setUserIsFollowed(!isFollowed);
            setFollowToggleLoading(false);
        } catch (error) {
            setFollowToggleLoading(false);
            console.log('🚀 ~ toggleFollow ~ error:', error);
        }
    };

    const getExplorePageData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${API_KEY}/media-content/public/videos/feed/upgraded?page=${pageNumber}&pageSize=5`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await response.json();
            setIsLoading(false);
            if (data) {
                // Append the entire record to the existing data
                setYouMayLikeVideos((prev: any) => [...prev, ...data]);
                setMuteStates((prevMuteStates: any) => [
                    ...prevMuteStates,
                    ...Array(data?.length).fill(true),
                ]);
            }
        } catch (error) {
            setIsLoading(false);
            console.log('Error fetching trending videos : ', error);
        }
    };

    const loadVideoFromYouMayLikeSection = (videoId: number) => {
        setYouMayLikeVideos([]);
        fetchMediaById(videoId);
        getExplorePageData();
    };

    const loadUserProfile = async () => {
        try {
            const fetchMediaResponse = await fetch(`${API_KEY}/profile`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = await fetchMediaResponse.json();
            setCommenterName(data?.name);
            setCommenterAvatar(data?.avatar);
        } catch (error) {
            console.log('🚀 ~ fetchMediaById ~ error:', error);
        }
    };

    useEffect(() => {
        loadUserProfile();
        fetchMediaById();
        getExplorePageData();
    }, []);

    return (
        <Layout isScrollActive={false} paddingBottomProp={true}>
            <div className="flex flex-row h-full overflow-y-auto justify-between pt-4 pl-8">
                <div className="w-full">
                    <video
                        className="h-[31.875rem] w-full object-contain rounded-t-md bg-[#161823] cursor-pointer"
                        loop={true}
                        controls={true}
                        autoPlay={true}
                        width="300px"
                        preload="auto"
                        playsInline
                        src={videoUrl}
                    />
                    <div className="p-3.5 bg-[#16182308] rounded-b-xl">
                        <div className="flex flex-row items-center gap-2">
                            {/* avatar */}

                            {userAvatar && userAvatar != '' ? (
                                <img
                                    className={`w-12 h-12 object-cover rounded-full cursor-pointer`}
                                    src={userAvatar}
                                    alt="avatar"
                                />
                            ) : (
                                <div
                                    className={`w-12 h-12 object-cover rounded-full bg-gray-800 flex justify-center items-center`}
                                >
                                    <p className="text-lg text-white font-medium">
                                        {userName.charAt(0).toUpperCase()}
                                    </p>
                                </div>
                            )}
                            <div className="flex flex-row items-center gap-12">
                                <div className="text-left">
                                    <p className="font-bold text-base text-black cursor-pointer hover:underline">
                                        {name}
                                    </p>
                                    <p className="font-normal text-black text-sm cursor-pointer">
                                        {userName}
                                    </p>
                                </div>
                                <div
                                    onClick={toggleFollow}
                                    className="rounded-sm h-full bg-[#ff3b5c] hover:bg-[#e93654] px-4 py-2 cursor-pointer w-fit"
                                    style={{
                                        width: '100px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {followToggleLoading ? (
                                        <CircularProgress
                                            style={{
                                                width: 16,
                                                height: 16,
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <p className="font-semibold text-sm text-white">
                                            {isFollowed ? 'Friends' : 'Follow'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-left mt-3 flex flex-row items-center justify-center w-fit gap-1">
                            <span className="font-semibold text-[0.938rem] text-[#2B5DB9] hover:underline cursor-pointer">
                                #foryoupage
                            </span>
                            <span className="font-semibold text-[0.938rem] text-[#2B5DB9] hover:underline cursor-pointer">
                                #viralvideo
                            </span>
                            <span className="font-semibold text-[0.938rem] text-[#2B5DB9] hover:underline cursor-pointer">
                                #viral
                            </span>
                            <span className="font-semibold text-[0.938rem] text-[#2B5DB9] hover:underline cursor-pointer">
                                #fyp
                            </span>
                            <span className="font-semibold text-[0.938rem] text-[#2B5DB9] hover:underline cursor-pointer">
                                #333
                            </span>
                        </div>
                        <div className="flex flex-row items-center mt-1.5 gap-1 hover:underline cursor-pointer">
                            <img
                                className={`w-3 h-3 object-contain`}
                                src={musicIcon}
                                alt="music-icon"
                            />
                            <p className="text-black text-sm font-light">original sounds - </p>
                            <h4 className="text-black text-sm font-normal">{userName}</h4>
                        </div>
                    </div>
                    {/* Add comment section */}
                    <div className="mt-6">
                        <p className="text-[#161823] font-bold text-[1.125rem] text-left">
                            {videoComments?.length || 0}{' '}
                            {videoComments?.length === 1 ? 'comment' : 'comments'}
                        </p>
                        <div className="flex flex-row items-start gap-3 mt-3">
                            {/* Commenter avatar */}
                            {commenterAvatar && commenterAvatar != '' ? (
                                <img
                                    className={`w-12 h-12 object-contain rounded-full`}
                                    src={commenterAvatar}
                                    alt=""
                                />
                            ) : (
                                <div
                                    className={`w-12 h-12 object-cover rounded-full bg-gray-800 flex justify-center items-center`}
                                >
                                    <p className="text-lg text-white font-medium">
                                        {commenterName.charAt(0)}
                                    </p>
                                </div>
                            )}
                            <div className="pb-6 border-b border-b-[#0000001f] cursor-pointer w-full flex flex-row items-center gap-2.5">
                                <div className="bg-[#1618230f] flex flex-row items-center justify-between border-[0.063rem] border-transparent focus-within:border-[#16182333] rounded-lg cursor-text pr-2 pl-4 w-full">
                                    <input
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        maxLength={150}
                                        placeholder="Add comment..."
                                        type="text"
                                        className="bg-transparent placeholder-[#4d4e58] w-full"
                                    />
                                    <div className="flex flex-row items-center">
                                        <div
                                            onClick={atRateHandler}
                                            className="rounded-lg cursor-pointer hover:bg-[#1618230f] p-[0.313rem] my-[0.438rem] mx-[0.188rem] mr-1"
                                        >
                                            <img
                                                className={`w-5 h-5 object-contain rounded-full`}
                                                src={atTheRateOf}
                                                alt="at-the-rate-icon"
                                            />
                                        </div>
                                        <div className="rounded-lg cursor-pointer hover:bg-[#1618230f] p-[0.313rem] my-[0.438rem] mx-[0.188rem]">
                                            <img
                                                className={`w-5 h-5 object-contain rounded-full`}
                                                src={commentIcon}
                                                alt="comment-icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={addCommentHandler} className="mr-1">
                                    <p
                                        className={`${
                                            comment?.length > 0
                                                ? 'text-[#fe2c55]'
                                                : 'text-[#16182357]'
                                        } font-semibold text-base`}
                                    >
                                        Post
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* All comments section */}
                    {videoComments?.map((comment: any, comment_index: number) => (
                        <div key={comment?.id}>
                            <div
                                onMouseEnter={() => {
                                    setIsReportElipsisVisible(true);
                                    setCurrentCommentIndex(comment_index);
                                    setIsReplyToCommentClicked(false);
                                }}
                                onMouseLeave={() => {
                                    setIsReportElipsisVisible(false);
                                    setIsTooltipVisible(false);
                                }}
                                className="flex flex-row items-start gap-3 mt-4"
                            >
                                {comment?.user?.avatar ? (
                                    <img
                                        className={`w-12 h-12 object-contain rounded-full`}
                                        src={commenterAvatar}
                                        alt=""
                                    />
                                ) : (
                                    <div
                                        className={`w-12 h-12 object-cover rounded-full bg-gray-800 flex justify-center items-center`}
                                    >
                                        <p className="text-lg text-white font-medium">
                                            {comment?.user?.name?.charAt(0)}
                                        </p>
                                    </div>
                                )}
                                <div className="flex flex-row items-start justify-between gap-12 w-full">
                                    <div className="text-left w-full">
                                        <p className="font-semibold text-sm text-[#161823] cursor-pointer hover:underline">
                                            {comment?.user?.name}
                                        </p>
                                        <p className="font-normal text-[#161823] text-base cursor-pointer">
                                            {comment?.comment}
                                        </p>
                                        <div className="flex flex-row items-center gap-4 mt-1">
                                            <p className="text-[#16182380] font-normal text-sm">
                                                {moment(comment?.createdTime).format('D-MM')}
                                            </p>
                                            <div
                                                onClick={() => commentLikeToggler(comment?.id)}
                                                className="flex flex-row items-center gap-1.5"
                                            >
                                                <img
                                                    className={`w-4 h-4 object-contain cursor-pointer`}
                                                    src={
                                                        likedComments[comment?.id]
                                                            ? redHeartIcon
                                                            : emptyHeartIcon
                                                    }
                                                    alt=""
                                                />
                                                <p className="text-[#161823] font-normal text-sm">
                                                    {comment?.likes}
                                                </p>
                                            </div>
                                            <p
                                                onClick={() => setIsReplyToCommentClicked(true)}
                                                className="text-[#161823] font-normal text-[0.938rem] cursor-pointer"
                                            >
                                                Reply
                                            </p>
                                        </div>
                                        {comment_index === currentCommentIndex &&
                                            isReplyToCommentClicked && (
                                                <div className="cursor-pointer flex w-full flex-row items-center gap-2.5 mt-2">
                                                    <div className="bg-[#1618230f] flex flex-row items-center justify-between border-[0.063rem] border-transparent focus-within:border-[#16182333] rounded-lg cursor-text pr-2 pl-4 w-full mr-1">
                                                        <input
                                                            value={commentReply}
                                                            onChange={(e) =>
                                                                setCommentReply(e.target.value)
                                                            }
                                                            maxLength={150}
                                                            placeholder="Add comment..."
                                                            type="text"
                                                            className="bg-transparent placeholder-[#4d4e58] text-black w-full"
                                                        />
                                                        <div className="flex flex-row items-center">
                                                            <div
                                                                onClick={atRateHandler}
                                                                className="rounded-lg cursor-pointer hover:bg-[#1618230f] p-[0.313rem] my-[0.438rem] mx-[0.188rem] mr-1"
                                                            >
                                                                <img
                                                                    className={`w-5 h-5 object-contain rounded-full`}
                                                                    src={atTheRateOf}
                                                                    alt="at-the-rate-icon"
                                                                />
                                                            </div>
                                                            <div className="rounded-lg cursor-pointer hover:bg-[#1618230f] p-[0.313rem] my-[0.438rem] mx-[0.188rem]">
                                                                <img
                                                                    className={`w-5 h-5 object-contain rounded-full`}
                                                                    src={commentIcon}
                                                                    alt="comment-icon"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            replyToCommentHandler(comment?.id)
                                                        }
                                                        className="mr-1"
                                                    >
                                                        <p
                                                            className={`${
                                                                commentReply?.length > 0
                                                                    ? 'text-[#fe2c55]'
                                                                    : 'text-[#16182357]'
                                                            } font-semibold text-base`}
                                                        >
                                                            Post
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            setIsReplyToCommentClicked(false)
                                                        }
                                                        className="mr-1"
                                                    >
                                                        <img
                                                            className={`w-5 h-5 object-contain rounded-full`}
                                                            src={cross}
                                                            alt="cross-icon"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                                {isReportElipsisVisible && comment_index === currentCommentIndex ? (
                                    <div className="relative inline-block">
                                        <img
                                            className="w-5 h-5 object-contain cursor-pointer"
                                            src={horizontalElipsisMenuIcon}
                                            alt="horizontal-elipsis-menu-icon"
                                            onMouseEnter={() => setIsTooltipVisible(true)}
                                        />
                                        {isTooltipVisible && (
                                            <div
                                                className="absolute right-0 mt-2 cursor-pointer"
                                                onMouseEnter={() => setIsTooltipVisible(true)}
                                                onMouseLeave={() => setIsTooltipVisible(false)}
                                                onClick={() => setReportPopup(true)}
                                            >
                                                <div
                                                    onMouseEnter={() => setToggleImage(true)}
                                                    onMouseLeave={() => setToggleImage(false)}
                                                    className="bg-white text-black text-sm pr-16 pl-4 py-3 rounded-lg shadow flex flex-row justify-start gap-2.5 items-center"
                                                >
                                                    {toggleImage ? (
                                                        <img
                                                            className="h-6 w-6 object-contain"
                                                            src={reportFlagIcon}
                                                            style={{
                                                                filter: 'invert(27%) sepia(100%) saturate(7098%) hue-rotate(339deg) brightness(92%) contrast(110%)',
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            className="h-6 w-6 object-contain bg-pink"
                                                            src={reportFlagIcon}
                                                        />
                                                    )}
                                                    <span
                                                        style={{
                                                            color: toggleImage
                                                                ? '#fe2c55'
                                                                : '#000000',
                                                        }}
                                                        className="font-semibold text-base mb-1"
                                                    >
                                                        Report
                                                    </span>
                                                </div>
                                                {/* Tooltip arrow */}
                                                <div className="absolute top-2.5 right-1.5 transform -translate-x-1/2 -translate-y-full">
                                                    <div className="w-3 h-3.5 bg-white rotate-45 shadow-lg"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-5 w-5" />
                                )}
                            </div>
                            {/* Comment Replies */}
                            <div className="pl-[3.25rem] mt-2">
                                {comment?.replies?.map(
                                    (comment_replies: any, comment_reply_index: number) => (
                                        <div key={comment_replies?.id}>
                                            {visibleReplies[comment?.id] && (
                                                <div
                                                    onMouseEnter={() => {
                                                        setCommentReplyIsReportElipsisVisible(true);
                                                        setCurrentCommentIndex(comment_index);
                                                        setCurrentCommentReplyIndex(
                                                            comment_reply_index
                                                        );
                                                    }}
                                                    onMouseLeave={() => {
                                                        setCommentReplyIsReportElipsisVisible(
                                                            false
                                                        );
                                                        setCommentReplyIsTooltipVisible(false);
                                                    }}
                                                    className="flex flex-row items-start gap-3 mt-3"
                                                >
                                                    {comment?.user?.avatar ? (
                                                        <img
                                                            className={`w-6 h-6 object-contain rounded-full`}
                                                            src={commenterAvatar}
                                                            alt="comment-replyavatar"
                                                        />
                                                    ) : (
                                                        <div
                                                            className={`w-6 h-6 object-cover rounded-full bg-gray-800 flex justify-center items-center`}
                                                        >
                                                            <p className="text-lg text-white font-medium">
                                                                {comment?.user?.name?.charAt(0)}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-row items-start justify-between gap-12 w-full">
                                                        <div className="text-left">
                                                            <p className="font-semibold text-sm text-[#161823] cursor-pointer hover:underline">
                                                                {comment_replies?.user?.name}
                                                            </p>
                                                            <p className="font-normal text-[#161823] text-base cursor-pointer">
                                                                {comment_replies?.reply}
                                                            </p>
                                                            <div className="flex flex-row items-center gap-4 mt-1">
                                                                <p className="text-[#16182380] font-normal text-sm">
                                                                    {moment(
                                                                        comment?.createdTime
                                                                    ).format('D-MM')}
                                                                </p>
                                                                <div
                                                                    onClick={() =>
                                                                        commentReplyLikeToggler(
                                                                            comment?.id,
                                                                            comment_replies?.id
                                                                        )
                                                                    }
                                                                    className="flex flex-row items-center gap-1.5"
                                                                >
                                                                    <img
                                                                        className={`w-4 h-4 object-contain cursor-pointer`}
                                                                        src={
                                                                            likedReplies[
                                                                                comment_replies?.id
                                                                            ]
                                                                                ? redHeartIcon
                                                                                : emptyHeartIcon
                                                                        }
                                                                        alt="like-icon"
                                                                    />
                                                                    <p className="text-[#161823] font-normal text-sm">
                                                                        {comment_replies?.likes}
                                                                    </p>
                                                                </div>
                                                                {/* <p
                                                                    onClick={() =>
                                                                        setIsReplyToCommentClicked(
                                                                            true
                                                                        )
                                                                    }
                                                                    className="text-[#161823] font-normal text-[0.938rem] cursor-pointer"
                                                                >
                                                                    Reply
                                                                </p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {isCommentReplyReportElipsisVisible &&
                                                        comment_index === currentCommentIndex &&
                                                        comment_reply_index ===
                                                            currentCommentReplyIndex && (
                                                            <div className="relative inline-block">
                                                                <img
                                                                    className="w-5 h-5 object-contain cursor-pointer"
                                                                    src={horizontalElipsisMenuIcon}
                                                                    alt="horizontal-elipsis-menu-icon"
                                                                    onMouseEnter={() =>
                                                                        setCommentReplyIsTooltipVisible(
                                                                            true
                                                                        )
                                                                    }
                                                                />
                                                                {isCommentReplyTooltipVisible && (
                                                                    <div
                                                                        onClick={() =>
                                                                            setReportPopup(true)
                                                                        }
                                                                        className="absolute right-0 mt-2 cursor-pointer"
                                                                        onMouseEnter={() =>
                                                                            setCommentReplyIsTooltipVisible(
                                                                                true
                                                                            )
                                                                        }
                                                                        onMouseLeave={() =>
                                                                            setCommentReplyIsTooltipVisible(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <div
                                                                            onMouseEnter={() =>
                                                                                setToggleCommentReplyImage(
                                                                                    true
                                                                                )
                                                                            }
                                                                            onMouseLeave={() =>
                                                                                setToggleCommentReplyImage(
                                                                                    false
                                                                                )
                                                                            }
                                                                            className="bg-white text-black text-sm pr-16 pl-4 py-3 rounded-lg shadow flex flex-row justify-start gap-2.5 items-center"
                                                                        >
                                                                            {toggleCommentReplyImage ? (
                                                                                <img
                                                                                    className="h-6 w-6 object-contain"
                                                                                    src={
                                                                                        reportFlagIcon
                                                                                    }
                                                                                    style={{
                                                                                        filter: 'invert(27%) sepia(100%) saturate(7098%) hue-rotate(339deg) brightness(92%) contrast(110%)',
                                                                                    }}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    className="h-6 w-6 object-contain bg-pink"
                                                                                    src={
                                                                                        reportFlagIcon
                                                                                    }
                                                                                />
                                                                            )}
                                                                            <span
                                                                                style={{
                                                                                    color: toggleCommentReplyImage
                                                                                        ? '#fe2c55'
                                                                                        : '#000000',
                                                                                }}
                                                                                className="font-semibold text-base mb-1"
                                                                            >
                                                                                Report
                                                                            </span>
                                                                        </div>
                                                                        {/* Tooltip arrow */}
                                                                        <div className="absolute top-2.5 right-1.5 transform -translate-x-1/2 -translate-y-full">
                                                                            <div className="w-3 h-3.5 bg-white rotate-45 shadow-lg"></div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}

                                {/* Render "View Replies" or "Hide" outside of the loop */}
                                {comment?.replies?.length > 0 && (
                                    <div className="flex flex-row justify-between items-center">
                                        {!visibleReplies[comment?.id] ? (
                                            <div className="flex flex-row justify-between items-center w-full">
                                                <div
                                                    onClick={() =>
                                                        toggleRepliesVisibility(comment?.id)
                                                    }
                                                    className="flex flex-row items-center gap-2 text-left hover:underline decoration-[#16182380] cursor-pointer mt-[0.688rem]"
                                                >
                                                    <p className="text-[#16182380] font-medium text-sm">
                                                        View {comment?.replies?.length} replies
                                                    </p>
                                                    <img
                                                        className="w-2.5 h-2.5 object-contain cursor-pointer"
                                                        src={chevronDownIcon}
                                                        alt="chevron-down-icon"
                                                        style={{
                                                            filter: 'invert(15%) sepia(%) saturate(145%) hue-rotate(178deg) brightness(95%) contrast(90%)',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-row justify-between items-center w-full">
                                                {/* I will use this in future for comment replies pagination */}

                                                {/* <div
                                                onClick={() => toggleRepliesVisibility(comment?.id)}
                                                className="flex flex-row items-center gap-2 text-left hover:underline decoration-[#16182380] cursor-pointer mt-[0.688rem]"
                                            >
                                                <div className="w-[2.25rem] h-[0.063rem] bg-[#1618231f] mr-2" />
                                                <p className="text-[#16182380] font-medium text-sm">
                                                    View {comment?.comment_replies?.length} replies
                                                </p>
                                                <img
                                                    className="w-2.5 h-2.5 object-contain cursor-pointer"
                                                    src={chevronDownIcon}
                                                    alt="chevron-down-icon"
                                                    style={{
                                                        filter: 'invert(15%) sepia(%) saturate(145%) hue-rotate(178deg) brightness(95%) contrast(90%)',
                                                    }}
                                                />
                                            </div> */}
                                                <div
                                                    onClick={() =>
                                                        toggleRepliesVisibility(comment?.id)
                                                    }
                                                    className="flex flex-row justify-end w-full items-center gap-2 text-left hover:underline decoration-[#16182380] cursor-pointer mt-[0.688rem]"
                                                >
                                                    <p className="text-[#16182380] font-medium text-sm">
                                                        Hide
                                                    </p>
                                                    <img
                                                        className="w-2.5 h-2.5 object-contain cursor-pointer"
                                                        src={chevronTopIcon}
                                                        alt="chevron-top-icon"
                                                        style={{
                                                            filter: 'invert(15%) sepia(%) saturate(145%) hue-rotate(178deg) brightness(95%) contrast(90%)',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-start flex-1 px-4 min-w-[22.5rem]">
                    <p className="font-semibold text-lg mb-2.5 -mt-2">You May Like</p>
                    <div className="flex flex-wrap justify-between gap-3">
                        {youMayLikeVideos.map((video: any, index: number) => (
                            <div key={index} className="w-[9.188rem]">
                                <div
                                    onClick={() => loadVideoFromYouMayLikeSection(video?.mediaId)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="cursor-pointer relative col-span-1 h-[12.625rem] w-full"
                                >
                                    <video
                                        className={`w-full h-full object-cover rounded-lg ${
                                            hoveredIndex === index ? 'block' : 'hidden'
                                        }`}
                                        src={
                                            video?.reducedVideoUrl.length > 0
                                                ? video?.reducedVideoUrl
                                                : video?.originalUrl
                                        }
                                        muted={isMuted}
                                        loop
                                        autoPlay={true}
                                        preload="auto"
                                        playsInline
                                    />
                                    <img
                                        className={`w-full h-full object-cover rounded-lg ${
                                            hoveredIndex === index ? 'hidden' : 'block'
                                        }`}
                                        src={video?.thumbnailUrl}
                                        alt="thumbnail-image"
                                    />
                                </div>
                                <div className="flex flex-col w-full h-full">
                                    <div className="flex relative">
                                        <p className={styles.forYouVideo}>{video?.description}</p>
                                    </div>
                                    <div className="flex relative">
                                        <p className={styles.forYouVideoUserName}>
                                            {video?.user?.username}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center relative gap-2">
                                        <div className="flex flex-row justify-between items-center gap-1">
                                            <img
                                                className="w-5 h-5 object-contain rounded-lg"
                                                src={likesIcon}
                                                alt="likes-icon"
                                            />
                                            <p className="font-medium text-[0.9rem]">
                                                {video?.likes}
                                            </p>
                                        </div>
                                        {' . '}
                                        <p className="font-medium text-[0.9rem]">
                                            {moment(video?.createdTime).format('D-MM')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '1rem',
                                    width: '100%',
                                }}
                            >
                                <CircularProgress />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {reportPopup && (
                <PopupForReport
                    openReport={reportPopup}
                    onReportClose={() => setReportPopup(false)}
                    info={{}}
                />
            )}
            <ToastContainer />
        </Layout>
    );
};

export default VideoPage;
