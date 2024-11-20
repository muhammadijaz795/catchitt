import React, { useMemo } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const { Dragger } = Upload;
import Styles from './index.module.scss';

const DndContainer = ({
    onChangeFile,
    aspect = 1 / 1,
    quality = 1,
    shape = 'rect',
    modalTitle = 'Crop Image',
    className = '',
    text = 'Drag and drop a file here',
    orText = 'Select a file',
    subtitle = '',
    children,
    crop = false,
    accept = 'image/*',
}: any) => {
    const [fileList, setFileList] = React.useState<any>([]);

    const coverProps: UploadProps = {
        name: 'file',
        multiple: false,
        listType: 'picture',
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
        <Dragger {...coverProps} className={className}>
            <p className="ant-upload-drag-icon">
                <BackupIcon className="!text-[2.5rem] text-[var(--primary-color)]" />
            </p>
            {text && (
                <p className="ant-upload-text flex flex-col items-center justify-center">
                    {' '}
                    <span className="text-lg font-semibold">{text}</span>
                    {orText && (
                        <span className="text-lg">
                            Or{' '}
                            <span className="text-[var(--primary-color)] font-normal">
                                {orText}
                            </span>
                        </span>
                    )}
                </p>
            )}
            {subtitle && <p className="ant-upload-hint">{subtitle}</p>}
            {children ? children : null}
        </Dragger>
    );

    return crop ? (
        <ImgCrop
            quality={1}
            rotationSlider
            aspect={aspect}
            cropShape={shape}
            modalTitle={modalTitle}
        >
            {DndComp}
        </ImgCrop>
    ) : (
        DndComp
    );
};

export default DndContainer;
