import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Divider from '@mui/material/Divider';
import { avatar, groupDefaultIcon, pinChat } from '../../../icons';
import style from './chat.module.scss';

const options = [
  { text: 'Mute', icon: <NotificationsOffOutlinedIcon /> },
  { text: 'Delete', icon: <DeleteOutlinedIcon /> },
  { text: 'Pin to top', icon: <PushPinOutlinedIcon /> },
  { text: 'Report', icon: <OutlinedFlagIcon /> },
  { text: 'Block', icon: <BlockOutlinedIcon /> },
];

const ITEM_HEIGHT = 60;


function UserChat(props: any) {
        const { userName, lastMsg, ispined, lastSeen, unReadMsgs, OnChatClick, userId, id, isGroup } = props || {};

        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
    return (
        <div
            className={style.chat}
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
                        <img src={avatar} alt="" />
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
                    style={{padding:'0px'}}
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
                            borderRadius:'10px',
                            padding:'10px',
                            transform: 'translate(-160px, 0px)',
                        },
                    }}
                >
                    {options.map((option, index) => (
                        <div key={option.text}>
                            <MenuItem onClick={handleClose}>
                                {option.icon}
                                <span style={{ marginLeft: '8px',fontWeight:'bold' }}>{option.text}</span>
                            </MenuItem>
                            {index < options.length - 1 && <Divider />}
                        </div>
                    ))}
                </Menu>
                <p className={style.seenStatus}>{lastSeen}</p>
                {ispined ? (
                    <img src={pinChat} alt="" />
                ) : unReadMsgs > 0 ? (
                    <div className={style.msgCounter}>
                        <p>{unReadMsgs}</p>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default UserChat;