import React, { useEffect, useRef, useState } from 'react';
// import { useSocket } from '../reusables/SocketContext';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '../../shared/layout';
import UserChats from './components/chats';
import Actions from './components/Actions';
import DoMsg from './components/DoMsg';
import StaredMesagesSec from './components/StaredMesagesSec';

import { avatar, groupDefaultIcon, more, cross, chatEmojiBg, chatEmojiBgDark, leftArrowCurvedinWhite, leftArrowCurved, defaultAvatar } from '../../icons';
// style
import style from './index.module.scss';
import chatHeader from './components/ChatHeader.module.scss';
import SearchUser from './components/modals/SearchUser';
import DropDown from './components/DropDown';
import Search from '../../shared/navbar/components/Search';
import ChatHeader from './components/ChatHeader';
import ForFriends from './components/welcomeScreens/ForFriends';
import ForPeoples from './components/welcomeScreens/ForPeoples';
import ForGroups from './components/welcomeScreens/ForGroups';
import { useUpdateEffect } from 'react-use';
import Forwardusers from './components/modals/Forwardusers';
import { getLatestMsgDateFormat } from '../../utils/helpers';
import ProfileSec from './components/ProfileSec';
import ConfirmDelete from './components/ConfirmDelete';
import { useSelector } from 'react-redux';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';

const ChatComponent = () => {
    // const socket = useSocket();

    // const MessageType = {
    //     TEXT: 'Text',
    //     IMAGE: 'Image',
    //     VIDEO: 'Video',
    //     FILE: 'File',
    //     GIF: 'Gif',
    //     STICKER: 'Sticker',
    //     EMOJI: 'Emoji',
    //     SEEZITT_VIDEO: 'SeezittVideo',
    //     SEEZITT_VOICE_MESSAGE: 'SeezittVoiceNote',
    //     SEEZITT_LIVE_STREAM: 'SeezittLiveStream',
    // };
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
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
    const [forwardMsg, setForwardMsg] = useState<any>(null);
    const [staredmodal, setstaredmodal] = useState<boolean>(false);
    const [searchMessage, showSearchMessage] = useState<boolean>(false);
    const [selectedData, setselectedData] = useState<any[]>([]);
    const [addMembersPopup, setAddMembersPopup] = useState<boolean>(false);
    const [showShortSidebar, setshowShortSidebar] = useState<boolean>(false);
    const [DangerText, setDengerText] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [msgType, setMsgType] = useState<string>('');
    const [selectedGift, setSelectedGift] = useState<{ _id: string } | null>(null);

    const [activeUser, setActiveUser] = useState<any>({});
    const [activeChat, setActiveChat] = useState<any>({});
    const socketRef = useRef();
    const [users, setUsers] = useState<any[]>([]); // removed dummy user
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [chats, setchats] = useState<any[]>([]);
    const [conversationId, setConversationId] = useState('');
    const [chatActiveUserId, setChatActiveUserId] = useState('');

    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const token = localStorage.getItem('token');
    const loggedUserId = localStorage.getItem('userId');
    const SERVER_URL = 'https://prodapi.seezitt.com';
    const location = useLocation();
    const valueReceived = location.state?.value;
    const [page, setPage] = useState(1);
    const [queryPage, setQueryPage] = useState(1);
    const autoScrolElem: any = useRef(null);
    const [blockToggle, setBlockToggle] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState('');
    const [recievedMsg, seTRecievedMsg] = useState<any>(null)
    const [staredMsgs, setstaredMsgs] = useState<any[]>([]);
    const [isProfileSecVisible, setIsProfileSecVisible] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState<any>(null);
    const [currentReplyToMessage, setCurrentReplyToMessage] = useState<any>(null);
    const [isMuted, setIsMuted] = useState(false);
    const userAvatar = useSelector((state: any) => state?.reducers?.profile?.avatar);
    const [messagesState, setMessagesState] = useState<Record<string, string>>({});

    const longPressH = (item: any, newItem=true) => {   
        const tempArr: any[] = [];
        activeChat?.chats.forEach((msg: any) => {
            if(newItem == false){
                tempArr.push({ ...msg, emojis: false, dropdown:false });
            }else{
                if (msg.id === item.id) {
                    tempArr.push({ ...item, emojis: !item.emojis, dropdown:false });
                }else {
                    tempArr.push({ ...msg, emojis: false, dropdown:false });
                }
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
            let addUserObject = { userId: sender, accessToken: token };
            let newAddUserObject = JSON.stringify(addUserObject);
            (socketRef.current as any).emit('add-user', newAddUserObject);
        });

        (socketRef.current as any).on('connect_error', (error: any) => {
            console.error('Connection Error:', error);
        });

        (socketRef.current as any).on('disconnect', () => {
            setIsConnected(false);
            console.log('Disconnected from socket server.');
        });

        // (socketRef.current as any).on('message-sent', (response: any) => {
        //     console.log('message sent response..')
        //     console.log(response);

        //     console.log('new object');
        //     console.log({
        //         to: response?.receiverId?._id,
        //         from: response?.senderId?._id,
        //         msg: response.message,
        //         type: response.type,
        //         time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        //         emojis: false,
        //         dropdown: false,
        //         id: response._id,
        //         // Check if repliedMessage is not null before accessing its properties
        //         replysms: response.repliedMessage ? response.repliedMessage.message : '', // Use an empty string if repliedMessage is null
        //         receiverId: response.repliedMessage ? response.repliedMessage.senderId._id : '', // Similarly, check for receiverId
        //         recieverName: response.repliedMessage ? response.repliedMessage.senderId.name : '', // Similarly, check for recieverName
        //     });


        //     setActiveChat({
        //         ...activeChat,
        //         chats: [
        //             ...activeChat?.chats,
        //             {
        //                 to: response?.receiverId?._id,
        //                 from: response?.senderId?._id,
        //                 msg: response.message,
        //                 type: response.type,
        //                 time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        //                 emojis: false,
        //                 dropdown: false,
        //                 id: response._id,
        //                 // Check if repliedMessage is not null before accessing its properties
        //                 replysms: response.repliedMessage ? response.repliedMessage.message : '', // Use an empty string if repliedMessage is null
        //                 receiverId: response.repliedMessage ? response.repliedMessage.senderId._id : '', // Similarly, check for receiverId
        //                 recieverName: response.repliedMessage ? response.repliedMessage.senderId.name : '', // Similarly, check for recieverName
        //             },
        //         ],
        //     });  
        // });


        (socketRef.current as any).onclose = (event: any) => {
            console.error('WebSocket closed:', event);
        };

        
        (socketRef.current as any).on('removed-react', (data: any) => {
            const { messageId, from } = data;
            console.log('Reaction removed data:', data);
            
            setActiveChat((currentActiveChat: typeof activeChat) => {
                if (!currentActiveChat?.chats) return currentActiveChat;
                
                const updatedChats = currentActiveChat.chats.map((chat: any) => {
                    if (chat._id !== messageId && chat.id !== messageId) return chat;
                    if (!chat.reactions || chat.reactions.length === 0) return chat;
                    
                    const newReactions = chat.reactions.filter(
                        (r: any) => r.userId !== from
                    );
                    
                    return {
                        ...chat,
                        reactions: newReactions,
                    };
                });
                
                return {
                    ...currentActiveChat,
                    chats: updatedChats,
                };
            });
        });

        (socketRef.current as any).on('reacted-msg', (data: any) => {
            const { messageId, react, from } = data;
            console.log('Reacted message data:', data);
            
            // Use functional update to avoid stale state
            setActiveChat((currentActiveChat: typeof activeChat) => {
                if (!currentActiveChat?.chats) return currentActiveChat;
                
                const updatedChats = currentActiveChat.chats.map((chat: any) => {
                    if (chat._id !== messageId && chat.id !== messageId) return chat;
                    
                    // Clone existing reactions or initialize empty array
                    const existingReactions = chat.reactions ? [...chat.reactions] : [];
                    
                    // Find if this user already reacted
                    const reactionIndex = existingReactions.findIndex(
                        (r: any) => r.userId === from
                    );
                    
                    let newReactions;
                    
                    if (reactionIndex !== -1) {
                        // Update existing reaction
                        newReactions = [...existingReactions];
                        newReactions[reactionIndex].react = react;
                    } else {
                        // Add new reaction
                        newReactions = [
                            ...existingReactions,
                            { react, userId: from, _id: messageId },
                        ];
                    }
                    
                    return {
                        ...chat,
                        reactions: newReactions,
                    };
                });
                
                return {
                    ...currentActiveChat,
                    chats: updatedChats,
                };
            });
            
            console.log('Reaction updated:', data);
        });
          

        (socketRef.current as any).on('receive-msg', (message: any) => {
            let chatActiveUser = localStorage.getItem('chatActiveUser');
            activeUser?.userId
            seTRecievedMsg(message);
            if (chatActiveUser == message.senderId._id) {
                console.log('received msg');
                console.log(message);
                console.log('message_id'+message?._id);
                console.log('received object');
                setActiveChat((currentChat: any) => ({
                    ...currentChat,
                    chats: [
                        ...currentChat?.chats,
                        {
                            isForwarded: message?.isForwarded,
                            msg: message?.message,
                            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                            emojis: false,
                            dropdown: false,
                            id: message?._id ? message?._id: `${new Date().getTime()}`,
                            isrecevied: true,
                            receiverId: message?.receiverId?._id,
                            stared: message?.isStarred,
                            isRead: message?.isRead,
                            type: message?.type,
                            gift: message?.gift,
                            // replysms: false,
                            recieverName: message.receiverId.name,
                            replysms: message?.repliedMessage?.message ? message?.repliedMessage?.message : '', // Use an empty string if repliedMessage is null
                        },
                    ],
                }));
            }
        });

    }

    // useUpdateEffect(() => {
    //     if (!recievedMsg) return;
    //     console.log('new message forwared recevied...')
    //     console.log('first check users array', users, activeChat);
    //     console.log(recievedMsg);
    //     console.log(recievedMsg.conversationId)
    //     let tempUserArr: any[] = [];
    //     let userFound = false;
    //     users?.forEach((user) => {
    //         if (user?.conversationId === recievedMsg.conversationId) {
    //             tempUserArr.push({
    //                 ...user,
    //                 lastMsg: recievedMsg.message,
    //                 lastSeen: getLatestMsgDateFormat(recievedMsg?.createdTime),
    //                 unReadMsgs: conversationId === user.conversationId ? user.unReadMsgs : user.unReadMsgs + 1,
    //             });
    //             userFound = true; // Mark as found
    //         } else {
    //             tempUserArr.push(user);
    //         }
    //     });
    //     setUsers(tempUserArr);
    //     seTRecievedMsg(null)
    // }, [recievedMsg])

    useUpdateEffect(() => {
        if (!recievedMsg) return;
    
        console.log('new message forwarded received...');
        console.log('first check users array', users, activeChat);
        console.log(recievedMsg);
        console.log(recievedMsg.conversationId);
    
        let tempUserArr: any[] = [];
        let userFound = false;
    
        // First, try to find and update the user in the existing users array
        users?.forEach((user) => {
            if (user?.conversationId === recievedMsg.conversationId) {
                // Update the existing user's message details
                tempUserArr.push({
                    ...user,
                    lastMsg: recievedMsg.message,
                    lastSeen: getLatestMsgDateFormat(recievedMsg?.createdTime),
                    unReadMsgs: conversationId === user.conversationId ? user.unReadMsgs : user.unReadMsgs + 1,
                });
                userFound = true; // Mark the user as found
            } else {
                tempUserArr.push(user); // Keep other users in the same order
            }
        });
    
        // If user is found, move them to the top
        if (userFound) {
            // Remove the found user from its original position
            const updatedUserArr = tempUserArr.filter(user => user.conversationId !== recievedMsg.conversationId);
            // Add the updated user at the top
            updatedUserArr.unshift(tempUserArr.find(user => user.conversationId === recievedMsg.conversationId));
            setUsers(updatedUserArr);
        } else {
            // If user doesn't exist, add them at the top
            tempUserArr.unshift({
                userId: recievedMsg.senderId,
                userName: recievedMsg.senderName,
                userImage: recievedMsg.senderImage,
                lastMsg: recievedMsg.message,
                lastSeen: getLatestMsgDateFormat(recievedMsg?.createdTime),
                unReadMsgs: 1, // New message count is 1
                conversationId: recievedMsg.conversationId,
                themeColor: null,
                nickName: null,
                emoji: null,
                isBlocked: false,
                mute: false
            });
            setUsers(tempUserArr);
        }
    
        seTRecievedMsg(null); // Reset received message state
    }, [recievedMsg]);
    

    const chatSwitchH = async (e: any) => {
        console.log(
            "chatSwitchH"
        );
        // Save the current message for the active user
        if (activeUser?.userId) {
            setMessagesState((prev) => ({
                ...prev,
                [activeUser.userId]: msg, // Save the current message for the active user
            }));
        }

        // Clear the message state for the new user
        setMsg(messagesState[e] || ''); // Restore the message for the user being switched to

        setIsProfileSecVisible(false);
        users?.forEach(async (user, index) => {
            if (user?.userId === e) {
                setActiveChat({});
                setSender(user?.senderId);
                setReceiver(user?.receiverId);
                setConversationId(user?.conversationId);
                await loadChatMessages(user?.senderId, user?.receiverId, user?.conversationId, user);
                setActiveUser(user);
                localStorage.setItem('chatActiveUser', user?.userId);
                setChatActiveUserId(user?.userId)
                markMessageAsSeen(user?.senderId, user?.conversationId);
                const mutableUsers = [...users];
                mutableUsers[index].unReadMsgs = 0;
                setUsers(mutableUsers);
                setTimeout(() => {
                    inputRef.current?.focus();
                    scrollToBottom();
                }, 500);
            }
        });

        setstaredMsgs([]);
         // Focus input after state updates
         
    };

    const fetchStaredMessages = async () => {
        try {
            const response = await fetch(`${API_KEY}/chat/messages/stared/${conversationId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.json();
            console.log('stared messages 👎👎🙏🏻🙏🏻🙏🏻🚀🚀🚀', res);
            const data = Array.isArray(res?.data?.data)?res?.data?.data:[];
    
            const opponentStaredMessages = data.filter(
                (message: any) => message?.senderId !== loggedUserId
            );

            const ownStaredMessages = data.filter(
                (message: any) => message?.senderId === loggedUserId
            );

            const staredMessages = [
                {
                    userId: loggedUserId,
                    userName: 'You',
                    userImage: userAvatar || defaultAvatar,
                    chats: ownStaredMessages,
                },
                {
                    userId:  activeUser?.userId,
                    userName: activeUser?.userName,
                    userImage: activeUser?.userImage || defaultAvatar,
                    chats: opponentStaredMessages,
                },
            ]
            console.log('ownStaredMessages 🥳🥳🥳🥳🥳', staredMessages);

            const [modifiedOwnMessages, modifiedOpponentMessages] = [ownStaredMessages, opponentStaredMessages].map((messages: any[]) => {
               return messages.map(
                (
                    chats: any,
                    index: number
                ) => {

                    return {
                        id: chats?._id,
                        userId: chats?.senderId?._id,
                        userName: chats?.senderId?.name,
                        userImage: chats?.senderId?.avatar,
                        replysms: chats?.repliedMessage,
                        isrecevied: chats?.receiverId?._id === loggedUserId ? false : true,
                        msg: chats?.message,
                        timeStamp: moment(chats?.createdTime).format('MMM Do YY, h:mm A'),
                    };
                }
            );
            });
            staredMessages[0].chats = modifiedOwnMessages;
            staredMessages[1].chats = modifiedOpponentMessages;
            console.log('staredMessages 🥳🥳🥳🥳🥳', staredMessages);
            setstaredMsgs(staredMessages);
        } catch (error) {
            console.log('error', error);
        }
    }

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
                    if (currentChat.length > 0) {
                        const messageExists = currentChat?.chats.some(
                            (chat: any) => chat.id === element?._id
                        );
                        if (messageExists) return currentChat;
                    } []
                    // If message exists, return the current state without changes

                    // Otherwise, add the new message to chats
                    console.log(element?.gift);
                    console.log('element gift')
                    return {
                        ...currentChat,
                        userId: user.userId,   // Replace with the desired value
                        userImage: user.userImage,   // Replace with the desired value
                        userName: user.userName,
                        chats: [
                            ...(currentChat?.chats || []),
                            {
                                recieverName: element.receiverId.name,
                                isForwarded: element?.isForwarded,
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
                                gift:element?.gift,
                                reactions: element?.reactions,
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
        // (socketRef.current as any).emit('mark-conversation-as-seen', { userId, newDataObject });
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
            scrollChatToBottom();

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
                        themeColor: any;
                        nickName: any;
                        emoji: any;
                        mute: any;
                        _id: any;
                    },
                    index: number
                ) => {
                    let lastMessage = chats?.lastMessage?.message;
                    let isPinned = chats?.isPinned;
                    let unReadMsgsCount = chats?.unReadMsgsCount;
                    let isBlocked = chats?.isBlocked;

                    const isLastIndex = index === res?.data?.data?.length - 1;

                    // if (isLastIndex) markMessageAsSeen(chats?.users[0]?._id, chats?._id);
                    tempArr.push({
                        userId: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?._id : chats?.users[1]?._id,
                        userName: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?.name : chats?.users[1]?.name, //chats?.users[1]?.name,
                        userImage: loggedUserId == chats?.users[1]?._id ? chats?.users[0]?.avatar : chats?.users[1]?.avatar,
                        lastMsg: lastMessage,
                        ispined: isPinned,
                        lastSeen: getLatestMsgDateFormat(chats?.lastMessage?.createdTime),
                        unReadMsgs: unReadMsgsCount,
                        senderId: chats?.users[0]?._id,
                        receiverId: chats?.users[1]?._id,
                        conversationId: chats?._id,
                        themeColor: chats?.themeColor,
                        nickName: chats?.nickName,
                        emoji: chats?.emoji,
                        isBlocked,
                        mute: chats?.mute,
                    });
                    // });

                    // if (index == 0) {
                    //     setSender(chats?.users[0]?._id);
                    //     setReceiver(chats?.users[1]?._id);
                    //     setConversationId(chats?._id);
                    //     loadChatMessages(chats?.users[0]?._id, chats?.users[1]?._id, chats?._id);
                    // }
                }
            );
            setUsers(tempArr);
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
                tempArr.push({ ...item, dropdown: false, [keyName]: value });
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

    const forwardH = async (item: any) => {
        setforwardModal(true);
        setForwardMsg(item);
    }

    const forwardNow = (selectedUsers: any) => {
        const forwardUsers = selectedUsers.map((user: any) => user.userId)
        let tempUserArr: any[] = [];
        users?.forEach((user) => {
            if (forwardUsers.includes(user?.userId)) {
                tempUserArr.push({
                    ...user,
                    lastMsg: forwardMsg.msg,
                    lastSeen: getLatestMsgDateFormat(Date.now()),
                });
            } else {
                tempUserArr.push(user);
            }
        });
        setUsers(tempUserArr);

        const messageData = {
            receivers: forwardUsers,
            messageId: forwardMsg.id,
            senderId: loggedUserId == sender ? sender : sender,
            accessToken: token,
        };
        (socketRef.current as any).emit('forward-message', JSON.stringify(messageData));

        const activeUserIndex = tempUserArr.findIndex(user => user.userId === activeUser.userId);
        if (activeUserIndex !== -1) {
            const [activeUser] = tempUserArr.splice(activeUserIndex, 1); // Remove the active user from its current position
            tempUserArr.unshift(activeUser); // Add the active user to the beginning of the array
        }

        setForwardMsg(null);
        setforwardModal(false)
    }

    // const reactToMessage = (messageId: any, reaction: any) => {
    //     console.info(JSON.stringify({ from: sender, messageId, react: reaction, type:'emoji',accessToken: token }));
    //     (socketRef.current as any).emit('react-msg', JSON.stringify({ from: sender, messageId, react: reaction, type:'emoji',accessToken: token }));
    // };

    const reactToMessage = (messageId: any, reaction: any,item: any) => {
        // Find the message in activeChat.chats that matches the given messageId
        const updatedChats = activeChat.chats.map((msg :any) => {
            if (msg.id === messageId) {
                // Ensure reactions array is initialized
                if (!Array.isArray(msg.reactions)) {
                  msg.reactions = [];
                }
              
                const existingReactionIndex = msg.reactions.findIndex(
                  (r: any) => r.userId === sender
                );
              
                if (existingReactionIndex !== -1) {
                  // Update the existing reaction
                  msg.reactions[existingReactionIndex] = {
                    ...msg.reactions[existingReactionIndex],
                    react: reaction,
                  };
                } else {
                  // Add a new reaction
                  msg.reactions.push({
                    userId: sender,
                    react: reaction,
                  });
                }
              }
              return msg;
        });

        // Update your state with the modified chats array
        setActiveChat((prevState :any) => ({
            ...prevState,
            chats: updatedChats
        }));

        
        // Emit the updated reaction to the server
        (socketRef.current as any).emit('react-msg', JSON.stringify({
            from: sender,
            messageId: messageId,
            react: reaction,
            type: 'emoji',
            accessToken: token,
            conversationId
        }));
        valuesH(item, 'showEmogis');
    };


    

    // const removeReaction = (item: any) => {
    //     let dataObj: { from?: string; messageId?: string; userId?: string; accessToken?: string } = {};
    //     dataObj.messageId = item.id;
    //     dataObj.from = loggedUserId ?? '';
    //     dataObj.userId = item.receiverId;
    //     dataObj.accessToken = token ?? undefined;
    //     const data = JSON.stringify(dataObj);

    //     console.log('remvoe reaction', data);
    //     (socketRef.current as any).emit('remove-react', data);
    //     setSelectedMsg(null);
    // };

    interface Reaction {
        userId: string;
        react: string;
        _id?: string;
      }
      
      interface ChatMessage {
        id: string;
        _id?: string;
        reactions?: Reaction[];
        // ... other message properties
      }
      
      interface ActiveChat {
        chats: ChatMessage[];
        // ... other chat properties
      }
      
      const removeReaction = (item: ChatMessage,userId: any) => {
        // 1. Verify the item has reactions
        console.log(item.reactions);
        // if (!item.reactions?.some(r => r.userId === loggedUserId)) {
        //   console.warn('No reaction to remove for this user');
        //   return;
        // }
      
        // 2. Prepare server data
        const dataObj = {
          messageId: item.id,
          from: loggedUserId ?? '',
          conversationId: conversationId,
          accessToken: token ?? undefined
        };
        
        console.log('Removing reaction', dataObj);
        (socketRef.current as any).emit('remove-react', JSON.stringify(dataObj));
      
        // 3. Optimistic UI update
        setActiveChat((currentActiveChat: ActiveChat | null) => {
          if (!currentActiveChat?.chats) return currentActiveChat;
          
          const updatedChats = currentActiveChat.chats.map((chat: ChatMessage) => {
            // Debug logging
            console.log('Comparing:', {
              chatId: chat.id,
              itemId: item.id,
              matches: chat.id === item.id || chat._id === item.id
            });
      
            // Check if this is the target message
            if (chat.id !== item.id && chat._id !== item.id) return chat;
            console.log('chat reactions...')
            console.log(chat.reactions);
            console.log('loggedUserId', loggedUserId);
            // Create new reactions array without user's reaction
            const updatedReactions = (chat.reactions || []).filter(reaction => {
                const reactionUserId = typeof reaction.userId === 'string' 
                  ? reaction.userId 
                  : reaction.userId;
                  
                return reactionUserId !== userId;
              });
      
            console.log('Updated reactions:', updatedReactions);
            
            return {
              ...chat,
              reactions: updatedReactions.length > 0 ? updatedReactions : undefined
            };
          });
          
          return {
            ...currentActiveChat,
            chats: updatedChats
          };
        });
      
        setSelectedMsg(null);
      };

    const deleteForEveryone = async (item: any) => {
        let dataObj: { senderId?: string; messageId?: string; receiverId?: string; accessToken?: string } = {};
        dataObj.messageId = item.id;
        dataObj.senderId = loggedUserId ?? '';
        dataObj.receiverId = item.receiverId;
        dataObj.accessToken = token ?? undefined;
        const data = JSON.stringify(dataObj);

        console.log('deleteForEveryone', data);
        (socketRef.current as any).emit('delete-message-for-everyone', data);
        setSelectedMsg(null);
    }

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
            setSelectedMsg(null);
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

    const replyMessage = (msg: any) => {
       
        console.log('replyMessage', msg);
        users?.forEach((user, index) => {
            if (user?.userId != msg.id) {
                console.log('replyMessageNew', user);
                if(user.userName)
                    msg.recieverName =  user.userName;
            }
        })
        setCurrentReplyToMessage(msg);
        console.log('==loggedUserId=='+loggedUserId);
    };

    const closeReply =() => {
        setCurrentReplyToMessage(null);
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

    const scrollChatToBottom = () => {
        if(autoScrolElem.current) {
            // setTimeout(() => {
            // // autoScrolElem.current.scrollTop = autoScrolElem.current.scrollHeight;
            // }, 1500);
        }
    };

    const submitH = (e: any) => {
        // console.log("htting", msg, msgType);
        if (e) {
            e.preventDefault();
        }
        e.stopPropagation();
        let messageType = msgType;
        if(selectedGift){
            console.log('start of gift..')
            // setMsgType('Gift');
            messageType = 'Gift';
        }
       
        let messageData = {
            to: loggedUserId != receiver ? receiver : sender,
            message: msg,
            from: loggedUserId == sender ? sender : sender,
            type: messageType,
            accessToken: token,
            ...(currentReplyToMessage && { repliedMessageId: currentReplyToMessage.id }),
            ...(selectedGift ? { giftId: selectedGift._id } : {})

        };

        
       
        console.log('messageData');
        console.log(messageData);
        // Get current time
        const currentTime = moment();
        // console.log(messageData)
        // Format the current time using moment.js
        const formattedTime = currentTime.format('h:mm A');
        if (msg.length !== 0) {
            let tempUserArr: any[] = [];
            users?.forEach((user) => {
                if (user?.userId === activeUser?.userId) {
                    tempUserArr.push({
                        ...activeUser,
                        lastMsg: msg,
                        lastSeen: getLatestMsgDateFormat(Date.now()),
                    });
                } else {
                    tempUserArr.push(user);
                }
            });
            setUsers(tempUserArr);

            const activeUserIndex = tempUserArr.findIndex(user => user.userId === activeUser.userId);
            if (activeUserIndex !== -1) {
                const [activeUser] = tempUserArr.splice(activeUserIndex, 1); // Remove the active user from its current position
                tempUserArr.unshift(activeUser); // Add the active user to the beginning of the array
            }


            if (smsRef.length > 0) {
                setActiveChat({
                    ...activeChat,
                    chats: [
                        ...activeChat?.chats,
                        {
                            to: loggedUserId != receiver ? receiver : sender,
                            from: loggedUserId == sender ? sender : sender,
                            msg: msg,
                            type: messageType,
                            time: formattedTime,
                            emojis: false,
                            dropdown: false,
                            id: new Date().getTime(),
                            // replysms: smsRef,
                            ...(currentReplyToMessage && {
                                replysms: currentReplyToMessage.msg,
                                receiverId: currentReplyToMessage.receiverId,
                                recieverName: currentReplyToMessage.recieverName,
                            }),
                            gift:selectedGift
                        },
                    ],
                });

                // Clear the message for the active user in messagesState
                setMessagesState((prev) => ({
                    ...prev,
                    [activeUser.userId]: '', // Clear the message for the active user
                }));

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
                            to: loggedUserId != receiver ? receiver : sender,
                            from: loggedUserId == sender ? sender : sender,
                            type: messageType,
                            msg: msg,
                            time: formattedTime,
                            emojis: false,
                            dropdown: false,
                            id: new Date().getTime(),
                            gift: selectedGift,
                            // Only include these values if currentReplyToMessage exists
                            ...(currentReplyToMessage && {
                                replysms: currentReplyToMessage.msg,
                                receiverId: loggedUserId != receiver ? receiver : sender,
                                recieverName: currentReplyToMessage.recieverName
                            }),
                        },
                    ],
                });
                console.log('active chat message');
                console.log({
                    to: loggedUserId != receiver ? receiver : sender,
                    from: loggedUserId == sender ? sender : sender,
                    type: messageType,
                    msg: msg,
                    time: formattedTime,
                    emojis: false,
                    dropdown: false,
                    id: new Date().getTime(),
                    gift: selectedGift,
                    // Only include these values if currentReplyToMessage exists
                    ...(currentReplyToMessage && {
                        replysms: currentReplyToMessage.msg,
                        receiverId: loggedUserId != receiver ? receiver : sender,
                        recieverName: currentReplyToMessage.recieverName
                    }),
                });
                console.log('active object..')
                console.log('messageData', messageData);
                // (socketRef.current as any).emit('send-msg', JSON.stringify(messageData));
                // Emit the 'send-msg' event and pass a callback function to receive a response
                (socketRef.current as any).emit('send-msg', JSON.stringify(messageData), (response:any) => {
                    console.log('Callback Response:', response);
                    // You can handle the response here, e.g., show a toast or update the UI
                });

                // Clear the message for the active user in messagesState
                setMessagesState((prev) => ({
                    ...prev,
                    [activeUser.userId]: '', // Clear the message for the active user
                }));

                setCurrentReplyToMessage(null);
                console.log('all chats');
                console.log(activeChat);
                setMsg('');
                setMsgType('');
            }
            // console.log('Current socket : ', socketRef.current);
            setMsg('');
            setMsgType('');
            setSelectedGift(null);
        }

        setSmsRef('');
        setSmsId('');
        scrollToBottomChat();
        setreplysms(false);
    };

    useEffect(() => {
        // Focus input when component mounts
        setTimeout(() => {
            inputRef.current?.focus();
            scrollToBottom();
        }, 500);
    }, []);
    
    // useEffect(() => {
    //     scrollToBottom();
    // }, [activeChat?.chats]); // Scroll when chats update

    const scrollToBottom = () => {
        console.log(
            "scrollToBottom", autoScrolElem.current, autoScrolElem.current.scrollTop, autoScrolElem.current.scrollHeight
        )
        if (autoScrolElem.current) {
            autoScrolElem.current.scrollTop = autoScrolElem.current.scrollHeight + 300;
        }
    };

    const scrollToBottomChat = () => {
        if (autoScrolElem.current) {
            setTimeout(() => {
                autoScrolElem.current.scrollTop = autoScrolElem.current.scrollHeight;
            }, 100);
        }
    };

    useEffect(() => {
        loadChats();
        startSocket();
        console.log(
            'activeUser', activeUser);
    }, []);

    useEffect(() => {
        if (Object.keys(activeUser).length == 0 && users.length > 0) {
            setConversationId(users[0]?.conversationId);
            (async () => {
                await loadChatMessages(users[0]?.senderId, users[0]?.receiverId, users[0]?.conversationId, users[0]);
                setTimeout(() => {
                    inputRef.current?.focus();
                    scrollToBottom();
                }, 500);
            })();
            if (valueReceived) {
                chatSwitchH(valueReceived);
            } else {
                setActiveUser(users[0]);
                localStorage.setItem('chatActiveUser', users[0]?.userId);
                setChatActiveUserId(users[0]?.userId);
                setSender(users[0]?.senderId);
                setReceiver(users[0]?.receiverId);
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
            console.log("active users", user)
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

    const searchChatMessages = async (
        query: String | Number,
        // receiverId: String | Number,
        conversationId: String | Number
    ) => {
        try {
            const response = await fetch(
                `${API_KEY}/chat/search/conversation/messages?page=${queryPage}&pageSize=10&searchQuery=${query}&conversationId=${conversationId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            const tempArr: any[] = [];
            res?.data?.data.forEach((element: any, index: number, array: any[]) => {
                // Convert milliseconds to date
                const date = new Date(element?.createdTime);

                // Format the date using moment.js
                const messageTimeStamp = moment(date).format('h:mm A');

                tempArr.push({
                    recieverName: element.receiverId.name,
                    isForwarded: element?.isForwarded,
                    msg: element?.message,
                    time: messageTimeStamp,
                    emojis: false,
                    dropdown: false,
                    id: element?._id,
                    isrecevied: element?.receiverId?._id == loggedUserId ? false : true,
                    receiverId: element?.receiverId?._id,
                    stared: element?.isStarred,
                    isRead: element?.isRead,
                    type: element?.type,
                    replysms: element?.repliedMessage
                        ? element?.repliedMessage?.message
                        : false,
                });

            });

            setActiveChat((currentChat: any) => ({
                ...currentChat,
                chats: tempArr,
            }));
        } catch (error) {
            console.log('error chat messages', error);
        }
    };

    const flushChatState = () => {
        setActiveChat({});
    }

    const searchMessagesHandler = (e: any) => {
        setSearchQuery(e);
        if (e.length >= 3) {
            searchChatMessages(e, users[0]?.conversationId);
        }
        if (e.length === 0) {
            flushChatState();
            loadChatMessages(users[0]?.senderId, users[0]?.receiverId, users[0]?.conversationId, users[0]);
        }
    };

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setIsDarkTheme(style.darkTheme);
        }
    });

    useUpdateEffect(() => {
        fetchStaredMessages();
    }, [staredmodal]);

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
            
            {/* <img onClick={()=>navigate('/')} className='float-left mt-3 ml-4 cursor-pointer' src={isDarkTheme?leftArrowCurvedinWhite:leftArrowCurved} alt="" /> */}
            <div className='flex'>
                <div className='max-w-72'>
                <SideNavBar />
                </div>
                <div className={`${style.parent} ${isDarkTheme}`}>
                <ConfirmDelete deleteHandler={deleteH} deleteForEveryone={deleteForEveryone} isDarkTheme={isDarkTheme} msg={selectedMsg} handleClose={()=>setSelectedMsg(null)} />
                <UserChats
                    // onUsersInputChangeHandler={onUsersInputChangeHandler}
                    id={activeUser?.userId}
                    OnChatClick={chatSwitchH}
                    data={users}
                    userPinH={userPinH}
                    onBlock={onBlock}
                    setstaredmodal={setstaredmodal}
                    isDarkTheme={!!isDarkTheme}
                    activeConversation={conversationId}
                    isMuted={isMuted}
                />
                <div className={style.chat}>
                    <div className={`${style.sec1} bg-cover bg-no-repeat bg-center`}
                     style={{backgroundImage: `url(${isDarkTheme?chatEmojiBgDark:chatEmojiBg})`}}
                    // ref={autoScrolElem}
                    >
                        {/* <div className={chatHeader.parent}>
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
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p className={chatHeader.name}>{activeUser?.userName}</p>
                                    </div>
                                </div>
                                <img className='pointer-cursor'
                                    onClick={() => {
                                        console.log('clicked 🤖🤖', moreOptions);
                                        if (activeUser?.isGroup) {
                                            setGroupOptions(!groupOptions);
                                            setshowShortSidebar(!showShortSidebar);
                                            if (showShortSidebar) {
                                                // setMoreOptions(!moreOptions);
                                                setshowShortSidebar(false);
                                            }
                                        } else {
                                            setMoreOptions(!moreOptions);
                                        }
                                    }}
                                    //  chatHeader={{ cursor: 'pointer' }}
                                    src={more} alt="" />
                            </div>
                        </div> */}

                        <ChatHeader
                            openProfileSec={() => setIsProfileSecVisible(!isProfileSecVisible)}
                            isGroup={activeUser?.isGroup}
                            safeMsg={markTheMsgSafe}
                            name={activeUser?.userName}
                            nickName={activeUser?.nickName}
                            profilePic={activeUser?.avatar}
                            moreOptionH={() => {
                                if (activeUser?.isGroup) {
                                    setGroupOptions(!groupOptions);
                                    setshowShortSidebar(!showShortSidebar);
                                    if (showShortSidebar) {
                                        // setMoreOptions(!moreOptions);
                                        setshowShortSidebar(false);
                                    }
                                } else {
                                    setMoreOptions(!moreOptions);
                                }
                            }}
                            onReportClick={() => setreportPopup(true)}
                            onMarkSafe={() => setMarkTheMsgSafe(true)}
                            searchMessage={searchMessage}
                            showSearchMessage={showSearchMessage}
                            searchMessagesHandler={searchMessagesHandler}
                            searchMsgBar={() => {
                                flushChatState();
                                setSearchQuery('');
                                showSearchMessage(false);
                                loadChatMessages(users[0]?.senderId, users[0]?.receiverId, users[0]?.conversationId, users[0]);
                            }}
                            isDarkTheme={!!isDarkTheme}
                        />
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
                            openDeleteModal={(item:any) =>setSelectedMsg(item)}
                            valuesH={valuesH}
                            valuesH2={valuesH2}
                            deleteH={deleteH}
                            forwardH={forwardH}
                            activeUser={activeUser}
                            longPressH={longPressH}
                            autoScrolElem={autoScrolElem}
                            scrollToBottom={scrollToBottom}
                            activeChat={activeChat}
                            copyH={copyH}
                            replyMessage={replyMessage}
                            showToast={showToast}
                            handleScroll={handleScroll}
                            searchQuery={searchQuery}
                            isDarkTheme={!!isDarkTheme}
                            reactToMessage={reactToMessage}
                            removeReaction={removeReaction}
                        />
                        {/* )}  */}
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
                            isDarkTheme={!!isDarkTheme}
                            data={activeUser}
                            closeReply={closeReply}
                            currentReplyToMessage={currentReplyToMessage}
                            setMessagesState={setMessagesState}
                            inputRef={inputRef}
                            setSelectedGift={setSelectedGift}
                            selectedGift={selectedGift}
                        />
                    )}
                    {!groupOptions && moreOptions && (
                        <DropDown
                            activeUser={activeUser}
                            pinUserH={userPinH}
                            blockH={() => {
                                setdangetBtnText(
                                    `   ${activeUser?.isBlocked ? 'UnBlock' : 'Block'}`
                                );
                                setDengerText(
                                    `Are you sure you want to ${activeUser?.isBlocked ? 'UnBlock' : 'Block'
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
                            isDarkTheme={!!isDarkTheme}
                        />
                    )}
                </div>
                
                {/* 
                    {groupOptions && (
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
                        isDarkTheme={isDarkTheme}
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
                {isProfileSecVisible && <ProfileSec data={activeUser} isDarkTheme={isDarkTheme} onClose={() => setIsProfileSecVisible(false)} searchMessage={showSearchMessage} manipulateUsers={setUsers} manipulateActiveUser={setActiveUser} />}
            </div>
            </div>
            {/* 
                <SearchUser
                    onOpen={addMembersPopup}
                    blockPopupHandler={() => {
                        setdangetBtnText('Block');
                        setDengerText(`Are you sure you want to block ${activeUser?.userName}?`);
                        setblockPopup(true);
                    }}
                    reportPopupHandler={() => setreportPopup(true)}
                    onClose={() => setAddMembersPopup(false)}
                /> 
            */}
            {/* 
                <EditChatName
                    onOpen={editGroupNameModal}
                    onClose={() => setEditGroupNameModal(false)}
                    onSaveChanges={onSaveChanges}
                />
            */}
            <Forwardusers onOpen={forwardModal} forwardNow={forwardNow} onClose={() => { setforwardModal(false); setForwardMsg(null) }} />
            <div>
                <ToastContainer />
            </div>
        </Layout>
    );
};

export default ChatComponent;