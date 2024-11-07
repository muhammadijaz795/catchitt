import { ClickAwayListener, Modal } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../shared/layout';
import { useAuthStore } from '../../store/authStore';
import Gifts from '../discover/popups/gifts';
import FollowModal from './components/FollowModal';
import LikesModal from './components/LikesModal';
import { PrivatePosts } from './components/privatePosts';
import PublicProfileHeader from './components/publicProfileHeader';
import VideoesMaping from './components/videoesMaping';
import PopupForReport from './popups/PopupForReport';
import PopupForBlock from './popups/popupForBlock';
import PopupForVideoPlayer from './popups/popupForVideoPlayer';
import publicProfileStories from './popups/publicProfileStories';
import styles from './profile.module.scss';
import { Liked } from './svg-components/Liked';
import { Tagged } from './svg-components/Tagged';
import { VideoIcon } from './svg-components/VideoIcon';
import { useUpdateEffect } from 'react-use';

export const PublicProfile = (props: any) => {
    const [storyPopup, setStoryPopup] = useState(false);
    const params = useParams();
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [followModal, setFollowModal] = useState<null | string>(null);
    const [likesModal, setLikesModal] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [videosData, setVideosData] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [loading, setLoading] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const [reportPopup, setReportPopup] = useState(false);
    const [giftsPopup, setGiftsPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const [videoModal, setVideoModal] = useState(false);
    const [copyPopup, setcopyPopup] = useState(false);

    const MemoizedStoriesOnPublicProfile = memo(publicProfileStories);

    const fetchProfileData = async () => {
        try {
            const profileResponse = await fetch(`${API_KEY}/profile/public/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const profileData = await profileResponse.json();
            setProfileData(profileData.data);
            setLoading(false);
            return profileData.data._id;

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const fetchProfileVideos = async (signal:AbortSignal, fromStart: boolean, profileId = profileData._id) => {
        try {
            const videosResponsePromise = await fetch(`${API_KEY}/profile/${profileId}/videos?page=${fromStart?1:videosData.page}&pageSize=${videosData.pageSize}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                signal
            });
            const videosResponse = await videosResponsePromise.json();
            if (Array.isArray(videosResponse?.data?.data)) {
                setVideosData((prev: any) => ({ ...prev, items: fromStart? videosResponse?.data?.data : [...prev.items, ...videosResponse?.data?.data], totalItems: videosResponse?.data?.total }));
            }

        } catch (error) {
            console.log(error);
            setVideosData((prev: any) => ({ ...prev, totalItems: undefined }));
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const initialFetch = async () => {
            setVideosData((prev:any) => ({ ...prev, page: 1 }));
            const Id = await fetchProfileData();
            fetchProfileVideos(signal,true, Id);
        }
        initialFetch();
        return () => {
            controller.abort();
        }
    }, [params?.id]);

    useUpdateEffect(() => {
        if (videosData.page === 1) return;
        const controller = new AbortController();
        const signal = controller.signal;
        fetchProfileVideos(signal,false);
        return () => {
            controller.abort();
        }
    }, [videosData.page]);

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

    return (
        <Layout showCopyPopup={copyPopup}>
            <div className={styles.container}>
                <Modal open={likesModal} className={styles.likesModal}>
                    <ClickAwayListener onClickAway={() => setLikesModal(false)}>
                        <div className={styles.likesModalContainer}>
                            <LikesModal isPublic={true} name={profileData?.name} totalLikes={profileData?.likesNum} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <Modal open={!!followModal} className={styles.likesModal}>
                    <ClickAwayListener onClickAway={() => setFollowModal(null)}>
                        <div className={styles.likesModalContainer}>
                            <FollowModal
                                openTab={followModal}
                                isPublic={true}
                                onClose={function (): void {
                                    setFollowModal(null);
                                }}
                                userId={profileData?._id}
                            />
                        </div>
                    </ClickAwayListener>
                </Modal>
                {/* <Modal open={profileModal} className={styles.modal}>
                    <ClickAwayListener onClickAway={onCancel}>
                        <div className={styles.modalContainer}>
                            <EditProfile onCancel={onCancel} onSave={onSave} />
                        </div>
                    </ClickAwayListener>
                </Modal> */}
                <div className={`${styles.middleSectionDiv} h-screen overflow-y-auto no-scrollbar`} id="scrollableDiv">
                    <PublicProfileHeader
                        profileData={profileData}
                        onFollowModalActive={onFollowModalActive}
                        setProfileModal={setProfileModal}
                        setLikesModal={setLikesModal}
                        public
                        openReport={() => setReportPopup(true)}
                        openBlock={() => {
                            setVideoModalInfo({
                                user: { _id: profileData._id, name: profileData.name },
                            });
                            setBlockPopup(true);
                        }}
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
                                    borderColor:
                                        activeTab === item.title ? 'rgb(255, 59, 92)' : '#DFDFDF',
                                }}
                                className={styles.tab}
                                key={item.key}
                            >
                                {item.icon}
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.contentContainer}`}>
                        <p className={styles.title}>{activeTab}</p>
                        {activeTab === 'Videos' ? (
                            <VideoesMaping videos={videosData} fetchMore={() => setVideosData({...videosData, page: videosData.page+ 1})} openVideoModal={onVideoModal} />
                        ) : null}
                        {activeTab !== 'Videos' ? <PrivatePosts tab={activeTab} name={profileData.name} /> : null}
                    </div>
                </div>
                <MemoizedStoriesOnPublicProfile
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
                    // @ts-ignore
                    userId={{ id: videoModalInfo?.user?._id, name: videoModalInfo?.user?.name }}
                />
                <Gifts openGifts={giftsPopup} onGiftsClose={() => setGiftsPopup(false)} />
            </div>
            {/* </div> */}
        </Layout>
    );
};
