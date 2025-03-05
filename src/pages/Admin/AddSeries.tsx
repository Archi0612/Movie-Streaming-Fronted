import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./AddSeries.css";

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
const fetchCastOptions = async (inputValue: string) => {
  return [
    { value: "actor1", label: "Leonardo DiCaprio" },
    { value: "actor2", label: "Joseph Gordon-Levitt" },
    { value: "actor3", label: "Elliot Page" },
  ].filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const fetchDirectorOptions = async (inputValue: string) => {
  return [
    { value: "director1", label: "Christopher Nolan" },
    { value: "director2", label: "Quentin Tarantino" },
  ].filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
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
  poster: string;
  trailerUrl: string;
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
    poster: "",
    trailerUrl: "",
    availableForStreaming: false,
    seasons: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked,files } = e.target as HTMLInputElement;
    if (files) {
      if (name.startsWith("episodeUrl")) {
        // Extract season and episode index from name
        const match = name.match(/episodeUrl-(\d+)-(\d+)/);
        if (match) {
          const seasonIndex = parseInt(match[1]);
          const episodeIndex = parseInt(match[2]);
  
          setSeries((prev) => {
            const updatedSeasons = [...prev.seasons];
            const updatedEpisodes = [...updatedSeasons[seasonIndex].episodes];
  
            updatedEpisodes[episodeIndex] = {
              ...updatedEpisodes[episodeIndex],
              episodeUrl: files[0], // Store full file object
            };
  
            updatedSeasons[seasonIndex] = {
              ...updatedSeasons[seasonIndex],
              episodes: updatedEpisodes,
            };
  
            return { ...prev, seasons: updatedSeasons };
          });
        }
      } else {
        setSeries((prev) => ({ ...prev, [name]: files[0] })); // Store file object for poster and trailer
      }
    }
    else{
      setSeries((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const addSeason = () => {
    setSeries((prev) => ({
      ...prev,
      seasons: [...prev.seasons, { seasonNumber: prev.seasons.length + 1, episodes: [] }],
    }));
  };

  const addEpisode = (seasonIndex: number) => {
    setSeries((prev) => {
      const updatedSeasons = [...prev.seasons];

      // Add a new episode without pre-assigning episodeNumber
      updatedSeasons[seasonIndex] = {
          ...updatedSeasons[seasonIndex],
          episodes: [
              ...updatedSeasons[seasonIndex].episodes,
              {
                  title: "",
                  description: "",
                  duration: "",
                  episodeNumber:0, // User will enter this manually
                  episodeUrl: "",
                  releaseDate: "",
              },
          ],
      };

      return { ...prev, seasons: updatedSeasons };
  });
  };

  const updateEpisode = (seasonIndex: number, episodeIndex: number, field: keyof Episode, value: any) => {
    setSeries((prev) => {
      const updatedSeasons = [...prev.seasons];
      (updatedSeasons[seasonIndex].episodes[episodeIndex][field] as any) = value;
      return { ...prev, seasons: updatedSeasons };
    });
  };

  const handleSave = () => {
    const formData=new FormData();
    formData.append("title",series.title);
    formData.append("description",series.description);
    formData.append("releaseDate",series.releaseDate);
    formData.append("rating",series.rating);
    formData.append("availableForStreaming",String(series.availableForStreaming));
    series.genres.forEach((genre)=>formData.append(`genres`,genre.value))
    series.languages.forEach((lang)=>formData.append(`languages`,lang.value))
    series.cast.forEach((actor)=>formData.append(`cast`,actor.value))
    series.director.forEach((director)=>formData.append(`director`,director.value))
    if(series.poster){
      formData.append("poster",series.poster);
    }
    if(series.trailerUrl){
      formData.append("trailerUrl",series.trailerUrl);
    }
    // series.seasons.forEach((season,seasonIndex)=>{
    //   formData.append(`seasons[${seasonIndex}][seasonNumber]`,String(season.seasonNumber));
    //   season.episodes.forEach((episode,episodeIndex)=>{
    //     formData.append(`seasons[${seasonIndex}][episodes][${episodeIndex}][title]`,episode.title);
    //     formData.append(`seasons[${seasonIndex}][episodes][${episodeIndex}][description]`,episode.description);
    //     formData.append(`seasons[${seasonIndex}][episodes][${episodeIndex}][duration]`,episode.duration);
    //     formData.append(`seasons[${seasonIndex}][episodes][${episodeIndex}][episodeNumber]`,String(episode.episodeNumber));
    //     formData.append(`seasons[${seasonIndex}][episodes][${episodeIndex}][episodeUrl]`,episode.episodeUrl);
    //     formData.append(`seasons[${seasonIndex}][episodes][${episodeIndex}][releaseDate]`,episode.releaseDate);
    //     if(episode.episodeUrl){
    //       formData.append(`seasons[${seasonIndex}][episodes][${episodeIndex}][episodeUrl]`,episode.episodeUrl);
    //     }
    //   })
    // })
    console.log("FormData Entries")
    for(let [key,value] of formData.entries()){
      console.log(`${key}:`,value);
    }
  };

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
            <Select isMulti options={genreOptions} onChange={(selected) => setSeries({ ...series, genres: selected as { value: string; label: string }[] })} styles={{
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
        {/* <div className="season-heading-container">
        <h3 className="season-header">Seasons</h3>
        <button className="season-add-btn" onClick={addSeason}>Add Season</button>
        </div>
        <div className="seasons-container">
          {series.seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="season">
              <div className="episode-header">
                <h4>Season {season.seasonNumber}</h4>
                <button className="episode-add-btn" onClick={() => addEpisode(seasonIndex)}>Add Episode</button>
              </div>
              <div className="episodes-container">
                {season.episodes.map((episode, episodeIndex) => (
                  <div key={episodeIndex} className="episode-container">
                    <h5 className="episode-number">Episode {episode.episodeNumber}</h5>
                    <label className="episode-label">Title</label>
                    <input type="text" placeholder="Episode title" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "title", e.target.value)} autoComplete="off"/>
                    <label className="episode-label">Description</label>
                    <textarea placeholder="Episode description" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "description", e.target.value)} autoComplete="off"/>
                    <label className="episode-label">Duration</label>
                    <input type="number" placeholder="Duration in minutes" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "duration", e.target.value)} min="0"/>
                    <label className="episode-label">Episode</label>
                    <input type="file" placeholder="Enter episode URL"  name={`episodeUrl-${seasonIndex}-${episodeIndex}`} onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "episodeUrl", e.target.value)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> */}
        <div className="buttons-container">
          <button className="close-btn2" onClick={() => navigate("/admin-dashboard-series")}>Close</button>
          
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddSeries;
