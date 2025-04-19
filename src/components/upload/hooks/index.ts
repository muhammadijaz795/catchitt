import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { get, patch,post } from '../../../axios/axiosClient';
import { setSelectedFile, updateUploadingStatus } from '../../../redux/reducers/upload';
import { STATUS_CODE, UPLOAD_VIDEO_DETAILS } from '../../../utils/constants';
import { VideoToFrames, VideoToFramesMethod } from '../../../utils/videoToFrame';
import { setCurrentEditVideo } from '../../../redux/reducers/currentEditVideoReducer';

interface StateInterface {
    canView: string;
    category?: any;
    description?: string;
    videoId?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    isOnlyMe?: boolean;
    place?: string;
    allowDuet?: boolean;
    allowStitch?: boolean;
    allowDownload?: boolean;
    allowAddStory?: boolean;
    taggedUsers?: any;
    replyOnComment?: boolean;
    scheduledAt?: string; // Added property
}

function useUpload() {
    const selectedFile = useSelector((store: any) => store?.reducers?.isuploading?.selectedFile);
    const selectedVideoSrc = useSelector((store: any) => store?.reducers?.isuploading?.selectedVideoSrc);
    // const [selectedFile, setselectedFile] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [thumbnails, setThumbnails] = useState<any>([]);
    const categories = useSelector((store: any) => store?.reducers?.videoCategories) || [];
    const currentEditVideo = useSelector((state: any) => state?.reducers?.currentEditVideo);
    console.log(currentEditVideo, 'currentEditVideo');
    const API_KEY = process.env.VITE_API_URL;
    const location = useLocation();
    const mainFileRef = useRef<File | null>(null);

    const { isEditMode, info } = location.state || { isEditMode: false, info: {} };
    
    // console.log(isEditMode,'isEditMode', info, 'info');
    const [state, setState] = useState<StateInterface>({
        category: {},
        description: info?.description,
        allowDuet: info?.allowDuet,
        allowStitch: info?.allowStitch,
        videoId: info?.mediaId,
        isOnlyMe: info?.privacyOptions?.isOnlyMe,
        allowDownload: info?.privacyOptions?.allowDownload,
        allowAddStory: info?.privacyOptions?.allowAddStory,
        canView: info?.canView
    });
    // const [selectedVideoSrc, setSelectedVideoSrc] = useState('');
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
        console.log('onChangeFileHandler', e);
        
        const file = Array.isArray(e?.target?.files) ? e.target.files[0] : e;
        mainFileRef.current = file;
        if (file) {
            if (file?.name?.includes('.mp4')) {
                // setselectedFile(file);
                dispatch(setSelectedFile({file}));
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
            console.log('videoCoverHandler', frames);
            setThumbnails(frames);
            updateState('thumbnailUrl', frames?.[0]);
        }
    };

    const updateState = (inputName: any, inputValue: any) => {
        setState((prevState: any) => ({ ...prevState, [inputName]: inputValue }));
    };

    useEffect(() => {
        const url = state?.thumbnailUrl || '';
        fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], 'video-thumbnail', { type: 'image/png' });
                setSelectedThumbnail(file as any);
            });
    }, [state?.thumbnailUrl]);

    useMemo(() => {
        console.log(selectedFile)
        if (selectedFile) {
            // setSelectedVideoSrc(
            //     URL.createObjectURL(new Blob([selectedFile], { type: 'video/mp4' }))
            // );
            videoCoverHandler();
        }
    }, [selectedFile]);

    const SubmitHandler = async () => {
        if(currentEditVideo && currentEditVideo?._id) {
            SubmitHandlerWhenEditVideoCase();
            return false;
        }
    
        setIsPosting(true);
        let getLinks: any = {};
        let postPayload = new FormData();
        let postURL = '/media-content/request-video-upload';
        if(state?.scheduledAt){
            console.log(state?.scheduledAt);
            postURL+= '?scheduledAt=' + state?.scheduledAt;
        }

        // Do get request for video urls
        try {
            getLinks = await get(postURL);
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            return;
        }
        postPayload.append('videoId', getLinks?.data?.data?.videoId);
        postPayload.append('videoUrl', getLinks?.data?.data?.videoUrl?.split('?')[0]);
        postPayload.append('thumbnailUrl', getLinks?.data?.data?.thumbnailUrl?.split('?')[0]);
        postPayload.append('category', state?.category?._id || '');
        postPayload.append('description', state?.description || '');
        postPayload.append('isOnlyMe', `${state?.isOnlyMe || false}`);
        if(state?.canView) {
            postPayload.append('canView', state?.canView || '');
        }
        postPayload.append('privacy', `${state?.isOnlyMe || false}`); // only_me, followers, everyone
        postPayload.append('allowDuet', `${state?.allowDuet || false}`);
        postPayload.append('allowDownload', `${state?.allowDownload || false}`);
        postPayload.append('allowStitch', `${state?.allowStitch || false}`);
        postPayload.append('place', state?.place || '');
        if(state?.scheduledAt){
            console.log(state?.scheduledAt);
            postPayload.append('scheduledAt', state?.scheduledAt || '');
        }
        
        // postPayload.append('taggedUsers', state?.taggedUsers || []);
        // postPayload.append('replyOnComment', '');

        // const postPayload = JSON.stringify({
        //     videoId: getLinks?.data?.data?.videoId,
        //     videoUrl: getLinks?.data?.data?.videoUrl?.split('?')[0],
        //     thumbnailUrl: getLinks?.data?.data?.thumbnailUrl?.split('?')[0],
        //     category: state?.category?._id || '',
        //     description: state?.description || '',
        //     isOnlyMe: `${state?.isOnlyMe || false}`,
        //     allowDuet: `${state?.allowDuet || false}`,
        //     allowDownload: `${state?.allowDownload || false}`,
        //     place: state?.place || '',
        //     taggedUsers: state?.taggedUsers || []
        // });

        console.log('thumbnailUrl', getLinks?.data?.data?.thumbnailUrl?.split('?')[0]);

        // Do post request for send post data
        try {
            await fetch(UPLOAD_VIDEO_DETAILS, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: postPayload,
            });
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
        // Do put request for upload video file
        try {
            if (selectedFile) {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'video/mp4');

                const requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: selectedFile,
                    redirect: 'follow',
                };
                console.log('video uploading', requestOptions, getLinks?.data?.data?.videoUrl);
                fetch(getLinks?.data?.data?.videoUrl, requestOptions as any)
                    .then(() => {
                        dispatch(
                            updateUploadingStatus({
                                videos: 0,
                                isUploading: false,
                            })
                        );
                    })
                    .catch((error) => {
                        dispatch(
                            updateUploadingStatus({
                                videos: 0,
                                isUploading: false,
                            })
                        );
                        console.error(error);
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
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'image/png');

                const file = selectedThumbnail || new Blob();
                const requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: file,
                    redirect: 'follow',
                };
                console.log('video uploading', requestOptions, getLinks?.data?.data?.thumbnailUrl);
                fetch(getLinks?.data?.data?.thumbnailUrl, requestOptions as any)
                    .then(() => { })
                    .catch((error) => {
                        dispatch(
                            updateUploadingStatus({
                                videos: 0,
                                isUploading: false,
                            })
                        );
                        console.error(error);
                    });
            }
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            return;
        }
        setIsPosting(false);
    };

    const SubmitHandlerWhenEditVideoCase = async () => {
        setIsPosting(true);
        let getLinks: any = {};
        let postPayload = new FormData();
        let postURL = '/media-content/v2/request-video-upload';
        if(state?.scheduledAt){
            console.log(state?.scheduledAt);
            postURL+= '?scheduledAt=' + state?.scheduledAt;
        }

        // Do get request for video urls
        try {
            getLinks = await get(postURL);
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            return;
        }

        
       

        const videoId = getLinks?.data?.data?.videoId;
        const videoUrl = getLinks?.data?.data?.videoUrl;
        const thumbnailUrl = getLinks?.data?.data?.thumbnailUrl;

        console.log('videoId', videoId, 'videoUrl', videoUrl, 'thumbnailUrl', thumbnailUrl);
        console.log('currentEditVideo id', currentEditVideo?._id)
        // Step 2: Merge audio and video before uploading details
        const mergeFormData = new FormData();
        mergeFormData.append('soundId', currentEditVideo?._id || '');
        if (mainFileRef.current) {
            mergeFormData.append('video', mainFileRef.current); // File object
        } else {
            console.error('mainFile is undefined');
        }
        mergeFormData.append('videoId', videoId);
        mergeFormData.append('presignedUrl', videoUrl);
        navigate('/home');
        dispatch(
            updateUploadingStatus({
                videos: 0,
                isUploading: true,
            })
        );
        let mergedFileUrl = '';
        try {
            const mergeResponse = await fetch(`${API_KEY}/media-content/v2/merge-audio-video`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: mergeFormData,
            });
    
            const result = await mergeResponse.json();
            console.log('Full merge response:', result);
        
            if (!mergeResponse.ok) {
                throw new Error(result.message || 'Failed to merge audio and video');
            }
        
            mergedFileUrl = result?.data?.fileUrl;
            if (!mergedFileUrl.startsWith('https://cdn.seezitt.com/')) {
                mergedFileUrl = `https://cdn.seezitt.com/${mergedFileUrl}`;
            }
            console.log('Merged file URL:', mergedFileUrl);
    
            console.log('Merge successful', result);
        } catch (error) {
            console.error('Error merging audio and video:', error);
            setIsPosting(false);
            return;
        }
        
        // console.log('out');
        // return false;



        postPayload.append('videoId', getLinks?.data?.data?.videoId);
        postPayload.append('videoUrl', mergedFileUrl);
        postPayload.append('thumbnailUrl', getLinks?.data?.data?.thumbnailUrl?.split('?')[0]);
        postPayload.append('category', state?.category?._id || '');
        postPayload.append('description', state?.description || '');
        postPayload.append('isOnlyMe', `${state?.isOnlyMe || false}`);
        if(state?.canView) {
            postPayload.append('canView', state?.canView || '');
        }
        postPayload.append('privacy', `${state?.isOnlyMe || false}`); // only_me, followers, everyone
        postPayload.append('allowDuet', `${state?.allowDuet || false}`);
        postPayload.append('allowDownload', `${state?.allowDownload || false}`);
        postPayload.append('allowStitch', `${state?.allowStitch || false}`);
        postPayload.append('place', state?.place || '');
        if(state?.scheduledAt){
            console.log(state?.scheduledAt);
            postPayload.append('scheduledAt', state?.scheduledAt || '');
        }
        
        // postPayload.append('taggedUsers', state?.taggedUsers || []);
        // postPayload.append('replyOnComment', '');

        // const postPayload = JSON.stringify({
        //     videoId: getLinks?.data?.data?.videoId,
        //     videoUrl: getLinks?.data?.data?.videoUrl?.split('?')[0],
        //     thumbnailUrl: getLinks?.data?.data?.thumbnailUrl?.split('?')[0],
        //     category: state?.category?._id || '',
        //     description: state?.description || '',
        //     isOnlyMe: `${state?.isOnlyMe || false}`,
        //     allowDuet: `${state?.allowDuet || false}`,
        //     allowDownload: `${state?.allowDownload || false}`,
        //     place: state?.place || '',
        //     taggedUsers: state?.taggedUsers || []
        // });

        console.log('thumbnailUrl', getLinks?.data?.data?.thumbnailUrl?.split('?')[0]);

        // Do post request for send post data
        try {
            await fetch(UPLOAD_VIDEO_DETAILS, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: postPayload,
            });
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            return;
        }

     
        dispatch(setCurrentEditVideo(null));
        
        // Do put request for upload video file
        // try {
        //     if (selectedFile) {
        //         const myHeaders = new Headers();
        //         myHeaders.append('Content-Type', 'video/mp4');

        //         const requestOptions = {
        //             method: 'PUT',
        //             headers: myHeaders,
        //             body: selectedFile,
        //             redirect: 'follow',
        //         };
        //         console.log('video uploading', requestOptions, getLinks?.data?.data?.videoUrl);
        //         fetch(getLinks?.data?.data?.videoUrl, requestOptions as any)
        //             .then(() => {
        //                 dispatch(
        //                     updateUploadingStatus({
        //                         videos: 0,
        //                         isUploading: false,
        //                     })
        //                 );
        //             })
        //             .catch((error) => {
        //                 dispatch(
        //                     updateUploadingStatus({
        //                         videos: 0,
        //                         isUploading: false,
        //                     })
        //                 );
        //                 console.error(error);
        //             });
        //     }
        // } catch (error) {
        //     console.error('Something Went Wrong', error);
        //     setIsPosting(false);
        //     // return;
        // }

        // Do put request for thumbnail file
        try {
            if (state?.thumbnailUrl) {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'image/png');

                const file = selectedThumbnail || new Blob();
                const requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: file,
                    redirect: 'follow',
                };
                console.log('video uploading', requestOptions, getLinks?.data?.data?.thumbnailUrl);
                fetch(getLinks?.data?.data?.thumbnailUrl, requestOptions as any)
                    .then(() => { })
                    .catch((error) => {
                        dispatch(
                            updateUploadingStatus({
                                videos: 0,
                                isUploading: false,
                            })
                        );
                        console.error(error);
                    });
            }
        } catch (error) {
            console.error('Something Went Wrong', error);
            setIsPosting(false);
            return;
        }
        setIsPosting(false);
    };

    const updateMediaHandler = async () => {
        setIsPosting(true);

        // update video info
        try {
            let res: any = await patch(`/media-content/${state?.videoId}`, {
                type: 'application/json',
                data: {
                    description: state?.description,
                    tags: '',
                    taggedUsers: [],
                    category: '',
                    privacyOptions: {
                        allowDownload: state?.allowDownload,
                        isOnlyMe: state?.isOnlyMe,
                    },
                    lat: info?.location?.coordinates[0],
                    lng: info?.location?.coordinates[1],
                    place: '',
                    allowDuet: state?.allowDuet,
                },
            });

            if (res?.status === STATUS_CODE.OK) {
                navigate('/profile');
            } else {
                console.log(res?.message || 'Invalid status code');
            }
            setIsPosting(false);
        } catch (error: any) {
            setIsPosting(false);
            return console.error(error?.message);
        }
    };

    useEffect(() => {
      console.log(selectedFile);
    }, [selectedFile])
    
    useEffect(() => {
        updateState('category', categories?.[0] || {});
    }, [categories]);

    useEffect(() => {
        if (!token) {
            navigate('/auth');
        }
    }, [token]);

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
        updateMediaHandler,
        isPosting,
    };
}

export default useUpload;