// import React from "react";
// import MovieCard from "./MovieCard";
// import { Movie } from "../interfaces/movie.interface";
// import "./MovieGrid.css";

// interface MoviesGridProps {
//   movies: Movie[];
//   title: string;
// }

// const MoviesGrid: React.FC<MoviesGridProps> = ({ movies = [], title }) => {
//   return (
//     <div className="movies-grid">
//       <h2 className="all-movies-title">{title}</h2>
//       <div className="movies-container">
//         {movies.map((movie) => (
//           <MovieCard key={movie._id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MoviesGrid;

import React from "react";
import MovieCard from "./MovieCard";
import "./MovieGrid.css";

// Generic Props for Both Movies & Series
interface MediaGridProps {
  mediaList: {
    _id: string;
    title: string;
    poster: string;
    description: string;
    releaseDate: string;
    rating: number;
    languages: string[];
    genres: number[];
  }[];
  title: string;
}

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
