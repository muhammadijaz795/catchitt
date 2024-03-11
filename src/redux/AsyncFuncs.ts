import { createAsyncThunk } from "@reduxjs/toolkit";
const API_KEY = process.env.VITE_API_URL;
const token: any = localStorage.getItem('token')
const userId: any = localStorage.getItem('_id')


export const fetchProfile: any = createAsyncThunk("get/profile/data", async () => {
    try {
        const res: any = await fetch(`${API_KEY}/profile`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
        const resData: any = await res.json()
        if (resData.status === 200) {
            return resData?.data
        } else {
            return {
                message: 'Something went wrong'
            }
        }

    } catch (error: any) {
        console.log(error);
    }
});

export const followingsMethod: any = createAsyncThunk("get/profile/followings", async (id?
    : string) => {
    try {
        if (id) {
            const res = await fetch(`${API_KEY}/profile/follow/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        const response = await fetch(`${API_KEY}/profile/${userId}/followers`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData?.data
        } else {
            return {}
        }
    } catch (error) {
        alert('Somthing went wrong');
        console.log(error);
    }
});

export const getHomeVideos: any = createAsyncThunk("get/foryou/videos", async (tab: number) => {
    let link: string = ''
    if (tab === 1) {
        link = `${API_KEY}/media-content/videos/feed/?page=1&followingsuggestions=1`
    } else if (tab === 2) {
        link = token && userId
            ? `${API_KEY}/media-content/videos/feed?page=1&pageSize=5`
            : `${API_KEY}/media-content/public/videos/feed?page=1&pageSize=5`;
    } else {
        console.log('Live Tab');
    }
    try {
        if (tab === 1 || tab === 2) {

            const res: any = await fetch(link, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const responseData = await res.json();
                return responseData?.data
            } else {
                return {}
            }
        }
    } catch (error) {
        console.log(error);
    }
});

export const videoLikehandle: any = createAsyncThunk("get/like/video", async (id: string, searchScreenTab?: any) => {
    try {
        const res = await fetch(`${API_KEY}/media-content/like/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            if (searchScreenTab) {
                return { id, tab: searchScreenTab }
            }
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
});

export const commentMethod: any = createAsyncThunk("get/comment/video", async ({ text, info, replyId }: any) => {
    if (replyId) {
        const payload = {
            comment: text,
            commentId: replyId,
        };
        try {
            let response = await fetch(`${API_KEY}/media-content/comment/${info.mediaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const finalRes = await response.json();

            if (replyId) {
                return { res: finalRes?.data, info: info, replyId }
            } else {
                return { res: finalRes?.data, info: info }
            }

        } catch (error) {
            console.log(error);
        }
    } else {
        const payload = {
            comment: text,
        };

        try {
            let response = await fetch(`${API_KEY}/media-content/comment/${info.mediaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const finalRes = await response.json();
            if (finalRes?.data) {
                if (replyId) {
                    return { res: finalRes?.data, info: info, replyId }
                } else {
                    return { res: finalRes?.data, info: info }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});


export const getRandomUsers: any = createAsyncThunk("get/random/users", async () => {
    try {
        const response = await fetch(
            `${API_KEY}/profile/public/suggested-users?page=1`,
            {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }
        );

        if (response.ok) {
            const responseData = await response.json();
            // getRandomAccounts(responseData.data.data, 4)
            return responseData.data.data
        } else {
            console.log(response);
        }
    } catch (error) {
        // console.error(error);
        console.error();
    }
});
