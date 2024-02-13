import { avatar, groupDefaultIcon, pinChat } from '../../../icons';
import style from './chat.module.scss';

function UserChat(props: any) {
    const { userName, lastMsg, ispined, lastSeen, unReadMsgs, OnChatClick, userId, id, isGroup } =
        props || {};
    return (
        <div
            style={{ backgroundColor: id === userId ? '#dfdfdf' : '#FFF' }}
            className={style.chat}
            onClick={() => OnChatClick(userId)}
        >
            <div>
                {isGroup ? <img style={{padding:8 , background:'#EAEAEA'}} src={groupDefaultIcon} alt="" /> : <img src={avatar} alt="" />}
                <div>
                    <p className={style.nameText}>{userName}</p>
                    <p className={style.msgText}>{lastMsg}</p>
                </div>
            </div>
            <div>
                <p className={style.seenStatus}>{lastSeen}</p>
                {!ispined ? (
                    <div className={style.msgCounter}>
                        <p>{unReadMsgs}</p>
                    </div>
                ) : (
                    <img src={pinChat} alt="" />
                )}
            </div>
        </div>
    );
}

export default UserChat;
