import { useLocation } from "react-router-dom";
import "./WatchVideo.css"
import VideoPlayer from "../../components/videoPlayer/videoPlayer";

const WatchVideo = () => {
  const location = useLocation();
  const episodeUrl = location.state?.episodeUrl || 
  "https://res.cloudinary.com/do8yh6vwo/video/upload/v1741844217/salar_trailer_nx9yt7.mp4"; // Default to an empty string if not provided

  return (
    <div className="watch-video-container">
      {/* <h1 className="video-player-heading">Now Playing</h1> */}
      <VideoPlayer url={episodeUrl} control={true} loop={false} />
      
    </div>
  );
};

export default WatchVideo;
