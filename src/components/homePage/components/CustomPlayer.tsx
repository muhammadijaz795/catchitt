import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';

function CustomPlayer({ src, videoModal }: any) {
    const { ref, inView, entry } = useInView({
        /* Optional options */
    });

    return (
        <div style={{ minHeight: '80vh', position: 'relative' }} ref={ref}>
            <ReactPlayer
                width="100%"
                height="100%"
                // controls={true}
                loop={true}
                playing={videoModal ? false : inView}
                // url="https://seezitt-videos-source-bucket.s3.amazonaws.com/input/videos/63b67803170b8469e7b562b6.mp4"
                url={src}
                // light
            />
            {/* <div style={{ position: 'absolute', zIndex: 7, left: 0, bottom: 10, height: 55  , }}>
                <p>Hello</p>
            </div> */}
        </div>
    );
}

export default CustomPlayer;
