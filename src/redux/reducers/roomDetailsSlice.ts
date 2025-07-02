// src/reducers/roomDetailsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomDetailsState {
  data: any; // you can strongly type this if you have an interface
  isLoading: boolean;
  error: string | null;
}

const initialState: RoomDetailsState = {
  data: null,
  isLoading: false,
  error: null,
};

const roomDetailsSlice = createSlice({
  name: 'roomDetails',
  initialState,
  reducers: {
    fetchRoomDetailsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchRoomDetailsSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchRoomDetailsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRoomDetailsStart,
  fetchRoomDetailsSuccess,
  fetchRoomDetailsFailure,
} = roomDetailsSlice.actions;

export default roomDetailsSlice.reducer;
