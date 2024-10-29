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

    const [isFirstVideo, setIsFirstVideo] = useState(true);

    const scrolling = (direction: number) => {
        const videoHeight = videoListRef.current.children[0].offsetHeight + 32;
        videoListRef.current.scrollTo({
            top: prevScrollTopRef.current + direction * videoHeight,
            behavior: 'smooth'
        });
    }

    const scrollToVideo = (isNext = false) => {
        // Mark scroll as programmatic to prevent conflicts
        isProgrammaticScroll.current = true;

        scrolling(isNext? 1: -1);

        if (isFirstVideo) {
            setIsFirstVideo(false);
        }
        scrollTimeout.current = setTimeout(() => {
            prevScrollTopRef.current = videoListRef.current.scrollTop;
            isProgrammaticScroll.current = false;
        }, 300);
    };

    const scrollHandler = (isScrollingDown: boolean) => {
        if (isNormalScroll.current) return;
        console.log('scrolling happend 🚀🚀🚀😁')
        isNormalScroll.current = true;

        scrolling(isScrollingDown ? 1 : -1);

        prevScrollTopRef.current = videoListRef.current.scrollTop;

        if (isFirstVideo) {
            setIsFirstVideo(false);
        }

    };

    useEffect(() => {
        const videoList = videoListRef.current;
        if (videoList) {
            const onScroll = (event: Event) => {
                if (isProgrammaticScroll.current) return;
                const currentScroll = videoListRef.current.scrollTop;

                scrolling(0)

                const isScrollingDown = currentScroll > prevScrollTopRef.current;

                if (scrollTimeoutOnScroll.current) clearTimeout(scrollTimeoutOnScroll.current);

                scrollTimeoutOnScroll.current = setTimeout(() => {
                    console.log('scrolling done', videoListRef.current, isNormalScroll.current);
                    isNormalScroll.current = false;
                }, 400);
                scrollHandler(isScrollingDown);
            };
            videoList.addEventListener('scroll', onScroll);
            return () => {
                videoList.removeEventListener('scroll', onScroll);
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                if (scrollTimeoutOnScroll.current) clearTimeout(scrollTimeoutOnScroll.current);
            };
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isProgrammaticScroll.current) return;
            event.preventDefault();
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
            {!isFirstVideo && <button id="prevVideoBtn" onClick={() => scrollToVideo(false)}>
                <UpArrow />
            </button>}
            <button id="nextVideoBtn" onClick={() => scrollToVideo(true)}>
                <DownArrow />
            </button>
        </div>
    );
}

export default VideoNavigation;
