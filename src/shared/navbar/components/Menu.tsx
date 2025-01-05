import { alpha, colors, createTheme, styled, ThemeProvider } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { back, goldCoin, logoutSvg, setting, settingsDark, switchAcount, viewProfile, viewProfileInWhite } from '../../../icons';
import style from './menu.module.scss';
import { useAuthStore } from '../../../store/authStore';
import { useDispatch, useSelector } from 'react-redux';
const options = ['View profile', 'Get Coins', 'Settings', 'Switch Account', 'Logout'];
import { useEffect, useState } from 'react';
import { openLogoutPopup } from '../../../redux/reducers';
import { useNavigate } from 'react-router-dom';

export default function NavbarMunu({ onViewProfile, Onlogout, onSettings }: any) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [darkTheme, setdarkTheme] = useState('');
    const [darkThemeblack, setdarkThemeblack] = useState('');
    const [themeColor, setThemeColor] = useState('');
    const navigate = useNavigate();
    
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const darkThemeFun = () => {
        window.localStorage.setItem('theme', "dark");
        window.location.reload();
    };

    const lightThemeFun = () => {
        window.localStorage.setItem('theme', "light");
        window.location.reload();
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
            minWidth: 180,
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
        navigate('/settings/account/balance');
        // const res: any = await fetch(`${API_KEY}/payment/web/coins/45`, {
        //     method: 'GET',
        //     headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        // });
        // const resData: any = await res.json();
        // window.open(resData?.data?.url)
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
        <ThemeProvider theme={darkTheme === '' ? lightThemePalette : darkThemePalette}>

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
                        // role: 'listbox',
                    }}
                    style={{
                        top: 10,
                        right: 100,
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            onViewProfile();
                            handleClose();
                        }}
                        style={{ margin: 0, padding: 0 }}
                    >
                        <div className={style.menuItemParent}>
                            <img src={darkTheme===''?viewProfile:viewProfileInWhite} alt="" />
                            <p className={`${style.p} ${style.fp} ${style.black_500}`}>{options[0]}</p>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={handleGetCoins} style={{ margin: 0, padding: 0 }}>
                        <div className={style.menuItemParent}>
                            <img src={goldCoin} alt="" />
                            <p className={`${style.p} ${style.black_500}`}>{options[1]}</p>
                        </div>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            onSettings();
                            handleClose();
                        }}
                        style={{ margin: 0, padding: 0 }}
                    >
                        <div className={style.menuItemParent}>
                            <img src={darkTheme===''?settingsDark:setting} alt="" />
                            <p className={`${style.p} ${style.black_500}`}>{options[2]}</p>
                        </div>
                    </MenuItem>
                    {/* <MenuItem
                    style={{ margin: 0, padding: 0 }}
                    onClick={() => {
                        handleClose();
                        // blockPopupHandler();
                    }}
                >
                    <div className={style.menuItemParent}>
                        <img src={switchAcount} alt="" />
                        <p className={`${style.p} ${style.black_500}`}>{options[3]}</p>
                    </div>
                </MenuItem> */}
                    <MenuItem
                        style={{ margin: 0, padding: 0 }}
                    >
                        <div className={style.menuItemParent}>
                            <svg className="css-2jg6he" width="20" data-e2e="" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM24.0909 15C22.172 15 20.3433 16.2292 19.2617 18.61C19.0332 19.1128 18.4726 19.4 17.9487 19.2253L16.0513 18.5929C15.5274 18.4182 15.2406 17.8497 15.4542 17.3405C16.9801 13.7031 20.0581 11 24.0909 11C28.459 11 32 14.541 32 18.9091C32 21.2138 30.7884 23.4606 29.2167 25.074C27.8157 26.5121 25.5807 27.702 22.9988 27.9518C22.4491 28.0049 22.0001 27.5523 22.0001 27V25C22.0001 24.4477 22.4504 24.0057 22.9955 23.9167C24.2296 23.7153 25.5034 23.1533 26.3515 22.2828C27.4389 21.1666 28 19.8679 28 18.9091C28 16.7502 26.2498 15 24.0909 15ZM24 36C22.3431 36 21 34.6569 21 33C21 31.3431 22.3431 30 24 30C25.6569 30 27 31.3431 27 33C27 34.6569 25.6569 36 24 36Z"></path></svg>
                            <a className='hover:text-inherit' href="https://help.seezitt.com/" target="_blank"><p className={`${style.p} ${style.lp} ${style.black_500}`}>
                                Help and Feedback
                            </p></a>
                        </div>
                    </MenuItem>
                    <MenuItem
                        style={{ margin: 0, padding: 0 }}
                        onClick={() => {
                            darkThemeFun()
                        }}
                    >
                        <div className={style.menuItemParent}>
                            <svg className="css-2jg6he" width="24" data-e2e="" height="24" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.3019 6.38068C21.723 6.08373 22.9615 7.16986 23.009 8.50693C23.2751 16.0034 29.4377 22 37 22C37.8141 22 38.6105 21.9307 39.3839 21.7982C40.7019 21.5723 42 22.5655 42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24C6 15.3248 12.1351 8.0871 20.3019 6.38068ZM19.2223 10.8358C13.8426 12.7885 10 17.9473 10 24C10 31.732 16.268 38 24 38C31.06 38 36.8994 32.7742 37.8611 25.9797C37.5756 25.9932 37.2886 26 37 26C28.0237 26 20.5827 19.4301 19.2223 10.8358Z"></path></svg>
                            <p className={`${style.p} ${style.lp} ${style.black_500}`}>
                                Dark Mode
                            </p>
                        </div>
                    </MenuItem>
                    <MenuItem
                        style={{ margin: 0, padding: 0 }}
                        onClick={() => {
                            lightThemeFun()
                        }}
                    >
                        <div className={style.menuItemParent}>
                            <svg enable-background="new 0 0 512 512" height="30px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="30px" xmlns="http://www.w3.org/2000/svg" ><g><g><path d="M256,144c-61.75,0-112,50.25-112,112s50.25,112,112,112s112-50.25,112-112S317.75,144,256,144z M256,336    c-44.188,0-80-35.812-80-80c0-44.188,35.812-80,80-80c44.188,0,80,35.812,80,80C336,300.188,300.188,336,256,336z M256,112    c8.833,0,16-7.167,16-16V64c0-8.833-7.167-16-16-16s-16,7.167-16,16v32C240,104.833,247.167,112,256,112z M256,400    c-8.833,0-16,7.167-16,16v32c0,8.833,7.167,16,16,16s16-7.167,16-16v-32C272,407.167,264.833,400,256,400z M380.438,154.167    l22.625-22.625c6.25-6.25,6.25-16.375,0-22.625s-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625    S374.188,160.417,380.438,154.167z M131.562,357.834l-22.625,22.625c-6.25,6.249-6.25,16.374,0,22.624s16.375,6.25,22.625,0    l22.625-22.624c6.25-6.271,6.25-16.376,0-22.625C147.938,351.583,137.812,351.562,131.562,357.834z M112,256    c0-8.833-7.167-16-16-16H64c-8.833,0-16,7.167-16,16s7.167,16,16,16h32C104.833,272,112,264.833,112,256z M448,240h-32    c-8.833,0-16,7.167-16,16s7.167,16,16,16h32c8.833,0,16-7.167,16-16S456.833,240,448,240z M131.541,154.167    c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625l-22.625-22.625c-6.25-6.25-16.374-6.25-22.625,0    c-6.25,6.25-6.25,16.375,0,22.625L131.541,154.167z M380.459,357.812c-6.271-6.25-16.376-6.25-22.625,0    c-6.251,6.25-6.271,16.375,0,22.625l22.625,22.625c6.249,6.25,16.374,6.25,22.624,0s6.25-16.375,0-22.625L380.459,357.812z" fill="currentColor" /></g></g></svg>
                            <p className={`${style.p} ${style.lp} ${style.black_500}`}>
                                Light Mode
                            </p>
                        </div>
                    </MenuItem>
                    <MenuItem
                        style={{ margin: 0, padding: 0 }}
                        onClick={() => {
                            handleClose();
                            dispatch(openLogoutPopup());
                            // reportPopupHandler();
                        }}
                    >
                        <div className={style.menuItemParent}>
                            <img src={logoutSvg} alt="" />
                            <p className={`${style.p} ${style.lp} ${style.warning_500}`}>
                                {options[4]}
                            </p>
                        </div>
                    </MenuItem>
                </StyledMenu>
            </div>
        </ThemeProvider>
    );
}
