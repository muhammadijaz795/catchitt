import { useEffect, useRef, useState } from 'react';
import style from './index.module.scss';
import UpArrow from './UpArrow';
import DownArrow from './DownArrow';

function VideoNavigation(props: { videoListRef: any }) {
    const { videoListRef } = props;
    // const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isFirstVideo, setIsFirstVideo] = useState(true);

    const scrollToVideo = (isNext = false) => {
        if (!videoListRef.current) return;
        const videoHeight = videoListRef.current.children[0].offsetHeight + 32;
        const { scrollTop } = videoListRef.current;
        videoListRef.current.scrollTo({
            top: scrollTop + (isNext ? videoHeight : -videoHeight),
            behavior: 'smooth'
        });
    };

    // useEffect(() => {
    //     if (videoListRef.current) {
    //         const scrollHandler = () => {
    //             if (timeoutRef.current) {
    //                 clearTimeout(timeoutRef.current);
    //             }
    //             timeoutRef.current = setTimeout(() => {
    //                 const { scrollTop } = videoListRef.current;
    //                 setIsFirstVideo(scrollTop === 0);
    //             }, 300);
    //         };

    //         videoListRef.current.addEventListener('scroll', scrollHandler);
    //         return () => {
    //             videoListRef.current.removeEventListener('scroll', scrollHandler);
    //             if (timeoutRef.current) clearTimeout(timeoutRef.current);
    //         };
    //     }
    // }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // event.preventDefault();
            if (event.key === 'ArrowUp') {
                scrollToVideo(false);
            } else if (event.key === 'ArrowDown') {
                scrollToVideo(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={style.navigation}>
            <button id="prevVideoBtn" onClick={() => scrollToVideo(false)}>
                <UpArrow />
            </button>
            <button id="nextVideoBtn" onClick={() => scrollToVideo(true)}>
                <DownArrow />
            </button>
        </div>
    );
}

export default VideoNavigation;
