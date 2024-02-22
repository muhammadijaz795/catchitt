import { ClickAwayListener, Modal } from "@mui/material";
import { TopBar } from "../top-bar/top-bar";
import SelectFile from "./components/selectFile";
import UploadFile from "./components/uploadFile";
import { useEffect, useState } from "react";
import style from './uploadSec.module.scss'
import { useAuthStore } from "../../store/authStore";
import defaultProfileIcon from '../../assets/defaultProfileIcon.png';
import Navbar from "../../shared/navbar";
1

export default function UploadSec() {
    const [postModal, setpostModal] = useState(false)
    const [locationsModal, setLocationsModal] = useState(false)
    const [discardModal, setdiscardModal] = useState(false)
    const [usersModal, setusersModal] = useState(false)
    const [replaceVideo, setreplaceVideo] = useState(false)
    const [uploadFilePage, setuploadFilePage] = useState(false)
    const [leaveSite, setleaveSite] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [videoData, setVideoData] = useState<any>({})
    const [files, setfiles] = useState()
    const [randomAccs, setRandomAccs] = useState([])
    const [allusers, setAllUsers] = useState([])
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);

    function selectFile() {
        var fileInput: any = document.getElementById('fileInput')?.click();
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
                setRandomAccs(getRandomAccounts(responseData.data.data, 4))
                setAllUsers(responseData.data.data)
            }
        } catch (error) {
            // console.error(error);
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    const valueHandler = (e: any) => {
        var file = e.target.files[0];
        if (file) {
            console.log(e.target.files[0]);
            setfiles(file)
        } else {
            alert('something went wrong')
        }
    }


    const postVideoH = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
                body: videoData
            });

            if (response.ok) {
                const responseData = await response.json();
                setRandomAccs(getRandomAccounts(responseData.data.data, 4))
                setAllUsers(responseData.data.data)
                alert('suceeded')
            }
        } catch (error) {
            // console.error(error);
            alert('failed')
            console.log(error);
        }
    }

    return (
        <div className={style.parent}>
            <Navbar />
            {
                uploadFilePage ?
                    <UploadFile
                        showlocationsModal={() => setLocationsModal(true)}
                        showUsersModal={() => setusersModal(true)}
                        showPostModal={() => setpostModal(true)}
                        showDiscardModal={() => setdiscardModal(true)}
                        replaceVideo={() => setreplaceVideo(true)}
                        user={selectedUser}
                        submitH={(e: any) => {
                            setVideoData({ ...e, tags: selectedUser })
                            postVideoH()
                        }}
                    /> : <SelectFile pageIndicator={(value: any) => {
                        setuploadFilePage(value)
                    }} />
            }
            <Modal open={postModal}>
                <ClickAwayListener onClickAway={() => setpostModal(false)}>
                    <div className={style.postModal}>
                        <p>Are you sure you want to cancel?</p>
                        <div className={style.BTNS}>
                            <button onClick={() => setpostModal(false)} style={{ background: '#5448B2', color: '#FFF' }}>Yes, start over</button>
                            <button onClick={() => setpostModal(false)} >Continue uploading</button>
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
                            <button onClick={() => {
                                setdiscardModal(false)
                                setleaveSite(true)
                            }} style={{ background: '#5448B2', color: '#FFF' }}>Discard</button>
                            <button onClick={() => setdiscardModal(false)} >Continue editing</button>
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
                            <div className={style.location}>
                                <p>Alexandria, Egypt</p>
                                <p>Egypt, Alexandria, Egypt</p>
                            </div>
                            <div className={style.location}>
                                <p>Alexandria, Egypt</p>
                                <p>Egypt, Alexandria, Egypt</p>
                            </div>
                            <div className={style.location}>
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
                            <input type="search" placeholder="Search" onChange={(e) => {
                                if (e.target.value.length <= 0) {
                                    setRandomAccs(allusers.slice(0, 4))
                                } else {
                                    const arr = allusers.filter((item: any) => {
                                        if (item?.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                                            return item
                                        }
                                    })
                                    setRandomAccs(arr)
                                }
                            }} />
                        </div>
                        <div className={style.users}>
                            {
                                randomAccs.map((user: any, i: number) => {
                                    return (
                                        <div className={style.user} onClick={() => {
                                            setSelectedUser(user)
                                            setusersModal(false)
                                        }}>
                                            <img src={user?.avatar || defaultProfileIcon} alt="" />
                                            <p>{user?.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={replaceVideo}>
                <ClickAwayListener onClickAway={() => setreplaceVideo(false)}>
                    <div className={style.postModal}>
                        <p>Replace this video?</p>
                        <p className={style.text4}>Caption and video settings will still be saved.
                        </p>
                        <div className={style.BTNS}>
                            <button onClick={() => {
                                setreplaceVideo(false)
                                selectFile()
                            }} style={{ background: '#5448B2', color: '#FFF' }}>Replace</button>
                            <button onClick={() => setreplaceVideo(false)} >Continue editing</button>
                            <input id="fileInput" onChange={valueHandler} type="file" style={{ display: 'none' }} />
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={leaveSite}>
                <ClickAwayListener onClickAway={() => setleaveSite(false)}>
                    <div className={style.postModal}>
                        <p>Leave site?</p>
                        <p className={style.text4}>Changes you made may not be saved.
                        </p>
                        <div className={style.BTNS}>
                            <button onClick={() => setleaveSite(false)} style={{ background: '#5448B2', color: '#FFF' }}>Leave</button>
                            <button onClick={() => setleaveSite(false)} >Cancel</button>
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>

        </div>
    )
}
