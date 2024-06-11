import React, { memo } from 'react';

const VideoPlayer = memo(({ videoPath, index, onEnded, autoplay, onTimeUpdate }: any) => {
    return (
        <video
            id={`video-${index}`}
            autoPlay={autoplay}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            preload='auto'
            playsInline
        >
            <source src={videoPath} type="video/mp4" />
            {/* Your browser does not support the video tag. */}
        </video>
    );
});

export default VideoPlayer;