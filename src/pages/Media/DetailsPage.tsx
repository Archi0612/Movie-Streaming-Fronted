import React, { useEffect, useState } from "react";
import "./DetailsPage.css";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getMovieById } from "../../services/apis/mediaService/movieService";
import { Movie } from "../../interfaces/movie.interface";
import { genreMap, secondToMin } from "../../utils/MediaConstants";
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
import { fetchSeriesByID } from "../../services/apis/mediaService/seriesService";
import SharePopup from "../../components/Search-popUp/SharePopup";
import ReactModal from "react-modal";

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
  const [loading, setLoading] = useState(false);
  const [isSharePopupOpen, setSharePopupOpen] = useState(false);

  const handleShare = () => {
    console.log("sharebtn clicked");
    setSharePopupOpen(true);
  };

  const handleCloseSharePopup = () => {
    setSharePopupOpen(false);
  };

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
    } finally {
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
    navigate(`/watch/${mediaId}?contentType=${contentType}`);
  };
  const handlePlayEpisode = (episodeId: string) => {
    // e.stopPropagation();
    // console.log("episode player clicked from movie card");
    // console.log("episodeUrl", episodeUrl);
    navigate(`/watch/${episodeId}?contentType=${contentType}`);
  };

  const handleDurationTime = () => {
   return secondToMin(mediaData?.duration || 0);
  };

  if (loading) {
    return <Loader />;
  }
  if (!mediaData?._id) {
    navigate("/error");
  }
  return (
    <div className="details-container">
      <div className="header-container">
        <div className="video-overlay">
          {mediaData?.trailerUrl && (
            <ReactPlayer
              url={mediaData.trailerUrl}
              width="100%"
              height="40rem"
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
              <button
                className="action-button share-button"
                onClick={handleShare}
              >
                <FaShareFromSquare size={16} />
                Share
                
              </button>
              {isSharePopupOpen && (<ReactModal
                  isOpen={isSharePopupOpen}
                  onRequestClose={() => setSharePopupOpen(false)}
                  className="share-modal"
                  shouldCloseOnEsc={true}
                  shouldCloseOnOverlayClick={true}
                  overlayClassName="share-overlay"
                >
                  <SharePopup
                  url={window.location.href}
                  onClose={handleCloseSharePopup}
                  mediaId = {mediaId}
                  contentType = {contentType}
                />
                </ReactModal>)}
              {/* // Add SharePopup Component (conditionally render it) */}
              {/* {isSharePopupOpen && (
                <SharePopup
                  url={window.location.href}
                  onClose={handleCloseSharePopup}
                />
              )} */}
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
          {contentType == "Movie" ? (
            <div className="watch-movie">
              <button
                className="action-button watch-button"
                onClick={handlePlayVideo}
                name="watch-btn"
              >
                Watch
                <FaPlay size={16} />
              </button>
            </div>
          ) : (
            ""
          )}
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
                <select
                  id="season"
                  key={seriesData.length}
                  onChange={handleSeasonChange}
                >
                  <option value="No Seasons" key={seriesData.length}>
                    Select
                  </option>
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
                                      handlePlayEpisode(episode._id)
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
              {/* Casts Section */}
              <div className="cast-section">
                <h3 className="medieaData-subtitle">Casts</h3>
                <div className="cast-list">
                  {mediaData?.cast && mediaData.cast.length > 0 ? (
                    mediaData.cast.map((c, index) => (
                      <div key={index} className="cast-member">
                        <img
                          src={c.profilePicture || "/public/default.png"} // Use default if no profilePicture
                          alt={c.id}
                          className="cast-image"
                        />
                        <div className="cast-info">
                          <h4 className="media-name">{c.name}</h4>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="cast-no-data">
                      No cast information available.
                    </p>
                  )}
                </div>
              </div>

              {/* Directors Section */}
              <div className="director">
                <h3 className="medieaData-subtitle">Directors</h3>
                <div className="cast-list">
                  {mediaData?.directors ? ( //series response
                    mediaData.directors.map((director, index) => (
                      // <Swiper>
                      <div key={index} className="cast-member">
                        <img
                          src="/public/default.png"
                          alt={director.name}
                          className="cast-image"
                        />
                        <div className="cast-info">
                          <h4 className="media-name">{director.name}</h4>
                        </div>
                        {/* </Swiper> */}
                      </div>
                    ))
                  ) : mediaData?.director ? ( // movie response
                    mediaData.director.map((director, index) => (
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
                  ) : (
                    <p className="cast-no-data">
                      No Directors information are available.
                    </p>
                  )}
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
