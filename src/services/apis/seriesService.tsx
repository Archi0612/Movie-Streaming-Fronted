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
    console.log("Series by genres:", response.data.data);
    return response?.data?.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const fetchSeriesByID = async (seriesId: string) => {
  try {
    const response = await api.get(`/series/get/${seriesId}`);
    console.log("series by id:", response)
    return response.data?.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
