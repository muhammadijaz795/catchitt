import { useState, useEffect } from 'react';
import CustomButton from '../../../shared/buttons/CustomButton';
import style from '../index.module.scss';
import DndContainer from './DndContainer';
import {
    VideocamOutlined,
    VideoFileOutlined,
    FourKOutlined,
    CropOutlined,
} from '@mui/icons-material';

function UploadFile({ changeFileHandler }: any) {
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
        <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-2.5">
            <div
                className={`w-4/5 max-w-[950px] h-4/6 flex flex-col items-center px-[1rem] py-[1.5rem] gap-4 border justify-center cursor-pointer rounded-2xl`}
            >
                <DndContainer
                    className="w-full h-full"
                    text="Select a video file"
                    orText="drag and drop it here"
                    accept="video/*"
                    onChangeFile={changeFileHandler}
                >
                    <CustomButton
                        text="Select video"
                        width="16.938rem !important"
                    />
                </DndContainer>
                <div className="w-full flex items-center justify-around">
                    <div className="relative flex flex-col text-left gap-1.5 pl-10">
                        <VideocamOutlined className="text-gray-300 absolute left-2.5 -top-0.5" />
                        <p className="font-semibold text-sm">Size and duration</p>
                        <p className="text-gray-500 text-xs">
                            Maximum size 10GB, video duration 60 minutes
                        </p>
                    </div>
                    <div className="relative flex flex-col text-left gap-1.5 pl-10">
                        <VideoFileOutlined className="text-gray-300 absolute left-2.5 -top-0.5" />
                        <p className="font-semibold text-sm">File formats</p>
                        <p className="text-gray-500 text-xs">
                            Recomended: ".mp4" but other major formats are supported.
                        </p>
                    </div>
                    <div className="relative flex flex-col text-left gap-1.5 pl-10">
                        <FourKOutlined className="text-gray-300 absolute left-2.5 -top-0.5"/>
                        <p className="font-semibold text-sm">Video resolutions</p>
                        <p className="text-gray-500 text-xs">
                            Minimum resolution: 720p, 2K adn 4K supported
                        </p>
                    </div>
                    <div className="relative flex flex-col text-left gap-1.5 pl-10">
                        <CropOutlined className="text-gray-300 absolute left-2.5 -top-0.5" />
                        <p className="font-semibold text-sm">Aspect Ratios</p>
                        <p className="text-gray-500 text-xs">
                            Recomended: 16:9 for landscape, 9:16 for vertical
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadFile;
