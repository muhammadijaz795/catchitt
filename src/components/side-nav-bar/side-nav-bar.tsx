import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import the necessary hooks
import { useAuthStore } from '../../store/authStore';
import styles from './side-nav-bar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginPopup } from '../../redux/reducers';
import {isUserLoggedIn, isUserLoggedInData} from '../../utils/common';
import { logoutUser } from '../../redux/reducers/auth';
import { openLogoutPopup } from '../../redux/reducers';
import { SuggestedActivity } from '../../components/suggested-activity/suggested-activity';
import { defaultAvatar } from '../../icons';

export interface SideNavBarProps {
    className?: string;
    selectedIndex?: number | null;
    settingsDropdownState?: boolean;
}

export const SideNavBar = ({ className, settingsDropdownState }: SideNavBarProps) => {
    const { settingsDropdown, setSettingsDropdown, selectedIndex, setIndex } = useAuthStore(); // Get selectedIndex and setIndex from the store

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useSelector((store: any) => store?.reducers?.profile);

    const { pathname } = useLocation()

    const [isRotated, setRotated] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(settingsDropdownState);
    // const [sidebarTextStyle, setSidebarTextStyle] = useState(styles.sidebarTextStyle);


    const handleLinkClick = (index: number) => {
        setIndex(index); // Update the selectedIndex in the store

    }

    const handleEmailClick = () => {
        const email = 'info@ogoul.com';
        window.location.href = `mailto:${email}`;
        setIndex(6)
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
        <div className={` ${classNames(styles.root, className)} ${darkTheme}`}>
            <div className={isDropdownOpen === true ? styles.cardDivOpened : styles.cardDiv}>
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
                        <svg
                            id="svg-section"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={`${pathname.includes('/home') ? 'rgb(255, 59, 92)': 'none'}`}
                            className={classNames(
                                `${pathname.includes('/home') ? styles.selectedStroke : ''}`
                            )}
                        >
                            <path
                                d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                                stroke={`${pathname.includes('/home') ? 'rgb(255, 59, 92)': textColor}`}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className={styles.linkWord}>For You</p>
                    </div>
                </Link>
                    {/*
                    //new theme 
                    <Link to="/comingsoon" reloadDocument={false} style={{ textDecoration: 'none' }}>
                        <div
                            className={classNames(
                                // `${selectedIndex === 1 ? styles.selected : styles.navLink}`
                                `${pathname.includes('/comingsoon') ? styles.selected : styles.navLink}`

                            )}
                            onClick={() => {
                                handleLinkClick(1)
                                setSettingsDropdown(false)
                            }}
                        >
                            <svg
                                id="svg-section"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={classNames(
                                    `${pathname.includes('/comingsoon') ? styles.selectedStroke : ''}`
                                )}
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.0714 19.0699C16.0152 22.1263 11.4898 22.7867 7.78642 21.074C7.23971 20.8539 6.79148 20.676 6.36537 20.676C5.17849 20.683 3.70117 21.8339 2.93336 21.067C2.16555 20.2991 3.31726 18.8206 3.31726 17.6266C3.31726 17.2004 3.14642 16.7602 2.92632 16.2124C1.21283 12.5096 1.87411 7.98269 4.93026 4.92721C8.8316 1.02443 15.17 1.02443 19.0714 4.9262C22.9797 8.83501 22.9727 15.1681 19.0714 19.0699Z"
                                    stroke="rgb(255, 59, 92)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15.9398 12.4131H15.9488"
                                    stroke="rgb(255, 59, 92)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.9301 12.4131H11.9391"
                                    stroke="rgb(255, 59, 92)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7.92128 12.413H7.93028"
                                    stroke="rgb(255, 59, 92)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className={styles.linkWord}>Chat (Coming Soon)</p>
                        </div>
                    </Link> 
                    // end new theme 
                    */}
                <Link to="/discover" reloadDocument={false} style={{ textDecoration: 'none' }}>

                    <div
                        className={classNames(
                            `${pathname.includes('/discover') ? styles.selected : styles.navLink}`
                        )}
                        onClick={() => {
                            handleLinkClick(2)
                            setSettingsDropdown(false)
                        }}
                    >
                        <svg
                            id="svg-section"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={classNames(
                                `${pathname.includes('/discover') ? 'rgb(255, 59, 92)': textColor}`
                            )}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.27051 14.9519L9.86319 9.8627L14.9524 8.27002L13.3598 13.3593L8.27051 14.9519Z"
                                stroke={`${pathname.includes('/discover') ? 'rgb(255, 59, 92)': textColor}`}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="11.611"
                                cy="11.611"
                                r="9.61098"
                                stroke={`${pathname.includes('/discover') ? 'rgb(255, 59, 92)': textColor}`}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className={`${styles.linkWord} ${textColor}`}>Explore</p>
                    </div>
                </Link>

                { isUserLoggedIn() ? (
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
                        <svg id="svg-section" width="24" data-e2e="" height="32" viewBox="0 0 48 48" fill={ pathname.includes('/following') ? 'rgb(255, 59, 92)': textColor} xmlns="http://www.w3.org/2000/svg"
                        className={classNames(
                            `${pathname.includes('/following') ? styles.selectedStroke : ''}`
                        )}
                        >
                           <path d="M18.99 4a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 4a6 6 0 1 0 0 12.01A6 6 0 0 0 19 8ZM18.99 27c2.96 0 5.6.58 7.87 1.65l-3.07 3.06a15.38 15.38 0 0 0-4.8-.71C10.9 31 6.3 36.16 6 44c-.02.55-.46 1-1.02 1h-2c-.55 0-1-.45-.98-1C2.33 33.99 8.7 27 19 27ZM35.7 42.88 31.82 39H45a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H31.82l3.88-3.88a1 1 0 0 0 0-1.41l-1.41-1.42a1 1 0 0 0-1.42 0l-7.3 7.3a2 2 0 0 0 0 2.82l7.3 7.3a1 1 0 0 0 1.42 0l1.41-1.42a1 1 0 0 0 0-1.41Z"></path>
                        </svg>
                        <p className={styles.linkWord}>Following</p>
                    </div>
                </Link>
                ):(
                <Link to="/suggested-accounts" reloadDocument={false} style={{ textDecoration: 'none' }}>

                    <div
                        className={classNames(
                            `${pathname.includes('/suggested-accounts') ? styles.selected : styles.navLink}`
                        )}
                        onClick={() => {
                            handleLinkClick(2)
                            setSettingsDropdown(false)
                        }}
                    >
                        <svg id="svg-section" width="24" data-e2e="" height="32" viewBox="0 0 48 48" fill={ pathname.includes('/suggested-accounts') ? 'rgb(255, 59, 92)': textColor} xmlns="http://www.w3.org/2000/svg"
                        className={classNames(
                            `${pathname.includes('/suggested-accounts') ? styles.selectedStroke : ''}`
                        )}
                        >
                            <path d="M25.5 17C25.5 21.1421 22.1421 24.5 18 24.5C13.8579 24.5 10.5 21.1421 10.5 17C10.5 12.8579 13.8579 9.5 18 9.5C22.1421 9.5 25.5 12.8579 25.5 17Z">
                            </path>
                            <path d="M7.10396 34.7906C8.78769 30.2189 12.8204 27 18.0009 27C23.1818 27 27.2107 30.2213 28.8958 34.7898C29.3075 35.906 28.6141 37 27.5 37H8.5C7.38629 37 6.69289 35.9067 7.10396 34.7906Z">
                            </path>
                            <path d="M40.6308 37H32C31.2264 34.1633 30.0098 31.5927 28.144 29.7682C29.5384 28.9406 31.1829 28.5 33 28.5C37.239 28.5 40.536 30.8992 41.9148 35.0108C42.2516 36.0154 41.5423 37 40.6308 37Z">
                            </path>
                            <path d="M33 26.5C36.0376 26.5 38.5 24.0376 38.5 21C38.5 17.9624 36.0376 15.5 33 15.5C29.9624 15.5 27.5 17.9624 27.5 21C27.5 24.0376 29.9624 26.5 33 26.5Z">
                            </path>
                        </svg>
                        <p className={styles.linkWord}>Following</p>
                    </div>
                </Link>
                
                )}
                
                { isUserLoggedIn() ? (
                    <Link to="/friends" reloadDocument={false} style={{ textDecoration: 'none' }}>

                        <div
                            className={classNames(
                                `${pathname.includes('/friends') ? styles.selected : styles.navLink}`
                            )}
                            onClick={() => {
                                handleLinkClick(2)
                                setSettingsDropdown(false)
                            }}
                        >
                            <svg id="svg-section" width="24" data-e2e="" height="32" viewBox="0 0 48 48" fill={ pathname.includes('/friends') ? 'rgb(255, 59, 92)': textColor} xmlns="http://www.w3.org/2000/svg"
                            className={classNames(
                                `${pathname.includes('/friends') ? styles.selectedStroke : ''}`
                            )}
                            >
                                <path d="M25.5 17C25.5 21.1421 22.1421 24.5 18 24.5C13.8579 24.5 10.5 21.1421 10.5 17C10.5 12.8579 13.8579 9.5 18 9.5C22.1421 9.5 25.5 12.8579 25.5 17Z">
                                </path>
                                <path d="M7.10396 34.7906C8.78769 30.2189 12.8204 27 18.0009 27C23.1818 27 27.2107 30.2213 28.8958 34.7898C29.3075 35.906 28.6141 37 27.5 37H8.5C7.38629 37 6.69289 35.9067 7.10396 34.7906Z">
                                </path>
                                <path d="M40.6308 37H32C31.2264 34.1633 30.0098 31.5927 28.144 29.7682C29.5384 28.9406 31.1829 28.5 33 28.5C37.239 28.5 40.536 30.8992 41.9148 35.0108C42.2516 36.0154 41.5423 37 40.6308 37Z">
                                </path>
                                <path d="M33 26.5C36.0376 26.5 38.5 24.0376 38.5 21C38.5 17.9624 36.0376 15.5 33 15.5C29.9624 15.5 27.5 17.9624 27.5 21C27.5 24.0376 29.9624 26.5 33 26.5Z">
                                </path>
                            </svg>
                            <p className={styles.linkWord}>Friends</p>
                        </div>
                    </Link>
                ):null}
                
                { isUserLoggedIn() ? (
                    <Link to="/upload" reloadDocument={false} style={{ textDecoration: 'none' }}>

                    <div
                        className={classNames(
                            `${pathname.includes('/upload') ? styles.selected : styles.navLink}`
                        )}
                        onClick={() => {
                            handleLinkClick(2)
                            setSettingsDropdown(false)
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10.0002" cy="10.0007" r="9.16667" stroke="#141B34" stroke-width="1.5"/>
                        <path d="M10.0002 6.33398L10.0002 13.6673M10.0002 6.33398C9.35829 6.33398 8.15906 8.16209 7.7085 8.62565M10.0002 6.33398C10.642 6.33398 11.8413 8.16209 12.2918 8.62565" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <p className={`${styles.linkWord} ${textColor}`}>Upload</p>
                    </div>

                    
                    </Link>
                ):null }

                {/* <Link to="/discover" reloadDocument={false} style={{ textDecoration: 'none' }}>

                <div
                    className={classNames(
                        `${pathname.includes('/discover') ? styles.selected : styles.navLink}`
                    )}
                    onClick={() => {
                        handleLinkClick(2)
                        setSettingsDropdown(false)
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.16683 4.5013C8.16683 2.47626 6.52521 0.834635 4.50016 0.834635C2.47512 0.834635 0.833496 2.47626 0.833496 4.5013C0.833496 6.52635 2.47512 8.16797 4.50016 8.16797C6.52521 8.16797 8.16683 6.52635 8.16683 4.5013Z" stroke="#141B34" stroke-width="1.5"/>
                    <path d="M8.16683 15.5013C8.16683 13.4763 6.52521 11.8346 4.50016 11.8346C2.47512 11.8346 0.833496 13.4763 0.833496 15.5013C0.833496 17.5263 2.47512 19.168 4.50016 19.168C6.52521 19.168 8.16683 17.5263 8.16683 15.5013Z" stroke="#141B34" stroke-width="1.5"/>
                    <path d="M19.1668 4.5013C19.1668 2.47626 17.5252 0.834635 15.5002 0.834635C13.4751 0.834635 11.8335 2.47626 11.8335 4.5013C11.8335 6.52635 13.4751 8.16797 15.5002 8.16797C17.5252 8.16797 19.1668 6.52635 19.1668 4.5013Z" stroke="#141B34" stroke-width="1.5"/>
                    <path d="M19.1668 15.5013C19.1668 13.4763 17.5252 11.8346 15.5002 11.8346C13.4751 11.8346 11.8335 13.4763 11.8335 15.5013C11.8335 17.5263 13.4751 19.168 15.5002 19.168C17.5252 19.168 19.1668 17.5263 19.1668 15.5013Z" stroke="#141B34" stroke-width="1.5"/>
                    </svg>

                    <p className={`${styles.linkWord} ${textColor}`}>Activity</p>
                </div>

                
                </Link> */}
                { isUserLoggedIn() ? (
                    <Link to="/chat" reloadDocument={false} style={{ textDecoration: 'none' }}>

                        <div
                            className={classNames(
                                `${pathname.includes('/chat') ? styles.selected : styles.navLink}`
                            )}
                            onClick={() => {
                                handleLinkClick(2)
                                setSettingsDropdown(false)
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.79199 12.291H13.2087M6.79199 7.70768H10.0003" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.9899 18.149C15.8243 17.8941 18.8786 14.7965 19.1299 10.9077C19.1791 10.1466 19.1791 9.35853 19.1299 8.59751C18.8786 4.70869 15.8243 1.61105 11.9899 1.35617C10.6817 1.26921 9.31593 1.26939 8.01044 1.35617C4.17602 1.61105 1.1217 4.70869 0.870383 8.59751C0.821201 9.35853 0.821201 10.1466 0.870383 10.9077C0.961917 12.324 1.58831 13.6354 2.32574 14.7427C2.75392 15.518 2.47134 16.4855 2.02536 17.3307C1.70379 17.9401 1.543 18.2447 1.6721 18.4649C1.8012 18.685 2.08957 18.692 2.6663 18.706C3.80686 18.7338 4.57596 18.4104 5.18645 17.9603C5.5327 17.7049 5.70582 17.5773 5.82515 17.5626C5.94447 17.5479 6.17928 17.6446 6.64884 17.838C7.07087 18.0118 7.56088 18.1191 8.01044 18.149C9.31593 18.2358 10.6817 18.236 11.9899 18.149Z" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"/>
                            </svg>

                            <p className={`${styles.linkWord} ${textColor}`}>Messages</p>
                        </div>


                    </Link>
                ):null }
                

                {/* <Link to="/discover" reloadDocument={false} style={{ textDecoration: 'none' }}>

                <div
                    className={classNames(
                        `${pathname.includes('/discover') ? styles.selected : styles.navLink}`
                    )}
                    onClick={() => {
                        handleLinkClick(2)
                        setSettingsDropdown(false)
                    }}
                >
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.833496 12.5228C0.833496 9.06582 0.833496 7.33734 1.90744 6.26339C2.98138 5.18945 4.70986 5.18945 8.16683 5.18945H11.8335C15.2905 5.18945 17.0189 5.18945 18.0929 6.26339C19.1668 7.33734 19.1668 9.06582 19.1668 12.5228C19.1668 15.9798 19.1668 17.7082 18.0929 18.7822C17.0189 19.8561 15.2905 19.8561 11.8335 19.8561H8.16683C4.70986 19.8561 2.98138 19.8561 1.90744 18.7822C0.833496 17.7082 0.833496 15.9798 0.833496 12.5228Z" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7.25 2.4401L10 5.1901L13.6667 1.52344" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <p className={`${styles.linkWord} ${textColor}`}>Profile</p>
                </div>


                </Link> */}

                

                <span
                   
                    style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={profileNavigation}>

                    <div
                        className={classNames(
                            `${pathname.includes('/profile') ? styles.selected : styles.navLink}`
                        )}
                        onClick={() => {
                            handleLinkClick(2)
                            setSettingsDropdown(false)
                        }}
                    >
                          { isUserLoggedInData() != "" ? (
                            <>
                            <img
                            style={{
                                width: '22px',
                                height: '22px',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                maxWidth:'initial'
                            }}
                            src={profile?.avatar || defaultAvatar}
                            alt=""
                        />
                        </>
                           ):
                            (
                        <svg id="svg-section" width="24" data-e2e="" height="32" viewBox="0 0 48 48" fill={ pathname.includes('/profile') ?  'rgb(255, 59, 92)': textColor} xmlns="http://www.w3.org/2000/svg"
                        className={classNames(
                            `${pathname.includes('/profile') ? styles.selectedStroke : ''}`
                        )}
                        >
                         <path fillRule="evenodd" clipRule="evenodd" d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"></path>
                        </svg>)}
                        <p className={styles.linkWord}>Profile</p>
                    </div>
                </span>

                <div className={styles.sidebarLoginBox}>
                 { isUserLoggedIn() ? (
                    <>
                        <p className={styles.sidebarTextStyle} ><b style={{fontWeight: '900'}}>Suggested for you</b>
                        {/* <br/> Accounts you follow will appear here */}
                        </p>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </>
                    ):(
                       <>
                        <p className={styles.sidebarTextStyle}>Log in to follow creators, like videos, and view comments.</p>
                        <button type="button"  onClick={() => dispatch(openLoginPopup())} className={styles.sidebarLogin}>Log in</button>
                       </>
                 )}
                </div>

                <div className={styles.divFooterContainer}>
                    {/* <div data-e2e="eh-footer-banner" class="css-24h4dh-DivEffectHouseEntranceContainer e125wy4z2">
                        <a href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&amp;utm_source=tiktok_webapp_main" target="_blank" class="e125wy4z4 css-1hd22mh-ALink-StyledEHEntranceLink er1vbsz1">
                            <div class="css-h4cuyj">
                                <img src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png" alt="eh-background" class="css-1holeui">
                                <div class="css-hcepfy" style="left: 50px; text-align: start; width: 141px;">
                                    <div style="max-height: 40px; overflow: hidden; width: 100%;">
                                        <h4 class="css-12i83zi">Create TikTok effects, get a reward</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div> */}
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
                    <span data-e2e="copyright" className={styles.SpanCopyright}>© 2024 Seezitt</span></div>

                {/*  //new theme 
                
                <Link to="/notifications" reloadDocument={false} style={{ textDecoration: 'none' }}>
                    <div
                        className={classNames(
                            `${pathname.includes('/notifications') ? styles.selected : styles.navLink}`
                        )}
                        onClick={() => {
                            handleLinkClick(3)
                            setSettingsDropdown(false)
                        }}
                    >
                        <svg
                            id="svg-section"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={classNames(
                                `${pathname.includes('/notifications') ? styles.selectedStroke : ''}`
                            )}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                                stroke="rgb(255, 59, 92)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M14.3889 20.8572C13.0247 22.3719 10.8967 22.3899 9.51953 20.8572"
                                stroke="rgb(255, 59, 92)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className={classNames(styles.linkWord, styles.notificationsP)}>
                            Notifications
                        </p>
                    </div>
                </Link> 
                 <div style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                }}
                    onClick={() => toggleDropdown()}
                >
                    <div className={styles.navLink}>
                        <svg
                            id="svg-section"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20.8067 7.62357L20.1842 6.54348C19.6577 5.62956 18.4907 5.31427 17.5755 5.83867V5.83867C17.1399 6.0953 16.6201 6.16811 16.1307 6.04104C15.6413 5.91398 15.2226 5.59747 14.9668 5.16133C14.8023 4.8841 14.7139 4.56835 14.7105 4.24599V4.24599C14.7254 3.72918 14.5304 3.22836 14.17 2.85762C13.8096 2.48689 13.3145 2.27782 12.7975 2.27803H11.5435C11.037 2.27802 10.5513 2.47987 10.194 2.8389C9.83669 3.19793 9.63717 3.68455 9.63961 4.19107V4.19107C9.6246 5.23688 8.77248 6.07677 7.72657 6.07666C7.40421 6.07331 7.08846 5.9849 6.81123 5.82036V5.82036C5.89606 5.29597 4.72911 5.61125 4.20254 6.52517L3.53435 7.62357C3.00841 8.53635 3.3194 9.70256 4.23 10.2323V10.2323C4.8219 10.574 5.18653 11.2055 5.18653 11.889C5.18653 12.5725 4.8219 13.204 4.23 13.5458V13.5458C3.32056 14.0719 3.00923 15.2353 3.53435 16.1453V16.1453L4.16593 17.2346C4.41265 17.6797 4.8266 18.0082 5.31619 18.1474C5.80578 18.2865 6.33064 18.2249 6.77462 17.976V17.976C7.21108 17.7213 7.73119 17.6515 8.21934 17.7822C8.70749 17.9128 9.12324 18.233 9.37416 18.6716C9.5387 18.9488 9.62711 19.2646 9.63046 19.587V19.587C9.63046 20.6435 10.487 21.5 11.5435 21.5H12.7975C13.8505 21.5 14.7055 20.6491 14.7105 19.5961V19.5961C14.7081 19.088 14.9089 18.6 15.2682 18.2407C15.6275 17.8814 16.1155 17.6806 16.6236 17.6831C16.9452 17.6917 17.2596 17.7797 17.5389 17.9394V17.9394C18.4517 18.4653 19.6179 18.1543 20.1476 17.2437V17.2437L20.8067 16.1453C21.0618 15.7075 21.1318 15.186 21.0012 14.6963C20.8706 14.2067 20.5502 13.7893 20.111 13.5366V13.5366C19.6718 13.2839 19.3514 12.8665 19.2208 12.3769C19.0902 11.8873 19.1603 11.3658 19.4154 10.9279C19.5812 10.6383 19.8214 10.3982 20.111 10.2323V10.2323C21.0161 9.70285 21.3264 8.54345 20.8067 7.63272V7.63272V7.62357Z"
                                stroke="rgb(255, 59, 92)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="12.1755"
                                cy="11.8888"
                                r="2.63616"
                                stroke="rgb(255, 59, 92)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className={styles.linkWord}>Settings</p>
                    </div>
                    <div onClick={() => toggleDropdown()}>
                        <svg className={!isRotated ? styles.notRotated : styles.rotate}
                            width="16" height="9" viewBox="0 0 16 9" fill="rgb(255, 59, 92)" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.825865 0.212584C1.08354 -0.0450935 1.48677 -0.0685187 1.77091 0.142308L1.85231 0.212584L8.11328 6.47323L14.3743 0.212584C14.6319 -0.0450929 15.0352 -0.0685181 15.3193 0.142309L15.4007 0.212584C15.6584 0.470262 15.6818 0.873485 15.471 1.15762L15.4007 1.23903L8.6265 8.01322C8.36883 8.2709 7.9656 8.29433 7.68146 8.0835L7.60006 8.01322L0.825865 1.23903C0.54242 0.955584 0.54242 0.496029 0.825865 0.212584Z" fill="rgb(255, 59, 92)" />
                        </svg>
                    </div>
                </div>

                {isDropdownOpen && (
                    <>
                        <Link to="/settings/account" reloadDocument={false} style={{ textDecoration: 'none' }}>
                            <div
                                className={classNames(
                                    `${selectedIndex === 4 ? styles.selected : styles.navLink}`
                                )}
                                onClick={() => {
                                    handleLinkClick(4)
                                    setSettingsDropdown(true)
                                }}
                            >
                                <p className={classNames(styles.linkWord, styles.notificationsP)}
                                    style={{ paddingLeft: '30px' }}>
                                    Account
                                </p>
                            </div>
                        </Link>
                        <Link to="/settings/account/activity" reloadDocument={false} style={{ textDecoration: 'none' }}>
                            <div
                                className={classNames(
                                    `${selectedIndex === 5 ? styles.selected : styles.navLink}`
                                )}
                                onClick={() => {
                                    handleLinkClick(5)
                                    setSettingsDropdown(true)
                                }}
                            >
                                <p className={classNames(styles.linkWord, styles.notificationsP)}
                                    style={{ paddingLeft: '30px' }}>
                                    Content & Activity
                                </p>
                            </div>
                        </Link>
                        <Link to="/settings/account" reloadDocument={false} style={{ textDecoration: 'none' }}>
                            <div
                                className={classNames(
                                    `${selectedIndex === 6 ? styles.selected : styles.navLink}`
                                )}
                                onClick={() => {
                                    handleLinkClick(6)
                                    setSettingsDropdown(true)
                                    handleEmailClick()
                                }}
                            >
                                <p className={classNames(styles.linkWord, styles.notificationsP)}
                                    style={{ paddingLeft: '30px' }}>
                                    Support
                                </p>
                            </div>
                        </Link>
                        <Link to="/about/community-guidelines" reloadDocument={false} style={{ textDecoration: 'none' }}>
                            <div
                                className={classNames(
                                    `${selectedIndex === 7 ? styles.selected : styles.navLink}`
                                )}
                                onClick={() => {
                                    handleLinkClick(7)
                                    setSettingsDropdown(true)
                                }}
                            >
                                <p className={classNames(styles.linkWord, styles.notificationsP)}
                                    style={{ paddingLeft: '30px' }}>
                                    About
                                </p>
                            </div>
                        </Link>
                    </>
                )} 
                 // end new theme 
                 */}
            </div>
        </div>
    );
};
