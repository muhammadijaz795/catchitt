import ReactHlsPlayer from '@gumlet/react-hls-player';
import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
    src: string;
    onStart: () => void; // Function to be called when video starts playing
    onEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onStart, onEnd }) => {
    const playerRef = useRef<any>(null); // Use `any` type to avoid TypeScript errors
    const videoRef = useRef<HTMLDivElement>(null);
    const currentVideoRef = useRef<any>(null);

    const intersectionOptions = {
        threshold: 1,
    };

    const pauseCurrentVideo = () => {
        if (currentVideoRef.current && currentVideoRef.current !== playerRef.current) {
            currentVideoRef.current.pause();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, intersectionOptions);
        const currentVideoRef = videoRef.current;

        if (currentVideoRef) {
            observer.observe(currentVideoRef);
        }

        return () => {
            if (currentVideoRef) {
                observer.unobserve(currentVideoRef);
            }
        };
    }, []);

    const handleIntersection: IntersectionObserverCallback = (entries) => {
        const [entry] = entries;
        // console.log("entries", entries)
        if (entry.isIntersecting) {
            playerRef.current?.play();
            // pauseCurrentVideo
            onStart();
        } else {
            playerRef.current?.pause();
        }
    };

    const handleEnded = () => {
        // onEnd(); // Call the onEnd function when video ends
        playerRef.current.currentTime = 0;
        playerRef.current.play();
        onEnd();
    };

    return (
        <div ref={videoRef} style={{
            margin: 0, padding: 0, width: "602px",
            height: "598px", borderRadius: '8px'
        }}>
            <ReactHlsPlayer
                src={src}
                autoPlay={false} // Set to false, as we will manually handle play/pause
                controls={false}
                // loop
                playerRef={playerRef}
                onEnded={handleEnded}
            // style={{ objectFit: width > height ? 'cover' : 'contain' }}
            />
        </div>
    );
};

export default React.memo(VideoPlayer);
