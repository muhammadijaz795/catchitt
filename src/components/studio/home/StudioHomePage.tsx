import Navbar from '../../../shared/navbar';
import UploadsHome from '../../analytics/UploadsHome';
import style from './index.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { academyOutlineDark, academyOutlineWhite, analyticsOutline, analyticsOutlineWhite, bulbOutlineDark, bulbOutlineWhite, commentOutlineDark, commentOutlineWhite, commentWhite, feedbackQuestionDark, feedbackQuestionWhite, hamburger, hamburgerDark, homeDark, homeIcon } from '../../../icons';
import UploadSidebar from '../UploadSidebar';


function StudioHomePage() {
    const navigate = useNavigate();

    const [darkTheme, setdarkTheme] = useState('');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        setdarkTheme('');
        // if (themeColor == 'dark') {
        //     setdarkTheme(style.darkTheme);
        // } else {
        // }
    }, []); 

    return (
        <div className={`flex flex-col ${darkTheme}`}>
            <Navbar />
            <UploadSidebar />
            <div className='w-[calc(100%-14rem)] ml-auto px-4'>
                        <UploadsHome/>
            </div>
        </div>
    );
}

export default StudioHomePage;
