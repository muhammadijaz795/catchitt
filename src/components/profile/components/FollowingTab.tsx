import { useDispatch, useSelector } from 'react-redux';
import styles from './followingTab.module.scss';
import User from './user';
import { loadFollowing } from '../../../redux/AsyncFuncs';
import React, { useState } from 'react';
import UnfollowPopup from './unfollow-popup';
function FollowingTab({ onClose }: any) {
    const following = useSelector((state: any) => state?.reducers?.followings?.data);

    const dispatch = useDispatch();

    const [unfollowPopup, setUnfollowPopup] = useState(false);
    const [clickedUser, setClickedUser] = useState({});

    const onUnfollow = () => {
        console.log('on unfollow');
    };

    const openUnfollowPopup = (user: any) => {
        setClickedUser(user);
        setUnfollowPopup(true);
    };

    const onCancel = () => {
        setUnfollowPopup(false);
    };

    return (
        <div className={styles.div}>
            {following?.map((user: any) => (
                <User
                    key={user._id}
                    user={user}
                    onUnfollowClick={openUnfollowPopup}
                    popupClose={onClose}
                />
            ))}

            {unfollowPopup ? (
                <UnfollowPopup
                    openUnfollowPopup={unfollowPopup}
                    onUnfollow={onUnfollow}
                    onCancel={onCancel}
                    user={clickedUser}
                />
            ) : (
                ''
            )}
        </div>
    );
}

export default FollowingTab;
