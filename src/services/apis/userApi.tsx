import { api } from "../api";

export const fetchUserData = async() =>{
    try{
        const response = await api.get("/user/profile");
        return response?.data?.data?.user;
    }catch(err:unknown){
        if(err instanceof Error){
            throw new Error(err.message);
        }
    }
}