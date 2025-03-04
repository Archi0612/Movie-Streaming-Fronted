import React, { useState } from 'react';
import { Play, Info, Plus } from 'lucide-react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MovieCardProps } from '../interfaces/movie.interface';
import { genreMap } from '../utils/constants';
import './MovieCard.css';

const MovieCard = ({ title, posterPath, overview, releaseDate, voteAverage, language, genres_id }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  // ⭐ Star Ratings Logic
  const stars = Array.from({ length: 5 }, (_, index) => {
    const rating = voteAverage / 2;
    if (index + 1 <= rating) {
      return <FaStar key={index} className="star"  />;
    } else if (index + 0.5 < rating) {
      return <FaStarHalfAlt key={index} className="star"  />;
    } else {
      return <FaStar key={index} size={23} className="star-gray" />;
    }
  });

  // 🎭 Genre Mapping
  const genreNames = genres_id.map((id) => genreMap[id] || "Unknown").join(", ");

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
              <li>{language?.toUpperCase()}</li>
              <li>{genreNames}</li>
            </ul>
            

            {/* Overview */}
            <p className="movie-overview">{overview}</p>

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
