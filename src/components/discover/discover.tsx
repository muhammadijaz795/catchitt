import { CircularProgress } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Layout from '../../shared/layout';
import PopupForReport from '../profile/popups/PopupForReport';
import PopupForBlock from '../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../profile/popups/popupForVideoPlayer';
import StoriesOnPublicProfile from '../profile/popups/storiesOnPublicProfile';
import VideoPanel from './components/videoPanel';
import styles from './discover.module.scss';
import Gifts from './popups/gifts';
import { DISCOVER_CATEGORIES } from '../../utils/constants';

export default function Discover() {
    const API_KEY = process.env.VITE_API_URL;
    const [hashtagVideos, setHashtagVideos] = useState([]);
    const [hashtagVideosToShow, setHashtagVideosToShow] = useState([]);
    const [videoModal, setVideoModal] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const token = localStorage.getItem('token');
    const [reportPopup, setReportPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [giftPopup, setGiftPopup] = useState(false);
    const [storyPopup, setStoryPopup] = useState(false);
    const [videosToShow, setVideosToShow] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const mainDivRef = useRef(null);
    const [muteStates, setMuteStates] = useState([]);

    useEffect(() => {
        const apisIntegration = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_KEY}/discover/trending/hashtags`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { data } = await response.json();
                const allVideos = data?.data[4]?.relatedVideos;
                setIsLoading(false);
                setHashtagVideos(allVideos?.slice(10));
                setHashtagVideosToShow(allVideos?.slice(0, 10));
                setMuteStates(Array(allVideos?.length).fill(true)); // Initialize mute states
                console.log('🚀 ~ apisIntegration ~ res:', data?.data);
            } catch (error) {
                setIsLoading(false);
                console.log('Error fetching trending videos : ', error);
            }
        };
        apisIntegration();
    }, []);

    const handleScroll = useCallback(() => {
        if (mainDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = mainDivRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                console.log('BOTTTTOMMMM');
                // Adding a small buffer
                const newVideosToShow = hashtagVideos.slice(videosToShow, videosToShow + 10);
                setHashtagVideosToShow((prev) => [...prev, ...newVideosToShow]);
                setVideosToShow((prev) => prev + 10);
                setMuteStates((prevMuteStates) => [...prevMuteStates, ...Array(newVideosToShow.length).fill(true)]);
            }
        }
    }, [videosToShow, hashtagVideos]);

    useEffect(() => {
        const mainDiv = mainDivRef.current;
        if (mainDiv) {
            mainDiv.addEventListener('scroll', handleScroll);
            return () => mainDiv.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    const openVideoModal = (video: any) => {
        setVideoModalInfo(video);
        setVideoModal(true);
    };

    const categoryHandler = (index: number) => {
        setSelectedCategory(index);
    };

    return (
        <Layout>
            <div ref={mainDivRef} className={`${styles.root} h-screen overflow-y-auto`}>
                {isLoading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '1rem',
                            width: '100%',
                            height: '90vh',
                        }}
                    >
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-row mt-8 gap-4 overflow-auto">
                            {DISCOVER_CATEGORIES?.map((category, index) => (
                                <button
                                    onClick={() => categoryHandler(index)}
                                    className={`flex items-center px-3 h-[2.625rem] ${
                                        selectedCategory === index
                                            ? 'text-white bg-black'
                                            : 'text-[#222] bg-unselected-category'
                                    }  rounded-lg cursor-pointer text-base border-none whitespace-nowrap w-auto`}
                                    key={index}
                                >
                                    {category?.category}
                                </button>
                            ))}
                        </div>
                        <div>
                            <VideoPanel
                                openVideoModal={openVideoModal}
                                videos={hashtagVideosToShow}
                                muteStates={muteStates} // Pass mute states
                                setMuteStates={setMuteStates} // Pass setter for mute states
                            />
                        </div>
                    </>
                )}

                <PopupForVideoPlayer
                    onBlockPopup={() => setBlockPopup(true)}
                    onReportPopup={() => setReportPopup(true)}
                    videoModal={videoModal}
                    onclose={() => setVideoModal(false)}
                    info={videoModalInfo}
                    gifts={() => setGiftPopup(true)}
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
                <Gifts openGifts={giftPopup} onGiftsClose={() => setGiftPopup(false)} />
                <div>
                    <StoriesOnPublicProfile
                        story={storyPopup}
                        onclose={() => setStoryPopup(false)}
                        openReport={() => setReportPopup(true)}
                    />
                </div>
            </div>
        </Layout>
    );
}
