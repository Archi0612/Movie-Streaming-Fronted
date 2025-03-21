export interface VideoPlayerState {
    isPlaying: boolean;
    currentTime: number;
    playbackRate: number;
    duration: number;
    buffering: boolean;
    isMuted: boolean;
    volume: number;
}