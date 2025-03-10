import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import poster1 from "../../assets/kgf2poster.jpeg";
import poster2 from "../../assets/salar.jpeg";
import EditSeriesModal from "../EditSeriesModal";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface Series {
  id?: number;
  duration?:number; // Now optional
  title: string;
  description: string;
  rating: string;
  cast: { value: string; label: string }[];
  director: { value: string; label: string }[];
  poster: File | string; // Poster is now typed as File or string
  img?: string; // Now optional
  genres?: { value: string; label: string }[];
  releaseDate?: string;
  languages?: { value: string; label: string }[];
  trailerUrl?: File | string; // Trailer is typed as File or string
  availableForStreaming?: boolean;
}


const AdminDashboardSeries: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([
    {
      title: "Kgf Chapter 2",
      description: "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes...",
      rating: "8.2",
      cast: [
        { value: "Yash", label: "Yash" },
        { value: "Shrinidhi Shetty", label: "Shrinidhi Shetty" },
      ],
      director: [{ value: "Prashant Neel", label: "Prashant Neel" }],
      poster: poster1,
    },
    {
      title: "Salaar: Part 1 - Ceasefire",
      description: "The fate of a violently contested kingdom hangs on the fraught bond...",
      rating: "6.6",
      cast: [
        { value: "Prabhas", label: "Prabhas" },
        { value: "Shruti Hasan", label: "Shruti Hasan" },
      ],
      director: [{ value: "Prashant Neel", label: "Prashant Neel" }],
      poster: poster2,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const navigate = useNavigate();

  const handleEdit = (series: Series) => {
    setSelectedSeries(series);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSeries(null);
  };

  const handleSave = (updatedSeries: Series) => {
    setSeries((prevSeries) =>
      prevSeries.map((s) => (s.title === updatedSeries.title ? updatedSeries : s))
    );
    handleCloseModal();
  };

  const columnDefs: ColDef<Series>[] = [
    {
      headerName: "Poster",
      field: "poster",
      cellRenderer: (params: any) => <img src={params.value} alt="poster" className="poster-img" />,
      flex: 2,
      sortable: false,
    },
    { headerName: "Title", field: "title", flex: 2 },
    { headerName: "Description", field: "description", flex: 3 },
    { headerName: "Rating", field: "rating", flex: 1 },
    {
      headerName: "Cast",
      field: "cast",
      valueFormatter: (params) => params.value?.map((actor: { label: string }) => actor.label).join(", "),
      flex: 2,
    },
    {
      headerName: "Director",
      field: "director",
      valueFormatter: (params) => params.value?.map((dir: { label: string }) => dir.label).join(", "),
      flex: 1,
    },
    {
      headerName: "Action",
      cellRenderer: (params: any) => (
        <div className="action-buttons">
          <button className="edit-btn" onClick={() => handleEdit(params.data)}><MdEdit size={15} /></button>
          <button className="delete-btn"><MdDelete size={15} /></button>
        </div>
      ),
      flex: 1,
      sortable: false,
      filter: false,
    },
  ];

  return (
    <div className="admin-container">
      <div className="content">
        <div className="content-card">
          <div className="add-btn-container">
            <button className="add-movie-btn" onClick={() => navigate("/add-series")}>
              <MdAdd size={20} />
            </button>
          </div>
          <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
            <AgGridReact
              rowStyle={{ color: "white" }}
              rowData={series}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="normal"
              rowHeight={60}
              headerHeight={60}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                filter: true,
                floatingFilter: true,
                sortable: true,
              }}
            />
          </div>
        </div>
      </div>

      {isModalOpen && selectedSeries && (
        <EditSeriesModal
          series={selectedSeries}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminDashboardSeries;