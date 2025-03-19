import React, { useEffect, useState } from "react";
import "./AddCast.css";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCrew } from "../../../services/apis/adminService";
interface Actor {
  name: string;
  dateOfBirth:string;
  nationality:string;
  gender:string;
    designation:string;
  profilePicture: File | null;
  preview: string;
}

const AddCast: React.FC = () => {
    const navigate=useNavigate();
  const [actors, setActors] = useState<Actor[]>([
    { name: "",dateOfBirth:"",nationality:"",gender:"",designation:"", profilePicture: null, preview: "https://placehold.co/200x200/gray/white?text=Add+image" },
  ]);
  const[loading,setLoading]=useState<boolean>(false);
  const[isSaveDisabled,setIsSaveDisabled]=useState<boolean>(true);

  useEffect(()=>{
    validateForm();
  },[actors])

  const validateForm=()=>{
    for(const actor of actors){
        if(!actor.name.trim()||!actor.profilePicture){
            setIsSaveDisabled(true);
            return;
        }
    }
    setIsSaveDisabled(false);
  }

  const addActor = () => {
    setActors([...actors, { name: "",dateOfBirth:"",nationality:"",designation:"",gender:"", profilePicture: null, preview: "https://placehold.co/200x200/gray/white?text=Add+image" }]);
  };

  const updateActor = (index: number, field: keyof Actor, value: any) => {
    setActors((prev) => {
      const updatedActors = [...prev];
      updatedActors[index] = { ...updatedActors[index], [field]: value };
      return updatedActors;
    });
  };

  const handlePhotoChange = (index: number, file: File | null) => {
    if (file) {
      const previewURL = URL.createObjectURL(file);
      updateActor(index, "profilePicture", file);
      updateActor(index, "preview", previewURL);
    }
  };

  const handleSave = async() => {
    try {
        setLoading(true);
        const formDataArray:FormData[]=[];
        actors.forEach((actor)=>{
            const formData=new FormData();
            formData.append("name",actor.name)
            formData.append("dateOfBirth",actor.dateOfBirth)
            formData.append("nationality",actor.nationality)
            formData.append("gender",actor.gender)
            formData.append("designation",actor.designation)
            if(actor.profilePicture instanceof File){
                formData.append("image",actor.profilePicture)
            }
            formDataArray.push(formData);
        })
        await Promise.all(formDataArray.map((formData)=>addCrew(formData)));
        toast.success("Crew added successfully");
        navigate("/admin-dashboard-movies");
        // formDataArray.forEach((formData, index) => {
        //     console.log(`FormData ${index + 1}:`);
        //     for (let [key, value] of formData.entries()) {
        //         console.log(`${key}:`, value);
        //     }
        //     console.log("----------------------"); // Separator for better readability
        // });
    } catch (error) {
        toast.error("Error in Adding crew");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="add-cast-container">
    <div className="add-cast">
        <div className="header">

      <h2 className="add-cast-heading">Add Crew</h2>
      <button className="cast-add-btn" onClick={addActor}><MdAdd size={20} /> Add Crew</button>
        </div>
      <div className="cast-container">
        {actors.map((actor, index) => (
          <div key={index} className="actor-card">
            <label className="photo-label" htmlFor={`photo-${index}`}>
              <img src={actor.preview} alt="Profile" className="profile-photo" />
            </label>
            <input
              type="file"
              id={`photo-${index}`}
              className="photo-input"
              accept="image/*"
              onChange={(e) => handlePhotoChange(index, e.target.files?.[0] || null)}
            />
            <label className="cast-name-label">Crew Name</label>
            <input
              type="text"
              className="actor-name-input"
              placeholder="Enter actor name"
              value={actor.name}
              onChange={(e) => updateActor(index, "name", e.target.value)}
            />
            <label className="cast-name-label">Date of Birth</label>
            <input type="date" className="actor-name-input" value={actor.dateOfBirth} onChange={(e)=>updateActor(index,"dateOfBirth",e.target.value)} />
            <label className="cast-name-label">Nationality</label>
            <input type="text" className="actor-name-input" placeholder="Enter nationality" value={actor.nationality} onChange={(e)=>updateActor(index,"nationality",e.target.value)}/>
            <label className="cast-name-label">Gender</label>
                    <select name="gender" className="actor-name-input" value={actor.gender} onChange={(e)=>updateActor(index,"gender",e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="Other">other</option>
                    </select>
            <label className="cast-name-label">Designamtion</label>
            <select name="designation" className="actor-name-input" value={actor.designation} onChange={(e)=>updateActor(index,"designation",e.target.value)}>
                  <option value="">Select Designation</option>
                  <option value="cast">Actor</option>
                  <option value="director">Director</option>
            </select>
          </div>
        ))}
      </div>
      <div className="cast-buttons-groups">
        <button className="cast-cancel-btn" onClick={()=>navigate("/admin-dashboard-movies")}>Cancel</button>
      <button className="cast-save-btn" onClick={handleSave} disabled={isSaveDisabled} title={isSaveDisabled ? "Please fill name and profilePhoto field":""}>Save Cast</button>
      </div>
    </div>
    </div>
  );
};

export default AddCast;
