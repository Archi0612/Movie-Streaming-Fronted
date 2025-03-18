import React, { useEffect, useState } from "react";
import "./DetailsPage.css";
import { fetchSeriesByID } from "../../services/apis/seriesService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getMovieById } from "../../services/apis/movieService";
import { Movie } from "../../interfaces/movie.interface";
import { genreMap } from "../../utils/MediaConstants";
import {
  FaBookmark,
  FaPlay,
  FaRegBookmark,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { Seriesdata } from "../../interfaces/series.interface";
import { Play } from "lucide-react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { toggleWatchList } from "../../redux/slices/WatchList/WatchList";
import { toggleLike } from "../../redux/slices/LikedList/LikedList";
import { toast } from "react-toastify";
import Loader from "../../components/shimmerUI/Loader";

const DetailsPage: React.FC = () => {
  const { mediaId } = useParams();
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState<Movie | null>(null);
  const [seriesData, setSeriesData] = useState<Seriesdata[]>();
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get("contentType");
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookMarked, setBookMarked] = useState<boolean>(false);
  const [loading, setLoading]=useState(false);

 const fetchMediaByID = async () => {
    try {
      setLoading(true);
      if (contentType === "Movie") {
        const response = await getMovieById(mediaId as string);
        setMediaData(response.movie as Movie);
      } else {
        const response = await fetchSeriesByID(mediaId as string);
        setMediaData(response.seriesInfo as Movie);
        setSeriesData(response.seriesContent as Seriesdata[]);
        //  setMediaData(seriesResult.value.seriesInfo as Movie);
      }
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
  }, [mediaId, contentType]);

  //Genre Mapping

  const genreNames = mediaData?.genres
    .map((id) => genreMap[id] || "Unknown")
    .join(", ");

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(Number(event.target.value));
  };
  const handleLike = async () => {
    try {
      const response = await dispatch(
        toggleLike({ contentId: mediaId || "", contentType: contentType || "" })
      );
      console.log(response.payload.message, "Response from detail");
      if (response.payload.message == "Unliked successfully") {
        toast.info("Removed from Liked List");
        setIsLiked(false);
      } else if (response.payload.message == "Liked successfully") {
        toast.success("Added to Liked List");
        setIsLiked(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleWatchList = async () => {
    try {
      const response = await dispatch(
        toggleWatchList({
          contentId: mediaId || "",
          contentType: contentType || "",
        })
      );
      if (response.payload.message == "Removed from watchlist") {
        toast.info("Removed from Watch List");
        setBookMarked(false);
      } else if (response.payload.message == "Added to watchlist") {
        // console.log(response.payload.message, "Response from watchList");
        toast.success("Added in Watchlist successfully!", {
          position: "top-right",
        });
        setBookMarked(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        toast.error(error.message, { position: "top-right" });
    }
  };
  const handlePlayVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    navigate(`/videoPlayer`);
  };
  const handlePlayEpisode = (episodeUrl: string) => {
    // e.stopPropagation();
    // console.log("episode player clicked from movie card");
    // console.log("episodeUrl", episodeUrl);
    navigate(`/watch`, { state: { episodeUrl } });
  };

  const handleDurationTime = () => {
    const totalSeconds = mediaData?.duration || 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return "Unknown";
  };
  if(loading){
    return <Loader/>
  }
  return (
  
    <div className="details-container">
      <div className="header-container">
        <div className="video-overlay">
          {mediaData?.trailerUrl && (
            <ReactPlayer
              url={mediaData.trailerUrl}
              width="100%"
              height="25rem"
              controls
              playing
              muted={true}
            />
          )}
        </div>
      </div>

      <div className="content-container">
        <div className="title-section">
          <div className="media-heading-data">
            <h1 className="mediaData-title">{mediaData?.title}</h1>
            {/* <div className="header-image-container">
          <img
            // src="https://w0.peakpx.com/wallpaper/641/809/HD-wallpaper-jurassic-park-dark-dinosaur-jurassic-logo-movie-park-whatsapp-world.jpg"
            src={mediaData?.poster}
            alt={`Poster of ${mediaData?.title}`}
            className="header-image"
          />
        </div> */}
            <div className="actions-container">
              <button
                className={
                  isLiked
                    ? "action-button unlike-button"
                    : "action-button like-button"
                }
                onClick={handleLike}
              >
                {isLiked ? (
                  <FaThumbsDown />
                ) : (
                  <FaThumbsUp size={16} color={isLiked ? "grey" : "white"} />
                )}
                {isLiked ? "Unlike" : "Like"}
              </button>
              <button className="action-button share-button">
                <FaShareFromSquare size={16} />
                Share
              </button>
              <button
                className="action-button watchlist-button"
                onClick={handleWatchList}
              >
                {isBookMarked ? (
                  <FaBookmark size={16} />
                ) : (
                  <FaRegBookmark size={16} />
                )}
                {isBookMarked ? "Added to WatchList" : "Add to WatchList"}
              </button>
            </div>
          </div>

          <div className="movie-meta">
            <span className="runtime">{handleDurationTime()}</span>
            <span className="divider">•</span>
            <span className="genres">{genreNames}</span>
            <span className="divider">•</span>
            <span className="release-date">
              {new Date(mediaData?.releaseDate as string).getFullYear()}
            </span>
            <span className="divider">•</span>
            <span className="languages">
              {mediaData?.languages
                .map((lang) => lang.slice(0, 3))
                .join(", ")
                .toUpperCase()}
            </span>
          </div>
          <div className="rating-container">
            <div className="star-rating">
              <span className="star">★</span>
              <span className="rating-score">{mediaData?.rating}</span>
              <span className="total-votes">/10 (1.4M)</span>
            </div>
          </div>

          <div className="watch-movie">
            <button
              className="action-button watch-button"
              onClick={handlePlayVideo}
            >
              Watch
              <FaPlay size={16} />
            </button>
          </div>
        </div>

        <div className="main-content">
          <div className="left-content">
            <section className="description-section">
              <h3 className="medieaData-subtitle">Description</h3>
              <div className="episodes-container">
                <p className="description-para">{mediaData?.description}</p>
              </div>
            </section>
            {seriesData && (
              <div className="season-selector">
                <label htmlFor="season">Select Season: </label>
                <select id="season" key={seriesData.length} onChange={handleSeasonChange}>
                  <option value="No Seasons" key={seriesData.length}>Select</option>
                  {seriesData.map((season) => (
                    <option
                      key={season._id}
                      value={season.season}
                      className="option-season"
                    >
                      Season {season.season || `No Seasons`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedSeason !== null && (
              <section className="episodes-section">
                {(seriesData as Seriesdata[])
                  .filter((season) => season.season === selectedSeason)
                  .map((season) => (
                    <div key={season._id}>
                      <h3 className="medieaData-subtitle">
                        Season: {season.season}
                      </h3>
                      <div className="episodes-container">
                        {season.episodes.map((episode) => (
                          <div key={episode._id} className="episode">
                            <div className="episode-heading-data">
                              <h4 className="episode-title">
                                Episode {episode.episodeNumber}: {episode.title}
                              </h4>
                              <span className="episode-duration">
                                {Math.floor(episode.duration / 60)} min
                              </span>
                            </div>

                            <div className="episode-details">
                              <img
                                src="/Series/Episodes/episode.png"
                                alt="episode- image"
                              />

                              <div className="episode-info">
                                {/* <span className="divider">•</span> */}
                                <span className="episode-release">
                                  {/* Released:{" "} */}
                                  {new Date(episode.releaseDate).toDateString()}
                                </span>
                                <p className="episode-description">
                                  {episode.description}
                                </p>
                                <div className="episode-buttons">
                                  <button
                                    className="episode-button play"
                                    onClick={() =>
                                      handlePlayEpisode(episode.episodeUrl)
                                    }
                                  >
                                    <Play />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </section>
            )}
            <section className="credits-section">
              {/* Directors Section */}
              <div className="director">
                <h3 className="medieaData-subtitle">Directors</h3>
                <div className="cast-list">
                  {mediaData?.directors //series response
                    ? mediaData.directors.map((director, index) => (
                        <div key={index} className="cast-member">
                          <img
                            src="/public/default.png"
                            alt={director.name}
                            className="cast-image"
                          />
                          <div className="cast-info">
                            <h4 className="media-name">{director.name}</h4>
                          </div>
                        </div>
                      ))
                    : mediaData?.director // movie response
                    ? mediaData.director.map((director, index) => (
                        <div key={index} className="cast-member">
                          <img
                            src="/public/default.png"
                            alt={director.name}
                            className="cast-image"
                          />
                          <div className="cast-info">
                            <h4 className="media-name">{director.name}</h4>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>

              {/* Casts Section */}
              <div className="cast-section">
                <h3 className="medieaData-subtitle">Casts</h3>
                <div className="cast-list">
                  {mediaData?.casts
                    ? mediaData.casts.map((cast, index) => (
                        <div key={index} className="cast-member">
                          <img
                            src="/public/default.png"
                            alt={cast.name}
                            className="cast-image"
                          />
                          <div className="cast-info">
                            <h4 className="media-name">{cast.name}</h4>
                          </div>
                        </div>
                      ))
                    : mediaData?.cast // Fallback for movie response
                    ? mediaData.cast.map((cast, index) => (
                        <div key={index} className="cast-member">
                          <img
                            src="/public/default.png"
                            alt={cast.name}
                            className="cast-image"
                          />
                          <div className="cast-info">
                            <h4 className="media-name">{cast.name}</h4>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </section>
          </div>

          <div className="right-content">
            <div className="reviews-section">
              <h2>Reviews</h2>
              <div className="review-summary"></div>

              <div className="featured-review">
                <p className="review-text">
                  I do not know why I could this movie so much. Maybe it was the
                  plot, maybe it was the special effects. Whatever the reason,
                  it was phenomenal and I love it to this day.
                </p>
                <div className="reviewer-info">
                  <span className="reviewer-name">John</span>
                  <div className="reviewer-rating">
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );

};

export default DetailsPage;
