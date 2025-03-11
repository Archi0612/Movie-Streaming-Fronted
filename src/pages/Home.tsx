import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MoviesGrid from "../components/MoviesGrid";
import MovieCard from "../components/MovieCard";
import { getLatestMovies, getMoviesByGenre, getPopularMovies, getTopRatedMovies } from "../services/apis/movieService";
import { Movie } from "../interfaces/movie.interface";
import "./Home.css";
import Shimmer from "../components/shimmerUI/Shimmer";

const Home: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        const popular = await getPopularMovies();
        setPopularMovies(popular?.data?.moviesList || []);

        const latest = await getLatestMovies();
        setLatestMovies(latest?.data?.moviesList || []);

        const topRated = await getTopRatedMovies();
        setTopRatedMovies(topRated?.data?.moviesList || []);

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

  const movieSections = [
    { title: "Popular Movies", movies: popularMovies },
    { title: "Latest Movies", movies: latestMovies },
    { title: "Top Rated Movies", movies: topRatedMovies },
  ];

  return (
    <>
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="home-container">
          <div className="section-container">
            {movieSections.map(({ title, movies }) => (
              <div key={title}>
                <h3 className="home-popular-movies">{title}</h3>
                <Swiper
                  slidesPerView={6}
                  spaceBetween={4}
                  navigation
                  modules={[Navigation]}
                  className="popular-movies-swiper"
                  breakpoints={{
                    1600: { slidesPerView: 6 },
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
                  {movies.map((movie) =>
                    movie._id ? (
                      <SwiperSlide key={movie._id}>
                        <MovieCard media={movie} />
                      </SwiperSlide>
                    ) : null
                  )}
                </Swiper>
              </div>
            ))}
          </div>

          {/* Action Movies - Grid */}
          <div className="home-grid-container">
            <MoviesGrid mediaList={actionMovies} title="Action Movies" />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
