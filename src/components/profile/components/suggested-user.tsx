import React, { useState } from 'react';
import styles from './user.module.scss';
import { defaultAvatar } from '../../../icons';
import { Link } from 'react-router-dom';

const API_KEY = process.env.VITE_API_URL;
const SuggestedUser: React.FC<{ user: any; onfollowClick: any; popupClose: any }> = ({
    user,
    onfollowClick,
    popupClose,
}: any) => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Follow');

    const follow = () => {
        //   onfollowClick(user);
        // handleFollowClick();
        handleFollowClick();
    };

    const handleFollowClick = async () => {
        setLoading(true);

        const accountId = user?._id;
        const token = localStorage.getItem('token');

        if (token) {
            try {
                console.log('userID to unfollow');
                console.log(user);
                const response = await fetch(`${API_KEY}/profile/follow/${accountId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Handle success as needed
                    console.log(`user: ${accountId} is followed`);
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
                            srcSet={user?.avatar || defaultAvatar}
                            className={styles['img-2']}
                        />
                        <Link onClick={popupClose} to={'/profile/' + user?._id}>
                            <div className={styles['div-20']}>{user?.name}</div>
                        </Link>
                    </div>
                    <div onClick={follow} style={button}>
                        {loading ? '...' : text}
                    </div>
                </div>
            </div>
            <div className={styles['div-border']} />
        </>
    );
};

export default SuggestedUser;

const button: any = {
    color: 'white',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    border: '1px solid var(--foundation-primary-primary-500, #5448b2)',
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto 0',
    padding: '12px 20px',
    font: '600 14px/17px Poppins, -apple-system, Roboto, Helvetica, sans-serif',
    maxWidth: '116px',
    cursor: 'pointer',
    backgroundColor: '#5448b2',
};

// Usage example:
// Apply these styles to a React component
// <div style={componentStyles}>Your component content here</div>
