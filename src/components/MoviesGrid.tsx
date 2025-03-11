// import React from "react";
// import MovieCard from "./MovieCard";
// import { MovieGridProps } from "../interfaces/movie.interface";
// import "./MovieGrid.css";

// const MoviesGrid: React.FC<MovieGridProps> = ({
//   movies,
//   title,
// }) => {
//   return (
//     <div className="movies-grid">
//       <h2 className="movies-title">{title}</h2>
//       <div className="movies-container">
//         {movies.map((movie) => (
//           <MovieCard
//             key={movie.id}
//             title={movie.title}
//             posterPath={movie.poster}
//             overview={movie.overview}
//             releaseDate={movie.release_date}
//             voteAverage={movie.vote_average}
//             language={movie.original_language}
//             genres_id={movie.genre_ids}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MoviesGrid;

import React from "react";
import MovieCard from "./MovieCard";
import "./MovieGrid.css";
import { MediaGridProps } from "../interfaces/movie.interface";



const MoviesGrid: React.FC<MediaGridProps> = ({ mediaList = [], title }) => {
  return (
    <div className="movies-grid">
      <h2 className="all-movies-title">{title}</h2>
      <div className="movies-container">
        {mediaList.map((media) => (
          <MovieCard key={media._id} media={media} />
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;