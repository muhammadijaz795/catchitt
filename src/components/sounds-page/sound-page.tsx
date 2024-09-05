import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import profileIcon from '../../assets/defaultProfileIcon.png';
import exampleSound from '../../assets/exampleSound.png';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './sound-page.module.scss';
// import Bookmark from './svg-components/Bookmark.svg';
import { Bookmark } from './svg-components/Bookmark';
import Share from './svg-components/Default.png';
import playIcon from './svg-components/playIcon.png';
import ShareClicked from './svg-components/shareClicked.png';
// import { Post as PostType } from '../post/postTypes';
import ClipboardJS from 'clipboard';

export interface SoundPageProps {
    className?: string;
}

interface Sound {
    _id: string;
    isDeleted: boolean;
    title: string;
    owner: {
        _id: string;
        avatar: string;
        username: string;
        name: string;
        isVerified: boolean;
    };
    mediaId: {
        _id: string;
        description: string;
        user_id: string;
    };
    usedCount: number;
    category: {
        _id: string;
        name: string;
        isActive: boolean;
    };
    bookmarks: number;
    bookmarkedUsers: any[]; // You can define a proper type for this if possible.
    createdTime: number;
    lastModifiedTime: number;
    __v: number;
    url: string;
    isBookmarked: boolean;
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
    comments: Comment[]; // You can define a proper type for comments if possible.
    isLiked: boolean;
    category: string;
    type: string;
    receivedGifts: any[]; // You can define a proper type for gifts if possible.
    taggedUsers: any[]; // You can define a proper type for users if possible.
    sound: {
        _id: string;
        url: string;
        owner: {
            _id: string;
            avatar: string;
            username: string;
            name: string;
            isVerified: boolean;
        };
        title: string;
        category: {
            _id: string;
            name: string;
            isActive: boolean;
        };
        isBookmarked: boolean;
    };
}

export const SoundPage = (className: SoundPageProps) => {
    const clipboard = new ClipboardJS('btn');
    const { soundId } = useParams();
    const extractedValue = soundId?.replace('soundId=', '');
    let globalUserId: string = '';
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = localStorage.getItem('token');
    const [currentPage] = useState(1);
    const itemsPerPage = 9;
    const [errorMessage, setErrorMessage] = useState('');
    const [soundData, setSoundData] = useState<Sound>();
    const [postData, setPostData] = useState<Post[]>([]);

    // const [followedUsersData, setFollowedUsersData] = useState<FollowedUser[]>([]);
    const API_KEY = process.env.VITE_API_URL;
    const soundEndPoint = '/media-content/sound';
    // const [followLoading, setFollowLoading] = useState(false);

    const navigate = useNavigate();

    const handleFetchPosts = async (page?: number) => {
        const response = await fetch(`${API_KEY}/media-content/videos/sound/${extractedValue}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            setPostData(responseData.data);
        } else {
            console.log(response);
        }
    };

    const handleFetchSound = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/sound?${soundId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setSoundData(responseData.data);
            } else {
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchSound();
        handleFetchPosts();
    }, []);

    useEffect(() => {
        handleFetchSound();
    }, [setSoundData]);

    const [linkCopied, setLinkCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const handleCopyToClipboard = () => {
        // Get the current URL
        const currentURL = window.location.href;

        // Create a temporary input element to copy the URL
        const tempInput = document.createElement('input');
        tempInput.value = currentURL;

        // Append the input element to the DOM (necessary for copying)
        document.body.appendChild(tempInput);

        // Select the input element
        tempInput.select();

        // Copy the URL to the clipboard
        document.execCommand('copy');

        // Remove the temporary input element from the DOM
        document.body.removeChild(tempInput);
        setLinkCopied(true);
        handleTooltipOpen();
    };

    const handleBookmarking = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/toggleBookmarkSound`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ soundId: extractedValue }),
            });

            if (response.ok) {
                // Toggle the bookmark status here
                // setBookMarkStatus(!bookMarkStatus);
                handleFetchSound();
            } else {
                console.error('Failed to toggle bookmark:', response.status);
            }

            console.log(response);
        } catch (error) {
            console.error('Error during bookmarking:', error);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    return (
        soundData && (
            <div className={styles.root}>
                <div className={styles.topBarDiv}>
                    <TopBar />
                </div>

                <div className={styles.container}>
                    <div className={styles.leftSide}>
                        <div className={styles.sideNavDiv}>
                            <SideNavBar selectedIndex={3} />
                        </div>
                        <div className={styles.suggestedActivityDiv}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div>
                    <div className={styles.middleSectionDiv}>
                        <div className={styles.pageHeader}>
                            <div className={styles.suggestedContent2}>
                                <img
                                    src={soundData.owner.avatar === '' ? exampleSound : ''}
                                    alt=""
                                    style={{
                                        minWidth: '130px',
                                        minHeight: '130px',
                                    }}
                                />
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 3fr',
                                        textAlign: 'end',
                                    }}
                                >
                                    <div
                                        className={styles.soundInfo}
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <h6 className={styles.soundTitle}>{soundData.title}</h6>
                                        <h6 className={styles.soundArtist}>
                                            {soundData.owner.name}
                                        </h6>
                                        <h6 className={styles.soundUsed}>
                                            {soundData.usedCount} Videos
                                        </h6>
                                    </div>
                                    <div>
                                        <IconButton onClick={handleBookmarking}>
                                            {/* {soundData.isBookmarked ? (
                                            <Bookmark bookmarked={true} />
                                        ) :
                                            <Bookmark bookmarked={false} />
                                        } */}
                                            <Bookmark bookmarked={soundData.isBookmarked} />
                                        </IconButton>
                                        <ClickAwayListener onClickAway={handleTooltipClose}>
                                            <Tooltip
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose}
                                                open={open}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title="Link copied!"
                                            >
                                                <IconButton>
                                                    <img
                                                        src={
                                                            linkCopied === true
                                                                ? ShareClicked
                                                                : Share
                                                        }
                                                        alt=""
                                                        onClick={handleCopyToClipboard}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.postsList}>
                            {postData?.map((post, index) => (
                                <div className={styles.postCard} key={index}>
                                    <img
                                        src={post.thumbnailUrl}
                                        alt=""
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <h6>{post.description}</h6>
                                    <div className={styles.postInfo}>
                                        <div className={styles.postCreatorInfo}>
                                            <img
                                                src={
                                                    post.user.avatar === ''
                                                        ? profileIcon
                                                        : post.user.avatar
                                                }
                                                alt=""
                                            />
                                            <p>{post.user.name}</p>
                                        </div>
                                        <div className={styles.viewsDiv}>
                                            <img src={playIcon} alt="" />
                                            <p>{post.views}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
