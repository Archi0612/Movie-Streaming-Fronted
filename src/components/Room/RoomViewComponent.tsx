// client/src/pages/RoomPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { socketService } from '../../services/Socket/SocketService';
import { roomAPI } from '../../services/apis/RoomAPI';
import { setRoomLoading, setRoomError, clearRoom } from '../../redux/slices/Room/RoomSlice';
import { resetPlayer } from '../../redux/slices/VideoPlayer/PlayerSlice';
import VideoPlayer from './RoomVideoPlayer';

const RoomPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);


    const { isAuthenticated, token } = useSelector((state: RootState) => state.user.currentUser.isAuthenticated);
    const { currentRoom, isHost, loading, error } = useSelector((state: RootState) => state.room);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/room/${roomId}` } });
        }
    }, [isAuthenticated, navigate, roomId]);

    // Connect to socket and join room
    useEffect(() => {
        if (isAuthenticated && token && roomId) {
            // Connect to socket
            socketService.connect(token);

            // Get room details and join
            const fetchRoomAndJoin = async () => {
                try {
                    dispatch(setRoomLoading(true));

                    // Get room details
                    const roomData = await roomAPI.getRoomDetails(roomId);

                    // Join room via socket
                    socketService.joinRoom(roomId);
                } catch (error) {
                    console.error('Error joining room:', error);
                    dispatch(setRoomError('Failed to join room'));
                } finally {
                    dispatch(setRoomLoading(false));
                }
            };

            fetchRoomAndJoin();

            // Cleanup on unmount
            return () => {
                socketService.leaveRoom(roomId);
                dispatch(clearRoom());
                dispatch(resetPlayer());
            };
        }
    }, [isAuthenticated, token, roomId, dispatch]);

    // Copy invite link to clipboard
    const copyInviteLink = () => {
        const link = `${window.location.origin}/room/${roomId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);

        // Reset copied status after 2 seconds
        setTimeout(() => setCopied(false), 2000);
    };

    // End room (host only)
    const handleEndRoom = async () => {
        if (!roomId || !isHost) return;

        try {
            await roomAPI.endRoom(roomId);
            navigate('/');
        } catch (error) {
            console.error('Error ending room:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading room...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p>Error: {error}</p>
                <button onClick={() => navigate('/')}>Go Back</button>
            </div>
        );
    }

    if (!currentRoom) {
        return <div className="loading">Connecting to room...</div>;
    }

    return (
        <div className="room-page">
            <div className="room-header">
                <h1>{currentRoom.name}</h1>
                <div className="room-actions">
                    <button onClick={copyInviteLink} className="invite-button">
                        {copied ? 'Copied!' : 'Copy Invite Link'}
                    </button>

                    {isHost && (
                        <button onClick={handleEndRoom} className="end-room-button">
                            End Watch Party
                        </button>
                    )}
                </div>
            </div>

            <div className="room-content">
                <div className="video-container">
                    {currentRoom.movie && (
                        <VideoPlayer url={currentRoom.movie.url} />
                    )}
                </div>

                <div className="participants-sidebar">
                    <h3>Participants ({currentRoom.participants.length})</h3>
                    <ul className="participants-list">
                        {currentRoom.participants.map(participant => (
                            <li key={participant.userId} className="participant-item">
                                <span className="participant-name">
                                    {participant.username}
                                </span>
                                <span className="participant-role">
                                    {participant.role === 'host' ? '(Host)' : ''}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RoomPage;