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
  const [series, setSeries] = useState<Series[]>([
    {
      id: 1,
      img: poster1,
      title: "Kgf Chapter 2",
      description:
        "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes...",
      rating: "8.2",
      duration: "2h 46min",
      cast: "Yash, Shrinidhi Shetty, Sanjay Dutt, Ravena Tondon",
      director: "Prashant Neel",
    },
    {
      id: 2,
      img: poster2,
      title: "Salaar: Part 1 - Ceasefire",
      description:
        "The fate of a violently contested kingdom hangs on the fraught bond...",
      rating: "6.6",
      duration: "2h 55min",
      cast: "Prabhas, Shruti Hasan, Prithviraj Sukumaran, Sriya Reddy",
      director: "Prashant Neel",
    },
  ]);
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
  const handleClick = () => {
    navigate("/add-series");
  };
  const handleDelete = () => {
    setIsDeleteModelOpen(false);
  };
  return (
    <div className="admin-container">
      <div className="content">
        <div className="content-card">
          <h2 className="dashboard-h2">Manage Series</h2>
          <div className="add-btn-container">
            <button className="add-movie-btn" onClick={handleClick}>
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
