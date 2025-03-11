import React, { useState, useEffect } from "react";
import "./Search.css";
import { GoSearch } from "react-icons/go";
import { api } from "../services/api";
import { MoviesData } from "../interfaces/movie.interface";
import MovieCardSlider from "../components/SearchBarSlider/SearchBarSlider";

const Search: React.FC = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>({
    movieList: [],
    seriesList: [],
    castAndDirectorWiseMovie: [],
    castAndDirectorWiseSeries: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setMoviesData({
        movieList: [],
        seriesList: [],
        castAndDirectorWiseMovie: [],
        castAndDirectorWiseSeries: [],
      });
      return;
    }

    // Debounce API call by 2 seconds
    const timer = setTimeout(() => {
      const searchMovies = async () => {
        try {
          setIsLoading(true);
          const response = await api.get("/search/", {
            params: { search: searchInput },
          });
          console.log(response.data);
          setMoviesData({
            movieList: response?.data?.data?.movieList || [],
            seriesList: response?.data?.data?.seriesList || [],
            castAndDirectorWiseMovie: response?.data?.data?.castAndDirectorWiseMovie || [],
            castAndDirectorWiseSeries: response?.data?.data?.castAndDirectorWiseSeries || [],
          });
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

      <div className="searchMovie-main">
        <div className="searchMovie-container">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {moviesData.movieList.length > 0 && (
                <MovieCardSlider mediaList={moviesData.movieList} title="Movies" />
              )}
              {moviesData.seriesList.length > 0 && (
                <MovieCardSlider mediaList={moviesData.seriesList} title="Series" />
              )}
              {moviesData.castAndDirectorWiseMovie.length > 0 && (
                <MovieCardSlider mediaList={moviesData.castAndDirectorWiseMovie} title="Movies by Cast & Directors" />
              )}
              {moviesData.castAndDirectorWiseSeries.length > 0 && (
                <MovieCardSlider mediaList={moviesData.castAndDirectorWiseSeries} title="Series by Cast & Directors" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;