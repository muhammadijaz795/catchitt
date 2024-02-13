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
} from '../../../icons';
import style from './Actions.module.scss';
import LongPressButton from './LongPressEvent';
function Actions(props: any) {
    const {
        valuesH,
        valuesH2,
        setSmsRef,
        setreplysms,
        replySms,
        insertKeyH,
        deleteH,
        activeUser,
        longPressH,
        autoScrolElem,
        activeChat,
        copyH,
    } = props || {};
    return (
        <div ref={autoScrolElem} className={style.msgsContainer}>
            {activeChat?.userId &&
                activeChat?.chats.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className={style.msgContainer}
                            style={{
                                margin: item.isrecevied ? '0px 20% 0px 0%' : '0px 0% 0px 20%',
                                flexDirection: item.isrecevied ? 'row' : 'row-reverse',
                            }}
                        >
                            {item.isrecevied && (
                                <img src={avatar} className={style.avatar} alt="" />
                            )}

                            <div className={style.msg}>
                                {item.emojis && item.dropdown && (
                                    <div
                                        style={{
                                            left: item?.isrecevied ? 'auto' : '-145px',
                                            right: item?.isrecevied ? '-145px' : 'auto',
                                        }}
                                        className={style.dropd}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            valuesH2(item, 'stared', !item.stared);
                                        }}
                                    >
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            // onClick={(e) => {
                                            //     e.stopPropagation();
                                            //     valuesH2(item, 'stared', !item.stared);
                                            // }}
                                        >
                                            <img src={!item.stared ? starMsg : unStarMsg} alt="" />
                                            <p color="#222" className={style.dropdText}>
                                                {item.stared ? 'Unstar' : 'Star'}
                                            </p>
                                        </div>
                                        <hr className={style.hr} />
                                        <div
                                            onClick={() => copyH(item.msg)}
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <img src={copyMsg} alt="" />
                                            <p color="#222" className={style.dropdText}>
                                                Copy
                                            </p>
                                        </div>
                                        <hr className={style.hr} />
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => deleteH(item)}
                                        >
                                            <img src={deleteMsg} alt="" />
                                            <p
                                                style={{
                                                    color: '#DE0C0C',
                                                }}
                                                className={style.dropdText}
                                            >
                                                Delete
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div style={{ position: 'relative', zIndex: 20 }}>
                                    <LongPressButton onLongPress={() => longPressH(item)}>
                                        {item?.replysms ? (
                                            <div
                                                className={style.tempparent}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div>
                                                    <p className={style.primaryText}>
                                                        {activeUser.userName}
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
                                            <p
                                                onClick={(e) => e.stopPropagation()}
                                                className={`${
                                                    item.isrecevied
                                                        ? style.receivedMsg
                                                        : style.sendedMsg
                                                }`}
                                            >
                                                {item.msg}
                                            </p>
                                        )}
                                    </LongPressButton>
                                </div>
                                <div className={style.subContent}>
                                    {item.stared && <img src={starMsg} alt="" />}
                                    <p>{item.time}</p>
                                    {!item.isrecevied && <img src={seenMsgSvg} alt="" />}
                                </div>
                                {item.emojis && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            left: !item?.isrecevied ? '-120px' : 'auto',
                                            right: item?.isrecevied ? '-120px' : 'auto',
                                        }}
                                        className={style.actionsOnLongP}
                                    >
                                        <img
                                            src={emoji}
                                            alt=""
                                            onClick={() => {
                                                valuesH(item, 'showEmogis');
                                            }}
                                        />
                                        <img
                                            onClick={() => {
                                                setSmsRef(item?.msg);
                                                setreplysms(!replySms);
                                            }}
                                            src={tagMsg}
                                            alt=""
                                        />
                                        <img
                                            onClick={() => {
                                                valuesH(item, 'dropdown');
                                            }}
                                            src={moreInMsg}
                                            alt=""
                                        />
                                        {item.showEmogis && (
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
                                        )}
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
