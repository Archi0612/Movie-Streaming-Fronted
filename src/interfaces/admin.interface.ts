

export interface Movie {
    id: string;
    poster: string;
    title: string;
    description: string;
    rating: number;
    duration: string;
    cast: {_id:string;name:string}[];
    director: {_id:string;name:string}[];
    action?: string;
    
  }
export interface Series {
    id: string;
    poster: string;
    title: string;
    description?: string;
    rating: number;
    cast?: {_id:string;name:string}[];
    director?: {_id:string;name:string}[];
  }
export interface AddMovies{
    title: string;
    description: string;
    releaseDate: string;
    genres: { value: string; label: string }[];
    duration: string;
    rating: string;
    cast: { value: string; label: string }[];
    director: { value: string; label: string }[];
    poster: File | null;
    trailerUrl: File | null;
    movieUrl: File | null;
    languages: { value: string; label: string }[];
}
export interface EditMovieModalProps {
    movieId: string;
    onClose: () => void;
    onSave: (updatedMovie: any) => void;
  }
export interface  Addseries {
    title: string;
    description: string;
    genres: { value: string; label: string }[];
    releaseDate: string;
    rating: string;
    cast: { value: string; label: string }[];
    director: { value: string; label: string }[];
    languages: { value: string; label: string }[];
    poster: File | null;
    trailerUrl: File | null;
    availableForStreaming: boolean;
  }
export interface EditSeriesModalProps{
    seriesId:string;
    onClose:()=>void;
    onSave:(updatedSeries:any)=>void;
  }
export interface Episode {
    title: string;
    description: string;
    duration: string;
    episodeNumber: number;
    episode: File | null;
    thumbnail:File | null;
    releaseDate: string;
  }
export interface Season {
    seasonNumber: number;
    episodes: Episode[];
  }
export interface User {
    _id: number;
    name: string;
    email: string;
    contactNo: string;
    subscription:Subscription;
    role: string;
    isActive: boolean;
  }
export interface Subscription{
    plan:string
  }