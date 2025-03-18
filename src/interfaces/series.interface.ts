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
  episodes: Episodes[];
  seasonNumber: number;
  season?: number;
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
