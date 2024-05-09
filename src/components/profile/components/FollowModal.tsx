import React, { useEffect, useState } from 'react';
import styles from './followModal.module.scss';
import FollowingTab from './FollowingTab';
import FollowersTab from './FollowersTab';
import SuggestedTab from './SuggestedTab';
import MessageTab from './MessageTab';
import { useDispatch, useSelector } from 'react-redux';
import { loadFollowers, loadFollowing } from '../../../redux/AsyncFuncs';
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

    const followers = useSelector((state: any) =>  state.reducers?.followers.data);
 
    const totalFollowing = useSelector((state: any) => state?.reducers?.followings?.total);
    const totalFriends = useSelector((state: any) => state?.friends?.total);
   
    const following = useSelector( (state:any )=>  state?.reducers?.followings?.data );
    
  
    const [loading, setLoading] = useState(false);
    const [publicFollowers, setPublicFollowers] = useState([]);
    const [publicFollowing, setPublicFollowings] = useState([]);

    const [totalFollowingPublic, setTotalFollowingPublic] = useState(0);
    const [totalFollowersPublic, setTotalFollowersPublic] = useState(0);

    const token = localStorage.getItem('token');
 

    const dispatch = useDispatch();

     const [followingPage, setFollowingPage] = useState(1);
     const [followersPage, setFollowersPage] = useState(1);
                                                 
    const loadMoreFollorwing = () => {
        console.log("reached bottom load more following..")
        setFollowingPage(followingPage + 1);
        // Fetch more data for the next page
    };                                          
    const loadMoreFollowers = () => {
        console.log("reached bottom load more followers..")
        setFollowersPage(followersPage + 1);
        // Fetch more data for the next page
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isPublic ) {
                    // console.log("totalFollowersPublic")
                    // console.log(totalFollowersPublic)
                    // console.log("publicFollowers")
                    // console.log(publicFollowers.length)

                    if( followingPage ==1 ||  totalFollowersPublic > publicFollowers.length){ 
                        
                        const followingResponse = await fetch(
                            // `${API_KEY}/profile/${userId}/following?page=${followingPage}&pageSize=10`,
                            `${API_KEY}/profile/${userId}/following?page=${followingPage}&pageSize=10`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );


                        const followingData = await followingResponse.json();

                        setPublicFollowers(publicFollowers.concat(followingData?.data?.data || []));
                       if(followingPage ==1){
                        setTotalFollowersPublic(followingData?.data?.total || 0);
                        
                       }
                        
                    }
                } else {
                    
                    dispatch(loadFollowing());
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [isPublic, userId, followingPage]);


     useEffect(() => {
        const fetchData = async () => {
            try {
                if (isPublic) {
                    if( followersPage ==1 ||  totalFollowingPublic > publicFollowing.length){ 
                        const followersResponse = await fetch(
                            `${API_KEY}/profile/${userId}/followers?page=${followersPage}&pageSize=10`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                    
                        const followingData = await followersResponse.json();

                        // console.log('followers data ');
                        // console.log(followersData);
                        // console.log('followingData data ');
                        // console.log(followingData);

                        // console.log("followersData?.total")
                        // console.log(followersData?.total)

                        // console.log("ollowingData?.total")
                        // console.log(followingData?.total)
                
                        
                        setPublicFollowings(publicFollowing.concat(followingData?.data?.data || []));
                        if(followersPage == 1){
                            setTotalFollowingPublic(
                                totalFollowingPublic + (followingData?.data?.total || 0)
                            );
                        }
                    }
                     
                } else {

                     dispatch(loadFollowers());
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [isPublic, userId, followersPage]);

    const tabs: Tab[] = [
        {
            name: 'Following',
            content: (
                <>
                                                                    
                                                                 
                    <FollowingTab onScrollBottom={loadMoreFollorwing} isPublic={isPublic} following={isPublic ? publicFollowers : following} onClose={onClose} />
                </>
            ),
        },
        {
            name: 'Followers',
            content: (
                <>
                    <FollowersTab  onScrollBottom={loadMoreFollowers} isPublic={isPublic} followers={isPublic ? publicFollowing : followers} onClose={onClose} />
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
