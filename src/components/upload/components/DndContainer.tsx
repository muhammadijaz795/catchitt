import React from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const { Dragger } = Upload;
import Styles from './index.module.scss';

const DndContainer = ({
    onChangeImage,
    aspect = 1 / 1,
    quality = 1,
    shape = 'rect',
    modalTitle = "Crop Image",
}: any) => {
    const [fileList, setFileList] = React.useState<any>([]);

    const coverProps: UploadProps = {
        name: 'file',
        multiple: false,
        listType: 'picture',
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        onChange: ({ fileList: newFileList }: any) => {
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const supportedFormats = /\.(jpg|jpeg|png|webp)$/i;
            if (!supportedFormats.test(file.name)) {
                message.error('You can only upload JPG/PNG/WEBP file!');
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                onChangeImage(e.target.result);
                setFileList((prev: any) => [...prev, { url: e.target.result }]);
            };
            reader.readAsDataURL(file);

            return false;
        },
        customRequest: (item) => {
            console.log(item);
        },
    };

    return (
        <ImgCrop
            quality={1}
            rotationSlider
            aspect={aspect}
            cropShape={shape}
            modalTitle={modalTitle}
        >
            <Dragger {...coverProps}>
                <p className="ant-upload-drag-icon">
                    <BackupIcon className="text-[2.5rem] text-[var(--primary-color)]" />
                </p>
                <p className="ant-upload-text flex flex-col items-center justify-center">
                    {' '}
                    <span className="text-lg font-semibold">Drag and drop a file here</span>
                    <span className="text-lg">
                        Or{' '}
                        <span className="text-[var(--primary-color)] font-normal">
                            Select a file
                        </span>
                    </span>
                </p>
                <p className="ant-upload-hint">Suported formats: JPG, JPEG, PNG, WEBP</p>
            </Dragger>
        </ImgCrop>
    );
};

export default DndContainer;
