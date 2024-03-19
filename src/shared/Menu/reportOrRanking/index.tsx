import { alpha, styled } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { copyLink, rankingIcon, report, send } from '../../../icons';
import style from '../copyAndSend/index.module.scss';
const options = ['View profile', 'Make admin', 'Remove from group', 'Block', 'Report'];

export default function COPY_OR_RANKING({ copyHandler, popupHandler }: any) {
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
            marginRight: 10,
            borderRadius: 6,
            // marginTop: theme.spacing(1),
            minWidth: 180,
            // padding: '0.5rem 0rem ',
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            display: 'flex',
        },
    }));

    return (
        <div
            style={{
                position: 'absolute',
                right: 0,
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
                    right: 100,
                    marginRight: 20,
                }}
            >
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={popupHandler}>
                        <img src={report} />
                        <p className={`${style.p} ${style.fp} ${style.black_500}`}>Report</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{ padding: '0px', margin: '0px' }}>
                    <div className={style.menuItem} onClick={copyHandler}>
                        <img src={rankingIcon} />
                        <p className={`${style.p} ${style.black_500}`}>Ranking Settings</p>
                    </div>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
