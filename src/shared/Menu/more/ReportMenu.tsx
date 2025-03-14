import { alpha, FormControlLabel, FormGroup, IconButton, Switch,SwitchProps,styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

import { copyLink, notAllowed, report, saveVideo, send, repost, blackHeartOutline, blackCrossHeart, moreInWhite } from '../../../icons';
import style from './index.module.scss';
const options = ['View profile', 'Make admin', 'Remove from group', 'Block', 'Report'];
import {
    showToastSuccess,
} from '../../../utils/constants';
import { videoNotInterestedHandle, videoRepostHandle } from '../../../redux/AsyncFuncs';
import { toggleAutoScroll, setScrollSpeed } from '../../../redux/reducers/autoScrollUserSettings';


export default function MORE_MENU_HOME({ visibleReportPopup, url, postMediaId,activeMediaId,isFromPopupVideoPlayer }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const API_URL = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const { isEnabled } = useSelector((store: any) => store?.reducers?.autoScrollUserSettings);
    console.info('isEnabled in more menu',isEnabled)
    const [autoScroll, setAutoScroll] = React.useState(isEnabled);

    // Update autoScroll when isEnabled changes (if isEnabled is dynamic)
    React.useEffect(() => {
        setAutoScroll(isEnabled);
    }, [isEnabled]);

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
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAutoScroll(event.target.checked);
        dispatch(toggleAutoScroll());
        handleClose(); // This closes the dropdown

    };

    // Close the dropdown when the active video changes
    React.useEffect(() => {
        if (activeMediaId !== postMediaId) {
        handleClose();
        }
    }, [activeMediaId]); // Trigger when activeMediaId changes

    React.useEffect(() => {
        const handleScroll = () => {
            handleClose();
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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


    const handleDownload = async (videoUrl: any) => {
        try {
            showToastSuccess('Video is downloading...');
    
            // Fetch the video data as a blob
            const response = await fetch(videoUrl, {
                method: 'GET',
                headers: {
                    // Add headers if needed for authorization or content type
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch video');
            }
    
            const blob = await response.blob();
            
            // Ensure the response is a valid video blob
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('video')) {
                throw new Error('The file is not a valid video');
            }
    
            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);
    
            // Create a download link
            const link = document.createElement('a');
            link.href = url;
            link.download = 'video.mp4'; // Set default file name
    
            // Trigger the download
            document.body.appendChild(link); // Append the link to the DOM
            link.click();
            document.body.removeChild(link); // Clean up the DOM
    
            // Revoke the object URL after download to free up resources
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download video', error);
        }
    };
    
    return (
        <div
            style={{
                position: 'relative',
            }}
            className={`${style.actionMoreStyle} position-relative`}>
            <List component="nav" className={`${isFromPopupVideoPlayer ? isFromPopupVideoPlayer : ''} more_menu_item_class`} aria-label="Device settings" >
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    //   aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    style={{ backgroundColor: 'transparent !important', padding: '0', display: 'flex', alignItems: 'center',  }}>
                    <svg className="!w-[2rem] !h-[2rem]" style={{minWidth: '2rem'}} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12.1309C2 11.0263 2.89543 10.1309 4 10.1309C5.10455 10.1309 6 11.0263 6 12.1309C6 13.2354 5.10455 14.1309 4 14.1309C2.89543 14.1309 2 13.2354 2 12.1309ZM10 12.1309C10 11.0263 10.8954 10.1309 12 10.1309C13.1046 10.1309 14 11.0263 14 12.1309C14 13.2354 13.1046 14.1309 12 14.1309C10.8954 14.1309 10 13.2354 10 12.1309ZM18 12.1309C18 11.0263 18.8955 10.1309 20 10.1309C21.1045 10.1309 22 11.0263 22 12.1309C22 13.2354 21.1045 14.1309 20 14.1309C18.8955 14.1309 18 13.2354 18 12.1309Z" fill="#161823"/>
                    </svg>
                </ListItemButton>
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
                    right: '50rem',
                }}
                sx={{top: '3.5rem'}}
            >
                {/* <MenuItem  style={{ padding: '0px', margin: '0px', position: 'relative' }}>
                    <div className={style.menuItem} >
                    <svg width="20" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1 4.99997C1 4.99997 3.94596 1.00001 5.00003 1C6.05411 0.999991 9 5 9 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 15C9 15 6.05404 19 4.99997 19C3.94589 19 1 15 1 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                        <p className='!font-medium'>Auto scroll</p>
                        {autoScroll}                   

                        <label className="toggle-switch">
                            <input 
                            style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                type="checkbox" 
                                checked={autoScroll} 
                                onChange={handleSwitchChange} 
                                name="autoScrollCheckbox" 
                                id="autoScrollCheckbox" 
                            />
                            <b className="slider"></b>
                        </label>
                        
                    </div>
                </MenuItem> */}

                {/* <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px', position: 'relative' }}>
                    <div className={style.menuItem} >
                        <img src={saveVideo} />
                        <a 
                        target='_blank' style={{
                            width: '100%', height: '100%',position: 'absolute',
                            top: 0,
                            left: 0,
                            background: 'transparent !important'
                        }} 
                        onClick={()=>handleDownload(url)}></a>
                        <p className={`${style.p} ${style.fp} ${style.black_500}`}>Save video</p>
                    </div>
                </MenuItem> */}
                {/* <MenuItem onClick={()=>{ notInterestedInVideo(postMediaId),handleClose() }} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem}>
                        <img height="22" src={blackCrossHeart} />
                        <p className= '!font-medium' style={{paddingLeft: '2px'}}>Not interested</p>
                    </div>
                </MenuItem> */}
                {/* onClick={handleClose} */}
                <MenuItem  style={{ padding: '0px', margin: '0px' }} sx={{padding: '0.5rem 1rem'}}>
                    <div className={style.menuItem} onClick={visibleReportPopup}>
                        <svg width="16" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L1 19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.75758 1.90865C5.45236 0.224973 2.85125 1.21144 1.55426 2.2192C1.32048 2.40085 1.20358 2.49167 1.10179 2.69967C1 2.90767 1 3.10138 1 3.4888V12.7319C1.9697 11.6342 4.87879 9.9328 8.75758 11.9086C12.224 13.6744 15.1741 12.9424 16.5697 12.1795C16.7633 12.0737 16.8601 12.0207 16.9301 11.9028C17 11.7849 17 11.6569 17 11.4009V3.87389C17 3.04538 17 2.63113 16.8027 2.48106C16.6053 2.33099 16.1436 2.459 15.2202 2.71504C13.64 3.15319 11.3423 3.22532 8.75758 1.90865Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p className='!font-medium ml-1'>Report</p>
                    </div>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}


const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgb(255, 59, 92)' : 'rgb(255, 59, 92)',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: 'rgb(255, 59, 92)',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));
