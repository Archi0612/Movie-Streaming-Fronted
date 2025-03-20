import { Dispatch, SetStateAction } from "react";

//Video Player Interface
export interface VideoPlayerProps {
  url: string;
  control?: boolean;
  loop?: boolean;
  setPopUp: Dispatch<SetStateAction<boolean>>; 
}
export interface Series {
  _id: string;
  title: string;
  poster: string;
  description: string;
  releaseDate: string;
  genres: number[];
  languages: string[];
  video: boolean;
  rating: number;
  episodes: Episodes[];
  seasonNumber: number;
  season?: number;
  duration: number;
  episodeUrl?: string;
  contentType: string;
}

export interface Seriesdata {
  _id: string;
  season?: number;
  series: Series[];
  episodes: Episodes[];
}
export interface Episodes {
  _id: string;
  episodeNumber: number;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
  duration: number;
  seasonNumber?: number;
  episodeUrl: string;
}
