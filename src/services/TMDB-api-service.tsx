import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
import {api} from "../services/api"
// import { BASE_URL } from "../utils/constants";
// import { API_KEY } from "../utils/constants";

export const fetchMoviesApi = async(page=1) => {
    try{
        const response = await axios.get(`
            ${BASE_URL}/movie/now_playing`, {
                params:{
                    api_key: API_KEY,
                    page: page
                }
            }
        );
        console.log("response from fetchmovies", response);
        return response.data.results;
    }catch(err){
        console.error("Error fetching TMDB api", err);
        return [];
    }
   
}

export const fetchTrendingMovies = async () => {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    return response.json();
  };
  

  export const fetchMoviesByGenre = async (genreId: number) => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    console.log("response from fetchmoviesbygenres", response);
    return response.json();
  };
  
  export const fetchPopularMovies = async () => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=2`
    );
    return response.json();
  }

  export const fetchUpcomingMovies = async () => {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
    );
    return response.json();
  }
  // export const fetchMovieTrailer = async (movieId: number) => {
  //   const response = await fetch(
  //     `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  //   );
  //   const data = await response.json();
  //   return data.results.find((video: any) => video.type === 'Trailer');
  // };
  
  export const getSearchMovies = async (query: string) => {
    try {
      const response = await api.get(`/search`, {
        params: { search: query },
      });
      return response.data; 
    } catch (error) {
      console.error("Error searching:", error);
      return null;
    }
  };
  
