import CustomButton from '../../../shared/buttons/CustomButton';
import CustomPlayer from '../../homePage/components/CustomPlayer';
import style from '../styles.module.scss';
import CustomPopup from '../../../shared/popups/CustomPopup';
import React from 'react';
import { useRef } from 'react';
import PopupForEditVideo from '../../profile/popups/popupForEditVideo';
import { Tabs, Tab, Box, Paper, Typography, IconButton, Grid, Avatar, BottomNavigation, BottomNavigationAction, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SearchIcon from '@mui/icons-material/Search';
import { defaultAvatar, music, musicBlack, shareInHome, FooterUploadMobile } from '../../../icons';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


function FormLeftSide({ selectedVideoSrc, selectFilesHandler, darkTheme, videoInfo,state }: any) {
    const [replaceVideoPopup, setReplaceVideoPopup] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [value, setValue] = React.useState(1); // Default: Profile
    const selectedTemplate = useSelector((store: any) => store?.reducers?.isuploading?.selectedTemplate);


     let isEditMode = false;
      const { id: postId } = useParams(); 
      if(postId) {
          isEditMode = true;
      }

    const profileImg = useSelector((state: any) => state?.reducers?.profile?.avatar);
    const name = useSelector((state: any) => state?.reducers?.profile?.name);
    const userName = useSelector((state: any) => state?.reducers?.profile?.username);
    const coverImg = useSelector((state: any) => state?.reducers?.profile?.cover);

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoRefWeb = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isPlayingWeb, setIsPlayingWeb] = useState(true);

    const [isMuted, setIsMuted] = useState(false);
    const [isMutedWeb, setIsMutedWeb] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    const [progressWeb, setProgressWeb] = useState(0);
    const [durationWeb, setDurationWeb] = useState(0);
    const [isSeekingWeb, setIsSeekingWeb] = useState(false);


    const handleVideoClick = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoClickWeb = () => {
      if (!videoRefWeb.current) return;

      if (videoRefWeb.current.paused) {
          videoRefWeb.current.play();
          setIsPlayingWeb(true);
      } else {
          videoRefWeb.current.pause();
          setIsPlayingWeb(false);
      }
  };

    const togglePlayPause = () => {
      if (videoRef.current) {
          if (videoRef.current.paused) {
              videoRef.current.play();
              setIsPlaying(true);
          } else {
              videoRef.current.pause();
              setIsPlaying(false);
          }
      }
  };

  const togglePlayPauseWeb = () => {
    if (videoRefWeb.current) {
        if (videoRefWeb.current.paused) {
          videoRefWeb.current.play();
            setIsPlayingWeb(true);
        } else {
          videoRefWeb.current.pause();
            setIsPlayingWeb(false);
        }
    }
};

  const enterFullscreen = () => {
    if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if ((videoRef.current as any).webkitRequestFullscreen) {
            (videoRef.current as any).webkitRequestFullscreen();
        }
    }
};

const enterFullscreenWeb = () => {
  if (videoRefWeb.current) {
      if (videoRefWeb.current.requestFullscreen) {
        videoRefWeb.current.requestFullscreen();
      } else if ((videoRefWeb.current as any).webkitRequestFullscreen) {
          (videoRefWeb.current as any).webkitRequestFullscreen();
      }
  }
};

const toggleMute = () => {
  if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
  }
};

const toggleMuteWeb = () => {
  if (videoRefWeb.current) {
      videoRefWeb.current.muted = !videoRefWeb.current.muted;
      setIsMutedWeb(videoRefWeb.current.muted);
  }
};

const handleTimeUpdate = () => {
  const video = videoRef.current;
  if (video && video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
  }
};

const handleTimeUpdateWeb = () => {
  const video = videoRefWeb.current;
  if (video && video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgressWeb(currentProgress);
  }
};

const handleLoadedMetadata = () => {
  if (videoRef.current) {
      setDuration(videoRef.current.duration);
  }
};

const handleLoadedMetadataWeb = () => {
  if (videoRefWeb.current) {
      setDuration(videoRefWeb.current.duration);
  }
};

const handleSeek = (e: any) => {
  if (!videoRef.current) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const seekTime = (clickX / rect.width) * videoRef.current.duration;

  videoRef.current.currentTime = seekTime;
  setProgress((seekTime / videoRef.current.duration) * 100);
};

const handleSeekWeb = (e: any) => {
  if (!videoRefWeb.current) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const seekTime = (clickX / rect.width) * videoRefWeb.current.duration;

  videoRefWeb.current.currentTime = seekTime;
  setProgressWeb((seekTime / videoRefWeb.current.duration) * 100);
};

  const handleChange = (event: any, newValue: any) => {
    setIsPlaying(true);
    setIsPlayingWeb(true);
    setValue(newValue);
  };
    const MyIcon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.56734 1.41797L9.91921 7.83105L14.2711 1.41797C14.734 1.74634 15.458 2.72353 14.6667 3.98953C14.6667 3.98953 12.2771 7.82314 11.1694 9.67466L12.6886 11.9099C14.1524 10.8141 16.178 11.4075 17.2699 12.8911C18.3777 14.3945 18.3856 16.6139 16.9139 17.7771C15.4382 18.9402 13.377 18.3507 12.2653 16.8473C11.4661 15.7633 11.2366 14.3074 11.7272 13.1443L9.91921 10.5173L8.11516 13.1443C8.60178 14.3074 8.37627 15.7594 7.57315 16.8434C6.46145 18.3507 4.39233 18.9402 2.91665 17.7771C1.43701 16.6139 1.44492 14.3984 2.56059 12.8951C3.65251 11.4115 5.67811 10.8141 7.14984 11.9099L8.66904 9.67466C7.51594 7.77185 6.35014 5.87676 5.17171 3.98953C4.38046 2.72353 5.10445 1.74634 5.56734 1.41797ZM13.559 13.2353C12.9576 13.71 12.7677 14.8574 13.5075 15.8662C14.2473 16.8711 15.367 16.9819 15.9723 16.5032C16.5776 16.0284 16.7714 14.8811 16.0277 13.8722C15.2878 12.8674 14.1682 12.7566 13.5629 13.2353H13.559ZM6.2755 13.2353C5.66624 12.7526 4.54267 12.8674 3.79889 13.8722C3.05907 14.8771 3.24502 16.0244 3.85428 16.5032C4.46354 16.9858 5.58712 16.8711 6.33089 15.8662C7.07467 14.8613 6.88477 13.714 6.2755 13.2353Z" fill="black"/>
        </svg>

      );
    return (
        // <div className="flex-[0.6] p-[2.5rem] flex flex-col gap-[1rem]">
           <div className="flex-[0.6] pt-[2.85rem] flex flex-col gap-[1rem]"  style={isEditMode ? { marginTop: '6rem' } : {}}>
            {/* <p className="text-start text-[1.25rem] font-semibold leading-[1.5rem] text-custom-dark-222">
                Upload video
            </p>
            <p className="text-start text-[1rem] font-medium leading-[1.25rem] text-custom-color-999">
                Post a video to your account
            </p> */}

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            backgroundColor: "#0000000D",
            borderRadius: "8px",
            overflow: "hidden",
            width: "fit-content",
            height: '2.21rem',
            mx: "auto", // center horizontally
          }}
        >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1,
              minHeight: "unset",
              borderRadius: "8px",
              color: "#333",
            },
            "& .Mui-selected": {
              backgroundColor: "#fff",
              color: "#333 !important",

            },
          }}
        >
          <Tab label="Feed" value={0} />
          <Tab label="Profile" value={1} />
          <Tab label="Web/TV" value={2} />
        </Tabs>
        </Paper>




      {value === 0 && (
            // <div
            //     className={`mx-auto md:mx-0 w-[17.5rem] mt-[1.25rem] mb-[1rem] bg-[#2C2C2C] ${style.emulator}`}
            // >
            //     <CustomPlayer src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl} />
            // </div>

             <div onClick={handleVideoClick} className={`relative group mx-auto relative md:mx-0 h-[36rem] w-[18rem] mt-[1.25rem] mb-[1rem]   ${style.emulator}`} 
                style={{
                  background: selectedTemplate
                    ? `url(${selectedTemplate}) center/cover no-repeat`
                    : '#2C2C2C',
              }}
              >
                <Box sx={{ color: 'white', width: '100%', px: 1, pt: 0, pb: 0.5, position: 'absolute', top: '0', zIndex: '1' }}>
                    {/* Top status bar */}
                    <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-black/75 to-transparent z-[-1]" />

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.85rem',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>8:00</Typography>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <SignalCellularAltIcon sx={{ fontSize: '0.85rem' }} />
                        <WifiIcon sx={{ fontSize: '0.85rem' }} />
                        <BatteryFullIcon sx={{ fontSize: '0.85rem' }} />
                      </Box>
                    </Box>

                    {/* Navigation row */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1,
                      }}
                    >
                      {/* LIVE badge */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid white',
                          borderRadius: '4px',
                          px: 0.8,
                          py: 0.2,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                        }}
                      >
                        LIVE
                      </Box>

                      {/* Centered tabs */}
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Typography
                          sx={{
                            fontSize: '0.85rem',
                            color: '#888',
                            fontWeight: 500,
                          }}
                        >
                          Following
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography
                            sx={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              color: 'white',
                            }}
                          >
                            For You
                          </Typography>
                          <Box
                            sx={{
                              height: 2,
                              width: '100%',
                              backgroundColor: 'white',
                              borderRadius: 1,
                              mt: '2px',
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Search icon */}
                      <SearchIcon sx={{ fontSize: '1.2rem' }} />
                    </Box>
                  </Box>

                  {/* <img src={selectedTemplate} /> */}
{/* {post.videoLength} */}
                <video

                    className= {`w-full rounded-t-md object-cover ${
                      selectedTemplate ? 'h-[14rem]' : 'h-[36rem]'
                    }`}
                    loop={true}
                    controls={false}
                    autoPlay={true}
                    preload="auto"
                    playsInline
                    ref={videoRef}
                    
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}    
                    src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl}
                />

                <div className='absolute bottom-1 px-3 w-full left-0 z-10  group-hover:block hidden'>
                  {/* Fading overlay: black at bottom → transparent upward */}
                  <div className="absolute bottom-0 left-0 w-full h-[200%] bg-gradient-to-t from-black/75 to-transparent z-[-1]" />

                  {/* Controls */}
                  <div
                    className="w-full h-[2px] bg-gray-400 cursor-pointer"
                    onClick={(e: any)=>{e.stopPropagation(); handleSeek(e);}}
                    onMouseDown={() => setIsSeeking(true)}
                    onMouseUp={() => setIsSeeking(false)}
                  >
                    <div
                      className="h-full bg-white"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="z-10 flex justify-between my-1">
                    <div className='flex'>
                      <button
                        onClick={(e:any)=>{e.stopPropagation(); togglePlayPause()}}
                        className="btn p-0.5 rounded flex items-center hover:bg-gray-500"
                      >
                        {isPlaying ? <PauseIcon sx={{ color: '#fff' }} fontSize="small" /> : <PlayArrowIcon sx={{ color: '#fff' }} fontSize="small" />}
                      </button>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={(e: any)=> {e.stopPropagation(); toggleMute()}}
                        className="btn p-0.5 rounded flex items-center gap-1 hover:bg-gray-500"
                      >
                        {isMuted ? <VolumeOffIcon sx={{ color: '#fff' }} fontSize="small" /> : <VolumeUpIcon sx={{ color: '#fff' }} fontSize="small" />}
                      </button>
                      <button
                        onClick={(e: any)=> {e.stopPropagation(); enterFullscreen();}}
                        className="btn p-0.5 rounded flex items-center hover:bg-gray-500"
                      >
                        <FullscreenIcon sx={{ color: '#fff' }} fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute z-10 left-1 bottom-16 text-left px-1 py-2">
                    <p className="font-medium text-[0.8rem] text-white">@{name}</p>
                    <p className="font-medium text-[0.6rem] text-white mt-[0.2rem]">
                        {state.category.name?.length > 50
                            ? `${state.category.name?.slice(0, 60)}... See more`
                            : state.category.name}
                    </p>
                    <div className="mt-[0.1rem] flex gap-1 leading-3" >
                        {/* <img
                            className={`w-2.5 h-2.5 object-contain inline-block mr-1 invert-1`}
                            src={musicBlack}
                            alt="music-icon"
                        /> */}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.9258 1.27234V7.48067C8.9258 7.76911 8.84027 8.05106 8.68003 8.29088C8.51978 8.5307 8.29202 8.71762 8.02555 8.828C7.75907 8.93838 7.46585 8.96726 7.18296 8.91099C6.90007 8.85472 6.64022 8.71582 6.43627 8.51187C6.23232 8.30792 6.09343 8.04807 6.03716 7.76518C5.98089 7.48229 6.00977 7.18907 6.12014 6.9226C6.23052 6.65612 6.41744 6.42836 6.65726 6.26812C6.89708 6.10787 7.17904 6.02234 7.46747 6.02234H8.21747V2.36401L4.13414 2.89526V8.10567C4.13414 8.39411 4.04861 8.67606 3.88836 8.91588C3.72812 9.1557 3.50036 9.34262 3.23388 9.453C2.96741 9.56338 2.67418 9.59226 2.3913 9.53599C2.10841 9.47972 1.84856 9.34082 1.6446 9.13687C1.44065 8.93292 1.30176 8.67307 1.24549 8.39018C1.18922 8.10729 1.2181 7.81407 1.32848 7.5476C1.43886 7.28112 1.62577 7.05336 1.8656 6.89312C2.10542 6.73287 2.38737 6.64734 2.6758 6.64734H3.4258V1.93901C3.42537 1.88814 3.44356 1.83888 3.47695 1.8005C3.51034 1.76212 3.55662 1.73729 3.60705 1.73068L8.69039 1.06818C8.71993 1.0643 8.74996 1.06681 8.77845 1.07553C8.80694 1.08425 8.83323 1.09898 8.85554 1.11872C8.87786 1.13847 8.89567 1.16277 8.90779 1.18999C8.91991 1.21721 8.92605 1.24671 8.9258 1.27651V1.27234Z" fill="white"/>
                          </svg>

                        <span className="font-normal text-white text-[0.6rem]">
                            {userName}
                        </span>
                    </div>
                </div>
                <div className="absolute z-20 flex flex-col justify-between items-center gap-2.5 bottom-24 right-2 w-10 text-white">
                    {/* Video next and previous */}
                    <div className="text-center flex flex-col justify-between items-center gap-3 rounded-full px-2">
                        {/* <img
                            className="h-5 w-5 object-contain cursor-pointer"
                            src={chevronUpIconVideo}
                        /> */}
                        <div className={style.DivAvatarActionItemContainer}>
                            <a
                                className="e1g2yhv83 css-1w9wqra-StyledLink-AvatarLink er1vbsz0"
                                href="#"
                            >
                                <div
                                    className={style.AvatarDivContainer}
                                    style={{ width: '35px', height: '35px'}}
                                >
                                    <span
                                        className={style.SpanAvatarContainer}
                                        style={{
                                            width: '35px',
                                            height: '35px',
                                            borderRadius: '50%' 
                                        }}
                                    >
                                        <img
                                            loading="lazy"
                                            alt="sherjangkhan5"
                                            src={ profileImg ||
                                                defaultAvatar
                                            }
                                            style={{
                                              width: '35px',
                                              height: '35px',
                                              borderRadius: '50%' 
                                          }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                            }}
                                            className="css-1zpj2q-ImgAvatar e1e9er4e1"
                                        />
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className='text-center flex flex-col justify-center'>
                      <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.122131 5.87316V5.667C0.122131 3.18241 1.91786 1.06322 4.36619 0.655167C5.95505 0.385382 7.63632 0.913578 8.79508 2.07412L9.22162 2.49995L9.61617 2.07412C10.8069 0.913578 12.4562 0.385382 14.0771 0.655167C16.5261 1.06322 18.3211 3.18241 18.3211 5.667V5.87316C18.3211 7.34827 17.7097 8.7594 16.6292 9.76532L10.2062 15.7617C9.93963 16.0106 9.58774 16.1492 9.22162 16.1492C8.85551 16.1492 8.50362 16.0106 8.23703 15.7617L1.81371 9.76532C0.73457 8.7594 0.122142 7.34827 0.122142 5.87316H0.122131Z" fill="white"/>
                      </svg>
                      <span className='text-[11px]'>128k</span>
                    </div>
                    <div className='text-center flex flex-col justify-center'>
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.36465 0.621094C4.33861 0.621094 0.297153 4.03134 0.297153 8.23847C0.297153 10.0557 1.05604 11.7168 2.32215 13.025C1.87783 14.8696 0.393125 16.5139 0.375352 16.5323C0.295376 16.6147 0.273161 16.7422 0.322035 16.8521C0.36643 16.962 0.464961 17.0267 0.580482 17.0267C2.93533 17.0267 4.6717 15.8635 5.57809 15.1447C6.73792 15.5933 8.0314 15.8548 9.39561 15.8548C14.4217 15.8548 18.4631 12.4441 18.4631 8.27033C18.4631 4.09652 14.3907 0.621094 9.36465 0.621094ZM4.78292 9.41038C4.152 9.41038 3.64548 8.88851 3.64548 8.27143C3.64548 7.65435 4.152 7.09953 4.78292 7.09953C5.41384 7.09953 5.92036 7.62139 5.92036 8.27143C5.92036 8.92147 5.44405 9.41038 4.78292 9.41038ZM9.36465 9.41038C8.73373 9.41038 8.25921 8.88851 8.25921 8.27143C8.25921 7.65435 8.76572 7.09953 9.36465 7.09953C9.96359 7.09953 10.4701 7.62139 10.4701 8.27143C10.4701 8.92147 9.99735 9.41038 9.36465 9.41038ZM13.8824 9.41038C13.2515 9.41038 12.745 8.88851 12.745 8.27143C12.745 7.65435 13.2515 7.09953 13.8824 7.09953C14.5133 7.09953 15.0198 7.62139 15.0198 8.27143C15.0198 8.92147 14.5435 9.41038 13.8824 9.41038Z" fill="white"/>
                      </svg>
                      <span className='text-[11px]'>128k</span>
                    </div>
                    <div className='text-center flex flex-col justify-center'>
                      <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.1169 0.601562C12.4502 0.601562 14.3358 1.52308 14.3616 3.86564V16.9392C14.3616 17.0856 14.3272 17.232 14.2583 17.3612C14.1464 17.5679 13.957 17.7229 13.7245 17.7918C13.5006 17.8607 13.2509 17.8263 13.0443 17.7057L7.46499 14.9153L1.87708 17.7057C1.74879 17.7737 1.60156 17.8176 1.45519 17.8176C0.973023 17.8176 0.585571 17.4215 0.585571 16.9392V3.86564C0.585571 1.52308 2.47978 0.601562 4.80449 0.601562H10.1169ZM10.7024 5.80342H4.21901C3.84878 5.80342 3.54743 6.10485 3.54743 6.4838C3.54743 6.86188 3.84878 7.16417 4.21901 7.16417H10.7024C11.0726 7.16417 11.374 6.86188 11.374 6.4838C11.374 6.10485 11.0726 5.80342 10.7024 5.80342Z" fill="white"/>
                      </svg>
                      <span className='text-[11px]'>128k</span>
                    </div>
                    <div className='text-center flex flex-col justify-center'>
                      <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.1693 7.54699L11.9134 12.9178C11.3667 13.3906 10.5026 13.0083 10.5026 12.2723V9.1785C4.98924 9.2567 2.61342 10.6252 4.22502 15.7792C4.40385 16.3511 3.71282 16.7944 3.22763 16.441C1.67254 15.31 0.26532 13.1489 0.26532 10.9629C0.26532 5.55292 4.79374 4.40838 10.5022 4.34084V1.49796C10.5022 0.76325 11.3653 0.37972 11.913 0.852467L18.1689 6.2233C18.5638 6.59439 18.5638 7.20576 18.1693 7.54699Z" fill="white"/>
                      </svg>
                      <span className='text-[11px]'>128k</span>
                    </div>
                </div>
                <div className='absolute left-0 bottom-0 bg-black w-100'>
                  <img src={FooterUploadMobile} className='w-100 mb-3' alt='footer'/>
                   
                </div>
            </div>

            )}
            {value === 1 && (
            <div
                className={`mx-auto md:mx-0 w-[17.5rem] mt-[1.25rem] mb-[1rem] ${style.emulator}`}
            >

          <Box
            sx={{
              width: '100%',
              maxWidth: 375,
              mx: 'auto',
              bgcolor: '#fff',
              border: '1px solid #ddd',
              borderRadius: 3,
              overflow: 'hidden',
              paddingTop: '0.25rem'
            }}
          >
            {/* Top status bar */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                pt: 1,
              }}
            >
              <Typography variant="body2">8:00</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <SignalCellularAltIcon sx={{ fontSize: 16 }} />
                <WifiIcon sx={{ fontSize: 16 }} />
                <BatteryFullIcon sx={{ fontSize: 16 }} />
              </Box>
            </Box>

            {/* Navigation Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1,
                py: 1,
              }}
            >
                <ArrowBackIosNewIcon fontSize="small" />
            
              <Box width={24} /> {/* spacer */}
              {/* 3-dot icon */}
              <Box sx={{ mt: 1 }}>
                  <MoreVertIcon />
              </Box>
            </Box>

            {/* Profile Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 1,
              }}
            >
              <Avatar
                src={profileImg}
                sx={{ width: 80, height: 80 }}
              />
              <Typography
                variant="subtitle1"
                sx={{ mt: 1, fontWeight: 'bold', color: '#000' }}
              >
                {name}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Box
                  sx={{ width: 60, height: 20, bgcolor: '#eee', borderRadius: 1 }}
                />
                <Box
                  sx={{ width: 60, height: 20, bgcolor: '#eee', borderRadius: 1 }}
                />
              </Box>

              
            </Box>

            {/* Grid Posts */}
            <Grid container spacing={0.5} sx={{ mt: 2, px: 1 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      bgcolor: index === 0 ? '#ccc' : '#f0f0f0',
                      position: 'relative',
                    }}
                  >
                    {index === 0 && (
                      <>
                        <Box
                          component="img"
                          src={state.thumbnailUrl}
                          alt="Post"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 4,
                            left: 4,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: '#fff',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            px: 0.5,
                            borderRadius: 1,
                            fontSize: 12,
                          }}
                        >
                          <PlayArrowIcon fontSize="inherit" />
                          <span>1000</span>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>


            </div>
            )}
             {value === 2 && (
            // <div
            //     className={`mx-auto md:mx-0 w-[17.5rem] h-[15rem] mt-[1.25rem] mb-[1rem] bg-[#2C2C2C] ${style.emulator}`}>
            //     <CustomPlayer src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl} />
            // </div>
            <div onClick={handleVideoClickWeb} className={`relative group mx-auto relative rounded-none md:mx-0 h-[12rem] w-[18rem] mt-[1.25rem] mb-[1rem]   ${style.emulator}`} 
            style={{
              background: selectedTemplate
                ? `url(${selectedTemplate}) center/cover no-repeat`
                : '#2C2C2C',
          }}
          >
            
            <video

                className= {`w-full rounded-none  object-contain ${
                  selectedTemplate ? 'h-[75%]' : 'h-[100%]'
                }`}
                loop={true}
                controls={false}
                autoPlay={true}
                preload="auto"
                playsInline
                ref={videoRefWeb}
                
                onTimeUpdate={handleTimeUpdateWeb}
                onLoadedMetadata={handleLoadedMetadataWeb}    
                src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl}
            />

            <div className='group-hover:block hidden absolute bottom-0 px-3 w-full left-0 z-10'>
              {/* Fading overlay: black at bottom → transparent upward */}
              <div className="absolute bottom-0 left-0 w-full h-[200%] bg-gradient-to-t from-black/75 to-transparent z-[-1]" />

              {/* Controls */}
              <div
                className="w-full h-[2px] bg-gray-400 cursor-pointer"
                onClick={(e: any)=> {e.stopPropagation(); handleSeekWeb(e)}}
                onMouseDown={() => setIsSeekingWeb(true)}
                onMouseUp={() => setIsSeekingWeb(false)}
              >
                <div
                  className="h-full bg-white"
                  style={{ width: `${progressWeb}%` }}
                ></div>
              </div>

              <div className="z-10 flex justify-between my-1">
                <div className='flex'>
                  <button
                    onClick={(e: any)=> {e.stopPropagation(); togglePlayPauseWeb()}}
                    className="btn p-0.5 rounded flex items-center hover:bg-gray-500"
                  >
                    {isPlayingWeb ? <PauseIcon sx={{ color: '#fff' }} fontSize="small" /> : <PlayArrowIcon sx={{ color: '#fff' }} fontSize="small" />}
                  </button>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={(e: any) => {e.stopPropagation(); toggleMuteWeb()}}
                    className="btn p-0.5 rounded flex items-center gap-1 hover:bg-gray-500"
                  >
                    {isMutedWeb ? <VolumeOffIcon sx={{ color: '#fff' }} fontSize="small" /> : <VolumeUpIcon sx={{ color: '#fff' }} fontSize="small" />}
                  </button>
                  <button
                    onClick={(e:any) => {e.stopPropagation(); enterFullscreenWeb()}}
                    className="btn p-0.5 rounded flex items-center hover:bg-gray-500"
                  >
                    <FullscreenIcon sx={{ color: '#fff' }} fontSize="small" />
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute z-10 left-1  bottom-0 text-left px-1 py-2">
                <p className="font-medium text-[0.5rem] text-white">@{name}</p>
                <p className="font-medium text-[0.5rem] text-white mt-[0.2rem]">
                    {state.category.name?.length > 50
                        ? `${state.category.name?.slice(0, 60)}... See more`
                        : state.category.name}
                </p>
                <div className="mt-[0.1rem] flex gap-1 leading-3" >
                    {/* <img
                        className={`w-2.5 h-2.5 object-contain inline-block mr-1 invert-1`}
                        src={musicBlack}
                        alt="music-icon"
                    /> */}
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.9258 1.27234V7.48067C8.9258 7.76911 8.84027 8.05106 8.68003 8.29088C8.51978 8.5307 8.29202 8.71762 8.02555 8.828C7.75907 8.93838 7.46585 8.96726 7.18296 8.91099C6.90007 8.85472 6.64022 8.71582 6.43627 8.51187C6.23232 8.30792 6.09343 8.04807 6.03716 7.76518C5.98089 7.48229 6.00977 7.18907 6.12014 6.9226C6.23052 6.65612 6.41744 6.42836 6.65726 6.26812C6.89708 6.10787 7.17904 6.02234 7.46747 6.02234H8.21747V2.36401L4.13414 2.89526V8.10567C4.13414 8.39411 4.04861 8.67606 3.88836 8.91588C3.72812 9.1557 3.50036 9.34262 3.23388 9.453C2.96741 9.56338 2.67418 9.59226 2.3913 9.53599C2.10841 9.47972 1.84856 9.34082 1.6446 9.13687C1.44065 8.93292 1.30176 8.67307 1.24549 8.39018C1.18922 8.10729 1.2181 7.81407 1.32848 7.5476C1.43886 7.28112 1.62577 7.05336 1.8656 6.89312C2.10542 6.73287 2.38737 6.64734 2.6758 6.64734H3.4258V1.93901C3.42537 1.88814 3.44356 1.83888 3.47695 1.8005C3.51034 1.76212 3.55662 1.73729 3.60705 1.73068L8.69039 1.06818C8.71993 1.0643 8.74996 1.06681 8.77845 1.07553C8.80694 1.08425 8.83323 1.09898 8.85554 1.11872C8.87786 1.13847 8.89567 1.16277 8.90779 1.18999C8.91991 1.21721 8.92605 1.24671 8.9258 1.27651V1.27234Z" fill="white"/>
                      </svg>

                    <span className="font-normal text-white text-[0.5rem]">
                        {userName}
                    </span>
                </div>
            </div>
            <div className="absolute z-20 flex flex-col justify-between items-center gap-2.5 -bottom-6 scale-50 right-2 w-10 text-white">
                {/* Video next and previous */}
                <div className="text-center flex flex-col justify-between items-center gap-3 rounded-full px-2">
                    {/* <img
                        className="h-5 w-5 object-contain cursor-pointer"
                        src={chevronUpIconVideo}
                    /> */}
                    <div className={style.DivAvatarActionItemContainer}>
                        <a
                            className="e1g2yhv83 css-1w9wqra-StyledLink-AvatarLink er1vbsz0"
                            href="#"
                        >
                            <div
                                className={style.AvatarDivContainer}
                                style={{ width: '35px', height: '35px'}}
                            >
                                <span
                                    className={style.SpanAvatarContainer}
                                    style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%' 
                                    }}
                                >
                                    <img
                                        loading="lazy"
                                        alt="sherjangkhan5"
                                        src={ profileImg ||
                                            defaultAvatar
                                        }
                                        style={{
                                          width: '35px',
                                          height: '35px',
                                          borderRadius: '50%' 
                                      }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                            (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                        }}
                                        className="css-1zpj2q-ImgAvatar e1e9er4e1"
                                    />
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='text-center flex flex-col justify-center'>
                  <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.122131 5.87316V5.667C0.122131 3.18241 1.91786 1.06322 4.36619 0.655167C5.95505 0.385382 7.63632 0.913578 8.79508 2.07412L9.22162 2.49995L9.61617 2.07412C10.8069 0.913578 12.4562 0.385382 14.0771 0.655167C16.5261 1.06322 18.3211 3.18241 18.3211 5.667V5.87316C18.3211 7.34827 17.7097 8.7594 16.6292 9.76532L10.2062 15.7617C9.93963 16.0106 9.58774 16.1492 9.22162 16.1492C8.85551 16.1492 8.50362 16.0106 8.23703 15.7617L1.81371 9.76532C0.73457 8.7594 0.122142 7.34827 0.122142 5.87316H0.122131Z" fill="white"/>
                  </svg>
                  <span className='text-[11px]'>128k</span>
                </div>
                <div className='text-center flex flex-col justify-center'>
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.36465 0.621094C4.33861 0.621094 0.297153 4.03134 0.297153 8.23847C0.297153 10.0557 1.05604 11.7168 2.32215 13.025C1.87783 14.8696 0.393125 16.5139 0.375352 16.5323C0.295376 16.6147 0.273161 16.7422 0.322035 16.8521C0.36643 16.962 0.464961 17.0267 0.580482 17.0267C2.93533 17.0267 4.6717 15.8635 5.57809 15.1447C6.73792 15.5933 8.0314 15.8548 9.39561 15.8548C14.4217 15.8548 18.4631 12.4441 18.4631 8.27033C18.4631 4.09652 14.3907 0.621094 9.36465 0.621094ZM4.78292 9.41038C4.152 9.41038 3.64548 8.88851 3.64548 8.27143C3.64548 7.65435 4.152 7.09953 4.78292 7.09953C5.41384 7.09953 5.92036 7.62139 5.92036 8.27143C5.92036 8.92147 5.44405 9.41038 4.78292 9.41038ZM9.36465 9.41038C8.73373 9.41038 8.25921 8.88851 8.25921 8.27143C8.25921 7.65435 8.76572 7.09953 9.36465 7.09953C9.96359 7.09953 10.4701 7.62139 10.4701 8.27143C10.4701 8.92147 9.99735 9.41038 9.36465 9.41038ZM13.8824 9.41038C13.2515 9.41038 12.745 8.88851 12.745 8.27143C12.745 7.65435 13.2515 7.09953 13.8824 7.09953C14.5133 7.09953 15.0198 7.62139 15.0198 8.27143C15.0198 8.92147 14.5435 9.41038 13.8824 9.41038Z" fill="white"/>
                  </svg>
                  <span className='text-[11px]'>128k</span>
                </div>
                <div className='text-center flex flex-col justify-center'>
                  <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.1169 0.601562C12.4502 0.601562 14.3358 1.52308 14.3616 3.86564V16.9392C14.3616 17.0856 14.3272 17.232 14.2583 17.3612C14.1464 17.5679 13.957 17.7229 13.7245 17.7918C13.5006 17.8607 13.2509 17.8263 13.0443 17.7057L7.46499 14.9153L1.87708 17.7057C1.74879 17.7737 1.60156 17.8176 1.45519 17.8176C0.973023 17.8176 0.585571 17.4215 0.585571 16.9392V3.86564C0.585571 1.52308 2.47978 0.601562 4.80449 0.601562H10.1169ZM10.7024 5.80342H4.21901C3.84878 5.80342 3.54743 6.10485 3.54743 6.4838C3.54743 6.86188 3.84878 7.16417 4.21901 7.16417H10.7024C11.0726 7.16417 11.374 6.86188 11.374 6.4838C11.374 6.10485 11.0726 5.80342 10.7024 5.80342Z" fill="white"/>
                  </svg>
                  <span className='text-[11px]'>128k</span>
                </div>
                <div className='text-center flex flex-col justify-center'>
                  <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1693 7.54699L11.9134 12.9178C11.3667 13.3906 10.5026 13.0083 10.5026 12.2723V9.1785C4.98924 9.2567 2.61342 10.6252 4.22502 15.7792C4.40385 16.3511 3.71282 16.7944 3.22763 16.441C1.67254 15.31 0.26532 13.1489 0.26532 10.9629C0.26532 5.55292 4.79374 4.40838 10.5022 4.34084V1.49796C10.5022 0.76325 11.3653 0.37972 11.913 0.852467L18.1689 6.2233C18.5638 6.59439 18.5638 7.20576 18.1693 7.54699Z" fill="white"/>
                  </svg>
                  <span className='text-[11px]'>128k</span>
                </div>
            </div>
           
        </div>
            )}
            {!isEditMode && 
            <span className='px-4'>
            <CustomButton
                onClick={() => setOpenEditModal(true)}
                textSize="14px"
                islight
                text="Edit video"
                backgroundColor="#0000000D"
                color="black"
                icon={MyIcon}

            />
            </span>
            }
            {/* <CustomButton
                onClick={() => setReplaceVideoPopup(true)}
                textSize="14px"
                islight
                text="Change video"
            /> */}
            <CustomPopup
                open={replaceVideoPopup}
                title="Replace this video?"
                description="Caption and video settings will still be saved."
                btnText="Continue editing"
                primaryBtnText="Replace"
                onBtnClick={() => setReplaceVideoPopup(false)}
                onPrimaryBtnClick={selectFilesHandler}
                onClose={() => setReplaceVideoPopup(false)}
            />
            <PopupForEditVideo open={openEditModal} handleClose={()=>setOpenEditModal(false)} targetVideo={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl} isDarkTheme={darkTheme} />
        </div>
    );
}

export default FormLeftSide;
