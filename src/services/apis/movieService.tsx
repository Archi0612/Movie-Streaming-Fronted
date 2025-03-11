import {api} from "../api"
export const getMoviesByGenre = async (genreId: number) => {
    try {
      const response = await api.get(`movie/getMoviesByGenre/${genreId}`);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      return null; // Handle errors gracefully
    }
  };

  export const getPopularMovies=async()=>{
    try{
      const response = await api.get(`movie/getPopularMovies`)
      return response.data;

    }catch(error){
      console.error("Error getting popular movie",error)
      return null
    }
  }

  export const getTopRatedMovies=async()=>{
    try{
        const response=await api.get(`movie/getTopRatedMovies`)
        return response.data
    }
    catch(error){
        console.error("Eror in top rated",error)
        return null
    }
  }

  export const getLatestMovies=async()=>{
    try{
        const response=await api.get(`movie/getLatestMovies`)
        return response.data
    }
    catch(error){
        console.error("error in latest",error)
        return null
    }
  }



