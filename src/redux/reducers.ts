import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { commentMethod, followingsMethod, getHomeVideos, getRandomUsers, videoLikehandle } from "./AsyncFuncs";
import loginSlice from './reducers/auth';
import isuploading from './reducers/upload';

const followings: any = createSlice({
    name: "followings",
    initialState: {},
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(followingsMethod.fulfilled, (_state: any, action: any) => {
            return action.payload
        })
    }
});
const homeVideos: any = createSlice({
    name: "homeVideos",
    initialState: [],
    reducers: {
        updateHomeVideos: (_state, action: any) => {
            return action.payload
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(getHomeVideos.fulfilled, (_state: any, action: any) => {
            return action.payload
        })
        builder.addCase(videoLikehandle.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            let filteredData = state.map((element: any) => {
                if (element.mediaId === action.payload.id) {
                    return { ...element, isLiked: !element.isLiked, likes: !element.isLiked ? element.likes + 1 : element.likes - 1 }
                } else {
                    return element
                }
            });
            return filteredData
        })
        // Comment Feature
        builder.addCase(commentMethod.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            let comments = []
            // @ts-ignore
            const { info, res, replyId }: any = action.payload
            if (!replyId) {
                let filteredData = state.map((element: any) => {
                    if (element.mediaId === info.mediaId) {
                        comments = [...element.comments, res]
                        return { ...element, comments }
                    } else {
                        return element
                    }
                });
                return filteredData
            } else {
                let filteredData = state.map((element: any) => {
                    if (element.mediaId === info.mediaId) {
                        comments = element?.comments?.map((comment: any) => {
                            if (comment.id === replyId) {
                                return res
                            } else {
                                return element
                            }
                        })
                        return { ...element, comments }
                    } else {
                        return element
                    }
                });
                return filteredData
            }
        })
    }
});

const suggestedAccounts: any = createSlice({
    name: "suggestedAccounts",
    initialState: [],
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getRandomUsers.fulfilled, (_state: any, action: any) => {
            return action.payload
        })
    }
});

export const { updateHomeVideos } = homeVideos.actions

export default combineReducers({
    followings: followings.reducer,
    homeVideos: homeVideos.reducer,
    suggestedAccounts: suggestedAccounts.reducer,
    profile:loginSlice,
    isuploading
});