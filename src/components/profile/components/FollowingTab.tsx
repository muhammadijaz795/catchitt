import { useDispatch, useSelector } from 'react-redux';
import styles from './followingTab.module.scss';
import User from './user';
import { loadFollowing } from '../../../redux/AsyncFuncs';
import React from 'react';
function FollowingTab() {
    const following = useSelector((state: any) => {
        return state.reducers?.profileSlice?.following});
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(loadFollowing());
    }, [dispatch]);
     

     
    return (
        <div className={styles.div}>
            {
                following?.map((user: any) => (
                    <User key={user._id} user={user} />
                ))
            }
             
        </div>
    );
}

export default FollowingTab;
