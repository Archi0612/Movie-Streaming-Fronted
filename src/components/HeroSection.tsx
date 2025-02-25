import React from "react";
import "./HeroSection.css";
import img1 from "../assets/salar.jpeg";
import img2 from "../assets/kgf2poster.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      {/* Movie Slider and Details */}
      <div className="movie-slider-container">
        <div className="movie-slider">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            freeMode={true}
            navigation={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }} // Add autoplay configuration
            modules={[FreeMode, Navigation, Autoplay]} // Include Autoplay module
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="image-overlay">
                <img src={img1} alt="Movie 1" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-overlay">
                <img src={img2} alt="Movie 2" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-overlay">
                <img src="/movie3.jpg" alt="Movie 3" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-overlay">
                <img src="/movie4.jpg" alt="Movie 4" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Movie Details */}
        <div className="movie-details">
          <h2 className="movie-title">Movie Name</h2>
          <p className="movie-info">2025 | U/A 16+ | 1 Season | 7 Languages</p>
          <p className="movie-desc">
            Roohi’s life turns topsy-turvy after an ‘accident’ during a medical check-up.
          </p>
          <button className="watch-now">▶ Watch Now</button>
        </div>
      </div>

      {/* Additional Content */}
      <div className="additional-content">
        <h3>More Movies</h3>
        <p>Explore our collection of movies and TV shows.</p>
      </div>
    </div>
  );
};

export default HeroSection;