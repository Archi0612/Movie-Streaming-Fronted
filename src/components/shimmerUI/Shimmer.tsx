import React from "react";
import "./shimmer.css";

const ShimmerUI: React.FC = () => {
  return (
    <div className="shimmer-wrapper">
      {/* Shimmer for Trending Movies (Swiper) */}
      <div className="shimmer-container">
        <h2 className="shimmer-title"></h2>
        <div className="shimmer-trending-slider">
          {Array(6).fill(null).map((_, index) => (
            <div key={index} className="shimmer-card"></div>
          ))}
        </div>
      </div>

      {/* Shimmer for Movies Grid (Action Movies) */}
      <div className="shimmer-container">
        <h2 className="shimmer-title"></h2>
        <div className="shimmer-grid">
          {Array(6).fill(null).map((_, index) => (
            <div key={index} className="shimmer-card"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerUI;
