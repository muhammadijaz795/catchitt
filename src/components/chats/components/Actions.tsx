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
} from '../../../icons';
import style from './Actions.module.scss';
import LongPressButton from './LongPressEvent';
function Actions(props: any) {
    const {
        valuesH,
        valuesH2,
        setSmsRef,
        setSmsId,
        setreplysms,
        replySms,
        insertKeyH,
        deleteH,
        activeUser,
        longPressH,
        autoScrolElem,
        activeChat,
        copyH,
        showToast,
        handleScroll
    } = props || {};
    const loggedInUserId = localStorage.getItem('userId');
    console.log('activeChat',activeChat);
    
    return (
        <div ref={autoScrolElem} className={style.msgsContainer} onScroll={handleScroll}>
            {activeChat?.userId &&
                activeChat?.chats?.map((item: any, index: number) => {
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
                                <img src={activeChat?.userImage!=""? activeChat?.userImage:defaultAvatar} className={style.avatar} alt="" onError={(e) => {
                                    (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                    (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                }} />
                            )}

                            <div className={style.msg}>
                                {item.emojis && item.dropdown && (
                                    <div
                                        style={{
                                            left: item.receiverId == loggedInUserId ? 'auto' : '-145px',
                                            right: item.receiverId == loggedInUserId ? '-145px' : 'auto',
                                            display:'flex'
                                        }}
                                        className={style.dropd}
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
                                                {item.stared ? 'Unlike' : 'Like'}
                                            </p>
                                        </div>
                                        {/* <hr className={style.hr} /> */}
                                        |
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
                                        {/* <hr className={style.hr} /> */} 
                                        {item.isrecevied && (
                                        <>
                                            |
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
                                    </div>
                                )}
                                <div style={{ position: 'relative', zIndex: 20 }}>
                                    <LongPressButton onLongPress={() => longPressH(item)}>
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
                                                        {item?.replysms}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className={style.ans}>{item.msg}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                            {item?.type == 'Text' &&
                                            <p
                                                onClick={(e) => e.stopPropagation()}
                                                className={`${
                                                    item.receiverId == loggedInUserId
                                                        ? style.receivedMsg
                                                        : style.sendedMsg
                                                }`}
                                            >
                                                {item.msg}
                                            </p>  }
                                            
                                            {item?.type == 'Image' &&
                                                <img src={item.msg} />
                                            }
                                            
                                            {item?.type == 'Video' &&
                                               <video
                                               disablePictureInPicture
                                               controlsList="nodownload noplaybackrate"
                                               controls={true} 
                                               style={{ height: "60%", width: "60%" }}
                                               src={item.msg}
                                             />
                                            }
                                            </>
                                        )}
                                    </LongPressButton>
                                </div>
                                <div className={style.subContent}>
                                    {item.stared && <><span>❤️ </span> 
                                    {/* <img src={avatar} className={style.avatarLike} alt="" /> */}
                                    </>}
                                    {!item?.isrecevied && item?.isRead && (
                                        <img src={seenMsgSvg} alt="" />
                                    )}
                                     <p>{item.time}</p>
                                </div>
                                {item.emojis && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            left: item.receiverId != loggedInUserId ? '-75px' : 'auto',
                                            right: item.receiverId == loggedInUserId ? '-75px' : 'auto',
                                        }}
                                        className={style.actionsOnLongP}
                                    >
                                        {/* <img
                                            src={emoji}
                                            alt=""
                                            onClick={() => {
                                                valuesH(item, 'showEmogis');
                                            }}
                                        /> */}
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
                                                valuesH(item, 'dropdown');
                                            }}
                                            src={moreInMsg}
                                            alt=""
                                        />
                                        {/* {item.showEmogis && (
                                            <div
                                                className={`${style.showEmogis} ${
                                                    !item?.isrecevied
                                                        ? style.showEmogisr
                                                        : style.showEmogis
                                                }`}
                                                style={{
                                                    top: item.id === 1 ? '-35px' : '',
                                                }}
                                            >
                                                <p
                                                    onClick={() => {
                                                        insertKeyH('showEmogis', false);
                                                        insertKeyH('emojis', false);
                                                    }}
                                                >
                                                    ❤️{' '}
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        insertKeyH('showEmogis', false);
                                                        insertKeyH('emojis', false);
                                                    }}
                                                >
                                                    😂
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        insertKeyH('showEmogis', false);
                                                        insertKeyH('emojis', false);
                                                    }}
                                                >
                                                    🥰
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        insertKeyH('showEmogis', false);
                                                        insertKeyH('emojis', false);
                                                    }}
                                                >
                                                    😭
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        insertKeyH('showEmogis', false);
                                                        insertKeyH('emojis', false);
                                                    }}
                                                >
                                                    😳
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        insertKeyH('showEmogis', false);
                                                        insertKeyH('emojis', false);
                                                    }}
                                                >
                                                    👍
                                                </p>
                                                <p
                                                    onClick={() => {
                                                        insertKeyH('showEmogis', false);
                                                        insertKeyH('emojis', false);
                                                    }}
                                                    className={style.plusemogi}
                                                >
                                                    +
                                                </p>
                                            </div>
                                        )} */}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Actions;
