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
    const [videoModal, setVideoModal] = useState<any>(false);
    const [videoModalInfo, setVideoModalInfo] = useState<any>({});
    const token = localStorage.getItem('token');
    const [reportPopup, setReportPopup] = useState<any>(false);
    const [blockPopup, setBlockPopup] = useState<any>(false);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [isPaginating, setIsPaginating] = useState<any>(false);
    const [giftPopup, setGiftPopup] = useState<any>(false);
    const [storyPopup, setStoryPopup] = useState<any>(false);
    const [selectedCategory, setSelectedCategory] = useState<any>('');
    const mainDivRef = useRef<any>(null);
    const [muteStates, setMuteStates] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const getExplorePageData = async () => {
        setIsPaginating(true);
        try {
            const response = await fetch(
                `${API_KEY}/media-content/public/videos/feed/upgraded/${selectedCategory}?page=${pageNumber}&pageSize=5`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { data } = await response.json();
            setIsPaginating(false);
            if (data) {
                // Append the entire record to the existing data
                setExploredVideos((prev: any) => [...prev, ...data]);
                setMuteStates((prevMuteStates: any) => [
                    ...prevMuteStates,
                    ...Array(data?.length).fill(true),
                ]);
            }
        } catch (error) {
            setIsPaginating(false);
            console.log('Error fetching trending videos : ', error);
        }
    };

    const handleScroll = useCallback(() => {
        if (mainDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = mainDivRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 0.5) {
                // Adding a small buffer
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
    };

    useEffect(() => {
        const mainDiv = mainDivRef.current;
        if (mainDiv) {
            mainDiv.addEventListener('scroll', handleScroll);
            return () => mainDiv.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await getExplorePageData();
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const refreshWithNewCategory = async () => {
        setExploredVideos('');
        getExplorePageData();
    };

    useUpdateEffect(() => {
        getExplorePageData();
    }, [pageNumber]);

    useUpdateEffect(() => {
        refreshWithNewCategory();
    }, [selectedCategory]);

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
                        <div className="pl-6">
                            <div className="flex flex-row mt-8 gap-4 overflow-auto">
                                {DISCOVER_CATEGORIES?.map((category, index) => (
                                    <p
                                        onClick={() => categoryHandler(category.category)}
                                        className={`flex items-center px-3 h-[2.625rem] ${
                                            selectedCategory === category.category
                                                ? 'text-white bg-black'
                                                : 'text-[#222] bg-unselected-category'
                                        }  rounded-lg cursor-pointer text-base border-none whitespace-nowrap w-auto`}
                                        key={index}
                                    >
                                        {category?.category}
                                    </p>
                                ))}
                            </div>
                            <VideoPanel
                                openVideoModal={openVideoModal}
                                videos={exploredVideos}
                                muteStates={muteStates} // Pass mute states
                                setMuteStates={setMuteStates} // Pass setter for mute states
                            />
                        </div>
                        {isPaginating && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '1rem',
                                }}
                            >
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
