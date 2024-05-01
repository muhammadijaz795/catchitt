import { useDispatch, useSelector } from 'react-redux';
import styles from './suggestedTab.module.scss';
import React from 'react';
import { getRandomUsers } from '../../../redux/AsyncFuncs';
 
import SuggestedUser from './suggested-user';

function SuggestedTab({onClose}:any) {

    const suggestedUsers = useSelector((state:any) => state?.reducers?.suggestedAccounts);
    // const dispatch = useDispatch();

   

     
    const onUnfollow = () => {
        console.log("on unfollow")
    }
    
    const onFolowClick=(user:any)=>{
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
            {
                suggestedUsers?.map((user: any) => (
                <SuggestedUser key={user._id} user={user} onfollowClick={onFolowClick} popupClose={onClose} />
            ))}
                <div className={styles['div-border']} />
        </div>
    );
}

export default SuggestedTab;
