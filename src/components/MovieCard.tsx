import { useState } from "react";
import { Play, Plus } from "lucide-react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { genreMap } from "../utils/constants";
import "./MovieCard.css";
import { MediaCardProps } from "../interfaces/movie.interface";
import { toggleWatchList } from "../redux/slices/WatchList/WatchList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";


const MovieCard: React.FC<MediaCardProps> = ({ media }) => {
  console.log(media, "media in moviecard compo");
  const { title, poster, description, releaseDate, rating, languages, genres, _id, contentType } = media;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // ⭐ Star Ratings Logic
  const stars = Array.from({ length: 5 }, (_, index) => {
    const ratingStar = rating / 2;
    if (index + 1 <= ratingStar) {
      return <FaStar key={index} className="star" size={16} />;
    } else if (index + 0.5 < ratingStar) {
      return <FaStarHalfAlt key={index} className="star" size={16} />;
    } else {
      return <FaStar key={index} className="star-gray" size={16} />;
    }
  });

  // 🎭 Genre Mapping
  const genreNames = genres.map((id) => genreMap[id] || "Unknown").join(", ");
  const mediaId = media._id;
  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/details/${mediaId}?contentType=${contentType}`)}

    >
      <img src={poster} alt={title} />
      {
        isHovered && (
          <div className="movie-hover">
            <div className="movie-hover-content">
              <h3 className="movies-title">{title.toUpperCase()}</h3>
              <div className="movie-rating">{stars}</div>
              <ul className="movie-details1">
                <li>{new Date(releaseDate).getFullYear()}</li>
                {languages.map((lang, index) => (
                  <li key={index}>{lang}</li>
                ))}
                <li>{genreNames}</li>
              </ul>
              <p className="movie-overview">{description}</p>

              {/* Buttons */}
              <div className='button-container'>
                <div className="movie-buttons">
                  <button className="movie-button play">
                    <Play />
                  </button>
                  <button className="movie-button" onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleWatchList({ contentId: _id, contentType: contentType }));
                  }}>
                    <Plus />
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


