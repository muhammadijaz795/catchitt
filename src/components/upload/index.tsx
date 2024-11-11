import Navbar from '../../shared/navbar';
import UploadFile from './components/uploadFile';
import UploadForm from './components/uploadForm';
import useUpload from './hooks';
import style from './index.module.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

    const [darkTheme, setdarkTheme] = useState('');
    const location = useLocation();
    const { isEditMode, info } = location.state || { isEditMode: false, info: {} };

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
        } else {
        }
    });

    return (
        <div className={`flex flex-col ${darkTheme}`}>
            <Navbar />
            {!selectedFile && !isEditMode ? (
                <UploadFile changeFileHandler={onChangeFileHandler} />
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
                />
            )}
        </div>
    );
}

export default UploadPage;
