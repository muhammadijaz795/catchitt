import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../../redux/reducers/upload';
import Navbar from '../../shared/navbar';
import UploadFile from './components/uploadFile';
import UploadForm from './components/uploadForm';
import useUpload from './hooks';
import style from './index.module.scss';
import { useState, useEffect } from 'react';
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
            <div className={`w-52 h-[100vh] fixed top-0 left-0 ${darkTheme === '' ? 'bg-white' : 'bg-[#181818a8]'} pt-[80px] pb-3 px-2 flex flex-col`}>
                <button className={`${darkTheme === '' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-custom-dark-222'} w-full ring-0 hover:border-transparent rounded-none my-3 opacity-80`} >Upload</button>
                <hr />
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
                    <button className='w-full ring-0 hover:border-transparent text-sm font-semibold px-0 text-left py-2' onClick={() => navigate('/home')}>Back to Seezitt</button>
                    <hr/>
                    <div className='text-xs opacity-60 mt-2 flex flex-col gap-2'>
                        <span className='cursor-pointer' onClick={() => navigate('/about/terms-conditions')}>Terms of Service</span>
                        <span className='cursor-pointer' onClick={() => navigate('/about/privacy-policy')}>Privacy Policy</span>
                        <span className='cursor-pointer'>Copyright &copy; {(new Date()).getFullYear()} Seezitt</span>
                    </div>
                </div>
            </div>
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
