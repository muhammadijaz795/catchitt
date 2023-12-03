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
import PublicProfileHeader from './components/publicProfileHeader';
import { useParams } from 'react-router-dom';

export const PublicProfile = (props: any) => {
    const { selectedIndex, setIndex } = useAuthStore();
    const params = useParams();
    const data2 = useAuthStore();
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [followModal, setFollowModal] = useState<null | string>(null);
    const [likesModal, setLikesModal] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [videosData, setVideosData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const [videoModal, setVideoModal] = useState(false);
    console.log('====================================');
    console.log('params', params);
    console.log('====================================');
    useEffect(() => {
        fetch(`${API_KEY}/profile/${params.id}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setProfileData(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        fetch(`${API_KEY}/profile/${params.id}/videos`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setVideosData(data?.data?.data);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [params?.id]);

    const tabs = [
        {
            title: 'Videos',
            icon: <VideoIcon active={activeTab === 'Videos'} />,
            key: 1,
        },
        {
            title: 'Liked Videos',
            icon: <Liked active={activeTab === 'Liked Videos'} />,
            key: 4,
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
    const onVideoModal = () => {
        setVideoModal(!videoModal);
    };
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
                    <PublicProfileHeader
                        profileData={profileData}
                        onFollowModalActive={onFollowModalActive}
                        setProfileModal={setProfileModal}
                        setLikesModal={setLikesModal}
                        public
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
                        {activeTab === 'Videos' ? (
                            <div className={styles.posts}>
                                {videosData &&
                                    videosData.map((item: any) => (
                                        <div
                                            key={item}
                                            onClick={onVideoModal}
                                            className={styles.post}
                                        >
                                            <img
                                                className={styles.thumbnail}
                                                src={item?.thumbnailUrl}
                                                alt=""
                                            />
                                            <div className={styles.views}>
                                                <img
                                                    src="../../../public/images/icons/views.svg"
                                                    alt=""
                                                />
                                                <p className={styles.viewsText}>14.9k</p>
                                            </div>
                                        </div>
                                    ))}

                            </div>
                        ) : null}
                        {activeTab !== 'Videos' ? (
                            <div className={styles.privatepost}>
                                <img
                                    style={{ marginTop: 48 }}
                                    src="../../../public/images/icons/lock.svg"
                                    alt=""
                                />
                                <p style={{ marginTop: 15 }} className={styles.privatevideostext}>
                                    This user's tagged posts are private
                                </p>
                                <p
                                    style={{ marginBottom: 78 }}
                                    className={styles.privatevideostext}
                                >
                                    Tagged posts of sarasaid171 are currently hidden
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};