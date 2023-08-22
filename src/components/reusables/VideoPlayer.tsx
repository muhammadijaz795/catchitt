import React, { useRef, useEffect } from 'react';
import ReactHlsPlayer from '@gumlet/react-hls-player';

interface VideoPlayerProps {
    src: string;
    onStart: () => void; // Function to be called when video starts playing
    onEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onStart, onEnd }) => {
    const playerRef = useRef<any>(null); // Use `any` type to avoid TypeScript errors
    const videoRef = useRef<HTMLDivElement>(null);

    const intersectionOptions = {
        threshold: 0.1,
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

        if (entry.isIntersecting) {
            playerRef.current?.play();
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
        <div ref={videoRef}>
            <ReactHlsPlayer
                src={src}
                autoPlay={false} // Set to false, as we will manually handle play/pause
                controls={false}
                width="100%"
                height="100%"
                // loop
                playerRef={playerRef}
                onEnded={handleEnded}
            />
        </div>
    );
};

export default React.memo(VideoPlayer);
