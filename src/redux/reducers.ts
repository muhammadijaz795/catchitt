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
} from './AsyncFuncs';
import loginSlice from './reducers/auth';
import isuploading from './reducers/upload';
import videoCategories from './reducers/videoCategories';
import geoSlice from './reducers/geoServices';

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

const followers: any = createSlice({
    name: 'followings',
    initialState: {
        total: null,
        data: [],
    },
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(loadFollowers.fulfilled, (state: any, action: any) => {
            state.data = [...state.data, ...action.payload.data]
            state.total = action.payload?.total;
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
            let filteredData =  [...state, ...action.payload]
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
            console.log(' 🚀 >>>>>> action.payload 🚀', action.payload);
            return state;
        });
    },
});

type profileInitialState = {
    followers: any[];
    following: any[];
    friends: any[];
    likes: any[];
    followingTotal: number | null;
    friendsTotal: number | null;
};

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        followers: [],
        following: [],
        friends: [],
        likes: [],
        followingTotal: null,
        friendsTotal: null,
    } as profileInitialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(loadFollowing.fulfilled, (state: profileInitialState, action: any) => {
            state.following = [...state.following,...action.payload.data];
            state.followingTotal = action.payload.total;
            return state;
        });
        builder.addCase(getFriends.fulfilled, (state: profileInitialState, action: any) => {
            state.friends = [...state.friends,...action.payload.data];
            state.friendsTotal = action.payload.total;
            return state;
        });
    },
});

const suggestedAccounts: any = createSlice({
    name: 'suggestedAccounts',
    initialState: {
        data: [],
        total: null,
    },
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getRandomUsers.fulfilled, (_state: any, action: any) => {
            _state.data =  [..._state.data, ...action.payload.data];
            _state.total = action.payload.total;
            return _state;
        });
    },
});

export const { updateHomeVideos } = homeVideos.actions;
export const { openLoginPopup, closeLoginPopup, toggleLoginPopup } = popupSlice.actions;
export const { openLogoutPopup, closeLogoutPopup, toggleLogoutPopup } = popupLogoutSlice.actions;

export default combineReducers({
    followings: followings.reducer,
    followers: followers.reducer,
    homeVideos: homeVideos.reducer,
    profileSlice: profileSlice.reducer,
    suggestedAccounts: suggestedAccounts.reducer,
    profile: loginSlice,
    isuploading,
    videoCategories,
    popupSlice: popupSlice.reducer,
    popupLogoutSlice:popupLogoutSlice.reducer,
    geo: geoSlice,
});
