import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VolumeState {
  level: number;
  isMutedVolume: boolean;
  previousVolume: number;
}

const defaultInitialState: VolumeState = {
  level: 1,
  isMutedVolume: false,
  previousVolume: 1
};

const loadState = (): VolumeState => {
  try {
    const serializedState = localStorage.getItem('volumeState');
    return serializedState ? JSON.parse(serializedState) : defaultInitialState;
  } catch (e) {
    console.error('Failed to load volume state:', e);
    return defaultInitialState;
  }
};

const initialState: VolumeState = loadState();

const volumeSlice = createSlice({
  name: 'volume',
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<number>) => {
      const newVolume = Math.max(0, Math.min(1, action.payload));
      state.level = newVolume;
      state.isMutedVolume = newVolume === 0;
      if (newVolume > 0) state.previousVolume = newVolume;
      localStorage.setItem('volumeState', JSON.stringify(state));
    },
    toggleMute: (state) => {
      state.isMutedVolume = !state.isMutedVolume;
      if (state.isMutedVolume) {
        state.previousVolume = state.level;
        state.level = 0;
      } else {
        state.level = state.previousVolume;
      }
      localStorage.setItem('volumeState', JSON.stringify(state));
    }
  }
});

export const { setVolume, toggleMute } = volumeSlice.actions;
export default volumeSlice.reducer;