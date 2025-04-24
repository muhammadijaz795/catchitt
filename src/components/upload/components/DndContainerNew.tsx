import React, { useState } from 'react';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import CircularProgress from '@mui/material/CircularProgress';
import SvgIcon from '@mui/material/SvgIcon';
import CloseIcon from '@mui/icons-material/Close';
import Styles from './index.module.scss';

const { Dragger } = Upload;

const DndContainer = ({
    onChangeFile,
    aspect = 1 / 1,
    quality = 1,
    shape = 'rect',
    modalTitle = 'Crop Image',
    className = '',
    text = 'Drag and drop a file here',
    orText = 'Select a file',
    Format="",
    subtitle = '',
    crop = false,
    accept = 'image/*',
    videoThumbnails,
    coverTab,
    setCoverTab,
    customCover,
    setCustomCover,
    updateState,
    selectedThumb,
    setSelectedThumb,
    wrapperId,
    handleClose
}: any) => {
    const [fileList, setFileList] = useState<any>([]);

    const coverProps: UploadProps = {
        name: 'file',
        multiple: false,
        listType: 'picture',
        showUploadList: false, // 🚫 Hide file list preview
        accept: accept,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        onChange: ({ fileList: newFileList }: any) => {
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            onChangeFile(file);
            return false;
        },
        customRequest: (item) => {
            console.log(item);
        },
    };


    const DndComp = (
<Dragger
id={wrapperId}
  {...coverProps}
  style={{
    backgroundColor: 'transparent',
    border: 'none',
    height: '100%',
  }}
>            <p className="ant-upload-drag-icon w-[5rem] m-auto">
            <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.4465 47.1592H43.6965C46.6942 47.1515 49.578 46.0103 51.7692 43.9647C53.9605 41.919 55.297 39.1204 55.5106 36.1303C55.7242 33.1402 54.799 30.18 52.9207 27.8437C51.0425 25.5074 48.3501 23.9679 45.384 23.5342C44.7891 19.8075 42.8114 16.4419 39.8452 14.1087C36.879 11.7755 33.1423 10.6461 29.3803 10.9458C25.6183 11.2455 22.1075 12.9523 19.5481 15.7257C16.9887 18.4991 15.5688 22.1353 15.5715 25.9092V25.9217C12.7891 26.0527 10.1694 27.2712 8.27655 29.3146C6.38367 31.3581 5.36895 34.0632 5.45089 36.8475C5.53283 39.6318 6.70487 42.2725 8.71465 44.2011C10.7244 46.1298 13.4112 47.192 16.1965 47.1592H28.6965V32.3092L25.459 35.5467C25.3421 35.6612 25.1851 35.7254 25.0215 35.7254C24.8579 35.7254 24.7008 35.6612 24.584 35.5467L22.809 33.7717C22.6945 33.6549 22.6303 33.4978 22.6303 33.3342C22.6303 33.1706 22.6945 33.0135 22.809 32.8967L29.2465 26.4592C29.598 26.1081 30.0746 25.9109 30.5715 25.9109C31.0684 25.9109 31.5449 26.1081 31.8965 26.4592L38.334 32.8967C38.584 33.1467 38.584 33.5217 38.334 33.7717L36.559 35.5467C36.4422 35.6612 36.2851 35.7254 36.1215 35.7254C35.9579 35.7254 35.8008 35.6612 35.684 35.5467L32.4465 32.3092V47.1592Z" fill="black" fill-opacity="0.34"/>
            </svg>
            </p>
            {text && (
                <p className="ant-upload-text flex flex-col items-center justify-center">
                    <span className="text-lg font-semibold">{text}</span>
                    {orText && (
                        <span className="text-base pr-1 py-2">
                            Or  
                            <span className="text-[#2B5DB9] pl-1 text-base font-normal">
                                {orText}
                            </span>
                        </span>
                    )}

                </p>
            )}
            {subtitle && <p className="ant-upload-hint">{subtitle}</p>}
            <p>{Format}</p>
        </Dragger>
    );

    return (
        <div className="w-full">
            {videoThumbnails && setCoverTab && coverTab && (
                <div className="w-[100%] flex flex-col gap-1.5 py-3">
                    <div className="w-full flex items-center justify-start gap-2.5 no-underline list-none h-[46px] cursor-pointer">
                        <div
                            onClick={() => setCoverTab('suggestion')}
                            className={`${Styles.coverTab} ${
                                coverTab === 'suggestion'
                                    ? `${Styles.coverTabSelected} text-[var(--primary-color)]`
                                    : ''
                            } leading-[1.7rem] text-[0.875rem] font-medium`}
                        >
                            Suggestions
                        </div>
                        <div
                            onClick={() => setCoverTab('custom')}
                            className={`${Styles.coverTab} ${
                                coverTab === 'custom'
                                    ? `${Styles.coverTabSelected} text-[var(--primary-color)]`
                                    : ''
                            } leading-[1.7rem] text-[0.875rem] font-medium`}
                        >
                            Cover
                        </div>
                    </div>

                    {coverTab === 'suggestion' && (
                        <>
                            {videoThumbnails?.length > 0 ? (
                                <div className="flex overflow-x-auto px-[10px] justify-start rounded-[5px] bg-[var(--secondaty-color)] left-0 gap-[1px] h-[285px] pt-[10px] w-100 slider-container">
                                    {videoThumbnails.map((imageUrl: any, index: number) => (
                                        <img
                                            key={index}
                                            onClick={() => {
                                                updateState('thumbnailUrl', imageUrl);
                                                setSelectedThumb(index);
                                            }}
                                            className={`ease-in-out duration-200 block ${
                                                imageUrl === selectedThumb || index === selectedThumb
                                                    ? 'h-[254px] opacity-100'
                                                    : 'h-[224px]'
                                            } w-[124px] pointer opacity-50 my-[auto] rounded-[5px]`}
                                            src={imageUrl}
                                            alt=""
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex overflow-x-scroll border px-[10px] justify-center rounded-[5px] border-gray-500 mt-[16px] border-solid left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
                                    <CircularProgress style={{ display: 'block', margin: 'auto' }} />
                                </div>
                            )}
                        </>
                    )}

                    {coverTab === 'custom' && !customCover && (
                        <div className="w-full h-[285px]">
                            {crop ? (
                                <ImgCrop
                                    quality={quality}
                                    rotationSlider
                                    aspect={aspect}
                                    cropShape={shape}
                                    modalTitle={modalTitle}
                                >
                                    {DndComp}
                                </ImgCrop>
                            ) : (
                                DndComp
                            )}
                        </div>
                    )}

                    {coverTab === 'custom' && customCover && (
                        <div className="flex px-[10px] justify-start rounded-[5px] left-0 gap-[1px] h-[285px] pt-[10px] w-100 slider-container">
                            <div className="relative">
                                <img
                                    className="ease-in-out duration-200 block h-[254px] w-[124px] pointer my-[auto] rounded-[5px]"
                                    src={customCover}
                                    alt=""
                                />
                                <button
                                    className="h-[20px] w-[20px] p-0 flex items-center justify-center absolute top-1.5 right-1.5 rounded-full border border-solid !border-[var(--primary-color)]"
                                    onClick={() => {
                                        setCustomCover(null);
                                        updateState('thumbnailUrl', videoThumbnails?.[0]);
                                    }}
                                >
                                    <SvgIcon fontSize="small">
                                        <CloseIcon className="text-[10px] text-[var(--primary-color)]" />
                                    </SvgIcon>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {!coverTab && (crop ? (
                <ImgCrop
                    quality={quality}
                    rotationSlider
                    aspect={aspect}
                    cropShape={shape}
                    modalTitle={modalTitle}
                    onModalCancel={() => {
                        console.log('Crop modal closed (cancelled)');
                        // You can call any callback or state update here
                        }}
                        onModalOk={() => {
                            handleClose();
                            //console.log('Image cropped and confirmed');
                        }}
                >
                    {DndComp}
                </ImgCrop>
            ) : (
                DndComp
            ))}
        </div>
    );
};

export default DndContainer;
