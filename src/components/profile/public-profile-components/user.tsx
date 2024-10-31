import React, { useState } from 'react';
import styles from './user.module.scss';
import { defaultAvatar } from '../../../icons';
import UnfollowPopup from '../components/unfollow-popup';
import { Link } from 'react-router-dom';

const API_KEY = process.env.VITE_API_URL;
const PublicUser: React.FC<{
    user: any;
    onUnfollowClick: (user: any) => void;
    popupClose: () => void;
}> = ({ user, onUnfollowClick, popupClose }) => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Follow');

    const follow = () => {
        // onUnfollowClick(user);
        handleFollowClick();
    };

    const handleFollowClick = async () => {
        setLoading(true);

        const accountId = user?.follower_userID?._id;
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch(`${API_KEY}/profile/follow/${accountId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Handle success as needed
                    // Update the followedAccounts state
                    text == 'Unfollow' ? setText('Follow') : setText('Unfollow');
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                // Handle error as needed
                setLoading(false);
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className={styles.user}>
                <div className={styles['div-18']}>
                    <div className={styles['div-19']}>
                        <img
                            style={{
                                borderRadius: '50%',
                            }}
                            loading="lazy"
                            srcSet={user?.followed_userID?.avatar || defaultAvatar}
                            className={styles['img-2']}
                        />
                        <Link
                            onClick={() => {
                                popupClose();
                            }}
                            to={'/profile/' + user?.follower_userID?.username}
                        >
                            <span className={styles['div-20']}>{user?.follower_userID?.name}</span>
                        </Link>
                    </div>
                    <div onClick={follow} className={styles['div-21']}>
                        {loading ? '...' : text}
                    </div>
                </div>
            </div>
            <div className={styles['div-border']} />
        </>
    );
};

export default PublicUser;
