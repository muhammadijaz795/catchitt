import axios from "axios";
import { API_KEY } from "../../../utils/constants";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from '@mui/material';
import { defaultAvatar } from "../../../icons";
import audioFile1 from '../../../assets/audio1.mp3';
import audioFile2 from '../../../assets/audio2.mp3';
import { useDispatch } from 'react-redux';
import PauseIcon from '@mui/icons-material/Pause';

import {setCurrentEditVideo} from '../../../redux/reducers/currentEditVideoReducer'; // Import the action


function SoundGallery({ isDarkTheme, isFavoriteSounds, selectedAudio, setSelectedAudio, searchQuery, isHighlighted,  handleAudioManipulation}: any) {
    console.log('isHighlighted'+isHighlighted);
   const dispatch = useDispatch();
    const abortController = useRef<AbortController | null>(null);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
     const [gallery, setGallery] = useState<any>({ items: [], page: 1, pageSize: 5, isNextpage: true });
     const [hoveredSoundId, setHoveredSoundId] = useState<string | null>(null);

     const [playingAudio, setPlayingAudio] = useState(null); // Stores current playing audio URL
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null); // Stores the actual audio object

     const fetchPaginatedSounds = async (fromStart = false) => {
        try {
          const controller = new AbortController();
          abortController.current = controller;
          
          const baseParams = {
            pageNumber: fromStart ? 1 : gallery.page,
            pageSize: gallery.pageSize,
            ...(searchQuery && { q: searchQuery })
          };
    
          const pathName = isFavoriteSounds 
            ? `profile/v2/bookmarkedSounds`
            : `media-content/trending/sounds`;
          
          const url = `${API_KEY}/${pathName}?${new URLSearchParams({
            ...baseParams,
            ...(!isFavoriteSounds && { page: fromStart ? 1 : gallery.page })
          }).toString()}`;
    
          const response = await axios.get(url, { 
            headers: { Authorization: 'Bearer ' + token }, 
            signal: controller.signal 
          });
    
          const newItems = response.data?.data?.sounds || [];
          
          setGallery((prev: typeof gallery) => ({
            ...prev,
            items: fromStart ? newItems : [...prev.items, ...newItems],
            page: fromStart ? 2 : prev.page + 1,
            isNextpage: newItems.length >= gallery.pageSize
          }));
        } catch (error) {
          console.error(error);
          // Ensure we don't get stuck in a loading state
          setGallery((prev: typeof gallery) => ({
            ...prev,
            isNextpage: false
          }));
        } finally {
          abortController.current = null;
        }
      }

      const handleAudioPlayPause = (url: any) => {
        if (playingAudio === url && audioElement) {
            audioElement.pause();
            setPlayingAudio(null);
        } else {
            if (audioElement) {
                audioElement.pause(); // Pause previous one
            }
            const newAudio = new Audio(url);
            newAudio.play();
            setAudioElement(newAudio);
            setPlayingAudio(url);
    
            newAudio.onended = () => {
                setPlayingAudio(null);
                setAudioElement(null);
            };
        }
    };
    

    useEffect(() => {
        setGallery({
            items: [],
            page: 1,
            pageSize: 5,
            isNextpage: true
          });
        fetchPaginatedSounds(true); // Reset with new search
      }, [searchQuery, isFavoriteSounds]); // Also reset when tab changes
    

    useEffect(() => {
        fetchPaginatedSounds(true);
        return () => {
            if (abortController.current) {
                abortController.current.abort();
            }
        }
    }, [isFavoriteSounds])
    

    useEffect(() => {
        console.log('🚀🚀🚀gallery', gallery);
    }, [gallery]);

    const toggleFavorite = async (soundId: string) => {
        try {
            await axios.post(`${API_KEY}/profile/toggleBookmarkSound`, 
                { soundId }, 
                { headers: { Authorization: 'Bearer ' + token } }
            );
    
            // Update local state immediately for responsiveness
            setGallery((prev: any) => ({
                ...prev,
                items: prev.items.map((item: any) => 
                    item._id === soundId ? { ...item, isBookmarked: !item.isBookmarked } : item
                )
            }));
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    useEffect(() => {
        return () => {
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
                setAudioElement(null);
                setPlayingAudio(null);
            }
        };
    }, [audioElement]);
    
    

    return (
        <div 
            className={`sound-gallery ${isHighlighted ? 'highlight-effect' : ''}`}
            style={{
            transition: 'all 0.3s ease',
            border: isHighlighted ? '2px solid #20D5EC' : 'none',
            boxShadow: isHighlighted ? '0 0 10px rgba(32, 213, 236, 0.5)' : 'none'
            }}
        >
            <ul id="galleryScrollableDiv" className="p-2 h-64 overflow-y-auto relative">
                <InfiniteScroll
                    dataLength={gallery.items.length}
                    next={fetchPaginatedSounds}
                    hasMore={gallery.isNextpage}
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
                    className="mb-20"
                    // scrollThreshold={0.6}
                    scrollableTarget="galleryScrollableDiv"
                    endMessage={gallery.items.length === 0 &&
                        <div className="flex flex-row justify-center items-center mt-3">
                            <p className="font-bold text-xl">
                                No sounds available.
                            </p>
                        </div>
                    }
                >
                    {gallery.items.map((audio: any) => (
                        <li
                            key={audio._id}
                            className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedAudio === audio.url ? isDarkTheme?'bg-gray-500':'bg-gray-200' : ''
                                }`}
                            onClick={() => {setSelectedAudio(audio.url); console.log('new audio',audio);dispatch(setCurrentEditVideo(audio));}}
                            onMouseEnter={() => setHoveredSoundId(audio._id)}
                            onMouseLeave={() => setHoveredSoundId(null)}
                        >
                            <div className="relative block">
                                <img className= "min-w-11 w-11 h-11 bg-gray-200  rounded-md" src={audio?.owner?.avatar || defaultAvatar} onError={(e) => {
                                                                            (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                                            (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                                                        }} alt="soundImg" />
                                {hoveredSoundId === audio._id && <button
                                    className="ml-2 absolute border-0 left-[35%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-50"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAudioPlayPause(audio.url);
                                    }}
                                    title={playingAudio === audio.url ? 'Pause' : 'Play'}
                                >
                                    {playingAudio === audio.url ? (
                                        <PauseIcon sx={{ fontSize: 24, color: 'white' }} />
                                        
                                    ) : (
                                        <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 13 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M0 1.33357V14.6669C0 14.8152 0.0395 14.9608 0.1145 15.0887C0.1895 15.2166 0.2973 15.3222 0.4267 15.3945C0.5561 15.4669 0.7025 15.5034 0.8507 15.5003C0.999 15.4972 1.1437 15.4546 1.27 15.3769L12.1033 8.71024C12.2247 8.63568 12.3249 8.53127 12.3944 8.40697C12.4639 8.28268 12.5004 8.14265 12.5004 8.00024C12.5004 7.85782 12.4639 7.71779 12.3944 7.5935C12.3249 7.4692 12.2247 7.36479 12.1033 7.29023L1.27 0.623568C1.1437 0.545872 0.999 0.503278 0.8507 0.500182C0.7025 0.497085 0.5561 0.533598 0.4267 0.605952C0.2973 0.678307 0.1895 0.783883 0.1145 0.911787C0.0395 1.03969 0 1.18529 0 1.33357Z"
                                        fill="white"
                                        />
                                    </svg>
                                    )}
                                </button>
                                }
                            </div>
                            <div className="w-[12rem] pl-2">
                                <div className="font-medium text-sm">{Object.hasOwn(audio,'title')? audio.title: audio.name}</div>
                                
                                {/* <span className="text-sm text-gray-500">{audio.duration || '00:15'}</span> */}
                            </div>
                                <span className="w-[8rem] flex">
                                    {hoveredSoundId === audio._id && (
                                    <button
                                    className="ml-2 bg-[#E0E0E0] text-black text-sm text-capitalize border-0 py-1 rounded-full transition-opacity duration-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedAudio(audio.url);
                                        handleAudioManipulation();
                                        dispatch(setCurrentEditVideo(audio));
                                    }}
                                    title="Use this sound">
                                    Use
                                    </button>
                                    )}
                                     {hoveredSoundId === audio._id && <button
                                    className="btn border-0 text-xl ml-4"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent playing audio on click
                                        toggleFavorite(audio._id);
                                    }}
                                    title={audio.isBookmarked ? 'Unfavorite' : 'Favorite'}
                                >
                                { audio.isBookmarked ? (
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5775 4.27995H5.41087C5.30036 4.27995 5.19438 4.32385 5.11624 4.40199C5.0381 4.48013 4.9942 4.58611 4.9942 4.69661V16.6133L8.6817 13.6133C9.05286 13.3122 9.51626 13.1479 9.9942 13.1479C10.4721 13.1479 10.9355 13.3122 11.3067 13.6133L14.9942 16.6133V4.69661C14.9942 4.58611 14.9503 4.48013 14.8722 4.40199C14.794 4.32385 14.688 4.27995 14.5775 4.27995ZM5.41087 2.61328H14.5775C15.1301 2.61328 15.66 2.83277 16.0507 3.22348C16.4414 3.61418 16.6609 4.14408 16.6609 4.69661V18.3633C16.6606 18.5206 16.6158 18.6747 16.5317 18.8076C16.4475 18.9406 16.3275 19.047 16.1854 19.1146C16.0433 19.1821 15.8849 19.2081 15.7287 19.1894C15.5725 19.1707 15.4247 19.1082 15.3025 19.0091L10.2609 14.9091C10.1863 14.8478 10.0928 14.8143 9.99628 14.8143C9.89977 14.8143 9.80625 14.8478 9.7317 14.9091L4.69003 19.0091C4.56791 19.1095 4.41975 19.1731 4.26285 19.1924C4.10595 19.2118 3.94678 19.1861 3.80393 19.1184C3.66107 19.0507 3.54043 18.9437 3.45607 18.81C3.37172 18.6763 3.32714 18.5214 3.32753 18.3633V4.69661C3.32753 4.14408 3.54703 3.61418 3.93773 3.22348C4.32843 2.83277 4.85833 2.61328 5.41087 2.61328Z" fill="black"/>
                                    </svg>
                                    ) : (
                                        <svg width="20" height="21" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52826 2.69531C5.86549 2.69531 5.22987 2.95859 4.76122 3.42724C4.29258 3.89589 4.0293 4.53151 4.0293 5.19427V21.5874C4.0296 21.7762 4.08332 21.961 4.18426 22.1204C4.28519 22.2799 4.42922 22.4075 4.59966 22.4886C4.77011 22.5696 4.96002 22.6008 5.14742 22.5784C5.33482 22.556 5.51205 22.481 5.65862 22.3621L11.7061 17.4442C11.7955 17.3707 11.9077 17.3305 12.0235 17.3305C12.1392 17.3305 12.2514 17.3707 12.3408 17.4442L18.3883 22.3621C18.5348 22.4825 18.7125 22.5588 18.9007 22.582C19.0889 22.6052 19.2798 22.5744 19.4512 22.4932C19.6225 22.412 19.7673 22.2837 19.8684 22.1233C19.9696 21.9629 20.0231 21.7771 20.0226 21.5874V5.19427C20.0226 4.53151 19.7593 3.89589 19.2907 3.42724C18.8221 2.95859 18.1864 2.69531 17.5237 2.69531H6.52826Z" fill="black"/>
                                        </svg>
                                    )}
                                </button>
                                }
                                </span>
                               

                                
                        {/* <img src={attachMusicInWhite} alt="attach-sound" /> */}
                        </li>
                    ))}
                </InfiniteScroll>
            </ul>
        </div>
    )
}

export default SoundGallery