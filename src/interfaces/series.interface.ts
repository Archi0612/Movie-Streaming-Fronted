// export interface Series {
//   _id: string;
//   title: string;
//   poster: string;
//   description: string;
//   releaseDate: string;
//   genres: number[];
//   languages: string[];
//   video: boolean;
//   rating: number;
// }

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
  trailerUrl: string;
  episodes: Episodes[]; // List of episodes for this specific season
  seasonNumber: number; // This replaces 'season' to be more specific
  directors?: string[];
  casts?: Series[];
}
export interface Seriesdata {
  _id: string;
  season: number;
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
  trailerUrl: string;
}