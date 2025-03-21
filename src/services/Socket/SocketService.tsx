// client/src/services/socketService.ts
import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import {
    setRoomData,
    addParticipant,
    removeParticipant,
    clearRoom
} from '../../redux/slices/Room/RoomSlice';
import {
    updatePlayerState,
    setCurrentTime
} from '../../redux/slices/VideoPlayer/PlayerSlice';
import { handleApiError } from '../../utils/MediaConstants';
import { PlayerState } from '../../interfaces/Socket.interface';

const SOCKET_SERVER_URL = 'http://localhost:4000';

class SocketService {
    private socket: Socket | null = null;

    connect(token: string) {
        if (this.socket?.connected) {
            return;
        }

        // Initialize socket with auth token
        this.socket = io(SOCKET_SERVER_URL, {
            auth: { token }
        });

        this.setupEventListeners();
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    joinRoom(roomId: string) {
        if (!this.socket?.connected) {
            return;
        }

        this.socket.emit('join-room', { roomId });
    }

    leaveRoom(roomId: string) {
        if (!this.socket?.connected) {
            return;
        }

        this.socket.emit('leave-room', { roomId });
    }

    updatePlayerState(roomId: string, playerState: {
        isPlaying: boolean;
        currentTime: number;
        playbackRate: number;
    }) {
        if (!this.socket?.connected) {
            return;
        }

        this.socket.emit('player-state-change', { roomId, playerState });
    }

    seek(roomId: string, time: number) {
        if (!this.socket?.connected) {
            return;
        }

        this.socket.emit('seek', { roomId, time });
    }

    private setupEventListeners() {
        if (!this.socket) {
            return;
        }

        // Connection events
        this.socket.on('connect', () => {
            console.log('Socket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
            store.dispatch(clearRoom());
        });

        this.socket.on('error', (error: unknown) => {
            console.error('Socket error:', error);
        });

        // Room events
        this.socket.on('room-data-update', (data) => {
            store.dispatch(setRoomData(data));
        });

        this.socket.on('user-joined', (data) => {
            store.dispatch(addParticipant(data));
        });

        this.socket.on('user-left', (data: string) => {
            store.dispatch(removeParticipant(data.userId));
        });

        this.socket.on('room-ended', () => {
            store.dispatch(clearRoom());
        });

        // Player events
        this.socket.on('player-state-update', (playerState: PlayerState) => {
            store.dispatch(updatePlayerState(playerState));
        });

        this.socket.on('seek', (data) => {
            store.dispatch(setCurrentTime(data.time));
        });
    }
}

export const socketService = new SocketService();