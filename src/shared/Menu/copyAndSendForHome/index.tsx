import { styled } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {
    copyLink,
    send,
    embedShare,
    whatsappShare,
    linkedInShare,
    twitterShare,
    facebookShare,
} from '../../../icons';
import style from './index.module.scss';
import { API_KEY } from '../../../utils/constants';
const options = ['View profile', 'Make admin', 'Remove from group', 'Block', 'Report'];

export default function COPY_AND_SEND_MENU_HOME({
    copyHandler,
    popupHandler,
    bottonSide,
    videoUrl,
    videoTitle,
    userName,
    generateEmbedCodeHandler
}: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function extractVideoId(url: string) {
        const regex = /videos\/(.*?)\/reduced/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: bottonSide ? 'bottom' : 'top',
                horizontal: bottonSide ? 'right' : 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            marginRight: 10,
            borderRadius: 6,
            // marginTop: theme.spacing(1),
            minWidth: 180,
            // padding: '0.5rem 0rem ',
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            display: 'flex',
            // '& .MuiMenu-list': {
            //     padding: '4px 0',
            // },
            // '& .MuiMenuItem-root': {
            //     '& .MuiSvgIcon-root': {
            //         fontSize: 5,
            //         color: theme.palette.text.secondary,
            //         marginRight: theme.spacing(1.5),
            //     },
            //     '&:active': {
            //         backgroundColor: alpha(
            //             theme.palette.primary.main,
            //             theme.palette.action.selectedOpacity
            //         ),
            //     },
            // },
            // '.menuItem': {
            //     border: '2px solid red',
            // },
        },
    }));

    const shareToWhatsApp = () => {
        let url = `${API_KEY}/${userName}/video/${extractVideoId(videoUrl)}`;
        window.open(`https://api.whatsapp.com/send?text=${videoTitle} - ${url}`, '_blank');
    };

    const shareToFacebook = () => {
        let url = `${API_KEY}/${userName}/video/${extractVideoId(videoUrl)}`;

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    const shareToTwitter = () => {
        let url = `${API_KEY}/${userName}/video/${extractVideoId(videoUrl)}`;

        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${videoTitle}`, '_blank');
    };

    const shareToLinkedIn = () => {
        let url = `${API_KEY}/${userName}/video/${extractVideoId(videoUrl)}`;

        window.open(
            `https://www.linkedin.com/shareArticle?url=${url}&title=${videoTitle}`,
            '_blank'
        );
    };

    return (
        <div
            style={{
                // position: 'absolute',
                // background: 'transparent',
                // right: 0,
                // // top: '100%',
                // // zIndex: 200,
                // width: '100%',
                // height: '100%',

                // marginRight:20,
                // display:'flex'
                background: 'transparent !important',
            }}
            className={style.actionShareStyle}
        >
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    //   aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    className={style.navImpClass}
                    // style={{ background: 'transparent' }}
                ></ListItemButton>
            </List>
            <StyledMenu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    // role: 'listbox',
                }}
                style={{
                    top: 10,
                    right: 100,
                    marginRight: 20,
                    // display:'flex !important'
                }}
            >
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={popupHandler}>
                        <img src={send} />
                        <p className={`${style.p} ${style.fp} ${style.black_500}`}>Send</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={copyHandler}>
                        <img src={copyLink} />
                        <p className={`${style.p} ${style.black_500}`}>Copy link</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={generateEmbedCodeHandler}>
                        <img src={embedShare} />
                        <p className={`${style.p} ${style.black_500}`}>Embed</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={shareToWhatsApp}>
                        <img src={whatsappShare} />
                        <p className={`${style.p} ${style.black_500}`}>Whatsapp</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={shareToFacebook}>
                        <img src={facebookShare} />
                        <p className={`${style.p} ${style.black_500}`}>Facebook</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={shareToTwitter}>
                        <img src={twitterShare} />
                        <p className={`${style.p} ${style.black_500}`}>Twitter</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={shareToLinkedIn}>
                        <img src={linkedInShare} />
                        <p className={`${style.p} ${style.black_500}`}>LinkedIn</p>
                    </div>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
