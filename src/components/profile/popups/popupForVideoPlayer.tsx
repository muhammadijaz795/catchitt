import { CircularProgress, ClickAwayListener, Modal } from '@mui/material';
import style from './popupForVideoPlayer.module.scss';
import VideoModel from '../components/videoModel';
import moment from 'moment';
import musicTuneLight from '../svg-components/music-tune-light.svg';
import locationIcon from '../svg-components/location-icon.svg';
import { isUserLoggedIn } from '../../../utils/common';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import redHeartIcon from '../svg-components/red-heart-icon.svg';
import whiteHeartIcon from '../svg-components/white-filled-heart-icon.svg';
import commentIcon from '../svg-components/comment-icon.svg';
import saveIcon from '../svg-components/save-icon.svg';
import savedIcon from '../svg-components/saved-icon.svg';
import repostIcon from '../svg-components/repost-icon.svg';
import shareIcon from '../svg-components/share-icon.svg';
import sendToFriendsIcon from '../svg-components/send-to-friends-icon.svg';
import embedShare from '../svg-components/embed-light-icon.svg';
import whatsappShare from '../svg-components/whatsapp-icon.svg';
import facebookShare from '../svg-components/facebook-icon.svg';
import emptyHeartIcon from '../svg-components/empty-heart-icon.svg';
import emptyHeartLightIcon from '../svg-components/empty-heart-light-icon.svg';
import atTheRateOf from '../svg-components/at-the-rate-of.svg';
import commentEmoji from '../svg-components/comment-emoji.svg';
import horizontalElipsisMenuWhiteIcon from '../svg-components/horizontal-elipsis-icon-white.svg';
import horizontalElipsisMenuIcon from '../svg-components/horizontal-elipsis-icon.svg';
import reportFlagIcon from '../svg-components/report-flag-icon.svg';
import chevronDownIcon from '../svg-components/chevron-down-icon.svg';
import chevronTopIcon from '../svg-components/chevron-top-icon.svg';
import chevronDownLightIcon from '../svg-components/chevron-down-light-icon.svg';
import chevronTopLightIcon from '../svg-components/chevron-top-light-icon.svg';
import crossLightIcon from '../svg-components/cross-light-icon.svg';
import { useDispatch } from 'react-redux';
import { openLoginPopup } from '../../../redux/reducers';
import EmbedSharePopup from '../../../shared/components/EmbedSharePopup';
import { BASE_URL_FRONTEND, showToast, showToastSuccess } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import PopupForReport from './PopupForReport';
import { defaultAvatar, linkedInShare, twitterShare } from '../../../icons';
import { toast, ToastContainer } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import Forwardusers from '../../../shared/popups/shareTo/Forwardusers';
import CountUp from 'react-countup';

export default function PopupForVideoPlayer({
    videoModal,
    onclose,
    info,
    onReportPopup,
    onBlockPopup,
    gifts,
    sendPopupHandler,
    deleteVideoPopup,
    editVideoHandler,
}: any) {
    console.log('INFO', info);
    const token = localStorage.getItem('token');
    const API_KEY = process.env.VITE_API_URL;
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [selectedVideoId, setSelectedVideoId] = useState<any>(null);
    const [videoLikes, setVideoLikes] = useState<number>(0);
    const [videoComments, setVideoComments] = useState<any>([]);
    const [videoSaves, setVideoSaves] = useState<number>(0);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [isEmbedPopupVisible, setIsEmbedPopupVisible] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [userName, setUserName] = useState('rashid');
    const [musicTitle, setMusicTitle] = useState('');
    const [musicLink, setMusicLink] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [textToCopy, setTextToCopy] = useState('');
    const [currentTab, setCurrentTab] = useState(0);
    const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false);
    const [isReportElipsisVisible, setIsReportElipsisVisible] = useState<boolean>(false);
    const [totalComments, setTotalComments] = useState<any>(null);
    const [commentPageNumber, setCommentPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);
    const [currentCommentIndex, setCurrentCommentIndex] = useState(-1);
    const [isReplyToCommentClicked, setIsReplyToCommentClicked] = useState<boolean>(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
    const [comment, setComment] = useState('');
    const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [isFollowed, setUserIsFollowed] = useState<boolean>(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [videoShares, setVideoShares] = useState<number>(0);
    const [videoViews, setVideoViews] = useState<number>(0);
    const [commentReply, setCommentReply] = useState('');
    const [isMentioning, setIsMentioning] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const popupRef = useRef<any>(null);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [reportPopup, setReportPopup] = useState<boolean>(false);
    const [toggleImage, setToggleImage] = useState(false);
    const [commenterName, setCommenterName] = useState('');
    const [commenterAvatar, setCommenterAvatar] = useState('');
    const [commenterUsername, setCommenterUsername] = useState('');
    const [mentionIndex, setMentionIndex] = useState(0);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);
    const [addCommentLoading, setAddCommentLoading] = useState<boolean>(false);
    // hooks for comment replies
    const [isCommentReplyTooltipVisible, setCommentReplyIsTooltipVisible] = useState(false);
    const [isCommentReplyReportElipsisVisible, setCommentReplyIsReportElipsisVisible] =
        useState(false);
    const [toggleCommentReplyImage, setToggleCommentReplyImage] = useState(false);
    const [likedReplies, setLikedReplies] = useState<{ [key: string]: boolean }>({});
    const [visibleReplies, setVisibleReplies] = useState<any>({});
    const [currentCommentReplyIndex, setCurrentCommentReplyIndex] = useState(-1);
    const [sendPopup, setSendPopup] = useState(false);

    const videoData = {
        videoId: info?.mediaId,
        username: userName,
        caption: videoDescription,
        tags: ['support', 'fypシ゚viral', 'foryou', 'viral'],
        musicTitle: musicTitle,
        musicLink: musicLink,
    };

    const userUrl = `${API_KEY}/@${videoData?.username}?refer=embed`;

    // Convert the VideoBlockquote component to HTML string
    const embedCode = `
        <blockquote
            className="your-embed-class"
            cite="${videoUrl}"
            data-video-id="${videoData?.videoId}"
            style="max-width: 509px; min-width: 325px;"
        >
            <section>
                <a target="_blank" rel="noopener noreferrer" title="@${videoData?.username
        }" href="${userUrl}">
                    @${videoData?.username}
                </a>
                ${videoData?.caption}
                ${videoData?.tags
            .map(
                (tag, index) => `
                    <a
                        key=${index}
                        title="${tag}"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://stagingweb.seezitt.com/tag/${tag}?refer=embed"
                    >
                        #${tag}
                    </a>
                `
            )
            .join('')}
                <a target="_blank" rel="noopener noreferrer" title="${musicTitle}" href="${musicLink}">
                    ♬ ${musicTitle}
                </a>
            </section>
        </blockquote>
        `;

    const likeVideoToggler = async () => {
        if (isUserLoggedIn()) {
            isLiked ? setVideoLikes(videoLikes - 1) : setVideoLikes(videoLikes + 1);
            setIsLiked(!isLiked);
            try {
                const likeUnlikeVideo = await fetch(
                    `${API_KEY}/media-content/like/${info?.mediaId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                await likeUnlikeVideo.json();
                // fetchMediaById(selectedVideoId);
            } catch (error) {
                console.log('🚀 ~ likeVideoToggler ~ error:', error);
            }
        } else {
            loginPopup();
        }
    };

    function extractVideoId(url: string) {
        const regex = /videos\/(.*?)\/reduced/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const whatsappShareHandler = () => {
        let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;
        window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
    };

    const facebookShareHandler = () => {
        let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    const shareToTwitter = () => {
        let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;

        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${info?.description}`, '_blank');
    };



    const saveVideoToggler = async () => {
        if (isUserLoggedIn()) {
            isSaved ? setVideoSaves(videoSaves - 1) : setVideoSaves(videoSaves + 1);
            setIsSaved(!isSaved);
            try {
                const likeUnlikeVideo = await fetch(
                    `${API_KEY}/media-content/collections/${info?.mediaId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                await likeUnlikeVideo.json();
                // fetchMediaById(selectedVideoId);
            } catch (error) {
                console.log('🚀 ~ saveVideoToggler ~ error:', error);
            }
        } else {
            loginPopup();
        }
    };

    const copyEmbedCodeHandler = () => {
        navigator.clipboard.writeText(embedCode).then(() => {
            showToastSuccess('Embed Code Copied.');
        });
    };

    const shareToLinkedIn = () => {
        let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;

        window.open(
            `https://www.linkedin.com/shareArticle?url=${url}&title=${info?.description}`,
            '_blank'
        );
    };

    const embedShareHandler = () => {
        setIsEmbedPopupVisible(true);
    };

    const sendToFriendsHandler = () => { };

    const sharePopupHandler = () => { setSendPopup(true) };

    const copyHandler = (msg: string) => {
        navigator.clipboard
            .writeText(`${BASE_URL_FRONTEND}/${userName}/video/${info?.mediaId}`)
            .then(() => {
                showToast(msg);
                // toast.success('Link Copied');
            });
    };

    const loginPopup = () => {
        dispatch(openLoginPopup());
    };

    const paginateComments = async (fromStart = false) => {
        setIsCommentsLoading(true);
        try {
            const response = await fetch(
                `${API_KEY}/media-content/videos/${info?.mediaId
                }/comments?page=${fromStart? 1 : commentPageNumber}&pageSize=${pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await response.json();
            // console.log('🚀 ~ paginateComments ~ data', data);
            setIsCommentsLoading(false);
            setTotalComments(data?.totalItems);

            // check first next page is available or not
            if (data?.hasNextPage && commentPageNumber < data?.totalPages) {
                setCommentPageNumber(commentPageNumber + 1);
            }

            // Append comments
            if (data?.data && Array.isArray(data?.data)) {
                setVideoComments((prevComments: string | any[]) =>
                    fromStart? data?.data : prevComments.concat(data?.data)
                );
            }

        } catch (error) {
            setIsCommentsLoading(false);
            console.log('Error fetching comments : ', error);
        }
    };

    const openUserPublicProfileHandler = async (username: string) => {
        navigate(`/profile/${username}`);
    };

    const commentLikeToggler = async (commentId: number) => {
        if (isUserLoggedIn()) {
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
                fetchMediaById(info?.mediaId);
            } catch (error) {
                console.log('🚀 ~ commentLikeToggler ~ error:', error);
            }
        } else {
            loginPopup();
        }
    };

    const fetchMediaById = async (videoIdPassed?: number) => {
        let identifier = token ? 'videos' : 'public/videos';
        try {
            const fetchMediaResponse = await fetch(
                `${API_KEY}/media-content/${identifier}/${videoIdPassed}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await fetchMediaResponse.json();
            setIsVideoLoaded(false);
            setUserId(data?.user?._id);
            setName(data?.user?.name);
            setUserName(data?.user?.username);
            setUserAvatar(data?.user?.avatar);
            setUserIsFollowed(data?.user?.isFollowed);
            setVideoLikes(data?.likes);
            setVideoSaves(data?.savesCount);
            setVideoShares(data?.shares);
            setVideoViews(data?.views);
            setVideoDescription(data?.description);
            // loading comments from different API
            setVideoUrl(data?.reducedVideoUrl);
            setIsSaved(data?.isSaved);
            setIsLiked(data?.isLiked);
            setMusicTitle(data?.sound?.title);
            setMusicLink(data?.sound?.url);

        } catch (error) {
            console.log('🚀 ~ fetchMediaById ~ error:', error);
        }
    };

    // functions related to comment
    const atRateHandler = () => {
        setComment((prev) => prev + '@');
        setIsMentioning(true);
        inputRef.current.focus(); // Focus back on input
    };

    const replyToCommentHandler = async (commentId: number) => {
        if (isUserLoggedIn()) {
            setIsReplyToCommentClicked(true);
            try {
                const addCommentResponse = await fetch(
                    `${API_KEY}/media-content/comment/${info?.mediaId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ comment: commentReply, commentId }),
                    }
                );
                await addCommentResponse.json();
                setCommentReply('');
                showToastSuccess('Comment reply posted');
                fetchMediaById(info?.mediaId);
            } catch (error) {
                console.log('🚀 ~ addCommentHandler ~ error:', error);
            }
        } else {
            loginPopup();
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
            fetchMediaById(info?.mediaId);
        } catch (error) {
            console.log('🚀 ~ commentReplyLikeToggler ~ error:', error);
        }
    };

    const toggleRepliesVisibility = (commentId: number) => {
        setVisibleReplies((prev: any) => ({
            ...prev,
            [commentId]: !prev[commentId], // Toggles the visibility
        }));
    };

    const loadUserProfile = async () => {
        // If user is logged-in only then we can fetch it's data
        if (token) {
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
                setCommenterUsername(data?.username);
                setCommenterAvatar(data?.avatar);
            } catch (error) {
                console.log('🚀 ~ fetchMediaById ~ error:', error);
            }
        } else {
            // A mendatory else is a good programming convention
        }
    };

    const loginToCommentHandler = () => {
        if (!isUserLoggedIn()) {
            loginPopup();
        }
    };

    const handleInputChange = (e: { target: { value: string } }) => {
        const inputValue = e.target.value;
        setComment(inputValue);

        // Check if there's an @ symbol followed by text, but ignore if it's part of a selected mention
        const mentionTrigger = inputValue.match(/@(\w*)$/);
        if (mentionTrigger && mentionTrigger[1].length > 0) {
            setIsMentioning(true);
        } else {
            setIsMentioning(false);
        }
    };

    const handleKeyDown = (e: { currentTarget: any; key: string; preventDefault: () => void }) => {
        if (!isMentioning) return;

        // Navigate down
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setMentionIndex((prevIndex) => Math.min(prevIndex + 1, filteredUsers.length - 1));
        }

        // Navigate up
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setMentionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }

        // Select user with Enter key
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUserClick(filteredUsers[mentionIndex]);
        }

        // Remove user mention with backspace
        if (e.key === 'Backspace') {
            const cursorPosition = e.currentTarget.selectionStart || 0;
            const beforeCursor = comment.slice(0, cursorPosition);
            const afterCursor = comment.slice(cursorPosition);

            // Regex to detect the last mention in the text
            const mentionRegex = /@\w*$/;
            const lastMentionMatch = beforeCursor.match(mentionRegex);

            if (lastMentionMatch) {
                // If the cursor is at the end of the mention, clear it
                const mentionStart = beforeCursor.lastIndexOf('@');
                if (cursorPosition <= mentionStart + lastMentionMatch[0].length) {
                    const newComment = beforeCursor.slice(0, mentionStart) + afterCursor;
                    setComment(newComment);
                    setIsMentioning(false);
                    e.preventDefault(); // Prevent default backspace action
                    return;
                }
            }

            // Existing logic to handle when the comment slice is very short
            if (comment.slice(comment.lastIndexOf('@')).length <= 1) {
                setIsMentioning(false);
            }
        }
    };

    const handleUserClick = (user: { username: string | any[] }) => {
        setComment((prevComment) => {
            const mentionTag = `@${user?.username}`;
            const mentionStartIndex = prevComment.lastIndexOf('@');
            return (
                prevComment.slice(0, mentionStartIndex) +
                mentionTag +
                ' ' +
                prevComment.slice(mentionStartIndex + user?.username?.length + 1)
            );
        });
        setIsMentioning(false);
        // Restore focus to input field
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleUserSelect = (user: { username: any }) => {
        setComment((prevComment) => {
            const lastMentionStart = prevComment.lastIndexOf('@');
            const newComment = `${prevComment.slice(0, lastMentionStart)}@${user.username} `;
            return newComment;
        });
        setIsMentioning(false);
    };

    const addCommentHandler = async () => {
        try {
            if (addCommentLoading) return;
            setAddCommentLoading(true);
            const addCommentResponse = await fetch(
                `${API_KEY}/media-content/comment/${info?.mediaId}`,
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
            setComment('');
            showToastSuccess('Comment posted');
            fetchMediaById(info?.mediaId);
            setAddCommentLoading(false);
            paginateComments(true);
        } catch (error) {
            console.log('🚀 ~ addCommentHandler ~ error:', error);
            setAddCommentLoading(false);
        }
    };


    const handleFollowClick = async () => {
        if (!userId) toast.error('Try again later');
        setFollowLoading(true); // Set loading state before API call
        const response = await fetch(`${API_KEY}/profile/follow/${userId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            setUserIsFollowed(!isFollowed);
        }
        setFollowLoading(false); // Set loading state back to false after API call
    };

    const onCloseCleanUp = () => {
        setSendPopup(false);
        setReportPopup(false);
        setComment('');
        setCommentReply('');
        setIsMentioning(false);
        setIsReplyToCommentClicked(false);
        setLikedComments({});
        setLikedReplies({});
        setVisibleReplies({});
        setCurrentCommentIndex(-1);
        setCurrentCommentReplyIndex(-1);
        setMentionIndex(0);
        setFilteredUsers([]);
        setAddCommentLoading(false);
        setCommentPageNumber(1);
        setTotalComments(null);
        setVideoComments([]);
        setVideoLikes(0);
        setVideoSaves(0);
        setVideoShares(0);
        setVideoViews(0);
        setIsLiked(false);
        setIsSaved(false);
        setIsEmbedPopupVisible(false);
        setIsCommentsLoading(false);
        setIsReportElipsisVisible(false);
        setIsTooltipVisible(false);
        onclose();
    };


    useEffect(() => {
        // setSelectedVideoId(info?.mediaId);
        setTextToCopy(`${BASE_URL_FRONTEND}/${userName}/video/${info?.mediaId}`);
      
    }, [info]);


    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setIsDarkTheme(true);
        }
    });


    useLayoutEffect(() => {
        if (videoModal) {
            paginateComments();
            loadUserProfile();
            fetchMediaById(info?.mediaId);
        }
    }, [videoModal]);

    return (
        <div className={style.parent}>
            <Modal open={videoModal}>
                <ClickAwayListener onClickAway={() => console.log('abc')}>
                    <div className={style.videoModalContainer}>
                        {/* <VideoModel
                            block={onBlockPopup}
                            report={onReportPopup}
                            info={info}
                            gifts={gifts}
                            onModalClose={onclose}
                            sendPopupHandler={sendPopupHandler}
                            deleteVideo={deleteVideoPopup}
                            editVideoHandler={editVideoHandler}
                        /> */}
                        <div
                            className="flex flex-row items-center w-screen h-screen relative"
                        >
                            {/* Video and right panel */}
                            <div className="flex w-full h-full">
                                {/* Left side (63%) */}
                                <div className="w-[63%] h-full bg-black bg-opacity-60 flex justify-center items-center relative overflow-hidden">
                                    {/* Blurred background only on left side */}
                                    <div
                                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-lg"
                                        style={{
                                            backgroundImage: `url(${info?.thumbnailUrl})`,
                                        }}
                                    ></div>
                                    <div className="absolute top-0 w-full p-3 ">
                                        <div
                                            onClick={onCloseCleanUp}
                                            className="w-10 h-10 bg-[#54545480] rounded-full cursor-pointer"
                                        >
                                            <img
                                                src={crossLightIcon}
                                                alt="cross"
                                                className="object-contain w-10 h-10"
                                            />
                                        </div>
                                    </div>
                                    {/* Video content */}
                                    <video
                                        className="relative w-3/5 h-full"
                                        loop={true}
                                        controls={false}
                                        autoPlay={true}
                                        preload="auto"
                                        playsInline
                                        src={
                                            info?.reducedVideoUrl?.length > 0
                                                ? info?.reducedVideoUrl
                                                : info?.originalUrl
                                        }
                                    />
                                </div>

                                {/* Right side (37%) bg-white and bg-f8f8f8 for light */}
                                <div className="w-[37%] h-full bg-[#121212] py-4 px-4 overflow-y-auto relative" id="scrollableDiv">
                                    <div className="bg-[#1b1b1b] rounded-lg p-3.5">
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-row justify-center items-center gap-2.5">
                                                <img
                                                    className="h-10 w-10 object-cover rounded-full"
                                                    src={info?.user?.avatar || defaultAvatar}
                                                    alt="avatar"
                                                />
                                                <div className="text-white">
                                                    <p className="text-base font-bold">
                                                        {info?.user?.name || 'User'}
                                                    </p>
                                                    <p className="text-sm font-normal">
                                                        {info?.user?.username} .{' '}
                                                        {moment(info?.user?.createdTime).format(
                                                            'D-MM'
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div onClick={handleFollowClick} className="rounded-sm bg-[#FF3B5C] p-2 w-[6rem] h-[2.25rem] flex flex-row justify-center items-center cursor-pointer">
                                                <p className="text-base text-white font-bold">
                                                    {followLoading ? <CircularProgress
                                                        style={{
                                                            width: 18,
                                                            height: 18,
                                                            color: 'white',
                                                        }}
                                                    /> : isFollowed ? 'Following' : 'Follow'}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-base font-normal text-white mt-2.5">
                                            {info?.description}
                                        </p>
                                        <div className="flex flex-row items-center mt-2.5 gap-2.5">
                                            <img
                                                className="w-3 h-3 object-contain"
                                                src={musicTuneLight}
                                                alt="tune-icon"
                                            />
                                            <p className="text-xs font-normal text-white">
                                                {info?.sound?.title}
                                            </p>
                                        </div>
                                        {/* {info?.locationPlace != null && ( */}
                                        {/* <div className="flex flex-row items-center w-fit bg-[#252525] rounded-md py-1 px-1.5 mt-2.5 gap-2 cursor-pointer">
                                            <div className="rounded-sm bg-[#04c39b] p-[0.09rem] flex justify-center items-center">
                                                <img
                                                    className="h-3 w-3 object-contain"
                                                    src={locationIcon}
                                                    alt="location"
                                                />
                                            </div>
                                            <p className="text-white font-normal text-xs">
                                                Karachi
                                            </p>
                                        </div> */}
                                        {/* )} */}
                                    </div>
                                    {/* Social icons */}
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="flex flex-row justify-center items-center mt-3 px-3 gap-3.5 space-x-1">
                                            <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                                                <div className="flex justify-center items-center rounded-full bg-[#2f2f2f] p-2">
                                                    <img
                                                        onClick={likeVideoToggler}
                                                        className="h-4 w-4 object-contain cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:rotate-12"
                                                        src={
                                                            isLiked ? redHeartIcon : whiteHeartIcon
                                                        }
                                                    />
                                                </div>
                                                <p className="font-medium text-sm text-white">
                                                <CountUp start={0} delay={0.1} duration={0.2} end={videoLikes} />
                                                </p>
                                            </div>
                                            <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                                                <div className="flex justify-center items-center rounded-full bg-[#2f2f2f] p-2">
                                                    <img
                                                        // onClick={likeVideoToggler}
                                                        className="h-4 w-4 object-contain cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:rotate-12"
                                                        src={commentIcon}
                                                    />
                                                </div>
                                                <p className="font-medium text-sm text-white">
                                                    <CountUp start={0} delay={0.1} duration={0.2} end={videoComments?.length} />
                                                </p>
                                            </div>
                                            <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                                                <div className="flex justify-center items-center rounded-full bg-[#2f2f2f] p-2">
                                                    <img
                                                        onClick={saveVideoToggler}
                                                        className="h-4 w-4 object-contain cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:rotate-12"
                                                        src={isSaved ? savedIcon : saveIcon}
                                                    />
                                                </div>
                                                <p className="font-medium text-sm text-white">
                                                    <CountUp start={0} delay={0.1} duration={0.2} end={videoSaves} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <div className="flex flex-row justify-center items-center mt-3 px-3 gap-2">
                                                <div className="flex justify-center items-center rounded-full cursor-pointer">
                                                    <img
                                                        onClick={shareToLinkedIn}
                                                        className="h-6 w-6 object-contain cursor-pointer"
                                                        src={linkedInShare}
                                                    />
                                                </div>
                                                {/* <div className="flex justify-center items-center rounded-full bg-[#363636] p-1 cursor-pointer">
                                                    <img
                                                        onClick={embedShareHandler}
                                                        className="h-4 w-4 object-contain cursor-pointer"
                                                        src={embedShare}
                                                    />
                                                </div> */}
                                                <div className="flex justify-center items-center rounded-full cursor-pointer border">
                                                    <img
                                                        onClick={shareToTwitter}
                                                        className="h-6 w-6 object-contain cursor-pointer"
                                                        // src={sendToFriendsIcon}
                                                        src={twitterShare}
                                                    />
                                                </div>
                                                <div className="flex justify-center items-center rounded-full bg-[#24d366] p-1 cursor-pointer">
                                                    <img
                                                        onClick={whatsappShareHandler}
                                                        className="h-4 w-4 object-contain cursor-pointer"
                                                        src={whatsappShare}
                                                    />
                                                </div>
                                                <div className="flex justify-center items-center rounded-full bg-[#0075fb] p-1 cursor-pointer">
                                                    <img
                                                        onClick={facebookShareHandler}
                                                        className="h-4 w-4 object-contain cursor-pointer"
                                                        src={facebookShare}
                                                    />
                                                </div>
                                                <div className="flex justify-center items-center p-1 cursor-pointer">
                                                    <img
                                                        onClick={sharePopupHandler}
                                                        className="h-4 w-4 object-contain cursor-pointer"
                                                        src={shareIcon}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Copy link */}
                                    <div className="flex flex-row items-center mt-[1.2rem] px-3">
                                        <div className="w-4/5 bg-[#2f2f2f] rounded-l-lg py-1.5 px-2.5">
                                            <p
                                                style={{
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                }}
                                                className="text-white font-medium text-sm"
                                            >
                                                {textToCopy}
                                            </p>
                                        </div>
                                        <div
                                            onClick={() => copyHandler('Copied')}
                                            className="flex justify-center items-center hover:bg-[#1b1b1b] w-1/5 bg-[#252525] rounded-r-lg py-1.5 px-2 cursor-pointer"
                                        >
                                            <p className="text-white font-bold text-sm">
                                                Copy Link
                                            </p>
                                        </div>
                                    </div>
                                    {/* Comment and creator video tab */}
                                    <div className="flex flex-row justify-center items-center mt-2.5 w-full px-3">
                                        <div
                                            onClick={() => setCurrentTab(0)}
                                            style={{
                                                borderBottom:
                                                    currentTab === 0 ? '2px solid white' : 'none',
                                            }}
                                            className="flex justify-center items-center py-2 px-6 flex-1 cursor-pointer"
                                        >
                                            <p className="text-white text-sm font-bold">
                                                Comments (<CountUp start={0} delay={0.1} duration={0.2} end={videoComments?.length} />)
                                            </p>
                                        </div>
                                        {/* <div
                                            onClick={() => setCurrentTab(1)}
                                            style={{
                                                borderBottom:
                                                    currentTab === 1 ? '2px solid white' : 'none',
                                            }}
                                            className="flex justify-center items-center py-2 px-6 flex-1 cursor-pointer"
                                        >
                                            <p className="text-white text-sm font-bold">
                                                Creator videos
                                            </p>
                                        </div> */}
                                    </div>

                                    {/* All comments section */}
                                    <InfiniteScroll
                                        dataLength={videoComments.length}
                                        next={paginateComments}
                                        hasMore={videoComments.length < totalComments || totalComments === null}
                                        loader={<div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                margin: '1rem',
                                                width: 'inherit',
                                            }}
                                        >
                                            <CircularProgress />
                                        </div>}
                                        className="mb-20"
                                        // scrollThreshold={0.6}
                                        scrollableTarget="scrollableDiv"
                                        endMessage={
                                            <div className="flex flex-row justify-center items-center mt-3">
                                                <p className="text-white font-normal text-sm">
                                                   {totalComments === 0? 'Be the first to comment' : 'No more comments'}
                                                </p>
                                            </div>
                                        }
                                    >
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
                                                            onClick={() =>
                                                                openUserPublicProfileHandler(
                                                                    comment?.user?.username
                                                                )
                                                            }
                                                            className={`w-12 h-12 object-contain rounded-full cursor-pointer`}
                                                            src={comment?.user?.avatar || defaultAvatar}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <div
                                                            onClick={() =>
                                                                openUserPublicProfileHandler(
                                                                    comment?.user?.username
                                                                )
                                                            }
                                                            className="w-12 h-12 object-cover rounded-full bg-gray-800 flex justify-center items-center p-4"
                                                        >
                                                            <p className="text-lg text-white font-medium">
                                                                {comment?.user?.name?.charAt(0)}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-row items-start justify-between gap-12 w-full">
                                                        <div className="text-left w-full">
                                                            <p
                                                                onClick={() =>
                                                                    openUserPublicProfileHandler(
                                                                        comment?.user?.username
                                                                    )
                                                                }
                                                                className="font-semibold text-sm text-white cursor-pointer hover:underline"
                                                            >
                                                                {comment?.user?.name}
                                                            </p>
                                                            <div className="flex flex-row justify-between items-center">
                                                                <div>
                                                                    <p className="font-normal text-[#807a7a] text-base cursor-pointer">
                                                                        {comment?.comment}
                                                                    </p>
                                                                    <div className="flex flex-row items-center gap-4 mt-1">
                                                                        <p className="text-[#FFFFFF80] font-normal text-sm">
                                                                            {moment(
                                                                                comment?.createdTime
                                                                            ).format('D-MM')}
                                                                        </p>
                                                                        <p
                                                                            onClick={() =>
                                                                                setIsReplyToCommentClicked(
                                                                                    true
                                                                                )
                                                                            }
                                                                            className="text-[#FFFFFF80] font-normal text-[0.938rem] cursor-pointer"
                                                                        >
                                                                            Reply
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    onClick={() =>
                                                                        commentLikeToggler(comment?.id)
                                                                    }
                                                                    className="flex flex-col items-center gap-[0.09rem]"
                                                                >
                                                                    <img
                                                                        className={`w-4 h-4 object-contain cursor-pointer`}
                                                                        src={
                                                                            likedComments[comment?.id]
                                                                                ? redHeartIcon
                                                                                : emptyHeartLightIcon
                                                                        }
                                                                        alt=""
                                                                    />
                                                                    <p className="text-[#FFFFFF80] font-normal text-sm">
                                                                        {comment?.likes}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {comment_index === currentCommentIndex &&
                                                                isReplyToCommentClicked && (
                                                                    <div className="cursor-pointer flex w-full flex-row items-center gap-2.5 mt-2">
                                                                        <div className="bg-[#1618230f] flex flex-row items-center justify-between border-[0.063rem] border-transparent focus-within:border-[#16182333] rounded-lg cursor-text pr-2 pl-4 w-full mr-1">
                                                                            <input
                                                                                value={commentReply}
                                                                                onChange={(e) =>
                                                                                    setCommentReply(
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                                maxLength={150}
                                                                                placeholder="Add comment..."
                                                                                type="text"
                                                                                className="bg-transparent placeholder-[#4d4e58] text-black w-full"
                                                                            />
                                                                            <div className="flex flex-row items-center">
                                                                                <div
                                                                                    onClick={
                                                                                        atRateHandler
                                                                                    }
                                                                                    className="rounded-lg cursor-pointer hover:bg-[#1618230f] p-[0.313rem] my-[0.438rem] mx-[0.188rem] mr-1"
                                                                                >
                                                                                    <img
                                                                                        className={`w-5 h-5 object-contain rounded-full`}
                                                                                        src={
                                                                                            atTheRateOf
                                                                                        }
                                                                                        alt="at-the-rate-icon"
                                                                                    />
                                                                                </div>
                                                                                <div className="rounded-lg cursor-pointer hover:bg-[#1618230f] p-[0.313rem] my-[0.438rem] mx-[0.188rem]">
                                                                                    <img
                                                                                        className={`w-5 h-5 object-contain rounded-full`}
                                                                                        src={
                                                                                            commentEmoji
                                                                                        }
                                                                                        alt="comment-icon"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            onClick={() =>
                                                                                replyToCommentHandler(
                                                                                    comment?.id
                                                                                )
                                                                            }
                                                                            className="mr-1"
                                                                        >
                                                                            <p
                                                                                className={`${commentReply?.length >
                                                                                    0
                                                                                    ? 'text-[#fe2c55]'
                                                                                    : 'text-[#16182357]'
                                                                                    } font-semibold text-base`}
                                                                            >
                                                                                Post
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            onClick={() =>
                                                                                setIsReplyToCommentClicked(
                                                                                    false
                                                                                )
                                                                            }
                                                                            className="mr-1"
                                                                        >
                                                                            <img
                                                                                className={`w-5 h-5 object-contain rounded-full`}
                                                                                src={crossLightIcon}
                                                                                alt="cross-icon"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                    {isReportElipsisVisible &&
                                                        comment_index === currentCommentIndex ? (
                                                        <div className="relative inline-block">
                                                            <img
                                                                className="w-5 h-5 object-contain cursor-pointer"
                                                                src={
                                                                    isDarkTheme
                                                                        ? horizontalElipsisMenuWhiteIcon
                                                                        : horizontalElipsisMenuIcon
                                                                }
                                                                alt="horizontal-elipsis-menu-icon"
                                                                onMouseEnter={() =>
                                                                    setIsTooltipVisible(true)
                                                                }
                                                            />
                                                            {isTooltipVisible && (
                                                                <div
                                                                    className="absolute right-0 mt-2 cursor-pointer"
                                                                    onMouseEnter={() =>
                                                                        setIsTooltipVisible(true)
                                                                    }
                                                                    onMouseLeave={() =>
                                                                        setIsTooltipVisible(false)
                                                                    }
                                                                    onClick={() => setReportPopup(true)}
                                                                >
                                                                    <div
                                                                        onMouseEnter={() =>
                                                                            setToggleImage(true)
                                                                        }
                                                                        onMouseLeave={() =>
                                                                            setToggleImage(false)
                                                                        }
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
                                                        (
                                                            comment_replies: any,
                                                            comment_reply_index: number
                                                        ) => (
                                                            <div key={comment_replies?.id}>
                                                                {visibleReplies[comment?.id] && (
                                                                    <div
                                                                        onMouseEnter={() => {
                                                                            setCommentReplyIsReportElipsisVisible(
                                                                                true
                                                                            );
                                                                            setCurrentCommentIndex(
                                                                                comment_index
                                                                            );
                                                                            setCurrentCommentReplyIndex(
                                                                                comment_reply_index
                                                                            );
                                                                        }}
                                                                        onMouseLeave={() => {
                                                                            setCommentReplyIsReportElipsisVisible(
                                                                                false
                                                                            );
                                                                            setCommentReplyIsTooltipVisible(
                                                                                false
                                                                            );
                                                                        }}
                                                                        className="flex flex-row items-start gap-3 mt-3"
                                                                    >
                                                                        {comment?.user?.avatar ? (
                                                                            <img
                                                                                onClick={() =>
                                                                                    openUserPublicProfileHandler(
                                                                                        comment_replies
                                                                                            ?.user
                                                                                            ?.username
                                                                                    )
                                                                                }
                                                                                className={`w-6 h-6 object-contain rounded-full cursor-pointer`}
                                                                                src={
                                                                                    comment_replies
                                                                                        ?.user?.avatar
                                                                                }
                                                                                alt="comment-replyavatar"
                                                                            />
                                                                        ) : (
                                                                            <div
                                                                                onClick={() =>
                                                                                    openUserPublicProfileHandler(
                                                                                        comment_replies
                                                                                            ?.user
                                                                                            ?.username
                                                                                    )
                                                                                }
                                                                                className={`w-7 h-7 object-contain rounded-full bg-gray-800 flex justify-center items-center cursor-pointer p-2`}
                                                                            >
                                                                                <p className="text-lg text-white font-medium">
                                                                                    {comment?.user?.name?.charAt(
                                                                                        0
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                        <div className="flex flex-row items-start justify-between gap-12 w-full">
                                                                            <div className="text-left">
                                                                                <p
                                                                                    onClick={() =>
                                                                                        openUserPublicProfileHandler(
                                                                                            comment_replies
                                                                                                ?.user
                                                                                                ?.username
                                                                                        )
                                                                                    }
                                                                                    className="font-semibold text-sm text-white hover:underline cursor-pointer"
                                                                                >
                                                                                    {
                                                                                        comment_replies
                                                                                            ?.user?.name
                                                                                    }
                                                                                </p>
                                                                                <p className="font-normal text-[#252525] text-base cursor-pointer">
                                                                                    {
                                                                                        comment_replies?.reply
                                                                                    }
                                                                                </p>
                                                                                <div className="flex flex-row items-center gap-4 mt-1">
                                                                                    <p className="text-[#FFFFFF80] font-normal text-sm">
                                                                                        {moment(
                                                                                            comment?.createdTime
                                                                                        ).format(
                                                                                            'D-MM'
                                                                                        )}
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
                                                                                                    comment_replies
                                                                                                        ?.id
                                                                                                ]
                                                                                                    ? redHeartIcon
                                                                                                    : emptyHeartLightIcon
                                                                                            }
                                                                                            alt="like-icon"
                                                                                        />
                                                                                        <p className="text-[#FFFFFF80] font-normal text-sm">
                                                                                            {
                                                                                                comment_replies?.likes
                                                                                            }
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
                                                                            comment_index ===
                                                                            currentCommentIndex &&
                                                                            comment_reply_index ===
                                                                            currentCommentReplyIndex && (
                                                                                <div className="relative inline-block">
                                                                                    <img
                                                                                        className="w-5 h-5 object-contain cursor-pointer"
                                                                                        src={
                                                                                            horizontalElipsisMenuIcon
                                                                                        }
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
                                                                                                setReportPopup(
                                                                                                    true
                                                                                                )
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
                                                                            toggleRepliesVisibility(
                                                                                comment?.id
                                                                            )
                                                                        }
                                                                        className="flex flex-row items-center gap-2 text-left hover:underline decoration-[#16182380] cursor-pointer mt-[0.688rem]"
                                                                    >
                                                                        <p className="text-[#FFFFFF80] font-medium text-sm">
                                                                            View{' '}
                                                                            {comment?.replies?.length}{' '}
                                                                            replies
                                                                        </p>
                                                                        <img
                                                                            className="w-2.5 h-2.5 object-contain cursor-pointer"
                                                                            src={chevronDownLightIcon}
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
                                                                            toggleRepliesVisibility(
                                                                                comment?.id
                                                                            )
                                                                        }
                                                                        className="flex flex-row justify-end w-full items-center gap-2 text-left hover:underline decoration-[#16182380] cursor-pointer mt-[0.688rem]"
                                                                    >
                                                                        <p className="text-[#16182380] font-medium text-sm">
                                                                            Hide
                                                                        </p>
                                                                        <img
                                                                            className="w-2.5 h-2.5 object-contain cursor-pointer animate-bounce"
                                                                            src={chevronTopLightIcon}
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
                                    </InfiniteScroll>

                                    {/* {isCommentsLoading && (
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
                                    )} */}
                                    {/* Add comment section */}
                                    <div className="py-3 border-t border-t-[#252525] cursor-pointer gap-2.5 w-[37%] px-6 flex flex-row items-center bottom-0 fixed right-0 bg-[#121212]">
                                        <div
                                            className={`bg-[#FFFFFF1F] flex flex-row items-center justify-between border-[0.063rem] border-transparent ${isUserLoggedIn()
                                                ? 'focus-within:border-[#16182333]'
                                                : ''
                                                } rounded-lg cursor-text pr-2 pl-4 w-full`}
                                        >
                                            <input
                                                ref={inputRef}
                                                onClick={loginToCommentHandler}
                                                value={comment}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                maxLength={150}
                                                placeholder={`${isUserLoggedIn()
                                                    ? 'Add comment...'
                                                    : 'Log in to comment'
                                                    }`}
                                                type="text"
                                                readOnly={!isUserLoggedIn()}
                                                className={`bg-transparent w-full text-[#FFFFFFE6] ${!isUserLoggedIn()
                                                    ? 'my-[0.438rem] p-[0.313rem] cursor-pointer placeholder-[#ff3b5c] font-medium'
                                                    : 'placeholder-[#FFFFFFBC]'
                                                    }`}
                                            />
                                            {isUserLoggedIn() && (
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
                                                            src={commentEmoji}
                                                            alt="comment-icon"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {isUserLoggedIn() && (
                                            <div onClick={addCommentHandler} className="mr-1">
                                                <p
                                                    className={`${comment?.length > 0
                                                        ? 'text-[#fe2c55]'
                                                        : 'text-[#FFFFFF57]'
                                                        } font-semibold text-base`}
                                                >
                                                    {addCommentLoading ? <CircularProgress
                                                        style={{
                                                            width: 18,
                                                            height: 18,
                                                            color: 'red',
                                                        }} /> : 'Post'}
                                                </p>
                                            </div>
                                        )}

                                        {isMentioning && (
                                            <div
                                                ref={popupRef}
                                                className="absolute bottom-[4.39rem] left-10 bg-black border rounded-lg shadow-lg w-fit z-10"
                                            >
                                                {filteredUsers.length > 0 ? (
                                                    filteredUsers.map(
                                                        (
                                                            user: {
                                                                id?: any;
                                                                avatar?: any;
                                                                name?: any;
                                                                username: any;
                                                            },
                                                            index: number
                                                        ) => (
                                                            <div
                                                                key={user.id}
                                                                className={`flex flex-row justify-start items-center cursor-pointer px-2 pt-2 hover:bg-gray-800 gap-3 border-b border-gray-100 pb-2 ${index === mentionIndex
                                                                    ? 'bg-gray-700'
                                                                    : ''
                                                                    } ${index === 0
                                                                        ? 'rounded-t-lg'
                                                                        : ''
                                                                    } ${filteredUsers.length - 1 ===
                                                                        index
                                                                        ? 'rounded-b-lg'
                                                                        : ''
                                                                    }`}
                                                                onClick={() =>
                                                                    handleUserSelect(user)
                                                                }
                                                            >
                                                                <img
                                                                    className="object-contain w-10 h-10 rounded-full"
                                                                    src={user.avatar}
                                                                />
                                                                <div className="text-left text-white">
                                                                    <p className="text-base font-medium">
                                                                        {user.name}
                                                                    </p>
                                                                    <p className="text-xs font-normal">
                                                                        {user.username}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="px-4 py-2 text-white">
                                                        No users found
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
            {reportPopup && (
                <PopupForReport
                    openReport={reportPopup}
                    onReportClose={() => setReportPopup(false)}
                    info={{}}
                />
            )}
            {isEmbedPopupVisible && (
                <EmbedSharePopup
                    videoUrl={
                        info?.reducedVideoUrl?.length > 0
                            ? info?.reducedVideoUrl
                            : info?.originalUrl
                    }
                    embedCode={embedCode}
                    copyEmbedCodeHandler={copyEmbedCodeHandler}
                    setIsEmbedModalOpen={setIsEmbedPopupVisible}
                />
            )}
            <Forwardusers onOpen={sendPopup} onClose={() => setSendPopup(false)} />
            <ToastContainer />

        </div>
    );
}
