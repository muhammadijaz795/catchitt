import classNames from 'classnames';
import styles from './post.module.scss';
// import postExample from '../../assets/postExample.png';
import { useRef, useState, useEffect, SetStateAction } from 'react';
import { ReasonReportPopup } from '../reason-report-popup/reason-report-popup';
// import ReactPlayer from 'react-player';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import { ViewSwitchers } from '../view-switchers/view-switchers';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import { Box, Modal, Typography } from '@mui/material';
import confirmationIcon from '../../assets/confirmationIcon.png';
import VideoPlayer from '../reusables/VideoPlayer';
import shareIconinPopup from '../../assets/shareIconInPopUp.png';
import profileIcon from '../../assets/profileIcon.png';
import ReactHlsPlayer from '@gumlet/react-hls-player';
import { useInView } from 'react-intersection-observer';

interface PostProps {
    className?: string;
}

interface Post {
    collections: number;
    showReportPopup: any;
    className?: string;
    mediaId: string;
    createdTime: number;
    user: {
        _id: string;
        name: string;
        avatar: string;
        username: string;
        isVerified: boolean;
        isFollowed: boolean;
    };
    likes: number;
    shares: number;
    views: number;
    description: string;
    linkedFiles: string[];
    reducedVideoUrl: string;
    reducedVideoHlsUrl: string;
    shortVideoUrl: string;
    shortVideoHlsUrl: string;
    privacyOptions: {
        isOnlyMe: boolean;
    };
    thumbnailUrl: string;
    thumbnail: string;
    originalUrl: string;
    comments: string[]; // You can define a proper type for comments if possible.
    isLiked: boolean;
    category: string;
    type: string;
    receivedGifts: any[]; // You can define a proper type for gifts if possible.
    taggedUsers: any[]; // You can define a proper type for users if possible.
}

export const Post: React.FC<PostProps> = ({ className }) => {
    const watchedMediaIds = useRef(new Map());
    const videoRef = useRef<any>(null); // Use `any` type to avoid TypeScript errors
    const [videoElement, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1, // Adjust the threshold as needed
    });

    useEffect(() => {
        console.log('RAN THIS USEEFFECT');
        if (inView) {
            videoRef.current?.play();
            watchedMediaIds.current.set(currentMediaId, null);
            console.log('MEMOOOOOO', watchedMediaIds.current);
        } else {
            videoRef.current?.pause();
        }
    }, [inView]);

    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [currentLikeMediaId, setCurrentLikeMediaId] = useState('');
    const [currentBookmarkMediaId, setCurrentBookmarkMediaId] = useState('');
    const [currentPostUser, setCurrentPostUser] = useState('');
    const [currentMediaId, setCurrentMediaId] = useState('');
    // const [currentCommentMediaId, setCurrentCommentMediaId] = useState('');

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = useAuthStore((state) => state.token);

    const [errorMessage, setErrorMessage] = useState('');
    const [postData, setPostData] = useState<Post[]>([]);
    const API_KEY = process.env.VITE_API_URL;
    const endPoint = '/media-content/videos/feed';
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [openConfirmation, setOpenConfirmation] = useState(false);
    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
        setShowReportPopup(false);
    };
    const handleCloseConfirmation = () => setOpenConfirmation(false);

    const [openSharePopup, setOpenSharePopup] = useState(false);
    const handleOpenSharePopup = (
        event: React.MouseEvent<HTMLElement>,
        mediaId: SetStateAction<string>
    ) => {
        setCurrentMediaId(mediaId);
        setOpenSharePopup(true);
    };

    const [openCommentPopup, setOpenCommentPopup] = useState(false);
    const handleOpenCommentPopup = (event: React.MouseEvent<HTMLElement>, mediaId: string) => {
        console.log('comment popup mediaid received', mediaId, currentMediaId);

        setCurrentMediaId(mediaId);
        setOpenCommentPopup(true);
    };

    const handleCloseSharePopup = () => setOpenSharePopup(false);
    const handleCloseCommentPopup = () => setOpenCommentPopup(false);

    const handleClickMore = (
        event: React.MouseEvent<HTMLElement>,
        mediaId: SetStateAction<string>
    ) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setCurrentMediaId(mediaId);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLikeClick = (
        event: React.MouseEvent<HTMLElement>,
        mediaId: SetStateAction<string>
    ) => {
        // event.preventDefault();
        setCurrentLikeMediaId(mediaId);
        // handleLikePost();
    };

    const handleBookmarkClick = (event: React.MouseEvent<HTMLElement>, mediaId: string) => {
        setCurrentBookmarkMediaId(mediaId);
    };

    useEffect(() => {
        if (currentLikeMediaId !== '') {
            handleLikePost();
        }
        // if (currentLikeMediaId !== '') {
        //     handleLikePost();
        // }
        if (currentBookmarkMediaId !== '') {
            handleBookmarkPost();
            // handleFetchActivity();
        }
        if (currentPostUser !== '') {
            handleFollowClick();
            // handleFetchActivity();
        }
    }, [currentLikeMediaId, currentBookmarkMediaId, currentPostUser]);

    const handleLikePost = async () => {
        try {
            const response = await fetch(
                `https://dev.seezitt.com/api/media-content/like/${currentLikeMediaId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // const responseData = await response.json();
                // console.log(responseData);
                handleFetchActivity();
                setCurrentLikeMediaId('');
            } else {
                console.log(response);
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    const handleBookmarkPost = async () => {
        try {
            const response = await fetch(
                `https://dev.seezitt.com/api/media-content/collections/${currentBookmarkMediaId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // const responseData = await response.json();
                // console.log(responseData);
                console.log(response);
                handleFetchActivity();
                setCurrentBookmarkMediaId('');
            } else {
                console.log(response);
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    const handleStartWatching = async (mediaId: string): Promise<void> => {
        if (watchedMediaIds.current.has(mediaId)) {
            return;
        }

        try {
            const response = await fetch(
                `https://dev.seezitt.com/api/media-content/mark-as-started-watching/${mediaId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // console.log(response);
                handleFetchActivity();
                // console.log('video started watching');
            } else {
                // console.log(response);
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    const handleEndWatching = async (mediaId: string) => {
        if (watchedMediaIds.current.has(mediaId)) {
            return;
        }
        watchedMediaIds.current.set(mediaId, null);

        try {
            const response = await fetch(
                `https://dev.seezitt.com/api/media-content/mark-as-watched-till-end/${mediaId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // console.log(response);
                handleFetchActivity();
                // console.log('video ENDED watching');
            } else {
                // console.log(response);
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    const handleFollowClick = async () => {
        try {
            const response = await fetch(
                `https://dev.seezitt.com/api/profile/follow/${currentPostUser}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // const responseData = await response.json();
                // console.log(responseData);
                console.log(response);
                handleFetchActivity();
                setCurrentPostUser('');
            } else {
                console.log(response);
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    const StyledMenu = styled((props: MenuProps) => (
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

    const style = {
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
        // gap: '32px',
    };

    const styleٍShare = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 588,
        height: 'auto',
        minHeight: 550,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: '24px 16px',
        borderRadius: '8px',
        display: 'inline-flex',
        padding: '32px',
        flexDirection: 'column',
        alignItems: 'center',
        // gap: '32px',
    };

    const styleComment = {
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
        // p: '24px 16px',
        borderRadius: '8px',
        display: 'flex',
        // padding: '32px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // gap: '32px',
    };

    const handleFetchActivity = async () => {
        try {
            const response = await fetch(`${API_KEY}${endPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setPostData(responseData.data);
                // console.log(postData);
            } else {
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleFetchActivity();
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    const [showReportPopup, setShowReportPopup] = useState(false);
    const [, setShowOverlay] = useState(false);

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

    const handleTabChange = (index: number) => {
        setSelectedTab(index);
    };

    // Filter the posts based on the selected tab and post.user.isFollowed value
    const filteredPosts = postData.filter((post) => {
        if (selectedTab === 0) {
            // "Following" tab is selected, show only the posts where post.user.isFollowed is true
            return post.user.isFollowed;
        } else if (selectedTab === 1) {
            // "For You" tab is selected, add your logic here if needed
            return true; // Replace this with your specific condition for "For You" tab
        } else if (selectedTab === 2) {
            // "Live" tab is selected, add your logic here if needed
            return true; // Replace this with your specific condition for "Live" tab
        }
        return true; // Return true by default in case there are more tabs
    });

    return (
        <>
            <div className={classNames(styles.root, className)}>
                <div className={styles.viewSwitchersDiv}>
                    <ViewSwitchers onTabChange={handleTabChange} />
                </div>
                {filteredPosts?.map((post) => (
                    <div key={post.mediaId} style={{ marginBottom: '32px' }}>
                        {/* {setCurrentPostUser(post.user._id)} */}
                        {showReportPopup ? (
                            <div className={styles.overlay}>
                                <div className={styles.reportPopup}>
                                    {/* /** //useState to track the clicked post's media ID */}
                                    <ReasonReportPopup
                                        mediaId={currentMediaId}
                                        onSubmit={() => setShowReportPopup(false)} // Pass the onClose function
                                        handleOpen={handleOpenConfirmation}
                                        handleClose={handleCloseConfirmation}
                                    />
                                </div>
                                <button
                                    onClick={() => handleCloseReportPopup()}
                                    style={{
                                        position: 'absolute',
                                        top: '10%',
                                        left: '65%',
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                        {openConfirmation && (
                            <div>
                                {/* <Button onClick={handleOpenConfirmation}>Open modal</Button> */}
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
                                                /* H2/Semibold */
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
                                                    /* H2/Semibold */
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
                                                // marginBottom: '24px ',
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
                            <div>
                                {/* <Button onClick={handleOpenConfirmation}>Open modal</Button> */}
                                <Modal
                                    open={openSharePopup}
                                    onClose={handleCloseSharePopup}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={styleٍShare}>
                                        <div className={styles['searchBar-Div']}>
                                            <input
                                                className={styles.mySearchInput}
                                                placeholder="Search accounts and videos"
                                                // onChange={onChange}
                                            />
                                            <img
                                                src={shareIconinPopup}
                                                alt=""
                                                style={{
                                                    width: '57.58px',
                                                    height: '57.58px',
                                                    marginLeft: '16px',
                                                }}
                                            />
                                        </div>

                                        <div className={styles.userDiv}>
                                            <div className={styles.userInfoFrame}>
                                                <img
                                                    src={profileIcon}
                                                    alt={'account.name'}
                                                    className={styles.avatarImgCircle}
                                                />
                                                <h4 className={styles.userNameText}>Basma Bahaa</h4>
                                            </div>
                                            <div className={styles.btnsDiv}>
                                                <button className={styles.btnsDivShareOutlined}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M13.3873 2.60707C14.2802 3.49992 14.4712 4.8414 13.8893 5.93858L10.0603 2.10513C10.4778 1.88303 10.9353 1.77642 11.384 1.77642C12.1169 1.77198 12.8409 2.06071 13.3873 2.60707ZM9.80262 2.2606L13.7338 6.20066C13.6316 6.34724 13.5206 6.48939 13.3873 6.61821C13.3473 6.65818 13.3074 6.69372 13.2674 6.7337L9.26513 2.73145C9.30511 2.68703 9.34509 2.64705 9.38063 2.60707C9.51389 2.47381 9.65159 2.36276 9.80262 2.2606ZM9.07413 2.96243L13.032 6.92026C12.379 7.38667 11.5705 7.55547 10.7799 7.38223L8.61216 5.21009C8.44336 4.42385 8.60772 3.61541 9.07413 2.96243ZM10.5 7.51993L8.01249 9.79424C7.68378 9.55881 7.35507 9.27897 7.04413 8.96359C6.73319 8.65265 6.45334 8.32838 6.20459 7.9819L8.48334 5.49438L10.5 7.51993Z"
                                                            fill="#5448B2"
                                                        />
                                                        <path
                                                            d="M5.99701 10.3636C6.19572 10.3636 6.35681 10.2026 6.35681 10.0038C6.35681 9.80513 6.19572 9.64404 5.99701 9.64404C5.7983 9.64404 5.63721 9.80513 5.63721 10.0038C5.63721 10.2026 5.7983 10.3636 5.99701 10.3636Z"
                                                            fill="#5448B2"
                                                        />
                                                        <path
                                                            d="M7.78556 10.0036L6.05318 11.5894C5.75112 11.3628 5.45795 11.1052 5.1781 10.8298C4.9027 10.5499 4.64506 10.2523 4.40963 9.94137L5.99543 8.20898C6.24418 8.54658 6.52403 8.87084 6.82609 9.17734C7.13259 9.48384 7.45685 9.76369 7.78556 10.0036ZM6.65285 10.0036C6.65285 9.64375 6.35968 9.35058 5.99987 9.35058C5.64007 9.35058 5.3469 9.64375 5.3469 10.0036C5.3469 10.3634 5.64007 10.6565 5.99987 10.6565C6.35968 10.6565 6.65285 10.3634 6.65285 10.0036ZM5.82663 11.7892L3.28136 14.1169C3.23694 14.1568 3.17031 14.1568 3.13034 14.1124L2.95266 13.9347C2.94821 13.9258 2.93933 13.917 2.93045 13.9081C2.92156 13.8992 2.91268 13.8948 2.90379 13.8859L2.11312 13.0952C2.10867 13.0863 2.09979 13.0774 2.09091 13.0685C2.08202 13.0597 2.07314 13.0552 2.06425 13.0463L1.87769 12.8598C1.83771 12.8153 1.83327 12.7487 1.87325 12.7087L4.20974 10.159C4.44073 10.4655 4.69392 10.7543 4.96933 11.0341C5.24029 11.3095 5.52902 11.5627 5.82663 11.7892ZM2.61506 14.0147L2.53511 14.0946C2.45071 14.179 2.33966 14.2235 2.21973 14.2235C2.09979 14.2235 1.98874 14.179 1.90434 14.0946C1.7311 13.917 1.7311 13.6371 1.90434 13.4639L1.9843 13.3839L2.61506 14.0147Z"
                                                            fill="#5448B2"
                                                        />
                                                    </svg>
                                                    Duet
                                                </button>
                                                <button className={styles.btnsDivShareContained}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M14.2904 1.72148C13.9569 1.37923 13.4634 1.25172 13.0032 1.38594L2.27216 4.50651C1.78663 4.6414 1.44249 5.02862 1.34978 5.52053C1.25508 6.02116 1.58588 6.65669 2.01806 6.92244L5.37343 8.9847C5.71757 9.1961 6.16175 9.14308 6.44654 8.85585L10.2888 4.9897C10.4822 4.78837 10.8023 4.78837 10.9957 4.9897C11.1891 5.18431 11.1891 5.49973 10.9957 5.70105L7.14682 9.56788C6.86137 9.85444 6.80802 10.3007 7.0181 10.647L9.06828 14.036C9.30837 14.4387 9.72188 14.6668 10.1754 14.6668C10.2288 14.6668 10.2888 14.6668 10.3421 14.6601C10.8623 14.593 11.2758 14.2373 11.4292 13.734L14.6105 3.01669C14.7506 2.56035 14.6239 2.06374 14.2904 1.72148Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        )}
                        {openCommentPopup ? (
                            <div>
                                {/* <Button onClick={handleOpenConfirmation}>Open modal</Button> */}
                                <Modal
                                    open={openCommentPopup}
                                    onClose={handleCloseCommentPopup}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={styleComment}>
                                        <div
                                            className={styles.mediaContainer}
                                            // className={styles.postMediaContainer}
                                            ref={videoElement}
                                        >
                                            <VideoPlayer
                                                key={currentMediaId}
                                                src={post.reducedVideoHlsUrl}
                                                onStart={() => handleStartWatching(currentMediaId)}
                                                onEnd={() => handleEndWatching(currentMediaId)}
                                            />
                                        </div>

                                        <div className={styles.userDiv}>
                                            <div className={styles.userInfoFrame}>
                                                <img
                                                    src={profileIcon}
                                                    alt={'account.name'}
                                                    className={styles.avatarImgCircle}
                                                />
                                                <h4 className={styles.userNameText}>Basma Bahaa</h4>
                                            </div>
                                            <div className={styles.btnsDiv}>
                                                <button className={styles.btnsDivShareOutlined}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M13.3873 2.60707C14.2802 3.49992 14.4712 4.8414 13.8893 5.93858L10.0603 2.10513C10.4778 1.88303 10.9353 1.77642 11.384 1.77642C12.1169 1.77198 12.8409 2.06071 13.3873 2.60707ZM9.80262 2.2606L13.7338 6.20066C13.6316 6.34724 13.5206 6.48939 13.3873 6.61821C13.3473 6.65818 13.3074 6.69372 13.2674 6.7337L9.26513 2.73145C9.30511 2.68703 9.34509 2.64705 9.38063 2.60707C9.51389 2.47381 9.65159 2.36276 9.80262 2.2606ZM9.07413 2.96243L13.032 6.92026C12.379 7.38667 11.5705 7.55547 10.7799 7.38223L8.61216 5.21009C8.44336 4.42385 8.60772 3.61541 9.07413 2.96243ZM10.5 7.51993L8.01249 9.79424C7.68378 9.55881 7.35507 9.27897 7.04413 8.96359C6.73319 8.65265 6.45334 8.32838 6.20459 7.9819L8.48334 5.49438L10.5 7.51993Z"
                                                            fill="#5448B2"
                                                        />
                                                        <path
                                                            d="M5.99701 10.3636C6.19572 10.3636 6.35681 10.2026 6.35681 10.0038C6.35681 9.80513 6.19572 9.64404 5.99701 9.64404C5.7983 9.64404 5.63721 9.80513 5.63721 10.0038C5.63721 10.2026 5.7983 10.3636 5.99701 10.3636Z"
                                                            fill="#5448B2"
                                                        />
                                                        <path
                                                            d="M7.78556 10.0036L6.05318 11.5894C5.75112 11.3628 5.45795 11.1052 5.1781 10.8298C4.9027 10.5499 4.64506 10.2523 4.40963 9.94137L5.99543 8.20898C6.24418 8.54658 6.52403 8.87084 6.82609 9.17734C7.13259 9.48384 7.45685 9.76369 7.78556 10.0036ZM6.65285 10.0036C6.65285 9.64375 6.35968 9.35058 5.99987 9.35058C5.64007 9.35058 5.3469 9.64375 5.3469 10.0036C5.3469 10.3634 5.64007 10.6565 5.99987 10.6565C6.35968 10.6565 6.65285 10.3634 6.65285 10.0036ZM5.82663 11.7892L3.28136 14.1169C3.23694 14.1568 3.17031 14.1568 3.13034 14.1124L2.95266 13.9347C2.94821 13.9258 2.93933 13.917 2.93045 13.9081C2.92156 13.8992 2.91268 13.8948 2.90379 13.8859L2.11312 13.0952C2.10867 13.0863 2.09979 13.0774 2.09091 13.0685C2.08202 13.0597 2.07314 13.0552 2.06425 13.0463L1.87769 12.8598C1.83771 12.8153 1.83327 12.7487 1.87325 12.7087L4.20974 10.159C4.44073 10.4655 4.69392 10.7543 4.96933 11.0341C5.24029 11.3095 5.52902 11.5627 5.82663 11.7892ZM2.61506 14.0147L2.53511 14.0946C2.45071 14.179 2.33966 14.2235 2.21973 14.2235C2.09979 14.2235 1.98874 14.179 1.90434 14.0946C1.7311 13.917 1.7311 13.6371 1.90434 13.4639L1.9843 13.3839L2.61506 14.0147Z"
                                                            fill="#5448B2"
                                                        />
                                                    </svg>
                                                    Duet
                                                </button>
                                                <button className={styles.btnsDivShareContained}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M14.2904 1.72148C13.9569 1.37923 13.4634 1.25172 13.0032 1.38594L2.27216 4.50651C1.78663 4.6414 1.44249 5.02862 1.34978 5.52053C1.25508 6.02116 1.58588 6.65669 2.01806 6.92244L5.37343 8.9847C5.71757 9.1961 6.16175 9.14308 6.44654 8.85585L10.2888 4.9897C10.4822 4.78837 10.8023 4.78837 10.9957 4.9897C11.1891 5.18431 11.1891 5.49973 10.9957 5.70105L7.14682 9.56788C6.86137 9.85444 6.80802 10.3007 7.0181 10.647L9.06828 14.036C9.30837 14.4387 9.72188 14.6668 10.1754 14.6668C10.2288 14.6668 10.2888 14.6668 10.3421 14.6601C10.8623 14.593 11.2758 14.2373 11.4292 13.734L14.6105 3.01669C14.7506 2.56035 14.6239 2.06374 14.2904 1.72148Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        ) : (
                            ''
                        )}

                        <div className={styles.container}>
                            <div className={styles.postContainer}>
                                {/* <h4>{post.mediaId}</h4> */}
                                <div className={styles.postCaptionContainer}>
                                    <div className={styles.postCreator}>
                                        <div className={styles['profilePic-UserNameDiv']}>
                                            <div>
                                                <img
                                                    src={
                                                        post.user.avatar ||
                                                        'https://via.placeholder.com/128'
                                                    }
                                                    alt=""
                                                    className={styles.profilePicImg}
                                                />
                                            </div>
                                            <div className={styles.userDetailsDiv}>
                                                <h4 className={styles.userNameText}>
                                                    {post.user.name}
                                                </h4>
                                                <h4 className={styles.userSubText}>
                                                    {post.user.username}
                                                </h4>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className={
                                                    post.user.isFollowed
                                                        ? styles.followingBtn
                                                        : styles.followBtn
                                                }
                                                onClick={() => setCurrentPostUser(post.user._id)}
                                            >
                                                {post.user.isFollowed ? 'Following' : 'Follow'}
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
                                        onClick={(event) => handleLikeClick(event, post.mediaId)}
                                    >
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="20" cy="20" r="20" fill="#EAEAEA" />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M24.6108 9.77856C25.3119 9.77856 26.0119 9.87745 26.6775 10.1008C30.7786 11.4341 32.2564 15.9341 31.0219 19.8674C30.3219 21.8774 29.1775 23.7119 27.6786 25.2108C25.5331 27.2886 23.1786 29.133 20.6442 30.7219L20.3664 30.8897L20.0775 30.7108C17.5342 29.133 15.1664 27.2886 13.0008 25.1997C11.5119 23.7008 10.3664 21.8774 9.65528 19.8674C8.39972 15.9341 9.8775 11.4341 14.0231 10.0774C14.3453 9.96634 14.6775 9.88856 15.0108 9.84523H15.1442C15.4564 9.79967 15.7664 9.77856 16.0775 9.77856H16.1997C16.8997 9.79967 17.5775 9.92189 18.2342 10.1452H18.2997C18.3442 10.1663 18.3775 10.1897 18.3997 10.2108C18.6453 10.2897 18.8775 10.3786 19.0997 10.5008L19.5219 10.6897C19.624 10.7441 19.7385 10.8272 19.8375 10.8991C19.9002 10.9446 19.9566 10.9856 19.9997 11.0119C20.0179 11.0226 20.0363 11.0333 20.0549 11.0442C20.1501 11.0998 20.2494 11.1577 20.3331 11.2219C21.5675 10.2786 23.0664 9.76745 24.6108 9.77856ZM27.5664 17.7786C28.0219 17.7663 28.4108 17.4008 28.4442 16.933V16.8008C28.4775 15.2441 27.5342 13.8341 26.0997 13.2897C25.6442 13.133 25.1442 13.3786 24.9775 13.8452C24.8219 14.3119 25.0664 14.823 25.5331 14.9886C26.2453 15.2552 26.7219 15.9563 26.7219 16.733V16.7674C26.7008 17.0219 26.7775 17.2674 26.9331 17.4563C27.0886 17.6452 27.3219 17.7552 27.5664 17.7786Z"
                                                fill="#A9A9A9"
                                            />
                                        </svg>
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
                                        onClick={(event) =>
                                            handleOpenCommentPopup(event, post.mediaId)
                                        }
                                    >
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="20" cy="20" r="20" fill="#EAEAEA" />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8.88818 20.017C8.88818 14.1638 13.566 8.88922 20.0215 8.88922C26.3326 8.88922 31.1104 14.0637 31.1104 19.9836C31.1104 26.8495 25.5104 31.1114 19.9993 31.1114C18.1771 31.1114 16.1549 30.6218 14.5326 29.6648C13.966 29.3199 13.4882 29.0639 12.8771 29.2642L10.6326 29.9319C10.066 30.1099 9.55485 29.6648 9.72152 29.0639L10.466 26.5713C10.5882 26.2263 10.566 25.8591 10.3882 25.5698C9.43263 23.8116 8.88818 21.8865 8.88818 20.017ZM18.5548 20.017C18.5548 20.8071 19.1882 21.4414 19.9771 21.4525C20.766 21.4525 21.3993 20.8071 21.3993 20.0282C21.3993 19.2381 20.766 18.6038 19.9771 18.6038C19.1993 18.5927 18.5548 19.2381 18.5548 20.017ZM23.6775 20.0283C23.6775 20.8072 24.3108 21.4526 25.0997 21.4526C25.8886 21.4526 26.5219 20.8072 26.5219 20.0283C26.5219 19.2382 25.8886 18.6039 25.0997 18.6039C24.3108 18.6039 23.6775 19.2382 23.6775 20.0283ZM14.8549 21.4525C14.0771 21.4525 13.4326 20.8071 13.4326 20.0282C13.4326 19.2381 14.066 18.6038 14.8549 18.6038C15.6437 18.6038 16.2771 19.2381 16.2771 20.0282C16.2771 20.8071 15.6437 21.4414 14.8549 21.4525Z"
                                                fill="#A9A9A9"
                                            />
                                        </svg>

                                        <h4 className={styles.interactionText}>
                                            {post.comments.length}
                                        </h4>
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
                                        onClick={(event) =>
                                            handleBookmarkClick(event, post.mediaId)
                                        }
                                    >
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="20" cy="20" r="20" fill="#EAEAEA" />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.5548 9.22223H23.4104C26.4215 9.22223 28.8548 10.4111 28.8881 13.4333V30.3C28.8881 30.4889 28.8437 30.6778 28.7548 30.8445C28.6104 31.1111 28.3659 31.3111 28.0659 31.4C27.777 31.4889 27.4548 31.4445 27.1881 31.2889L19.9881 27.6889L12.777 31.2889C12.6115 31.3767 12.4215 31.4333 12.2326 31.4333C11.6104 31.4333 11.1104 30.9222 11.1104 30.3V13.4333C11.1104 10.4111 13.5548 9.22223 16.5548 9.22223ZM15.7997 17.6889H24.1664C24.6442 17.6889 25.0331 17.2989 25.0331 16.8112C25.0331 16.3223 24.6442 15.9334 24.1664 15.9334H15.7997C15.3219 15.9334 14.9331 16.3223 14.9331 16.8112C14.9331 17.2989 15.3219 17.6889 15.7997 17.6889Z"
                                                fill="#A9A9A9"
                                            />
                                        </svg>

                                        <h4 className={styles.interactionText}>
                                            {post.collections
                                                ? Object.entries(post.collections).length
                                                : 0}
                                        </h4>
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
                                        onClick={(event) =>
                                            handleOpenSharePopup(event, post.mediaId)
                                        }
                                        // onClick={(event) => handleClickMore(event, post.mediaId)}
                                    >
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="20" cy="20" r="20" fill="#EAEAEA" />
                                            <path
                                                d="M32.1078 16.4905L24.7608 9.17628C24.579 8.9953 24.3639 8.90479 24.1151 8.90479C23.8664 8.90479 23.6511 8.9953 23.4694 9.17628C23.2876 9.35736 23.1966 9.57167 23.1966 9.81925V13.4764H19.9824C13.1613 13.4764 8.97626 15.3955 7.4263 19.2336C6.91943 20.5096 6.66602 22.0955 6.66602 23.9907C6.66602 25.5716 7.27351 27.7191 8.48839 30.4335C8.51703 30.5003 8.56709 30.6143 8.63897 30.7762C8.70242 30.9196 8.76698 31.0624 8.83267 31.2048C8.89026 31.3284 8.95249 31.4332 9.01938 31.5188C9.13407 31.6808 9.26807 31.7619 9.42116 31.7619C9.56465 31.7619 9.67708 31.7143 9.75845 31.6191C9.83962 31.524 9.88028 31.4048 9.88028 31.2623C9.88028 31.1763 9.86832 31.0503 9.84435 30.8835C9.82042 30.7168 9.80841 30.6051 9.80841 30.5479C9.76051 29.9005 9.73659 29.3143 9.73659 28.7909C9.73659 27.8291 9.82042 26.9671 9.98769 26.2053C10.1552 25.4433 10.3872 24.7839 10.6838 24.2267C10.9804 23.6693 11.3629 23.1887 11.8318 22.7839C12.3004 22.3791 12.805 22.0483 13.3455 21.7911C13.8861 21.5338 14.5222 21.3314 15.2541 21.1839C15.9858 21.0363 16.7224 20.9338 17.4639 20.8767C18.2054 20.8195 19.0448 20.791 19.9824 20.791H23.1966V24.4483C23.1966 24.6958 23.2874 24.9102 23.4691 25.0911C23.651 25.2719 23.8662 25.3625 24.1148 25.3625C24.3635 25.3625 24.5788 25.2719 24.7608 25.0911L32.1077 17.7766C32.2895 17.5956 32.3803 17.3814 32.3803 17.1338C32.3802 16.8862 32.2895 16.6718 32.1078 16.4905Z"
                                                fill="#A9A9A9"
                                            />
                                        </svg>

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
                                        onClick={(event) => handleClickMore(event, post.mediaId)}
                                    >
                                        <svg
                                            className={styles.button}
                                            // onClick={toggleMenu}
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="20" cy="20" r="20" fill="#EAEAEA" />
                                            <path
                                                d="M9.91154 23.2445C8.30595 23.2445 7 21.9392 7 20.3334C7 18.7284 8.30595 17.4222 9.91154 17.4222C11.5171 17.4222 12.8231 18.7283 12.8231 20.3334C12.823 21.9392 11.5171 23.2445 9.91154 23.2445ZM20.1697 23.2445C18.5641 23.2445 17.2582 21.9392 17.2582 20.3334C17.2582 18.7284 18.5641 17.4222 20.1697 17.4222C21.775 17.4222 23.0812 18.7283 23.0812 20.3334C23.0812 21.9392 21.775 23.2445 20.1697 23.2445ZM30.7551 23.2445C29.1498 23.2445 27.8436 21.9392 27.8436 20.3334C27.8436 18.7284 29.1497 17.4222 30.7551 17.4222C32.3605 17.4222 33.6667 18.7283 33.6667 20.3334C33.6667 21.9392 32.3605 23.2445 30.7551 23.2445Z"
                                                fill="#A9A9A9"
                                            />
                                        </svg>

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
                                        {/* <h4>{post.mediaId}</h4> */}
                                        <MenuItem
                                            onClick={handleClose}
                                            className={styles.menuItems}
                                        >
                                            <div className={styles.menuItemsSvgs}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M12.1213 15.436L12.1213 3.39502"
                                                        stroke="#222222"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M15.0374 12.5083L12.1214 15.4363L9.20535 12.5083"
                                                        stroke="#222222"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M16.7541 8.12793H17.6871C19.7221 8.12793 21.3711 9.77693 21.3711 11.8129V16.6969C21.3711 18.7269 19.7261 20.3719 17.6961 20.3719L6.55609 20.3719C4.52109 20.3719 2.87109 18.7219 2.87109 16.6869V11.8019C2.87109 9.77293 4.51709 8.12793 6.54609 8.12793L7.48809 8.12793"
                                                        stroke="#222222"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            Save Video
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleClose}
                                            className={styles.menuItems}
                                        >
                                            <div className={styles.menuItemsSvgs}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M10.1182 6.69974L10.1126 6.70486C10.0094 6.79959 9.92636 6.91423 9.86859 7.04189C9.81081 7.16954 9.77947 7.30757 9.77646 7.44765C9.77344 7.58774 9.79881 7.72699 9.85104 7.85701C9.90326 7.98704 9.98126 8.10514 10.0803 8.20422C10.1794 8.3033 10.2975 8.38131 10.4276 8.43353C10.5576 8.48575 10.6968 8.51112 10.8369 8.50811C10.977 8.50509 11.115 8.47375 11.2427 8.41598C11.3703 8.35821 11.485 8.2752 11.5797 8.17194L11.5848 8.16636L11.5902 8.161L14.449 5.3037L14.4492 5.30344C15.013 4.74117 15.7767 4.42542 16.5729 4.42542C17.3691 4.42542 18.1328 4.74117 18.6966 5.30344L18.6972 5.30409C19.2595 5.86783 19.5752 6.63154 19.5752 7.42775C19.5752 8.22396 19.2595 8.98768 18.6972 9.55142L18.6969 9.55174L15.8396 12.409L15.8313 12.4173L15.8312 12.4172C15.7295 12.5123 15.648 12.6269 15.5915 12.7542C15.5349 12.8814 15.5046 13.0188 15.5023 13.158C15.4999 13.2972 15.5256 13.4355 15.5777 13.5646C15.6299 13.6937 15.7075 13.811 15.806 13.9095C15.9044 14.008 16.0216 14.0857 16.1507 14.1379C16.2797 14.1902 16.418 14.216 16.5572 14.2137C16.6964 14.2115 16.8338 14.1813 16.9611 14.1249C17.0884 14.0684 17.2031 13.987 17.2983 13.8854L17.3061 13.877L17.3062 13.8772L20.1648 11.0186L10.1182 6.69974ZM10.1182 6.69974L10.1236 6.69438M10.1182 6.69974L10.1236 6.69438M10.1236 6.69438L12.9806 3.8359C13.934 2.88439 15.2259 2.35 16.5729 2.35C17.9198 2.35 19.2117 2.88433 20.1651 3.83573M10.1236 6.69438L20.1651 3.83573M20.1651 3.83573C21.1163 4.78885 21.6505 6.08042 21.6505 7.42701C21.6505 8.77363 21.1163 10.0652 20.165 11.0184L20.1651 3.83573ZM7.42775 21.6494L7.42707 21.6494C6.7602 21.6507 6.09965 21.5202 5.48334 21.2655C4.8671 21.0108 4.30723 20.6369 3.8359 20.1653C2.88439 19.2119 2.35 17.9199 2.35 16.5729C2.35 15.2259 2.88439 13.934 3.8359 12.9806L6.69438 10.1236L6.69974 10.1182L6.70486 10.1126C6.79959 10.0094 6.91423 9.92636 7.04188 9.86859C7.16954 9.81081 7.30757 9.77948 7.44765 9.77646C7.58774 9.77344 7.72699 9.79881 7.85701 9.85104C7.98704 9.90326 8.10514 9.98126 8.20422 10.0803C8.3033 10.1794 8.3813 10.2975 8.43353 10.4276C8.48575 10.5576 8.51112 10.6968 8.50811 10.8369C8.50509 10.977 8.47375 11.115 8.41598 11.2427C8.35821 11.3703 8.2752 11.485 8.17194 11.5797L8.16636 11.5848L8.161 11.5902L5.3037 14.449L5.30344 14.4492C4.74117 15.013 4.42542 15.7767 4.42542 16.5729C4.42542 17.3691 4.74117 18.1328 5.30344 18.6966L5.30409 18.6972C5.86783 19.2595 6.63154 19.5752 7.42775 19.5752C8.22396 19.5752 8.98768 19.2595 9.55142 18.6972L9.55168 18.697L12.4105 15.8397L12.4158 15.8343L12.421 15.8287C12.5157 15.7255 12.6303 15.6425 12.758 15.5847L12.6137 15.2658L12.758 15.5847C12.8856 15.5269 13.0237 15.4956 13.1637 15.4926C13.3038 15.4895 13.4431 15.5149 13.5731 15.5671L13.7036 15.2424L13.5731 15.5671C13.7031 15.6194 13.8212 15.6974 13.9203 15.7964C14.0194 15.8955 14.0974 16.0136 14.1496 16.1436C14.2018 16.2737 14.2272 16.4129 14.2242 16.553C14.2212 16.6931 14.1898 16.8311 14.1321 16.9588L14.4509 17.1031L14.1321 16.9588C14.0743 17.0864 13.9913 17.2011 13.888 17.2958L13.8825 17.3009L13.8771 17.3063L11.0199 20.165C11.0198 20.165 11.0198 20.1651 11.0198 20.1651C10.03 21.1548 8.72903 21.6494 7.42775 21.6494ZM5.34965 21.589C6.00856 21.8613 6.71478 22.0008 7.42775 21.9994L5.34965 21.589Z"
                                                        fill="#222222"
                                                        stroke="white"
                                                        strokeWidth="0.7"
                                                    />
                                                    <path
                                                        d="M8.4011 14.1326L8.40123 14.1327L8.40935 14.1246L14.1246 8.40785C14.1246 8.40783 14.1246 8.4078 14.1246 8.40778C14.3193 8.21321 14.5833 8.10391 14.8585 8.10391C15.1338 8.10391 15.3978 8.21324 15.5925 8.40785C15.7866 8.60246 15.8956 8.86611 15.8956 9.14098C15.8956 9.41598 15.7865 9.67975 15.5922 9.87439L9.87712 15.591L9.87699 15.5908L9.86902 15.5994C9.77392 15.701 9.65935 15.7825 9.5321 15.839C9.40486 15.8955 9.26756 15.9259 9.12836 15.9282C8.98916 15.9306 8.85091 15.9049 8.72183 15.8527C8.59275 15.8006 8.47548 15.723 8.377 15.6246C8.27852 15.5262 8.20084 15.409 8.14858 15.2799C8.09632 15.1509 8.07054 15.0127 8.07279 14.8735C8.07504 14.7343 8.10526 14.5969 8.16166 14.4696C8.21807 14.3424 8.29949 14.2277 8.4011 14.1326Z"
                                                        fill="#222222"
                                                        stroke="white"
                                                        strokeWidth="0.7"
                                                    />
                                                </svg>
                                            </div>
                                            Copy Link
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleClose}
                                            className={styles.menuItems}
                                        >
                                            <div className={styles.menuItemsSvgs}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M17.0061 5.79106L17.1264 5.67069L16.9919 5.56642C15.6121 4.49718 13.8851 3.84997 12 3.84997C7.49715 3.84997 3.85001 7.49717 3.85001 12C3.85001 13.8851 4.49717 15.6121 5.56641 16.9919L5.67068 17.1265L5.79105 17.0061L17.0061 5.79106ZM6.99393 18.2089L6.87356 18.3293L7.00812 18.4336C8.38792 19.5028 10.1149 20.15 12 20.15C16.5028 20.15 20.15 16.5029 20.15 12C20.15 10.115 19.5028 8.38798 18.4335 7.00813L18.3293 6.87357L18.2089 6.99394L6.99393 18.2089ZM2.15 12C2.15 6.55787 6.55785 2.15 12 2.15C17.4421 2.15 21.85 6.55782 21.85 12C21.85 17.4422 17.4421 21.85 12 21.85C6.55785 21.85 2.15 17.4421 2.15 12Z"
                                                        fill="#222222"
                                                        stroke="white"
                                                        strokeWidth="0.3"
                                                    />
                                                </svg>
                                            </div>
                                            Not Interested
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleReportClick}
                                            // onClick={() => showReport(post.mediaId)}
                                            className={styles.menuItems}
                                        >
                                            <div className={styles.menuItemsSvgs}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M11.9767 2.15016L11.9767 2.15017C15.1762 3.97821 18.5954 3.99158 21.7969 2.18996V14.7852C20.1816 15.7035 18.5432 16.1505 16.9219 16.1505C15.292 16.1505 13.6462 15.6992 12.0233 14.7717L12.0233 14.7717C8.92693 13.0025 5.62454 12.9496 2.511 14.5827L2.20312 14.7442V2.09529L3.16793 1.65981C6.07502 0.34764 9.07962 0.494742 11.9767 2.15016Z"
                                                        stroke="#222222"
                                                        strokeWidth="1.5"
                                                    />
                                                </svg>
                                            </div>
                                            Report
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleClose}
                                            className={styles.menuItems}
                                        >
                                            <div className={styles.menuItemsSvgs}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M15.8325 8.17463L10.109 13.9592L3.59944 9.88767C2.66675 9.30414 2.86077 7.88744 3.91572 7.57893L19.3712 3.05277C20.3373 2.76963 21.2326 3.67283 20.9456 4.642L16.3731 20.0868C16.0598 21.1432 14.6512 21.332 14.0732 20.3953L10.106 13.9602"
                                                        stroke="#222222"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
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
                ))}
            </div>
        </>
    );
};
