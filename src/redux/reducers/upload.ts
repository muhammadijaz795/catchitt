import { createSlice } from '@reduxjs/toolkit';

type uploadStateTypes = {
    videos: number;
    isUploading: boolean;
    selectedFile: any;
    selectedVideoSrc: any;
    selectedTemplate:any;
}

export const isUploading: any = createSlice({
    name: 'videoUploadingStatus',
    initialState: {
        videos: 0,
        isUploading: false,
        selectedFile: null,
        selectedVideoSrc: '',
        selectedTemplate: null, // <-- initialize it

    } as uploadStateTypes,
    reducers: {
        updateUploadingStatus: (state, action) => {
            console.log('check update state payload in upload 🤖🤖🤖🤖', action.payload);
            const { videos, isUploading } = action.payload;
            state.videos = videos;
            state.isUploading = isUploading;
            return state;
        },

        setSelectedFile: (state, action) => {
            const { file } = action.payload;
            if (file) {
                console.log('cehck selected file payload in upload 🚀🚀🚀🚀🚀', action.payload);
                state.selectedFile = file;
                state.selectedVideoSrc = URL.createObjectURL(new Blob([file], { type: 'video/mp4' }));
                return state;
            }
            state.selectedFile = null;
            return state;
        },
        setSelectedTemplate: (state, action) => {
            // payload should contain the template object
            state.selectedTemplate = action.payload; // assign the new template
            return state;
        }
    },
});

export const { updateUploadingStatus, setSelectedFile, setSelectedTemplate } = isUploading.actions;

export default isUploading.reducer;