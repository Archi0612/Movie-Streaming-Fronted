import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MoviesGrid from "../components/MoviesGrid";
import MovieCard from "../components/MovieCard";
import { getMoviesByGenre, getPopularMovies } from "../services/apis/movieService";
import { Movie } from "../interfaces/movie.interface";
import "./Home.css";
import Sidebar from "./Sidebar";
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
        setPopularMovies(popular?.data?.moviesList || []); // Safe access with fallback

        // Fetch action movies
        const action = await getMoviesByGenre(28);
        setActionMovies(action?.data?.moviesList || []); // Safe access with fallback
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
          {/* Sticky Sidebar */}
          {/* <Sidebar /> */}

          {/* Popular Movies - Swiper */}
          <div className="section-container">
          <h3 className="home-popular-movies">Popular Movies</h3>
            <Swiper
              slidesPerView={6}
              spaceBetween={4}
              navigation
              modules={[Navigation]}
              className="popular-movies-swiper"
              breakpoints={{
                1600:{slidesPerView:6},
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
              {popularMovies.map((movie) =>
                movie._id ? (
                  <SwiperSlide key={movie._id}>
              
                    <MovieCard movie={movie}  />
                  </SwiperSlide>
                ) : null // Prevent rendering items without _id
              )}
            </Swiper>
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
