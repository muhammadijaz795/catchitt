import { Menu, MenuItem, imageListClasses, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIcon, defaultAvatar, logo } from '../../icons';
import { useAuthStore } from '../../store/authStore';
import style from './Navbar.module.scss';
import Search from './components/Search';
import NavbarMunu from './components/Menu';

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
    const name = useAuthStore((state) => state.name);

    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const isMobile = useMediaQuery('(max-width:700px)');
    const submitHandler = (searchValue: any) => {
        navigate(`/searchPage/${searchValue}/All`);
    };
    return (
        <div className={style.parent}>
            <div className={style.sec1}>
                <img src={logo} alt="" />
            </div>
            {!isMobile ? (
                <div className={style.sec2}>
                    <Search
                        submitHandler={submitHandler}
                        placeholder="Search accounts and videos"
                    />
                    {isLoggedIn ? (
                        <div className={style.profile}>
                            <img
                                style={{ width: 36, height: 36, cursor: 'pointer' }}
                                src={createIcon}
                                alt=""
                                onClick={() => navigate('/upload')}
                            />
                            <div className={style.user}>
                                <div
                                    style={{ position: 'relative', width: '100%', height: '100%' }}
                                >
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
                                    {/* <div  style={{ position: 'relative', width:'100%' , height:'100%' , border:'1px solid red' }}> */}
                                    <NavbarMunu
                                        onViewProfile={() => navigate(`/profile`)}
                                        Onlogout={() => logout()}
                                        onSettings={() => navigate('/settings/account')}
                                    />
                                    {/* </div> */}
                                </div>
                                <p className={style.name}>{name}</p>
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
            ) : (
                <div style={{ position: 'relative' }}>
                    <img
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        src={profileData?.avatar || defaultAvatar}
                        onClick={() => navigate('/upload')}
                        alt=""
                    />
                    <NavbarMunu
                        onViewProfile={() => navigate(`/profile`)}
                        Onlogout={() => logout()}
                        onSettings={() => navigate('/settings/account')}
                    />
                </div>
            )}
        </div>
    );
}

export default Navbar;
