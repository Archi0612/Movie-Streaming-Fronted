import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // ❌ Removed Autoplay import
import MovieCard from "../components/MovieCard";
import { getMoviesByGenre } from "../services/apis/movieService";
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
  const { genreId } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);

  const numericGenreId = genreId ? Number(genreId) : 0;
  const genreName = genreMap[numericGenreId] || "Unknown Genre";

  const fetchMovies = async () => {
    if (!numericGenreId) {
      console.error("Invalid genreId:", genreId);
      return;
    }

    try {
      // console.log(`Fetching movies for genre ID: ${numericGenreId}`);
      const data = await getMoviesByGenre(numericGenreId);
      // console.log("API Response:", data);

      setMovies(data?.data?.moviesList || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [numericGenreId]);

  return (
    <div className="genre-detail-container">
      <div className="genre-name">
        <h3 className="genre-detail-heading">{genreName}</h3>
        <div className="genre-swiper">
          <Swiper
            slidesPerView={6}
            spaceBetween={20}
            navigation={true}
            modules={[Navigation]} // ✅ Only Navigation module
            autoplay={false} // ✅ Explicitly disable autoplay
            loop={false} // ✅ Ensure loop is disabled
            className="movie-category-swiper"
            breakpoints={{
              1400: { slidesPerView: 6 },
              1200: { slidesPerView: 5 },
              1050: { slidesPerView: 4 },
              768: { slidesPerView: 4 },
              640: { slidesPerView: 4 },
              480: { slidesPerView: 3 },
              400: { slidesPerView: 3 },
              300: { slidesPerView: 2 },
            }}
          >
            {movies.map((movie, index) => (
              <SwiperSlide key={movie._id || `genre-${index}`}>
                <MovieCard media={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GenreDetail;
