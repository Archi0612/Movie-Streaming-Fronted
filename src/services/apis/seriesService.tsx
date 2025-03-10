import {api} from "../api";

export const fetchLatestSeriesApi = async() => {
    try{
        const response = await api.get("/series/latestReleased");
        console.log("response of latestAPI:", response);
        return response?.data?.data;
    }catch(err:unknown){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error("An error occurred");
        }
       
    }
}

export const fetchPopularSeriesApi = async() => {
    try{
        const response = await api.get("/series/popular");
        console.log("response of popularAPI:", response);
        return response?.data?.data;
    }catch(err:unknown){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error("An error occurred");
        }
       
    }
}

export const fetchtopRatedSeriesApi = async() => {
    try{
        const response = await api.get("/series/topRated");
        console.log("response of topratedAPI:", response);
        return response?.data?.data;
    }catch(err:unknown){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error("An error occurred");
        }
       
    }
}

