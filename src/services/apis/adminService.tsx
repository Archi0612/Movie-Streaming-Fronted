import { api, apiFormData } from "../api";
import axios from "axios";
export const getAllUser = async () => {
  try {
    const response = await api.get("/user/list");
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // If it's an Axios error, check for response data
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      // Generic error handling
      throw new Error("An unknown error occurred");
    }
  }
};
export const updateRole = async (userId: number, newRole: string) => {
  try {
    const result = api.put("/user/updateRole", { userId, role: newRole });
    return result;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const updateActiveToggle = async (userId: number, isActive: boolean) => {
  try {
    const result = api.put("/user/updateActiveStatus", { userId, isActive });
    return result;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const listAllMovie = async (page:number,limit:number) => {
  try {
    const response = await api.get(`/movie/getAllMovie?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const addMovie = async (formData: unknown) => {
  try {
    const response = await apiFormData.post("/movie/createMovie", formData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const deleteMovie = async (movieId: string) => {
  try {
    const response = await api.delete("/movie/deleteMovieById", {
      params: { movieId },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const searchCastByName = async (query: string) => {
  try {
    const response = await api.get("/cast/getCastName", {
      params: { query },
    });
    return response.data.data.castList;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const searchDirectorByName = async (name: string) => {
  try {
    const response = await api.get("/director/getDirectorNames", {
      params: { name },
    });
    return response.data.data.directorList;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const editMovie = async  (formData:any) => {
  try {
    const response = await apiFormData.put("/movie/updateMovieById",formData)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const getMovieById=async(movieId:string)=>{
  try {
      const response=await api.get(`/movie/getMovieById/${movieId}`)
      return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
export const listAllSeries=async(search:string="",page:number=1,limit:number=10)=>{
  try {
    const response=await api.get("/series/list",{
      params:{
        search,page,limit
      },
      withCredentials:true,
    });
    return response.data;
  } catch (error:any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
export const addSeries=async(formData:any)=>{
  try {
    const response=await apiFormData.post("/series/create",formData)
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
export const addEpisode=async(formData:any)=>{
  try {
    const response=await apiFormData.post("/episode/create",formData)
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
export const searchSeries=async(search:string="")=>{
    try {
      const response=await api.get(`/series/searchByAdmin?search=${search}`)
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Something went wrong");
      } else {
        throw new Error("An unknown error occurred");
      }
    }
}
export const deleteSeries=async(seriesId:string)=>{
  try {
    const response=await api.delete(`/series/delete/${seriesId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
export const editSeries=async(formData:any)=>{
  try {
    const response=await apiFormData.put("/series/update",formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
export const getSeriesById=async(seriesId:string)=>{
  try {
    const response=await api.get(`/series/get/${seriesId}`)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
export const addCrew=async(formData:any)=>{
  try {
    const response=apiFormData.post("/cast/addOrUpdateCast",formData)
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}