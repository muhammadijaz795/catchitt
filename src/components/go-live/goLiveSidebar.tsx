import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import the necessary hooks
import { useAuthStore } from '../../store/authStore';
import styles from '../../components/side-nav-bar/side-nav-bar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginPopup } from '../../redux/reducers';
import {isUserLoggedIn, isUserLoggedInData} from '../../utils/common';
import { logoutUser } from '../../redux/reducers/auth';
import { openLogoutPopup } from '../../redux/reducers';
import { SuggestedActivity } from '../../components/suggested-activity/suggested-activity';
import Notifications from './../../shared/navbar/components/Notifications'
import PopupForGetApp from '../../shared/components/PopupForGetApp';
// import Search from '../../shared/navbar/components/Search';
import { createIcon, defaultAvatar, logo, logoS, logoAuth, logoAuthWhite } from '../../icons';
import CustomButton from '../../shared/buttons/CustomButton';

export interface SideNavBarProps {
    className?: string;
    selectedIndex?: number | null;
    settingsDropdownState?: boolean;
}

export const SideNavBar = ({ className, settingsDropdownState }: SideNavBarProps) => {

    const [logo, setLogo] = useState(logoAuth);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == "dark") {
            setdarkTheme(styles.darkTheme);
            setLogo(logoAuthWhite);
        } else {
            setLogo(logoAuth);
        }
    });

    const { settingsDropdown, setSettingsDropdown, selectedIndex, setIndex } = useAuthStore(); // Get selectedIndex and setIndex from the store

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Search, setSearch] = useState<any>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const profile = useSelector((store: any) => store?.reducers?.profile);

    const { pathname } = useLocation()

    const [isRotated, setRotated] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(settingsDropdownState);
    // const [sidebarTextStyle, setSidebarTextStyle] = useState(styles.sidebarTextStyle);

    const [isOpenOverlay, setIsOpenOverlay] = useState(false);
    const [isOpenOverlaySearch, setIsOpenOverlaySearch] = useState(false);
    const [isOpenOverlayActivity, setIsOpenOverlayActivity] = useState(false);
    const [appPopup, setAppPopup] = useState(false);
    const [showNextBar, setShowNextBar] = useState(false);
    const currentActiveTheme = window.localStorage.getItem('theme')

    const openThemeMenu = () => {
        setShowNextBar(!showNextBar);
        setIsOpenOverlayActivity(false); // Ensure the second overlay is closed
    }

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        setSearchHistory(storedSearches);
    }, []);

    // Handle form submission
    // Handle form submission (search)
    const submitHandler = (e?: React.FormEvent, searchValue?: string) => {
        if (e) e.preventDefault();
        const searchQuery = searchValue || Search;
        if (searchQuery.trim() === "") return; // Prevent empty searches

        // Update history and store in localStorage
        const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)]; // Avoid duplicates
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

        // Navigate to search results
        navigate(`/searchPage/${searchQuery}/All`);

        // Keep input field filled
        setSearch(searchQuery);
    };

    const clearSearch = () => {
        setSearch('');
    };

     // Delete search item
     const deleteSearchItem = (item: string) => {
        const updatedHistory = searchHistory.filter(search => search !== item);
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    };

    const handleHistoryClick = (item: string) => {
        setSearch(item);
        submitHandler(undefined, item); // Call submitHandler with the selected history item
    };

    const backNewBar = () => {
        setShowNextBar(!showNextBar);
    }
    const showAppPopup = () => {
        setAppPopup(true);
    };

    const closeAppPopup = () => {
        setAppPopup(false);
    };

    const darkThemeFun = () => {
        window.localStorage.setItem('theme', "dark");
        window.location.reload();
    };

    const lightThemeFun = () => {
        window.localStorage.setItem('theme', "light");
        window.location.reload();
    };
    
    const handleToggleOverlaySearch = () => {
        setIsOpenOverlaySearch(!isOpenOverlaySearch);
        setIsOpenOverlayActivity(false);
        setIsOpenOverlay(false);

    };

    const handleCloseOverlaySearch = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsOpenOverlaySearch(false);
        }
    };

    const handleToggleOverlay = () => {
        setIsOpenOverlay(!isOpenOverlay);
        setIsOpenOverlayActivity(false); 
        setIsOpenOverlaySearch(false);

    };
    
    const handleCloseOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsOpenOverlay(false);
        }
    };
    
    const handleToggleOverlayActivity = () => {
        setIsOpenOverlayActivity(!isOpenOverlayActivity);
        setIsOpenOverlay(false); 
        setIsOpenOverlaySearch(false);

    };
    
    const handleCloseOverlayActivity = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsOpenOverlayActivity(false);
        }
    };
    

    const handleLinkClick = (index: number) => {
        setIndex(index); // Update the selectedIndex in the store

    }

    const handleEmailClick = () => {
        const email = 'info@ogoul.com';
        window.location.href = `mailto:${email}`;
        setIndex(6)
    }

    const handleGetCoins = async () => {
        navigate('/settings/account/balance');
    };

    const getSettings =  async () => {
        navigate('/settings/account');
    }

    useEffect(() => {
        if (selectedIndex === 4) {
            setSettingsDropdown(true)
        } else {
            setSettingsDropdown(false)
        }
    }, [selectedIndex])

    const toggleRotation = () => {
        setRotated(!isRotated);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
        toggleRotation();
    };

    useEffect(() => {
        if (settingsDropdown === true) {
            setDropdownOpen(true)
        }
    }, [])

    const [darkTheme, setdarkTheme] = useState('');
    const [darkThemeblack, setdarkThemeblack] = useState('');
    const [textColor, setTextColor] = useState('black');
    const [textColorClass, setTextColorClass] = useState(styles.textBlackColor);
    const [activeCompanyClass, setActiveCompanyClass] = useState(false);
    const [activeProgramClass, setActiveProgramClass] = useState(false);
    const [activeTermClass, setActiveTermClass] = useState(false);
    const [activeClass, setActiveClass] = useState(styles.activeBlackClass);


    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        
        if(themeColor == "dark"){ 
            setdarkTheme(styles.darkTheme);
            setdarkThemeblack(styles.darkThemeblack);
            setTextColor("white");
            setTextColorClass(styles.textWhiteColor);
            setActiveClass(styles.activeClass);
        }else{
            // setdarkTheme(style.lightTheme);
            setTextColor("black");
            setTextColorClass(styles.textBlackColor);
            setActiveClass(styles.activeBlackClass);
        }
    });

    const profileNavigation = () => {
        let getAuth = localStorage.getItem("token");
        if(getAuth){
            navigate("/profile");
        }else{
            dispatch(openLoginPopup());
        }
    }

    useEffect(() => {
        console.log(profile)
    }, [profile])
    

    return (
        <div className={`${isOpenOverlay === true || isOpenOverlaySearch === true || isOpenOverlayActivity === true ? styles.OverlayOpenMain : ''} ${classNames(styles.root, className)} ${darkTheme} w-[16rem] fixed`}>
            <div className={isDropdownOpen === true ? styles.cardDivOpened : styles.cardDiv}>
                
            <div onClick={() => navigate('/')} className={styles.sec1}>
                {isOpenOverlay || isOpenOverlaySearch || isOpenOverlayActivity ? (
                <img className="h-10 px-3" src={logoS} alt="" />

                ) : (
                    <img className="w-40 px-3" src={logo} alt="" />
                )}
            </div>


                <div className='flex gap-2 items-center cursor-pointer px-3 pt-4 pb-2' >
                    <span>
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.0508" cy="13.0195" r="12.0508" fill="#F2F2F2"/>
                            <path d="M6.85156 12.9688H17.3516" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.85156 12.9688L9.85156 15.8021" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.85156 12.9661L9.85156 10.1328" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </span>
                    <span>Back</span>
                </div>
                
                <Link to="/home" reloadDocument={false} style={{ textDecoration: 'none' }}>
                    <div
                        className={classNames(
                            `${pathname.includes('/home') ? styles.selected : styles.navLink}`
                        )}
                        onClick={() => {
                            handleLinkClick(0)
                            setSettingsDropdown(false)
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.04655 0.779893C5.91218 0.892748 5.82772 1.05403 5.8115 1.22876C5.79527 1.40348 5.84859 1.57756 5.95989 1.71323L8.65322 4.91989H5.63322C3.82655 4.91989 2.91989 4.91989 2.23322 5.26656C1.62588 5.57198 1.13104 6.06214 0.819886 6.66656C0.466553 7.34656 0.466553 8.24656 0.466553 10.0332V16.8732C0.466553 18.6599 0.466553 19.5599 0.819886 20.2399C1.12655 20.8399 1.61989 21.3332 2.23322 21.6399C2.91989 21.9866 3.82655 21.9866 5.63322 21.9866H16.3666C18.1732 21.9866 19.0799 21.9866 19.7666 21.6399C20.3739 21.3345 20.8687 20.8443 21.1799 20.2399C21.5332 19.5599 21.5332 18.6599 21.5332 16.8732V10.0332C21.5332 8.24656 21.5332 7.34656 21.1799 6.66656C20.8687 6.06214 20.3739 5.57198 19.7666 5.26656C19.0799 4.91989 18.1732 4.91989 16.3666 4.91989H13.2999L15.9932 1.71989C16.0497 1.65294 16.0925 1.57551 16.1191 1.49201C16.1456 1.40852 16.1555 1.32061 16.1481 1.23331C16.1406 1.14601 16.1161 1.06103 16.0758 0.983225C16.0355 0.905424 15.9802 0.836329 15.9132 0.779893L15.3999 0.34656C15.2642 0.235264 15.0901 0.181946 14.9154 0.19817C14.7407 0.214395 14.5794 0.298853 14.4666 0.433226L10.9799 4.57989L7.49322 0.433226C7.38036 0.298853 7.21908 0.214395 7.04435 0.19817C6.86963 0.181946 6.69555 0.235264 6.55989 0.34656L6.04655 0.779893ZM5.19989 13.5532C5.26398 13.4267 5.36673 13.324 5.49322 13.2599C5.63322 13.1932 5.81989 13.1932 6.19322 13.1932H6.45989C6.83322 13.1932 7.01989 13.1932 7.15989 13.2599C7.28637 13.324 7.38913 13.4267 7.45322 13.5532C7.52655 13.6932 7.52655 13.8866 7.52655 14.2532V17.1199C7.52655 17.4932 7.52655 17.6799 7.45989 17.8199C7.39406 17.9474 7.28885 18.0503 7.15989 18.1132C7.01989 18.1866 6.83322 18.1866 6.45989 18.1866H6.19322C5.81989 18.1866 5.63322 18.1866 5.49322 18.1199C5.3657 18.0541 5.26283 17.9489 5.19989 17.8199C5.12655 17.6866 5.12655 17.4932 5.12655 17.1199V14.2532C5.12655 13.8799 5.12655 13.6932 5.19322 13.5532H5.19989ZM9.79989 9.78656C9.79989 9.41323 9.79988 9.22656 9.86655 9.08656C9.93237 8.95904 10.0376 8.85617 10.1666 8.79323C10.3066 8.72656 10.4932 8.72656 10.8666 8.72656H11.1332C11.5066 8.72656 11.6932 8.72656 11.8332 8.79323C11.9597 8.85732 12.0625 8.96008 12.1266 9.08656C12.1999 9.22656 12.1999 9.41989 12.1999 9.78656V17.1199C12.1999 17.4932 12.1999 17.6799 12.1332 17.8199C12.0674 17.9474 11.9622 18.0503 11.8332 18.1132C11.6932 18.1866 11.5066 18.1866 11.1332 18.1866H10.8666C10.4932 18.1866 10.3066 18.1866 10.1666 18.1199C10.039 18.0541 9.93616 17.9489 9.87322 17.8199C9.79989 17.6866 9.79989 17.4932 9.79989 17.1199V9.78656ZM14.5332 11.5532C14.599 11.4257 14.7043 11.3228 14.8332 11.2599C14.9732 11.1932 15.1599 11.1932 15.5332 11.1932H15.7999C16.1732 11.1932 16.3599 11.1932 16.4999 11.2599C16.6264 11.324 16.7291 11.4267 16.7932 11.5532C16.8666 11.6932 16.8666 11.8866 16.8666 12.2532V17.1199C16.8666 17.4932 16.8666 17.6799 16.7999 17.8199C16.7341 17.9474 16.6288 18.0503 16.4999 18.1132C16.3599 18.1866 16.1732 18.1866 15.7999 18.1866H15.5332C15.1599 18.1866 14.9732 18.1866 14.8332 18.1199C14.7057 18.0541 14.6028 17.9489 14.5399 17.8199C14.4666 17.6866 14.4666 17.4932 14.4666 17.1199V12.2532C14.4666 11.8799 14.4666 11.6932 14.5332 11.5532Z" 
                            fill={`${pathname.includes('/home') ? 'rgb(255, 59, 92)': textColor}`}
                            />
                        </svg>
                        <p className={`${styles.linkWord} font-medium`}>Discover live</p>
                    </div>
                </Link>
                    
                <Link to="/discover" reloadDocument={false} style={{ textDecoration: 'none' }}>
                    <div
                        className={classNames(
                            `${pathname.includes('/discover') ? styles.selected : styles.navLink}`
                        )}
                        onClick={() => {
                            handleLinkClick(2)
                            setSettingsDropdown(false)
                        }}>
                       <svg width="24" height="24" viewBox="6 10 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 14.7877L23.553 12.5117C23.7054 12.4356 23.8748 12.3996 24.045 12.4073C24.2152 12.4149 24.3806 12.466 24.5256 12.5555C24.6706 12.6451 24.7902 12.7702 24.8733 12.919C24.9563 13.0678 24.9999 13.2353 25 13.4057V20.1697C24.9999 20.3401 24.9563 20.5077 24.8733 20.6564C24.7902 20.8052 24.6706 20.9304 24.5256 21.0199C24.3806 21.1095 24.2152 21.1605 24.045 21.1682C23.8748 21.1758 23.7054 21.1399 23.553 21.0637L19 18.7877V14.7877Z"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                            <path
                                d="M7 12.7891C7 12.2586 7.21071 11.7499 7.58579 11.3748C7.96086 10.9998 8.46957 10.7891 9 10.7891H17C17.5304 10.7891 18.0391 10.9998 18.4142 11.3748C18.7893 11.7499 19 12.2586 19 12.7891V20.7891C19 21.3195 18.7893 21.8282 18.4142 22.2033C18.0391 22.5783 17.5304 22.7891 17 22.7891H9C8.46957 22.7891 7.96086 22.5783 7.58579 22.2033C7.21071 21.8282 7 21.3195 7 20.7891V12.7891Z"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                            </svg>

                        <p className={`${styles.linkWord} ${textColor} font-medium pl-0`}>Go live</p>
                    </div>
                </Link>

                <Link to="/following" reloadDocument={false} style={{ textDecoration: 'none' }}>

                    <div
                        className={classNames(
                            `${pathname.includes('/following') ? styles.selected : styles.navLink}`
                        )}
                        onClick={() => {
                            handleLinkClick(2)
                            setSettingsDropdown(false)
                        }}
                    >
                       <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39502 9.58839V18.6154C1.39502 19.72 2.29045 20.6154 3.39502 20.6154H17.0251C18.1297 20.6154 19.0251 19.72 19.0251 18.6154V9.58839C19.0251 9.03259 18.7939 8.50185 18.3868 8.12346L11.5717 1.78903C10.8041 1.07559 9.61603 1.07559 8.84847 1.78903L2.03341 8.12346C1.6263 8.50185 1.39502 9.03259 1.39502 9.58839Z" stroke="black" stroke-width="2"/>
                        <path d="M7.53711 9.68782V16.816C7.53709 16.8952 7.55822 16.9731 7.59831 17.0414C7.63841 17.1098 7.69603 17.1663 7.76522 17.2049C7.83441 17.2436 7.91267 17.2631 7.99192 17.2615C8.07117 17.2598 8.14855 17.2371 8.21606 17.1955L14.0077 13.6315C14.0725 13.5916 14.1261 13.5358 14.1633 13.4693C14.2004 13.4029 14.2199 13.328 14.2199 13.2519C14.2199 13.1758 14.2004 13.1009 14.1633 13.0344C14.1261 12.968 14.0725 12.9122 14.0077 12.8723L8.21606 9.30825C8.14855 9.26671 8.07117 9.24394 7.99192 9.24228C7.91267 9.24063 7.83441 9.26015 7.76522 9.29883C7.69603 9.33751 7.63841 9.39395 7.59831 9.46233C7.55822 9.53071 7.53709 9.60855 7.53711 9.68782Z" fill="black"/>
                       </svg>
                        <p className={`${styles.linkWord} ${textColor} font-medium pl-0`}>Creator tools</p>
                    </div>
                </Link>
                <span
                    style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={handleToggleOverlay}>
                    <div
                        className={classNames(
                            `${pathname.includes('/more') ? styles.selected : styles.navLink}`
                        )}
                    >   
                        <svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.9959 1.55078H8.00488" stroke={`${pathname.includes('/activity') ? 'rgb(255, 59, 92)': textColor}`} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.9998 1.55078H14.0088" stroke={`${pathname.includes('/activity') ? 'rgb(255, 59, 92)': textColor}`} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.99981 1.55078H2.00879" stroke={`${pathname.includes('/activity') ? 'rgb(255, 59, 92)': textColor}`} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p className={`${styles.linkWord} ${textColor} font-medium pl-0`}>More</p>
                    </div>
                </span>
                <span className='mb-4'>
                    <CustomButton
                        text="Get Coin"
                        width="90% !important"
                        rounded="0.5rem"
                    />
                </span>
                <PopupForGetApp openAppPopup={appPopup} closeAppPopup={closeAppPopup} />
                

                {isOpenOverlay && (showNextBar ? (
                    <div className={styles.overlay} onClick={handleCloseOverlay}>
                    
                                        <div className={styles.overlayContent}>
                                            <p className='d-flex align-items-center cursor-pointer' onClick={backNewBar}>
                                                <span className='bg-[#f1f2f3] p-1 rounded-full w-[1.35rem] mr-2'>
                                                    <svg fill="#424242"  color="inherit" font-size="12" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="m19.26 24 13.66-13.67a1 1 0 0 0 0-1.41l-1.84-1.84a1 1 0 0 0-1.41 0L13.46 23.3a1 1 0 0 0 0 1.42l16.2 16.21a1 1 0 0 0 1.42 0l1.84-1.84a1 1 0 0 0 0-1.41L19.26 24Z"></path></svg>
                                                </span>
                                                {currentActiveTheme}
                                            </p>
                                            <div onClick={darkThemeFun} className="d-flex mt-3 p-2 rounded-full cursor-pointer justify-between align-items-center"
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f3f4")}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                            >
                                                    <p className="font-medium">Dark mode</p>
                                                    <span>
                                                        {currentActiveTheme === "dark" ? (
                                                            <svg
                                                                fill="white"  // White color for dark mode
                                                                stroke="white" // White stroke
                                                                fontSize="14"
                                                                viewBox="0 0 48 48"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M43 6.08c.7.45 1.06.67 1.25.98c.16.27.23.59.2.9c-.03.36-.26.72-.7 1.43L23.06 42.14a3.5 3.5 0 0 1-5.63.39L4.89 27.62c-.54-.64-.81-.96-.9-1.32a1.5 1.5 0 0 1 .09-.92c.14-.33.46-.6 1.1-1.14l1.69-1.42c.64-.54.96-.81 1.31-.9c.3-.06.63-.04.92.09c.34.14.6.46 1.15 1.1l9.46 11.25 18.11-28.7c.45-.72.68-1.07.99-1.26c.27-.16.59-.23.9-.2c.36.03.71.25 1.43.7L43 6.08Z"
                                                                ></path>
                                                            </svg>
                                                        ) : null}
                                                    </span>
                                                </div>

                                                <div onClick={lightThemeFun} className="d-flex mt-3 p-2 rounded-full cursor-pointer justify-between align-items-center"
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f3f4")}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                                >
                                                    <p className="font-medium">Light mode</p>
                                                    <span>
                                                        {currentActiveTheme === "light" ? (
                                                            <svg
                                                                fill="black"  // Black color for light mode
                                                                stroke="black" // Black stroke
                                                                fontSize="14"
                                                                viewBox="0 0 48 48"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M43 6.08c.7.45 1.06.67 1.25.98c.16.27.23.59.2.9c-.03.36-.26.72-.7 1.43L23.06 42.14a3.5 3.5 0 0 1-5.63.39L4.89 27.62c-.54-.64-.81-.96-.9-1.32a1.5 1.5 0 0 1 .09-.92c.14-.33.46-.6 1.1-1.14l1.69-1.42c.64-.54.96-.81 1.31-.9c.3-.06.63-.04.92.09c.34.14.6.46 1.15 1.1l9.46 11.25 18.11-28.7c.45-.72.68-1.07.99-1.26c.27-.16.59-.23.9-.2c.36.03.71.25 1.43.7L43 6.08Z"
                                                                ></path>
                                                            </svg>
                                                        ) : null}
                                                    </span>
                                                </div>

                                        </div>
                                    </div>
                ) : ( <div className={styles.overlay} onClick={handleCloseOverlay}>
                        <div className={styles.overlayContent}>
                            <div className='d-flex justify-between'>
                                <p className='font-semibold text-lg'>More</p>
                                <button onClick={() => setIsOpenOverlay(false)} className='border-0 bg-[#AEA5A530] rounded-full p-1'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.35 6.06095C19.4432 5.96726 19.4954 5.84054 19.4954 5.70845C19.4954 5.57635 19.4432 5.44963 19.35 5.35595L18.65 4.64595C18.6035 4.59908 18.5482 4.56188 18.4873 4.5365C18.4264 4.51112 18.361 4.49805 18.295 4.49805C18.229 4.49805 18.1637 4.51112 18.1027 4.5365C18.0418 4.56188 17.9865 4.59908 17.94 4.64595L12 10.5859L6.06003 4.65095C5.96635 4.55782 5.83962 4.50555 5.70753 4.50555C5.57544 4.50555 5.44871 4.55782 5.35503 4.65095L4.64503 5.36095C4.5519 5.45463 4.49963 5.58135 4.49963 5.71345C4.49963 5.84554 4.5519 5.97226 4.64503 6.06595L10.585 12.0009L4.65003 17.9409C4.5569 18.0346 4.50463 18.1614 4.50463 18.2934C4.50463 18.4255 4.5569 18.5523 4.65003 18.6459L5.36003 19.3559C5.45371 19.4491 5.58044 19.5013 5.71253 19.5013C5.84462 19.5013 5.97135 19.4491 6.06503 19.3559L12 13.4159L17.94 19.3509C18.0337 19.4441 18.1604 19.4963 18.2925 19.4963C18.4246 19.4963 18.5513 19.4441 18.645 19.3509L19.355 18.6409C19.4482 18.5473 19.5004 18.4205 19.5004 18.2884C19.5004 18.1564 19.4482 18.0296 19.355 17.9359L13.415 12.0009L19.35 6.06095Z" fill={`${textColor}`}></path>
                                </svg>                                  
                                </button>
                            </div>
                            <div
                            className='d-flex mt-2 p-2 cursor-pointer rounded-full' onClick={handleGetCoins} 
                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f3f4")}
                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                                <p className='font-medium'>Get Coins </p>
                            </div>
                            {/* <div className='d-flex mt-4 cursor-pointer '>
                                <p className='font-medium'>Create Seezitt effects </p>
                            </div> */}
                            {/* <div className='d-flex mt-4 cursor-pointer  justify-between align-items-center'>
                                <p className='font-medium'>Creator tools </p>
                                <span>
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.26953L7 7.26953L1 13.2695" stroke="#D3D3D3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div> */}
                            {/* <div className='d-flex mt-4 cursor-pointer  justify-between align-items-center'>
                                <p className='font-medium'>English</p>
                                <span>
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.26953L7 7.26953L1 13.2695" stroke="#D3D3D3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div> */}
                            <div onClick={openThemeMenu} className='d-flex mt-2 p-2 cursor-pointer rounded-full  justify-between align-items-center'   
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f3f4")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                                <p className='font-medium'>Dark mode </p>
                                <span>
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.26953L7 7.26953L1 13.2695" stroke="#D3D3D3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                            <div className='d-flex mt-2 p-2 cursor-pointer rounded-full' onClick={getSettings} 
                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f3f4")}
                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                                <p className='font-medium'>Settings </p>
                            </div>

                            
                            <Link className='d-flex mt-2 p-2 cursor-pointer rounded-full' to="https://help.seezitt.com/" target="_blank" 
                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f3f4")}
                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                                    <p className='font-medium hover:text-none'>Feedback and help </p>
                            </Link>
                            <div className='d-flex mt-2 p-2 cursor-pointer rounded-full ' onClick={showAppPopup} 
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f3f4")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                                <p className='font-medium'>Get app </p>
                            </div>
                            <div 
                                                        className='d-flex mt-2 p-2 cursor-pointer rounded-full 'onClick={() => {
                                                            dispatch(openLogoutPopup());
                                                        }} 
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f3f4")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                                <p className='font-medium'>Logout </p>
                            </div>
                        </div>
                    </div>
                 )
                )}

                <div className={` ${styles.sidebarLoginBox} `}>
                 { isUserLoggedIn() ? (
                    <>
                        <p className={styles.sidebarTextStyle} ><b style={{fontWeight: '600'}}>Following</b>
                        {/* <br/> Accounts you follow will appear here */}
                        </p>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} className='py-3' />
                    </>
                    ):(
                       <>
                        <p className={styles.sidebarTextStyle}>Log in to follow creators, like videos, and view comments.</p>
                        <button type="button"  onClick={() => dispatch(openLoginPopup())} className={styles.sidebarLogin}>Log in</button>
                       </>
                 )}
                </div>

                <div className={` ${styles.sidebarLoginBox} `}>
                 { isUserLoggedIn() ? (
                    <>
                        <p className={styles.sidebarTextStyle} ><b style={{fontWeight: '600'}}>Suggested for you</b>
                        {/* <br/> Accounts you follow will appear here */}
                        </p>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} className='py-3' />
                    </>
                    ):(
                       <>
                        <p className={styles.sidebarTextStyle}>Log in to follow creators, like videos, and view comments.</p>
                        <button type="button"  onClick={() => dispatch(openLoginPopup())} className={styles.sidebarLogin}>Log in</button>
                       </>
                 )}
                </div>

                <div className={styles.divFooterContainer}>
                    
                    <h4 className={`${styles.sideBarLinks} ${activeCompanyClass? activeClass:''}`} onClick={(e)=> {setActiveCompanyClass(!activeCompanyClass)}} >Company</h4>
                    {activeCompanyClass && <div className={styles.DivLinkContainer}>
                        <Link to="/about/community-guidelines" target="_blank" className={styles.ALinkStyledNavLink} >About</Link>
                        <Link to="/contactus"  target="_blank" className={styles.ALinkStyledNavLink} >Contact</Link>
                        {/* <Link to="/https://help.seezitt.com/newsroom"  target="_blank" className={styles.ALinkStyledNavLink} >Newsroom</Link> */}
                        <Link to="https://help.seezitt.com"  target="_blank" className={styles.ALinkStyledNavLink} >Career</Link>
                    </div>}
                    <h4 className={`${styles.sideBarLinks} ${activeProgramClass? activeClass:''}`} onClick={(e)=> {setActiveProgramClass(!activeProgramClass)}} >Program</h4>
                    {activeProgramClass && <div className={styles.DivLinkContainer}>
                        <Link to="#" target="_blank" className={styles.ALinkStyledNavLink} >Seezit Live</Link>
                    </div>}
                    <h4 className={`${styles.sideBarLinks} ${activeTermClass? activeClass:''}`} onClick={(e)=> {setActiveTermClass(!activeTermClass)}} >Term</h4>
                    {activeTermClass && <div className={styles.DivLinkContainer}>
                        <Link to="https://help.seezitt.com/" target="_blank" className={styles.ALinkStyledNavLink} >Help</Link>
                        <Link to="/about/terms-conditions" target="_blank" className={styles.ALinkStyledNavLink} >Terms</Link>
                        <Link to="/about/privacy-policy"  target="_blank" className={styles.ALinkStyledNavLink} >Privacy policy</Link>
                    </div>}
                    <span data-e2e="copyright" className={styles.SpanCopyright}>© 2025 Seezitt</span></div>
            </div>
        </div>
    );
};
