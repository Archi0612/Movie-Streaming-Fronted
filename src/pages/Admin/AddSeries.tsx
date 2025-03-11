import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./AddSeries.css";
import {toast} from "react-toastify"
import { addSeries, searchCastByName,searchDirectorByName } from "../../services/apis/adminService";
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

interface Episode {
  title: string;
  description: string;
  duration: string;
  episodeNumber: number;
  episodeUrl: string | File;
  releaseDate: string;
}

interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

interface Series {
  title: string;
  description: string;
  genres: { value: string; label: string }[];
  releaseDate: string;
  rating: string;
  cast: { value: string; label: string }[];
  director: { value: string; label: string }[];
  languages: { value: string; label: string }[];
  poster: File | null;
  trailerUrl: File | null;
  availableForStreaming: boolean;
  seasons: Season[];
}

const AddSeries: React.FC = () => {
  const navigate = useNavigate();
  const [series, setSeries] = useState<Series>({
    title: "",
    description: "",
    genres: [],
    releaseDate: "",
    rating: "",
    cast: [],
    director: [],
    languages: [],
    poster: null,
    trailerUrl: null,
    availableForStreaming: false,
    seasons: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked,files } = e.target as HTMLInputElement;
    if(type === "file" && files){
      setSeries((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
    else{
      setSeries((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  const updateEpisode = (seasonIndex: number, episodeIndex: number, field: keyof Episode, value: any) => {
    setSeries((prev) => {
      const updatedSeasons = [...prev.seasons];
      (updatedSeasons[seasonIndex].episodes[episodeIndex][field] as any) = value;
      return { ...prev, seasons: updatedSeasons };
    });
  };

  const handleSave = async() => {
    const formData=new FormData();
    formData.append("title",series.title);
    formData.append("description",series.description);
    formData.append("releaseDate",series.releaseDate);
    formData.append("rating",series.rating);
    formData.append("availableForStreaming",String(series.availableForStreaming));
    series.genres.forEach((genre)=>formData.append(`genres`,genre.value))
    series.languages.forEach((lang)=>formData.append(`languages`,lang.value))
    series.cast.forEach((actor)=>formData.append(`casts`,actor.value))
    series.director.forEach((director)=>formData.append(`directors`,director.value))
    if(series.poster){
      formData.append("poster",series.poster);
    }
    if(series.trailerUrl){
      formData.append("trailer",series.trailerUrl);
    }
    
    console.log("FormData Entries")
    for(let [key,value] of formData.entries()){
      console.log(`${key}:`,value);
    };
    try {
      const response=await addSeries(formData);
      toast.success("Series Added Successfully")
      navigate("/admin-dashboard-series")
    } catch (error) {
      toast.error("Error in Adding series")
    }
  }
  return (
    <div className="container1">
      <div className="add-series-container">
      <h2 className="admin-h2">Add Series</h2>
        <div className="fields-container">
          <div className="fields1">
            <label>Title</label>
            <input type="text" name="title" value={series.title} onChange={handleChange} placeholder="Enter series title" autoComplete="off"/>

            <label>Description</label>
            <textarea name="description" value={series.description} onChange={handleChange} placeholder="Enter series details" autoComplete="off" className="text-desc1"/>

            <label>Genres</label>
            <Select isMulti options={genreOptions} value={series.genres}  onChange={(selected: any) => setSeries((prev) => ({ ...prev, genres: selected }))} styles={{
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
              }} />

            <label>Release Date</label>
            <input type="date" name="releaseDate" value={series.releaseDate} onChange={handleChange} />
            <label>Rating</label>
            <input type="number" name="rating" value={series.rating} onChange={handleChange} step="0.1" min="0.0" placeholder="Enter series rating "/>
          </div>

          <div className="fields2">
            <label>Cast</label>
            <AsyncSelect
              isMulti
              loadOptions={fetchCastOptions}
              defaultOptions
              onChange={(selected:any) => setSeries((prev) => ({ ...prev, cast: selected }))}
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
              onChange={(selected:any) => setSeries((prev) => ({ ...prev, director: selected }))}
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
              value={series.languages}
              onChange={(selected: any) => setSeries((prev) => ({ ...prev, languages: selected }))}
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
            <input type="file" name="poster" onChange={handleChange} />

            <label>Trailer</label>
            <input type="file" name="trailerUrl" onChange={handleChange} />
          </div>
        </div>
        
        <div className="buttons-container">
          <button className="close-btn2" onClick={() => navigate("/admin-dashboard-series")}>Close</button>
          
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddSeries;
