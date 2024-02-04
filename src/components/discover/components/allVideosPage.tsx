import { IconButton } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import PopupForReport from '../../profile/popups/PopupForReport';
import PopupForBlock from '../../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../../profile/popups/popupForVideoPlayer';
import { SideNavBar } from '../../side-nav-bar/side-nav-bar';
import { LeftArrow } from '../../suggested-accounts-page/svg-components/LeftArrow';
import { SuggestedActivity } from '../../suggested-activity/suggested-activity';
import { TopBar } from '../../top-bar/top-bar';
import styles from './allVideos.module.scss';
import VideoPanel from './videoPanel';

export interface SuggestedAccountsPageProps {
    className?: string;
}

interface Account {
    _id: string;
    avatar: string;
    name: string;
}

export const AllVideos = ({ className }: SuggestedAccountsPageProps) => {
    const [videoModal, setVideoModal] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const token = useAuthStore((state) => state.token);
    const params = useParams();
    const [trendingvideos, setTrendingvideos] = useState([]);
    const [hashtagVideos, setHashtagVideos] = useState([]);
    const [reportPopup, setReportPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [queryData, setQueryData] = useState<any>('');
    const API_KEY = process.env.VITE_API_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const data = queryParams.get('hashtag');
        setQueryData(data);
        const apisIntigrations = async () => {
            try {
                const response = await fetch(`${API_KEY}/discover/trending/videos`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const res = await response.json();
                setTrendingvideos(res.data.data);
            } catch (error) {
                console.log('error trendingvideos', error);
            }

            try {
                const response = await fetch(`${API_KEY}/discover/trending/hashtags`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const res = await response.json();
                setHashtagVideos(res.data.data);
            } catch (error) {
                console.log('error trendinghashtags', error);
            }
        };
        apisIntigrations();
    }, []);

    const handleGoBack = () => {
        navigate('/discover'); // Navigate back to the previous page
    };

    const openvideomodal = (video: any) => {
        setVideoModalInfo(video);
        setVideoModal(true);
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={null} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} />
                    </div>
                </div>

                <div
                    className={styles.middleSectionDiv}
                    style={{
                        paddingTop: 0,
                        gap: 0,
                    }}
                >
                    {params.id !== 'trending-videos' ? (
                        hashtagVideos.map((obj: any, i) => {
                            return (
                                <div>
                                    {obj?.name === queryData ? (
                                        <div
                                            style={{ marginTop: 41 }}
                                            key={i}
                                            className={styles.postsp}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <p className={styles.trendingText}>{obj?.name}</p>
                                            </div>
                                            <div className={styles.posts}>
                                                {obj?.relatedVideos.map((video: any, i: any) => {
                                                    return (
                                                        <VideoPanel
                                                            index={2}
                                                            videomodal={() => openvideomodal(video)}
                                                            video={video}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ marginTop: 41 }} className={styles.postsp}>
                            <div className={styles.pageHeader}>
                                <IconButton
                                    sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
                                    onClick={handleGoBack}
                                >
                                    <LeftArrow />
                                </IconButton>
                                <h4>Trending Videos</h4>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className={styles.trendingText}></p>
                            </div>
                            <div className={styles.posts}>
                                {trendingvideos.map((video: any, i: any) => {
                                    return (
                                        <VideoPanel
                                            index={2}
                                            videomodal={() => openvideomodal(video)}
                                            video={video}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <PopupForVideoPlayer
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
        </div>
    );
};
