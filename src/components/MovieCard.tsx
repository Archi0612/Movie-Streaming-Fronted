import { useState } from 'react';
import { Play, Info, Plus } from 'lucide-react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Movie } from '../interfaces/movie.interface';
import { genreMap } from '../utils/constants';
import './MovieCard.css';
const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { title, poster, description, releaseDate, rating, languages, genres } = movie;

  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = poster;

  // ⭐ Star Ratings Logic
  const stars = Array.from({ length: 5 }, (_, index) => {
    const ratingStar = rating / 2;
    if (index + 1 <= ratingStar) {
      return <FaStar key={index} className="star" />;
    } else if (index + 0.5 < ratingStar) {
      return <FaStarHalfAlt key={index} className="star" />;
    } else {
      return <FaStar key={index} className="star-gray" />;
    }
  });

  // 🎭 Genre Mapping
  const genreNames = genres.map((id) => genreMap[id] || "Unknown").join(", ");

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <img src={imageUrl} alt={title} />

      {/* Hover Card */}
      {isHovered && (
        <div className="movie-hover">
          <div className="movie-hover-content">
            {/* Title & Rating */}
            <h3 className="movie-title">{title}</h3>
            <div className="movie-rating">{stars}</div>
            <ul className="movie-details1">
              <li>{new Date(releaseDate).getFullYear()}</li>
              <li>{languages}</li>
              <li>{genreNames}</li>
            </ul>


            {/* Overview */}
            <p className="movie-overview">{description}</p>

            {/* Buttons */}
            <div className="movie-buttons">
              <button className="movie-button play"><Play /></button>
              <button className="movie-button"><Plus /></button>
              <button className="movie-button"><Info /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
