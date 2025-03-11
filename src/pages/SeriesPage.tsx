import React, { useEffect, useState } from "react";
import {
  fetchLatestSeriesApi,
  fetchPopularSeriesApi,
  fetchtopRatedSeriesApi,
} from "../services/apis/seriesService";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import MovieCard from "../components/MovieCard";
import { Series } from "../interfaces/series.interface";
import "./SeriesPage.css";

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
  const fetchSeries = async () => {
    try {
      const [popularSeries, latestSeries, topRatedSeries] = await Promise.all([
        fetchPopularSeriesApi(),
        fetchLatestSeriesApi(),
        fetchtopRatedSeriesApi(),
      ]);
      setSeries({
        pop: popularSeries?.seriesList || [],
        latest: latestSeries?.seriesList || [],
        topRated: topRatedSeries?.seriesList || [],
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };
  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className="series-section">
      <div className="series-slider-container">
        <Swiper
          className="main-series-slider"
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          modules={[Navigation, Pagination]}
        >
          {videoData.map((video) => (
            <SwiperSlide>
              <div className="series-video-slider">
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

        <div className="series-details">
          {/* {seriesCategories.map(({key, title}) => (
                <div className="series-title" key={key}>{title}</div>
                      
            ))} */}

          <h2 className="series-video-title">
            The Falcon and the Winter Soldier
          </h2>
          <p className="series-info">2025 | U/A 16+ | 1 Season | 7 Languages</p>
          <p className="series-desc">
            Roohi’s life turns topsy-turvy after an ‘accident’ during a medical
            check-up.
          </p>
          <button className="watch-now">▶ Watch Now</button>
        </div>
      </div>

      
      <div className="genres-grid">
        {seriesCategories.map(({ key, title }) => (
          <div className="series-category" key={key}>
            <h3 className="series-title">{title}</h3>
            <Swiper
              slidesPerView={5}
              spaceBetween={20}
              navigation = {true}
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

      {/* 🎥 Latest & Popular Series
            <MoviesGrid mediaList={series} title="Latest Series" />
      <MoviesGrid mediaList={popularSeries} title="Popular Series" /> */}
    </div>
  );
};

export default SeriesPage;
