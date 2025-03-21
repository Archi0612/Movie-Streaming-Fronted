import romImage from "../assets/img/genres/rom.webp";
import actionImage from "../assets/img/genres/action.webp";
import advImage from "../assets/img/genres/adventure.webp";
import animImage from "../assets/img/genres/animation.webp";
import comedyImage from "../assets/img/genres/comedy.webp";
import crimeImage from "../assets/img/genres/crime.webp";
import docImage from "../assets/img/genres/documentary.webp";
import dramaImage from "../assets/img/genres/drama.webp";
import familyImage from "../assets/img/genres/family.webp";
import fantasyImage from "../assets/img/genres/fantasy.webp";
import historyImage from "../assets/img/genres/history.webp";
import horrorImage from "../assets/img/genres/horror.webp";
import musicImage from "../assets/img/genres/music.webp";
import mystImage from "../assets/img/genres/mystery.webp";
import scifiImage from "../assets/img/genres/scifi.webp";
import kidsImage from "../assets/img/genres/kids.webp";
import biopicImage from "../assets/img/genres/biopic.webp";
import thrillerImage from "../assets/img/genres/thriller.webp";
import { AxiosError } from "axios";

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


export const ratingToReview: { [key: number]: string } = {
  10: "Outstanding",
  9: "Excellent",
  8: "Very Good",
  7: "Great",
  6: "Above Average",
  5: "Average",
  4: "Below Average",
  3: "Mediocre",
  2: "Poor",
  1: "Terrible",
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

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || "Failed to fetch data";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};