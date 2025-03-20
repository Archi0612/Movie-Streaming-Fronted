import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./WatchVideo.css";
import React from "react";
import { getMovieById } from "../../services/apis/movieService";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

import Feedback from "../Feedback";
import { fetchEpisodeById } from "../../services/apis/seriesService";
import ReactModal from 'react-modal';
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
ReactModal.setAppElement("#root"); 
const WatchVideo: React.FC = () => {
  const {mediaId} = useParams();
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get("contentType");
  const [mediaUrl, setMediaUrl] = useState<null>(null);
  const [loading, setLoading] = useState(false);
  const [showFeedBack, setShowFeedBack] = useState(false);
  const navigate = useNavigate();
  const url =
    mediaUrl ||
    "https://res.cloudinary.com/do8yh6vwo/video/upload/v1741844217/salar_trailer_nx9yt7.mp4";
  const fetchMediaByID = async () => {
    try {
      setLoading(true);
      if (contentType === "Movie") {
        const response = await getMovieById(mediaId as string);
        setMediaUrl(response.movie.movieUrl);
      }
       else if( contentType === "Series") {
        const responseOfepisodes = await fetchEpisodeById(mediaId as string);
        setMediaUrl(responseOfepisodes.episodeUrl);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMediaByID();
  }, [mediaId]);

  if (loading) {
    return <Loader />;
  }
  if (!mediaId) {
    navigate("/error");
  }
  return (
    <div className="watch-video-container">
      <VideoPlayer url={url} control={true} loop={false} setPopUp={setShowFeedBack} />
      <ReactModal
  isOpen={showFeedBack}
  onRequestClose={() => setShowFeedBack(false)}
  shouldCloseOnOverlayClick={true}
  shouldCloseOnEsc={true}
  className="feedback-modal"
  overlayClassName="feedback-overlay"
>
  <Feedback />
</ReactModal>

    </div>
  );
};

export default WatchVideo;
