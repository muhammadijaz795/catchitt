import { ClickAwayListener, Modal } from '@mui/material';
import style from './forwardUsers.module.scss';
import { useEffect, useState } from 'react';
import { avatar, duet, sendSvgPopup } from '../../../icons';
import Search from '../../navbar/components/Search';
import { get, post } from '../../../axios/axiosClient';

function Forwardusers(props: any) {
    const { onOpen, onClose } = props || {};
    const [loading, setLoading] = useState<any>(false);
    const API_URL = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [selecedUsers, setSelecedUsers] = useState<any[]>([]);
    const [users, setusers] = useState<any[]>([]);

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
                    const result = await post(`/chat/messages`,{
                        type: 'application/json',
                        data: {
                            from: userId,
                            to: friendId,
                            message: videoLink,
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
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ClickAwayListener onClickAway={onClose}>
                <div className={style.parent}>
                    <div>
                        <Search
                            onInputChangeHandler={onchangeH}
                            placeholder="Search accounts and videos"
                        />
                    </div>
                    <div className={style.users}>
                        {users.map((user: any, i: number) => {
                            return (
                                <div key={i} className={style.user}>
                                    <div className={style.sec1}>
                                        <img src={user?.followed_userID?.avatar ?? avatar} alt="" />
                                        <p>{user?.followed_userID?.name}</p>
                                    </div>
                                    <div className={style.btns}>
                                        {/* <button className={style.btn1}>
                                            <img src={duet} alt="" />
                                            Duet
                                        </button> */}
                                        <button className={style.primaryBtn} onClick={()=>handleMessage(user?.followed_userID?._id, "ads")}>
                                            <img src={sendSvgPopup} alt="" />
                                            Send
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    );
}

export default Forwardusers;
