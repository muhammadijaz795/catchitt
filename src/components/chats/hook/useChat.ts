import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import { DEMI_USERS } from '../data';
import { useLocation } from 'react-router-dom';

function useChat() {
    const API_KEY = process.env.VITE_API_URL;
    const [moreOptions, setMoreOptions] = useState<boolean>(false);
    const [reportPopup, setreportPopup] = useState<boolean>(false);
    const [blockPopup, setblockPopup] = useState<boolean>(false);
    const [editGroupNameModal, setEditGroupNameModal] = useState<boolean>(false);
    const [markTheMsgSafe, setMarkTheMsgSafe] = useState<boolean>(false);
    const [groupOptions, setGroupOptions] = useState<boolean>(false);
    const [smsRef, setSmsRef] = useState<string>('');
    const [smsId, setSmsId] = useState('');
    const [dangetBtnText, setdangetBtnText] = useState<string>('');
    const [noOfDeleteSMS, setnoOfDeleteSMS] = useState<number>(0);
    const [copyModal, setCopyModal] = useState(false);
    const [replySms, setreplysms] = useState<boolean>(false);
    const [forwardModal, setforwardModal] = useState<boolean>(false);
    const [staredmodal, setstaredmodal] = useState<boolean>(true);
    const [selectedData, setselectedData] = useState<any[]>([]);
    const [addMembersPopup, setAddMembersPopup] = useState<boolean>(false);
    const [showShortSidebar, setshowShortSidebar] = useState<boolean>(false);
    const [DangerText, setDengerText] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [activeUser, setActiveUser] = useState<any>({});
    const [activeChat, setactiveChat] = useState<any>({});
    const socketRef = useRef();
    const [users, setUsers] = useState<any[]>(DEMI_USERS);
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [chats, setchats] = useState<any[]>([
        {
            userId: 2,
            userName: 'ahmad',
            chats: [],
        },
    ]);
    const [conversationId, setConversationId] = useState('');
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const token = localStorage.getItem('token');
    const SERVER_URL = 'https://stagingback.seezitt.com';
    const location = useLocation();
    const valueReceived = location.state?.value;

    const autoScrolElem: any = useRef(null);

    const longPressH = (item: any) => {
        const tempArr: any[] = [];
        activeChat.chats.forEach((msg: any) => {
            if (msg.id === item.id) {
                tempArr.push({ ...item, emojis: !item.emojis });
            } else {
                tempArr.push({ ...msg, emojis: false });
            }
        });
        setactiveChat({ ...activeChat, chats: tempArr });
    };

    useEffect(() => {
        loadChats();
        startSocket();
        return () => {
            if (socketRef.current as any) {
                (socketRef.current as any).disconnect();
            }
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('conversationId', conversationId);
    }, [conversationId]);

    const loadChats = async () => {
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
                        lastModifiedTime: string | number | Date;
                        lastMessage: { message: any };
                        isPinned: any;
                        unReadMsgsCount: any;
                        users: {
                            name: any;
                            _id: any;
                        }[];
                        _id: any;
                    },
                    index: number
                ) => {
                    let lastMessage = chats?.lastMessage?.message;
                    let isPinned = chats?.isPinned;
                    let unReadMsgsCount = chats?.unReadMsgsCount;
                    console.log('Last Message : ', lastMessage);
                    // Convert milliseconds to date
                    const date = new Date(chats?.lastMessage?.createdTime);

                    // Format the date using moment.js
                    const conversationTimeStamp = moment(date).format('h:mm A');
                    // chats?.users?.forEach((user) => {
                    tempArr.push({
                        userId: chats?.users[1]?._id,
                        userName: chats?.users[1]?.name,
                        lastMsg: lastMessage,
                        ispined: isPinned,
                        lastSeen: conversationTimeStamp,
                        unReadMsgs: unReadMsgsCount,
                        senderId: chats?.users[0]?._id,
                        receiverId: chats?.users[1]?._id,
                        conversationId: chats?._id,
                    });
                    // });

                    setUsers(tempArr);
                    if (index == 0) {
                        setSender(chats?.users[0]?._id);
                        setReceiver(chats?.users[1]?._id);
                        setConversationId(chats?._id);
                        loadChatMessages(chats?.users[0]?._id, chats?.users[1]?._id, chats?._id);
                    }
                }
            );
            console.log('Response Chats : ', tempArr);
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };

    function startSocket() {
        if ((socketRef.current as any) && (socketRef.current as any).connected) {
            console.log('Socket already connected.');
            return;
        }
        (socketRef.current as any) = io(SERVER_URL, {
            transports: ['websocket'],
        });

        (socketRef.current as any).on('connect', () => {
            setIsConnected(true);
            console.log('Connected to socket server.');
            (socketRef.current as any).emit('add-user', sender);
        });

        (socketRef.current as any).on('disconnect', () => {
            setIsConnected(false);
            console.log('Disconnected from socket server.');
        });

        (socketRef.current as any).on('receive-msg', (message: any) => {
            console.log('Received message:', message?.message);

            setactiveChat((currentChat: any) => ({
                ...currentChat,
                chats: [
                    ...currentChat?.chats,
                    {
                        msg: message?.message,
                        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                        emojis: false,
                        dropdown: false,
                        id: new Date().getTime(),
                        isrecevied: true,
                    },
                ],
            }));
            setMessages((prevMessages) => [...prevMessages, message] as any);
        });
    }

    const reactToMessage = (messageId: any, reaction: any) => {
        (socketRef.current as any).emit('react-msg', { from: sender, messageId, react: reaction });
    };

    const removeReaction = (messageId: any) => {
        (socketRef.current as any).emit('remove-react', { from: sender, messageId });
    };

    const markMessageAsSeen = (messageId: any) => {
        (socketRef.current as any).emit('mark-message-as-seen', { userId: sender, messageId });
    };
    useEffect(() => {
        scrollToBottom();
    }, [msg]);

    const insertKeyH = (key: any, value: boolean) => {
        const tempArr: any[] = [];
        activeChat.chats.forEach((usermsg: any) => {
            tempArr.push({ ...usermsg, [key]: value });
        });
        setactiveChat({ ...activeChat, chats: tempArr });
    };

    const valuesH = (item: any, keyName: any) => {
        const tempArr: any[] = [];
        activeChat.chats.forEach((msg: any) => {
            if (msg.id === item.id) {
                tempArr.push({ ...item, [keyName]: !item[keyName] });
            } else {
                tempArr.push({ ...msg, [keyName]: false });
            }
        });
        setactiveChat({ ...activeChat, chats: tempArr });
    };
    const valuesH2 = (item: any, keyName: any, value: any) => {
        const tempArr: any[] = [];
        activeChat.chats.forEach((msg: any) => {
            if (msg.id === item.id) {
                tempArr.push({ ...item, [keyName]: value, dropdown: false });
                setMessageAsStared(msg.id, conversationId);
            } else {
                tempArr.push(msg);
            }
        });
        setactiveChat({ ...activeChat, chats: tempArr });
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
            console.log('Message Marked as stared : ', res);
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };

    const deleteH = async (item: any) => {
        const tempArr: any[] = [];
        activeChat.chats.forEach((msg: any) => {
            if (msg.id !== item.id) {
                tempArr.push(msg);
            }
        });
        setactiveChat({ ...activeChat, chats: tempArr });

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
            console.log('Message deleted : ', res);
        } catch (error) {
            console.log('Error deleting message', error);
        }
    };

    const globalClickH = () => {
        if (moreOptions) {
            setMoreOptions(false);
        }
        insertKeyH('showEmogis', false);
        insertKeyH('emojis', false);
        const tempArr: any[] = [];
        activeChat.chats.forEach((msg: any) => {
            tempArr.push({ ...msg, dropdown: false, emojis: false });
        });
        setactiveChat({ ...activeChat, chats: tempArr });
    };

    const scrollToBottom = () => {
        if (autoScrolElem.current) {
            autoScrolElem.current.scrollTop = autoScrolElem.current.scrollHeight + 300;
        }
    };

    const submitH = (e: any) => {
        if (e) {
            e.preventDefault();
        }
        console.log('I am here');
        e.stopPropagation();
        const messageData = {
            to: receiver,
            message: msg,
            from: sender,
            type: 'Text',
        };
        // Get current time
        const currentTime = moment();

        // Format the current time using moment.js
        const formattedTime = currentTime.format('h:mm A');
        if (msg.length !== 0) {
            if (smsRef.length > 0) {
                setactiveChat({
                    ...activeChat,
                    chats: [
                        ...activeChat.chats,
                        {
                            msg: msg,
                            time: formattedTime,
                            emojis: false,
                            dropdown: false,
                            id: new Date().getTime(),
                            replysms: smsRef,
                        },
                    ],
                });

                // console.log('Message IF: ', sms);
                // sendMessageReply()
                // (socketRef.current as any).emit('send-msg', JSON.stringify(messageData));
                setMsg('');
            } else {
                setactiveChat({
                    ...activeChat,
                    chats: [
                        ...activeChat.chats,
                        {
                            msg: msg,
                            time: formattedTime,
                            emojis: false,
                            dropdown: false,
                            id: new Date().getTime(),
                        },
                    ],
                });
                console.log('Message ELSE : ', messageData);
                (socketRef.current as any).emit('send-msg', JSON.stringify(messageData));
                setMsg('');
            }
            console.log('Current socket : ', socketRef.current);
            setMsg('');
        }

        setSmsRef('');
        setSmsId('');
        scrollToBottom();
        setreplysms(false);
    };
    const multipleUnstarHandlr = () => {
        let filteredArr = selectedData.map((item: any) => item.id);
        const tempArr: any[] = [];
        activeChat.chats.forEach((msg: any) => {
            if (filteredArr.includes(msg.id)) {
                tempArr.push({ ...msg, stared: false });
            } else {
                tempArr.push(msg);
            }
        });
        setactiveChat({ ...activeChat, chats: tempArr });
        setselectedData([]);
    };
    const chatSwitchH = (e: any) => {
        console.log('Click on chat : ', e);
        users?.forEach((user) => {
            if (user?.userId === e) {
                setSender(user?.senderId);
                setReceiver(user?.receiverId);
                setConversationId(user?.conversationId);
                loadChatMessages(user?.senderId, user?.receiverId, user?.conversationId);
                setActiveUser(user);
            }
        });

        // console.log("Conversation ID: ",conversationId);
        // console.log("Sender ID: ",sender);
        // console.log("Receiver ID: ",receiver);
        setstaredMsgs([]);
    };

    const loadChatMessages = async (
        senderId: String | Number,
        receiverId: String | Number,
        conversationId: String | Number
    ) => {
        try {
            const response = await fetch(
                `${API_KEY}/chat/messages/${conversationId}?page=1&pageSize=20`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            res?.data?.data.forEach((element: any) => {
                console.log('Chat Messages : ', element);
                // Convert milliseconds to date
                const date = new Date(element?.createdTime);

                // Format the date using moment.js
                const messageTimeStamp = moment(date).format('h:mm A');

                setactiveChat((currentChat: any) => ({
                    ...currentChat,
                    chats: [
                        ...currentChat?.chats,
                        {
                            msg: element?.message,
                            time: messageTimeStamp,
                            emojis: false,
                            dropdown: false,
                            id: element?._id,
                            isrecevied: element?.receiverId?._id == receiverId ? false : true,
                            stared: element?.isStarred,
                            isRead: element?.isRead,
                        },
                    ],
                }));
            });
        } catch (error) {
            console.log('error chat messages', error);
        }
    };

    useEffect(() => {
        setactiveChat(chats[0]);
        if (valueReceived) {
            chatSwitchH(valueReceived);
        } else {
            setActiveUser(users[0]);
        }
    }, [users]);

    useEffect(() => {
        if (chats.find((chat) => chat.userId === activeUser.userId)) {
            chats.forEach((chat) => {
                if (chat.userId === activeUser.userId) {
                    setactiveChat(chat);
                }
            });
            setchats([...chats, activeChat]);
        } else {
            if (activeChat) {
                setchats([...chats, activeChat]);
                setactiveChat({
                    userId: activeUser.userId,
                    userName: activeUser.userName,
                    chats: [],
                });
            } else {
                setchats([...chats, activeChat]);
                setactiveChat({
                    userId: activeUser.userId,
                    userName: activeUser.userName,
                    chats: [],
                });
            }
        }
        setshowShortSidebar(false);
        setGroupOptions(false);
        setstaredmodal(false);
        setMoreOptions(false);
        setstaredMsgs([]);
    }, [activeUser]);

    const sendMessageReply = async () => {
        try {
            const response = await fetch(`${API_KEY}/chat/messages`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    from: sender,
                    to: receiver,
                    message: msg,
                    conversationId: conversationId,
                    type: 'Text',
                    repliedMessageId: smsId,
                }),
            });
            const res = await response.json();
            console.log('Message Replied : ', res);
        } catch (error) {
            console.log('error replying to message', error);
        }
        console.log('ACtive user : ', activeUser);
    };

    const userPinH = async (id?: any) => {
        // if (chats.find((chat) => chat.userId === activeUser.userId)) {
        //     chats.forEach((chat) => {
        //         if (chat.userId === activeUser.userId) {
        //             setactiveChat(chat);
        //         }
        //     });
        //     setchats([...chats, activeChat]);
        // } else {
        //     if (activeChat) {
        //         setchats([...chats, activeChat]);
        //         setactiveChat({
        //             userId: activeUser.userId,
        //             userName: activeUser.userName,
        //             chats: [],
        //         });
        //     } else {
        //         setchats([...chats, activeChat]);
        //         setactiveChat({
        //             userId: activeUser.userId,
        //             userName: activeUser.userName,
        //             chats: [],
        //         });
        //     }
        // }

        const tempArr: any[] = [];
        const filteredArr: any[] = [];
        setActiveUser({
            ...activeUser,
            ispined: !activeUser.ispined,
        });
        users?.forEach((user) => {
            if (user?.userId === activeUser?.userId) {
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
            console.log('Chat PINNED : ', res);
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };

    const copyH = (msg: any) => {
        if (msg) {
            navigator.clipboard.writeText(msg).then(() => {
                setCopyModal(true);
            });
        }
        const tempArr: any[] = [];
        activeChat.chats.forEach((item: any) => {
            tempArr.push({ ...item, dropdown: false });
        });
        setactiveChat({ ...activeChat, chats: tempArr });
    };

    const showToast = () => {
        toast.success('🎉 Copied successfully', {
            position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
            autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
        });
    };

    useEffect(() => {
        if (copyModal) {
            setTimeout(() => {
                setCopyModal(false);
            }, 2000);
        }
    }, [copyModal]);
    const onSaveChanges = (userName: string) => {
        setactiveChat({
            ...activeChat,
            userName: userName,
        });
        setActiveUser({
            ...activeUser,
            userName: userName,
        });

        setEditGroupNameModal(false);
    };

    useEffect(() => {
        const tempArr: any[] = [];
        users?.forEach((user) => {
            if (user?.userId === activeUser?.userId) {
                tempArr.push(activeUser);
            } else {
                tempArr.push(user);
            }
        });

        setUsers(tempArr);
    }, [editGroupNameModal]);

    const [staredMsgs, setstaredMsgs] = useState<any[]>([]);
    useEffect(() => {
        let tempArr: any[] = [];
        let chats: any[] = [];
        activeChat?.chats?.forEach((userChat: any) => {
            if (userChat.stared) {
                chats.push(userChat);
            }
        });
        if (staredMsgs.find((chat) => chat.userId === activeChat.userId)) {
            staredMsgs.forEach((userChat2) => {
                if (userChat2.userId === activeChat.userId) {
                    tempArr.push({ ...activeChat, chats: chats });
                } else {
                    tempArr.push(userChat2);
                }
            });
            setstaredMsgs(tempArr);
        } else {
            setstaredMsgs([
                ...staredMsgs,
                {
                    ...activeChat,
                    chats: chats,
                },
            ]);
        }

        const isR: any[] = [];
        const isNR: any[] = [];
        tempArr?.forEach((element: any) => {
            element.chats.forEach((chat: any) => {
                if (chat?.isrecevied) {
                    isR.push(chat);
                } else {
                    isNR.push(chat);
                }
            });
        });
    }, [activeChat?.chats]);

    useEffect(() => {
        if (activeChat?.chats?.find((chat: any) => chat?.stared === true)) {
        } else {
            setstaredMsgs([]);
        }
    }, [activeChat.userId, activeUser.userId]);

    const onBlock = async () => {
        const tempchat: any = [];
        let filteredArr = selectedData.map((item) => item.id);
        activeChat?.chats?.forEach((item4: any) => {
            if (!filteredArr.includes(item4.id)) {
                tempchat.push(item4);
            }
        });
        setactiveChat({ ...activeChat, chats: tempchat });
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
            console.log('User Blocked : ', res);
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
        setactiveChat({
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

    const onUsersInputChangeHandler = (e: any) => {
        if (e.length > 0) {
            const filteredUsers: any[] = DEMI_USERS?.filter((user: any) =>
                user?.userName?.toLowerCase().includes(e.toLowerCase())
            );

            setUsers(filteredUsers);
        } else {
            setUsers(DEMI_USERS);
        }
    };

    return {
        onUsersInputChangeHandler,
        moreOptions,
        setMoreOptions,
        reportPopup,
        setreportPopup,
        blockPopup,
        setblockPopup,
        groupOptions,
        setGroupOptions,
        markTheMsgSafe,
        setMarkTheMsgSafe,
        smsRef,
        setSmsRef,
        smsId,
        setSmsId,
        replySms,
        setreplysms,
        showShortSidebar,
        setshowShortSidebar,
        msg,
        setMsg,
        activeChat,
        setactiveChat,
        activeUser,
        setActiveUser,
        users,
        setUsers,
        chats,
        setchats,
        autoScrolElem,
        longPressH,
        scrollToBottom,
        insertKeyH,
        valuesH,
        valuesH2,
        deleteH,
        globalClickH,
        submitH,
        chatSwitchH,
        userPinH,
        copyH,
        copyModal,
        setCopyModal,
        editGroupNameModal,
        setEditGroupNameModal,
        onSaveChanges,
        addMembersPopup,
        setAddMembersPopup,
        staredMsgs,
        staredmodal,
        setstaredmodal,
        DangerText,
        dangetBtnText,
        setDengerText,
        setdangetBtnText,
        onBlock,
        selectedData,
        setselectedData,
        noOfDeleteSMS,
        onChangeH,
        deleteHandler,
        multipleUnstarHandlr,
        forwardModal,
        setforwardModal,
        showToast,
        socketRef,
        sender,
        receiver,
        sendMessageReply,
    };
}

export default useChat;
