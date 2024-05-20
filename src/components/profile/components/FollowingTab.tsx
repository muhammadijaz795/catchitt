import { useDispatch, useSelector } from 'react-redux';
import styles from './followingTab.module.scss';
import User from './user';
import { loadFollowing } from '../../../redux/AsyncFuncs';
import React, { useEffect, useState } from 'react';
import UnfollowPopup from './unfollow-popup';
import PublicUser from '../public-profile-components/user';
function FollowingTab({ onClose, following, isPublic, onScrollBottom }: any) {
    // console.log('following');
    // console.log(following);
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

    const handleScroll = (e: any) => {
        // console.log("handle scroll");
        // console.log(e.target.scrollHeight - e.target.scrollTop);
        // console.log("height", e.target.clientHeight);

        // Adjusted calculation with a small threshold
        const threshold = 1;
        const bottom =
            e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + threshold;

        if (bottom) {
            onScrollBottom();
        }
    };
    return (
        <div
            style={{
                overflowY: 'scroll',
            }}
            className={styles.div}
            onScroll={handleScroll}
        >
            {following?.map((user: any) =>
                isPublic ? (
                    <PublicUser
                        key={user._id}
                        user={user}
                        onUnfollowClick={openUnfollowPopup}
                        popupClose={onClose}
                    />
                ) : (
                    <User
                        key={user._id}
                        user={user}
                        onUnfollowClick={openUnfollowPopup}
                        popupClose={onClose}
                    />
                )
            )}

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
