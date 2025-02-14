import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import MovieCard from "./MovieCard";
import { Movie } from "../interfaces/movie.interface";
// import "swiper/css";
// import "swiper/css/navigation";
import "./TrendingMovies.css";

interface TrendingMoviesProps {
  movies: Movie[];
}

const TrendingMovies = ({ movies }: TrendingMoviesProps) => {
  return (
    <div className="trending-movies">
      <h2 className="trending-title">Trending Now</h2>
      <div className="relative">
        <Swiper
          slidesPerView={2}
          spaceBetween={15}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          freeMode={true}
          modules={[FreeMode, Navigation]}
          className="trending-slider"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard
                title={movie.title}
                posterPath={movie.poster_path}
                overview={movie.overview}
                releaseDate={movie.release_date}
                voteAverage={movie.vote_average}
                language={movie.original_language}
                genres_id={movie.genre_ids}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button className="swiper-button-prev custom-prev"></button>
        <button className="swiper-button-next custom-next"></button>
      </div>
    </div>
  );
};

export default TrendingMovies;
