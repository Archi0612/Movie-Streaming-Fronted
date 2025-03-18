import React, { useRef } from "react";
import { MediaGridProps } from "../../interfaces/movie.interface";
import "./SearchBarSlider.css";
import MovieCard from "../Cards/MovieCard";

const MovieCardSlider: React.FC<MediaGridProps> = ({ mediaList, title }) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    // const scrollLeft = () => {
    //     if (sliderRef.current) {
    //         sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    //     }
    // };

    // const scrollRight = () => {
    //     if (sliderRef.current) {
    //         sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    //     }
    // };

    return (
        <div className="searchbarslidermain_container">
            <h2 className="searchbarslidermain_title">{title}</h2>
            <div className="slider-container">

                <div className="searchmovie-slider" ref={sliderRef}>
                    {mediaList.map((media) => (
                        <div key={media._id} className="movie-slide">
                            <MovieCard media={media} />
                        </div>
                    ))}
                </div>

            </div>
        </div>


    );
};

export default MovieCardSlider;