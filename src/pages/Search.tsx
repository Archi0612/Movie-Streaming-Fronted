import React, { useState, useEffect, useCallback } from "react";
import "./Search.css";
import { GoSearch } from "react-icons/go";
import { api } from "../services/api";
import { DefaultData, MoviesData } from "../interfaces/movie.interface";
import MovieCardSlider from "../components/SearchBarSlider/SearchBarSlider";
import ShimmerUI from "../components/shimmerUI/Shimmer";
import { getPopularMovies, getTopRatedMovies } from "../services/apis/movieService";
import { fetchPopularSeriesApi, fetchTopRatedSeriesApi } from "../services/apis/seriesService";

const Search: React.FC = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>({
    movieList: { title: "Movies", data: [] },
    seriesList: { title: "Series", data: [] },
    castAndDirectorWiseMovie: { title: "Cast And Director Wise Movie", data: [] },
    castAndDirectorWiseSeries: { title: "Cast And Director Wise Series", data: [] },
  });

  const [defaultMoviesData, setDefaultMoviesData] = useState<DefaultData>({
    movieList: { title: "Movies", data: [] },
    seriesList: { title: "Series", data: [] },
    topRatedMovie: { title: "Top Rated Movies", data: [] },
    topRatedSeries: { title: "Top Rated Series", data: [] },
  });

  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(defaultMoviesData, "defaultMoviesData");
  // Fetch all movies on page load
  const fetchAllMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const [allMoviesRes, allSeriesRes, allTopRatedMovie, allTopRatedSeries] = await Promise.all([
        getPopularMovies(),
        fetchPopularSeriesApi(),
        getTopRatedMovies(),
        fetchTopRatedSeriesApi(),
      ]);
      const newMoviesData: DefaultData = {
        movieList: allMoviesRes || [],
        seriesList: allSeriesRes || [],
        topRatedMovie: allTopRatedMovie || [],
        topRatedSeries: allTopRatedSeries || [],
      };
      setDefaultMoviesData(newMoviesData);
    } catch (err) {
      console.error("Error fetching movies and series", err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  console.log(defaultMoviesData.movieList, "defaultMoviesData.movieList");

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  // Fetch search results when user types
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/search/", {
          params: { search: searchInput },
        });
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
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, defaultMoviesData]);

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

      {isLoading && <ShimmerUI />}

      <div className="searchMovie-main">
        <div className="searchMovie-container">
          <MovieCardSlider
            mediaList={searchInput.trim() === "" ? defaultMoviesData.movieList.data?.moviesList : moviesData.movieList}
            title={searchInput.trim() === "" ? defaultMoviesData.movieList.title : moviesData.movieList.title}
          />
          <MovieCardSlider
            mediaList={searchInput.trim() === "" ? defaultMoviesData.seriesList.seriesList : moviesData.seriesList}
            title={searchInput.trim() === "" ? defaultMoviesData.seriesList.title : moviesData.seriesList.title}
          />

          <MovieCardSlider
            mediaList={searchInput.trim() === "" ? defaultMoviesData.topRatedMovie.moviesList : moviesData.castAndDirectorWiseMovie}
            title={searchInput.trim() === "" ? defaultMoviesData.topRatedMovie.title : moviesData.castAndDirectorWiseMovie.title}

          />

          <MovieCardSlider
            mediaList={searchInput.trim() === "" ? defaultMoviesData.topRatedSeries.seriesList : moviesData.castAndDirectorWiseSeries}
            title={searchInput.trim() === "" ? defaultMoviesData.topRatedSeries.title : moviesData.castAndDirectorWiseSeries.title}

          />
        </div>
      </div>
    </div>
  );
};

export default Search;



// import React, { useState, useEffect, useCallback } from "react";
// import "./Search.css";
// import { GoSearch } from "react-icons/go";
// import { api } from "../services/api";
// import { DefaultData, MoviesData } from "../interfaces/movie.interface";
// import MovieCardSlider from "../components/SearchBarSlider/SearchBarSlider";
// import ShimmerUI from "../components/shimmerUI/Shimmer";
// import { getPopularMovies, getTopRatedMovies } from "../services/apis/movieService";
// import { fetchPopularSeriesApi, fetchTopRatedSeriesApi } from "../services/apis/seriesService";

// const Search: React.FC = () => {
//   const [moviesData, setMoviesData] = useState<DefaultData>({
//     movieList: { title: "Search Results: Movies", data: [] },
//     seriesList: { title: "Search Results: Series", data: [] },
//     topRatedMovie: { title: "Search Results: Movies by Cast & Directors", data: [] },
//     topRatedSeries: { title: "Search Results: Series by Cast & Directors", data: [] },
//   });

//   const [defaultMoviesData, setDefaultMoviesData] = useState<DefaultData>({
//     movieList: { title: "Popular Movies", data: [] },
//     seriesList: { title: "Popular Series", data: [] },
//     topRatedMovie: { title: "Top Rated Movies", data: [] },
//     topRatedSeries: { title: "Top Rated Series", data: [] },
//   });

//   const [searchInput, setSearchInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch default movies and series
//   const fetchAllMovies = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const [allMoviesRes, allSeriesRes, allTopRatedMovie, allTopRatedSeries] = await Promise.all([
//         getPopularMovies(),
//         fetchPopularSeriesApi(),
//         getTopRatedMovies(),
//         fetchTopRatedSeriesApi(),
//       ]);

//       setDefaultMoviesData({
//         movieList: { title: "Popular Movies", data: allMoviesRes || [] },
//         seriesList: { title: "Popular Series", data: allSeriesRes || [] },
//         topRatedMovie: { title: "Top Rated Movies", data: allTopRatedMovie || [] },
//         topRatedSeries: { title: "Top Rated Series", data: allTopRatedSeries || [] },
//       });
//     } catch (err) {
//       console.error("Error fetching movies and series", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllMovies();
//   }, [fetchAllMovies]);

//   // Fetch search results when user types
//   useEffect(() => {
//     if (searchInput.trim() === "") {
//       setMoviesData({
//         movieList: { title: "Search Results: Movies", data: [] },
//         seriesList: { title: "Search Results: Series", data: [] },
//         topRatedMovie: { title: "Search Results: Movies by Cast & Directors", data: [] },
//         topRatedSeries: { title: "Search Results: Series by Cast & Directors", data: [] },
//       });
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get("/search/", {
//           params: { search: searchInput },
//         });

//         setMoviesData({
//           movieList: { title: "Search Results: Movies", data: response?.data?.data?.movieList || [] },
//           seriesList: { title: "Search Results: Series", data: response?.data?.data?.seriesList || [] },
//           topRatedMovie: {
//             title: "Search Results: Movies by Cast & Directors",
//             data: response?.data?.data?.castAndDirectorWiseMovie || [],
//           },
//           topRatedSeries: {
//             title: "Search Results: Series by Cast & Directors",
//             data: response?.data?.data?.castAndDirectorWiseSeries || [],
//           },
//         });
//       } catch (err) {
//         console.error("Error searching movies", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [searchInput]);

//   return (
//     <div className="search-page">
//       <div className="search-container">
//         <div className="search-bar">
//           <GoSearch className="search-icon" size="30px" color="#fff" />
//           <input
//             type="text"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search for movies, shows, and more"
//           />
//         </div>
//       </div>

//       {isLoading && <ShimmerUI />}

//       <div className="searchMovie-main">
//         <div className="searchMovie-container">
//           {/* Movies */}
//           {((searchInput.trim() === "" && defaultMoviesData.movieList.data.length > 0) ||
//             moviesData.movieList.data.length > 0) && (
//               <MovieCardSlider
//                 mediaList={searchInput.trim() === "" ? defaultMoviesData.movieList.data : moviesData.movieList.data}
//                 title={searchInput.trim() === "" ? defaultMoviesData.movieList.title : moviesData.movieList.title}
//               />
//             )}

//           {/* Series */}
//           {((searchInput.trim() === "" && defaultMoviesData.seriesList.data.length > 0) ||
//             moviesData.seriesList.data.length > 0) && (
//               <MovieCardSlider
//                 mediaList={searchInput.trim() === "" ? defaultMoviesData.seriesList.data : moviesData.seriesList.data}
//                 title={searchInput.trim() === "" ? defaultMoviesData.seriesList.title : moviesData.seriesList.title}
//               />
//             )}

//           {/* Movies by Cast & Directors */}
//           {((searchInput.trim() === "" && defaultMoviesData.topRatedMovie.data.length > 0) ||
//             moviesData.topRatedMovie.data.length > 0) && (
//               <MovieCardSlider
//                 mediaList={
//                   searchInput.trim() === ""
//                     ? defaultMoviesData.topRatedMovie.data
//                     : moviesData.topRatedMovie.data
//                 }
//                 title={searchInput.trim() === "" ? defaultMoviesData.topRatedMovie.title : moviesData.topRatedMovie.title}
//               />
//             )}

//           {/* Series by Cast & Directors */}
//           {((searchInput.trim() === "" && defaultMoviesData.topRatedSeries.data.length > 0) ||
//             moviesData.topRatedSeries.data.length > 0) && (
//               <MovieCardSlider
//                 mediaList={
//                   searchInput.trim() === ""
//                     ? defaultMoviesData.topRatedSeries.data
//                     : moviesData.topRatedSeries.data
//                 }
//                 title={searchInput.trim() === "" ? defaultMoviesData.topRatedSeries.title : moviesData.topRatedSeries.title}
//               />
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;
