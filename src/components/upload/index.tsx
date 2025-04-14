import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../../redux/reducers/upload';
import Navbar from '../../shared/navbar';
import UploadFile from './components/uploadFile';
import UploadForm from './components/uploadForm';
import useUpload from './hooks';
import style from './index.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { academyOutlineDark, academyOutlineWhite, analyticsOutline, analyticsOutlineWhite, bulbOutlineDark, bulbOutlineWhite, commentOutlineDark, commentOutlineWhite, commentWhite, feedbackQuestionDark, feedbackQuestionWhite, hamburger, hamburgerDark, homeDark, homeIcon } from '../../icons';

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

    const [darkTheme, setdarkTheme] = useState('');
    const location = useLocation();
    const { isEditMode, info } = location.state || { isEditMode: false, info: {} };
    const uploadInterval = useRef<NodeJS.Timeout | null>(null);
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
            <div className={`w-56 h-[100vh] fixed top-0 left-0 ${darkTheme === '' ? 'bg-white' : 'bg-[#181818a8]'} pt-[80px] pb-3 px-3 flex flex-col`}>
                <button className={`${darkTheme === '' ? 'bg-[#FE2C55] hover:bg-[#FE2C69]' : 'bg-[#FE2C55]'} w-full ring-0 hover:border-transparent rounded-md my-3 py-1.5 text-white opacity-80 d-flex`} > 
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75473 3.46875C9.21443 3.46875 9.58752 3.84184 9.58752 4.30154V8.13238H13.4184C13.6392 8.13238 13.8511 8.22012 14.0072 8.3763C14.1634 8.53248 14.2512 8.74431 14.2512 8.96518C14.2512 9.18605 14.1634 9.39787 14.0072 9.55405C13.8511 9.71023 13.6392 9.79797 13.4184 9.79797H9.58752V13.6288C9.58752 13.8497 9.49978 14.0615 9.3436 14.2177C9.18742 14.3739 8.9756 14.4616 8.75473 14.4616C8.53386 14.4616 8.32203 14.3739 8.16585 14.2177C8.00967 14.0615 7.92193 13.8497 7.92193 13.6288V9.79797H4.09109C3.87022 9.79797 3.6584 9.71023 3.50222 9.55405C3.34604 9.39787 3.2583 9.18605 3.2583 8.96518C3.2583 8.74431 3.34604 8.53248 3.50222 8.3763C3.6584 8.22012 3.87022 8.13238 4.09109 8.13238H7.92193V4.30154C7.92193 3.84184 8.29502 3.46875 8.75473 3.46875Z" fill="white"/>
                    </svg> 
                    Upload
                </button>
                <h5 className='text-sm font-semibold text-left'>Manage</h5>
                <ul className='text-sm space-y-6 mt-3 text-left mx-2'>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/home')}>
                        <img className='w-5 inline-block' src={darkTheme===''?homeDark:homeIcon} alt="" />
                        <span>Home</span>
                    </li>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics/content')}>
                        <img className='w-4 inline-block' src={darkTheme===''?hamburgerDark :hamburger} alt="" />
                        <span>&nbsp;Posts</span>
                    </li>
                    {/* <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?commentOutlineDark:commentOutlineWhite} alt="" />
                        <span>Comments</span>
                    </li> */}
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics')}>
                        <img className='w-5 inline-block' src={darkTheme===''?analyticsOutline:analyticsOutlineWhite} alt="" />
                        <span>Analytics</span>
                    </li>
                    {/* <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?bulbOutlineDark:bulbOutlineWhite} alt="" />
                        <span>Inspirations</span>
                    </li>
                    <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?academyOutlineDark :academyOutlineWhite} alt="" />
                        <span>Creator Academy</span>
                    </li> */}
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/contactus')}>
                        <img className='w-5 inline-block' src={darkTheme===''?feedbackQuestionDark:feedbackQuestionWhite} alt="" />
                        <span>Feedback</span>
                    </li>
                </ul>
                <div className='mt-auto w-full text-left'>
                    <button className='w-full ring-0 hover:border-transparent text-sm font-semibold px-0 text-left py-2 d-flex justify-start' onClick={() => navigate('/home')}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.83712 3.06017C8.95293 3.16229 9.02351 3.30618 9.03334 3.46028C9.04318 3.61437 8.99147 3.76607 8.88958 3.88208L6.1522 6.99486L8.89074 10.1076C8.94308 10.1648 8.98347 10.2319 9.00957 10.3049C9.03566 10.3779 9.04693 10.4554 9.04271 10.5328C9.0385 10.6102 9.01888 10.686 8.98501 10.7558C8.95114 10.8255 8.9037 10.8878 8.84546 10.939C8.78723 10.9901 8.71937 11.0292 8.64585 11.0538C8.57234 11.0785 8.49465 11.0882 8.41734 11.0824C8.34002 11.0766 8.26463 11.0555 8.19558 11.0203C8.12653 10.985 8.06521 10.9363 8.0152 10.8771L5.2242 7.70485C5.0511 7.50885 4.95557 7.25636 4.95557 6.99486C4.95557 6.73336 5.0511 6.48087 5.2242 6.28487L8.0152 3.11205C8.06578 3.05453 8.1272 3.00754 8.19595 2.97377C8.2647 2.94 8.33943 2.92012 8.41587 2.91524C8.49231 2.91037 8.56896 2.92061 8.64144 2.94538C8.71392 2.97015 8.78081 3.00896 8.83828 3.05959" fill="black" fill-opacity="0.65"/>
                        </svg> Back to Seezitt
                    </button>
                    <hr/>
                    <div className='text-xs opacity-60 mt-2 flex flex-col gap-2'>
                        <span className='cursor-pointer' onClick={() => navigate('/about/terms-conditions')}>Terms of Service</span>
                        <span className='cursor-pointer' onClick={() => navigate('/about/privacy-policy')}>Privacy Policy</span>
                        <span className='cursor-pointer'>Copyright &copy; {(new Date()).getFullYear()} Seezitt</span>
                    </div>
                </div>
            </div>
            {!selectedFile && !isEditMode ? (
                <UploadFile  changeFileHandler={handleFileSelect} />
            ) : (
                <UploadForm
                    selectedVideoSrc={selectedVideoSrc}
                    selectFilesHandler={selectFilesHandler}
                    thumbnails={thumbnails}
                    updateState={updateState}
                    state={state}
                    SubmitHandler={SubmitHandler}
                    updateMediaHandler={updateMediaHandler}
                    isPosting={isPosting}
                    videoInfo={info}
                    uploadState={uploadState}
                    onCancelUpload={handleCancelUpload}
                />
            )}
        </div>
    );
}

export default UploadPage;
