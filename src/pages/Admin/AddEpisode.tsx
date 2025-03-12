import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import "./AddEpisode.css";
import { MdAdd } from "react-icons/md";
import { addEpisode, searchSeries } from "../../services/apis/adminService";
import { toast } from "react-toastify";
import { Episode, Season } from "../../interfaces/admin.interface";
import Loader from "../../components/shimmerUI/Loader";
const AddEpisode: React.FC = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [seasonInput, setSeasonInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const addSeason = () => {
    const seasonNumber = parseInt(seasonInput, 10);
    if (!isNaN(seasonNumber) && seasonNumber > 0) {
      setSeasons([{ seasonNumber, episodes: [] }]);
    }
  };

  const addEpisodeToSeason = (seasonIndex: number) => {
    setSeasons((prevSeasons) => {
      const updatedSeasons = [...prevSeasons];
      const newEpisodeNumber = updatedSeasons[seasonIndex].episodes.length + 1; // Increment episode number
      const newEpisode: Episode = {
        title: "",
        description: "",
        duration: "",
        episodeNumber: newEpisodeNumber,
        episode: null,
        releaseDate: "",
      };
      updatedSeasons[seasonIndex] = {
        ...updatedSeasons[seasonIndex],
        episodes: [...updatedSeasons[seasonIndex].episodes, newEpisode],
      };
      return updatedSeasons;
    });
  };
  const updateEpisode = (
    seasonIndex: number,
    episodeIndex: number,
    field: keyof Episode,
    value: any
  ) => {
    setSeasons((prev) => {
      const updatedSeasons = [...prev];
      updatedSeasons[seasonIndex].episodes[episodeIndex] = {
        ...updatedSeasons[seasonIndex].episodes[episodeIndex],
        [field]: value,
      };
      return updatedSeasons;
    });
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const formDataArray: FormData[] = [];

      seasons.forEach((season) => {
        season.episodes.forEach((episode) => {
          const formData = new FormData();
          if (selectedSeries) {
            formData.append("seriesId", selectedSeries.value);
          }
          formData.append("seasonNumber", season.seasonNumber.toString());
          formData.append("title", episode.title);
          formData.append("description", episode.description);
          formData.append("duration", episode.duration);
          formData.append("episodeNumber", episode.episodeNumber.toString());
          formData.append("releaseDate", episode.releaseDate);
          if (episode.episode instanceof File) {
            formData.append("episode", episode.episode);
          }

          formDataArray.push(formData);
        });
      });

      await Promise.all(formDataArray.map((formdata) => addEpisode(formdata)));
      toast.success("Episodes added Successfully");
      navigate("/admin-dashboard-series");
    } catch (error) {
      toast.error("Error in Adding episode");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin-dashboard-series");
  };
  const fetchSeriesOptions = async (inputValue: string) => {
    try {
      const response = await searchSeries(inputValue.trim());
      return (
        response?.data?.data?.seriesList.map(
          (series: { _id: string; title: string }) => ({
            value: series._id,
            label: series.title,
          })
        ) || []
      );
    } catch (error) {
      toast.error("Error in fetching series");
    }
  };

  return (
    <div className="add-episode">
      {loading && <Loader />}
      <div className="add-episode-container">
        <h2 className="season-header">Seasons</h2>
        <div className="series-selection">
          <div className="series-selection-1">
            <label>Select Series:</label>
            <AsyncSelect
              loadOptions={fetchSeriesOptions}
              onChange={setSelectedSeries}
              placeholder="Select Series..."
              className="select-1"
              classNames={{
                control: () => "custom-control",
              }}
              styles={{
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "white",
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
          <div className="series-selection-2">
            <input
              type="number"
              className="add-episode-input"
              placeholder="Enter Season Number.."
              value={seasonInput}
              onChange={(e) => setSeasonInput(e.target.value)}
            />
            <button onClick={addSeason}>
              <MdAdd />
            </button>
          </div>
        </div>
        <div className="seasons-container">
          {seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="season">
              <div className="episode-header">
                <h4>Season {season.seasonNumber}</h4>
                <button
                  className="episode-add-btn"
                  onClick={() => addEpisodeToSeason(seasonIndex)}
                >
                  Add Episode
                </button>
              </div>
              <div className="episodes-container">
                {season.episodes.map((episode, episodeIndex) => (
                  <div key={episodeIndex} className="episode-container">
                    <h5 className="episode-number">Episode</h5>
                    <label className="episode-label">Title</label>
                    <input
                      type="text"
                      className="add-episode-input"
                      placeholder="Episode title"
                      onChange={(e) =>
                        updateEpisode(
                          seasonIndex,
                          episodeIndex,
                          "title",
                          e.target.value
                        )
                      }
                      autoComplete="off"
                    />
                    <label className="episode-label">Description</label>
                    <textarea
                      placeholder="Episode description"
                      onChange={(e) =>
                        updateEpisode(
                          seasonIndex,
                          episodeIndex,
                          "description",
                          e.target.value
                        )
                      }
                      autoComplete="off"
                      className="add-episode-textarea"
                    />
                    <label className="episode-label">Duration (Seconds)</label>
                    <input
                      type="number"
                      className="add-episode-input"
                      placeholder="Duration in minutes"
                      onChange={(e) =>
                        updateEpisode(
                          seasonIndex,
                          episodeIndex,
                          "duration",
                          e.target.value
                        )
                      }
                      min="0"
                    />
                    <label className="episode-label">Episode Number</label>
                    <input
                      type="number"
                      className="add-episode-input"
                      min={"1"}
                      placeholder="Episode number"
                      onChange={(e) =>
                        updateEpisode(
                          seasonIndex,
                          episodeIndex,
                          "episodeNumber",
                          e.target.value
                        )
                      }
                    />

                    <label className="episode-label">Release Date</label>
                    <input
                      type="date"
                      className="add-episode-input"
                      placeholder="Release Date"
                      onChange={(e) =>
                        updateEpisode(
                          seasonIndex,
                          episodeIndex,
                          "releaseDate",
                          e.target.value
                        )
                      }
                    />

                    <label className="episode-label">Episode</label>
                    <input
                      type="file"
                      className="add-episode-input"
                      placeholder="Enter episode URL"
                      onChange={(e) =>
                        updateEpisode(
                          seasonIndex,
                          episodeIndex,
                          "episode",
                          e.target.files?.[0]
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="season-button-group">
          <button className="season-close-btn" onClick={handleCancel}>
            Close
          </button>
          <button className="season-save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEpisode;
