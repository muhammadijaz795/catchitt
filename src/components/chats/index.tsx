import { ToastContainer } from 'react-toastify';
import { closeSvg } from '../../icons';
import Layout from '../../shared/layout';
import Actions from './components/Actions';
import ChatHeader from './components/ChatHeader';
import DoMsg from './components/DoMsg';
import DropDown from './components/DropDown';
import GroupSideBar from './components/GroupSideBar';
import StaredMesagesSec from './components/StaredMesagesSec';
import UserChats from './components/chats';
import EditChatName from './components/modals/EditName';
import Forwardusers from './components/modals/Forwardusers';
import SearchUser from './components/modals/SearchUser';
import ForFriends from './components/welcomeScreens/ForFriends';
import ForGroups from './components/welcomeScreens/ForGroups';
import ForPeoples from './components/welcomeScreens/ForPeoples';
import hook from './hook/useChat';
import style from './index.module.scss';

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
        smsId,
        setSmsId,
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
        showSearchMessage,
        searchMessage,
        DangerText,
        setDengerText,
        dangetBtnText,
        setdangetBtnText,
        onBlock,
        onChangeH,
        deleteHandler,
        multipleUnstarHandlr,
        forwardModal,
        setforwardModal,
        selectedData,
        onUsersInputChangeHandler,
        searchMessagesHandler,
        showToast,
        handleScroll,
    } = hook();
    console.log("[activeUser", activeUser);

    return (
        <Layout
            globalClicker={globalClickH}
            showReportPopup={reportPopup}
            closeReportPopup={() => setreportPopup(false)}
            showBlockPopup={blockPopup}
            closeBlockPopup={() => setblockPopup(false)}
            showShortSidebar={showShortSidebar}
            DangerText={DangerText}
            dangetBtnText={dangetBtnText}
            onBlock={onBlock}
        >
            <div className={style.parent}>
                <UserChats
                    onUsersInputChangeHandler={onUsersInputChangeHandler}
                    id={activeUser?.userId}
                    OnChatClick={chatSwitchH}
                    data={users}
                />
                <div className={style.chat}>
                    <div className={style.sec1} ref={autoScrolElem}>
                        <ChatHeader
                            isGroup={activeUser?.isGroup}
                            safeMsg={markTheMsgSafe}
                            name={activeUser?.userName}
                            profilePic={activeUser?.avatar}
                            moreOptionH={() => {
                                if (activeUser?.isGroup) {
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
                            searchMessage={searchMessage}
                            showSearchMessage={showSearchMessage}
                            searchMessagesHandler={searchMessagesHandler}
                            searchMsgBar={() => {
                                showSearchMessage(false);
                            }}
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
                                setSmsId={setSmsId}
                                setreplysms={setreplysms}
                                replySms={replySms}
                                insertKeyH={insertKeyH}
                                deleteH={deleteH}
                                activeUser={activeUser}
                                longPressH={longPressH}
                                autoScrolElem={autoScrolElem}
                                activeChat={activeChat}
                                copyH={copyH}
                                showToast={showToast}
                                handleScroll={handleScroll}
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
                    {/* <p>{activeUser?.}</p> */}
                    {activeUser?.isBlocked ? (
                        <p className="p-8">
                            You can't send message to {activeUser?.userName} as you've blocked this
                            user
                        </p>
                    ) : (
                        <DoMsg
                            onSubmit={submitH}
                            onChange={(e: any) => setMsg(e.target.value)}
                            msg={msg}
                        />
                    )}
                    {!groupOptions && moreOptions && (
                        <DropDown
                            activeUser={activeUser}
                            pinUserH={userPinH}
                            blockH={() => {
                                setdangetBtnText(
                                    `   ${activeUser?.isBlocked ? 'UnBlock' : 'Block'}`
                                );
                                setDengerText(
                                    `Are you sure you want to ${
                                        activeUser?.isBlocked ? 'UnBlock' : 'Block'
                                    } ${activeUser?.userName}?`
                                );
                                setblockPopup(true);
                            }}
                            reportH={() => setreportPopup(true)}
                            staredModal={() => {
                                setshowShortSidebar(true);
                                setstaredmodal(true);
                                setMoreOptions(false);
                            }}
                            searchMsgBar={() => {
                                showSearchMessage(true);
                                setMoreOptions(false);
                            }}
                            numberOfMessages={staredMsgs[0]?.chats?.length}
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
                            openStaredSMS={() => {
                                setstaredmodal(true);
                                setGroupOptions(false);
                            }}
                            numberOfMessages={staredMsgs[0]?.chats?.length}
                            blockPopupHandler={() => {
                                setdangetBtnText('Block');
                                setDengerText('');
                                setblockPopup(true);
                            }}
                            reportPopupHandler={() => setreportPopup(true)}
                        />
                    </div>
                )}
                {/* {copyModal && (
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
                )} */}

                {staredmodal && (
                    <StaredMesagesSec
                        onBack={() => {
                            setstaredmodal(false);
                            setshowShortSidebar(false);
                        }}
                        staredMsgs={staredMsgs}
                        userName={activeUser?.userName}
                        onChangeH={onChangeH}
                        deleteHandler={deleteHandler}
                        starHandler={valuesH2}
                        multipleUnstarHandlr={multipleUnstarHandlr}
                        showForwardModal={() => {
                            if (selectedData.length > 0) {
                                setforwardModal(true);
                            }
                        }}
                        selectedData={selectedData}
                    />
                )}
            </div>
            <SearchUser
                onOpen={addMembersPopup}
                blockPopupHandler={() => {
                    setdangetBtnText('Block');
                    setDengerText(`Are you sure you want to block ${activeUser?.userName}?`);
                    setblockPopup(true);
                }}
                reportPopupHandler={() => setreportPopup(true)}
                onClose={() => setAddMembersPopup(false)}
            />
            <EditChatName
                onOpen={editGroupNameModal}
                onClose={() => setEditGroupNameModal(false)}
                onSaveChanges={onSaveChanges}
            />
            <Forwardusers onOpen={forwardModal} onClose={() => setforwardModal(false)} />
            <div>
                <ToastContainer />
            </div>
        </Layout>
    );
}

export default ChatsSec;
