import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
    commentMethod,
    followingsMethod,
    getFriends,
    getHomeVideos,
    getRandomUsers,
    loadFollowers,
    loadFollowing,
    videoLikehandle,
    videoSavehandle,
    addMoreVideos,
    videoNotInterestedHandle,
    videoRepostHandle,
    getUpdatedVideoState,
    refreshFollowing,
    loadAllFollowers1,
} from './AsyncFuncs';
import loginSlice from './reducers/auth';
import isuploading from './reducers/upload';
import videoCategories from './reducers/videoCategories';
import geoSlice from './reducers/geoServices';
import autoScrollUserSettings from './reducers/autoScrollUserSettings';
import volume from './reducers/volumeSlice';
import roomDetails from './reducers/roomDetailsSlice';

import currentPostReducer from './reducers/currentPostReducer';
import currentEditVideoReducer from './reducers/currentEditVideoReducer';



const followings: any = createSlice({
    name: 'followings',
    initialState: {},
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(followingsMethod.fulfilled, (_state: any, action: any) => {
            return action.payload;
        });
    },
});

const notifications: any = createSlice({
    name: 'notifications',
    initialState: {
        unreadNotiCounts: 0
    },
    reducers: {
        setNotificationsCount: (state, action) => {
            const unreadCount = action.payload.reduce((total:number, noti:any)=>{
                if (!noti.isRead) total++
                return total;
            },0)
            state.unreadNotiCounts = unreadCount;
        }
    },
});

const videoUrlSlice = createSlice({
    name: 'videoUrl',
    initialState: {
        videoUrl: ''
    },
    reducers: {
        setVideoUrl: (state, action) => {
            state.videoUrl = action.payload;
        }
    },
});

export const { setVideoUrl } = videoUrlSlice.actions;
export const videoUrl = videoUrlSlice.reducer;

const popupSlice: any = createSlice({
    name: 'popupSlice',
    initialState: { isLoginPopup: false },
    reducers: {
        openLoginPopup: (state) => {
            state.isLoginPopup = true;
        },
        closeLoginPopup: (state) => {
            state.isLoginPopup = false;
        },
        toggleLoginPopup: (state) => {
            state.isLoginPopup = !state.isLoginPopup;
        },
    },
});

const popupLogoutSlice: any = createSlice({
    name: 'popupLogoutSlice',
    initialState: { isLogoutPopup: false },
    reducers: {
        openLogoutPopup: (state) => {
            state.isLogoutPopup = true;
        },
        closeLogoutPopup: (state) => {
            state.isLogoutPopup = false;
        },
        toggleLogoutPopup: (state) => {
            state.isLogoutPopup = !state.isLogoutPopup;
        },
    },
});

const loadAllFollowers: any = createSlice({
  name: 'loadAllFollowers',
  initialState: {
    total: null,
    page: 1,
    data: [],
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(loadAllFollowers1.fulfilled, (state: any, action: any) => {
      if (action.payload) {
        state.data = action.payload.data || [];
        state.total = action.payload.total || null;
        state.page = state.page + 1;
      }
      return state;
    });
  },
});

const followers: any = createSlice({
    name: 'followings',
    initialState: {
        total: null,
        page: 1,
        data: [],
    },
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(loadFollowers.fulfilled, (state: any, action: any) => {
            state.data = [...state.data, ...action.payload.data]
            state.total = action.payload?.total;
            state.page = state.page + 1;
            return state;
        });
    },
});

const homeVideos: any = createSlice({
    name: 'homeVideos',
    initialState: [],
    reducers: {
        updateHomeVideos: (_state, action: any) => {
            return action.payload;
        },
        // addMoreVideos: (_state:any, action: any) => {
        //     return {..._state.videos, ...action.payload};
        // },
    },
    extraReducers: (builder: any) => {
        builder.addCase(getHomeVideos.fulfilled, (_state: any, action: any) => {
            return action.payload;
        });
        builder.addCase(videoLikehandle.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            let filteredData = state.map((element: any) => {
                if (element.mediaId === action.payload.id) {
                    return {
                        ...element,
                        isLiked: !element.isLiked,
                        likes: !element.isLiked ? element.likes + 1 : element.likes - 1,
                    };
                } else {
                    return element;
                }
            });
            return filteredData;
        });
        builder.addCase(videoSavehandle.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            let filteredData = state.map((element: any) => {
                if (element.mediaId === action.payload.id) {
                    return {
                        ...element,
                        isSaved: !element.isSaved,
                    };
                } else {
                    return element;
                }
            });
            return filteredData;
        });
        // Comment Feature
        builder.addCase(commentMethod.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            let comments = [];
            // @ts-ignore
            const { info, res, replyId }: any = action.payload;
            if (!replyId) {
                let filteredData = state.map((element: any) => {
                    if (element.mediaId === info.mediaId) {
                        comments = [...element.comments, res];
                        return { ...element, comments };
                    } else {
                        return element;
                    }
                });
                return filteredData;
            } else {
                let filteredData = state.map((element: any) => {
                    if (element.mediaId === info.mediaId) {
                        comments = element?.comments?.map((comment: any) => {
                            if (comment.id === replyId) {
                                return res;
                            } else {
                                return element;
                            }
                        });
                        return { ...element, comments };
                    } else {
                        return element;
                    }
                });
                return filteredData;
            }
        });
        builder.addCase(addMoreVideos.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            // let filteredData =  [...state, ...action.payload]
            // return filteredData;
             // Extract mediaIds from action.payload
            const newMediaIds = action.payload.map((item: any) => item.mediaId);
            // console.log("newMediaIds: ", newMediaIds);
            // Filter out items in state that have a mediaId in newMediaIds
            let filteredData = [
                ...state.filter((item: any) => !newMediaIds.includes(item.mediaId)),
                ...action.payload
            ];
            return filteredData;
        });
        builder.addCase(videoNotInterestedHandle.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            // let filteredData = state.map((element: any) => {
            //     if (element.mediaId === action.payload.id) {
            //         return {
            //             ...element,
            //             isLiked: !element.isLiked,
            //             likes: !element.isLiked ? element.likes + 1 : element.likes - 1,
            //         };
            //     } else {
            //         return element;
            //     }
            // });
            let filteredData = state.filter(element =>
                (element.mediaId  !== action.payload.id
              ));
            return filteredData;
        });
        builder.addCase(videoRepostHandle.fulfilled, (state: any, action: any) => {
            const { post } = action.payload;
            return state.map((video: any) => video.mediaId === post.id ? { ...video, shares: video.shares + 1 } : video);
        });
        builder.addCase(getUpdatedVideoState.fulfilled, (state: any, action: any) => {
            // first get the index of the video in the state
            const mutateState = state.map((video: any) => ({ ...video }));

            const index = mutateState.findIndex((video: any) => video.mediaId === action.payload.mediaId);

            if (index === -1) return state; // index validation
                // update the video in the state
            mutateState[index].commentsCount = action.payload.comments.length;
            mutateState[index].comments = action.payload.comments;
            mutateState[index].likes = action.payload.likes;
            mutateState[index].isLiked = action.payload.isLiked;
            mutateState[index].isSaved = action.payload.isSaved;
            mutateState[index].isReposted = action.payload.isReposted;
            mutateState[index].views = action.payload.views;
            mutateState[index].shares = action.payload.shares;
            mutateState[index].savesCount = action.payload.savesCount;

            return mutateState;
        });
    },
});

type profileInitialState = {
    followers: any[];
    following: any[];
    friends: any[];
    likes: any[];
    followingTotal: number | null;
    followingPage: number;
    friendsTotal: number | null;
    friendsPage: number;
    loadAllFollowers: any[];
};

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        followers: [],
        following: [],
        friends: [],
        likes: [],
        followingTotal: null,
        followingPage: 1,
        friendsTotal: null,
        friendsPage: 1,
        loadAllFollowers: []
    } as profileInitialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(loadFollowing.fulfilled, (state: profileInitialState, action: any) => {
            state.following = [...state.following,...action.payload.data];
            state.followingTotal = action.payload.total;
            state.followingPage = state.followingPage + 1;
            return state;
        });
        builder.addCase(getFriends.fulfilled, (state: profileInitialState, action: any) => {
            state.friends = [...state.friends,...action.payload.data];
            state.friendsTotal = action.payload.total;
            state.friendsPage = state.friendsPage + 1;
            return state;
        });
        builder.addCase(refreshFollowing.fulfilled, (state: profileInitialState, action: any) => {
            state.following = action.payload.data;
            state.followingTotal = action.payload.total;
            state.followingPage = 2;
            return state;
        });
    },
});

const suggestedAccounts: any = createSlice({
    name: 'suggestedAccounts',
    initialState: {
        data: [],
        page: 1,
        total: null,
    },
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getRandomUsers.fulfilled, (_state: any, action: any) => {
            _state.data =  [..._state.data, ...action.payload.data];
            _state.total = action.payload.total;
            _state.page = _state.page + 1;
            return _state;
        });
    },
});

export const { updateHomeVideos } = homeVideos.actions;
export const { openLoginPopup, closeLoginPopup, toggleLoginPopup } = popupSlice.actions;
export const { openLogoutPopup, closeLogoutPopup, toggleLogoutPopup } = popupLogoutSlice.actions;
export const { setNotificationsCount } = notifications.actions

export default combineReducers({
    followings: followings.reducer,
    followers: followers.reducer,
    homeVideos: homeVideos.reducer,
    profile: loginSlice,
    profileSlice: profileSlice.reducer,
    suggestedAccounts: suggestedAccounts.reducer,
    isuploading,
    videoCategories,
    popupSlice: popupSlice.reducer,
    popupLogoutSlice:popupLogoutSlice.reducer,
    loadAllFollowers: loadAllFollowers.reducer,
    geo: geoSlice,
    notifications: notifications.reducer,
    videoUrl,
    setVideoUrl,
    autoScrollUserSettings, 
    volume,
    roomDetails,
    currentPost: currentPostReducer,
    currentEditVideo: currentEditVideoReducer,
});
