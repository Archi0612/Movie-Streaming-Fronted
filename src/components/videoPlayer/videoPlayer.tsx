import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import { BiPause, BiPlay } from "react-icons/bi";
import {
  MdFastForward,
  MdFastRewind,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";
import { useRef, useState } from "react";
import screenfull from "screenfull";

const VideoPlayer: React.FC<{ url: string }> = ({ url }) => {
  const [player, setPlayer] = useState({
    playing: false,
    loop: false,
    muted: false,
    volume: 0.7,
    duration: 0,
    isMaximize: false,
  });
  const playerRef = useRef<ReactPlayer | null>(null);
  const playedSeconds = useRef<number>(0);
  const divRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

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
      setPlayer({...player, isMaximize: true});
    }
  };

  const handleMinimize = () => {
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      screenfull.exit();
      setPlayer({...player, isMaximize: false});
    }
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    playedSeconds.current = state.playedSeconds;
    if (progressRef.current) {
      progressRef.current.value = String(state.playedSeconds);
    }
    if (playedSeconds.current === player.duration) {
      setPlayer({ ...player, playing: false });
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(
        Math.max(parseFloat(e.target.value), 0),
        "seconds"
      );
    }
  };

  const handleDuration = (dur: number) => {
    console.log("dur: ", dur);
    setPlayer({ ...player, duration: dur });
  };

  console.log("rendered");
  return (
    <div className="player-container" ref={divRef}>
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        url={url}
        playing={player.playing}
        controls={true}
        loop={player.loop}
        volume={player.volume}
        muted={player.muted}
        onDuration={handleDuration}
        onProgress={handleProgress}
      />

      <div className="control-wrapper">
        <div className="control-container">
          <div className="video-progress">
            <input
              type="range"
              className="video_progress-range"
              min={0}
              max={player.duration}
              ref={progressRef}
              onChange={handleProgressChange}
            />
          </div>
          <div className="player-icons">
            <div className="player-left">
              <button className="player-icon-btn" onClick={handleFastRewind}>
                <MdFastRewind size={40} color="white" />
              </button>
              <button className="player-icon-btn" onClick={togglePlayPause}>
                {player.playing ? (
                  <BiPause size={55} color="white" />
                ) : (
                  <BiPlay size={55} color="white" />
                )}
              </button>
              <button className="player-icon-btn">
                <MdFastForward
                  size={40}
                  color="white"
                  onClick={handleFastForward}
                />
              </button>
            </div>
            <div className="player-right">
              {player.isMaximize ? (
                <button className="player-icon-btn" onClick={handleMinimize}>
                  <MdFullscreenExit size={40} color="white" />
                </button>
              ) : (
                <button className="player-icon-btn" onClick={handleFullScreen}>
                  <MdFullscreen size={40} color="white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
