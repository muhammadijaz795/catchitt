import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../../redux/reducers/upload';
import Navbar from '../../shared/navbar';
import UploadFile from './components/uploadFile';
import UploadForm from './components/uploadForm';
import useUpload from './hooks';
import style from './index.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { academyOutlineDark, academyOutlineWhite, analyticsOutline, analyticsOutlineWhite, bulbOutlineDark, bulbOutlineWhite, commentOutlineDark, commentOutlineWhite, commentWhite, feedbackQuestionDark, feedbackQuestionWhite, hamburger, hamburgerDark, homeDark, homeIcon } from '../../icons';
import { Avatar, Box, Typography, Paper } from '@mui/material';


import StudioLeftSidebar from '../studio/StudioLeftSidebar';

function UploadPage() {
    const {
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
    } = useUpload();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log('my state', state);

    const [darkTheme, setdarkTheme] = useState('');
    const location = useLocation();
    let { isEditMode, info } = location.state || { isEditMode: false, info: {} };
    const uploadInterval = useRef<NodeJS.Timeout | null>(null);
    const [postData, setPostData] = useState<any>(null);
    const { id: postId } = useParams(); 
    const token = localStorage.getItem('token');
    const API_KEY = process.env.VITE_API_URL;
    if(postId) {
        isEditMode = true;
        info = state; 
    }

    const [uploadState, setUploadState] = useState({
        fileName: "",
        uploaded: 0, // in KB
        total: 0,    // in MB
        duration: "0m00s",
        timeLeft: "Calculating...",
        percentage: 0,
        isUploading: false,
    });


    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        setdarkTheme('');
        // if (themeColor == 'dark') {
        //     setdarkTheme(style.darkTheme);
        // } else {
        // }
    });
      

    // useEffect(() => {
    //     return () => {
    //         dispatch(setSelectedFile({ file: null }));
    //     }
    // }, [])
     // Clean up on unmount
     useEffect(() => {
        return () => {
            dispatch(setSelectedFile({ file: null }));
            if (uploadInterval.current) {
                clearInterval(uploadInterval.current);
                uploadInterval.current = null;
              }
        };
    }, [dispatch]);

    // useEffect(() => {
    //     return () => {
    //         if (uploadInterval.current) {
    //             clearInterval(uploadInterval.current);
    //             uploadInterval.current = null;
    //         }
    //     };
    // }, []);

    useEffect(() => {
        // console.log("Updated upload state:", uploadState);
    }, [uploadState]);

     // Handle file selection from UploadFile component
     const handleFileSelect = (file: File) => {
        if (!file) return;
    
        const fileName = file.name;
        const totalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
    
        const objectUrl = URL.createObjectURL(file);
        videoElement.src = objectUrl;
    
        videoElement.onloadedmetadata = () => {
            URL.revokeObjectURL(objectUrl);
    
            const durationInSeconds = videoElement.duration;
    
            // Format duration into "XmYYs"
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = Math.floor(durationInSeconds % 60);
            const formattedDuration = `${minutes}m${seconds.toString().padStart(2, '0')}s`;
    
            setUploadState({
                fileName,
                uploaded: 0,
                total: parseFloat(totalSizeMB),
                duration: formattedDuration,
                timeLeft: '10.0 seconds left',
                percentage: 0,
                isUploading: true,
            });
    
            setTimeout(() => startSimulatedUpload(), 0);
            onChangeFileHandler(file);
        };
    
        videoElement.onerror = () => {
            console.error('Error loading video metadata');
            // fallback if duration fails
            setUploadState({
                fileName,
                uploaded: 0,
                total: parseFloat(totalSizeMB),
                duration: '0m00s',
                timeLeft: '10.0 seconds left',
                percentage: 0,
                isUploading: true,
            });
    
            setTimeout(() => startSimulatedUpload(), 0);
            onChangeFileHandler(file);
        };
    };
    

    const uploadStateRef = useRef(uploadState);
    useEffect(() => {
        uploadStateRef.current = uploadState;
    }, [uploadState]);

    // Simulate upload progress
    
    const startSimulatedUpload = () => {
        if (uploadInterval.current) {
            clearInterval(uploadInterval.current);
            uploadInterval.current = null;
        }
    
        const startTime = Date.now();
        const durationMs = 10000;
    
        uploadInterval.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(100, (elapsed / durationMs) * 100);
            const totalBytes = uploadStateRef.current.total * 1024 * 1024;
            const uploadedBytes = (totalBytes * progress) / 100;
    
            const uploadedKB = uploadedBytes / 1024;
            const remainingMs = Math.max(0, durationMs - elapsed);
            const remainingSeconds = Math.max(0, parseFloat((remainingMs / 1000).toFixed(1)));
            const timeLeft = `${remainingSeconds} seconds left`;
    
            const newState = {
                ...uploadStateRef.current,
                uploaded: uploadedKB,
                percentage: Math.floor(progress),
                timeLeft,
                isUploading: progress < 100,
            };
    
            setUploadState(newState);
    
            if (progress >= 100 || remainingMs <= 0) {
                clearInterval(uploadInterval.current!);
                uploadInterval.current = null;
            }
        }, 100);
    };
    
    

    // Cancel upload handler
    const handleCancelUpload = () => {
        if (uploadInterval.current) {
            clearInterval(uploadInterval.current);
            uploadInterval.current = null;
        }
        setUploadState({
            fileName: "",
            uploaded: 0,
            total: 0,
            duration: "0m00s",
            timeLeft: "0 seconds left",
            percentage: 0,
            isUploading: false,
        });
        dispatch(setSelectedFile({ file: null }));
    };

    return (
        <div className={`flex flex-col ${darkTheme}`}>
            <Navbar />
            <StudioLeftSidebar />
            {(!selectedFile && !isEditMode && !postId) ? (
                <UploadFile  changeFileHandler={handleFileSelect} />
            ) : (
                <UploadForm
                    selectedVideoSrc={isEditMode ? info?.originalUrl : selectedVideoSrc}
                    selectFilesHandler={selectFilesHandler}
                    thumbnails={thumbnails}
                    updateState={updateState}
                    state={state}
                    SubmitHandler={SubmitHandler}
                    updateMediaHandler={updateMediaHandler}
                    isPosting={isPosting}
                    videoInfo={isEditMode ? info : {}}
                    uploadState={uploadState}
                    onCancelUpload={handleCancelUpload}
                    isEditMode={isEditMode}
                />
            )}
            
        </div>
    );
}

export default UploadPage;
