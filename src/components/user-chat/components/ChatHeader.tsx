import Search from '../../../shared/navbar/components/Search';

import { avatar, groupDefaultIcon, more, cross, moreInWhite } from '../../../icons';
import chatHeader from './ChatHeader.module.scss';
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
        isDarkTheme,
    } = props || {};

    // const [mark, setmark] = useState(false);
    return (
        <div className={`${chatHeader.parent} ${isDarkTheme?'bg-[#181818]':'bg-white'}`}>
            <div className={chatHeader.chatHeader}>
                <div>
                    {isGroup ? (
                        <img
                            style={{ padding: 8 }}
                            className={chatHeader.avatar}
                            src={groupDefaultIcon}
                            alt=""
                        />
                    ) : (
                        // <img className={chatHeader.avatar} src={profilePic} alt="" />
                        null
                    )}
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <p className={chatHeader.name}>{name}</p>
                        {/* <p className={chatHeader.userMention}>{name}</p> */}
                    </div>
                </div>
                <img onClick={moreOptionH} style={{ cursor: 'pointer' }} src={isDarkTheme?moreInWhite:more} alt="" />
            </div>
            {/* {!safeMsg && (
                <div className={chatHeader.chatWarner}>
                    <div className={chatHeader.content}>
                        <p className={chatHeader.name}>Mark this message safe?</p>
                        <p className={chatHeader.desc}>
                            We really care about your safety. We will stop showing this message once
                            you mark it safe.
                        </p>
                    </div>
                    <div className={chatHeader.btns}>
                        <button onClick={onReportClick}>Report</button>
                        <button id="1234" onClick={onMarkSafe}>
                            Mark safe
                        </button>
                    </div>
                </div>
            )} */}
            {searchMessage && (
                <div className="flex flex-row items-center justify-between">
                    <Search
                        onInputChangeHandler={searchMessagesHandler}
                        placeholder={'Search'}
                        showClose={true}
                        searchMsgBar={searchMsgBar}
                        selectFirstSearch={true}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatHeader;
