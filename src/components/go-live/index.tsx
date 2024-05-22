import Navbar from '../../shared/navbar';
import { camera, seezittLogo, cameraThumbnail, chevronToggle } from '../../icons';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
// import protooClient from 'protoo-client';

function GoLive() {
    const [isRotated, setIsRotated] = useState(false);
    const socketRef = useRef();
    const token = localStorage.getItem('token');
    const SERVER_URL = `https://staginglive1.seezitt.com/?token=${token}`;
    const handleToggleRotation = () => {
        setIsRotated(!isRotated);
    };
    let localstream: { getTracks: () => any[] };
    const [permissionState, setPermissionState] = useState(false);

    useEffect(() => {
        // startSocket();
        // return () => {
        //     if (socketRef.current as any) {
        //         (socketRef.current as any).disconnect();
        //     }
        // };
    });

    useEffect(() => {
        // Connect to the WebSocket server
        const socket = io('wss://staginglive1.seezitt.com');

        // Handle connection events
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');

            // Authenticate with token
            const token = 'your_token_here';
            socket.emit('authenticate', { token });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Handle incoming stream data
        socket.on('stream_data', (data) => {
            console.log('Received stream data:', data);
            // Process the stream data as needed
        });

        return () => {
            // Disconnect from WebSocket server when component unmounts
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Connect to the WebSocket server
        const socket = io('wss://staginglive1.seezitt.com');

        // Handle connection events
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');

            // Authenticate with token
            const token = 'your_token_here';
            socket.emit('authenticate', { token });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Handle incoming stream data
        socket.on('stream_data', (data) => {
            console.log('Received stream data:', data);
            // Process the stream data as needed
        });

        return () => {
            // Disconnect from WebSocket server when component unmounts
            socket.disconnect();
        };
    }, []);

    function startSocket() {
        console.log("Here");
        if ((socketRef.current as any) && (socketRef.current as any).connected) {
            console.log('Socket already connected.');
            console.log("Here Inside");
            return;
        }
        (socketRef.current as any) = io(SERVER_URL, {
            transports: ['websocket'],
        });
        // const transport = new protooClient.WebSocketTransport(SERVER_URL);

        // console.log('Transport : ', transport);
    }

    const handlePermissionRequest = async () => {
        let vid = document.getElementById('vid');

        if (navigator.mediaDevices.getUserMedia !== null) {
            var options = {
                video: true,
                audio: true,
            };
            navigator.getUserMedia(
                options,
                function (stream: any) {
                    vid.srcObject = stream;
                    localstream = stream;
                    vid.play();
                    console.log(stream, 'streaming');
                    setPermissionState(true);
                },
                function (e: { name: string }) {
                    setPermissionState(false);
                    console.log('background error : ' + e.name);
                }
            );
        }
    };

    const capOff = () => {
        let vid = document?.getElementById('vid');
        if (vid) {
            vid.pause();
            vid.src = '';
        }
        localstream?.getTracks()?.forEach((x: { stop: () => any }) => x.stop());
        console.log('all capture devices off');
    };

    const camON = () => {
        let vid = document.getElementById('vid');
        if (navigator.mediaDevices.getUserMedia !== null) {
            var options = {
                video: true,
                audio: true,
            };
            navigator.getUserMedia(
                options,
                function (stream: any) {
                    vid.srcObject = stream;
                    localstream = stream;
                    vid.play();
                    console.log(stream, 'streaming');
                },
                function (e: { name: string }) {
                    console.log('background error : ' + e.name);
                }
            );
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Navbar />
            <div className="w-[71.25rem] h-[35.125rem] bg-white mt-40 rounded-lg text-left p-8">
                <div className="flex flex-row items-center justify-between">
                    <p className="font-semibold text-xl text-[#222222]">Go LIVE</p>
                    <div className="bg-[#5448B2] py-0 px-4 rounded-md w-[10.25rem] h-12 flex justify-center items-center cursor-pointer">
                        <p className="font-semibold text-base text-white">Go LIVE</p>
                    </div>
                </div>
                <div className="  flex items-center flex-col ">
                    <div
                        className={`bg-black w-[67.25rem] flex h-full justify-center container my-2 ${
                            permissionState ? 'visible' : 'hidden'
                        }`}
                    >
                        <video id="vid" autoPlay></video>
                    </div>
                    {!permissionState && (
                        <div className="h-[26.125rem] w-[67.25rem] bg-[#222222] rounded-lg flex items-center flex-col p-24 mt-8">
                            <img
                                src={camera}
                                alt="camera-icon"
                                className="h-[1.969rem] w-[35rem]"
                            />
                            <h4 className="text-white font-semibold text-xl mt-6">
                                Allow access to camera
                            </h4>
                            <p className="text-[#999999] font-medium text-base mt-6 text-center w-4/5">
                                Your browser is not allowing Live Producer access to your camera. Go
                                to your browser settings and allow camera permission.
                            </p>
                            <div
                                onClick={handlePermissionRequest}
                                className="bg-white py-0 px-4 rounded-md w-[16.938rem] h-12 flex justify-center items-center mt-6 cursor-pointer"
                            >
                                <p className="font-semibold text-base text-[#222222]">Retry</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-[71.25rem] h-[26.5rem] bg-white my-8 rounded-lg text-left p-8">
                <div className="flex flex-row items-center justify-between">
                    <p className="font-semibold text-xl text-[#222222]">Add Title & Topic</p>
                </div>
                <div className="relative h-[13.625rem] w-[67.25rem] bg-[#EEEDF7] rounded-lg flex items-center justify-center flex-col p-24 mt-8">
                    <img
                        src={seezittLogo}
                        alt="seezitt-icon"
                        className="h-[4.281rem] w-[2.928rem]"
                    />
                    <div className="absolute top-5 right-5">
                        <img
                            src={cameraThumbnail}
                            alt="camera-thumbnail"
                            className="h-[2.5rem] w-[2.5rem]"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-3 mt-4">
                    <input
                        type="text"
                        placeholder="Add title to your LIVE (optional)"
                        className="rounded-lg bg-[#F8F8F8] h-[3.5rem] flex-1 px-3"
                    />
                    <div className="rounded-lg bg-[#F8F8F8] h-[3.5rem] flex-1 flex flex-row justify-between items-center pr-3">
                        <input
                            placeholder="Add a topic (optional)"
                            type="text"
                            className="rounded-lg bg-[#F8F8F8] h-[3.5rem] w-full flex-1 px-3"
                        />
                        <img
                            onClick={handleToggleRotation}
                            src={chevronToggle}
                            alt="camera-icon"
                            className={`h-[0.438rem] w-[0.875rem] object-cover cursor-pointer transform transition-transform ${
                                isRotated ? 'rotate-180' : ''
                            }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoLive;
