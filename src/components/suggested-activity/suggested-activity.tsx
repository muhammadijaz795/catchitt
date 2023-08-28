import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import styles from './suggested-activity.module.scss';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

import { Follow } from './svg-components/Follow';

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
    createdTime: number;
    user: {
        id: string,
        avatar: string,
        username: string,
        name: string
        isVerified: boolean,
    },
    triggeredUser: {
        _id: string,
        avatar: string,
        isVerified: boolean,
        username: string,
        name: string
    };
    message: string;
    type: string;
    isRead: boolean,
}

export const SuggestedActivity = ({
    className,
    showSuggestedContent,
    showActivity,
}: SuggestedActivityProps) => {
    const [errorMessage] = useState('');
    const [accountsData, setAccountsData] = useState<Account[]>([]);
    const [activityData, setActivityData] = useState<Notification[]>([]);
    const API_KEY = process.env.VITE_API_URL;
    const suggestedEndPoint = '/profile/suggested-users';
    const activityEndPoint = '/notification';
    const token = useAuthStore((state) => state.token);
    const [, setFollowLoading] = useState(false);
    const [, setCurrentPostUser] = useState('');
    const [activityUserFollowed, setActivityUserFollowed] = useState(false);

    const handleFetchSuggestedAccounts = async () => {
        try {
            const response = await fetch(`${API_KEY}${suggestedEndPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setAccountsData(responseData.data.data);
            }
        } catch (error) {
            console.error(error);
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleFetchSuggestedAccounts();
    }, []);

    const handleFollowClick = async (accountId: string) => {
        try {
            setFollowLoading(true); // Set loading state before API call

            const response = await fetch(
                `${API_KEY}/profile/follow/${accountId}/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // Handle success as needed
                console.log(`user: ${accountId} is followed`);
                // setActivityUserFollowed(true)
            } else {
                // Handle error as needed
            }
        } catch (error) {
            // Handle error as needed
        } finally {
            await handleFetchSuggestedAccounts();
            setFollowLoading(false); // Set loading state back to false after API call
        }
    };

    const handleFollowBtnClicked = async (
        event: React.MouseEvent<HTMLElement>,
        accountId: string
    ) => {
        console.log(accountId);
        // setFollowLoading(true);
        setCurrentPostUser(accountId);
        await handleFollowClick(accountId);
        // setFollowLoading(false);
    };

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

    const elapsedTimeStrings = activityData.map(activity => {
        const activityDate = new Date(activity.createdTime);
        const now = new Date();

        const daysDifference = differenceInDays(now, activityDate);
        const hoursDifference = differenceInHours(now, activityDate);
        const minutesDifference = differenceInMinutes(now, activityDate);

        if (daysDifference > 0) {
            return `${daysDifference}d`;
        } else if (hoursDifference > 0) {
            return `${hoursDifference}h`;
        } else {
            return `${minutesDifference}m`;
        }
    });

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
                        {getRandomAccounts(accountsData, 4).map((account: Account) => (
                            <div key={account._id} className={styles.suggestedItem}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img
                                        src={
                                            account.avatar || 'https://via.placeholder.com/128'
                                        }
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
                                    <button
                                        className={styles.svgButton}
                                        onClick={(event) =>
                                            handleFollowBtnClicked(event, account._id)
                                        }
                                    >
                                        <Follow />
                                    </button>
                                </div>
                            </div>
                        ))}

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
                    <div className={styles.suggestedContentActivity}>

                        {/* Sort the accountsData in descending order based on timestamp */}
                        {activityData
                            .slice(0, 4) // Take the latest 4 notifications
                            .map((activity, index) => (
                                <>
                                    {/* {activity.isRead ? (
                                        <div></div>
                                    ) : ( */}
                                    <div key={activity._id} className={styles.suggestedItem}>
                                        <div className={styles.notificationFrame}>
                                            <div className={styles.notificationUser}>
                                                <img
                                                    src={
                                                        activity.user.avatar ||
                                                        'https://via.placeholder.com/128'
                                                    }
                                                    alt=""
                                                    className={styles.plusIconStyle}
                                                />
                                                <div className={styles.accountName}>
                                                    <h6 className={styles.notificationMessage}>
                                                        {activity?.message}
                                                        <span className={styles.timeText}>
                                                            {elapsedTimeStrings[index]}
                                                        </span>
                                                    </h6>
                                                </div>
                                                <div>
                                                    {activity.type === 'Follow' ? (

                                                        <button
                                                            className={styles.svgButton}
                                                            onClick={(event) =>
                                                                handleFollowBtnClicked(event, activity.triggeredUser._id)
                                                            }
                                                        >
                                                            <Follow />
                                                        </button>
                                                    ) : (
                                                        <img
                                                            className={styles.squareIconStyle}
                                                            src={activity.triggeredUser.avatar || 'https://via.placeholder.com/128'} // Use the appropriate property from the activity object
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                    {/* )} */}
                                </>
                            ))}
                    </div>
                </div>

            )
            }
        </div >
    );
};
