import { Switch } from 'antd';
import {
    avatar,
    comment,
    editGroupName,
    groupDefaultIcon,
    moreinfouser,
    rightArrow,
    search,
} from '../../../icons';
import style from './GroupSideBar.module.scss';
import SimpleListMenu from './modals/Btn';
function GroupSideBar(props: any) {
    const {
        onBack,
        pinUserH,
        activeUser,
        showEditPopup,
        addMembersHandler,
        openStaredSMS,
        numberOfMessages,
        blockPopupHandler,
        reportPopupHandler,
    } = props || {};
    return (
        <div className={style.parent}>
            <div className={style.header}>
                <img onClick={onBack} src={rightArrow} alt="" />
                <div className={style.headerContent}>
                    <img className={style.avatar} src={groupDefaultIcon} alt="" />
                    <div>
                        <div>
                            <p className={style.headingText}>Add group name</p>
                            <img
                                onClick={showEditPopup}
                                style={{ cursor: 'pointer' }}
                                src={editGroupName}
                                alt=""
                            />
                        </div>
                        <p className={style.membersText}>4 members</p>
                    </div>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.switchP}>
                    <p className={style.texts}>Mute notifications</p>
                    <Switch />
                </div>
                <div className={style.switchP}>
                    <p className={style.texts}>Pin to top</p>
                    <Switch value={activeUser?.ispined} onChange={() => pinUserH(activeUser?.id)} />
                </div>
                <div className={style.switchP}>
                    <p className={style.texts}>Starred Messages</p>
                    <div
                        style={{
                            display: 'flex',
                            gap: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            height: '100%',
                            flexDirection: 'row-reverse',
                        }}
                        onClick={openStaredSMS}
                    >
                        <img src={rightArrow} alt="" />
                        <p className={style.text_200}>
                            {numberOfMessages === 0 ? 'None' : numberOfMessages}
                        </p>
                    </div>
                </div>
                <div className={style.switchP}>
                    <p className={style.headingText}>Members (4)</p>
                    <img style={{ cursor: 'pointer' }} src={search} alt="" />
                </div>
                <div className={style.addMember} onClick={addMembersHandler}>
                    <p>+</p>
                    <p className={style.primaryText}>Add new member</p>
                </div>

                <div className={style.users}>
                    <div>
                        <div>
                            <img src={avatar} alt="" />
                            <p className={style.texts}>Bou</p>
                            <div className={style.adminC}>
                                <p className={style.adminText}>Admin</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={avatar} alt="" />
                            <p className={style.texts}>Hania</p>
                        </div>
                        <div>
                            <img src={comment} alt="" />
                            <div
                                style={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                <img src={moreinfouser} alt="" />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <SimpleListMenu
                                        blockPopupHandler={blockPopupHandler}
                                        reportPopupHandler={reportPopupHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={avatar} alt="" />
                            <p className={style.texts}>Mohamed</p>
                        </div>
                        <div>
                            <img src={comment} alt="" />
                            <div
                                style={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                <img src={moreinfouser} alt="" />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <SimpleListMenu
                                        blockPopupHandler={blockPopupHandler}
                                        reportPopupHandler={reportPopupHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={avatar} alt="" />
                            <p className={style.texts}>Sara</p>
                        </div>
                        <div>
                            <img src={comment} alt="" />
                            <div
                                style={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                <img src={moreinfouser} alt="" />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <SimpleListMenu
                                        blockPopupHandler={blockPopupHandler}
                                        reportPopupHandler={reportPopupHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.warningContainer}>
                    <div className={style.switchP}>
                        <p className={style.warningText}>Leave group chat</p>
                    </div>
                    <p className={style.warningDescText}>
                        You won’t get messages unless you are added back.
                    </p>
                </div>
                <div className={style.warningContainer}>
                    <div className={style.switchP}>
                        <p className={style.warningText}>Delete group chat</p>
                    </div>
                    <p className={style.warningDescText}>
                        Permanently remove everyone including you.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default GroupSideBar;
