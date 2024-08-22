import { alpha, styled } from '@mui/material';
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import thumbnail from '../../../assets/thumbnail.png'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { goldCoin, logoutSvg, settingsDark, switchAcount, viewProfile } from '../../../icons';
import style from './notifications.module.scss';
import { useAuthStore } from '../../../store/authStore';
import { useSelector } from 'react-redux';
import { FavoriteBorder,AlternateEmail, ChatBubbleOutlineSharp } from '@mui/icons-material';
const options = ['View profile', 'Get Coins', 'Settings', 'Switch Account', 'Logout'];
import { useEffect, useState } from 'react';

export default function NavbarMunu({ onViewProfile, Onlogout, onSettings }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [darkTheme, setdarkTheme] = useState('');
    const [darkThemeblack, setdarkThemeblack] = useState('');
    const [themeColor, setThemeColor] = useState('');

    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
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
            marginTop: theme.spacing(1),
            minWidth: 380,
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    }));

    const API_KEY = process.env.VITE_API_URL;
    const token = useSelector((state: any) => state?.reducers?.profile?.token);

    const handleGetCoins = async () => {
        const res: any = await fetch(`${API_KEY}/payment/web/coins/45`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const resData: any = await res.json();
        window.open(resData?.data?.url)
    };
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == "dark") {
            // setdarkThemeWhite(style.darkThemeWhite);
            setdarkTheme(style.darkTheme);
            setThemeColor(themeColor);
        } else {
            // setdarkThemeWhite('');
            setdarkTheme('');
            setThemeColor('');
        }
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                right: 0,
                top: '0%',
                zIndex: 200,
                width: '100%',
                height: '100%',
                background: 'transparent',
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
                }}
                style={{
                    top: 10,
                    right: 0,
                    width: 200,
                }}
            >
                <div className={`${style.notificationsContainer}`}>
                    <h2 className={`${style.inboxTitle}`}>Notifications</h2>
                    <div className={`${style.inboxTabs}`}>
                        <button className={`${style.buttontab}`}>All activity</button>
                        <button className={`${style.buttontab}`}>Likes</button>
                        <button className={`${style.buttontab}`}>Comments</button>
                        <button className={`${style.buttontab}`}>Mentions and tags</button>
                        <button className={`${style.buttontab} ${style.active}`}>Followers</button>
                    </div>
                    <div className={`${style.inboxList}`}>
                        <div className={`${style.inboxNoLikes}`}>
                            <div className={`${style.inboxNoLikesInner}`}>
                                <FavoriteBorder style={{ fontSize: 60 }}/>
                                <p className={`${style.inboxBoldText}`}>Likes on your videos</p>
                                <p>When someone likes one of your videos, you'll see it here</p>
                            </div>
                        </div>   
                        <div className={`${style.inboxNoComments}`}>
                            <div className={`${style.inboxNoCommentsInner}`}>
                                <ChatBubbleOutlineSharp style={{ fontSize: 60 }}/>
                                <p className={`${style.inboxBoldText}`}>Comments on your videos</p>
                                <p>When someone likes one of your comments, you'll see it here</p>
                            </div>
                        </div>   
                        <div className={`${style.inboxNoMentions}`}>
                            <div className={`${style.inboxNoMentionsInner}`}>
                                <AlternateEmail style={{ fontSize: 60 }}/>
                                <p className={`${style.inboxBoldText}`}>Mentions of you</p>
                                <p>When someone mentions you, you'll see it here</p>
                            </div>
                        </div>   
                    </div>
                    <div className={`${style.inboxList}`}>
                        <p className={`${style.inboxListDuration}`}>Today</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername} ${style.notificationFollow}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent} ${style.notificationFollow}`}>Follows you. 4h ago</p>
                                    </div>
                                </div>
                                <button className={`${style.inboxFollow}`}>Follow back</button>
                            </div>
                        </div>
                        <p className={`${style.inboxListDuration}`}>Yesterday</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>

                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername} ${style.notificationFollow}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent} ${style.notificationFollow}`}>Follows you. 4h ago</p>
                                    </div>
                                </div>
                                <button className={`${style.inboxFriends}`}><svg width="1em" data-e2e="" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M43.4143 16.5858L31.1214 4.29289C30.7309 3.90237 30.0977 3.90237 29.7072 4.29289L28.2929 5.70711C27.9024 6.09763 27.9024 6.7308 28.293 7.12132L37.1716 16H5.00006C4.44777 16 4.00006 16.4477 4.00006 17V19C4.00006 19.5523 4.44777 20 5.00006 20H42.0001C42.809 20 43.5383 19.5127 43.8478 18.7654C44.1574 18.018 43.9863 17.1578 43.4143 16.5858Z"></path><path d="M4.58584 31.4142L16.8787 43.7071C17.2693 44.0976 17.9024 44.0976 18.293 43.7071L19.7072 42.2929C20.0977 41.9024 20.0977 41.2692 19.7072 40.8787L10.8285 32L43.0001 32C43.5523 32 44.0001 31.5523 44.0001 31V29C44.0001 28.4477 43.5523 28 43.0001 28L6.00006 28C5.19113 28 4.46186 28.4873 4.1523 29.2346C3.84274 29.982 4.01385 30.8422 4.58584 31.4142Z"></path></svg> Friends</button>
                            </div>
                        </div>
                        <p className={`${style.inboxListDuration}`}>This week</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent}`}>Follows you. 4h ago</p>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                        <p className={`${style.inboxListDuration}`}>This month</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent}`}>Follows you. 4h ago</p>
                                        <div className={`${style.notificationReply}`}><p className={`${style.notificationReplyUser}`}>Sudais Ranjha: <span>❤️❤️❤️</span></p></div>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                        <p className={`${style.inboxListDuration}`}>Previous</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent}`}>liked your video: 5-1</p>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Long Name With All Details & Comments</p>
                                        <p className={`${style.notificationReplyUser}`}>liked your comment: 5-1</p>
                                        <div className={`${style.notificationReply}`}><p className={`${style.notificationReplyUser}`}>Sudais Ranjha: <span>❤️❤️❤️</span></p></div>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Sudais Ranjha</p>
                                        <p className={`${style.notificationReplyUser}`}>Replied to your comment: ❤️❤️❤️ 5-1</p>
                                        <div className={`${style.notificationReply}`}><p className={`${style.notificationReplyUser}`}>Sudais Ranjha: <span>❤️❤️❤️</span></p></div>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </StyledMenu>
        </div>
    );
}