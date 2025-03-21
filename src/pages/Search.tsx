import React, { useState, useEffect, useCallback } from "react";
import "./Search.css";
import { GoSearch } from "react-icons/go";
import { api } from "../services/api";
import { DefaultData, MoviesData } from "../interfaces/movie.interface";
import MovieCardSlider from "../components/SearchBarSlider/SearchBarSlider";
import ShimmerUI from "../components/shimmerUI/Shimmer";
import {
  getPopularMovies,
  getTopRatedMovies,
} from "../services/apis/movieService";
import {
  fetchPopularSeriesApi,
  fetchTopRatedSeriesApi,
} from "../services/apis/seriesService";

const Search: React.FC = () => {

  const [moviesData, setMoviesData] = useState<MoviesData>({
    movieList: { title: "Movies", data: [] },
    seriesList: { title: "Series", data: [] },
    castAndDirectorWiseMovie: {
      title: "Cast And Director Wise Movie",
      data: [],
    },
    castAndDirectorWiseSeries: {
      title: "Cast And Director Wise Series",
      data: [],
    },
  });

  const [defaultMoviesData, setDefaultMoviesData] = useState<DefaultData>({
    popularMovies: { title: "Popular Movies", data: [] },
    popularSeries: { title: "Popular Series", data: [] },
    topRatedMovie: { title: "Top Rated Movies", data: [] },
    topRatedSeries: { title: "Top Rated Series", data: [] },
  });

  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all movies on page load
  const fetchAllMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const [allMoviesRes, allSeriesRes, allTopRatedMovie, allTopRatedSeries] =
        await Promise.all([
          getPopularMovies(),
          fetchPopularSeriesApi(),
          getTopRatedMovies(),
          fetchTopRatedSeriesApi(),
        ]);

      const newMoviesData: DefaultData = {
        popularMovies: {
          title: "Popular Movies",
          data: allMoviesRes?.moviesList || [],
        },
        popularSeries: {
          title: "Popular Series",
          data: allSeriesRes?.seriesList || [],
        },
        topRatedMovie: {
          title: "Top Rated Movies",
          data: allTopRatedMovie?.moviesList || [],
        },
        topRatedSeries: {
          title: "Top Rated Series",
          data: allTopRatedSeries?.seriesList || [],
        },
      };
      setDefaultMoviesData(newMoviesData);
    } catch (err) {
      setError("Error fetching movies and series");
      console.error("Error fetching movies and series", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
        const searchData: MoviesData = {
          movieList: {
            title: "Movies",
            data: response?.data?.data?.movieList || [],
          },
          seriesList: {
            title: "Series",
            data: response?.data?.data?.seriesList || [],
          },
          castAndDirectorWiseMovie: {
            title: "Movies by Cast & Directors",
            data: response?.data?.data?.castAndDirectorWiseMovie || [],
          },
          castAndDirectorWiseSeries: {
            title: "Series by Cast & Directors",
            data: response?.data?.data?.castAndDirectorWiseSeries || [],
          },
        };
        setMoviesData(searchData);
      } catch (err: unknown) {
        if (err instanceof Error) throw new Error(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Determine which data to use: Default or Search Results
  const displayData = searchInput.trim()
    ? Object.entries(moviesData).filter(([_, value]) => value.data.length > 0)
    : Object.entries({
      popularMovies: defaultMoviesData.popularMovies,
      popularSeries: defaultMoviesData.popularSeries,
      topRatedMovie: defaultMoviesData.topRatedMovie,
      topRatedSeries: defaultMoviesData.topRatedSeries,
    }).filter(([_, value]) => value.data.length > 0);

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
          {displayData.map(([key, value]) => (
            <MovieCardSlider
              key={key}
              mediaList={value.data}
              title={value.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
