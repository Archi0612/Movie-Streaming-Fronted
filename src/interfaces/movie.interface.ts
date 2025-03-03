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
  showFullHeader?: boolean;
  showOnlyLogo?: boolean;
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
export interface Profile {
  name: string;
  gender: string;
  dob: string;
  country: string;
  email: string;
}

// changed the name from FormData to userFormData
export interface UserFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  numberOTP?: number;
}



export interface Errors {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface OtpState {
  otpSent: boolean;
  otp: string[];
  resendDisabled: boolean;
  resendTimer: number;
  isEditable: boolean;
}
export interface LoginDetails {
  email: string;
  password: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  numberOTP?: number;
}

// Define State Interface
export interface UserState {
  loading: boolean;
  success?: boolean;
  error?: string;
  currentUser?: User | null;
}

// Define API Response Types
export interface AuthResponse {
  token: string;
  userData: User;
}
