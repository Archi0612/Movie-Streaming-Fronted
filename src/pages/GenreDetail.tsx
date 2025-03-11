import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre } from "../services/apis/movieService";
import { genreMap } from "../utils/constants";
import "./GenreDetail.css";
import MoviesGrid from "../components/MoviesGrid";
import { fetchSeriesByGenre } from "../services/apis/seriesService";

// Movie Interface
interface Movie {
  _id: string;
  title: string;
  poster: string;
  description: string;
  releaseDate: string;
  rating: number;
  languages: string[];
  genres: number[];
}

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
      setMovies(movieData?.data?.moviesList || []);
      setSeries(seriesData?.data?.data?.seriesList || []);
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
    <div className="genre-detail-container">
      <div className="genre-name">
        {/* <h3 className="genre-detail-heading">{genreName} Movies</h3> */}
        {/* <div className="genre-swiper">
          <Swiper
            slidesPerView={6}
            spaceBetween={20}
            navigation={true}
            modules={[Navigation]} // ✅ Only Navigation module
            autoplay={false} // ✅ Explicitly disable autoplay
            loop={false} // ✅ Ensure loop is disabled
            className="movie-category-swiper"
            breakpoints={{
              1400: { slidesPerView: 6 },
              1200: { slidesPerView: 5 },
              1050: { slidesPerView: 4 },
              768: { slidesPerView: 4 },
              640: { slidesPerView: 4 },
              480: { slidesPerView: 3 },
              400: { slidesPerView: 3 },
              300: { slidesPerView: 2 },
            }}
          >
            {movies.map((movie, index) => (
              <SwiperSlide key={movie._id || `genre-${index}`}>
                <MovieCard media={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
         */}
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
