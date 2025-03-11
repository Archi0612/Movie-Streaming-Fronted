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
  id: number;
  img: string;
  title: string;
  description: string;
  rating: string;
  duration?: string;
  cast?: string;
  director?: string;
  genres?: { value: string; label: string }[];
  releaseDate?: string;
  languages?: { value: string; label: string }[];
  trailerUrl?: string;
}

interface EditSeriesModalProps {
  isOpen: boolean;
  series: Series | null;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onGenresChange: (selected: any) => void;
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
            <input type="text" name="title" value={series.title} onChange={onChange} placeholder="Enter series title" />

            <label>Description</label>
            <textarea name="description" value={series.description} onChange={onChange} placeholder="Enter series details" />

            <label>Release Date</label>
            <input type="date" name="releaseDate" value={series.releaseDate || ""} onChange={onChange} />

            <label>Rating</label>
            <input type="number" name="rating" value={series.rating} onChange={onChange} step="0.1" min="0.0" max="10.0" placeholder="Enter series rating" />

            <label>Genres</label>
            <Select
              isMulti
              options={genreOptions}
              value={series.genres}
              onChange={onGenresChange}
              placeholder="Select genres"
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
                  color: "white",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "white",
                }),
              }}
            />
          </div>

          <div className="fields-right">
            <label>Cast</label>
            <AsyncSelect
              isMulti
              loadOptions={() => Promise.resolve([])}
              placeholder="Select movie cast"
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
                  color: "white",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "white",
                }),
              }}
            />

            <label>Director</label>
            <AsyncSelect
              isMulti
              loadOptions={() => Promise.resolve([])}
              placeholder="Select movie director"
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
                  color: "white",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "white",
                }),
              }}
            />

            <label>Languages</label>
            <Select
              isMulti
              options={[]}
              placeholder="Select languages"
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
                  color: "white",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "white",
                }),
              }}
            />

            <label>Poster</label>
            <input type="file" name="poster" />

            <label>Trailer</label>
            <input type="file" name="trailerUrl" />
          </div>
        </div>
        <div className="edit-btn">
          <button onClick={onClose} className="edit-close-btn">Close</button>
          <button className="edit-save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditSeriesModal;
