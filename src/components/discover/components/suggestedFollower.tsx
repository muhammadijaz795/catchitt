import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import { useAuthStore } from '../../../store/authStore';
import styles from './suggestedFollower.module.scss';
import { get } from '../../../axios/axiosClient';
import { openLoginPopup } from '../../../redux/reducers';
import { useDispatch } from 'react-redux';

export default function SuggestedFollower({ randonUser }: any) {
    const API_KEY = process.env.VITE_API_URL;
    const [followedUsersData, setFollowedUsersData] = useState<any>([]);
    const [followedAccounts, setFollowedAccounts] = useState<any>({}); // Initialize as an empty object
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    // Use Function For Get the User Followers
    const handleFetchFollowedUsers = async () => {
        if (token) {
            try {
                const response = await fetch(`${API_KEY}/profile/${userId}/followers`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                await get(`/profile/${userId}/followers`).then((res: any) => {
                    setFollowedUsersData(res?.data?.data?.data);
                });

                // if (response.ok) {
                //     const responseData = await response.json();
                // }
            } catch (error) {
                console.log(error);
            }
        } else {
            // navigate('/auth');
        }
    };

    const navigate = useNavigate();
    const handleFollowClick = async (accountId: string) => {
        if (!token) {
            dispatch(openLoginPopup());
            return;
        }
        try {
            const response = await fetch(`${API_KEY}/profile/follow/${accountId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Update the followedAccounts state
                setFollowedAccounts((prevFollowedAccounts: any) => ({
                    ...prevFollowedAccounts,
                    [accountId]: !prevFollowedAccounts[accountId], // Mark the account as followed
                }));
                handleFetchFollowedUsers();
            }
        } catch (error) {
            alert('Somthing went wrong');
        }
    };
    useEffect(() => {
        handleFetchFollowedUsers();
    }, []);
    return (
        <div className={styles.follower}>
            <img
                onClick={() => navigate(`/profile/${randonUser._id}`)}
                src={randonUser.avatar || defaultProfileIcon}
                alt=""
            />
            <p>{randonUser.name}</p>
            <p>{randonUser.bio}</p>
            <p>
                123.5k <span> Followers </span>
            </p>
            {followedUsersData.length > 0 &&
            followedUsersData.some((user: any) => user.followed_userID._id === randonUser._id) ? (
                <button onClick={() => handleFollowClick(randonUser._id)}>Following</button>
            ) : (
                <button
                    style={{ background: 'rgb(255, 59, 92)', color: '#FFF' }}
                    onClick={() => handleFollowClick(randonUser._id)}
                >
                    Follow
                </button>
            )}
        </div>
    );
}
