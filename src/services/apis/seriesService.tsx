import { api } from "../api";

export const fetchLatestSeriesApi = async () => {
  try {
    const response = await api.get("/series/latestReleased");
    return response?.data?.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

export const fetchPopularSeriesApi = async () => {
  try {
    const response = await api.get("/series/popular");
    return response?.data?.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

export const fetchtopRatedSeriesApi = async () => {
  try {
    const response = await api.get("/series/topRated");
    return response?.data?.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

export const fetchSeriesByGenre = async (genreId: number) => {
  try {
    const response = await api.get(`/series/genre/${genreId}`);
    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
