import React, { useEffect, useState } from "react";
import "./DetailsPage.css";
import { fetchSeriesByID } from "../services/apis/seriesService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getMovieById } from "../services/apis/movieService";
import { Movie } from "../interfaces/movie.interface";
import { genreMap } from "../utils/constants";
import { FaPlay, FaRegBookmark, FaThumbsUp } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { Seriesdata } from "../interfaces/series.interface";
import { Play, Plus } from "lucide-react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { toggleWatchList } from "../redux/slices/WatchList/WatchList";
import { toggleLike } from "../redux/slices/LikedList/LikedList";
import { toast } from "react-toastify";

const DetailsPage: React.FC = () => {
  const { mediaId } = useParams();
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState<Movie | null>(null);
  const [seriesData, setSeriesData] = useState<Seriesdata[]>();
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get("contentType");
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  const fetchMediaByID = async () => {
    try {
  
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
    }
  };

  useEffect(() => {
    fetchMediaByID();
  }, [mediaId]);

  // 🎭 Genre Mapping

  const genreNames = mediaData?.genres
    .map((id) => genreMap[id] || "Unknown")
    .join(", ");
  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(Number(event.target.value));
  };
  const handleLike = async () => {
    const response = await dispatch(toggleLike({ contentId: mediaId || "", contentType: contentType || ""}));
    console.log(response.payload.message, "Response from detailpahe");
      if(response.payload.message == "Unliked successfully"){
        toast.info("Removed from Liked List");
      }else{
        toast.success("Added to Liked List");
      }
  };

  const handleWatchList = async () => {
    try {
      dispatch(
        toggleWatchList({
          contentId: mediaId || "",
          contentType: contentType || "",
        })
      );
      toast.success("Added in Watchlist successfully!", {
        position: "top-right",
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        toast.error("Failed to add. Try again!", { position: "top-right" });
    }
  };
  const handlePlayVodeo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event from reaching the parent div
    // console.log("video player clicked from movie card");
    navigate(`/videoPlayer`);
  };
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
                className="action-button like-button"
                // onClick={() => {dispatch(toggleLike({ contentId: mediaId || "", contentType: contentType || ""}))}
              onClick={handleLike}
              
              >
                <FaThumbsUp size={16} />
                Like
                {/* <FaThumbsUp size={16} color={isLiked ? "white" : "grey"} />
                {isLiked ? "Unlike" : "Like"} */}
              </button>
              <button className="action-button share-button">
                <FaShareFromSquare size={16} />
                Share
              </button>
              <button
                className="action-button watchlist-button"
                onClick={handleWatchList}
              >
                <FaRegBookmark size={16} />
                Add to Watchlist
              </button>
            </div>
          </div>

          <div className="movie-meta">
            <span className="runtime">
              {(() => {
                const totalSeconds = mediaData?.duration || 0;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                if (hours == 0 || minutes == 0) return;
                return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
              })()}
            </span>
            <span className="divider">•</span>
            <span className="genres">{genreNames}</span>
            <span className="divider">•</span>
            <span className="release-date">
              {new Date(mediaData?.releaseDate as string).getFullYear()}
            </span>
            <span className="divider">•</span>
            <span className="languages">{mediaData?.languages}</span>
          </div>

          <div className="watch-movie">
            <button className="action-button watch-button"
            onClick={handlePlayVodeo}>
              Watch
              <FaPlay size={16} />
            </button>
          </div>
        </div>

        <div className="rating-container">
          <div className="star-rating">
            <span className="star">★</span>
            <span className="rating-score">{mediaData?.rating}</span>
            <span className="total-votes">/10 (1.4M)</span>
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
                <select id="season" onChange={handleSeasonChange}>
                  <option value="No Seasons">Select</option>
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
                            <h4 className="episode-title">
                              Episode {episode.episodeNumber}: {episode.title}
                            </h4>
                            <span className="episode-duration">
                              Duration: {Math.floor(episode.duration / 60)} min
                            </span>
                            <span className="divider">•</span>
                            <span className="episode-release">
                              Released:{" "}
                              {new Date(episode.releaseDate).toDateString()}
                            </span>
                            <p className="episode-description">
                              {episode.description}
                            </p>
                            <div className="episode-buttons">
                              <button className="movie-button play">
                                <Play />
                              </button>
                              <button className="movie-button">
                                <Plus />
                              </button>
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
                  {mediaData?.directors
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
                    : mediaData?.director // Fallback for movie response
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
                  "I don't know why I could this movie so much. Maybe it was the
                  plot, maybe it was the special effects. Whatever the reason,
                  it was phenomenal and I love it to this day."
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
