import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Participant {
    userId: string;
    username: string;
    role: 'host' | 'viewer';
    joinedAt: string;
}

interface Movie {
    title: string;
    url: string;
    duration: number;
}

interface Room {
    roomId: string;
    name: string;
    hostId: string;
    movie: Movie;
    participants: Participant[];
    createdAt: string;
}

interface RoomState {
    currentRoom: Room | null;
    isHost: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: RoomState = {
    currentRoom: null,
    isHost: false,
    loading: false,
    error: null
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoomData(state, action: PayloadAction<Room>) {
            state.currentRoom = action.payload;
            state.isHost = state.currentRoom.hostId === state.currentRoom.participants.find(
                p => p.role === 'host'
            )?.userId;
        },
        updateParticipants(state, action: PayloadAction<Participant[]>) {
            if (state.currentRoom) {
                state.currentRoom.participants = action.payload;
            }
        },
        addParticipant(state, action: PayloadAction<Participant>) {
            if (state.currentRoom) {
                state.currentRoom.participants.push(action.payload);
            }
        },
        removeParticipant(state, action: PayloadAction<string>) {
            if (state.currentRoom) {
                state.currentRoom.participants = state.currentRoom.participants.filter(
                    p => p.userId !== action.payload
                );
            }
        },
        clearRoom(state) {
            state.currentRoom = null;
            state.isHost = false;
        },
        setRoomLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setRoomError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        }
    }
});

export const {
    setRoomData,
    updateParticipants,
    addParticipant,
    removeParticipant,
    clearRoom,
    setRoomLoading,
    setRoomError
} = roomSlice.actions;
export default roomSlice.reducer;