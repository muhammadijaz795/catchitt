import { useState } from 'react';
import { goLive, uploadPrimaryIcon } from '../../../icons';
import CustomButton from '../../../shared/buttons/CustomButton';
import { useNavigate } from 'react-router-dom';

function UploadFile({ selectFilesHandler }: any) {
    const [currentOptions, setCurrentOptions] = useState(0);
    const navigate = useNavigate();

    const toggleCurrentOptions = (option: number) => {
        setCurrentOptions(option);
    };

    const proceedToGoLivePage = () => {
        navigate('/golive');
    };

    return (
        <div className="w-[100%] h-[100vh]  flex justify-center items-center pt-[5rem]">
            <div className="min-w-[19rem] h-[auto] bg-custom-light xl:w-[71.5rem] rounded-[0.5rem] p-[1.5rem] text-right">
                <div
                    className="flex flexrow items-center justify-between rounded-[0.5rem] px-[1rem] py-[4rem] gap-4"
                >
                    <div
                        onClick={() => toggleCurrentOptions(0)}
                        className={`flex flex-col items-center gap-[0.5rem flex-1 border cursor-pointer ${
                            currentOptions === 0 ? '!border-liveSelected' : ''
                        } h-[13.2rem] justify-center rounded-2xl`}
                    >
                        <div className="w-[71px] h-[71px] rounded-[50%] bg-custom-gray-100 flex justify-center items-center cursor-pointer select-none">
                            <img className="w-[42px] h-[42px]" src={goLive} alt="" />
                        </div>
                        <p className="text-[20px] font-semibold leading-[24px] mt-[1rem]">
                            Go LIVE
                        </p>
                        {/* <p className="font-mediun text-custom-color-999">Drag and drop files</p>
                        <p className="font-mediun text-custom-color-999">
                            Long videos can be split into multiple parts to get more exposure
                        </p>
                        <p className="font-mediun text-custom-color-999 mt-[1rem]">
                            Support mp4, avi, webm, and mov video formats
                        </p>
                        <p className="font-mediun text-custom-color-999">Up to 300 seconds</p>
                        <p className="font-mediun text-custom-color-999">Less than 200 MB</p> */}
                        {/* <p className="font-mediun text-custom-color-999 mb-[1rem]">
                            Less than 30 videos
                        </p> */}
                        {/* <CustomButton
                            onClick={selectFilesHandler}
                            text="Select files"
                            width="453px !important"
                        /> */}
                    </div>
                    <div
                        onClick={() => toggleCurrentOptions(1)}
                        className={`flex flex-col items-center gap-[0.5rem flex-1 border h-[13.2rem] justify-center cursor-pointer ${
                            currentOptions === 1 ? '!border-liveSelected' : ''
                        } rounded-2xl`}
                    >
                        <div className="w-[71px] h-[71px] rounded-[50%] bg-custom-gray-100 flex justify-center items-center cursor-pointer select-none">
                            <img className="w-[42px] h-[42px]" src={uploadPrimaryIcon} alt="" />
                        </div>
                        <p className="text-[20px] font-semibold leading-[24px] mt-[1rem]">
                            Select video to upload
                        </p>
                        {/* <p className="font-mediun text-custom-color-999">Drag and drop files</p>
                        <p className="font-mediun text-custom-color-999">
                            Long videos can be split into multiple parts to get more exposure
                        </p>
                        <p className="font-mediun text-custom-color-999 mt-[1rem]">
                            Support mp4, avi, webm, and mov video formats
                        </p>
                        <p className="font-mediun text-custom-color-999">Up to 300 seconds</p>
                        <p className="font-mediun text-custom-color-999">Less than 200 MB</p> */}
                        {/* <p className="font-mediun text-custom-color-999 mb-[1rem]">
                            Less than 30 videos
                        </p> */}
                    </div>
                </div>
                <CustomButton
                    onClick={() =>
                        currentOptions === 0 ? proceedToGoLivePage() : selectFilesHandler()
                    }
                    text="Next"
                    width="16.938rem !important"
                    preference={currentOptions}
                />
            </div>
        </div>
    );
}

export default UploadFile;
