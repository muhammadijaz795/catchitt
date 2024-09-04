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
import { useUpdateEffect } from 'react-use';

export default function Discover() {
    const API_KEY = process.env.VITE_API_URL;
    const [exploredVideos, setExploredVideos] = useState<any>([]);
    const [videoModal, setVideoModal] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const token = localStorage.getItem('token');
    const [reportPopup, setReportPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPaginating, setIsPaginating] = useState(false);
    const [giftPopup, setGiftPopup] = useState(false);
    const [storyPopup, setStoryPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const mainDivRef = useRef<any>(null);
    const [muteStates, setMuteStates] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState(1);

    // theme
    const [darkTheme, setdarkTheme] = useState('');

    const getExplorePageData = useCallback(async () => {
        let identifier = selectedCategory ? `/${selectedCategory}` : '';
        setIsPaginating(true);
        try {
            const response = await fetch(
                `${API_KEY}/media-content/public/videos/feed/upgraded${identifier}?page=${pageNumber}&pageSize=15&forWeb=1`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await response.json();
            console.log('DATA >>>>>>> ', data?.data);
            if (Array.isArray(data?.data)) {
                setExploredVideos((prev: any) => [...prev, ...data?.data]);
                setMuteStates((prevMuteStates: any) => [
                    ...prevMuteStates,
                    ...Array(data?.data?.length).fill(true),
                ]);
            }
        } catch (error) {
            console.error('Error fetching trending videos:', error);
        } finally {
            setIsPaginating(false);
        }
    }, [API_KEY, selectedCategory, pageNumber, token]);

    const handleScroll = useCallback(() => {
        if (mainDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = mainDivRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 0.5) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        }
    }, []);

    const openVideoModal = (video: any) => {
        setVideoModalInfo(video);
        setVideoModal(true);
    };

    const categoryHandler = (category: string) => {
        setSelectedCategory(category);
        setPageNumber(1);
        setExploredVideos([]);
    };

    useEffect(() => {
        const mainDiv = mainDivRef.current;
        if (mainDiv) {
            mainDiv.addEventListener('scroll', handleScroll);
            return () => mainDiv.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    useEffect(() => {
        setIsLoading(true);
        getExplorePageData();
        setIsLoading(false);
    }, [getExplorePageData]);

    useUpdateEffect(() => {
        getExplorePageData();
    }, [pageNumber]);

    useUpdateEffect(() => {
        setPageNumber(1);
        setExploredVideos([]);
        getExplorePageData();
    }, [selectedCategory]);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    return (
        <Layout>
            <div
                ref={mainDivRef}
                className={`${styles.root} h-screen overflow-y-auto ${darkTheme}`}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-screen">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className="pl-6">
                            <div className="flex flex-row mt-8 gap-4 overflow-auto">
                                {DISCOVER_CATEGORIES?.map((category, index) => (
                                    <p
                                        onClick={() => categoryHandler(category.name)}
                                        className={`flex items-center px-3 h-[2.625rem] ${
                                            selectedCategory === category.name
                                                ? `${
                                                      darkTheme
                                                          ? `${styles.selectedCategory}`
                                                          : 'text-white bg-black'
                                                  }`
                                                : `${
                                                      darkTheme
                                                          ? 'text-white bg-[#FFFFFF14]'
                                                          : 'text-[#222] bg-unselected-category shadow-sm mb-1'
                                                  }`
                                        } rounded-lg cursor-pointer text-base border-none whitespace-nowrap w-auto`}
                                        key={index}
                                    >
                                        {category.name}
                                    </p>
                                ))}
                            </div>
                            {exploredVideos.length > 0 ? (
                                <VideoPanel
                                    openVideoModal={openVideoModal}
                                    videos={exploredVideos}
                                    muteStates={muteStates}
                                    setMuteStates={setMuteStates}
                                />
                            ) : !isLoading && !isPaginating ? (
                                <div className="flex justify-center items-center mt-8 h-[70vh]">
                                    <p className="text-2xl font-bold">
                                        No videos available in this category.
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        {isPaginating && (
                            <div className="flex justify-center items-center p-4">
                                <CircularProgress />
                            </div>
                        )}
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
                <StoriesOnPublicProfile
                    story={storyPopup}
                    onclose={() => setStoryPopup(false)}
                    openReport={() => setReportPopup(true)}
                />
            </div>
        </Layout>
    );
}
