import React, { useEffect, useState } from 'react';
import whiteRightArrow from './svg-components/whiteRightArrow.svg';
import { useAuthStore } from '../../store/authStore';
import Layout from '../../shared/layout';

const Analytics = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const API_KEY = process.env.VITE_API_URL;
    const activityEndPoint = '/notification';
    const token = localStorage.getItem('token');
    const [startDate, setStartDate] = useState('02-1-2024');
    const [endDate, setEndDate] = useState('03-18-2024');
    const [videoViews, setVideoViews] = useState(0);
    const [profileViews, setProfileViews] = useState(0);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [shares, setShares] = useState(0);

    const currentTabToggler = () => {
        if (currentTab === 0) setCurrentTab(1);
        else setCurrentTab(0);
    };

    const getUserAnalytics = async () => {
        try {
            const response = await fetch(
                `${API_KEY}/analytics/user?startDate=${startDate}&endDate=${endDate}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            const data = res?.data;
            
            setVideoViews(data?.videoViews);
            setProfileViews(data?.profileViews);
            setLikes(data?.likes);
            setComments(data?.comments);
            setShares(data?.shares);
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };

    useEffect(() => {
        getUserAnalytics();
    }, []);

    return (
        <Layout>
            <div className="p-2">
                <div
                    onClick={currentTabToggler}
                    className="flex flex-row justify-between items-center mt-8 gap-5 px-4"
                >
                    <div className="flex justify-center items-center flex-col flex-1 cursor-pointer">
                        <p className="flex-1 text-pink-400 text-xl">Overview</p>
                        {currentTab === 0 && (
                            <div className="h-1 w-full bg-pink-500 mt-3 rounded" />
                        )}
                    </div>
                    <div className="flex justify-center items-center flex-col flex-1 cursor-pointer">
                        <p className="flex-1 text-pink-400 text-xl">Content</p>
                        {currentTab === 1 && (
                            <div className="h-1 w-full bg-pink-500 mt-3 rounded" />
                        )}
                    </div>
                </div>
                {currentTab === 0 ? (
                    <>
                        <div className="flex flex-row justify-between items-center mt-10 ml-1">
                            <p className="flex-1 font-bold text-lg text-left">May 06 - May 13</p>
                            <div className="border border-pink-400 flex-1 rounded">
                                <p className="p-1 text-pink-400">Last 7 days</p>
                            </div>
                        </div>
                        <div className="text-left mt-3 flex flex-row items-center w-fit gap-2 ml-1">
                            <h2 className="font-bold text-lg">Key Metrics</h2>
                            <div className="p-2 h-3 w-3 rounded-full border border-pink-400 flex justify-center items-center">
                                <p className="text-sm font-normal text-pink-500">i</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center mt-2 gap-4 cursor-pointer">
                            <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
                                <p className="text-white font-medium text-2xl">Video Views</p>
                                <p className="text-white font-bold text-xl mt-2">{videoViews}</p>
                            </div>
                            <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
                                <p className="text-white font-medium text-2xl">Profile Views</p>
                                <p className="text-white font-bold text-xl mt-2">{profileViews}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center mt-4 gap-4 cursor-pointer">
                            <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
                                <p className="text-white font-medium text-2xl">Likes</p>
                                <p className="text-white font-bold text-xl mt-2">{likes}</p>
                            </div>
                            <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
                                <p className="text-white font-medium text-2xl">Comments</p>
                                <p className="text-white font-bold text-xl mt-2">{comments}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center mt-4 mr-4 cursor-pointer">
                            <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
                                <p className="text-white font-medium text-2xl">Shares</p>
                                <p className="text-white font-bold text-xl mt-2">{shares}</p>
                            </div>
                        </div>
                        <div className="text-left mt-2 flex flex-row items-center w-fit gap-2 ">
                            <h2 className="font-medium text-xl mt-3">Video Views</h2>
                        </div>
                        <div className="mt-2 flex flex-row items-end justify-end">
                            <h2 className="font-medium text-xl mt-3">1</h2>
                        </div>
                        <div className="mt-2 flex flex-row items-center justify-between gap-2">
                            <p className="flex-1">
                                ------------------------------------------------------------------------------------------------------------
                            </p>
                            <h2 className="font-medium text-xl">0.5</h2>
                        </div>
                        <div className="mt-2 flex flex-row items-center justify-between gap-2">
                            <p className="flex-1">
                                ------------------------------------------------------------------------------------------------------------
                            </p>
                            <h2 className="font-medium text-xl">0</h2>
                        </div>
                        <div className="mt-2 flex flex-row items-center justify-between gap-2">
                            <p className="flex-1">
                                ------------------------------------------------------------------------------------------------------------
                            </p>
                            <h2 className="font-medium text-xl">-0.5</h2>
                        </div>
                        <div className="mt-2 flex flex-row items-center justify-between gap-2">
                            <p className="font-medium text-xl">0</p>
                            <h2 className="font-medium text-xl">-1</h2>
                        </div>
                        <div className="flex flex-row justify-between items-center mt-3">
                            <p className="font-medium text-xl ">For your inspiration</p>
                            <div className="flex flex-row items-center gap-1">
                                <p className="font-medium text-pink-500">View All</p>
                                <img
                                    className="text-pink-500 h-4 w-4"
                                    src={whiteRightArrow}
                                    alt=""
                                />
                            </div>
                        </div>
                        <p className="font-medium text-base text-left mt-2 text-gray-400">
                            Discover Trending videos similar to yours
                        </p>
                    </>
                ) : (
                    <>
                        <div className="mt-12">
                            <div className="text-left flex flex-row items-center w-fit gap-2 mt-4">
                                <h2 className="font-bold text-xl">Video posts</h2>
                                <div className="p-2 h-3 w-3 rounded-full border border-pink-400 flex justify-center items-center">
                                    <p className="text-sm font-normal text-pink-500">i</p>
                                </div>
                            </div>
                            <p className="font-medium text-lg text-left mt-3 text-gray-400">
                                You created 0 new posts in the last 7 days.
                            </p>
                            <div className="rounded-xl flex justify-center items-center bg-pink-500 w-fit py-2 px-3 mt-3 cursor-pointer">
                                <p className="text-white text-lg font-normal">Create post</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-400 h-[1px] rounded mt-6" />
                        <div className="mt-4">
                            <div className="text-left flex flex-row items-center w-fit gap-2 mt-4">
                                <h2 className="font-bold text-xl">Trending videos</h2>
                                <div className="p-2 h-3 w-3 rounded-full border border-pink-400 flex justify-center items-center">
                                    <p className="text-sm font-normal text-pink-500">i</p>
                                </div>
                            </div>
                            <p className="font-medium text-lg text-left mt-3 text-gray-400">
                                Last 7 days
                            </p>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Analytics;
