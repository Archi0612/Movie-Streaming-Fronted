// src/pages/Genres.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./GenrePage.css";
import { genreImages } from "../../../utils/constants";
import GenreCard from "../../../components/Cards/GenreCard";
const genreMap: { [key: string]: number } = {
  "Rom.": 10749,
  "Action": 28,
  "Adv.": 12,
  "Anim.": 16,
  "Comedy": 35,
  "Crime": 80,
  "Doc.": 99,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "History": 36,
  "Horror": 27,
  "Music": 10402,
  "Myst.": 9648,
  "Sci-Fi": 878,
  "Kids": 10762,
  "BioPic": 101,
  "Thriller": 53,
};


const genres = Object.keys(genreImages);

const GenrePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <div className="gen-container">
      <div className="genre-h2">
        <h2>Popular Genres</h2>
      </div>
      <div className="genres-container">
        {genres.map((genre) => (
          <GenreCard
            key={genre}
            genre={genre}
            image={genreImages[genre]}
            onClick={() => {
              const genreId = genreMap[genre]; // Convert name to ID
              if (genreId) {
                navigate(`/genres/${genreId}`); // Navigate to genre detail page
              } else {
                console.error(`No genre ID found for ${genre}`);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
