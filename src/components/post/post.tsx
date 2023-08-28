import classNames from 'classnames';
import styles from './post.module.scss';
import { useRef, useState, useEffect } from 'react';
import { ReasonReportPopup } from '../reason-report-popup/reason-report-popup';
import { useAuthStore } from '../../store/authStore';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import { Box, Modal, Typography, } from '@mui/material';
import confirmationIcon from '../../assets/confirmationIcon.png';
import VideoPlayer from '../reusables/VideoPlayer';
import profileIcon from '../../assets/profileIcon.png';
import { useInView } from 'react-intersection-observer';
import { BookmarkItem, PostProps } from './postTypes';
import { PopupModal } from '../reusables/popupModal';
import InputField from '../reusables/InputField';

import { Send } from './svg-components/Send';
import { fetchInJSON } from '../reusables/fetchInJSON';
import { Bookmark } from './svg-components/Bookmark';
import { Comment } from './svg-components/Comment';
import { Like } from './svg-components/Like';
import { CommentLike } from './svg-components/CommentLike';
import { Save } from './svg-components/Save';
import { Copy } from './svg-components/Copy';
import { NotInterested } from './svg-components/NotInterested';
import { Report } from './svg-components/Report';
import { Share } from './svg-components/Share';
import { More } from './svg-components/More';
import { ArrowDown } from './svg-components/ArrowDown';

export const Post: React.FC<PostProps> = ({ className, post, startedIds, endedIds, refetch }) => {
    const buttonRef = useRef(null);
    const videoRef = useRef<any>(null); // Use `any` type to avoid TypeScript errors
    let avatarUrl = ''
    const [videoElement, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1, // Adjust the threshold as needed
    });

    useEffect(() => {
        if (inView) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }, [inView]);

    const [followLoading, setFollowLoading] = useState(false);
    const [bookmarksData, setBookmarksData] = useState<BookmarkItem[]>([]);
    const token = useAuthStore((state) => state.token);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        handleFetchUserBookmarks();
    }, [bookmarksData]);

    const [openConfirmation, setOpenConfirmation] = useState(false);
    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
        setShowReportPopup(false);
    };
    const handleCloseConfirmation = () => setOpenConfirmation(false);

    const [openSharePopup, setOpenSharePopup] = useState(false);
    const handleOpenSharePopup = () => {
        setOpenSharePopup(true);
    };
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [, setShowOverlay] = useState(false);
    const [openCommentPopup, setOpenCommentPopup] = useState(false);
    const handleOpenCommentPopup = () => {
        setOpenCommentPopup(true);
    };

    const handleCloseSharePopup = () => setOpenSharePopup(false);
    const handleCloseCommentPopup = () => setOpenCommentPopup(false);

    const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [showReplies, setShowReplies] = useState(post.comments.map(() => ({ list: false })));

    const handleOpenListReplies = (index: any) => {
        const updatedShowReplies = [...showReplies]; // Create a copy of the array
        updatedShowReplies[index].list = !updatedShowReplies[index].list; // Toggle the list property
        setShowReplies(updatedShowReplies); // Update the state with the new array
    };

    const [replyMessage, setReplyMessage] = useState(post.comments.map(() => ({ reply: '' })));
    const [replyInputs, setReplyInputs] = useState(
        post.comments.map(() => ({ open: false, replyInputValue: '' }))
    );

    const handleOpenReplyInput = (index: any) => {
        const updatedInputs = replyInputs.map((input, i) => ({
            ...input,
            open: i === index ? !input.open : false,
        }));
        setReplyInputs(updatedInputs);
    };

    const [message, setMessage] = useState('');
    const handleCommenting = async (commentMessage: string, id: string) => {
        await fetchInJSON(
            `/media-content/comment/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment: commentMessage }),
            },
            (response) => {
                console.log(response);
                setMessage('');
                // Increase the index of comments by two to add the new comment
                const updatedInputs = [...replyInputs];
                updatedInputs.push({ open: false, replyInputValue: '' });
                updatedInputs.push({ open: false, replyInputValue: '' });
                setReplyInputs(updatedInputs);
                refetch();
            }
        );
    };

    const handleReply = async (commentMessage: string, id: string, commentId: string, index: number) => {
        await fetchInJSON(
            `/media-content/comment/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment: commentMessage, commentId: commentId }),
            },
            (response) => {
                console.log(response);
                // Increase the index of comments by two to add the new comment
                const updatedInputs = [...replyInputs];
                updatedInputs.push({ open: false, replyInputValue: '' });
                updatedInputs.push({ open: false, replyInputValue: '' });
                setReplyInputs(updatedInputs);

                //clear the message field:
                const updatedMessage = [...replyMessage];
                updatedMessage[index].reply = ''
                setReplyMessage(updatedMessage);
                refetch();
            }
        );
    };

    const handleLikePost = async () => {
        await fetchInJSON(
            `/media-content/like/${post.mediaId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            () => refetch()
        );
    };

    const handleBookmarking = async () => {
        await fetchInJSON(
            `/media-content/collections/${post.mediaId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            handleFetchUserBookmarks
        );
    };

    const handleFetchUserBookmarks = async () => {
        await fetchInJSON(
            `/profile/collection`,
            {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            },
            (res) => {
                setBookmarksData((res as any).data.data as BookmarkItem[]);
            }
        );
    };

    const handleStartWatching = async (mediaId: string): Promise<void> => {
        if (startedIds.current.has(mediaId)) return;

        await fetchInJSON(
            `/media-content/mark-as-started-watching/${mediaId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            () => startedIds.current.add(mediaId)
        );
    };

    const handleEndWatching = async (mediaId: string) => {
        if (endedIds.current.has(mediaId)) return;

        await fetchInJSON(
            `/media-content/mark-as-watched-till-end/${mediaId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            () => endedIds.current.add(mediaId)
        );
    };

    const handleFollowClick = async (userId: any) => {
        setFollowLoading(true); // Set loading state before API call

        await fetchInJSON(
            `/profile/follow/${userId}/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            () => refetch()
        );

        setFollowLoading(false); // Set loading state back to false after API call
    };

    const handleFetchProfileInfo = async () => {
        try {
            const response = await fetchInJSON(`/follow`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                const { avatar } = responseData.data; // Extract token value from data object
                avatarUrl = avatar;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleFetchProfileInfo();
    }, [openCommentPopup]);

    function handleReportClick() {
        handleClose();
        setShowReportPopup(true); // Show the report popup
        setShowOverlay(true); // Show the overlay
        console.log('report clicked');
    }

    function handleCloseReportPopup() {
        setShowReportPopup(false);
        setShowOverlay(false);
    }

    return (
        <div className={classNames(styles.root, className)}>
            <div style={{ marginBottom: '32px' }}>
                {showReportPopup && (
                    <div className={styles.overlay}>
                        <div className={styles.reportPopup}>
                            {/* /** //useState to track the clicked post's media ID */}
                            <ReasonReportPopup
                                mediaId={post.mediaId}
                                onSubmit={() => setShowReportPopup(false)} // Pass the onClose function
                                handleOpen={handleOpenConfirmation}
                                handleClose={handleCloseConfirmation}
                            />
                        </div>
                        <button
                            onClick={() => handleCloseReportPopup()}
                            style={{ position: 'relative', }}>
                            Close
                        </button>
                    </div>
                )}
                {openConfirmation && (
                    <div>
                        <Modal
                            open={openConfirmation}
                            onClose={handleCloseConfirmation}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        lineHeight: '120%',
                                        paddingBottom: '32px',
                                    }}
                                >
                                    Report submitted
                                </Typography>
                                <img
                                    src={confirmationIcon}
                                    alt=""
                                    style={{
                                        width: '164px',
                                        height: '164px',
                                        marginBottom: '34px',
                                    }}
                                />
                                <div className={styles.thankyouDiv}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontSize: '18px',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            lineHeight: '120%',
                                            marginBottom: '18px',
                                            padding: '0',
                                        }}
                                    >
                                        Thank you
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Your report helps us provide a safe and supportive
                                        environment.
                                    </Typography>
                                </div>
                                <Button
                                    onClick={handleCloseConfirmation}
                                    variant="contained"
                                    sx={{
                                        background: '#5448B2',
                                        width: '369px',
                                        height: ' 58px',
                                        padding: '16px 16px',
                                        marginBottom: '24px ',
                                    }}
                                >
                                    Done
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        border: '1px solid var(--foundation-primary-primary-500, #5448B2)',
                                        width: '369px',
                                        height: ' 58px',
                                        padding: '16px 16px',
                                    }}
                                >
                                    View your reports
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                )}
                {/** Share Modal */}
                {openSharePopup && (
                    <PopupModal open={openSharePopup} onClose={handleCloseSharePopup} />
                )}
                {openCommentPopup && (
                    <div>
                        <Modal
                            open={openCommentPopup}
                            onClose={handleCloseCommentPopup}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={styleComment}>
                                <div
                                    // className={styles.mediaContainer}
                                    className={styles.postMediaContainer}
                                    key={post.mediaId}
                                >
                                    <VideoPlayer
                                        // key={post.mediaId}
                                        src={post.reducedVideoHlsUrl}
                                        onStart={() => handleStartWatching(post.mediaId)}
                                        onEnd={() => handleEndWatching(post.mediaId)}
                                    />
                                </div>

                                <div className={styles.userCommentDiv}>
                                    <div style={{ width: '100%' }}>
                                        <div className={styles.commentsHeaderDiv}>Comments</div>
                                        {post.comments.map((comment, index) => (
                                            <>
                                                <div
                                                    // key={comment.id}
                                                    className={styles.userInfoCommentDiv}
                                                >
                                                    <div className={styles.userInfoCommentFrame}>
                                                        <img
                                                            src={comment.user.avatar || profileIcon}
                                                            alt={comment.user.name}
                                                            className={styles.avatarImgCircleComment}
                                                        />
                                                        <h4 className={styles.userNameTextComment}>
                                                            {comment.user.name}
                                                        </h4>
                                                    </div>

                                                    <div className={styles.userCommmentLikesDiv}>
                                                        {comment.isLiked ? <CommentLike liked={true} /> : <CommentLike />}
                                                        {comment.likes}
                                                    </div>
                                                </div>
                                                <div key={comment.id} className={styles.commentDiv}>
                                                    {comment.comment}
                                                    <Button
                                                        sx={{
                                                            textDecoration: 'none',
                                                            textTransform: 'none',
                                                            color: '#848484',
                                                            alignSelf: 'start',
                                                            padding: '8px 0px 0px 0px',
                                                            minWidth: '0',
                                                        }}
                                                        onClick={() => handleOpenReplyInput(index)}
                                                    >
                                                        Reply
                                                    </Button>
                                                    {replyInputs[index]?.open && (
                                                        <div
                                                            style={{
                                                                paddingTop: '10px',
                                                                paddingBottom: '10px',
                                                            }}
                                                        >
                                                            <form
                                                                onSubmit={(e) => {
                                                                    e.preventDefault(); // Prevent the default form submission behavior
                                                                    handleReply(
                                                                        replyMessage[index].reply,
                                                                        post.mediaId,
                                                                        comment.id,
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                <InputField
                                                                    placeholder="Message..."
                                                                    type={''}
                                                                    value={replyMessage[index]?.reply}
                                                                    onChange={(e: any) => {
                                                                        const updatedReplyMessage = [
                                                                            ...replyMessage,
                                                                        ];
                                                                        updatedReplyMessage[
                                                                            index
                                                                        ].reply = e.target.value;
                                                                        setReplyMessage(
                                                                            updatedReplyMessage
                                                                        );
                                                                    }}
                                                                />
                                                            </form>
                                                        </div>
                                                    )}
                                                    {comment.replies.length !== 0 ? (
                                                        <div className={styles.commentRepliesDiv}>
                                                            <div>
                                                                <Button
                                                                    sx={{
                                                                        textDecoration: 'none',
                                                                        textTransform: 'none',
                                                                        color: '#848484',
                                                                        alignSelf: 'start',
                                                                        padding: '8px 0px 0px 0px',
                                                                        margin: '0px 0px 15px 0px',
                                                                        minWidth: '0',
                                                                    }}
                                                                    onClick={(e) => {
                                                                        e.preventDefault;
                                                                        handleOpenListReplies(index);
                                                                    }}
                                                                >
                                                                    <div style={{ marginRight: '5px' }}>
                                                                        {`View replies (${comment.replies.length})`}
                                                                    </div>
                                                                    <ArrowDown />
                                                                </Button>
                                                            </div>
                                                            {showReplies[index]?.list &&
                                                                comment.replies.map((reply, index) => (
                                                                    <div
                                                                        className={styles.repliesDropdown}
                                                                    >
                                                                        <div
                                                                            key={reply.id}
                                                                            className={styles.userInfoCommentDiv}
                                                                        >
                                                                            <div
                                                                                className={styles.userInfoCommentFrame}
                                                                            >
                                                                                <img
                                                                                    src={reply.user.avatar || profileIcon}
                                                                                    alt={reply.user.name}
                                                                                    className={styles.avatarImgCircleComment}
                                                                                />
                                                                                <h4
                                                                                    className={styles.userNameTextComment}
                                                                                >
                                                                                    {reply.user.name}
                                                                                </h4>
                                                                            </div>

                                                                            <div
                                                                                className={styles.userCommmentLikesDiv}
                                                                            >
                                                                                <CommentLike />
                                                                                {reply.likes}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            key={comment.id}
                                                                            className={styles.commentDiv}
                                                                        >
                                                                            {reply.reply}
                                                                        </div>
                                                                    </div>))}
                                                        </div>) : ('')}
                                                </div>
                                            </>))}
                                    </div>
                                    <div
                                        style={{
                                            width: '100%',
                                            padding: '0 16px 16px 16px',
                                            marginTop: '16px',
                                        }}
                                    >
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault(); // Prevent the default form submission behavior
                                                handleCommenting(message, post.mediaId);
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
                                                <img
                                                    src={avatarUrl || profileIcon}
                                                    alt={''}
                                                    className={styles.avatarImgCircleComment}
                                                />
                                                <InputField
                                                    placeholder="Add comment..."
                                                    type={''}
                                                    value={message}
                                                    onChange={(e: any) => setMessage(e.target.value)}
                                                    showcommentsIcons={true}
                                                    iconClick={(e: any) => {
                                                        e.preventDefault(); // Prevent the default form submission behavior
                                                        handleCommenting(message, post.mediaId);
                                                    }}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                )}
                <div className={styles.container}>
                    <div className={styles.postContainer}>
                        {/* <h4>{post.mediaId}</h4> */}
                        <div className={styles.postCaptionContainer}>
                            <div className={styles.postCreator}>
                                <div className={styles['profilePic-UserNameDiv']}>
                                    <div>
                                        <img
                                            src={post.user.avatar || 'https://via.placeholder.com/128'}
                                            alt=""
                                            className={styles.profilePicImg}
                                        />
                                    </div>
                                    <div className={styles.userDetailsDiv}>
                                        <h4 className={styles.userNameText}>{post.user.name}</h4>
                                        <h4 className={styles.userSubText}>{post.user.username}</h4>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        ref={buttonRef}
                                        className={post.user.isFollowed ? styles.followingBtn : styles.followBtn}
                                        onClick={() => handleFollowClick(post.user._id)}
                                    >
                                        {followLoading ? '...' : post.user.isFollowed ? 'Following' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                            <div className={styles.postText}>
                                <h4 className={styles.captionText}>{post.description}</h4>
                            </div>
                        </div>
                        <div className={styles.postMediaContainer} ref={videoElement}>
                            <VideoPlayer
                                key={post.mediaId}
                                src={post.reducedVideoHlsUrl}
                                onStart={() => handleStartWatching(post.mediaId)}
                                onEnd={() => handleEndWatching(post.mediaId)}
                            />
                        </div>
                    </div>
                    <div className={styles.postInteractionContainer}>
                        <div className={styles.interactionDiv}>
                            <Button
                                className={styles.interactionDiv}
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    minWidth: 0,
                                }}
                                onClick={handleLikePost}
                            >
                                {post.isLiked
                                    ? <Like liked={true} /> : <Like />
                                }

                                <h4 className={styles.interactionText}>{post.likes}</h4>
                            </Button>
                        </div>
                        <div className={styles.interactionDiv}>
                            <Button
                                className={styles.interactionDiv}
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    minWidth: 0,
                                }}
                                onClick={() => handleOpenCommentPopup()}
                            >
                                <Comment />
                                <h4 className={styles.interactionText}>{post.comments.length}</h4>
                            </Button>
                        </div>
                        <div className={styles.interactionDiv}>
                            <Button
                                className={styles.interactionDiv}
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    minWidth: 0,
                                }}
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleBookmarking}
                            >
                                {bookmarksData.find((item) => item.mediaId === post.mediaId) ? (
                                    <>
                                        <Bookmark bookmarked={true} />
                                        <h4 className={styles.interactionText}></h4>
                                    </>
                                ) : (
                                    <>
                                        <Bookmark />
                                        <h4 className={styles.interactionText}></h4>
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className={styles.interactionDiv}>
                            <Button
                                className={styles.interactionDiv}
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    minWidth: 0,
                                }}
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={() => handleOpenSharePopup()}
                            >
                                <Share />
                                <h4 className={styles.interactionText}>{post.shares}</h4>
                            </Button>
                        </div>
                        <div className={styles.interactionDiv}>
                            <Button
                                className={styles.interactionDiv}
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    minWidth: 0,
                                }}
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(event) => handleClickMore(event)}
                            >
                                <More />
                                <h4 className={styles.interactionText}>More</h4>
                            </Button>
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} className={styles.menuItems}>
                                    <div className={styles.menuItemsSvgs}>
                                        <Save />
                                    </div>
                                    Save Video
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={styles.menuItems}>
                                    <div className={styles.menuItemsSvgs}>
                                        <Copy />
                                    </div>
                                    Copy Link
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={styles.menuItems}>
                                    <div className={styles.menuItemsSvgs}>
                                        <NotInterested />
                                    </div>
                                    Not Interested
                                </MenuItem>
                                <MenuItem onClick={handleReportClick} className={styles.menuItems}>
                                    <div className={styles.menuItemsSvgs}>
                                        <Report />
                                    </div>
                                    Report
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={styles.menuItems}>
                                    <div className={styles.menuItemsSvgs}>
                                        <Send />
                                    </div>
                                    Send
                                </MenuItem>
                            </StyledMenu>

                            {/* ----------------------------------------- More Menue ----------------------------------------------------------------*/}
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

var StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 290,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '16px 24px',
        },
        '& .MuiMenuItem-root': {
            padding: '18.5px 0px',
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

var style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 588,
    height: 'auto',
    minHeight: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    p: '32px',
    display: 'inline-flex',
    padding: '32px',
    flexDirection: 'column',
    alignItems: 'center',
};

var styleComment = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1141px',
    height: '815px',
    minHeight: '815px',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'center',
};
