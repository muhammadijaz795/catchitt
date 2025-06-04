import { useState } from 'react';
import styles from './videoesMapin.module.scss';
import muteIcon from '../svg-components/volume-mute.svg';
import unmuteIcon from '../svg-components/volume-unmute.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import { editIcon, editVideoIcon } from '../../../icons';

interface Type {
    videos: any;
    fetchMore: any;
    openVideoModal: any;
    setEditVideo: any;
    isOwnVideo: any;
}

export default function VideoesMaping({ videos, fetchMore, openVideoModal, setEditVideo, isOwnVideo }: Type) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(true);

    const unmuteHandler = () => {
        setIsMuted(!isMuted);
    };

    return (
        <InfiniteScroll
            dataLength={videos.items?.length}
            next={fetchMore}
            hasMore={videos.items.length < videos.totalItems || videos?.totalItems === null}
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
                <div className={`flex justify-center items-center mt-8 m-auto`}>
                    <p className="text-dark font-bold text-xl">
                        {(() => {
                            if (videos?.totalItems === 0) return 'No videos available in this category.';
                            if (videos.totalItems === undefined) return 'Something went wrong. Please refresh the page.';
                            if (videos.totalItems === -2) return "User has disabled showing liked videos";
                        })()}
                    </p>
                </div>
            }
        >
            {videos.items.map((item: any, i: number) => (
                <div
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    key={i}
                    onClick={() => openVideoModal(item)}
                    className={`${styles.post} cursor-pointer ${styles.mediaWrapper}`}
                >
                    {/* <div className={styles.mediaWrapper}> */}
                        <img className='w-100' src={item.templateImage} />
                        <video
                            className={`w-100 ${styles.thumbnail} ${hoveredIndex === i ? 'block' : 'hidden'
                                }`}
                            src={
                                item?.reducedVideoUrl.length > 0
                                    ? item?.reducedVideoUrl
                                    : item?.originalUrl
                            }
                            muted={isMuted}
                            loop
                            autoPlay={true}
                            preload="auto"
                            playsInline
                        />
                        <img
                            className={`w-100 ${styles.thumbnail} ${hoveredIndex === i ? 'hidden' : 'block'
                                }`}
                            src={item?.thumbnailUrl}
                            alt=""
                        />
                    {/* </div> */}

                    <div className={styles.views}>
                        <img src="../../../../public/images/icons/views.svg" alt="" />
                        <p className={styles.viewsText}>{item.views}</p>
                    </div>
                    
                </div>
            ))}
        </InfiniteScroll>
    );
}
