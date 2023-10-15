import { Box, IconButton, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import classNames from 'classnames';
import FileSaver from "file-saver";
import { memo, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import confirmationIcon from '../../assets/confirmationIcon.png';
import profileIcon from '../../assets/defaultProfileIcon.png';
import { useAuthStore } from '../../store/authStore';
import { ReasonReportPopup } from '../reason-report-popup/reason-report-popup';
import InputField from '../reusables/InputField';
import VideoPlayer from '../reusables/VideoPlayer';
import useDebounce from '../reusables/useDebounce';
import { Comment } from './comment';
import styles from './post.module.scss';
import { PostProps, Post as PostType } from './postTypes';

import { useNavigate } from 'react-router-dom';
import coinChestPNG from '../../assets/CoinChestPNG.png';
import arrowRightIcon from '../../assets/arrowRightIcon.png';
import arrowRightIcon2 from '../../assets/arrowRightIcon2.png';
import closeIcon from '../../assets/closeIcon.png';
import coinIcon from '../../assets/coinPng.png';
import dangerIcon from '../../assets/dangerIcon.png';
import questionBlackIcon from '../../assets/questionBlackIcon.png';
import questionIcon from '../../assets/questionIcon.png';
import reportEmailIcon from '../../assets/reportEmailIcon.png';
import Calculator from '../reusables/calculator/Calculator';
import { fetchInJSON } from '../reusables/fetchInJSON';
import { Bookmark } from './svg-components/Bookmark';
import { CommentIcon } from './svg-components/Comment';
import { Copy } from './svg-components/Copy';
import { Like } from './svg-components/Like';
import { More } from './svg-components/More';
import { Report } from './svg-components/Report';
import { Save } from './svg-components/Save';
import { Share } from './svg-components/Share';
import soundIcon from './svg-components/soundIcon.svg';

interface Gift {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    isActive: boolean;
    isDeleted: boolean;
    __v: number;
    createdTime: number;
    lastModifiedTime: number;
}

export const Post: React.FC<PostProps> = memo(({ className, post, startedIds, endedIds, isBookmarked, profileAvatar }) => {
    // console.log('is bookmarked?', isBookmarked);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const balance = useAuthStore((state) => state.balance);
    const { selectedIndex, setIndex } = useAuthStore(); // Get selectedIndex and setIndex from the store
    const [gifts, setGifts] = useState<any>([])
    const API_KEY = process.env.VITE_API_URL;
    const navigate = useNavigate()
    const [videoElement, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1, // Adjust the threshold as needed
    });

    const token = useAuthStore((state) => state.token);

    const [openRechargeBalanceModal, setOpenRechargeBalanceModal] = useState(false)
    const handleCloseRechargeBalanceModal = () => {
        setOpenRechargeBalanceModal(false)
    }
    const handleOpenRechargeBalanceModal = () => {
        setOpenGiftsModal(false)
        setOpenRechargeBalanceModal(true)
    }

    const [openGiftsModal, setOpenGiftsModal] = useState(false)
    const handleOpenGiftsModal = () => setOpenGiftsModal(true);
    const handleCloseGiftsModal = () => setOpenGiftsModal(false);

    const [openCalculatorModal, setOpenCalculatorModal] = useState(false)
    const handleCloseCalculatorModal = () => {
        setOpenCalculatorModal(false)
    }
    const handleOpenCalculatorModal = () => {
        setOpenRechargeBalanceModal(false)
        setOpenCalculatorModal(true)
    }

    const [openFaqsModal, setOpenFaqsModal] = useState(false)
    const handleOpenFaqsModal = () => {
        setOpenCalculatorModal(false)
        setOpenFaqsModal(true)
    }
    const handleCloseFaqsModal = () => {
        setOpenFaqsModal(false)
    }

    const [postData, setPostData] = useState(post)
    const [followLoading, setFollowLoading] = useState(false);

    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [showReportPopup, setShowReportPopup] = useState(false);

    const [, setShowOverlay] = useState(false);

    const [openCommentPopup, setOpenCommentPopup] = useState(false);
    const handleOpenCommentPopup = () => {
        setOpenCommentPopup(true);
        fetchGifts()
    };

    const [message, setMessage] = useState('');
    const [followedAccounts, setFollowedAccounts] = useState<any>({}); // Initialize as an empty object

    const [anchors, setAnchors] = useState<{ more: null, share: null }>({ more: null, share: null });
    const buttonRef = useRef(null);
    const videoRef = useRef<any>(null); // Use `any` type to avoid TypeScript errors
    const [bookMarkStatus, setBookMarkStatus] = useState(isBookmarked);
    const openMore = Boolean(anchors.more);
    const openShare = Boolean(anchors.share);
    const [showButton, setShowButton] = useState(Infinity);

    const [showSentGift, setShowSentGift] = useState(false)

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
        }, 500)
        setAnchors(prev => ({ ...prev, more: null }))
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

    const handleFollowClick = async (userId: any) => {
        setFollowLoading(true); // Set loading state before API call
        const response = await fetch(
            `${API_KEY}/profile/follow/${userId}/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (response.ok) {
            // Handle success as needed
            console.log(`user: ${userId} is followed`);
            // Update the followedAccounts state
            setFollowedAccounts((prevFollowedAccounts: any) => ({
                ...prevFollowedAccounts,
                [userId]: !prevFollowedAccounts[userId], // Mark the account as followed
            }));
            handleFetchCurrentPost(post.mediaId)
        }
        setFollowLoading(false); // Set loading state back to false after API call
    };

    function handleReportClick() {
        handleClose();
        setShowReportPopup(true); // Show the report popup
        setShowOverlay(true); // Show the overlay
    }

    function handleCloseReportPopup() {
        setShowReportPopup(false);
        // setShowOverlay(false);
    }

    const handleSaveVideo = async (videoUrl: string) => {
        console.log('save video clicked');
        const response = await axios.get(videoUrl, { responseType: 'blob' });

        // Extract the video content
        const videoBlob = response.data;

        // Create a filename based on the URL
        const urlParts = videoUrl.split('/');
        const filename = urlParts[urlParts.length - 1];

        // Save the video blob as a .mp4 file
        FileSaver.saveAs(videoBlob, filename);
        setAnchors(prev => ({ ...prev, more: null }));
    };

    const fetchGifts = async () => {
        try {
            const response = await fetch(`${API_KEY}/gift`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setGifts(data.data as Gift[]);
            console.log(data);
        } catch (error) {
            console.error('Error fetching gifts:', error);
        }
    };

    const handleMouseEnter = (index: number) => {
        setShowButton(index);
    };

    const handleMouseLeave = (index: number) => {
        setShowButton(Infinity);
    };

    const sentGiftUrl = useRef('')

    const handleCloseSentGiftPopUp = () => {
        setShowSentGift(false)
    }

    const handleSendingGiftImage = (gift: Gift, mediaId: string) => {
        handleCloseGiftsModal()
        sentGiftUrl.current = gift.imageUrl
        setShowSentGift(true)
        handleSendGift(gift._id, mediaId)
    }

    const handleSendGift = async (giftId: string, mediaId: string) => {
        try {
            const response = await fetch(`${API_KEY}/gift/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ giftId, mediaId }),
            })
            const responseData = await response.json()
            const myData = responseData.data
            console.log(` the send gift response: ${myData}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEmailClick = () => {
        const email = 'info@ogoul.com';
        window.location.href = `mailto:${email}`;
        setOpenFaqsModal(false)
    }

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
                            </Box>
                        </Modal>
                    </div>
                )}
                {openCommentPopup && (
                    <div>
                        <Modal
                            open={openCommentPopup}
                            onClose={handleCloseCommentPopup}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <>
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
                                        <div style={{ width: '100%', overflow: 'auto', height: '100%' }}>
                                            <div className={styles.commentsHeaderDiv}>
                                                {/**  Post Creator Info */}
                                                <div className={styles.postCaptionContainerComments}>
                                                    <div className={styles.postCreator}>
                                                        <div className={styles['profilePic-UserNameDiv']}>
                                                            <div>
                                                                <img
                                                                    src={postData.user.avatar === '' ? profileIcon : postData.user.avatar}
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
                                                        <Box className={styles.soundDiv} onClick={() => {
                                                            setIndex(-1)
                                                            console.log("soundId:", postData.sound?._id);
                                                            navigate(`/sounds/soundId=${postData.sound?._id === undefined || null || "" ? "650afbc1b5a4b181b0353886" : postData.sound?._id}`);

                                                        }}>
                                                            <img src={soundIcon} alt='' />
                                                            <p>{postData.sound?.title} - {postData.sound?.owner?.name}</p>
                                                        </Box>
                                                    </div>
                                                    <div className={styles.postInteractionContainerComment}>
                                                        <div className={styles.interactionDivComment}>
                                                            <Button
                                                                className={styles.interactionDivComment}
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
                                                                <h4 className={styles.interactionTextComment}>{postData.likes}</h4>
                                                            </Button>
                                                        </div>
                                                        <div className={styles.interactionDivComment}>
                                                            <Button
                                                                className={styles.interactionDivComment}
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
                                                                <h4 className={styles.interactionTextComment}>{postData.comments.length}</h4>
                                                            </Button>
                                                        </div>
                                                        <div className={styles.interactionDivComment}>
                                                            <Button
                                                                className={styles.interactionDivComment}
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
                                                                    <h4 className={styles.interactionTextComment}></h4>
                                                                </>
                                                            </Button>
                                                        </div>
                                                        <div className={styles.interactionDivComment}>
                                                            <Button
                                                                className={styles.interactionDivComment}
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
                                                                <h4 className={styles.interactionTextComment}>{postData.shares}</h4>
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
                                                        <div className={styles.interactionDivComment}>
                                                            <Button
                                                                className={styles.interactionDivComment}
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
                                                                <h4 className={styles.interactionTextComment}>More</h4>
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
                                                                <MenuItem onClick={() => handleSaveVideo(postData.reducedVideoUrl)} className={styles.menuItems}>
                                                                    <div className={styles.menuItemsSvgs}>
                                                                        <Save />
                                                                    </div>
                                                                    Save Video
                                                                </MenuItem>
                                                                <MenuItem onClick={(e) => handleOpenSharePopup(e)} className={styles.menuItems}>
                                                                    <div className={styles.menuItemsSvgs}>
                                                                        <Copy />
                                                                    </div>
                                                                    Copy Link
                                                                </MenuItem>
                                                                {/* <MenuItem onClick={handleClose} className={styles.menuItems}>
                                                                <div className={styles.menuItemsSvgs}>
                                                                    <NotInterested />
                                                                </div>
                                                                Not Interested
                                                            </MenuItem> */}
                                                                <MenuItem onClick={handleReportClick} className={styles.menuItems}>
                                                                    <div className={styles.menuItemsSvgs}>
                                                                        <Report />
                                                                    </div>
                                                                    Report
                                                                </MenuItem>
                                                                {/* <MenuItem onClick={handleClose} className={styles.menuItems}>
                                                                <div className={styles.menuItemsSvgs}>
                                                                    <Send />
                                                                </div>
                                                                Send
                                                            </MenuItem> */}
                                                            </StyledMenu>

                                                            {/* ----------------------------------------- More Menue ----------------------------------------------------------------*/}
                                                            <div></div>
                                                        </div>

                                                    </div>

                                                </div>
                                                {/**  Post Creator Info End */}

                                            </div>
                                            <div className={styles.giftsReceivedDiv}>
                                                <p className={styles.giftsText}>Gifts received</p>
                                                {postData.receivedGifts.map((gift, i) => (
                                                    <img src={coinChestPNG} alt='' width='50px' height='50px' />
                                                ))}
                                            </div>
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
                                                        src={profileAvatar === '' ? profileIcon : profileAvatar}
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
                                                        giftClick={(e: any) => {
                                                            e.preventDefault();
                                                            handleOpenGiftsModal();
                                                        }}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Box>

                                {openGiftsModal && (
                                    <>
                                        <div>
                                            <Modal
                                                open={openGiftsModal}
                                                onClose={handleCloseGiftsModal}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={giftsModalStyle}>
                                                    <Box sx={giftsBox}>
                                                        {gifts?.map((gift: any, i: number) => (
                                                            <>
                                                                <div className={styles.giftDiv} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={() => handleMouseLeave(i)} key={i}>
                                                                    <img className={styles.giftImg} src={gift?.imageUrl} alt='' />
                                                                    <div className={styles.giftPriceDiv}>
                                                                        <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                                                        <p className={styles.giftPrice}>{gift.price}</p>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleSendingGiftImage(gift, postData.mediaId)}
                                                                        className={`${styles.giftSendBtn} ${showButton === i ? '' : styles.giftSendBtnHidden}`}>
                                                                        send
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ))}
                                                    </Box>
                                                    <div className={styles.giftsBottomDiv}>
                                                        <div className={styles.giftsBottomLeftDiv}>
                                                            <p style={{ margin: 0 }}>Balance: {balance}</p>
                                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                                        </div>
                                                        <div className={styles.giftsBottomRightDiv}>
                                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                                            <p style={{ margin: 0 }}>Recharge</p>
                                                            <IconButton onClick={handleOpenRechargeBalanceModal}>
                                                                <img src={arrowRightIcon} alt='' style={{ width: '24px', height: '24px' }} />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </Modal>
                                        </div>
                                    </>
                                )}
                                {showSentGift && (
                                    <div onClick={handleCloseSentGiftPopUp}>
                                        <Modal
                                            open={showSentGift}
                                            onClose={handleCloseSentGiftPopUp}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            BackdropProps={{ style: { backgroundColor: "transparent" } }}
                                        >
                                            <Box sx={sentGiftModalStyle}>
                                                <img src={sentGiftUrl.current} alt='' style={{ width: '200px', height: '200px' }} />
                                            </Box>
                                        </Modal >
                                    </div >
                                )}
                            </>
                        </Modal>
                    </div>
                )}
                {openRechargeBalanceModal && (
                    <div>
                        <Modal
                            open={openRechargeBalanceModal}
                            onClose={handleCloseRechargeBalanceModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={defModalStyle}>
                                <div className={styles.rechargeModalHeader}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%' }}>
                                        <p>Recharge</p>
                                        <IconButton>
                                            <img src={questionIcon} alt='' style={{ width: '20px', height: '20px' }} />
                                        </IconButton>
                                    </div>

                                </div>
                                <div>
                                    <div className={styles.giftsBottomLeftDiv}>
                                        <p style={{ margin: 0 }}>Balance: {balance}</p>
                                        <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                    </div>
                                </div>

                                <div className={styles.warningMsg}>
                                    <p>Pricing will change depending on payment method.</p>
                                    <img src={dangerIcon} alt='' />
                                </div>
                                <Box sx={pricesBox}>
                                    <div className={styles.price}>
                                        <div className={styles.coinsAmount}>
                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                            65</div>
                                        <div className={styles.coinsPrice}>QAR 3.69</div>
                                    </div>
                                    <div className={styles.price}>
                                        <div className={styles.coinsAmount}>
                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                            130</div>
                                        <div className={styles.coinsPrice}>QAR 7.29</div>
                                    </div>
                                    <div className={styles.price}>
                                        <div className={styles.coinsAmount}>
                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                            330</div>
                                        <div className={styles.coinsPrice}>QAR 17.99</div>
                                    </div>
                                    <div className={styles.price}>
                                        <div className={styles.coinsAmount}>
                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                            400</div>
                                        <div className={styles.coinsPrice}>QAR 20.99</div>
                                    </div>
                                    <div className={styles.price}>
                                        <div className={styles.coinsAmount}>
                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                            525</div>
                                        <div className={styles.coinsPrice}>QAR 29.29</div>
                                    </div>
                                    <div className={styles.price}>
                                        <div className={styles.coinsAmount}>
                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                            660</div>
                                        <div className={styles.coinsPrice}>QAR 36.99</div>
                                    </div>
                                    <div className={styles.price}>
                                        <div className={styles.coinsAmount}>
                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                            800</div>
                                        <div className={styles.coinsPrice}>QAR 44.99</div>
                                    </div>
                                    <div className={styles.price}>
                                        <div className={styles.coinsAmount}>
                                            <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                            1321</div>
                                        <div className={styles.coinsPrice}>QAR 74.29</div>
                                    </div>
                                    <div className={styles.price} onClick={handleOpenCalculatorModal}>
                                        <div className={styles.coinsAmount} >
                                            Custom</div>
                                        <div className={styles.coinsPriceCustom}>Larger amounts supported</div>
                                    </div>
                                </Box>
                                <div className={styles.giftsBottomDiv} style={{ marginBottom: '32px' }}>
                                    <div className={styles.giftsBottomLeftDiv}>
                                        <img src={coinIcon} alt='' style={{ width: '16px', height: '16px' }} />
                                        <p className={styles.giftCoinsText}>Gift Coins</p>
                                    </div>
                                    <div className={styles.giftsBottomRightDiv}>
                                        <p className={styles.giftCoinsAmountText}>QAR 0</p>
                                        {/* <IconButton onClick={handleOpenRechargeBalanceModal}> */}
                                        <img src={arrowRightIcon2} alt='' style={{ width: '16px', height: '16px' }} />
                                        {/* </IconButton> */}
                                    </div>
                                </div>
                                <button className={styles.rechargeBtn}>
                                    <p>Recharge</p>
                                </button>
                                {/* <Calculator /> */}
                            </Box>
                        </Modal>
                    </div>
                )}
                {openCalculatorModal && (
                    <div>
                        <Modal
                            open={openCalculatorModal}
                            onClose={handleCloseCalculatorModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={defModalStyle}>
                                <div className={styles.rechargeModalHeader}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%' }}>
                                        <p>Custom</p>
                                        <IconButton onClick={handleCloseCalculatorModal}>
                                            <img src={closeIcon} alt='' style={{ width: '20px', height: '20px' }} />
                                        </IconButton>
                                    </div>
                                </div>
                                <Box sx={{ marginBottom: '32px' }}>
                                    <Calculator />
                                </Box>
                                <div className={styles.giftsBottomDiv2} style={{ marginBottom: '32px' }}>
                                    <div className={styles.giftsBottomLeftDiv2}>
                                        <p className={styles.giftCoinsText}>Total</p>
                                    </div>
                                    <div className={styles.giftsBottomRightDiv}>
                                        <p className={styles.giftCoinsAmountText}>QAR 0</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <IconButton onClick={handleOpenFaqsModal}>
                                        <img src={questionBlackIcon} alt='' />
                                    </IconButton>
                                    <button className={styles.rechargeBtn}>
                                        <p>Recharge</p>
                                    </button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                )}
                {openFaqsModal && (
                    <div>
                        <Modal
                            open={openFaqsModal}
                            onClose={handleCloseFaqsModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={faqsModal}>
                                <div className={styles.rechargeModalHeader}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '70%' }}>
                                        <p>Payment FAQS</p>
                                        <IconButton onClick={handleCloseFaqsModal}>
                                            <img src={closeIcon} alt='' style={{ width: '20px', height: '20px' }} />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className={styles.faqsContainer}>
                                    <details>
                                        <summary>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <p>Question</p>
                                            </div>
                                        </summary>
                                        <div>
                                            <p>Answer here</p>
                                        </div>
                                    </details>
                                    <details>
                                        <summary>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <p>Question</p>
                                            </div>
                                        </summary>
                                        <div>
                                            <p>Answer here</p>
                                        </div>
                                    </details>
                                    <details>
                                        <summary>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <p>Question</p>
                                            </div>
                                        </summary>
                                        <div>
                                            <p>Answer here</p>
                                        </div>
                                    </details>
                                    <details>
                                        <summary>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <p>Question</p>
                                            </div>
                                        </summary>
                                        <div>
                                            <p>Answer here</p>
                                        </div>
                                    </details>
                                </div>
                                <div >
                                    <button onClick={handleEmailClick} className={styles.rechargeBtn} style={{ gap: '12px' }}>
                                        <img src={reportEmailIcon} alt='' />
                                        <p>Report a different issue</p>
                                    </button>
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
                                            src={postData.user.avatar === '' ? profileIcon : postData.user.avatar}
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
                                        // ref={buttonRef}
                                        className={
                                            postData.user.isFollowed ?
                                                styles.followingBtn : styles.followBtn

                                        }
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
                                <Box className={styles.soundDiv} onClick={() => {
                                    setIndex(-1)
                                    console.log("soundId:", postData.sound?._id);
                                    navigate(`/sounds/soundId=${postData.sound?._id === undefined || null || "" ? "650afbc1b5a4b181b0353886" : postData.sound?._id}`);

                                }}>
                                    <img src={soundIcon} alt='' />
                                    <p>{postData.sound?.title} - {postData.sound?.owner?.name}</p>
                                    {/* <p>{postData.sound?._id}</p> */}
                                </Box>
                            </div>
                        </div>
                        <div className={styles.postMediaContainer} ref={videoElement} >
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
                                <MenuItem onClick={() => handleSaveVideo(postData.reducedVideoUrl)} className={styles.menuItems}>
                                    <div className={styles.menuItemsSvgs}>
                                        <Save />
                                    </div>
                                    Save Video
                                </MenuItem>
                                <MenuItem onClick={(e) => handleOpenSharePopup(e)} className={styles.menuItems}>
                                    <div className={styles.menuItemsSvgs}>
                                        <Copy />
                                    </div>
                                    Copy Link
                                </MenuItem>
                                <MenuItem onClick={handleReportClick} className={styles.menuItems}>
                                    <div className={styles.menuItemsSvgs}>
                                        <Report />
                                    </div>
                                    Report
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

const giftsModalStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    columnGap: '24px',
    top: '56%',
    left: '64.5%',
    transform: 'translate(-50%, -50%)',
    minWidth: 420,
    minHeight: 540,
    padding: '16px',
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: '8px',
    boxShadow: 24,
}

const giftsBox = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    marginBottom: '32px',
}

const sentGiftModalStyle = {
    display: 'flex',
    position: 'absolute' as 'absolute',
    top: '60%',
    left: '67%',
    transform: 'translate(-50%, -50%)',
    minWidth: 250,
    minHeight: 250,
    padding: 0,
    backgroundColor: 'transparent', // Use backgroundColor instead of background
    border: 'none', // Remove the border
    borderRadius: '8px',
};

const defModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 420,
    minHeight: 410,
    // maxHeight: '549px',
    padding: '24px',
}
const faqsModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 420,
    minHeight: 410,
    maxHeight: '549px',
    padding: '24px',
}

const pricesBox = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginBottom: '24px',
    marginTop: '16px',
    columnGap: '8px',
    rowGap: '8px',
}