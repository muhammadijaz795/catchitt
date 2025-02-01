import { Star } from '@mui/icons-material';
import {
    avatar,
    copyMsg,
    deleteMsg,
    emoji,
    moreInMsg,
    seenMsgSvg,
    starMsg,
    tagMsg,
    unStarMsg,
    defaultAvatar,
    moreInMsgWhite,
    videoDuration,
    rightArrowCurvedinWhite,
    rightArrowCurved,
} from '../../../icons';
import style from './Actions.module.scss';
import LongPressButton from './LongPressEvent';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import TextHighlighter from './TextHighlighter';
import VideoModal from './VideoModal';
import { CircularProgress } from '@mui/material';
function Actions(props: any) {
    const {
        valuesH,
        valuesH2,
        deleteH,
        forwardH,
        activeUser,
        longPressH,
        autoScrolElem,
        scrollToBottom,
        activeChat,
        copyH,
        showToast,
        handleScroll,
        chatActiveUserId,
        searchQuery,
        isDarkTheme,
        reactToMessage,
        removeReaction
    } = props || {};

    const loggedInUserId = localStorage.getItem('userId');
    const [playingVideo, setPlayingVideo] = useState('');

    const getMediaInfo = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const videoElement = (event.target as HTMLVideoElement);
        const prevSibling = videoElement.previousElementSibling as HTMLDivElement;
        // find p tag in div
        const pTag = prevSibling.querySelector('p');
        const duration = videoElement.duration;
        if (duration < 60) {
            if (pTag) pTag.innerText = `0:${Math.floor(duration)}`;
        } else if (duration >= 60 && duration < 3600) {
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            if (pTag) pTag.innerText = `${minutes}:${seconds}`;
        } else {
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration % 3600) / 60);
            const seconds = Math.floor(duration % 60);
            if (pTag) pTag.innerText = `${hours}:${minutes}:${seconds}`;
        }
    }

    const closeVideoModal = () => {
        setPlayingVideo('');
    }

    console.log('activeChat', activeChat, chatActiveUserId);
    useEffect(() => {
        setTimeout(() => {
            scrollToBottom()
        }, 800);
    }, [chatActiveUserId]);

    return (
        <>
            <div ref={autoScrolElem} className={style.msgsContainer} onScroll={handleScroll}>
                {playingVideo && <VideoModal src={playingVideo} close={closeVideoModal} parentRef={autoScrolElem} />}
                {Object.keys(activeChat).length ? activeChat?.userId && activeChat?.chats?.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className={style.msgContainer}
                            style={{
                                margin: item.receiverId == loggedInUserId ? '0px 48% 0px 0%' : '0px 0% 0px 48%',
                                flexDirection: item.receiverId == loggedInUserId ? 'row' : 'row-reverse',
                            }}
                        >
                            {item.receiverId == loggedInUserId && (
                                <img src={activeChat?.userImage != "" ? activeChat?.userImage : defaultAvatar} className={style.avatar} alt="" />
                            )}

                            <div className={style.msg}>
                                {item.emojis && item.dropdown && (
                                    <div
                                        style={{
                                            left: item.receiverId == loggedInUserId ? 'auto' : '-145px',
                                            right: item.receiverId == loggedInUserId ? '-145px' : 'auto',
                                            display: 'flex'
                                        }}
                                        className={`${style.dropd} ${isDarkTheme?'bg-[#353434]':'bg-gray-300'} shadow-md`}
                                    >
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                valuesH2(item, 'stared', !item.stared);
                                            }}
                                        >
                                            {/* <img src={!item.stared ? starMsg : unStarMsg} alt="" /> */}
                                            <p color="#222" className={style.dropdText}>
                                                {item.stared ? 'UnStar' : 'Star'}
                                            </p>
                                        </div>
                                        <hr className={style.hr} />

                                        <div
                                            style={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteH(item);
                                            }}
                                        >
                                            {/* <img src={deleteMsg} alt="" /> */}
                                            <p
                                                // style={{
                                                //     color: '#DE0C0C',
                                                // }}
                                                className={style.dropdText}
                                            >
                                                Delete
                                            </p>
                                        </div>
                                        {item.isrecevied && (
                                            <>
                                                <hr className={style.hr} />
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        copyH(item.msg);
                                                        showToast();
                                                    }}
                                                    style={{
                                                        cursor: 'pointer',
                                                        width: '100%',
                                                    }}
                                                >
                                                    {/* <img src={copyMsg} alt="" /> */}
                                                    <p color="#222" className={style.dropdText}>
                                                        Copy
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        <hr className={style.hr} />
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                forwardH(item);
                                            }}
                                        >
                                            {/* <img src={deleteMsg} alt="" /> */}
                                            <p
                                                // style={{
                                                //     color: '#DE0C0C',
                                                // }}
                                                className={style.dropdText}
                                            >
                                                Forward
                                            </p>
                                        </div>

                                    </div>
                                )}
                                <div className={`${item.isForwarded?(item.receiverId == loggedInUserId? (isDarkTheme?'bg-[#262626] py-1 ':'bg-slate-100 border py-1') :(isDarkTheme?'bg-[#414141] py-1':'bg-gray-100 border py-1')):''} min-w-52 rounded`} style={{ position: 'relative', zIndex: 20 }}>
                                    <LongPressButton onLongPress={() => longPressH(item)}
                                    // onMouseEnter={() => {
                                    //     longPressH(item)
                                    //   }}
                                    //   onMouseLeave={() => {
                                    //     longPressH(item)
                                    //   }}
                                    >
                                {item.isForwarded && <div className='text-xs text-start flex px-1 gap-1'>
                                                          <img className='w-4' src={isDarkTheme?rightArrowCurvedinWhite:rightArrowCurved} alt="forwarded-icon"/>  Forwarded
                                                        </div>}

                                        {item?.replysms ? (
                                            <div
                                                className={style.tempparent}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className={style.replyText}>
                                                    <p className={style.primaryText}>
                                                        {activeUser?.userName}
                                                    </p>
                                                    <p className={style.prevmsg}>
                                                        <TextHighlighter searchQuery={searchQuery} text={item?.replysms} />
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className={style.ans}><TextHighlighter searchQuery={searchQuery} text={item.msg} /></p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {item?.type == 'Text' &&
                                                    <p
                                                        onClick={(e) => e.stopPropagation()}
                                                        className={`${item.receiverId == loggedInUserId
                                                            ? style.receivedMsg
                                                            : style.sendedMsg
                                                            } ${item.isForwarded?'py-0 bg-transparent border-0':''} ${item.receiverId == loggedInUserId? (isDarkTheme?'bg-[#262626]':'bg-slate-100'):(isDarkTheme?'bg-[#414141]':'bg-gray-100')}`}
                                                    >
                                                        <TextHighlighter searchQuery={searchQuery} text={item.msg} />
                                                    </p>}

                                                {['Image', 'Sticker', 'Gif'].some(type => type === item?.type) &&
                                                    <img src={item.msg} />
                                                }

                                                {item?.type == 'Video' &&
                                                    <div onClick={() => setPlayingVideo(item.msg)} className={`absolute top-0 ${item.receiverId == loggedInUserId ? 'left-0' : 'right-0'} h-full z-10 bg-black bg-opacity-50`} style={{ width: "60%" }}>
                                                        <a href="#" className="customPlayBtn"></a>
                                                        <div className="flex absolute bottom-0 left-1">
                                                            <img src={videoDuration} alt="duration" />
                                                            <p className="text-white text-xs ml-1 opacity-60">0</p>
                                                        </div>
                                                    </div>}
                                                {item?.type == 'Video' && <video
                                                    onLoadedMetadata={getMediaInfo}
                                                    disablePictureInPicture
                                                    controlsList="nodownload noplaybackrate"
                                                    // controls={true}
                                                    style={{ height: "60%", width: "60%", margin: item.receiverId == loggedInUserId ? '0 auto 0 0' : '0 0 0 auto' }}
                                                    src={item.msg}
                                                />}
                                            </>
                                        )}
                                        {/* {item.isForwarded && <div className='text-xs px-2 opacity-60 text-start'>
                                                          <small>{item.recieverName}</small>
                                                        </div>} */}
                                    </LongPressButton>
                                </div>
                                <div className={style.subContent}>
                                    {item.stared && <><span>❤️</span>
                                        {/* <img src={avatar} className={style.avatarLike} alt="" /> */}
                                    </>}
                                    <p>{item.time}</p>
                                    {!item?.isrecevied && item?.isRead && (
                                        <img src={seenMsgSvg} alt="" />
                                    )}
                                </div>
                                {item.emojis && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            left: item.receiverId != loggedInUserId ? '-75px' : 'auto',
                                            right: item.receiverId == loggedInUserId ? '-75px' : 'auto',
                                        }}
                                        className={`${style.actionsOnLongP} items-center z-50`}
                                    >
                                        <img
                                            src={emoji}
                                            alt=""
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                valuesH2(item, 'showEmogis', !item.showEmogis);
                                            }}
                                        />
                                        {/* <img
                                            onClick={() => {
                                                setSmsRef(item?.msg);
                                                setSmsId(item?.id);
                                                setreplysms(!replySms);
                                            }}
                                            src={tagMsg}
                                            alt=""
                                        /> */}
                                        <img
                                            onClick={() => {
                                                valuesH({ ...item, showEmogis: false }, 'dropdown');
                                            }}
                                            src={isDarkTheme ? moreInMsgWhite : moreInMsg}
                                            alt=""
                                        />
                                        {item.showEmogis && (
                                            <div
                                                className={`${style.showEmogis} ${
                                                    !item?.isrecevied
                                                        ? style.showEmogisr
                                                        : style.showEmogis
                                                } ${isDarkTheme?'bg-[#353434]':'bg-gray-300 '} shadow-md`}
                                                style={{
                                                    top: item.id === 1 ? '-35px' : '',
                                                    transform: !item?.isrecevied? 'translateX(50%)' : 'translateX(-50%)',
                                                }}
                                            >
                                                 <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '👍');
                                                    }}
                                                >
                                                    👍
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '❤️');
                                                    }}
                                                >
                                                    ❤️{' '}
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '😂');
                                                    }}
                                                >
                                                    😂
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '🥰');
                                                    }}
                                                >
                                                    🥰
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '😭');
                                                    }}
                                                >
                                                    😭
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '😳');
                                                    }}
                                                >
                                                    😳
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '😡');
                                                    }}
                                                >
                                                    😡
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '😢');
                                                    }}
                                                >
                                                    😢
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '😊');
                                                    }}
                                                >
                                                    😊
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '🙏🏻');
                                                    }}
                                                >
                                                    🙏🏻
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        valuesH(item,'showEmogis');
                                                        reactToMessage(item.id, '👎');
                                                    }}
                                                >
                                                    👎
                                                </p>

                                                {/* <p
                                                    onClick={() => {
                                                        insertKeyH('showEmogis', false);
                                                        insertKeyH('emojis', false);
                                                    }}
                                                    className={style.plusemogi}
                                                >
                                                    +
                                                </p> */}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }) : <div className="flex justify-center items-center h-full"><CircularProgress /></div>}
            </div>
        </>
    );
}

export default Actions;
