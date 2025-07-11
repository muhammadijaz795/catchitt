import { ClickAwayListener, IconButton, Modal } from '@mui/material';
import style from './forwardUsers.module.scss';
import { useEffect, useState } from 'react';
import { avatar, duet, sendSvgPopup,defaultAvatar } from '../../../icons';
import Search from '../../navbar/components/Search';
import { get, post } from '../../../axios/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';


function Forwardusers(props: any) {
    const { onOpen, onClose, videoLink,videoThumbnail } = props || {};
    console.log('video link in forward users', videoLink);  
    console.log(videoLink);
    const [loading, setLoading] = useState<any>(false);
    const API_URL = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [selecedUsers, setSelecedUsers] = useState<any[]>([]);
    const [users, setusers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Track selected user IDs
    const [messageText, setMessageText] = useState('');
    const { t, i18n } = useTranslation();
    const { videoUrl } = useSelector(
        (state: any) => state?.reducers?.videoUrl
    );
    const currentPost = useSelector((state: any) => state?.reducers?.currentPost);

    interface Languages {
                code: string;
                name: string;
                country_code: string;
    }
        
    const languages: Languages[] = [
        {
            code: 'en',
            name: 'English',
            country_code: 'gb',
        },
        {
            code: 'ar',
            name: 'العربية',
            country_code: 'sa',
        },
    ];

  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t, i18n } = useTranslation();


    console.log('video url Hello', videoUrl);
    console.log(currentPost);

    console.log('videoLink');
    console.log(videoLink);
    // Add these new handlers
    const handleCheckboxChange = (userId: string) => {
        setSelectedUsers(prev => 
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleBulkSend = async () => {
        try {
            for (const userId of selectedUsers) {
                await handleMessage(userId, videoLink);
            }
            onClose(); // Close modal after sending
        } catch (error) {
            console.log('Error sending messages:', error);
        }
    };


    const getFriends = async () => {
        const url = `${API_URL}/profile/${userId}/friends?page=1&pagesize=20`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();
            // setusers(data.data.data.users);
            console.log('Friends:', res.data.data)
            const userData = res.data.data;
            setusers(userData);
            setSelecedUsers(userData);
            // userData.forEach((element:any) => {
            //     console.log(element);
            //     setusers(element.users[1]);
            //   }); 
        } catch (error) { 
            console.error('Error making POST request:', error);
        }
    };
    
        const handleMessage = async (friendId:any, videoLink:any) => {
        console.log("handleMessage", userId)
            try {
                let newVideoUrl = videoUrl || videoLink;
                    const result = await post(`/chat/messages`,{
                        type: 'application/json',
                        data: {
                            from: userId,
                            to: friendId,
                            message: `${messageText} ${newVideoUrl}`, // Combine text and video link,
                        },
                    });
                    if (result?.data) {
                        console.log("Message sent");
                    }
            } catch (error) {
                console.log(error);
            }
        };
    
    // const selectUserHandler = (receivedUser: any) => {
    //     if (selecedUsers.find((user: any) => user?.id === receivedUser?.id)) {
    //         let filterData: any = selecedUsers.filter((user: any) => user?.id !== receivedUser?.id);
    //         setSelecedUsers(filterData);
    //     } else {
    //         setSelecedUsers([...selecedUsers, receivedUser]);
    //     }
    // };

    const onchangeH = (e: any) => {
        if (e.length > 0) {
            const filteredUsers: any[] = users?.filter((user: any) =>
                user?.followed_userID?.name?.toLowerCase().includes(e.toLowerCase())
            );
            console.log('filteredUsers')
            setusers(filteredUsers);
        } else {
            console.log('setusers')
            setusers(selecedUsers);
        }
    };
    
    useEffect(() => {
        getFriends();
    }, []);

    return (
        <Modal
            open={onOpen}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '400px', margin: 'auto' }}
        >
            <ClickAwayListener onClickAway={onClose}>
                <div className={style.parent} >
                    <div className={style.modalHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px' }}>
                        <h1 className='text-black font-bold h5'>{t('SendTofriends.text')}</h1>
                        <button onClick={onClose} className='border-0 p-0'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.35 6.06095C19.4432 5.96726 19.4954 5.84054 19.4954 5.70845C19.4954 5.57635 19.4432 5.44963 19.35 5.35595L18.65 4.64595C18.6035 4.59908 18.5482 4.56188 18.4873 4.5365C18.4264 4.51112 18.361 4.49805 18.295 4.49805C18.229 4.49805 18.1637 4.51112 18.1027 4.5365C18.0418 4.56188 17.9865 4.59908 17.94 4.64595L12 10.5859L6.06003 4.65095C5.96635 4.55782 5.83962 4.50555 5.70753 4.50555C5.57544 4.50555 5.44871 4.55782 5.35503 4.65095L4.64503 5.36095C4.5519 5.45463 4.49963 5.58135 4.49963 5.71345C4.49963 5.84554 4.5519 5.97226 4.64503 6.06595L10.585 12.0009L4.65003 17.9409C4.5569 18.0346 4.50463 18.1614 4.50463 18.2934C4.50463 18.4255 4.5569 18.5523 4.65003 18.6459L5.36003 19.3559C5.45371 19.4491 5.58044 19.5013 5.71253 19.5013C5.84462 19.5013 5.97135 19.4491 6.06503 19.3559L12 13.4159L17.94 19.3509C18.0337 19.4441 18.1604 19.4963 18.2925 19.4963C18.4246 19.4963 18.5513 19.4441 18.645 19.3509L19.355 18.6409C19.4482 18.5473 19.5004 18.4205 19.5004 18.2884C19.5004 18.1564 19.4482 18.0296 19.355 17.9359L13.415 12.0009L19.35 6.06095Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <div className={style.serachBar}>
                        <Search
                            onInputChangeHandler={onchangeH}
                            placeholder={t('Searchaccountsandvideos.text')}
                        />
                    </div>
                    <div className={style.users}>
                        <p className='text-xs pb-2 text-[#16182380]'>{t('All.text')}</p>

                        {users.map((user: any, i: number) => {
                            const userId = user?.followed_userID?._id;
                            return (
                                <div key={i} className={style.user}>
                                                    {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

                                    <div className={style.sec1}>
                                        <img src={user?.followed_userID?.avatar || defaultAvatar} alt=""  onError={(e) => {
                                            (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                            (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                        }} />
                                        <p>{user?.followed_userID?.name}</p>
                                    </div>
                                    <div className={style.btns}>
                                        {/* <button className={style.btn1}>
                                            <img src={duet} alt="" />
                                            Duet
                                        </button> */}
                                        {/* <button className={style.primaryBtn} onClick={()=>handleMessage(user?.followed_userID?._id, videoLink)}>
                                            <img src={sendSvgPopup} alt="" />
                                            Send
                                        </button> */}

                                            {/* <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(userId)}
                                            onChange={() => handleCheckboxChange(userId)}
                                        /> */}
                                            <label className={style.checkboxContainer}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(userId)}
                                                    onChange={() => handleCheckboxChange(userId)}
                                                />
                                                <span className={style.customCheckbox}></span>
                                            </label>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={style.footer}>
                        <div className='d-flex justify-between'>
                            <div className={style.messageInput}>
                                <textarea
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder={t('addamessagetoyourvideo.text')}
                                    rows={3}
                                />
                                
                            </div>
                            <div className={style.forwardVIMG}>
                                <img  src={currentPost?.thumbnailUrl || videoThumbnail} alt="" />
                            </div>
                        </div>
                        <button 
                        style={{width: '95%',marginTop: '5%',marginLeft: '2%'}}
                            className={style.primaryBtn} 
                            onClick={handleBulkSend}
                            disabled={selectedUsers.length === 0}
                        >
                            {/* <img src={sendSvgPopup} alt="" /> */}
                            {t('Send.text')} ({selectedUsers.length})
                        </button>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    );
}

export default Forwardusers;
