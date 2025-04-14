import axios from "axios";
import { API_KEY } from "../../../utils/constants";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from '@mui/material';
import { defaultAvatar } from "../../../icons";
import audioFile1 from '../../../assets/audio1.mp3';
import audioFile2 from '../../../assets/audio2.mp3';


const mockAudios = [
    {
        "_id": "638fd3c43552a4628ad08d10",
        "createdTime": 1670368436916,
        "lastModifiedTime": 1670368436916,
        "isDeleted": false,
        "artist_id": "638fd3c43552a4628ad08cfd",
        "name": "Cinematic musical dark guitar pluck",
        "image": "",
        "url": audioFile1,
        "active": true,
        "__v": 0,
        "artist": {
            "_id": "638fd3c43552a4628ad08cfd",
            "createdTime": 1670368436917,
            "lastModifiedTime": 1670368436917,
            "isDeleted": false,
            "active": true,
            "name": "Sia Records",
            "__v": 0
        }
    },
    {
        "_id": "638fd3c43552a4628ad08d0f",
        "createdTime": 1670368436916,
        "lastModifiedTime": 1670368436916,
        "isDeleted": false,
        "artist_id": "638fd3c43552a4628ad08cfd",
        "name": "Melody and drums",
        "image": "",
        "url": audioFile2,
        "active": true,
        "__v": 0,
        "artist": {
            "_id": "638fd3c43552a4628ad08cfd",
            "createdTime": 1670368436917,
            "lastModifiedTime": 1670368436917,
            "isDeleted": false,
            "active": true,
            "name": "Sia Records",
            "__v": 0
        }
    }
]

function SoundGallery({ isDarkTheme, isFavoriteSounds, selectedAudio, setSelectedAudio, searchQuery }: any) {
    const abortController = useRef<AbortController | null>(null);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
     const [gallery, setGallery] = useState<any>({ items: [], page: 1, pageSize: 5, isNextpage: true });

    const fetchPaginatedSounds = async (fromStart=false) => {
        try {
            // Clear items immediately when starting a new search
            if (fromStart) {
                setGallery((prev: typeof gallery) => ({
                    ...prev,
                    items: [], // Clear existing items
                    isNextpage: true // Reset pagination flag
                }));
            }

            const controller = new AbortController();
            abortController.current = controller;
            const baseParams = {
                pageNumber: fromStart ? 1 : gallery.page,
                pageSize: gallery.pageSize,
                ...(searchQuery && { q: searchQuery }) // Add search query if it exists
              };
        
              const pathName = isFavoriteSounds 
                ? `profile/v2/bookmarkedSounds`
                : `media-content/trending/sounds`;
              
              const url = `${API_KEY}/${pathName}?${new URLSearchParams({
                ...baseParams,
                ...(!isFavoriteSounds && { page: fromStart ? 1 : gallery.page }) // Additional param for trending sounds
              }).toString()}`;
        
              const response = await axios.get(url, { 
                headers: { Authorization: 'Bearer ' + token }, 
                signal: controller.signal 
              });

            console.log('🚀🚀🚀response of bookmark sounds', response.data);
            console.log(response.data);
            console.log('length of sound');
            console.log(response.data?.data.sounds.length);
            console.log(response.data?.data.sounds);
            if (!response.data?.data.sounds.length) return setGallery({...gallery, isNextpage: false});
            setGallery((prev: any) => ({
                ...prev,
                items: fromStart? response.data?.data?.sounds : [...prev.items, ...response.data?.data?.sounds],
                page: fromStart? 2: prev.page + 1
            }))
        } catch (error) {
            console.error(error);
        }
        finally {
            abortController.current = null;
        }
    }

    useEffect(() => {
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
                        className={`flex items-center p-2 rounded-lg ${isDarkTheme?'hover:bg-gray-400':'hover:bg-gray-100'} cursor-pointer ${selectedAudio === audio.url ? isDarkTheme?'bg-gray-500':'bg-gray-200' : ''
                            }`}
                        onClick={() => setSelectedAudio(audio.url)}
                    >
                        <img className="w-10 h-10 bg-gray-200 mr-2" src={defaultAvatar} alt="soundImg" />
                        <div>
                            <div className="font-medium text-sm">{Object.hasOwn(audio,'title')? audio.title: audio.name}</div>
                            <button
                                className="text-xl ml-4"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent playing audio on click
                                    toggleFavorite(audio._id);
                                }}
                                title={audio.isBookmarked ? 'Unfavorite' : 'Favorite'}
                            >
                                {audio.isBookmarked ? '💖' : '🤍'}
                            </button>
                            {/* <span className="text-sm text-gray-500">{audio.duration || '00:15'}</span> */}
                        </div>
                       {/* <img src={attachMusicInWhite} alt="attach-sound" /> */}
                    </li>
                ))}
            </InfiniteScroll>
        </ul>
    )
}

export default SoundGallery