import React, { useEffect, useState } from 'react'
import { leftArrowCurvedinWhite } from '../../../icons';

function VideoModal({ src, close, parentRef }: { src: string, close: () => void, parentRef: React.RefObject<HTMLDivElement> }) {

    const [dynamicHeight, setDynamicHeight] = useState(400);

    useEffect(() => {
        if (!parentRef.current) return;
        function updateStickyHeight() {
            const offsetHeight = parentRef.current?.offsetHeight;
            offsetHeight && setDynamicHeight(offsetHeight - 30 || 400);
        }

        window.addEventListener('resize', updateStickyHeight);
        updateStickyHeight(); // Initial call

        return () => {
            window.removeEventListener('resize', updateStickyHeight);
        }
    }, [])

    return (
        <div className='w-full sticky top-0 left-0 bg-dark z-50 bg-opacity-50' >
            <div className='w-full d-flex flex-col items-center' style={{ height: dynamicHeight + 'px' }}>
                <img onClick={close} className='cursor-pointer absolute top-3 left-3' src={leftArrowCurvedinWhite} alt="close" />
                <video src={src} controls className='w-5/6 mx-auto my-auto' />
            </div>
        </div>
    )
}

export default VideoModal