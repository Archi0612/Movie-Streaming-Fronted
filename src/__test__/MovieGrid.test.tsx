import { MediaGridProps } from "@/interfaces/movie.interface";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import watchlistReducer from "../redux/slices/WatchList/WatchList";
import MoviesGrid from "../components/MoviesGrid";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import React from "react";

// Mock movies list
const mockMovies: MediaGridProps = {
  title: "Popular Movies",
  mediaList: [
    {
      _id: "1",
      title: "Movie One",
      poster: "movie1.jpg",
      description: "First test movie",
      duration: 1300,
      releaseDate: "2024-01-01",
      rating: 7.8,
      languages: ["English"],
      genres: [28],
      contentType: "Movie",
    },
    {
      _id: "2",
      title: "Movie Two",
      poster: "movie2.jpg",
      description: "Second test movie",
      duration: 27000,
      releaseDate: "2024-02-01",
      rating: 8.2,
      languages: ["Hindi"],
      genres: [35],
      contentType: "Movie",
    },
  ],
};
const mockStore = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
});
const renderGrid = (comp: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>{comp}</BrowserRouter>
    </Provider>
  );
};
describe("Movie Grid component testing", () => {
  // UNIT testing

  test("Movie grid renders its title", () => {
    renderGrid(<MoviesGrid {...mockMovies} />);
    const title = screen.getByText("Popular Movies");
    expect(title).toBeInTheDocument();
  });

  test("Movie grid renders movie cards", () => {
    renderGrid(<MoviesGrid {...mockMovies} />);
    const movieCards = screen.getAllByTestId("movie-card");
    expect(movieCards).toHaveLength(mockMovies.mediaList.length);
    expect(movieCards.length).toBe(mockMovies.mediaList.length);
  });



  //passing all movies list correctly
  test("should pass all movies list correctly", async () => {
    renderGrid(<MoviesGrid {...mockMovies} />);
    const movieCards = screen.getAllByTestId("movie-card");
    //we have array of movies so we iterate it through forEach
    movieCards.forEach((card) => {
      fireEvent.mouseOver(card);
    });

    expect(screen.getByText("First test movie")).toBeInTheDocument();
    expect(screen.getByText("Second test movie")).toBeInTheDocument();
  });



  test("should display 'No movies available' if no movies available", () => {
    const emptyMovie = { title: "", mediaList: [] };
    renderGrid(<MoviesGrid {...emptyMovie} />);
    expect(screen.getByTestId("no-movies")).toHaveTextContent(
      /No movies available/i
    );
  });
    
  
    
    it("should render movie grid with title", () => {
        renderGrid(<MoviesGrid {...mockMovies} />);

        // After change the functionality their is 2 movies/series should be in MediaList
        expect(screen.getAllByTestId("movie-card").length).toBe(2);

        //Below expectation will throw an error as 2 media items their but here i write 0 lenght
        // expect(screen.getAllByTestId("movie-card").length).toBe(0);

    })
});
