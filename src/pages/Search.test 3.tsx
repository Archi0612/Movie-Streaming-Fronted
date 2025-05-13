import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { jest, describe, test, expect } from '@jest/globals';
import Search from "./Search";
import { api } from "../services/api";


// Mocking Axios globally
jest.mock("axios");

// Mock API functions before importing`api`
jest.mock("../services/api", () => ({
    get: jest.fn(),
}));

// Mocking other API services
jest.mock("../services/apis/movieService", () => ({
    getPopularMovies: jest.fn(),
    getTopRatedMovies: jest.fn(),
}));

jest.mock("../services/apis/seriesService.tsx", () => ({
    fetchPopularSeriesApi: jest.fn(),
    fetchTopRatedSeriesApi: jest.fn(),
}));


type MovieDataResponse = {
    data: {
        data: {
            movieList: { id: number; title: string; poster: string }[];
            seriesList: { id: number; title: string; poster: string }[];
            castAndDirectorWiseMovie: { id: number; title: string; poster: string }[];
            castAndDirectorWiseSeries: { id: number; title: string; poster: string }[];
        };
    };
};



// Helper function to render with React Router
const render = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};


describe("Search Component", () => {

    // test 1 to hit api by entering search 
    test("updates search input and triggers API call", async () => {
        // Mock API response
        (api.get as jest.Mock<Promise<MovieDataResponse>>).mockResolvedValue({
            data: {
                data: {
                    movieList: [{ id: 1, title: "Inception", poster: "avatar.jpeg" }],
                    seriesList: [{ id: 1, title: "Squid Games", poster: "Image.jpeg" }],
                    castAndDirectorWiseMovie: [{ id: 1, title: "Hera Pheri", poster: "Poster.jpeg" }],
                    castAndDirectorWiseSeries: [{ id: 1, title: "Money Heist", poster: "Banner.jpeg" }],
                },
            },
        });

        render(<Search />);

        // Simulate user typing in the search input
        const searchInput = screen.getByPlaceholderText(
            "Search for movies, shows, and more"
        );

        fireEvent.change(searchInput, { target: { value: "Inception" } });

        // Wait for the API call to be made
        await waitFor(() => {
            expect(api.get).toHaveBeenCalledWith("/search/", {
                params: { search: "Inception" },
            });
        });

        expect(api.get).toHaveBeenCalledTimes(1);
    });
});

