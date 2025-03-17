import React from "react";
import "./MoviesGrid.css";
import { MediaGridProps } from "../interfaces/movie.interface";
import MovieCard from "./Cards/MovieCard";


const MoviesGrid: React.FC<MediaGridProps> = ({ mediaList, title }) => {
  return (
    <div className="movies-grid">
      <h2 className="all-movies-title">{title}</h2>
      <div className="movies-container">
        {mediaList.map((media) => (
          <MovieCard key={media._id} media={media} />
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;