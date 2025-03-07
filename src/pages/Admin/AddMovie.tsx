import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./AddMovie.css";

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
  const [movie, setMovie] = useState<{
    title: string;
    description: string;
    releaseDate: string;
    genres: { value: string; label: string }[];
    duration: string;
    rating: string;
    cast: { value: string; label: string }[];
    director: { value: string; label: string }[];
    poster: File | null;
    trailerUrl: File | null;
    movieUrl: string;
    availableForStreaming: boolean;
    languages: { value: string; label: string }[];
  }>({
    title: "",
    description: "",
    releaseDate: "",
    genres: [],
    duration: "",
    rating: "",
    cast: [],
    director: [],
    poster: null,
    trailerUrl: null,
    movieUrl: "",
    availableForStreaming: false,
    languages:[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked,files } = e.target as HTMLInputElement;
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

  const handleSave = () => {
   const formData=new FormData();
   formData.append("title:",movie.title)
   formData.append("description:",movie.description)
   formData.append("releaseDate:",movie.releaseDate)
   formData.append("duration:",movie.duration)
   formData.append("rating:",movie.rating)
   formData.append("availableForStreaming:",String(movie.availableForStreaming))
   movie.genres.forEach((genre)=>formData.append("genres:",genre.value))
   if (Array.isArray(movie.languages)) {
    movie.languages.forEach((lang) => formData.append("languages:", lang.value));
  } else {
    console.error("movie.languages is not an array");
  }
   movie.cast.forEach((cast)=>formData.append("cast:",cast.value))
   movie.director.forEach((director)=>formData.append("director:",director.value))
   if(movie.poster){
    formData.append("poster:",movie.poster)
   }
   if(movie.trailerUrl){
    formData.append("trailerUrl:",movie.trailerUrl)
   }
   console.log("Form Data Entries",formData.entries())
   for(let pair of formData.entries()){
    console.log(pair[0],pair[1])
   }
    //API call to save movie
  };


  const handleClose = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="container1">
      <div className="add-movie-container">
        <h2 className="admin-h2">Add Movie</h2>
        <div className="fields-container">
          <div className="fields1">
            <label>Title</label>
            <input type="text" name="title" value={movie.title} onChange={handleChange} placeholder="Enter movie title" autoComplete="off" />

            <label>Description</label>
            <textarea name="description" value={movie.description} onChange={handleChange} placeholder="Enter movie details"className="text-desc" autoComplete="off" />

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

            <label>Duration (Seconds)</label>
            <input type="number" name="duration" value={movie.duration} onChange={handleChange} placeholder="Enter duration" min="0"/>
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
            <label>Language</label>
            <Select
              isMulti
              options={languageOptions}
              value={movie.languages}
              onChange={(selected: any) => setMovie((prev) => ({ ...prev, languages: selected }))}
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
            <input type="file" name="trailerUrl"onChange={handleChange} />
          </div>
        </div>
        <div className="buttons-container">
          <button className="close-btn1" onClick={handleClose}>Close</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
