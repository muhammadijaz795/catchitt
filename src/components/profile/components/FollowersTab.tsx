import React, { useEffect, useState } from 'react';
import styles from './followersTab.module.scss';
import FollowerUser from './follower-user';
import PbulicFollowerUser from '../public-profile-components/follower-user';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { API_KEY } from '../../../utils/constants';

interface PrivacySettings {
    shareMedia: boolean;
    downloadMedia: boolean;
    viewFollowing: boolean;
    viewFollowers: boolean;
    viewLikedVideos: boolean;
    messages: boolean;
    activityStatus: boolean;
    viewProfileVisits: boolean;
    disallowScreenshot: boolean;
}

export default function FollowersTab({ onClose, followers, isPublic, onScrollBottom, followersTotal }: any) {

    const [privacySettingsData, setPrivacySettingsData] = useState<PrivacySettings>();
    const token = localStorage.getItem('token');

    const handleFetchPrivacySettings = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/privacy-settings`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                setPrivacySettingsData(responseData.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchPrivacySettings();
    }, [followers])

    return (
        privacySettingsData? (privacySettingsData.viewFollowers === false? <div className="flex justify-center items-center mt-3">
            <span className="font-bold text-xl">
                User has disabled showing followers.
            </span>
        </div> :
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
                    <p className="font-bold text-xl">
                        {(followersTotal === 0) && 'No followers available.'}
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
        </InfiniteScroll>) : <div className="flex justify-center items-center mt-3">
            <p className="text-dark font-bold text-xl">
                <CircularProgress />
            </p>
        </div>
    );
}
