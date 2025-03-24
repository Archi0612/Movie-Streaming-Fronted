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
export const genreMap: { [key: number]: string } = {
  28: "Action",
  12: "Adv.", // Adventure -> Adv.
  16: "Anim.", // Animation -> Anim.
  35: "Comedy",
  80: "Crime",
  99: "Doc.", // Documentary -> Doc.
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Myst.", // Mystery -> Myst.
  10749: "Romance", // Romance -> Rom.
  878: "Sci-Fi", // Science Fiction -> Sci-Fi
  10770: "TV", // TV Movie -> TV
  53: "Thriller", // Thriller -> Thrill.
  10752: "War",
  37: "Western",
};

// Genre images mapping
export const genreImages: { [key: string]: string } = {
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

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;

}

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
