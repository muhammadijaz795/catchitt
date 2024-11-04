import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeVideos } from '../../../redux/AsyncFuncs';
import { updateHomeVideos } from '../../../redux/reducers';

function useHome({ tabIndex }: any) {
    const isLoggedIn = localStorage.getItem('token');
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(tabIndex);
    const [isFollowing, setIsFollowing] = useState(false);
    const auth: any = useSelector((store: any) => store?.reducers?.profile);
    // @ts-ignore
    const videos = useSelector((store) => store.reducers.homeVideos);
    const dispatch = useDispatch();
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const getHomeVideoes = async () => {
        setLoading(true);
        dispatch(getHomeVideos({tab : activeTab, token, page: 1})).then(() => setLoading(false));
    };

    useEffect(() => {
        getHomeVideoes();
        getFollowingList();
    }, []);

    const getFollowingList = async () => {
        try {
            const response: any = await fetch(`${API_KEY}/profile/${auth?._id}/followers/`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data }: any = await response.json();
            if (data?.data?.length > 0) setIsFollowing(true);
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        if (!isLoggedIn && activeTab === 1) {
            dispatch(updateHomeVideos([]));
        } else if (!isLoggedIn && activeTab === 2) {
            getHomeVideoes();
        } else {
            if (!loading && isLoggedIn) {
                getHomeVideoes();
            }
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 1) {
            dispatch(updateHomeVideos([]));
        }
    }, [auth]);

    return {
        loading,
        activeTab,
        setActiveTab,
        videos,
        isFollowing,
    };
}

export default useHome;
