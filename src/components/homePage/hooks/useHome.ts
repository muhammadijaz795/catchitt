import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, getHomeVideos } from '../../../redux/AsyncFuncs';
import { updateHomeVideos } from '../../../redux/reducers';
import { useAuthStore } from '../../../store/authStore';

function useHome() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(2);
    const auth: any = useAuthStore((store: any) => store)
    // @ts-ignore
    const videos = useSelector((store) => store.reducers.homeVideos)
    const dispatch = useDispatch()

    const getHomeVideoes = async () => {
        setLoading(true);
        dispatch(getHomeVideos(activeTab)).then(() => setLoading(false))
    };

    useEffect(() => {
        getHomeVideoes()
        dispatch(fetchProfile());
    }, []);

    useEffect(() => {
        if (!isLoggedIn && activeTab === 1) {
            dispatch(updateHomeVideos([]))
        } else {
            if (!loading && isLoggedIn) {
                setLoading(true);
                dispatch(getHomeVideos(activeTab)).then(() => setLoading(false))
            }
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 1) {
            dispatch(updateHomeVideos([]))
        }
    }, [auth])

    return {
        loading,
        activeTab,
        setActiveTab,
        videos
    };
}

export default useHome;
