import React, { useEffect, useRef, useState } from 'react';

function useChat() {
    const [moreOptions, setMoreOptions] = useState<boolean>(false);
    const [reportPopup, setreportPopup] = useState<boolean>(false);
    const [blockPopup, setblockPopup] = useState<boolean>(false);
    const [groupOptions, setGroupOptions] = useState<boolean>(false);
    const [markTheMsgSafe, setMarkTheMsgSafe] = useState<boolean>(false);
    const [smsRef, setSmsRef] = useState<string>('');
    const [copyModal, setCopyModal] = useState(false);
    const [replySms, setreplysms] = useState<boolean>(false);
    const [showShortSidebar, setshowShortSidebar] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');
    const [activeUser, setActiveUser] = useState<any>({});
    const [activeChat, setactiveChat] = useState<any>({});

    const [users, setUsers] = useState<any[]>([
        {
            userId: 1,
            userName: 'Eromaisa',
            lastMsg:
                'We really care about your safety. We will stop showing this message once you mark it safe.',
            ispined: true,
            lastSeen: '4:01 PM',
            unReadMsgs: '201',
        },
        {
            userId: 2,
            userName: 'ahmad',
            lastMsg:
                'We really care about your safety. We will stop showing this message once you mark it safe.',
            ispined: false,
            unReadMsgs: '9',
            lastSeen: '4:01 PM',
        },
        {
            userId: 3,
            userName: 'Group',
            lastMsg:
                'We really care about your safety. We will stop showing this message once you mark it safe.',
            ispined: false,
            unReadMsgs: '9',
            lastSeen: '4:01 PM',
            isGroup: true,
        },
        {
            userId: 4,
            userName: 'Eromaisa',
            lastMsg:
                'We really care about your safety. We will stop showing this message once you mark it safe.',
            ispined: false,
            unReadMsgs: '9',
            lastSeen: '4:01 PM',
        },
        {
            userId: 5,
            userName: 'Eromaisa',
            lastMsg:
                'We really care about your safety. We will stop showing this message once you mark it safe.',
            ispined: false,
            unReadMsgs: '9',
            lastSeen: '4:01 PM',
        },
        {
            userId: 6,
            userName: 'Eromaisa',
            lastMsg:
                'We really care about your safety. We will stop showing this message once you mark it safe.',
            ispined: false,
            unReadMsgs: '9',
            lastSeen: '4:01 PM',
        },
    ]);
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
                tempArr.push({ ...item, [keyName]: value  , dropdown:false});
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
                            id: activeChat.chats.length + 1,
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
                            id: activeChat.chats.length + 1,
                        },
                    ],
                });
            }
            setMsg('');
        }

        setSmsRef('');
        scrollToBottom();
        setreplysms(false);
        console.log(activeChat);
    };

    const welcomeMsgH = () => {};

    const chatSwitchH = (e: any) => {
        users?.forEach((user) => {
            if (user.userId === e) {
                setActiveUser(user);
            }
        });
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
        setMoreOptions(false);
    }, [activeUser]);

    const userPinH = (id?: any) => {
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
    };

    useEffect(() => {
        if (copyModal) {
            setTimeout(() => {
                setCopyModal(false);
            }, 2000);
        }
    }, [copyModal]);
    return {
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
        welcomeMsgH,
        chatSwitchH,
        userPinH,
        copyH,
        copyModal,
        setCopyModal,
    };
}

export default useChat;
