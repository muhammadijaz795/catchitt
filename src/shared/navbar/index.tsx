import { Menu, MenuItem, imageListClasses, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIcon, defaultAvatar, logo } from '../../icons';
import { useAuthStore } from '../../store/authStore';
import style from './Navbar.module.scss';
import Search from './components/Search';

function Navbar() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const [profileData, setProfileData] = useState<any>([]);

    const handleFetchProfileInfo = async () => {
        if (!isLoggedIn) {
            return;
        }
        try {
            const response = await fetch(`${API_KEY}/profile`, {
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
        }
    };

    useEffect(() => {
        handleFetchProfileInfo();
    }, []);
    const userName = useAuthStore((state) => state.username);

    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:700px)');
    return (
        <div className={style.parent}>
            <div className={style.sec1}>
                <img src={logo} alt="" />
            </div>
            {!isMobile ? (
                <div className={style.sec2}>
                    <Search />
                    {isLoggedIn ? (
                        <div className={style.profile}>
                            {/* <img
                                style={{ width: 36, height: 36, cursor: 'pointer' }}
                                src={createIcon}
                                alt=""
                            /> */}
                            <div className={style.user} onClick={() => navigate('/profile')}>
                                <img
                                    style={{
                                        width: 36,
                                        height: 36,
                                        cursor: 'pointer',
                                        borderRadius: '50%',
                                    }}
                                    src={profileData?.avatar || defaultAvatar}
                                    alt=""
                                />
                                <p className={style.name}>{userName}</p>
                            </div>
                        </div>
                    ) : (
                        <button
                            style={{
                                background: '#5448B2',
                                color: '#FFF',
                                padding: '0px 18px',
                                borderRadius: 6,
                                height: 40,
                                fontWeight: 600,
                                fontSize: 14,
                            }}
                            onClick={() => navigate('/auth')}
                        >
                            Login
                        </button>
                    )}
                </div>
            ) : <img src={createIcon} alt="" /> }
          
        </div>
    );
}

export default Navbar;
