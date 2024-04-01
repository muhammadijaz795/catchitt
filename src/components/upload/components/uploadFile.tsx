import { uploadPrimaryIcon } from '../../../icons';
import CustomButton from '../../../shared/buttons/CustomButton';
import React from 'react';

function UploadFile({ selectFilesHandler }: any) {
    return (
        <div className="w-[100%] h-[100vh]  flex justify-center items-center pt-[5rem]">
            <div className="min-w-[19rem] h-[auto] bg-custom-light xl:w-[71.5rem] rounded-[0.5rem] p-[1.5rem]">
                <div
                    style={{ border: '1px dashed #BABABA' }}
                    className="rounded-[0.5rem] px-[1rem] py-[4rem]"
                >
                    <div className="flex flex-col items-center gap-[0.5rem]">
                        <div className="w-[71px] h-[71px] rounded-[50%] bg-custom-gray-100 flex justify-center items-center cursor-pointer select-none">
                            <img className="w-[42px] h-[42px]" src={uploadPrimaryIcon} alt="" />
                        </div>
                        <p className="text-[20px] font-semibold leading-[24px] mt-[1rem]">
                            Select video to upload
                        </p>
                        <p className="font-mediun text-custom-color-999">Drag and drop files</p>
                        <p className="font-mediun text-custom-color-999">
                            Long videos can be split into multiple parts to get more exposure
                        </p>
                        <p className="font-mediun text-custom-color-999 mt-[1rem]">
                            Support mp4, avi, webm, and mov video formats
                        </p>
                        <p className="font-mediun text-custom-color-999">Up to 600 seconds</p>
                        <p className="font-mediun text-custom-color-999">Less than 2 GB</p>
                        <p className="font-mediun text-custom-color-999 mb-[1rem]">
                            Less than 30 videos
                        </p>
                        <CustomButton
                            onClick={selectFilesHandler}
                            text="Select files"
                            width="453px !important"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadFile;
