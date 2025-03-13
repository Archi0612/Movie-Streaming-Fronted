import { Movie } from "../../interfaces/movie.interface";
import { api } from "../api";

const fetchMovieData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    const data = response?.data?.data;
    if (data?.data?.moviesList) {
      data.data.moviesList = data.data.moviesList.map((movie: Movie[]) => ({
        ...movie,
        contentType: "Movie",
      }));
      console.log(data, "response data")
      return data;
    } else if (data?.moviesList) {
      // If structure is: data.seriesList
      data.moviesList = data.moviesList.map((movie: Movie[]) => ({
        ...movie,
        contentType: "Movie",
      }));
      return data;
    }
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

// API functions
export const getLatestMovies = () => fetchMovieData("/movie/getLatestMovies");
export const getTopRatedMovies = () => fetchMovieData("/movie/getTopRatedMovies");
export const getPopularMovies = () => fetchMovieData("/movie/getPopularMovies");
export const getMoviesByGenre = (genreId: number) => fetchMovieData(`movie/getMoviesByGenre/${genreId}`);
export const getMovieById = (mediaId: string) => fetchMovieData(`movie/getMovieById/${mediaId}`);

// Removed duplicate declaration of getMovieById


// export const getMovieById = async (mediaId: string) => {
//   try {
//     const response = await api.get(`movie/getMovieById/${mediaId}`);
//     const data = response?.data?.data.movie;
//     console.log("Series api call", data);

//     return data;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw new Error(err.message);
//     } else {
//       throw new Error("An error occurred");
//     }
//   }
// }
export const getHomeTrending = async () => {
  try {
    const response = await api.get(`trending/getTrendingContent`);
    
    return response?.data; // Return full data object
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};
