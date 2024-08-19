import { useParams } from 'react-router-dom';
import Layout from '../../shared/layout';
import { ChangeEvent, useState } from 'react';
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
import { COMMENTS } from '../../utils/constants';
import PopupForReport from '../profile/popups/PopupForReport';

const VideoPage = () => {
    // hooks
    const { videoId } = useParams();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [comment, setComment] = useState('');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isReportElipsisVisible, setIsReportElipsisVisible] = useState(false);
    const [toggleImage, setToggleImage] = useState(false);
    const [isEmptyHeart, setIsEmptyHeart] = useState(true);
    const [currentCommentIndex, setCurrentCommentIndex] = useState(-1);
    const [currentCommentReplyIndex, setCurrentCommentReplyIndex] = useState(-1);
    const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});
    const [commentsArray, setCommentsArray] = useState<any>([]);
    const [reportPopup, setReportPopup] = useState(false);

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

    const commentLikeToggler = (commentId: number) => {
        setLikedComments((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const addCommentHandler = () => {
        setComment('');
        const newComment = {
            id: commentsArray.length, // Assuming id is sequential
            commenter_avatar:
                'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/77a6196b8555a59958e6ca03c9bf2a6a~c5_100x100.jpeg?lk3s=a5d48078&nonce=86219&refresh_token=e85613d454ac21404be7f73c1e5ff0b8&x-expires=1724162400&x-signature=7uQ%2FXY5558aDIm1XIV%2Bpu2cGi90%3D&shp=a5d48078&shcp=81f88b70',
            commenter_name: 'Commenter Name',
            comment_data: comment, // Assuming the input value is the comment data
            comment_time: 'Just now', // Example value
            comment_likes: '0',
            comment_replies: [],
        };

        setCommentsArray((prevComments: any) => [...prevComments, newComment]);
    };

    const replyToCommentHandler = (commentId: number, replyData: string) => {
        const newReply = {
            comment_reply_id: Date.now(), // Unique ID for the reply
            comment_replier_name: 'Replier Name',
            comment_reply_data: replyData,
            comment_reply_time: 'Just now', // Example value
            comment_reply_likes: '0',
        };

        setCommentsArray((prevComments: any) =>
            prevComments.map((comment: any) =>
                comment.id === commentId
                    ? {
                          ...comment,
                          comment_replies: [...comment.comment_replies, newReply],
                      }
                    : comment
            )
        );
    };

    // functions related to comment replies
    const commentReplyLikeToggler = (replyId: number) => {
        setLikedReplies((prev) => ({
            ...prev,
            [replyId]: !prev[replyId],
        }));
    };

    const [visibleReplies, setVisibleReplies] = useState<any>({});

    const toggleRepliesVisibility = (commentId: number) => {
        setVisibleReplies((prev: any) => ({
            ...prev,
            [commentId]: !prev[commentId], // Toggles the visibility
        }));
    };

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
                        src={`https://d1qomu2i6h2trq.cloudfront.net/output/videos/${videoId}/reduced/${videoId}-reduced.mp4`}
                    />
                    <div className="p-3.5 bg-[#16182308] rounded-b-xl">
                        <div className="flex flex-row items-center gap-2">
                            {/* avatar */}
                            <img
                                className={`w-12 h-12 object-cover rounded-full cursor-pointer`}
                                src={
                                    'https://seezitt-new-videos-source-encoder-bucket-dev.s3.us-east-2.amazonaws.com/input/thumbnails/669ec9cfefe3e8cd42db3e35.png'
                                }
                                alt=""
                            />
                            <div className="flex flex-row items-center gap-12">
                                <div className="text-left">
                                    <p className="font-bold text-base text-black cursor-pointer hover:underline">
                                        zakirjain5
                                    </p>
                                    <p className="font-normal text-black text-sm cursor-pointer">
                                        🆉🅰ک🅸🆁 🆁🅰ج🅿🆄🆃
                                    </p>
                                </div>
                                <div className="rounded-sm h-full bg-[#ff3b5c] hover:bg-[#e93654] px-4 py-2 cursor-pointer">
                                    <p className="font-semibold text-sm text-white">Follow</p>
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
                            <h4 className="text-black text-sm font-normal">🆉🅰ک🅸🆁 🆁🅰ج🅿🆄🆃</h4>
                        </div>
                    </div>
                    {/* Add comment section */}
                    <div className="mt-6">
                        <p className="text-[#161823] font-bold text-[1.125rem] text-left">
                            6576 comments
                        </p>
                        <div className="flex flex-row items-start gap-3 mt-3">
                            {/* Commenter avatar */}
                            <img
                                className={`w-12 h-12 object-cover rounded-full`}
                                src={
                                    'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/21bafe37c07e329a26f2a40cd34c897b~c5_720x720.jpeg?lk3s=a5d48078&nonce=33422&refresh_token=cd4d8be7f5761e8aa2174dffea1125ad&x-expires=1724151600&x-signature=1L%2FhEFsCJ8ygi7vgIncr4O3rWcg%3D&shp=a5d48078&shcp=81f88b70'
                                }
                                alt=""
                            />
                            <div className="pb-6 border-b border-b-[#0000001f] cursor-pointer w-full flex flex-row items-center gap-2.5">
                                <div className="bg-[#1618230f] flex flex-row items-center justify-between border-[0.063rem] border-transparent focus-within:border-[#16182333] rounded-lg cursor-text pr-2 pl-4 w-full">
                                    <input
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
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
                    {commentsArray?.map((comment: any, comment_index: number) => (
                        <div key={comment?.id}>
                            <div
                                onMouseEnter={() => {
                                    setIsReportElipsisVisible(true);
                                    setCurrentCommentIndex(comment_index);
                                }}
                                onMouseLeave={() => {
                                    setIsReportElipsisVisible(false);
                                    setIsTooltipVisible(false);
                                }}
                                className="flex flex-row items-start gap-3 mt-4"
                            >
                                <img
                                    className={`w-12 h-12 object-cover rounded-full cursor-pointer`}
                                    src={comment?.commenter_avatar}
                                    alt="commenter-avatar"
                                />
                                <div className="flex flex-row items-start justify-between gap-12 w-full">
                                    <div className="text-left">
                                        <p className="font-semibold text-sm text-[#161823] cursor-pointer hover:underline">
                                            {comment?.commenter_name}
                                        </p>
                                        <p className="font-normal text-[#161823] text-base cursor-pointer">
                                            {comment?.comment_data}
                                        </p>
                                        <div className="flex flex-row items-center gap-4 mt-1">
                                            <p className="text-[#16182380] font-normal text-sm">
                                                {comment?.comment_time}
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
                                                    {comment?.comment_likes}
                                                </p>
                                            </div>
                                            <p
                                                onClick={() =>
                                                    replyToCommentHandler(
                                                        comment?.id,
                                                        'this is sample reply'
                                                    )
                                                }
                                                className="text-[#161823] font-normal text-[0.938rem] cursor-pointer"
                                            >
                                                Reply
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {isReportElipsisVisible &&
                                    comment_index === currentCommentIndex && (
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
                                    )}
                            </div>
                            {/* Comment Replies */}
                            <div className="pl-[3.25rem] mt-2">
                                {comment?.comment_replies?.map(
                                    (comment_replies: any, comment_reply_index: number) => (
                                        <div key={comment_replies?.comment_reply_id}>
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
                                                    <img
                                                        className={`w-6 h-w-6 object-cover rounded-full cursor-pointer`}
                                                        src={
                                                            'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/21bafe37c07e329a26f2a40cd34c897b~c5_720x720.jpeg?lk3s=a5d48078&nonce=33422&refresh_token=cd4d8be7f5761e8aa2174dffea1125ad&x-expires=1724151600&x-signature=1L%2FhEFsCJ8ygi7vgIncr4O3rWcg%3D&shp=a5d48078&shcp=81f88b70'
                                                        }
                                                        alt="comment-replied-avatar"
                                                    />
                                                    <div className="flex flex-row items-start justify-between gap-12 w-full">
                                                        <div className="text-left">
                                                            <p className="font-semibold text-sm text-[#161823] cursor-pointer hover:underline">
                                                                {
                                                                    comment_replies?.comment_replier_name
                                                                }
                                                            </p>
                                                            <p className="font-normal text-[#161823] text-base cursor-pointer">
                                                                {
                                                                    comment_replies?.comment_reply_data
                                                                }
                                                            </p>
                                                            <div className="flex flex-row items-center gap-4 mt-1">
                                                                <p className="text-[#16182380] font-normal text-sm">
                                                                    {
                                                                        comment_replies?.comment_reply_time
                                                                    }
                                                                </p>
                                                                <div
                                                                    onClick={() =>
                                                                        commentReplyLikeToggler(
                                                                            comment_replies?.comment_reply_id
                                                                        )
                                                                    }
                                                                    className="flex flex-row items-center gap-1.5"
                                                                >
                                                                    <img
                                                                        className={`w-4 h-4 object-contain cursor-pointer`}
                                                                        src={
                                                                            likedReplies[
                                                                                comment_replies
                                                                                    ?.comment_reply_id
                                                                            ]
                                                                                ? redHeartIcon
                                                                                : emptyHeartIcon
                                                                        }
                                                                        alt="like-icon"
                                                                    />
                                                                    <p className="text-[#161823] font-normal text-sm">
                                                                        {
                                                                            comment_replies?.comment_reply_likes
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <p
                                                                    onClick={() =>
                                                                        replyToCommentHandler(
                                                                            comment?.id,
                                                                            'this is sample reply'
                                                                        )
                                                                    }
                                                                    className="text-[#161823] font-normal text-[0.938rem] cursor-pointer"
                                                                >
                                                                    Reply
                                                                </p>
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
                                {comment?.comment_replies?.length > 0 && (
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
                                                        View {comment?.comment_replies?.length}{' '}
                                                        replies
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
                    <h3 className="font-semibold text-lg text-black mb-2.5 -mt-2">You May Like</h3>
                    <div className="flex flex-wrap justify-between gap-3">
                        <div className="w-[9.188rem]">
                            <div
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer relative col-span-1 h-[12.625rem] w-full"
                            >
                                <video
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'block' : 'hidden'
                                    }`}
                                    src={`https://d1qomu2i6h2trq.cloudfront.net/output/videos/${videoId}/reduced/${videoId}-reduced.mp4`}
                                    muted={isMuted}
                                    loop
                                    autoPlay={true}
                                    preload="auto"
                                    playsInline
                                />
                                <img
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'hidden' : 'block'
                                    }`}
                                    src={
                                        'https://seezitt-new-videos-source-encoder-bucket-dev.s3.us-east-2.amazonaws.com/input/thumbnails/669ec9cfefe3e8cd42db3e35.png'
                                    }
                                    alt=""
                                />
                                <div
                                    className={
                                        'absolute right-2 bottom-5 flex gap-2 bg-slate-800 p-1 rounded-sm'
                                    }
                                >
                                    <p className={'text-[0.688rem] font-normal text-white'}>
                                        {'0:07'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full">
                                <div className="flex relative">
                                    <p className={styles.forYouVideo}>
                                        pakistan zindabad#air force#100kviews #pakistan
                                        #videoforyoupage🔥🔥💯💯 #foryouuuuuuuuuuuuu #14 auhgest
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[9.188rem]">
                            <div
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer relative col-span-1 h-[12.625rem] w-full"
                            >
                                <video
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'block' : 'hidden'
                                    }`}
                                    src={`https://d1qomu2i6h2trq.cloudfront.net/output/videos/${videoId}/reduced/${videoId}-reduced.mp4`}
                                    muted={isMuted}
                                    loop
                                    autoPlay={true}
                                    preload="auto"
                                    playsInline
                                />
                                <img
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'hidden' : 'block'
                                    }`}
                                    src={
                                        'https://seezitt-new-videos-source-encoder-bucket-dev.s3.us-east-2.amazonaws.com/input/thumbnails/669ec9cfefe3e8cd42db3e35.png'
                                    }
                                    alt=""
                                />
                                <div
                                    className={
                                        'absolute right-2 bottom-5 flex gap-2 bg-slate-800 p-1 rounded-sm'
                                    }
                                >
                                    <p className={'text-[0.688rem] font-normal text-white'}>
                                        {'0:07'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full">
                                <div className="flex relative">
                                    <p className={styles.forYouVideo}>
                                        pakistan zindabad#air force#100kviews #pakistan
                                        #videoforyoupage🔥🔥💯💯 #foryouuuuuuuuuuuuu #14 auhgest
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[9.188rem]">
                            <div
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer relative col-span-1 h-[12.625rem] w-full"
                            >
                                <video
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'block' : 'hidden'
                                    }`}
                                    src={`https://d1qomu2i6h2trq.cloudfront.net/output/videos/${videoId}/reduced/${videoId}-reduced.mp4`}
                                    muted={isMuted}
                                    loop
                                    autoPlay={true}
                                    preload="auto"
                                    playsInline
                                />
                                <img
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'hidden' : 'block'
                                    }`}
                                    src={
                                        'https://seezitt-new-videos-source-encoder-bucket-dev.s3.us-east-2.amazonaws.com/input/thumbnails/669ec9cfefe3e8cd42db3e35.png'
                                    }
                                    alt=""
                                />
                                <div
                                    className={
                                        'absolute right-2 bottom-5 flex gap-2 bg-slate-800 p-1 rounded-sm'
                                    }
                                >
                                    <p className={'text-[0.688rem] font-normal text-white'}>
                                        {'0:07'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full">
                                <div className="flex relative">
                                    <p className={styles.forYouVideo}>
                                        pakistan zindabad#air force#100kviews #pakistan
                                        #videoforyoupage🔥🔥💯💯 #foryouuuuuuuuuuuuu #14 auhgest
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[9.188rem]">
                            <div
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer relative col-span-1 h-[12.625rem] w-full"
                            >
                                <video
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'block' : 'hidden'
                                    }`}
                                    src={`https://d1qomu2i6h2trq.cloudfront.net/output/videos/${videoId}/reduced/${videoId}-reduced.mp4`}
                                    muted={isMuted}
                                    loop
                                    autoPlay={true}
                                    preload="auto"
                                    playsInline
                                />
                                <img
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'hidden' : 'block'
                                    }`}
                                    src={
                                        'https://seezitt-new-videos-source-encoder-bucket-dev.s3.us-east-2.amazonaws.com/input/thumbnails/669ec9cfefe3e8cd42db3e35.png'
                                    }
                                    alt=""
                                />
                                <div
                                    className={
                                        'absolute right-2 bottom-5 flex gap-2 bg-slate-800 p-1 rounded-sm'
                                    }
                                >
                                    <p className={'text-[0.688rem] font-normal text-white'}>
                                        {'0:07'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full">
                                <div className="flex relative">
                                    <p className={styles.forYouVideo}>
                                        pakistan zindabad#air force#100kviews #pakistan
                                        #videoforyoupage🔥🔥💯💯 #foryouuuuuuuuuuuuu #14 auhgest
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[9.188rem]">
                            <div
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer relative col-span-1 h-[12.625rem] w-full"
                            >
                                <video
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'block' : 'hidden'
                                    }`}
                                    src={`https://d1qomu2i6h2trq.cloudfront.net/output/videos/${videoId}/reduced/${videoId}-reduced.mp4`}
                                    muted={isMuted}
                                    loop
                                    autoPlay={true}
                                    preload="auto"
                                    playsInline
                                />
                                <img
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'hidden' : 'block'
                                    }`}
                                    src={
                                        'https://seezitt-new-videos-source-encoder-bucket-dev.s3.us-east-2.amazonaws.com/input/thumbnails/669ec9cfefe3e8cd42db3e35.png'
                                    }
                                    alt=""
                                />
                                <div
                                    className={
                                        'absolute right-2 bottom-5 flex gap-2 bg-slate-800 p-1 rounded-sm'
                                    }
                                >
                                    <p className={'text-[0.688rem] font-normal text-white'}>
                                        {'0:07'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full">
                                <div className="flex relative">
                                    <p className={styles.forYouVideo}>
                                        pakistan zindabad#air force#100kviews #pakistan
                                        #videoforyoupage🔥🔥💯💯 #foryouuuuuuuuuuuuu #14 auhgest
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[9.188rem]">
                            <div
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer relative col-span-1 h-[12.625rem] w-full"
                            >
                                <video
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'block' : 'hidden'
                                    }`}
                                    src={`https://d1qomu2i6h2trq.cloudfront.net/output/videos/${videoId}/reduced/${videoId}-reduced.mp4`}
                                    muted={isMuted}
                                    loop
                                    autoPlay={true}
                                    preload="auto"
                                    playsInline
                                />
                                <img
                                    className={`w-full h-full object-cover rounded-lg ${
                                        hoveredIndex === 0 ? 'hidden' : 'block'
                                    }`}
                                    src={
                                        'https://seezitt-new-videos-source-encoder-bucket-dev.s3.us-east-2.amazonaws.com/input/thumbnails/669ec9cfefe3e8cd42db3e35.png'
                                    }
                                    alt=""
                                />
                                <div
                                    className={
                                        'absolute right-2 bottom-5 flex gap-2 bg-slate-800 p-1 rounded-sm'
                                    }
                                >
                                    <p className={'text-[0.688rem] font-normal text-white'}>
                                        {'0:07'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full">
                                <div className="flex relative">
                                    <p className={styles.forYouVideo}>
                                        pakistan zindabad#air force#100kviews #pakistan
                                        #videoforyoupage🔥🔥💯💯 #foryouuuuuuuuuuuuu #14 auhgest
                                    </p>
                                </div>
                            </div>
                        </div>
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
        </Layout>
    );
};

export default VideoPage;
