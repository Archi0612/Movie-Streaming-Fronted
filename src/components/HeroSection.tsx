import * as React from "react";
import { useEffect, useState } from "react";
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
import VideoPlayer from "./videoPlayer/videoPlayer";

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
  const [activeIndex, setActiveIndex] = useState(0); 

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
    
       
    
        if (trendingResponse?.data?.heroContent) {
      
          setTrending(trendingResponse.data.heroContent);
        } else {
          setTrending([]); 
        }
    
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

  // Track trending state updates
  useEffect(() => {

  }, [trending]);
  
  return (
    <div className="hero-section">
      {/* Main Movie Slider */}
      <div className="movie-slider-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="main-movie-slider"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} 
        >
          {trending.map((movie) => (
            <SwiperSlide key={movie._id}>
              <div className="video-overlay">
              <VideoPlayer url={movie.trailerUrl} control={true} /> {/* Use VideoPlayer */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {trending.length > 0 && (
          <div className="movie-details">
            <h2 className="movie-title">{trending[activeIndex]?.title}</h2>
            <p className="movie-info">
              {new Date(trending[activeIndex]?.releaseDate).getFullYear()} | {trending[activeIndex]?.languages.join(", ")}
            </p>
            <p className="movie-desc">{trending[activeIndex]?.description}</p>
            <button className="watch-now">▶ Watch Now</button>
          </div>
        )}
      </div>

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
                375: { slidesPerView: 3 },
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
