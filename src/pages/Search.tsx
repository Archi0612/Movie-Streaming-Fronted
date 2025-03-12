import React,{useState,useEffect} from "react";
import "./Search.css";
import { getPopularMovies } from "../services/apis/movieService"
import { Movie } from "../interfaces/movie.interface";
import Shimmer from "../components/shimmerUI/Shimmer";
import MoviesGrid from "../components/MoviesGrid";
import { GoSearch } from "react-icons/go";
const Search: React.FC = () => {
    const [popularMovies, setpopularMovies] = useState<Movie[]>([]);
    const[isLoading,setIsLoading]=useState(true);
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const popular=await getPopularMovies();
        setpopularMovies(popular.data.moviesList);
      } catch (err) {
        console.error("Error fetching movies", err);
      }
      finally{
        setIsLoading(false);
      }
    };  
    useEffect(() => {
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
     
      <MoviesGrid mediaList={popularMovies} title="Popular in India" />
    </div>
    )}
    </>
  );
};

export default Search;
