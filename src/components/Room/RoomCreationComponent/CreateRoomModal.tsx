import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { roomAPI } from "../../../services/apis/RoomAPI";
import { setRoomLoading, setRoomError } from "../../../redux/slices/Room/RoomSlice";
import { IoClose } from "react-icons/io5"; // Close icon
import "./CreateRoomModal.css";
import { getMovieById } from "../../../services/apis/adminService";
import { fetchEpisodeById } from "../../../services/apis/mediaService/seriesService";
import { Movie } from "../../../interfaces/movie.interface";
import { handleDurationTime } from "../../../utils/MediaConstants";

interface CreateRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    mediaId: string | undefined;
    contentType: string | null;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, mediaId, contentType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState<string>("");
    const [movie, setMovie] = useState<Movie>();
    const [loading, setLoading] = useState(false);


    const fetchMediaByID = async () => {
        try {
            setLoading(true);
            if (contentType === "Movie") {
                const response = await getMovieById(mediaId as string);
                setMovie(response.data.data.movie);
            }
            else if (contentType === "Series") {
                const responseOfepisodes = await fetchEpisodeById(mediaId as string);
                setMovie(responseOfepisodes.episodeUrl);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMediaByID();
    }, [mediaId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(setRoomLoading(true));

            // Create room
            const roomData = await roomAPI.createRoom(roomName, {
                title: movie?.title || "untitled",
                url: movie?.movieUrl || "",
                duration: movieDuration || "",
            });

            if (roomData.roomId) {
                onClose(); // Close modal after submission
                navigate(`/room/${roomData.roomId}`);
            }

        } catch (error) {
            dispatch(setRoomError("Failed to create room"));
            console.error("Create room error:", error);
        } finally {
            dispatch(setRoomLoading(false));
        }
    };

    const movieDuration = handleDurationTime(movie?.duration || 0)

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <IoClose className="close-icon" size={30} onClick={onClose} />

                <h2>Create Watch Party</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="name">Room Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            required
                            placeholder="My Movie Night"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="movieTitle">Movie Title</label>
                        <input
                            type="text"
                            id="movieTitle"
                            name="movieTitle"
                            value={movie?.title}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="movieUrl">Movie URL</label>
                        <input
                            type="url"
                            id="movieUrl"
                            name="movieUrl"
                            value={movie?.movieUrl}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="movieDuration">Movie Duration (seconds, optional)</label>
                        <input
                            type="text"
                            id="movieDuration"
                            name="movieDuration"
                            value={movieDuration || ""}
                            min="0"
                            readOnly
                        />
                    </div>

                    <button type="submit" className="create-room-button">
                        Create Watch Party
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoomModal;
