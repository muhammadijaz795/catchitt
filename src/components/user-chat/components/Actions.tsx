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
    weightedDownArrowInWhite,
    weightedDownArrow,
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
        openDeleteModal,
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
        replyMessage,
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

     // Function to check if the URL is an image
    const isImage = (url:any) => {
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    };

    // Function to check if the URL is a video
    const isVideo = (url:any) => {
        return /\.(mp4|webm|ogg)$/i.test(url);
    };

    // Render logic for replysms
    const renderContent = (replysms:any) => {
        if (isImage(replysms)) {
            return <img src={replysms} alt="Image" className={style.image} />;
        } else if (isVideo(replysms)) {
        return (
           <video
                onLoadedMetadata={getMediaInfo}
                disablePictureInPicture
                controlsList="nodownload noplaybackrate"
                // controls={true}
                style={{ height: "60%", width: "60%", margin:  '0 0 0 auto' }}
                src={replysms}
            />
        );
        } else {
            return <TextHighlighter searchQuery={searchQuery} text={replysms} />;
        }
    };

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

    // const scrollChatToBottom = () => {
    //     if(autoScrolElem.current) {
    //         setTimeout(() => {
    //         autoScrolElem.current.scrollTop = autoScrolElem.current.scrollHeight;
    //         }, 1000);
    //     }
    // };

    console.log('activeChat in Actions.tsx', activeChat, chatActiveUserId);

    // useEffect(() => {
    //     setTimeout(() => {
    //         scrollChatToBottom();
    //     }, 800);
    // }, [activeUser]);

    return (
        <>
            <div ref={autoScrolElem} className={style.msgsContainer} onScroll={handleScroll}>
                {playingVideo && <VideoModal src={playingVideo} close={closeVideoModal} parentRef={autoScrolElem} />}
                {Object.keys(activeChat).length ? activeChat?.userId && activeChat?.chats?.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            onMouseEnter={()=>longPressH(item,true)} onMouseLeave={()=>{longPressH(item,false); }}
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
                                        className={`flex ${style.dropd} ${isDarkTheme ? 'bg-[#353434]' : 'bg-white'} ${item.receiverId == loggedInUserId?'-right-20':'right-2'} top-6 z-50`}
                                    >
                                        <div
                                            className={`${isDarkTheme ? style.isDarkClass:''}`}
                                            style={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                valuesH2(item, 'stared', !item.stared);
                                            }}
                                        >
                                            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.9998 16.75L4.82784 19.995L6.00684 13.122L1.00684 8.25495L7.90684 7.25495L10.9928 1.00195L14.0788 7.25495L20.9788 8.25495L15.9788 13.122L17.1578 19.995L10.9998 16.75Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <p color="#222" className={style.dropdText}>
                                                {item.stared ? 'UnStar' : 'Star'}
                                            </p>
                                        </div>

                                        <div
                                            className={`${isDarkTheme ? style.isDarkClass:''}`}
                                            style={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // deleteH(item);
                                                openDeleteModal(item);
                                            }}
                                        >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M4 7H20" stroke="#FF2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M10 11V17" stroke="#FF2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M14 11V17" stroke="#FF2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#FF2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#FF2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p
                                                    className={style.dropdText} style={{ color: '#FF2C55'}} >
                                                    Delete
                                                </p>
                                        </div>
                                        {/* {item.isrecevied && ( */}
                                            <>
                                                <div
                                                className={`${isDarkTheme ? style.isDarkClass:''}`}
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M7 9.667C7 8.95967 7.28099 8.28131 7.78115 7.78115C8.28131 7.28099 8.95967 7 9.667 7H18.333C18.6832 7 19.03 7.06898 19.3536 7.20301C19.6772 7.33704 19.9712 7.53349 20.2189 7.78115C20.4665 8.0288 20.663 8.32281 20.797 8.64638C20.931 8.96996 21 9.31676 21 9.667V18.333C21 18.6832 20.931 19.03 20.797 19.3536C20.663 19.6772 20.4665 19.9712 20.2189 20.2189C19.9712 20.4665 19.6772 20.663 19.3536 20.797C19.03 20.931 18.6832 21 18.333 21H9.667C9.31676 21 8.96996 20.931 8.64638 20.797C8.32281 20.663 8.0288 20.4665 7.78115 20.2189C7.53349 19.9712 7.33704 19.6772 7.20301 19.3536C7.06898 19.03 7 18.6832 7 18.333V9.667Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M4.012 16.737C3.70534 16.5622 3.45027 16.3095 3.27258 16.0045C3.09488 15.6995 3.00085 15.353 3 15V5C3 3.9 3.9 3 5 3H15C15.75 3 16.158 3.385 16.5 4" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <p color="#222" className={style.dropdText}>
                                                        Copy
                                                    </p>
                                                </div>
                                            </>
                                        {/* )} */}
                                        <div
                                        className={`${isDarkTheme ? style.isDarkClass:''}`}
                                            style={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                forwardH(item);
                                            }}
                                        >
                                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.0002 1V5C4.42519 6.028 1.98019 11.788 1.00019 17C0.963188 17.206 6.38419 11.038 11.0002 11V15L19.0002 8L11.0002 1Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <p
                                                // style={{
                                                //     color: '#DE0C0C',
                                                // }}
                                                className={style.dropdText}
                                            >
                                                Forward
                                            </p>
                                        </div>
                                        <div
                                        className={`${isDarkTheme ? style.isDarkClass:''}`}
                                            style={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                replyMessage(item);
                                            }}
                                        >
                                           <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.99981 1V5C15.5748 6.028 18.0198 11.788 18.9998 17C19.0368 17.206 13.6158 11.038 8.99981 11V15L0.999811 8L8.99981 1Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <p className={style.dropdText}>
                                                Reply
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {/* className={`${item.isForwarded ? (item.receiverId == loggedInUserId ? (activeUser.themeColor? activeUser.themeColor: isDarkTheme ? 'bg-[#262626] py-1 ' : 'bg-slate-100 border py-1') : (activeUser.themeColor?activeUser.themeColor+' bg-opacity-75':isDarkTheme ? 'bg-[#414141] py-1' : 'bg-gray-100 border py-1')) : ''} min-w-52 rounded`} style={{ position: 'relative', zIndex: 20 }} */}
                                <div  className={`${item.isForwarded
    ? (item.receiverId === loggedInUserId
      ? (activeUser.themeColor
        ? activeUser.themeColor
        : isDarkTheme
          ? 'bg-[#414141] py-1'  // Always apply bg-[#414141] when isDarkTheme is true
          : 'border py-1')
      : (activeUser.themeColor
        ? activeUser.themeColor + ' bg-opacity-75'
        : isDarkTheme
          ? 'bg-[#414141] py-1'  // Always apply bg-[#414141] when isDarkTheme is true
          : 'bg-gray-100 border py-1'))
    : isDarkTheme ? 'bg-[#414141] py-1':''} min-w-52 rounded`} >
                                    {item.emojis && <img
                                        className='absolute w-[1.2rem] h-[1.2rem] top-1 right-2 cursor-pointer'
                                        onClick={() => {
                                            valuesH({ ...item, showEmogis: false }, 'dropdown');
                                        }}
                                        src={isDarkTheme ? weightedDownArrowInWhite : weightedDownArrow  }//moreInMsg}
                                        alt="more"
                                    />}
                                    { <img
                                        className={`absolute w-[1.2rem] h-[1.2rem] top-3 ${item.receiverId == loggedInUserId?'-right-10':'-left-10'} cursor-pointer`}
                                        src={emoji}
                                        alt=""

                                        onClick={() => {
                                            // valuesH(item, 'showEmogis');
                                            valuesH({...item, dropdown: false}, 'showEmogis');
                                        }}
                                    />}
                                    
                                    <LongPressButton className={`${item?.type == 'Image' || item?.type == 'Video' ? 'bg-white p-2' : ''}`}>
                                        {item.isForwarded &&
                                            <div className='text-xs text-start flex px-1 gap-1'>
                                                <img className='w-4' src={isDarkTheme ? rightArrowCurvedinWhite : rightArrowCurved} alt="forwarded-icon" />  Forwarded
                                            </div>
                                        }

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
                                                        {renderContent(item?.replysms)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className={style.ans}><TextHighlighter searchQuery={searchQuery} text={item.msg} /></p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {(item?.type == 'Text' || item?.type == 'Gift') &&
                                                    <p
                                                        onClick={(e) => e.stopPropagation()}
                                                        className={`${item.receiverId == loggedInUserId
                                                            ? style.receivedMsg
                                                            : style.sendedMsg
                                                            } ${item.isForwarded ? 'py-0 bg-transparent border-0' : ''} ${item.receiverId == loggedInUserId ? (activeUser.themeColor? activeUser.themeColor: isDarkTheme ? 'bg-[#262626]' : 'bg-slate-100') : (activeUser.themeColor?activeUser.themeColor+' bg-opacity-75':isDarkTheme ? 'bg-[#414141]' : 'bg-gray-100')}`}
                                                    >
                                                        <TextHighlighter searchQuery={searchQuery} text={item.msg} />
                                                    </p>}

                                                {['Image', 'Sticker', 'Gif'].some(type => type === item?.type) &&
                                                    <div className="bg-white p-2">
                                                        <img src={item.msg} style={{ height: '14rem' }} />
                                                    </div>
                                                }
                                                {['Gift'].some(type => type === item?.type) && (
                                                    <div className="bg-white p-2">
                                                        {/\.(jpe?g|png|gif|svg|webp)$/i.test(item?.gift?.imageUrl) ? (
                                                        <img
                                                            src={item?.gift?.imageUrl}
                                                            alt="Gift"
                                                            style={{ height: '14rem', objectFit: 'contain' }}
                                                        />
                                                        ) : /\.(mp4|webm|ogg)$/i.test(item?.gift?.imageUrl) ? (
                                                        <video
                                                            src={item?.gift?.imageUrl}
                                                            muted
                                                            playsInline
                                                            preload="metadata"
                                                            style={{ height: '14rem', objectFit: 'contain' }}
                                                            onContextMenu={(e) => e.preventDefault()}
                                                            onClick={(e) => e.preventDefault()}
                                                        />
                                                        ) : (
                                                        <span>Unsupported media format</span>
                                                        )}

                                                        ${item?.gift?.price}
                                                        <svg
                                                        style={{ float: 'right', marginTop: '20px' }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        >
                                                        <path
                                                            d="M12 7V20M12 7H8.46429C7.94332 7 7.4437 6.78929 7.07533 6.41421C6.70695 6.03914 6.5 5.53043 6.5 5C6.5 4.46957 6.70695 3.96086 7.07533 3.58579C7.4437 3.21071 7.94332 3 8.46429 3C11.2143 3 12 7 12 7ZM12 7H15.5357C16.0567 7 16.5563 6.78929 16.9247 6.41421C17.293 6.03914 17.5 5.53043 17.5 5C17.5 4.46957 17.293 3.96086 16.9247 3.58579C16.5567 3.21071 16.0567 3 15.5357 3C12.7857 3 12 7 12 7ZM5 12H19V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V12ZM4.6 12H19.4C19.9601 12 20.2401 12 20.454 11.891C20.6422 11.7951 20.7951 11.6422 20.891 11.454C21 11.2401 21 10.9601 21 10.4V8.6C21 8.03995 21 7.75992 20.891 7.54601C20.7951 7.35785 20.6422 7.20487 20.454 7.10899C20.2401 7 19.9601 7 19.4 7H4.6C4.03995 7 3.75992 7 3.54601 7.10899C3.35785 7.20487 3.20487 7.35785 3.10899 7.54601C3 7.75992 3 8.03995 3 8.6V10.4C3 10.9601 3 11.2401 3.10899 11.454C3.20487 11.6422 3.35785 11.7951 3.54601 11.891C3.75992 12 4.03995 12 4.6 12Z"
                                                            stroke="#FF3B5C"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        </svg>
                                                    </div>
                                                    )}


                                                {item?.type == 'Video' &&
                                                    <div className="bg-white p-2">
                                                        <div onClick={() => setPlayingVideo(item.msg)} className={`absolute ${style.overrideTop} ${item.receiverId == loggedInUserId ? 'left-0' : 'right-0'}  z-10 bg-black bg-opacity-50`} style={{ width: '56%',  left: '50%', transform: 'translateX(-50%)', height: '12.85rem'}}>
                                                            <a href="#" className="customPlayBtn"></a>
                                                            <div className="flex absolute bottom-0 left-1">
                                                                <img src={videoDuration} alt="duration" />
                                                                <p className="text-white text-xs ml-1 opacity-60">0</p>
                                                            </div>
                                                        </div>
                                                        <video
                                                            onLoadedMetadata={getMediaInfo}
                                                            disablePictureInPicture
                                                            controlsList="nodownload noplaybackrate"
                                                            style={{
                                                                height: "16rem",
                                                                width: "60%",
                                                                margin: "auto"
                                                            }}
                                                            src={item.msg}
                                                        />
                                                    </div>
                                                }
                                            </>
                                        )}
                                    </LongPressButton>

                                    {item?.reactions?.length > 0 ? (
                                        item.reactions.map((reaction: any, index: number) => (
                                            <span style={{ cursor: 'pointer' }} className={style.emojiShowed} key={index} onClick={(e) => {
                                                if(item.receiverId != loggedInUserId){
                                                    (e.currentTarget as HTMLElement).remove();
                                                    removeReaction(item);
                                                }
                                              }}>{reaction.react} </span>
                                        ))
                                        ) : null}
                                </div>
                                <div className={style.subContent}>
                                    {item.stared && <><span >❤️</span>
                                        {/* <img src={avatar} className={style.avatarLike} alt="" /> */}
                                    </>}
                                    
                                    {item?.isrecevied && item?.isRead && (
                                        // <img src={seenMsgSvg} alt="" />
                                        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.4027 0.256008C12.1193 -0.0658309 11.6554 -0.0658309 11.372 0.256008L7.19738 5.01045L6.12796 3.79624L8.22814 1.4117C8.5116 1.08986 8.5116 0.563218 8.22814 0.241379C7.94468 -0.0804598 7.48084 -0.0804598 7.19738 0.241379L3.00989 5.01045L1.61836 3.43051C1.3349 3.10867 0.871056 3.10867 0.587595 3.43051C0.304135 3.75235 0.304135 4.279 0.587595 4.60084L2.49451 6.76594C2.63624 6.92685 2.81662 7 3.00989 7C3.20316 7 3.38355 6.91222 3.52528 6.75131L5.09719 4.96656L6.66911 6.75131C6.81084 6.91222 6.99122 6.98537 7.18449 6.98537C7.36488 6.98537 7.55814 6.8976 7.69987 6.73668L12.4027 1.39707C12.6991 1.08986 12.6991 0.577847 12.4027 0.256008Z" fill="#23A9F9"/>
                                        </svg>                                        
                                    )}
                                    <p>{item.time}</p>
                                </div>
                                {/* {item.emojis && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            left: item.receiverId != loggedInUserId ? '-75px' : 'auto',
                                            right: item.receiverId == loggedInUserId ? '-75px' : 'auto',
                                        }}
                                        className={`${style.actionsOnLongP} items-center z-50`}
                                    > */}
                                {/* {item.emojis &&<img
                                            className='absolute top-2 w-[1.2rem] h-[1.2rem] right-10'
                                            src={emoji}
                                            alt=""
                                           
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                valuesH2(item, 'showEmogis', !item.showEmogis);
                                            }}
                                        />} */}
                                {/* <img
                                            onClick={() => {
                                                setSmsRef(item?.msg);
                                                setSmsId(item?.id);
                                                setreplysms(!replySms);
                                            }}
                                            src={tagMsg}
                                            alt=""
                                        /> */}
                                {/* {item.emojis && <img
                                    className='absolute -top-2 w-[1.2rem] h-[1.2rem]'
                                    onClick={() => {
                                        valuesH({ ...item, showEmogis: false }, 'dropdown');
                                    }}
                                    src={isDarkTheme ? weightedDownArrowInWhite : moreInMsg}

                                    alt="more"
                                />} */}
                                {item.showEmogis && item.showEmogis == true && (
                                    <div
                                        className={`${!item?.isrecevied
                                            ? style.showEmogisr
                                            : style.showEmogis
                                            } ${item.receiverId != loggedInUserId?'right-1/4':'left-1/4'}
                                            ${isDarkTheme ? 'bg-[#353434]' : 'bg-gray-300 '} shadow-md`}
                                        style={{
                                            top: item.id === 1 ? '-35px' : '',
                                            // transform: !item?.isrecevied ? 'translateX(50%)' : 'translateX(-50%)',
                                        }}
                                    >

                                       

                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '👍',item);
                                            }}
                                        >
                                            👍
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '❤️',item);
                                            }}
                                        >
                                            ❤️{' '}
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '😂',item);
                                            }}
                                        >
                                            😂
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '🥰',item);
                                            }}
                                        >
                                            🥰
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '😭',item);
                                            }}
                                        >
                                            😭
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '😳',item);
                                            }}
                                        >
                                            😳
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '😡',item);
                                            }}
                                        >
                                            😡
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '😢',item);
                                            }}
                                        >
                                            😢
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '😊',item);
                                            }}
                                        >
                                            😊
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '🙏🏻',item);
                                            }}
                                        >
                                            🙏🏻
                                        </p>
                                        <p
                                            onClick={() => {
                                                // valuesH(item, 'showEmogis');
                                                reactToMessage(item.id, '👎',item);
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
                                {/* </div>
                                )} */}
                            </div>
                        </div>
                    );
                }) : <div className="flex justify-center items-center h-full"><CircularProgress /></div>}
            </div>
        </>
    );
}

export default Actions;
