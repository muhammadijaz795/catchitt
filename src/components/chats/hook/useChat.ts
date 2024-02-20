import React, { useEffect, useRef, useState } from 'react';
import { DEMI_USERS } from '../data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useChat() {
    const [moreOptions, setMoreOptions] = useState<boolean>(false);
    const [reportPopup, setreportPopup] = useState<boolean>(false);
    const [blockPopup, setblockPopup] = useState<boolean>(false);
    const [editGroupNameModal, setEditGroupNameModal] = useState<boolean>(false);
    const [markTheMsgSafe, setMarkTheMsgSafe] = useState<boolean>(false);
    const [groupOptions, setGroupOptions] = useState<boolean>(false);
    const [smsRef, setSmsRef] = useState<string>('');
    const [dangetBtnText, setdangetBtnText] = useState<string>('');
    const [noOfDeleteSMS, setnoOfDeleteSMS] = useState<number>(0);
    const [copyModal, setCopyModal] = useState(false);
    const [replySms, setreplysms] = useState<boolean>(false);
    const [forwardModal, setforwardModal] = useState<boolean>(false);
    const [staredmodal, setstaredmodal] = useState<boolean>(true);
    const [selectedData, setselectedData] = useState<any[]>([]);
    const [addMembersPopup, setAddMembersPopup] = useState<boolean>(false);
    const [showShortSidebar, setshowShortSidebar] = useState<boolean>(false);
    const [DangerText, setDengerText] = useState<string>(
        'Are you sure you want to block Mohamed ?'
    );
    const [msg, setMsg] = useState<string>('');
    const [activeUser, setActiveUser] = useState<any>({});
    const [activeChat, setactiveChat] = useState<any>({});

    const [users, setUsers] = useState<any[]>(DEMI_USERS);
    const [chats, setchats] = useState<any[]>([
        {
            userId: 2,
            userName: 'ahmad',
            chats: [
                {
                    msg: 'Hello',
                    time: '4:01 PM',
                    emojis: false,
                    dropdown: false,
                    showEmogis: false,
                    id: 1,
                    isrecevied: true,
                },
                {
                    msg: 'How are You?',
                    time: '4:01 PM',
                    emojis: false,
                    dropdown: false,
                    showEmogis: false,
                    isrecevied: true,
                    id: 2,
                },
                {
                    msg: '??',
                    time: '4:01 PM',
                    emojis: false,
                    dropdown: false,
                    showEmogis: false,
                    isrecevied: true,
                    id: 3,
                },
            ],
        },
    ]);

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
            } else {
                tempArr.push(msg);
            }
        });
        setactiveChat({ ...activeChat, chats: tempArr });
    };

    const deleteH = (item: any) => {
        const tempArr: any[] = [];
        activeChat.chats.forEach((msg: any) => {
            if (msg.id !== item.id) {
                tempArr.push(msg);
            }
        });
        setactiveChat({ ...activeChat, chats: tempArr });
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
        e.stopPropagation();
        if (msg.length !== 0) {
            if (smsRef.length > 0) {
                setactiveChat({
                    ...activeChat,
                    chats: [
                        ...activeChat.chats,
                        {
                            msg: msg,
                            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                            emojis: false,
                            dropdown: false,
                            id: new Date().getTime(),
                            replysms: smsRef,
                        },
                    ],
                });
                setMsg('');
            } else {
                setactiveChat({
                    ...activeChat,
                    chats: [
                        ...activeChat.chats,
                        {
                            msg: msg,
                            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                            emojis: false,
                            dropdown: false,
                            id: new Date().getTime(),
                        },
                    ],
                });
            }
            setMsg('');
        }

        setSmsRef('');
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
        users?.forEach((user) => {
            if (user.userId === e) {
                setActiveUser(user);
            }
        });
        setstaredMsgs([]);
    };

    useEffect(() => {
        setactiveChat(chats[0]);
        setActiveUser(users[1]);
    }, []);

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

    const userPinH = (id?: any) => {
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

        const tempArr: any[] = [];
        const filteredArr: any[] = [];
        setActiveUser({
            ...activeUser,
            ispined: !activeUser.ispined,
        });
        users.forEach((user) => {
            if (user.userId === activeUser.userId) {
                tempArr.push({
                    ...activeUser,
                    ispined: !activeUser.ispined,
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

    const showToast =()=>{
        toast.success('🎉 Copied successfully', {
            position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
            autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
        });
    }

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
        users.forEach((user) => {
            if (user.userId === activeUser.userId) {
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

    const onBlock = () => {
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
    };
}

export default useChat;
