import React, { useState, useEffect } from "react";
import "./Search.css";
import { GoSearch } from "react-icons/go";
import { Movie } from "../interfaces/movie.interface";
import { api } from "../services/api";
// Import MoviesGrid to render the search results
import MoviesGrid from "../components/MoviesGrid"; // Ensure you import this if you plan to use it.

const Search: React.FC = () => {
  const [moviesData, setMoviesData] = useState({
    movieList: [],
    seriesList: [],
    castAndDirectorWiseMovie: [],
    castAndDirectorWiseSeries: []
  });
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(moviesData); // For debugging

  useEffect(() => {
    if (searchInput.trim() === "") {
      setMoviesData({
        movieList: [],
        seriesList: [],
        castAndDirectorWiseMovie: [],
        castAndDirectorWiseSeries: []
      });
      return
    }

    // Debounce the API call by 2 seconds
    const timer = setTimeout(() => {
      const searchMovies = async () => {
        try {
          setIsLoading(true);
          const response = await api.get("/search/", {
            params: { search: searchInput },
          });
          setMoviesData(response.data);
        } catch (err) {
          console.error("Error searching movies", err);
        } finally {
          setIsLoading(false);
        }
      };

      searchMovies();
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-bar">
          <GoSearch className="search-icon" size="30px" color="#fff" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for movies, shows, and more"
          />
        </div>
      </div>

      <div className="searchMovie-container">
        {isLoading ? (
          <div>Loading...</div> // You can replace this with your Shimmer component
        ) : (
          <>
            <MoviesGrid movies={moviesData.movieList} title="Movies" />
            <MoviesGrid movies={moviesData.seriesList} title="Series" />
            <MoviesGrid movies={moviesData.castAndDirectorWiseMovie} title="Movies by Cast & Directors" />
            <MoviesGrid movies={moviesData.castAndDirectorWiseSeries} title="Series by Cast & Directors" />
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
