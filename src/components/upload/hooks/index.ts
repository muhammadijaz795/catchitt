import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { get, patch,post } from '../../../axios/axiosClient';
import { setSelectedFile, setSelectedTemplate, updateUploadingStatus } from '../../../redux/reducers/upload';
import { STATUS_CODE, UPLOAD_VIDEO_DETAILS } from '../../../utils/constants';
import { VideoToFrames, VideoToFramesMethod } from '../../../utils/videoToFrame';
import { setCurrentEditVideo } from '../../../redux/reducers/currentEditVideoReducer';
import axios from 'axios';
import { boolean } from 'mathjs';


interface StateInterface {
    canView: string;
    category?: any;
    description?: string;
    videoId?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    isOnlyMe?: boolean;
    place?: string;
    locationPlace?: string;
    allowDuet?: boolean;
    allowStitch?: boolean;
    allowDownload?: boolean;
    allowAddStory?: boolean;
    taggedUsers?: any;
    replyOnComment?: boolean;
    allowComments?:boolean;
    scheduledAt?: string;
    createdTime?: string;
    disclosePost?: boolean;
    templateImage?: string;
    videoLength?: number;
}

function useUpload() {
    const selectedFile = useSelector((store: any) => store?.reducers?.isuploading?.selectedFile);
    const selectedVideoSrc = useSelector((store: any) => store?.reducers?.isuploading?.selectedVideoSrc);
    const selectedTemplate = useSelector((store: any) => store?.reducers?.isuploading?.selectedTemplate);
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
    const abortController = useRef<AbortController | null>(null);
    interface Template {
        image: string;
    }
    const [template, setTemplate] = useState<Template | null>(null);

    const updateTemplate = (tpl: any) => {
        if(tpl && tpl.background){
            setTemplate(tpl);
            updateState('templateImage', tpl.background);
            dispatch(setSelectedTemplate(tpl.background));
        }else{
            setTemplate(null);
            updateState('templateImage', null);
            dispatch(setSelectedTemplate(null));
        }
        
      };


    let { isEditMode, info } = location.state || { isEditMode: false, info: {} };
    const { id: postId } = useParams(); 
    if(postId){
        isEditMode = true;
    }

    console.log(isEditMode, 'isEditMode', info, 'info', postId, 'postId');

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
        allowComments: info?.privacyOptions?.allowComments,
        disclosePost:  info?.privacyOptions?.disclosePost,
        canView: info?.privacyOptions?.canView,
        thumbnailUrl: info?.thumbnailUrl || '',
        locationPlace: info?.locationPlace || '',
        createdTime: info?.createdTime || '',
        videoLength: info?.videoLength || 0
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

    useEffect(() => {
        if (postId) {
            fetchPost();
        }
    }, [postId]);

    const fetchPost = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/videos/${postId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            console.log('fetch post response', response);
            if (response.ok) {
                const responseData = await response.json();
                console.log('fetch post response data', responseData);
                
                // Update the state with fetched data
                setState(prev => ({
                    ...prev,
                    description: responseData.data.description || '',
                    thumbnailUrl: responseData.data.thumbnailUrl || '',
                    isOnlyMe: responseData.data.privacyOptions?.isOnlyMe || false,
                    allowDownload: responseData.data.privacyOptions?.allowDownload || true,
                    allowComments: responseData.data.privacyOptions?.allowComments || false,
                    disclosePost: responseData.data.privacyOptions?.disclosePost || false,
                    canView: responseData.data.privacyOptions?.canView || 'everyone',
                    allowDuet: responseData.data.allowDuet || false,
                    allowStitch: responseData.data.allowStitch || false,
                    locationPlace: responseData.data.locationPlace || '',
                    videoId: responseData.data.mediaId || '',
                    originalUrl: responseData.data.originalUrl || '',
                    category: responseData.data.category || {},
                    createdTime: responseData.data.createdTime || '',
                    videoLength: responseData.data.videoLength || 0,
                }));

                // Set the selected file (though we won't actually upload it again)
                if (responseData.data.originalUrl) {
                    console.log(responseData.data.originalUrl, 'originalUrl of the file');
                    // This simulates having a selected file for the preview
                    dispatch(setSelectedFile({ 
                        file: { 
                            name: 'existing_video.mp4',
                            preview: responseData.data.originalUrl 
                        } 
                    }));
                   // Use backend-provided thumbnails if available
                    if (responseData.data.thumbnails?.length) {
                        setThumbnails(responseData.data.thumbnails);
                        updateState('thumbnailUrl', responseData.data.thumbnails[0]);
                    } else {
                        videoCoverHandler(); // Fallback to client-side generation
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const videoCoverHandler = async () => {
    //     console.log('selected file', selectedFile[0]);
    //     if (selectedFile) {
    //         setThumbnails([]);
    //         const fileUrl = URL.createObjectURL(selectedFile);
    //         const frames = await VideoToFrames.getFrames(
    //             fileUrl,
    //             10,
    //             VideoToFramesMethod.totalFrames
    //         );
    //         console.log('videoCoverHandler', frames);
    //         setThumbnails(frames);
    //         updateState('thumbnailUrl', frames?.[0]);
    //     }
    // };

    const videoCoverHandler = async () => {
        if (!selectedFile) return;
    
        console.log('return from here...');
        console.log(selectedFile);
        console.log('return from here end...');
    
        // Handle edit mode with existing thumbnail
        if (isEditMode && info?.thumbnailUrl) {
            setThumbnails([info.thumbnailUrl]);
            updateState('thumbnailUrl', info.thumbnailUrl);
            return;
        }
    
        // If the preview is a URL (e.g., from API), download it to blob first
        if (typeof selectedFile.preview === 'string' && selectedFile.preview.endsWith('.mp4')) {
            try {
                const response = await fetch(selectedFile.preview);
                const blob = await response.blob();
    
                const blobUrl = URL.createObjectURL(blob);
    
                const frames = await VideoToFrames.getFrames(
                    blobUrl,
                    10,
                    VideoToFramesMethod.totalFrames
                );
    
                setThumbnails(frames);
                updateState('thumbnailUrl', frames?.[0]);
                URL.revokeObjectURL(blobUrl);
            } catch (err) {
                console.error('Error generating frames from remote video URL:', err);
            }
    
            return;
        }
    
        // Handle standard File object upload
        if (selectedFile instanceof File) {
            const fileUrl = URL.createObjectURL(selectedFile);
            const frames = await VideoToFrames.getFrames(fileUrl, 10, VideoToFramesMethod.totalFrames);
            setThumbnails(frames);
            updateState('thumbnailUrl', frames?.[0]);
            URL.revokeObjectURL(fileUrl);
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

    function base64ToFile(base64String: string, filename: string): File {
        // If it's a raw base64 string, add the default prefix
        if (!base64String.startsWith('data:')) {
          base64String = 'data:image/png;base64,' + base64String;
        }
      
        const arr = base64String.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
      
        if (!mimeMatch) {
          throw new Error('Invalid base64 mime type');
        }
      
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
      
        return new File([u8arr], filename, { type: mime });
    }
      

    const SubmitHandlerWhenUpdateVideoCase = async () => {
        if (!postId) return;
      
        const updatePayload = new FormData();

        // Build the JSON payload instead of FormData
        const payload: any = {};

        if (state?.description) payload.description = state.description;

        payload.privacyOptions = {
            canView: state?.canView || 'everyone',
            allowComments: !!state?.allowComments,
            allowDownload: !!state?.allowDownload,
            disclosePost: !!state?.disclosePost,

        };

        payload.allowDuet = !!state?.allowDuet;
        payload.allowStitch = !!state?.allowStitch;
        payload.disclosePost = !!state?.disclosePost;

        if (state?.place) payload.place = state.place;
        if (state?.locationPlace) payload.locationPlace = state.locationPlace;


        // updatePayload.append('category', state?.category?._id || '');
        // updatePayload.append('privacy', `${state?.isOnlyMe || false}`);
        // updatePayload.append('isOnlyMe', `${state?.isOnlyMe || false}`);

        console.log(state);
        console.log('full state...')
        // if(state?.description)
        //     updatePayload.append('description', state?.description || '');
        // if (state?.canView) {
        //     const privacyOptions = {
        //       canView: state.canView,
        //       allowComments: state.allowComments,
        //     };
        //     updatePayload.append('privacyOptions', JSON.stringify(privacyOptions));
        // }
        // // if(state?.allowDuet)
        //     updatePayload.append('allowDuet', `${state?.allowDuet || false}`);
        // // if(state?.allowDownload)
        //     // updatePayload.append('allowDownload', `${state?.allowDownload || false}`);
        //     updatePayload.append('allowComments', `${state?.allowComments || false}`);
        // // if(state?.allowStitch)
        //     updatePayload.append('allowStitch', `${state?.allowStitch || false}`);
        // if(state?.place)
        //     updatePayload.append('place', state?.place || '');
        // if(state?.locationPlace)
        //     updatePayload.append('locationPlace', state?.locationPlace || '');

       
        // if (state?.scheduledAt) {
        //   updatePayload.append('scheduledAt', state?.scheduledAt || '');
        // }
        let messageURL = '';
        if (
            typeof state?.thumbnailUrl === 'string' &&
            state.thumbnailUrl.startsWith('data:image/')
          ) {
            console.log('state?.thumbnailUrl', state?.thumbnailUrl);
          
            const file = base64ToFile(state.thumbnailUrl, 'thumbnail.png');
            const formData = new FormData();
            formData.append('file', file); // append File object
            const controller = new AbortController();
            abortController.current = controller;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`, // Only this
                },
                signal: controller.signal,
                onUploadProgress: (progressEvent: any) => {
                  const progress = Math.round(
                    (100 * progressEvent.loaded) / progressEvent.total
                  );
                  console.log('Upload progress:', progress, '%');
                },
              };

            for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]); // Debugging
            }
          
            try {
                console.log('Token being used:', token);
              
                for (let pair of formData.entries()) {
                  console.log(pair[0], pair[1]);
                }
              
                const response = await axios.post(`${API_KEY}/util/file`, formData, config);
                console.log('Upload success:', response);
                messageURL = response.data.data;
              } catch (error: any) {
                if (axios.isCancel(error)) {
                  console.log("Upload canceled");
                } else {
                  console.error("Error during upload:", error.response || error);
                }
              } finally {
                abortController.current = null;
              }
        }

        console.log('messageURL', messageURL);

        // if(messageURL !='') 
        //     updatePayload.append('thumbnailUrl', messageURL);

         if (messageURL) {
            payload.thumbnailUrl = messageURL;
        }

console.log('PATCH payload being sent:', JSON.stringify(payload, null, 2));

        try {
            const response = await axios.patch(`${API_KEY}/media-content/${postId}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });
        
            console.log('PATCH response:', response.data);
            navigate('/studio/posts');
        } catch (error: any) {
            console.error('PATCH error:', error.response?.data || error);
        }
      };

      
    const SubmitHandler = async (isDraft = false) => {
        if (postId) { //calling only whne we're updating the video
            await SubmitHandlerWhenUpdateVideoCase();
            setTemplate(null);
            updateState('templateImage', null);
            dispatch(setSelectedTemplate(null));
            return;
        }

        if(currentEditVideo && currentEditVideo?._id) {
            SubmitHandlerWhenEditVideoCase();
            setTemplate(null);
            updateState('templateImage', null);
            dispatch(setSelectedTemplate(null));
            return false;
        }

        if(isEditMode) {
            SubmitHandlerWhenEditVideoCase();
            setTemplate(null);
            updateState('templateImage', null);
            dispatch(setSelectedTemplate(null));
            return false;
        }
        
        if(!isDraft)
            setIsPosting(true);

        let getLinks: any = {};
        let postPayload = new FormData();
        let postURL = '/media-content/v2/request-video-upload';
        if(state?.scheduledAt){
            console.log(state?.scheduledAt);
            postURL+= '?scheduledAt=' + state?.scheduledAt;
        }

        if (isDraft) {
            postURL += (postURL.includes('?') ? '&' : '?') + 'isDraft=true';
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
        postPayload.append('disclosePost', `${state?.disclosePost || false}`);
        postPayload.append('allowStitch', `${state?.allowStitch || false}`);
        postPayload.append('place', state?.place || '');
        postPayload.append('locationPlace', state?.locationPlace || '');
        if(state?.scheduledAt){
            console.log(state?.scheduledAt);
            postPayload.append('scheduledAt', state?.scheduledAt || '');
        }
        if(selectedTemplate){
            postPayload.append('templateImage', selectedTemplate || '');
        }

        if(state?.videoLength){
            console.log('my video lentth'+String(state?.videoLength || 0))
            postPayload.append('videoLength', String(state?.videoLength || 0));
        }

        // console.log(getLinks?.data?.data?.thumbnailUrl?.split('?')[0]);
        // console.log(state?.canView);
        // console.log(state?.description)
        // console.log(state.thumbnailUrl);
        // console.log('submit file output')
        // return false;
        
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
        setTemplate(null);
        updateState('templateImage', null);
        dispatch(setSelectedTemplate(null));
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
        console.log(typeof state?.disclosePost+'type of ')
        postPayload.append('disclosePost', `${state?.disclosePost || false}`);
        if(state?.scheduledAt){
            console.log(state?.scheduledAt);
            postPayload.append('scheduledAt', state?.scheduledAt || '');
        }

        if(selectedTemplate){
            postPayload.append('templateImage', selectedTemplate || '');
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
                        disclosePost: state?.disclosePost,
                    },
                    disclosePost: state?.disclosePost,
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
        updateTemplate,
        template,
    };
}

export default useUpload;