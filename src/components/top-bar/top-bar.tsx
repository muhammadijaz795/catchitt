import classNames from 'classnames';
import { useEffect, useState } from 'react';
import coloredLogo from '../../assets/coloredLogo.png';
import plusIcon from '../../assets/plusIcon.png';
import { useAuthStore } from '../../store/authStore';
import styles from './top-bar.module.scss';
// import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../reusables/searchBar';
import { DefaultAvatar } from './svg-components/DefaultAvatar';

export interface TopBarProps {
    className?: string;
    searchBar?: boolean;
}

export const TopBar = ({ className, searchBar }: TopBarProps) => {
    const showSearchBar = useState(true);
    const userName = useAuthStore((state) => state.name);
    const user = useAuthStore();
    const token = useAuthStore((state) => state.token);
    const [errorMessage, setErrorMessage] = useState('');
    const API_KEY = process.env.VITE_API_URL;
    const endPoint = '/profile';
    // let avatarUrl: string = '';
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const [profileData, setProfileData] = useState<any>([]);
    const arStudioUrl = 'https://localhost:8081/AR-Studio/';

    const handleLogout = () => {
        logout(); // Call the logout function
    };

    const handleLogin = () => {
        navigate('/auth');
    };
    const handleProfile = () => {
        navigate(`/profile`);
    };

    const handleNavigateToARStudio = () => {
        // Use the navigate function to change the URL without reloading the page
        if (isLoggedIn) {
            window.location.href = arStudioUrl;
        } else {
            handleLogin();
        }
    };

    const handleFetchProfileInfo = async () => {
        if (!isLoggedIn) {
            return;
        }
        try {
            const response = await fetch(`${API_KEY}${endPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setProfileData(responseData.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleFetchProfileInfo();
    }, []);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorBrgrEl, setAnchorBrgrEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openBrgr = Boolean(anchorBrgrEl);
    const handleBrgrClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorBrgrEl(event.currentTarget);
    };
    const handleMenuClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleBrgrClose = () => {
        setAnchorBrgrEl(null);
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.logoDiv}>
                <img className={classNames('Logo', styles.logo)} src={coloredLogo} alt="" />
            </div>
            <div className={styles.searchPlusProfileDiv}>
                <div className={styles.searchBarDiv} style={{ maxWidth: '500px' }}>
                    {showSearchBar && searchBar !== false ? (
                        <SearchBar placeholder="Search accounts and videos" />
                    ) : (
                        ''
                    )}
                </div>

                <Media query={{ maxWidth: 1200 }}>
                    <div>
                        <Button
                            sx={{ color: '#5448B2' }}
                            id="basic-button"
                            aria-controls={openBrgr ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openBrgr ? 'true' : undefined}
                            onClick={handleBrgrClick}
                        >
                            <MenuIcon sx={{ padding: '0px', margin: '0px', minWidth: '0px' }} />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorBrgrEl}
                            open={openBrgr}
                            onClose={handleBrgrClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {isLoggedIn ? (
                                <>
                                    {profileData.avatar === '' ? (
                                        <MenuItem onClick={handleBrgrClose}>New Post</MenuItem>
                                    ) : (
                                        <MenuItem onClick={handleBrgrClose}>
                                            {/* {' '}
                                            <img
                                                src={plusIcon}
                                                alt=""
                                                className={styles.plusIconStyle}
                                            /> */}
                                            <img
                                                src={profileData.avatar}
                                                alt=""
                                                className={styles.plusIconStyle}
                                                style={{
                                                    cursor: 'pointer',
                                                    borderRadius: '50%',
                                                    border: '1px solid #000',
                                                    width: '36px',
                                                    height: '36px',
                                                    objectFit: 'cover',
                                                }}
                                                onClick={handleMenuClick} // Open dropdown menu on avatar click
                                            />
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={handleBrgrClose}>{userName}</MenuItem>
                                    <MenuItem onClick={handleBrgrClose}>Logout</MenuItem>
                                </>
                            ) : (
                                // Dropdown menu for login button
                                <div className={styles.dropdownMenu}>
                                    <MenuItem onClick={handleLogin}>Log In</MenuItem>
                                </div>
                            )}
                        </Menu>
                    </div>
                </Media>
                <div className={styles.plusProfileDiv}>
                    {isLoggedIn ? (
                        <>
                            {profileData.avatar === '' ? (
                                <>
                                    {/* <img src={plusIcon} alt="" className={styles.plusIconStyle} /> */}
                                    <DefaultAvatar onClick={handleMenuClick} />
                                </>
                            ) : (
                                <>
                                    {/* <img src={plusIcon} alt="" className={styles.plusIconStyle} /> */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* <img
                                            src={plusIcon}
                                            style={{
                                                width: 36,
                                                height: 36,
                                                marginRight: 8,
                                                cursor: 'pointer',
                                            }}
                                            alt=""
                                        /> */}
                                        <img
                                            src={profileData.avatar}
                                            alt=""
                                            className={styles.plusIconStyle}
                                            style={{
                                                cursor: 'pointer',
                                                borderRadius: '50%',
                                                border: '1px solid #000',
                                                width: '36px',
                                                height: '36px',
                                                objectFit: 'cover',
                                            }}
                                            onClick={handleMenuClick} // Open dropdown menu on avatar click
                                        />
                                        <p>{user.name}</p>
                                    </div>
                                </>
                            )}
                            <div className={styles.nameDiv}>
                                <h4 className={styles.loggedName}>{userName}</h4>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleNavigateToARStudio}>
                                        AR Studio
                                    </MenuItem>
                                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                                </Menu>
                            </div>
                        </>
                    ) : (
                        // Dropdown menu for login button
                        <div className={styles.loginBtn}>
                            <MenuItem onClick={handleLogin}>Log In</MenuItem>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
