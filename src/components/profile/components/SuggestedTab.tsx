import { useDispatch, useSelector } from 'react-redux';
import styles from './suggestedTab.module.scss';
import React, { useMemo } from 'react';
import SuggestedUser from './suggested-user';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import { getRandomUsers } from '../../../redux/AsyncFuncs';

function SuggestedTab({ onClose, searchQuery }: any) {
    const dispatch = useDispatch();

    const suggestedUsers = useSelector((state: any) => state.reducers?.suggestedAccounts?.data);
    const suggestedPage = useSelector((state: any) => state.reducers?.suggestedAccounts?.page);
    const totalSuggestion = useSelector((state: any) => state.reducers?.suggestedAccounts?.total);

    const following = useSelector((state: any) => state.reducers?.profileSlice?.following);

    const loadMoreSuggestedAccount = () => {
        dispatch(getRandomUsers(suggestedPage));
    };

    // ✅ Extract only the followed user IDs for comparison
    const followedUserIds = useMemo(() => {
        return following?.map((f: any) => f.followed_userID?._id) || [];
    }, [following]);

    // ✅ Filter suggested users: 1) not already followed, 2) match search
    const filteredSuggestedUsers = useMemo(() => {
        return (suggestedUsers || [])
            .filter((user: any) => !followedUserIds.includes(user._id))
            .filter((user: any) => user?.name?.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [suggestedUsers, followedUserIds, searchQuery]);

    return (
        <div className={styles.div}>
            <InfiniteScroll
                dataLength={filteredSuggestedUsers.length}
                next={loadMoreSuggestedAccount}
                hasMore={suggestedUsers.length < totalSuggestion || totalSuggestion === null}
                loader={
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                        <CircularProgress />
                    </div>
                }
                scrollableTarget="ModalscrollableDiv"
                endMessage={
                    <div className="flex flex-row justify-center items-center mt-3">
                        <p className="font-normal text-xl">
                            {totalSuggestion === 0 ? 'No suggested account available.' : 'No more suggestions.'}
                        </p>
                    </div>
                }
            >
                {filteredSuggestedUsers.map((user: any) => (
                    <SuggestedUser key={user._id} user={user} onfollowClick={() => {}} popupClose={onClose} />
                ))}
            </InfiniteScroll>
            <div className={styles['div-border']} />
        </div>
    );
}

export default SuggestedTab;
