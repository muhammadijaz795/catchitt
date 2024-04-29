import React, { useState } from 'react';
import styles from './user.module.scss';
import { defaultAvatar } from '../../../icons';
import UnfollowPopup from './unfollow-popup';
import { Link } from 'react-router-dom';

interface UserProps {
    user: any;
    popupClose: () => void;
    onUnfollowClick?: () => void;
}
const API_KEY = process.env.VITE_API_URL;
const User: React.FC<{ user: any; onUnfollowClick: any; popupClose: any }> = ({
    user,
    onUnfollowClick,
    popupClose,
}: any) => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Unfollow');

    const follow = () => {
        onUnfollowClick(user);
        // handleFollowClick();
    };

    const hidePopup = () => {
        window.location.reload();
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
                                console.log('afff');
                                popupClose();
                            }}
                            to={'/profile/' + user?.followed_userID?.username}
                        >
                            <div className={styles['div-20']}>{user?.followed_userID?.name}</div>
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

export default User;
