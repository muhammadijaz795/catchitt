import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from '../../axios/axiosClient';
import { getVideoCategoriesEndPoind } from '../../utils/constants';

export const getVideoCategories: any = createAsyncThunk('post/videoCategories', async () => {
    try {
        let res = await get(getVideoCategoriesEndPoind);
        return res?.data?.data;
    } catch (error) {
        return;
    }
});

export const videoCategories: any = createSlice({
    name: 'videoCategories',
    initialState: {},
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getVideoCategories.fulfilled, (_: any, action: any) => {
            return action.payload;
        });
    },
});

export default videoCategories.reducer;
