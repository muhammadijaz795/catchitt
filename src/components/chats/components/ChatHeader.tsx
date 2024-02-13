import { useState } from 'react';
import { avatar, groupDefaultIcon, more } from '../../../icons';
import style from './ChatHeader.module.scss';
function ChatHeader(props: any) {
    const { moreOptionH, name, isGroup, safeMsg, onReportClick, onMarkSafe } = props || {};

    // const [mark, setmark] = useState(false);
    return (
        <div className={style.parent}>
            <div className={style.chatHeader}>
                <div>
                    {isGroup ? (
                        <img style={{padding:8}} className={style.avatar} src={groupDefaultIcon} alt="" />
                    ) : (
                        <img className={style.avatar} src={avatar} alt="" />
                    )}
                    <p className={style.name}>{name}</p>
                </div>
                <img onClick={moreOptionH} style={{ cursor: 'pointer' }} src={more} alt="" />
            </div>
            {!safeMsg && (
                <div className={style.chatWarner}>
                    <div className={style.content}>
                        <p className={style.name}>Mark this message safe?</p>
                        <p className={style.desc}>
                            We really care about your safety. We will stop showing this message once
                            you mark it safe.
                        </p>
                    </div>
                    <div className={style.btns}>
                        <button onClick={onReportClick}>Report</button>
                        <button id="1234" onClick={onMarkSafe}>
                            Mark safe
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatHeader;
