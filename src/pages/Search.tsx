import React, { useState, useEffect } from "react";
import "./Search.css";
import Shimmer from "../components/shimmerUI/Shimmer";
import MoviesGrid from "../components/MoviesGrid";
import { GoSearch } from "react-icons/go";
import { Movie } from "../interfaces/movie.interface";
import api from "../services/api";
// import { fetchTrendingMovies } from "../services/TMDB-api-service";

const Search: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(movies.data)

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
          setMovies(response.data.results);
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





  // const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       setIsLoading(true);
  //       const trending = await fetchTrendingMovies();
  //       setTrendingMovies(trending.results);

  //     } catch (err) {
  //       console.error("Error fetching movies", err);
  //     }
  //     finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchMovies();
  // }, []);

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-bar">
          <GoSearch className="search-icon" size="30px" color="#fff" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Movie shows and more"
          />
        </div>
      </div>
      <div className="searchMovie-container">
        <MoviesGrid movies={movies} title="Trending in India" />

      </div>

      {/* {isLoading ? (
        <Shimmer />
      ) : (
        // Render MoviesGrid only if there are movies to show
        movies.length > 0 && <MoviesGrid movies={movies} title="Movies" />
      )} */}
    </div>
  );
};

export default Search;





// import React, { useState, useEffect } from "react";
// import "./Search.css";
// import { fetchTrendingMovies } from "../services/TMDB-api-service";
// import { Movie } from "../interfaces/movie.interface";
// import Shimmer from "../components/shimmerUI/Shimmer";
// import MoviesGrid from "../components/MoviesGrid";
// import { GoSearch } from "react-icons/go";
// const Search: React.FC = () => {
//   const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         setIsLoading(true);
//         const trending = await fetchTrendingMovies();
//         setTrendingMovies(trending.results);
//       } catch (err) {
//         console.error("Error fetching movies", err);
//       }
//       finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMovies();
//   }, []);




//   return (
//     <>
//       {isLoading ? (<Shimmer />) : (

//         <div className="search-page">
//           <div className="search-container">

//             <div className="search-bar">
//               <GoSearch className="search-icon" size="30px" color="#fff" />
//               <input
//                 type="text"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 placeholder="Movie shows and more"
//               />
//             </div>
//           </div>

//           <MoviesGrid movies={trendingMovies} title="Trending in India" />
//         </div>
//       )}
//     </>
//   );
// };

// export default Search;
