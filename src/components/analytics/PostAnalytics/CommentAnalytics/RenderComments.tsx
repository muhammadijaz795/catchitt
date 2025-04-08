import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { API_KEY, showToastSuccess } from '../../../../utils/constants';
import { CircularProgress } from '@mui/material';
import moment from 'moment';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { isUserLoggedIn } from '../../../../utils/common';
import { openLoginPopup } from '../../../../redux/reducers';
import { cross, defaultAvatar, emoji, heartOutline } from '../../../../icons';
import atTheRateOf from '../../../profile/svg-components/at-the-rate-of.svg';
import atTheRateOfWhite from '../../../profile/svg-components/at-the-rate-of-white.svg';
import commentEmoji from '../../../profile/svg-components/comment-emoji.svg';
import redHeartIcon from '../../../profile/svg-components/red-heart-icon.svg';
import reportFlagIcon from '../../../profile/svg-components/report-flag-icon.svg';
import chevronDownLightIcon from '../../../profile/svg-components/chevron-down-light-icon.svg';
import chevronTopLightIcon from '../../../profile/svg-components/chevron-top-light-icon.svg';
import crossLightIcon from '../../../profile/svg-components/cross-light-icon.svg';
import emptyHeartLightIcon from '../../../profile/svg-components/empty-heart-light-icon.svg';
import horizontalElipsisMenuWhiteIcon from '../../../profile/svg-components/horizontal-elipsis-icon-white.svg';
import horizontalElipsisMenuIcon from '../../../profile/svg-components/horizontal-elipsis-icon.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PopupForReport from '../../../profile/popups/PopupForReport';

function RenderComments({ postId, isDarkTheme }: any) {

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
    const [reportPopup, setReportPopup] = useState<boolean>(false);
    const [toggleImage, setToggleImage] = useState(false);
    // hooks for comment replies
    const [isCommentReplyTooltipVisible, setCommentReplyIsTooltipVisible] = useState(false);
    const [isCommentReplyReportElipsisVisible, setCommentReplyIsReportElipsisVisible] =
        useState(false);
    const [toggleCommentReplyImage, setToggleCommentReplyImage] = useState(false);
    const [visibleReplies, setVisibleReplies] = useState<any>({});
    const [currentCommentReplyIndex, setCurrentCommentReplyIndex] = useState(-1);
    const [commentEmojiIndex, setCommentEmojiIndex] = useState(-1);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const paginateComments = async (fromStart = false) => {
        setIsCommentsLoading(true);
        try {
            const response = await fetch(
                `${API_KEY}/media-content${token ? '' : '/public'}/videos/${postId}/comments?page=${fromStart ? 1 : videoComments.currentPage}&pageSize=${videoComments.pageSize}`,
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

    const loginPopup = () => {
        dispatch(openLoginPopup());
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
                fetchMediaById(postId);
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
                    `${API_KEY}/media-content/comment/${postId}`,
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
                fetchMediaById(postId);
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
            fetchMediaById(postId);
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

    const onReplyEmojiClick = (emojiObject: any) => {
        setCommentReply((prevText) => prevText + emojiObject.emoji); // Append emoji to input text
    };

    useEffect(() => {
        if (!postId) return;
        fetchMediaById(postId);
        paginateComments(true);
    }, [])


    return (
        <>
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
                className="mb-20 px-4"
                // scrollThreshold={0.6}
                scrollableTarget="analyticsComments"
                endMessage={
                    <div className="flex flex-row justify-center items-center mt-3">
                        <p className="font-normal text-sm">
                            {videoComments?.totalItems === 0 && 'No comment till yet.'}
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
                                    <p className="text-lg font-medium">
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
                                        className="font-semibold text-sm cursor-pointer hover:underline"
                                    >
                                        {comment?.user?.name}
                                    </p>
                                    <div className="flex flex-row justify-between items-center">
                                        <div>
                                            <p className="font-normal text-[#807a7a] text-base cursor-pointer w-[350px] " style={{ overflowWrap: "break-word" }}>
                                                {comment?.comment}
                                            </p>
                                            <div className="flex flex-row items-center gap-2 mt-1">
                                                <p className="text-gray-500 font-normal whitespace-nowrap	 text-sm">
                                                    {moment(
                                                        comment?.createdTime
                                                    ).format('D-MM')}
                                                </p>
                                                <p
                                                    onClick={() => { setCurrentCommentIndex(comment_index); setIsReplyToCommentClicked(true) }}
                                                    className="text-gray-500 font-normal text-[0.938rem] cursor-pointer"
                                                >
                                                    Reply
                                                </p>
                                                {comment_index === currentCommentIndex &&
                                                    isReplyToCommentClicked && (
                                                        <div className="cursor-pointer flex w-full flex-row items-center gap-2.5 mt-2">
                                                            <div className={`${isDarkTheme?'border-[0.063rem]':'bg-gray-50'} flex flex-row items-center justify-between rounded-lg cursor-text pr-2 pl-4 w-full mr-1`}>
                                                                <form onSubmit={(e) => { e.preventDefault(); replyToCommentHandler(comment?.id); }}>
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
                                                                        className={`p-2 bg-transparent rounded ${isDarkTheme?'placeholder-[#ffffff73]':'placeholder-slate-600'}  w-full`}
                                                                        required
                                                                    />
                                                                </form>

                                                                <div className="flex flex-row items-center">
                                                                    <div
                                                                        onClick={
                                                                            atRateHandler
                                                                        }
                                                                        className="rounded-lg cursor-pointer hover:bg-[#1618230f] my-[0.438rem] mx-[0.188rem] mr-1"
                                                                    >
                                                                        <img
                                                                            className={`w-5 h-5 object-contain rounded-full`}
                                                                            src={isDarkTheme ? atTheRateOfWhite : atTheRateOf}
                                                                            alt="at-the-rate-icon"
                                                                        />
                                                                    </div>
                                                                    <div onClick={() => setCommentEmojiIndex(comment_index)} className="rounded-lg cursor-pointer hover:bg-[#1618230f] my-[0.438rem] mx-[0.188rem]">
                                                                        <img
                                                                            className={`w-5 h-5 object-contain rounded-full`}
                                                                            src={isDarkTheme ? emoji : commentEmoji}
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
                                                                <span
                                                                    className={`${commentReply?.length >
                                                                        0
                                                                        ? 'text-[#fe2c55] cursor-pointer'
                                                                        : 'text-gray-600 cursor-not-allowed'
                                                                        } font-semibold text-base`}
                                                                >
                                                                    Post
                                                                </span>
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
                                                                    src={isDarkTheme ? crossLightIcon : cross}
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
                                                        : heartOutline
                                                }
                                                alt=""
                                            />
                                            <p className="text-gray-500 font-normal text-sm">
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
                                                        <p className="text-lg font-medium">
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
                                                            className="font-semibold text-sm hover:underline cursor-pointer"
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
                                                            <p className="text-gray-500 font-normal text-sm">
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
                                                                            : heartOutline
                                                                    }
                                                                    alt="like-icon"
                                                                />
                                                                <p className="text-gray-500 font-normal text-sm">
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
                                                <p className="text-gray-500 font-medium text-sm">
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
            {reportPopup && (
                <PopupForReport
                    openReport={reportPopup}
                    onReportClose={() => setReportPopup(false)}
                    info={{}}
                />
            )}
        </>
    )
}

export default RenderComments