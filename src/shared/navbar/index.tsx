import { useMediaQuery } from '@mui/material';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createIcon, defaultAvatar, logo, logoAuth } from '../../icons';
import { logoutUser } from '../../redux/reducers/auth';
import style from './Navbar.module.scss';
import NavbarMunu from './components/Menu';
import Search from './components/Search';
import { openLoginPopup } from '../../redux/reducers';
import MenuDropdownPopup from '../Menu/dropdownPopup';

function Navbar() {
    const isLoggedIn: boolean = localStorage.getItem('token') ? true : false;
    // @ts-ignore
    const profile = useSelector((store) => store?.reducers?.profile);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:700px)');
    const submitHandler = (searchValue: any) => {
        navigate(`/searchPage/${searchValue}/All`);
    };
    const [menuPopupStatus, setMenuPopupStatus] = useState('hidden');
    const dispatch = useDispatch();
    const logoutAccount = () => {
        dispatch(logoutUser({ navigate }));
    };
    const menuPopupStatusToggler = () => {
        let status = '';
        if (menuPopupStatus === 'hidden') {
            status = 'block';
        } else {
            status = 'hidden';
        }
        setMenuPopupStatus(status);
    };

    const menuItemClickHandler = (menuItem: { menuOption: string; imageUrl: string }) => {
        console.log('<Menu Item> : ', menuItem?.menuOption);
    };
    return (
        <div className={style.parent}>
            <div onClick={() => navigate('/')} className={style.sec1}>
                <img src={logoAuth} alt="" />
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
                                        src={profile?.avatar || defaultAvatar}
                                        alt=""
                                    />
                                    {/* <div  style={{ position: 'relative', width:'100%' , height:'100%' , border:'1px solid red' }}> */}
                                    <NavbarMunu
                                        onViewProfile={() => navigate(`/profile`)}
                                        Onlogout={() => logoutAccount()}
                                        onSettings={() => navigate('/settings/account')}
                                    />
                                    {/* </div> */}
                                </div>
                                <p className={style.name}>{profile?.name?.split(' ')[0]}</p>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                onClick={() => dispatch(openLoginPopup())}
                            >
                                Login
                            </button>
                            <MenuDropdownPopup
                                menuPopupStatusToggler={menuPopupStatusToggler}
                                menuPopupStatus={menuPopupStatus}
                                menuItemClickHandler={menuItemClickHandler}
                            />
                        </>
                    )}
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                    <img
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        src={profile?.avatar || defaultAvatar}
                        onClick={() => navigate('/upload')}
                        alt=""
                    />
                    <NavbarMunu
                        onViewProfile={() => navigate(`/profile`)}
                        Onlogout={() => logoutAccount()}
                        onSettings={() => navigate('/settings/account')}
                    />
                </div>
            )}
        </div>
    );
}

export default memo(Navbar);
