import { api } from "../api";

const fetchSeriesData = async (endpoint: string) => {
    try {
        const response = await api.get(endpoint);
        const data = response.data.data;
        if (data?.data?.seriesList) {
            data.data.seriesList = data.data.seriesList.map((series: any) => ({
                ...series,
                contentType: "Series",
            }));
            return data;
        } else if (data?.seriesList) {
            data.seriesList = data.seriesList.map((series: any) => ({
                ...series,
                contentType: "Series",
            }));
            return data;
        }
        return data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An error occurred");
        }
    }
};

// API functions
export const fetchLatestSeriesApi = () => fetchSeriesData("/series/latestReleased");
export const fetchPopularSeriesApi = () => fetchSeriesData("/series/popular");
export const fetchTopRatedSeriesApi = () => fetchSeriesData("/series/topRated");