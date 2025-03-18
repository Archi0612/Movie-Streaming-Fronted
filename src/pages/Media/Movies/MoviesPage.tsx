import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination   } from "swiper/modules";
import MoviesGrid from "../../../components/MoviesGrid";

import { getLatestMovies, getMoviesByGenre, getPopularMovies, getTopRatedMovies } from "../../../services/apis/movieService";
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
  
        const popular = await getPopularMovies();
        console.log("Popular Movies Response:", popular?.data);
        console.log("Popular Movies List:", popular?.data?.moviesList);
  
        const latest = await getLatestMovies();
        console.log("Latest Movies Response:", latest?.data);
        console.log("Latest Movies List:", latest?.data?.moviesList);
  
        const topRated = await getTopRatedMovies();
        console.log("Top Rated Movies Response:", topRated?.data);
        console.log("Top Rated Movies List:", topRated?.data?.moviesList);
  
        const action = await getMoviesByGenre(28);
        console.log("Action Movies Response:", action?.data);
        console.log("Action Movies List:", action?.data?.moviesList);
  
        setPopularMovies(popular?.moviesList || []);
        setLatestMovies(latest?.moviesList || []);
        setTopRatedMovies(topRated?.moviesList || []);
        setActionMovies(action?.moviesList || []);
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
  const videoData = [
    {
      id: 1,
      title: "The Falcon and the Winter Soldier",
      url: "https://www.youtube.com/embed/pW_b6jOl1o8?si=BU8mEiGDuf5dbMEo",
    },
    {
      id: 2,
      title: "Loki",
      url: "https://www.youtube.com/embed/dug56u8NN7g?si=8val9smLbvGc3Har",
    },
    {
      id: 3,
      title: "The Mandalorian",
      url: "https://www.youtube.com/embed/Znsa4Deavgg?si=_SSagp7GeRpZIp99",
    },
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
          loop={true}
          modules={[Navigation, Pagination]}
        >
          {videoData.map((video) => (
            <SwiperSlide>
              <div className="movie-video-slider">
                <iframe
                  width="100%"
                  height="1000"
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="movie-details">
          {/* {seriesCategories.map(({key, title}) => (
                <div className="series-title" key={key}>{title}</div>
                      
            ))} */}

          <h2 className="movie-video-title">
            The Falcon and the Winter Soldier
          </h2>
          <p className="movie-info">2025 | U/A 16+ | 1 Season | 7 Languages</p>
          <p className="movie-desc">
            Roohi’s life turns topsy-turvy after an ‘accident’ during a medical
            check-up.
          </p>
          <button className="watch-now">▶ Watch Now</button>
        </div>
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
