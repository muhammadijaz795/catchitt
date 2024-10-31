import React, { useEffect, useRef, useState } from 'react';
// import { useSocket } from '../reusables/SocketContext';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

import Layout from '../../shared/layout';
import UserChats from './components/chats';
import Actions from './components/Actions';
import DoMsg from './components/DoMsg';
import StaredMesagesSec from './components/StaredMesagesSec';

import { avatar, groupDefaultIcon, more, cross } from '../../icons';
// style
import style from './index.module.scss';
import chatHeader from './components/ChatHeader.module.scss';

const ChatComponent = () => {
    // const socket = useSocket();
    
    const API_KEY = process.env.VITE_API_URL;
    const [moreOptions, setMoreOptions] = useState<boolean>(false);
    const [reportPopup, setreportPopup] = useState<boolean>(false);
    const [blockPopup, setblockPopup] = useState<boolean>(false);
    const [editGroupNameModal, setEditGroupNameModal] = useState<boolean>(false);
    const [markTheMsgSafe, setMarkTheMsgSafe] = useState<boolean>(false);
    const [groupOptions, setGroupOptions] = useState<boolean>(false);
    const [smsRef, setSmsRef] = useState<string>('');
    const [smsId, setSmsId] = useState<any>('');
    const [dangetBtnText, setdangetBtnText] = useState<string>('');
    const [noOfDeleteSMS, setnoOfDeleteSMS] = useState<number>(0);
    const [copyModal, setCopyModal] = useState(false);
    const [replySms, setreplysms] = useState<boolean>(false);
    const [forwardModal, setforwardModal] = useState<boolean>(false);
    const [staredmodal, setstaredmodal] = useState<boolean>(false);
    const [searchMessage, showSearchMessage] = useState<boolean>(true);
    const [selectedData, setselectedData] = useState<any[]>([]);
    const [addMembersPopup, setAddMembersPopup] = useState<boolean>(false);
    const [showShortSidebar, setshowShortSidebar] = useState<boolean>(false);
    const [DangerText, setDengerText] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [msgType, setMsgType] = useState<string>('');
    const [activeUser, setActiveUser] = useState<any>({});
    const [activeChat, setActiveChat] = useState<any>({});
    const socketRef = useRef();
    const [users, setUsers] = useState<any[]>([]); // removed dummy user
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [chats, setchats] = useState<any[]>([]);
    const [conversationId, setConversationId] = useState('');
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const token = localStorage.getItem('token');
    const loggedUserId = localStorage.getItem('userId');
    const SERVER_URL = 'https://prodapi.seezitt.com';
    const location = useLocation();
    const valueReceived = location.state?.value;
    const [page, setPage] = useState(1);
    const autoScrolElem: any = useRef(null);
    const [blockToggle, setBlockToggle] = useState(false);
    
    const [staredMsgs, setstaredMsgs] = useState<any[]>([]);
    
    const longPressH = (item: any) => {
        const tempArr: any[] = [];
        activeChat?.chats.forEach((msg: any) => {
            if (msg.id === item.id) {
                tempArr.push({ ...item, emojis: !item.emojis });
            } else {
                tempArr.push({ ...msg, emojis: false });
            }
        });
        setActiveChat({ ...activeChat, chats: tempArr });
    };

    function startSocket() {
        if ((socketRef.current as any) && (socketRef.current as any).connected) {
            console.log('Socket already connected.');
            return;
        }
        (socketRef.current as any) = io(SERVER_URL, {
            // transports: ['websocket'],
            transports: ['websocket'], // Use WebSocket transport
            upgrade: false,            // Prevent transport upgrades
            reconnection: true, // Enable reconnection (default is true)
            reconnectionAttempts: 5, // Number of reconnection attempts before giving up
            reconnectionDelay: 1000, // Time (ms) to wait before trying to reconnect
        });

        (socketRef.current as any).on('connect', () => {
            setIsConnected(true);
            console.log('Connected to socket server.', (socketRef.current as any));
            let addUserObject = {userId:sender, accessToken:token };
            let newAddUserObject = JSON.stringify(addUserObject);
            (socketRef.current as any).emit('add-user', newAddUserObject);
        });
        
        (socketRef.current as any).on('connect_error', (error:any) => {
            console.error('Connection Error:', error);
        });

        (socketRef.current as any).on('disconnect', () => {
            setIsConnected(false);
            console.log('Disconnected from socket server.');
        });
        
        (socketRef.current as any).onclose = (event:any) => {
            console.error('WebSocket closed:', event);
        };

        (socketRef.current as any).on('receive-msg', (message: any) => {
            console.log('receive-msg', message, message.senderId._id);
            console.log('sender', sender);
            console.log('message.senderId._id',  message.senderId._id);
            console.log('activeUser?.userId', activeUser);
            activeUser?.userId
            // if(sender == message.senderId._id){
                console.log('received', message);
                setActiveChat((currentChat: any) => ({
                    ...currentChat,
                    chats: [
                        ...currentChat?.chats,
                        {
                            msg:  message?.message,
                            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                            emojis: false,
                            dropdown: false,
                            id: `${new Date().getTime()}`,
                            isrecevied: true,
                            receiverId: message?.receiverId?._id,
                            stared: message?.isStarred,
                            isRead: message?.isRead,
                            type: message?.type,
                            replysms: false
                        },
                    ],
                }));
            // }
        });

    }
    
    const chatSwitchH = (e: any) => {
        console.log(
            "chatSwitchH"
        );
        
        users?.forEach((user) => {
            if (user?.userId === e) {
                setActiveChat({});
                setSender(user?.senderId);
                setReceiver(user?.receiverId);
                setConversationId(user?.conversationId);
                loadChatMessages(user?.senderId, user?.receiverId, user?.conversationId, user);
                setActiveUser(user);
                markMessageAsSeen(user?.senderId, user?.conversationId);
            }
        });

        setstaredMsgs([]);
    };
    
    const loadChatMessages = async (
        senderId: String | Number,
        receiverId: String | Number,
        conversationId: String | Number,
        user: any
    ) => {
        console.log(senderId, receiverId, conversationId, user)
        try {
            const response = await fetch(
                `${API_KEY}/chat/messages/${conversationId}?page=${page}&pageSize=50`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            res?.data?.data.forEach((element: any, index: number, array: any[]) => {
                const date = new Date(element?.createdTime);
                const messageTimeStamp = moment(date).format('h:mm A');
                setActiveChat((currentChat: any) => {
                    // Condition: Check if a message with the same ID already exists in chats
                   if(currentChat.length > 0){
                    const messageExists = currentChat?.chats.some(
                        (chat: any) => chat.id === element?._id
                    );
                    if (messageExists) return currentChat;
                   }[]
                    // If message exists, return the current state without changes
                    
                    // Otherwise, add the new message to chats
                    return {
                        ...currentChat,
                        userId: user.userId,   // Replace with the desired value
                        userImage: user.userImage,   // Replace with the desired value
                        userName: user.userName,
                        chats: [
                            ...(currentChat?.chats || []),
                            {
                                msg: element?.message,
                                time: messageTimeStamp,
                                emojis: false,
                                dropdown: false,
                                id: element?._id,
                                isrecevied: element?.receiverId?._id === loggedUserId ? false : true,
                                receiverId: element?.receiverId?._id,
                                stared: element?.isStarred,
                                isRead: element?.isRead,
                                type: element?.type,
                                replysms: element?.repliedMessage
                                    ? element?.repliedMessage?.message
                                    : false,
                            },
                        ],
                    };
                });
            });
        } catch (error) {
            console.log('error chat messages', error);
        }
    };
    
    const markMessageAsSeen = (userId: any, conversationId: any) => {
        let newDataObject = JSON.stringify({ userId, conversationId });
        (socketRef.current as any).emit('mark-conversation-as-seen', { userId, newDataObject});
    };

    
    const loadChats = async () => {
        console.log('GET load chat');
        try {
            const response = await fetch(`${API_KEY}/chat/conversation?page=1&pageSize=10`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.json();
            const tempArr: any[] = [];

            res?.data?.data?.forEach(
                (
                    chats: {
                        isBlocked: boolean;
                        lastModifiedTime: string | number | Date;
                        lastMessage: {
                            createdTime: string | number | Date;
                            message: any;
                        };
                        isPinned: any;
                        unReadMsgsCount: any;
                        users: {
                            name: any;
                            _id: any;
                            avatar: any;
                        }[];
                        receiverId: any;
                        _id: any;
                    },
                    index: number
                ) => {
                    let lastMessage = chats?.lastMessage?.message;
                    let isPinned = chats?.isPinned;
                    let unReadMsgsCount = chats?.unReadMsgsCount;
                    let isBlocked = chats?.isBlocked;
                    // Convert milliseconds to date
                    const date = new Date(chats?.lastMessage?.createdTime);

                    // Format the date using moment.js
                    const conversationTimeStamp = moment(date).format('h:mm A');
                    // chats?.users?.forEach((user) => {

                    const isLastIndex = index === res?.data?.data?.length - 1;

                    // if (isLastIndex) markMessageAsSeen(chats?.users[0]?._id, chats?._id);
                    tempArr.push({
                        userId: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?._id: chats?.users[1]?._id,
                        userName: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?.name: chats?.users[1]?.name, //chats?.users[1]?.name,
                        userImage: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?.avatar: chats?.users[1]?.avatar,
                        lastMsg: lastMessage,
                        ispined: isPinned,
                        lastSeen: conversationTimeStamp,
                        unReadMsgs: unReadMsgsCount,
                        senderId: chats?.users[0]?._id,
                        receiverId: chats?.users[1]?._id,
                        conversationId: chats?._id,
                        isBlocked,
                    });
                    // });

                    setUsers(tempArr);
                    // if (index == 0) {
                    //     setSender(chats?.users[0]?._id);
                    //     setReceiver(chats?.users[1]?._id);
                    //     setConversationId(chats?._id);
                    //     loadChatMessages(chats?.users[0]?._id, chats?.users[1]?._id, chats?._id);
                    // }
                }
            );
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };
    
    const valuesH = (item: any, keyName: any) => {
        const tempArr: any[] = [];
        activeChat?.chats.forEach((msg: any) => {
            if (msg.id === item.id) {
                tempArr.push({ ...item, [keyName]: !item[keyName] });
            } else {
                tempArr.push({ ...msg, [keyName]: false });
            }
        });
        setActiveChat({ ...activeChat, chats: tempArr });
    };
    const valuesH2 = (item: any, keyName: any, value: any) => {
        const tempArr: any[] = [];
        activeChat?.chats.forEach((msg: any) => {
            if (msg.id === item.id) {
                tempArr.push({ ...item, [keyName]: value, dropdown: false });
                setMessageAsStared(msg.id, conversationId);
            } else {
                tempArr.push(msg);
            }
        });
        setActiveChat({ ...activeChat, chats: tempArr });
    };
    
    const setMessageAsStared = async (messageId: any, conversationId: string) => {
        try {
            const response = await fetch(`${API_KEY}/chat/messages/star`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ messageId, conversationId }),
            });
            const res = await response.json();
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };
    
    const deleteH = async (item: any) => {
        const tempArr: any[] = [];
        activeChat?.chats.forEach((msg: any) => {
            if (msg.id !== item.id) {
                tempArr.push(msg);
            }
        });
        setActiveChat({ ...activeChat, chats: tempArr });

        try {
            const response = await fetch(
                `${API_KEY}/chat/message/mark-deleted-for-me?messageId=${item?.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
        } catch (error) {
            console.log('Error deleting message', error);
        }
    };
    
    const copyH = (msg: any) => {
        if (msg) {
            navigator.clipboard.writeText(msg).then(() => {
                setCopyModal(true);
            });
        }
        const tempArr: any[] = [];
        activeChat?.chats.forEach((item: any) => {
            tempArr.push({ ...item, dropdown: false });
        });
        setActiveChat({ ...activeChat, chats: tempArr });
    };
    
    const showToast = () => {
        toast.success('🎉 Copied successfully', {
            position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
            autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
        });
    };
    
    const handleScroll = (event: any) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollTop + clientHeight === scrollHeight) {
            // User has scrolled to the bottom
            // loadMoreMessages();
        }
    };
    
    const submitH = (e: any) => {
        // console.log("htting", msg, msgType);
        if (e) {
            e.preventDefault();
        }
        e.stopPropagation();
        const messageData = {
            to: loggedUserId != receiver ? receiver: sender,
            message: msg,
            from: loggedUserId == sender ? sender: sender,
            type: msgType,
            accessToken:token,
        };
        // Get current time
        const currentTime = moment();
        // console.log(messageData)
        // Format the current time using moment.js
        const formattedTime = currentTime.format('h:mm A');
        if (msg.length !== 0) {
            let tempUserArr: any[]=[];
            users?.forEach((user) => {
                if (user?.userId === activeUser?.userId) {
                    tempUserArr.push({
                        ...activeUser,
                        lastMsg: msg,
                    });
                } else {
                    tempUserArr.push(user);
                }
            });
            setUsers(tempUserArr);

            if (smsRef.length > 0) {
                setActiveChat({
                    ...activeChat,
                    chats: [
                        ...activeChat?.chats,
                        {
                            to: loggedUserId != receiver ? receiver: sender,
                            from: loggedUserId == sender ? sender: sender,
                            msg: msg,
                            type: msgType,
                            time: formattedTime,
                            emojis: false,
                            dropdown: false,
                            id: new Date().getTime(),
                            replysms: smsRef,
                        },
                    ],
                });

                // messageData['repliedMessageId'] = smsId;
                // sendMessageReply();
                console.log('messageData', messageData);
                (socketRef.current as any).emit('send-msg', JSON.stringify(messageData));
                setMsg('');
                setMsgType('');
            } else {
                setActiveChat({
                    ...activeChat,
                    chats: [
                        ...activeChat?.chats,
                        {
                            to: loggedUserId != receiver ? receiver: sender,
                            from: loggedUserId == sender ? sender: sender,
                            type: msgType,
                            msg: msg,
                            time: formattedTime,
                            emojis: false,
                            dropdown: false,
                            id: new Date().getTime(),
                        },
                    ],
                });
                console.log('messageData', messageData);
                (socketRef.current as any).emit('send-msg', JSON.stringify(messageData));
                setMsg('');
                setMsgType('');
            }
            // console.log('Current socket : ', socketRef.current);
            setMsg('');
            setMsgType('');
        }
        
        setSmsRef('');
        setSmsId('');
        scrollToBottom();
        setreplysms(false);
    };
    
    const scrollToBottom = () => {
        if (autoScrolElem.current) {
            autoScrolElem.current.scrollTop = autoScrolElem.current.scrollHeight + 300;
        }
    };
    
    useEffect(() => {
        loadChats();
        startSocket();
        console.log(
            'activeUser',activeUser);
    }, []);
    
    useEffect(() => {
        if(Object.keys(activeUser).length == 0 && users.length > 0){
            loadChatMessages(users[0]?.senderId, users[0]?.receiverId, users[0]?.conversationId, users[0]);
            if (valueReceived) {
                chatSwitchH(valueReceived);
            } else {
                setActiveUser(users[0]);
            }
        }
    }, [users]);
    
    const userPinH = async (userId?: any) => {

        const tempArr: any[] = [];
        const filteredArr: any[] = [];
        setActiveUser({
            ...activeUser,
            ispined: !activeUser?.ispined,
        });
        users?.forEach((user) => {
            console.log("active users",user)
            if (user?.userId === userId) {
                tempArr.push({
                    ...activeUser,
                    ispined: !activeUser?.ispined,
                });
            } else {
                tempArr.push(user);
            }
        });
        tempArr.forEach((user) => {
            if (user.ispined) {
                filteredArr.push(user);
            }
        });
        tempArr.forEach((user) => {
            if (!user.ispined) {
                filteredArr.push(user);
            }
        });

        setUsers(filteredArr);
        try {
            const response = await fetch(`${API_KEY}/chat/conversation/pin/${conversationId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.json();
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };
    
    const onBlock = async () => {
        const tempchat: any = [];
        let filteredArr = selectedData.map((item) => item.id);
        activeChat?.chats?.forEach((item4: any) => {
            if (!filteredArr.includes(item4.id)) {
                tempchat.push(item4);
            }
        });
        setActiveChat({ ...activeChat, chats: tempchat });
        setdangetBtnText('');
        setdangetBtnText('');
        setblockPopup(false);
        setselectedData([]);
        try {
            const response = await fetch(`${API_KEY}/profile/${activeChat?.userId}/block`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.json();
            setBlockToggle(!blockToggle);
        } catch (error) {
            console.log('error blocking user', error);
        }
    };
    
    const onChangeH = (item: any) => {
        if (selectedData.find((ACHat: any) => ACHat?.id === item?.id)) {
            let filterArr = selectedData.filter((chat: any) => {
                if (chat?.id !== item.id) {
                    return { ...chat, checked: true };
                }
            });
            setselectedData(filterArr);
        } else {
            setselectedData([...selectedData, { ...item, checked: true }]);
        }

        let filterArr = activeChat?.chats?.map((chat: any) => {
            if (chat?.id === item.id) {
                return { ...chat, checked: true };
            } else {
                return chat;
            }
        });
        setActiveChat({
            ...activeChat,
            chats: filterArr,
        });
    };

    const deleteHandler = () => {
        if (selectedData.length > 0) {
            setdangetBtnText(
                `Delete for me ${selectedData.length > 0 ? `(${selectedData.length})` : ''}`
            );
            setDengerText('Are you sure you want to delete this message?');
            setblockPopup(true);
        }
    };
    
    const multipleUnstarHandlr = () => {
        let filteredArr = selectedData.map((item: any) => item.id);
        const tempArr: any[] = [];
        activeChat?.chats.forEach((msg: any) => {
            if (filteredArr.includes(msg.id)) {
                tempArr.push({ ...msg, stared: false });
            } else {
                tempArr.push(msg);
            }
        });
        setActiveChat({ ...activeChat, chats: tempArr });
        setselectedData([]);
    };
    
    return (
        <Layout
            // globalClicker={globalClickH}
            // showReportPopup={reportPopup}
            // closeReportPopup={() => setreportPopup(false)}
            // showBlockPopup={blockPopup}
            // closeBlockPopup={() => setblockPopup(false)}
            // showShortSidebar={showShortSidebar}
            // DangerText={DangerText}
            // dangetBtnText={dangetBtnText}
            // onBlock={onBlock}
        >
            <div className={style.parent}>
                <UserChats
                    // onUsersInputChangeHandler={onUsersInputChangeHandler}
                    id={activeUser?.userId}
                    OnChatClick={chatSwitchH}
                    data={users}
                    userPinH={userPinH}
                    onBlock={onBlock}
                    setstaredmodal={setstaredmodal}
                />
                <div className={style.chat}>
                    <div className={style.sec1} 
                    // ref={autoScrolElem}
                    >
                        <div className={chatHeader.parent}>
                            <div className={chatHeader.chatHeader}>
                                <div>
                                    {activeUser?.isGroup ? (
                                        <img
                                            style={{ padding: 8 }}
                                            className={chatHeader.avatar}
                                            src={groupDefaultIcon}
                                            alt=""
                                        />
                                    ) : (
                                        
                                        null
                                    )}
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                        <p className={chatHeader.name}>{activeUser?.userName}</p>
                                    </div>
                                </div>
                                {/* <img onClick={moreOptionH} chatHeader={{ cursor: 'pointer' }} src={more} alt="" /> */}
                            </div>
                        </div>
                    
                        {/* {activeChat?.chats?.length === 0 ? (
                            !activeUser?.isGroup ? (
                                <div className={style.msgsContainer}>
                                    {activeUser?.friends?.find(activeChat?.userId) ? (
                                        <ForFriends />
                                    ) : (
                                        <ForPeoples />
                                    )}
                                </div>
                            ) : (
                                <ForGroups />
                            )
                        ) : ( */}
                            <Actions
                                valuesH={valuesH}
                                valuesH2={valuesH2}
                                deleteH={deleteH}
                                activeUser={activeUser}
                                longPressH={longPressH}
                                autoScrolElem={autoScrolElem}
                                activeChat={activeChat}
                                copyH={copyH}
                                showToast={showToast}
                                handleScroll={handleScroll}
                            />
                         {/* )} */}
                    </div>
                    {/* {replySms && (
                        <div className={style.replyC}>
                            <p className={style.replyText}>
                                Replying to{' '}
                                <span className={style.name}>{activeUser?.userName}</span>{' '}
                            </p>
                            <p className={style.descreplyText}>{smsRef}</p>
                            <img onClick={() => setreplysms(false)} src={closeSvg} alt="" />
                        </div>
                    )}*/ }
                 
                    {activeUser?.isBlocked ? (
                        <p className="p-8">
                            You can't send message to {activeUser?.userName} as you've blocked this
                            user
                        </p>
                    ) : (
                        <DoMsg
                            onSubmit={submitH}
                            // onChange={(e: any) => { console.log("Msg value and type", e.target.value, e.target.type); setMsg(e.target.value), setMsgType(e.target.type)  }}
                            msg={msg}
                            setMessage={setMsg}
                            setMessageType={setMsgType}
                        />
                    )}
                    {/* {!groupOptions && moreOptions && (
                        <DropDown
                            activeUser={activeUser}
                            pinUserH={userPinH}
                            blockH={() => {
                                setdangetBtnText(
                                    `   ${activeUser?.isBlocked ? 'UnBlock' : 'Block'}`
                                );
                                setDengerText(
                                    `Are you sure you want to ${
                                        activeUser?.isBlocked ? 'UnBlock' : 'Block'
                                    } ${activeUser?.userName}?`
                                );
                                setblockPopup(true);
                            }}
                            reportH={() => setreportPopup(true)}
                            staredModal={() => {
                                setshowShortSidebar(true);
                                setstaredmodal(true);
                                setMoreOptions(false);
                            }}
                            searchMsgBar={() => {
                                showSearchMessage(true);
                                setMoreOptions(false);
                            }}
                            numberOfMessages={staredMsgs[0]?.chats?.length}
                        />
                    )}  */}
                </div>
                {/* {groupOptions && (
                    <div>
                        <GroupSideBar
                            onBack={() => {
                                setshowShortSidebar(false);
                                setGroupOptions(false);
                            }}
                            activeUser={activeUser}
                            pinUserH={userPinH}
                            showEditPopup={() => setEditGroupNameModal(!editGroupNameModal)}
                            addMembersHandler={() => setAddMembersPopup(true)}
                            openStaredSMS={() => {
                                setstaredmodal(true);
                                setGroupOptions(false);
                            }}
                            numberOfMessages={staredMsgs[0]?.chats?.length}
                            blockPopupHandler={() => {
                                setdangetBtnText('Block');
                                setDengerText('');
                                setblockPopup(true);
                            }}
                            reportPopupHandler={() => setreportPopup(true)}
                        />
                    </div>
                )}
                    */}
                {staredmodal && (
                    <StaredMesagesSec
                        onBack={() => {
                            setstaredmodal(false);
                            setshowShortSidebar(false);
                        }}
                        staredMsgs={staredMsgs}
                        userName={activeUser?.userName}
                        onChangeH={onChangeH}
                        deleteHandler={deleteHandler}
                        starHandler={valuesH2}
                        multipleUnstarHandlr={multipleUnstarHandlr}
                        showForwardModal={() => {
                            if (selectedData.length > 0) {
                                setforwardModal(true);
                            }
                        }}
                        selectedData={selectedData}
                    />
                )} 
            </div>
            {/* <SearchUser
                onOpen={addMembersPopup}
                blockPopupHandler={() => {
                    setdangetBtnText('Block');
                    setDengerText(`Are you sure you want to block ${activeUser?.userName}?`);
                    setblockPopup(true);
                }}
                reportPopupHandler={() => setreportPopup(true)}
                onClose={() => setAddMembersPopup(false)}
            />
            <EditChatName
                onOpen={editGroupNameModal}
                onClose={() => setEditGroupNameModal(false)}
                onSaveChanges={onSaveChanges}
            />
            <Forwardusers onOpen={forwardModal} onClose={() => setforwardModal(false)} />
            <div>
                <ToastContainer />
            </div> */}
        </Layout>
    );
};

export default ChatComponent;