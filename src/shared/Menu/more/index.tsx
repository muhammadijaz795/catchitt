import { alpha, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { copyLink, notAllowed, report, saveVideo, send } from '../../../icons';
import style from './index.module.scss';
const options = ['View profile', 'Make admin', 'Remove from group', 'Block', 'Report'];
import {
    showToastSuccess,
} from '../../../utils/constants';
import { videoNotInterestedHandle } from '../../../redux/AsyncFuncs';

export default function MORE_MENU_HOME({ visibleReportPopup, url, postMediaId }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const API_URL = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const notInterestedInVideo = async (postMediaId:any) => {
        console.log(postMediaId);
        showToastSuccess('Media marked as not interested successfully');
        dispatch(videoNotInterestedHandle(postMediaId));
    };

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            padding: '10px 0px',
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



    return (
        <div
            // style={{
            //     position: 'absolute',
            //     right: 0,
            //     // top: '100%',
            //     // zIndex: 200,
            //     width: '100%',
            //     height: '100%',
            //     background: 'transparent !important',
            //     // marginRight:20,
            //     // display:'flex'
            // }}
            className={style.actionMoreStyle}
        >
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    //   aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    style={{ background: 'transparent !important' }}
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
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px', position: 'relative' }}>
                    <div className={style.menuItem} >
                        <img src={saveVideo} />
                        <a 
                        // download={true} 
                        target='_blank' style={{
                            width: '100%', height: '100%',position: 'absolute',
                            top: 0,
                            left: 0,
                            background: 'transparent !important'
                        }} href={url} download></a>
                        <p className={`${style.p} ${style.fp} ${style.black_500}`}>Save video</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={()=>{ notInterestedInVideo(postMediaId),handleClose() }} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem}>
                        <img src={notAllowed} />
                        <p className={`${style.p} ${style.black_500}`}>Not interested</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={visibleReportPopup}>
                        <img src={report} />
                        <p className={`${style.p} ${style.black_500}`}>Report</p>
                    </div>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
