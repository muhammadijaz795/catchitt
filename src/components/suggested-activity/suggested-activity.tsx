import classNames from 'classnames';
import { Key, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import styles from './suggested-activity.module.scss';
// import profileIcon from '../../assets/profileIcon.png';

export interface SuggestedActivityProps {
    className?: string;
    showSuggestedContent?: boolean;
    showActivity?: boolean;
}

interface Account {
    _id: string;
    avatar: string;
    name: string;
}

interface Notification {
    _id: string;
    avatar: string;
    name: string;
    triggeredUser: string;
    user: string;
    media: string;
    message: string;
    type: string;
    createdTime: Date;
}

export const SuggestedActivity = ({
    className,
    showSuggestedContent,
    showActivity,
}: SuggestedActivityProps) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [accountsData, setAccountsData] = useState<Account[]>([]);
    const [activityData, setActivityData] = useState<Notification[]>([]);
    const API_KEY = process.env.VITE_API_URL;
    const suggestedEndPoint = '/profile/suggested-users';
    const activityEndPoint = '/notification';
    const token = useAuthStore((state) => state.token);
    // const avatar: string = '';
    let avatarUrl: string = '';

    const handleFetchSuggestedAccounts = async () => {
        try {
            const response = await fetch(`${API_KEY}${suggestedEndPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                // const { avatar, name } = responseData.data; // Extract token value from data object
                // avatarUrl = avatar;
                setAccountsData(responseData.data.data);
                // console.log(responseData);
                // console.log(accountsData);
            }
        } catch (error) {
            console.error(error);
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleFetchSuggestedAccounts();
    }, [token]);

    const handleFetchActivity = async () => {
        try {
            const response = await fetch(`${API_KEY}${activityEndPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                // const { avatar, name } = responseData.data; // Extract token value from data object
                // avatarUrl = avatar;
                setActivityData(responseData.data.data);
                console.log(responseData);
                console.log(activityData);
            }
        } catch (error) {
            console.error(error);
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleFetchActivity();
    }, [token]);

    const getRandomAccounts = (arr: any, count: number) => {
        const shuffled = arr.slice(); // Create a copy of the array to avoid modifying the original one
        let i = arr.length;
        let temp;
        let index;

        while (i > 0) {
            index = Math.floor(Math.random() * i);
            i--;

            // Swap elements between the current index and the randomly selected index
            temp = shuffled[i];
            shuffled[i] = shuffled[index];
            shuffled[index] = temp;
        }

        return shuffled.slice(0, count); // Return the first 'count' elements
    };

    return (
        <div className={classNames(styles.root, className)}>
            {showSuggestedContent && (
                <div className={styles.suggestedAccountsDiv}>
                    <div className={styles.suggestedHeader}>
                        <h4 className={styles.headerTitle}>Suggested Accounts</h4>
                        <a href="/suggested-accounts" className={styles.linkText}>
                            See All
                        </a>
                    </div>

                    <div className={styles.suggestedContent}>
                        <div className={classNames(styles.suggestedContent)}>
                            {getRandomAccounts(accountsData, 4).map(
                                (account: {
                                    _id: Key | null | undefined;
                                    avatar: string | undefined;
                                    name: any;
                                }) => (
                                    <div key={account._id} className={styles.suggestedItem}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <img
                                                src={account.avatar}
                                                alt=""
                                                className={styles.plusIconStyle}
                                            />
                                            <div className={styles.accountName}>
                                                <h4
                                                    className={styles.nameText}
                                                >{`@${account.name}`}</h4>
                                            </div>
                                        </div>
                                        <div className="svgStyle">
                                            <svg
                                                id="svg-section"
                                                width="35"
                                                height="36"
                                                viewBox="0 0 35 36"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="17.5"
                                                    cy="18"
                                                    r="17"
                                                    fill="white"
                                                    stroke="#5448B2"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M15.4967 21.0268C11.8694 21.0268 8.77148 21.5751 8.77148 23.7718C8.77148 25.9686 11.8505 26.5367 15.4967 26.5367C19.125 26.5367 22.2219 25.9875 22.2219 23.7916C22.2219 21.5958 19.1438 21.0268 15.4967 21.0268Z"
                                                    stroke="#5448B2"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M15.4963 17.8937C17.8771 17.8937 19.8068 15.964 19.8068 13.5832C19.8068 11.2024 17.8771 9.27271 15.4963 9.27271C13.1165 9.27271 11.1868 11.2024 11.1868 13.5832C11.1783 15.9555 13.0939 17.8852 15.4671 17.8937H15.4963Z"
                                                    stroke="#5448B2"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M24.298 14.8582V18.6422"
                                                    stroke="#5448B2"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M26.2286 16.7501H22.3691"
                                                    stroke="#5448B2"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className={styles.seperatorDiv}>
                        <hr className={styles.speratorLine} />
                    </div>
                </div>
            )}

            {showActivity && (
                <div className={styles.activityDiv}>
                    <div className={styles.suggestedHeader}>
                        <h4 className={styles.headerTitle}>Activity</h4>
                        <a href="/notifications" className={styles.linkText}>
                            See All
                        </a>
                    </div>
                    <div className={styles.suggestedContent}>
                        <div className={styles.suggestedContent}>
                            {/* Sort the accountsData in descending order based on timestamp */}
                            {activityData
                                .slice(0, 4) // Take the latest 4 accounts
                                .map((activity) => (
                                    <div key={activity._id} className={styles.suggestedItem}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <img
                                                src={activity.avatar}
                                                alt=""
                                                className={styles.plusIconStyle}
                                            />
                                            <div className={styles.accountName}>
                                                <h4
                                                    className={styles.nameText}
                                                >{`@${activity.name}`}</h4>
                                            </div>
                                        </div>
                                        <div className="svgStyle">
                                            <svg
                                                id="svg-section"
                                                width="35"
                                                height="36"
                                                viewBox="0 0 35 36"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="17.5"
                                                    cy="18"
                                                    r="17"
                                                    fill="white"
                                                    stroke="#5448B2"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M15.4967 21.0268C11.8694 21.0268 8.77148 21.5751 8.77148 23.7718C8.77148 25.9686 11.8505 26.5367 15.4967 26.5367C19.125 26.5367 22.2219 25.9875 22.2219 23.7916C22.2219 21.5958 19.1438 21.0268 15.4967 21.0268Z"
                                                    stroke="#5448B2"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M15.4963 17.8937C17.8771 17.8937 19.8068 15.964 19.8068 13.5832C19.8068 11.2024 17.8771 9.27271 15.4963 9.27271C13.1165 9.27271 11.1868 11.2024 11.1868 13.5832C11.1783 15.9555 13.0939 17.8852 15.4671 17.8937H15.4963Z"
                                                    stroke="#5448B2"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M24.298 14.8582V18.6422"
                                                    stroke="#5448B2"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M26.2286 16.7501H22.3691"
                                                    stroke="#5448B2"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
