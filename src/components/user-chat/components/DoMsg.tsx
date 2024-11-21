import React, { useEffect, useRef, useState } from 'react';
import { emoji, mic, paperClip } from '../../../icons';
import InputEmoji from 'react-input-emoji'
import style from './DoMsg.module.scss';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { Modal, CircularProgress, CircularProgressProps, Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import { getExtension, file_type } from '../../../utils/common';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import CustomMediaPicker from './CustomMediaPicker';
import createPalette from '@mui/material/styles/createPalette';
import CircularProgressWithLabel from '../../../shared/components/CircularProgressWithLabel';
// import commentEmoji from '../../../icons/commentEmoji.svg';

const DoMsg = ({ onSubmit, msg, setMessage, setMessageType, isDarkTheme }: any) => {

  const API_KEY = process.env.VITE_API_URL;
  const GIPHY_KEY = process.env.VITE_GIPHY_API_KEY;
  if (!GIPHY_KEY) {
    throw new Error("GIPHY_KEY is not defined");
  }
  const giphyFetch = new GiphyFetch(GIPHY_KEY);
  const token = localStorage.getItem('token');
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [openUploadPic, setOpenUploadPic] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  const uploadfile = async (e: any) => {
    setFilePreview("");
    const file = e.target.files[0];
    let fileType = getExtension(file.name);
    if (file == undefined) {
      return false;
    }
    setUploadProgress(1);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (file_type(fileType) == "Image") {
        setFilePreview(e.target.result);
        setUploadedFile("Image");
        setMessageType("Image");
      } else {
        setMessageType("Video");
        setUploadedFile("Video");
      }
    };
    reader.readAsDataURL(file);


    let formData = new FormData();
    formData.append("file", file);
    setOpenUploadPic(true);

    const controller = new AbortController();
    abortController.current = controller;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
      onUploadProgress: (progressEvent: any) => {
        const progress = Math.round(
          (100 * progressEvent.loaded) / progressEvent.total
        );
        setUploadProgress(progress);
      },
    };
    try {
      let messageURL = await axios
        .post(`${API_KEY}/util/file`, formData, config)
        .then((responce) => {
          setUploadProgress(0);
          console.log(responce, "responseresp");
          let msgUrl = responce.data.data;
          if (file_type(fileType) == "Video") {
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


      setMessage(messageURL);
      // let msgUrlType = e.target.type;
      // setMessageType(msgUrlType);
      console.log("responseresp", msg, "responseresp new", messageURL)
      console.log("end resp")
      // onSubmit(e);
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Upload canceled");
      } else {
        console.log("Error during upload:", error);
      }
    } finally {
      abortController.current = null;
    }

  };

  // const openUploadPic = () => { setOpenUploadPic(true); }
  const closeUploadPic = () => {
    setMessage("");
    setFilePreview("");
    setUploadedFile("");
    setOpenUploadPic(false);
    if (abortController.current) {
      abortController.current.abort();
      setUploadProgress(0);
      abortController.current = null;
    }
  }

  const isMediaUploaded = () => {
    const mediaFormats = ["Image", "Video"];
    return mediaFormats.includes(uploadedFile) && uploadProgress !== 0;
  }

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    }
  }, [])
  

  return (
    <>
      <CustomMediaPicker isDarkTheme={isDarkTheme} isPickerVisible={isPickerVisible} setIsPickerVisible={setIsPickerVisible} setMessageType={setMessageType} setMessage={setMessage} setUploadedFile={setUploadedFile} setOpenUploadPic={setOpenUploadPic} setFilePreview={setFilePreview} />
      <div className={`${style.doMsgContainer} ${isDarkTheme ? 'bg-[#282828]' : 'bg-white'}`}>
        <form onSubmit={onSubmit} style={{ padding: '0px' }}>
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
          <div onClick={() => setIsPickerVisible(!isPickerVisible)} className="rounded-lg cursor-pointer hover:bg-[#1618230f] p-[0.313rem] mx-[0.5rem]">
            <img
              className={`w-6 h-6 object-contain rounded-full`}
              src={emoji}
              alt="comment-icon"
            />
          </div>
          <input
            onChange={(e: any) => { setMessage(e.target.value), setMessageType('Text') }}
            type="text"
            placeholder="Write a message..."
            value={!!uploadedFile ? '' : msg}
            style={{ width: '-webkit-fill-available', padding: '0.5rem' }}
          />
          <SendIcon className={style.sendIcon} onClick={onSubmit} style={{ fontSize: '23px', }} />
        </form>
        <div>
          <div className={style.actions}>
            <input type="file" onChange={(e) => { uploadfile(e) }} className={style.filetype} accept="image/*, video/*" />
            {/* <input type='hidden' value={upload} onInput={onSubmit}/> */}
            <img src={paperClip} alt="" />
          </div>
          {/* <div className={style.actions}>
                    <img src={mic} alt="" />
                </div> */}
        </div>
        <Modal open={openUploadPic}>

          <div onClick={(e) => e.stopPropagation()} className={style.popupbackground} style={{ background: isDarkTheme ? '#181818' : '#fff' }}>
            <span className={isDarkTheme ? 'text-white' : 'text-dark'}>Upload File Preview</span>
            <div>
              {['Image', 'Gif', 'Sticker'].includes(uploadedFile) && <img src={filePreview} alt="Preview"
                style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />}

              {uploadedFile == "Video" &&
                // <img src={filePreview}  alt</button>="Preview"
                // style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />
                <video
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate"
                  controls={true}
                  style={{ height: "60%", width: "60%", objectFit: "cover", alignSelf: "center" }}
                  src={filePreview}
                />}

              {uploadProgress > 0 && (
                <div className="progress-bar-container text-center">
                  <CircularProgressWithLabel
                    variant="determinate"
                    value={uploadProgress}
                    size={45}
                    thickness={4}
                    isDarkTheme={isDarkTheme}
                  />
                  {/* <span className={isDarkTheme?'text-white':'text-custom-dark-222'}> {uploadProgress}%</span> */}
                </div>
              )}
              <div style={{}} >
                <center>
                  <button className={style.sendBtn} disabled={isMediaUploaded()} onClick={(e) => { onSubmit(e), closeUploadPic() }} >
                    Send
                  </button>
                  <button style={{ color: isDarkTheme ? '#fff' : 'rgb(22, 24, 35)', backgroundColor: isDarkTheme ? '#282828' : '', borderColor: 'rgba(22, 24, 35, 0.12)' }} onClick={closeUploadPic} className="mx-2" >
                    Cancel
                  </button>
                </center>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DoMsg;