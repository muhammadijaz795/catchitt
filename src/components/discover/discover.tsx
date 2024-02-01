import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import Stories from './components/stories';
import SuggestedFollower from './components/suggestedFollower';
import VideoPanel from './components/videoPanel';
import styles from './discover.module.scss';
import PopupForVideoPlayer from '../profile/popups/popupForVideoPlayer';
import PopupForReport from '../profile/popups/PopupForReport';
import PopupForBlock from '../profile/popups/popupForBlock';
import Gifts from './popups/gifts';
import StoriesOnPublicProfile from '../profile/popups/storiesOnPublicProfile';
import Layout from '../../shared/layout';

export default function Discover() {
    const API_KEY = process.env.VITE_API_URL;
    const { selectedIndex, setIndex } = useAuthStore();
    const [trendingvideos, setTrendingvideos] = useState([]);
    const [hashtagVideos, setHashtagVideos] = useState([]);
    const [stories, setStories] = useState([]);
    const [videoModal, setVideoModal] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const token = useAuthStore((state) => state.token);
    const [reportPopup, setReportPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [giftPopup, setGiftPopup] = useState(false);
    const [storyPopup, setStoryPopup] = useState(false);

    const [randomAccs, setRandomAccs] = useState([]);
    const Navigate = useNavigate();

    const getRandomAccounts = (arr: any, count: number) => {
        const shuffled = arr.slice(); // Create a copy of the array to avoid modifying the original one
        let i = arr.length;
        let temp;
        let index;

        while (i > 0) {
            index = Math.floor(Math.random() * i);
            i--;

            // Swap elements between the current index and the randomly selected index
            temp = shuffled[i];
            shuffled[i] = shuffled[index];
            shuffled[index] = temp;
        }

        return shuffled.slice(0, count); // Return the first 'count' elements
    };
    useEffect(() => {
        !token ? Navigate('/auth') : null;
        const apisIntegration = async () => {
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
            try {
                const response = await fetch(`${API_KEY}/profile/public/suggested-users?page=1`, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setRandomAccs(getRandomAccounts(responseData.data.data, 10));
                } else {
                    console.log(response);
                }
            } catch (error) {
                // console.error(error);
                console.error();
            }

            // try {
            //     const response = await fetch(`${API_KEY}/discover/suggested-search`, {
            //         method: 'GET',
            //         headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            //     });
            //     const res = await response.json();
            //     console.log('suggestedSearch', res);
            // } catch (error) {
            //     console.log('error suggestedSearch', error);
            // }

            // try {
            //     const response = await fetch(`${API_KEY}/discover/nearby/videos`, {
            //         method: 'GET',
            //         headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            //     });
            //     const res = await response.json();
            //     console.log('suggestedSearch', res)
            // } catch (error) {
            //     console.log('error nearbyvideos', error);
            // }

            // try {
            //     const response = await fetch(`${API_KEY}/discover/videos-by-hashtag`, {
            //         method: 'GET',
            //         headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            //     });
            //     const res = await response.json();
            //     console.log('videosbyhashtag', res);
            // } catch (error) {
            //     console.log('error videosbyhashtag', error);
            // }
        };
        apisIntegration();
    }, []);

    const [videosToShow, setVideosToShow] = useState(10);

    const handleScroll = () => {
        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const totalHeight = document.documentElement.offsetHeight;

        // Adjust the threshold as needed
        if (scrollPosition === totalHeight) {
            // When the user reaches the bottom, load more videos
            setVideosToShow((prev) => prev + 10);
        }
    };

    useEffect(() => {
        // Add a scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const openvideomodal = (video: any) => {
        setVideoModalInfo(video);
        setVideoModal(true);
        console.log(video);
    };

    const sendDataByQ = (argument: any) => {
        const url = `/videos/data?hashtag=${encodeURIComponent(argument)}`;
        window.location.href = url;
    };

    return (
        <Layout>
            <div className={styles.root}>
                {/* <div className={styles.container}> */}
                <div className={styles.rightSide}>
                    {/* Slider Configration for Stories */}
                    <div className={styles.sliderp}>
                        <div className={styles.slider}>
                            <Stories showStories={() => setStoryPopup(true)} />
                        </div>
                    </div>
                    <div style={{ marginTop: 48 }} className={styles.postsp}>
                        <div className="d-flex justify-content-between">
                            <p className={styles.trendingText}>Trending</p>
                            <p
                                className={styles.seeAll}
                                onClick={() => {
                                    Navigate('/videos/trending-videos');
                                }}
                            >
                                See All
                            </p>
                        </div>
                        <div className={styles.posts}>
                            {trendingvideos.length >= 0
                                ? trendingvideos.map((video: any, i) => {
                                      return (
                                          <VideoPanel
                                              index={i}
                                              video={video}
                                              videomodal={() => openvideomodal(video)}
                                          />
                                      );
                                  })
                                : null}
                        </div>
                    </div>
                    <div className={styles.suggestedHashTag}>
                        <img src="../../../public/images/motherDay.svg" alt="" />
                        <p className={styles.joinH}>Join hashtag</p>
                        <p className={styles.motherday}>#MothersDay</p>
                    </div>
                    <div className={styles.suggestedUsers}>
                        <div className="d-flex justify-content-between">
                            <p className={styles.trendingText}>Suggested people to follow</p>
                            <p
                                className={styles.seeAll}
                                onClick={() => Navigate('/suggested-accounts')}
                            >
                                See All
                            </p>
                        </div>
                        <div className={styles.followers}>
                            {randomAccs.slice(0, videosToShow).map((randonUser: any) => {
                                return <SuggestedFollower randonUser={randonUser} />;
                            })}
                        </div>
                    </div>
                    <div className={styles.invite}>
                        <img src="../../../public/images/invite.svg" alt="" />
                        <div>
                            <p>
                                Invite a friend and get
                                <span>FREE coins!</span>
                            </p>
                            <button>
                                <img src="../../../public/images/icons/copy.svg" alt="" />
                                Copy link
                            </button>
                        </div>
                    </div>

                    {hashtagVideos.map((obj: any, i) => {
                        return (
                            <div style={{ marginTop: 41 }} key={i} className={styles.postsp}>
                                <div className="d-flex justify-content-between">
                                    <p className={styles.trendingText}>{obj?.name}</p>
                                    <p
                                        className={styles.seeAll}
                                        onClick={() => sendDataByQ(obj.name)}
                                    >
                                        See All
                                    </p>
                                </div>
                                <div className={styles.posts}>
                                    {obj?.relatedVideos
                                        .slice(0, videosToShow)
                                        .map((video: any, i: any) => {
                                            return (
                                                <VideoPanel
                                                    videomodal={() => openvideomodal(video)}
                                                    video={video}
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* </div> */}

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
