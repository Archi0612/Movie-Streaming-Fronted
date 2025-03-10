import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import poster1 from "../../assets/kgf2poster.jpeg";
import poster2 from "../../assets/salar.jpeg";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import EditSeriesModal from "../EditSeriesModal"; // Import modal component
import "./AdminDashboard.css"

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface Series {
  id: number;
  img: string;
  title: string;
  description: string;
  rating: string;
  duration: string;
  cast: string;
  director: string;
  genres?: { value: string; label: string }[];
  releaseDate?: string;
  languages?: { value: string; label: string }[];
  trailerUrl?: string;
}

const AdminDashboardSeries: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const navigate = useNavigate();
  const columnDefs: ColDef<Series>[] = [
    {
      headerName: "Poster",
      field: "img",
      cellRenderer: (params: any) => (
        <img src={params.value} alt="poster" className="poster-img" />
      ),
      flex: 2,
      sortable: false,
      filter: false,
    },
    { headerName: "Title", field: "title", flex: 2 },
    { headerName: "Description", field: "description", flex: 3 },
    { headerName: "Rating", field: "rating", flex: 1 },
    { headerName: "Cast", field: "cast", flex: 2 },
    { headerName: "Director", field: "director", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: () => (
        <div className="action-buttons">
          <button className="edit-btn">
            <MdEdit size={15} />
          </button>
          <button
            className="delete-btn"
            onClick={() => setIsDeleteModelOpen(true)}
          >
            <MdDelete size={15} />
          </button>
        </div>
      ),
      flex: 1,
      sortable: false,
      filter: false,
    },
  ];
  const handleOpenSeries = () => {
    navigate("/add-series");
  };
  const handleOpenEpisode=()=>{
    navigate("/add-episode")
  }

  const handleDelete = () => {
    setIsDeleteModelOpen(false);
  };
  
  return (
    <div className="admin-container">
      <div className="content">
        <div className="content-card">
          <h2 className="dashboard-h2">Manage Series</h2>
          <div className="add-btn-container">
            <button className="add-episode-btn" onClick={handleOpenEpisode}>Add Episode</button>
            <button className="add-movie-btn" onClick={handleOpenSeries}>
              <MdAdd size={20} />
            </button>
          </div>
          <div
            className="ag-theme-quartz"
            style={{ height: "500px", width: "100%" }}
          >
            <AgGridReact
              // rowStyle={{color:"white"}}
              rowData={series}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              // domLayout="normal"
              rowHeight={60}
              headerHeight={60}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                filter: true,
                floatingFilter: false,
                sortable: true,
                headerStyle: {
                  fontWeight: "bold",
                  fontSize: "15px",
                  textAlign: "center",
                },
              }}
            />
          </div>
        </div>
      </div>
      {isDeleteModelOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModelOpen}
          onClose={() => setIsDeleteModelOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
    // </div>

    // {/* Reusable Edit Series Modal */}
    // <EditSeriesModal
    //   isOpen={isModalOpen}
    //   series={selectedSeries}
    //   onClose={handleCloseModal}
    //   onChange={handleChange}
    // />
    // </div>
  );
};

export default AdminDashboardSeries;
