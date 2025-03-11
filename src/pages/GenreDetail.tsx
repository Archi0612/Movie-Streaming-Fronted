import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // ❌ Removed Autoplay import
import MovieCard from "../components/MovieCard";
import { getMoviesByGenre } from "../services/apis/movieService";
import { fetchSeriesByGenre } from "../services/apis/seriesService";
import { genreMap } from "../utils/constants";
import "./GenreDetail.css";
import MoviesGrid from "../components/MoviesGrid";

// Movie Interface
interface Movie {
  _id: string;
  title: string;
  poster: string;
  description: string;
  releaseDate: string;
  rating: number;
  languages: string[];
  genres: number[];
}

const GenreDetail: React.FC = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series ,setSeries]=useState<Movie[]>([])

  const numericGenreId = genreId ? Number(genreId) : 0;
  const genreName = genreMap[numericGenreId] || "Unknown Genre";

  const fetchMovies = async () => {
    if (!numericGenreId) {
      console.error("Invalid genreId:", genreId);
      return;
    }

    try {
      // console.log(`Fetching movies for genre ID: ${numericGenreId}`);
      const movie = await getMoviesByGenre(numericGenreId);
      // console.log("API Response:", data);

      const series =await fetchSeriesByGenre(numericGenreId)

      setMovies(movie?.data?.moviesList || []);
      setSeries(series?.data?.seriesList)
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [numericGenreId]);

  return (
    <div className="genre-detailpage-container">
  
      <div className="genre-grids-container"> {/* Common container for same styling */}
        <MoviesGrid mediaList={movies} title={`${genreName} Movies`} />
        <MoviesGrid mediaList={series} title={`${genreName} Series`} />
      </div>
    </div>
  );
  
};

export default GenreDetail;