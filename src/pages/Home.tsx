import React, { useEffect, useState } from "react";
import MoviesGrid from "../components/MoviesGrid";
import TrendingMovies from "../components/TrendingMovies";
import { fetchTrendingMovies, fetchMoviesByGenre } from "../services/TMDB-api-service";
import { Movie } from "../interfaces/movie.interface";
import "./Home.css"; // Import CSS

const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const trending = await fetchTrendingMovies();
        setTrendingMovies(trending.results.slice(0, 10));

        const action = await fetchMoviesByGenre(28);
        setActionMovies(action.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-container">
    

      {/* Trending Movies */}
      <div className="section-container">
        <TrendingMovies movies={trendingMovies} />
      </div>

      {/* Action Movies */}
      <div className="section-container">
        <MoviesGrid movies={actionMovies} title="Action Movies" />
      </div>
    </div>
  );
};

export default Home;
