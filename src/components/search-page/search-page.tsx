import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab } from 'react-tabs';
import profileIcon from '../../assets/defaultProfileIcon.png';
import filterIcon from '../../assets/filterIcon.png';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import playIcon from '../sounds-page/svg-components/playIcon.png';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './search-page.module.scss';


interface User {
    _id: string;
    avatar: string;
    name: string;
    username: string;
    isVerified: boolean;
    isFollowed: boolean;
    numberOfFollowers: number;
}

interface Video {
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
        _id: string,
        url: string,
        owner: {
            _id: string,
            avatar: string,
            username: string,
            name: string,
            isVerified: boolean
        },
        title: string,
        category: {
            _id: string,
            name: string,
            isActive: boolean
        },
        isBookmarked: boolean
    },
}

interface Hashtag {
    _id: string;
    name: string;
}

interface Sound {
    usedCount?: number;
    category?: string | null;
    bookmarks?: number;
    bookmarkedUsers?: string[];
    _id: string;
    isDeleted: boolean;
    title: string;
    owner: {
        _id: string;
        avatar: string;
        name: string;
        username: string;
        isVerified: boolean;
    };
    mediaId?: string | null;
    createdTime: number;
    lastModifiedTime: number;
    __v?: number;
}

interface FollowedUser {
    _id: string;
    followed_userID: {
        _id: string;
        avatar: string;
        username: string;
        name: string;
        isVerified: boolean;
    };
}


export const SearchPage = () => {
    const { query } = useParams();
    const extractedValue = query?.replace('query=', '');
    const [searchQuery, setSearchQuery] = useState(extractedValue);
    const [searchResults, setSearchResults] = useState({
        usersData: [],
        videosData: [],
        soundsData: [],
        hashtagsData: [],
    });
    const [selectedTab, setSelectedTab] = useState('All');
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const selectedIndex = useAuthStore((state) => state.selectedIndex)
    const loggedUserId = useAuthStore((state) => state._id)
    let globalUserId = loggedUserId;
    const [followedUsersData, setFollowedUsersData] = useState<FollowedUser[]>([]);
    const [searchResultsData, setSearchResultsData] = useState({
        first3Users: [],
        first3Videos: [],
        first3Sounds: [],
        first3Hashtags: [],
    });



    const handleFetchSearch = async () => {
        try {
            const response = await fetch(`${API_KEY}/discover/search?searchQuery=${searchQuery}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                const { users, videos, hashtags, sounds } = responseData.data;
                const usersData = users.data;
                const videosData = videos.data;
                const hashtagsData = hashtags.data;
                const soundsData = sounds.data;
                // Update the state with the extracted data
                setSearchResults({ usersData, videosData, hashtagsData, soundsData });
                console.log(`the search results: `);
                console.log(responseData.data);
                // handleFetchActivity;
            }

        } catch (error) {
            // Handle any errors here.
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchSearch();
    }, [searchQuery]);

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const handleTabChange = (tab: any) => {
        setSelectedTab(tab);
    };

    const handleFollowClick = async (userId: any) => {
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
            console.log(`user: ${userId} is followed`);
            // console.log(`the triggered notification user is: ${activi}`)
            if (loggedUserId) {
                handleFetchFollowedUsers(loggedUserId);
            }
        }
    };

    const handleFetchFollowedUsers = async (userId: string) => {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/followers`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setFollowedUsersData(responseData.data.data);
                console.log(`the users I'm following: `);
                console.log(responseData.data);
                // handleFetchActivity;
            }

        } catch (error) {
            // Handle any errors here.
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchSearch();
        // handleFetchFollowedUsers(globalUserId);
    }, [followedUsersData]);

    useEffect(() => {
        // handleFetchSearch();
        if (loggedUserId)
            handleFetchFollowedUsers(loggedUserId);
    }, []);

    const renderSearchResults = () => {
        const { usersData, videosData, soundsData, hashtagsData } = searchResults;

        switch (selectedTab) {
            case 'All':
                return renderVideosSearchResults(videosData);
            case 'Videos':
                return renderVideosSearchResults(videosData);
            case 'Sounds':
                return renderSoundsSearchResults(soundsData);
            case 'Users':
                return renderUsersSearchResults(usersData);
            // case 'Hashtags':
            //     return renderHashtagsSearchResults(hashtagsData);
            default:
                return null;
        }
    };

    const renderVideosSearchResults = (videosData: Video[]) => {
        return (
            <div className={styles.postsList}>
                {videosData.map((video: Video, index) => (
                    <div className={styles.postCard} key={index}>
                        <img src={video.user.avatar} alt='' style={{ 'objectFit': 'cover' }} />
                        <h6 className={styles.videoDescription}>{video.description}</h6>
                        <div className={styles.postInfo}>
                            <div className={styles.postCreatorInfo}>
                                <img src={video.user.avatar === '' ? profileIcon : video.user.avatar} alt='' />
                                <p>{video.user.name}</p>
                            </div>
                            <div className={styles.viewsDiv}>
                                <img src={playIcon} alt='' />
                                <p>
                                    {video.views}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    const renderSoundsSearchResults = (soundsData: Sound[]) => {
        return (
            <div className={styles.postsList}>
                {soundsData?.map((sound, index) => (
                    <div className={styles.postCard} key={index}>
                        <img src={sound.owner.avatar} alt='' style={{ 'objectFit': 'cover' }} />
                        <h6>{sound.title}</h6>
                        <div className={styles.postInfo}>
                            <div className={styles.postCreatorInfo}>
                                <img src={sound.owner.avatar === '' ? profileIcon : sound.owner.avatar} alt='' />
                                <p>{sound.owner.name}</p>
                            </div>
                            <div className={styles.viewsDiv}>
                                <img src={playIcon} alt='' />
                                <p>
                                    {sound.usedCount}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderUsersSearchResults = (usersData: User[]) => {
        return (
            <div className={styles.usersList}>
                {usersData?.map((user, index) => (
                    <div className={styles.userFrame} key={index}>
                        <img src={user.avatar === '' ? profileIcon : user.avatar} alt='' className={styles.userImg} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: 'inherit' }}>
                            <div className={styles.userInfo}>
                                <h4 className={styles.userNameText}>@{user.username}</h4>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <p>{user.name}</p>
                                    <p>.</p>
                                    <p><span style={{ fontWeight: '600' }}>{user.numberOfFollowers}</span> followers</p>
                                </div>
                            </div>
                            <div className={styles.viewsDiv}>
                                <button
                                    className={followedUsersData.length > 0 && followedUsersData.some(user => user.followed_userID._id === user._id) || user.isFollowed ? styles.followingBtn : styles.followBtn}
                                    onClick={(event) =>
                                        handleFollowClick(user._id)
                                    }
                                >
                                    {followedUsersData.some(user => user.followed_userID._id === user._id) || user.isFollowed ? 'Following' : 'Follow'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };



    return (
        <div>
            <div className={styles.topBarDiv}>
                <TopBar searchBar={false} />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv} >
                        <SideNavBar selectedIndex={selectedIndex} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.searchBar}>
                        <TextField
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{
                                type: 'search',
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton size="small">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => setSearchQuery('')}>
                                            {searchQuery === '' ? '' :
                                                <ClearIcon />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                marginTop: '40px',
                                marginBottom: '40px',
                                '& .MuiInputBase-root': {
                                    borderRadius: '4px',
                                    position: 'static',
                                    margin: '0',
                                    padding: '0px 5px 0px 16px',
                                    height: '40px',
                                    maxHeight: '40px',
                                    top: '-120px',
                                    border: '0 solid black',
                                    boxShadow: '0 3px 4px rgba(0, 0, 0, 0)',
                                    fontSize: '16px',
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: '21px',
                                    color: '#acacac',
                                    background:
                                        'no-repeat padding-box border-box 20px center / auto scroll url(../../assets/Search.svg) #f8f8f8',
                                    backgroundSize: '3%',
                                    width: '542px',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    width: '542px',
                                },
                            }}
                        />
                        <IconButton sx={{ padding: '0' }}>
                            <img src={filterIcon} alt='' style={{
                                width: '40px', height: '40px'
                            }} />
                        </IconButton>
                    </div>

                    <div className={styles.searchTabs}>
                        <Tab onClick={() => handleTabChange('All')} className={selectedTab === 'All' ? styles.searchTabsSelected : styles.searchTab}>All</Tab>
                        <Tab onClick={() => handleTabChange('Videos')} className={selectedTab === 'Videos' ? styles.searchTabsSelected : styles.searchTab}>Videos</Tab>
                        <Tab onClick={() => handleTabChange('Sounds')} className={selectedTab === 'Sounds' ? styles.searchTabsSelected : styles.searchTab}>Sounds</Tab>
                        <Tab onClick={() => handleTabChange('Users')} className={selectedTab === 'Users' ? styles.searchTabsSelected : styles.searchTab}>Users</Tab>
                    </div>
                    <div className={styles.container}>
                        {renderSearchResults()}
                    </div>
                </div>
            </div>
        </div>
    );
};
