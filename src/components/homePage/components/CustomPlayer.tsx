import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './customPlayer.module.scss';

function CustomPlayer({ src, videoModal, post, controls }: any) {
    const [duration, setDuration] = useState<number>();
    const [playingTime, setPlayingTime] = useState<number>();
    const { ref, inView, entry } = useInView({
        rootMargin: '-400px 0px -200px 0px',
    });

    var video = document.createElement('video');
    let videoRef: any = useRef();

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
                    controls={controls}
                    style={{  height: '85vh',
                         position: 'relative', zIndex: 1 }}
                    src={src}
                    ref={videoRef}
                    className={style.video}
                    preload='auto'
                    playsInline
                />
            </div>
        </div>
    );
}

export default CustomPlayer;
