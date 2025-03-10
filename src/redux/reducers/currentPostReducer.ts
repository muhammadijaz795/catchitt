import { createSlice } from '@reduxjs/toolkit';

const currentPostReducer = createSlice({
    name: 'currentPost',
    initialState: null, // Initial state is null (no post selected)
    reducers: {
        // Action to set the current post
        setCurrentPost: (state, action) => {
            return action.payload; // Replace the entire state with the new post object
        },
        // Action to reset the current post
        resetCurrentPost: () => {
            return null; // Reset the state to null
        },
    },
});

// Export the actions
export const { setCurrentPost, resetCurrentPost } = currentPostReducer.actions;

// Export the reducer
export default currentPostReducer.reducer;