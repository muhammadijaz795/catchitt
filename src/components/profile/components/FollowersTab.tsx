import * as React from 'react';
import styles from './followersTab.module.scss';
  
import FollowerUser from './follower-user';
import PbulicFollowerUser from '../public-profile-components/follower-user';
export default function FollowersTab({onClose, followers, isPublic}:any) {
    
    
    console.log("followers")
    console.log(followers)

    return (
        <>
            <div className={styles.div}>

                
                {isPublic ?   followers?.map((follower: any) => (

                    
                    <PbulicFollowerUser
                        key={follower._id}
                        user={follower}
                        popupClose={onClose}
                        onRemoveClick={() => {}}
                    />
                ))
                :

                followers?.map((follower: any) => (

                    
                    <FollowerUser
                        key={follower._id}
                        user={follower}
                        popupClose={onClose}
                        onRemoveClick={() => {}}
                    />
                ))
                }
            </div>
        </>
    );
}
