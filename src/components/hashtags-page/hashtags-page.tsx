import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/defaultProfileIcon.png';
import { useAuthStore } from '../../store/authStore';
import styles from './hashtags-page.module.scss';
// import Bookmark from './svg-components/Bookmark.svg';
import playIcon from './svg-components/playIcon.png';
// import { Post as PostType } from '../post/postTypes';
import hashtagIcon from '../../assets/singleHashtagIcon.png';

export interface HashtagPageProps { hashtagName: string, hashtagViews: number, className?: string }

interface Hashtag {
    _id: string;
    createdTime: number;
    lastModifiedTime: number;
    isDeleted: boolean;
    active: boolean;
    views: number;
    relatedVideos: string[];
    name: string;
    __v: number;
}

interface MediaData {
    mediaId: string;
    createdTime: number;
    user: {
        _id: string;
        name: string;
        avatar: string;
        username: string;
        isVerified: boolean;
        isFollowed: boolean;
    };
    likes: number;
    shares: number;
    views: number;
    description: string;
    linkedFiles: any[]; // You can specify the type of linkedFiles if needed
    reducedVideoUrl: string;
    reducedVideoHlsUrl: string;
    shortVideoUrl: string;
    shortVideoHlsUrl: string;
    privacyOptions: {
        isOnlyMe: boolean;
        allowDownload: boolean;
    };
    thumbnailUrl: string;
    thumbnail: string; // You can specify the type of thumbnail if needed
    originalUrl: string;
    comments: any[]; // You can specify the type of comments if needed
    isLiked: boolean;
    category: string;
    type: string;
    receivedGifts: any[]; // You can specify the type of receivedGifts if needed
    taggedUsers: any[]; // You can specify the type of taggedUsers if needed
    location: {
        type: string;
        coordinates: number[];
    };
    locationPlace: any; // You can specify the type of locationPlace if needed
    sound: any; // You can specify the type of sound if needed
    filter: any; // You can specify the type of filter if needed
}


export const HashtagsPage = ({ hashtagName, hashtagViews, className }: HashtagPageProps) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = localStorage.getItem('token');
    const [mediaData, setMediaData] = useState<MediaData[]>([]);
    const API_KEY = process.env.VITE_API_URL;
    const mediaDataEndPoint = '/discover/videos-by-hashtag';

    const navigate = useNavigate();

    const handleFetchHashtagData = async () => {
        try {
            const response = await fetch(`${API_KEY}${mediaDataEndPoint}?hashtag=${hashtagName}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setMediaData(responseData.data.data);
                console.log(hashtagName);
                console.log(responseData.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleFetchHashtagData();
        // handleFetchPosts();
    }, []);

    useEffect(() => {
        handleFetchHashtagData();
    }, [hashtagName]);

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    return mediaData && (
        <>
            <div className={styles.pageHeader}>
                <div className={styles.suggestedContent2}>
                    <img src={hashtagIcon} alt='' style={{
                        'width': '130px',
                        'height': '130px'
                    }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', textAlign: 'start', color: '#999999' }}>
                        <div className={styles.soundInfo} style={{ display: 'flex', flexDirection: 'column' }}>
                            <h6 className={styles.soundTitle}>{hashtagName}</h6>
                            <h6>{hashtagViews} views</h6>
                        </div>
                        <div >
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.postsList}>
                {mediaData?.map((media, index) => (
                    <div className={styles.postCard} key={index}>
                        <img src={media.thumbnailUrl} alt='' style={{ 'objectFit': 'cover' }} />
                        <h6>{media.description}</h6>
                        <div className={styles.postInfo}>
                            <div className={styles.postCreatorInfo}>
                                <img src={media.user.avatar === '' ? profileIcon : media.user.avatar} alt='' />
                                <p>{media.user.name}</p>
                            </div>
                            <div className={styles.viewsDiv}>
                                <img src={playIcon} alt='' />
                                <p>
                                    {media.views}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
};
