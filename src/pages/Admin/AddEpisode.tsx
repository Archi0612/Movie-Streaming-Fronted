import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import "./AddEpisode.css"
import { MdAdd } from 'react-icons/md';
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
  const seriesOptions = [
    { value: 'series1', label: 'Series 1' },
    { value: 'series2', label: 'Series 2' },
    { value: 'series3', label: 'Series 3' }
];
const AddEpisode:React.FC = () => {
    const[seasons,setSeasons]=useState<Season[]>([]);
    const[selectedSeries,setSelectedSeries]=useState<{ value: string; label: string } | null>(null);
    const[seasonInput,setSeasonInput]=useState("");
    const navigate=useNavigate();
    const addSeason=()=>{
        const seasonNumber = parseInt(seasonInput, 10);
        if (!isNaN(seasonNumber) && seasonNumber > 0) {
            setSeasons([{ seasonNumber, episodes: [] }]);
        }
    }
    
  const addEpisode = (seasonIndex: number) => {
    setSeasons((prev) => {
        const updatedSeasons = [...prev];
        updatedSeasons[seasonIndex].episodes = [
            ...updatedSeasons[seasonIndex].episodes, // Keep previous episodes
            {
                title: "",
                description: "",
                duration: "",
                episodeNumber: updatedSeasons[seasonIndex].episodes.length, // Auto-increment episode number
                episodeUrl: "",
                releaseDate: "",
            }
        ];
        return updatedSeasons;
    });
    };
    const updateEpisode = (seasonIndex: number, episodeIndex: number, field: keyof Episode, value: any) => {
        setSeasons((prev) => {
          const updatedSeasons = [...prev];
          updatedSeasons[seasonIndex].episodes[episodeIndex] = {
            ...updatedSeasons[seasonIndex].episodes[episodeIndex],
            [field]: value,
          };
          return updatedSeasons;
        });
      };
    const handleSave=()=>{
        console.log("Seasons Data:",seasons)
    }
    const handleCancel=()=>{
        navigate("/admin-dashboard-series")
    }    
  return (
    <div className='add-episode'>
    <div className='add-episode-container'>
        <div className="season-heading-container">
        <h2 className="season-header">Seasons</h2>
        </div>
        <div className='series-selection'>
            <div className='series-selection-1'>
            <label>Select Series:</label>
            <Select
    options={seriesOptions}
    onChange={setSelectedSeries}
    placeholder="Select Series..."
    styles={{
        control: (provided) => ({
            ...provided,
            backgroundColor: "rgba(93, 94, 95, 0.3)",
            width: "300px",
            border: "none",
            color: "white",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "white", // Selected option color
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "white", // Placeholder color
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#6da3d6" : "#333",
            color: state.isSelected ? "white" : "white",
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
            <div className='series-selection-2'>
            <input type="number" placeholder='Enter Season Number..' value={seasonInput} onChange={(e)=>setSeasonInput(e.target.value)} />
            <button onClick={addSeason}><MdAdd/></button>
            </div>
        </div>
        <div className="seasons-container">
          {seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="season">
              <div className="episode-header">
                <h4>Season {season.seasonNumber}</h4>
                <button className="episode-add-btn" onClick={() => addEpisode(seasonIndex)}>Add Episode</button>
              </div>
              <div className="episodes-container">
                {season.episodes.map((episode, episodeIndex) => (
                  <div key={episodeIndex} className="episode-container">
                    <h5 className="episode-number">Episode</h5>
                    <label className="episode-label">Title</label>
                    <input type="text" placeholder="Episode title" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "title", e.target.value)} autoComplete="off"/>
                    <label className="episode-label">Description</label>
                    <textarea placeholder="Episode description" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "description", e.target.value)} autoComplete="off" className="text-area"/>
                    <label className="episode-label">Duration</label>
                    <input type="number" placeholder="Duration in minutes" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "duration", e.target.value)} min="0"/>
                    <label className='episode-label'>Episode Number</label>
                    <input type="number" min={"1"} placeholder='Episode number' onChange={(e)=>updateEpisode(seasonIndex,episodeIndex,"episodeNumber",e.target.value)} />
                    <label className="episode-label">Episode</label>
                    <input type="file" placeholder="Enter episode URL" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "episodeUrl", e.target.files?.[0])} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="season-button-group">
            <button className='season-close-btn' onClick={handleCancel}>Close</button>
            <button className='season-save-btn' onClick={handleSave}>Save</button>
        </div>
    </div>
    </div>
  )
}

export default AddEpisode