import { ClickAwayListener, Modal } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import defaultProfileIcon from '../../assets/defaultProfileIcon.png';
import Navbar from '../../shared/navbar';
import SelectFile from './components/selectFile';
import UploadFile from './components/uploadFile';
import style from './uploadSec.module.scss';
import { VideoToFrames, VideoToFramesMethod } from '../../utils/videoToFrame';
import { get, post } from '../../axios/axiosClient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateUploadingStatus } from '../../redux/reducers/upload';
// import video from '../../../assets/video.mp4'

export default function UploadSec() {
    const [postModal, setpostModal] = useState(false);
    const [locationsModal, setLocationsModal] = useState(false);
    const [discardModal, setdiscardModal] = useState(false);
    const [usersModal, setusersModal] = useState(false);
    const [replaceVideo, setreplaceVideo] = useState(false);
    const [uploadFilePage, setuploadFilePage] = useState(false);
    const [leaveSite, setleaveSite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [videoData, setVideoData] = useState<any>({});
    const [files, setfiles] = useState<any>();
    const [randomAccs, setRandomAccs] = useState([]);
    const [allusers, setAllUsers] = useState([]);
    const API_KEY = process.env.VITE_API_URL;
    const token = useSelector((state: any) => state?.reducers?.profile?.token);
    const [selectedLocations, setselectedLocations] = useState('');
    const [images, setImages] = useState<any>([]);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const inputElement: any = useRef();

    function selectFileHandler() {
        inputElement?.current?.click();
    }
    const getRandomAccounts = (arr: any, count: number) => {
        const shuffled = arr.slice(); // Create a copy of the array to avoid modifying the original one
        let i = arr.length;
        let temp;
        let index;

        while (i > 0) {
            index = Math.floor(Math.random() * i);
            i--;

            // Swap elements between the current index and the randomly selected index
            temp = shuffled[i];
            shuffled[i] = shuffled[index];
            shuffled[index] = temp;
        }

        return shuffled.slice(0, count); // Return the first 'count' elements
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/public/suggested-users?page=1`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setRandomAccs(getRandomAccounts(responseData.data.data, 4));
                setAllUsers(responseData.data.data);
            }
        } catch (error) {
            // console.error(error);
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const valueHandler = (e: any) => {
        let file = e.target.files[0];
        if (file) {
            if (file?.name.includes('.mp4')) {
                setfiles(file);
            } else {
                console.log('Selected File Is Not MP4');
            }
        } else {
            console.log('Something went wrong');
        }

        setreplaceVideo(false);
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const postVideoH = async (state: any) => {
        setLoading(true);
        const { data: getVideoLinks }: any = await get('/media-content/request-video-upload');
        let videoURLindex = getVideoLinks?.data?.videoUrl?.indexOf('.mp4');
        let videoURL = getVideoLinks?.data?.videoUrl?.slice(0, videoURLindex);
        let thumbnailURLindex = getVideoLinks?.data?.thumbnailUrl?.indexOf('.png');
        let thumbnailURL = getVideoLinks?.data?.thumbnailUrl?.slice(0, thumbnailURLindex);

        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        const payload = new FormData();
        // console.log(videoURL);

        payload.append('videoId', getVideoLinks?.data?.videoId);
        payload.append('videoUrl', `${videoURL}.mp4`);
        payload.append('thumbnailUrl', `${thumbnailURL}.png`);
        payload.append('category', state?.category);
        payload.append('description', state?.caption);
        payload.append('isOnlyMe', state?.private);
        // payload.append('taggedUsers', [selectedUser]);
        payload.append('place', selectedLocations);
        payload.append('allowDuet', state?.duet);
        payload.append('allowDownload', state?.downloadible);
        // payload.append('replyOnComment', state?.comments);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
            redirect: 'follow',
        };
        // @ts-ignore
        fetch('https://stagingback.seezitt.com/media-content/directly-from-s3', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log('Video Successfully Posted');
                setLoading(false);
                navigate('/home');
            })
            .catch((error) => console.error('Something Went Wrong'));

        // Create an instance of FormData
        // const formData = new FormData();
        // const formDataForImage = new FormData();

        // Append the file to the FormData instance
        // formData.append('file', files);
        // formDataForImage.append('file', state?.thumbnail);

        // Set the headers for the PUT request
        // const headers = {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/octet-stream', // Binary data type
        // };

        // Send the PUT request with axios
        // await axios({
        //     method: 'put',
        //     url: getVideoLinks?.data?.videoUrl, // Replace with your API endpoint
        //     headers: headers,
        //     data: formData,
        // });
        // await axios({
        //     method: 'put',
        //     url: getVideoLinks?.data?.thumbnailUrl, // Replace with your API endpoint
        //     headers: headers,
        //     data: formDataForImage,
        // });

        dispatch(
            updateUploadingStatus({
                videos: 0,
                isUploading: true,
            })
        );

        setTimeout(() => {
            dispatch(
                updateUploadingStatus({
                    videos: 0,
                    isUploading: false,
                })
            );
        }, 5000);
    };

    const locationHandler = () => {
        setLocationsModal(false);
        setselectedLocations('Egypt, Alexandria, Egypt');
    };

    const onInput = async () => {
        setImages([]);
        setLoadingStatus(true);

        const fileUrl = URL.createObjectURL(files);
        const frames = await VideoToFrames.getFrames(fileUrl, 10, VideoToFramesMethod.totalFrames);

        setLoadingStatus(false);
        setImages(frames);
    };

    useEffect(() => {
        if (files) {
            setuploadFilePage(true);
            onInput();
        } else {
            setuploadFilePage(false);
        }
    }, [files]);

    return (
        <div className={style.parent}>
            <Navbar />
            {uploadFilePage ? (
                <UploadFile
                    showlocationsModal={() => setLocationsModal(true)}
                    showUsersModal={() => setusersModal(true)}
                    showPostModal={() => setpostModal(true)}
                    showDiscardModal={() => setdiscardModal(true)}
                    replaceVideo={() => setreplaceVideo(true)}
                    user={selectedUser}
                    submitH={(e: any) => {
                        setVideoData({ ...e, tags: selectedUser });
                        postVideoH({ ...e, tags: selectedUser });
                    }}
                    selectedLocation={selectedLocations}
                    selectedUsers={selectedUser}
                    images={images}
                    loading={loadingStatus}
                    file={files}
                    selectFileHandler={selectFileHandler}
                    btnLoading={loading}
                />
            ) : (
                <SelectFile setfile={setfiles} />
            )}
            <Modal open={postModal}>
                <ClickAwayListener onClickAway={() => setpostModal(false)}>
                    <div className={style.postModal}>
                        <p>Are you sure you want to cancel?</p>
                        <div className={style.BTNS}>
                            <button
                                onClick={() => setpostModal(false)}
                                style={{ background: '#5448B2', color: '#FFF' }}
                            >
                                Yes, start over
                            </button>
                            <button onClick={() => setpostModal(false)}>Continue uploading</button>
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={discardModal}>
                <ClickAwayListener onClickAway={() => setdiscardModal(false)}>
                    <div className={style.postModal}>
                        <p>Discard this post?</p>
                        <p className={style.text4}>The video and all edits will be discarded.</p>
                        <div className={style.BTNS}>
                            <button
                                onClick={() => {
                                    setdiscardModal(false);
                                    setleaveSite(true);
                                }}
                                style={{ background: '#5448B2', color: '#FFF' }}
                            >
                                Discard
                            </button>
                            <button onClick={() => setdiscardModal(false)}>Continue editing</button>
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={locationsModal}>
                <ClickAwayListener onClickAway={() => setLocationsModal(false)}>
                    <div className={style.userModal}>
                        <div className={style.searchBar}>
                            <img src="../../../public/images/icons/uploadSEc/Search.svg" alt="" />
                            <input type="search" placeholder="Search" />
                        </div>
                        <div className={style.locations}>
                            <div onClick={locationHandler} className={style.location}>
                                <p>Alexandria, Egypt</p>
                                <p>Egypt, Alexandria, Egypt</p>
                            </div>
                            <div onClick={locationHandler} className={style.location}>
                                <p>Alexandria, Egypt</p>
                                <p>Egypt, Alexandria, Egypt</p>
                            </div>
                            <div onClick={locationHandler} className={style.location}>
                                <p>Alexandria, Egypt</p>
                                <p>Egypt, Alexandria, Egypt</p>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={usersModal}>
                <ClickAwayListener onClickAway={() => setusersModal(false)}>
                    <div className={style.userModal}>
                        <div className={style.searchBar}>
                            <img src="../../../public/images/icons/uploadSEc/Search.svg" alt="" />
                            <input
                                type="search"
                                placeholder="Search"
                                onChange={(e) => {
                                    if (e.target.value.length <= 0) {
                                        setRandomAccs(allusers.slice(0, 4));
                                    } else {
                                        const arr = allusers.filter((item: any) => {
                                            if (
                                                item?.name
                                                    .toLowerCase()
                                                    .includes(e.target.value.toLowerCase())
                                            ) {
                                                return item;
                                            }
                                        });
                                        setRandomAccs(arr);
                                    }
                                }}
                            />
                        </div>
                        <div className={style.users}>
                            {randomAccs.map((user: any, i: number) => {
                                return (
                                    <div
                                        className={style.user}
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setusersModal(false);
                                        }}
                                    >
                                        <img src={user?.avatar || defaultProfileIcon} alt="" />
                                        <p>{user?.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={replaceVideo}>
                <ClickAwayListener onClickAway={() => null}>
                    <div className={style.postModal}>
                        <p>Replace this video?</p>
                        <p className={style.text4}>
                            Caption and video settings will still be saved.
                        </p>
                        <div className={style.BTNS}>
                            <button
                                onClick={() => {
                                    selectFileHandler();
                                }}
                                style={{ background: '#5448B2', color: '#FFF' }}
                            >
                                Replace
                            </button>
                            <button onClick={() => setreplaceVideo(false)}>Continue editing</button>
                            <input
                                ref={inputElement}
                                onChange={valueHandler}
                                type="file"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={leaveSite}>
                <ClickAwayListener onClickAway={() => setleaveSite(false)}>
                    <div className={style.postModal}>
                        <p>Leave site?</p>
                        <p className={style.text4}>Changes you made may not be saved.</p>
                        <div className={style.BTNS}>
                            <button
                                onClick={() => setleaveSite(false)}
                                style={{ background: '#5448B2', color: '#FFF' }}
                            >
                                Leave
                            </button>
                            <button onClick={() => setleaveSite(false)}>Cancel</button>
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
        </div>
    );
}
