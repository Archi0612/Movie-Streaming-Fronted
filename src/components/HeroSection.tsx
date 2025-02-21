import React from "react";
import "./HeroSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/trailer.mp4" type="video/mp4" />
      </video>

      {/* Movie Details */}
      <div className="movie-details">
        <h2 className="movie-title">Oops Ab Kya?</h2>
        <p className="movie-info">2025 | U/A 16+ | 1 Season | 7 Languages</p>
        <p className="movie-desc">
          Roohi’s life turns topsy-turvy after an ‘accident’ during a medical check-up.
        </p>
        <button className="watch-now">▶ Watch Now</button>
      </div>

      {/* Movie Slider */}
      <div className="movie-slider">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide><img src="/movie1.jpg" alt="Movie 1" /></SwiperSlide>
          <SwiperSlide><img src="/movie2.jpg" alt="Movie 2" /></SwiperSlide>
          <SwiperSlide><img src="/movie3.jpg" alt="Movie 3" /></SwiperSlide>
          <SwiperSlide><img src="/movie4.jpg" alt="Movie 4" /></SwiperSlide>
          <SwiperSlide><img src="/movie5.jpg" alt="Movie 5" /></SwiperSlide>
          <SwiperSlide><img src="/movie6.jpg" alt="Movie 6" /></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSection;
