import { Box, CircularProgress, ClickAwayListener, createTheme, Divider, Grid, IconButton, Menu, MenuItem, Modal, Paper, Popper, TextField, ThemeProvider, Typography } from '@mui/material';
import style from './popupForVideoPlayer.module.scss';
import VideoModel from '../components/videoModel';
import moment from 'moment';
import musicTuneLight from '../svg-components/music-tune-light.svg';
import locationIcon from '../svg-components/location-icon.svg';
import { isUserLoggedIn } from '../../../utils/common';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { BASE_URL_FRONTEND, showToast, showToastSuccess, showToastError } from '../../../utils/constants';
import { useNavigate, Link } from 'react-router-dom';
import PopupForReport from './PopupForReport';
import { defaultAvatar, linkedInShare, more, moreInWhite, twitterShare } from '../../../icons';
import { toast, ToastContainer } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import Forwardusers from '../../../shared/popups/shareTo/Forwardusers';
import CountUp from 'react-countup';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { set } from 'lodash';
import { copyLinkHandlerWithId, copyLinkHandler, facebookShareHandler, getCaretCoordinates, searchUserToAnnotate, shareToLinkedIn, shareToTwitter, whatsappShareHandler, logPostStats } from '../../../utils/helpers';
import HashtagText from '../../../shared/hashTag/HashtagText';
import PopupForPrivacySettings from './popupForPrivacySettings';
import { useUpdateEffect } from 'react-use';
import CustomContextMenu from '../../homePage/components/CustomContextMenu';
import MORE_MENU_HOME from '../../../shared/Menu/more';
import { EmojiObjects } from '@mui/icons-material';

// import PopupForDeleteMedia from './popupForDeleteMedia';
import { useAuthStore } from '../../../store/authStore';


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
    onToggleLikePost,
}: any) {
    const { balance } = useAuthStore();
    const token = localStorage.getItem('token');
    const loggedUserId = localStorage.getItem('userId');
    const API_KEY = process.env.VITE_API_URL;
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ITEM_HEIGHT = 60;
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // console.log('popup for video player component...')
    // console.log(info?.user?.avatar);

    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });



    const abortController = useRef<AbortController | null>(null);
    const videoRef = useRef<any>(null);
    // const [selectedVideoId, setSelectedVideoId] = useState<any>(null);
    const [videoLikes, setVideoLikes] = useState<number>(0);
    const [videoComments, setVideoComments] = useState<any>({ items: [], totalItems: null, pageSize: 5, currentPage: 1 });
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
    const [currentCommentIndex, setCurrentCommentIndex] = useState(-1);
    const [isReplyToCommentClicked, setIsReplyToCommentClicked] = useState<boolean>(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
    const [comment, setComment] = useState('');
    // const [likedComments, setLikedComments] = useState<{ isLiked: boolean, likes: number }[]>([]);
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
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [commentEmojiIndex, setCommentEmojiIndex] = useState(-1);
    const [isPrivacyModalOpened, setIsPrivacyModalOpened] = useState(false)
    const [privacyPrivilege, setPrivacyPrivilege] = useState<any>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isFetchingUsers, setIsFetchingUsers] = useState(false);
// handle gift popup

    const [giftAnchor, setGiftAnchor] = useState(null);

  const handleGiftClick = (event) => {
    setGiftAnchor(giftAnchor ? null : event.currentTarget);
  };

  const handleGiftClose = () => {
    setGiftAnchor(null);
  };

  const giftOpen = Boolean(giftAnchor);


    const handleContextMenu = (e: React.MouseEvent<HTMLVideoElement>) => {
            e.preventDefault();
        
            const videoRect = e.currentTarget.getBoundingClientRect(); // Get video position relative to the viewport
            const clickX = e.clientX - videoRect.left; // Adjust X based on video position
            const clickY = e.clientY - videoRect.top; // Adjust Y based on video position
        
            const menuWidth = 224; // Approximate width of the context menu
            const menuHeight = 180; // Approximate height of the context menu
        
            // Prevent the menu from going outside the video bounds
            const adjustedX = clickX + menuWidth > videoRect.width ? videoRect.width - menuWidth - 10 : clickX;
            const adjustedY = clickY + menuHeight > videoRect.height ? videoRect.height - menuHeight - 10 : clickY;
        
            setContextMenuPosition({ x: adjustedX, y: adjustedY });
            setShowContextMenu(true);
        };
        
    
        const handleDownload = async (event: any) => {
            event.stopPropagation();
            // Implement your download logic here
            console.log('Downloading video...');
            setShowContextMenu(false);
    
            try {
                showToastSuccess('Video is downloading...');
                
                // Fetch the video data as a blob
                const videoUrl = info?.reducedVideoUrl?.length > 0
                    ? info?.reducedVideoUrl
                    : info?.originalUrl;

                const response = await fetch(videoUrl, {
                    method: 'GET',
                    headers: {
                        // Add headers if needed for authorization or content type
                    },
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch video');
                }
                const blob = await response.blob();
                // Ensure the response is a valid video blob
                const contentType = response.headers.get('Content-Type');
                if (!contentType || !contentType.includes('video')) {
                    throw new Error('The file is not a valid video');
                }
        
                // Create a URL for the blob
                const url = window.URL.createObjectURL(blob);
                // Create a download link
                const link = document.createElement('a');
                link.href = url;
                link.download = 'video.mp4'; // Set default file name
        
                // Trigger the download
                document.body.appendChild(link); // Append the link to the DOM
                link.click();
                document.body.removeChild(link); // Clean up the DOM
        
                // Revoke the object URL after download to free up resources
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Failed to download video', error);
            }
        };
    
        const handleCopyLink = (event: any) => {
            event.stopPropagation();

            copyLinkHandlerWithId(info?.user?._id, info?.mediaId, 'Copied successfully')
            setShowContextMenu(false);
        };
    
        const handleVideoDetail = (event: any) => {
            event.stopPropagation();
            setShowContextMenu(false);
            // const url = `${BASE_URL_FRONTEND}/${info?.user?.username}/video/${info?.mediaId}`;
            const url = `${BASE_URL_FRONTEND}/${info?.user?._id}/video/${info?.mediaId}`;
            // Open the URL in a new tab
            window.open(url, '_blank');
    
           
        };
    
        const sendToFriends = (event: any) => {
            event.stopPropagation();
            sharePopupHandler();
        }
        
        const handleCloseContextMenu = (event: any) => {
            event.stopPropagation();  // Stop the click event from bubbling up to the parent
            setShowContextMenu(false);
        };
    
        useEffect(()=> {
            console.log('current post');
            console.log(info);
        },[])
    
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (showContextMenu) {
                    setShowContextMenu(false);
                }
            };
        
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, [showContextMenu]);

    const open = Boolean(anchorEl);

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


    const onEmojiClick = (emojiObject: any) => {
        setComment((prevText) => prevText + emojiObject.emoji); // Append emoji to input text
    };

    const onReplyEmojiClick = (emojiObject: any) => {
        setCommentReply((prevText) => prevText + emojiObject.emoji); // Append emoji to input text
    };


    const saveVideoToggler = async () => {
        if (isUserLoggedIn()) {
            try {
                isSaved ? setVideoSaves(videoSaves - 1) : setVideoSaves(videoSaves + 1);
                setIsSaved(!isSaved);
                
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
                const resp = await likeUnlikeVideo.json();
                console.log(resp.message);
                if (resp.status === 200) {
                    fetchMediaById(info?.mediaId);
                }
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


    const embedShareHandler = () => {
        setIsEmbedPopupVisible(true);
    };

    const sendToFriendsHandler = () => { };

    const sharePopupHandler = () => { setSendPopup(true) };

    const loginPopup = () => {
        dispatch(openLoginPopup());
    };

    const paginateComments = async (fromStart = false) => {
        setIsCommentsLoading(true);
        try {
            const response = await fetch(
                `${API_KEY}/media-content${token ? '' : '/public'}/videos/${info?.mediaId
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
            // console.log('🚀 ~ paginateComments ~ data', data);
            setIsCommentsLoading(false);

            const videoCommentsObj = { ...videoComments };

            // Append comments
            if (data?.data && Array.isArray(data?.data)) {
                // setLikedComments((prev) => ([...prev, ...data?.data.map((comment:any) => ({ id: comment?.id, isLiked: comment?.isLiked, likes: comment?.likes }))]));
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

    const openUserPublicProfileHandler = async (username: string) => {
        navigate(`/profile/${username}`);
    };

    const commentLikeToggler = async (commentId: string) => {
        if (isUserLoggedIn()) {
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
                const resp = await addCommentResponse.json();
                if (resp.message !== "Success") return;
                const videoCommentsArr = [...videoComments.items];
                const commentObj = videoCommentsArr.find((item: any) => item.id === commentId);
                commentObj.likes = commentObj.isLiked ? commentObj.likes - 1 : commentObj.likes + 1;
                commentObj.isLiked = !commentObj.isLiked;
                setVideoComments({ ...videoComments, items: videoCommentsArr });
                fetchMediaById(info?.mediaId);
                // paginateComments(true);
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
            console.log('data info',data);
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

            setPrivacyPrivilege({
                allow_duet: data.allowDuet,
                privacyOptions: {
                    allowComments: data.privacyOptions.allowComments,
                    allowDownload: data.privacyOptions.allowDownload,
                    isOnlyMe: data.privacyOptions.isOnlyMe,
                    isShareable: data.privacyOptions.isShareable,
                },
            })
        } catch (error) {
            console.log('🚀 ~ fetchMediaById ~ error:', error);
        }
    };

    // functions related to comment
    const atRateHandler = () => {
        setComment((prev) => prev + '@');
        setIsMentioning(true);
        setIsFetchingUsers(true);
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
                setIsReplyToCommentClicked(false);
                setCommentEmojiIndex(-1);
                paginateComments(true);
            } catch (error) {
                console.log('🚀 ~ addCommentHandler ~ error:', error);
                setIsReplyToCommentClicked(false);
                setCommentEmojiIndex(-1);
            }
        } else {
            loginPopup();
        }
    };

    // functions related to comment replies
    const commentReplyLikeToggler = async (commentId: string, replyId: string) => {
        // setLikedReplies((prev) => ({
        //     ...prev,
        //     [replyId]: !prev[replyId],
        // }));

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
            const resp = await addCommentResponse.json();
            if (resp?.message !== "Success") return;
            const videoCommentsArr = [...videoComments.items];
            const replyObj = videoCommentsArr.find((item: any) => item.id === commentId).replies.find((reply: any) => reply.id === replyId);
            replyObj.likes = replyObj.isLiked ? replyObj.likes - 1 : replyObj.likes + 1;
            replyObj.isLiked = !replyObj.isLiked;
            setVideoComments({ ...videoComments, items: videoCommentsArr });
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

    useUpdateEffect(() => {
        if (!isMentioning) return;
        const positionObj = getCaretCoordinates(inputRef.current, inputRef.current.selectionStart, inputRef.current.parentNode);
        popupRef.current.style.left = `${positionObj?.left ?? 0 + window.scrollX}px`;
    }, [isMentioning])

    const handleKeyDown = (e: { currentTarget: any; key: string; preventDefault: () => void }) => {
        if (!isMentioning) return;

        // Navigate down
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            // setMentionIndex((prevIndex) => Math.min(prevIndex + 1, filteredUsers.length - 1));
            const newIndex = Math.min(mentionIndex + 1, filteredUsers.length - 1);
            setMentionIndex(newIndex);
            if (filteredUsers.length > 5 && newIndex > 4) {
                console.dir(popupRef.current);
                const { clientHeight } = popupRef.current.firstChild;
                popupRef.current.scrollTop += clientHeight;
            }
        }

        // Navigate up
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            // setMentionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            const newIndex = Math.max(mentionIndex - 1, 0);
            setMentionIndex(newIndex);
            if (filteredUsers.length > 5 && (filteredUsers.length-5) > newIndex )
            {
                console.dir(popupRef.current);
                const { clientHeight } = popupRef.current.firstChild;
                popupRef.current.scrollTop -= clientHeight;
            }
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
            const data = await addCommentResponse.json();
            setComment('');
            showToastSuccess('Comment posted');
            // fetchMediaById(info?.mediaId);
            setAddCommentLoading(false);
            // setVideoComments((prevComments: []) => [data?.data, ...prevComments]);
            paginateComments(true);
            setCommentEmojiIndex(-1);
        } catch (error) {
            console.log('🚀 ~ addCommentHandler ~ error:', error);
            setAddCommentLoading(false);
            setCommentEmojiIndex(-1);
        }
    };

    function addGiftComment(giftId: string)
    {
        let endpoint = `${process.env.VITE_API_URL}/gift/send`;
        let requestOptions =
        {
            method: 'POST',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ giftId, mediaId: info?.mediaId }),
        };

        if(balance == 0)
        {
            showToastError('Do not have enough balance.');
            return;
        }

        if (addCommentLoading) return;
        setAddCommentLoading(true);

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(
            (response) =>
                {
                    setComment('');
                    showToastSuccess('Gift sent');
                    setAddCommentLoading(false);
                    paginateComments(true);
                    setCommentEmojiIndex(-1);
                }
        )
        .catch((error) => console.error('Fetch error:', error));
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

    const [giftsDetails, setGiftsDetails] = useState<any>(
        {
          details: [],
          isLoading: false,
        }
    );

    function loadGiftsDetails()
    {
        let endpoint = `${process.env.VITE_API_URL}/gift`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };

        setGiftsDetails((prev: any) => ({ ...prev, isLoading: true }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => setGiftsDetails((prev: any) => ({ ...prev, details: response.data, isLoading: false })))
        .catch((error) => console.error('Fetch error:', error));
    };

    const onCloseCleanUp = () => {
        setSendPopup(false);
        setReportPopup(false);
        setComment('');
        setCommentReply('');
        setIsMentioning(false);
        setIsReplyToCommentClicked(false);
        // setLikedComments([]);
        setLikedReplies({});
        setVisibleReplies({});
        setCurrentCommentIndex(-1);
        setCurrentCommentReplyIndex(-1);
        setMentionIndex(0);
        setFilteredUsers([]);
        setAddCommentLoading(false);
        setVideoComments({ items: [], totalItems: null, pageSize: 5, currentPage: 1 });
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
        setCommentEmojiIndex(-1);
        setPrivacyPrivilege(null);
        onclose();
        onToggleLikePost(info, isLiked);
        videoRef.current.currentTime && logPostStats({postId: info.mediaId, videoWatchTime: videoRef.current.currentTime});
    };

    useEffect(() => {
        // setSelectedVideoId(info?.mediaId);
        let shareLink = userName;
        if(userId){
            shareLink = userId;
        }
        setTextToCopy(`${BASE_URL_FRONTEND}/${info?.user?._id}/video/${info?.mediaId}`);

    }, [info]);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setIsDarkTheme(true);
        }
    });

    useLayoutEffect(() => {
        if (videoModal) {
            // paginateComments();
            loadUserProfile();
            fetchMediaById(info?.mediaId);
            loadGiftsDetails();
        }
    }, [videoModal]);

    useUpdateEffect(() => {
      if (privacyPrivilege?.privacyOptions?.allowComments) paginateComments(true);
    }, [privacyPrivilege?.privacyOptions?.allowComments])
    

    const lightThemePalette = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkThemePalette = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    useEffect(() => {
        if (isMentioning) {
            // Filter users based on the current input
            const query = comment.slice(comment.lastIndexOf('@') + 1).toLowerCase();
            if (query.length) setIsFetchingUsers(true);
            if (query.length > 2) {
                if (abortController.current) abortController.current.abort();
                const controller = new AbortController();
                abortController.current = controller;
                // const filtered = dummyUsers.filter((user) =>
                //     user.username.toLowerCase().includes(query)
                // );
                // setFilteredUsers(filtered.slice(0, 5)); // Limit to 5 users
                (async ()=>{
                    const searchResultArr = await searchUserToAnnotate(query, controller.signal);
                    console.log(searchResultArr);
                    if (!Array.isArray(searchResultArr)) return;
                    setFilteredUsers(searchResultArr);
                    setIsFetchingUsers(false);
                })()
            } else {
                setFilteredUsers([]);
            }
        } else {
            setFilteredUsers([]);
            setMentionIndex(0);
        }
        
        return () => {
            if (abortController.current) abortController.current.abort();
        }
    }, [comment, isMentioning]);

    return (
        <ThemeProvider theme={darkThemePalette}>
        <PopupForPrivacySettings fetchUpdatedMedia={fetchMediaById} isPrivacyModalOpened={isPrivacyModalOpened} setIsPrivacyModalOpened={setIsPrivacyModalOpened} mediaId={info?.mediaId} />
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
                            className="flex flex-row items-center w-screen h-screen relative newpopup"
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
                                    {showContextMenu && (
                                        <CustomContextMenu
                                            x={contextMenuPosition.x}
                                            y={contextMenuPosition.y}
                                            post={info}
                                            onClose={handleCloseContextMenu}
                                            onDownload={handleDownload}
                                            onCopyLink={handleCopyLink}
                                            popupHandler={sendToFriends}
                                            onVideoDetail={handleVideoDetail}
                                        />
                                    )}

                                    
                                    {/* {info?.templateImage && <img src={info?.templateImage} /> } */}
                                    <video
                                        ref={videoRef}
                                        className="relative w-3/5 h-full"
                                        loop={true}
                                        controls={true}
                                        autoPlay={true}
                                        preload="auto"
                                        playsInline
                                        src={
                                            info?.reducedVideoUrl?.length > 0
                                                ? info?.reducedVideoUrl
                                                : info?.originalUrl
                                        }
                                        onContextMenu={handleContextMenu}
                                    />

                                    {/* <MORE_MENU_HOME
                                         visibleReportPopup={() => {setReportPopup(true);}}
                                        url={ info?.reducedVideoUrl
                                            ? info?.reducedVideoUrl : info.originalUrl}
                                        postMediaId={info?.mediaId }
                                        activeMediaId={info?.mediaId}
                                        isFromPopupVideoPlayer={'yes'}
                                    /> */}

                                </div>

                                {/* Right side (37%) bg-white and bg-f8f8f8 for light */}
                                <div className="w-[37%] h-full bg-[#121212] py-4 px-4 overflow-y-auto relative" id="scrollableDiv">
                                    <div className="bg-[#1b1b1b] rounded-lg p-3.5">
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-row justify-center items-center gap-2.5">
                                                <Link to={`/profile/${info?.user?.username}`} reloadDocument={false}>
                                                <img
                                                    className="h-10 w-10 object-cover rounded-full"
                                                    src={info?.user?.avatar || defaultAvatar}
                                                    alt="avatar"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                        (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                                    }}
                                                />
                                                </Link>
                                                <div className="text-white">
                                                    <p className="text-base font-bold">
                                                        <Link to={`/profile/${info?.user?.username}`} reloadDocument={false}>{info?.user?.name || 'User'}</Link>
                                                    </p>
                                                    <p className="text-sm font-normal">
                                                        {info?.user?.username} .{' '}
                                                        {moment(info?.createdTime).format(
                                                            'DD-MM-YYYY'
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {userId && (loggedUserId !== userId ? <div onClick={handleFollowClick} className="rounded-sm bg-[#FF3B5C] p-2 w-[6rem] h-[2.25rem] flex flex-row justify-center items-center cursor-pointer">
                                                <p className="text-base text-white font-bold">
                                                    {followLoading ? <CircularProgress
                                                        style={{
                                                            width: 18,
                                                            height: 18,
                                                            color: 'white',
                                                        }}
                                                    /> : isFollowed ? 'Following' : 'Follow'}
                                                </p>
                                            </div> : <div>
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'privacry-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                    style={{ padding: '0px' }}
                                                >
                                                    <img onClick={() => { }} style={{ cursor: 'pointer' }} src={moreInWhite} alt="" />
                                                </IconButton>
                                                <Menu
                                                    id="privacry-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={() => {
                                                        setAnchorEl(null);
                                                    }}
                                                    slotProps={{
                                                        paper: {
                                                          elevation: 0,
                                                          sx: {
                                                            overflow: 'visible',
                                                            padding: '10px',
                                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                            mt: 1.5,
                                                            '& .MuiAvatar-root': {
                                                              width: 32,
                                                              height: 32,
                                                              ml: -0.5,
                                                              mr: 1,
                                                            },
                                                            '&::before': {
                                                              content: '""',
                                                              display: 'block',
                                                              position: 'absolute',
                                                              top: 0,
                                                              right: 14,
                                                              width: 10,
                                                              height: 10,
                                                              bgcolor: 'background.paper',
                                                              transform: 'translateY(-50%) rotate(45deg)',
                                                              zIndex: 0,
                                                            },
                                                          },
                                                        },
                                                      }}
                                                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    <MenuItem onClick={()=>{setIsPrivacyModalOpened(true);setAnchorEl(null)}}><span className='font-bold' style={{color:'rgb(255,59,92)'}}>Privacy settings</span></MenuItem>
                                                    <Divider />
                                                    <MenuItem onClick={deleteVideoPopup}><span className='font-bold'>Delete</span></MenuItem>
                                                </Menu>
                                            </div>
                                            )}
                                        </div>
                                        <p className="text-base font-normal text-white mt-2.5 break-words text-left">
                                            <HashtagText text={info?.description} maxLength={100} />
                                        </p>
                                        <div className="flex flex-row items-center mt-2.5 gap-2.5">
                                            <img
                                                className="w-3 h-3 object-contain"
                                                src={musicTuneLight}
                                                alt="tune-icon"
                                            />
                                            <p onClick={()=>navigate(`/sounds/${info?.sound?._id}`)} className="text-xs font-normal text-white cursor-pointer">
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
                                                    <CountUp start={0} delay={0.1} duration={0.2} end={videoComments?.items?.length} />
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
                                                        onClick={() => shareToLinkedIn(userName, videoUrl, info?.description)}
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
                                                        onClick={() => shareToTwitter(userName, videoUrl, info?.description)}
                                                        className="h-6 w-6 object-contain cursor-pointer"
                                                        // src={sendToFriendsIcon}
                                                        src={twitterShare}
                                                    />
                                                </div>
                                                <div className="flex justify-center items-center rounded-full bg-[#24d366] p-1 cursor-pointer">
                                                    <img
                                                        onClick={() => whatsappShareHandler(userName, videoUrl)}
                                                        className="h-4 w-4 object-contain cursor-pointer"
                                                        src={whatsappShare}
                                                    />
                                                </div>
                                                <div className="flex justify-center items-center rounded-full bg-[#0075fb] p-1 cursor-pointer">
                                                    <img
                                                        onClick={() => facebookShareHandler(userName, videoUrl)}
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
                                            onClick={() => copyLinkHandler(info?.user?._id, info?.mediaId, 'Copied')}
                                            className="flex justify-center items-center hover:bg-[#1b1b1b] w-1/5 bg-[#252525] rounded-r-lg py-1.5 px-2 cursor-pointer"
                                        >
                                            <p className="text-white font-bold text-sm">
                                                Copy Link
                                            </p>
                                        </div>
                                    </div>
                                    {/* recieved gifts section */}
                                    {/* <div className={style.gifts}>
                                        <p className={style.receivedGifftsText}>Gifts received </p>
                                        <div>
                                        {giftsDetails.details.map((item: any) => {
                                            const isVideo = item.imageUrl?.endsWith('.mp4') || item.imageUrl?.endsWith('.webm') || item.imageUrl?.endsWith('.ogg');

                                            return isVideo ? (
                                                <video
                                                key={item._id}
                                                src={item.imageUrl + '#t=0.1'}
                                                muted
                                                controls={false}
                                                onClick={() => addGiftComment(item._id)}
                                                />
                                            ) : (
                                                <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                key={item._id}
                                                onClick={() => addGiftComment(item._id)}
                                                />
                                            );
                                            })}
                                        </div>
                                    </div> */}
                                    {giftOpen && (
                                    <ClickAwayListener onClickAway={handleGiftClose}>
                                        <Box
                                        position="absolute"
                                        bottom={0}
                                        right={0}
                                        width="100%"
                                        height="20rem"
                                        zIndex={1}
                                        boxShadow={3}
                                        borderRadius={2}
                                        >
                                        <Paper elevation={3} sx={{ width: '100%', p: 2, height: '20rem', overflowY: 'auto' }}>
                                            <Box display="flex"  alignItems="center" mb={2}>
                                            <Typography variant="h6" color="error">Recharge</Typography>
                                            <Box display="flex" alignItems="center">
                                                <svg style={{padding: '0.25rem'}} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_2454_21248"  x="0" y="0" width="25" height="25">
                                                    <path d="M0.404297 0.253906H24.4043V24.2539H0.404297V0.253906Z" fill="white"/>
                                                    </mask>
                                                    <g mask="url(#mask0_2454_21248)">
                                                    <path d="M24.4043 12.2539C24.4043 15.4365 23.14 18.4888 20.8896 20.7392C18.6391 22.9896 15.5869 24.2539 12.4043 24.2539C9.2217 24.2539 6.16945 22.9896 3.91902 20.7392C1.66858 18.4888 0.404297 15.4365 0.404297 12.2539C0.404297 9.07131 1.66858 6.01906 3.91902 3.76862C6.16945 1.51819 9.2217 0.253906 12.4043 0.253906C15.5869 0.253906 18.6391 1.51819 20.8896 3.76862C23.14 6.01906 24.4043 9.07131 24.4043 12.2539Z" fill="#FFB84D"/>
                                                    <path d="M23.9043 12.2539C23.9043 13.7641 23.6068 15.2595 23.0289 16.6548C22.451 18.05 21.6039 19.3178 20.536 20.3856C19.4682 21.4535 18.2004 22.3006 16.8052 22.8785C15.4099 23.4564 13.9145 23.7539 12.4043 23.7539C10.8941 23.7539 9.39868 23.4564 8.00344 22.8785C6.60819 22.3006 5.34044 21.4535 4.27257 20.3856C3.2047 19.3178 2.35761 18.05 1.77968 16.6548C1.20175 15.2595 0.904297 13.7641 0.904297 12.2539C0.904297 9.20392 2.1159 6.27885 4.27257 4.12218C6.42924 1.96551 9.35431 0.753906 12.4043 0.753906C15.4543 0.753906 18.3794 1.96551 20.536 4.12218C22.6927 6.27885 23.9043 9.20392 23.9043 12.2539Z" fill="#FFDE55"/>
                                                    <path d="M21.4043 12.2539C21.4043 13.4358 21.1715 14.6061 20.7192 15.6981C20.2669 16.79 19.604 17.7821 18.7683 18.6179C17.9325 19.4536 16.9404 20.1165 15.8484 20.5688C14.7565 21.0211 13.5862 21.2539 12.4043 21.2539C11.2224 21.2539 10.0521 21.0211 8.96015 20.5688C7.86822 20.1165 6.87606 19.4536 6.04034 18.6179C5.20461 17.7821 4.54167 16.79 4.08938 15.6981C3.63709 14.6061 3.4043 13.4358 3.4043 12.2539C3.4043 9.86696 4.35251 7.57777 6.04034 5.88995C7.72816 4.20212 10.0173 3.25391 12.4043 3.25391C14.7912 3.25391 17.0804 4.20212 18.7683 5.88995C20.4561 7.57777 21.4043 9.86696 21.4043 12.2539Z" fill="#F7A300"/>
                                                    <path d="M21.4043 12.2539C21.4043 13.4358 21.1715 14.6061 20.7192 15.6981C20.2669 16.79 19.604 17.7821 18.7683 18.6179C17.9325 19.4536 16.9404 20.1165 15.8484 20.5688C14.7565 21.0211 13.5862 21.2539 12.4043 21.2539C11.2224 21.2539 10.0521 21.0211 8.96015 20.5688C7.86822 20.1165 6.87606 19.4536 6.04034 18.6179C5.20461 17.7821 4.54167 16.79 4.08938 15.6981C3.63709 14.6061 3.4043 13.4358 3.4043 12.2539C3.4043 9.86696 4.35251 7.57777 6.04034 5.88995C7.72816 4.20212 10.0173 3.25391 12.4043 3.25391C14.7912 3.25391 17.0804 4.20212 18.7683 5.88995C20.4561 7.57777 21.4043 9.86696 21.4043 12.2539Z" fill="#F7A80F"/>
                                                    <path d="M21.3743 13.0038C21.4758 11.7641 21.3192 10.5169 20.9145 9.34085C20.5097 8.16476 19.8656 7.08534 19.0228 6.17068C18.1799 5.25603 17.1566 4.526 16.0175 4.02667C14.8784 3.52733 13.6481 3.26953 12.4043 3.26953C11.1605 3.26953 9.93025 3.52733 8.7911 4.02667C7.65196 4.526 6.62868 5.25603 5.78583 6.17068C4.94299 7.08534 4.29888 8.16476 3.89414 9.34085C3.4894 10.5169 3.33283 11.7641 3.4343 13.0038C3.61866 10.7515 4.64359 8.65092 6.30545 7.11954C7.96731 5.58815 10.1445 4.738 12.4043 4.738C14.6641 4.738 16.8413 5.58815 18.5031 7.11954C20.165 8.65092 21.1899 10.7515 21.3743 13.0038Z" fill="#E88B00"/>
                                                    <path d="M21.3743 13.0038C21.4758 11.7641 21.3192 10.5169 20.9145 9.34085C20.5097 8.16476 19.8656 7.08534 19.0228 6.17068C18.1799 5.25603 17.1566 4.526 16.0175 4.02667C14.8784 3.52733 13.6481 3.26953 12.4043 3.26953C11.1605 3.26953 9.93025 3.52733 8.7911 4.02667C7.65196 4.526 6.62868 5.25603 5.78583 6.17068C4.94299 7.08534 4.29888 8.16476 3.89414 9.34085C3.4894 10.5169 3.33283 11.7641 3.4343 13.0038C3.61866 10.7515 4.64359 8.65092 6.30545 7.11954C7.96731 5.58815 10.1445 4.738 12.4043 4.738C14.6641 4.738 16.8413 5.58815 18.5031 7.11954C20.165 8.65092 21.1899 10.7515 21.3743 13.0038Z" fill="#F09207"/>
                                                    </g>
                                                </svg>

                                                <Typography>{ balance }</Typography>
                                            </Box>
                                            </Box>

                                            <Grid container spacing={2} px={2}>
                                                <div className={`${style.gifts} `}>
                                                {giftsDetails.details.map((item: any) => {
                                                    const isVideo = item.imageUrl?.endsWith('.mp4') || item.imageUrl?.endsWith('.webm') || item.imageUrl?.endsWith('.ogg');

                                                    return isVideo ? (
                                                        <video
                                                        key={item._id}
                                                        src={item.imageUrl + '#t=0.1'}
                                                        muted
                                                        controls={false}
                                                        onClick={() => addGiftComment(item._id)}
                                                        style={{ width: '3rem', height: 'auto', borderRadius: '50%', cursor: 'pointer' }}   
                                                        />
                                                    ) : (
                                                        <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        key={item._id}
                                                        onClick={() => addGiftComment(item._id)}
                                                        style={{ width: '3rem', height: 'auto', borderRadius: '50%', cursor: 'pointer' }}
                                                        />
                                                    );
                                                    })}
                                                </div>
                                            {/* {giftItems.map((gift, index) => (
                                                <Grid item xs={4} sm={4} key={index}>
                                                <Box
                                                    border={gift === '1st Place' ? '2px solid red' : 'none'}
                                                    borderRadius={2}
                                                    textAlign="center"
                                                    p={1}
                                                    bgcolor="#f9f9f9"
                                                >
                                                    <Box
                                                    width={40}
                                                    height={40}
                                                    borderRadius="50%"
                                                    bgcolor="#e0e0e0"
                                                    mx="auto"
                                                    mb={1}
                                                    ></Box>
                                                    <Typography variant="body2" fontSize={12}>{gift}</Typography>
                                                    <Typography variant="caption" color="textSecondary">5 Coins</Typography>
                                                </Box>
                                                </Grid>
                                            ))} */}
                                            </Grid>
                                        </Paper>
                                        </Box>
                                        </ClickAwayListener>
                                        
                                    )}
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
                                                Comments (<CountUp start={0} delay={0.1} duration={0.2} end={videoComments?.items?.length} />)
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
                                    {Boolean(info)? info?.privacyOptions?.allowComments?<InfiniteScroll
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
                                                <p className="text-white font-normal text-sm">
                                                    {videoComments?.totalItems === 0 ? 'Be the first to comment' : 'No more comments'}
                                                </p>
                                            </div>
                                        }
                                    >
                                        {videoComments?.items.map((comment: any, comment_index: number) => (
                                            <div key={comment?.id}>
                                                <div
                                                    onMouseEnter={() => {
                                                        setIsReportElipsisVisible(true);
                                                        // setCurrentCommentIndex(comment_index);
                                                        // setIsReplyToCommentClicked(false);
                                                        setCommentEmojiIndex(-1);
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
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                                (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                                            }}
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
                                                    <div className="flex flex-row items-start justify-between gap-12 w-full" >
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
                                                                    <p className="font-normal text-[#807a7a] text-base cursor-pointer w-[350px] " style={{ overflowWrap: "break-word" }}>
                                                                        {comment?.comment}
                                                                    </p>
                                                                    <div className="flex flex-row items-center gap-2 mt-1">
                                                                        <p className="text-[#FFFFFF80] font-normal whitespace-nowrap	 text-sm">
                                                                            {moment(
                                                                                comment?.createdTime
                                                                            ).format('D-MM')}
                                                                        </p>
                                                                        <p
                                                                            onClick={() => { setCurrentCommentIndex(comment_index); setIsReplyToCommentClicked(true) }}
                                                                            className="text-[#FFFFFF80] font-normal text-[0.938rem] cursor-pointer"
                                                                        >
                                                                            Reply
                                                                        </p>
                                                                        {comment_index === currentCommentIndex &&
                                                                            isReplyToCommentClicked && (
                                                                                <div className="cursor-pointer flex w-full flex-row items-center gap-2.5 mt-2">
                                                                                    <div className="bg-[#FFFFFF1F] flex flex-row items-center justify-between border-[0.063rem] border-transparent focus-within:border-[#16182333] rounded-lg cursor-text pr-2 pl-4 w-full mr-1">
                                                                                        <form onSubmit={(e)=>{e.preventDefault();replyToCommentHandler(comment?.id);}}>
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
                                                                                            className="bg-transparent placeholder-[#4d4e58 text-[#d5cbcb] w-full"
                                                                                            required
                                                                                        />
                                                                                        </form>

                                                                                        <div className="flex flex-row items-center">
                                                                                            <span>
                                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M12 6.16667V21.3333M12 6.16667H7.875C7.26721 6.16667 6.68432 5.92084 6.25455 5.48324C5.82477 5.04566 5.58333 4.45217 5.58333 3.83333C5.58333 3.2145 5.82477 2.621 6.25455 2.18342C6.68432 1.74583 7.26721 1.5 7.875 1.5C11.0833 1.5 12 6.16667 12 6.16667ZM12 6.16667H16.125C16.7328 6.16667 17.3157 5.92084 17.7455 5.48324C18.1752 5.04566 18.4167 4.45217 18.4167 3.83333C18.4167 3.2145 18.1752 2.621 17.7455 2.18342C17.3157 1.74583 16.7328 1.5 16.125 1.5C12.9166 1.5 12 6.16667 12 6.16667ZM3.83333 12H20.1667V18.7667C20.1667 20.0734 20.1667 20.7269 19.9123 21.226C19.6887 21.665 19.3317 22.022 18.8927 22.2457C18.3936 22.5 17.7401 22.5 16.4333 22.5H7.56667C6.25987 22.5 5.60648 22.5 5.10736 22.2457C4.6683 22.022 4.31135 21.665 4.08765 21.226C3.83333 20.7269 3.83333 20.0734 3.83333 18.7667V12ZM3.36667 12H20.6333C21.2868 12 21.6134 12 21.863 11.8728C22.0826 11.7609 22.261 11.5826 22.3728 11.363C22.5 11.1135 22.5 10.7868 22.5 10.1333V8.03333C22.5 7.37994 22.5 7.05324 22.3728 6.80368C22.261 6.58416 22.0826 6.40568 21.863 6.29382C21.6134 6.16667 21.2868 6.16667 20.6333 6.16667H3.36667C2.71327 6.16667 2.38657 6.16667 2.13701 6.29382C1.91749 6.40568 1.73901 6.58416 1.62715 6.80368C1.5 7.05324 1.5 7.37994 1.5 8.03333V10.1333C1.5 10.7868 1.5 11.1135 1.62715 11.363C1.73901 11.5826 1.91749 11.7609 2.13701 11.8728C2.38657 12 2.71327 12 3.36667 12Z" stroke="#FF2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                                </svg>
                                                                                            </span>
                                                                                            <div
                                                                                                onClick={
                                                                                                    atRateHandler
                                                                                                }
                                                                                                className="rounded-lg cursor-pointer hover:bg-[#1618230f] my-[0.438rem] mx-[0.188rem] mr-1"
                                                                                            >
                                                                                                <img
                                                                                                    className={`w-5 h-5 object-contain rounded-full`}
                                                                                                    src={
                                                                                                        atTheRateOf
                                                                                                    }
                                                                                                    alt="at-the-rate-icon"
                                                                                                />
                                                                                            </div> 
                                                                                            <div onClick={() => setCommentEmojiIndex(comment_index)} className="rounded-lg cursor-pointer hover:bg-[#1618230f] my-[0.438rem] mx-[0.188rem]">
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
                                                                                                : 'text-[#FFFFFF57]'
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
                                                                    

                                                                    <EmojiPicker className="mt-2" open={(commentEmojiIndex === comment_index) ? true : false} theme={Theme.DARK} height={300} width="auto" onEmojiClick={onReplyEmojiClick} />
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
                                                                            comment?.isLiked
                                                                                ? redHeartIcon
                                                                                : emptyHeartLightIcon
                                                                        }
                                                                        alt=""
                                                                    />
                                                                    <p className="text-[#FFFFFF80] font-normal text-sm">
                                                                        {comment?.likes ?? 0}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {isReportElipsisVisible &&
                                                        comment_index === currentCommentIndex ? (
                                                        <div className="relative inline-block">
                                                            <img
                                                                className="w-5 h-5 object-contain cursor-pointer"
                                                                src={
                                                                    isDarkTheme || true
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
                                                                            // setCurrentCommentIndex(
                                                                            //     comment_index
                                                                            // );
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
                                                                                <p className="font-normal text-[#807a7a] text-base cursor-pointer">
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
                                                                                                comment_replies?.isLiked
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
                                                                                <div className="relative inline-block text-white">
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
                                    </InfiniteScroll>:<div className="flex flex-row justify-center items-center mt-3">
                                <p className="font-bold text-xl text-white">
                                    Comments are disabled
                                </p>
                            </div>:''}

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
                                    {info?.privacyOptions?.allowComments && <div className="py-3 border-t border-t-[#252525] cursor-pointer gap-2.5 w-[37%] px-6   bottom-0 fixed right-0 bg-[#121212]" style={{ zIndex: 99 }}>
                                         <div className="flex flex-row items-center">
                                            <div
                                                className={`bg-[#FFFFFF1F] flex flex-row items-center justify-between border-[0.063rem] border-transparent ${isUserLoggedIn()
                                                    ? 'focus-within:border-[#16182333]'
                                                    : ''
                                                    } rounded-lg cursor-text pr-2 pl-4 w-full`}
                                            >
                                                <form className='flex-1 relative' onSubmit={(e)=>{e.preventDefault();addCommentHandler();}}>

                                                <input
                                                    onFocus={() => {
                                                        setIsReplyToCommentClicked(false);
                                                        setCommentEmojiIndex(-1);
                                                    }}
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
                                                required
                                                />
                                                </form>
                                                {/* <EmojiInputPicker isPickerVisible={isPickerVisible} onEmojiSelect={onEmojiClick} inputRef={inputRef} /> */}
                                                {isUserLoggedIn() && (
                                                    <div className="flex flex-row items-center">
                                                        <span className='cursor-pointer' onClick={handleGiftClick}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 6.16667V21.3333M12 6.16667H7.875C7.26721 6.16667 6.68432 5.92084 6.25455 5.48324C5.82477 5.04566 5.58333 4.45217 5.58333 3.83333C5.58333 3.2145 5.82477 2.621 6.25455 2.18342C6.68432 1.74583 7.26721 1.5 7.875 1.5C11.0833 1.5 12 6.16667 12 6.16667ZM12 6.16667H16.125C16.7328 6.16667 17.3157 5.92084 17.7455 5.48324C18.1752 5.04566 18.4167 4.45217 18.4167 3.83333C18.4167 3.2145 18.1752 2.621 17.7455 2.18342C17.3157 1.74583 16.7328 1.5 16.125 1.5C12.9166 1.5 12 6.16667 12 6.16667ZM3.83333 12H20.1667V18.7667C20.1667 20.0734 20.1667 20.7269 19.9123 21.226C19.6887 21.665 19.3317 22.022 18.8927 22.2457C18.3936 22.5 17.7401 22.5 16.4333 22.5H7.56667C6.25987 22.5 5.60648 22.5 5.10736 22.2457C4.6683 22.022 4.31135 21.665 4.08765 21.226C3.83333 20.7269 3.83333 20.0734 3.83333 18.7667V12ZM3.36667 12H20.6333C21.2868 12 21.6134 12 21.863 11.8728C22.0826 11.7609 22.261 11.5826 22.3728 11.363C22.5 11.1135 22.5 10.7868 22.5 10.1333V8.03333C22.5 7.37994 22.5 7.05324 22.3728 6.80368C22.261 6.58416 22.0826 6.40568 21.863 6.29382C21.6134 6.16667 21.2868 6.16667 20.6333 6.16667H3.36667C2.71327 6.16667 2.38657 6.16667 2.13701 6.29382C1.91749 6.40568 1.73901 6.58416 1.62715 6.80368C1.5 7.05324 1.5 7.37994 1.5 8.03333V10.1333C1.5 10.7868 1.5 11.1135 1.62715 11.363C1.73901 11.5826 1.91749 11.7609 2.13701 11.8728C2.38657 12 2.71327 12 3.36667 12Z" stroke="#FF2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </span>
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
                                                        <div onClick={() => setCommentEmojiIndex(prev => prev === -2 ? -1 : -2)} className="rounded-lg cursor-pointer hover:bg-[#1618230f] p-[0.313rem] my-[0.438rem] mx-[0.188rem]">
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
                                                            } font-semibold text-base ml-2`}
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
                                        </div>
                                        

                                        <EmojiPicker className="mt-2" open={commentEmojiIndex === -2 ? true : false} theme={Theme.DARK} height={300} width="auto" onEmojiClick={onEmojiClick} />

                                        
                                {isMentioning && (
                                    <div
                                        ref={popupRef}
                                        className="absolute bottom-[4.39rem] left-10 bg-black border rounded-lg shadow-lg w-max z-10 max-h-80 overflow-y-auto "
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
                                                            src={user.avatar||defaultAvatar}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                                (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                                            }}
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
                                            <div className="px-4 py-2 text-white min-w-32 text-center">
                                               {isFetchingUsers? <CircularProgress style={{width:'20px',height:'20px',padding:'0px',marginBottom:'-4px'}}/>:'No users found'} 
                                            </div>
                                        )}
                                    </div>
                                )}
                                    </div>}
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
            <Forwardusers videoLink={info?.mediaId} onOpen={sendPopup} onClose={() => setSendPopup(false)} />
            <ToastContainer />

        </div>
        </ThemeProvider>
    );
}
