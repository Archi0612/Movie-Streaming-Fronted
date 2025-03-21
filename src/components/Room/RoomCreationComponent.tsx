// client/src/components/CreateRoomForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { roomAPI } from '../../services/apis/RoomAPI';
import { setRoomLoading, setRoomError } from '../../redux/slices/Room/RoomSlice';

const CreateRoomForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        movieTitle: '',
        movieUrl: '',
        movieDuration: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'movieDuration' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            dispatch(setRoomLoading(true));

            // Create room
            const roomData = await roomAPI.createRoom(formData.name, {
                title: formData.movieTitle,
                url: formData.movieUrl,
                duration: formData.movieDuration
            });

            // Navigate to room page
            navigate(`/room/${roomData.roomId}`);
        } catch (error) {
            dispatch(setRoomError('Failed to create room'));
            console.error('Create room error:', error);
        } finally {
            dispatch(setRoomLoading(false));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-room-form">
            <h2>Create Watch Party</h2>

            <div className="form-group">
                <label htmlFor="name">Room Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.movieTitle}
                    onChange={handleChange}
                    required
                    placeholder="The Matrix"
                />
            </div>

            <div className="form-group">
                <label htmlFor="movieUrl">Movie URL</label>
                <input
                    type="url"
                    id="movieUrl"
                    name="movieUrl"
                    value={formData.movieUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com/movie.mp4"
                />
            </div>

            <div className="form-group">
                <label htmlFor="movieDuration">
                    Movie Duration (seconds, optional)
                </label>
                <input
                    type="number"
                    id="movieDuration"
                    name="movieDuration"
                    value={formData.movieDuration || ''}
                    onChange={handleChange}
                    min="0"
                    placeholder="Duration will be detected automatically"
                />
            </div>

            <button type="submit" className="create-room-button">
                Create Watch Party
            </button>
        </form>
    );
};

export default CreateRoomForm;