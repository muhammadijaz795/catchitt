import classNames from 'classnames';
import styles from './top-bar.module.scss';
import coloredLogo from '../../assets/coloredLogo.png';
import plusIcon from '../../assets/plusIcon.png';
import SearchBar from '../reusables/searchBar';
import { useAuthStore } from '../../store/authStore';
import { useEffect, useState } from 'react';
// import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { DefaultAvatar } from './svg-components/DefaultAvatar';

export interface TopBarProps {
    className?: string;
}

export const TopBar = ({ className }: TopBarProps,) => {
    const userName = useAuthStore((state) => state.name);
    const token = useAuthStore((state) => state.token);
    const [errorMessage, setErrorMessage] = useState('');
    const API_KEY = process.env.VITE_API_URL;
    const endPoint = '/profile';
    // let avatarUrl: string = '';
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();
    const logout = useAuthStore(state => state.logout);
    const [profileData, setProfileData] = useState<any>([])

    const handleLogout = () => {
        logout(); // Call the logout function
    };

    const handleLogin = () => {
        navigate('/auth')
    }

    const handleFetchProfileInfo = async () => {
        if (!isLoggedIn) { return }
        try {
            const response = await fetch(`${API_KEY}${endPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setProfileData(responseData.data)
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

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.logoDiv}>
                <img className={classNames('Logo', styles.logo)} src={coloredLogo} alt="" />
            </div>
            <div className={styles.searchPlusProfileDiv}>
                <div className={styles.searchBarDiv}>
                    <SearchBar />
                </div>
                <div className={styles.plusProfileDiv}>

                    {isLoggedIn ? (
                        <>
                            {profileData.avatar === '' ?

                                (<>
                                    <img src={plusIcon} alt="" className={styles.plusIconStyle} />

                                    <DefaultAvatar />
                                </>) : (
                                    <>
                                        <img src={plusIcon} alt="" className={styles.plusIconStyle} />
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
                                                objectFit: 'cover'
                                            }}
                                            onClick={handleMenuClick} // Open dropdown menu on avatar click
                                        />
                                    </>
                                )}
                            <div className={styles.nameDiv}>
                                <h4 className={styles.loggedName} onClick={handleMenuClick}>
                                    {userName}
                                </h4>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                                </Menu>
                            </div>


                        </>
                    ) : <button className={styles.loginBtn} onClick={handleLogin}>
                        Log In
                    </button>}
                </div>
            </div>
        </div>
    );
};