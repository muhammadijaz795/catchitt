import { Switch } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import useLongPress from '../../utils/useLongPress';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './coming-soon.module.scss';

// Assets
import { ToastContainer } from 'react-toastify';
import { closeSvg, copyMsg, deleteMsg, starMsg, unStarMsg } from '../../icons';
import PopupForReport from '../profile/popups/PopupForReport';
import LongPressButton from './components/LongPressEvent';
import arrowRight from './svg-components/arrow-right.svg';
import attachment from './svg-components/attachment.svg';
import userAvatar from './svg-components/avatar.svg';
import emojie from './svg-components/emojie.svg';
import menuBox from './svg-components/menuBox.svg';
import microphone from './svg-components/microphone.svg';
import moreoptions from './svg-components/more-options.svg';
import newChat from './svg-components/newChat.svg';
import pinnedChat from './svg-components/pinnedChat.svg';
import share from './svg-components/reply.svg';
import searchChat from './svg-components/search.svg';
import seen from './svg-components/seen.svg';

export interface ComingSoonProps {
    className?: string;
}

const ComingSoon: React.FC = (className: ComingSoonProps) => {
    const { selectedIndex, setIndex } = useAuthStore();
    const [allChats, setAllChats] = useState<any[]>([
        {
            id: 1,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 2,
            name: 'zaman',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 3,
            name: 'ahmad',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 4,
            name: 'ameen',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 5,
            name: 'ali',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 7,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 8,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 9,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 10,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 11,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 12,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 13,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 14,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
        {
            id: 15,
            name: 'Eromaisa',
            lastMsg: 'Babe look at our ....',
            ispined: false,
            isFriend: false,
            isStared: false,
        },
    ]);

    const [activeChat, setactiveChat] = useState<any>({});

    const [receivedMessages, setReceivedMessages] = useState<any>([
        {
            message: 'hello',
            timestamp: '11:14 AM',
            user_avatar: '/src/components/coming-soon/svg-components/avatar.svg',
            id: 1,
        },
        {
            message: 'How are You',
            timestamp: '11:14 AM',
            user_avatar: '/src/components/coming-soon/svg-components/avatar.svg',
            id: 2,
        },
        {
            message: '??',
            timestamp: '11:14 AM',
            user_avatar: '/src/components/coming-soon/svg-components/avatar.svg',
            id: 3,
        },
    ]);
    const [sendMessages, setsendMessages] = useState<any>([]);
    const [muteNotifications, setMuteNotifications] = useState(false);
    const [copyModal, setCopyModal] = useState(false);
    const [activeMsg, setActiveMsg] = useState({});
    const [tagMsg, setTagMsg] = useState(false);
    const [pinToTop, setPinToTop] = useState(false);
    const [showMenuBox, setShowMenuBox] = useState(false);
    const [message, setMessage] = useState('');
    const div: any = useRef(null);
    const [blockUserPopup, setBlockUserPopup] = useState(false);
    const [reportPopup, setReportPopup] = useState(false);
    const [onLongPressed, setOnLongPressed] = useState(false);

    const onLongPress = (item: any) => {
        setOnLongPressed(!onLongPressed);
        console.log('longpress is triggered', item);
    };

    const onClick = () => {
        console.log('click is triggered');
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 800,
    };
    const longPressEvent: any = useLongPress(onLongPress, onClick, defaultOptions);

    const sendMessageHandler = (e: any) => {
        e.preventDefault();

        if (tagMsg) {
            if (message) {
                console.log('Message Text : ', message);
                setMessage('');
                setsendMessages((current: any) => [
                    ...current,
                    {
                        message,
                        timestamp: '11:14 AM',
                        user_avatar: userAvatar,
                        id: sendMessages.length,
                        replyMsg: activeMsg,
                    },
                ]);
            }
            setActiveMsg({});
            setTagMsg(false);
        } else {
            if (message) {
                console.log('Message Text : ', message);
                setMessage('');
                setsendMessages((current: any) => [
                    ...current,
                    {
                        message,
                        timestamp: '11:14 AM',
                        user_avatar: userAvatar,
                        id: sendMessages.length,
                    },
                ]);
            }
        }
        scrollToBottom();
        // div.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const blockUserHandler = () => {
        setBlockUserPopup(true);
        setShowMenuBox(false);
    };

    const blockUserFinallyHandler = () => { };
    const scrollToBottom = () => {
        if (div.current) {
            div.current.scrollTop = div.current.scrollHeight;
        }
    };
    // useEffect(() => {
    //     scrollToBottom();
    //     console.log(receivedMessages);
    // }, [receivedMessages, sendMessages]);

    useEffect(() => {
        allChats.forEach((chat: any) => {
            if (chat?.id === 1) {
                setactiveChat(chat);
            }
        });
    }, []);

    const Emoji = ({ id }: any) => {
        return (
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    // position: 'absolute',
                    // top: '-80%',
                    // right: '-150%',
                    zIndex: 2,
                    display: 'flex',
                    width: '217px',
                    height: 41,
                    color: '#5448B2',
                    textAlign: 'center',
                    fontFamily: 'Poppins',
                    fontSize: 20,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                    background: '#EEEDF7',
                    borderRadius: 50,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                }}
            >
                <span
                    style={{
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 5,
                    }}
                    onClick={() => emojiH(id, true)}
                >
                    ❤️{' '}
                </span>
                <span
                    style={{
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 5,
                    }}
                    onClick={() => emojiH(id, true)}
                >
                    {' '}
                    😂{' '}
                </span>
                <span
                    style={{
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 5,
                    }}
                    onClick={() => emojiH(id, true)}
                >
                    {' '}
                    🥰{' '}
                </span>
                <span
                    style={{
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 5,
                    }}
                    onClick={() => emojiH(id, true)}
                >
                    {' '}
                    😭{' '}
                </span>
                <span
                    style={{
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 5,
                    }}
                    onClick={() => emojiH(id, true)}
                >
                    😳{' '}
                </span>
                <span
                    style={{
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 5,
                    }}
                    onClick={() => emojiH(id, true)}
                >
                    {' '}
                    👍{' '}
                </span>
                <span
                    style={{
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 5,
                    }}
                    onClick={() => emojiH(id, true)}
                    color="#5448B2"
                >
                    {' '}
                    +
                </span>
            </div>
        );
    };

    const emojiH = (id: number, boolean?: boolean, a?: string) => {
        if (a) {
            let tempArr: any[] = [];
            if (!boolean) {
                receivedMessages.forEach((msg: any, i: number) => {
                    if (msg?.id === id) {
                        tempArr.push({ ...msg, emoji: true, dropDown: false });
                    } else {
                        tempArr.push({ ...msg, emoji: false, dropDown: false });
                    }
                });
                console.log(receivedMessages);
            }

            if (boolean) {
                receivedMessages.forEach((msg: any, i: number) => {
                    tempArr.push({ ...msg, emoji: false, dropDown: false, menu: false });
                });
            }

            setReceivedMessages(tempArr);
        } else {
            let tempArr: any[] = [];
            if (!boolean) {
                sendMessages.forEach((msg: any, i: number) => {
                    if (msg?.id === id) {
                        tempArr.push({ ...msg, emoji: true, dropDown: false });
                    } else {
                        tempArr.push({ ...msg, emoji: false, dropDown: false });
                    }
                });
                console.log(sendMessages);
            }

            if (boolean) {
                sendMessages.forEach((msg: any, i: number) => {
                    tempArr.push({ ...msg, emoji: false, dropDown: false, menu: false });
                });
            }

            setsendMessages(tempArr);
        }
    };

    const starH = (id: number, a?: string) => {
        if (a) {
            let tempArr: any[] = [];
            receivedMessages.forEach((msg: any, i: number) => {
                if (msg?.id === id) {
                    if (msg?.star) {
                        tempArr.push({
                            ...msg,
                            dropDown: false,
                            emoji: false,
                            star: false,
                            menu: false,
                        });
                    } else {
                        tempArr.push({
                            ...msg,
                            dropDown: false,
                            emoji: false,
                            star: true,
                            menu: false,
                        });
                    }
                } else {
                    tempArr.push({ ...msg, dropDown: false, emoji: false });
                }
            });
            setReceivedMessages(tempArr);
        } else {
            let tempArr: any[] = [];
            sendMessages.forEach((msg: any, i: number) => {
                if (msg?.id === id) {
                    if (msg?.star) {
                        tempArr.push({
                            ...msg,
                            dropDown: false,
                            emoji: false,
                            star: false,
                            menu: false,
                        });
                    } else {
                        tempArr.push({
                            ...msg,
                            dropDown: false,
                            emoji: false,
                            star: true,
                            menu: false,
                        });
                    }
                } else {
                    tempArr.push({ ...msg, dropDown: false, emoji: false });
                }
            });
            setsendMessages(tempArr);
        }
    };
    const dropDH = (id: number, a?: string) => {
        if (a) {
            let tempArr: any[] = [];
            receivedMessages.forEach((msg: any, i: number) => {
                if (msg?.id === id) {
                    tempArr.push({ ...msg, dropDown: true, emoji: false });
                } else {
                    tempArr.push({ ...msg, dropDown: false, emoji: false });
                }
            });
            setReceivedMessages(tempArr);
        } else {
            let tempArr: any[] = [];
            sendMessages.forEach((msg: any, i: number) => {
                if (msg?.id === id) {
                    tempArr.push({ ...msg, dropDown: true, emoji: false });
                } else {
                    tempArr.push({ ...msg, dropDown: false, emoji: false });
                }
            });
            setsendMessages(tempArr);
        }
    };

    const deleteMsgF = (id: number, a?: string) => {
        if (a) {
            let tempArr: any[] = [];
            receivedMessages.forEach((msg: any, i: number) => {
                if (msg?.id !== id) {
                    tempArr.push({ ...msg, dropDown: false, emoji: false });
                }
            });
            setReceivedMessages(tempArr);
        } else {
            let tempArr: any[] = [];
            sendMessages.forEach((msg: any, i: number) => {
                if (msg?.id !== id) {
                    tempArr.push({ ...msg, dropDown: false, emoji: false });
                }
            });
            setsendMessages(tempArr);
        }
    };

    const copyH = (msg: any, a?: string) => {
        if (a) {
            let tempArr: any[] = [];
            navigator.clipboard.writeText(msg).then(() => {
                setCopyModal(true);
            });

            receivedMessages.forEach((msg: any, i: number) => {
                tempArr.push({ ...msg, dropDown: false, emoji: false, menu: false });
            });
            receivedMessages(tempArr);
        } else {
            navigator.clipboard.writeText(msg).then(() => {
                setCopyModal(true);
            });

            let tempArr: any[] = [];
            sendMessages.forEach((msg: any, i: number) => {
                tempArr.push({ ...msg, dropDown: false, emoji: false, menu: false });
            });
            setsendMessages(tempArr);
        }
    };
    console.log(receivedMessages);

    const chatswitcher = (chat: any) => {
        let tempArr: any[] = [];
        allChats.map((user: any) => {
            if (user.id === chat.id) {
                tempArr.push({ ...user, chats: sendMessages });
            } else {
                tempArr.push(user);
            }
        });
        setAllChats(tempArr);
        setactiveChat(chat);
    };

    useEffect(() => {
        if (tagMsg) {
            setTagMsg(false);
        }
        allChats.forEach((chat: any) => {
            if (chat?.id === activeChat?.id) {
                if (chat?.chats) {
                    setsendMessages(chat?.chats);
                } else {
                    setsendMessages([]);
                }
            }
        });
    }, [activeChat]);
    const MenuH = (item: any, a?: string) => {
        if (a) {
            let tempArr: any[] = [];
            receivedMessages.forEach((msg: any, i: number) => {
                if (msg?.id === item?.id) {
                    tempArr.push({ ...msg, dropDown: false, emoji: false, menu: true });
                } else {
                    tempArr.push({ ...msg, dropDown: false, emoji: false, menu: false });
                }
            });
            setReceivedMessages(tempArr);
        } else {
            let tempArr: any[] = [];
            sendMessages.forEach((msg: any, i: number) => {
                if (msg?.id === item?.id) {
                    tempArr.push({ ...msg, dropDown: false, emoji: false, menu: true });
                } else {
                    tempArr.push({ ...msg, dropDown: false, emoji: false, menu: false });
                }
            });
            setsendMessages(tempArr);
        }
    };

    const globalClicker = () => {
        if (showMenuBox) {
            setShowMenuBox(false);
        }

        let tempArr: any[] = [];
        receivedMessages.forEach((msg: any, i: number) => {
            tempArr.push({ ...msg, dropDown: false, emoji: false, menu: false });
        });
        setReceivedMessages(tempArr);
    };

    useEffect(() => {
        if (copyModal) {
            setTimeout(() => {
                setCopyModal(false);
            }, 3000);
        }
    }, [copyModal]);
    return (
        <div className={styles.root} onClick={globalClicker}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.suggestedContent}>
                        <div className={styles.chatlist}>
                            <div className={styles.chatHeader}>
                                <p>Chat</p>
                                <img src={newChat} alt="" />
                            </div>
                            <div className={styles.searchChats}>
                                <img src={searchChat} alt="" />
                                <input type="search" name="" id="" placeholder="Search" />
                            </div>
                            <div className={styles.chatListContainer}>
                                {allChats.map((singleChat: any, index: number) => (
                                    <div
                                        onClick={() => chatswitcher(singleChat)}
                                        className={styles.allChats}
                                        style={{
                                            cursor: 'pointer',
                                            background:
                                                singleChat.id === activeChat?.id
                                                    ? '#dfdfdf'
                                                    : '#FFF',
                                        }}
                                    >
                                        <img
                                            className={styles.userAvatar}
                                            src={userAvatar}
                                            alt=""
                                        />
                                        <div className={styles.userNameNChat}>
                                            <p>{singleChat?.name}</p>
                                            <p>{singleChat?.lastMsg}</p>
                                        </div>
                                        <div className={styles.timeNCount}>
                                            <p>4:01 PM</p>
                                            {index === 0 && <img src={pinnedChat} alt="" />}
                                            {index === 1 && (
                                                <div className={styles.messageCount}>
                                                    <p>1</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.chatmessage}>
                            <div
                                onClick={() => showMenuBox && setShowMenuBox(false)}
                                className={styles.messageHeader}
                            >
                                <div className={styles.messageHeaderLeft}>
                                    <img className={styles.userAvatar} src={userAvatar} alt="" />
                                    <p>{activeChat.name}</p>
                                </div>
                                <div className={styles.dropdownMenuContainer}>
                                    <img
                                        onClick={() => {
                                            setShowMenuBox(!showMenuBox);
                                        }}
                                        className={styles.dropdownMenuBoxImg}
                                        src={menuBox}
                                        alt=""
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {showMenuBox && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className={styles.dropdownMenu}
                                        >
                                            <div className={styles.dropdownRow}>
                                                <p>Mute notificaions</p>
                                                <Switch
                                                    onChange={(event) =>
                                                        setMuteNotifications(event)
                                                    }
                                                    value={muteNotifications}
                                                    size="small"
                                                    defaultChecked
                                                />
                                            </div>
                                            <div className={styles.dropdownRow}>
                                                <p>Pin to top</p>
                                                <Switch
                                                    onChange={(event) => setPinToTop(event)}
                                                    value={pinToTop}
                                                    size="small"
                                                    defaultChecked
                                                />
                                            </div>
                                            <div className={styles.dropdownRow}>
                                                <p>Starred Messages</p>
                                                <div className={styles.starredMessagesRow}>
                                                    <p>None</p>
                                                    <img
                                                        className={styles.arrowRight}
                                                        src={arrowRight}
                                                        alt="arrow right"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                onClick={blockUserHandler}
                                                className={styles.dropdownRow}
                                            >
                                                <p className={styles.warningMenuItem}>Block</p>
                                                <div
                                                    style={{ visibility: 'hidden' }}
                                                    className={styles.starredMessagesRow}
                                                >
                                                    <p>A</p>
                                                    <img
                                                        className={styles.arrowRight}
                                                        src={arrowRight}
                                                        alt="arrow right"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={styles.dropdownRow}
                                                onClick={() => setReportPopup(true)}
                                            >
                                                <p className={styles.warningMenuItem}>Report</p>
                                                <div
                                                    style={{ visibility: 'hidden' }}
                                                    className={styles.starredMessagesRow}
                                                >
                                                    <p className={styles.warningMenuItem}>None</p>
                                                    <img
                                                        className={styles.arrowRight}
                                                        src={arrowRight}
                                                        alt="arrow right"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* <div className={styles.messageBody}>
                                <img src={emptyMessageBox} alt="" />
                                <p className={styles.userName}>
                                    Say hi to Mohamad <br />
                                    <span>Tap to send Hi!</span>
                                </p>
                            </div> */}
                            <div className={styles.messageBodyAvailable}>
                                <div className={styles.markMessageContainer}>
                                    <div className={styles.markSafeMessageTextContainer}>
                                        <p>Mark this message safe?</p>
                                        <p>
                                            We really care about your safety. We will stop showing{' '}
                                            <br />
                                            this message once you mark it safe.
                                        </p>
                                    </div>
                                    <div className={styles.markSafeButtonsContainer}>
                                        <div className={styles.reportButton}>
                                            <p>Report</p>
                                        </div>
                                        <div className={styles.markSafeButton}>
                                            <p>Mark safe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                    onLongPressed && e.detail === 2 && setOnLongPressed(false);
                                }}
                                className={styles.userChatMessages}
                                ref={div}
                            >
                                {receivedMessages.map((item: any, index: number) => (
                                    <LongPressButton onLongPress={() => MenuH(item, 'R')}>
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    marginRight: `${item.message.length < 70
                                                            ? 70 - item.message.length
                                                            : 0
                                                        }%`,
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'flex-end',
                                                }}
                                            >
                                                {item.emoji && <Emoji id={item?.id} />}
                                            </div>
                                            <div className={styles.sentMessageRowContainer}>
                                                <div
                                                    className={styles.sentMessageRowContainer}
                                                    style={{
                                                        cursor: 'pointer',
                                                        display: item.emoji ? 'flex' : 'block',
                                                        flexDirection: item?.emoji
                                                            ? 'column'
                                                            : 'row',
                                                        // width: '100%',
                                                    }}
                                                >
                                                    {!item?.replyMsg ? (
                                                        <div
                                                            className={
                                                                styles.sentMessageRowContainer
                                                            }
                                                            {...longPressEvent}
                                                        // style={{ width: '90%' }}
                                                        >
                                                            <img
                                                                className={
                                                                    styles.userAvatarChatMessage
                                                                }
                                                                src={item.user_avatar}
                                                                alt=""
                                                                style={{
                                                                    alignSelf: 'flex-start',
                                                                    visibility:
                                                                        index > 0
                                                                            ? 'hidden'
                                                                            : 'visible',
                                                                }}
                                                            />
                                                            <div
                                                                {...longPressEvent}
                                                                className={
                                                                    styles.sentMessageContainer
                                                                }
                                                            // style={{ width: '100%' }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        wordBreak: 'break-word',
                                                                        textAlign: 'left',
                                                                    }}
                                                                    className={styles.sentMessage}
                                                                >
                                                                    {item.message}
                                                                </p>
                                                                <p
                                                                    className={
                                                                        styles.sentMessageTimeStamp
                                                                    }
                                                                >
                                                                    {item.timestamp}
                                                                </p>
                                                            </div>
                                                            {/* <div
                                                                    className={
                                                                        styles.receiveMessageTimeStampContainer
                                                                    }
                                                                >
                                                                    {item?.star && (
                                                                        <img
                                                                            src={starMsg}
                                                                            alt=""
                                                                            style={{
                                                                                paddingRight: 8,
                                                                            }}
                                                                        />
                                                                    )}
                                                                    <p
                                                                        className={
                                                                            styles.receiveMessageTimeStamp
                                                                        }
                                                                    >
                                                                        {item?.timestamp}
                                                                    </p>
                                                                    <img
                                                                        className={styles.seenImage}
                                                                        src={seen}
                                                                        alt=""
                                                                    />
                                                                </div> */}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div
                                                                className={styles.receiveMessage}
                                                                {...longPressEvent}
                                                                style={{ display: 'flex', gap: 12 }}
                                                            >
                                                                <img
                                                                    className={
                                                                        styles.userAvatarChatMessage
                                                                    }
                                                                    src={item.user_avatar}
                                                                    alt=""
                                                                    style={{
                                                                        alignSelf: 'flex-start',
                                                                        visibility:
                                                                            index > 0
                                                                                ? 'hidden'
                                                                                : 'visible',
                                                                    }}
                                                                />
                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            background: '#5448b2',
                                                                            width: '100%',
                                                                            padding: '8px 6px',
                                                                            borderRadius: 4,
                                                                        }}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                background:
                                                                                    '#EEEDF7',
                                                                                borderRadius: 4,
                                                                                padding: '8px 12px',
                                                                            }}
                                                                        >
                                                                            <p
                                                                                className={
                                                                                    styles.primaryText
                                                                                }
                                                                                style={{
                                                                                    textAlign:
                                                                                        'left',
                                                                                }}
                                                                            >
                                                                                {activeChat?.name}
                                                                            </p>
                                                                            <p
                                                                                className={
                                                                                    styles.blackText
                                                                                }
                                                                                style={{
                                                                                    paddingTop: 4,
                                                                                    textAlign:
                                                                                        'left',
                                                                                    wordBreak:
                                                                                        'break-word',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item?.replyMsg
                                                                                        ?.message
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <p
                                                                            style={{
                                                                                wordBreak:
                                                                                    'break-word',
                                                                                textAlign: 'left',
                                                                                color: 'white',
                                                                                paddingTop: '10px',
                                                                            }}
                                                                            className={
                                                                                styles.receiveMessage
                                                                            }
                                                                        >
                                                                            {item?.message}
                                                                        </p>
                                                                    </div>
                                                                    <p
                                                                        className={
                                                                            styles.sentMessageTimeStamp
                                                                        }
                                                                        style={{
                                                                            fontSize: 11,
                                                                            marginTop: 8,
                                                                            textAlign: 'right',
                                                                        }}
                                                                    >
                                                                        {item.timestamp}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {item?.menu && (
                                                    <div
                                                        style={{ position: 'relative' }}
                                                        className={styles.optionsContainer}
                                                    >
                                                        <img
                                                            className={styles.longPressOptionImages}
                                                            src={emojie}
                                                            alt=""
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                emojiH(item.id, false, 'R');
                                                            }}
                                                        />
                                                        <img
                                                            onClick={() => {
                                                                setActiveMsg(item);
                                                                setTagMsg(true);
                                                            }}
                                                            className={styles.longPressOptionImages}
                                                            src={share}
                                                            alt=""
                                                        />
                                                        <div style={{ position: 'relative' }}>
                                                            <img
                                                                className={
                                                                    styles.longPressOptionImages
                                                                }
                                                                src={moreoptions}
                                                                alt=""
                                                                onClick={() =>
                                                                    dropDH(item?.id, 'R')
                                                                }
                                                            />
                                                            {item?.dropDown && (
                                                                <div
                                                                    style={{
                                                                        width: '111px',
                                                                        height: '111px',
                                                                        position: 'absolute',
                                                                        justifyContent:
                                                                            'space-between',
                                                                        top: '100%',
                                                                        zIndex: 6,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        background: '#F8F8F8',
                                                                        borderRadius: 8,
                                                                        padding: 12,
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            gap: 8,
                                                                        }}
                                                                        className={styles.dropdm}
                                                                        onClick={() =>
                                                                            starH(item?.id, 'R')
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                !item?.star
                                                                                    ? starMsg
                                                                                    : unStarMsg
                                                                            }
                                                                            alt=""
                                                                        />
                                                                        <p
                                                                            className={
                                                                                styles.blackText
                                                                            }
                                                                        >
                                                                            {item.star
                                                                                ? 'UnStar'
                                                                                : 'star'}
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            gap: 8,
                                                                        }}
                                                                        className={styles.dropdm}
                                                                    >
                                                                        <img src={copyMsg} alt="" />
                                                                        <p
                                                                            onClick={() =>
                                                                                copyH(
                                                                                    item?.message,
                                                                                    'R'
                                                                                )
                                                                            }
                                                                            className={
                                                                                styles.blackText
                                                                            }
                                                                        >
                                                                            Copy
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            gap: 8,
                                                                        }}
                                                                        className={styles.dropdm}
                                                                        onClick={() =>
                                                                            deleteMsgF(
                                                                                item?.id,
                                                                                'R'
                                                                            )
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={deleteMsg}
                                                                            alt=""
                                                                        />
                                                                        <p
                                                                            className={
                                                                                styles.dengetText
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </LongPressButton>
                                ))}
                                {sendMessages.map((item: any, index: number) => (
                                    <LongPressButton onLongPress={() => MenuH(item)}>
                                        <div>
                                            <div
                                                style={{
                                                    marginLeft: `${item.message.length < 70
                                                            ? 70 - item.message.length
                                                            : 0
                                                        }%`,
                                                }}
                                            >
                                                {item.emoji && <Emoji id={item?.id} />}
                                            </div>
                                            <div className={styles.sentMessageRowContainer2}>
                                                <div
                                                    className={styles.receiveMessageContainer}
                                                    style={{
                                                        cursor: 'pointer',
                                                        display: item.emoji ? 'flex' : 'block',
                                                        flexDirection: item?.emoji
                                                            ? 'column'
                                                            : 'row',
                                                    }}
                                                >
                                                    {!item?.replyMsg ? (
                                                        <div
                                                            className={styles.receiveMessage}
                                                            {...longPressEvent}
                                                        >
                                                            <p
                                                                style={{
                                                                    wordBreak: 'break-word',
                                                                    textAlign: 'left',
                                                                }}
                                                                className={styles.receiveMessage}
                                                            >
                                                                {item?.message}
                                                            </p>
                                                            <div
                                                                className={
                                                                    styles.receiveMessageTimeStampContainer
                                                                }
                                                            >
                                                                {item?.star && (
                                                                    <img
                                                                        src={starMsg}
                                                                        alt=""
                                                                        style={{ paddingRight: 8 }}
                                                                    />
                                                                )}
                                                                <p
                                                                    className={
                                                                        styles.receiveMessageTimeStamp
                                                                    }
                                                                >
                                                                    {item?.timestamp}
                                                                </p>
                                                                <img
                                                                    className={styles.seenImage}
                                                                    src={seen}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div
                                                                className={styles.receiveMessage}
                                                                {...longPressEvent}
                                                            >
                                                                <div
                                                                    style={{
                                                                        background: '#5448b2',
                                                                        width: '100%',
                                                                        padding: '8px 6px',
                                                                        borderRadius: 4,
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            background: '#EEEDF7',
                                                                            borderRadius: 4,
                                                                            padding: '8px 12px',
                                                                        }}
                                                                    >
                                                                        <p
                                                                            className={
                                                                                styles.primaryText
                                                                            }
                                                                            style={{
                                                                                textAlign: 'left',
                                                                            }}
                                                                        >
                                                                            {activeChat?.name}
                                                                        </p>
                                                                        <p
                                                                            className={
                                                                                styles.blackText
                                                                            }
                                                                            style={{
                                                                                paddingTop: 4,
                                                                                textAlign: 'left',
                                                                                wordBreak:
                                                                                    'break-word',
                                                                            }}
                                                                        >
                                                                            {
                                                                                item?.replyMsg
                                                                                    ?.message
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <p
                                                                        style={{
                                                                            wordBreak: 'break-word',
                                                                            textAlign: 'left',
                                                                        }}
                                                                        className={
                                                                            styles.receiveMessage
                                                                        }
                                                                    >
                                                                        {item?.message}
                                                                    </p>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.receiveMessageTimeStampContainer
                                                                    }
                                                                >
                                                                    {item?.star && (
                                                                        <img
                                                                            src={starMsg}
                                                                            alt=""
                                                                            style={{
                                                                                paddingRight: 8,
                                                                            }}
                                                                        />
                                                                    )}
                                                                    <p
                                                                        className={
                                                                            styles.receiveMessageTimeStamp
                                                                        }
                                                                    >
                                                                        {item?.timestamp}
                                                                    </p>
                                                                    <img
                                                                        className={styles.seenImage}
                                                                        src={seen}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {item?.menu && (
                                                    <div
                                                        style={{ position: 'relative' }}
                                                        className={styles.optionsContainer}
                                                    >
                                                        <img
                                                            className={styles.longPressOptionImages}
                                                            src={emojie}
                                                            alt=""
                                                            onClick={() => emojiH(item.id)}
                                                        />
                                                        <img
                                                            onClick={() => {
                                                                setActiveMsg(item);
                                                                setTagMsg(true);
                                                            }}
                                                            className={styles.longPressOptionImages}
                                                            src={share}
                                                            alt=""
                                                        />
                                                        <div style={{ position: 'relative' }}>
                                                            <img
                                                                className={
                                                                    styles.longPressOptionImages
                                                                }
                                                                src={moreoptions}
                                                                alt=""
                                                                onClick={() => dropDH(item?.id)}
                                                            />
                                                            {item?.dropDown && (
                                                                <div
                                                                    style={{
                                                                        width: '111px',
                                                                        height: '111px',
                                                                        position: 'absolute',
                                                                        justifyContent:
                                                                            'space-between',
                                                                        top: '100%',
                                                                        zIndex: 6,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        background: '#F8F8F8',
                                                                        borderRadius: 8,
                                                                        padding: 12,
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            gap: 8,
                                                                        }}
                                                                        className={styles.dropdm}
                                                                        onClick={() =>
                                                                            starH(item?.id)
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                !item?.star
                                                                                    ? starMsg
                                                                                    : unStarMsg
                                                                            }
                                                                            alt=""
                                                                        />
                                                                        <p
                                                                            className={
                                                                                styles.blackText
                                                                            }
                                                                        >
                                                                            {item.star
                                                                                ? 'UnStar'
                                                                                : 'star'}
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            gap: 8,
                                                                        }}
                                                                        className={styles.dropdm}
                                                                    >
                                                                        <img src={copyMsg} alt="" />
                                                                        <p
                                                                            onClick={() =>
                                                                                copyH(item?.message)
                                                                            }
                                                                            className={
                                                                                styles.blackText
                                                                            }
                                                                        >
                                                                            Copy
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            gap: 8,
                                                                        }}
                                                                        className={styles.dropdm}
                                                                        onClick={() =>
                                                                            deleteMsgF(item?.id)
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={deleteMsg}
                                                                            alt=""
                                                                        />
                                                                        <p
                                                                            className={
                                                                                styles.dengetText
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </LongPressButton>
                                ))}
                            </div>
                            {tagMsg && (
                                <div
                                    style={{
                                        width: '100%',
                                        height: 78,
                                        borderLeft: '6px solid #5448B2',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        position: 'absolute',
                                        background: '#EAEAEA',
                                        top: '75%',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <p className={styles.blackText}>
                                            Replying to{' '}
                                            <span className={styles.primaryText}>
                                                {activeChat.name}
                                            </span>
                                        </p>
                                        <p className={styles.black_300}>It’s Mohamed from Ogoul</p>
                                    </div>
                                    <img
                                        style={{
                                            width: 15,
                                            height: 15,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                        }}
                                        src={closeSvg}
                                        onClick={() => setTagMsg(false)}
                                        alt=""
                                    />
                                </div>
                            )}
                            <form action="" onSubmit={sendMessageHandler}>
                                <div className={styles.messageBox}>
                                    <div className={styles.messageInput}>
                                        <input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Write a message..."
                                        />
                                        <p
                                            style={{ color: message.length >= 1 ? '#5448b2' : '' }}
                                            onClick={sendMessageHandler}
                                            children="Send"
                                        />
                                    </div>
                                    <div className={styles.controlsMessageBox}>
                                        <img src={attachment} alt="" />
                                        <img src={microphone} alt="" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {blockUserPopup && (
                <div className={styles.blockUserPopup}>
                    <div className={styles.popupMessageBlock}>
                        <p>Are you sure you want to block Mohamed ?</p>
                        <button
                            className={styles.blockButton}
                            onClick={blockUserFinallyHandler}
                            type="button"
                        >
                            Block
                        </button>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setBlockUserPopup(false)}
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <div>
                <ToastContainer />
            </div>
            <PopupForReport openReport={reportPopup} onReportClose={() => setReportPopup(false)} />
            {copyModal && (
                <div
                    style={{
                        width: 300,
                        height: 60,
                        background: '#FFFAE6',
                        borderRadius: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        bottom: 110,
                        right: 40,
                    }}
                >
                    <p className={styles.blackText_16}>🎉 Copied successfully</p>
                </div>
            )}
        </div>
    );
};

export default ComingSoon;
