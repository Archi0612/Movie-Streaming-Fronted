import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./AddSeries.css";

const genreOptions = [
  { value: "action", label: "Action" },
  { value: "drama", label: "Drama" },
  { value: "comedy", label: "Comedy" },
  { value: "thriller", label: "Thriller" },
  { value: "sci-fi", label: "Sci-Fi" },
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

const AddSeries: React.FC = () => {
  const navigate = useNavigate();

  interface Episode {
    title: string;
    description: string;
    duration: string;
    episodeNumber: number;
    episodeUrl: string;
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
    director: { value: string; label: string } | null;
    poster: string;
    trailerUrl: string;
    availableForStreaming: boolean;
    seasons: Season[];
  }

  const [series, setSeries] = useState<Series>({
    title: "",
    description: "",
    genres: [],
    releaseDate: "",
    rating: "",
    cast: [],
    director: null,
    poster: "",
    trailerUrl: "",
    availableForStreaming: false,
    seasons: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setSeries((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const addSeason = () => {
    setSeries((prev) => ({
      ...prev,
      seasons: [...prev.seasons, { seasonNumber: prev.seasons.length + 1, episodes: [] }],
    }));
  };

interface Episode {
    title: string;
    description: string;
    duration: string;
    episodeNumber: number;
    episodeUrl: string;
}

interface Season {
    seasonNumber: number;
    episodes: Episode[];
}

const addEpisode = (seasonIndex: number) => {
    setSeries((prev) => {
        const updatedSeasons: Season[] = [...prev.seasons];
        updatedSeasons[seasonIndex].episodes.push({
            title: "",
            description: "",
            duration: "",
            episodeNumber: updatedSeasons[seasonIndex].episodes.length + 1,
            episodeUrl: "",
            releaseDate: "",
            
        });
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
    console.log("Series saved:", series);
  };

  return (
    <div className="container1">
      <div className="add-series-container">
        <h2>Add Series</h2>
        <div className="fields-container">
          <div className="fields1">
            <label>Title</label>
            <input type="text" name="title" value={series.title} onChange={handleChange} placeholder="Enter series title" />

            <label>Description</label>
            <textarea name="description" value={series.description} onChange={handleChange} placeholder="Enter series details" />

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
                })
              }}
            />
            <label>Poster</label>
            <input type="file" name="poster" value={series.poster} onChange={handleChange} />

            <label>Trailer</label>
            <input type="file" name="trailerUrl" value={series.trailerUrl} onChange={handleChange} />
          </div>
        </div>

        <h3 className="season-header">Seasons</h3>
        <div className="seasons-container">
          {series.seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="season">
              <div className="season-header">
                <h4>Season {season.seasonNumber}</h4>
                <button className="add-btn" onClick={() => addEpisode(seasonIndex)}>Add Episode</button>
              </div>
              <div className="episodes-container">
                {season.episodes.map((episode, episodeIndex) => (
                  <div key={episodeIndex} className="episode-container">
                    <div className="episode-header">
                      <h5>Episode {episode.episodeNumber}</h5>
                    </div>
                    <label>Title</label>
                    <input type="text" placeholder="Episode title" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "title", e.target.value)} />
                    <label>Description</label>
                    <textarea placeholder="Episode description" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "description", e.target.value)} />
                    <label>Duration</label>
                    <input type="number" placeholder="Duration in minutes" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "duration", e.target.value)}/>
                    <label>Episode</label>
                    <input type="file" placeholder="Enter episode URL" onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "episodeUrl", e.target.value)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <button className="add-btn" onClick={addSeason}>Add Season</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="close-btn" onClick={() => navigate("/admin-dashboard-series")}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddSeries;
