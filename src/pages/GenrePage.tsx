// src/pages/Genres.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import GenreCard from "../components/GenreCard";
import Sidebar from "./Sidebar";
import "./GenrePage.css";
import romImage from "../assets/rom.webp"; 
import actionImage from "../assets/action.webp";
import advImage from "../assets/adventure.webp";
import animImage from "../assets/animation.webp";
import comedyImage from "../assets/comedy.webp";
import crimeImage from "../assets/crime.webp";  
import docImage from "../assets/documentary.webp";
import dramaImage from "../assets/drama.webp";
import familyImage from "../assets/family.webp";
import fantasyImage from "../assets/fantasy.webp";
import historyImage from "../assets/history.webp";
import horrorImage from "../assets/horror.webp";
import musicImage from "../assets/music.webp";  
import mystImage from "../assets/mystery.webp";
import scifiImage from "../assets/scifi.webp";
import kidsImage from "../assets/kids.webp";
import biopicImage from "../assets/biopic.webp";
import thrillerImage from "../assets/thriller.webp";

// Genre name to genre ID mapping
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

// Genre images mapping
const genreImages: { [key: string]: string } = {
  "Rom.": romImage,
  "Action": actionImage,
  "Adv.": advImage,
  "Anim.": animImage,
  "Comedy": comedyImage,
  "Crime": crimeImage,
  "Doc.": docImage,
  "Drama": dramaImage,
  "Family": familyImage,
  "Fantasy": fantasyImage,
  "History": historyImage,
  "Horror": horrorImage,
  "Music": musicImage,
  "Myst.": mystImage,
  "Sci-Fi": scifiImage,
  "Kids": kidsImage,
  "BioPic": biopicImage,
  "Thriller": thrillerImage,
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
