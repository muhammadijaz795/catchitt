import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useEffect, useRef, useState } from 'react';
import style from './popupForEditVideo.module.scss';
import { EDIT_VIDEO_ACTIONS, TRACKSLOTDIFF, TRACKSLOTPERIODS } from '../../../utils/constants';
import SoundGallery from '../components/soundGallery';
import { addIcon, addInWhite, leftArrowCurved, leftArrowCurvedinWhite, minusIcon, minusInwhite, music, svgTemplate, musicBlack, pause, play, rightArrowCurved, rightArrowCurvedinWhite } from '../../../icons';
import ReactSlider from "react-slider";
import { VideoToFrames, VideoToFramesMethod } from '../../../utils/videoToFrame';
import { Card, CardContent, CircularProgress } from '@mui/material';
import AudioWaveForm from './AudioWaveForm';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import useUpload from '../../upload/hooks';
import { useUpdateEffect } from 'react-use';
import { Typography } from 'antd';
import { debounce } from 'lodash';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function PopupForEditVideo({ isDarkTheme, open, targetVideo, handleClose }: any) {

  const { onChangeFileHandler } = useUpload();

  const [loaded, setLoaded] = useState(false);
  const [isInProcess, setIsInProcess] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLParagraphElement | null>(null)

  const [selectedActionIndex, setSelectedActionIndex] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [audioTabSelected, setAudioTabSelected] = useState('Recommended');
  const [videoDuration, setVideoDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState<any>([]);

  const [video, setVideo] = useState(targetVideo);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const playbackTrack = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };


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
    try {
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;
      console.log('check first this is called or note')
      ffmpeg.on("log", ({ message }) => {
        console.log(message);
        if (messageRef.current) messageRef.current.innerHTML = message;
      });
      // toBlobURL is used to bypass CORS issue, urls with the same
      // domain can be used directly.
      const isLoaded = await ffmpeg.load({
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
      // await ffmpeg.load();
      console.log('loadded 👩‍🦳💖🤑', isLoaded)
      setLoaded(true);
    } catch (error) {
      console.log('check ffmpeg load error', error);
    }
  }

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

  useEffect(() => {
    console.log(loaded);
  }, [loaded]);
  
  useUpdateEffect(()=>{
    setSelectedAudio(null);
  },[audioTabSelected])

  const handleAudioManipulation = async () => {
    try {
      setIsInProcess(true);
      // await ffmpeg.exec([
      //   '-i', 'input.mp4', // Input video
      //   '-stream_loop', '-1', // Loop video
      //   '-i', 'input.mp3', // Input audio
      //   '-c:v', 'copy',          // Copy video codec
      //   '-shortest',             // Finish encoding when the shortest input stream ends
      //   '-map', '0:v:0',         // Map video stream from input-video
      //   '-map', '1:a:0',         // Map audio stream from input-audio
      //   '-af', 'volume=0.5',     // Reduce audio volume
      //   'output.mp4'
      // ]);

      if (!selectedAudio) return;
      // const newVideo = await addAudioToVideo(targetVideo, selectedAudio);

      const ffmpeg = ffmpegRef.current;
      const videoArrayBuffer = await fetchFile(targetVideo);
      const audioArrayBuffer = await fetchFile(selectedAudio);
      await ffmpeg.writeFile('input.mp4', videoArrayBuffer);
      await ffmpeg.writeFile('input.mp3', audioArrayBuffer);
      // await ffmpeg.writeFile('input.mp3', new Uint8Array(audioArrayBuffer));
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-stream_loop', '-1',
        '-i', 'input.mp3',
        '-filter_complex', 'amix=inputs=2:duration=first:dropout_transition=2', 
        '-c:v', 'copy',          
        '-shortest',             
        '-map', '0:v:0',         
        '-map', '1:a:0',   
        'output.mp4'
      ]);
      
      const fileData = await ffmpeg.readFile('output.mp4');
      const data = new Uint8Array(fileData as unknown as ArrayBuffer);
      const newVideo = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      setVideo(newVideo);
      setSelectedAudio(null);
      // if (videoRef.current) {
      //   videoRef.current.src = URL.createObjectURL(
      //     new Blob([data.buffer], { type: 'video/mp4' })
      //   )
      // }
      // console.log('step 12');
      // get file format and download
      // const file = new File([data.buffer], 'edited-video.mp4', { type: 'video/mp4' });
      // // download file
      // const url = URL.createObjectURL(file);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'edited-video.mp4';
      // a.click();
      // URL.revokeObjectURL(url);
      // console.log('saveEdit 🚀🚀🚀👩‍🚀', file);
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsInProcess(false);
    }
  }

  const skip = (forward = false) => {
    if (!videoRef.current) return;
    if (forward) {
      videoRef.current.currentTime += 5;
    } else {
      videoRef.current.currentTime -= 5;
    }
  }

  const saveEdit = async () => {
    // convert blob to file
    setIsInProcess(true);
    const res = await fetch(video);
    const blob = await res.blob();
    const file = new File([blob], 'edited-video.mp4', { type: 'video/mp4' });
    // download file
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited-video.mp4';
    a.click();
    URL.revokeObjectURL(url);

    console.log('saveEdit 🚀🚀🚀👩‍🚀', file);
    onChangeFileHandler({ target: { files: [file] } });
    setIsInProcess(false);
    handleClose();
  }

  // Clean up debounce on unmount
useEffect(() => {
  return () => {
      handleSearch.cancel();
  };
}, []);

  useEffect(() => {
    if (open) {
      setVideo(targetVideo);
    }
  }, [open])

  const videoData = [
    {
      title: "2022 MOVIE RECAP",
      image: "/images/recap.jpg",
      count: "1/3",
    },
    {
      title: "TRAVEL VLOG",
      image: "/images/travel.jpg",
      count: "1/3",
    },
    {
      title: "TELLING MY STORY",
      image: "/images/story.jpg",
      count: "1/3",
    },
    {
      title: "MAKEUP TUTORIAL",
      image: "/images/makeup.jpg",
      count: "1/3",
    },
    {
      title: "The secret to content creation",
      image: "/images/secret.jpg",
      count: "1/3",
    },
    {
      title: "Try TikTok effect",
      image: "/images/tiktok.jpg",
      count: "1/3",
    },
  ];
  

  const EDIT_VIDEO_ACTIONS = [
    {
      title: 'Sounds',
      icon: musicBlack,
      content: (
        <div className={`${style.recommendedContainer} border-r border-gray-200 relative`}>
          {/* Search Bar */}
          <div className="mt-2.5 mx-auto mb-1 w-11/12">
            <span
              className="rounded-sm w-100 h-10 d-flex align-items-center"
              style={{ backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(0, 0, 0)' }}
            >
              <span className="pl-2">
                <svg fill="black" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.83 7.5a14.34 14.34 0 1 1 0 28.68 14.34 14.34 0 0 1 0-28.68Zm0-4a18.33 18.33 0 1 0 11.48 32.64l8.9 8.9a1 1 0 0 0 1.42 0l1.4-1.41a1 1 0 0 0 0-1.42l-8.89-8.9A18.34 18.34 0 0 0 21.83 3.5Z"
                  ></path>
                </svg>
              </span>
              <input type="text" className="bg-transparent pl-3 w-[85%]" placeholder="Search" value={searchQuery}  onChange={(e) => handleSearch(e.target.value)} />
              {searchQuery && (
                  <button 
                      onClick={() => {
                          setSearchQuery('');
                          handleSearch('');
                      }}
                      className="pr-2 btn"
                  >
                      ×
                  </button>
              )}
            </span>
          </div>

          {/* Tabs */}
          <div className={style.audioTabs}>
            <span
              onClick={switchAudioTab}
              id="Recommended"
              className={`${style.audioTab} ${audioTabSelected === 'Recommended' ? style.audioTabSelected : ''}`}
            >
              Recommended
            </span>
            <span
              onClick={switchAudioTab}
              id="Favorites"
              className={`${style.audioTab} ${audioTabSelected === 'Favorites' ? style.audioTabSelected : ''}`}
            >
              Favorites
            </span>
          </div>

          {/* Sound Gallery */}
          <SoundGallery
            isDarkTheme={isDarkTheme}
            isFavoriteSounds={audioTabSelected === 'Favorites'}
            selectedAudio={selectedAudio}
            setSelectedAudio={setSelectedAudio}
            searchQuery={searchQuery}
          />

          {/* Add Sound Button */}
          {selectedAudio && (
            <button
              onClick={handleAudioManipulation}
              className="bg-red-500 rounded-full w-[90%] block mx-auto p-2 absolute bottom-1 left-1/2 -translate-x-1/2 hover:bg-red-700 border-0"
            >
              Add Sound
            </button>
          )}
        </div>
      ),
    },
    {
      title: 'Template',
      icon: svgTemplate,
      content: 
      <div className="grid grid-cols-3 gap-2 p-4 border-r">
      {videoData.map((item, index) => (
        <Card
          key={index}
          className="relative h-[200px] overflow-hidden rounded-xl shadow-md"
          sx={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
          }}
        >
          <CardContent className="flex flex-col justify-between h-full bg-black/30 backdrop-blur-sm p-4">
            <Typography variant="subtitle1" className="font-bold uppercase">
              {item.title}
            </Typography>
            <Typography variant="body2" className="self-end bg-black/50 rounded px-2 py-1 text-sm">
              {item.count}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>,
    },
  ];
  const [activeTab, setActiveTab] = useState(0); // default to first tab


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
          <div className={`${style.modalHeader} border-b border-gray-200 py-3`} >
            <span className={`${style.modalTitle} !text-[17px]`}>Edit Video</span>
          </div>
          <div className={`${style.modalBody} relative`}>
            {isInProcess&&<div className={`absolute top-0 left-0 right-0 bottom-0 z-10 opacity-60 ${isDarkTheme?'bg-black':'bg-white'} flex justify-center items-center`}> <CircularProgress style={{width:'30px',height:'30px',color:'#f50057'}} /> </div>}
            <div className={`${style.content} border-b border-gray-200`}>
              {/* LEFT ACTION BAR */}
              <div className={`${style.actions} border-r border-gray-200`}>
              {EDIT_VIDEO_ACTIONS.map((action, index) => (
                <div
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`p-2 text-center cursor-pointer ${
                    activeTab === index ? 'bg-gray-100 font-semibold' : ''
                  }`}
                >
               {/* {EDIT_VIDEO_ACTIONS.map((action, index) => (
                  <div key={index} className='p-2 text-center'> */}
                    <img className='m-auto' src={action.icon} alt="music" />
                    <span className='text-sm'>{action.title}</span>
                  </div>
                ))}

              </div>
              {/* RECOMENDETION CONTAINER */}
              {EDIT_VIDEO_ACTIONS[activeTab].content}

              {/* <div className={`${style.recommendedContainer} border-r border-gray-200 relative`}>
                  <div className="mt-2.5 mx-auto mb-1 w-11/12">
                    <span className="rounded-sm w-100 h-10 d-flex align-items-center " style={{backgroundColor: "rgb(242, 242, 242)", color: 'rgb(0, 0, 0)'}}>
                      <span className='pl-2'>
                      <svg fill="black" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" >
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.83 7.5a14.34 14.34 0 1 1 0 28.68 14.34 14.34 0 0 1 0-28.68Zm0-4a18.33 18.33 0 1 0 11.48 32.64l8.9 8.9a1 1 0 0 0 1.42 0l1.4-1.41a1 1 0 0 0 0-1.42l-8.89-8.9A18.34 18.34 0 0 0 21.83 3.5Z"></path></svg>
                      </span>
                      <input type="text" className='bg-transparent pl-3' placeholder='Search' name="" id="" />
                    </span>
                  </div>
                <div className={style.audioTabs}>
                  <span onClick={switchAudioTab} id='Recommended' className={`${style.audioTab} ${audioTabSelected === 'Recommended' ? style.audioTabSelected : ''} `}>Recommended</span>
                  <span onClick={switchAudioTab} id='Favorites' className={`${style.audioTab} ${audioTabSelected === 'Favorites' ? style.audioTabSelected : ''} `}>Favorites</span>
                </div>
                <SoundGallery isDarkTheme={isDarkTheme} isFavoriteSounds={audioTabSelected === 'Favorites'} selectedAudio={selectedAudio} setSelectedAudio={setSelectedAudio} />
                {selectedAudio && <button onClick={handleAudioManipulation} className="bg-red-500 rounded-full w-[90%] block mx-auto p-2 absolute bottom-1 left-1/2 -translate-x-1/2 hover:bg-red-700 border-0">Add Sound</button>}
              </div> */}
              {/* RIGHT VIDEO CONTAINER */}
              <div className={style.videoContainer}>
                <video ref={videoRef} onLoadedMetadata={getMediaInfo} onTimeUpdate={getCurrentTime} onEnded={endedVideoHandler} src={video} style={{ width: '170px', height: '302px', borderRadius: '10px' }} />
              </div>
            </div>
            {/* bottom controls bar */}
            <div className={`${style.videoControlBar} border-b border-gray-200`}>
              <div className='flex'>
              <div className={style.prevNextArrows}>
                <img onClick={() => skip()} src={isDarkTheme ? leftArrowCurvedinWhite : leftArrowCurved} alt="left-arrow-curved" />
                <img onClick={() => skip(true)} src={isDarkTheme ? rightArrowCurvedinWhite : rightArrowCurved} alt="left-arrow-curved" />
              </div>
              <div className='flex align-items-center justify-between ml-5 w-[3rem]'>
                <span className='cursor-pointer'>
                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.0189 14.1212C8.0189 14.3282 8.1867 14.496 8.3937 14.496H9.14328C9.35027 14.496 9.51808 14.3282 9.51808 14.1212V0.628697C9.51808 0.421707 9.35027 0.253906 9.14328 0.253906H8.3937C8.1867 0.253906 8.0189 0.421706 8.0189 0.628697V14.1212ZM2.02224 3.62703C2.02224 3.42004 2.19004 3.25224 2.39703 3.25224H6.14495C6.35194 3.25224 6.51974 3.08444 6.51974 2.87745V2.12786C6.51974 1.92088 6.35194 1.75308 6.14495 1.75308H2.39703C1.36207 1.75308 0.523071 2.59207 0.523071 3.62703V11.1229C0.523071 12.1578 1.36207 12.9968 2.39703 12.9968H6.14495C6.35194 12.9968 6.51974 12.829 6.51974 12.622V11.8724C6.51974 11.6654 6.35194 11.4977 6.14495 11.4977H2.39703C2.19004 11.4977 2.02224 11.3299 2.02224 11.1229V3.62703ZM11.392 3.25224H15.1399C15.3469 3.25224 15.5147 3.42004 15.5147 3.62703V11.1229C15.5147 11.3299 15.3469 11.4977 15.1399 11.4977H11.392C11.1851 11.4977 11.0172 11.6654 11.0172 11.8724V12.622C11.0172 12.829 11.1851 12.9968 11.392 12.9968H15.1399C16.1749 12.9968 17.0139 12.1578 17.0139 11.1229V3.62703C17.0139 2.59207 16.1749 1.75308 15.1399 1.75308H11.392C11.1851 1.75308 11.0172 1.92088 11.0172 2.12786V2.87745C11.0172 3.08444 11.1851 3.25224 11.392 3.25224Z" fill="#161823" fill-opacity="0.6"/>
                </svg>
                </span>
                <span className='cursor-pointer'>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.86086 2.30709L6.86019 3.20666H10.7152L10.7159 2.30709H6.86086ZM12.4285 3.20666L12.4292 1.66458C12.4292 1.07318 11.9498 0.59375 11.3584 0.59375H6.21836C5.62695 0.59375 5.14752 1.07318 5.14752 1.66458L5.14685 3.20666H1.07836C0.841795 3.20666 0.650024 3.39844 0.650024 3.63501V4.49166C0.650024 4.72823 0.841795 4.92001 1.07836 4.92001H2.57685L3.13436 16.0137C3.13436 16.96 3.90144 17.727 4.84769 17.727H12.729C13.6753 17.727 14.4424 16.96 14.4424 16.0137L14.9986 4.92001H16.5834C16.8199 4.92001 17.0117 4.72823 17.0117 4.49166V3.63501C17.0117 3.39844 16.8199 3.20666 16.5834 3.20666H12.4285ZM13.2852 4.92001H4.29019L4.84769 16.0137H12.729L13.2852 4.92001ZM6.54883 13.658C6.31227 13.658 6.12049 13.4661 6.12049 13.2296L6.00419 7.66125C6.00419 7.42469 6.19596 7.23292 6.43252 7.23292H7.28919C7.52576 7.23292 7.71752 7.42469 7.71752 7.66125L7.83383 13.2296C7.83383 13.4661 7.64206 13.658 7.40549 13.658H6.54883ZM10.2001 13.658C9.96352 13.658 9.77174 13.4661 9.77174 13.2296L9.85919 7.66125C9.85919 7.42469 10.051 7.23292 10.2875 7.23292H11.1442C11.3808 7.23292 11.5725 7.42469 11.5725 7.66125L11.4851 13.2296C11.4851 13.4661 11.2933 13.658 11.0567 13.658H10.2001Z" fill="#9F9F9B" fill-opacity="0.6"/>
                </svg>
                </span>
              </div>
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
                      className={`h-3 rounded-lg ${state.index === 0 ? "bg-gray-300" : "bg-gray-200"
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
                  backgroundColor: "#20D5EC",
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
                <div className='absolute -top-[5px] -left-[5px] w-[12px] h-[12px] bg-[#20D5EC] rounded-full cursor-pointer'></div>
              </div>
              {/* Sound container */}
              {selectedAudio ? <AudioWaveForm audioUrl={selectedAudio} /> : <div className='w-full my-3 bg-[#0000000D] p-2.5 rounded'>

                <div className='flex gap-3'>
                  <img src={isDarkTheme ? music : musicBlack} alt="audio" />
                  <span className={`text-[15px] ${isDarkTheme ? 'text-gray-500' : ''}`}>Add sound</span>
                </div>
              </div>}
            </div> :
              <div className='flex justify-center items-center h-40'>
                <CircularProgress style={{ color: 'red', height: '35px', width: '35px' }} />
              </div>}
            {/* footer section */}
            <div className="float-right px-3 mb-3">
              <button className='mx-1 border-0 py-2' style={{ color: isDarkTheme ? '#fff' : 'rgb(22, 24, 35)', backgroundColor: isDarkTheme ? '#0000000D' : '#0000000D', minWidth: '100px', }} onClick={handleClose}>Cancel</button>
              <button onClick={saveEdit} className='mx-1 py-2' style={{ color: '#fff', backgroundColor: 'rgb(255, 59, 92)', minWidth: '100px' }} autoFocus>Save edit</button>
            </div>
          </div>
        </div>
      </BootstrapDialog>
    </ThemeProvider>
  )
}

export default PopupForEditVideo