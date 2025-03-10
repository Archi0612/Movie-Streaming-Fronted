import React, { useEffect, useState } from "react";
import { fetchLatestSeriesApi } from "../services/apis/seriesService";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import MovieCard from "../components/MovieCard";
import { Series } from "../interfaces/series.interface";
const SeriesPage: React.FC = () => {
    const [series, setSeries] = useState<{ latest: Series[] }>({ latest: [] });
    const seriesCategories = [{ key: "latest", title: "Latest Series" }];

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
  const fetchLatestSeries = async () => {
    try {
      const responseOfSeries = await fetchLatestSeriesApi();
      console.log(
        "response from seriesPage",
        responseOfSeries?.seriesList
      );
        setSeries({ latest: responseOfSeries?.seriesList });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };
  useEffect(() => {
    fetchLatestSeries();
  }, []);

  return (
    <div className="series-section">
      <div className="series-slider-container">
        <Swiper
          className="main-series-slider"
          navigation
          pagination={{ clickable: true }}
          loop={true}
          modules={[Navigation, Pagination]}
        >
          {videoData.map((video) => (
            <SwiperSlide>
              <div className="series-slider">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="movie-details">
          <h2 className="movie-title">Movie Name</h2>
          <p className="movie-info">2025 | U/A 16+ | 1 Season | 7 Languages</p>
          <p className="movie-desc">
            Roohi’s life turns topsy-turvy after an ‘accident’ during a medical
            check-up.
          </p>
          <button className="watch-now">▶ Watch Now</button>
        </div>
      </div>

      <div className="series-lists">
        {seriesCategories.map(({ key, title }) => (
          <div className="series-category" key={key}>
            <h3>{title}</h3>
            <Swiper
              slidesPerView={6}
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
                300: { slidesPerView: 2 },
              }}
            >
              {series[key as keyof typeof series].map((series) => (
                <SwiperSlide key={series._id}>
                  <MovieCard
                    title={series.title}
                    poster={series.poster}
                    overview={series.description}
                    releaseDate={series.releaseDate}
                    voteAverage={series.rating}
                    languages={series.languages}
                    genres_id={series.genres}
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

export default SeriesPage;
