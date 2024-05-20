import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../axios/axiosClient';

const API_KEY = process.env.VITE_API_URL;
const token: any = localStorage.getItem('token');
const userId: any = localStorage.getItem('userId');

export const followingsMethod: any = createAsyncThunk(
    'get/profile/followings',
    async (id?: string) => {
        try {
            if (id) {
                let res = await post(`/profile/follow/${id}/`);
                console.log('follow action res public profile');
                console.log(res);
            }
            const response = await get(`/profile/${userId}/followers`);

            if (response?.data?.data) {
                const responseData = response?.data;
                console.log('following list public profile');
                console.log(responseData);
                return responseData?.data;
            } else {
                return {};
            }
        } catch (error) {
            alert('Somthing went wrong');
            console.log(error);
        }
    }
);

export const getHomeVideos: any = createAsyncThunk('get/foryou/videos', async (tab: number) => {
    let link: string = '';
    if (tab === 1) {
        link = `/media-content/videos/feed/?page=1&followingsuggestions=1`;
    } else if (tab === 2) {
        link =
            token && userId
                ? `/media-content/videos/feed?page=1&pageSize=5`
                : `/media-content/public/videos/feed?page=1&pageSize=5`;
    } else {
        console.log('Live Tab');
    }
    try {
        if (tab === 1 || tab === 2) {
            const res = await get(link);
            if (res?.data?.data) {
                const responseData = res?.data;
                return responseData?.data;
            } else {
                return {};
            }
        }
    } catch (error) {
        console.log(error);
    }
});

export const videoLikehandle: any = createAsyncThunk(
    'get/like/video',
    async (id: string, searchScreenTab?: any) => {
        try {
            const res = await post(`/media-content/like/${id}`);

            if (res?.data) {
                if (searchScreenTab) {
                    return { id, tab: searchScreenTab };
                }
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const videoSavehandle: any = createAsyncThunk(
    'get/save/video',
    async (id: string, searchScreenTab?: any) => {
        try {
            const res = await post(`/media-content/collections/${id}`);

            if (res?.data) {
                if (searchScreenTab) {
                    return { id, tab: searchScreenTab };
                }
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const commentMethod: any = createAsyncThunk(
    'get/comment/video',
    async ({ text, info, replyId }: any) => {
        if (replyId) {
            const payload = {
                comment: text,
                commentId: replyId,
            };
            try {
                const finalRes: any = await post(`/media-content/comment/${info.mediaId}`, {
                    data: payload,
                });
                if (replyId) {
                    return { res: finalRes?.data?.data, info: info, replyId };
                } else {
                    return { res: finalRes?.data?.data, info: info };
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            const payload = {
                comment: text,
            };

            try {
                const finalRes: any = await post(`/media-content/comment/${info.mediaId}`, {
                    data: payload,
                });
                if (finalRes?.data?.data) {
                    if (replyId) {
                        return { res: finalRes?.data?.data, info: info, replyId };
                    } else {
                        return { res: finalRes?.data?.data, info: info };
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
);

export const getRandomUsers: any = createAsyncThunk('get/random/users', async () => {
    try {
        const response = await fetch(`${API_KEY}/profile/public/suggested-users?page=1`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData.data.data;
        } else {
            console.log(response);
        }
    } catch (error) {
        console.error();
    }
});

export const getFriends: any = createAsyncThunk('get/friends', async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(
                `${API_KEY}/profile/${userId}/friends?page=1&pagesize=10`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const responseData = await response.json();
                return responseData.data.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});

export const loadFollowers: any = createAsyncThunk('get/profileSlice/followers', async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/following`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('loadFOllowers');
                console.log(responseData);
                return responseData.data.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});

export const loadLikes: any = createAsyncThunk('get/profile/likes', async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/following`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('loadFOllowers');
                console.log(responseData);
                return responseData.data.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});

export const loadFollowing: any = createAsyncThunk('get/profileSlice/following', async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/followers`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('loadFollowing');
                console.log(responseData);
                return responseData.data.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});

export const getProfileData: any = createAsyncThunk('get/getProfileData', async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(`${API_KEY}/profile/`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('getting profile data');
                console.log(responseData.data);
                return responseData.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});
