// client/src/components/VideoPlayer.tsx
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { socketService } from '../../services/Socket/SocketService';
import {
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setBuffering,
    setPlaybackRate,
    setVolume,
    setMuted
} from '../../redux/slices/VideoPlayer/PlayerSlice';
import PlayerControls from './PlayerControls';

interface VideoPlayerProps {
    url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
    const dispatch = useDispatch();
    const playerRef = useRef<ReactPlayer>(null);
    const [seeking, setSeeking] = useState(false);

    const { currentRoom, isHost } = useSelector((state: RootState) => state.room);
    const playerState = useSelector((state: RootState) => state.player);

    // Listen for external player updates (for viewers)
    useEffect(() => {
        if (!isHost && seeking && playerRef.current && playerState.currentTime > 0) {
            playerRef.current.seekTo(playerState.currentTime, 'seconds');
            setSeeking(false);
        }
    }, [playerState.currentTime, isHost, seeking]);

    // Handle player events
    const handlePlay = () => {
        if (isHost) {
            dispatch(setIsPlaying(true));
            if (currentRoom) {
                socketService.updatePlayerState(currentRoom.roomId, {
                    isPlaying: true,
                    currentTime: playerState.currentTime,
                    playbackRate: playerState.playbackRate
                });
            }
        }
    };

    const handlePause = () => {
        if (isHost) {
            dispatch(setIsPlaying(false));
            if (currentRoom) {
                socketService.updatePlayerState(currentRoom.roomId, {
                    isPlaying: false,
                    currentTime: playerState.currentTime,
                    playbackRate: playerState.playbackRate
                });
            }
        }
    };

    const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
        if (!seeking) {
            dispatch(setCurrentTime(state.playedSeconds));

            // Send progress updates periodically (throttled)
            if (isHost && currentRoom && Math.abs(playerState.currentTime - state.playedSeconds) > 1) {
                socketService.updatePlayerState(currentRoom.roomId, {
                    isPlaying: playerState.isPlaying,
                    currentTime: state.playedSeconds,
                    playbackRate: playerState.playbackRate
                });
            }
        }
    };

    const handleDuration = (duration: number) => {
        dispatch(setDuration(duration));
    };

    const handleBuffer = (buffering: boolean) => {
        dispatch(setBuffering(buffering));
    };

    const handlePlaybackRateChange = (rate: number) => {
        if (isHost) {
            dispatch(setPlaybackRate(rate));
            if (currentRoom) {
                socketService.updatePlayerState(currentRoom.roomId, {
                    isPlaying: playerState.isPlaying,
                    currentTime: playerState.currentTime,
                    playbackRate: rate
                });
            }
        }
    };

    const handleSeek = (time: number) => {
        setSeeking(true);
        dispatch(setCurrentTime(time));

        if (isHost && currentRoom) {
            socketService.seek(currentRoom.roomId, time);
        }
    };

    const handleVolumeChange = (volume: number) => {
        dispatch(setVolume(volume));
    };

    const handleMute = (muted: boolean) => {
        dispatch(setMuted(muted));
    };

    return (
        <div className="video-player-container">
            <div className="player-wrapper">
                <ReactPlayer
                    ref={playerRef}
                    url={url}
                    width="100%"
                    height="100%"
                    playing={playerState.isPlaying}
                    playbackRate={playerState.playbackRate}
                    volume={playerState.volume}
                    muted={playerState.isMuted}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    onBuffer={() => handleBuffer(true)}
                    onBufferEnd={() => handleBuffer(false)}
                    onPlaybackRateChange={handlePlaybackRateChange}
                    onSeek={() => setSeeking(false)}
                    controls={false}
                />
            </div>

            <PlayerControls
                isPlaying={playerState.isPlaying}
                duration={playerState.duration}
                currentTime={playerState.currentTime}
                playbackRate={playerState.playbackRate}
                volume={playerState.volume}
                muted={playerState.isMuted}
                buffering={playerState.buffering}
                isHost={isHost}
                onPlay={() => playerRef.current?.getInternalPlayer().play()}
                onPause={() => playerRef.current?.getInternalPlayer().pause()}
                onSeek={handleSeek}
                onPlaybackRateChange={handlePlaybackRateChange}
                onVolumeChange={handleVolumeChange}
                onMute={handleMute}
            />
        </div>
    );
};

export default VideoPlayer;