import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../utils/socket";
import { setVideoState } from "../../redux/slices/VideoRoom/videoSlice";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

const StreamRoom = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();
  const videoState = useSelector((state: RootState) => state.video);
  const roomId = useParams();
    console.log("roomId from streamroom component:", roomId.roomId);
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("updateVideoState", (state) => {
      dispatch(setVideoState(state));
      if (videoRef.current) {
        videoRef.current.currentTime = state.currentTime;
        videoRef.current.volume = state.volume;
        videoRef.current.playbackRate = state.playbackRate;
        if (state.isPlaying) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
        
      }
    });

    return () => {
      socket.off("updateVideoState");
    };
  }, [roomId, dispatch]);

  const handleVideoStateChange = () => {
    if (!videoRef.current) return;
    const state = {
      isPlaying: !videoState.isPlaying,
      currentTime: videoRef.current.currentTime,
      volume: videoRef.current.volume,
      playbackRate: videoRef.current.playbackRate,
    };
    dispatch(setVideoState(state));
    socket.emit("videoStateChange", { roomId, state });
  };

  return (
    <div className="stream-room">
      <video
        ref={videoRef}
        src="/path-to-video.mp4"
        controls
        onPlay={handleVideoStateChange}
        onPause={handleVideoStateChange}
      />
    </div>
  );
};

export default StreamRoom;
