import React, { useState } from 'react'
import styles from './user.module.scss';
import { defaultAvatar } from '../../../icons';
const API_KEY = process.env.VITE_API_URL;
const User: React.FC<{ user: any }> = ({ user }) => {
    console.log('comming user');
    console.log(user);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("Unfollow");

    const follow =  () => {
      
        handleFollowClick();
    }
  const handleFollowClick = async ( ) => {
     setLoading(true);
    
        const accountId = user?._id;
        const token = localStorage.getItem('token');
      
        if(token){
 
              
            try {
                 
                const response = await fetch(`${API_KEY}/profile/follow/${accountId}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Handle success as needed
                    console.log(`user: ${accountId} is followed`);
                    // Update the followedAccounts state
                    setText("Follow")
                    setLoading(false);
                
                }else{
                    setLoading(false);
                }
            } catch (error) {
                // Handle error as needed
                setLoading(false);
                console.log(error)
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
                        <div className={styles['div-20']}>{user?.followed_userID?.name}</div>
                    </div>
                    <div onClick={follow} className={styles['div-21']}>{loading ? "..." : text}</div>
                </div>
            </div>
            <div className={styles['div-border']} />
        </>
    );
};

export default User