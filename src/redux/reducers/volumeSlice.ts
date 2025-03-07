// volumeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface VolumeState {
  level: number;
  isMutedVolume: boolean;
  previousVolume: number;
}

const initialState: VolumeState = {
  level: 1,
  isMutedVolume: false,
  previousVolume: 1
};

const volumeSlice = createSlice({
  name: 'volume',
  initialState,
  reducers: {
    setVolume: (state, action) => {
      console.log('Setting volume to:', action.payload);
      state.level = action.payload;
      state.isMutedVolume = action.payload === 0;
    },
    toggleMute: (state) => {
      state.isMutedVolume = !state.isMutedVolume;
      if (state.isMutedVolume) {
        state.previousVolume = state.level;
        state.level = 0;
      } else {
        state.level = state.previousVolume;
      }
    }
  }
});

export const { setVolume, toggleMute } = volumeSlice.actions;
export default volumeSlice.reducer;