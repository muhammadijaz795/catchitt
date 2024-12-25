import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { fabric } from 'fabric';
import TextIcon from '../icons/text';

import RectangleIcon from '../icons/rectangle';
import PlayIcon from '../icons/play';
import AtTheRate from '../icons/at';
import Pause from '../icons/pause';

import styles from './story-editor.module.scss';

import MutedIcon from '../icons/muted';
import SpeakerIcon from '../icons/speaker';
import StoryPreview from './sotry-preview';
import BasicSwitch from '../../../shared/switch/BasicSwitch';
import { ToastContainer } from 'react-toastify';
import {
    showToastSuccess,
} from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
const API_KEY = process.env.VITE_API_URL;
const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

const StoryEditor = ({ file }: any) => {

    const navigate = useNavigate();

    const videoRef = useRef<any>(null);
    const [canvas, setCanvas] = useState<any>('');
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(false);
    const [hiddenCanvas, setHiddenCanvas] = useState<any>(null);
    const [ctx, setCtx] = useState<any>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const requestIdRef = useRef<any>(null);
    const [progress, setProgress] = useState<any>(0);
    const [isExporting, setIsExporting] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const [allowDownload, setAllowDownload] = useState<boolean>(false);
    const [thumbnail, setVideoThumbnail] = useState<any>(null);
    const [finalVideoBlob, setFinalVideoBlob] = useState<any>(null);
    const [fileType, setFileType] = useState<any>('');
    const [isPosting, setIsPosting] = useState(false);

    // useEffect(() => {

    //     setFileType(file.type);

    //     console.log("file.type")
    //     console.log(file.type)
    //     if(file.type.startsWith('video/')){
    //         console.log("video file")
    //     }else if(file.type.startsWith('image/')){
    //         console.log("image file")
    //     }

    //     console.log('videoUrl change');
    //     console.log(file);
    //      const videoUrl = URL.createObjectURL(file);
    //     setCanvas(initCanvas());

    //     const can = document.createElement('canvas');
    //     const ctx = can.getContext('2d');
    //     setHiddenCanvas(can);
    //     setCtx(ctx);

    //     if (videoRef.current) {
    //         videoRef.current.src = videoUrl;
    //     }
    // }, [file]);

    useEffect(() => {
        setFileType(file.type);

        if (file.type.startsWith('video/')) {
            const videoUrl = URL.createObjectURL(file);
            setCanvas(initCanvas());

            const can = document.createElement('canvas');
            const ctx = can.getContext('2d');
            setHiddenCanvas(can);
            setCtx(ctx);

            if (videoRef.current) {
                videoRef.current.src = videoUrl;
            }
        } else if (file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            // const img = new Image();
            // img.src = imageUrl;
            const canv = initCanvas();
            setCanvas(canv);
            changeCanvasImage(imageUrl, canv);
        }
    }, [file]);

    const changeCanvasImage = (imageUrl: any, canv: any) => {
        const img = new Image();
        img.onload = () => {
            // Update canvas dimensions to match the image
            // canvas.setDimensions({ width: img.width, height: img.height });

            // Set the background image without scaling since the canvas now matches the image size
            canv.setBackgroundImage(img.src, canv.renderAll.bind(canv), {
                originX: 'left',
                originY: 'top',
                scaleX: 1, // No scaling needed
                scaleY: 1, // No scaling needed
            });
        };
        img.src = imageUrl;
    }; //changeCanvasImage

    const previewStory = () => {
        setIsPreview(true);
    };

    const initCanvas = () =>
        new fabric.Canvas('canvas', {
            height: 600,
            width: 350,
        });
    const rect = () => {
        canvas?.add(
            new fabric.Rect({
                width: 100,
                height: 100,
                fill: 'rgb(255, 59, 92)',
                top: 50,
                left: 50,
            })
        );
    };

    const base64ToFIle = async (base64Url: string) => {
        try {
            // Fetch the base64 image data
            const res = await fetch(base64Url);
            const blob = await res.blob();

            // Create a FormData object and append the image file
            const fd = new FormData();
            const file = new File([blob], 'filename.jpeg');
            fd.append('image', file);

            return file;
        } catch (error) {
            console.error('Error fetching base64 image:', error);
        }
    };

    const postStory = () => {
        if (isPosting) return;
        const formData = new FormData();

        // Append other information to the FormData object
        formData.append('thumbnail', thumbnail); // Assuming thumbnailFile is the thumbnail file
        formData.append('isStory', 'true'); // Convert boolean to string
        formData.append('type', 'video'); // Convert boolean to string
        formData.append('allowDownload', allowDownload.toString()); // Convert boolean to string
        formData.append('description', ''); // Assuming descriptionValue is the description
        formData.append('file', finalVideoBlob, 'canvas_video.webm'); // Append the video blob

        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        // return;

        setIsPosting(true);
        fetch(`${API_KEY}/media-content`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                setIsPosting(false);
                showToastSuccess('Story posted successfully');
                // setTimeout(() => {
                //     navigate('/profile');
                // }, 2000);
                navigate('/profile');
            })
            .catch((err) => {
                console.log(err);
                setIsPosting(false);
            });
    };

    const text = () => {
        canvas.add(
            new fabric.IText('  @Ali  ', {
                rx: 15,
                ry: 15,
                left: 50,
                top: 50,
                fontSize: 24,
                fill: 'white', // Text color
                backgroundColor: 'rgb(255, 59, 92)', // Background color
                padding: 0, // Padding around the text
                cornerRadius: 50, // Rounded corners
            })
        );
    };

    const renderCanvas = () => {
        const current = videoRef.current;
        if (!current) return; // Add null check

        hiddenCanvas.width = canvas.width * 3;
        hiddenCanvas.height = canvas.height * 3;

        // Calculate scaled video dimensions
        const scaledVideoWidth = hiddenCanvas.width;
        const scaledVideoHeight = (current.videoHeight / current.videoWidth) * scaledVideoWidth;

        // Calculate drawing position to center the video
        const posX = 0;
        const posY = (hiddenCanvas.height - scaledVideoHeight) / 2;

        // console.log(current)
        ctx.drawImage(current, posX, posY, scaledVideoWidth, scaledVideoHeight);

        // Draw scaled Fabric.js objects on top of the video frame
        canvas.getObjects().forEach(function (obj: any) {
            // Save the current object properties
            const originalProps = {
                left: obj.left,
                top: obj.top,
                width: obj.width,
                height: obj.height,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
                angle: obj.angle,
            };

            // Scale up the object properties
            const scaledProps = {
                left: originalProps.left * 3,
                top: originalProps.top * 3,
                width: originalProps.width * 3 * originalProps.scaleX,
                height: originalProps.height * 3 * originalProps.scaleY,
                scaleX: 1,
                scaleY: 1,
                angle: originalProps.angle,
            };

            // Create a new object with scaled properties
            let scaledObj;
            if (obj.type === 'rect') {
                scaledObj = new fabric.Rect({
                    left: scaledProps.left,
                    top: scaledProps.top,
                    width: scaledProps.width,
                    height: scaledProps.height,
                    angle: scaledProps.angle,
                    fill: obj.fill,
                });
            } else if (obj.type === 'i-text') {
                scaledObj = new fabric.Text(obj.text, {
                    left: scaledProps.left,
                    top: scaledProps.top,
                    fontSize: obj.fontSize * 3,
                    angle: scaledProps.angle,
                    fill: obj.fill,
                    backgroundColor: obj.backgroundColor,
                });
            }
            // You can add more conditions for other object types as needed

            // Draw the scaled object onto the canvas
            scaledObj.render(ctx);
        });

        if (videoRef.current.currentTime == null) {
            const b = hiddenCanvas.toDataURL();

            base64ToFIle(b).then((file) => {
                setVideoThumbnail(file);
            });
        }

        requestIdRef.current = requestAnimationFrame(renderCanvas);
        // cancelAnimationFrame(aF)
    };

    const startRecording = () => {
        if (!isRecording) {
            const chunks: BlobPart[] = [];
            const stream = new MediaStream();
            const canvasStream = hiddenCanvas.captureStream(); // Capture the canvas stream
            const audioStream = videoRef.current
                ? videoRef.current?.captureStream().getAudioTracks()[0]
                : null; // Capture the audio track from the video element
            stream.addTrack(canvasStream.getTracks()[0]); // Add canvas stream track
            if (audioStream) {
                stream.addTrack(audioStream); // Add audio track
            }

            const mRecorder = new MediaRecorder(stream);
            setMediaRecorder(mRecorder);

            setTimeout(function () {}, 1000);

            setIsRecording(true);
            renderCanvas();

            mRecorder.ondataavailable = function (e) {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            mRecorder.onstop = function () {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const videoUrl = URL.createObjectURL(blob);

                setFinalVideoBlob(blob);
                const a = document.createElement('a');
                a.href = videoUrl;
                a.download = 'canvas_video.webm';
                a.click();
                cancelAnimationFrame(requestIdRef.current);
                setPreviewUrl(videoUrl);
                setIsPreview(true);

                // setIsRecording(false);
                // stopRendering();
            };

            mRecorder.start();
        }
    };

    const stopRecording = async () => {
        if (isRecording && mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const play = () => {
        videoRef.current.play();
        if (paused) {
            videoRef.current.play();
            setPaused(false);
        } else {
            videoRef.current.pause();
            setPaused(true);
        }
        //   hiddenVdeoRef.current.play();
    };

    const toggleVolume = () => {
        if (muted) {
            setMuted(false);
            videoRef.current.muted = false;
        } else {
            setMuted(true);
            videoRef.current.muted = true;
        }
        //   hiddenVdeoRef.current.play();
    };

    const pause = () => {
        videoRef.current.pause();
        //  hiddenVdeoRef.current.pause()
    };
    const handleColorChange = (e: any) => {
        const color = e.target.value;
        let activeObject = canvas.getActiveObject();

        if (activeObject) {
            if (
                activeObject.type === 'rect' ||
                activeObject.type === 'circle' ||
                activeObject.type === 'triangle' ||
                activeObject.type === 'ellipse' ||
                activeObject.type === 'path' ||
                activeObject.type === 'polygon'
            ) {
                activeObject.set('fill', color); // Set fill color to red
            } else if (activeObject.type === 'i-text') {
                activeObject.set('fill', color); // Set text color to red
            }

            canvas.renderAll(); // Render canvas after updating color
        }
    };

    const handleBGColorChange = (e: any) => {
        const color = e.target.value;
        let activeObject = canvas.getActiveObject();

        if (activeObject) {
            activeObject.set('backgroundColor', color); // Set fill color to red
            canvas.renderAll(); // Render canvas after updating color
        }
    };

    // const exportVideo = () => {

    //     setIsExporting(true)
    //     console.log("hidden video ref ")
    //     videoRef.current.currentTime = 0;
    //     startRecording();
    //     // videoRef.current.muted = true;
    //     videoRef.current.play();
    //     // console.log(hiddenVdeoRef)
    //     // hiddenVdeoRef.current.src = videoUrl;

    //     // hiddenVdeoRef.current.play();

    // }

    const exportVideo = () => {
        setIsExporting(true);

        if (file.type.startsWith('video/')) {
            videoRef.current.currentTime = 0;
            startRecording();
            videoRef.current.play();
        } else if (file.type.startsWith('image/')) {
            const canvasDataURL = canvas.toDataURL('image/png');

            base64ToFIle(canvasDataURL).then((img) => {
                // const img = new Image();
                //  img.src = canvasDataURL;
                setFinalVideoBlob(img);
                setPreviewUrl(canvasDataURL);
                setIsPreview(true);
                setIsExporting(false);
            });
        }
    };

    const videoEnded = () => {
        if (isRecording) {
            stopRecording();
            setIsExporting(false);
        }
    };

    const updateProgress = () => {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const calculatedProgress: any = (currentTime / duration) * 100;
        setProgress(parseInt(calculatedProgress));
    };

    return (
        <div className="w-[100%] relative h-[100vh]  flex flex-col justify-center items-center pt-[5rem]">
            {isExporting ? (
                <div className="w-[100%]  justify-center items-center h-[100vh]  flex bg-[rgb(255, 59, 92)77] absolute top-0 left-0 z-20">
                    <p className="text-[10rem] text-[white] "> {progress}%</p>
                </div>
            ) : (
                ''
            )}

            <div className="w-[25rem] flex justify-between py-2">
                <div className="flex justify-start items-center gap-[1rem]">
                    <BasicSwitch
                        checked={allowDownload || false}
                        onChange={(e: any) => setAllowDownload(e?.target?.checked)}
                    />

                    <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                        Video downloads
                    </p>
                </div>
                <button className="py-2 bg-[rgb(255, 59, 92)] text-" onClick={exportVideo}>
                    Done
                </button>
            </div>
            <div className="flex  w-[28rem]   min-w-[30%] h-[650px] bg-custom-light xl:w-[31.5rem] rounded-[0.5rem] ">
                <div className="flex flex-col gap-[2rem] pt-[1rem] border items-center w-[70px] h-[600px] ">
                    <span className={styles.spanBtn} onClick={rect}>
                        <RectangleIcon />
                    </span>
                    <span className={styles.spanBtn} onClick={text}>
                        <TextIcon />
                    </span>

                    <span className={styles.spanBtn} onClick={play}>
                        {paused ? <PlayIcon /> : <Pause />}
                    </span>

                    <span className={styles.spanBtn} onClick={toggleVolume}>
                        {muted ? <MutedIcon /> : <SpeakerIcon />}
                    </span>

                    <span className={styles.spanBtn}>
                        <AtTheRate />
                    </span>
                    {/* <span className={styles.spanBtn} onClick={exportVideo}>export</span> */}

                    {/* <button onClick={startRecording}>Start Recording</button>
                    <button onClick={stopRecording}>Stop Recording</button> */}
                    <input
                        type="color"
                        style={{ width: '20px', height: '20px' }}
                        onChange={handleColorChange}
                    />
                    <input
                        type="color"
                        style={{ width: '20px', height: '20px' }}
                        onChange={handleBGColorChange}
                    />
                </div>

                <div
                    // style={{ border: '1px dashed #BABABA' }}
                    className="rounded-[0.5rem] h-[600px] flex-1 flex justify-center relative items-center"
                >
                    <video
                        ref={videoRef}
                        className="top-0 left-0 z-0"
                        width="350"
                        height="600"
                        autoPlay
                        style={{ width: '100%', height: '100%' }}
                        onTimeUpdate={updateProgress}
                        onEnded={videoEnded}
                        preload="auto"
                        playsInline
                    ></video>

                    <img src="" />
                    <div className="canvas-wrapper w-[100%] h-[100%] absolute top-0 left-0 z-10">
                        <canvas className="canv" id="canvas" width="350" height="600"></canvas>
                    </div>
                    <div className="flex border relative flex-col items-center gap-[0.5rem]"></div>
                </div>
            </div>
            <div className="w-[25rem] h-[5px] flex justify-end py-2 border"></div>
            {isPreview ? (
                <StoryPreview
                    isPosting={isPosting}
                    open={isPreview}
                    url={previewUrl}
                    onCancel={() => {
                        setIsPreview(false);
                    }}
                    onPost={() => {
                        postStory();
                    }}
                />
            ) : (
                ''
            )}
             <ToastContainer />
        </div>
    );
};

export default StoryEditor;
