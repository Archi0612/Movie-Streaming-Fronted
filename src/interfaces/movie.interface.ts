// src/interfaces/movie.interface.ts
// USER INTERFACES
import { Series } from "./admin.interface";
// this interface is for the whole user profile including userRole
export interface UserDetails {
  id: string | number;
  name: string;
  email: string;
  password?: string;
  profilePicture?: string;
  contactNo: string;
  dateOfBirth: string;
  gender?: string;
  role: string;
  otp?: number;
  user: UserProfile;
}
export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  contactNo?: string;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: string;
  subscriptionPlan?: string;
  role: string;
  isActive: boolean;
}

// Define State Interface
export interface UserState {
  currentUser: UserDetails | null;
  isAuthenticated: boolean;
  loading: boolean;
  success: boolean;
  error?: string;
  // detailsLoading?: boolean;
  // detailsError?: string;
  // userDetails?: UserDetails;
}
export interface MediaCardProps {
  media: {
    _id: string;
    title: string;
    poster: string;
    description: string;
    duration: number;
    releaseDate: string;
    rating: number;
    languages: string[];
    genres: number[];
    contentType: string;
    trailerUrl?: string;
    movieUrl?:string;
  };
}

export interface MoviesData {
  movieList: CategoryData;
  seriesList: CategoryData;
  castAndDirectorWiseMovie: CategoryData;
  castAndDirectorWiseSeries: CategoryData;
}

export interface DefaultData {
  topRatedMovie: CategoryData;
  topRatedSeries: CategoryData;
  popularMovies: CategoryData;
  popularSeries: CategoryData;
}

export interface CategoryData {
  title: string;
  data: MoviesList[];
}
export interface MediaList {
  moviesList: Movie[];
  seriesList: Series[];
}
export interface MoviesList {
  moviesList: Movie[];
}

export interface SeriesList {
  moviesList: Series[];
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
    duration: number;
    contentType: string;
  }[];
  title: string;
}

export interface UserData {
  userData: UserDetails;
}

// Define API Response Types
export interface AuthResponse {
  data: UserData;
  message?: string | string[];
}



// Movie Interface with all movie data
export interface Movie {
  _id: string;
  title: string;
  name: string;
  poster: string;
  description: string;
  releaseDate: string;
  rating: number;
  languages: string[];
  genres: number[];
  directors: ObjectData[];
  casts: ObjectData[];
  director: ObjectData[];
  cast: ObjectData[];
  likes?: boolean;
  trailerUrl: string;
  duration: number;
  contentType: string;
  movieUrl?:string;
}

//  Object Data of Casta and Directors
export interface ObjectData {
  id: string;
  name: string;
  profilePicture: string;
}
export interface Cast{
  cast:{
    _id: string;
    name: string;
    profilePicture: string; 
  }

}
export interface TrendingMoviesProps {
  movies: Movie;
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

export interface Profile {
  name: string;
  gender: string;
  dob: string;
  country: string;
  email: string;
}

// changed the name from FormData to userFormData 
//For signup
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


// Define Type for API Response
export interface ProfileApiResponse {
  data: UserDetails
}


// Define Type for State
export interface ProfileState {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// watchlist interface for state management

interface Content {
  _id: string;
  title: string;
  poster?: string;
}

export interface WatchListItem {
  contentId: Content;
  contentType: string;
  _id: string;
}

export interface WatchListData {
  _id: string;
  watchlist: WatchListItem[];
}
// format of watchlist

// data:{
//   watchlist:{
//   _id:123,
//   watchlist:{
//     contenrtId:1234,
//     contentType:MovieCard,
//     _id321
//   }
//   }
// }

export interface WatchListApiResponse {
  data: {
    watchlist: WatchListData;
  };
}

export interface WatchListState {
  data: WatchListItem[] | null;
  loading: boolean;
  error: string | null;
}



// LikedList Interface for state Management
export interface LikedListState {
  data: LikedContentItem[] | null;
  loading: boolean;
  error: string | null;
}

export interface LikedContentItem {
  _id: string;
  userId: string;
  contentId: string | null; // Can be null
  contentType: string;
  createdAt: string;
  updatedAt: string;
}

export interface LikedContent {
  likedContent: LikedContentItem[];
}

export interface LikedListApiResponse {
  message: string;
  data: LikedContent;
}

