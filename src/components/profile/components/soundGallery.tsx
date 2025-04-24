import axios from "axios";
import { API_KEY } from "../../../utils/constants";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from '@mui/material';
import { defaultAvatar } from "../../../icons";
import audioFile1 from '../../../assets/audio1.mp3';
import audioFile2 from '../../../assets/audio2.mp3';
import { useDispatch } from 'react-redux';

import {setCurrentEditVideo} from '../../../redux/reducers/currentEditVideoReducer'; // Import the action


function SoundGallery({ isDarkTheme, isFavoriteSounds, selectedAudio, setSelectedAudio, searchQuery, isHighlighted,  handleAudioManipulation}: any) {
    console.log('isHighlighted'+isHighlighted)
   const dispatch = useDispatch();
    const abortController = useRef<AbortController | null>(null);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
     const [gallery, setGallery] = useState<any>({ items: [], page: 1, pageSize: 5, isNextpage: true });
     const [hoveredSoundId, setHoveredSoundId] = useState<string | null>(null);

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
    
    

    return (
        <div 
            className={`sound-gallery ${isHighlighted ? 'highlight-effect' : ''} max-w-sm`}
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
                            <img className="w-10 h-10 bg-gray-200 mr-2" src={defaultAvatar} alt="soundImg" />
                            <div className="w-[15rem]">
                                <div className="font-medium text-sm">{Object.hasOwn(audio,'title')? audio.title: audio.name}</div>
                                
                                {/* <span className="text-sm text-gray-500">{audio.duration || '00:15'}</span> */}
                            </div>
                                <span className="w-[5rem]">
                            {hoveredSoundId === audio._id && (
                            <button
                              className="ml-2 bg-[#F1F1F2] text-black text-sm text-capitalize border-0 w-[5rem] py-1 rounded-full transition-opacity duration-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAudio(audio.url);
                                handleAudioManipulation();
                              }}
                              title="Use this sound"
                            >
                              Use
                            </button>
              )}
              </span>
                            <button
                                    className="btn text-xl ml-4"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent playing audio on click
                                        toggleFavorite(audio._id);
                                    }}
                                    title={audio.isBookmarked ? 'Unfavorite' : 'Favorite'}
                                >
                                    {audio.isBookmarked ? '💖' : '🤍'}
                                </button>

                                
                        {/* <img src={attachMusicInWhite} alt="attach-sound" /> */}
                        </li>
                    ))}
                </InfiniteScroll>
            </ul>
        </div>
    )
}

export default SoundGallery