import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useUpdateEffect } from 'react-use';
import likesIcon from '../../../public/images/icons/Heart2.svg';
import {
    cross,
    avatar,
    embedShare,
    facebookShare,
    linkedInShare,
    twitterShare,
    whatsappShare,
} from '../../icons';
import { openLoginPopup } from '../../redux/reducers';
import EmbedSharePopup from '../../shared/components/EmbedSharePopup';
import Layout from '../../shared/layout';
import { isUserLoggedIn } from '../../utils/common';
import { BASE_URL_FRONTEND, showToast, showToastSuccess, STATUS_CODE } from '../../utils/constants';
import PopupForReport from '../profile/popups/PopupForReport';
import atTheRateOf from './svg-components/at-the-rate-of.svg';
import chevronDownIconVideo from './svg-components/chevron-down-icon-video.svg';
import chevronDownIcon from './svg-components/chevron-down-icon.svg';
import chevronTopIcon from './svg-components/chevron-top-icon.svg';
import chevronUpIconVideo from './svg-components/chevron-up-icon-video.svg';
import commentEmoji from './svg-components/comment-emoji.svg';
import commentIcon from './svg-components/comment-icon.svg';
import emptyHeartIcon from './svg-components/empty-heart-icon.svg';
import horizontalElipsisMenuWhiteIcon from './svg-components/horizontal-elipsis-icon-white.svg';
import horizontalElipsisMenuIcon from './svg-components/horizontal-elipsis-icon.svg';
import linkIcon from './svg-components/link-icon.svg';
import musicIcon from './svg-components/music-icon.svg';
import redHeartIcon from './svg-components/red-heart-icon.svg';
import reportFlagIcon from './svg-components/report-flag-icon.svg';
import saveIcon from './svg-components/save-icon.svg';
import savedIcon from './svg-components/saved-icon.svg';
import shareIcon from './svg-components/share-icon.svg';
import whiteHeartIcon from './svg-components/white-filled-heart-icon.svg';
import pauseButton from './svg-components/pause.svg';
import playButton from './svg-components/play.svg';
import autoScrollOn from './svg-components/autoscroll-on.svg';
import autoScrollOnff from './svg-components/autoscroll-off.svg';
import floatingPlayer from './svg-components/floating-player.svg';
import reportFlagWhite from './svg-components/report-flag-white.svg';
import keyboardWhite from './svg-components/keyboard-white.svg';
import volumeMute from './svg-components/volume-mute.svg';
import volumeUnmute from './svg-components/volume-unmute.svg';
import optionsMenuHorizontal from './svg-components/options-menu-horizontal.svg';
import fullScreen from './svg-components/fullscreen.svg';

// css
import styles from './video-page.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

const VideoPage = () => {
    // hooks
    const { username, videoId } = useParams();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [comment, setComment] = useState('');
    const [commentReply, setCommentReply] = useState('');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isReportElipsisVisible, setIsReportElipsisVisible] = useState(false);
    const [toggleImage, setToggleImage] = useState(false);
    const [currentCommentIndex, setCurrentCommentIndex] = useState(-1);
    const [currentCommentReplyIndex, setCurrentCommentReplyIndex] = useState(-1);
    const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});
    const [reportPopup, setReportPopup] = useState(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [videoLikes, setVideoLikes] = useState(0);
    const [videoSaves, setVideoSaves] = useState(0);
    const [videoShares, setVideoShares] = useState(0);
    const [videoViews, setVideoViews] = useState(0);
    const [videoDescription, setVideoDescription] = useState('');
    const [videoComments, setVideoComments] = useState<any>({ items: [], totalItems: null, pageSize: 5, currentPage: 1 });
    const [isLoading, setIsLoading] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);
    const [youMayLikeVideos, setYouMayLikeVideos] = useState<any>([]);
    const [muteStates, setMuteStates] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);
    const [commenterName, setCommenterName] = useState('');
    const [commenterAvatar, setCommenterAvatar] = useState('');
    const [commenterUsername, setCommenterUsername] = useState('');
    const [isReplyToCommentClicked, setIsReplyToCommentClicked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [musicTitle, setMusicTitle] = useState('');
    const [musicLink, setMusicLink] = useState('');
    const [isEmbedPopupVisible, setIsEmbedPopupVisible] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);
    const [isMentioning, setIsMentioning] = useState(false);

    const dummyUsers = [
        { id: 1, name: 'John Doe', username: 'johndoe', avatar: avatar },
        { id: 2, name: 'Jane Smith', username: 'janesmith', avatar: avatar },
        { id: 3, name: 'Bob Johnson', username: 'bobjohnson', avatar: avatar },
        { id: 4, name: 'Alice Adams', username: 'alice', avatar },
        { id: 5, name: 'Arnold Anderson', username: 'arnold', avatar },
        { id: 6, name: 'Angela Avery', username: 'angela', avatar },
        { id: 7, name: 'Andrew Armstrong', username: 'andrew', avatar },
        { id: 8, name: 'Ava Allen', username: 'ava', avatar },
        { id: 9, name: 'Aaron Abbott', username: 'aaron', avatar },
        { id: 10, name: 'Amelia Addison', username: 'amelia', avatar },
        { id: 11, name: 'Austin Alexander', username: 'austin', avatar },
        { id: 12, name: 'Aiden Anderson', username: 'aiden', avatar },
        { id: 13, name: 'Annie Anthony', username: 'annie', avatar },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hideTimeoutRef = useRef<any>(null);
    const hideOptionsMenuTimeoutRef = useRef<any>(null);

    const [isFollowed, setUserIsFollowed] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [followToggleLoading, setFollowToggleLoading] = useState(false);
    const [switchVideoIndex, setSwitchVideoIndex] = useState(-1);
    const [isFirstRender, setIsFirstRender] = useState(false);
    const subDivRef = useRef<any>(null);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [mentionIndex, setMentionIndex] = useState(0);
    const popupRef = useRef<any>(null);
    const inputRef = useRef<any>(null);

    // Custom controls
    const videoRef = useRef<any>(null);
    const seekbarRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [muted, setMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [isDragging, setIsDragging] = useState(false);
    const [isAutoScroll, setIsAutoScroll] = useState(false);

    // hooks for comment replies
    const [isCommentReplyTooltipVisible, setCommentReplyIsTooltipVisible] = useState(false);
    const [isCommentReplyReportElipsisVisible, setCommentReplyIsReportElipsisVisible] =
        useState(false);
    const [toggleCommentReplyImage, setToggleCommentReplyImage] = useState(false);
    const [likedReplies, setLikedReplies] = useState<{ [key: string]: boolean }>({});
    const [selectedVideoId, setSelectedVideoId] = useState<any>(null);
    const [visibleReplies, setVisibleReplies] = useState<any>({});

    const videoData = {
        videoId: selectedVideoId ?? videoId,
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

    // functions related to comment
    const atRateHandler = () => {
        setComment((prev) => prev + '@');
        setIsMentioning(true);
        inputRef.current.focus(); // Focus back on input
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
                fetchMediaById(selectedVideoId);
            } catch (error) {
                console.log('🚀 ~ commentLikeToggler ~ error:', error);
            }
        } else {
            loginPopup();
        }
    };

    const addCommentHandler = async () => {
        try {
            const addCommentResponse = await fetch(
                `${API_KEY}/media-content/comment/${selectedVideoId ?? videoId}`,
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
            fetchMediaById(selectedVideoId);
        } catch (error) {
            console.log('🚀 ~ addCommentHandler ~ error:', error);
        }
    };

    const replyToCommentHandler = async (commentId: number) => {
        if (isUserLoggedIn()) {
            setIsReplyToCommentClicked(true);
            try {
                const addCommentResponse = await fetch(
                    `${API_KEY}/media-content/comment/${selectedVideoId ?? videoId}`,
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
                fetchMediaById(selectedVideoId);
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
            fetchMediaById(selectedVideoId);
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

    const fetchMediaById = async (videoIdPassed?: number) => {
        let identifier = token ? 'videos' : 'public/videos';
        try {
            const fetchMediaResponse = await fetch(
                `${API_KEY}/media-content/${identifier}/${videoIdPassed ?? videoId}`,
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
            setIsFirstRender(true);
        } catch (error) {
            console.log('🚀 ~ fetchMediaById ~ error:', error);
        }
    };

    const toggleFollow = async (e: any) => {
        e.stopPropagation();
        if (isUserLoggedIn()) {
            if (safetyCheck(userId)) {
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
            }
        } else {
            loginPopup();
        }
    };

    const getExplorePageData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${API_KEY}/media-content/public/videos/feed/upgraded?page=${pageNumber}&pageSize=${pageSize}`,
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
            if (data && Array.isArray(data)) {
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

    const paginateComments = async (fromStart = false) => {
        setIsCommentsLoading(true);
        try {
            const response = await fetch(
                `${API_KEY}/media-content${token?'':'/public'}/videos/${selectedVideoId ?? videoId
                }/comments?page=${fromStart ? 1 : videoComments.currentPage}&pageSize=${videoComments.pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await response.json();
            setIsCommentsLoading(false);

            const videoCommentsObj = { ...videoComments };

            // Append comments
            if (data?.data && Array.isArray(data?.data)) {
                 // check first next page is available or not
                if (data?.hasNextPage) {
                    videoCommentsObj.currentPage = fromStart ? 2 : videoCommentsObj.currentPage + 1;
                }
                videoCommentsObj.items = fromStart ? data?.data : [...videoCommentsObj.items, ...data?.data];
                videoCommentsObj.totalItems = data?.totalItems;
                setVideoComments(videoCommentsObj);
            }

        } catch (error) {
            setIsCommentsLoading(false);
            console.log('Error fetching comments : ', error);
        }
    };

    const loadVideoFromYouMayLikeSection = (videoId: number) => {
        setIsVideoLoaded(false);
        setIsPlaying(true);
        setPlaybackRate(1.0);
        setSelectedVideoId(videoId);
        setYouMayLikeVideos([]);
        fetchMediaById(videoId);
        getExplorePageData();
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

    const loadPreviousVideoHandler = () => {
        if (switchVideoIndex > 0) {
            setSwitchVideoIndex((prev) => prev - 1);
        }

        if (switchVideoIndex === 0) {
            setSwitchVideoIndex((prev) => prev - 1);
        }
    };

    const loadNextVideoHandler = () => {
        if (switchVideoIndex < youMayLikeVideos?.length - 1) {
            setSwitchVideoIndex((prev) => prev + 1);
        }
    };

    // Trigger next video when the current one ends
    const scrollToNextVideoHandler = () => {
        if (isAutoScroll) {
            if (switchVideoIndex < youMayLikeVideos?.length - 1) {
                setSwitchVideoIndex((prev) => prev + 1);
            }
        }
    };

    const loadVideosOnArrowClicks = () => {
        setSelectedVideoId(youMayLikeVideos[switchVideoIndex]?.mediaId);
        fetchMediaById(youMayLikeVideos[switchVideoIndex]?.mediaId);
    };

    const likeVideoToggler = async () => {
        if (isUserLoggedIn()) {
            setIsFirstRender(false);
            setIsLiked(!isLiked);
            try {
                const likeUnlikeVideo = await fetch(
                    `${API_KEY}/media-content/like/${selectedVideoId ?? videoId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                await likeUnlikeVideo.json();
                fetchMediaById(selectedVideoId);
            } catch (error) {
                console.log('🚀 ~ likeVideoToggler ~ error:', error);
            }
        } else {
            loginPopup();
        }
    };

    const saveVideoToggler = async () => {
        if (isUserLoggedIn()) {
            setIsFirstRender(false);
            setIsSaved(!isSaved);
            try {
                const likeUnlikeVideo = await fetch(
                    `${API_KEY}/media-content/collections/${selectedVideoId ?? videoId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                await likeUnlikeVideo.json();
                fetchMediaById(selectedVideoId);
            } catch (error) {
                console.log('🚀 ~ saveVideoToggler ~ error:', error);
            }
        } else {
            loginPopup();
        }
    };

    const safetyCheck = (param: any) => {
        if (param !== null && param !== undefined && param !== '') {
            return true;
        }

        return false;
    };

    const embedShareHandler = () => {
        setIsEmbedPopupVisible(true);
    };

    const copyEmbedCodeHandler = () => {
        navigator.clipboard.writeText(embedCode).then(() => {
            showToastSuccess('Embed Code Copied.');
        });
    };

    const copyHandler = (msg: string) => {
        navigator.clipboard
            .writeText(`${BASE_URL_FRONTEND}/${userName}/video/${selectedVideoId ?? videoId}`)
            .then(() => {
                showToast(msg);
            });
    };

    const shareToWhatsApp = () => {
        window.open(`https://api.whatsapp.com/send?text=${window.location.href}`, '_blank');
    };

    const shareToFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
            '_blank'
        );
    };

    const shareToTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank');
    };

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/shareArticle?url=${window.location.href}`, '_blank');
    };

    const showPopupHandler = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
        }
        setShowSharePopup(true);
    };

    const hideSharePopupHandler = () => {
        hideTimeoutRef.current = setTimeout(() => {
            setShowSharePopup(false);
        }, 500);
        // 0.5 second delay
    };

    const loginToCommentHandler = () => {
        if (!isUserLoggedIn()) {
            loginPopup();
        }
    };

    const loginPopup = () => {
        dispatch(openLoginPopup());
    };

    const openUserPublicProfileHandler = async (username: string) => {
        navigate(`/profile/${username}`);
    };

    const handleScroll = useCallback(() => {
        if (subDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = subDivRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 0.5) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        }
    }, []);

    // Handle drag over seekbar
    const handleSeekStart = (e: any) => {
        setIsDragging(true);
        updateSeekbar(e); // Initial update when the drag starts
    };

    const handleSeekEnd = () => {
        setIsDragging(false);
    };

    const handleSeekMove = (e: any) => {
        if (isDragging) {
            updateSeekbar(e); // Update while dragging
        }
    };

    const updateSeekbar = (e: { clientX: number }) => {
        const seekbar = seekbarRef.current;
        const rect = seekbar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / seekbar.offsetWidth) * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Toggle Play/Pause
    const togglePlayPause = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Mute/Unmute Video
    const handleMute = () => {
        setMuted(!muted);
        videoRef.current.muted = !muted;
    };

    // Speed Control
    const handleSpeedChange = (speed: SetStateAction<number>) => {
        setPlaybackRate(speed);
        videoRef.current.playbackRate = speed;
    };

    // Convert time to mm:ss format
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Handle full screen
    const handleFullscreen = () => {
        const video = videoRef.current;
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            // Chrome, Safari, and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            // IE/Edge
            video.msRequestFullscreen();
        }
    };

    const loadAutoScrollPreference = async () => {
        try {
            const loadAutoScrollPreferenceResponse = await fetch(
                `${API_KEY}/profile/general-settings`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await loadAutoScrollPreferenceResponse.json();
            setIsAutoScroll(data?.autoScroll);
        } catch (error) {
            console.log('🚀 ~ loadAutoScrollPreference ~ error:', error);
        }
    };

    const toggleAutoScroll = () => {
        setIsAutoScroll(!isAutoScroll);
    };

    const toggleAutoScrollPreference = async () => {
        try {
            const toggleAutoScrollPreferenceResponse = await fetch(
                `${API_KEY}/profile/general-settings`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ autoScroll: isAutoScroll }),
                }
            );
            const { status } = await toggleAutoScrollPreferenceResponse.json();
            if (status !== STATUS_CODE.OK) setIsAutoScroll(!isAutoScroll);
        } catch (error) {
            console.log('🚀 ~ toggleAutoScrollPreference ~ error:', error);
        }
    };

    const showOptionsMenuHandler = () => {
        if (hideOptionsMenuTimeoutRef.current) {
            clearTimeout(hideOptionsMenuTimeoutRef.current);
        }
        setIsOptionsMenuVisible(true);
    };

    const hideOptionsMenuHandler = () => {
        hideOptionsMenuTimeoutRef.current = setTimeout(() => {
            setIsOptionsMenuVisible(false);
        }, 200);
        // 0.3 second delay
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

    // hooks
    useEffect(() => {
        const handleClickOutside = (e: { target: any }) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsMentioning(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isUserLoggedIn()) {
            loadAutoScrollPreference();
        }
        paginateComments();
        loadUserProfile();
        fetchMediaById();
        getExplorePageData();
    }, []);

    useUpdateEffect(() => {
        loadVideosOnArrowClicks();
        setIsFirstRender(true);
    }, [switchVideoIndex]);

    useUpdateEffect(() => {
        if (isLiked && !isFirstRender) {
            setVideoLikes((prevLikes) => prevLikes + 1);
        }

        if (!isLiked && videoLikes > 0) {
            setVideoLikes((prevLikes) => prevLikes - 1);
        }
    }, [isLiked]);

    useUpdateEffect(() => {
        if (isSaved && !isFirstRender) {
            setVideoSaves((prevSaves) => prevSaves + 1);
        }

        if (!isSaved && videoSaves > 0) {
            setVideoSaves((prevSaves) => prevSaves - 1);
        }
    }, [isSaved]);

    useUpdateEffect(() => {
        getExplorePageData();
    }, [pageNumber]);

    useEffect(() => {
        const mainDiv = subDivRef.current;
        if (mainDiv) {
            mainDiv.addEventListener('scroll', handleScroll);
            return () => mainDiv.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setIsDarkTheme(true);
        }
    });

    // Custom player controls
    useEffect(() => {
        const video = videoRef.current;
        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedData = () => setDuration(video.duration);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadeddata', handleLoadedData);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadeddata', handleLoadedData);
        };
    }, []);

    // Event listeners for global mouse move and mouse up
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleSeekMove);
            document.addEventListener('mouseup', handleSeekEnd);
        } else {
            document.removeEventListener('mousemove', handleSeekMove);
            document.removeEventListener('mouseup', handleSeekEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleSeekMove);
            document.removeEventListener('mouseup', handleSeekEnd);
        };
    }, [isDragging]);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleLoadedData = () => {
            setIsVideoLoaded(true);
        };

        if (videoElement) {
            videoElement.addEventListener('loadeddata', handleLoadedData);
            return () => {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
            };
        }
    }, []);

    useUpdateEffect(() => {
        toggleAutoScrollPreference();
    }, [isAutoScroll]);

    useEffect(() => {
        if (isMentioning) {
            // Filter users based on the current input
            const query = comment.slice(comment.lastIndexOf('@') + 1).toLowerCase();
            if (query) {
                const filtered = dummyUsers.filter((user) =>
                    user.username.toLowerCase().includes(query)
                );
                setFilteredUsers(filtered.slice(0, 5)); // Limit to 5 users
            } else {
                setFilteredUsers([]);
            }
        } else {
            setFilteredUsers([]);
        }
    }, [comment, isMentioning]);

    return (
        <Layout isScrollActive={false} paddingBottomProp={true}>
            <div
                ref={subDivRef}
                className="flex flex-row h-screen overflow-y-auto justify-between pt-4 pl-8"
            >
                <div className="w-full">
                    <div className="relative">
                        <div className="video-player-container">
                            <video
                                onClick={togglePlayPause}
                                ref={videoRef}
                                className="h-[31.875rem] w-full object-contain rounded-t-md bg-[#161823] cursor-pointer"
                                controls={false}
                                autoPlay={true}
                                width="300px"
                                preload="auto"
                                playsInline
                                src={videoUrl}
                                onEnded={scrollToNextVideoHandler}
                            />
                        </div>
                        {/* Progress bar */}
                        {!isVideoLoaded && (
                            <div className="custom-spinner absolute flex flex-row justify-center items-center top-[50%] left-[50%]">
                                <CircularProgress className="h-7 w-7 text-white" />
                            </div>
                        )}
                        {/* Custom Controls */}
                        <div className="absolute bottom-0 w-full group select-none">
                            {/* Seekbar */}
                            <div
                                ref={seekbarRef}
                                className="w-full h-1 bg-gray-600 rounded cursor-pointer relative group-hover:h-2"
                                onMouseDown={handleSeekStart}
                            >
                                <div
                                    className={`h-full bg-white group-hover:h-2}`} // Adjust height on hover
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                >
                                    {/* Rounded ball at the end */}
                                    <div
                                        className={`absolute bg-white w-4 h-4 rounded-full group-hover:block hidden m-auto`} // Ball visibility
                                        style={{
                                            left: `calc(${(currentTime / duration) * 100
                                                }% + 0.5rem)`,
                                            bottom: '-0.25rem',
                                            transform: 'translateX(-60%)', // Center the ball on the end
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Controls - Play/Pause, Mute, Speed, Fullscreen */}
                            <div className="flex justify-between items-center text-gray-300 py-2.5 px-4">
                                {/* Play/Pause Button */}
                                <div className="flex flex-row items-center gap-1.5">
                                    <div onClick={togglePlayPause}>
                                        {isPlaying ? (
                                            <img
                                                className="h-8 w-8 object-contain cursor-pointer"
                                                src={pauseButton}
                                            />
                                        ) : (
                                            <img
                                                className="h-8 w-8 object-contain cursor-pointer"
                                                src={playButton}
                                            />
                                        )}
                                    </div>
                                    {/* Time display */}
                                    <div className="flex justify-between items-center text-gray-300 text-sm">
                                        <span>
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-4">
                                    {/* Floating Player */}
                                    <div title="Floating Player" className="cursor-pointer">
                                        <img
                                            className="h-7 w-7 object-contain"
                                            src={floatingPlayer}
                                        />
                                    </div>

                                    {/* Scroll auto on/off */}
                                    <div
                                        title={`Auto scroll is ${isAutoScroll ? 'on' : 'off'}`}
                                        className="cursor-pointer"
                                        onClick={toggleAutoScroll}
                                    >
                                        <img
                                            className="h-7 w-7 object-contain"
                                            src={isAutoScroll ? autoScrollOn : autoScrollOnff}
                                        />
                                    </div>

                                    {/* Speed Button */}
                                    <div className="relative inline-block text-left cursor-pointer">
                                        <div
                                            onClick={() =>
                                                handleSpeedChange(
                                                    playbackRate === 0.75
                                                        ? 1.0
                                                        : playbackRate === 1.0
                                                            ? 1.25
                                                            : playbackRate === 1.25
                                                                ? 1.5
                                                                : playbackRate === 1.5
                                                                    ? 2.0
                                                                    : 0.75
                                                )
                                            }
                                            className=" font-medium text-[#646464]"
                                        >
                                            {playbackRate}
                                            {playbackRate == 1 || playbackRate == 2 ? '.0' : ''}x
                                        </div>
                                    </div>

                                    {/* Mute/Unmute Button */}
                                    <div className="cursor-pointer" onClick={handleMute}>
                                        {muted ? (
                                            <img
                                                className="h-7 w-7 object-contain"
                                                src={volumeMute}
                                            />
                                        ) : (
                                            <img
                                                className="h-7 w-7 object-contain"
                                                src={volumeUnmute}
                                            />
                                        )}
                                    </div>

                                    {/* Fullscreen */}
                                    <div
                                        title="Full screen"
                                        onClick={handleFullscreen}
                                        className="cursor-pointer"
                                    >
                                        <img className="h-7 w-7 object-contain" src={fullScreen} />
                                    </div>

                                    {/* Horitontal Menu */}
                                    <div
                                        onMouseEnter={showOptionsMenuHandler}
                                        onMouseLeave={hideOptionsMenuHandler}
                                        onClick={handleFullscreen}
                                        className="cursor-pointer"
                                    >
                                        <img
                                            className="h-7 w-7 object-contain"
                                            src={optionsMenuHorizontal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOptionsMenuVisible && (
                            <div
                                onMouseEnter={showOptionsMenuHandler}
                                onMouseLeave={hideOptionsMenuHandler}
                                className="absolute bottom-16 mb-1 h-24 w-48 bg-[#1b1b1b] right-6 p-3 rounded-xl z-10 shadow-md shadow-black"
                            >
                                <div
                                    onClick={() => setReportPopup(true)}
                                    className="flex flex-row justify-start items-center gap-2.5 cursor-pointer"
                                >
                                    <img
                                        className="h-7 w-7 object-contain"
                                        src={reportFlagWhite}
                                        alt="report"
                                    />
                                    <p className="text-base font-medium text-white">Report</p>
                                </div>
                                <div className="w-[95%] h-[0.05px] bg-white mt-2.5 mx-auto" />
                                <div className="flex flex-row justify-start items-center gap-2.5 mt-2 cursor-pointer">
                                    <img
                                        className="h-7 w-7 object-contain"
                                        src={keyboardWhite}
                                        alt="report"
                                    />
                                    <p className="text-base font-medium text-white">Keyboard</p>
                                </div>
                            </div>
                        )}
                        <div className="absolute flex flex-col justify-between items-center gap-2.5 bottom-20 right-8 w-10 text-white">
                            {/* Video next and previous */}
                            <div className="text-center flex flex-col justify-between items-center gap-3 mb-2 shadow rounded-full bg-[#5755556a] px-2 py-1">
                                <img
                                    onClick={loadPreviousVideoHandler}
                                    className="h-6 w-6 object-contain cursor-pointer"
                                    src={chevronUpIconVideo}
                                />
                                <img
                                    onClick={loadNextVideoHandler}
                                    className="h-6 w-6 object-contain cursor-pointer"
                                    src={chevronDownIconVideo}
                                />
                            </div>
                            <div className="text-center">
                                <img
                                    onClick={likeVideoToggler}
                                    className="h-7 w-7 object-contain cursor-pointer transform transition-transform duration-300 hover:scale-125"
                                    src={isLiked ? redHeartIcon : whiteHeartIcon}
                                />
                                <p className="font-bold text-sm mt-1.5 text-white">{videoLikes}</p>
                            </div>
                            <div className="text-center">
                                <img
                                    className="h-7 w-7 object-contain cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:rotate-12"
                                    src={commentIcon}
                                />
                                <p className="font-bold text-sm mt-1.5 text-white">
                                    {videoComments?.length}
                                </p>
                            </div>
                            <div className="text-center">
                                <img
                                    onClick={saveVideoToggler}
                                    className="h-7 w-7 object-contain cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:rotate-12"
                                    src={isSaved ? savedIcon : saveIcon}
                                />
                                <p className="font-bold text-sm mt-1.5 text-white">{videoSaves}</p>
                            </div>
                            <div className="text-center relative">
                                <img
                                    onMouseEnter={showPopupHandler}
                                    onMouseLeave={hideSharePopupHandler}
                                    className="h-7 w-7 object-contain cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:rotate-12"
                                    src={shareIcon}
                                />
                                <p className="font-bold text-sm mt-1.5 text-white">{videoShares}</p>
                            </div>
                        </div>
                        {showSharePopup && (
                            <div
                                onMouseEnter={showPopupHandler}
                                onMouseLeave={hideSharePopupHandler}
                                className="absolute bottom-20 right-24 bg-white shadow-lg rounded-md p-6"
                            >
                                {/* Arrow pointing to the share icon */}
                                <div className="absolute bottom-5 -right-1 transform rotate-45 bg-white w-4 h-4 border-l-0 border-t-0 border-gray-300"></div>

                                <ul className="space-y-3">
                                    <li
                                        onClick={embedShareHandler}
                                        className="flex items-center space-x-4 cursor-pointer"
                                    >
                                        <div className="bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center">
                                            {/* Embed Icon */}
                                            <img
                                                src={embedShare}
                                                alt="Embed"
                                                className="object-contain w-8 h-8"
                                            />
                                        </div>
                                        <span className="text-black font-medium">Embed</span>
                                    </li>
                                    <li
                                        onClick={() => copyHandler('Copied')}
                                        className="flex items-center space-x-4 cursor-pointer pt-2"
                                    >
                                        <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
                                            {/* Copy Link Icon */}
                                            <img
                                                src={linkIcon}
                                                alt="Copy Link"
                                                className="object-contain w-5 h-5"
                                            />
                                        </div>
                                        <span className="text-black font-medium">Copy link</span>
                                    </li>
                                    <li
                                        onClick={shareToWhatsApp}
                                        className="flex items-center space-x-4 cursor-pointer pt-2"
                                    >
                                        <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                                            {/* Share to WhatsApp Icon */}
                                            <img
                                                src={whatsappShare}
                                                alt="Share to WhatsApp"
                                                className="object-contain w-8 h-8"
                                            />
                                        </div>
                                        <span className="text-black font-medium">
                                            Share to WhatsApp
                                        </span>
                                    </li>
                                    <li
                                        onClick={shareToFacebook}
                                        className="flex items-center space-x-4 cursor-pointer pt-2"
                                    >
                                        <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                                            {/* Share to WhatsApp Icon */}
                                            <img
                                                src={facebookShare}
                                                alt="Share to Facebook"
                                                className="object-contain w-8 h-8"
                                            />
                                        </div>
                                        <span className="text-black font-medium">
                                            Share to Facebook
                                        </span>
                                    </li>
                                    <li
                                        onClick={shareToTwitter}
                                        className="flex items-center space-x-4 cursor-pointer pt-2"
                                    >
                                        <div className="bg-blue-400 w-8 h-8 rounded-full flex items-center justify-center">
                                            {/* Share to Twitter Icon */}
                                            <img
                                                src={twitterShare}
                                                alt="Share to Twitter"
                                                className="object-contain w-8 h-8"
                                            />
                                        </div>
                                        <span className="text-black font-medium">
                                            Share to Twitter
                                        </span>
                                    </li>
                                    <li
                                        onClick={shareToLinkedIn}
                                        className="flex items-center space-x-4 cursor-pointer pt-2"
                                    >
                                        <div className="bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center">
                                            {/* Share to LinkedIn Icon */}
                                            <img
                                                src={linkedInShare}
                                                alt="Share to LinkedIn"
                                                className="object-contain w-8 h-8"
                                            />
                                        </div>
                                        <span className="text-black font-medium">
                                            Share to LinkedIn
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="p-3.5 bg-[#16182308] rounded-b-xl">
                        <div
                            onClick={() => openUserPublicProfileHandler(userName)}
                            className="flex flex-row items-center gap-2"
                        >
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
                                        {userName?.charAt(0)?.toUpperCase()}
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
                                    onClick={(e) => toggleFollow(e)}
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
                                {videoDescription}
                            </span>
                        </div>
                        <div className="flex flex-row items-center mt-1.5 gap-1 hover:underline cursor-pointer">
                            <img
                                className={`w-3 h-3 object-contain`}
                                src={musicIcon}
                                alt="music-icon"
                            />
                            <p className="text-black text-sm font-light">
                                {musicTitle?.toLowerCase()} -{' '}
                            </p>
                            <h4 className="text-black text-sm font-normal">{userName}</h4>
                        </div>
                    </div>
                    {/* Add comment section */}
                    <div className="mt-6">
                        <p className="text-[#161823] font-bold text-[1.125rem] text-left">
                            {videoComments?.totalItems ?? 0}{' '}
                            {videoComments?.totalItems ? 'comment' : 'comments'}
                        </p>
                        <div className="flex flex-row items-start gap-3 mt-3">
                            {/* Commenter avatar */}
                            {isUserLoggedIn() && (
                                <div
                                    onClick={() => openUserPublicProfileHandler(commenterUsername)}
                                >
                                    {commenterAvatar && commenterAvatar !== '' ? (
                                        <img
                                            className="w-12 h-12 object-contain rounded-full cursor-pointer"
                                            src={commenterAvatar}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="w-12 h-12 object-cover rounded-full bg-gray-800 flex justify-center items-center">
                                            <p className="text-lg text-white font-medium">
                                                {commenterName?.charAt(0)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="pb-6 border-b border-b-[#0000001f] cursor-pointer w-full flex flex-row items-center gap-2.5 relative">
                                <div
                                    className={`bg-[#1618230f] flex flex-row items-center justify-between border-[0.063rem] border-transparent ${isUserLoggedIn() ? 'focus-within:border-[#16182333]' : ''
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
                                        className={`bg-transparent w-full ${!isUserLoggedIn()
                                            ? 'my-[0.438rem] p-[0.313rem] cursor-pointer placeholder-[#ff3b5c] font-medium'
                                            : 'placeholder-[#4d4e58]'
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
                                                : 'text-[#16182357]'
                                                } font-semibold text-base`}
                                        >
                                            Post
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
                                                            } ${index === 0 ? 'rounded-t-lg' : ''} ${filteredUsers.length - 1 === index
                                                                ? 'rounded-b-lg'
                                                                : ''
                                                            }`}
                                                        onClick={() => handleUserSelect(user)}
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
                    {/* All comments section */}
                    <InfiniteScroll
                        dataLength={videoComments?.items?.length}
                        next={paginateComments}
                        hasMore={videoComments.items.length < videoComments?.totalItems || videoComments?.totalItems === null}
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
                                <p className="font-bold text-xl">
                                    {videoComments?.totalItems === 0 && 'Be the first to comment'}
                                </p>
                            </div>
                        }
                    >
                        {videoComments.items.map((comment: any, comment_index: number) => (
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
                                                openUserPublicProfileHandler(comment?.user?.username)
                                            }
                                            className={`w-12 h-12 object-contain rounded-full cursor-pointer`}
                                            src={comment?.user?.avatar}
                                            alt=""
                                        />
                                    ) : (
                                        <div
                                            onClick={() =>
                                                openUserPublicProfileHandler(comment?.user?.username)
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
                                                className="font-semibold text-sm text-[#161823] cursor-pointer hover:underline"
                                            >
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
                                                                        src={commentEmoji}
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
                                                                className={`${commentReply?.length > 0
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
                                                src={
                                                    isDarkTheme
                                                        ? horizontalElipsisMenuWhiteIcon
                                                        : horizontalElipsisMenuIcon
                                                }
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
                                                                onClick={() =>
                                                                    openUserPublicProfileHandler(
                                                                        comment_replies?.user?.username
                                                                    )
                                                                }
                                                                className={`w-6 h-6 object-contain rounded-full cursor-pointer`}
                                                                src={comment_replies?.user?.avatar}
                                                                alt="comment-replyavatar"
                                                            />
                                                        ) : (
                                                            <div
                                                                onClick={() =>
                                                                    openUserPublicProfileHandler(
                                                                        comment_replies?.user?.username
                                                                    )
                                                                }
                                                                className={`w-7 h-7 object-contain rounded-full bg-gray-800 flex justify-center items-center cursor-pointer p-2`}
                                                            >
                                                                <p className="text-lg text-white font-medium">
                                                                    {comment?.user?.name?.charAt(0)}
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-row items-start justify-between gap-12 w-full">
                                                            <div className="text-left">
                                                                <p
                                                                    onClick={() =>
                                                                        openUserPublicProfileHandler(
                                                                            comment_replies?.user
                                                                                ?.username
                                                                        )
                                                                    }
                                                                    className="font-semibold text-sm text-[#161823] cursor-pointer hover:underline cursor-pointer"
                                                                >
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
                                                            className="w-2.5 h-2.5 object-contain cursor-pointer animate-bounce"
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
                    </InfiniteScroll>
                    {isCommentsLoading && (
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
                                        className={`w-full h-full object-cover rounded-lg ${hoveredIndex === index ? 'block' : 'hidden'
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
                                        className={`w-full h-full object-cover rounded-lg ${hoveredIndex === index ? 'hidden' : 'block'
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
            {isEmbedPopupVisible && (
                <EmbedSharePopup
                    videoUrl={videoUrl}
                    embedCode={embedCode}
                    copyEmbedCodeHandler={copyEmbedCodeHandler}
                    setIsEmbedModalOpen={setIsEmbedPopupVisible}
                    chevronUpIconVideo={chevronUpIconVideo}
                    chevronDownIconVideo={chevronDownIconVideo}
                    isLiked={isLiked}
                    redHeartIcon={redHeartIcon}
                    whiteHeartIcon={whiteHeartIcon}
                    videoLikes={videoLikes}
                    commentIcon={commentIcon}
                    videoComments={videoComments}
                    isSaved={isSaved}
                    savedIcon={savedIcon}
                    saveIcon={saveIcon}
                    videoSaves={videoSaves}
                    shareIcon={shareIcon}
                    videoShares={videoShares}
                    musicIcon={musicIcon}
                    userName={userName}
                    musicTitle={musicTitle}
                    videoDescription={videoDescription}
                />
            )}
        </Layout>
    );
};

export default VideoPage;
