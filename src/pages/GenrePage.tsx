// src/pages/Genres.tsx
import React from "react";
import GenreCard from "../components/GenreCard";
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
import Sidebar from "./Sidebar";

// Dummy images for other genres
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
  return (
    <div className="gen-container">
        <Sidebar />
        <h2>Popular Genres</h2>
    <div className="genres-container">
      {genres.map((genre) => (
        <GenreCard key={genre} genre={genre} image={genreImages[genre]} />
      ))}
    </div>
    </div>
  );
};

export default GenrePage;
