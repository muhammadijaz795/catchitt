import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './profile.module.scss';
import { VideoIcon } from './svg-components/VideoIcon';
import { Private } from './svg-components/Private';
import { Bookmark } from './svg-components/Bookmark';
import { Liked } from './svg-components/Liked';
import { Tagged } from './svg-components/Tagged';
import { Badge } from './svg-components/Badge';
import ProfileHeader from './components/profileHeader';
import EditProfile from './components/editProfile';
import { ClickAwayListener, Modal } from '@mui/material';
import FollowModal from './components/FollowModal';
import LikesModal from './components/LikesModal';
import VideoModel from './components/videoModel';
import ReasonOfReport from './components/reasonOfReport';
import BlockUser from './components/blockUser';
import VideoesMaping from './components/videoesMaping';
import PopupForVideoPlayer from './popups/popupForVideoPlayer';
import PopupForReport from './popups/PopupForReport';
import PopupForBlock from './popups/popupForBlock';


export const Profile = (props: any) => {
    const { selectedIndex, setIndex } = useAuthStore();
    const authstore = useAuthStore();
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [followModal, setFollowModal] = useState<null | string>(null);
    const [likesModal, setLikesModal] = useState(false);
    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(false)
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const [videoModal, setVideoModal] = useState(false);
    const [userVideos, setUserVideos] = useState([])
    const [userlikedVideos, setUserlikedVideos] = useState([])
    const [usertaggedVideos, setUsertaggedVideos] = useState([])
    const [bookmarkVideos, setbookmarkVideos] = useState([])
    const [videoModalInfo, setVideoModalInfo] = useState({})
    const [reportPopup, setReportPopup] = useState(false)
    const [giftsPopup, setGiftsPopup] = useState(false)
    const [blockPopup, setBlockPopup] = useState(false)
    const [activeVideo, setActiveVideo] = useState()

    useEffect(() => {
        fetch(`${API_KEY}/profile`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            setProfileData(data.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err);
            setLoading(false)
        })
        // 63a04301a00ed2af91f17e1d user id contain videos
        fetch(`${API_KEY}/profile/${authstore._id}/videos`, {
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

        fetch(`${API_KEY}/profile/${authstore._id}/liked-videos`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {

                setUserlikedVideos(data.data.data)
                console.log(data.data.data);

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

                setUsertaggedVideos(data.data.data)
                console.log(data.data.data);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        fetch(`${API_KEY}/filter/bookmarkedFilters`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setbookmarkVideos(data.data.data)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        fetch(`${API_KEY}/profile/collection`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            console.log("collectons", data);
        }).catch((err) => {
            console.log('collectons error', err);
        })
    }, []);
    const [storis, setStories] = useState(false);


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
        // {
        //     title: 'Badges',
        //     icon: <Badge active={activeTab === 'Badges'} />,
        //     key: 5,
        // },
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
    const onVideoModal = (video: any) => {
        setVideoModal(!videoModal)
        setVideoModalInfo(video)
    }
    return (
        <div className={styles.root}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div>
                <Modal open={likesModal} className={styles.likesModal}>
                    <ClickAwayListener onClickAway={() => setLikesModal(false)}>
                        <div className={styles.likesModalContainer}>
                            <LikesModal />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <Modal open={!!followModal} className={styles.likesModal}>
                    <ClickAwayListener onClickAway={() => setFollowModal(null)}>
                        <div className={styles.likesModalContainer}>
                            <FollowModal />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <Modal open={profileModal} className={styles.modal}>
                    <ClickAwayListener onClickAway={onCancel}>
                        <div className={styles.modalContainer}>
                            <EditProfile onCancel={onCancel} onSave={onSave} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <div className={styles.middleSectionDiv}>
                    <ProfileHeader
                        profileData={profileData}
                        onFollowModalActive={onFollowModalActive}
                        setProfileModal={setProfileModal}
                        setLikesModal={setLikesModal}
                        showStory={() => setStories(true)}
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
                    <div className={styles.contentContainer}>
                        <p className={styles.title}>{activeTab}</p>
                        <div className={styles.posts}>
                            {activeTab === 'Videos' ?
                                <VideoesMaping videos={userVideos} openVideoModal={onVideoModal} />
                                : null}
                            {activeTab === 'Liked Videos' ?
                                <VideoesMaping videos={userlikedVideos} openVideoModal={onVideoModal} />
                                : null}
                            {activeTab === 'Bookmarks' ?
                                <VideoesMaping videos={bookmarkVideos} openVideoModal={onVideoModal} />
                                : null}
                            {activeTab === 'Tagged Posts' ?
                                <VideoesMaping videos={usertaggedVideos} openVideoModal={onVideoModal} />

                                : null}
                        </div>
                    </div>
                </div>

                <PopupForVideoPlayer onBlockPopup={() => setBlockPopup(true)} onReportPopup={() => setReportPopup(true)} videoModal={videoModal} onclose={() => setVideoModal(false)} info={videoModalInfo} />
                <PopupForReport openReport={reportPopup} onReportClose={() => setReportPopup(false)} info={videoModalInfo} />
                <PopupForBlock openBlock={blockPopup} onBlockClose={() => setBlockPopup(false)} onReportClose={() => setReportPopup(false)} info={videoModalInfo} />

            </div>
        </div>
    );
};
