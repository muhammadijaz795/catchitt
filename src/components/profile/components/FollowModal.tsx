import React, { useEffect, useState } from 'react';
import styles from './followModal.module.scss';
import FollowingTab from './FollowingTab';
import FollowersTab from './FollowersTab';
import SuggestedTab from './SuggestedTab';
import MessageTab from './MessageTab';
import { useDispatch, useSelector } from 'react-redux';
import { loadFollowing } from '../../../redux/AsyncFuncs';
const API_KEY = process.env.VITE_API_URL;
interface Tab {
    name: string;
    content: JSX.Element;
}

const FollowModal: React.FC<{ onClose: () => void; isPublic: boolean; userId: any }> = ({
    onClose,
    isPublic,
    userId,
}) => {
    const name = useSelector((state: any) => state?.profile?.name);

    const totalFollowers = useSelector((state: any) => {
        return state.reducers?.followers.total;
    });

 
    const totalFollowing = useSelector((state: any) => state?.reducers?.followings?.total);
    const totalFriends = useSelector((state: any) => state?.friends?.total);
   
    const following = useSelector( (state:any )=>  state?.reducers?.followings?.data );
    const followers = useSelector((state: any) =>  state.reducers?.followers.data);
   
  
    const [loading, setLoading] = useState(false);
    const [publicFollowers, setPublicFollowers] = useState([]);
    const [publicFollowing, setPublicFollowings] = useState([]);

    const [totalFollowingPublic, setTotalFollowingPublic] = useState(0);
    const [totalFollowersPublic, setTotalFollowersPublic] = useState(0);

    const token = localStorage.getItem('token');
 

    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isPublic) {
                    const followersResponse = await fetch(
                        `${API_KEY}/profile/${userId}/followers`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const followingResponse = await fetch(
                        `${API_KEY}/profile/${userId}/following`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const followersData = await followersResponse.json();
                    const followingData = await followingResponse.json();

                    // console.log('followers data ');
                    // console.log(followersData);
                    // console.log('followingData data ');
                    // console.log(followingData);

                    // console.log("followersData?.total")
                    // console.log(followersData?.total)

                    // console.log("ollowingData?.total")
                    // console.log(followingData?.total)
               
                     
                    setPublicFollowers(followingData?.data?.data);
                    setPublicFollowings(followersData?.data?.data);
                    

                    setTotalFollowersPublic(followingData?.data?.total);
                    setTotalFollowingPublic(followersData?.data?.total);
                } else {

                     dispatch(loadFollowing());
                    // Use data from state
                    // setFollowers([]); // Set state with the data from Redux store if available
                    // setFollowings([]); // Set state with the data from Redux store if available
                    // setTotalFollowersPublic(totalFollowers); // Use the total from Redux store
                    // setTotalFollowingPublic(totalFollowing); // Use the total from Redux store
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [isPublic, userId]);

    const tabs: Tab[] = [
        {
            name: 'Following',
            content: (
                <>
                    <FollowingTab isPublic={isPublic} following={isPublic ? publicFollowers : following} onClose={onClose} />
                </>
            ),
        },
        {
            name: 'Followers',
            content: (
                <>
                    <FollowersTab isPublic={isPublic} followers={isPublic ? publicFollowing : followers} onClose={onClose} />
                </>
            ),
        },
        // Check if user is not public, then include the Friends tab
        ...(isPublic
            ? []
            : [
                  {
                      name: 'Friends',
                      content: (
                          <>
                              <MessageTab />
                          </>
                      ),
                  },
              ]),
        {
            name: 'Suggested',
            content: (
                <>
                    <SuggestedTab onClose={onClose} />
                </>
            ),
        },
    ];

    const [activeTab, setActiveTab] = useState(0);

    const onTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    return (
        <>
            <div className={styles.div}>
                <div className={styles['div-2']}>{name} </div>
                <div className={styles['div-3']}>
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => onTabClick(index)}
                            className={`${styles['div-4']} ${
                                activeTab === index && styles.activeTab
                            }`}
                        >
                         
                          <div className={styles['div-5']}>
                                {tab.name}{' '}
                                {index === 0
                                    ? isPublic
                                        ? totalFollowersPublic
                                        : totalFollowing // Display total following if user is not public
                                    : index === 1
                                    ? isPublic
                                        ? totalFollowingPublic
                                        : totalFollowers // Display total followers if user is not public
                                    : index === 2 && !isPublic // Only render totalFriends if user is not public
                                    ? totalFriends
                                    : ''}
                            </div>
                            <div className={styles['div-6']} />
                        </div>
                    ))}
                </div>
                <div className={styles.inputContainer}>
                    <input placeholder="Search" className={styles.input} />
                    <img src="/images/icons/profile.svg" alt="Profile Icon" />
                </div>
                {tabs[activeTab].content}
            </div>
        </>
    );
};

export default FollowModal;
