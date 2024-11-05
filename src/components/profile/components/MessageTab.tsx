import { useSelector } from 'react-redux';
import styles from './messageTab.module.scss';
import { CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { defaultAvatar } from '../../../icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
function MessageTab({ friends, totalFriends, loadMoreFriends, onClose }: any) {
    useEffect(() => {
        console.log('🚀🚀🚀friends', friends, totalFriends);
    }, [])
    
    return (
        <InfiniteScroll
            dataLength={friends?.length}
            next={loadMoreFriends}
            hasMore={friends.length < totalFriends || totalFriends === null}
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
                    <p className="text-xl font-bold">
                        {(totalFriends === 0) && 'No friends available.'}
                    </p>
                </div>
            }
        >
            {friends?.map((friend: any) => (
                <div key={friend._id} className={styles.div}>
                    <div className={styles['div-18']}>
                        <div className={styles['div-19']}>
                            <img
                                loading="lazy"
                                srcSet={friend?.followed_userID?.avatar || defaultAvatar}
                                className={styles['img-2']}
                            />
                            <Link
                                onClick={() => {
                                    console.log('afff');
                                    onClose();
                                }}
                                to={'/profile/' + friend?.followed_userID?.username}
                            >
                                <span className={styles['div-20']}>{friend?.followed_userID?.name}</span>
                            </Link>
                        </div>
                        <div className={styles['div-21']}>Message</div>
                    </div>
                    <div className={styles['div-border']} />
                </div>))}
        </InfiniteScroll>
    );
}

export default MessageTab;
