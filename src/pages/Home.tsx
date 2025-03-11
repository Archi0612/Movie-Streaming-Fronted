import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MoviesGrid from "../components/MoviesGrid";
import MovieCard from "../components/MovieCard";
import { getMoviesByGenre, getPopularMovies } from "../services/apis/movieService";
import { Movie } from "../interfaces/movie.interface";
import "./Home.css";
import Shimmer from "../components/shimmerUI/Shimmer";

const Home: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        // Fetch popular movies
        const popular = await getPopularMovies();
        setPopularMovies(popular?.data?.moviesList || []); 

        // Fetch action movies
        const action = await getMoviesByGenre(28);
        setActionMovies(action?.data?.moviesList || []); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="home-container">
          {/* Popular Movies - Swiper */}
          <div className="section-container">
            <h3 className="home-popular-movies">Popular Movies</h3>
            <Swiper
  slidesPerView={6}
  spaceBetween={20}
  navigation={true}
  modules={[Navigation]}
  autoplay={false}
  loop={false}
  className="movie-category-swiper" 
  breakpoints={{
    1400: { slidesPerView: 6 },
    1200: { slidesPerView: 5 },
    1050: { slidesPerView: 4 },
    768: { slidesPerView: 4 },
    640: { slidesPerView: 4 },
    550: { slidesPerView: 4},
    480: { slidesPerView: 3 },
    400: { slidesPerView: 3 },
    300: { slidesPerView: 2 },
  }}
>
  {popularMovies.slice(0, 10).map((movie, index) => (
    <SwiperSlide key={movie._id || `popular-${index}`}>
      <MovieCard movie={movie} />
    </SwiperSlide>
  ))}
</Swiper>


            {/* Navigation Buttons */}
            
          </div>

          {/* Action Movies - Grid */}
          <div className="home-grid-container">
            <MoviesGrid movies={actionMovies} title="Action Movies" />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
