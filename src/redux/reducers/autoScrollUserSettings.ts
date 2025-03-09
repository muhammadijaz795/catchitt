import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Define the autoScrollUserSettings slice
const autoScrollUserSettings = createSlice({
    name: 'autoScrollUserSettings',
    initialState: {
      isEnabled: false, // Default state (false = disabled)
      scrollSpeed: 1000, // Default scroll speed (in milliseconds)
    },
    reducers: {
      // Action to enable or disable auto-scroll
      toggleAutoScroll: (state) => {
        state.isEnabled = !state.isEnabled;
      },
      // Action to set scroll speed
      setScrollSpeed: (state, action) => {
        state.scrollSpeed = action.payload;
      },
    },
  });
  
  // Export the actions and the reducer
  export const { toggleAutoScroll, setScrollSpeed } = autoScrollUserSettings.actions;
  export default autoScrollUserSettings.reducer;