import { ClickAwayListener, Modal } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { getFriends, getProfileData, getRandomUsers, loadFollowers, loadFollowing } from '../../redux/AsyncFuncs';
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
import PopupForDeleteVideo from './popups/popupForDeleteVideo';
import { Repost } from './svg-components/Repost';

export const Profile = (props: any) => {
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [storyPopup, setStoryPopup] = useState(false);
    const [followModal, setFollowModal] = useState<null | string>(null);
    const [likesModal, setLikesModal] = useState<any>(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    // const userId = "670f5a3bf2e43d587fa69d1b";
    // const userId = "6397aca6561d39d318d07297";
    const [videoModal, setVideoModal] = useState(false);
    const [userVideos, setUserVideos] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [privateVideos, setPrivateVideos] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [userlikedVideos, setUserLikedVideos] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [usertaggedVideos, setUserTaggedVideos] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [bookmarkVideos, setBookmarkVideos] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [repostVideos, setRepostsVideos] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [videoModalInfo, setVideoModalInfo] = useState<any>({});
    const [reportPopup, setReportPopup] = useState(false);
    const [giftsPopup, setGiftsPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [deleteVideoPopup, setDeleteVideoPopup] = useState(false);
    const [copyPopup, setcopyPopup] = useState(false);
    const [viewsModal, setViewsModal] = useState(false);
    const [profileViewsContent, setProfileViewsContent] = useState<any>([]);
    const [darkTheme, setdarkTheme] = useState<any>('');

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
        {
            title: 'Reposts',
            icon: <Repost active={activeTab === 'Reposts'} />,
            key: 7,
        }
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
        const url = `${API_KEY}/media-content/mark-as-displayed/${id}`;

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
        const url = `${API_KEY}/media-content/mark-as-started-watching/${id}`;

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

    const fetchData = async (signal: AbortSignal) => {
        // 63a04301a00ed2af91f17e1d user id contain videos
        const promises = [];

        // Fetch Videos
        if (activeTab === 'Videos' && (userVideos.totalItems === null || userVideos.totalItems > userVideos.items.length)) {
            promises.push(
                fetch(
                    `${API_KEY}/profile/${userId}/videos?page=${userVideos.page}&pageSize=${userVideos.pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        signal,
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setUserVideos((prev: any) => ({
                            ...prev,
                            items: [...prev.items, ...data.data.data],
                            totalItems: data.data.total,
                        }));
                    })
                    .catch((err) =>{
                        console.log(err)
                        setUserVideos((prev: any) => ({...prev, totalItems: undefined}))
                    })
            );
        }

        if (activeTab === 'Private' && (privateVideos.totalItems === null || privateVideos.totalItems > privateVideos.items.length)) {
            promises.push(
                fetch(
                    `${API_KEY}/profile/private/videos?page=${privateVideos.page}&pageSize=${privateVideos.pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        signal,
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setPrivateVideos((prev: any) => ({
                            ...prev,
                            items: [...prev.items, ...data.data.data],
                            totalItems: data.data.total,
                        }));
                    })
                    .catch((err) =>{
                        console.log(err)
                        setPrivateVideos((prev: any) => ({...prev, totalItems: undefined}))
                    })
            );
        }

        // Fetch Liked Videos
        if (activeTab === 'Liked Videos' && (userlikedVideos.totalItems === null || userlikedVideos.totalItems > userlikedVideos.items.length)) {
            promises.push(
                fetch(
                    `${API_KEY}/profile/${userId}/liked-videos?page=${userlikedVideos.page}&pageSize=${userlikedVideos.pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        signal,
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setUserLikedVideos((prev: any) => ({
                            ...prev,
                            items: [...prev.items, ...data.data.data],
                            totalItems: data.data.total,
                        }));
                    })
                    .catch((err) =>{
                        console.log(err)
                        setUserLikedVideos((prev: any) => ({...prev, totalItems: undefined}))
                    })
            );
        }

        // Fetch Tagged Videos
        if (activeTab === 'Tagged Posts' && (usertaggedVideos.totalItems === null || usertaggedVideos.totalItems > usertaggedVideos.items.length)) {
            promises.push(
                fetch(
                    `${API_KEY}/profile/tagged-videos?page=${usertaggedVideos.page}&pageSize=${usertaggedVideos.pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        signal,
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setUserTaggedVideos((prev: any) => ({
                            ...prev,
                            items: [...prev.items, ...data.data.data],
                            totalItems: data.data.total,
                        }));
                    })
                    .catch((err) =>{
                        console.log(err)
                        setUserTaggedVideos((prev: any) => ({...prev, totalItems: undefined}))
                    })
            );
        }

        // Fetch Bookmark Videos
        if (activeTab === 'Bookmarks' && (bookmarkVideos.totalItems === null || bookmarkVideos.totalItems > bookmarkVideos.items.length)) {
            promises.push(
                fetch(
                    `${API_KEY}/profile/collection?page=${bookmarkVideos.page}&pageSize=${bookmarkVideos.pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        signal,
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setBookmarkVideos((prev: any) => ({
                            ...prev,
                            items: [...prev.items, ...data.data.data],
                            totalItems: data.data.total,
                        }));
                    })
                    .catch((err) =>{
                        console.log(err)
                        setBookmarkVideos((prev: any) => ({...prev, totalItems: undefined}))
                    })
            );
        }

        // Fetch Repost Videos
        if (activeTab === 'Reposts' && (repostVideos.totalItems === null || repostVideos.totalItems > repostVideos.items.length)) {
            promises.push(
                fetch(
                    `${API_KEY}/media-content/reposts?page=${repostVideos.page}&pageSize=${repostVideos.pageSize}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        signal,
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setRepostsVideos((prev: any) => ({
                            ...prev,
                            items: [...prev.items, ...data.data],
                            totalItems: data.data.total??10,
                        }));
                    })
                    .catch((err) =>{
                        console.log(err)
                        setRepostsVideos((prev: any) => ({...prev, totalItems: undefined}))
                    })
            );
        }
        await Promise.all(promises);
    };

    const initialFetchData = async () => {
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
        // dispatch(getRandomUsers(1));
        // dispatch(getRandomUsers(1));
        dispatch(loadFollowing(1));
        dispatch(loadFollowers(1));
        dispatch(getFriends(1));
        await dispatch(getProfileData());
    };

    const makeProfileViews = (data: any) => {
        const filteredArray = data?.filter((item: any)=> item?._id !== userId);
        const newProfileViewsContent = filteredArray?.map(
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

    const tabChangeHandler = (title: any) => {
        setActiveTab(title);
    };


    useUpdateEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetchData(signal);
        return () => {
            controller.abort();
        };
    }, [activeTab]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        initialFetchData();
        fetchData(signal);
        return () => {
            controller.abort();
        };
    }, []);

    useUpdateEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetchData(signal);
        return () => {
            controller.abort();
        }
    }, [userVideos.page, userlikedVideos.page, usertaggedVideos.page, bookmarkVideos.page, repostVideos.page]);

    const name = useSelector((state: any) => state?.reducers?.profile?.name);
    const totalLikes = useSelector((state: any) => state?.reducers?.profile?.likesNum);

    return (
        <Layout showCopyPopup={copyPopup}>
            <div
                id="scrollableDiv"
                className={` ${styles.container} h-screen overflow-y-auto no-scrollbar ${darkTheme}`}
            >
                <Modal open={likesModal} className={styles.likesModal}>
                    <ClickAwayListener onClickAway={() => setLikesModal(false)}>
                        <div className={styles.likesModalContainer}>
                            <LikesModal isPublic={false} name={name} totalLikes={totalLikes} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                {followModal ? (
                    <Modal open={!!followModal} className={styles.likesModal}>
                        <ClickAwayListener onClickAway={() => setFollowModal(null)}>
                            <div className={styles.likesModalContainer}>
                                <FollowModal
                                    openTab={followModal}
                                    isPublic={false}
                                    onClose={closeFollowModal}
                                    userId={userId}
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
                <div className={styles.middleSectionDiv} >
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
                                className={`${styles.tab} ${activeTab === item.title
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
                        <div className={`${styles.posts}`}>
                            {(() => {
                                switch (activeTab) {
                                    case 'Videos':
                                        return (<VideoesMaping videos={userVideos} fetchMore={()=>setUserVideos({...userVideos, page:userVideos.page+1})} openVideoModal={onVideoModal} />);
                                    case 'Private':
                                        return (<VideoesMaping videos={privateVideos} fetchMore={()=>setPrivateVideos({...privateVideos, page:privateVideos.page+1})} openVideoModal={onVideoModal} />);
                                    case 'Bookmarks':
                                        return (<VideoesMaping videos={bookmarkVideos} fetchMore={()=>setBookmarkVideos({...bookmarkVideos, page:bookmarkVideos.page+1})} openVideoModal={onVideoModal} />);
                                    case 'Liked Videos':
                                        return (<VideoesMaping videos={userlikedVideos} fetchMore={()=>setUserLikedVideos({...userlikedVideos, page:userlikedVideos.page+1})} openVideoModal={onVideoModal} />);
                                    case 'Tagged Posts':
                                        return (<VideoesMaping videos={usertaggedVideos} fetchMore={()=>setUserTaggedVideos({...usertaggedVideos, page:usertaggedVideos.page+1})} openVideoModal={onVideoModal} />);
                                    case 'Reposts':
                                        return (<VideoesMaping videos={repostVideos} fetchMore={()=>setRepostsVideos({...repostVideos, page:repostVideos.page+1})} openVideoModal={onVideoModal} />);
                                    default:
                                        return null;
                                }
                            })()}
                        </div>
                    </div>
                </div>

                <PopupForVideoPlayer
                    gifts={() => setGiftsPopup(true)}
                    onBlockPopup={() => setBlockPopup(true)}
                    onReportPopup={() => setReportPopup(true)}
                    deleteVideoPopup={() => setDeleteVideoPopup(true)}
                    editVideoHandler={() =>
                        navigate('/upload', { state: { isEditMode: true, info: videoModalInfo } })
                    }
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
                    info={videoModalInfo}
                    // @ts-ignore
                    userId={{ id: videoModalInfo?.user?._id, name: videoModalInfo?.user?.name }}
                />
                <PopupForDeleteVideo
                    openBlock={deleteVideoPopup}
                    onBlockClose={() => setDeleteVideoPopup(false)}
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
