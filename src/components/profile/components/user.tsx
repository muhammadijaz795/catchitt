import React, { useEffect, useState } from 'react'
import styles from './user.module.scss';
import { defaultAvatar } from '../../../icons';
import UnfollowPopup from './unfollow-popup';
import { Link } from 'react-router-dom';

const API_KEY = process.env.VITE_API_URL;
const User: React.FC<{
    user: any;
    onUnfollowClick: (user: any) => void;
    popupClose: () => void;
}> = ({ user, onUnfollowClick, popupClose }) => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Unfollow');

    const follow = () => {
        onUnfollowClick(user);
        // handleFollowClick();
    };

    const hidePopup = () => {
        window.location.reload();
    };

    // useEffect(() => {
    //     console.log('🚀🚀🚀user 1234', user)
    // }, [user])

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
                            onError={(e) => {
                                (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                            }}
                        />
                        <Link
                            onClick={() => {
                                console.log('afff');
                                popupClose();
                            }}
                            to={'/profile/' + user?.followed_userID?.username}
                        >
                            <span className={styles['div-20']}>{user?.followed_userID?.name}</span>
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

export default User