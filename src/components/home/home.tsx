import classNames from 'classnames';
import styles from './home.module.scss';
import { TopBar } from '../top-bar/top-bar';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { Post } from '../post/post';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ViewSwitchers } from '../view-switchers/view-switchers';
import { fetchInJSON } from '../reusables/fetchInJSON';
import { BookmarkItem } from '../post/postTypes'

export interface HomeProps {
    className?: string;
}

export const Home = ({ className }: HomeProps) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [postData, setPostData] = useState<any>([]);
    const [followingPostData, setFollowingPostData] = useState<any>([]);
    const [bookmarksData, setBookmarksData] = useState<BookmarkItem[]>([]);
    const endPoint = '/media-content/videos/feed';
    const token = useAuthStore((state) => state.token);
    const startedIds = useRef(new Set(''));
    const endedIds = useRef(new Set(''));

    useEffect(() => {
        handleFetchPosts();
        handleFetchUserBookmarks();
        // handleFetchFollowingPosts(); 
    }, []);

    const handleFetchPosts = useCallback(async () => {
        await fetchInJSON(
            `${endPoint}/?page=${1}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            (res) => setPostData((res as any).data as [])
        );
    }, []);

    const handleFetchUserBookmarks = useCallback(async () => {
        await fetchInJSON(
            `/profile/collection`,
            {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            },
            (res: any) => {
                setBookmarksData(res.data.data as BookmarkItem[]);
            }
        );
    }, []);

    // const handleFetchFollowingPosts = useCallback(async () => {
    //     await fetchInJSON(
    //         `${endPoint}/?page=${1}&followingsuggestions=1`,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         },
    //         (res) => setPostData((res as any).data as [])
    //     );
    // }, []);

    const handleFetchFollowingPosts = async () => {
        try {
            const response = await fetchInJSON(
                `${endPoint}/?page=${1}&followingsuggestions=1`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const followingData = (response as any).data as []; // Extract the data from the response
            setPostData(followingData); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching following posts:', error);
            throw error; // Rethrow the error to handle it further if needed
        }
    };


    // const filterPosts = (postData: Array<any>): any =>
    //     postData.filter((post: any) => {
    //         if (selectedTab === 0) {
    //             // "Following" tab is selected, show only the posts where post.user.isFollowed is true
    //             return postData;
    //         } else if (selectedTab === 1) {
    //             // "For You" tab is selected, add your logic here if needed
    //             return true; // Replace this with your specific condition for "For You" tab
    //         } else if (selectedTab === 2) {
    //             // "Live" tab is selected, add your logic here if needed
    //             return true; // Replace this with your specific condition for "Live" tab
    //         }
    //         return true; // Return true by default in case there are more tabs
    //     });

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    } else {
        return (
            <div className={classNames(styles.root, className)}>
                <div className={styles.topBarDiv}>
                    <TopBar />
                </div>
                <div className={styles.container}>
                    <div className={styles.leftSide}>
                        <div className={styles.sideNavDiv}>
                            <SideNavBar selectedIndex={0} />
                        </div>
                        <div className={styles.suggestedActivityDiv}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div>
                    <div className={styles.middleSectionDiv}>
                        <ViewSwitchers
                            className={styles.viewSwitchersDiv}
                            onTabChange={async (i) => {
                                setSelectedTab(i);
                                if (i === 0) {
                                    await handleFetchFollowingPosts(); // Fetch following posts when "Following" tab is selected
                                } else {
                                    await handleFetchPosts();
                                }
                                // Handle other tab conditions here if needed
                            }}
                        />

                        {bookmarksData.length > 0 && postData.map((p: any, i: any) => (
                            <Post
                                key={i}
                                post={p}
                                startedIds={startedIds}
                                endedIds={endedIds}
                                refetch={handleFetchPosts}
                                refetchBookmarks={handleFetchUserBookmarks}
                                isBookmarked={bookmarksData.find((item) => item.mediaId === p.mediaId) ? true : false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};
