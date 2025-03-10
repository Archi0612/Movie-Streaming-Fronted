import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./EditMovieModal.css";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { Movie } from "../../interfaces/movie.interface";
import { editMovie, getMovieById, searchCastByName,searchDirectorByName } from "../../services/apis/adminService";
interface EditMovieModalProps {
  movieId: string;
  onClose: () => void;
  onSave: (updatedMovie: any) => void;
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

const EditMovieModal: React.FC<EditMovieModalProps> = ({ movieId, onClose, onSave }) => {
  const [updatedMovie, setUpdatedMovie] = useState<any>(null);
  const [originalMovie,setOriginalMovie]=useState<any>(null);
  useEffect(()=>{
   const fetchMovies=async()=>{
    try {
      const result=await getMovieById(movieId);
      const movieData=result?.data.data.movie;
      console.log(movieData)
      const forMattedReleaseDate=movieData.releaseDate 
      ? new Date(movieData.releaseDate).toISOString().split("T")[0]:"";

      const formattedCast = movieData.cast
        ? movieData.cast.map((member: { _id: string; name: string }) => ({
            value: member._id,
            label: member.name,
          }))
        : [];
      const formattedDirector=movieData.director
      ? movieData.director.map((dir:{_id:string,name:string})=>({
        value:dir._id,
        label:dir.name
      }))
      : [];
      setOriginalMovie({...movieData,releaseDate:forMattedReleaseDate,cast:formattedCast,director:formattedDirector,poster:movieData.poster || ""})
      setUpdatedMovie({...movieData,releaseDate:forMattedReleaseDate,cast:formattedCast,director:formattedDirector,poster:movieData.poster || ""})
      console.log(updatedMovie)
    } catch (error:any) {
      toast.error(error.message)
    }
   }
   fetchMovies();
  },[movieId])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedMovie((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected: any, action: any) => {
    setUpdatedMovie((prev: any) => {
      if (!prev) return prev; // Ensure `prev` exists
      return {
        ...prev,
        [action.name]: selected ? [...selected] : [],
      };
    });
  };
  
  
  
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const { name } = e.target;
      const file = e.target.files[0]; // Safe access
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
  //   formData.append("movieId",updatedMovie.id)
  //   formData.append("title",updatedMovie.title)
  //   formData.append("description",updatedMovie.description)
  //   formData.append("releaseDate", updatedMovie.releaseDate);
  // formData.append("duration", updatedMovie.duration.toString());
  // formData.append("rating", updatedMovie.rating.toString());

  // // Append multi-select fields as comma-separated values
  // if (Array.isArray(updatedMovie.genres)) {
  //   updatedMovie.genres.forEach((genre: { value: string; label: string }) => formData.append("genres", genre.value));
  // }

  // if (Array.isArray(updatedMovie.languages)) {
  //   updatedMovie.languages.forEach((lang: { value: string; label: string }) => formData.append("languages", lang.value));
  // }

  // if (Array.isArray(updatedMovie.cast)) {
  //   updatedMovie.cast.forEach((cast: { value: string; label: string }) => formData.append("cast", cast.value));
  // }

  // if (Array.isArray(updatedMovie.director)) {
  //   updatedMovie.director.forEach((director: { value: string; label: string }) => formData.append("director", director.value));
  // }
  // if (updatedMovie.poster) {
  //   formData.append("poster", updatedMovie.poster);
  // }
  // if (updatedMovie.trailerUrl) {
  //   formData.append("trailerUrl", updatedMovie.trailerUrl);
  // }

  if (hasChanged("title")) formData.append("title", updatedMovie.title);
    if (hasChanged("description")) formData.append("description", updatedMovie.description);
    if (hasChanged("releaseDate")) formData.append("releaseDate", updatedMovie.releaseDate);
    if (hasChanged("duration")) formData.append("duration", updatedMovie.duration.toString());
    if (hasChanged("rating")) formData.append("rating", updatedMovie.rating.toString());

    if (hasChanged("genres")) {
      formData.append(
        "genres",
        updatedMovie.genres.map((genre: { value: string }) => genre.value).join(",")
      );
    }
    
    if (hasChanged("languages")) {
      formData.append(
        "languages",
        updatedMovie.languages.map((lang: { value: string }) => lang.value).join(",")
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
    await editMovie(formData);
    toast.success("Movie Updated Successfully")
    onSave(updatedMovie);
    onClose();
  } catch (error:any) {
    toast.error(error.message)
  }
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
        <input type="text" name="title" value={updatedMovie?.title}  onChange={handleChange} />

        <label>Description</label>
        <textarea className="text-desc" name="description" value={updatedMovie?.description} onChange={handleChange} />

        <label>Release Date</label>
        <input type="date" name="releaseDate" value={updatedMovie?.releaseDate} onChange={handleChange} />

        <label>Genres</label>
        <Select
          name="genres"
          isMulti
          options={genreOptions}
          value={updatedMovie?.genres?.map((genreId: number) =>
            genreOptions.find((option) => option.value === genreId.toString()) || null
          ).filter(Boolean)} 
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
        <input type="number" name="duration" value={updatedMovie?.duration} onChange={handleChange} min="0" />
        <label>Rating</label>
        <input type="number" name="rating" value={updatedMovie?.rating} onChange={handleChange} step="0.1" min="0" />
        </div>
        <div className="fields-right">
        <label>Cast</label>
        <AsyncSelect
          isMulti
          loadOptions={fetchCastOptions}
          defaultOptions
          value={updatedMovie?.cast}
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
          value={updatedMovie?.director}
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
          value={updatedMovie?.languages?.map((lang: string) =>
            languageOptions.find((option) => option.value === lang) || null
          ).filter(Boolean)} 
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
        <input type="file" name="trailerUrl"  onChange={handleFileChange} />
        <label>Movie</label>
            <input type="file" name="movieUrl"onChange={handleFileChange} />
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