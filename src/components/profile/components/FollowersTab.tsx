import React, { useEffect } from 'react';
import styles from './followersTab.module.scss';

import FollowerUser from './follower-user';
import PbulicFollowerUser from '../public-profile-components/follower-user';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
export default function FollowersTab({ onClose, followers, isPublic, onScrollBottom, followersTotal }: any) {

    useEffect(() => {
        console.log('🚀🚀🚀followers', followers);
    }, [followers])

    return (
        <InfiniteScroll
            dataLength={followers?.length}
            next={onScrollBottom}
            hasMore={followers.length < followersTotal || followersTotal === null}
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
                    <p className="font-normal text-xl">
                        {(followersTotal === 0) ? 'No followers available.' : 'No more followers'}
                    </p>
                </div>
            }
        >

            {isPublic ? followers?.map((follower: any) => (


                <PbulicFollowerUser
                    key={follower._id}
                    user={follower}
                    popupClose={onClose}
                    onRemoveClick={() => { }}
                />
            ))
                :

                followers?.map((follower: any) => (


                    <FollowerUser
                        key={follower._id}
                        user={follower}
                        popupClose={onClose}
                        onRemoveClick={() => { }}
                    />
                ))
            }
        </InfiniteScroll>
    );
}
