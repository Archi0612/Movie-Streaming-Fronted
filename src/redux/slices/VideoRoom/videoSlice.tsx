import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  playbackRate: number;
}

const initialState: VideoState = {
  isPlaying: false,
  currentTime: 0,
  volume: 1,
  playbackRate: 1,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoState(state, action: PayloadAction<VideoState>) {
      return action.payload;
    },
  },
});

export const { setVideoState } = videoSlice.actions;
export default videoSlice.reducer;
