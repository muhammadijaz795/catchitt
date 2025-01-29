import { createAsyncThunk } from '@reduxjs/toolkit';
import { del, get, post } from '../axios/axiosClient';

const API_KEY = process.env.VITE_API_URL;
const userId: any = localStorage.getItem('userId');

export const followingsMethod: any = createAsyncThunk(
    'get/profile/followings',
    async (id?: string) => {
        try {
            if (id) {
                let res = await post(`/profile/follow/${id}/`);
            }
            const response = await get(`/profile/${userId}/followers`);

            if (response?.data?.data) {
                const responseData = response?.data;
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

export const getHomeVideos: any = createAsyncThunk(
    'get/foryou/videos',
    async ({ tab, token, page=1 }: { tab: number; token: string, page: number }) => {
        const isAuthenticRequest = token && userId;
        let link =  `/media-content${isAuthenticRequest?'':'/public'}/videos/feed${isAuthenticRequest?'':'/upgraded'}?page=${page}${tab===1?'&followingsuggestions=1':''}&pageSize=10`;
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
    }
);

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


export const addMoreVideos: any = createAsyncThunk(
    'get/foryou/add-more-videos',
    async ({ tab, token, page=2 }: { tab: number; token: string, page: number }) => {
        const isAuthenticRequest = token && userId;
        let link =  `/media-content${isAuthenticRequest?'':'/public'}/videos/feed${isAuthenticRequest?'':'/upgraded'}?page=${page}${tab===1?'&followingsuggestions=1':''}&pageSize=10`;
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
    }
);

export const getUpdatedVideoState: any = createAsyncThunk(
    'get/updated/video/state',
    async ({id, isAuthentic}:{id:string,isAuthentic:boolean}) => {
        try {
            let identifier = isAuthentic ? 'videos' : 'public/videos';
            const res = await get(`/media-content/${identifier}/${id}`);
            if (res?.data?.data) {
                return res?.data?.data;
            } else {
                return {};
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const videoNotInterestedHandle: any = createAsyncThunk(
    'get/not-interested/video',
    async (postMediaId: string) => {
        try {
            const res = await post(`media-content/mark-as-not-interested/${postMediaId}`);

            if (res?.data) {
                    return { id:postMediaId };
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const videoRepostHandle: any = createAsyncThunk(
    'set/repost/video',
    async (postMediaId: string) => {
        try {
            const res = await post(`/media-content/repost/${postMediaId}`);

            if (res?.data) {
                return res?.data;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const getRandomUsers: any = createAsyncThunk('get/random/users', async (page) => {
    try {
        const response = await fetch(`${API_KEY}/profile/public/suggested-users?page=${page}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData.data;
        } else {
            console.log(response);
        }
    } catch (error) {
        console.error();
    }
});

export const getFriends: any = createAsyncThunk('get/friends', async (page:number) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(
                `${API_KEY}/profile/${userId}/friends?page=${page}&pagesize=10`,
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
                return responseData.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});

export const loadFollowers: any = createAsyncThunk('get/profileSlice/followers', async (page:number) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/following?page=${page}&pageSize=10`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                return responseData.data;
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
                return responseData.data.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});

export const loadFollowing: any = createAsyncThunk('get/profileSlice/following', async (page:number) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/followers?page=${page}&pageSize=10`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                return responseData.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});

export const refreshFollowing: any = createAsyncThunk('get/profileSlice/refresh/following', async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(`${API_KEY}/profile/${userId}/followers?page=1&pageSize=10`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                return responseData.data;
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
                return responseData.data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    }
});