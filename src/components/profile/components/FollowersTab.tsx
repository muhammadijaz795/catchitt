import * as React from 'react';
import styles from './followersTab.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadFollowers } from '../../../redux/AsyncFuncs';
import User from './user';
export default function FollowersTab() {
    const followers = useSelector((state: any) => {
        console.log('state');
        console.log(state);
        return state.reducers?.profileSlice?.followers});
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(loadFollowers());
    }, [dispatch]);
 

    return (
        <>
            <div className={styles.div}>
                {followers?.map((follower: any) => (
                    <User key={follower._id} />
                ))}
            </div>
        </>
    );
}
