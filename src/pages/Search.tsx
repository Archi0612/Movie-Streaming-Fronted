import React,{useState,useEffect} from "react";
import "./Search.css";
import { fetchTrendingMovies } from "../services/TMDB-api-service";
import { Movie } from "../interfaces/movie.interface";
import Shimmer from "../components/shimmerUI/Shimmer";
import MoviesGrid from "../components/MoviesGrid";
import { GoSearch } from "react-icons/go";
const Search: React.FC = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const[isLoading,setIsLoading]=useState(true);
      useEffect(() => {
        const fetchMovies = async () => {
          try {
            setIsLoading(true);
            const trending=await fetchTrendingMovies();
            setTrendingMovies(trending.results);
          } catch (err) {
            console.error("Error fetching movies", err);
          }
          finally{
            setIsLoading(false);
          }
        };
        fetchMovies();
      }, []);
    
  return (
    <>
    {isLoading?(<Shimmer/>):(

    <div className="search-page">
        <div className="search-container">
        {/* <Sidebar/> */}
      <div className="search-bar">
        <GoSearch className="search-icon" size="30px" color="#fff"/>
        <input  type="text" placeholder="Movies, shows and more" />
      </div>
      </div>
     
      <MoviesGrid movies={trendingMovies} title="Trending in India" />
    </div>
    )}
    </>
  );
};

export default Search;
