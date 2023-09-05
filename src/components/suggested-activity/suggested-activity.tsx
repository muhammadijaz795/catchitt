import classNames from 'classnames';
import { memo, useEffect, useState, useMemo } from 'react';
import { useAuthStore } from '../../store/authStore';
import styles from './suggested-activity.module.scss';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

import { Follow } from './svg-components/Follow';
import defaultProfileIcon from '../../assets/defaultProfileIcon.png'
import useDebounce from '../reusables/useDebounce';

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

export const SuggestedActivity = memo(({
    className,
    showSuggestedContent,
    showActivity,
}: SuggestedActivityProps) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [errorMessage] = useState('');
    const [activityData, setActivityData] = useState<Notification[]>([]);
    const [randomAccs, setRandomAccs] = useState([])
    const API_KEY = process.env.VITE_API_URL;
    const suggestedEndPoint = '/profile/suggested-users';
    const activityEndPoint = '/notification';
    const token = useAuthStore((state) => state.token);
    const [activityUserFollowed, setActivityUserFollowed] = useState(false);
    const [suggestedUserFollowed, setSuggestedUserFollowed] = useState(randomAccs.map((user) => ({ isFollowed: false })));


    const handleFetchSuggestedAccounts = async () => {
        if (!isLoggedIn) {
            try {
                const response = await fetch(`${API_KEY}/profile/public/suggested-users`, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json', },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setRandomAccs(getRandomAccounts(responseData.data.data, 4))
                    console.log('fetched public suggested acccounts: ');
                    console.log(response);
                }
            } catch (error) {
                // console.error(error);
                console.log(errorMessage);
            }
        } else {
            try {
                const response = await fetch(`${API_KEY}${suggestedEndPoint}`, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setRandomAccs(getRandomAccounts(responseData.data.data, 4))
                }
            } catch (error) {
                // console.error(error);
                console.log(errorMessage);
            }
        }
    };

    useEffect(() => {
        if (randomAccs.length == 0) {
            handleFetchSuggestedAccounts();
        }
        // handleFetchSuggestedAccounts();
        handleFetchActivity();
    }, []);

    const handleFollowClick = async (accountId: string) => {
        try {
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
            }
        } catch (error) {
            // Handle error as needed
        }
    };

    const handleFollowBtnClicked = async (
        event: React.MouseEvent<HTMLElement>,
        accountId: string
    ) => {
        console.log(accountId);
        await handleFollowClick(accountId);
    };
    const dHandleFollowBtnClicked = useDebounce(handleFollowBtnClicked, 3)


    const handleFetchActivity = async () => {
        if (!isLoggedIn) { return }
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
                        {randomAccs.map((account: Account) => (
                            <div key={account._id} className={styles.suggestedItem}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img
                                        src={
                                            account.avatar || defaultProfileIcon
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
                                            dHandleFollowBtnClicked([event, account._id])
                                        }
                                    >
                                        <Follow />
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            )}

            {showActivity && isLoggedIn && (
                <>
                    <div className={styles.seperatorDiv}>
                        <hr className={styles.speratorLine} />
                    </div>
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
                                        <div key={activity._id} className={styles.suggestedItem}>
                                            <div className={styles.notificationFrame}>
                                                <div className={styles.notificationUser}>
                                                    <img
                                                        src={
                                                            activity.triggeredUser.avatar ||
                                                            defaultProfileIcon
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
                                                                    dHandleFollowBtnClicked([event, activity.triggeredUser._id])
                                                                }
                                                            >
                                                                <Follow />
                                                            </button>
                                                        ) : (
                                                            ''
                                                            // <img
                                                            //     className={styles.squareIconStyle}
                                                            //     src={activity. || 'https://via.placeholder.com/128'} // Use the appropriate property from the activity object
                                                            //     alt=""
                                                            // />
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
                </>
            )
            }
        </div >
    );
});
