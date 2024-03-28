import { createSlice } from "@reduxjs/toolkit";

export const isUploading: any = createSlice({
    name: "videoUploadingStatus",
    initialState: {
        videos: 0,
        isUploaded: false
    },
    reducers: {
        updateUploadingStatus: (_, action) => {
            // const { videos, isUploaded } = action.payload
            return action.payload
        }
    }
});

export const { updateUploadingStatus } = isUploading.actions

export default isUploading.reducer