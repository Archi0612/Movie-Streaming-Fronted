import { configureStore } from "@reduxjs/toolkit";
import MovieCard from "../components/Cards/MovieCard"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import watchlistReducer from "../redux/slices/WatchList/WatchList"
import { describe, expect, it, test, vi } from "vitest";
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

const mockMedia = {
    _id: "123",
    title: "Test Movie",
    poster: "test.jpg",
    description: "A test movie description",
    duration: 120,
    releaseDate: "2024-03-01",
    rating: 8.5,
    languages: ["English", "Hindi"],
    genres: [1, 2],
    contentType: "Movie",
    // contentType: "Series",
};

const mockStore = configureStore(
    {
        reducer: {
            watchlist: watchlistReducer,
        }
    }
)

const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <Provider store={mockStore}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Provider>
    )
}


// It is Test suits
describe("MovieCard Component", () => {
    // ********** UNIT TEST CASES ************

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

        const movieTitle = screen.getByRole("img").parentElement!;
        expect(screen.queryByText(/Test movie/i)).not.toBeInTheDocument();

        //Trigger the hover event by using fireEvent
        fireEvent.mouseEnter(movieTitle);
        //Check if movie title is present or not
        expect(movieTitle).toBeInTheDocument();
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

    // ********** REGRESSION TEST CASES ************

    //If nothing in movieCard component then it shouldn't be rendered.
    it("should handle missing or invalid media properties", () => {
        // empty media object
        renderWithProviders(<MovieCard media={{}} />);
        expect(screen.queryByText(mockMedia.title)).not.toBeInTheDocument();

    });


    //****** BRANCH TEST CASES ************

    it("should not render if rating is in negative", () => {
        renderWithProviders(<MovieCard media={{ ...mockMedia, rating: -1 }} />);
        const card = screen.getByTestId("movie-card");
        fireEvent.click(card);
        const ratingStart = screen.queryByTestId("star-rating");
        expect(ratingStart).not.toBeInTheDocument();
    })

});
