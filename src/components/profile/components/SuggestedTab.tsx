import { useDispatch, useSelector } from 'react-redux';
import styles from './suggestedTab.module.scss';
import React from 'react';

import SuggestedUser from './suggested-user';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';

function SuggestedTab({ loadMoreSuggestedAccount, onClose }: any) {

    const suggestedUsers = useSelector((state: any) => state?.reducers?.suggestedAccounts?.data);
    const totalSuggestion = useSelector((state: any) => state?.reducers?.suggestedAccounts?.total);
    // const dispatch = useDispatch();

    const onUnfollow = () => {
        console.log("on unfollow")
    }

    const onFolowClick = (user: any) => {
        // setClickedUser(user)
        // setUnfollowPopup(true);

        console.log("follow suggested user");
        console.log(user)
    }

    const onCancel = () => {
        // setUnfollowPopup(false);
    };


    return (
        <div className={styles.div}>
            <InfiniteScroll
                dataLength={suggestedUsers?.length}
                next={loadMoreSuggestedAccount}
                hasMore={suggestedUsers.length < totalSuggestion || totalSuggestion === null}
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
                            {(totalSuggestion === 0) ? 'No suggested account available.' : 'No more suggestion'}
                        </p>
                    </div>
                }
            >
                {suggestedUsers?.map((user: any) => (
                    <SuggestedUser key={user._id} user={user} onfollowClick={onFolowClick} popupClose={onClose} />
                ))}
            </InfiniteScroll>
            <div className={styles['div-border']} />
        </div>
    );
}

export default SuggestedTab;
