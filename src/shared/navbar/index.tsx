
import { useMediaQuery } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createIcon, defaultAvatar, logo, logoAuth, logoAuthWhite } from '../../icons';
import { openLogoutPopup } from '../../redux/reducers';
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
                            <MenuDropdownPopup
                                        menuPopupStatusToggler={menuPopupStatusToggler}
                                        menuPopupStatus={menuPopupStatus}
                                        menuItemClickHandler={menuItemClickHandler}
                                />
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
