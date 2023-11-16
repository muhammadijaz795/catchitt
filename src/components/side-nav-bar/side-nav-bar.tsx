import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the necessary hooks
import { useAuthStore } from '../../store/authStore';
import styles from './side-nav-bar.module.scss';

export interface SideNavBarProps {
    className?: string;
    selectedIndex: number | null;
    settingsDropdownState?: boolean;
}

export const SideNavBar = ({ className, settingsDropdownState }: SideNavBarProps) => {
    const { settingsDropdown, setSettingsDropdown, selectedIndex, setIndex } = useAuthStore(); // Get selectedIndex and setIndex from the store

    const navigate = useNavigate();

    const [isRotated, setRotated] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(settingsDropdownState);


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
            console.log('settings dropdown open');
            setDropdownOpen(true)
        }
    }, [])


    return (
        <div className={classNames(styles.root, className)}>
            <div className={isDropdownOpen === true ? styles.cardDivOpened : styles.cardDiv}>
                <Link to="/home" reloadDocument={false} style={{ textDecoration: 'none' }}>
                    <div
                        className={classNames(
                            `${selectedIndex === 0 ? styles.selected : styles.navLink}`
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
                            fill="none"
                            className={classNames(
                                `${selectedIndex === 0 ? styles.selectedStroke : ''}`
                            )}
                        >
                            <path
                                d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                                stroke="#5448B2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className={styles.linkWord}>Home</p>
                    </div>
                </Link>
                <Link to="/comingsoon" reloadDocument={false} style={{ textDecoration: 'none' }}>
                    <div
                        className={classNames(
                            // `${selectedIndex === 1 ? styles.selected : styles.navLink}`
                            `${selectedIndex === 1 ? styles.selected : styles.navLink}`

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
                                `${selectedIndex === 1 ? styles.selectedStroke : ''}`
                            )}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M19.0714 19.0699C16.0152 22.1263 11.4898 22.7867 7.78642 21.074C7.23971 20.8539 6.79148 20.676 6.36537 20.676C5.17849 20.683 3.70117 21.8339 2.93336 21.067C2.16555 20.2991 3.31726 18.8206 3.31726 17.6266C3.31726 17.2004 3.14642 16.7602 2.92632 16.2124C1.21283 12.5096 1.87411 7.98269 4.93026 4.92721C8.8316 1.02443 15.17 1.02443 19.0714 4.9262C22.9797 8.83501 22.9727 15.1681 19.0714 19.0699Z"
                                stroke="#5448B2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.9398 12.4131H15.9488"
                                stroke="#5448B2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.9301 12.4131H11.9391"
                                stroke="#5448B2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.92128 12.413H7.93028"
                                stroke="#5448B2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className={styles.linkWord}>Chat (Coming Soon)</p>
                    </div>
                </Link>
                <Link to="/comingsoon" reloadDocument={false} style={{ textDecoration: 'none' }}>

                    <div
                        className={classNames(
                            `${selectedIndex === 2 ? styles.selected : styles.navLink}`
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
                                `${selectedIndex === 2 ? styles.selectedStroke : ''}`
                            )}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.27051 14.9519L9.86319 9.8627L14.9524 8.27002L13.3598 13.3593L8.27051 14.9519Z"
                                stroke="#5448B2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="11.611"
                                cy="11.611"
                                r="9.61098"
                                stroke="#5448B2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className={styles.linkWord}>Discover (Coming Soon)</p>
                    </div>
                </Link>
                <Link to="/notifications" reloadDocument={false} style={{ textDecoration: 'none' }}>
                    <div
                        className={classNames(
                            `${selectedIndex === 3 ? styles.selected : styles.navLink}`
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
                                `${selectedIndex === 3 ? styles.selectedStroke : ''}`
                            )}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                                stroke="#5448B2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M14.3889 20.8572C13.0247 22.3719 10.8967 22.3899 9.51953 20.8572"
                                stroke="#5448B2"
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
                                stroke="#5448B2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="12.1755"
                                cy="11.8888"
                                r="2.63616"
                                stroke="#5448B2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className={styles.linkWord}>Settings</p>
                    </div>
                    <div onClick={() => toggleDropdown()}>
                        <svg className={isRotated ? styles.rotate : styles.notRotated}
                            width="16" height="9" viewBox="0 0 16 9" fill="#5448B2" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.825865 0.212584C1.08354 -0.0450935 1.48677 -0.0685187 1.77091 0.142308L1.85231 0.212584L8.11328 6.47323L14.3743 0.212584C14.6319 -0.0450929 15.0352 -0.0685181 15.3193 0.142309L15.4007 0.212584C15.6584 0.470262 15.6818 0.873485 15.471 1.15762L15.4007 1.23903L8.6265 8.01322C8.36883 8.2709 7.9656 8.29433 7.68146 8.0835L7.60006 8.01322L0.825865 1.23903C0.54242 0.955584 0.54242 0.496029 0.825865 0.212584Z" fill="#5448B2" />
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
            </div>
        </div>
    );
};
