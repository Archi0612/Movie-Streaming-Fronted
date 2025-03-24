// client/src/components/PlayerControls.tsx
import React from 'react';

interface PlayerControlsProps {
    isPlaying: boolean;
    duration: number;
    currentTime: number;
    playbackRate: number;
    volume: number;
    muted: boolean;
    buffering: boolean;
    isHost: boolean;
    onPlay: () => void;
    onPause: () => void;
    onSeek: (time: number) => void;
    onPlaybackRateChange: (rate: number) => void;
    onVolumeChange: (volume: number) => void;
    onMute: (muted: boolean) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
    isPlaying,
    duration,
    currentTime,
    playbackRate,
    volume,
    muted,
    buffering,
    isHost,
    onPlay,
    onPause,
    onSeek,
    onPlaybackRateChange,
    onVolumeChange,
    onMute
}) => {
    // Format time (seconds) to MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Handle slider change
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        onSeek(time);
    };

    // Playback rate options
    const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

    return (
        <div className="player-controls">
            {/* Timeline slider */}
            <div className="timeline-container">
                <span className="time-display">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min={0}
                    max={duration}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSliderChange}
                    className="timeline-slider"
                    disabled={!isHost}
                />
                <span className="time-display">{formatTime(duration)}</span>
            </div>

            {/* Main controls */}
            <div className="controls-container">
                {/* Play/Pause button */}
                <button
                    onClick={isPlaying ? onPause : onPlay}
                    disabled={!isHost || buffering}
                    className="control-button"
                >
                    {buffering ? 'Buffering...' : isPlaying ? 'Pause' : 'Play'}
                </button>

                {/* Playback rate selector */}
                <div className="playback-rate-container">
                    <select
                        value={playbackRate}
                        onChange={(e) => onPlaybackRateChange(parseFloat(e.target.value))}
                        disabled={!isHost}
                        className="playback-rate-select"
                    >
                        {playbackRates.map(rate => (
                            <option key={rate} value={rate}>
                                {rate}x
                            </option>
                        ))}
                    </select>
                </div>

                {/* Volume controls */}
                <div className="volume-container">
                    <button
                        onClick={() => onMute(!muted)}
                        className="mute-button"
                    >
                        {muted ? 'Unmute' : 'Mute'}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                        className="volume-slider"
                        disabled={muted}
                    />
                </div>
            </div>

            {/* Host indicator */}
            {!isHost && (
                <div className="viewer-notice">
                    You are viewing. Only the host can control playback.
                </div>
            )}
        </div>
    );
};

export default PlayerControls;