// src/interfaces/movie.interface.ts

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
}

export interface TrendingMoviesProps {
  movies: Movie[];
}

export interface MovieGridProps {
  movies: Movie[];
  title: string;
}
export interface MovieCardProps {
  title: string;
  posterPath: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  language: string;
  genres_id: number[];
}

export interface MovieGridProps {
  movies: Movie[];
  title: string;
}

export interface HeaderProps {
  minimal?: boolean;
}
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface VideoResponse {
  id: number;
  results: VideoResult[];
}
