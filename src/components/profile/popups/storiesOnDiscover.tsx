import { ClickAwayListener, Modal } from "@mui/material"
import style from "./storiesOnPublicProfile.module.scss"
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import VideoPlayer from "./storyVideo";
const API_KEY = process.env.VITE_API_URL;

export default function StoriesOnDiscover({ story, onclose, openReport }: any) {




    const mockStories = [
    {
        stories: [
        {
            thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/thumbnail/6436660cacee813edc53be2a-thumbnail.jpg",

            reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/reduced/6436660cacee813edc53be2a-reduced.mp4",
            user: {
            name: "John Doe",
            username: "john_doe",
            avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",
            }
        }
        ]
    },
    {
        stories: [
        {
            thumbnailUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/thumbnail/6436660cacee813edc53be2a-thumbnail.jpg",

            reducedVideoUrl: "https://d1qomu2i6h2trq.cloudfront.net/output/videos/6436660cacee813edc53be2a/reduced/6436660cacee813edc53be2a-reduced.mp4",
            
            user: {
            name: "Jane Smith",
            username: "jane_smith",
            avatar: "https://seezitt-videos-source-bucket.s3.amazonaws.com/1671036058694-3Cc3SHjbOh.jpg",
            }
        }
        ]
    },
    // Add more stories data as needed
    ];

    
    const token = localStorage.getItem('token');
    const [sliderIndex, setSliderIndex] = useState<any>(0)
    const sliderRef = useRef<any>(null);
    const [storiesIndex, setStoriesIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isplaying, setIsplaying] = useState(true);
    const [ismute, setMute] = useState(true);
    const [dropdown, setDropdown] = useState(false);

    const [fetchStories, setFetchStories] = useState<any>()
    const [stories, setStories] = useState<any>(mockStories)

    useEffect(() => {
        fetch(`${API_KEY}/media-content/stories`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            setFetchStories(data.data)
            setStories(data.data[0].stories)
        }).catch((err) => {
            console.log('collectons error', err);
        })
    }, [])

    const settings = {
        dots: true,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex: any, newIndex: any) => handleBeforeChange(oldIndex, newIndex),
    };
    const handleBeforeChange = (oldIndex: any, newIndex: any) => {
        // Pause the video in the old slide before changing to the new slide
        const oldVideo: any = document.getElementById(`video-${oldIndex}`);
        if (oldVideo) {
            oldVideo.pause();
        }
    };
    const handleVideoTimeUpdate = (event: any) => {
        const video = event.target;
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
    };


    const handleAfterChange = (currentSlide: any) => {
        // Play the video in the new slide
        setSliderIndex(currentSlide)
        // const updateProgress = (event: any) => handleVideoTimeUpdate(event);
        const newVideo: any = document.getElementById(`video-${currentSlide}`);

        if (newVideo) {
            newVideo.play();
            // newVideo.addEventListener('timeupdate', updateProgress);
        }
        if (ismute  === false){
            setMute(true)
        }

    };
    const handlepause = () => {
        // const updateProgress = (event: any) => handleVideoTimeUpdate(event);
        const Video: any = document.getElementById(`video-${sliderIndex}`);
        if (isplaying) {
            Video.pause()
            setIsplaying(false)
        } else {
            setIsplaying(true)
            Video.play()
        }
    };
    const handlemute = () => {
        // const updateProgress = (event: any) => handleVideoTimeUpdate(event);
        const Video: any = document.getElementById(`video-${sliderIndex}`);
        if (ismute) {
            Video.muted = true
            setMute(false)
        }
        else {
            setMute(true)
            Video.muted = false
        }
    };


    const handleVideoEnded = () => {
        // Move to the next slide when the current video ends
        if (sliderIndex !== stories.length - 1) {
            sliderRef.current.slickNext();
        } else {
            if (fetchStories[storiesIndex + 1]) {
                setStories(fetchStories[storiesIndex + 1]?.stories)
                setStoriesIndex(storiesIndex + 1)
            } else {
            }
        }
    };

    return (
        <div className={style.popup}>
            <Modal open={story}>
                <ClickAwayListener onClickAway={() => {
                    onclose()
                    setSliderIndex(0)
                }}>
                    <div className={style.parent}>
                        <img onClick={() => {
                            onclose()
                            setSliderIndex(0)
                        }} src="../../../../public/images/icons/storiesSec/close 1 (1).svg" alt="" />
                        <div>
                            {fetchStories[storiesIndex - 2]?.stories[0]?.thumbnailUrl ?
                                <img src={fetchStories[storiesIndex + 2]?.stories[0]?.thumbnailUrl} alt="" /> : null
                            }
                        </div>
                        <div>
                            {fetchStories[storiesIndex - 1]?.stories[0]?.thumbnailUrl ?
                                <img src={fetchStories[storiesIndex + 2]?.stories[0]?.thumbnailUrl} alt="" /> : null
                            }
                        </div>                       
                         <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange} className={style.slider2} >
                            {
                                stories?.map((story: any, i: any) => {
                                    return (
                                        <div className={style.story} key={i}>
                                            <VideoPlayer
                                                videoPath={story?.reducedVideoUrl}
                                                index={i}
                                                onEnded={handleVideoEnded}
                                                autoplay={i === sliderIndex}
                                                onTimeUpdate={handleVideoTimeUpdate}
                                            />
                                            <div className={style.videoHeaders}>
                                                <div className={style.inputsParent}>
                                                    {
                                                        stories.map((obj: any, index: any) => {
                                                            return (
                                                                <input className={style.progressBar} type="range" value={i > index ? 100 : i < index ? 0 : progress} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className={style.userData}>
                                                    <img width={25} height={25} src={story?.user?.avatar} alt="" />
                                                    <div>
                                                        <p>{story?.user?.name}</p>
                                                        <p><img src="../../../../public/images/avg.svg" alt="" />{story?.user?.username}</p>
                                                    </div>
                                                    <p className={style.time}>2 hrs</p>
                                                    {
                                                        isplaying ?
                                                            <img onClick={handlepause} src="../../../../public/images/icons/storiesSec/Group (11).svg" alt="" />
                                                            :
                                                            <img onClick={handlepause} src="../../../../public/images/icons/storiesSec/pause.svg" alt="" />
                                                    }
                                                    {
                                                        ismute ?
                                                            <img onClick={handlemute} src="../../../../public/images/icons/storiesSec/Volume Up.svg" alt="" />
                                                            :
                                                            <img onClick={handlemute} src="../../../../public/images/icons/storiesSec/Volume Off.svg" alt="" />

                                                    }
                                                    <img onClick={() => {
                                                        setDropdown(!dropdown)
                                                    }} src="../../../../public/images/icons/storiesSec/Group (12).svg" alt="" />
                                                    {
                                                        dropdown ? <div className={style.dropdown} onClick={() => {
                                                            openReport()
                                                        }}>
                                                            <p> <img src="../../../../public/images/icons/report.svg" alt="" />Report</p>
                                                        </div> : null
                                                    }

                                                </div>
                                            </div>
                                            <div className={style.bottomSide}>
                                                <input placeholder="Send message" type="text" />
                                                <img src="../../../../public/images/icons/storiesSec/Heart.svg" alt="" />
                                                <img src="../../../../public/images/icons/storiesSec/Send.svg" alt="" />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                        <div>
                            {fetchStories[storiesIndex + 1]?.stories[0]?.thumbnailUrl ?
                                <img src={fetchStories[storiesIndex + 2]?.stories[0]?.thumbnailUrl} alt="" /> : null
                            }                        </div>
                        <div>
                            {fetchStories[storiesIndex + 2]?.stories[0]?.thumbnailUrl ?
                                <img src={fetchStories[storiesIndex + 2]?.stories[0]?.thumbnailUrl} alt="" /> : null
                            }
                        </div>
                    </div>
                </ClickAwayListener >
            </Modal >
        </div >
    )
}
