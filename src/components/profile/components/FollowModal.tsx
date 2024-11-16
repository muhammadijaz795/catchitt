import React, { useEffect, useState } from 'react';
import styles from './followModal.module.scss';
import FollowingTab from './FollowingTab';
import FollowersTab from './FollowersTab';
import SuggestedTab from './SuggestedTab';
import MessageTab from './MessageTab';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, getRandomUsers, loadFollowers, loadFollowing } from '../../../redux/AsyncFuncs';
import { useUpdateEffect } from 'react-use';
const API_KEY = process.env.VITE_API_URL;
interface Tab {
    name: string;
    content: JSX.Element;
}

const FollowModal: React.FC<{ openTab: string | null, onClose: () => void; isPublic: boolean; userId: any }> = ({
    openTab,
    onClose,
    isPublic,
    userId,
}) => {
    const name = useSelector((state: any) => state?.reducers?.profile?.name);

    const followers = useSelector((state: any) => state.reducers?.followers.data);
    const followersPage = useSelector((state: any) => state?.reducers?.followers?.page);
    const totalFollowers = useSelector((state: any) =>state.reducers?.followers.total);
    
    const following = useSelector((state: any) => state?.reducers?.profileSlice?.following);
    const followingPage = useSelector((state: any) => state?.reducers?.profileSlice?.followingPage);
    const totalFollowing = useSelector((state: any) => state?.reducers?.profileSlice?.followingTotal);
    
    const friends = useSelector((state: any) => state?.reducers?.profileSlice?.friends);
    const friendPage = useSelector((state: any) => state?.reducers?.profileSlice?.friendsPage);
    const totalFriends = useSelector((state: any) => state?.reducers?.profileSlice?.friendsTotal);

    const [publicFollowers, setPublicFollowers] = useState<any[]>([]);
    const [publicFollowing, setPublicFollowings] = useState<any[]>([]);

    const [totalFollowingPublic, setTotalFollowingPublic] = useState(null);
    const [totalFollowersPublic, setTotalFollowersPublic] = useState(null);

    const token = localStorage.getItem('token');

    const dispatch = useDispatch();

    const [publicFollowingPage, setPublicFollowingPage] = useState(1);
    const [publicFollowersPage, setPublicFollowersPage] = useState(1);
    // const [publicFriendPage, setPublicFriendPage] = useState(1);

    const loadMoreFollorwing = () => {
        console.log('loadMoreFollorwing 💕💕💕💕💕');
        if (!isPublic) {
            if (totalFollowing === null || following.length < totalFollowing) dispatch(loadFollowing(followingPage));
        } else {
            setPublicFollowingPage(publicFollowingPage + 1);
        }
        // Fetch more data for the next page
    };
    const loadMoreFollowers = () => {
        if (!isPublic) {
            if (totalFollowers === null || followers.length < totalFollowers) dispatch(loadFollowers(followersPage));
        } else {
            setPublicFollowersPage(publicFollowersPage + 1);
        }
        // Fetch more data for the next page
    };

    const loadMoreFriends = () => {
        dispatch(getFriends(friendPage));
        // Fetch more data for the next page
    };

    const [darkTheme, setdarkTheme] = useState<any>(null);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isPublic) {
                    // console.log("totalFollowersPublic")
                    // console.log(totalFollowersPublic)
                    // console.log("publicFollowers")
                    // console.log(publicFollowers.length)

                    if (totalFollowersPublic === null ||totalFollowersPublic > publicFollowers.length) {
                        const followingResponse = await fetch(
                            // `${API_KEY}/profile/${userId}/following?page=${followingPage}&pageSize=10`,
                            `${API_KEY}/profile/${userId}/followers?page=${publicFollowersPage}&pageSize=10`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        const followingData = await followingResponse.json();
                        console.log('following data 🚀🚀🚀🚀', followingData.data);
                        setPublicFollowers(prev => [...prev, ...followingData?.data?.data]);
                        setTotalFollowersPublic(followingData?.data?.total || 0);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [isPublic, userId, publicFollowersPage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isPublic) {
                    if (totalFollowingPublic === null || totalFollowingPublic > publicFollowing.length) {
                        const followersResponse = await fetch(
                            `${API_KEY}/profile/${userId}/following?page=${publicFollowingPage}&pageSize=10`,
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
                        console.log('followers data 🚀🚀🚀🚀', followingData.data);
                        setPublicFollowings(prev => [...prev, ...followingData?.data?.data]);
                        setTotalFollowingPublic(followingData?.data?.total || 0);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [isPublic, userId, publicFollowingPage]);

    useEffect(() => {
       console.log("opentab 🚀🚀🚀", openTab)
    }, [openTab])
    
    useEffect(() => {
        if (totalFollowing === null) dispatch(loadFollowing(1));
        if (totalFollowers === null) dispatch(loadFollowers(1));
        if (totalFriends === null) dispatch(getFriends(1));
      return () => {
        setPublicFollowers([]);
        setPublicFollowings([]);
      }
    }, [])
    

    const tabs: Tab[] = [
        {
            name: 'Following',
            content: (
                <>
                    <FollowingTab
                        onScrollBottom={loadMoreFollorwing}
                        isPublic={isPublic}
                        following={isPublic ? publicFollowing : following}
                        onClose={onClose}
                        followingTotal={isPublic? totalFollowingPublic :totalFollowing}
                    />
                </>
            ),
        },
        {
            name: 'Followers',
            content: (
                <>
                    <FollowersTab
                        onClose={onClose}
                        followers={isPublic ? publicFollowers : followers}
                        isPublic={isPublic}
                        onScrollBottom={loadMoreFollowers}
                        followersTotal={isPublic? totalFollowersPublic : totalFollowers}
                    />
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
                            <MessageTab
                                friends={friends}
                                totalFriends={totalFriends}
                                loadMoreFriends={loadMoreFriends}
                                onClose={onClose}
                            />
                        </>
                    ),
                },
            ]),
        {
            name: 'Suggested',
            content: (
                <>
                    <SuggestedTab
                        onClose={onClose}
                    />
                </>
            ),
        },
    ];

    const [activeTab, setActiveTab] = useState(openTab === 'following' ? 0 : 1);

    const onTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    return (
        <>
            <div className={`${styles.div} overflow-y-auto  no-scrollbar ${darkTheme}`} id="ModalscrollableDiv">
                <span className={styles['div-2']}>{name}</span>
                <div className={styles['div-3']}>
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => onTabClick(index)}
                            className={`${styles['div-4']} ${activeTab === index && styles.activeTab
                                }`}
                        >
                            <div className={styles['div-5']}>
                                {tab.name}{' '}
                                {index === 0
                                    ? isPublic
                                        ? totalFollowingPublic
                                        : totalFollowing // Display total following if user is not public
                                    : index === 1
                                        ? isPublic
                                            ? totalFollowersPublic
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
