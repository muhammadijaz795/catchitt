import classNames from 'classnames';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/defaultProfileIcon.png';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './activity-page.module.scss';

import { IconButton } from '@mui/material';
import { LeftArrow } from './svg-components/LeftArrow';
import Layout from '../../shared/layout';

export interface ActivityPageProps {
    className?: string;
}

interface Activity {
    // className?: string;
    _id?: string;
    createdTime: number;
    user: {
        id?: string;
        avatar?: string;
        username?: string;
        name: string;
        isVerified: boolean;
    };
    triggeredUser: {
        _id: string;
        avatar: string;
        isVerified: boolean;
        username: string;
        name: string;
    };
    message: string;
    type: string;
    isRead: boolean;
}

interface FollowedUser {
    _id: string;
    followed_userID: {
        _id: string;
        avatar: string;
        username: string;
        name: string;
        isVerified: boolean;
    };
}

export const ActivityPage = ({ className }: ActivityPageProps) => {
    let globalUserId: string = '';
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = useAuthStore((state) => state.token);
    const [currentPage] = useState(1);
    const itemsPerPage = 9;
    const [errorMessage, setErrorMessage] = useState('');
    const [activityData, setActivityData] = useState<Activity[]>([]);
    const [followedUsersData, setFollowedUsersData] = useState<FollowedUser[]>([]);
    const API_KEY = process.env.VITE_API_URL;
    const activityEndPoint = '/notification';
    const [followLoading, setFollowLoading] = useState(false);
    // const [followedAccounts, setFollowedAccounts] = useState<any>({}); // Initialize as an empty object
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/home'); // Navigate back to the previous page
    };

    const handleFetchActivity = async () => {
        try {
            const response = await fetch(`${API_KEY}${activityEndPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setActivityData(responseData.data.data);
                // console.log(responseData.data.data[0].user._id);
                globalUserId = responseData.data.data[0].user._id;
                // console.log(`the global user id: ${globalUserId}`);
                handleFetchFollowedUsers(globalUserId);
            } else {
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    const handleFetchFollowedUsers = async (userId: string) => {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/followers`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setFollowedUsersData(responseData.data.data);
                console.log(`the users I'm following: `);
                console.log(responseData.data);
                // handleFetchActivity;
            }
        } catch (error) {
            // Handle any errors here.
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchActivity();
        // handleFetchFollowedUsers(globalUserId);
    }, [setFollowedUsersData, followLoading]);

    useEffect(() => {
        handleFetchActivity();
        // handleFetchFollowedUsers(globalUserId);
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    // Calculate the pagination boundaries
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const elapsedTimeStrings = activityData.map((activity) => {
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

    // const followedAccountsEndPoint = `profile/${activityData?.user.id}/following`;

    const handleFollowClick = async (userId: any) => {
        setFollowLoading(true); // Set loading state before API call
        const response = await fetch(`${API_KEY}/profile/follow/${userId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            console.log(`user: ${userId} is followed`);
            // console.log(`the triggered notification user is: ${activi}`)
            handleFetchFollowedUsers(globalUserId);
        }
        setFollowLoading(false); // Set loading state back to false after API call
        // handleFetchActivity()
        // handleFetchFollowedUsers()
    };

    return (
        <Layout>
            <div className={styles.middleSectionDiv}>
                <div className={styles.pageHeader}>
                    <IconButton
                        sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
                        onClick={handleGoBack}
                    >
                        <LeftArrow />
                    </IconButton>
                    <h4>Activity</h4>
                </div>
                <div className={styles.suggestedContent}>
                    {activityData.length === 0 ? (
                        <h4 style={{ alignSelf: 'center' }}>No Notifications yet!</h4>
                    ) : (
                        <>
                            {activityData.slice(firstIndex, lastIndex).map((activity, index) => (
                                <div key={activity._id} className={styles.suggestedItem}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <img
                                                src={activity?.triggeredUser?.avatar || profileIcon}
                                                alt=""
                                                className={styles.plusIconStyle}
                                            />
                                            <div className={styles.accountName}>
                                                <h6 className={styles.messageText}>
                                                    {activity.message}
                                                    <span className={styles.timeText}>
                                                        {elapsedTimeStrings[index]}
                                                    </span>
                                                </h6>
                                            </div>
                                        </div>
                                        <div>
                                            {activity.type === 'Follow' ? (
                                                <button
                                                    className={
                                                        followedUsersData.length > 0 &&
                                                        followedUsersData.some(
                                                            (user) =>
                                                                user.followed_userID._id ===
                                                                activity.triggeredUser._id
                                                        )
                                                            ? styles.followingBtn
                                                            : styles.followBtn
                                                    }
                                                    onClick={(event) =>
                                                        handleFollowClick(
                                                            activity.triggeredUser._id
                                                        )
                                                    }
                                                >
                                                    {followedUsersData.length > 0 &&
                                                    followedUsersData.some(
                                                        (user) =>
                                                            user.followed_userID._id ===
                                                            activity.triggeredUser._id
                                                    )
                                                        ? 'Following'
                                                        : 'Follow'}
                                                </button>
                                            ) : (
                                                <img
                                                    className={styles.squareIconStyle}
                                                    src={
                                                        activity?.triggeredUser?.avatar ||
                                                        profileIcon
                                                    } // Use the appropriate property from the activity object
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};
