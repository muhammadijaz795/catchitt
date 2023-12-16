import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import { useAuthStore } from '../../../store/authStore';
import styles from './suggestedFollower.module.scss';


export default function SuggestedFollower({ randonUser }: any) {
    const [followedUsersData, setFollowedUsersData] = useState<any>([]);
    const [followedAccounts, setFollowedAccounts] = useState<any>({}); // Initialize as an empty object
    const token = useAuthStore((state) => state.token);
    const auth = useAuthStore()

    // Use Function For Get the User Followers
    const handleFetchFollowedUsers = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/${auth._id}/followers`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setFollowedUsersData(responseData.data.data);
            }
        } catch (error) {
            console.log(error)
        }

    }

    const API_KEY = process.env.VITE_API_URL;

    const navigate = useNavigate()
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
                // Update the followedAccounts state
                setFollowedAccounts((prevFollowedAccounts: any) => ({
                    ...prevFollowedAccounts,
                    [accountId]: !prevFollowedAccounts[accountId], // Mark the account as followed
                }));
                handleFetchFollowedUsers()
            }
        } catch (error) {
            alert('Somthing went wrong')
        }
    };
    useEffect(() => {
        handleFetchFollowedUsers()
    }, [])
    return (
        <div className={styles.follower} >
            <img onClick={() => navigate(`/profile/${randonUser._id}`)} src={randonUser.avatar || defaultProfileIcon} alt="" />
            <p>{randonUser.name}</p>
            <p>{randonUser.bio}</p>
            <p>123.5k <span> Followers </span></p>
            {followedUsersData.length > 0 && followedUsersData.some((user: any) => user.followed_userID._id === randonUser._id) ? <button
                onClick={() => handleFollowClick(randonUser._id)}
            >Following
            </button> : <button
                style={{ background: '#5448b2', color: '#FFF' }}
                onClick={() => handleFollowClick(randonUser._id)}
            >Follow
            </button>}
        </div >
    )
}
