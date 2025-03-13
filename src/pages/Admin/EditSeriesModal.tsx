import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./EditSeriesModal.css"; 
import { toast } from "react-toastify";
import { editSeries,getSeriesById,searchCastByName,searchDirectorByName } from "../../services/apis/adminService";
import { useNavigate } from "react-router-dom";
import { EditSeriesModalProps } from "../../interfaces/admin.interface";
import Loader from "../../components/shimmerUI/Loader";
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
    console.error("Error fetching cast:",error);
    return [];
  }
};
const fetchDirectorOptions = async(inputValue: string): Promise<{ value: string; label: string }[]> => {
  if(!inputValue.trim()) return [];
  try {
    const results=await searchDirectorByName(inputValue.trim());
    return results.map((director:{_id:string;name:string})=>({
      value:director._id,
      label:director.name
    }))
  } catch (error) {
    console.error("Error fetching director:");
    return [];
  }
};
const EditSeriesModal: React.FC<EditSeriesModalProps> = ({ seriesId, onClose, onSave }) => {
  const[updatedSeries,setUpdatedSeries]=useState<any>(null);
  const [originalSeries,setOriginalSeries]=useState<any>(null);
  const[loading,setLoading]=useState<boolean>(false)
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchSeries=async()=>{
      try {
        setLoading(true);
        const result=await getSeriesById(seriesId);
        const seriesData=result?.data.seriesInfo;
        const formattedReleaseDate = seriesData.releaseDate 
          ? new Date(seriesData.releaseDate).toISOString().split("T")[0] 
          : "";

        // Format cast data
        const formattedCast = seriesData.casts
          ? seriesData.casts.map((member: { _id: string; name: string }) => ({
              value: member._id,
              label: member.name,
            }))
          : [];
        // Format director data
        const formattedDirector = seriesData.directors
          ? seriesData.directors.map((dir: { _id: string, name: string }) => ({
              value: dir._id,
              label: dir.name
            }))
          : [];
          
        // Format genres data - convert numeric IDs to strings for react-select
        const formattedGenres = seriesData.genres
          ? seriesData.genres.map((genreId: number) => {
              const genreOption = genreOptions.find(option => parseInt(option.value) === genreId);
              return genreOption || { value: genreId.toString(), label: `Genre ${genreId}` };
            })
          : [];
          
        // Format languages data
        const formattedLanguages = seriesData.languages
          ? seriesData.languages.map((lang: string) => {
              const langOption = languageOptions.find(option => option.value === lang);
              return langOption || { value: lang, label: lang };
            })
          : [];
          
        const formattedSeries = {
          ...seriesData,
          releaseDate: formattedReleaseDate,
          casts: formattedCast,
          directors: formattedDirector,
          genres: formattedGenres,
          languages: formattedLanguages,
          poster: seriesData.poster || ""
        };
        
        setOriginalSeries(formattedSeries);
        setUpdatedSeries(formattedSeries);
      } catch (error:any) {
        toast.error(error.message)
      }
      finally{
        setLoading(false)
      }
    };
    fetchSeries();
  },[seriesId])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setUpdatedSeries((prev: any) => ({ ...prev, [name]: value }));
    };

  const handleSelectChange = (selected: any, action: any) => {
      setUpdatedSeries((prev: any) => ({
        ...prev,
        [action.name]: selected || [],
      }));
    }; 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const { name } = e.target;
        const file = e.target.files[0]; // Safe access
        setUpdatedSeries((prev: any) => ({ ...prev, [name]: file }));
      }
    };
    const hasChanged = (field: string) => {
      if (!updatedSeries || !originalSeries) return false;
    
      const updatedValue = updatedSeries[field];
      const originalValue = originalSeries[field];
    
      if (Array.isArray(updatedValue) && Array.isArray(originalValue)) {
        // Convert to sorted strings to compare effectively
        const updatedStr = updatedValue.map((item: any) => item.value).sort().join(",");
        const originalStr = originalValue.map((item: any) => item.value).sort().join(",");
        return updatedStr !== originalStr;
      }
      return updatedValue !== originalValue;
    };  
  const handleSave=async()=>{
      const formData=new FormData();
      if(hasChanged("title")) formData.append("title",updatedSeries.title);
      if(hasChanged("description")) formData.append("description",updatedSeries.description)
      if(hasChanged("releaseDate")) formData.append("releaseDate",updatedSeries.releaseDate)
      if(hasChanged("rating")) formData.append("rating",updatedSeries.rating.toString())
      if(hasChanged("genres")){
        updatedSeries.genres.forEach((genre:{value:string})=>{
          formData.append("genres",parseInt(genre.value).toString())
        });
      }
     if(hasChanged("languages")){
      updatedSeries.languages.forEach((lang:{value:string})=>{
        formData.append("languages",lang.value)
      });
     } 
     if(hasChanged("casts")){
      updatedSeries.casts.forEach((cast:{value:string})=>{
        formData.append("casts",cast.value)
      })
     }
     if(hasChanged("directors")){
      updatedSeries.directors.forEach((director:{value:string})=>{
        formData.append("directors",director.value)
      })
     }
     if (updatedSeries.poster && updatedSeries.poster !== originalSeries.poster) {
      formData.append("poster", updatedSeries.poster);
    }
    if (updatedSeries.trailerUrl && updatedSeries.trailerUrl !== originalSeries.trailerUrl) {
      formData.append("trailer", updatedSeries.trailerUrl);
    }
    formData.append("seriesId",seriesId)
    try {
      setLoading(true);
      await editSeries(formData);
      onSave(updatedSeries);
      onClose();
      navigate("/admin-dashboard-series")
    } 
    catch (error:any) {
      toast.error(error.message)
    }
    finally{
      setLoading(false);
    }
  }      
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="upper-close-btn" onClick={onClose}>
          <MdClose size={20} />
        </button>
        <h2>Edit Series</h2>
        <div className="modal-fields">
      {loading && (<Loader/>)}
          <div className="fields-left">
            <label>Title</label>
            <input type="text" name="title" value={updatedSeries?.title} className="edit-series-input" onChange={handleChange} />

            <label>Description</label>
            <textarea name="description" value={updatedSeries?.description} className="edit-series-textarea" onChange={handleChange} />

            <label>Release Date</label>
            <input type="date" name="releaseDate" value={updatedSeries?.releaseDate || ""} className="edit-series-input" onChange={handleChange} />

            <label>Genres</label>
            <Select
              name="genres"
              isMulti
              options={genreOptions}
              value={updatedSeries?.genres || []}
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
            <label>Rating</label>
            <input type="number" name="rating" value={updatedSeries?.rating} className="edit-series-input" onChange={handleChange} step="0.1" min="0" />

          </div>

          <div className="fields-right">

            <label>Cast</label>
            <AsyncSelect
              isMulti
              loadOptions={fetchCastOptions}
              value={updatedSeries?.casts || []}
              onChange={(selected) => handleSelectChange(selected, { name: "casts" })}
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
              value={updatedSeries?.directors || []}
              onChange={(selected) => handleSelectChange(selected, { name: "directors" })}
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
              value={updatedSeries?.languages || []}
              onChange={(selected) => handleSelectChange(selected, { name:"languages" })}
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
            <input type="file" name="poster" className="edit-series-input" onChange={handleFileChange} />

            <label>Trailer</label>
            <input
              type="file"
              name="trailerUrl"
              className="edit-series-input"
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
