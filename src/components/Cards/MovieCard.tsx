import React, { useState } from "react";
import { Play, Plus, Minus } from "lucide-react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MediaCardProps } from "../../interfaces/movie.interface";
import { AppDispatch } from "../../redux/store";
import { genreMap } from "../../utils/MediaConstants";
import { toggleWatchList } from "../../redux/slices/WatchList/WatchList";
const MovieCard: React.FC<MediaCardProps> = ({ media }) => {
  const {
    _id = "",
    title = "Unknown Title",
    poster = "/Series/default.png",
    description = "No description available",
    contentType = "Movie",
    releaseDate = "0000-00-00",
    rating = 0,
    languages = [],
    genres = [],
  } = media || {};
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isBookMarked, setBookMarked] = useState<boolean>(false);

  // Star Ratings
  const stars = Array.from({ length: 5 }, (_, index) => {
    const ratingStar = Math.max(0, rating / 2);
    if (rating >= 0) {
      if (index + 1 <= ratingStar) {
        return <FaStar key={index} className="star" size={16} />;
      } else if (index + 0.5 < ratingStar) {
        return <FaStarHalfAlt key={index} className="star" size={16} />;
      } else {
        return <FaStar key={index} className="star-gray" size={16} />;
      }
    }

  });

  //Genre maping
  const genreNames = (genres ?? []).slice(4).map((id) => genreMap[id] || "Unknown").join(", ");



  const handleCardClick = () => {
    if (!_id) {
      navigate("/error")
    }
    navigate(`/details/${_id}?contentType=${contentType}`)
  }
  const handlePlayVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event from reaching the parent div
    if (!_id) {
      navigate("/error")
    }
    if (contentType === "Movie") {
      navigate(`/watch/${_id}?contentType=${contentType}`);
    } else (
      navigate(`/details/${_id}?contentType=${contentType}`)
    )
  };
  const handleAddToWatchList = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event from reaching the parent div
    try {
      const response = await dispatch(
        toggleWatchList({
          contentId: _id || "",
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

  return (
    <div
      className="movie-card"
      data-testid="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // onClick={() => navigate('/details')}
      onClick={handleCardClick}
    >
      <img src={poster} alt={title} />
      {
        isHovered && (
          <div className="movie-hover">
            <div className="movie-hover-content">
              <h3 className="movies-title">{title.toUpperCase()}</h3>
              {rating >= 0 && (
                <div className="movie-rating" data-testid="star-rating">{stars}</div>
              )}
              <ul className="movie-details1">
                <li>{new Date(releaseDate).getFullYear()}</li>
                {languages.map((lang, index) => (
                  <li key={index}>{lang.slice(0, 3).toUpperCase()}</li>
                ))}
                <li>{genreNames}</li>
              </ul>
              <p className="movie-overview">{description}</p>

              {/* Buttons */}
              <div className='button-container'>
                <div className="movie-buttons">
                  <button className="movie-button play"
                    onClick={handlePlayVideo}>
                    <Play />
                  </button>
                  <button
                    data-testid="watchlist-button"
                    aria-label="Add to Watchlist"
                    className="movie-button"
                    onClick={handleAddToWatchList}>
                    {isBookMarked ? (
                      <Minus />
                    ) : (
                      <Plus />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default MovieCard;


