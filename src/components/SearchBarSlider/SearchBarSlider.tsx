import React, { useRef } from "react";
import { MediaGridProps } from "../../interfaces/movie.interface";
import MovieCard from "../MovieCard";
import "./SearchBarSlider.css";

const MovieCardSlider: React.FC<MediaGridProps> = ({ mediaList, title }) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    console.log(mediaList, "mediaList");
    console.log(title, "title"); 

    return (
        <div className="searchbarslidermain_container">
            <h2 className="searchbarslidermain_title">{title}</h2>
            <div className="slider-container">
                <div className="searchmovie-slider" ref={sliderRef}>
                    {mediaList?.map((media) => (
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