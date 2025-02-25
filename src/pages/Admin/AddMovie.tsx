import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./AddMovie.css";

const genreOptions = [
  { value: "action", label: "Action" },
  { value: "drama", label: "Drama" },
  { value: "comedy", label: "Comedy" },
  { value: "thriller", label: "Thriller" },
  { value: "sci-fi", label: "Sci-Fi" },
];

const fetchCastOptions = (inputValue: string): Promise<{ value: string; label: string }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          { value: "actor1", label: "Leonardo DiCaprio" },
          { value: "actor2", label: "Joseph Gordon-Levitt" },
          { value: "actor3", label: "Elliot Page" },
        ].filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
      );
    }, 500);
  });
};

const fetchDirectorOptions = (inputValue: string): Promise<{ value: string; label: string }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          { value: "director1", label: "Christopher Nolan" },
          { value: "director2", label: "Quentin Tarantino" },
        ].filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
      );
    }, 500);
  });
};

const AddMovie: React.FC = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    releaseDate: "",
    genres: [],
    duration: "",
    rating: "",
    cast: [],
    director: null,
    poster: "",
    trailerUrl: "",
    movieUrl: "",
    availableForStreaming: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setMovie((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Movie saved:", movie);
  };

  const handleClose = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="container1">
      <div className="add-movie-container">
        <h2>Add Movie</h2>
        <div className="fields-container">
          <div className="fields1">
            <label>Title</label>
            <input type="text" name="title" value={movie.title} onChange={handleChange} placeholder="Enter movie title" />

            <label>Description</label>
            <textarea name="description" value={movie.description} onChange={handleChange} placeholder="Enter movie details" />

            <label>Release Date</label>
            <input type="date" name="releaseDate" value={movie.releaseDate} onChange={handleChange}  placeholder="Enter movie release date"/>

            <label>Genres</label>
            <Select
            name="genres"
              isMulti
              options={genreOptions}
              value={movie.genres}
              onChange={(selected: any) => setMovie((prev) => ({ ...prev, genres: selected }))}
              placeholder="Select genres"
              className="select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "rgba(93, 94, 95, 0.3)",
                  border:"none",
                }),
                option: (provided) => ({
                    ...provided,
                    backgroundColor: "#333",
                    color: "white"
                }),
                multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: "#6da3d6",
                    color: "white"
                }),
                input: (provided) => ({
                    ...provided,
                    color: "white"
                })
              }}
            />

            <label>Duration (minutes)</label>
            <input type="number" name="duration" value={movie.duration} onChange={handleChange} placeholder="Enter duration"/>
          </div>

          <div className="fields2">
            <label>Rating</label>
            <input type="number" name="rating" value={movie.rating} onChange={handleChange} step="0.1" min="0.0" placeholder="Enter movie rating"/>

            <label>Cast</label>
            <AsyncSelect
              isMulti
              loadOptions={fetchCastOptions}
              defaultOptions
              onChange={(selected:any) => setMovie((prev) => ({ ...prev, cast: selected }))}
              placeholder="Select movie cast"
              styles={{
                
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "rgba(93, 94, 95, 0.3)",
                  border:"none",
                }),
                option: (provided) => ({
                    ...provided,
                    backgroundColor: "#333",
                    color: "white"
                }),
                multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: "#6da3d6",
                    color: "white"
                }),
                input: (provided) => ({
                    ...provided,
                    color: "white"
                })
              }}
            />

            <label>Director</label>
            <AsyncSelect
            isMulti
              loadOptions={fetchDirectorOptions}
              defaultOptions
              onChange={(selected:any) => setMovie((prev) => ({ ...prev, director: selected }))}
              placeholder="Select movie director"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "rgba(93, 94, 95, 0.3)",
                  border:"none",
                }),
                option: (provided) => ({
                    ...provided,
                    backgroundColor: "#333",
                    color: "white"
                }),
                multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: "#6da3d6",
                    color: "white"
                }),
                input: (provided) => ({
                    ...provided,
                    color: "white"
                })
              }}
            />

            <label>Poster</label>
            <input type="file" name="poster" value={movie.poster} onChange={handleChange} />

            <label>Trailer</label>
            <input type="file" name="trailerUrl" value={movie.trailerUrl} onChange={handleChange} />
          </div>
        </div>
        <div className="buttons-container">
          <button className="button save-btn" onClick={handleSave}>Save</button>
          <button className="button close-btn" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
