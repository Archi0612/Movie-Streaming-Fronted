import React, { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./EditMovieModal.css";
import { MdClose } from "react-icons/md";
import { Movie } from "../../interfaces/movie.interface";

interface EditMovieModalProps {
  movie: any;
  onClose: () => void;
  onSave: (updatedMovie: any) => void;
}

const genreOptions = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
];

const fetchCastOptions = async (inputValue: string) => {
  return [
    { value: "actor1", label: "Actor 1" },
    { value: "actor2", label: "Actor 2" },
  ];
};

const fetchDirectorOptions = async (inputValue: string) => {
  return [
    { value: "director1", label: "Director 1" },
    { value: "director2", label: "Director 2" },
  ];
};

const EditMovieModal: React.FC<EditMovieModalProps> = ({ movie, onClose, onSave }) => {
  const [updatedMovie, setUpdatedMovie] = useState(movie);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedMovie((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected: any, action: any) => {
    setUpdatedMovie((prev: any) => ({ ...prev, [action.name]: selected }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const { name } = e.target;
      const file = e.target.files[0]; // Safe access
      setUpdatedMovie((prev: any) => ({ ...prev, [name]: file }));
    }
  };
  

  const handleSave = () => {
    const formData=new FormData()
    formData.append("title",updatedMovie.title)
    formData.append("description",updatedMovie.description)
    formData.append("releaseDate", updatedMovie.releaseDate);
  formData.append("duration", updatedMovie.duration.toString());
  formData.append("rating", updatedMovie.rating.toString());

  // Append multi-select fields as comma-separated values
  if (Array.isArray(updatedMovie.genres)) {
    updatedMovie.genres.forEach((genre: { value: string; label: string }) => formData.append("genres", genre.value));
  }

  if (Array.isArray(updatedMovie.languages)) {
    updatedMovie.languages.forEach((lang: { value: string; label: string }) => formData.append("languages", lang.value));
  }

  if (Array.isArray(updatedMovie.cast)) {
    updatedMovie.cast.forEach((cast: { value: string; label: string }) => formData.append("cast", cast.value));
  }

  if (Array.isArray(updatedMovie.director)) {
    updatedMovie.director.forEach((director: { value: string; label: string }) => formData.append("director", director.value));
  }
  if (updatedMovie.poster) {
    formData.append("poster", updatedMovie.poster);
  }
  if (updatedMovie.trailerUrl) {
    formData.append("trailerUrl", updatedMovie.trailerUrl);
  }
  for(let pair of formData.entries()){
    console.log(pair[0],pair[1])
   }
    onSave(updatedMovie);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e)=>e.stopPropagation()}>
        <button className="upper-close-btn" onClick={onClose}>
            <MdClose size={20}/>
        </button>
        <h2>Edit Movie</h2>
        <div className="modal-fields">
            <div className="fields-left">
        <label>Title</label>
        <input type="text" name="title" value={updatedMovie.title} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" value={updatedMovie.description} onChange={handleChange} />

        <label>Release Date</label>
        <input type="date" name="releaseDate" value={updatedMovie.releaseDate} onChange={handleChange} />

        <label>Genres</label>
        <Select
          name="genres"
          isMulti
          options={genreOptions}
          value={updatedMovie.genres}
          onChange={handleSelectChange}
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
        <label>Duration (Seconds)</label>
        <input type="number" name="duration" value={updatedMovie.duration} onChange={handleChange} min="0" />
        </div>
        <div className="fields-right">

        <label>Rating</label>
        <input type="number" name="rating" value={updatedMovie.rating} onChange={handleChange} step="0.1" min="0" />

        <label>Cast</label>
        <AsyncSelect
          isMulti
          loadOptions={fetchCastOptions}
          defaultOptions
          onChange={(selected) => handleSelectChange(selected, { name: "cast" })}
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
          onChange={(selected) => handleSelectChange(selected, { name: "director" })}
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

        <label>Language</label>
        <Select
          isMulti
          options={languageOptions}
          value={updatedMovie.languages}
          onChange={(selected) => handleSelectChange(selected, { name: "languages" })}
          placeholder="Select languages"
          className="select"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "rgba(93, 94, 95, 0.3)",
              border: "none",
            }),
            option: (provided) => ({
              ...provided,
              backgroundColor: "#333",
              color: "white",
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "#6da3d6",
              color: "white"
          }),
            input: (provided) => ({
              ...provided,
              color: "white",
            }),
          }}
        />

        <label>Poster</label>
        <input type="file" name="poster" onChange={handleFileChange} />

        <label>Trailer</label>
        <input type="file" name="trailerUrl" onChange={handleFileChange} />
        </div>
        </div>
        <div className="edit-btn">
          <button onClick={onClose} className="edit-close-btn">Cancel</button>
          <button onClick={handleSave} className="edit-save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditMovieModal;