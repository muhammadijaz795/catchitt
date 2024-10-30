import { useDispatch, useSelector } from 'react-redux';
import styles from './followingTab.module.scss';
import User from './user';
import { loadFollowing } from '../../../redux/AsyncFuncs';
import React, { useEffect, useState } from 'react';
import UnfollowPopup from './unfollow-popup';
import PublicUser from '../public-profile-components/user';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
function FollowingTab({ onClose, following, isPublic, onScrollBottom, followingTotal }: any) {
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
        // Adjusted calculation with a small threshold
        const threshold = 1;
        const bottom =
            e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + threshold;

        if (bottom) {
            onScrollBottom();
        }
    };

    useEffect(() => {
        console.log('🚀🚀🚀following', following, followingTotal);
    }, [following]);

    return (
        <>
            <InfiniteScroll
                dataLength={following?.length}
                next={onScrollBottom}
                hasMore={following.length < followingTotal || followingTotal === null}
                loader={<div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '1rem',
                        width: 'inherit',
                    }}
                >
                    <CircularProgress />
                </div>}
                className="mb-20"
                // scrollThreshold={0.6}
                scrollableTarget="ModalscrollableDiv"
                endMessage={
                    <div className="flex flex-row justify-center items-center mt-3">
                        <p className=" font-normal text-xl">
                            {(followingTotal === 0) ? 'No following available.' : 'No more following'}
                        </p>
                    </div>
                }
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
            </InfiniteScroll>

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
        </>
    );
}

export default FollowingTab;
