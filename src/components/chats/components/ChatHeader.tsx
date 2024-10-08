import Search from '../../../shared/navbar/components/Search';

import { avatar, groupDefaultIcon, more, cross } from '../../../icons';
import style from './ChatHeader.module.scss';
function ChatHeader(props: any) {
    const {
        moreOptionH,
        name,
        profilePic,
        isGroup,
        safeMsg,
        onReportClick,
        onMarkSafe,
        searchMessagesHandler,
        searchMessage,
        searchMsgBar,
    } = props || {};

    // const [mark, setmark] = useState(false);
    return (
        <div className={style.parent}>
            <div className={style.chatHeader}>
                <div>
                    {isGroup ? (
                        <img
                            style={{ padding: 8 }}
                            className={style.avatar}
                            src={groupDefaultIcon}
                            alt=""
                        />
                    ) : (
                        // <img className={style.avatar} src={profilePic} alt="" />
                        null
                    )}
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <p className={style.name}>{name}</p>
                        {/* <p className={style.userMention}>{name}</p> */}
                    </div>
                </div>
                {/* <img onClick={moreOptionH} style={{ cursor: 'pointer' }} src={more} alt="" /> */}
            </div>
            {/* {!safeMsg && (
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
            )} */}
            {/* {searchMessage && (
                <div className="flex flex-row items-center justify-between">
                    <Search
                        onInputChangeHandler={searchMessagesHandler}
                        placeholder={'Search'}
                        showClose={true}
                        searchMsgBar={searchMsgBar}
                    />
                </div>
            )} */}
        </div>
    );
}

export default ChatHeader;
