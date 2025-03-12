import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import PanoramaHorizontalSharpIcon from '@mui/icons-material/PanoramaHorizontalSharp';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import Divider from '@mui/material/Divider';
import { avatar, groupDefaultIcon, pinChat, defaultAvatar, eyeIcon } from '../../../icons';
import style from './chat.module.scss';
// import hook from '../hook/useChat';
import { AccountCircleOutlined } from '@mui/icons-material';
import PopupForReport from '../../../components/profile/popups/PopupForReport';
import BlockPopup from '../../../shared/popups/BlockPopup';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const options = [
    { text: 'Mute', icon: <NotificationsOffOutlinedIcon /> },
    { text: 'Delete', icon: <DeleteOutlinedIcon /> },
    { text: 'Pin to top', icon: <PushPinOutlinedIcon /> },
    //   { text: 'Report', icon: <OutlinedFlagIcon /> },
    { text: 'Block', icon: <BlockOutlinedIcon /> },
];

const ITEM_HEIGHT = 60;


function UserChat(props: any) {
    const { userName, nickName, lastMsg, ispined, isBlocked, lastSeen, unReadMsgs, OnChatClick, userId, id, isGroup, userImage, conversationId, userPinH, onBlock, setstaredmodal, isDarkTheme, isActive, isMuted } = props || {};
    // console.log("user chat props ", props);
    // const {
    //     moreOptions,
    //     setMoreOptions,
    //     reportPopup,
    //     setreportPopup,
    //     blockPopup,
    //     setblockPopup,
    //     groupOptions,
    //     setGroupOptions,
    //     markTheMsgSafe,
    //     setMarkTheMsgSafe,
    //     smsRef,
    //     setSmsRef,
    //     smsId,
    //     setSmsId,
    //     replySms,
    //     setreplysms,
    //     showShortSidebar,
    //     setshowShortSidebar,
    //     msg,
    //     setMsg,
    //     activeChat,
    //     activeUser,
    //     users,
    //     autoScrolElem,
    //     longPressH,
    //     insertKeyH,
    //     valuesH,
    //     valuesH2,
    //     deleteH,
    //     globalClickH,
    //     submitH,
    //     chatSwitchH,
    //     userPinH,
    //     copyModal,
    //     copyH,
    //     editGroupNameModal,
    //     setEditGroupNameModal,
    //     onSaveChanges,
    //     addMembersPopup,
    //     setAddMembersPopup,
    //     staredMsgs,
    //     staredmodal,
    //     setstaredmodal,
    //     showSearchMessage,
    //     searchMessage,
    //     DangerText,
    //     setDengerText,
    //     dangetBtnText,
    //     setdangetBtnText,
    //     onBlock,
    //     onChangeH,
    //     deleteHandler,
    //     multipleUnstarHandlr,
    //     forwardModal,
    //     setforwardModal,
    //     selectedData,
    //     onUsersInputChangeHandler,
    //     searchMessagesHandler,
    //     showToast,
    //     handleScroll,
    // } = hook();
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [muteN, setmuteN] = useState(false);
    const [reportPopup, setreportPopup] = useState(false);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const handleReport = () => {
        setreportPopup(true)
    }
    // const handleAction = (text:string, ispined:any) => {
    //     if(text == "Report"){
    //         console.log("Report");
    //         // blockH(reportH)
    //         setreportPopup(true);

    //         // reportH={() => setreportPopup(true)}
    //         // staredModal={() => {
    //             setshowShortSidebar(true);[]
    //             setstaredmodal(true);[]
    //             setMoreOptions(false);
    //         // }}

    //     }else if(text == "Block"){

    //             setdangetBtnText(`${isBlocked ? 'UnBlock' : 'Block'}?`);
    //             setDengerText(`Are you sure you want to ${isBlocked ? 'UnBlock' : 'Block'}?`);
    //             setblockPopup(true);
    //             handleBlockUserFromChat();


    //     }else if(text == "Pin to top"){
    //         console.log("Pin to top",text, ispined)
    //         userPinH(userId);
    //         // window.location.reload(); 
    //     }else if(text == "Mute"){
    //         console.log("Mute")
    //         setmuteN(!muteN);
    //     }else if(text == "Delete"){
    //         console.log("Delete")
    //         handleDeleteUserFromChat();
    //     }

    // };  
    const handleMute = async() => {
        // setMutePopup(true);
        try {
            const response = await fetch(`${API_KEY}/chat/conversation/update`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mute: !isMuted, conversationId }),
            });
            const res = await response.json();
            console.log('handleMute response', res);
            if (res.status ==200) {
                window.location.reload();
            }
        } catch (error) {
            console.log('error blocking user', error);
        }
    }
    
    const handleDeleteUserFromChat = async () => {
        try {
            const response = await fetch(
                `${API_KEY}/chat/conversation/${conversationId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            // window.location.reload(); 
            console.log("delete user chat", res);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log('Error deleting message', error);
        }
    };

    const handlePin = () => {
        console.log("Pin to top", ispined)
        userPinH(userId);
    }

    const handleBlock = () => {
        onBlock()
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }

    const handleBlockUserFromChat = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/block`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.json();
            if (res.OK) {
                window.location.reload();
            }
        } catch (error) {
            console.log('error blocking user', error);
        }
    };
    const lightThemePalette = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkThemePalette = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={isDarkTheme ? darkThemePalette : lightThemePalette}>
            <div
                className={`${style.chat} ${isDarkTheme ? 'hover:bg-[#282828]' : 'hover:bg-[#dfdfdf]'} ${isActive? isDarkTheme ? 'bg-[#282828]' : 'bg-[#dfdfdf]':''}`}
                onClick={() => OnChatClick(userId)}
            >
                {lastMsg ? (
                    <div>
                        {isGroup ? (
                            <img
                                style={{ padding: 8, background: '#EAEAEA' }}
                                src={groupDefaultIcon}
                                alt=""
                            />
                        ) : (
                            <img src={userImage != "" ? userImage : defaultAvatar} alt="" />
                        )}
                        <div>
                            <p className={style.nameText}>{userName}</p>
                            <p className={style.msgText}>{lastMsg}</p>
                        </div>
                    </div>
                ) : (
                    <p>No messages yet</p>
                )}
                <div>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{ padding: '0px' }}
                    >
                        <MoreHorizOutlinedIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '22ch',
                                borderRadius: '10px',
                                padding: '10px',
                                transform: 'translate(-160px, 0px)',
                            },
                        }}
                    >
                        {/* {options.map((option, index) => ( */}
                            {/* <div key={option.text}>
                                <MenuItem onClick={handleClose}>
                                
                                    {option.icon}
                                    <span style={{ marginLeft: '8px',fontWeight:'bold' }} 
                                    // onClick={() => handleAction(option.text, ispined)}
                                    >{option.text}</span>
                                </MenuItem>
                                {index < options.length - 1 && <Divider />}
                            </div> */}
                        {/* ))} */}
                        <div key="pintotop">
                            <MenuItem onClick={handlePin}>
                                <PushPinOutlinedIcon />
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }} >{ispined ? 'Remove Pin to top' : 'Pin to top'}</span>
                            </MenuItem>
                            <Divider />
                        </div>
                        <div key="delete">
                            <MenuItem onClick={handleDeleteUserFromChat}>
                                <DeleteOutlinedIcon />
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }} >Delete chat</span>
                            </MenuItem>
                            <Divider />
                        </div>
                        <div key="block">
                            <MenuItem onClick={handleBlock}>
                                <BlockOutlinedIcon />
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }} >{isBlocked ? 'Unblock' : 'Block'}</span>
                            </MenuItem>
                            <Divider />
                        </div>
                        <div key="stared">
                            <MenuItem onClick={() => { setstaredmodal(true); handleClose() }}>
                                <GradeIcon />
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }} >Stared Message</span>
                            </MenuItem>
                            <Divider />
                        </div>
                        <div key="profile">
                            <MenuItem onClick={() => navigate(`/profile/${userId}`)}>
                                <AccountCircleOutlined />
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }} >Profile</span>
                            </MenuItem>
                            <Divider />
                        </div>
                        <div key="report">
                            <MenuItem onClick={() => { handleReport(); } }>
                                <PanoramaHorizontalSharpIcon />
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }} >Report</span>
                            </MenuItem>
                            <Divider />
                        </div>
                        <div key="mute">
                            <MenuItem onClick={() => { handleMute(); } }>
                                <AccountCircleOutlined />
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }} >Mute</span>
                            </MenuItem>
                            <Divider />
                        </div>
                    </Menu>
                    <p className={style.seenStatus+' whitespace-nowrap'}>{lastSeen}</p>
                    {ispined ? (
                        <img src={pinChat} alt="" />
                    ) : (
                        <div></div>
                    )}
                    
                    {isMuted ? (
                        <NotificationsOffOutlinedIcon />
                    ) : unReadMsgs > 0 ? (
                        <div className={style.msgCounter}>
                            <p>{unReadMsgs}</p>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                {/* <PopupForReport
                        openReport={reportPopup}
                        onReportClose={() => setreportPopup(false)}
                    /> 
                */}
                {/* <BlockPopup
                        onBlock={onBlock}
                        dangetBtnText={dangetBtnText}
                        DangerText={DangerText}
                        openBlock={blockPopup}
                        onBlockClose={() => setblockPopup(false)}
                    /> 
                */}
                
            </div>

            <PopupForReport className={style.popupReport}
                        openReport={reportPopup}
                        onReportClose={() => { setreportPopup(false);  handleClose(); }}
                        isChatReport={true}
                        style={{ height: '0px' }}
                    /> 
            
        </ThemeProvider>
    );
}

export default UserChat;