import Navbar from '../../shared/navbar';
import UploadFile from './components/uploadFile';
import UploadForm from './components/uploadForm';
import useUpload from './hooks';
import style from './index.module.scss';
import { useState,useEffect } from 'react';

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
        isPosing,
    } = useUpload();

    const [darkTheme, setdarkTheme] = useState('');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if(themeColor == "dark"){ 
            setdarkTheme(style.darkTheme);
        }else{
        }
    });

    return (
        <div className={`flex flex-col ${darkTheme}`}>
            <Navbar />
            {!selectedFile ? (
                <UploadFile selectFilesHandler={selectFilesHandler} />
            ) : (
                <UploadForm
                    selectedVideoSrc={selectedVideoSrc}
                    selectFilesHandler={selectFilesHandler}
                    thumbnails={thumbnails}
                    updateState={updateState}
                    state={state}
                    SubmitHandler={SubmitHandler}
                    isPosing={isPosing}
                />
            )}
            <input
                ref={inputElementRef}
                onChange={onChangeFileHandler}
                type="file"
                className="hidden"
                accept='video/*'
            />
        </div>
    );
}

export default UploadPage;
