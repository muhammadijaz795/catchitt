import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './account.module.scss';

export interface AccountProps {
    className?: string;
}

const Account: React.FC = (className: AccountProps) => {

    const { selectedIndex, setIndex } = useAuthStore();

    // const navigate = useNavigate();

    // const handleGoBack = () => {
    //     navigate('/home'); // Navigate back to the previous page
    // };

    return (
        <div className={styles.root}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.pageHeader}>
                        <h4>Account</h4>
                    </div>
                    <div className={styles.suggestedContent}>
                        <div className={styles.accountCards}>
                            <div className={styles.settingName}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.9014 8.85156L13.4581 12.4646C12.6186 13.1306 11.4375 13.1306 10.598 12.4646L6.11719 8.85156" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>
                                    Change Email address
                                </p>
                            </div>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 5L15.5 12L8.5 19" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className={styles.accountCards}>
                            <div className={styles.settingName}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6884 12.0004C10.6884 13.0234 9.85938 13.8524 8.83637 13.8524C7.81337 13.8524 6.98438 13.0234 6.98438 12.0004C6.98438 10.9774 7.81337 10.1484 8.83637 10.1484H8.83938C9.86038 10.1494 10.6884 10.9784 10.6884 12.0004Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.6914 12H17.0094V13.852" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.1836 13.852V12" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <p>
                                    Change Password
                                </p>
                            </div>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 5L15.5 12L8.5 19" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Account;
