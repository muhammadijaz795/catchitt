import { useSelector } from 'react-redux';
import styles from './messageTab.module.scss';
import { CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { defaultAvatar } from '../../../icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { post } from '../../../axios/axiosClient';
function MessageTab({ friends, totalFriends, loadMoreFriends, onClose }: any) {
    
    const LoggedInUserId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handleMessage = async (userId: string) => {
        try {
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
                navigate(`/chat`);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                                onError={(e) => {
                                    (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                    (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                }}
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
                        <div onClick={() => handleMessage(friend?.followed_userID?._id)} className={styles['div-21']}>Message</div>
                    </div>
                    <div className={styles['div-border']} />
                </div>))}
        </InfiniteScroll>
    );
}

export default MessageTab;
