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

export const Profile = (props: any) => {
    const { selectedIndex, setIndex } = useAuthStore();
    const data2 = useAuthStore();
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [followModal, setFollowModal] = useState<null | string>(null);
    const [likesModal, setLikesModal] = useState(false);
    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(false)
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const [videoModal, setVideoModal] = useState(false);

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

        fetch(`${API_KEY}/profile/collection`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            console.log("collectons", data);
        }).catch((err) => {
            console.log('collectons error', err);
        })

        fetch(`${API_KEY}/filter/bookmarkedFilters`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            console.log("bookmarkedFilters", data);
        }).catch((err) => {
            console.log('bookmarkedFilters error', err);
        })
    }, [])
    console.log("ProfileData", profileData);

    useEffect(() => {
        fetch(`${API_KEY}/profile/tagged-videos`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            console.log("tagged-videos", data);
        }).catch((err) => {
            console.log('tagged-videos error', err);
        })
    }, [])

    useEffect(() => {
        fetch(`${API_KEY}/profile/:${"6555c50cc3b547e239fbd119"}/liked-videos`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            console.log("liked-videos", data);
        }).catch((err) => {
            console.log('liked-videos error', err);
        })
    }, [])
    console.log('find out the id', data2);
    "6555c50cc3b547e239fbd119"


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
    const onVideoModal = () => {
        setVideoModal(!videoModal)
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
                <Modal open={videoModal}>
                    <ClickAwayListener onClickAway={() => setVideoModal(false)}>
                        <div className={styles.videoModalContainer}>
                            <VideoModel onModalClose={() => setVideoModal(false)} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <div className={styles.middleSectionDiv}>
                    <ProfileHeader
                        profileData={profileData}
                        onFollowModalActive={onFollowModalActive}
                        setProfileModal={setProfileModal}
                        setLikesModal={setLikesModal}
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
                    <div className={styles.contentContainer}>
                        <p className={styles.title}>{activeTab}</p>
                        <div className={styles.posts}>
                            {[...new Array(7)].map((item) => (
                                <div key={item} onClick={onVideoModal} className={styles.post}>
                                    <img src="../../../public/images/Rectangle 28250 (1).png" alt="" />
                                    <div className={styles.views}>
                                        <img src="../../../public/images/icons/views.svg" alt="" />
                                        <p className={styles.viewsText}>14.9k</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
