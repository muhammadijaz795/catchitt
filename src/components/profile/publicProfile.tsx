import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './profile.module.scss';
import { VideoIcon } from './svg-components/VideoIcon';
import { Liked } from './svg-components/Liked';
import { Tagged } from './svg-components/Tagged';
import EditProfile from './components/editProfile';
import { ClickAwayListener, Modal } from '@mui/material';
import FollowModal from './components/FollowModal';
import LikesModal from './components/LikesModal';
import PublicProfileHeader from './components/publicProfileHeader';
import { useParams } from 'react-router-dom';
import VideoModel from './components/videoModel';
import ReasonOfReport from './components/reasonOfReport';
import BlockUser from './components/blockUser';
import { PrivatePosts } from './components/privatePosts';
import VideoesMaping from './components/videoesMaping';

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
    const [videoModalInfo, setVideoModalInfo] = useState({})
    const [reportPopup, setReportPopup] = useState(false)
    const [blockPopup, setBlockPopup] = useState(false)
    const [activeVideo, setActiveVideo] = useState()




    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const [videoModal, setVideoModal] = useState(false);
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
                <Modal open={videoModal}>
                    <ClickAwayListener onClickAway={() => setVideoModal(false)}>
                        <div className={styles.videoModalContainer}>
                            <VideoModel
                                block={(video: any) => {
                                    setBlockPopup(true)
                                    setActiveVideo(video)
                                }}
                                report={(video: any) => {
                                    setReportPopup(true)
                                    setActiveVideo(video)
                                }}
                                info={videoModalInfo} onModalClose={() => setVideoModal(false)} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <Modal open={reportPopup} className={styles.reportPopupParent}>
                    <ClickAwayListener onClickAway={() => setReportPopup(false)}>
                        <div >
                            <ReasonOfReport video={activeVideo} onclose={() => setReportPopup(false)} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <Modal open={blockPopup} className={styles.blockPopupParent}>
                    <ClickAwayListener onClickAway={() => setBlockPopup(false)}>
                        <div >
                            <BlockUser onclose2={() => setBlockPopup(false)} />
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
                        {activeTab === 'Videos' ?
                            <VideoesMaping videos={videosData} openVideoModal={onVideoModal} />
                            : null}
                        {activeTab !== 'Videos' ? (
                            < PrivatePosts />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};