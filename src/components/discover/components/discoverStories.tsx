import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { get } from '../../../axios/axiosClient';
import styles from './discover-stories.module.scss';

function DiscoverStories({ showStories }: any) {


const mockStories = [
  {
      "_id": "670f5a3bf2e43d587fa69d1b",
      "name": "MD Imran 1",
      "username": "mdimran",
      "isVerified": false,
      "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg",
      "stories": [
          {
              "mediaId": "675aaee8fab11555b91d965b",
              "createdTime": 1733996264006,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aaee8fab11555b91d965b.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aaeb1fab11555b91d961c",
              "createdTime": 1733996209433,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aaeb1fab11555b91d961c.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aa551fab11555b91ce62a",
              "createdTime": 1733993809208,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aa551fab11555b91ce62a.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675acaa6fab11555b936fc8a",
              "createdTime": 1734003366052,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675acaa6fab11555b936fc8a.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aadbafab11555b91d9498",
              "createdTime": 1733995962092,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aadbafab11555b91d9498.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aadddfab11555b91d94ad",
              "createdTime": 1733995997337,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aadddfab11555b91d94ad.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aa549fab11555b91ce615",
              "createdTime": 1733993801537,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aa549fab11555b91ce615.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aae51fab11555b91d95f2",
              "createdTime": 1733996113891,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aae51fab11555b91d95f2.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "67580ce4b21c19e1dfb5c310",
              "createdTime": 1733823716940,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/67580ce4b21c19e1dfb5c310.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "67580cddb21c19e1dfb5c0d4",
              "createdTime": 1733823709653,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/67580cddb21c19e1dfb5c0d4.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          }
      ]
  },
  {
      "_id": "670f5a3bf2e43d587fa69d1b",
      "name": "MD Imran 1",
      "username": "mdimran",
      "isVerified": false,
      "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg",
      "stories": [
          {
              "mediaId": "675aaee8fab11555b91d965b",
              "createdTime": 1733996264006,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aaeb1fab11555b91d961c",
              "createdTime": 1733996209433,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aaeb1fab11555b91d961c.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aa551fab11555b91ce62a",
              "createdTime": 1733993809208,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aa551fab11555b91ce62a.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675acaa6fab11555b936fc8a",
              "createdTime": 1734003366052,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675acaa6fab11555b936fc8a.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aadbafab11555b91d9498",
              "createdTime": 1733995962092,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aadbafab11555b91d9498.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aadddfab11555b91d94ad",
              "createdTime": 1733995997337,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aadddfab11555b91d94ad.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aa549fab11555b91ce615",
              "createdTime": 1733993801537,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aa549fab11555b91ce615.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "675aae51fab11555b91d95f2",
              "createdTime": 1733996113891,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/675aae51fab11555b91d95f2.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "67580ce4b21c19e1dfb5c310",
              "createdTime": 1733823716940,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/67580ce4b21c19e1dfb5c310.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          },
          {
              "mediaId": "67580cddb21c19e1dfb5c0d4",
              "createdTime": 1733823709653,
              "user": {
                  "_id": "670f5a3bf2e43d587fa69d1b",
                  "name": "MD Imran 1",
                  "username": "mdimran",
                  "isVerified": false,
                  "avatar": "https://cdn1.seezitt.com/1732246585847-UNpGMgUOkk.jpeg"
              },
              "likes": 0,
              "shares": 0,
              "views": 0,
              "description": "",
              "linkedFiles": [],
              "reducedVideoUrl": "",
              "reducedVideoHlsUrl": "",
              "shortVideoUrl": "",
              "shortVideoHlsUrl": "",
              "privacyOptions": {
                  "isOnlyMe": false,
                  "allowDownload": false,
                  "allowComments": true,
                  "allowStory": false,
                  "canView": "followers"
              },
              "thumbnailUrl": "",
              "thumbnail": "",
              "originalUrl": "https://cdn.seezitt.com/input/videos/67580cddb21c19e1dfb5c0d4.mp4",
              "comments": [],
              "isLiked": false,
              "isSaved": false,
              "category": "",
              "type": "video",
              "isWatched": false
          }
      ]
  },
]



    const [stories, setStories] = useState(mockStories);
    const sliderRef: any = useRef(null);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const [sliderIndex, setSliderIndex] = useState(0);
    useEffect(() => {
        get('/media-content/stories')
            .then((data:any) => {
                setStories(data?.data?.data||[]);
            })
            .catch((err) => {
                console.log('collectons error', err);
            });
    }, []);

    const nextSlide = () => {
        // Check if the slider reference exists
        if (sliderRef.current) {
            // Use the slickNext method to move to the next slide
            sliderRef.current.slickNext();
        }
    };
    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 12,
        slidesToScroll: 1,
        // afterChange: (currentSlide: any) => {
        //     setSliderIndex(currentSlide)
        //     console.log(currentSlide);
        // }
    };
    return (
        <>
            
             
            {/* {
                sliderIndex > 0 ?
                    <img className={styles.prevArrow} onClick={prevSlide} src="../../../public/images/icons/nextArrow.svg" alt="" />
                    : null

            }
            {
                sliderIndex < 2 ?
                    <img className={styles.nextArrow} onClick={nextSlide} src="../../../public/images/icons/nextArrow.svg" alt="" />
                    : null
            } */}

            <Slider className={styles.slider} ref={sliderRef} {...settings}>
                {stories.map((storyGroup: any, index: number) => {
                   return (
                        <div key={index} onClick={()=>showStories(storyGroup?.stories)} className={styles.story}>
                            <img src={storyGroup?.avatar||'https://placehold.co/80x80'} alt="" />
                        </div>
                    )
                })}
            </Slider>
        </>
    );
}


export default DiscoverStories;