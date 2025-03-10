import { alpha, FormControlLabel, FormGroup, IconButton, Switch,SwitchProps,styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

import { copyLink, notAllowed, report, saveVideo, send, repost, blackHeartOutline, blackCrossHeart } from '../../../icons';
import style from './index.module.scss';
const options = ['View profile', 'Make admin', 'Remove from group', 'Block', 'Report'];
import {
    showToastSuccess,
} from '../../../utils/constants';
import { videoNotInterestedHandle, videoRepostHandle } from '../../../redux/AsyncFuncs';
import { toggleAutoScroll, setScrollSpeed } from '../../../redux/reducers/autoScrollUserSettings';


export default function MORE_MENU_HOME({ visibleReportPopup, url, postMediaId,activeMediaId }: any) {
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

    const repostVideoEventHandle = async (postMediaId: any) => {
        console.log(postMediaId);
        showToastSuccess('Media reposted successfully');
        dispatch(videoRepostHandle(postMediaId));
    }

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
                    top: '100px',
                    right: '50px',
                    marginRight: 20,
                    // display:'flex !important'
                }}
            >
                <MenuItem  style={{ padding: '0px', margin: '0px', position: 'relative' }}>
                    <div className={`justify-between ${style.menuItem}`} >
                    <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1 4.99997C1 4.99997 3.94596 1.00001 5.00003 1C6.05411 0.999991 9 5 9 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 15C9 15 6.05404 19 4.99997 19C3.94589 19 1 15 1 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                        <p>Auto scroll</p>
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
                        {/* <input 
                                type="checkbox" 
                                checked={autoScroll} 
                                onChange={handleSwitchChange} 
                                name="autoScrollCheckbox" 
                                id="autoScrollCheckbox" 
                            /> */}




                        {/* <div className={style.cards}>
                            <FormGroup
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className={style.card}>
                                <FormControlLabel
                                    label={undefined}
                                    labelPlacement="start"
                                    control={
                                        <IOSSwitch
                                            sx={{ m: 1 }}
                                            // checked={settings?.feedback || false}
                                            onChange={(e: any) =>
                                                handleSwitchChange(e, 'feedback')
                                            }
                                        />
                                    }
                                />
                                </div>
                            </FormGroup>
                        </div> */}
                    </div>
                </MenuItem>

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
                <MenuItem onClick={()=>{ notInterestedInVideo(postMediaId),handleClose() }} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem}>
                        <img src={blackCrossHeart} />
                        <p className={`${style.p} ${style.black_500}`}>Not interested</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={visibleReportPopup}>
                        <img src={report} />
                        <p className={`${style.p} ${style.black_500}`}>Report</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={()=>{ repostVideoEventHandle(postMediaId),handleClose()}} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem}>
                        <img src={repost} />
                        <p className={`${style.p} ${style.black_500}`}>Repost</p>
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
