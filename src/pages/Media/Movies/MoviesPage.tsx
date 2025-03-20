import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination   } from "swiper/modules";
import MoviesGrid from "../../../components/MoviesGrid";

import { getHomeTrending, getLatestMovies, getMoviesByGenre, getPopularMovies, getTopRatedMovies } from "../../../services/apis/mediaService/movieService";
import { Movie } from "../../../interfaces/movie.interface";
import "./MoviesPage.css";
import Shimmer from "../../../components/shimmerUI/Shimmer";
import MovieCard from "../../../components/Cards/MovieCard";

const MoviesPage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
      const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
  
        const [popular, latest, topRated, action,trending] = await Promise.all([
          getPopularMovies(),
          getLatestMovies(),
          getTopRatedMovies(),
          getMoviesByGenre(28),
          getHomeTrending(),
        ]);
      
  
        setPopularMovies(popular?.moviesList || []);
        setLatestMovies(latest?.moviesList || []);
        setTopRatedMovies(topRated?.moviesList || []);
        setActionMovies(action?.moviesList || []);

        const trendingData = trending?.data?.heroContent || [];
        const filteredTrending = trendingData.filter(
          (item: Movie) => item.contentType === "Movie"
        );

        setTrendingMovies(filteredTrending);

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
          <div className="moviepage-slider-container">
          <Swiper
          className="main-movie-slider"
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          pagination={{ clickable: true }}
          loop={false}
          modules={[Navigation, Pagination]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {trendingMovies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <div className="movie-video-slider">
              <video width="100%" height="auto" controls autoPlay muted>
                  <source src={movie.trailerUrl} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {trendingMovies.length > 0 && (
          <div className="movie-details">
            <h2 className="movie-title">{trendingMovies[activeIndex]?.title}</h2>
            <p className="movie-info">
              {new Date(trendingMovies[activeIndex]?.releaseDate).getFullYear()} |{" "}
              {trendingMovies[activeIndex]?.languages.join(", ")}
            </p>
            <p className="movie-desc">{trendingMovies[activeIndex]?.description}</p>
            <button className="watch-now">▶ Watch Now</button>
          </div>
        )}
      </div>
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
                    380:{slidesPerView :3},
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

export default MoviesPage;
