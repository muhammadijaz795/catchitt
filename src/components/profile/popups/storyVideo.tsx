 const VideoPlayer = ({ videoPath, index, onEnded, autoplay, onTimeUpdate }: any) => {
    return (
        <video
            id={`video-${index}`}
            autoPlay={autoplay}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
        >
            <source src={videoPath} type="video/mp4" />
            {/* Your browser does not support the video tag. */}
        </video>
    );
};

export default VideoPlayer