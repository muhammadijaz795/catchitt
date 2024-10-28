import React, { useEffect, useRef, useState } from 'react';
import style from './index.module.scss';
import UpArrow from './UpArrow';
import DownArrow from './DownArrow';

function VideoNavigation(props: { videoListRef: any }) {
    const { videoListRef } = props;
    const prevScrollTopRef = useRef(0);
    const isProgrammaticScroll = useRef(false);
    const isNormalScroll = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const scrollTimeoutOnScroll = useRef<NodeJS.Timeout | null>(null);
    const scrollEventTimoutHandler = useRef<NodeJS.Timeout | null>(null);
    
    const [isFirstVideo, setIsFirstVideo] = useState(true);

    const scrollToVideo = (isNext = false) => {
        // Mark scroll as programmatic to prevent conflicts
        isProgrammaticScroll.current = true;

        const videoHeight = videoListRef.current.children[0].offsetHeight + 32;
        videoListRef.current.scrollTo({
            top: prevScrollTopRef.current + (isNext ? videoHeight : -videoHeight),
            behavior: 'smooth'
        });

        prevScrollTopRef.current = videoListRef.current.scrollTop;

        if (isFirstVideo) {
            setIsFirstVideo(false);
        }
        scrollTimeout.current = setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 300); 
    };

    const scrollHandler = () => {
        if (isProgrammaticScroll.current || isNormalScroll.current) return;
        isNormalScroll.current = true;
        const currentScroll = videoListRef.current.scrollTop;
        const diff = Math.abs(currentScroll - prevScrollTopRef.current);
        const videoHeight = videoListRef.current.children[0].offsetHeight + 32;
        const isScrollingDown = currentScroll > prevScrollTopRef.current;
        if (diff < videoHeight) {
            videoListRef.current.scrollTo({
                top: videoListRef.current.scrollTop + (isScrollingDown ? (videoHeight-diff) : -(videoHeight-diff)),
                behavior: 'smooth'
            });
        }
        else if (diff > videoHeight) {
            const skipedVideos = Math.round(diff / videoHeight);
            videoListRef.current.scrollTo({
                top: prevScrollTopRef.current + (isScrollingDown ? videoHeight * skipedVideos : -videoHeight * skipedVideos),
                behavior: 'smooth'
            });
        }

        prevScrollTopRef.current = videoListRef.current.scrollTop;
        
        if (isFirstVideo) {
            setIsFirstVideo(false);
        }

        scrollTimeoutOnScroll.current = setTimeout(() => {
            isNormalScroll.current = false;
        }, 300);
    };

    useEffect(() => {
        const videoList = videoListRef.current;
        if (videoList) {
            const onScroll = () => {
                if (scrollEventTimoutHandler.current) {
                    clearTimeout(scrollEventTimoutHandler.current);
                }

                scrollEventTimoutHandler.current = setTimeout(scrollHandler, 200);
            };
            videoList.addEventListener('scroll', onScroll);
            return () => {
                videoList.removeEventListener('scroll', onScroll);
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                if (scrollTimeoutOnScroll.current) clearTimeout(scrollTimeoutOnScroll.current);
                if (scrollEventTimoutHandler.current) clearTimeout(scrollEventTimoutHandler.current);
            };
        }
    }, []);

    return (
        <div className={style.navigation}>
            {!isFirstVideo && <button id="prevVideoBtn" onClick={() => scrollToVideo(false)}>
                <UpArrow  />
            </button>}
            <button id="nextVideoBtn" onClick={() =>scrollToVideo(true)}>
                <DownArrow />
            </button>
        </div>
    );
}

export default VideoNavigation;
