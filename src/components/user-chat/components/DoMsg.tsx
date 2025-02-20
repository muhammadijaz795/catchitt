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
import { toast } from 'react-toastify';
import pdfLabel from '../../../assets/pdf.png';
import docLabel from '../../../assets/docs.png';
import pptLabel from '../../../assets/ppt.png';
import xlsxLabel from '../../../assets/xlsx.png';
import fileLabel from '../../../assets/files.png';
import musicLabel from '../../../assets/music_file.png';
import bird from '../../../assets/gifts/bird.svg';
import bootle from '../../../assets/gifts/bootle.svg';
import cup from '../../../assets/gifts/cup.svg';
import coin from '../../../assets/gifts/coin.svg';
import fishPri from '../../../assets/gifts/fishPri.svg';
import hook from '../../../assets/gifts/hook.svg';
import shark from '../../../assets/gifts/shark.svg';
import coinsOnly from '../../../assets/gifts/coinsSingle.svg';

// import commentEmoji from '../../../icons/commentEmoji.svg';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const DoMsg = ({ onSubmit, msg, setMessage, setMessageType, isDarkTheme, data }: any) => {

  const API_KEY = process.env.VITE_API_URL;
 
  const token = localStorage.getItem('token');
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [openUploadPic, setOpenUploadPic] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); 
  const [isDivVisible, setIsDivVisible] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  const showGiftPopup = () => {
    setIsDivVisible(true);
  };

  // Function to hide the div
  const hideGiftPopup = () => {
      setIsDivVisible(false);
  };


  const uploadfile = async (e: any) => {
    setFilePreview("");
    const file = e.target.files[0];
    let fileType = getExtension(file.name);
    if (file == undefined) {
      return false;
    }
    const identifiedFileType = file_type(fileType);
    setUploadProgress(1);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (identifiedFileType == "Image") {
        setFilePreview(e.target.result);
        setUploadedFile("Image");
        setMessageType("Image");
      } else if (identifiedFileType == "Video") {
        setMessageType("Video");
        setUploadedFile("Video");
      } else if (identifiedFileType == "Audio") {
        setFilePreview(e.target.result);
        setMessageType("File");
        setUploadedFile("Audio");
      } else if (identifiedFileType == "Pdf") {
        setMessageType("File");
        setUploadedFile("Pdf");
      } else if (identifiedFileType == "Doc") {
        setMessageType("File");
        setUploadedFile("Doc");
      } else if (identifiedFileType == "Ppt") {
        setMessageType("File");
        setUploadedFile("Ppt");
      } else if (identifiedFileType == "Xlsx") {
        setMessageType("File");
        setUploadedFile("Xlsx");
      } else {
        setMessageType("File");
        setUploadedFile("File");
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
          if (identifiedFileType == "Video") {
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
        setUploadProgress(0);
        closeUploadPic();
        toast.error("Error during upload", { autoClose: 2000 });
      }
    } finally {
      abortController.current = null;
    }

  };


  const openModalImage = () => {
    setIsImageModalOpen(true);
  };

  // Function to close the image modal
  const closeModalImage = () => {
    setIsImageModalOpen(false);
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

  const appendCustomEmoji = () => {
    setMessage(msg + data.emoji);
    setMessageType('Text');
  }

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
          {/* <CollectionsIcon onClick={openModalImage} ></CollectionsIcon> */}
          {/* Image Modal */}
          <Modal open={isImageModalOpen} onClose={closeModalImage}>
            <div onClick={(e) => e.stopPropagation()} className={style.popupbackground} style={{ background: isDarkTheme ? '#181818' : '#fff' }}>
              <span className={isDarkTheme ? 'text-white' : 'text-dark'}>Image Gallery</span>
              <div>
                {/* Add your image gallery or content here */}
                <p>This is the image modal content.</p>
                <button onClick={closeModalImage}>Close</button>
              </div>
            </div>
          </Modal>
          
          <input
            onChange={(e: any) => { setMessage(e.target.value), setMessageType('Text') }}
            type="text"
            placeholder="Write a message..."
            value={!!uploadedFile ? '' : msg}
            style={{ width: '-webkit-fill-available', padding: '0.5rem' }}
          />
          <button onClick={showGiftPopup}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 7V20M12 7H8.46429C7.94332 7 7.4437 6.78929 7.07533 6.41421C6.70695 6.03914 6.5 5.53043 6.5 5C6.5 4.46957 6.70695 3.96086 7.07533 3.58579C7.4437 3.21071 7.94332 3 8.46429 3C11.2143 3 12 7 12 7ZM12 7H15.5357C16.0567 7 16.5563 6.78929 16.9247 6.41421C17.293 6.03914 17.5 5.53043 17.5 5C17.5 4.46957 17.293 3.96086 16.9247 3.58579C16.5563 3.21071 16.0567 3 15.5357 3C12.7857 3 12 7 12 7ZM5 12H19V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V12ZM4.6 12H19.4C19.9601 12 20.2401 12 20.454 11.891C20.6422 11.7951 20.7951 11.6422 20.891 11.454C21 11.2401 21 10.9601 21 10.4V8.6C21 8.03995 21 7.75992 20.891 7.54601C20.7951 7.35785 20.6422 7.20487 20.454 7.10899C20.2401 7 19.9601 7 19.4 7H4.6C4.03995 7 3.75992 7 3.54601 7.10899C3.35785 7.20487 3.20487 7.35785 3.10899 7.54601C3 7.75992 3 8.03995 3 8.6V10.4C3 10.9601 3 11.2401 3.10899 11.454C3.20487 11.6422 3.35785 11.7951 3.54601 11.891C3.75992 12 4.03995 12 4.6 12Z" stroke="#FF3B5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          {data.emoji&&<button type='button' onClick={appendCustomEmoji} className={`rounded-full text-xl px-2 border-none`}>{data.emoji}</button>}
          <SendIcon className={style.sendIcon} onClick={onSubmit} style={{ fontSize: '23px', }} />
        </form>
        {isDivVisible && (
          <div className={style.imagePopupInner} >
            <div className={style.BtnsaddRemove}>
              <button className={style.btnAddMore}>
                <img src={coinsOnly} alt="" />
                400
                <AddCircleIcon />
              </button>
              <button className={style.btnHide} onClick={hideGiftPopup}>
              <CloseIcon />
              </button>
            </div>
            <div className={style.gridImages}>
              <div>
                <img src={bird} alt="" />
              </div>
              <div>
                <img src={cup} alt="" />
              </div>
              <div>
                <img src={bootle} alt="" />
              </div>
              <div>
                <img src={shark} alt="" />
              </div>
              <div>
                <img src={coin} alt="" />
              </div>
              <div>
                <img src={fishPri} alt="" />
              </div>
              
              <div>
                <img src={hook} alt="" />
              </div>
              <div>
                <img src={bird} alt="" />
              </div>
              <div>
                <img src={shark} alt="" />
              </div>
              <div>
                <img src={coin} alt="" />
              </div>
              <div>
                <img src={fishPri} alt="" />
              </div>
              <div>
                <img src={hook} alt="" />
              </div>
              <div>
                <img src={cup} alt="" />
              </div>
              <div>
                <img src={bootle} alt="" />
              </div>
              
            </div>
          </div>
        )}
        <div>
          <div className={style.actions}>
            <input type="file" onChange={(e) => { uploadfile(e) }} className={style.filetype} accept="image/*, video/*" />
            {/* <input type='hidden' value={upload} onInput={onSubmit}/> */}
            <img src={paperClip} alt="attach" />
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

              {uploadedFile == "Audio" && <>
                <img src={musicLabel} alt="Preview" style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />
                <audio
                  controls
                  style={{ height: "60%", width: "60%", objectFit: "cover", alignSelf: "center" }}
                  src={filePreview}
                />
              </>}
              {uploadedFile == "Pdf" && <img src={pdfLabel} alt="Preview" style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />}
              {uploadedFile == "Doc" && <img src={docLabel} alt="Preview" style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />} 
              {uploadedFile == "Ppt" && <img src={pptLabel} alt="Preview" style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />}
              {uploadedFile == "Xlsx" && <img src={xlsxLabel} alt="Preview" style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />}
              {uploadedFile == "File" && <img src={fileLabel} alt="Preview" style={{ height: "50%", width: "50%", objectFit: "cover", alignSelf: "center" }} />}

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