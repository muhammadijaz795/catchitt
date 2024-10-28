import React,{ useEffect, useRef, useState } from 'react';
import { mic, paperClip } from '../../../icons';
import InputEmoji from 'react-input-emoji'
import style from './DoMsg.module.scss';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { Modal, CircularProgress } from '@mui/material';
import { getExtension, file_type } from '../../../utils/common';

const DoMsg = ({ onSubmit, msg, setMessage, setMessageType }: any) => {
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const [uploadedFile, setUploadedFile] = useState<string>('');
    const [openUploadPic, setOpenUploadPic] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [filePreview, setFilePreview] = useState<string>('');
    // const inputRef = useRef(null);

    const uploadfile = async(e:any) => {
        setFilePreview(""); 
        const file = e.target.files[0];
        let fileType = getExtension(file.name);
        if (file == undefined) {
          return false;
        }
        const reader = new FileReader();
        reader.onload = (e:any) => {
          if (file_type(fileType) == "Image"){
            setFilePreview(e.target.result); 
            setUploadedFile("Image");
            setMessageType("Image");
          }else{
            setMessageType("Video");
            setUploadedFile("Video");
          }
        };
        reader.readAsDataURL(file);
      

        let formData = new FormData();
        formData.append("file", file);
        setOpenUploadPic(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent:any) => {
            const progress = Math.round(
              (100 * progressEvent.loaded) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        };
        let messageURL = await axios
          .post(`${API_KEY}/util/file`, formData, config)
          .then((responce) => {
            setUploadProgress(0);
            console.log(responce, "responseresp");
            let msgUrl = responce.data.data;
            if (file_type(fileType) == "Video"){
              setFilePreview(msgUrl);
            }
            // let msgUrlType = e.target.type;
            return msgUrl;
            // setMessage(msgUrl); 
            // setMessageType(msgUrlType);
            // console.log("responseresp", responce.data.data, msg,"responseresp new", msgUrl, msgUrlType)
            // setUpload("upload");
            // console.log("responseresp", msg)
            // setTimeout(() => {
            //     onSubmit(e)
            //   }, 5000);
            
            // onSubmit(e);
            // onSubmit.click();
            // document.getElementById('btnSearch').click();
          })
          .catch((error) => {
            console.log(error);
          });
          
          setMessage(messageURL); 
          // let msgUrlType = e.target.type;
          // setMessageType(msgUrlType);
          console.log("responseresp",  msg,"responseresp new", messageURL)
          console.log("end resp")
          // onSubmit(e);
          
      };

      // const openUploadPic = () => { setOpenUploadPic(true); }
      const closeUploadPic = () => { 
        setMessage("");
        setFilePreview(""); 
        setOpenUploadPic(false);
       }
    
    return (
        <div className={style.doMsgContainer}>
            <form onSubmit={onSubmit}  style={{ padding:'0px',background:'#fff',}}>
                    {/* <InputEmoji 
                    onChange={onChange}
                    // type="text"
                    placeholder="Write a message..."
                    value={msg} shouldReturn={false} shouldConvertEmojiToImage={false}                        //  style={ { width:'-webkit-fill-available',
                        //         Padding:'0px' }
                        //  }
                    /> */}
                {/* <p style={{ color: msg.length > 0 ? 'rgb(255, 59, 92)' : '#a9a9a9' }} onClick={onSubmit}>
                    Send
                </p> */}
                <input
                    onChange={(e: any) => {setMessage(e.target.value), setMessageType('Text')} }
                    type="text"
                    placeholder="Write a message..."
                    value={msg}                   
                    style={{ width:'-webkit-fill-available',padding:'0px' }}
                    />
                <SendIcon className={style.sendIcon} onClick={onSubmit}  style={{ fontSize: '23px', }}/>
            </form>
            <div>
                <div className={style.actions}>
                <input type="file" onChange={(e)=>{uploadfile(e) }} className={style.filetype} accept="image/*, video/*" />
                {/* <input type='hidden' value={upload} onInput={onSubmit}/> */}
                    <img src={paperClip} alt="" />
                </div>
                {/* <div className={style.actions}>
                    <img src={mic} alt="" />
                </div> */}
            </div>
            <Modal open={openUploadPic}>
            
                <div onClick={(e) => e.stopPropagation()} className={style.popupbackground}>
                    <h6>Upload File Preview</h6>
                    <div>
                    {uploadedFile == "Image" && <img src={filePreview}  alt="Preview"
                    style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} /> }
                    
                    {uploadedFile == "Video" && 
                    // <img src={filePreview}  alt="Preview"
                    // style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />
                    <video
                      disablePictureInPicture
                      controlsList="nodownload noplaybackrate"
                      controls={true} 
                      style={{ height: "60%", width: "60%", objectFit: "cover", alignSelf: "center" }}
                      src={filePreview}
                    /> }
                    
                    {uploadProgress > 0 && (
                      <div className="progress-bar-container text-center">
                        <CircularProgress
                          variant="determinate"
                          value={uploadProgress}
                          size={45}
                          thickness={4}
                        />
                        <span className="progress-counter"> {uploadProgress}%</span>
                      </div>
                    )}
                    <div style={{  }} >
                       <center>
                          <button onClick={(e)=>{onSubmit(e),closeUploadPic() }} className={style.btn}>
                              Send
                          </button>
                          <button onClick={closeUploadPic} className={style.btn}>
                              Cancel
                          </button>
                        </center>
                      </div>
                    </div>
                </div>
        </Modal>
        </div>
    );
};

export default DoMsg;