import React, { useState } from 'react'
import styles from './user.module.scss';
import { defaultAvatar } from '../../../icons';
import { Link } from 'react-router-dom';
 
const API_KEY = process.env.VITE_API_URL;


const PbulicFollowerUser: React.FC<{ user: any; onRemoveClick: any; popupClose: any }> = ({
    user,
    onRemoveClick,
    popupClose,
}) => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Follow');

    const remove = () => {
        //   onfollowClick(user);
        // handleFollowClick();
        handleRemoveClick();
    };

    const handleRemoveClick = async () => {
        setLoading(true);

        const accountId = user?.followed_userID?._id;
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
                        <Link onClick={popupClose} to={'/profile/' + user?.followed_userID?.username}>
                            <div className={styles['div-20']}>{user?.followed_userID?.name}</div>
                        </Link>
                    </div>
                    <div onClick={remove} style={button}>
                        {loading ? '...' : text}
                    </div>
                </div>
            </div>
            <div className={styles['div-border']} />
        </>
    );
};


export default PbulicFollowerUser


const button:any = {
  color: 'white',
  whiteSpace: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  border: "1px solid var(--foundation-primary-primary-500, rgb(255, 59, 92))",
  alignSelf: "center",
  flexGrow: 1,
  textAlign: "center",
  margin: "auto 0",
  padding: "12px 20px",
  font: "600 14px/17px Poppins, -apple-system, Roboto, Helvetica, sans-serif",
  maxWidth: "116px",
  cursor: "pointer",
  backgroundColor:"rgb(255, 59, 92)"
};

// Usage example:
// Apply these styles to a React component
// <div style={componentStyles}>Your component content here</div>
