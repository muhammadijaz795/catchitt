import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../../../axios/axiosClient';
import { UPLOAD_VIDEO_DETAILS } from '../../../utils/constants';
import { VideoToFrames, VideoToFramesMethod } from '../../../utils/videoToFrame';
import axios from 'axios';
import { updateUploadingStatus } from '../../../redux/reducers/upload';
import { useNavigate } from 'react-router-dom';

interface StateInterface {
    category?: string;
    description?: string;
    videoId?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    isOnlyMe?: boolean;
    place?: string;
    allowDuet?: boolean;
    allowDownload?: boolean;
    taggedUsers?: any;
    replyOnComment?: boolean;
}

function useUpload() {
    const [selectedFile, setselectedFile] = useState(null);
    const [isPosing, setIsPosting] = useState(false);
    const [thumbnails, setThumbnails] = useState<any>([]);
    const [state, setState] = useState<StateInterface>({
        category: '🎭 Entertainment',
        description: 'Hello everyone, I’m back! #vlog #trending',
    });
    const [selectedVideoSrc, setSelectedVideoSrc] = useState('');
    const token = useSelector((store: any) => store?.reducers?.profile?.token);
    const inputElementRef: any = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectFilesHandler = () => {
        if (inputElementRef?.current) {
            inputElementRef?.current?.click();
        }
    };

    window.onbeforeunload = function () {
        return selectedFile && 'Data will be lost if you leave the page, are you sure?';
    };

    const onChangeFileHandler = (e: any) => {
        const file = e?.target?.files[0];
        if (file) {
            if (file?.name?.includes('.mp4')) {
                setselectedFile(file);
            }
        }
    };

    const videoCoverHandler = async () => {
        if (selectedFile) {
            setThumbnails([]);
            const fileUrl = URL.createObjectURL(selectedFile);
            const frames = await VideoToFrames.getFrames(
                fileUrl,
                10,
                VideoToFramesMethod.totalFrames
            );
            setThumbnails(frames);
            updateState('thumbnailUrl', frames?.[0]);
        }
    };

    const updateState = (inputName: any, inputValue: any) => {
        setState((prevState: any) => ({ ...prevState, [inputName]: inputValue }));
        console.log('state', state);
    };

    useMemo(() => {
        if (selectedFile) {
            setSelectedVideoSrc(
                URL.createObjectURL(new Blob([selectedFile], { type: 'video/mp4' }))
            );
            videoCoverHandler();
        }
    }, [selectedFile]);

    const SubmitHandler = async () => {
        setIsPosting(true);
        let getLinks: any = {};
        let postPayload = new FormData();

        // Do get request for video urls
        try {
            getLinks = await get('/media-content/request-video-upload');
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            return;
        }

        postPayload.append('videoId', getLinks?.data?.data?.videoId);
        postPayload.append('videoUrl', getLinks?.data?.data?.videoUrl?.split('?')[0]);
        postPayload.append('thumbnailUrl', getLinks?.data?.data?.thumbnailUrl?.split('?')[0]);
        postPayload.append('category', state?.category || '');
        postPayload.append('description', state?.description || '');
        postPayload.append('isOnlyMe', `${state?.isOnlyMe || false}`);
        postPayload.append('allowDuet', `${state?.allowDuet || false}`);
        postPayload.append('allowDownload', `${state?.allowDownload || false}`);
        postPayload.append('place', state?.place || '');
        // postPayload.append('taggedUsers', '');
        // postPayload.append('replyOnComment', '');

        // Do post request for send post data
        try {
            await fetch(UPLOAD_VIDEO_DETAILS, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: postPayload,
            });
            console.log('Video Successfully Posted');
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            return;
        }

        dispatch(
            updateUploadingStatus({
                videos: 0,
                isUploading: true,
            })
        );

        navigate('/home');

        setTimeout(() => {
            dispatch(
                updateUploadingStatus({
                    videos: 0,
                    isUploading: false,
                })
            );
        }, 5000);

        // Do put request for upload video file
        try {
            if (selectedFile) {
                let uploadFilePayload = new FormData();
                uploadFilePayload.append('file', selectedFile);
                await axios({
                    method: 'put',
                    url: getLinks?.data?.data?.videoUrl,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/octet-stream',
                    },
                    data: uploadFilePayload,
                });
            }
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            // return;
        }

        // Do put request for thumbnail file
        try {
            if (state?.thumbnailUrl) {
                let uploadThumbnailFilePayload = new FormData();
                uploadThumbnailFilePayload.append('file', state?.thumbnailUrl);
                await axios({
                    method: 'put',
                    url: getLinks?.data?.data?.thumbnailUrl,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/octet-stream',
                    },
                    data: uploadThumbnailFilePayload,
                });
            }
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            return;
        }
        setIsPosting(false);
    };

    return {
        selectedFile,
        inputElementRef,
        selectFilesHandler,
        onChangeFileHandler,
        selectedVideoSrc,
        thumbnails,
        updateState,
        state,
        SubmitHandler,
        isPosing
    };
}

export default useUpload;
