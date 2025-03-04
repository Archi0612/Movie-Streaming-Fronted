import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import MovieCard from "../components/MovieCard";
import { fetchTrendingMovies, fetchPopularMovies ,fetchUpcomingMovies} from "../services/TMDB-api-service";
import { Movie } from "../interfaces/movie.interface";

const HeroSection: React.FC = () => {
  const [movies, setMovies] = useState<{ trending: Movie[]; popular: Movie[]; upcoming: Movie[] }>({ trending: [], popular: [], upcoming: [] });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingResponse, popularResponse,upcomingResposne] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchUpcomingMovies()
        ]);
        setMovies({ trending: trendingResponse.results, popular: popularResponse.results, upcoming:upcomingResposne.results });
      } catch (err) {
        console.error("Error fetching movies", err);
      }
    };
    fetchMovies();
  }, []);
  const movieCategories = [
    { key: "trending", title: "Trending Movies" },
    { key: "popular", title: "Popular Movies" },
    { key: "upcoming", title: "Upcoming Movies" },
  ];

  return (
    <div className="hero-section">
      <div className="movie-slider-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="main-movie-slider"
        >
          <SwiperSlide>
            <div className="video-overlay">
            <iframe width="1930" height="950" src="https://www.youtube.com/embed/XXuLWW3H3jY?autoplay=1&mute=1" title="Avatar 3: Fire and Ash (2025) - First Trailer | James Cameron" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="movie-details">
          <h2 className="movie-title">Movie Name</h2>
          <p className="movie-info">2025 | U/A 16+ | 1 Season | 7 Languages</p>
          <p className="movie-desc">
            Roohi’s life turns topsy-turvy after an ‘accident’ during a medical check-up.
          </p>
          <button className="watch-now">▶ Watch Now</button>
        </div>
      </div>

      <div className="movie-lists">
        {movieCategories.map(({ key, title }) => (
          <div className="movie-category" key={key}>
            <h3>{title}</h3>
            <Swiper
              slidesPerView={6}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="movie-category-swiper"
              breakpoints={{
                1400: { slidesPerView: 6},
                1200: { slidesPerView: 5 },
                1050: { slidesPerView: 4 },
                768: { slidesPerView: 4 },
                640: { slidesPerView: 3 },
                480: { slidesPerView: 3 },
                400: { slidesPerView: 2 },
                300:{slidesPerView:1}
              }}
            >
              {movies[key as keyof typeof movies].map((movie) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;