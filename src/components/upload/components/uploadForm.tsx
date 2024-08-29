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
    } = props;
    const [darkTheme, setdarkTheme] = useState('');
    const [lightTheme, setlightTheme] = useState('bg-custom-light');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
            setlightTheme('');
        } else {
            setlightTheme('bg-custom-light');
        }
    });

    return (
        <div
            className={`max-w-[71.25rem] ${darkTheme} ${lightTheme} flex-col mt-[7rem] mx-auto mb-[2rem] rounded-[0.5rem] flex md:flex-row `}
        >
            <FormLeftSide
                // videoInfo={videoInfo}
                darkTheme={darkTheme}
                selectedVideoSrc={selectedVideoSrc}
                selectFilesHandler={selectFilesHandler}
                updateState={updateState}
            />
            <FormRightSide
                // videoInfo={videoInfo}
                updateState={updateState}
                thumbnails={thumbnails}
                state={state}
                SubmitHandler={SubmitHandler}
                // updateMediaHandler={updateMediaHandler}
                isPosting={isPosting}
            />
        </div>
    );
}

export default UploadForm;
