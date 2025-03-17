import React from "react";
import "./GenreCard.css";

interface GenreCardProps {
  genre: string;
  image: string;
  onClick: () => void; // Accept onClick as a prop
}

const GenreCard: React.FC<GenreCardProps> = ({ genre, image, onClick }) => {
  return (
    <div className="genre-card" onClick={onClick}>
      <img src={image} alt={genre} className="genre-image" />
    </div>
  );
};

export default GenreCard;
