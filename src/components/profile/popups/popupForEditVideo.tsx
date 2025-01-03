import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useEffect, useRef, useState } from 'react';
import style from './popupForEditVideo.module.scss';
import { EDIT_VIDEO_ACTIONS, TRACKSLOTDIFF, TRACKSLOTPERIODS } from '../../../utils/constants';
import SoundGallery from '../components/soundGallery';
import { addIcon, addInWhite, leftArrowCurved, leftArrowCurvedinWhite, minusIcon, minusInwhite, music, musicBlack, pause, play, rightArrowCurved, rightArrowCurvedinWhite } from '../../../icons';
import ReactSlider from "react-slider";
import { VideoToFrames, VideoToFramesMethod } from '../../../utils/videoToFrame';
import { CircularProgress } from '@mui/material';
import AudioWaveForm from './AudioWaveForm';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function PopupForEditVideo({ isDarkTheme, open, targetVideo, handleClose }: any) {

  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLParagraphElement | null>(null)

  const [selectedActionIndex, setSelectedActionIndex] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [audioTabSelected, setAudioTabSelected] = useState('Recommended');
  const [videoDuration, setVideoDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState<any>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const playbackTrack = useRef<HTMLDivElement>(null);

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

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
    console.log('loadded 👩‍🦳💖🤑')
    setLoaded(true);
  };


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

  const endedVideoHandler = () => {
    const playBtn = document.getElementById('playBtn') as HTMLImageElement;
    if (playBtn) {
      playBtn.src = play;
    }
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

  const videoCoverHandler = async (duration: number) => {
    setThumbnails([]);
    const numberOfFrames = duration / 2;
    const frames = await VideoToFrames.getFrames(
      targetVideo,
      numberOfFrames,
      VideoToFramesMethod.totalFrames
    );
    console.log('videoCoverHandler', frames);
    setThumbnails(frames);
  };

  const isTrackMajorslot = (index: number) => index % TRACKSLOTDIFF === 0;
  const getMajorSlotIndex = (index: number) => Math.floor(index / TRACKSLOTDIFF);

  const getCursorPosition = () => {
    const scrollWidth = playbackTrack.current?.scrollWidth || 0;
    const cursorPosition = (videoCurrentTime / videoDuration) * scrollWidth;

    if (cursorRef.current && playbackTrack.current) {
      // Check if the cursor is outside the visible track area and scroll to make it visible
      const container = playbackTrack.current;
      const containerRect = container.getBoundingClientRect();
      const cursorRect = cursorRef.current.getBoundingClientRect();

      if (cursorRect.right + 80 > containerRect.right) {
        // Cursor is out of view on the right side, scroll forward
        container.scrollLeft += cursorRect.right - containerRect.right + 10 + 80; // Add padding for smoothness
      } else if (cursorRect.left < containerRect.left) {
        // Cursor is out of view on the left side, scroll backward
        container.scrollLeft -= containerRect.left - cursorRect.left + 10; // Add padding for smoothness
      }
    }

    return `${cursorPosition}px`;
  };

  // Handle Cursor Drag
  const handleCursorDrag = (e: MouseEvent) => {
    if (playbackTrack.current && videoRef.current && cursorRef.current) {
      const trackRect = playbackTrack.current.getBoundingClientRect();
      // const trackScrollWidth = playbackTrack.current.scrollWidth;
      const trackScrollWidth = 35 * thumbnails.length;
      const trackWidth = trackRect.width;
      const offsetX = Math.min(Math.max(0, e.clientX - trackRect.left), trackWidth);
      const cursorPosition = playbackTrack.current.scrollLeft + offsetX;
      const boundedCursorPosition = Math.min(Math.max(0, cursorPosition), trackScrollWidth);
      const newTime = (boundedCursorPosition / trackScrollWidth) * videoDuration;
      setVideoCurrentTime(newTime);
      videoRef.current.currentTime = newTime;
      cursorRef.current.style.left = `${boundedCursorPosition}px`;
    }
  };

  useEffect(() => {
    console.log('PopupForEditVideo mounted', targetVideo);
    // targetVideo is in blob format and needs to get duration and currentTime
    // if (targetVideo) videoCoverHandler();
  }, [targetVideo])

  useEffect(() => {
    load();
  }, []);

  useEffect(()=>{
    console.log(loaded);
  },[loaded]);

  const handleAudioManipulation = async () => {
    try {
      if (!selectedAudio) return;
      // const newVideo = await addAudioToVideo(targetVideo, selectedAudio);
      console.log('step 1');

      const ffmpeg = ffmpegRef.current;
      const videoArrayBuffer = await fetchFile(targetVideo);
      console.log('step 2', videoArrayBuffer);
      const audioArrayBuffer = await fetchFile(selectedAudio);
      console.log('step 3');
      
      await ffmpeg.writeFile('input.mp4', videoArrayBuffer);
      console.log('step 4');
      await ffmpeg.writeFile('input.mp3', new Uint8Array(audioArrayBuffer));
      console.log('step 5');
      await ffmpeg.exec(['-i', 'input.mp4', '-i', 'input.mp3', '-c:v', 'copy', '-c:a', 'aac', 'output.mp4']);
      console.log('step 6');
      const fileData = await ffmpeg.readFile('output.mp4');
      console.log('step 7');
      console.log(fileData);
      console.log('step 8');
      const data = new Uint8Array(fileData as unknown as ArrayBuffer);
      console.log('step 9');
      const newVideo = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      console.log('step 10');
      console.log('newVideo', newVideo);
      console.log('step 11');
      // targetVideo = newVideo;
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(
          new Blob([data.buffer], { type: 'video/mp4' })
        )
      }
      console.log('step 12');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!selectedAudio) return;
    handleAudioManipulation();
  }, [selectedAudio])

  const skip = (forward=false) => {
    if (!videoRef.current) return;
    if (forward) {
      videoRef.current.currentTime += 5;
    } else {
      videoRef.current.currentTime -= 5;
    }
  } 
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
          <p className='text-white' ref={messageRef}></p>
          <div className={`${style.modalHeader} border-b border-gray-200`} >
            <span className={style.modalTitle}>Edit Video</span>
            <button className={style.closeIcon} onClick={handleClose}>X</button>
          </div>
          <div className={style.modalBody}>
            <div className={`${style.content} border-b border-gray-200`}>
              {/* LEFT ACTION BAR */}
              <div className={`${style.actions} border-r border-gray-200`}>
                {EDIT_VIDEO_ACTIONS.map((action, index) => (
                  <div key={index} className='p-2 text-center'>
                    <img className='m-auto' src={action.icon} alt="music" />
                    <span className='text-sm'>{action.title}</span>
                  </div>
                ))}

              </div>
              {/* RECOMENDETION CONTAINER */}
              <div className={`${style.recommendedContainer} border-r border-gray-200 overflow-y-auto`}>
                <div className={style.audioTabs}>
                  <span onClick={switchAudioTab} id='Recommended' className={`${style.audioTab} ${audioTabSelected === 'Recommended' ? style.audioTabSelected : ''} font-medium`}>Recommended</span>
                  <span onClick={switchAudioTab} id='Favorites' className={`${style.audioTab} ${audioTabSelected === 'Favorites' ? style.audioTabSelected : ''} font-medium`}>Favorites</span>
                </div>
                <SoundGallery isFavoriteSounds={audioTabSelected==='Favorites'} selectedAudio={selectedAudio} setSelectedAudio={setSelectedAudio} />
              </div>
              {/* RIGHT VIDEO CONTAINER */}
              <div className={style.videoContainer}>
                <video ref={videoRef} onLoadedMetadata={getMediaInfo} onTimeUpdate={getCurrentTime} onEnded={endedVideoHandler} src={targetVideo} style={{ width: '170px', height: '302px' }} />
              </div>

            </div>
            {/* bottom controls bar */}
            <div className={`${style.videoControlBar} border-b border-gray-200`}>
              <div className={style.prevNextArrows}>
                <img onClick={()=>skip()} src={isDarkTheme ? leftArrowCurvedinWhite : leftArrowCurved} alt="left-arrow-curved" />
                <img onClick={()=>skip(true)} src={isDarkTheme ? rightArrowCurvedinWhite : rightArrowCurved} alt="left-arrow-curved" />
              </div>
              <div className="flex items-center justify-between">
                <img onClick={togglePlayback} id='playBtn' src={play} alt="play" className='mx-2' />
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
            {thumbnails.length ? <div ref={playbackTrack} className="overflow-x-auto mb-3 relative" style={{ margin: '0 16px' }}>
              {/* time label track */}
              <div className='flex'>
                {thumbnails.map((_: any, index: number) => {
                  const isMajor = isTrackMajorslot(index);
                  return <span key={index} style={{ left: (index * 35) + 'px' }} className={`absolute top-0 text-xs border-l ${isMajor ? 'pt-2 h-6 pl-1' : 'h-2'}`}>{isMajor && (formatTime(getMajorSlotIndex(index) * TRACKSLOTPERIODS))}</span>;
                }
                )}
              </div>
              {/* thumbnail track */}
              <div className='flex mt-5 rounded no-scrollbar'>
                {thumbnails.map((thumb: any, index: number) => (
                  <img
                    key={index}
                    src={thumb}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: "35px",
                      // height: "80px",
                    }}
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = index * 2;
                      }
                    }}
                  />
                ))}
              </div>

              {/* Cursor */}
              <div
                ref={cursorRef}
                style={{
                  position: "absolute",
                  top: "0",
                  left: getCursorPosition(),
                  width: "2px",
                  height: "100%",
                  backgroundColor: "red",
                  cursor: "pointer",
                  zIndex: 9
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  window.addEventListener("mousemove", handleCursorDrag);
                  window.addEventListener("mouseup", () => {
                    window.removeEventListener("mousemove", handleCursorDrag);
                  });
                }}
              >
                <div className='absolute -top-[5px] -left-[5px] w-[12px] h-[12px] bg-red-600 rounded-full cursor-pointer'></div>
              </div>
              {/* Sound container */}
              {selectedAudio ? <AudioWaveForm audioUrl={selectedAudio} /> : <div className='w-full my-3 bg-gray-400 p-3 rounded'>

                <div className='flex gap-3'>
                  <img src={isDarkTheme ? music : musicBlack} alt="audio" />
                  <span className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-500' : ''}`}>Add sound</span>
                </div>
              </div>}
            </div> :
              <div className='flex justify-center items-center h-40'>
                <CircularProgress style={{ color: 'red', height: '35px', width: '35px' }} />
              </div>}
            {/* footer section */}
            <div className="float-right px-3 mb-3">
              <button className='mx-1' style={{ color: isDarkTheme ? '#fff' : 'rgb(22, 24, 35)', backgroundColor: isDarkTheme ? '#282828' : '', borderColor: 'rgba(22, 24, 35, 0.12)', minWidth: '120px', }} onClick={handleClose}>Cancel</button>
              <button className='mx-1' style={{ color: '#fff', backgroundColor: 'rgb(255, 59, 92)', minWidth: '120px' }} autoFocus>Save edit</button>
            </div>
          </div>
        </div>
      </BootstrapDialog>
    </ThemeProvider>
  )
}

export default PopupForEditVideo