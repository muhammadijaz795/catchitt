import { ClickAwayListener, Modal } from '@mui/material';
import { memo, useEffect, useState } from 'react';
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

export const Profile = (props: any) => {
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [storyPopup, setStoryPopup] = useState(false);
    const [followModal, setFollowModal] = useState<null | string>(null);
    const [likesModal, setLikesModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [videoModal, setVideoModal] = useState(false);
    const [userVideos, setUserVideos] = useState([]);
    const [userlikedVideos, setUserlikedVideos] = useState([]);
    const [usertaggedVideos, setUsertaggedVideos] = useState([]);
    const [bookmarkVideos, setbookmarkVideos] = useState([]);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const [reportPopup, setReportPopup] = useState(false);
    const [giftsPopup, setGiftsPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [copyPopup, setcopyPopup] = useState(false);
    const [viewsModal, setViewsModal] = useState(false);
    const [profileViewsContent, setProfileViewsContent] = useState<any>([]);

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
        await fetch(`${API_KEY}/profile/${userId}/videos`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserVideos(data.data.data);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        fetch(`${API_KEY}/profile/${userId}/liked-videos`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data: any) => {
                setUserlikedVideos(data.data.data);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        fetch(`${API_KEY}/profile/tagged-videos`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsertaggedVideos(data.data.data);
                console.log(data.data.data);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        // fetch(`${API_KEY}/filter/bookmarkedFilters`, {
        fetch(`${API_KEY}/profile/collection?page=1&pageSize=10`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('collections');
                setbookmarkVideos(data.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        fetch(`${API_KEY}/profile/collection`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setbookmarkVideos(data.data.data);
            })
            .catch((err) => {
                console.log('collectons error', err);
            });

        await fetch(`${API_KEY}/profile/visitors`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('PRofile views data : ', data);

                makeProfileViews(data?.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        dispatch(getRandomUsers());
        dispatch(getFriends());
        const data = await dispatch(getProfileData());
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

    return (
        <Layout showCopyPopup={copyPopup}>
            <div className={styles.container}>
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
                            console.log('sett story popup caling ');
                            setStoryPopup(true);
                        }}
                        onProfileEdit={onSave}
                        copyHandler={() => setcopyPopup(true)}
                        setViewsModal={() => setViewsModal(!viewsModal)}
                    />
                    <div className={styles.tabs}>
                        {tabs.map((item) => (
                            <div
                                onClick={() => setActiveTab(item.title)}
                                style={{
                                    borderColor: activeTab === item.title ? '#5448B2' : '#DFDFDF',
                                }}
                                className={styles.tab}
                                key={item.key}
                            >
                                {item.icon}
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
