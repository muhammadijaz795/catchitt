import classNames from 'classnames';
import styles from './post.module.scss';
import { useRef, useState, useEffect, memo, useCallback } from 'react';
import { ReasonReportPopup } from '../reason-report-popup/reason-report-popup';
import { useAuthStore } from '../../store/authStore';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import { Box, Modal, Typography } from '@mui/material';
import confirmationIcon from '../../assets/confirmationIcon.png';
import VideoPlayer from '../reusables/VideoPlayer';
import profileIcon from '../../assets/defaultProfileIcon.png';
import { useInView } from 'react-intersection-observer';
import { PostProps, Post as PostType } from './postTypes';
// import { PopupModal } from '../reusables/popupModal';
import InputField from '../reusables/InputField';
// import { differenceInHours, differenceInDays, differenceInWeeks, format } from 'date-fns';
import { Comment } from './comment';
import useDebounce from '../reusables/useDebounce'

import { Send } from './svg-components/Send';
import { fetchInJSON } from '../reusables/fetchInJSON';
import { Bookmark } from './svg-components/Bookmark';
import { CommentIcon } from './svg-components/Comment';
import { Like } from './svg-components/Like';
import { Save } from './svg-components/Save';
import { Copy } from './svg-components/Copy';
import { NotInterested } from './svg-components/NotInterested';
import { Report } from './svg-components/Report';
import { Share } from './svg-components/Share';
import { More } from './svg-components/More';
// import { getCache, replaceCache } from '../../store/cachedBookmarks';
import { useNavigate } from 'react-router-dom';

export const Post: React.FC<PostProps> = memo(({ className, post, startedIds, endedIds, isBookmarked, profileAvatar }) => {
    // console.log('is bookmarked?', isBookmarked);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate()
    const [videoElement, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1, // Adjust the threshold as needed
    });

    // const [toggleBookmark, setToggleBookmark] = useState(Array.from(getCache()).find((item) => item === post.mediaId
    // ) ? true : false)
    const token = useAuthStore((state) => state.token);

    const [postData, setPostData] = useState(post)
    const [followLoading, setFollowLoading] = useState(false);

    const [openConfirmation, setOpenConfirmation] = useState(false);
    // const [openSharePopup, setOpenSharePopup] = useState(false);
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [, setShowOverlay] = useState(false);
    const [openCommentPopup, setOpenCommentPopup] = useState(false);
    const [message, setMessage] = useState('');
    // const [profileData, setProfileData] = useState<any>([])
    const handleOpenCommentPopup = () => {
        setOpenCommentPopup(true);
    };
    let myprofileAvatar = ''

    const [anchors, setAnchors] = useState<{ more: null, share: null }>({ more: null, share: null });
    const buttonRef = useRef(null);
    const videoRef = useRef<any>(null); // Use `any` type to avoid TypeScript errors
    const [bookMarkStatus, setBookMarkStatus] = useState(isBookmarked);
    const openMore = Boolean(anchors.more);
    const openShare = Boolean(anchors.share);

    useEffect(() => {
        try {
            if (inView) {
                videoRef.current?.play();
            } else {
                videoRef.current?.pause();
            }
        } catch (error) {
            // This will always error out at first as part of Chrome's security
            // the user has to interact with the page for a while first before
            // video autoplay can work	
        }
    }, [inView]);

    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
        setShowReportPopup(false);
    };

    const handleShareClose = () => {
        setAnchors(prev => ({ ...prev, share: null }));
    };

    const handleClose = () => {
        setAnchors(prev => ({ ...prev, more: null }));
    };

    const handleCloseConfirmation = () => setOpenConfirmation(false);
    const handleOpenSharePopup = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchors(prev => ({ ...prev, share: event.currentTarget as unknown as null }));
        navigator.clipboard.writeText(`${location.host}/view/video/${post.mediaId}`)
        setTimeout(() => {
            handleShareClose()
        }, 2000)
    };
    // const handleCloseSharePopup = () => setOpenSharePopup(false);
    const handleCloseCommentPopup = () => { setOpenCommentPopup(false) };

    const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchors(prev => ({ ...prev, more: event.currentTarget as unknown as null }));
    };

    const handleLikeComment = async (id: string,) => {
        await fetchInJSON(
            `/media-content/like/comment/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            async () => {
                await handleFetchCurrentPost(post.mediaId)
            }
        );
    };
    const dHandleLikeComment = useDebounce(handleLikeComment, 5)

    const handleCommenting = async (commentMessage: string, id: string,) => {
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
            async () => {
                await handleFetchCurrentPost(id)
                setMessage('');
            }
        );
    };
    const dHandleCommenting = useDebounce(handleCommenting, 5)

    const handleFetchCurrentPost = async (myMediaId: string) => {
        await fetchInJSON(
            `/media-content/videos/${myMediaId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            (res: any) => {
                setMessage('')
                setPostData((res.data) as PostType)
            }
        )
    }

    const handleReply = async (commentMessage: string, commentId: string) => {
        await fetchInJSON(
            `/media-content/comment/${postData.mediaId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment: commentMessage, commentId: commentId }),
            },
            async () => handleFetchCurrentPost(post.mediaId)
        );
    };
    const dHandleReply = useDebounce(handleReply, 5)

    const handleLikePost = async (post: PostProps["post"]) => {
        await fetchInJSON(
            `/media-content/like/${post.mediaId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            () => handleFetchCurrentPost(post.mediaId)
        );
    };
    const dHandleLikePost = useDebounce(handleLikePost, 3)

    const handleBookmarking = async () => {
        const response = await fetchInJSON(
            `/media-content/collections/${post.mediaId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            () => {
                setBookMarkStatus(prev => !prev)
            }
            // if (isLoggedIn) {
            //     let oldCache = getCache()
            //     if (oldCache.has(post.mediaId)) {
            //         oldCache.delete(post.mediaId)
            //     } else {
            //         oldCache.add(post.mediaId)
            //     }
            //     replaceCache(Array.from(oldCache))
            //     setToggleBookmark(() => oldCache.has(post.mediaId) ? true : false)
            // }  
        );
        console.log(response);
    };
    const dHandleBookmarking = useDebounce(handleBookmarking, 3)

    const handleStartWatching = async (mediaId: string): Promise<void> => {
        if (!isLoggedIn) { return }
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
        if (!isLoggedIn) { return }
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

    // const [followBtnStyle, setFollowBtnStyle] = useState(post.user.map((user) => ({ list: false })));

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
            () => handleFetchCurrentPost(post.mediaId)
        );
        setFollowLoading(false); // Set loading state back to false after API call
    };


    // const handleFetchProfileInfo = useCallback(async () => {
    //     if (!isLoggedIn) { return }
    //     try {
    //         const response = await fetchInJSON(`/profile`, {
    //             method: 'GET',
    //             headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
    //         });

    //         if (response.ok) {
    //             const responseData = await response.json();
    //             myprofileAvatar = responseData.avatar;
    //             setProfileData(responseData.data)
    //         } else {
    //             console.log('fetched profile data: ');
    //             console.log(response);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [])

    useEffect(() => {
        console.log(profileAvatar);
    }, []);

    // useEffect(() => {
    //     console.log(profileAvatar);
    // }, [openCommentPopup]);

    function handleReportClick() {
        handleClose();
        setShowReportPopup(true); // Show the report popup
        setShowOverlay(true); // Show the overlay
    }

    function handleCloseReportPopup() {
        setShowReportPopup(false);
        // setShowOverlay(false);
    }

    // console.log("isBookmarked", isBookmarked)

    return postData && (
        <div className={classNames(styles.root, className)}>
            <div>
                {showReportPopup && (
                    <div className={styles.overlay}>
                        <Modal
                            open={showReportPopup}
                            onClose={handleCloseReportPopup}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className={styles.reportPopup}>
                                {/* /** //useState to track the clicked post's media ID */}
                                <ReasonReportPopup
                                    mediaId={postData.mediaId}
                                    onSubmit={() => setShowReportPopup(false)} // Pass the onClose function
                                    handleOpen={handleOpenConfirmation}
                                    handleClose={handleCloseConfirmation}
                                />
                            </div>
                        </Modal>
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
                {/* {openSharePopup && (
                    // <PopupModal open={openSharePopup} onClose={handleCloseSharePopup} />
                )} */}

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
                                    className={styles.postMediaContainerComment}
                                    key={postData.mediaId}
                                >
                                    <VideoPlayer
                                        // key={postData.mediaId}
                                        src={postData.reducedVideoHlsUrl}
                                        onStart={() => handleStartWatching(postData.mediaId)}
                                        onEnd={() => handleEndWatching(postData.mediaId)}
                                    />
                                </div>

                                <div className={styles.userCommentDiv}>
                                    <div style={{ width: '100%', overflow: 'auto' }}>
                                        <div className={styles.commentsHeaderDiv}>Comments</div>
                                        {postData.comments.map((comment, i) => (
                                            <Comment key={i} comment={comment} handleReply={dHandleReply} handleLikeComment={dHandleLikeComment} />
                                        ))}
                                    </div >
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
                                                dHandleCommenting([message, postData.mediaId]);
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
                                                <img
                                                    src={profileAvatar}
                                                    alt={''}
                                                    className={styles.avatarImgCircleCommentInputField}


                                                />
                                                <InputField
                                                    placeholder="Add comment..."
                                                    type={''}
                                                    value={message}
                                                    onChange={(e: any) => setMessage(e.target.value)}
                                                    showcommentsIcons={true}
                                                    iconClick={(e: any) => {
                                                        e.preventDefault(); // Prevent the default form submission behavior
                                                        dHandleCommenting([message, postData.mediaId]);
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
                        <div className={styles.postCaptionContainer}>
                            <div className={styles.postCreator}>
                                <div className={styles['profilePic-UserNameDiv']}>
                                    <div>
                                        <img
                                            src={postData.user.avatar || profileIcon}
                                            alt=""
                                            className={styles.profilePicImg}
                                        />
                                    </div>
                                    <div className={styles.userDetailsDiv}>
                                        <h4 className={styles.userNameText}>{postData.user.name}</h4>
                                        <h4 className={styles.userSubText}>{postData.user.username}</h4>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        ref={buttonRef}
                                        className={postData.user.isFollowed ? styles.followingBtn : styles.followBtn}
                                        onClick={() => {
                                            if (isLoggedIn) { handleFollowClick(postData.user._id) }
                                            else {
                                                navigate('/auth')
                                            }
                                        }}
                                    >
                                        {followLoading ? '...' : postData.user.isFollowed ? 'Following' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                            <div className={styles.postText}>
                                <h4 className={styles.captionText}>{postData.description}</h4>
                            </div>
                        </div>
                        <div className={styles.postMediaContainer} ref={videoElement}>
                            <VideoPlayer
                                key={postData.mediaId}
                                src={postData.reducedVideoHlsUrl}
                                onStart={() => handleStartWatching(postData.mediaId)}
                                onEnd={() => handleEndWatching(postData.mediaId)}
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
                                onClick={() => {
                                    if (isLoggedIn) { dHandleLikePost([post]) }
                                    else { navigate('/auth') }
                                }}
                            >
                                {postData.isLiked ? <Like liked={true} /> : <Like />}
                                <h4 className={styles.interactionText}>{postData.likes}</h4>
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
                                onClick={() => {
                                    if (isLoggedIn) { handleOpenCommentPopup() }
                                    else { navigate('/auth') }
                                }}
                            >
                                <CommentIcon />
                                <h4 className={styles.interactionText}>{postData.comments.length}</h4>
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
                                aria-controls={openMore ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openMore ? 'true' : undefined}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (isLoggedIn) { dHandleBookmarking([]) }
                                    else { navigate('/auth') }
                                }}
                            >
                                <>
                                    <Bookmark bookmarked={bookMarkStatus} />
                                    <h4 className={styles.interactionText}></h4>
                                </>
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
                                aria-controls={openShare ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openShare ? 'true' : undefined}
                                onClick={(e) => handleOpenSharePopup(e)}
                            >
                                <Share />
                                <h4 className={styles.interactionText}>{postData.shares}</h4>
                            </Button>
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchors.share}
                                open={openShare}
                                onClose={handleShareClose}
                            >
                                <MenuItem onClick={handleShareClose} className={styles.menuItems}>
                                    Link Copied!
                                </MenuItem>
                            </StyledMenu>
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
                                aria-controls={openMore ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openMore ? 'true' : undefined}
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
                                anchorEl={anchors.more}
                                open={openMore}
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
        </div >
    );
}, (prev, next) => prev.post.mediaId === next.post.mediaId);

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
