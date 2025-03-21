import { useEffect, useState } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre } from "../../../services/apis/mediaService/movieService";
import { genreMap } from "../../../utils/MediaConstants";
import "./GenreDetail.css";
import MoviesGrid from "../../../components/MoviesGrid";
import { fetchSeriesByGenre } from "../../../services/apis/mediaService/seriesService";
import { Movie } from "../../../interfaces/movie.interface";



const GenreDetail: React.FC = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);


  const numericGenreId = genreId ? Number(genreId) : 0;
  const genreName = genreMap[numericGenreId] || "Unknown Genre";
  const fetchByGenres = async () => {
    if (!numericGenreId) {
      console.error("Invalid genreId:", genreId);
      return;
    }
    try {
      const movieData = await getMoviesByGenre(numericGenreId);
      const seriesData = await fetchSeriesByGenre(numericGenreId);
      setMovies(movieData?.moviesList || []);
      setSeries(seriesData?.seriesList || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      setMovies([]);
      setSeries([]);
    }
  };
  useEffect(() => {
    fetchByGenres();
  }, [numericGenreId]);




  return (
    <div className="genre-detailpage-container">
      <div className="genre-name">
        \
        <div className="genre-series-container">
          {!series?.length && !movies?.length ? (
            <img className="image-not-found" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIlkfLdB2GiAbY3aZoTvPlWdvgcgwveVEXog&s" alt="No Data Found" />
          ) : (
            <div>
              {movies?.length > 0 && (
                <MoviesGrid mediaList={movies} title={`${genreName} Movies`} />
              )}
              {series?.length > 0 && (
                <MoviesGrid mediaList={series} title={`${genreName} Series`} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default GenreDetail;