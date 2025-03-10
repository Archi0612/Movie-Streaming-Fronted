import {api} from "../api";

export const fetchLatestSeriesApi = async() => {
    try{
        const response = await api.get("/series/latestReleased");
        console.log("response of seriesAPI:", response);
        return response?.data?.data;
    }catch(err:unknown){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error("An error occurred");
        }
       
    }
}