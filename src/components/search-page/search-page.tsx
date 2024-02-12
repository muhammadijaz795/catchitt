import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, Modal, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab } from 'react-tabs';
import profileIcon from '../../assets/defaultProfileIcon.png';
import filterIcon from '../../assets/filterIcon.png';
import hashtagIcon from '../../assets/hashtagIcon.png';
import Layout from '../../shared/layout';
import { useAuthStore } from '../../store/authStore';
import { HashtagsPage } from '../hashtags-page/hashtags-page';
import useDebounce from '../reusables/useDebounce';
import playIcon from '../sounds-page/svg-components/playIcon.png';
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
    createdTime: number;
    lastModifiedTime: number;
    isDeleted: boolean;
    active: boolean;
    views: number;
    relatedVideos: string[];
    name: string;
    __v: number;
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
    const [showHashtagPage, setShowHashtagPage] = useState(false)
    const navigate = useNavigate();
    const { query, tab } = useParams();
    const extractedValue = query?.replace('query=', '');
    const extractedTab = tab || "All"; // Set a default value of "All" if tab is not present
    const [searchQuery, setSearchQuery] = useState(extractedValue);
    const [paginating, setPaginating] = useState(false)
    const [searchResults, setSearchResults] = useState<{
        usersData: any[];
        videosData: any[];
        hashtagsData: any[];
        soundsData: any[];
    }>({
        usersData: [],
        videosData: [],
        hashtagsData: [],
        soundsData: [],
    });
    const [selectedTab, setSelectedTab] = useState(extractedTab);
    const refPage = useRef(1)
    const mySearch = useRef('')
    const [pageSize, setPageSize] = useState(10)
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const selectedIndex = useAuthStore((state) => state.selectedIndex)
    const loggedUserId = useAuthStore((state) => state._id)
    const [applyFilter, setApplyFilter] = useState(false)
    let globalUserId = loggedUserId;
    const [followedUsersData, setFollowedUsersData] = useState<FollowedUser[]>([]);
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);

    //Videos Filters and Sort
    const [videosFilter, setVideosFilter] = useState({ relevance: true, count: false, category: 'all' })
    const [usersFilter, setUsersFilter] = useState({ limit: 0, category: 'all' })
    const [soundsFilter, setSoundsFilter] = useState({ filter: 'title', sort: 'relevance' })
    const searches = useRef([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleFetchSearch = async (query?: string, page?: number) => {
        try {
            const response = await fetch(`${API_KEY}/discover/search?searchQuery=${query}&page=${page ? page : 1}`, {
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
                console.log(`the search results: `);
                console.log(responseData.data);
                if (page != 1) {
                    setSearchResults((prevResults) => ({
                        usersData: [...prevResults.usersData, ...usersData],
                        videosData: [...prevResults.videosData, ...videosData],
                        hashtagsData: [...prevResults.hashtagsData, ...hashtagsData],
                        soundsData: [...prevResults.soundsData, ...soundsData],
                    }));
                } else {
                    setSearchResults({
                        usersData,
                        videosData,
                        hashtagsData,
                        soundsData,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setSearchResults({
            usersData: [],
            videosData: [],
            hashtagsData: [],
            soundsData: [],
        })
        setPage(1)
        typingDebouncedFetchSearch(searchQuery, 1);
    }, [searchQuery]);

    useEffect(() => {
        typingDebouncedFetchSearch(searchQuery, page);
    }, [followedUsersData, page])

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
        setPage(1)
    };

    const typingDebouncedFetchSearch = useCallback(throttle(handleFetchSearch, 1500), []);

    const handleTabChange = (tab: any) => {
        setOpen(false);
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
        // handleFetchSearch();
        if (loggedUserId)
            handleFetchFollowedUsers(loggedUserId);
    }, []);

    const renderVideosSearchResults = (videosData: Video[]) => {
        // Create a filteredVideosData array based on the selected checkboxes
        const filteredVideosData = videosData.filter((video) => {
            if (videosFilter.category === 'liked') {
                return video.isLiked; // Display videos where isLiked is true for "Liked"
            } else if (videosFilter.category === 'followed') {
                return video.user.isFollowed; // Display videos where user is followed for "People you follow"
            }
            return true; // Default to true if no checkbox is selected
        });
        // Sort the filtered videos based on 'likes' in descending order when 'selectedLikeCountVideos' is true
        if (videosFilter.count) {
            filteredVideosData.sort((a, b) => b.likes - a.likes);
        }

        return (
            <>
                {filteredVideosData.length === 0 ? (
                    <div className={styles.usersList} style={{ alignItems: 'center' }}>
                        <h6 style={{ fontSize: '2rem' }}>No results found</h6>
                    </div>
                ) : (
                    <div className={styles.postsList}>
                        {filteredVideosData.map((video: Video, index) => (
                            <div className={styles.postCard} key={index}>
                                {/* Render your video card content here */}
                                <img src={video.user.avatar} alt='' style={{ 'objectFit': 'cover' }} />
                                <h6 className={styles.videoDescription}>{video.description}</h6>
                                <div className={styles.postInfo}>
                                    <div className={styles.postCreatorInfo}>
                                        <img src={video.user.avatar === '' ? profileIcon : video.user.avatar} alt='' />
                                        <p>{video.user.name}</p>
                                    </div>
                                    <div className={styles.viewsDiv}>
                                        <img src={playIcon} alt='' />
                                        <p>{video.views}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>

        );

    };

    const renderSoundsSearchResults = (soundsData: Sound[]) => {

        let sortedSounds = soundsData.sort((a, b) => {
            if (soundsFilter.sort === 'used' && a.usedCount && b.usedCount) {
                return a.usedCount - b.usedCount
            } else if (soundsFilter.sort === 'recent') {
                return a.createdTime - b.createdTime
            } else if (soundsFilter.sort === 'shortest') {
                return 0 // no data to sort this
            } else if (soundsFilter.sort === 'longest') {
                return 0 // no data to sort this
            } else {
                return 0
            }
        })

        let filteredSounds = sortedSounds.filter(s => {

            return soundsFilter.filter !== 'all' ?
                (soundsFilter.filter === 'title' && s.title.includes(searchQuery as string))
                || (soundsFilter.filter === 'creators' &&
                    (s.owner.name.includes(searchQuery as string) || (s.owner.username.includes(searchQuery as string)))
                )
                : true
        })

        return (
            <>
                {filteredSounds.length === 0 ? (
                    <div className={styles.usersList} style={{ alignItems: 'center' }}>
                        <h6 style={{ fontSize: '2rem' }}>No results found</h6>
                    </div>
                ) : (
                    <div className={styles.postsList}>
                        {filteredSounds?.map((sound, index) => (
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
                )}
            </>
        );
    };

    const renderUsersSearchResults = (usersData: User[]) => {
        const categoryFilter = usersData.filter((user) => {
            const isVerifiedMatch = usersFilter.category === 'verified' ? user.isVerified : true;
            const isFollowedMatch = usersFilter.category === 'followed' ? user.isFollowed : true;

            return (
                isVerifiedMatch &&
                isFollowedMatch
            );
        });

        const filteredUsersData = categoryFilter.filter((user) => {
            let userLimit = usersFilter.limit
            if (usersFilter.limit == 0)
                return true

            let limit = user.numberOfFollowers <= userLimit
                && user.numberOfFollowers > (userLimit == 1000 ? 0 : userLimit / 10)
            return limit
        })

        return (
            <>
                {filteredUsersData.length === 0 ? (
                    <div className={styles.usersList} style={{ alignItems: 'center' }}>
                        <h6 style={{ fontSize: '2rem' }}>No results found</h6>
                    </div>
                ) : (
                    <div className={styles.usersList}>
                        {filteredUsersData?.map((user, index) => (
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
                )}
            </>
        );
    };

    useEffect(() => {
        handleFetchSearch();
    }, [showHashtagPage])

    const [selectedHashtagName, setSelectedHashtagName] = useState('');
    const [selectedHashtagViews, setSelectedHashtagViews] = useState(0)

    const renderHashtagsSearchResults = (hashtagsData: Hashtag[]) => {
        if (showHashtagPage) {
            return (
                <div className={styles.hashtagDataList}>
                    <HashtagsPage hashtagName={selectedHashtagName} hashtagViews={selectedHashtagViews} />
                </div>
            );
        } else {
            return (
                <>
                    {hashtagsData.length === 0 ? (
                        <div className={styles.usersList} style={{ alignItems: 'center' }}>
                            <h6 style={{ fontSize: '2rem' }}>No results found</h6>
                        </div>
                    ) : (
                        <div className={styles.usersList}>
                            {hashtagsData?.map((hashtag, index) => (
                                <div
                                    className={styles.hashtagFrame}
                                    key={index}
                                    onClick={() => {
                                        setSelectedHashtagName(hashtag.name.substring(1,)); // Store the clicked hashtag's name
                                        setSelectedHashtagViews(hashtag.views)
                                        setShowHashtagPage(true);
                                        console.log('toggled the hashtag page');
                                    }}
                                >
                                    <img src={hashtagIcon} alt="" className={styles.hashtagIcon} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 'inherit' }}>
                                        <div className={styles.userInfo}>
                                            <h4 className={styles.userNameText}>{hashtag.name}</h4>
                                        </div>
                                        <div className={styles.viewsDiv}>
                                            <p>{hashtag.views} views</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            );
        }
    };


    function handleScroll(e: any) {
        e.preventDefault()
        const windowHeight = window.innerHeight;
        const documentHeight = document.querySelector('#root > div')?.scrollHeight as number;
        const scrollPosition = e.target.scrollTop;
        const threshold = 200;

        if (windowHeight + scrollPosition >= documentHeight - threshold) {
            dPaginate([])
        }
    }

    const paginate = async () => {
        setPaginating(true)
        setPage((prevPage) => prevPage + 1); // Increment the page state
        refPage.current++
        // handleFetchSearch(searchQuery, refPage.current)
    }
    const dPaginate = useDebounce(paginate, 4)

    useEffect(() => {
        document.querySelector('#root > div')?.addEventListener('scroll', handleScroll)
        return () => { document.querySelector('#root > div')?.removeEventListener('scroll', handleScroll) }
    }, [])

    const handleApplyClick = () => {
        setOpen(false); // Close the modal

        // Call the fetch function to apply sorting based on selected options
        handleFetchSearch(searchQuery, page);
        setApplyFilter(!applyFilter)
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '529px',
        maxHeight: '80%',
        padding: '32px',
        alignItems: 'center',
        gap: '24px',
        borderRadius: '8px',
        background: 'var(--default-white, #FFF)',
        overflow: 'auto'
    };

    const renderSearchResults = useMemo(() => {
        const { usersData, videosData, soundsData, hashtagsData } = searchResults;
        switch (selectedTab) {
            case 'Videos':
                return renderVideosSearchResults(videosData);
            case 'Sounds':
                return renderSoundsSearchResults(soundsData);
            case 'Users':
                return renderUsersSearchResults(usersData);
            case 'Hashtags':
                return renderHashtagsSearchResults(hashtagsData);
            default:
                return renderVideosSearchResults(videosData);
        }
    }, [
        searchQuery,
        selectedTab,
        applyFilter,
        searchResults
    ]);


    const VideosModal = useMemo(() => {
        // Add your modal content for 'Videos' tab here
        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h6 className={styles.filterModalTitle}>
                            Filter
                        </h6>
                        <div className={styles.filtersFrame}>
                            <h6 className={styles.filtersFrameTitle1}>Sort by</h6>
                        </div>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked
                                checked={videosFilter.relevance}
                                onChange={() => { setVideosFilter(prev => ({ ...prev, relevance: true, count: false })) }}
                                sx={{ '&.Mui-checked': { color: '#5448B2' }, }} />}
                                label="Relevance" sx={{ paddingBottom: '24px', borderBottom: '0.2px solid #B8B8B8;' }} />
                            <FormControlLabel control={<Checkbox
                                checked={videosFilter.count}
                                onChange={() => { setVideosFilter(prev => ({ ...prev, relevance: false, count: true })) }}
                                sx={{ '&.Mui-checked': { color: '#5448B2' }, }} />}
                                label="Like count" sx={{ padding: '24px 0 24px 0' }} />
                        </FormGroup>
                        <h6 className={styles.filtersFrameTitle1}>Video category</h6>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    defaultChecked={true}
                                    checked={videosFilter.category === 'all'}
                                    onChange={() => {
                                        if (videosFilter.category !== 'all') {
                                            setVideosFilter(prev => ({ ...prev, category: 'all' }));
                                        }
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="All"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.1px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={videosFilter.category === 'liked'}
                                    onChange={() => {
                                        setVideosFilter(prev => ({ ...prev, category: 'liked' }));
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="Liked"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.1px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={videosFilter.category === 'followed'}
                                    onChange={() => {
                                        setVideosFilter(prev => ({ ...prev, category: 'followed' }));
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="People you follow"
                                sx={{ padding: '24px 0 0px 0' }}
                            />
                        </FormGroup>
                        <Box sx={{ display: 'flex', padding: '24px 0 0 0', gap: '15.5px' }}>
                            <button onClick={handleApplyClick} className={styles.applyBtn}>
                                Apply
                            </button>
                            <button onClick={handleClose} className={styles.cancelBtn}>
                                Cancel
                            </button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        );
    }, [videosFilter, open]);

    const UsersModal = useMemo(() => {
        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h6 className={styles.filterModalTitle}>Filter</h6>
                        <div className={styles.filtersFrame}>
                            <h6 className={styles.filtersFrameTitle1}>Sort by</h6>
                        </div>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={usersFilter.limit === 0}
                                    onChange={() => setUsersFilter(prev => ({ ...prev, limit: 0 }))}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="No limit"
                                sx={{ paddingBottom: '24px', borderBottom: '0.2px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={usersFilter.limit === 1000}
                                    onChange={() => setUsersFilter(prev => ({ ...prev, limit: 1000 }))}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="0 to 1K"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.2px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={usersFilter.limit === 10000}
                                    onChange={() => setUsersFilter(prev => ({ ...prev, limit: 10000 }))}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="1K to 10K"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.2px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={usersFilter.limit === 100000}
                                    onChange={() => setUsersFilter(prev => ({ ...prev, limit: 100000 }))}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="10K to 100K"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.2px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={usersFilter.limit === 1000000}
                                    onChange={() => setUsersFilter(prev => ({ ...prev, limit: 1000000 }))}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="More than 100K"
                                sx={{ padding: '24px 0 24px 0' }}
                            />
                        </FormGroup>
                        {/* Add filtering options here */}
                        <h6 className={styles.filtersFrameTitle1}>Types of profiles</h6>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    defaultChecked={true}
                                    checked={usersFilter.category === 'all'}
                                    onChange={() => {
                                        setUsersFilter(prev => ({ ...prev, category: 'all' }));
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="All"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.1px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={usersFilter.category === 'verified'}
                                    onChange={() => {
                                        setUsersFilter(prev => ({ ...prev, category: 'verified' }));
                                        // setSelectedVerifiedUsers(!selectedVerifiedUsers);
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="Verified"
                                sx={{ padding: '24px 0 0px 0' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={usersFilter.category === 'followed'}
                                    onChange={() => {
                                        setUsersFilter(prev => ({ ...prev, category: 'followed' }));
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="Friends and followings"
                                sx={{ padding: '24px 0 0px 0' }}
                            />
                        </FormGroup>
                        <Box sx={{ display: 'flex', padding: '24px 0 0 0', gap: '15.5px' }}>
                            <button onClick={handleApplyClick} className={styles.applyBtn}>
                                Apply
                            </button>
                            <button onClick={handleClose} className={styles.cancelBtn}>
                                Cancel
                            </button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }, [usersFilter, open]);

    const SoundsModal = useMemo(() => {
        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h6 className={styles.filterModalTitle}>Filter</h6>
                        <div className={styles.filtersFrame}>
                            <h6 className={styles.filtersFrameTitle1}>Filter By</h6>
                        </div>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={soundsFilter.filter === 'all'}
                                    onChange={() => setSoundsFilter(prev => ({ ...prev, filter: 'all' }))}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="All"
                                sx={{ paddingBottom: '24px', borderBottom: '0.2px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={soundsFilter.filter === 'title'}
                                    onChange={() => setSoundsFilter(prev => ({ ...prev, filter: 'title' }))}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="Title"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.2px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={soundsFilter.filter === 'creators'}
                                    onChange={() => setSoundsFilter(prev => ({ ...prev, filter: 'creators' }))}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="Creators"
                                sx={{ padding: '24px 0 24px 0' }}
                            />
                        </FormGroup>
                        {/* Add filtering options here */}
                        <h6 className={styles.filtersFrameTitle1}>Sort By</h6>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    defaultChecked={true}
                                    checked={soundsFilter.sort === 'relevance'}
                                    onChange={() => {
                                        setSoundsFilter(prev => ({ ...prev, sort: 'relevance' }))
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="Relevance"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.1px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={soundsFilter.sort === 'used'}
                                    onChange={() => {
                                        setSoundsFilter(prev => ({ ...prev, sort: 'used' }))
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="Most used"
                                sx={{ padding: '24px 0 24px 0', borderBottom: '0.1px solid #B8B8B8' }}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={soundsFilter.sort === 'recent'}
                                    onChange={() => {
                                        setSoundsFilter(prev => ({ ...prev, sort: 'recent' }))
                                    }}
                                    sx={{
                                        '&.Mui-checked': { color: '#5448B2' },
                                    }}
                                />}
                                label="Most recent"
                                sx={{ padding: '24px 0 0px 0' }}
                            />
                        </FormGroup>
                        <Box sx={{ display: 'flex', padding: '24px 0 0 0', gap: '15.5px' }}>
                            <button onClick={handleApplyClick} className={styles.applyBtn}>
                                Apply
                            </button>
                            <button onClick={handleClose} className={styles.cancelBtn}>
                                Cancel
                            </button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }, [open, soundsFilter]);

    const HashtagsModal = useMemo(() => {
        // Add your modal content for 'Hashtags' tab here
        return <div>Hashtags Modal Content</div>;
    }, [open]);

    return (
        <Layout>
            {/* <div className={styles.topBarDiv}>
                {showHashtagPage ?
                    <TopBar searchBar={true} /> :
                    <TopBar searchBar={false} />
                }
            </div> */}
            <div className={styles.container}>
                {/* <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv} >
                        <SideNavBar selectedIndex={selectedIndex} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div> */}
                <div className={styles.middleSectionDiv}>
                    {showHashtagPage ? (
                        <div className={styles.container}>
                            {renderSearchResults}
                        </div>
                    ) : (
                        <div>
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
                                <IconButton sx={{ padding: '0' }} onClick={handleOpen}>
                                    <img src={filterIcon} alt='' style={{
                                        width: '40px', height: '40px', display: selectedTab === 'Hashtags' ? 'none' : ''
                                    }} />
                                </IconButton>
                            </div>

                            <div className={styles.searchTabs}>
                                <Tab onClick={() => handleTabChange('All')} className={selectedTab === 'All' ? styles.searchTabsSelected : styles.searchTab}>All</Tab>
                                <Tab onClick={() => handleTabChange('Videos')} className={selectedTab === 'Videos' ? styles.searchTabsSelected : styles.searchTab}>Videos</Tab>
                                <Tab onClick={() => handleTabChange('Users')} className={selectedTab === 'Users' ? styles.searchTabsSelected : styles.searchTab}>Users</Tab>
                                <Tab onClick={() => handleTabChange('Sounds')} className={selectedTab === 'Sounds' ? styles.searchTabsSelected : styles.searchTab}>Sounds</Tab>
                                <Tab onClick={() => handleTabChange('Hashtags')} className={selectedTab === 'Hashtags' ? styles.searchTabsSelected : styles.searchTab}>Hashtags</Tab>
                            </div>
                            <div className={styles.container}>
                                {renderSearchResults}
                            </div>
                        </div>
                    )}

                    {/* Render the modal based on the selected tab */}
                    {open && (
                        <div className={styles.modal}>
                            {selectedTab === 'All' ? VideosModal : null}
                            {selectedTab === 'Videos' ? VideosModal : null}
                            {selectedTab === 'Users' ? UsersModal : null}
                            {selectedTab === 'Sounds' ? SoundsModal : null}
                            {selectedTab === 'Hashtags' ? HashtagsModal : null}
                        </div>
                    )}
                </div>
            </div>
        </ Layout >
    );
};
