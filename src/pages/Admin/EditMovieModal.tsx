import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./EditMovieModal.css";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { EditMovieModalProps } from "../../interfaces/admin.interface";
import { editMovie, getMovieById, searchCastByName,searchDirectorByName } from "../../services/apis/adminService";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";


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

const EditMovieModal: React.FC<EditMovieModalProps> = ({ movieId, onClose, onSave }) => {
  const [updatedMovie, setUpdatedMovie] = useState<any>(null);
  const [originalMovie,setOriginalMovie]=useState<any>(null);
  const [loading,setLoading]=useState<boolean>(false);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchMovies = async() => {
      try {
        const result = await getMovieById(movieId);
        const movieData = result?.data.data.movie;
        
        const formattedReleaseDate = movieData.releaseDate 
          ? new Date(movieData.releaseDate).toISOString().split("T")[0] 
          : "";

        const formattedCast = movieData.cast
          ? movieData.cast.map((member: { _id: string; name: string }) => ({
              value: member._id,
              label: member.name,
            }))
          : [];
          
        const formattedDirector = movieData.director
          ? movieData.director.map((dir: { _id: string, name: string }) => ({
              value: dir._id,
              label: dir.name
            }))
          : [];
          
        
        const formattedGenres = movieData.genres
          ? movieData.genres.map((genreId: number) => {
              const genreOption = genreOptions.find(option => parseInt(option.value) === genreId);
              return genreOption || { value: genreId.toString(), label: `Genre ${genreId}` };
            })
          : [];
          
        const formattedLanguages = movieData.languages
          ? movieData.languages.map((lang: string) => {
              const langOption = languageOptions.find(option => option.value === lang);
              return langOption || { value: lang, label: lang };
            })
          : [];
          
        const formattedMovie = {
          ...movieData,
          releaseDate: formattedReleaseDate,
          cast: formattedCast,
          director: formattedDirector,
          genres: formattedGenres,
          languages: formattedLanguages,
          poster: movieData.poster || ""
        };
        
        setOriginalMovie(formattedMovie);
        setUpdatedMovie(formattedMovie);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    
    fetchMovies();
  }, [movieId]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedMovie((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (selected: any, action: any) => {
    setUpdatedMovie((prev: any) => ({
      ...prev,
      [action.name]: selected || [],
    }));
  }; 
  
  
  
  
  
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const { name } = e.target;
      const file = e.target.files[0];
      setUpdatedMovie((prev: any) => ({ ...prev, [name]: file }));
    }
  };
  const hasChanged = (field: string) => {
    if (!updatedMovie || !originalMovie) return false;
  
    const updatedValue = updatedMovie[field];
    const originalValue = originalMovie[field];
  
    if (Array.isArray(updatedValue) && Array.isArray(originalValue)) {
      // Convert to sorted strings to compare effectively
      const updatedStr = updatedValue.map((item: any) => item.value).sort().join(",");
      const originalStr = originalValue.map((item: any) => item.value).sort().join(",");
      return updatedStr !== originalStr;
    }
    return updatedValue !== originalValue;
  };
  

const handleSave = async() => {
  const formData=new FormData()
    if (hasChanged("title")) formData.append("title", updatedMovie.title);
    if (hasChanged("description")) formData.append("description", updatedMovie.description);
    if (hasChanged("releaseDate")) formData.append("releaseDate", updatedMovie.releaseDate);
    if (hasChanged("duration")) formData.append("duration", updatedMovie.duration.toString());
    if (hasChanged("rating")) formData.append("rating", updatedMovie.rating.toString());

    if (hasChanged("genres")) {
      updatedMovie.genres.forEach((genre: { value: string }) => {
        // Convert string value back to integer for the backend
        formData.append("genres", parseInt(genre.value).toString());
      });
    }
    
    if (hasChanged("languages")) {
      updatedMovie.languages.forEach((lang: { value: string }) =>
        formData.append("languages", lang.value)
      );
    }
    
    if (hasChanged("cast")) {
      updatedMovie.cast.forEach((cast: { value: string }) =>
        formData.append("casts", cast.value)
      );
    }
    if (hasChanged("director")) {
      updatedMovie.director.forEach((director: { value: string }) =>
        formData.append("directors", director.value)
      );
    }
    
    if (updatedMovie.poster && updatedMovie.poster !== originalMovie.poster) {
      formData.append("poster", updatedMovie.poster);
    }
    if (updatedMovie.trailerUrl && updatedMovie.trailerUrl !== originalMovie.trailerUrl) {
      formData.append("trailer", updatedMovie.trailerUrl);
    }
    if (updatedMovie.movieUrl && updatedMovie.movieUrl !== originalMovie.movieUrl) {
      formData.append("movie", updatedMovie.movieUrl);
    }

    formData.append("movieId", movieId);

  try {
    setLoading(true);
    await editMovie(formData);
    onSave(updatedMovie);
    onClose();
    // navigate("/admin-dashboard-movies")
    
  } catch (error:any) {
    toast.error(error.message)
  }
  finally{
    setLoading(false)
  }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {loading && <Loader/>}
      <div className="modal-container" onClick={(e)=>e.stopPropagation()}>
        <button className="upper-close-btn" onClick={onClose}>
            <MdClose size={20}/>
        </button>
        <h2>Edit Movie</h2>
        <div className="modal-fields">
            <div className="fields-left">
        <label>Title</label>
        <input type="text" name="title" value={updatedMovie?.title} className="edit-movie-input" onChange={handleChange} />

        <label>Description</label>
        <textarea className="text-desc" name="description" value={updatedMovie?.description}  onChange={handleChange} />

        <label>Release Date</label>
        <input type="date" name="releaseDate" value={updatedMovie?.releaseDate} className="edit-movie-input" onChange={handleChange} />

        <label>Genres</label>
        <Select
          name="genres"
          isMulti
          options={genreOptions}
          value={updatedMovie?.genres || []}
          onChange={(selected)=>handleSelectChange(selected,{name:"genres"})}
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
        <input type="number" name="duration" value={updatedMovie?.duration} className="edit-movie-input" onChange={handleChange} min="0" />
        <label>Rating</label>
        <input type="number" name="rating" value={updatedMovie?.rating} className="edit-movie-input" onChange={handleChange} step="0.1" min="0" />
        </div>
        <div className="fields-right">
        <label>Cast</label>
        <AsyncSelect
          isMulti
          loadOptions={fetchCastOptions}
          value={updatedMovie?.cast || []}
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
          value={updatedMovie?.director || []}
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
          value={updatedMovie?.languages || []}
          onChange={(selected)=>handleSelectChange(selected,{name:"languages"})}
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
        <input type="file" name="poster" className="edit-movie-input" onChange={handleFileChange} />

        <label>Trailer</label>
        <input type="file" name="trailerUrl"  className="edit-movie-input" onChange={handleFileChange} />
        <label>Movie</label>
            <input type="file" name="movieUrl" className="edit-movie-input" onChange={handleFileChange} />
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