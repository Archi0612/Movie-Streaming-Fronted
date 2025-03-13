import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import MovieCard from "../components/MovieCard";
import {
  getPopularMovies,
  getLatestMovies,
  getTopRatedMovies,
  getHomeTrending,
} from "../services/apis/movieService";
import { Movie } from "../interfaces/movie.interface";

const HeroSection: React.FC = () => {
  const [movies, setMovies] = useState<{
    pop: Movie[];
    latest: Movie[];
    topRated: Movie[];
  }>({
    pop: [],
    latest: [],
    topRated: [],
  });
  const [trending, setTrending] = useState<any[]>([]);




  const movieCategories = [
    { key: "pop", title: "Popular Movies" },
    { key: "latest", title: "Latest Movies" },
    { key: "topRated", title: "Top Rated Movies" },
  ];
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularMoviesResponse, latestResponse, topRatedResponse, trendingResponse] = await Promise.all([
          getPopularMovies(),
          getLatestMovies(),
          getTopRatedMovies(),
          getHomeTrending(),
        ]);
  
        setTrending(trendingResponse);
        console.log("home trending",trending)
  
        setMovies({
          latest: latestResponse?.moviesList || [],
          topRated: topRatedResponse?.moviesList || [],
          pop: popularMoviesResponse?.moviesList || [],
        });
      } catch (err) {
        console.error("Error fetching movies", err);
      }
    };
    fetchMovies();
  }, []);
  


  return (
    <div className="hero-section">
      {/* Main Movie Slider */}
      trendingResponse.map()
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
              <iframe
                width="1930"
                height="950"
                src="https://www.youtube.com/embed/XXuLWW3H3jY?autoplay=1&mute=1"
                title="Avatar 3: Fire and Ash (2025) - First Trailer | James Cameron"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Movie Details */}
        <div className="movie-details">
          <h2 className="movie-title">Movie Name</h2>
          <p className="movie-info">2025 | U/A 16+ | 1 Season | 7 Languages</p>
          <p className="movie-desc">
            Roohi's life turns topsy-turvy after an 'accident' during a medical
            check-up.
          </p>
          <button className="watch-now">▶ Watch Now</button>
        </div>
      </div>

      {/* Movie Categories */}
      <div className="movie-lists">
        {movieCategories.map(({ key, title }) => (
          <div className="movie-category" key={key}>
            <h3 className="movie-category-title">{title}</h3>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="movie-category-swiper"
              breakpoints={{
                1400: { slidesPerView: 6 },
                1200: { slidesPerView: 5 },
                1050: { slidesPerView: 4 },
                768: { slidesPerView: 4 },
                640: { slidesPerView: 4 },
                480: { slidesPerView: 3 },
                400: { slidesPerView: 3 },
                375:{slidesPerView:3},
                300: { slidesPerView: 2 },
              }}
            >
              {movies[key as keyof typeof movies]?.map((movie, index) => (
                <SwiperSlide key={movie._id || `${key}-${index}`}>
                  <MovieCard media={movie} />
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
