import { useState } from 'react';
import muteIcon from '../svg-components/volume-mute.svg';
import unmuteIcon from '../svg-components/volume-unmute.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import defaultProfileICon from '../../../assets/defaultProfileIcon.png';

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
               <div>
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
                        { window.location.pathname.includes("/discover") && 
                        <div className="discover-div position-relative">
                            <div className="d-flex p-3 position-absolute top-[-3rem]">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0664 10.5619C17.8289 8.56193 17.5039 6.97443 16.7331 5.8411C16.1131 4.91337 15.1724 4.24717 14.0914 3.97027C13.1153 3.76571 12.098 3.93999 11.2456 4.45777C10.7956 4.7286 10.3706 5.09527 9.99978 5.5661C9.62478 5.09527 9.20811 4.7286 8.74978 4.45777C7.89855 3.94105 6.88289 3.76681 5.90811 3.97027C4.82716 4.24717 3.88648 4.91337 3.26644 5.8411C2.49561 6.97443 2.17061 8.5661 2.93311 10.5619C3.52894 12.1203 4.80811 13.5744 6.09978 14.7203C7.19313 15.7041 8.39538 16.5596 9.68311 17.2703L9.99978 17.4369L10.3164 17.2703C11.6042 16.5596 12.8064 15.7041 13.8998 14.7203C15.1914 13.5744 16.4706 12.1203 17.0664 10.5619ZM9.99978 7.82443C10.9581 6.62443 11.9581 5.2411 13.7623 5.6036C14.4137 5.7952 14.9771 6.20962 15.3539 6.77443C15.7998 7.43277 16.0873 8.44943 15.5081 9.9661C15.0539 11.1578 14.0081 12.3911 12.7956 13.4786C11.9296 14.25 10.9936 14.9391 9.99978 15.5369C9.00741 14.9389 8.07283 14.2498 7.20811 13.4786C5.98728 12.3953 4.94561 11.1578 4.49144 9.9661C3.90811 8.44943 4.19978 7.43277 4.64561 6.77443C5.0232 6.21118 5.58649 5.7983 6.23728 5.60777C8.04144 5.2411 9.04144 6.62443 9.99978 7.82443Z" fill="white"/>
                                </svg>
                                <span style={{
                                        fontSize: '1rem',
                                        color: "#fff",
                                        paddingLeft: '0.2rem'
                                        }}>{item.likes}</span>
                            </div>
                            <div className='d-flex pt-3'>
                                <span
                                    style={{
                                        borderRadius: "50%",
                                        alignItems: "center",
                                        width: "1.5rem", // Adjust as needed
                                        height: "1.5rem", // Adjust as needed
                                        overflow: 'hidden',
                                        marginRight: '6px'
                                    }}
                                    >
                                    <img
                                        src={item?.user.avatar || defaultProfileICon}
                                        alt="User profile"
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                            (e.target as HTMLImageElement).src = defaultProfileICon;  // Set default image if there's an error
                                        }}
                                    />
                                </span>
                                <span>{item.user?.username}</span>
                            </div>
                        </div>
                        }

                        { window.location.pathname.includes("/sounds/") &&
                        <div className="sound-div position-relative">
                            <div className="d-flex p-3 position-absolute top-[-3rem]">
                                <span
                                    style={{
                                        fontSize: '1rem',
                                        color: "#fff",
                                        paddingLeft: '0.2rem'
                                    }}
                                    >
                                    <img
                                        src={item?.user.avatar || defaultProfileICon}
                                        alt="User profile"
                                        style={{
                                            borderRadius: "50%",
                                            alignItems: "center",
                                            width: "1.5rem", // Adjust as needed
                                            height: "1.5rem", // Adjust as needed
                                            overflow: 'hidden',
    
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                            (e.target as HTMLImageElement).src = defaultProfileICon;  // Set default image if there's an error
                                        }}
                                    />
                                </span>
                                <span style={{
                                        fontSize: '1rem',
                                        color: "#fff",
                                        paddingLeft: '0.2rem'
                                    }}>{item.user?.username}</span>
                            </div>
                            <div className="d-flex pt-3 description">
                                <span className='text-[#0064E0] font-semibold'>
                                    {item.description?.length > 20 
                                        ? item.description.slice(0, 20)
                                        : item.description}
                                </span>
                            </div>
                        </div>
                        }

               </div>
            ))}
        </InfiniteScroll>
    );
}
