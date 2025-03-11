// src/interfaces/movie.interface.ts
// USER INTERFACES

import { IconType } from "react-icons/lib";


export interface User {
  id: string;
  name: string;
  email: string;
  contactNo?: string,
  password?: string;
  // token?: string;
  otp?: number;
  role: string;
}

export interface MediaCardProps {
  media: {
    _id: string;
    title: string;
    poster: string;
    description: string;
    releaseDate: string;
    rating: number;
    languages: string[];
    genres: number[];
  };
}

// Generic Props for Both Movies & Series
export interface MediaGridProps {
  mediaList: {
    _id: string;
    title: string;
    poster: string;
    description: string;
    releaseDate: string;
    rating: number;
    languages: string[];
    genres: number[];
  }[];
  title: string;
}

// Define State Interface
export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  success: boolean;
  error?: string;
  detailsLoading?: boolean;
  detailsError?: string;
  userDetails?: UserDetails;
}

// export interface UserResponse{
//   id: string;
//   name: string;
//   email: string;
//   contactNo:string
//   role: string;
// }

interface UserData {
  userData: User;
}

// Define API Response Types
export interface AuthResponse {
  data: UserData;
  message?: string | string[];
}

// this interface is for the whole user profile
export interface UserDetails {
  id: string | number;
  name: string;
  email: string;
  profilePicture?: string;
  contactNo: string;
  dateOfBirth: string;
  gender: string;
  role: string;
  // add info about watchlist and subscription and like content
}

export interface SidebarProps {
  userRole: string; // Optional prop to determine if user is admin
}

export interface MenuItem {
  name: string;
  icon: IconType;
  path: string;
  isAdminMenu: boolean; // Make it optional
}

export interface Movie {
  _id: string;
  title: string;
  poster: string;
  description: string;
  releaseDate: string;
  rating: number;
  languages: string[];
  genres: number[];
}

export interface TrendingMoviesProps {
  movies: Movie;
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
  language: string[];
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
  contactNo: string;
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

// Define API Response Types
export interface AuthResponse {
  token: string;
  // data: data;
  message?: string | string[];
}


