import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import AsyncSelect from "react-select/async";
import "./AddSeries.css";
import {toast} from "react-toastify"
import { addSeries, searchCastByName,searchDirectorByName } from "../../../services/apis/adminService";
import { Addseries } from "../../../interfaces/admin.interface";
import Loader from "../../../components/shimmerUI/Loader";
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
      console.error("Error fetching cast:",error);
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
    console.error("Error fetching director:",error);
  return [];
  }
};
const AddSeries: React.FC = () => {
  const navigate = useNavigate();
  const todayDate=new Date().toISOString().split("T")[0];
  const [series, setSeries] = useState<Addseries>({
    title: "",
    description: "",
    genres: [],
    releaseDate: todayDate,
    rating: "",
    cast: [],
    director: [],
    languages: [],
    poster: null,
    trailerUrl: null,
    availableForStreaming: false,
  });
  const[loading,setLoading]=useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const validateForm=()=>{
    if(
      series.title.trim() &&
      series.description.trim() &&
      series.releaseDate.trim() &&
      series.rating.trim() &&
      series.genres.length > 0 &&
      series.cast.length > 0 &&
      series.director.length > 0 &&
      series.languages.length > 0 &&
      series.poster &&
      series.trailerUrl
    ){
      setIsFormValid(true)
    }
    else{
      setIsFormValid(false)
    }
  }
  useEffect(()=>{
    validateForm();
  },[series])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked,files } = e.target as HTMLInputElement;
    if(name==="releaseDate"){
      if(value>todayDate){
        toast.info("Future dates are not allowed")
        return;
      }
    }
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
    try {
      setLoading(true)
      const response=await addSeries(formData);
      toast.success(response.data.message)
      navigate("/admin-dashboard-series")
    } catch (error:unknown) {
      if(error instanceof Error){
        toast.error(error.message || "Error in Adding")
      }
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="series-container">
      {loading && (<Loader/>)}
      <div className="add-series-container">
      <h2 className="admin-h2">Add Series</h2>
        <div className="fields-container">
          <div className="fields1">
            <label>Title</label>
            <input type="text" name="title" value={series.title} className="add-series-input" onChange={handleChange} placeholder="Enter series title" autoComplete="off"/>
            <label>Description</label>
            <textarea name="description" value={series.description}  onChange={handleChange} placeholder="Enter series details" autoComplete="off" className="text-desc1"/>
            <label>Genres</label>
            <Select isMulti options={genreOptions} value={series.genres}  onChange={(selected) => setSeries((prev) => ({...prev,genres: selected ? (selected as { value: string; label: string }[]) : [],}))}  styles={{
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
                    backgroundColor: "#6DA3D6",
                    color: "white"
                }),
                input: (provided) => ({
                  ...provided,
                  color: "white"
              })
              }} />
            <label>Release Date</label>
            <input type="date" name="releaseDate" value={series.releaseDate} className="add-series-input" onChange={handleChange} max={todayDate} />
            <label>Rating</label>
            <input type="number" name="rating" value={series.rating} className="add-series-input" onChange={handleChange} step="0.1" min="0.0" placeholder="Enter series rating "/>
          </div>
          <div className="fields2">
            <label>Cast</label>
            <AsyncSelect
              isMulti
              loadOptions={fetchCastOptions}
              onChange={(selected) =>
                setSeries((prev) => ({
                  ...prev,
                  cast: selected ? (selected as { value: string; label: string }[]) : [],
                }))
              }
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
                    backgroundColor: "#6DA3D6",
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
              onChange={(selected) =>
                setSeries((prev) => ({
                  ...prev,
                  director: selected ? (selected as { value: string; label: string }[]) : [],
                }))
              }
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
                    backgroundColor: "#6DA3D6",
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
              onChange={(selected) => setSeries((prev) => ({...prev,languages: selected ? (selected as { value: string; label: string }[]) : [],}))}
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
                  backgroundColor: "#6DA3D6",
                  color: "white"
              }),
                input: (provided) => ({
                  ...provided,
                  color: "white",
                }),
              }}
            />
            <label>Poster</label>
            <input type="file" name="poster" className="add-series-input" onChange={handleChange} />
            <label>Trailer</label>
            <input type="file" name="trailerUrl" className="add-series-input" onChange={handleChange} />
          </div>
        </div>
        <div className="buttons-container">
          <button className="close-btn-series" onClick={() => navigate("/admin-dashboard-series")}>Close</button>
          <button className="save-btn-series" onClick={handleSave} disabled={!isFormValid}>Save</button>
        </div>
      </div>
    </div>
  );
};
export default AddSeries;