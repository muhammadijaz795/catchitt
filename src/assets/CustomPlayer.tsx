import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './customPlayer.module.scss';
import {
    music,
    play,
    pause,
} from '../../../icons';

function CustomPlayer({ isMuted, onMuteToggle, src, videoModal, post, controls }: any) {
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

    video.onloadedmetadata = function () {
        setDuration(video?.duration);
        setPlayingTime(video?.currentTime);
    };

    video.src = src; // Replace with the URL of your video
    video.load(); // Start loading the video metadata

    useEffect(() => {
        if (inView && !videoModal) {
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



          // Handle drag over seekbar
    const handleSeekStart = (e: any) => {
        setIsDragging(true);
        updateSeekbar(e); // Initial update when the drag starts
    };

    const handleSeekEnd = () => {
        setIsDragging(false);
    };

    const handleSeekMove = (e: any) => {
        if (isDragging) {
            updateSeekbar(e); // Update while dragging
        }
    };

    const updateSeekbar = (e: { clientX: number }) => {
        const seekbar = seekbarRef.current;
        const rect = seekbar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / seekbar.offsetWidth) * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                // height: '85vh',
            }}
            ref={ref}
            className={`${style.mainContainer} video-container`}
        >
            <div className={style.videoContainer}>
                <video
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate"
                    loop={true}
                    autoPlay={videoModal ? false : inView}
                    controls={false} //{controls}
                    style={{  height: '85vh',
                         position: 'relative', zIndex: 1 }}
                    src={src}
                    ref={videoRef}
                    className={style.video}
                    preload='auto'
                    playsInline
                />
            </div>
            <div className="absolute bottom-0 w-full group select-none">
                            {/* Seekbar */}
                            <div
                                ref={seekbarRef}
                                className="w-full h-1 bg-gray-600 rounded cursor-pointer relative group-hover:h-2"
                                onMouseDown={handleSeekStart}
                            >
                                <div
                                    className={`h-full bg-white group-hover:h-2}`}
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                >
                                    {/* Rounded ball at the end */}
                                    <div
                                        className={`absolute bg-white w-4 h-4 rounded-full group-hover:block hidden m-auto`}
                                        style={{
                                            left: `calc(${
                                                (currentTime / duration) * 100
                                            }% + 0.5rem)`,
                                            bottom: '-0.25rem',
                                            transform: 'translateX(-60%)',
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Controls - Play/Pause, Mute, Speed, Fullscreen */}
                            <div className="flex justify-between items-center text-gray-300 py-2.5 px-4">
                                {/* Play/Pause Button */}
                                <div className="flex flex-row items-center gap-1.5">
                                    <div onClick={togglePlayPause}>
                                        {isPlaying ? (
                                            <img
                                                className="h-8 w-8 object-contain cursor-pointer"
                                                src={pauseButton}
                                            />
                                        ) : (
                                            <img
                                                className="h-8 w-8 object-contain cursor-pointer"
                                                src={playButton}
                                            />
                                        )}
                                    </div>
                                   
                                    <div className="flex justify-between items-center text-gray-300 text-sm">
                                        <span>
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-4">
                                    <div onClick={handleMute}>
                                        {muted ? (
                                            <img
                                                className="h-7 w-7 object-contain cursor-pointer"
                                                src={volumeMute}
                                            />
                                        ) : (
                                            <img
                                                className="h-7 w-7 object-contain cursor-pointer"
                                                src={volumeUnmute}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
            <div className={style.DivMediaCardBottom} onClick={onMuteToggle}>
                <p
                    style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {' '}
                    {post?.description}
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
                        <img src={music}  alt="" />{' '}
                        {post?.sound?.category?.name}
                    </p>
                )}
            </div>
        </div>
    );
}

export default CustomPlayer;
