import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./EditSeriesModal.css"; // Import the CSS file
import { toast } from "react-toastify";
import { editSeries,searchCastByName,searchDirectorByName } from "../../services/apis/adminService";
interface EditSeriesModalProps{
  seriesId:string;
  onClose:()=>void;
  onSave:(updatedSeries:any)=>void;
}
const genreOptions = [
  { value: "28", label: "Action" },
  { value: "18", label: "Drama" },
  { value: "35", label: "Comedy" },
  { value: "53", label: "Thriller" },
  { value: "878", label: "Sci-Fi" },
  {value:"10749",label:"Romance"},
  {value:"10751",label:"Family"},
  {value:"10752",label:"War"},
  {value:"12",label:"Adv."},
  {value:"16",label:"Anim."},
  {value:"80",label:"Crime"},
  {value:"99",label:"Doc."},
  {value:"14",label:"Fantasy"},
  {value:"36",label:"History"},
  {value:"27",label:"Horror"},
  {value:"10402",label:"Music"},
  {value:"9648",label:"Myst."},
  {value:"37",label:"Western"},

];
const languageOptions = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "gujarati", label: "Gujarati" },
  { value: "tamil", label: "Tamil" },
  { value: "telugu", label: "Telugu" },
  { value: "malayalam", label: "Malayalam" },
  { value: "kannada", label: "Kannada" },
];
const fetchCastOptions = async(inputValue: string): Promise<{ value: string; label: string }[]> => {
  try {
    const results=await searchCastByName(inputValue.trim());
    return results.map((cast:{_id:string;name:string})=>({
      value:cast._id,
      label:cast.name
    }))
  } catch (error) {
    console.error("Error fetching cast:", error);
  return [];
  }
};
const fetchDirectorOptions = async(inputValue: string): Promise<{ value: string; label: string }[]> => {
  try {
    const results=await searchDirectorByName(inputValue.trim());
    return results.map((director:{_id:string;name:string})=>({
      value:director._id,
      label:director.name
    }))
  } catch (error) {
    console.error("Error fetching director:", error);
  return [];
  }
};
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
const EditSeriesModal: React.FC<EditSeriesModalProps> = ({ seriesId, onClose, onSave }) => {
  const[updatedSeries,setUpdatedSeries]=useState<any>(null);
  const [originalMovie,setOriginalMovie]=useState<any>(null);
  useEffect(()=>{
    const fetch
  })

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
