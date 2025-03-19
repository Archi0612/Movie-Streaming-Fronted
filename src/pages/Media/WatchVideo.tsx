import  { useParams} from "react-router-dom";
import "./WatchVideo.css"
import React from "react";
import { getMovieById } from "../../services/apis/movieService";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";

const WatchVideo:React.FC = () => {
  const mediaId = useParams();
  const [movieUrl, setMovieUrl] = useState<null>(null);
  const [loading, setLoading]=useState(false);

  const mediaUrl = movieUrl || 
  "https://res.cloudinary.com/do8yh6vwo/video/upload/v1741844217/salar_trailer_nx9yt7.mp4"; // Default to an empty string if not provided

  const fetchMediaByID = async () => {
    try {
      setLoading(true);
        const response = await getMovieById("67d26bee1498b637b798fad7");
        // console.log("movie by id:", response.movie.movieUrl);
        setMovieUrl(response.movie.movieUrl);
      } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMediaByID();
  },[mediaId]);
  
  if(loading){
    return <Loader/>
  }
  return (
    <div className="watch-video-container">
      {/* <h1 className="video-player-heading">Now Playing</h1> */}
      <VideoPlayer url={mediaUrl} control={true} loop={false} />
      
    </div>
  );
};

export default WatchVideo;
