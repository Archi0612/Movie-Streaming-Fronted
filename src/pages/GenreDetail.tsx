import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import MovieCard from "../components/MovieCard";
import { getMoviesByGenre } from "../services/TMDB-api-service";
import { genreMap } from "../utils/constants";
import "./GenreDetail.css";

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
  const { genreId } = useParams(); // Get genreId from URL
  const [movies, setMovies] = useState<Movie[]>([]);
 
  const numericGenreId = genreId ? Number(genreId) : 0;
  const genreName = genreMap[numericGenreId] || "Unknown Genre";

  useEffect(() => {
    const fetchMovies = async () => {
      if (!genreId) {
        console.error("Genre ID is undefined!");
        return;
      }

      const numericGenreId = Number(genreId);
      if (isNaN(numericGenreId)) {
        console.error("Invalid genreId:", genreId);
        return;
      }

      console.log(`Fetching movies for genre ID: ${numericGenreId}`);

      const data = await getMoviesByGenre(numericGenreId);
      console.log("API Response:", data); // Log the full API response

      if (data?.data?.moviesList) {
        setMovies(data.data.moviesList);
      } else {
        console.warn("No moviesList found in API response");
        setMovies([]);
      }
    };

    fetchMovies();
  }, [genreId]);

  return (
    <div className="genre-detail-container">
      <div className="genre-name">
      <h3 className="genre-detail-heading">{genreName}</h3>
      <div className="genre-swiper">
      <Swiper
        slidesPerView={5}
        spaceBetween={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="movies-swiper"
        breakpoints={{
          1400: { slidesPerView: 5 },
          1200: { slidesPerView: 4 },
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id} className="swiper-slide">
            <MovieCard
              title={movie.title}
              posterPath={movie.poster}
              overview={movie.description}
              releaseDate={movie.releaseDate}
              voteAverage={movie.rating}
              language={movie.languages[0]}
              genres_id={movie.genres}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      </div>
    </div>
  );
};

export default GenreDetail;
