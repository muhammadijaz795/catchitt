import { useEffect, useRef } from 'react';
import {
    avatar,
    closeSvg,
    friendsChatWelcomeSvg,
    groupMembers,
    groupWelcome,
    notfriendsChatWelcome,
    seenMsgSvg,
    starMsg,
} from '../../icons';
import Layout from '../../shared/layout';
import Actions from './components/Actions';
import ChatHeader from './components/ChatHeader';
import DoMsg from './components/DoMsg';
import DropDown from './components/DropDown';
import GroupSideBar from './components/GroupSideBar';
import LongPressButton from './components/LongPressEvent';
import UserChats from './components/chats';
import ForFriends from './components/welcomeScreens/ForFriends';
import ForGroups from './components/welcomeScreens/ForGroups';
import ForPeoples from './components/welcomeScreens/ForPeoples';
import hook from './hook/useChat';
import style from './index.module.scss';
import SearchUser from './components/modals/SearchUser';
import EditChatName from './components/modals/EditName';
import StaredMesagesSec from './components/StaredMesagesSec';
import { setgroups } from 'process';

function ChatsSec() {
    const {
        moreOptions,
        setMoreOptions,
        reportPopup,
        setreportPopup,
        blockPopup,
        setblockPopup,
        groupOptions,
        setGroupOptions,
        markTheMsgSafe,
        setMarkTheMsgSafe,
        smsRef,
        setSmsRef,
        replySms,
        setreplysms,
        showShortSidebar,
        setshowShortSidebar,
        msg,
        setMsg,
        activeChat,
        activeUser,
        users,
        autoScrolElem,
        longPressH,
        insertKeyH,
        valuesH,
        valuesH2,
        deleteH,
        globalClickH,
        submitH,
        chatSwitchH,
        userPinH,
        copyModal,
        copyH,
        editGroupNameModal,
        setEditGroupNameModal,
        onSaveChanges,
        addMembersPopup,
        setAddMembersPopup,
        staredMsgs,
        staredmodal,
        setstaredmodal,
    } = hook();

    return (
        <Layout
            globalClicker={globalClickH}
            showReportPopup={reportPopup}
            closeReportPopup={() => setreportPopup(false)}
            showBlockPopup={blockPopup}
            closeBlockPopup={() => setblockPopup(false)}
            showShortSidebar={showShortSidebar}
        >
            <div className={style.parent}>
                <UserChats id={activeUser.userId} OnChatClick={chatSwitchH} data={users} />
                <div className={style.chat}>
                    <div className={style.sec1} ref={autoScrolElem}>
                        <ChatHeader
                            isGroup={activeUser?.isGroup}
                            safeMsg={markTheMsgSafe}
                            name={activeUser?.userName}
                            moreOptionH={() => {
                                if (activeUser.isGroup) {
                                    setGroupOptions(!groupOptions);
                                    setshowShortSidebar(!showShortSidebar);
                                    if (showShortSidebar) {
                                        // setMoreOptions(!moreOptions);
                                        setshowShortSidebar(false);
                                    }
                                } else {
                                    setMoreOptions(!moreOptions);
                                }
                            }}
                            onReportClick={() => setreportPopup(true)}
                            onMarkSafe={() => setMarkTheMsgSafe(true)}
                        />
                        {activeChat?.chats?.length === 0 ? (
                            !activeUser?.isGroup ? (
                                <div className={style.msgsContainer}>
                                    {activeUser?.friends?.find(activeChat?.userId) ? (
                                        <ForFriends />
                                    ) : (
                                        <ForPeoples />
                                    )}
                                </div>
                            ) : (
                                <ForGroups />
                            )
                        ) : (
                            <Actions
                                valuesH={valuesH}
                                valuesH2={valuesH2}
                                setSmsRef={setSmsRef}
                                setreplysms={setreplysms}
                                replySms={replySms}
                                insertKeyH={insertKeyH}
                                deleteH={deleteH}
                                activeUser={activeUser}
                                longPressH={longPressH}
                                autoScrolElem={autoScrolElem}
                                activeChat={activeChat}
                                copyH={copyH}
                            />
                        )}
                    </div>
                    {replySms && (
                        <div className={style.replyC}>
                            <p className={style.replyText}>
                                Replying to{' '}
                                <span className={style.name}>{activeUser?.userName}</span>{' '}
                            </p>
                            <p className={style.descreplyText}>{smsRef}</p>
                            <img onClick={() => setreplysms(false)} src={closeSvg} alt="" />
                        </div>
                    )}
                    <DoMsg
                        onSubmit={submitH}
                        onChange={(e: any) => setMsg(e.target.value)}
                        msg={msg}
                    />
                    {!groupOptions && moreOptions && (
                        <DropDown
                            activeUser={activeUser}
                            pinUserH={userPinH}
                            blockH={() => setblockPopup(true)}
                            reportH={() => setreportPopup(true)}
                            staredModal={() => {
                                setshowShortSidebar(true);
                                setstaredmodal(true);
                                setMoreOptions(false);
                            }}
                        />
                    )}
                </div>
                {groupOptions && (
                    <div>
                        <GroupSideBar
                            onBack={() => {
                                setshowShortSidebar(false);
                                setGroupOptions(false);
                            }}
                            activeUser={activeUser}
                            pinUserH={userPinH}
                            showEditPopup={() => setEditGroupNameModal(!editGroupNameModal)}
                            addMembersHandler={() => setAddMembersPopup(true)}
                        />
                    </div>
                )}
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
                            zIndex: 5,
                        }}
                    >
                        <p className={style.blackText_16}>🎉 Copied successfully</p>
                    </div>
                )}

                {staredmodal && (
                    <StaredMesagesSec
                        onBack={() => {
                            setstaredmodal(false);
                            setshowShortSidebar(false);
                        }}
                        staredMsgs={staredMsgs}
                    />
                )}
            </div>
            <SearchUser
                onOpen={addMembersPopup}
                blockPopupHandler={() => setblockPopup(true)}
                reportPopupHandler={() => setreportPopup(true)}
                onClose={() => setAddMembersPopup(false)}
            />
            <EditChatName
                onOpen={editGroupNameModal}
                onClose={() => setEditGroupNameModal(false)}
                onSaveChanges={onSaveChanges}
            />
        </Layout>
    );
}

export default ChatsSec;
