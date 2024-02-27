import { RefObject, useEffect, useState } from 'react';

export default function useOnScreen(ref: any) {
    const [intersectingVideo, setIntersectingVideo] = useState<any>(null);

    useEffect(() => {
        const observer:any = new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) {
                setIntersectingVideo(entry?.target);
            } else {
                if (entry?.target === intersectingVideo) {
                    setIntersectingVideo(null);
                }
            }
        });

        if (ref?.current) {
            observer?.observe(ref?.current);
        }

        return () => observer?.disconnect();
    }, [ref, intersectingVideo]);

    return intersectingVideo;
}
