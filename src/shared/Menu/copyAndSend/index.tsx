import { alpha, styled } from '@mui/material';
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
    facebookShare
 } from '../../../icons';
import style from './index.module.scss';
const options = ['View profile', 'Make admin', 'Remove from group', 'Block', 'Report'];


export default function COPY_AND_SEND_MENU({ copyHandler, BASE_URL_FRONTEND, profileData }: any) {

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

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
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
        window.open(`https://api.whatsapp.com/send?text=/${BASE_URL_FRONTEND}/profile/${profileData.id}`, '_blank');
    };

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/share/share.php?u=${BASE_URL_FRONTEND}/profile/${profileData.id}`, '_blank');
    };

    const shareToTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${BASE_URL_FRONTEND}/profile/${profileData.id}`,
            '_blank'
        );
    };

    const shareToLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/shareArticle?url=${BASE_URL_FRONTEND}/profile/${profileData.id}`,
            '_blank'
        );
    };

    return (
        <div
            style={{
                position: 'absolute',
                right: 0,
                // top: '100%',
                // zIndex: 200,
                width: '100%',
                height: '100%',
                background: 'transparent',
                // display:'flex'
            }}
        >
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    //   aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    style={{ background: 'transparent' }}
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
                    // display:'flex !important'
                }}
            >
                {/* <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem}>
                        <img src={send} />
                        <p className={`${style.p} ${style.fp} ${style.black_500}`}>Send</p>
                    </div>
                </MenuItem> */}
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={copyHandler}>
                        <img src={copyLink} />
                        <p className={`${style.p} ${style.black_500}`}>Copy link</p>
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
