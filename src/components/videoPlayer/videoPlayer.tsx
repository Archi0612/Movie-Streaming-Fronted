import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import { BiPause, BiPlay } from "react-icons/bi";
import {
  MdFastForward,
  MdFastRewind,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";
import React, { useRef, useState } from "react";
import screenfull from "screenfull";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { VideoPlayerProps } from "../../interfaces/series.interface";

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, control = false, loop = false, setPopUp }) => {
  const [player, setPlayer] = useState({
    playing: true,
    loop: loop,
    muted: false,
    volume: 0.7,
    duration: 0,
    isMaximize: false,
  });
  const playerRef = useRef<ReactPlayer | null>(null);
  const playedSeconds = useRef<number>(0);
  const divRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const volumeRangeRef = useRef<HTMLInputElement>(null);
  const controllerRef = useRef<HTMLInputElement>(null);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseMove = () => {
    if(controllerRef.current) {
      controllerRef.current.style.opacity = "1";
    }

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeout = setTimeout(() => {
      if(controllerRef.current) {
        controllerRef.current.style.opacity = "0";
      }
    }, 2000);
    setTimeoutId(newTimeout);
  };

  const togglePlayPause = () => {
    setPlayer((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const handleFastForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playedSeconds.current + 10, "seconds");
    }
  };

  const handleFastRewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        Math.max(playedSeconds.current - 10, 0),
        "seconds"
      );
    }
  };

  const handleFullScreen = () => {
    if (screenfull.isEnabled && divRef.current) {
      screenfull.request(divRef.current);
      setPlayer({ ...player, isMaximize: true });
    }
  };

  const handleMinimize = () => {
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      screenfull.exit();
      setPlayer({ ...player, isMaximize: false });
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (volumeRangeRef.current) {
      const percentage = parseFloat(e.target.value);
      volumeRangeRef.current.style.background = `linear-gradient(90deg, var(--primary-color) ${percentage}%, #ffffff54 ${percentage}%)`;
      setPlayer({ ...player, volume: percentage / 100 });
    }
  };

  const handleMute = () => {
    if (player.volume == 0) {
      setPlayer({ ...player, volume: 0.5 });
      if (volumeRangeRef.current) {
        volumeRangeRef.current.value = "50";
        volumeRangeRef.current.style.background = `linear-gradient(90deg, var(--primary-color) 50%, #ffffff54 50%)`;
      }
    } else {
      setPlayer({ ...player, volume: 0 });
      if (volumeRangeRef.current) {
        volumeRangeRef.current.value = "0";
        volumeRangeRef.current.style.background = `linear-gradient(90deg, var(--primary-color) 0%, #ffffff54 0%)`;
      }
    }
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    playedSeconds.current = state.playedSeconds;
    if (progressRef.current) {
      progressRef.current.value = String(state.playedSeconds);
      const percentage = (state.playedSeconds / player.duration) * 100;
      progressRef.current.style.background = `linear-gradient(90deg, var(--primary-color) ${percentage}%, #ffffff54 ${percentage}%)`;
    }
    if (playedSeconds.current === player.duration) {
      setPlayer({ ...player, playing: false });
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (progressRef.current) {
      const percentage = (parseFloat(e.target.value) / player.duration) * 100;
      progressRef.current.style.background = `linear-gradient(90deg, var(--primary-color) ${percentage}%, #ffffff54 ${percentage}%)`;
    }
    if (playerRef.current) {
      playerRef.current.seekTo(
        Math.max(parseFloat(e.target.value), 0),
        "seconds"
      );
    }
  };

  const handleDuration = (dur: number) => {
    setPlayer({ ...player, duration: dur });
  };

  const handleVideoEnd = () => {
    setPlayer((prev) => ({ ...prev, playing: false }));
    setPopUp(true);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
        secs < 10 ? "0" : ""
      }${secs}`;
    }
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="player-container" ref={divRef}>
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        url={url}
        playing={player.playing}
        // controls={true}
        loop={player.loop}
        volume={player.volume}
        muted={player.muted}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onEnded={handleVideoEnd}
      />

      {control && <div className="control-wrapper" 
      onMouseMove={handleMouseMove}
      ref={controllerRef}>
        <div className="control-container">
          {/* video progress bar */}
          <div className="video-progress">
            <input
              type="range"
              className="video-progress-range progress-range"
              min={0}
              max={player.duration}
              ref={progressRef}
              height={""}
              onChange={handleProgressChange}
              id="lengthrange"
            />
          </div>

          {/* controllers */}
          <div
            className="player-icons"
          >
            {/* player controllers left side */}
            <div className="player-left">
              <button className="player-icon-btn" onClick={handleFastRewind}>
                <MdFastRewind size={30} color="white" />
              </button>
              <button className="player-icon-btn" onClick={togglePlayPause}>
                {player.playing ? (
                  <BiPause size={40} color="white" />
                ) : (
                  <BiPlay size={40} color="white" />
                )}
              </button>
              <button className="player-icon-btn">
                <MdFastForward
                  size={30}
                  color="white"
                  onClick={handleFastForward}
                />
              </button>
              <div className="volume-control">
                <button
                  className="player-icon-btn volume-btn"
                  onClick={handleMute}
                >
                  {player.volume === 0 && <FaVolumeMute size={20} />}
                  {player.volume > 0 && player.volume <= 0.5 && (
                    <FaVolumeDown size={20} />
                  )}
                  {player.volume > 0.5 && player.volume <= 1 && (
                    <FaVolumeHigh size={20} />
                  )}
                </button>
                <div className="volume-input-range">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    ref={volumeRangeRef}
                    onChange={handleVolume}
                    className="volume-range progress-range"
                  />
                </div>
              </div>
              <div>
                {formatTime(playedSeconds.current) +
                  " / " +
                  formatTime(player.duration)}
              </div>
            </div>

            {/* player controllers right side */}
            <div className="player-right">
              {player.isMaximize ? (
                <button className="player-icon-btn" onClick={handleMinimize}>
                  <MdFullscreenExit size={30} color="white" />
                </button>
              ) : (
                <button className="player-icon-btn" onClick={handleFullScreen}>
                  <MdFullscreen size={30} color="white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default VideoPlayer;
