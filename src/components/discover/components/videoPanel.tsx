import { useState } from 'react';
import muteIcon from '../svg-components/volume-mute.svg';
import unmuteIcon from '../svg-components/volume-unmute.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';

interface Type {
    videos: any;
    openVideoModal: any;
    muteStates: boolean[];
    setMuteStates: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function VideoesMaping({ fetchMore, videos, openVideoModal, muteStates, setMuteStates }: any) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const unmuteHandler = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
        event.stopPropagation();
        setMuteStates((prevMuteStates: any) => {
            const newMuteStates = [...prevMuteStates];
            newMuteStates[index] = !newMuteStates[index];
            return newMuteStates;
        });
    };

    return (
        <InfiniteScroll
            dataLength={videos.items?.length}
            next={fetchMore}
            hasMore={videos.items.length < videos?.totalItems || videos?.totalItems === null}
            loader={<div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '1rem',
                    width: 'inherit',
                }}
            >
                <CircularProgress />
            </div>}
            className="mt-6 mb-20 flex flex-row flex-wrap w-full gap-4"
            // scrollThreshold={0.6}
            scrollableTarget="scrollableDiv"
            endMessage={
                <div className={`flex justify-center items-center mt-8 ${videos.totalItems === 0 ? ' h-[70vh]' : ''} w-full`}>
                    <span className="text-white font-bold text-xl">
                        {(()=> {
                            if (videos?.totalItems === 0) return 'No videos available in this category.';
                            if (videos.totalItems) return 'No more videos';
                            return 'Something went wrong. Please refresh the page.';
                        })()}
                    </span>
                </div>
            }
        >
            {videos?.items.map((item: any, i: number) => (
                <div
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    key={i}
                    onClick={() => openVideoModal(item)}
                    className="h-[22rem] w-[16.5rem] flex-shrink-0 rounded-lg overflow-hidden relative cursor-pointer"
                >
                    <video
                        className={`w-full h-full object-cover ${hoveredIndex === i ? 'block' : 'hidden'}`}
                        src={item?.reducedVideoUrl.length > 0 ? item?.reducedVideoUrl : item?.originalUrl}
                        muted={muteStates[i]}
                        loop
                        autoPlay={true}
                        preload="metadata"
                        playsInline
                        controls={true}
                    />
                    <img
                        className={`w-full h-full object-cover ${hoveredIndex === i ? 'hidden' : 'block'}`}
                        src={item?.thumbnailUrl}
                        alt=""
                    />
                    {/* <div className="flex gap-2 absolute left-[0.75rem] bottom-[0.813rem]">
                            <img src="../../../../public/images/icons/views.svg" alt="" />
                            <p className="text-[0.875rem] font-semibold leading-[120%]">{item.views}</p>
                        </div> */}
                    {/* <img
                            onClick={(e) => unmuteHandler(e, i)}
                            className="object-contain h-6 w-6 absolute bottom-3 right-3"
                            src={muteStates[i] ? muteIcon : unmuteIcon}
                            alt=""
                        /> */}
                </div>
            ))}
        </InfiniteScroll>
    );
}
