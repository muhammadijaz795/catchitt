import { ClickAwayListener, Modal } from "@mui/material"
import style from "./storiesOnPublicProfile.module.scss"
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import VideoPlayer from "./storyVideo";
import { useParams } from "react-router-dom";
const API_KEY = process.env.VITE_API_URL;

export default function StoriesOnPublicProfile({ story, onclose, openReport }: any) {
    const params: any = useParams();
    const token = useAuthStore((state) => state.token);
    const auth = useAuthStore((state) => state._id);
    const [sliderIndex, setSliderIndex] = useState<any>(0)
    const sliderRef = useRef<any>(null);
    const [progress, setProgress] = useState(0);
    const [isplaying, setIsplaying] = useState(true);
    const [ismute, setMute] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const [stories, setStories] = useState<any>([])
    useEffect(() => {
        if (params.id) {
            fetch(`${API_KEY}/media-content/stories`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            }).then((res) => res.json()).then((data) => {
                setStories(data.data[0].stories)
            }).catch((err) => {
                console.log('collectons error', err);
            })
        } else {

            fetch(`${API_KEY}/media-content/stories`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            }).then((res) => res.json()).then((data) => {
                setStories(data.data[0].stories)
            }).catch((err) => {
                console.log('collectons error', err);
            })
        }
    }, [])
    console.log('stooooriesss',stories);
    

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
        } else {
            setMute(true)
            Video.muted = false
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
                        <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange} className={style.slider} >
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
                                                                <input
                                                                    className={style.progressBar} type="range" value={i > index ? 100 : i < index ? 0 : progress} />
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
                    </div>
                </ClickAwayListener >
            </Modal >
        </div >
    )
}
