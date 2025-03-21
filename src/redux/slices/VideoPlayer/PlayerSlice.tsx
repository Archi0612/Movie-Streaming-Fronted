import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoPlayerState } from '../../../interfaces/Socket.interface';

const initialState: VideoPlayerState = {
    isPlaying: false,
    currentTime: 0,
    playbackRate: 1,
    duration: 0,
    buffering: false,
    isMuted: false,
    volume: 1
};

const videoPlayer = createSlice({
    name: 'videPlayer',
    initialState,
    reducers: {
        setIsPlaying(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload;
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        },
        setPlaybackRate(state, action: PayloadAction<number>) {
            state.playbackRate = action.payload;
        },
        setDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
        setBuffering(state, action: PayloadAction<boolean>) {
            state.buffering = action.payload;
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
        setMuted(state, action: PayloadAction<boolean>) {
            state.isMuted = action.payload;
        },
        updatePlayerState(state, action: PayloadAction<Partial<PlayerState>>) {
            return { ...state, ...action.payload };
        },
        resetPlayer(state) {
            return initialState;
        }
    }
});

export const {
    setIsPlaying,
    setCurrentTime,
    setPlaybackRate,
    setDuration,
    setBuffering,
    setVolume,
    setMuted,
    updatePlayerState,
    resetPlayer
} = videoPlayer.actions;
export default videoPlayer.reducer;