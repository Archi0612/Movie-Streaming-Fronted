import React, { useState } from 'react';
import { Play, Info, Plus } from 'lucide-react';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { MovieCardProps } from '../interfaces/movie.interface';
import { genreMap } from '../utils/constants';
import './MovieCard.css';

const MovieCard = ({ title, posterPath, overview, releaseDate, voteAverage, language, genres_id }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const stars = Array.from({ length: 5 }, (_, index) => {
    const rating = voteAverage / 2;
    if (index + 1 <= rating) {
      return <FaStar key={index} className="star" />;
    } else if (index + 0.5 < rating) {
      return <FaStarHalfAlt key={index} className="star" />;
    } else {
      return <FaRegStar key={index} className="star-gray" />;
    }
  });

  const genreNames = genres_id.map((id) => genreMap[id] || "Unknown").join(", ");

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={title} />
      
      {isHovered && (
        <div className="movie-hover">
          <div>
            <h3 className="movie-title">{title}</h3>
            <div className="movie-rating">{stars}</div>
            <ul className="movie-details">
              <li> {new Date(releaseDate).getFullYear()}</li>
              <li> {language?.toUpperCase()}</li>
              <li> {genreNames}</li>
            </ul>
            <p className="movie-overview">{overview}</p>
          </div>
          <div className="movie-buttons">
            <button className="movie-button play"><Play /></button>
            <button className="movie-button"><Plus /></button>
            <button className="movie-button"><Info /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
