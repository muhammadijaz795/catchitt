import classNames from 'classnames';
import styles from './top-bar.module.scss';
import coloredLogo from '../../assets/coloredLogo.png';
import plusIcon from '../../assets/plusIcon.png';
import SearchBar from '../reusables/searchBar';
import { useAuthStore } from '../../store/authStore';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

export interface TopBarProps {
    className?: string;
}

export const TopBar = ({ className }: TopBarProps) => {
    const userName = useAuthStore((state) => state.name);
    const token = useAuthStore((state) => state.token);
    const [errorMessage, setErrorMessage] = useState('');
    const API_KEY = process.env.VITE_API_URL;
    const endPoint = '/profile';
    let avatarUrl: string = '';
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const logout = useAuthStore(state => state.logout);

    const handleLogout = () => {
        logout(); // Call the logout function
    };

    const handleFetchProfileInfo = async () => {
        try {
            const response = await fetch(`${API_KEY}${endPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                const { avatar } = responseData.data; // Extract token value from data object
                avatarUrl = avatar;
            } else {
                setErrorMessage('Invalid email');
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email');
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleFetchProfileInfo();
    }, [token]);

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
                    <img src={plusIcon} alt="" className={styles.plusIconStyle} />
                    <img
                        src={avatarUrl === '' ? 'https://via.placeholder.com/128' : avatarUrl}
                        alt=""
                        className={styles.plusIconStyle}
                        style={{
                            // height: '64px',
                            // width: '64px',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            border: '1px solid #000',
                        }}
                    />
                    <div className={styles.nameDiv}>
                        <h4 className={styles.loggedName}>{userName}</h4>
                    </div>
                    {isLoggedIn ? (
                        <button className={styles.logoutBtn}
                            onClick={handleLogout}>
                            Log Out
                        </button>
                    ) : (
                        <button className={styles.loginBtn}>
                            Log In
                        </button>
                    )
                    }
                </div>
            </div>
        </div>
    );
};
