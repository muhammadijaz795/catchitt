import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../../redux/reducers/upload';
import Navbar from '../../shared/navbar';
import UploadFile from './components/uploadFile';
import UploadForm from './components/uploadForm';
import useUpload from './hooks';
import style from './index.module.scss';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { academyOutlineDark, academyOutlineWhite, analyticsOutline, analyticsOutlineWhite, bulbOutlineDark, bulbOutlineWhite, commentOutlineDark, commentOutlineWhite, commentWhite, feedbackQuestionDark, feedbackQuestionWhite, hamburger, hamburgerDark, homeDark, homeIcon } from '../../icons';
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

    useEffect(() => {
        return () => {
            dispatch(setSelectedFile({ file: null }));
        }
    }, [])

    return (
        <div className={`flex flex-col ${darkTheme}`}>
            <Navbar />
            <StudioLeftSidebar />
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
