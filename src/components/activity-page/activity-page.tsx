import classNames from 'classnames';
import styles from './activity-page.module.scss';
import { useEffect, useState } from 'react';
import { TopBar } from '../top-bar/top-bar';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

export interface ActivityPageProps {}

interface Activity {
    className?: string;
    _id: string;
    userAvatar: string;
    userName: string;
    createdTime: number;
    triggeredUserName: string;
    triggeredUserAvatar: string;
    message: string;
    type: string;
}

export const ActivityPage: React.FC<Activity> = ({ className, createdTime }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = useAuthStore((state) => state.token);
    const [currentPage] = useState(1);
    const itemsPerPage = 9;
    const [errorMessage, setErrorMessage] = useState('');
    const [activityData, setActivityData] = useState<Activity[]>([]);
    const API_KEY = process.env.VITE_API_URL;
    const activityEndPoint = '/notification';

    const handleFetchActivity = async () => {
        try {
            const response = await fetch(`${API_KEY}${activityEndPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setActivityData(responseData.data.data);
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

    useEffect(() => {
        handleFetchActivity();
    }, [token]);

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    // Calculate the pagination boundaries
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    // Convert createdTime to a Date object
    const createdDate = new Date(createdTime);

    // Get the current date as a Date object
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = currentDate.getTime() - createdDate.getTime();

    // Calculate the time difference in minutes and hours
    const minutesAgo = Math.floor(timeDifferenceMs / (1000 * 60));
    const hoursAgo = Math.floor(timeDifferenceMs / (1000 * 60 * 60));

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={null} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showSuggestedContent={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.suggestedContent}>
                        {activityData.slice(firstIndex, lastIndex).map((activity) => (
                            <div key={activity._id} className={styles.suggestedItem}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img
                                        src={
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkLoOUlRkGCP9B9j1ZLs3DA9GSur6oneufQQh-etbGsw&s'
                                        }
                                        alt=""
                                        className={styles.plusIconStyle}
                                    />
                                    <div className={styles.accountName}>
                                        <h6>
                                            <span className={styles.nameText}>
                                                {activity.triggeredUserName}
                                            </span>{' '}
                                            <span className={styles.messageText}>
                                                {activity.message}
                                            </span>{' '}
                                            <span className={styles.timeText}>
                                                {minutesAgo > 59
                                                    ? `${hoursAgo}hr`
                                                    : `${minutesAgo}m`}
                                            </span>
                                        </h6>
                                    </div>
                                </div>

                                <div className="svgStyle">
                                    {activityData.map((activity) =>
                                        activity.type === 'Follow' ? (
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
                                        ) : (
                                            <img
                                                src={activity.triggeredUserAvatar} // Use the appropriate property from the activity object
                                                alt=""
                                                className={styles.squareIconStyle}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
