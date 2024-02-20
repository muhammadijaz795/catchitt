import { ClickAwayListener, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../shared/layout';
import { useAuthStore } from '../../store/authStore';
import Gifts from '../discover/popups/gifts';
import FollowModal from './components/FollowModal';
import LikesModal from './components/LikesModal';
import EditProfile from './components/editProfile';
import { PrivatePosts } from './components/privatePosts';
import PublicProfileHeader from './components/publicProfileHeader';
import VideoesMaping from './components/videoesMaping';
import PopupForReport from './popups/PopupForReport';
import PopupForBlock from './popups/popupForBlock';
import PopupForVideoPlayer from './popups/popupForVideoPlayer';
import StoriesOnPublicProfile from './popups/storiesOnPublicProfile';
import styles from './profile.module.scss';
import { Liked } from './svg-components/Liked';
import { Tagged } from './svg-components/Tagged';
import { VideoIcon } from './svg-components/VideoIcon';

export const PublicProfile = (props: any) => {
    const { selectedIndex, setIndex } = useAuthStore();
    const [storyPopup, setStoryPopup] = useState(false);
    const params = useParams();
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [followModal, setFollowModal] = useState<null | string>(null);
    const [likesModal, setLikesModal] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [videosData, setVideosData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const [reportPopup, setReportPopup] = useState(false);
    const [giftsPopup, setGiftsPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const [videoModal, setVideoModal] = useState(false);
    const [copyPopup, setcopyPopup] = useState(false);

    const navigate = useNavigate();

    // Use Function For Get the User Followers
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
    const onVideoModal = (video: any) => {
        setVideoModal(!videoModal);
        setVideoModalInfo(video);
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
                        openReport={() => setReportPopup(true)}
                        openBlock={() => setBlockPopup(true)}
                        showStories={() => setStoryPopup(true)}
                        storyVideos={(stories: any) => {
                            setVideoModalInfo(stories);
                        }}
                        copyHandler={() => setcopyPopup(true)}
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
                    <div className={styles.contentContainer} style={{minHeight:'300px'}}>
                        <p className={styles.title}>{activeTab}</p>
                        {activeTab === 'Videos' ? (
                            <VideoesMaping videos={videosData} openVideoModal={onVideoModal} />
                        ) : null}
                        {activeTab !== 'Videos' ? <PrivatePosts /> : null}
                    </div>
                </div>
                <StoriesOnPublicProfile
                    story={storyPopup}
                    onclose={() => setStoryPopup(false)}
                    openReport={() => setReportPopup(true)}
                />
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
                />
                <Gifts openGifts={giftsPopup} onGiftsClose={() => setGiftsPopup(false)} />
            </div>
            {/* </div> */}
        </Layout>
    );
};
