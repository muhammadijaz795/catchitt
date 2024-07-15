import { CircularProgress, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../shared/layout';
import { useAuthStore } from '../../../store/authStore';
import PopupForReport from '../../profile/popups/PopupForReport';
import PopupForBlock from '../../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../../profile/popups/popupForVideoPlayer';
import { LeftArrow } from '../../suggested-accounts-page/svg-components/LeftArrow';
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
    const token = localStorage.getItem('token');
    const params = useParams();
    const [trendingvideos, setTrendingvideos] = useState([]);
    const [hashtagVideos, setHashtagVideos] = useState([]);
    const [reportPopup, setReportPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [queryData, setQueryData] = useState<any>('');
    const API_KEY = process.env.VITE_API_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const data = queryParams.get('hashtag');
        setQueryData(data);
        const apisIntigrations = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
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
        <Layout>
            {loading && (
                <div
                    style={{
                        height: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress />
                </div>
            )}
            {!loading && (
                <div className={styles.container}>
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
                                                    <p className={styles.trendingText}>
                                                        {obj?.name}
                                                    </p>
                                                </div>
                                                <div className={styles.posts}>
                                                    {obj?.relatedVideos.map(
                                                        (video: any, i: any) => {
                                                            return (
                                                                <VideoPanel
                                                                    index={2}
                                                                    videomodal={() =>
                                                                        openvideomodal(video)
                                                                    }
                                                                    video={video}
                                                                />
                                                            );
                                                        }
                                                    )}
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
                                        sx={{
                                            margin: '0px',
                                            padding: '0px',
                                            alignSelf: 'center',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            gap: '1rem',
                                        }}
                                        onClick={handleGoBack}
                                    >
                                        <LeftArrow />
                                        <h4>Trending Videos</h4>
                                    </IconButton>
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
            )}
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
        </Layout>
    );
};
