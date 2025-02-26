import React from "react";
import "./HeroSection.css";
import vid1 from "../assets/video.webm";
// import vid2 from "../assets/video2.mp4";
// import vid3 from "../assets/video3.mp4";
// import vid4 from "../assets/video4.mp4";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]} // Include Navigation module
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="video-overlay">
            <video autoPlay loop muted>
              <source src={vid1} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="video-overlay">
            <video autoPlay loop muted>
              {/* <source src={vid2} type="video/mp4" /> */}
              Your browser does not support the video tag.
            </video>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="video-overlay">
            <video autoPlay loop muted>
              {/* <source src={vid3} type="video/mp4" /> */}
              Your browser does not support the video tag.
            </video>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="video-overlay">
            <video autoPlay loop muted>
              {/* <source src={vid4} type="video/mp4" /> */}
              Your browser does not support the video tag.
            </video>
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

      <div className="additional-content">
        <h3>More Movies</h3>
        <p>Explore our collection of movies and TV shows.</p>
      </div>
    </div>
  );
};

export default HeroSection;