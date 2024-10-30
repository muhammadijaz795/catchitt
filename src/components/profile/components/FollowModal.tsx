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

const FollowModal: React.FC<{ openTab: string, onClose: () => void; isPublic: boolean; userId: any }> = ({
    openTab,
    onClose,
    isPublic,
    userId,
}) => {
    const name = useSelector((state: any) => state?.reducers?.profile?.name);

    const totalFollowers = useSelector((state: any) => {
        return state.reducers?.followers.total;
    });

    const followers = useSelector((state: any) => state.reducers?.followers.data);

    const totalFollowing = useSelector((state: any) => state?.reducers?.profileSlice?.followingTotal);
    const totalFriends = useSelector((state: any) => state?.reducers?.profileSlice?.friendsTotal);

    const following = useSelector((state: any) => state?.reducers?.profileSlice?.following);
    const friends = useSelector((state: any) => state?.reducers?.profileSlice?.friends);

    const [loading, setLoading] = useState(false);
    const [publicFollowers, setPublicFollowers] = useState([]);
    const [publicFollowing, setPublicFollowings] = useState([]);

    const [totalFollowingPublic, setTotalFollowingPublic] = useState(0);
    const [totalFollowersPublic, setTotalFollowersPublic] = useState(0);

    const token = localStorage.getItem('token');

    const dispatch = useDispatch();

    const [followingPage, setFollowingPage] = useState(1);
    const [followersPage, setFollowersPage] = useState(1);
    const [friendPage, setFriendPage] = useState(1);
    const [suggestedPage, setSuggestedPage] = useState(1);
    const loadMoreFollorwing = () => {
        console.log('loadMoreFollorwing 💕💕💕💕💕');
        setFollowingPage(followingPage + 1);
        // Fetch more data for the next page
    };
    const loadMoreFollowers = () => {
        setFollowersPage(followersPage + 1);
        // Fetch more data for the next page
    };
    const loadMoreFriends = () => {
        setFriendPage(friendPage + 1);
        // Fetch more data for the next page
    };
    const loadMoreSuggestedAccount = () => {
        setSuggestedPage(suggestedPage + 1);
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

                    if (followingPage == 1 || totalFollowersPublic > publicFollowers.length) {
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
                        if (followingPage == 1) {
                            setTotalFollowersPublic(followingData?.data?.total || 0);
                        }
                    }
                } else {
                    dispatch(loadFollowing(followingPage));
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
                    if (followersPage == 1 || totalFollowingPublic > publicFollowing.length) {
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

                        setPublicFollowings(
                            publicFollowing.concat(followingData?.data?.data || [])
                        );
                        if (followersPage == 1) {
                            setTotalFollowingPublic(
                                totalFollowingPublic + (followingData?.data?.total || 0)
                            );
                        }
                    }
                } else {
                    dispatch(loadFollowers(followersPage));
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [isPublic, userId, followersPage]);

    useEffect(() => {
        if (!isPublic) {
            dispatch(getFriends(friendPage));
        }
    }, [isPublic, friendPage])

    useUpdateEffect(() => {
        dispatch(getRandomUsers(suggestedPage));
    }, [isPublic, suggestedPage])


    const tabs: Tab[] = [
        {
            name: 'Following',
            content: (
                <>
                    <FollowingTab
                        onScrollBottom={loadMoreFollorwing}
                        isPublic={isPublic}
                        following={isPublic ? publicFollowers : following}
                        onClose={onClose}
                        followingTotal={totalFollowing}
                    />
                </>
            ),
        },
        {
            name: 'Followers',
            content: (
                <>
                    <FollowersTab
                        onScrollBottom={loadMoreFollowers}
                        isPublic={isPublic}
                        followers={isPublic ? publicFollowing : followers}
                        onClose={onClose}
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
                        loadMoreSuggestedAccount={loadMoreSuggestedAccount}
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
                <span className={styles['div-2']}>{name} </span>
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
