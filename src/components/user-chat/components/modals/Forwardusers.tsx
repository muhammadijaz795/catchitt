import { CircularProgress, ClickAwayListener, Modal } from '@mui/material';
import { avatar, defaultAvatar } from '../../../../icons';
import Search from '../../../../shared/navbar/components/Search';
import style from './forwardUsers.module.scss';
import { useEffect, useState } from 'react';
import { API_KEY } from '../../../../utils/constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUpdateEffect } from 'react-use';

function Forwardusers(props: any) {
    const token = localStorage.getItem('token');
    const loggedUserId = localStorage.getItem('userId');

    const { onOpen, onClose, forwardNow } = props || {};
    const [selecedUsers, setSelecedUsers] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([])

    const [users, setusers] = useState<any>({ items: [], page: 1, pageSize: 10, totalItems: null });

    const selectUserHandler = (receivedUser: any) => {
        if (selecedUsers.find((user: any) => user?.userId === receivedUser?.userId)) {
            let filterData: any = selecedUsers.filter((user: any) => user?.userId !== receivedUser?.userId);
            setSelecedUsers(filterData);
        } else {
            setSelecedUsers([...selecedUsers, receivedUser]);
        }
    };

    const onchangeH = (e: any) => {
        if (e.length > 0) {
            const filteredUsers: any[] = data?.filter((user: any) =>
                user?.userName?.toLowerCase().includes(e.toLowerCase())
            );
            setusers((prev: any) => ({
                ...prev,
                items: filteredUsers
            }));
        } else {
            setusers((prev: any) => ({
                ...prev,
                items: data
            }));
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_KEY}/chat/conversation?page=${users.page}&pageSize=${users.pageSize}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.json();
            const tempArr: any[] = [];
            res.data.data.forEach((chats: any) => {
                if (chats.isBlocked) return;
                tempArr.push({
                    userId: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?._id : chats?.users[1]?._id,
                    userName: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?.name : chats?.users[1]?.name, //chats?.users[1]?.name,
                    userImage: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?.avatar : chats?.users[1]?.avatar,
                });
            })
            setData((prev) => ([...prev, ...tempArr]))
            setusers((prev: any) => ({
                ...prev,
                items: [...prev.items, ...tempArr],
                page: prev.page + 1,
                totalItems: res.data.total,
            }))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (onOpen) {
            fetchUsers();
        } else {
            setusers({ items: [], page: 1, pageSize: 10, totalItems: null });
            setData([]);
            setSelecedUsers([])
        }
    }, [onOpen])

    useUpdateEffect(() => {
        console.log(users);
    }, [users])

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
                    <div id='scrollableForwardDiv' className={`${style.users} overflow-y-auto no-scrollbar`}>
                        <InfiniteScroll
                            dataLength={users.items?.length}
                            next={fetchUsers}
                            hasMore={users.items.length < users.totalItems || users?.totalItems === null}
                            loader={<div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '1rem',
                                    width: 'inherit',
                                }}
                            >
                                <CircularProgress />
                            </div>}
                            className="mb-20"
                            // scrollThreshold={0.6}
                            scrollableTarget="scrollableForwardDiv"
                            endMessage={
                                <div className={`flex justify-center items-center mt-8 m-auto`}>
                                    <p className="text-dark font-bold text-xl">
                                        {(() => {
                                            if (users?.totalItems === 0) return 'Start a conversation first.';
                                            if (users.totalItems === undefined) return 'Something went wrong. Please refresh the page.';
                                        })()}
                                    </p>
                                </div>
                            }
                        >
                            {users.items.map((user: any, i: number) => {
                                return (
                                    <div key={i} className={style.user}>
                                        <div className={style.sec1}>
                                            <input
                                                onChange={() => selectUserHandler(user)}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    background: 'rgb(255, 59, 92)',
                                                    borderRadius: 4,
                                                    cursor: 'pointer',
                                                    margin: '1rem',
                                                    marginRight: '0rem',
                                                }}
                                                type="checkbox"
                                                checked={selecedUsers.some((sUser:any)=>sUser.userId===user.userId)}
                                            />
                                            <img src={user.userImage || defaultAvatar} alt="" />
                                            <p>{user?.userName}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </InfiniteScroll>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            {selecedUsers.map((user: any, index: number) => {
                                return (
                                    <span className={style.text_500}>
                                        {user.userName}
                                        {selecedUsers?.length === index + 1 ? '' : ' , '}
                                    </span>
                                );
                            })}
                            {/* <p className={style.text_400}>Mohamed Forag</p> */}
                        </div>
                        <button
                            onClick={() => forwardNow(selecedUsers)}
                            className={style.primaryBtn}
                            style={{ position: 'relative', zIndex: 1, cursor: 'pointer' }}
                        >
                            Forward
                        </button>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    );
}

export default Forwardusers;
