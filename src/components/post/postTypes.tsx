import { MutableRefObject } from 'react';

interface User {
    _id: string;
    avatar: string;
    username: string;
    name: string;
    isVerified: boolean;
}

export interface Comment {
    id: string;
    user: User;
    comment: string;
    likes: number;
    isLiked: boolean;
    createdTime: number;
    replies: any[]; // Define the type of replies if available
}

export interface Post {
    collections: number;
    showReportPopup: any;
    className?: string;
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
    linkedFiles: string[];
    reducedVideoUrl: string;
    reducedVideoHlsUrl: string;
    shortVideoUrl: string;
    shortVideoHlsUrl: string;
    privacyOptions: {
        isOnlyMe: boolean;
    };
    thumbnailUrl: string;
    thumbnail: string;
    originalUrl: string;
    comments: Comment[]; // You can define a proper type for comments if possible.
    isLiked: boolean;
    category: string;
    type: string;
    receivedGifts: any[]; // You can define a proper type for gifts if possible.
    taggedUsers: any[]; // You can define a proper type for users if possible.
}

export interface BookmarkItem {
    mediaId: string;
    // Add other properties as needed
}

export interface ProfileData {
    avatar: string;
}

export interface PostProps {
    className?: string;
    startedIds: MutableRefObject<Set<string>>;
    endedIds: MutableRefObject<Set<string>>;
    post: Post;
    avatar: string;
    refetchBookmarks: Function;
    isBookmarked: boolean;
}
