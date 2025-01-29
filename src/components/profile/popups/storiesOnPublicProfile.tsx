import { ClickAwayListener, Modal } from "@mui/material"
import style from "./storiesOnPublicProfile.module.scss"
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import VideoPlayer from "./storyVideo";
import { useNavigate, useParams } from "react-router-dom";
import { avgIcon, backArrow, crossClose, defaultAvatar, deleteVideoIcon, moreInWhite, nextArrow, pauseWhite, playWhite, prevArrow, report, storyHeart, storySend, volumeOff, volumeUp } from "../../../icons";
import PopupForDeleteVideo from "./popupForDeleteVideo";
import ReactSlider from "react-slider";
const API_KEY = process.env.VITE_API_URL;

function StoriesOnPublicProfile({ story, onclose, openReport, isDarkTheme }: any) {
    const params: any = useParams();
    // const token = localStorage.getItem('token');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const auth = useAuthStore((state) => state._id);
    const [sliderIndex, setSliderIndex] = useState<any>(0)
    const sliderRef = useRef<any>(null);
    const [progress, setProgress] = useState(0);
    const [dropdown, setDropdown] = useState(false);
    const [mediaToDelete, setMediaToDelete] = useState<any>(null)


    const [beforeItems, setBeforeItems] = useState<any>([]);
    const [afterItems, setAfterItems] = useState<any>([]);


    const storiesData = [
        {
            id: 1,
            thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/64359a250eeb9afcc5105f87/thumbnail/64359a250eeb9afcc5105f87-thumbnail.jpg",
            reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/643666c1acee813edc53c0da/reduced/643666c1acee813edc53c0da-reduced.mp4",
            user: {
                name: "John Doe",
                username: "john_doe",
                avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",

            }
        },
        {
            id: 2,
            thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/654926c9c1ce250c2599f86d/thumbnail/654926c9c1ce250c2599f86d-thumbnail.jpg",
            reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/659eb3144bdda87087451456/reduced/659eb3144bdda87087451456-reduced.mp4",
            user: {
                name: "Jane Smith",
                username: "jane_smith",
                avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",

            }
        },

        {
            id: 3,
            thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/643599f50eeb9afcc5105e93/thumbnail/643599f50eeb9afcc5105e93-thumbnail.jpg", reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/659eb3144bdda87087451456/reduced/659eb3144bdda87087451456-reduced.mp4",
            user: {
                name: "Jane Smith",
                username: "jane_smith",
                avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",

            }
        },

        {
            id: 4,
            thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/654926c9c1ce250c2599f86d/thumbnail/654926c9c1ce250c2599f86d-thumbnail.jpg",
            reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/659eb3144bdda87087451456/reduced/659eb3144bdda87087451456-reduced.mp4",
            user: {
                name: "Jane Smith",
                username: "jane_smith",
                avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",

            }
        },
        // Add more stories as needed
    ];

    const [stories, setStories] = useState<any>(storiesData)


    useEffect(() => {
        const beforeItems = stories.slice(Math.max(sliderIndex - 2, 0), sliderIndex);
        const afterItems = stories.slice(sliderIndex + 1, sliderIndex + 3);
        setBeforeItems(beforeItems as any);
        setAfterItems(afterItems as any);
    }, [sliderIndex, stories]);

    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : "";


    // useEffect(() => {
    //     console.log(params._id);
    //     if (!storyProfile) return;
    //     fetch(`${API_KEY}/media-content/stories/feed`, {
    //         method: 'GET',
    //         headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
    //     }).then((res) => res.json()).then((data) => {
    //         console.log('some is form to 😍😍🥶🥶',data);
    //         // setStories(data.data[0].stories)
    //     }).catch((err) => {
    //         console.log('collectons error', err);
    //     })

    // }, [])

    useEffect(() => {
        if (!story.length) return;
        setStories(story);
        return () => {
            setDropdown(false);
        }
    }, [story])

    const CustomPrevArrow = ({ onClick }: any) => (
        <button className="custom-prev" onClick={onClick}>
            <img src={prevArrow} alt="" />
        </button>
    );

    const CustomNextArrow = ({ onClick }: any) => (
        <button className="custom-next" onClick={onClick}>
            <img src={nextArrow} alt="" />
        </button>
    );

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex: any, newIndex: any) => handleBeforeChange(oldIndex, newIndex),
        prevArrow: <CustomPrevArrow />, // Custom Previous Button
        nextArrow: <CustomNextArrow />  // Custom Next Button
    };

    const handleBeforeChange = (oldIndex: any, newIndex: any) => {
        // Pause the video in the old slide before changing to the new slide
        const oldVideo: any = document.getElementById(`video-${oldIndex}`);
        if (oldVideo) {
            oldVideo.pause();
        }
    };

    const handleVideoTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const video = (event.target as HTMLVideoElement);
        console.dir(video);
        const currentProgress = (video.currentTime / video.duration || 0) * 100;
        setProgress(currentProgress);
    };

    const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const video = event.target as HTMLVideoElement;
        console.log('Video duration:', video.duration);
    };

    const handleAfterChange = (currentSlide: any) => {
        // Play the video in the new slide
        setSliderIndex(currentSlide)
        // const updateProgress = (event: any) => handleVideoTimeUpdate(event);
        const newVideo: any = document.getElementById(`video-${currentSlide}`);
        if (newVideo) {
            newVideo.play();
            newVideo.muted = false;
            setDropdown(false);
            const playPause = document.getElementById(`playPause-${currentSlide}`) as HTMLImageElement;
            if (playPause) {
                playPause.src = pauseWhite
            }

            const muteIndex = document.getElementById(`muteIndex-${currentSlide}`) as HTMLImageElement;
            if (muteIndex) {
                muteIndex.src = volumeUp
            }
            // newVideo.addEventListener('timeupdate', updateProgress);
        }
    };

    const handlepause = (event: React.MouseEvent<HTMLImageElement>) => {
        // const updateProgress = (event: any) => handleVideoTimeUpdate(event);
        const Video: any = document.getElementById(`video-${sliderIndex}`);
        if (!Video) return;
        if (Video.paused) {
            Video.play()
            event.currentTarget.src = pauseWhite
        } else {
            Video.pause()
            event.currentTarget.src = playWhite
        }
    };

    const handlemute = (event: React.MouseEvent<HTMLImageElement>) => {
        // const updateProgress = (event: any) => handleVideoTimeUpdate(event);
        const Video: any = document.getElementById(`video-${sliderIndex}`);
        if (!Video) return;
        if (Video.muted) {
            Video.muted = false
            event.currentTarget.src = volumeUp
        } else {
            Video.muted = true
            event.currentTarget.src = volumeOff
        }
    };

    const handleVideoEnded = () => {
        // Move to the next slide when the current video ends
        if (sliderIndex !== stories.length - 1) {
            sliderRef.current.slickNext();
        }
    };

    // useEffect(() => {
    //     const Video: any = document.getElementById(`video-${sliderIndex}`);
    //     if (Video) {
    //         if (ismute) {
    //             Video.muted = true
    //             setMute(false)
    //         } else {
    //             setMute(true)
    //             Video.muted = false
    //         }
    //     }
    // }, [sliderIndex])

    const getformattedHours = (createdTimeStamp: number) => {
        if (!createdTimeStamp) return;
        const diff = new Date().getTime() - new Date(createdTimeStamp).getTime();
        const hours = Math.floor(diff / 1000 / 60 / 60);
        if (hours >= 1) {
            return `${hours}hr${hours > 9 ? 's' : ''} ago`;
        }
        const minutes = Math.floor(diff / 1000 / 60);
        if (minutes >= 1) {
            return `${minutes}min${minutes > 9 ? 's' : ''} ago`;
        }
        return 'Just now';
    }

    const deleteStory = (story: any) => {
        setMediaToDelete(story);
    }

    return (
        <div className={style.popup}>
            <Modal open={Boolean(story?.length)}>
                <ClickAwayListener onClickAway={() => {
                    onclose()
                    setSliderIndex(0)
                }}>
                    <div className={style.parent}>
                        <img onClick={() => {
                            onclose()
                            setSliderIndex(0)
                        }} src={crossClose} alt="" />

                        <div className={style.storySideItems} style={{ justifyContent: 'flex-end' }}>
                            {beforeItems.map((item: any, index: number) => (
                                <div className={style.sideItem} key={index}>
                                    {item && (
                                        <>
                                            <img className={style.bgImage} src={item.thumbnailUrl || 'https://placehold.co/150x280'} alt="" />
                                            <div className={style.overlay}>
                                                <img onClick={() => navigate(`/profile/${item.user.username}`)} className={`${style.avatar} cursor-pointer`} src={item.user?.avatar || defaultAvatar} alt="" />
                                                <h6 className={style.username}>@{item.user?.username}</h6>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}

                        </div>
                        <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange} className={style.slider} >
                            {
                                stories?.map((story: any, i: any) => {
                                    return (
                                        <div className={`${style.story}`} key={i}>
                                            <VideoPlayer
                                                videoPath={story?.reducedVideoUrl?.length > 0 ? story?.reducedVideoUrl : story?.originalUrl}
                                                index={i}
                                                onEnded={handleVideoEnded}
                                                autoplay={i === sliderIndex}
                                                onTimeUpdate={handleVideoTimeUpdate}
                                                onLoadedMetadata={handleLoadedMetadata}
                                                thumbnailUrl={story?.thumbnailUrl ? story?.thumbnailUrl : 'https://placehold.co/150x280/DDDDDD/DDDDDD/png'}
                                            />
                                            <div className={style.videoHeaders}>
                                                <div className={style.inputsParent}>
                                                    {
                                                        stories.map((obj: any, index: any) => {
                                                            // return (
                                                            //     <input
                                                            //         key={index}
                                                            //         className={style.progressBar} type="range"
                                                            //         //  value={i > index ? 100 : i < index ? 0 : progress}
                                                            //           />
                                                            // )
                                                            return <ReactSlider
                                                                key={index}
                                                                className={`w-full h-1 rounded-lg`}
                                                                // thumbClassName="h-1 w-1 bg-gray-500 rounded-full cursor-pointer focus:outline-none"
                                                                trackClassName="rounded-lg"
                                                                value={i > index ? 100 : i < index ? 0 : progress}
                                                                // onChange={handleVolumeChange}
                                                                min={0}
                                                                max={100}
                                                                renderTrack={(props, state) => (
                                                                    <div
                                                                        {...props}
                                                                        className={`h-1 rounded-lg ${state.index === 0 ? "bg-gray-500" : "bg-gray-400"
                                                                            }`}
                                                                    />
                                                                )}
                                                            />
                                                        })
                                                    }
                                                </div>
                                                <div className={style.userData}>
                                                    <img className="cursor-pointer" onClick={() => navigate(`/profile/${story.user.username}`)} width={25} height={25} src={story?.user?.avatar || defaultAvatar} alt="avatar" />
                                                    <div>
                                                        <p>{story?.user?.name}</p>
                                                        <p><img src={avgIcon} alt="" />{story?.user?.username}</p>
                                                    </div>
                                                    <p className={style.time}>{getformattedHours(story?.createdTime)}</p>

                                                    <img onClick={handlepause} id={`playPause-${i}`} src={pauseWhite} alt="" />
                                                    <img onClick={handlemute} id={`muteIndex-${i}`} src={volumeUp} alt="" />

                                                    <img onClick={() => {
                                                        setDropdown(!dropdown)
                                                    }} src={moreInWhite} alt="" />
                                                    {
                                                        dropdown ? <div className={style.dropdown}>
                                                            <p onClick={() => { openReport() }} className="py-1"> <img src={report} alt="" />Report</p>
                                                            {story?.user?._id === userId && <p className="py-1" onClick={() => deleteStory(story)}> <img src={deleteVideoIcon} alt="" />Delete</p>}
                                                        </div> : null
                                                    }

                                                </div>
                                            </div>
                                            <div className={style.bottomSide}>
                                                <input placeholder="Send message" type="text" />
                                                <img className="cursor-pointer" src={storyHeart} alt="" />
                                                <img className="cursor-pointer" src={storySend} alt="" />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>

                        <div className={style.storySideItems}>
                            {afterItems.map((item: any, index: number) => (
                                <div className={style.sideItem} key={index}>
                                    {item && (
                                        <>
                                            <img className={style.bgImage} src={item.thumbnailUrl || 'https://placehold.co/150x280'} alt="" />
                                            <div className={style.overlay}>
                                                <img onClick={() => navigate(`/profile/${item.user.username}`)} className={`${style.avatar} cursor-pointer`} src={item.user?.avatar || defaultAvatar} alt="" />
                                                <h6 className={style.username}>@{item.user?.username}</h6>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>
                </ClickAwayListener >
            </Modal >
            <PopupForDeleteVideo
                entity="story"
                openBlock={Boolean(mediaToDelete)}
                onBlockClose={() => setMediaToDelete(null)}
                info={mediaToDelete}
                darkTheme={isDarkTheme}
                // @ts-ignore
                userId={{ id: userId, name: '' }}
            />
        </div >
    )
}


export default StoriesOnPublicProfile;


