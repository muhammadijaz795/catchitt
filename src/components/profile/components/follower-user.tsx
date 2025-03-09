import React, { useState } from 'react';
import styles from './user.module.scss';
import { defaultAvatar } from '../../../icons';
import { Link } from 'react-router-dom';
import UnfollowPopup from './unfollow-popup';
import { get, post } from '../../../axios/axiosClient';

const API_KEY = process.env.VITE_API_URL;

const FollowerUser: React.FC<{ user: any; onRemoveClick: any; popupClose: any, removeCurrentUser: any }> = ({
    user,
    onRemoveClick,
    popupClose,
    removeCurrentUser
}) => {
    console.log('ny user', user);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Remove');
    const [followBackText, setFollowBackText] = useState('Follow Back');

    const [unfollowPopup, setUnfollowPopup] = useState(false);
    const [clickedUser, setClickedUser] = useState({});


    const openUnfollowPopup = (user: any) => {
        setClickedUser(user);
        setUnfollowPopup(true);
    };

    const onCancel = () => {
        setUnfollowPopup(false);
    };

    const handleFollowBack = async (userId: any) => {
            console.log("handleFollowBack", userId)
            setFollowBackText('Requested');
            const token = localStorage.getItem('token');
            // return false;
            try {
                // const response = await fetch(
                //     API_KEY + `/profile/${userId}`, {
                //     method: 'GET',
                //     headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
                // }
                // );
                // const responseData = await response.json();
                // if (responseData.isFollowed == false) {
                    const res = await post(`/profile/follow/${userId}`);
                    console.log("handleFollowBack", res);
                    if (res?.data) {
                        console.log("handleFollowBack", res?.data)
                    }
                // }
                const LoggedInUserId = localStorage.getItem('userId');
                const result = await post(`/chat/messages`, {
                    type: 'application/json',
                    data: {
                        from: LoggedInUserId,
                        to: userId,
                        message: "Hi",
                    },
                });
                if (result?.data) {
                    console.log("Message sent");
                }
            } catch (error) {
                console.log(error);
            }
    };

    const onUnfollow = () => {
        console.log('on unfollow trigger not working code..')
    }

    const removeCurrentUser1 = async (user:any) => {
        const elements = document.querySelectorAll('.user-class-'+user?._id);
            elements.forEach(element => {
            element.remove();
        });
        removeCurrentUser(user);
        setUnfollowPopup(false);
    }

    const remove = () => {
        //   onfollowClick(user);
        // handleFollowClick();
        handleRemoveClick();
    };

    const handleRemoveClick = async () => {
        setLoading(true);

        const accountId = user?._id;
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
            }
        }
    };
    
    return (
        <>

            {unfollowPopup ? (
                <UnfollowPopup
                    openUnfollowPopup={unfollowPopup}
                    onUnfollow={onUnfollow}
                    onCancel={onCancel}
                    user={clickedUser}
                    description={`Seezitt won’t tell ${user?.follower_userID?.name} they were removed from your followers`}
                    heading={`Remove Follower?`}
                    btnText={'Remove'}
                    IsFollowerTab={true}
                    removeCurrentUser={() => removeCurrentUser1(user)} 
                />
            ) : (
                ''
            )}
            <div className={`${styles.user} user-class-${user?._id}`}>
                <div className={styles['div-18']}>
                    <div className={styles['div-19']}>
                        <img
                            style={{
                                borderRadius: '50%',
                            }}
                            loading="lazy"
                            srcSet={user?.follower_userID?.avatar || defaultAvatar}
                            className={styles['img-2']}
                        />
                        <Link onClick={popupClose} to={'/profile/' + user?.follower_userID?.username}>
                            <span className={styles['div-20']}>{user?.follower_userID?.name}</span>
                        </Link>
                    </div>
                    <div className='d-flex'>
                        {followBackText == 'Follow Back' && <div onClick={()=> handleFollowBack(user?.follower_userID?._id)}  style={button}>
                            {followBackText}
                        </div>}
                        {followBackText != 'Follow Back' && <div onClick={()=> handleFollowBack(user?.follower_userID?._id)}  style={{padding:'10px 20px', background:'#ededed',marginLeft: '0.25rem',height: '2.65rem',position: 'relative',top: '3px',borderRadius: '6px',display: 'flex', cursor:'pointer', fontWeight: '600'}}>    
                            {followBackText} 
                        </div>}

                        <div className='border ml-1' style={{padding:'15px 20px', background:'#ededed',marginLeft: '0.25rem',height: '2.65rem',position: 'relative',top: '3px',borderRadius: '6px',display: 'flex', cursor:'pointer'}} onClick={()=> openUnfollowPopup(user)}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.66248 16.5089C1.2702 16.5317 0.884413 16.4013 0.586463 16.1452C-0.00115176 15.5541 -0.00115176 14.5994 0.586463 14.0083L13.4533 1.14138C14.0645 0.569481 15.0235 0.601273 15.5954 1.21244C16.1125 1.76512 16.1427 2.6146 15.666 3.20252L2.72332 16.1452C2.42921 16.3976 2.04961 16.5278 1.66248 16.5089Z" fill="black"/>
                                <path d="M14.5141 16.5089C14.1166 16.5072 13.7355 16.3494 13.4532 16.0694L0.586341 3.2025C0.0419461 2.56678 0.115959 1.61004 0.751685 1.0656C1.31909 0.579696 2.15589 0.579696 2.72324 1.0656L15.6659 13.9325C16.2769 14.5045 16.3085 15.4636 15.7365 16.0746C15.7137 16.0989 15.6902 16.1224 15.6659 16.1452C15.349 16.4208 14.9319 16.5525 14.5141 16.5089Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    

                    
                </div>
            </div>
            <div className={`${styles['div-border']}  user-class-${user?._id}`} />
        </>
    );
};

export default FollowerUser;

const button: any = {
    color: 'white',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    border: '1px solid var(--foundation-primary-primary-500, rgb(255, 59, 92))',
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto 0',
    padding: '12px 20px',
    font: '600 14px/17px Poppins, -apple-system, Roboto, Helvetica, sans-serif',
    maxWidth: '116px',
    cursor: 'pointer',
    backgroundColor: 'rgb(255, 59, 92)',
};

const buttonDefault: any = {
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    border: '1px solid #ededed !important',
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto 0',
    padding: '12px 20px',
    font: '600 14px/17px Poppins, -apple-system, Roboto, Helvetica, sans-serif',
    maxWidth: '116px',
    cursor: 'pointer',
    backgroundColor: '#ededed !important',
};

// Usage example:
// Apply these styles to a React component
// <div style={componentStyles}>Your component content here</div>
