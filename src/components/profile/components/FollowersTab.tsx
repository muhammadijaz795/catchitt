import * as React from 'react';
import styles from './followersTab.module.scss';
  
import FollowerUser from './follower-user';
import PbulicFollowerUser from '../public-profile-components/follower-user';
export default function FollowersTab({onClose, followers, isPublic,onScrollBottom}:any) {
    
    
    console.log("followers")
    console.log(followers)

    const handleScroll = (e: any) => {
        // console.log("handle scroll");
        // console.log(e.target.scrollHeight - e.target.scrollTop);
        // console.log("height", e.target.clientHeight);

        // Adjusted calculation with a small threshold
        const threshold = 1;
        const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + threshold;

        if (bottom) {
            onScrollBottom();
        }
    };
    return (
        <>
            <div  style={{
           
            overflowY:'scroll',
        }}  className={styles.div} onScroll={handleScroll}>

                
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
