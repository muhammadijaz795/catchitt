
import { useMediaQuery } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createIcon, defaultAvatar, logo, logoAuth, logoAuthWhite } from '../../icons';
import { openLogoutPopup } from '../../redux/reducers';
import { logoutUser } from '../../redux/reducers/auth';
import style from './Navbar.module.scss';
import NavbarMunu from './components/Menu';
import Notifications from './components/Notifications'
import Search from './components/Search';
import { openLoginPopup } from '../../redux/reducers';
import MenuDropdownPopup from '../Menu/dropdownPopup';
import SendIcon from '@mui/icons-material/Send';

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
    const [darkTheme, setdarkTheme] = useState('');
    const [logo, setLogo] = useState(logoAuth);
    const dispatch = useDispatch();
    const logoutAccount = () => {
        dispatch(logoutUser({ navigate }));
        // dispatch(openLogoutPopup())
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

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if(themeColor == "dark"){ 
            setdarkTheme(style.darkTheme);
            setLogo(logoAuthWhite);
        }else{
            setLogo(logoAuth);
        } 
    });

    return (
        <div className={` ${style.parent}  ${darkTheme}`}>
            <div onClick={() => navigate('/')} className={style.sec1}>
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
                            {/* <img
                                style={{ width: 36, height: 36, cursor: 'pointer' }}
                                src={createIcon}
                                alt=""
                                onClick={() => navigate('/upload')}
                            /> */}
                            {/* <a href="/tiktokstudio/upload?from=upload" target="_self" className="e18d3d942 css-2gvzau-ALink-StyledLink er1vbsz1" aria-label="Upload a video"> */}
                                <div className={style.DivUpload} style={{ width: 36, height: 36, cursor: 'pointer' }} onClick={() => navigate('/upload')}>
                                    <svg className="" width="1em" data-e2e="" height="1em" viewBox="0 0 16 16" fill="rgb(255, 59, 92)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.5C7.58579 2.5 7.25 2.83579 7.25 3.25V7.25H3.25C2.83579 7.25 2.5 7.58579 2.5 8C2.5 8.41421 2.83579 8.75 3.25 8.75H7.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V8.75H12.75C13.1642 8.75 13.5 8.41421 13.5 8C13.5 7.58579 13.1642 7.25 12.75 7.25H8.75V3.25C8.75 2.83579 8.41421 2.5 8 2.5Z"></path>
                                    </svg>
                                    <span style={{color:'rgb(255, 59, 92)'}}>Upload </span>
                                </div>
                            <SendIcon className={style.sendIcon} style={{ fontSize: '30px', }}/>
                            <div className={style.user}>
                                <div
                                    style={{ position: 'relative', width: '100%', height: '100%' }}
                                >
                                    <div style={{position:'relative'}}><svg className="css-1g0p6jv-StyledInboxIcon e18kkhh41" width="35" data-e2e="" height="35" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.0362 21.3333H18.5243L15.9983 24.4208L13.4721 21.3333H7.96047L7.99557 8H24.0009L24.0362 21.3333ZM24.3705 23.3333H19.4721L17.2883 26.0026C16.6215 26.8176 15.3753 26.8176 14.7084 26.0026L12.5243 23.3333H7.62626C6.70407 23.3333 5.95717 22.5845 5.9596 21.6623L5.99646 7.66228C5.99887 6.74352 6.74435 6 7.66312 6H24.3333C25.2521 6 25.9975 6.7435 26 7.66224L26.0371 21.6622C26.0396 22.5844 25.2927 23.3333 24.3705 23.3333ZM12.6647 14C12.2965 14 11.998 14.2985 11.998 14.6667V15.3333C11.998 15.7015 12.2965 16 12.6647 16H19.3313C19.6995 16 19.998 15.7015 19.998 15.3333V14.6667C19.998 14.2985 19.6995 14 19.3313 14H12.6647Z"></path></svg><span className={style.inboxCount}></span></div>
                                    <Notifications/>
                                </div>
                                {/* <p className={style.name}>{profile?.name?.split(' ')[0]}</p> */}
                                
                            </div>
                            <div className={style.user}>
                                <div
                                    style={{ position: 'relative', width: '100%', height: '100%' }}
                                >
                                    <img
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            cursor: 'pointer',
                                            borderRadius: '50%',
                                            maxWidth:'initial'
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
                            {/* <MenuDropdownPopup
                                        menuPopupStatusToggler={menuPopupStatusToggler}
                                        menuPopupStatus={menuPopupStatus}
                                        menuItemClickHandler={menuItemClickHandler}
                                /> */}
                        </div>
                    ) : (
                        <>
                        <div className={style.DivHeaderRightContainer}>
                            {/* <button
                                style={{
                                    background: 'rgb(255, 59, 92)',
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
                            </button> */}
                            <button type="button" className={style.StyledLoginButton}  onClick={() => dispatch(openLoginPopup())} >Log in</button>
                            </div>
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
                    {/* <img
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        src={profile?.avatar || defaultAvatar}
                        onClick={() => navigate('/upload')}
                        alt=""
                    /> */}
                    {/* <svg className="css-qeydvm-StyledPlusIcon e18d3d945" width="1em" data-e2e="" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.5C7.58579 2.5 7.25 2.83579 7.25 3.25V7.25H3.25C2.83579 7.25 2.5 7.58579 2.5 8C2.5 8.41421 2.83579 8.75 3.25 8.75H7.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V8.75H12.75C13.1642 8.75 13.5 8.41421 13.5 8C13.5 7.58579 13.1642 7.25 12.75 7.25H8.75V3.25C8.75 2.83579 8.41421 2.5 8 2.5Z"></path></svg> */}
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
