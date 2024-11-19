import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './customPlayer.module.scss';
import {
    music,
    play,
    pause,
    volumeMute,
    volumeUnmute,
} from '../../../icons';
import HashtagText from '../../../shared/hashTag/HashtagText';
import { isUserLoggedIn } from '../../../utils/common';

function CustomPlayer({ isMuted, onMuteToggle, src, videoModal, post, thumbnailImage, controls, number }: any) {
    const [duration, setDuration] = useState<number>();
    const [playingTime, setPlayingTime] = useState<number>();
    const { ref, inView, entry } = useInView({
        rootMargin: '-400px 0px -200px 0px',
    });

    var video = document.createElement('video');
    let videoRef: any = useRef();
    const seekbarRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [muted, setMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [isDragging, setIsDragging] = useState(false);
    const [videoSize, setVideoSize] = useState({ width: '100vw', height: '100vh' });
    // const progress = (currentTime / post?.duration) * 100;
    video.onloadedmetadata = function () {
        setDuration(video?.duration);
        setPlayingTime(video?.currentTime);
    };
    // console.log("number", number);
    video.src = src; // Replace with the URL of your video
    video.load(); // Start loading the video metadata

    useEffect(() => {
        if (inView && !videoModal && isPlaying) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    }, [inView, videoModal]);


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // useEffect(() => {
    //     if (videoRef.current) {
    //         if(isPlaying){
    //             videoRef?.current?.play();
    //         }else{
    //             videoRef?.current?.pause();
    //         }
    //     }
    // }, [isPlaying]);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleMuteAndUnmute = () => {
        onMuteToggle();
    };




    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
            }}
            ref={ref}
            className={`${style.mainContainer} video-container`}
        >
            <div className={style.videoContainer}  
            style={{backgroundImage:
                `url(${thumbnailImage})`
            }} 
            onClick={togglePlayPause}>
                <video
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate"
                    loop={true}
                    autoPlay={videoModal ? false : inView}
                    controls={false} //{controls}
                    style={{ height: '85vh', position: 'relative', zIndex: 1, }}
                    src={src}
                    ref={videoRef}
                    className={style.video}
                    preload='none' //{number == 0 ? 'auto' : 'none'}
                    playsInline
                />

            </div>

            <div className={style.DivMediaCardBottom}>
                <div className={style.textBox}>
                    <p
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {' '}
                        {post?.user?.username}
                    </p>
                    <p
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {' '}
                       <HashtagText text={post?.description} />
                    </p>
                    {post?.sound && (
                        <p
                            className="flex"
                            style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <img src={music} alt="" />
                            {isUserLoggedIn() ?
                            (post?.sound?.category): (post?.sound?.category.name) }
                        </p>
                    )}
                </div>

                <div className={style.videoMediaContainer}>
                    <div role="button" aria-label="Play" aria-pressed="true" data-e2e="video-play" className={style.playButton} onClick={togglePlayPause}>
                        {isPlaying ? (
                            <svg width="20" data-e2e="" height="20" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 6C8 5.44771 8.44772 5 9 5H17C17.5523 5 18 5.44772 18 6V42C18 42.5523 17.5523 43 17 43H9C8.44772 43 8 42.5523 8 42V6Z"></path>
                                <path d="M30 6C30 5.44771 30.4477 5 31 5H39C39.5523 5 40 5.44772 40 6V42C40 42.5523 39.5523 43 39 43H31C30.4477 43 30 42.5523 30 42V6Z"></path>
                            </svg>) :
                            (<svg width="20" data-e2e="" height="20" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"></path>
                            </svg>)}
                    </div>
                    <div className={style.progressBar}>
                        <div className={style.progressBarDetail}>
                            <div className={style.devSeekBar}
                            // style={{
                            //     width: `${progress}%`,
                            //     height: '100%',
                            //     backgroundColor: '#fff',
                            //   }}
                            >
                            </div>
                            <div className={style.DivSeekBarCircle} ></div>
                            <div className={style.DivSeekBar} ></div>
                        </div>
                    </div>
                    <div className={style.videoAudioTotalContainer}>
                        {/* <div className="css-vy3xzw-DivMiniPlayerIconContainer e1snjswd5">
                                        <div className="css-1yy6ha5-DivMiniPlayerButtonContainer e1vz198y0">
                                            <svg fill="currentColor" font-size="21" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" >
                                                <path d="M19.2 7h9.6c2.03 0 3.3 0 4.27.08.92.08 1.2.2 1.3.25a3 3 0 0 1 1.3 1.3c.05.1.17.38.25 1.3.08.96.08 2.24.08 4.27V20h4v-5.8c0-3.92 0-5.88-.76-7.38a7 7 0 0 0-3.06-3.06C34.68 3 32.72 3 28.8 3h-9.6c-3.92 0-5.88 0-7.38.76a7 7 0 0 0-3.06 3.06C8 8.32 8 10.28 8 14.2v19.6c0 3.92 0 5.88.76 7.38a7 7 0 0 0 3.06 3.06c1.5.76 3.46.76 7.38.76h3.85c-.05-.79-.05-1.75-.05-3v-1h-3.8c-2.03 0-3.3 0-4.27-.08-.92-.08-1.2-.2-1.3-.25a3 3 0 0 1-1.3-1.3c-.05-.1-.17-.38-.25-1.3-.08-.96-.08-2.24-.08-4.27V14.2c0-2.03 0-3.3.08-4.27.08-.92.2-1.2.25-1.3a3 3 0 0 1 1.3-1.3c.1-.05.38-.17 1.3-.25C15.89 7 17.17 7 19.2 7Z"></path>
                                                <path d="M27.44 26.18c-.44.86-.44 1.98-.44 4.22v9.2c0 2.24 0 3.36.44 4.22a4 4 0 0 0 1.74 1.74c.86.44 1.98.44 4.22.44h4.2c2.24 0 3.36 0 4.22-.44a4 4 0 0 0 1.74-1.74c.44-.86.44-1.98.44-4.22v-9.2c0-2.24 0-3.36-.44-4.22a4 4 0 0 0-1.74-1.74C40.96 24 39.84 24 37.6 24h-4.2c-2.24 0-3.36 0-4.22.44a4 4 0 0 0-1.74 1.74ZM37.6 28c1.19 0 1.84 0 2.3.04h.05v.06c.05.46.05 1.11.05 2.3v9.2c0 1.19 0 1.84-.04 2.3v.05h-.06c-.46.05-1.11.05-2.3.05h-4.2c-1.19 0-1.84 0-2.3-.04h-.05v-.06C31 41.44 31 40.8 31 39.6v-9.2c0-1.19 0-1.84.04-2.3v-.05h.06c.46-.05 1.11-.05 2.3-.05h4.2ZM14.83 10.67a1 1 0 0 0 0 1.42l5.78 5.77-2.29 2.3a.6.6 0 0 0 .33 1.02l7.97 1.29a.82.82 0 0 0 .93-.94l-1.29-7.96a.6.6 0 0 0-1.02-.33l-2.3 2.3-5.77-5.79a1 1 0 0 0-1.42 0l-.92.92Z"></path>
                                            </svg>
                                        </div>
                                    </div> */}

                        <div className={style.videoAudioContainer}>
                            <div data-e2e="video-sound" role="button" className={style.volumeButton} onClick={onMuteToggle}>
                                {isMuted ?
                                    (<svg width="24" data-e2e="" height="24" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25 10.8685C25 8.47242 22.3296 7.04325 20.3359 8.37236L10.3944 15H6C4.34315 15 3 16.3431 3 18V30C3 31.6568 4.34314 33 6 33H10.3944L20.3359 39.6276C22.3296 40.9567 25 39.5276 25 37.1315V10.8685ZM29.2929 18.1213L35.1716 24L29.2929 29.8787C28.9024 30.2692 28.9024 30.9024 29.2929 31.2929L30.7071 32.7071C31.0976 33.0976 31.7308 33.0976 32.1213 32.7071L38 26.8284L43.8787 32.7071C44.2692 33.0976 44.9024 33.0976 45.2929 32.7071L46.7071 31.2929C47.0976 30.9024 47.0976 30.2692 46.7071 29.8787L40.8284 24L46.7071 18.1213C47.0976 17.7308 47.0976 17.0976 46.7071 16.7071L45.2929 15.2929C44.9024 14.9024 44.2692 14.9024 43.8787 15.2929L38 21.1716L32.1213 15.2929C31.7308 14.9024 31.0976 14.9024 30.7071 15.2929L29.2929 16.7071C28.9024 17.0976 28.9024 17.7308 29.2929 18.1213Z"></path>
                                    </svg>) :
                                    (<svg width="24" data-e2e="" height="24" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3359 8.37236C22.3296 7.04325 25 8.47242 25 10.8685V37.1315C25 39.5276 22.3296 40.9567 20.3359 39.6276L10.3944 33H6C4.34314 33 3 31.6568 3 30V18C3 16.3431 4.34315 15 6 15H10.3944L20.3359 8.37236ZM21 12.737L12.1094 18.6641C11.7809 18.8831 11.3948 19 11 19H7V29H11C11.3948 29 11.7809 29.1169 12.1094 29.3359L21 35.263V12.737ZM32.9998 24C32.9998 21.5583 32.0293 19.3445 30.4479 17.7211C30.0625 17.3255 29.9964 16.6989 30.3472 16.2724L31.6177 14.7277C31.9685 14.3011 32.6017 14.2371 33.0001 14.6195C35.4628 16.9832 36.9998 20.3128 36.9998 24C36.9998 27.6872 35.4628 31.0168 33.0001 33.3805C32.6017 33.7629 31.9685 33.6989 31.6177 33.2724L30.3472 31.7277C29.9964 31.3011 30.0625 30.6745 30.4479 30.2789C32.0293 28.6556 32.9998 26.4418 32.9998 24ZM37.0144 11.05C36.6563 11.4705 36.7094 12.0995 37.1069 12.4829C40.1263 15.3951 42.0002 19.4778 42.0002 23.9999C42.0002 28.522 40.1263 32.6047 37.1069 35.5169C36.7094 35.9003 36.6563 36.5293 37.0144 36.9498L38.3109 38.4727C38.6689 38.8932 39.302 38.9456 39.7041 38.5671C43.5774 34.9219 46.0002 29.7429 46.0002 23.9999C46.0002 18.2569 43.5774 13.078 39.7041 9.43271C39.302 9.05421 38.6689 9.10664 38.3109 9.52716L37.0144 11.05Z"></path>
                                    </svg>)

                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default React.memo(CustomPlayer);
