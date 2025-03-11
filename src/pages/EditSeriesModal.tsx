import React, { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { MdClose } from "react-icons/md";
import "./EditSeriesModal.css";

// Defining a more specific type for the Series interface
interface Series {
  id?: number;
  duration?: number; // Now optional
  title: string;
  description: string;
  rating: string;
  cast: { value: string; label: string }[];
  director: { value: string; label: string }[];
  poster: File | string; // Poster is now typed as File or string
  img?: string; // Now optional
  genres?: { value: string; label: string }[];
  releaseDate?: string;
  languages?: { value: string; label: string }[];
  trailerUrl?: File | string; // Trailer is typed as File or string
  availableForStreaming?: boolean;
}

interface EditSeriesModalProps {
  series: Series;
  onClose: () => void;
  onSave: (updatedSeries: Series) => void;
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
  try {
    return [
      { value: "actor1", label: "Actor 1" },
      { value: "actor2", label: "Actor 2" },
    ];
  } catch (error) {
    console.error("Error fetching cast options", error);
    return [];
  }
};

const fetchDirectorOptions = async (inputValue: string) => {
  try {
    return [
      { value: "director1", label: "Director 1" },
      { value: "director2", label: "Director 2" },
    ];
  } catch (error) {
    console.error("Error fetching director options", error);
    return [];
  }
};

const EditSeriesModal: React.FC<EditSeriesModalProps> = ({ series, onClose, onSave }) => {
  const [updatedSeries, setUpdatedSeries] = useState<Series>(series);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedSeries((prev: Series) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected: any, action: any) => {
    setUpdatedSeries((prev: Series) => ({ ...prev, [action.name]: selected }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const { name } = e.target;
      const file = e.target.files[0]; // Safe access

      // Log selected file for debugging
      console.log(`${name} selected:`, file);

      setUpdatedSeries((prev: Series) => ({ ...prev, [name]: file }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", updatedSeries.title);
    formData.append("description", updatedSeries.description);
    formData.append("releaseDate", updatedSeries.releaseDate || ""); // Handle optional fields
    formData.append("duration", updatedSeries.duration?.toString() || "0");
    formData.append("rating", updatedSeries.rating.toString());

    // Appending optional fields
    if (Array.isArray(updatedSeries.genres)) {
      updatedSeries.genres.forEach((genre: { value: string; label: string }) =>
        formData.append("genres", genre.value)
      );
    }

    if (Array.isArray(updatedSeries.languages)) {
      updatedSeries.languages.forEach((lang: { value: string; label: string }) =>
        formData.append("languages", lang.value)
      );
    }

    if (Array.isArray(updatedSeries.cast)) {
      updatedSeries.cast.forEach((cast: { value: string; label: string }) =>
        formData.append("cast", cast.value)
      );
    }

    if (Array.isArray(updatedSeries.director)) {
      updatedSeries.director.forEach((director: { value: string; label: string }) =>
        formData.append("director", director.value)
      );
    }

    // Handling file uploads with type check
    if (updatedSeries.poster) {
    formData.append("poster", updatedSeries.poster);
  }
  if (updatedSeries.trailerUrl) {
    formData.append("trailerUrl", updatedSeries.trailerUrl);
  }

    // Log all formData entries to check if poster and trailerUrl are appended
    console.log("FormData before submission:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Log updatedSeries to verify both poster and trailerUrl are included
    console.log("Updated series data:");
    console.log(updatedSeries);

    // Saving the updated series
    onSave(updatedSeries);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="upper-close-btn" onClick={onClose}>
          <MdClose size={20} />
        </button>
        <h2>Edit Series</h2>
        <div className="modal-fields">
          <div className="fields-left">
            <label>Title</label>
            <input type="text" name="title" value={updatedSeries.title} onChange={handleChange} />

            <label>Description</label>
            <textarea name="description" value={updatedSeries.description} onChange={handleChange} />

            <label>Release Date</label>
            <input type="date" name="releaseDate" value={updatedSeries.releaseDate || ""} onChange={handleChange} />

            <label>Genres</label>
            <Select
              name="genres"
              isMulti
              options={genreOptions}
              value={updatedSeries.genres}
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
            <input type="number" name="duration" value={updatedSeries.duration || ""} onChange={handleChange} min="0" />
          </div>

          <div className="fields-right">
            <label>Rating</label>
            <input type="number" name="rating" value={updatedSeries.rating} onChange={handleChange} step="0.1" min="0" />

            <label>Cast</label>
            <AsyncSelect
              isMulti
              loadOptions={fetchCastOptions}
              defaultOptions
              onChange={(selected) => handleSelectChange(selected, { name: "cast" })}
              placeholder="Select series cast"
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
              placeholder="Select series director"
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
              value={updatedSeries.languages}
              onChange={(selected) => handleSelectChange(selected, { name: "languages" })}
              placeholder="Select languages"
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

            <label>Poster</label>
            <input type="file" name="poster" onChange={handleFileChange} />

            <label>Trailer</label>
            <input
              type="file"
              name="trailerUrl"  // This must match the field in the state
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="edit-btn">
          <button onClick={onClose} className="edit-close-btn">
            Cancel
          </button>
          <button onClick={handleSave} className="edit-save-btn">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSeriesModal;
