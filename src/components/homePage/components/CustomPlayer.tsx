import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';
import CustomControls from '../../../shared/videoControls';
import { music } from '../../../icons';
import style from './customPlayer.module.scss';

function CustomPlayer({ src, videoModal, post, controls }: any) {
    const [duration, setDuration] = useState<number>();
    const [playingTime, setPlayingTime] = useState<number>();
    const { ref, inView, entry } = useInView({
        rootMargin: '-400px 0px -200px 0px',
        /* Optional options */
    });

    // useEffect(() => {
    var video = document.createElement('video');
    let videoRef: any = useRef();

    video.onloadedmetadata = function () {
        // console.log('Video duration:', video.duration, 'seconds');
        setDuration(video?.duration);
        setPlayingTime(video?.currentTime);
    };

    video.src = src; // Replace with the URL of your video
    video.load(); // Start loading the video metadata

    // }, []);

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
                // minHeight: '80vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
            }}
            ref={ref}
            className={`${style.mainContainer} video-container`}
        >
            {/* <ReactPlayer
                width="100%"
                height="100%"
                controls={true}
                loop={true}
                playing={videoModal ? false : inView}
                // playing={true}
                // url="https://seezitt-videos-source-bucket.s3.amazonaws.com/input/videos/63b67803170b8469e7b562b6.mp4"
                url={src}
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload noplaybackrate nofullscreen nopicture', // Disable download button
                        },
                    },
                }}
                // light
            /> */}
            <div className={style.videoContainer}>
                <video
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate"
                    loop={true}
                    autoPlay={videoModal ? false : inView}
                    controls={controls}
                    style={{ maxWidth: '100%', height: '70vh', position: 'relative', zIndex: 1 }}
                    src={src}
                    ref={videoRef}
                    className={style.video}
                />
            </div>
        </div>
    );
}

export default CustomPlayer;
