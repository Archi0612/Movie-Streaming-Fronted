import { configureStore } from "@reduxjs/toolkit";
import MovieCard from "../components/Cards/MovieCard";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import watchlistReducer from "../redux/slices/WatchList/WatchList";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
  vi,
} from "vitest";
import React from "react";

// this is Mock Function for navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
  };
});
let mockMedia = {
  _id: "123",
  title: "Test Movie",
  poster: "test.jpg",
  description: "A test movie description",
  duration: 120,
  releaseDate: "2024-03-01",
  rating: 8.5,
  languages: ["English", "Hindi"],
  genres: [12, 28, 35, 27],
  contentType: "Movie",
  // contentType: "Series",
};
let mockStore;
beforeAll(() => {
  mockStore = configureStore({
    reducer: {
      watchlist: watchlistReducer,
      
    },
  });
});

afterAll(() => {
  // It cleaning up all mocks after all tests finished
  vi.resetAllMocks();
});

beforeEach(() => {
  console.log("runs before Each test case");
  // Resert the mockmedia before each test case that not interfere with other test cases
  mockMedia = {
    _id: "123",
    title: "Test Movie",
    poster: "test.jpg",
    description: "A test movie description",
    duration: 120,
    releaseDate: "2024-03-01",
    rating: 8.5,
    languages: ["English", "Hindi"],
    genres: [12, 28, 35, 27],
    contentType: "Movie",
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

// It is Test suits
describe("MovieCard Component", () => {
  // ******** UNIT TEST CASES ************

  //This test case for Movie poster rendering
  test("should render the movie poster", () => {
    renderWithProviders(<MovieCard media={mockMedia} />);
    //Check image is present or not
    const moviePoster = screen.getByRole("img");
    expect(moviePoster).toBeInTheDocument();
    expect(moviePoster).toHaveAttribute("src", mockMedia.poster);
    expect(mockMedia.poster).toContain("test.jpg");
  });

  // This test case for hovering on movie card and displaying movie details
  test("should display movie details when hovering on the movie card", () => {
    renderWithProviders(<MovieCard media={mockMedia} />);

    const movieCard = screen.getByTestId("movie-card");
    expect(screen.queryByText("TEST MOVIE")).not.toBeInTheDocument();

    // It will Trigger the hover event by using fireEvent
    fireEvent.mouseEnter(movieCard);
    //Check if movie title is present or not
    expect(movieCard).toBeInTheDocument();
    // all descriptions are present or not
    expect(screen.getByText("TEST MOVIE")).toBeInTheDocument();
    expect(screen.getByText("A test movie description")).toBeInTheDocument();
  });

  // This test case for clicking on movie card and redirect it to Details page
  test("should navigate to the /details/:MediaId page by clicking on movie card", () => {
    renderWithProviders(<MovieCard media={mockMedia} />);

    //it store the movie card.
    const movieCard = screen.getByTestId("movie-card");
    expect(movieCard).toBeInTheDocument();

    //It trigger fireEvent by clicking on the card
    fireEvent.click(movieCard);
    // Expectation is to navigate to details page after clicking on the card
    expect(mockNavigate).toHaveBeenCalledWith(`/details/123?contentType=Movie`);
  });

  //navigate to details page after clicking on the play button when contentType is "Series"
  test("should navigate to details page when play button is clicked for a Series", () => {
    mockMedia.contentType = "Series";

    renderWithProviders(<MovieCard media={mockMedia} />);
    const movieCard = screen.getByTestId("movie-card");

    fireEvent.mouseEnter(movieCard);

    const playButton = screen.getByTestId("play-btn");
    fireEvent.click(playButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/details/123?contentType=Series"
    );
  });

  test("should hide details when mouse leaves the hovered card", () => {
    renderWithProviders(<MovieCard media={mockMedia} />);
    const movieCard = screen.getByTestId("movie-card");

    // hover event on movie card
    fireEvent.mouseEnter(movieCard);
    expect(screen.getByText("TEST MOVIE")).toBeInTheDocument();

    // event on mouse leave on movie card
    fireEvent.mouseLeave(movieCard);
    expect(screen.queryByText("TEST MOVIE")).not.toBeInTheDocument();
  });

  // ********** INTEGRATION TEST CASES ************

  // Movie card should render inside provider with redux
  it("should rendder inside PROVIDER with redux", () => {
    renderWithProviders(<MovieCard media={mockMedia} />);
    const card = screen.getByTestId("movie-card");
    expect(card).toBeInTheDocument();
  });

  //Watch list state changes then UI should reflect correctly as watchlist toggle button
  it("should change its state when watchlist toggle button is clicked", async () => {
    renderWithProviders(<MovieCard media={mockMedia} />);
    //first hover on movie card
    const card = screen.getByTestId("movie-card");
    fireEvent.mouseEnter(card);
    expect(card).toBeInTheDocument();

    const watchListBtn = screen.getByLabelText(/add to watchlist/i);
    // watchListBtn will clicked
    fireEvent.click(watchListBtn);

    //expectation is to added to watchlist after 1st clicking on watchlist
    expect(watchListBtn).toBeInTheDocument();
  });

  it("should navigate to error page when ID is not present", () => {
    mockMedia._id = "";
    renderWithProviders(<MovieCard media={mockMedia} />);

    const movieCard = screen.getByTestId("movie-card");
    fireEvent.click(movieCard);

    expect(mockNavigate).toHaveBeenCalledWith("/error");
  });

  //If nothing in movieCard component then it shouldn't be rendered.
  it("should handle missing or invalid media properties", () => {
    // empty media object
    renderWithProviders(<MovieCard media={{}} />);
    expect(screen.queryByText(mockMedia.title)).not.toBeInTheDocument();
  });

  //****** BRANCH TEST CASES ************
  //I f ratting is negative then not render the movie card.
  it("should not render if rating is negative", () => {
    renderWithProviders(<MovieCard media={{ ...mockMedia, rating: -1 }} />);
    const card = screen.getByTestId("movie-card");
    fireEvent.click(card);
    const ratingStart = screen.queryByTestId("star-rating");
    expect(ratingStart).not.toBeInTheDocument();
  });
});

//edge case test in movie card
describe("should check edge cases", () => {
  test("should handle missing or invalid media properties", () => {
    renderWithProviders(<MovieCard media={{}} />);

    const movieCard = screen.getByTestId("movie-card");
    fireEvent.mouseEnter(movieCard);

    //default details should be displayed
    expect(screen.getByText("UNKNOWN TITLE")).toBeInTheDocument();
    expect(screen.getByText("No description available")).toBeInTheDocument();
  });
});
