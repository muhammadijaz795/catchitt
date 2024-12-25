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

function SoundGallery({ selectedAudio, setSelectedAudio }: any) {
    const abortController = useRef<AbortController | null>(null);
    const token = localStorage.getItem('token');
    const [gallery, setGallery] = useState<any>({ items: [], page: 1, pageSize: 10, isNextpage: true });

    const fetchPaginatedSounds = async () => {
        try {
            const controller = new AbortController();
            abortController.current = controller;
            const response = await axios.get(`${API_KEY}/audio/sound-gallery?page=${gallery.page}&pageSize=${gallery.pageSize}`, { headers: { Authorization: token }, signal: controller.signal });
            console.log(response.data);
            if (!response.data?.data.length) return setGallery({...gallery, isNextpage: false});
            setGallery((prev: any) => ({
                ...prev,
                items: [...prev.items, ...response.data?.data],
                page: prev.page + 1
            }))
        } catch (error) {
            console.error(error);
        }
        finally {
            abortController.current = null;
        }
    }

    useEffect(() => {
        fetchPaginatedSounds();
        return () => {
            if (abortController.current) {
                abortController.current.abort();
            }
        }
    }, [])

    useEffect(() => {
        console.log('🚀🚀🚀gallery', gallery);
    }, [gallery])
    

    return (
        <ul className="p-2">
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
                scrollableTarget="ModalscrollableDiv"
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
                        className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${selectedAudio === audio.url ? 'bg-gray-200' : ''
                            }`}
                        onClick={() => setSelectedAudio(audio.url)}
                    >
                        <img className="w-10 h-10 bg-gray-200 mr-2" src={defaultAvatar} alt="soundImg" />
                        <div>
                            <span className="font-medium">{audio.name}</span>
                            <span className="text-sm text-gray-500">{audio.duration || '00:15'}</span>
                        </div>
                        <button
                            className="text-blue-500 text-sm"
                            onClick={() => new Audio(audio.url).play()}
                        >
                            Play
                        </button>
                    </li>
                ))}
            </InfiniteScroll>
        </ul>
    )
}

export default SoundGallery