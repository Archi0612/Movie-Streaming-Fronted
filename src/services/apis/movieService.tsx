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
      console.log("movie popular response",response)
      return response.data;

    }catch(error){
      console.error("Error getting popular movie",error)
      return null
    }
  }

  export const getTopRated=async()=>{
    try{
        const response=await api.get(`movie/getTopRatedMovies`)
        console.log("top rated",response)
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
        console.log("latest movies",response)
        return response.data
    }
    catch(error){
        console.error("error in latest",error)
        return null
    }
  }



