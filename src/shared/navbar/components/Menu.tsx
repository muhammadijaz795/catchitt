import { alpha, styled } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { goldCoin, logoutSvg, settingsDark, switchAcount, viewProfile } from '../../../icons';
import style from './menu.module.scss';
import { useAuthStore } from '../../../store/authStore';
import { useSelector } from 'react-redux';
const options = ['View profile', 'Get Coins', 'Settings', 'Switch Account', 'Logout'];

export default function NavbarMunu({ onViewProfile, Onlogout, onSettings }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
        const res: any = await fetch(`${API_KEY}/payment/web/coins/45`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const resData: any = await res.json();
        window.open(resData?.data?.url)
            };

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
                        <img src={viewProfile} alt="" />
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
                        <img src={settingsDark} alt="" />
                        <p className={`${style.p} ${style.black_500}`}>{options[2]}</p>
                    </div>
                </MenuItem>
                <MenuItem
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
                </MenuItem>
                <MenuItem
                    style={{ margin: 0, padding: 0 }}
                    onClick={() => {
                        handleClose();
                        Onlogout();
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
    );
}
