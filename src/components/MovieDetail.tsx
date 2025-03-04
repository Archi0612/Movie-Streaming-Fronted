import React ,{useEffect,useState} from "react"
import "./MovieDetail.css"
import { Movie} from "../interfaces/movie.interface"
import { fetchMoviesApi } from "../services/TMDB-api-service"


const MovieDetail: React.FC<Movie> = ({ id }) => {
    const [movie, setMovie] = useState<Movie | null>(null);

 useEffect(()=>{
    const  fetchMovieDetails=async()=>{
        try {
            const detailResponse = await fetchMoviesApi(id);
            setMovie(detailResponse);
        }
        catch(err){
            console.error("Error fetching movie details",err)
         
        }
    }
    fetchMovieDetails();



 },[id])

 if (!movie) {
    return <div>Loading...</div>;
  }
 return (
    <div className="movie-detail">
    <div className="movie-poster">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster-image" />
    </div>
    <div className="movie-info">
      <p className="movie-release-date">{movie.release_date}</p>
      <p className="movie-language"> {movie.original_language}</p>
      <p className="movie-overview">{movie.overview}</p>
      <p className="movie-genres">{movie.genre_ids.join(", ")}</p>
  
    </div>
  </div>
 )

}

export default MovieDetail