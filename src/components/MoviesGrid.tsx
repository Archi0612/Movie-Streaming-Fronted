import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../interfaces/movie.interface';
import './MovieGrid.css';

interface MovieGridProps {
  movies: Movie[];
  title: string;
}

const MoviesGrid = ({ movies, title }: MovieGridProps) => {
  return (
    <div className="movies-grid">
      <h2 className="movies-title">{title}</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            overview={movie.overview}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
            language={movie.original_language}
            genres_id={movie.genre_ids}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;
