import FormLeftSide from './formLeftSide';
import FormRightSide from './formRightSide';
import { useState, useEffect } from 'react';
import style from '../index.module.scss';

function UploadForm(props: any) {
    const {
        selectedVideoSrc,
        selectFilesHandler,
        thumbnails,
        updateState,
        state,
        SubmitHandler,
        // updateMediaHandler,
        isPosting,
        // videoInfo,
        uploadState,
        onCancelUpload,
    } = props;
    const [darkTheme, setdarkTheme] = useState('');
    const [lightTheme, setlightTheme] = useState('bg-custom-light');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        setlightTheme('bg-custom-light');

        // if (themeColor == 'dark') {
        //     setdarkTheme(style.darkTheme);
        //     setlightTheme('');
        // } else {
        //     setlightTheme('bg-custom-light');
        // }
    });

    const renderUploadStatus = () => {
            const isUploadComplete = uploadState.percentage === 100;
        
            return (
                <div className="w-full bg-white shadow-sm rounded-md pt-4 pb-[0]">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        {/* File name and quality */}
                        <div className="flex items-start flex-col gap-2 text-sm font-medium pl-4">
                            <div className='flex'>
                                <span>{uploadState.fileName || "No file selected"}</span>
                                {uploadState.fileName && (
                                    <span className="text-xs ml-2 border border-gray-300 rounded px-1 py-0.5 text-gray-700">
                                        1080P
                                    </span>
                                )}
                            </div>
                            {uploadState.fileName && (
                                <div className="flex items-center gap-3 text-sm">
                                    <span
                                        className={`${
                                            isUploadComplete ? 'text-green-600' : 'text-blue-600'
                                        } hover:underline flex`}
                                    >
                                        <svg className='pr-1' width="14" height="14" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.31834 0.0703205C5.20904 0.0681081 5.05314 0.523125 3.99199 1.36148C3.85399 1.47192 3.76551 1.63265 3.74602 1.80832C3.72653 1.98399 3.77762 2.16021 3.88806 2.2982C3.99849 2.4362 4.15923 2.52468 4.3349 2.54417C4.51057 2.56366 4.68678 2.51257 4.82478 2.40214C5.64877 1.75141 6.66896 1.39914 7.7189 1.40279C8.95577 1.40279 10.142 1.89413 11.0166 2.76873C11.8912 3.64333 12.3825 4.82955 12.3825 6.06642H11.7163C11.6544 6.06642 11.5938 6.08365 11.5412 6.11617C11.4885 6.1487 11.446 6.19523 11.4184 6.25056C11.3907 6.3059 11.379 6.36784 11.3845 6.42945C11.3901 6.49107 11.4127 6.54992 11.4498 6.59941L12.7823 8.37625C12.8133 8.41762 12.8535 8.4512 12.8998 8.47433C12.946 8.49746 12.9971 8.5095 13.0488 8.5095C13.1005 8.5095 13.1515 8.49746 13.1977 8.47433C13.244 8.4512 13.2842 8.41762 13.3153 8.37625L14.6477 6.59941C14.6848 6.54992 14.7074 6.49107 14.713 6.42945C14.7186 6.36784 14.7068 6.3059 14.6792 6.25056C14.6515 6.19523 14.609 6.1487 14.5564 6.11617C14.5037 6.08365 14.4431 6.06642 14.3812 6.06642H13.715C13.715 4.47616 13.0833 2.95102 11.9588 1.82654C10.8343 0.702051 9.30917 0.0703205 7.7189 0.0703205ZM2.65553 3.75659C2.6245 3.71522 2.58426 3.68164 2.53801 3.65851C2.49175 3.63538 2.44075 3.62334 2.38903 3.62334C2.33732 3.62334 2.28631 3.63538 2.24006 3.65851C2.1938 3.68164 2.15357 3.71522 2.12254 3.75659L0.790073 5.53343C0.752955 5.58293 0.730352 5.64177 0.724796 5.70339C0.71924 5.765 0.730952 5.82695 0.758618 5.88228C0.786284 5.93761 0.828812 5.98415 0.881437 6.01667C0.934061 6.04919 0.994703 6.06642 1.05657 6.06642H1.7228C1.7228 7.65669 2.35453 9.18182 3.47902 10.3063C4.6035 11.4308 6.12864 12.0625 7.7189 12.0625C9.07126 12.0647 10.3847 11.6097 11.4458 10.7714C11.5141 10.7167 11.571 10.6491 11.6132 10.5724C11.6554 10.4957 11.6821 10.4115 11.6918 10.3245C11.7014 10.2375 11.6939 10.1495 11.6695 10.0655C11.6451 9.9814 11.6044 9.90297 11.5497 9.83464C11.4951 9.76631 11.4275 9.70942 11.3508 9.66721C11.2741 9.62501 11.1899 9.59832 11.1029 9.58867C11.0159 9.57902 10.9279 9.58659 10.8438 9.61096C10.7598 9.63533 10.6813 9.67602 10.613 9.7307C9.78929 10.3819 8.76893 10.7342 7.7189 10.7301C6.48203 10.7301 5.29581 10.2387 4.42121 9.36411C3.54661 8.48951 3.05527 7.30329 3.05527 6.06642H3.7215C3.78336 6.06642 3.84401 6.04919 3.89663 6.01667C3.94925 5.98415 3.99178 5.93761 4.01945 5.88228C4.04711 5.82695 4.05883 5.765 4.05327 5.70339C4.04771 5.64177 4.02511 5.58293 3.98799 5.53343L2.65553 3.75659Z" fill={isUploadComplete ? "#28A745" : "#0075DB"} />
                                        </svg>
                                        <p>
                                            {uploadState.uploaded > 1024
                                                ? `${(uploadState.uploaded / 1024).toFixed(2)} MB`
                                                : `${uploadState.uploaded.toFixed(2)} KB`} 
                                            {isUploadComplete && ` (${uploadState.total.toFixed(2)} MB)`} / {uploadState.total.toFixed(2)} MB
                                        </p>
                                    </span>
                                    {!isUploadComplete && (
                                        <>
                                            <span className={`text-sm ${isUploadComplete ? 'text-green-600' : 'text-gray-600'}`}>
                                                Duration: {uploadState.duration}
                                            </span>
                                            <span className={`text-sm ${isUploadComplete ? 'text-green-600' : 'text-gray-600'}`}>
                                                {uploadState.timeLeft}
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
        
                        {/* Cancel + % */}
                        <div className="flex flex-col items-center gap-3 text-sm pr-4">
                            {uploadState.isUploading ? (
                                <button 
                                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                                    onClick={onCancelUpload}
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button 
                                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                                    onClick={onCancelUpload}
                                >
                                    Replace
                                </button>
                            )}
                            {uploadState.fileName && (
                                <span className={`text-xl font-semibold ${isUploadComplete ? 'text-green-600' : 'text-blue-600'}`}>
                                    {uploadState.percentage}% 
                                </span>
                            )}
                        </div>
                    </div>
        
                    {/* Progress bar */}
                    <div className="w-full h-1 rounded mt-3 overflow-hidden">
                        <div
                            className={`h-full ${isUploadComplete ? 'bg-green-600' : 'bg-blue-600'}`}
                            style={{ width: `${uploadState.percentage}%` }}
                        ></div>
                    </div>
                </div>
            );
        };

    return (
        <>
            {uploadState.fileName && (
                <div className={`w-[calc(100%-14rem)]  ml-auto mb-3 mt-5 pt-5 px-3 flex flex-col items-center gap-4 justify-center cursor-pointer rounded-2xl`}>
                    {renderUploadStatus()}
                </div>
            )}
            <div
                className={`w-[calc(100%-14rem)]  flex-col pl-5 ml-auto mb-[2rem] rounded-[0.5rem] flex md:flex-row `}
            >

                
                
                <FormRightSide
                    // videoInfo={videoInfo}
                    updateState={updateState}
                    thumbnails={thumbnails}
                    state={state}
                    SubmitHandler={SubmitHandler}
                    // updateMediaHandler={updateMediaHandler}
                    isPosting={isPosting}
                    uploadState={uploadState}
                    onCancelUpload={onCancelUpload}
                    onReplaceFile={selectFilesHandler}
                />
                <FormLeftSide
                    // videoInfo={videoInfo}
                    darkTheme={darkTheme}
                    selectedVideoSrc={selectedVideoSrc}
                    selectFilesHandler={selectFilesHandler}
                    updateState={updateState}
                />
                
            </div>
        </>
      
    );
}

export default UploadForm;
