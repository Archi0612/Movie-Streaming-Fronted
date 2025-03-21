import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./AddMovie.css";
import { addMovie, searchCastByName, searchDirectorByName } from "../../../services/apis/adminService";
import { toast } from "react-toastify";
import { AddMovies } from "../../../interfaces/admin.interface";
import  Loader  from "../../../components/shimmerUI/Loader";
import { Dispatch } from "redux";


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
  if(!inputValue.trim()) return [];
    try {
      const results=await searchCastByName(inputValue.trim());
      return results.map((cast:{_id:string;name:string})=>({
        value:cast._id,
        label:cast.name
      }))
    } catch (error) {
      console.error("Error in fetching cast",error)
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
    console.error("Error in fetching director")
  return [];
  }
};

const AddMovie: React.FC = () => {
  
  const navigate = useNavigate();
  const todayDate=new Date().toISOString().split("T")[0];
  const [movie, setMovie] = useState<AddMovies>({
    title: "",
    description: "",
    releaseDate: todayDate,
    genres: [],
    duration: "",
    rating: "",
    cast: [],
    director: [],
    poster: null,
    trailerUrl: null,
    movieUrl: null,
    languages:[]
  });
  const[loading,setLoading]=useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Function to check if all required fields are filled
  const validateForm = () => {
    if (
      movie.title.trim() &&
      movie.description.trim() &&
      movie.releaseDate.trim() &&
      movie.duration.trim() &&
      movie.rating.trim() &&
      movie.genres.length > 0 &&
      movie.cast.length > 0 &&
      movie.director.length > 0 &&
      movie.languages.length > 0 &&
      movie.poster &&
      movie.trailerUrl &&
      movie.movieUrl
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };
  useEffect(()=>{
    validateForm();
  },[movie])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked,files } = e.target as HTMLInputElement;
    if(name==="releaseDate"){
      if(value>todayDate){
        toast.info("Future Date not allowed");
        return;
      }
    }
    if(type === "file" && files){
      setMovie((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
    else{
      setMovie((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = async() => {
   const formData=new FormData();
   formData.append("title",movie.title)
   formData.append("description",movie.description)
   formData.append("releaseDate",movie.releaseDate)
   formData.append("duration",movie.duration)
   formData.append("rating",movie.rating)

   movie.genres.forEach((genre)=>formData.append("genres",genre.value))
   if (Array.isArray(movie.languages)) {
    movie.languages.forEach((lang) => formData.append("languages", lang.value));
  }
   movie.cast.forEach((cast)=>formData.append("casts",cast.value))
   movie.director.forEach((director)=>formData.append("directors",director.value))
   if(movie.poster){
    formData.append("poster",movie.poster)
   }
   if(movie.trailerUrl){
    formData.append("trailer",movie.trailerUrl)
   }
   if(movie.movieUrl){
    formData.append("movie",movie.movieUrl)
   }
    //API call to save movie
    try {
      setLoading(true)
      const response=await addMovie(formData)
      toast.success(response.data.message)
      navigate("/admin-dashboard-movies")
    } 
    catch (error: unknown) {
      if(error instanceof Error) toast.error(error?.message || "Error in Adding Movie")
    }
    finally{
      setLoading(false)
    }
  };


  const handleClose = () => {
    navigate("/admin-dashboard-movies");
  };

  return (
    <div className="container1">
      {loading && (<Loader/>)}
      {/* <div className="movie-breadcrumb-container">
      <Breadcrumb />
    </div> */}
      <div className="add-movie-container">
        <h2 className="admin-h2">Add Movie</h2>
        <div className="fields-container">
          <div className="fields-one">
            <label>Title</label>
            <input type="text" name="title" value={movie.title} className="add-movie-input" onChange={handleChange} placeholder="Enter movie title" autoComplete="off" />

            <label>Description</label>
            <textarea name="description" value={movie.description}   onChange={handleChange} placeholder="Enter movie details"className="text-desc" autoComplete="off" />

            <label>Release Date</label>
            <input type="date" name="releaseDate" value={movie.releaseDate} className="add-movie-input" onChange={handleChange}  placeholder="Enter movie release date" max={todayDate}/>

            <label>Genres</label>
            <Select
            name="genres"
              isMulti
              options={genreOptions}
              value={movie.genres}
              onChange={(selected) => setMovie((prev) => ({ ...prev, genres: selected as { value: string; label: string }[] }))}
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
            <input type="number" name="duration" value={movie.duration} className="add-movie-input" onChange={handleChange} placeholder="Enter duration" min="0"/>
            <label>Rating</label>
            <input type="number" name="rating" value={movie.rating} className="add-movie-input" onChange={handleChange} step="0.1" min="0.0" placeholder="Enter movie rating"/>
          </div>

          <div className="fields-two">

            <label>Cast</label>
            <AsyncSelect
              isMulti
              loadOptions={fetchCastOptions}
              onChange={(selected) => setMovie((prev) => ({ ...prev, cast: selected as { value: string; label: string }[] }))}
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
              onChange={(selected) => setMovie((prev) => ({ ...prev, director: selected as { value: string; label: string }[] }))}
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
              value={movie.languages}
              onChange={(selected) => setMovie((prev) => ({ ...prev, languages: selected as { value: string; label: string }[]}))}
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
            <input type="file" name="poster" className="add-movie-input" onChange={handleChange} />

            <label>Trailer</label>
            <input type="file" name="trailerUrl" className="add-movie-input" onChange={handleChange} />
            <label>Movie</label>
            <input type="file" name="movieUrl" className="add-movie-input" onChange={handleChange} />
          </div>
        </div>
        <div className="buttons-container">
          <button className="close-btn-movie" onClick={handleClose}>Close</button>
          <button className="save-btn-movie" onClick={handleSave} disabled={!isFormValid}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
