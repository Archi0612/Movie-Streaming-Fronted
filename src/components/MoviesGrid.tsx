
import React from "react";
import MovieCard from "./MovieCard";
import "./MovieGrid.css";
import { MediaGridProps } from "../interfaces/movie.interface";


const MoviesGrid: React.FC<MediaGridProps> = ({ mediaList, title }) => {
  console.log(mediaList, "medialist in moviegrid comp");
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