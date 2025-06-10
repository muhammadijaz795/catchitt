import React, { useEffect, useRef, useState, useCallback } from 'react';
import { emoji, mic, paperClip } from '../../../icons';
import InputEmoji from 'react-input-emoji'
import style from './DoMsg.module.scss';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { Modal, CircularProgress, CircularProgressProps, Box, Typography, ThemeProvider, createTheme, Fade, IconButton, Paper, Stack } from '@mui/material';
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
import { caesium } from '../../../icons';
import { ClickAwayListener } from '@mui/material';

// import commentEmoji from '../../../icons/commentEmoji.svg';
import CloseIcon from '@mui/icons-material/Close';
import GifIcon from '@mui/icons-material/Gif';

const CameraIcon = () => ( <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 0.5C14.0046 0.49984 14.4906 0.690406 14.8605 1.0335C15.2305 1.37659 15.4572 1.84684 15.495 2.35L15.5 2.5C15.5 2.74493 15.59 2.98134 15.7527 3.16437C15.9155 3.34741 16.1397 3.46434 16.383 3.493L16.5 3.5H17.5C18.2652 3.49996 19.0015 3.79233 19.5583 4.31728C20.115 4.84224 20.4501 5.56011 20.495 6.324L20.5 6.5V15.5C20.5 16.2652 20.2077 17.0015 19.6827 17.5583C19.1578 18.115 18.4399 18.4501 17.676 18.495L17.5 18.5H3.5C2.73479 18.5 1.99849 18.2077 1.44174 17.6827C0.884993 17.1578 0.549892 16.4399 0.505 15.676L0.5 15.5V6.5C0.499957 5.73479 0.792325 4.99849 1.31728 4.44174C1.84224 3.88499 2.56011 3.54989 3.324 3.505L3.5 3.5H4.5C4.76522 3.5 5.01957 3.39464 5.20711 3.20711C5.39464 3.01957 5.5 2.76522 5.5 2.5C5.49984 1.99542 5.69041 1.50943 6.0335 1.13945C6.37659 0.769471 6.84685 0.542843 7.35 0.505L7.5 0.5H13.5ZM10.5 7.5C9.75659 7.49994 9.03964 7.7759 8.48813 8.27439C7.93662 8.77287 7.58984 9.45837 7.515 10.198L7.504 10.35L7.5 10.5L7.504 10.65C7.53335 11.2362 7.73402 11.801 8.08117 12.2743C8.42832 12.7476 8.90669 13.1087 9.45702 13.3128C10.0074 13.5169 10.6055 13.5551 11.1773 13.4226C11.7491 13.2901 12.2695 12.9928 12.674 12.5675C13.0786 12.1422 13.3494 11.6076 13.4531 11.0298C13.5568 10.4521 13.4887 9.85663 13.2572 9.31721C13.0258 8.77779 12.6412 8.31811 12.1511 7.9951C11.6611 7.67209 11.087 7.49995 10.5 7.5Z" fill="#111111"/>
</svg>
)
const AttachFileIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.313 10.112C7.77 9.732 8.231 9.732 8.699 10.123L8.807 10.221L13.793 15.207L13.887 15.29C14.0794 15.4391 14.3196 15.513 14.5626 15.4976C14.8056 15.4823 15.0346 15.3789 15.2067 15.2067C15.3789 15.0346 15.4823 14.8056 15.4976 14.5626C15.513 14.3196 15.4391 14.0794 15.29 13.887L15.207 13.793L13.915 12.5L14.207 12.207L14.313 12.112C14.77 11.732 15.231 11.732 15.699 12.123L15.807 12.221L20.481 16.896C20.3863 17.8483 19.9534 18.735 19.2608 19.3954C18.5681 20.0557 17.6617 20.4459 16.706 20.495L16.5 20.5H4.5C3.50791 20.4999 2.55124 20.1312 1.81576 19.4654C1.08028 18.7996 0.618465 17.8842 0.52 16.897L7.207 10.207L7.313 10.112ZM16.5 0.5C17.5262 0.499999 18.5132 0.894435 19.2568 1.60172C20.0004 2.30901 20.4437 3.27504 20.495 4.3L20.5 4.5V14.085L17.207 10.793L17.057 10.656C15.801 9.561 14.207 9.559 12.961 10.639L12.807 10.779L12.5 11.085L10.207 8.793L10.057 8.656C8.801 7.561 7.207 7.559 5.961 8.639L5.807 8.779L0.5 14.085V4.5C0.499999 3.47376 0.894435 2.48677 1.60172 1.74319C2.30901 0.999605 3.27504 0.556312 4.3 0.505L4.5 0.5H16.5ZM13.51 5.5L13.383 5.507C13.14 5.53591 12.9159 5.65296 12.7534 5.83596C12.5909 6.01897 12.5011 6.25524 12.5011 6.5C12.5011 6.74476 12.5909 6.98103 12.7534 7.16403C12.9159 7.34704 13.14 7.46409 13.383 7.493L13.5 7.5L13.627 7.493C13.87 7.46409 14.0941 7.34704 14.2566 7.16403C14.4191 6.98103 14.5089 6.74476 14.5089 6.5C14.5089 6.25524 14.4191 6.01897 14.2566 5.83596C14.0941 5.65296 13.87 5.53591 13.627 5.507L13.51 5.5Z" fill="#111111"/>
</svg>

 )

 const PhotoLibraryIcon = () => (
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.5 4.5H12.5C11.7044 4.5 10.9413 4.81607 10.3787 5.37868C9.81607 5.94129 9.5 6.70435 9.5 7.5V17.5C9.5 18.2956 9.81607 19.0587 10.3787 19.6213C10.9413 20.1839 11.7044 20.5 12.5 20.5H18.5C19.2956 20.5 20.0587 20.1839 20.6213 19.6213C21.1839 19.0587 21.5 18.2956 21.5 17.5V7.5C21.5 6.70435 21.1839 5.94129 20.6213 5.37868C20.0587 4.81607 19.2956 4.5 18.5 4.5Z" fill="#111111"/>
  <path d="M7.5 6.5C7.74493 6.50003 7.98134 6.58996 8.16437 6.75272C8.34741 6.91547 8.46434 7.13975 8.493 7.383L8.5 7.5V17.5C8.49972 17.7549 8.40212 18 8.22715 18.1854C8.05218 18.3707 7.81305 18.4822 7.55861 18.4972C7.30416 18.5121 7.05362 18.4293 6.85817 18.2657C6.66271 18.1021 6.5371 17.8701 6.507 17.617L6.5 17.5V7.5C6.5 7.23478 6.60536 6.98043 6.79289 6.79289C6.98043 6.60536 7.23478 6.5 7.5 6.5Z" fill="#111111"/>
  <path d="M4.5 7.5C4.74493 7.50003 4.98134 7.58996 5.16437 7.75272C5.34741 7.91547 5.46434 8.13975 5.493 8.383L5.5 8.5V16.5C5.49972 16.7549 5.40212 17 5.22715 17.1854C5.05218 17.3707 4.81305 17.4822 4.55861 17.4972C4.30416 17.5121 4.05362 17.4293 3.85817 17.2657C3.66271 17.1021 3.5371 16.8701 3.507 16.617L3.5 16.5V8.5C3.5 8.23478 3.60536 7.98043 3.79289 7.79289C3.98043 7.60536 4.23478 7.5 4.5 7.5Z" fill="#111111"/>
</svg>

 )
  const LocationOnIcon = () => (
<svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8641 3.13599C17.5164 4.78813 18.4614 7.01811 18.4993 9.35441C18.5372 11.6907 17.6649 13.9502 16.0671 15.655L15.8641 15.865L11.6211 20.107C11.0827 20.645 10.3599 20.9583 9.59921 20.9834C8.83849 21.0084 8.09668 20.7434 7.52406 20.242L7.38006 20.107L3.13606 15.864C1.44822 14.1762 0.5 11.887 0.5 9.49999C0.5 7.11303 1.44822 4.82383 3.13606 3.13599C4.82389 1.44816 7.11309 0.499939 9.50006 0.499939C11.887 0.499939 14.1762 1.44816 15.8641 3.13599ZM9.50006 6.49999C9.10609 6.49999 8.71598 6.57759 8.35201 6.72836C7.98803 6.87912 7.65731 7.1001 7.37873 7.37867C7.10016 7.65725 6.87918 7.98797 6.72842 8.35194C6.57765 8.71592 6.50006 9.10603 6.50006 9.49999C6.50006 9.89396 6.57765 10.2841 6.72842 10.648C6.87918 11.012 7.10016 11.3427 7.37873 11.6213C7.65731 11.8999 7.98803 12.1209 8.35201 12.2716C8.71598 12.4224 9.10609 12.5 9.50006 12.5C10.2957 12.5 11.0588 12.1839 11.6214 11.6213C12.184 11.0587 12.5001 10.2956 12.5001 9.49999C12.5001 8.70434 12.184 7.94128 11.6214 7.37867C11.0588 6.81606 10.2957 6.49999 9.50006 6.49999Z" fill="#111111"/>
</svg>

  )
const DoMsg = ({ onSubmit, msg, setMessage, setMessageType, isDarkTheme, data,currentReplyToMessage,closeReply, setMessagesState, inputRef, setSelectedGift, selectedGift }: any) => {

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const API_KEY = process.env.VITE_API_URL;
  const loggedInUserId = localStorage.getItem('userId');
 
  const token = localStorage.getItem('token');
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [openUploadPic, setOpenUploadPic] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); 
  const [isDivVisible, setIsDivVisible] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const giftsContainerRef = useRef<HTMLDivElement>(null);
  const initialGiftsLoaded = useRef(false);
  const [openFiles, setOpenFiles] = useState(false);

  const actions = [
    { icon: <CameraIcon />, label: 'Camera' },
    { icon: <AttachFileIcon />, label: 'Attach file' },
    { icon: <GifIcon />, label: 'Choose a Gif' },
    { icon: <PhotoLibraryIcon />, label: 'Gallery' },
    { icon: <LocationOnIcon />, label: 'Location' },
  ]; 
  

  interface Gift {
    imageUrl: string;
    name?: string; // Optional property to avoid errors if not always present
    price?: number; // Optional property to include the price
  }

  const [gifts, setGifts] = useState<Gift[]>([]);

  const abortController = useRef<AbortController | null>(null);

  const showGiftPopup = () => {
    setIsDivVisible(true);
  };

  // Function to hide the div
  const hideGiftPopup = () => {
    setIsDivVisible(false);
    initialGiftsLoaded.current = false; // Allow it to reload next time it's opened
  };
  

  // Function to check if the message contains an image extension
  const isImage = (url:any) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  };

  // Function to check if the message contains a video extension
  const isVideo = (url:any) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    setMessageType('Text')
    setMessagesState((prev: Record<string, string>) => ({
        ...prev,
        [data.userId]: newMessage, // Update the message for the active user
    }));
};

  // Function to check if the message contains any attachment (image, video, etc.)
  const isAttachment = (msg:any) => {
    return isImage(msg) || isVideo(msg);
  };

  // Render the message or attachment
  const renderMessageContent = (msg:any) => {
    if (isAttachment(msg)) {
      return <div>Attachment</div>;  // Show "Attachment" text if it's an attachment
    } else {
      return <div>{msg}</div>; // Default render as text
    }
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
      // Focus input on mount
    inputRef.current?.focus();
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });


    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    }
  }, [])

  const getGifts = useCallback(async (loadMore: boolean) => {
    if (isLoading) return;
  
    setIsLoading(true);
    try {
      const nextPage = loadMore ? Math.ceil(gifts.length / 15) + 1 : 1; // Calculate page based on current gifts
      const response = await axios.get(`${API_KEY}/gift/?pageSize=15&page=${nextPage}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const newGifts = response.data?.data || [];
      
      setGifts(prev => loadMore ? [...prev, ...newGifts] : newGifts);
      setHasMore(newGifts.length >= 15);
    } catch (error) {
      console.error('Error loading gifts:', error);
      toast.error('Failed to load gifts');
    } finally {
      setIsLoading(false);
    }
  }, [API_KEY, token, isLoading, gifts.length]);

  
  

  useEffect(() => {
    if (isDivVisible && !initialGiftsLoaded.current) {
      getGifts(false);
      initialGiftsLoaded.current = true;
    }
  
    const container = giftsContainerRef.current;
    const handleScroll = () => {
      if (!container || isLoading || !hasMore) return;
  
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
  
      if (isNearBottom) {
        getGifts(true);
      }
    };
  
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isDivVisible, isLoading, hasMore, getGifts]);
  
  const appendCustomEmoji = () => {
    setMessage(msg + data.emoji);
    setMessageType('Text');
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default Enter key behavior
        e.stopPropagation(); // Prevent the event from propagating
        onSubmit(e as any);  
    }
};

  return (
    <>
      <CustomMediaPicker isDarkTheme={isDarkTheme} isPickerVisible={isPickerVisible} setIsPickerVisible={setIsPickerVisible} setMessageType={setMessageType} setMessage={setMessage} setUploadedFile={setUploadedFile} setOpenUploadPic={setOpenUploadPic} setFilePreview={setFilePreview} />
      {currentReplyToMessage  && (
            <div className="px-3 py-2">
              <div className="d-flex justify-content-between align-items-center position-relative">
                {/* <h5 className="mb-0">Reply to  <b className={style.replyUser}>{loggedInUserId == currentReplyToMessage.receiverId ? currentReplyToMessage.recieverName: 'Yourself'}</b> :</h5> */}
                <button
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  className={style.replyClose}
                  onClick={closeReply}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1.8982 15.4349C1.52901 15.4563 1.16591 15.3336 0.88549 15.0925C0.332441 14.5362 0.332441 13.6377 0.88549 13.0813L12.9954 0.971323C13.5707 0.433069 14.4732 0.462991 15.0115 1.03821C15.4983 1.55838 15.5266 2.35789 15.078 2.91122L2.89664 15.0925C2.61984 15.3301 2.26257 15.4526 1.8982 15.4349Z" fill="black"/>
                    <path d="M13.9956 15.4351C13.6215 15.4335 13.2628 15.2848 12.9972 15.0214L0.88717 2.91132C0.374798 2.31299 0.444458 1.41254 1.04279 0.900119C1.57682 0.442799 2.36439 0.442799 2.89838 0.900119L15.0797 13.0101C15.6548 13.5486 15.6845 14.4512 15.1461 15.0263C15.1247 15.0492 15.1026 15.0713 15.0797 15.0927C14.7814 15.352 14.3889 15.476 13.9956 15.4351Z" fill="black"/>
                    </svg>
                </button>
              </div>
              <div className={`${style.replyMsg} ${isDarkTheme ? style.darkReply : ''}`}>
                {renderMessageContent(currentReplyToMessage.msg)}
              </div>
            </div>
          )}

         
{selectedGift && (
  <div className={style.selectedGiftPreview}>
    {/\.(jpe?g|png|gif|svg|webp)$/i.test(selectedGift.imageUrl) ? (
      <img
        src={selectedGift.imageUrl}
        alt={selectedGift.name || 'Selected gift'}
        style={{ height: '50px', objectFit: 'contain' }}
      />
    ) : /\.(mp4|webm|ogg)$/i.test(selectedGift.imageUrl) ? (
      <video
        src={selectedGift.imageUrl}
        muted
        playsInline
        preload="metadata"
        style={{ height: '50px', objectFit: 'contain' }}
        // Disable interaction
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
      />
    ) : (
      <span>Unsupported format</span>
    )}

    <span><Box component="span" sx={{ color: 'gold', fontSize: 9, mr: 0.5, mt:1, display: 'inline-block' }}>
                            <img style={{ height: '13px' }} src={caesium} alt="Coin Icon" />
                          </Box>{(selectedGift.price ?? 0).toLocaleString()}</span>
    <button
      className={style.selectedGiftButton}
      onClick={() => setSelectedGift(null)}
    >
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="CloseIcon"
      >
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </svg>
    </button>
  </div>
)}

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
           onChange={handleChange}
            // onChange={(e: any) => { setMessage(e.target.value), setMessageType('Text') }}
            type="text"
            placeholder="Write a message..."
            value={!!uploadedFile ? '' : msg}
            style={{ width: '-webkit-fill-available', padding: '0.5rem' }}
            ref={inputRef} // Use the passed ref
            onKeyDown={handleKeyDown} // Handling Enter key press
            className={isDarkTheme ? 'text-white' : 'text-dark'}
          />
          <button onClick={(e: any)=> {e.preventDefault(); showGiftPopup()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 7V20M12 7H8.46429C7.94332 7 7.4437 6.78929 7.07533 6.41421C6.70695 6.03914 6.5 5.53043 6.5 5C6.5 4.46957 6.70695 3.96086 7.07533 3.58579C7.4437 3.21071 7.94332 3 8.46429 3C11.2143 3 12 7 12 7ZM12 7H15.5357C16.0567 7 16.5563 6.78929 16.9247 6.41421C17.293 6.03914 17.5 5.53043 17.5 5C17.5 4.46957 17.293 3.96086 16.9247 3.58579C16.5563 3.21071 16.0567 3 15.5357 3C12.7857 3 12 7 12 7ZM5 12H19V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V12ZM4.6 12H19.4C19.9601 12 20.2401 12 20.454 11.891C20.6422 11.7951 20.7951 11.6422 20.891 11.454C21 11.2401 21 10.9601 21 10.4V8.6C21 8.03995 21 7.75992 20.891 7.54601C20.7951 7.35785 20.6422 7.20487 20.454 7.10899C20.2401 7 19.9601 7 19.4 7H4.6C4.03995 7 3.75992 7 3.54601 7.10899C3.35785 7.20487 3.20487 7.35785 3.10899 7.54601C3 7.75992 3 8.03995 3 8.6V10.4C3 10.9601 3 11.2401 3.10899 11.454C3.20487 11.6422 3.35785 11.7951 3.54601 11.891C3.75992 12 4.03995 12 4.6 12Z" stroke="#FF3B5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          {data.emoji&&<button type='button' onClick={appendCustomEmoji} className={`rounded-full text-xl px-2 border-none`}>{data.emoji}</button>}
          <SendIcon className={style.sendIcon} onClick={onSubmit} style={{ fontSize: '23px', }} />
        </form>
        {isDivVisible && (
          <div className={style.imagePopupInner}  ref={giftsContainerRef} >
            <div className={style.BtnsaddRemove}>
              {/* <button className={style.btnAddMore}>
                <img src={coinsOnly} alt="" />
                400
                <AddCircleIcon />
              </button> */}
              <button className={style.btnHide} onClick={hideGiftPopup}>
              <CloseIcon />
              </button>
            </div>
            <div className={style.gridImages}>
            {gifts.map((gift, index) => {
              const isImage = gift.imageUrl && /\.(svg|jpe?g|png|gif)$/i.test(gift.imageUrl);
              const isVideo = gift.imageUrl && /\.mp4$/i.test(gift.imageUrl);

              return (
                (isImage || isVideo) && (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedGift(gift);
                      setIsDivVisible(false);
                      setMessageType("gift");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {isImage ? (
                      <img src={gift.imageUrl} alt={gift.name || "gift"}  />
                    ) : (
                      <video
                        src={gift.imageUrl}
                        muted
                        playsInline
                        preload="metadata"
                        style={{ pointerEvents: "none", }}
                      />
                    )}
                    <span>
                          <Box component="span" sx={{ color: 'gold', fontSize: 9, mr: 0.5, mt:1, display: 'inline-block' }}>
                            <img style={{ height: '13px' }} src={caesium} alt="Coin Icon" />
                          </Box>
                          {(gift.price ?? 0).toLocaleString()}
                    </span>
                  </div>
                )
              );
            })}

            {isLoading && (
                <div className={style.loadingIndicator}>
                  <CircularProgress size={24} />
                </div>
              )}
              
              {/* {!hasMore && (
                <div className={style.endMessage}>
                  No more gifts to load
                </div>
              )} */}
              {/* <div>
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
              </div> */}
              
            </div>
          </div>
        )}
        <div>
          <div className={style.actions}>
          {/* <input
            type="button"
            onClick={() => setOpenFiles(true)}
            className={style.filetype}
            accept="image/*, video/*"
          /> */}
            <input type="file" onChange={(e) => { uploadfile(e) }} className={style.filetype} accept="image/*, video/*" />


          <img src={paperClip} alt="attach" />
        </div>
         {openFiles && (
        <ClickAwayListener onClickAway={() => setOpenFiles(false)}>
          <Box sx={{position: 'absolute',
                  bottom: 70,
                  right: '0rem',
                 
                  zIndex: 10, width: '12rem', ml: 'auto', mr: 2 }}>
            <Fade in={openFiles}>
              <Paper
                elevation={4}
               sx={{
                px: 2,
                   borderRadius: 3,

                  py: 1.5,
               }}
              >
                <Stack spacing={1.5}>
                  {actions.map((action, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {action.icon}
                      <Typography fontWeight={500} fontSize="0.95rem">
                        {action.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Fade>
          </Box>
        </ClickAwayListener>
          )
        }
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