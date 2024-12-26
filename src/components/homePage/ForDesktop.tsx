import { CircularProgress } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    activeFvrt,
    activeLike,
    activeShare,
    commentInHome,
    defaultAvatar,
    fvrt,
    like,
    moreInHome,
    music,
    shareInHome,
    commentBlack,
    likeBlack,
    shareBlack,
    moreBlack,
    savedBlack,
} from '../../icons';
import { followingsMethod, getHomeVideos, addMoreVideos } from '../../redux/AsyncFuncs';
import Layout from '../../shared/layout';
import Action from './components/Action';
import CustomPlayer from './components/CustomPlayer';
import style from './index.module.scss';
import FollowUserCard from '../../shared/cards/followCard';
import { ToastContainer } from 'react-toastify';
import { updateHomeVideos } from '../../redux/reducers';
import VideoNavigation from '../../shared/navigation/VideoNavigation';
// import { Toast } from 'react-toastify/dist/components';

function ForDesktop(props: any) {
    interface Video {
        id: number;
        title: string;
        // Add more fields as per your API response
    }
    const {
        videoes,
        activeTab,
        setActiveTab,
        showVideoModal,
        videoModal,
        setSendPopup,
        generateEmbedCodeHandler,
    } = props || {};

    const [reportPopup, setreportPopup] = useState(false);
    const [followBtnLoading, setfollowBtnLoading] = useState(false);
    const [toastOfUploading, settoastOfUploading] = useState(false);
    const [followimgbtnId, setFollowimgbtnId] = useState('');
    const [showCopyPopup, setshowCopyPopup] = useState(false);
    const [darkTheme, setdarkTheme] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [countFlag, setCountFlag] = useState(true);
    // @ts-ignore
    const followers = useSelector((store) => store.reducers.followings);
    // @ts-ignore
    const isuploading = useSelector((store) => store?.reducers?.isuploading);
    // @ts-ignore
    const suggestedUsers = useSelector((store) => store.reducers.suggestedAccounts);
    const dispatch = useDispatch();
    const userActions: any = [
        { img: moreInHome, actionType: 'more' },
        { img: shareInHome, actionType: 'share', activeImage: shareInHome },
        { img: fvrt, actionType: 'fvrt', activeImage: fvrt },
        { img: commentInHome, actionType: 'comment', activeImage: commentInHome },
        { img: like, actionType: 'like', activeImage: activeLike },
    ];
    const userBlackActions: any = [
        { img: moreBlack, actionType: 'more' },
        { img: shareBlack, actionType: 'share', activeImage: shareBlack },
        { img: savedBlack, actionType: 'fvrt', activeImage: activeFvrt },
        { img: commentBlack, actionType: 'comment', activeImage: commentBlack },
        { img: likeBlack, actionType: 'like', activeImage: activeLike },
    ];

    const [videos, setVideos] = useState<Video[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingVideo, setLoadingVideo] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [scrollY, setScrollY] = useState(0);
    const scrollableDivRef = useRef<HTMLDivElement>(null);
    const currentVideo = useRef<HTMLDivElement>(null);
    const APP_URL = process.env.VITE_API_URL;
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

    const toggleMute = () => {
        setIsMuted((prevMuted) => !prevMuted);
    };

    const togglePlaying = () => {
        setIsPlaying((prevPlaying) => !prevPlaying);
    };

    const navigate: any = useNavigate();

    const follow_Unfollow_handler = async (id: any) => {
        setFollowimgbtnId(id);
        setfollowBtnLoading(true);
        try {
            dispatch(followingsMethod(id)).then(() => setfollowBtnLoading(false));
        } catch (error) {
            alert('Somthing went wrong');
            console.log(error);
        }
    };
    const copyHandler = (msg: string) => {
        navigator.clipboard.writeText(msg).then(() => {
            setshowCopyPopup(true);
            setTimeout(() => {
                setshowCopyPopup(false);
            }, 1500);
        });
    };

    useEffect(() => {
        if (isuploading?.isUploading) {
            settoastOfUploading(true);
        } else {
            settoastOfUploading(false);
        }
    }, [isuploading]);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
            setIsDarkTheme(true);
        }
    });

    useEffect(() => {
        // Function to fetch data from your API
        const fetchVideos = async () => {
            //   setLoading(true);
            console.log('loadingVideo', loadingVideo);
            try {
                // const response = await fetch(
                //     APP_URL + `/media-content/public/videos/feed/upgraded?page=${page}&pageSize=5`
                // );
                // const responseData = await response.json();
                // const newVideos = Array.isArray(responseData.data)
                //     ? (responseData.data as Video[])
                //     : [];

                // const newVideos = useSelector((store:any) => store.reducers.homeVideos);
                // const API_KEY = process.env.VITE_API_URL;
                // dispatch(addMoreVideos(newVideos));
                // dispatch(getHomeVideos({tab : 2, token})).then(() => setLoading(false));
                // setVideos(prevVideos => [...prevVideos, ...newVideos]);
                const token = localStorage.getItem('token');
                // setLoadingVideo(true);
                dispatch(addMoreVideos({ tab: activeTab, token, page: page }));
                console.log('loadingVideo', loadingVideo, 'countFlag', countFlag);
                setCountFlag(true);
                // setHasMore(newVideos.length > 0);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
            // const token = localStorage.getItem('token');
            // dispatch(getHomeVideos({tab : activeTab, token})).then(() => setLoading(false));

            setLoadingVideo(false);
        };

        if (hasMore) {
            fetchVideos();
        }
    }, [page]);

    const handleScroll = () => {
        if (scrollableDivRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = scrollableDivRef.current;
            console.log(
                'scroll position: ',
                scrollHeight,
                scrollTop + clientHeight + 100,
                scrollTop,
                clientHeight
            );
            if (scrollTop + clientHeight + 100 > scrollHeight && countFlag == true) {
                setLoadingVideo(true);
                setPage((prevPage) => prevPage + 1);
                setCountFlag(false);
                console.log('countFlag', countFlag);
            }
        }
    };

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollableDivRef.current) {
                scrollableDivRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // useEffect(() => {
    //     const observer = new IntersectionObserver((videoes) => {
    //         videoes.forEach((entry) => {
    //         if (entry.isIntersecting) {
    //           const index = itemsRef.current.indexOf(entry.target as HTMLLIElement);
    //           console.log("video index", index);
    //           setFocusedIndex(index);
    //         }
    //       });
    //     }, {
    //       threshold: 0.5
    //     });

    //     itemsRef.current.forEach((item) => {
    //       if (item) observer.observe(item);
    //     });

    //     return () => {
    //       itemsRef.current.forEach((item) => {
    //         if (item) observer.unobserve(item);
    //       });
    //     };
    //   }, []);


    return (
        <Layout
            showCopyPopup={showCopyPopup}
            showReportPopup={reportPopup}
            closeReportPopup={() => setreportPopup(false)}
            paddingBottomProp={true}
        >
            <div className={`relative  ${style.parent} ${darkTheme}`}>
                <VideoNavigation videoListRef={scrollableDivRef} />
                <div className={`${style.videoesParent} no-scrollbar`} ref={scrollableDivRef}>
                    {videoes?.length > 0 && !loading && activeTab !== 3 ? (
                        videoes.map((post: any, number: number) => {
                            return (
                                <div
                                    key={number}
                                    id={post?.mediaId}
                                    className={style.videoParent}
                                    // ref={(el: HTMLLIElement | null) => itemsRef.current[number] = el}
                                    // style={{
                                    // backgroundColor: focusedIndex === number ? 'blue' : 'red',
                                    // }}
                                >
                                    <div className={style.mediaContainer} style={{margin:'10px auto'}}>
                                        <div
                                            style={{
                                                // width: '100%',
                                                height: 'auto',
                                                margin: 'auto',
                                                overflowX: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                borderRadius: '16px',
                                            }}
                                            className={style.mainContainer}
                                        >
                                            <CustomPlayer
                                                isMuted={isMuted}
                                                onMuteToggle={toggleMute}
                                                isPlaying={isPlaying}
                                                togglePlayPause={togglePlaying}
                                                videoModal={videoModal}
                                                src={
                                                    post?.reducedVideoUrl
                                                        ? post?.reducedVideoUrl
                                                        : post?.reducedVideoHlsUrl
                                                        ? post?.reducedVideoHlsUrl
                                                        : post?.originalUrl
                                                }
                                                thumbnailImage={post?.thumbnailUrl}
                                                controls={true}
                                                post={post}
                                                number={number}
                                            />
                                        </div>

                                        <div className={style.actions}>
                                            {isDarkTheme == true &&
                                                userActions.map((obj: any, i: number) => {
                                                    return (
                                                        <Action
                                                            key={i}
                                                            copyHandler={copyHandler}
                                                            visibleReportPopup={() =>
                                                                setreportPopup(true)
                                                            }
                                                            generateEmbedCodeHandler={
                                                                generateEmbedCodeHandler
                                                            }
                                                            obj={obj}
                                                            popupHandler={() => setSendPopup(true)}
                                                            showVideoModal={showVideoModal}
                                                            post={post}
                                                        />
                                                    );
                                                })}
                                            {isDarkTheme == false &&
                                                userBlackActions.map((obj: any, i: number) => {
                                                    return (
                                                        <Action
                                                            key={i}
                                                            copyHandler={copyHandler}
                                                            visibleReportPopup={() =>
                                                                setreportPopup(true)
                                                            }
                                                            generateEmbedCodeHandler={
                                                                generateEmbedCodeHandler
                                                            }
                                                            obj={obj}
                                                            popupHandler={() => setSendPopup(true)}
                                                            showVideoModal={showVideoModal}
                                                            post={post}
                                                        />
                                                    );
                                                })}
                                            <div className={style.DivAvatarActionItemContainer}>
                                                <a
                                                    className="e1g2yhv83 css-1w9wqra-StyledLink-AvatarLink er1vbsz0"
                                                    href="#"
                                                    onClick={() =>
                                                        navigate(`/profile/${post?.user?._id}`)
                                                    }
                                                >
                                                    <div
                                                        className={style.AvatarDivContainer}
                                                        style={{ width: '48px', height: '48px' }}
                                                    >
                                                        <span
                                                            className={style.SpanAvatarContainer}
                                                            style={{
                                                                width: '48px',
                                                                height: '48px',
                                                            }}
                                                        >
                                                            <img
                                                                loading="lazy"
                                                                alt="sherjangkhan5"
                                                                src={
                                                                    post?.user?.avatar ||
                                                                    defaultAvatar
                                                                }
                                                                className="css-1zpj2q-ImgAvatar e1e9er4e1"
                                                            />
                                                        </span>
                                                    </div>
                                                </a>

                                                <button
                                                    className={style.AvatarFollowButton}
                                                    data-e2e="feed-follow"
                                                    onClick={() =>
                                                        follow_Unfollow_handler(post?.user?._id)
                                                    }
                                                >
                                                    <span className={style.ColorButtonContent}>
                                                        {followBtnLoading &&
                                                        followimgbtnId === post?.user?._id ? (
                                                            <CircularProgress
                                                                style={{ width: 3, height: 3 }}
                                                            />
                                                        ) : followers?.data?.some(
                                                              (user: any) =>
                                                                  user?.follower_userID?._id ===
                                                                  post?.user?._id
                                                          ) ? (
                                                            <svg
                                                                fill="white"
                                                                viewBox="0 0 48 48"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                            >
                                                                <path d="m19.71 36.03 19.73-30.5a1 1 0 0 1 1.39-.3l2.35 1.53c.46.3.6.92.3 1.38L22.01 41.3a2.4 2.4 0 0 1-3.83.28L4.85 26.33a1 1 0 0 1 .1-1.4l2.1-1.85a1 1 0 0 1 1.42.1L19.7 36.02Z"></path>
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                fill="white"
                                                                viewBox="0 0 48 48"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                            >
                                                                <path d="M26 7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v15H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h15v15a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V26h15a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H26V7Z"></path>
                                                            </svg>
                                                        )}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {loadingVideo && <CircularProgress />}
                                </div>
                            );
                        })
                    ) : videoes?.length === 0 && !loading && activeTab === 1 ? (
                        <div className={style.suggestedUsersContainer}>
                            {suggestedUsers.map((suggestedUser: any, key: number) => {
                                return (
                                    <FollowUserCard
                                        key={key}
                                        user={suggestedUser}
                                        darkTheme={darkTheme}
                                    />
                                );
                            })}
                        </div>
                    ) : !loading && activeTab === 3 ? (
                        <>
                            <h4>No LIVE Stream are available!</h4>
                        </>
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <CircularProgress />
                        </div>
                    )}
                </div>
                {toastOfUploading && (
                    <div className="w-[393px] h-[62px] rounded-[8px] bg-custom-gray-100 absolute right-[2rem] bottom-[2rem] z-[2] flex justify-between items-center px-[1rem]">
                        <p className="text-custom-dark-222 font-medium">
                            {' '}
                            We are uploading your video. Please wait..{/*Uploading 1 of 1 */}
                        </p>
                        <p
                            className="text-custom-primary font-medium cursor-pointer"
                            onClick={() => settoastOfUploading(false)}
                        >
                            Cancel
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default ForDesktop;
