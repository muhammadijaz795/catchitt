import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { fetchInJSON } from '../../reusables/fetchInJSON';

function useHome() {
    const API_KEY = process.env.VITE_API_URL;
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = useAuthStore((state) => state.token);
    const [videoes, setvideoes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(2);

    const getForYouVideoes = async () => {
        setLoading(true);
        setvideoes([])
        try {
            let link = isLoggedIn
                ? `/media-content/videos/feed?page=1&pageSize=5`
                : `/media-content/public/videos/feed?page=1&pageSize=5`;

            const res = await fetchInJSON(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setvideoes(res?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const getFollowingVideoes = async () => {
        if (isLoggedIn) {
            setLoading(true);
            setvideoes([])
            try {
                const response = await fetch(
                    `${API_KEY}/media-content/videos/feed/?page=1&followingsuggestions=1`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const res = await response.json();
                setvideoes(res?.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        } else {
            navigate('/auth');
        }
    };

    useEffect(() => {
        getForYouVideoes();
    }, []);

    useEffect(() => {
        if (activeTab === 1) {
            getFollowingVideoes();
        } else if (activeTab === 2) {
            getForYouVideoes();
        } else {
            // live Feather
        }
    }, [activeTab]);

    return {
        loading,
        videoes,
        activeTab,
        setActiveTab,
    };
}

export default useHome;
