import { api } from "../api";

export const roomAPI = {
    createRoom: async (name: string, movie: {
        title: string;
        url: string;
        duration: number;
    }) => {
        const response = await api.post('/rooms/create', {
            name,
            movie
        });
        return response.data;
    },

    getRoomDetails: async (roomId: string) => {
        const response = await api.get(`/rooms/${roomId}`);
        return response.data;
    },

    // client/src/services/apiService.ts (continued)
    getAllRooms: async () => {
        const response = await api.get('/rooms');
        return response.data;
    },

    endRoom: async (roomId: string) => {
        const response = await api.put(`/rooms/${roomId}/end`);
        return response.data;
    }
};

export default api;