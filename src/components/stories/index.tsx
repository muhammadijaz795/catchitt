import { useState, useEffect } from 'react';
import Navbar from '../../shared/navbar';
import StoryEditor from './components/story-editor';
import UploadStory from './components/upload-story';
import style from './style.module.scss';

const CreateStoryPage = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [videoUrl, setVideoUrl] = useState<any>('');
    const [fileType, setFileType] = useState<any>('');
    const [darkTheme, setdarkTheme] = useState('');
    const [lightDarkTheme, setlightDarkTheme] = useState('');
    const [darkWhiteTheme, setDarkWhiteTheme] = useState('');
    const [textColor, setTextColor] = useState('text-black');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
        }
    });

    const selectFilesHandler = (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const videoUrl = URL.createObjectURL(file);
        setVideoUrl(videoUrl);

        setSelectedFile(file);

        // Check file type
        setFileType(file.type);

        // hiddenVdeoRef.current.src = videoUrl;
        // hiddenVdeoRef.src = videoUrl;

        // videoRef.current.src = videoUrl;
        // videoRef.src = videoUrl;
    };
    return (
        <div className={`flex flex-col ${darkTheme}`}>
            <Navbar />

            {selectedFile == null ? (
                <UploadStory selectFilesHandler={selectFilesHandler} />
            ) : (
                <StoryEditor file={selectedFile} />
            )}
        </div>
    );
};

export default CreateStoryPage;
