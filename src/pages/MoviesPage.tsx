import React, { useEffect, useState } from "react";
import { fetchTrendingMovies, fetchMoviesByGenre } from "../services/TMDB-api-service";
import MoviesGrid from "../components/MoviesGrid";
import TrendingMovies from "../components/TrendingMovies";
import "./MoviesPage.css"; // Import CSS

const MoviesPage: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trending = await fetchTrendingMovies();
      setTrendingMovies(trending.results);

      const action = await fetchMoviesByGenre(28);
      setActionMovies(action.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page">
      <div className="trending-movies">
        <TrendingMovies movies={trendingMovies} />
      </div>
      <MoviesGrid movies={actionMovies} title="Action Movies" />
    </div>
  );
};

export default MoviesPage;
