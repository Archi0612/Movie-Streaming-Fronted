import React, { useState, useEffect } from "react";
import "./Search.css";
import { GoSearch } from "react-icons/go";
import { Movie } from "../interfaces/movie.interface";
import { api } from "../services/api";
// Import MoviesGrid to render the search results
import MoviesGrid from "../components/MoviesGrid"; // Ensure you import this if you plan to use it.

const Search: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Initialize with an empty array
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(movies); // For debugging

  useEffect(() => {
    // If input is empty, clear the movies state and do not call the API
    if (searchInput.trim() === "") {
      setMovies([]);
      return;
    }

    // Debounce the API call by 2 seconds
    const timer = setTimeout(() => {
      const searchMovies = async () => {
        try {
          setIsLoading(true);
          const response = await api.get("/search/", {
            params: { search: searchInput },
          });

          // Map the data to fit the Movie interface
          const movieList = response.data.movieList.map((movieData: any) => ({
            id: movieData._id,
            title: movieData.title,
            poster_path: movieData.poster,
            description: movieData.description,
            release_date: movieData.releaseDate,
            rating: movieData.rating, 
            genre_ids: movieData.genres,
            language: movieData.languages[0],
          }));

          setMovies(movieList);
        } catch (err) {
          console.error("Error searching movies", err);
        } finally {
          setIsLoading(false);
        }
      };

      searchMovies();
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timeout on effect cleanup
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
          <MoviesGrid movies={movies} title="Movies" />
        )}
      </div>
    </div>
  );
};

export default Search;
