// VideoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoContextProps {
    currentVideo: HTMLVideoElement | null;
    setCurrentVideo: (video: HTMLVideoElement | null) => void;
    playVideo: (video: HTMLVideoElement) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentVideo, setCurrentVideo] = useState<HTMLVideoElement | null>(null);

    const playVideo = (video: HTMLVideoElement) => {
        if (currentVideo && currentVideo !== video) {
            // Pause the previously playing video
            currentVideo.pause();
        }
        setCurrentVideo(video);
    };

    return (
        <VideoContext.Provider value={{ currentVideo, setCurrentVideo, playVideo }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideo = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideo must be used within a VideoProvider');
    }
    return context;
};
