import { ClickAwayListener, Modal } from '@mui/material';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/layout';
import Gifts from '../discover/popups/gifts';
import FollowModal from './components/FollowModal';
import LikesModal from './components/LikesModal';
import EditProfile from './components/editProfile';
import ProfileHeader from './components/profileHeader';
import VideoesMaping from './components/videoesMaping';
import PopupForReport from './popups/PopupForReport';
import PopupForBlock from './popups/popupForBlock';
import PopupForVideoPlayer from './popups/popupForVideoPlayer';

import { getFriends, getProfileData, getRandomUsers } from '../../redux/AsyncFuncs';
import publicProfileStories from './popups/publicProfileStories';
import styles from './profile.module.scss';
import { Bookmark } from './svg-components/Bookmark';
import { Liked } from './svg-components/Liked';
import { Badge } from './svg-components/Badge';
import { Private } from './svg-components/Private';
import { Tagged } from './svg-components/Tagged';
import { VideoIcon } from './svg-components/VideoIcon';
import { ToastContainer } from 'react-toastify';
import ViewsModal from './components/ViewsModal';
import viewerAvatarPlaceholder from './svg-components/placeholderAvatar.png';
import style from './profile.module.scss';
import { useUpdateEffect } from 'react-use';

export const Profile = (props: any) => {
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [storyPopup, setStoryPopup] = useState(false);
    const [followModal, setFollowModal] = useState<null | string>(null);
    const [likesModal, setLikesModal] = useState<any>(false);
    const [loading, setLoading] = useState<any>(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [videoModal, setVideoModal] = useState(false);
    const [userVideos, setUserVideos] = useState<any>([]);
    const [userlikedVideos, setUserLikedVideos] = useState<any>([]);
    const [usertaggedVideos, setUserTaggedVideos] = useState<any>([]);
    const [bookmarkVideos, setBookmarkVideos] = useState<any>([]);
    const [videoModalInfo, setVideoModalInfo] = useState<any>({});
    const [reportPopup, setReportPopup] = useState(false);
    const [giftsPopup, setGiftsPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [copyPopup, setcopyPopup] = useState(false);
    const [viewsModal, setViewsModal] = useState(false);
    const [profileViewsContent, setProfileViewsContent] = useState<any>([]);
    const [darkTheme, setdarkTheme] = useState<any>('');

    const [videosPage, setVideosPage] = useState<any>(1);
    const [likedVideosPage, setLikedVideosPage] = useState<any>(1);
    const [taggedVideosPage, setTaggedVideosPage] = useState<any>(1);
    const [bookmarkVideosPage, setBookmarkVideosPage] = useState<any>(1);

    const [hasMoreVideos, setHasMoreVideos] = useState<any>(true);
    const [hasMoreLikedVideos, setHasMoreLikedVideos] = useState<any>(true);
    const [hasMoreTaggedVideos, setHasMoreTaggedVideos] = useState<any>(true);
    const [hasMoreBookmarkVideos, setHasMoreBookmarkVideos] = useState<any>(true);

    const [initialCalled, setInitialCalled] = useState<boolean>(false);
    const mainDivRef = useRef<any>(null);

    // @ts-ignore
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tabs = [
        {
            title: 'Videos',
            icon: <VideoIcon active={activeTab === 'Videos'} />,
            key: 1,
        },
        {
            title: 'Private',
            icon: <Private active={activeTab === 'Private'} />,
            key: 2,
        },
        {
            title: 'Bookmarks',
            icon: <Bookmark active={activeTab === 'Bookmarks'} />,
            key: 3,
        },
        {
            title: 'Liked Videos',
            icon: <Liked active={activeTab === 'Liked Videos'} />,
            key: 4,
        },
        {
            title: 'Badges',
            icon: <Badge active={activeTab === 'Badges'} />,
            key: 5,
        },
        {
            title: 'Tagged Posts',
            icon: <Tagged active={activeTab === 'Tagged Posts'} />,
            key: 6,
        },
    ];

    const onCancel = () => {
        setProfileModal(false);
    };

    const onSave = () => {
        setProfileModal(false);
    };

    const onFollowModalActive = (tab: string | null) => {
        setFollowModal(tab);
    };

    const closeFollowModal = () => {
        setFollowModal(null);
    };

    const onVideoModal = (video: any) => {
        setVideoModal(!videoModal);
        setVideoModalInfo(video);
        markVideoDisplayed(video?.mediaId);
        markVideoViewed(video?.mediaId);
    };

    const markVideoDisplayed = async (id: string) => {
        const url = `${API_KEY}/media-profileViewsContent/mark-as-displayed/${id}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    };

    const markVideoViewed = async (id: string) => {
        const url = `${API_KEY}/media-profileViewsContent/mark-as-started-watching/${id}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    };

    const viewItemClickHandler = (index: number) => {
        console.log('View Item Click : ', index);
    };

    const fetchData = async () => {
        // 63a04301a00ed2af91f17e1d user id contain videos
        setLoading(true);
        const pageSize = 10;
        const promises = [];

        // Fetch Videos
        if (hasMoreVideos && activeTab === 'Videos') {
            promises.push(
                fetch(
                    `${API_KEY}/profile/${userId}/videos?page=${videosPage}&pageSize=${pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setUserVideos((prev: any) => [...prev, ...data.data.data]);
                        setHasMoreVideos(data.data.total > pageSize * videosPage);
                        setVideosPage((prev: number) => prev + 1);
                    })
                    .catch((err) => console.log(err))
            );
        }

        // Fetch Liked Videos
        if (hasMoreLikedVideos && activeTab === 'Liked Videos') {
            promises.push(
                fetch(
                    `${API_KEY}/profile/${userId}/liked-videos?page=${likedVideosPage}&pageSize=${pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setUserLikedVideos((prev: any) => [...prev, ...data.data.data]);
                        setHasMoreLikedVideos(data.data.total > pageSize * likedVideosPage);
                        setLikedVideosPage((prev: number) => prev + 1);
                    })
                    .catch((err) => console.log(err))
            );
        }

        // Fetch Tagged Videos
        if (hasMoreTaggedVideos && activeTab === 'Tagged Posts') {
            promises.push(
                fetch(
                    `${API_KEY}/profile/tagged-videos?page=${taggedVideosPage}&pageSize=${pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setUserTaggedVideos((prev: any) => [...prev, ...data.data.data]);
                        setHasMoreTaggedVideos(data.data.total > pageSize * taggedVideosPage);
                        setTaggedVideosPage((prev: number) => prev + 1);
                    })
                    .catch((err) => console.log(err))
            );
        }

        // Fetch Bookmark Videos
        if (hasMoreBookmarkVideos && activeTab === 'Bookmarks') {
            promises.push(
                fetch(
                    `${API_KEY}/profile/collection?page=${bookmarkVideosPage}&pageSize=${pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setBookmarkVideos((prev: any) => [...prev, ...data.data.data]);
                        setHasMoreBookmarkVideos(data.data.total > pageSize * bookmarkVideosPage);
                        setBookmarkVideosPage((prev: number) => prev + 1);
                    })
                    .catch((err) => console.log(err))
            );
        }

        await Promise.all(promises);

        if (!initialCalled) {
            setInitialCalled(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        initialFetchData();
    }, []);

    const initialFetchData = async () => {
        setVideosPage(1);
        setLikedVideosPage(1);
        setTaggedVideosPage(1);
        setBookmarkVideosPage(1);
        setUserVideos([]);
        setUserLikedVideos([]);
        setUserTaggedVideos([]);
        setBookmarkVideos([]);
        await fetch(`${API_KEY}/profile/visitors`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                makeProfileViews(data?.data);
            })
            .catch((err) => {
                console.log(err);
            });

        dispatch(getRandomUsers());
        dispatch(getFriends());
        await dispatch(getProfileData());
    };

    const makeProfileViews = (data: any) => {
        const newProfileViewsContent = data?.map(
            (viewItem: { avatar: any; name: any; isFollower: any; isFollowing: any }) => {
                const viewerAvatar =
                    viewItem?.avatar !== '' && viewItem?.avatar
                        ? viewItem?.avatar
                        : viewerAvatarPlaceholder;
                const viewerName = viewItem?.name;
                let relationWithViewer = '';

                if (!viewItem.isFollower && !viewItem.isFollowing) {
                    relationWithViewer = 'Follow';
                } else if (viewItem.isFollower && viewItem.isFollowing) {
                    relationWithViewer = 'Friends';
                } else if (viewItem.isFollowing && !viewItem.isFollower) {
                    relationWithViewer = 'Requested';
                } else {
                    relationWithViewer = 'Following';
                }
                return {
                    viewerAvatar,
                    viewerName,
                    relationWithViewer,
                };
            }
        );

        setProfileViewsContent(newProfileViewsContent);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (copyPopup) {
            setTimeout(() => {
                setcopyPopup(false);
            }, 1000);
        }
    }, [copyPopup]);

    useEffect(() => {
        if (!token) {
            navigate('/auth');
        }
    });

    const MemoizedStoriesOnPublicProfile = memo(publicProfileStories);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
        }
    });

    const handleScroll = useCallback(() => {
        if (mainDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = mainDivRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 0.5) {
                // Adding a small buffer
                if (initialCalled) {
                    fetchData();
                }
            }
        }
    }, [
        activeTab,
        videosPage,
        likedVideosPage,
        taggedVideosPage,
        bookmarkVideosPage,
        hasMoreVideos,
        hasMoreLikedVideos,
        hasMoreTaggedVideos,
        hasMoreBookmarkVideos,
    ]);

    useEffect(() => {
        const mainDiv = mainDivRef.current;
        if (mainDiv) {
            // mainDiv.addEventListener('scroll', handleScroll);
            // return () => mainDiv.removeEventListener('scroll', handleScroll);
        }
    }, [
        handleScroll,
        activeTab,
        videosPage,
        likedVideosPage,
        taggedVideosPage,
        bookmarkVideosPage,
        hasMoreVideos,
        hasMoreLikedVideos,
        hasMoreTaggedVideos,
        hasMoreBookmarkVideos,
    ]);

    const tabChangeHandler = (title: any) => {
        setActiveTab(title);
        setInitialCalled(false);
    };

    useUpdateEffect(() => {
        fetchData();
    }, [activeTab]);

    return (
        <Layout showCopyPopup={copyPopup}>
            <div
                ref={mainDivRef}
                className={` ${styles.container} h-screen overflow-y-auto ${darkTheme}`}
            >
                <Modal open={likesModal} className={styles.likesModal}>
                    <ClickAwayListener onClickAway={() => setLikesModal(false)}>
                        <div className={styles.likesModalContainer}>
                            <LikesModal />
                        </div>
                    </ClickAwayListener>
                </Modal>
                {followModal ? (
                    <Modal open={!!followModal} className={styles.likesModal}>
                        <ClickAwayListener onClickAway={() => setFollowModal(null)}>
                            <div className={styles.likesModalContainer}>
                                <FollowModal
                                    isPublic={false}
                                    onClose={closeFollowModal}
                                    userId={undefined}
                                />
                            </div>
                        </ClickAwayListener>
                    </Modal>
                ) : null}
                <Modal open={profileModal} className={styles.modal}>
                    <ClickAwayListener onClickAway={onCancel}>
                        <div className={styles.modalContainer}>
                            <EditProfile onCancel={onCancel} onSave={onSave} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <div className={styles.middleSectionDiv}>
                    <ProfileHeader
                        onFollowModalActive={onFollowModalActive}
                        setProfileModal={setProfileModal}
                        setLikesModal={setLikesModal}
                        showStory={() => {
                            setStoryPopup(true);
                        }}
                        onProfileEdit={onSave}
                        copyHandler={() => setcopyPopup(true)}
                        setViewsModal={() => setViewsModal(!viewsModal)}
                    />
                    <div className={styles.tabs}>
                        {tabs.map((item) => (
                            <div
                                onClick={() => tabChangeHandler(item?.title)}
                                // style={{
                                //     borderColor:
                                //         activeTab === item.title ? 'rgb(255, 59, 92)' : '#DFDFDF',
                                // }}
                                // className={styles.tab}
                                className={`${styles.tab} ${
                                    activeTab === item.title
                                        ? 'border-liveSelected'
                                        : 'border-inactive'
                                } text-center flex justify-center items-center pb-1`}
                                key={item.key}
                            >
                                <div className="mb-2">{item.icon}</div>
                            </div>
                        ))}
                    </div>

                    {/* Videoes Maping */}
                    <div className={styles.contentContainer} style={{ minHeight: '300px' }}>
                        <p className={styles.title}>{activeTab}</p>
                        <div className={styles.posts}>
                            {activeTab === 'Videos' ? (
                                <VideoesMaping videos={userVideos} openVideoModal={onVideoModal} />
                            ) : null}
                            {activeTab === 'Private' ? (
                                <VideoesMaping videos={userVideos} openVideoModal={onVideoModal} />
                            ) : null}
                            {activeTab === 'Bookmarks' ? (
                                <VideoesMaping
                                    videos={bookmarkVideos}
                                    openVideoModal={onVideoModal}
                                />
                            ) : null}
                            {activeTab === 'Liked Videos' ? (
                                <VideoesMaping
                                    videos={userlikedVideos}
                                    openVideoModal={onVideoModal}
                                />
                            ) : null}
                            {activeTab === 'Tagged Posts' ? (
                                <VideoesMaping
                                    videos={usertaggedVideos}
                                    openVideoModal={onVideoModal}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>

                <PopupForVideoPlayer
                    gifts={() => setGiftsPopup(true)}
                    onBlockPopup={() => setBlockPopup(true)}
                    onReportPopup={() => setReportPopup(true)}
                    videoModal={videoModal}
                    onclose={() => setVideoModal(false)}
                    info={videoModalInfo}
                />
                <PopupForReport
                    openReport={reportPopup}
                    onReportClose={() => setReportPopup(false)}
                    info={videoModalInfo}
                />
                <PopupForBlock
                    openBlock={blockPopup}
                    onBlockClose={() => setBlockPopup(false)}
                    onReportClose={() => setReportPopup(false)}
                    info={videoModalInfo}
                    // @ts-ignore
                    userId={{ id: videoModalInfo?.user?._id, name: videoModalInfo?.user?.name }}
                />
                {viewsModal && (
                    <ViewsModal
                        content={profileViewsContent}
                        handleOverlayClick={() => setViewsModal(false)}
                        viewItemClickHandler={viewItemClickHandler}
                    />
                )}
                <Gifts openGifts={giftsPopup} onGiftsClose={() => setGiftsPopup(false)} />
                <MemoizedStoriesOnPublicProfile
                    story={storyPopup}
                    onclose={() => setStoryPopup(false)}
                    openReport={() => setReportPopup(true)}
                />
            </div>
            <div>
                <ToastContainer />
            </div>
        </Layout>
    );
};
