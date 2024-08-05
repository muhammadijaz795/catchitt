import classNames from 'classnames';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { memo, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import styles from './suggested-activity.module.scss';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import defaultProfileIcon from '../../assets/defaultProfileIcon.png';
import useDebounce from '../reusables/useDebounce';
import { Follow } from './svg-components/Follow';
import { Following } from './svg-components/Following';
import { openLoginPopup } from '../../redux/reducers';
import { useDispatch } from 'react-redux';

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
        id: string;
        avatar: string;
        username: string;
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

export const SuggestedActivity = memo(
    ({ className, showSuggestedContent, showActivity }: SuggestedActivityProps) => {
        let globalUserId: string = '';
        const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
        const [errorMessage] = useState('');
        const [activityData, setActivityData] = useState<Notification[]>([]);
        const [randomAccs, setRandomAccs] = useState([]);
        const navigate = useNavigate();
        const { pathname } = useLocation();
        const API_KEY = process.env.VITE_API_URL;
        const suggestedEndPoint = '/profile/suggested-users';
        const activityEndPoint = '/notification';
        // const token = localStorage.getItem('token');
        const token = localStorage.getItem('token');
        // const [activityUserFollowed, setActivityUserFollowed] = useState(false);
        const [followedAccounts, setFollowedAccounts] = useState<any>({}); // Initialize as an empty object
        const [followedUsersData, setFollowedUsersData] = useState<FollowedUser[]>([]);
        const dispatch = useDispatch();

        const handleFetchFollowedUsers = async (userId: string) => {
            try {
                const response = await fetch(`${API_KEY}/profile/${userId}/followers`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setFollowedUsersData(responseData.data.data);
                    // handleFetchActivity;
                }
            } catch (error) {
                // Handle any errors here.
                console.log(error);
            }
        };

        const handleFetchSuggestedAccounts = async () => {
            if (!isLoggedIn) {
                try {
                    const response = await fetch(
                        `${API_KEY}/profile/public/suggested-users?page=1`,
                        {
                            method: 'GET',
                            headers: { 'Content-type': 'application/json' },
                        }
                    );

                    if (response.ok) {
                        const responseData = await response.json();
                        setRandomAccs(getRandomAccounts(responseData.data.data, 4));
                    } else {
                        console.log(response);
                    }
                } catch (error) {
                    // console.error(error);
                    console.error();
                }
            } else {
                try {
                    const response = await fetch(`${API_KEY}${suggestedEndPoint}`, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        setRandomAccs(getRandomAccounts(responseData.data.data, 4));
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
                const response = await fetch(`${API_KEY}/profile/follow/${accountId}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Handle success as needed
                    // Update the followedAccounts state
                    setFollowedAccounts((prevFollowedAccounts: any) => ({
                        ...prevFollowedAccounts,
                        [accountId]: !prevFollowedAccounts[accountId], // Mark the account as followed
                    }));
                }
            } catch (error) {
                // Handle error as needed
            }
        };

        const handleFollowBtnClicked = async (
            event: React.MouseEvent<HTMLElement>,
            accountId: string
        ) => {
            if (!token) {
                dispatch(openLoginPopup());
            } else {
                await handleFollowClick(accountId);
            }
        };
        const dHandleFollowBtnClicked = useDebounce(handleFollowBtnClicked, 3);

        const handleFetchActivity = async () => {
            if (!isLoggedIn) {
                return;
            }
            try {
                const response = await fetch(`${API_KEY}${activityEndPoint}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    // const { avatar, name } = responseData.data; // Extract token value from data object
                    // avatarUrl = avatar;
                    setActivityData(responseData.data.data);
                    globalUserId = responseData.data.data[0].user._id;
                    // console.log(`the global user id: ${globalUserId}`);
                    handleFetchFollowedUsers(globalUserId);
                }
            } catch (error) {
                console.error(error);
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

        return (
            <div className={classNames(styles.root, className)}>
                {pathname !== '/suggested-accounts'
                    ? showSuggestedContent && (
                          <div className={styles.suggestedAccountsDiv}>
                              <div className={styles.suggestedHeader}>
                                  <h4 className={styles.headerTitle}>Suggested Accounts</h4>
                                  <p
                                      onClick={() => navigate('/suggested-accounts')}
                                      className={styles.linkText}
                                      style={{ cursor: 'pointer' }}
                                  >
                                      See All
                                  </p>
                              </div>

                              <div className={styles.suggestedContent}>
                                  {randomAccs.map((account: Account) => (
                                      <div key={account._id} className={styles.suggestedItem}>
                                          {/* <Link to={`/profile/${account._id}`}> */}
                                          <div
                                              className="cursor-pointer"
                                              onClick={() => navigate(`/profile/${account._id}`)}
                                              style={{ display: 'flex', flexDirection: 'row' }}
                                          >
                                              <img
                                                  src={account?.avatar || defaultProfileIcon}
                                                  alt=""
                                                  className={styles.plusIconStyle}
                                              />
                                              {/* <div className={styles.accountName}> */}
                                              <div
                                                  style={{
                                                      display: 'flex',
                                                      flexDirection: 'column',
                                                      justifyContent: 'center',
                                                      gap: 8,
                                                  }}
                                              >
                                                  <p
                                                      style={{
                                                          color: '#222',
                                                          fontFamily: ' Poppins',
                                                          fontSize: '14px',
                                                          fontStyle: 'normal',
                                                          fontWeight: 600,
                                                          lineHeight: '120%',
                                                          textAlign: 'left',
                                                          whiteSpace: 'nowrap',
                                                          textOverflow: 'ellipsis',
                                                          overflow: 'hidden',
                                                          maxWidth: '170px',
                                                      }}
                                                      // className={styles.nameText}
                                                  >{`@${account.name}`}</p>
                                                  <h4
                                                      style={{
                                                          color: '#A9A9A9',
                                                          textAlign: 'left',
                                                          fontFamily: ' Poppins',
                                                          fontSize: '12px',
                                                          fontStyle: 'normal',
                                                          fontWeight: 400,
                                                          lineHeight: '120%',
                                                      }}
                                                      // className={styles.nameText}
                                                  >{`${account.name}`}</h4>
                                              </div>
                                          </div>
                                          {/* </Link> */}
                                          <div className="svgStyle">
                                              <button
                                                  className={styles.svgButton}
                                                  onClick={(event) =>
                                                      dHandleFollowBtnClicked([event, account._id])
                                                  }
                                              >
                                                  {followedAccounts[account._id] ? (
                                                      <Following />
                                                  ) : (
                                                      <Follow />
                                                  )}
                                              </button>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )
                    : null}

                {showActivity && isLoggedIn && (
                    <>
                        {pathname !== '/suggested-accounts' && pathname !== '/notifications' ? (
                            <div className={styles.seperatorDiv}>
                                <hr className={styles.speratorLine} />
                            </div>
                        ) : null}
                        {pathname !== '/notifications' ? (
                            <div className={styles.activityDiv}>
                                <div className={styles.suggestedHeader}>
                                    <h4 className={styles.headerTitle}>Activity</h4>
                                    <p
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate('/notifications')}
                                        className={styles.linkText}
                                    >
                                        See All
                                    </p>
                                </div>
                                <div className={styles.suggestedContentActivity}>
                                    {/* Sort the accountsData in descending order based on timestamp */}
                                    {activityData
                                        .slice(0, 4) // Take the latest 4 notifications
                                        .map((activity, index) => (
                                            <>
                                                <div
                                                    key={activity._id}
                                                    className={styles.suggestedItem}
                                                >
                                                    <div className={styles.notificationFrame}>
                                                        <div className={styles.notificationUser}>
                                                            <img
                                                                src={
                                                                    activity.triggeredUser
                                                                        ?.avatar ||
                                                                    defaultProfileIcon
                                                                }
                                                                alt=""
                                                                className={styles.plusIconStyle}
                                                            />
                                                            {/* <div className={styles.accountName}> */}
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-start',
                                                                    alignContent: 'center',
                                                                }}
                                                            >
                                                                <h6
                                                                    // className={
                                                                    //     styles.notificationMessage
                                                                    // }
                                                                    style={{
                                                                        color: '#222',
                                                                        textAlign: 'left',
                                                                        fontFamily: ' Poppins',
                                                                        fontSize: '14px',
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 400,
                                                                        lineHeight: '120%',
                                                                        width: 160,
                                                                        whiteSpace: 'nowrap',
                                                                        textOverflow: 'ellipsis',
                                                                        overflow: 'hidden',
                                                                    }}
                                                                >
                                                                    {activity?.message}
                                                                    <span
                                                                        className={styles.timeText}
                                                                    >
                                                                        {elapsedTimeStrings[index]}
                                                                    </span>
                                                                </h6>
                                                            </div>
                                                            <div>
                                                                {activity.type === 'Follow' ? (
                                                                    <button
                                                                        className={styles.svgButton}
                                                                        onClick={(event) =>
                                                                            dHandleFollowBtnClicked(
                                                                                [
                                                                                    event,
                                                                                    activity
                                                                                        .triggeredUser
                                                                                        ._id,
                                                                                ]
                                                                            )
                                                                        }
                                                                    >
                                                                        {followedAccounts[
                                                                            activity.triggeredUser
                                                                                ._id
                                                                        ] ||
                                                                        (followedUsersData.length >
                                                                            0 &&
                                                                            followedUsersData.some(
                                                                                (user) =>
                                                                                    user
                                                                                        .followed_userID
                                                                                        ._id ===
                                                                                    activity
                                                                                        .triggeredUser
                                                                                        ._id
                                                                            )) ? (
                                                                            <Following />
                                                                        ) : (
                                                                            <Follow />
                                                                        )}
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
                                                </div>
                                                {/* )} */}
                                            </>
                                        ))}
                                </div>
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        );
    }
);
