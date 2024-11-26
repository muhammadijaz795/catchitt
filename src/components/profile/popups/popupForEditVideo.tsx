import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useEffect, useRef, useState } from 'react';
import style from './popupForEditVideo.module.scss';
import { EDIT_VIDEO_ACTIONS } from '../../../utils/constants';
import SoundGallery from '../components/soundGallery';
import { addIcon, addInWhite, leftArrowCurved, leftArrowCurvedinWhite, minusIcon, minusInwhite, pause, play, rightArrowCurved, rightArrowCurvedinWhite } from '../../../icons';
import ReactSlider from "react-slider";
import { VideoToFrames, VideoToFramesMethod } from '../../../utils/videoToFrame';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function PopupForEditVideo({ isDarkTheme, open, targetVideo, handleClose }: any) {

  const [selectedActionIndex, setSelectedActionIndex] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [audioTabSelected, setAudioTabSelected] = useState('Recommended');
  const [videoDuration, setVideoDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState<any>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const lightThemePalette = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkThemePalette = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  function formatTime(seconds: number) {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
  }

  const switchAudioTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    setAudioTabSelected((e.target as HTMLHeadingElement).id)
  }

  const getMediaInfo = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = (event.target as HTMLVideoElement);
    videoElement.volume = volume / 100;
    setVideoDuration(videoElement.duration || 0);
    videoCoverHandler(videoElement.duration);
  }

  const getCurrentTime = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setVideoCurrentTime((event.target as HTMLVideoElement).currentTime || 0);
  }

  const togglePlayback = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!videoRef.current) return;
    if (videoRef.current?.paused) {
      (event.target as HTMLImageElement).src = pause;
      videoRef.current?.play();
    } else {
      (event.target as HTMLImageElement).src = play;
      videoRef.current?.pause();
    }
  }

  const handleVolumeChange = (value: number) => {
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
    }
  };

  const videoCoverHandler = async (duration:number) => {
    setThumbnails([]);
    const numberOfFrames = duration/2;
    const frames = await VideoToFrames.getFrames(
      targetVideo,
      numberOfFrames,
      VideoToFramesMethod.totalFrames
    );
    console.log('videoCoverHandler', frames);
    setThumbnails(frames);
  };

  useEffect(() => {
    console.log('PopupForEditVideo mounted', targetVideo);
    // targetVideo is in blob format and needs to get duration and currentTime
    // if (targetVideo) videoCoverHandler();
  }, [targetVideo])

  useEffect(() => {
    console.log('thumbnails💖💖💖💖', thumbnails);
  }, [thumbnails])
  

  return (
    <ThemeProvider theme={isDarkTheme ? darkThemePalette : lightThemePalette}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            width: '900px',
            maxWidth: '90%',
            borderRadius: '10px',
          },
        }}
      >
        <div className={style.EditModal}>
          <div className={`${style.modalHeader} border-b border-gray-200`} >
            <span className={style.modalTitle}>Edit Video</span>
            <button className={style.closeIcon} onClick={handleClose}>X</button>
          </div>
          <div className={style.modalBody}>
            <div className={`${style.content} border-b border-gray-200`}>
              {/* LEFT ACTION BAR */}
              <div className={`${style.actions} border-r border-gray-200`}>
                {EDIT_VIDEO_ACTIONS.map((action, index) => (
                  <div className='p-2 text-center'>
                    <img className='m-auto' src={action.icon} alt="music" />
                    <span className='text-sm'>{action.title}</span>
                  </div>
                ))}

              </div>
              {/* RECOMENDETION CONTAINER */}
              <div className={`${style.recommendedContainer} border-r border-gray-200 overflow-y-auto`}>
                <div className={style.audioTabs}>
                  <h3 onClick={switchAudioTab} id='Recommended' className={`${style.audioTab} ${audioTabSelected === 'Recommended' ? style.audioTabSelected : ''}`}>Recommended</h3>
                  <h3 onClick={switchAudioTab} id='Favorites' className={`${style.audioTab} ${audioTabSelected === 'Favorites' ? style.audioTabSelected : ''}`}>Favorites</h3>
                </div>
                <SoundGallery />
              </div>
              {/* RIGHT VIDEO CONTAINER */}
              <div className={style.videoContainer}>
                <video ref={videoRef} onLoadedMetadata={getMediaInfo} onTimeUpdate={getCurrentTime} src={targetVideo} style={{ width: '200px', height: '355px' }} />
              </div>

            </div>
            {/* bottom controls bar */}
            <div className={style.videoControlBar}>
              <div className={style.prevNextArrows}>
                <img src={isDarkTheme ? leftArrowCurvedinWhite : leftArrowCurved} alt="left-arrow-curved" />
                <img src={isDarkTheme ? rightArrowCurvedinWhite : rightArrowCurved} alt="left-arrow-curved" />
              </div>
              <div className="flex items-center justify-between">
                <img onClick={togglePlayback} src={play} alt="play" className='mx-2' />
                <span>{formatTime(videoCurrentTime)}</span> &nbsp; / &nbsp;<span>{formatTime(videoDuration)}</span>
              </div>
              <div className="flex items-center">
                <img onClick={() => handleVolumeChange(volume - 5)} className='mx-2 cursor-pointer' src={isDarkTheme ? minusInwhite : minusIcon} alt="dec-vol" />
                <ReactSlider
                  className={`w-28 h-3 rounded-lg`}
                  thumbClassName="h-3 w-3 bg-gray-700 rounded-full cursor-pointer focus:outline-none"
                  trackClassName="react-slider-track"
                  value={volume}
                  onChange={handleVolumeChange}
                  min={0}
                  max={100}
                  renderTrack={(props, state) => (
                    <div
                      {...props}
                      className={`h-3 rounded-lg ${state.index === 0 ? "bg-gray-500" : "bg-gray-400"
                        }`}
                    />
                  )}
                />
                <img onClick={() => handleVolumeChange(volume + 5)} className='mx-2 cursor-pointer' src={isDarkTheme ? addInWhite : addIcon} alt="inc-vol" />
              </div>
            </div>
            {/* video playback track */}
            <div style={{ display: "flex", overflowX: "auto", marginTop: "20px" }}>
              {thumbnails.map((thumb:any, index:number) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index}`}
                  style={{
                    width: "120px",
                    height: "90px",
                    marginRight: "5px",
                    cursor: "pointer",
                    border: videoCurrentTime >= index * 2 && videoCurrentTime < (index + 1) * 2 ? "2px solid blue" : "none",
                  }}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = index * 2;
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

      </BootstrapDialog>
    </ThemeProvider>
  )
}

export default PopupForEditVideo