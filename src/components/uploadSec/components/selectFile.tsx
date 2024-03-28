import { useRef } from 'react';
import uploadImg from '../../../../public/images/icons/uploadSEc/Upload.svg';
import style from './selectFile.module.scss';

export default function SelectFile({ setfile }: any) {
    const inputElement: any = useRef();

    function selectFileHandler() {
        inputElement?.current?.click();
    }

    const valueHandler = (e: any) => {
        let file = e.target.files[0];
        if (file) {
            if (file?.name.includes('.mp4')) {
                setfile(file);
            } else {
                console.log('Selected File Is Not MP4');
            }
        } else {
            console.log('Something went wrong');
        }
    };

    return (
        <div className={style.parent}>
            <div>
                <div onClick={selectFileHandler} className={style.imgParent}>
                    <img src={uploadImg} alt="" />
                </div>
                <p style={{ marginTop: 23 }} className={style.text1}>
                    Select video to upload
                </p>
                <p className={style.text2}>Drag and drop files</p>
                <p className={style.text2}>
                    Long videos can be split into multiple parts to get more exposure
                </p>
                <p style={{ marginTop: 40 }} className={style.text2}>
                    Support mp4, avi, webm, and mov video formats
                </p>
                <p className={style.text2}>Up to 600 seconds</p>
                <p className={style.text2}>Less than 2 GB</p>
                <p className={style.text2}>Less than 30 videos</p>
                <button onClick={selectFileHandler}>Select files</button>
                <input
                    onChange={valueHandler}
                    style={{ display: 'none' }}
                    type="file"
                    ref={inputElement}
                />
            </div>
        </div>
    );
}
