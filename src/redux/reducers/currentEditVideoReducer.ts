import { createSlice } from '@reduxjs/toolkit';

const currentEditVideoReducer = createSlice({
    name: 'currentEditVideo',
    initialState: null, // Initial state is null (no post selected)
    reducers: {
        // Action to set the current post
        setCurrentEditVideo: (state, action) => {
            return action.payload; 
        },
        // Action to reset the current post
        resetCurrentEditVideo: () => {
            return null; // Reset the state to null
        },
    },
});

// Export the actions
export const { setCurrentEditVideo, resetCurrentEditVideo } = currentEditVideoReducer.actions;

// Export the reducer
export default currentEditVideoReducer.reducer;