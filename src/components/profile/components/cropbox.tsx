import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import ReactDOM from 'react-dom';

const getBase64FromFile = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};

const getSrcFromFile = (file: any) => {
    console.log('getSrcFromFile');
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
            console.log('loaded');
            resolve(reader.result);
        };
    });
};

const Cropbox = ({ onChangeImage }: any) => {
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }: { fileList: any[] }) => {
        console.log('onchangee');
        setFileList(fileList);
    };

    const onPreview = async (file: any) => {
        console.log('on previewww');
        const src = file.url || (await getSrcFromFile(file));
        const imgWindow = window.open(src);

        if (imgWindow) {
            const image = new Image();
            image.src = src;
            imgWindow.document.write(image.outerHTML);
        } else {
            window.location.href = src;
        }
    };

    const onCropped = (c: any) => {
        console.log(c);
    };

    const beforeUpload = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log("afff")
            // console.log(reader.result)

            onChangeImage(reader.result);
            setFileList((prev) => [...prev, { url: reader.result }] as any);
        };

        // then upload `file` from the argument manually
        return false;
    };

    return (
        <div style={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center' }}>
            <ImgCrop showGrid rotationSlider showReset cropShape="round">
                <Upload
                    action={onCropped as any}
                    listType="picture-circle"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={beforeUpload}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </ImgCrop>
        </div>
    );
};

export default Cropbox;
