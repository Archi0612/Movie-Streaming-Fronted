// src/components/GenreCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./GenreCard.css";

interface GenreCardProps {
  genre: string;
  image: string;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre, image }) => {
  const navigate = useNavigate();

  return (
    <div className="genre-card" onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}>
      <img src={image} alt={genre} className="genre-image" />
      <div className="genre-overlay">
        {/* <h3 className="genre-title">{genre}</h3> */}
      </div>
    </div>
  );
};

export default GenreCard;
