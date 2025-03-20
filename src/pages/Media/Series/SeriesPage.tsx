import React, { useEffect, useState } from "react";
import {
  fetchLatestSeriesApi,
  fetchPopularSeriesApi,
  fetchSeriesByGenre,
  fetchTopRatedSeriesApi,
} from "../../../services/apis/seriesService";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import { Series } from "../../../interfaces/series.interface";
import "./SeriesPage.css";
import MoviesGrid from "../../../components/MoviesGrid";
import MovieCard from "../../../components/Cards/MovieCard";
import { Movie } from "../../../interfaces/movie.interface";
import { getHomeTrending } from "../../../services/apis/movieService";

const SeriesPage: React.FC = () => {
  const [series, setSeries] = useState<{
    pop: Series[];
    latest: Series[];
    topRated: Series[];
  }>({
    pop: [],
    latest: [],
    topRated: [],
  });

  const seriesCategories = [
    { key: "pop", title: "Popular Series" },
    { key: "latest", title: "Latest Series" },
    { key: "topRated", title: "Top Rated Series" },
  ];
  const [genreSeries, setGenreSeries] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState<Movie[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);


  const fetchSeries = async () => {
    try {
      const [popularSeries, latestSeries, topRatedSeries, seriesByGenre, trending] =
        await Promise.all([
          fetchPopularSeriesApi(),
          fetchLatestSeriesApi(),
          fetchTopRatedSeriesApi(),
          fetchSeriesByGenre(28),
          getHomeTrending(),
        ]);
      setSeries({
        pop: popularSeries?.seriesList || [],
        latest: latestSeries?.seriesList || [],
        topRated: topRatedSeries?.seriesList || [],
      });
      setGenreSeries(seriesByGenre?.seriesList || []);

      const trendingData = trending?.data?.heroContent || [];
      const filteredTrending = trendingData.filter(
        (item: Movie) => item.contentType === "Series"
      );

      setTrendingSeries(filteredTrending);

    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };
  useEffect(() => {
    fetchSeries();
  }, []);

  document
    .querySelector(".swiper-button-next")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
    });

  document
    .querySelector(".swiper-button-prev")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
    });

  return (
    <div className="series-section">
      <div className="series-slider-container">
        <Swiper
          
          className="main-series-slider"
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          pagination={{ clickable: true }}
          loop={false}
          modules={[Navigation, Pagination]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {trendingSeries.map((series) => (
            <SwiperSlide>
              <div className="movie-video-slider">
                <video width="100%" height="auto" controls autoPlay muted>
                  <source src={series.trailerUrl} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {trendingSeries.length > 0 && (
          <div className="movie-details">
            <h2 className="movie-title">{trendingSeries[activeIndex]?.title}</h2>
            <p className="movie-info">
              {new Date(trendingSeries[activeIndex]?.releaseDate).getFullYear()} |{" "}
              {trendingSeries[activeIndex]?.languages.join(", ")}
            </p>
            <p className="movie-desc">{trendingSeries[activeIndex]?.description}</p>
            <button className="watch-now">▶ Watch Now</button>
          </div>
        )}
      </div>

      <div className="genres-grid">
        {seriesCategories.map(({ key, title }) => (
          <div className="series-category" key={key}>
            <h3 className="series-title">{title}</h3>
            <Swiper
              slidesPerView={5}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              breakpoints={{
                1400: { slidesPerView: 6 },
                1200: { slidesPerView: 5 },
                1050: { slidesPerView: 4 },
                768: { slidesPerView: 4 },
                640: { slidesPerView: 4 },
                480: { slidesPerView: 3 },
                300: { slidesPerView: 2 },
              }}
            >
              {series[key as keyof typeof series]?.length === 0 ? (
                <p>No series available</p>
              ) : (
                series[key as keyof typeof series]?.map((series, index) => (
                  <SwiperSlide key={series._id || `${key}-${index}`}>
                    <MovieCard media={series} />
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        ))}
      </div>

      {/* Action Series */}
      {<MoviesGrid mediaList={genreSeries} title="Action Series" />}
    </div>
  );
};

export default SeriesPage;
