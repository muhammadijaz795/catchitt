import style from './selectFile.module.scss'
import uploadImg from '../../../../public/images/icons/uploadSEc/Upload.svg'
import { useState } from 'react';
export default function SelectFile({ pageIndicator }: any) {
    const [files, setfiles] = useState()
    function selectFile() {
        // Get the input element and selected file
        var fileInput: any = document.getElementById('fileInput')?.click();
    }

    const valueHandler = (e: any) => {
        var file = e.target.files[0];

        if (file) {
            console.log(e.target.files[0]);
            setfiles(file)
            pageIndicator(true)
        } else {
            alert('something went wrong')
            pageIndicator(false)
        }
    }
    return (
        <div className={style.parent}>
            <div>
                <div onClick={selectFile} className={style.imgParent}>
                    <img src={uploadImg} alt="" />
                </div>
                <p style={{ marginTop: 23 }} className={style.text1}>Select video to upload</p>
                <p className={style.text2}>Drag and drop files</p>
                <p className={style.text2}>Long videos can be split into multiple parts to get more exposure</p>
                <p style={{ marginTop: 40 }} className={style.text2}>Support mp4, avi, webm, and mov video formats</p>
                <p className={style.text2}>Up to 600 seconds</p>
                <p className={style.text2}>Less than 2 GB</p>
                <p className={style.text2}>Less than 30 videos</p>
                <button onClick={selectFile}>Select files</button>
                <input onChange={valueHandler} style={{ display: 'none' }} type="file" id="fileInput" />
            </div>
        </div>
    )
}
