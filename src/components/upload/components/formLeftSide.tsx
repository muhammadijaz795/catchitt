import CustomButton from '../../../shared/buttons/CustomButton';
import CustomPlayer from '../../homePage/components/CustomPlayer';
import style from '../styles.module.scss';
import CustomPopup from '../../../shared/popups/CustomPopup';
import React from 'react';
import { useRef } from 'react';
import PopupForEditVideo from '../../profile/popups/popupForEditVideo';
import { Tabs, Tab, Box, Paper, Typography, IconButton, Grid, Avatar } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { defaultAvatar, music, musicBlack, shareInHome } from '../../../icons';


function FormLeftSide({ selectedVideoSrc, selectFilesHandler, darkTheme, videoInfo,state }: any) {
    const [replaceVideoPopup, setReplaceVideoPopup] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [value, setValue] = React.useState(1); // Default: Profile

     let isEditMode = false;
      const { id: postId } = useParams(); 
      if(postId) {
          isEditMode = true;
      }

    const profileImg = useSelector((state: any) => state?.reducers?.profile?.avatar);
    const name = useSelector((state: any) => state?.reducers?.profile?.name);
    const userName = useSelector((state: any) => state?.reducers?.profile?.username);
    const coverImg = useSelector((state: any) => state?.reducers?.profile?.cover);

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);


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

  const enterFullscreen = () => {
    if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
        }
    }
};

const toggleMute = () => {
  if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
  }
};

const handleTimeUpdate = () => {
  const video = videoRef.current;
  if (video && video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
  }
};

const handleLoadedMetadata = () => {
  if (videoRef.current) {
      setDuration(videoRef.current.duration);
  }
};

const handleSeek = (e) => {
  if (!videoRef.current) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const seekTime = (clickX / rect.width) * videoRef.current.duration;

  videoRef.current.currentTime = seekTime;
  setProgress((seekTime / videoRef.current.duration) * 100);
};

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
    const MyIcon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.56734 1.41797L9.91921 7.83105L14.2711 1.41797C14.734 1.74634 15.458 2.72353 14.6667 3.98953C14.6667 3.98953 12.2771 7.82314 11.1694 9.67466L12.6886 11.9099C14.1524 10.8141 16.178 11.4075 17.2699 12.8911C18.3777 14.3945 18.3856 16.6139 16.9139 17.7771C15.4382 18.9402 13.377 18.3507 12.2653 16.8473C11.4661 15.7633 11.2366 14.3074 11.7272 13.1443L9.91921 10.5173L8.11516 13.1443C8.60178 14.3074 8.37627 15.7594 7.57315 16.8434C6.46145 18.3507 4.39233 18.9402 2.91665 17.7771C1.43701 16.6139 1.44492 14.3984 2.56059 12.8951C3.65251 11.4115 5.67811 10.8141 7.14984 11.9099L8.66904 9.67466C7.51594 7.77185 6.35014 5.87676 5.17171 3.98953C4.38046 2.72353 5.10445 1.74634 5.56734 1.41797ZM13.559 13.2353C12.9576 13.71 12.7677 14.8574 13.5075 15.8662C14.2473 16.8711 15.367 16.9819 15.9723 16.5032C16.5776 16.0284 16.7714 14.8811 16.0277 13.8722C15.2878 12.8674 14.1682 12.7566 13.5629 13.2353H13.559ZM6.2755 13.2353C5.66624 12.7526 4.54267 12.8674 3.79889 13.8722C3.05907 14.8771 3.24502 16.0244 3.85428 16.5032C4.46354 16.9858 5.58712 16.8711 6.33089 15.8662C7.07467 14.8613 6.88477 13.714 6.2755 13.2353Z" fill="black"/>
        </svg>

      );
    return (
        // <div className="flex-[0.6] p-[2.5rem] flex flex-col gap-[1rem]">
           <div className="flex-[0.6] p-[6.5rem] flex flex-col gap-[1rem]">
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

             <div className={'h-fit w-1/3 relative border border-gray-100 rounded-md'}>
                 <div className="absolute top-2 left-2 z-10 flex gap-2">
                <button
                    onClick={togglePlayPause}
                    className="bg-black bg-opacity-50 text-white px-3 py-1 rounded"
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                    onClick={enterFullscreen}
                    className="bg-black bg-opacity-50 text-white px-3 py-1 rounded"
                >
                    Fullscreen
                </button>

                <button
                onClick={toggleMute}
                className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded"
            >
                {isMuted ? "Unmute" : "Mute"}
            </button>

         

            </div>
                <video
                    className="h-[350px] w-full rounded-t-md object-cover"
                    loop={true}
                    controls={false}
                    autoPlay={true}
                    width="300px"
                    preload="auto"
                    playsInline
                    ref={videoRef}
                    onClick={handleVideoClick}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}    
                    src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl}
                />

<div
                className="absolute bottom-0 left-0 w-full h-3 bg-gray-400 cursor-pointer"
                onClick={handleSeek}
                onMouseDown={() => setIsSeeking(true)}
                onMouseUp={() => setIsSeeking(false)}
            >
                <div
                    className="h-full bg-blue-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            
                <div className="text-left px-1 py-2">
                    <p className="font-medium text-[0.8rem]">@{name}</p>
                    <p className="font-medium text-[0.6rem] mt-[0.2rem]">
                        {state.category.name?.length > 50
                            ? `${state.category.name?.slice(0, 60)}... See more`
                            : state.category.name}
                    </p>
                    <div className="mt-[0.1rem] leading-3" >
                        <img
                            className={`w-2.5 h-2.5 object-contain inline-block mr-1`}
                            src={musicBlack}
                            alt="music-icon"
                        />
                        <span className="font-normal text-[0.6rem]">
                            {userName}
                        </span>
                    </div>
                </div>
                <div className="absolute flex flex-col justify-between items-center gap-2.5 top-32 right-2 w-10 text-white">
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
                                    style={{ width: '35px', height: '35px' }}
                                >
                                    <span
                                        className={style.SpanAvatarContainer}
                                        style={{
                                            width: '35px',
                                            height: '35px',
                                        }}
                                    >
                                        <img
                                            loading="lazy"
                                            alt="sherjangkhan5"
                                            src={ profileImg ||
                                                defaultAvatar
                                            }
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                            }}
                                            className="css-1zpj2q-ImgAvatar e1e9er4e1"
                                        />
                                    </span>
                                </div>
                            </a>

                            <button
                                className={style.AvatarFollowButton}
                                data-e2e="feed-follow"
                            >
                                <span className={style.ColorButtonContent}>
                                   
                                        <svg
                                            fill="white"
                                            viewBox="0 0 48 48"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                        >
                                            <path d="m19.71 36.03 19.73-30.5a1 1 0 0 1 1.39-.3l2.35 1.53c.46.3.6.92.3 1.38L22.01 41.3a2.4 2.4 0 0 1-3.83.28L4.85 26.33a1 1 0 0 1 .1-1.4l2.1-1.85a1 1 0 0 1 1.42.1L19.7 36.02Z"></path>
                                        </svg>
                                        <svg
                                            fill="white"
                                            viewBox="0 0 48 48"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                        >
                                            <path d="M26 7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v15H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h15v15a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V26h15a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H26V7Z"></path>
                                        </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* <div className="text-center">
                        <img
                            className="h-5 w-5 object-contain"
                            src={isLiked ? redHeartIcon : whiteHeartIcon}
                        />
                        <p className="font-bold text-[0.5rem] mt-1 text-white">
                            {videoLikes}
                        </p>
                    </div> */}
                    
                    <div className="text-center relative">
                        <img className="h-5 w-5 object-contain" src={shareInHome} />
                        <p className="font-bold text-[0.5rem] mt-1 text-white">
                            {/* {videoShares} */}
                        </p>
                    </div>
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
            <div
                className={`mx-auto md:mx-0 w-[17.5rem] h-[15rem] mt-[1.25rem] mb-[1rem] bg-[#2C2C2C] ${style.emulator}`}>
                <CustomPlayer src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl} />
            </div>
            )}
            {!isEditMode && <CustomButton
                onClick={() => setOpenEditModal(true)}
                textSize="14px"
                islight
                text="Edit video"
                backgroundColor="#0000000D"
                color="black"
                icon={MyIcon}

            />}
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
