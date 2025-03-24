import { Series } from "../../../interfaces/admin.interface";
import { api } from "../../api";
const fetchSeriesData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    const data = response.data.data;
    if (data?.data?.seriesList) {
      data.data.seriesList = data.data.seriesList.map((series: Series[]) => ({
        ...series,
        contentType: "Series",
      }));
      return data;
    } else if (data?.seriesList) {
      data.seriesList = data.seriesList.map((series: Series[]) => ({
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
export const fetchLatestSeriesApi = () =>
  fetchSeriesData("/series/latestReleased");
export const fetchPopularSeriesApi = () => fetchSeriesData("/series/popular");
export const fetchTopRatedSeriesApi = () => fetchSeriesData("/series/topRated");

export const fetchSeriesByGenre = (genreId: number) =>
  fetchSeriesData(`/series/genre/${genreId}`);

export const fetchSeriesByID = (mediaId: string) =>
  fetchSeriesData(`/series/get/${mediaId}`);

export const fetchEpisodeById = async (episodeId: string) => {
  try {
    const response = await api.get(`/episode/get/${episodeId}`);
    return response.data?.data?.episodeInfo;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An error occurred while fetching episode Data");
    }
  }
};

// export const fetchSeriesByGenre = async (genreId: number) => {
//   try {
//     const response = await api.get(`/series/genre/${genreId}`);
//     console.log("Series by genres:", response.data.data);
//     return response?.data?.data;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw new Error(err.message);
//     }
//   }
// };

// export const fetchSeriesByID = async (seriesId: string) => {
//   try {
//     const response = await api.get(`/series/get/${seriesId}`);
//     console.log("series by id:", response)
//     return response.data?.data;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw new Error(err.message);
//     }
//   }
// };
