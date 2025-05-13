import { render, waitFor, screen, cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { getPopularMovies, getTopRatedMovies } from "../services/apis/mediaService/movieService";
import { fetchPopularSeriesApi, fetchTopRatedSeriesApi } from "../services/apis/mediaService/seriesService";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { api } from "../services/api";


vi.mock("../services/apis/mediaService/movieService", () => ({
    getPopularMovies: vi.fn(),
    getTopRatedMovies: vi.fn()
}))

vi.mock("../services/apis/mediaService/seriesService", () => ({
    fetchPopularSeriesApi: vi.fn(),
    fetchTopRatedSeriesApi: vi.fn(),
}))
vi.mock("../services/api", () => ({
    api: {
        get: vi.fn(),
    },
}));

const renderComponent = (children: ReactElement) => {
    return render(
        <Provider store={store}>
            <Router>
                {children}
            </Router>
        </Provider>
    );
}

beforeEach(() => {
    vi.clearAllMocks(); // Clears all mock calls, preventing interference between tests
    vi.resetModules(); // Resets mocked modules
});

afterEach(() => {
    cleanup(); // Cleans up rendered components
})

afterAll(() => {
    console.log("Completed all these from search file ")
})

describe("search Component Mounting test Suite", () => {

    it("Should fetch movie from 4 differnet api", async () => {

        //Creating Mock Response of All the Api calls
        const popularMoviesResponse = { data: { moviesList: [] } };
        const popularSeriesResponse = { data: { seriesList: [] } };
        const topRatedMoviesResponse = { data: { moviesList: [] } };
        const topRatedSeriesResponse = { data: { seriesList: [] } };

        getPopularMovies.mockResolvedValue(popularMoviesResponse);
        getTopRatedMovies.mockResolvedValue(topRatedMoviesResponse);
        fetchPopularSeriesApi.mockResolvedValue(popularSeriesResponse);
        fetchTopRatedSeriesApi.mockResolvedValue(topRatedSeriesResponse);

        renderComponent(<Search />);

        await waitFor(() => {
            expect(getPopularMovies).toHaveBeenCalledTimes(1);
            expect(fetchPopularSeriesApi).toHaveBeenCalledTimes(1);
            expect(getTopRatedMovies).toHaveBeenCalledTimes(1);
            expect(fetchTopRatedSeriesApi).toHaveBeenCalledTimes(1);
        });

        // Verify that the correct endpoints were called
        expect(getPopularMovies).toHaveBeenCalledWith();
        expect(fetchPopularSeriesApi).toHaveBeenCalledWith();
        expect(getTopRatedMovies).toHaveBeenCalledWith();
        expect(fetchTopRatedSeriesApi).toHaveBeenCalledWith();
    });

    // it("should return status 200 for search API call", async () => {
    //     renderComponent(<Search />);

    //     // Mock API Response with status 200
    //     const mockSearchResponse = { status: 200, data: {} };

    //     api.get.mockResolvedValueOnce(mockSearchResponse);

    //     // Find the input field and type a search query
    //     const searchInput = screen.getByPlaceholderText("Search for movies, shows, and more");
    //     await userEvent.type(searchInput, "inception");

    //     // Wait for API call and check status
    //     await waitFor(async () => {
    //         expect(api.get).toHaveBeenCalledWith("/search/", { params: { search: "inception" } });
    //     });
    //     const response = await api.get("/search/", { params: { search: "inception" } });
    //     expect(response.status).toBe(200);
    // });


})

