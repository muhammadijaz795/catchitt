import { useEffect, useState } from 'react';
import {
    deleteMsg,
    editInStaredMsg,
    forwardMsg,
    nextArrow,
    nextArrowDark,
    rightArrow,
    starMsg,
    unStarMsg,
} from '../../../icons';
import Search from '../../../shared/navbar/components/Search';
import style from './stared.module.scss';

function StaredMesagesSec({
    isDarkTheme,
    staredMsgs: staredMsgsList,
    onBack,
    userName,
    deleteHandler,
    onChangeH,
    multipleUnstarHandlr,
    showForwardModal,
    selectedData,
}: any) {
    const [staredMsgs, setstaredMsgs] = useState<any[]>([]);
    const [isEditAble, setisEditAble] = useState<boolean>(false);
    const [showEmptyContainer, setshowEmptyContainer] = useState<boolean>(false);
    // const [isEditAble, setisEditAble] = useState<boolean>(false);

    useEffect(() => {
        const isReceivedChat: any[] = [];
        const isNotReceivedChat: any[] = [];
        staredMsgsList?.forEach((element: any) => {
            element.chats.forEach((chat: any) => {
                if (chat?.isrecevied) {
                    isReceivedChat.push(chat);
                } else {
                    isNotReceivedChat.push(chat);
                }
            });
        });

        setstaredMsgs([
            {
                userName: userName,
                userId: staredMsgsList[1]?.userId,
                userImage: staredMsgsList[1]?.userImage,
                chats: isReceivedChat,
            },
            {
                userName: 'You',
                userId: staredMsgsList[0]?.userId,
                userImage: staredMsgsList[0]?.userImage,
                chats: [...isNotReceivedChat],
            },
        ]);
        const allChats = [...isReceivedChat, ...isNotReceivedChat];
        if (allChats.length > 0) {
            setshowEmptyContainer(false);
        } else {
            setisEditAble(false);
            setshowEmptyContainer(true);
        }
    }, [staredMsgsList]);

    // useEffect(() => {
    //     if (staredMsgsList[0]?.chats?.length > 0) {
    //         setshowEmptyContainer(false);
    //     } else {
    //         setisEditAble(false);
    //         setshowEmptyContainer(true);
    //     }
    // }, [onChangeH]);

    // const SearchHandler = (e: any) => {
    //     const isReceivedChat: any[] = [];
    //     const isNotReceivedChat: any[] = [];
    //     staredMsgsList?.forEach((element: any) => {
    //         element.chats.forEach((chat: any) => {
    //             if (chat?.isrecevied) {
    //                 isReceivedChat.push(chat);
    //             } else {
    //                 isNotReceivedChat.push(chat);
    //             }
    //         });
    //     });

    //     let filteredReceivedMessages: any = isReceivedChat.filter((chat: any) =>
    //         chat?.msg?.toLowerCase()?.includes(e?.toLowerCase())
    //     );
    //     let filteredNotReceivedMessages: any = isNotReceivedChat.filter((chat: any) =>
    //         chat?.msg?.toLowerCase()?.includes(e?.toLowerCase())
    //     );

    //     setstaredMsgs([
    //         {
    //             userName: userName,
    //             userId: staredMsgsList[1]?.userId,
    //             chats: filteredReceivedMessages,
    //         },
    //         {
    //             userName: 'You',
    //             userId: staredMsgsList[1]?.userId,
    //             chats: [...filteredNotReceivedMessages],
    //         },
    //     ]);
    // };

    return (
        <div className={style.parent}>
            <div className={style.header}>
                <div>
                    <img onClick={onBack} src={isDarkTheme?nextArrow:nextArrowDark} alt="" />
                    <p>Starred messages</p>
                </div>
                {!showEmptyContainer &&
                    (!isEditAble ? (
                        <img
                            onClick={() => setisEditAble(!isEditAble)}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            src={editInStaredMsg}
                            alt=""
                        />
                    ) : (
                        <p onClick={() => setisEditAble(!isEditAble)} className={style.done}>
                            Done
                        </p>
                    ))}
            </div>
            {!showEmptyContainer && (
                <div className={style.contentParent}>
                    {/* <div>
                        <Search onInputChangeHandler={SearchHandler} placeholder="Search" />
                    </div> */}
                    <div className={style.staredMsgsParent}>
                        {staredMsgs.map((user: any, index: number) => {
                            return (
                                <div key={index}>
                                    {user?.chats.length > 0 && (
                                        <div className={style.msgParent}>
                                            <div>
                                                <img className={style.avatar} src={user.userImage} alt={user.userImage} />
                                                <p className={style.text_500}>{user.userName}</p>
                                            </div>
                                            {/* <p className={style.gray_300}>11:14 PM</p> */}
                                        </div>
                                    )}
                                    <div className={style.staredChats}>
                                        {user?.chats?.map((chat: any, index2: number) => {
                                            return (
                                                <div key={index2} className={style.chat}>
                                                    <div>
                                                        {chat?.replysms ? (
                                                            <div style={{ display: 'flex' }}>
                                                                {isEditAble && (
                                                                    <input
                                                                        onChange={(e) => {
                                                                            e.stopPropagation();
                                                                            onChangeH(chat);
                                                                        }}
                                                                        style={{
                                                                            width: 20,
                                                                            height: 20,
                                                                            background:
                                                                                'rgb(255, 59, 92)',
                                                                            borderRadius: 4,
                                                                            cursor: 'pointer',
                                                                            marginRight: '0.5rem',
                                                                            margin: '1rem',
                                                                        }}
                                                                        type="checkbox"
                                                                        checked={selectedData?.find(
                                                                            (userchat: any) =>
                                                                                userchat?.id ===
                                                                                chat?.id
                                                                        )}
                                                                    />
                                                                )}
                                                                <div
                                                                    className={style.tempparent}
                                                                    onClick={(e) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                    style={{
                                                                        marginLeft: isEditAble
                                                                            ? '0.5rem'
                                                                            : '3rem',
                                                                    }}
                                                                >
                                                                    <div>
                                                                        <p
                                                                            className={
                                                                                style.primaryText
                                                                            }
                                                                        >
                                                                            {chat.userName}
                                                                        </p>
                                                                        <p
                                                                            className={
                                                                                style.prevmsg
                                                                            }
                                                                        >
                                                                            {chat?.replysms}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className={style.ans}>
                                                                            {chat.msg}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div style={{ display: 'flex' }}>
                                                                {isEditAble && (
                                                                    <input
                                                                        onChange={(e) => {
                                                                            e.stopPropagation();
                                                                            onChangeH(chat);
                                                                        }}
                                                                        style={{
                                                                            width: 20,
                                                                            height: 20,
                                                                            background:
                                                                                'rgb(255, 59, 92)',
                                                                            borderRadius: 4,
                                                                            cursor: 'pointer',
                                                                            marginRight: '0.5rem',
                                                                            margin: '1rem',
                                                                        }}
                                                                        type="checkbox"
                                                                        checked={selectedData?.find(
                                                                            (userchat: any) =>
                                                                                userchat?.id ===
                                                                                chat?.id
                                                                        )}
                                                                    />
                                                                )}
                                                                <p
                                                                    className={`${chat.userName !== 'You'
                                                                            ? style.isreceived
                                                                            : style.userstarMsg} ${isDarkTheme? 'bg-[#615e5e]':'bg-[#eaeaea]'}`}
                                                                    style={{
                                                                        marginLeft: isEditAble
                                                                            ? '0.5rem'
                                                                            : '3rem',
                                                                    }}
                                                                >
                                                                    {chat.msg}
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                gap: '0.38rem',
                                                                justifyContent: 'flex-end',
                                                                marginTop: '0.5rem',
                                                                // width: '100%',
                                                                marginLeft: '3rem',
                                                            }}
                                                        >
                                                            <img src={starMsg} alt="" />
                                                            <p className={style.gray_300}>
                                                                {/* 11:14 AM */}
                                                                {chat.timeStamp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <img src={rightArrow} alt="" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {isEditAble && (
                        <div className={style.bottomSide}>
                            <img
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showForwardModal();
                                }}
                                src={forwardMsg}
                                alt=""
                            />
                            <img
                                onClick={(e) => {
                                    e.stopPropagation();
                                    multipleUnstarHandlr();
                                }}
                                src={unStarMsg}
                                alt=""
                            />
                            <img
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteHandler();
                                }}
                                src={deleteMsg}
                                alt=""
                            />
                        </div>
                    )}
                </div>
            )}
            {showEmptyContainer && (
                <div className={style.emptyContainer}>
                    <img src={starMsg} alt="" />
                    <p className={style.text_500}>No Starred Messages</p>
                    <p className={style.text_400}>
                        Tap and hold on any message to star it, so you can easily find it later.
                    </p>
                </div>
            )}
        </div>
    );
}

export default StaredMesagesSec;
