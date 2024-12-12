import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import DiscoverStories from './components/discoverStories';

export default function Discover() {
    const { hashtag } = useParams();
    const API_KEY = process.env.VITE_API_URL;
    const [exploredVideos, setExploredVideos] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [videoModal, setVideoModal] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const token = localStorage.getItem('token');
    const [reportPopup, setReportPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [giftPopup, setGiftPopup] = useState(false);
    const [storyPopup, setStoryPopup] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(hashtag);
    const [muteStates, setMuteStates] = useState<any>([]);

    // theme
    const [darkTheme, setdarkTheme] = useState('');

    const getExplorePageData:any = async (signal: AbortSignal) => {
        let identifier = selectedCategory ? `/${selectedCategory}` : '';
        try {
            const response = await fetch(
                `${API_KEY}/media-content/public/videos/feed/upgraded${identifier}?page=${exploredVideos.page}&pageSize=${exploredVideos.pageSize}&forWeb=1`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    signal,
                }
            );
            const { data } = await response.json();
            console.log('DATA >>>>>>> ', data?.data);
            // if (data?.data.length === 0 && data?.hasNextPage) return getExplorePageData(signal);
            if (data?.data.length === 0) return setExploredVideos({ items: [], page: 1, pageSize: 15, totalItems: 0 });
            if (Array.isArray(data?.data)) {
                const exploredVideosObj = { ...exploredVideos };
                exploredVideosObj.items = [...exploredVideosObj.items, ...data?.data];
                exploredVideosObj.totalItems = data?.totalItems;
                console.log('exploredVideosObj >>>>>>> ', exploredVideosObj);
                setExploredVideos(exploredVideosObj);

                // setExploredVideos((prev: any) => [...prev, ...data?.data]);
                setMuteStates((prevMuteStates: any) => [
                    ...prevMuteStates,
                    ...Array(data?.data?.length)  .fill(true),
                ]);
            }
        } catch (error) {
            console.error('Error fetching trending videos:', error);
            setExploredVideos((prev: any) => ({ ...prev, totalItems: undefined }));

        }
    }


    const openVideoModal = (video: any) => {
        setVideoModalInfo(video);
        setVideoModal(true);
    };

    const categoryHandler = (category: string) => {
        setExploredVideos({ items: [], page: 1, pageSize: 15, totalItems: null });
        setSelectedCategory(category);
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchVedios = async () => {
            setIsLoading(true);
            await getExplorePageData(signal);
            setIsLoading(false);
        };
        fetchVedios();
        return () => {
            controller.abort();
        }
    }, []);

    useUpdateEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getExplorePageData(signal);
        return () => {
            controller.abort();
        }
    }, [exploredVideos.page]);


    useUpdateEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getExplorePageData(signal);
        return () => {
            controller.abort();
        }
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
                className={darkTheme}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-screen">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <DiscoverStories showStories={setStoryPopup} />
                        <div className=" pl-6 h-screen w-full overflow-y-auto no-scrollbar" id='scrollableDiv'>
                            <div className="flex flex-row mt-8 gap-4 overflow-auto">
                                {DISCOVER_CATEGORIES?.map((category, index) => (
                                    <p
                                        onClick={() => categoryHandler(category.name)}
                                        className={`flex items-center px-3 h-[2.625rem] ${selectedCategory === category.name
                                            ? `${darkTheme
                                                ? `${styles.selectedCategory}`
                                                : 'text-white bg-black'
                                            }`
                                            : `${darkTheme
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
                            <VideoPanel
                                fetchMore={() => setExploredVideos({ ...exploredVideos, page: exploredVideos.page + 1 })}
                                videos={exploredVideos}
                                openVideoModal={openVideoModal}
                                muteStates={muteStates}
                                setMuteStates={setMuteStates}
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
                <StoriesOnPublicProfile
                    story={storyPopup}
                    onclose={() => setStoryPopup([])}
                    openReport={() => setReportPopup(true)}
                    isDarkTheme={!!darkTheme}
                />
            </div>
        </Layout>
    );
}
