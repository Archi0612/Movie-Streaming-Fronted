import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { deleteSeries, listAllSeries } from "../../services/apis/adminService";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface Series {
  id: string;
  poster: string;
  title: string;
  description?: string;
  rating: number;
  cast?: string;
  director?: string;
}

const AdminDashboardSeries: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const[selectedSeries,setSelectedSeries]=useState<Series | null>(null);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [search, setSearch] = useState("");
  const gridApiRef = useRef<any>(null);
  const navigate = useNavigate();

  const fetchAllSeries = async () => {
    try {
      const response = await listAllSeries(search, page, pageSize);
      const formattedSeries = response.data.seriesList.map((s: any) => ({
        id: s._id,
        poster: s.poster,
        title: s.title,
        description: s.description || "N/A",
        rating: s.rating || "N/A",
        cast:s.casts.map((c:any)=>c.name).join(", "),
        director: s.directors.map((d:any)=>d.name).join(", ")
      }));
      setSeries(formattedSeries);
    } catch (error) {
      toast.error("Error in fetching series");
    }
  };

  useEffect(() => {
    fetchAllSeries();
  }, [page, pageSize]);

  const handleGridReady = (params: GridReadyEvent) => {
    gridApiRef.current = params.api;
  };
  const handleDelete=async()=>{
     if(!selectedSeries) return;
     try {
      await deleteSeries(selectedSeries.id);
      toast.success("Series Deleted Successfully")
      fetchAllSeries();
     } catch (error:any) {
      toast.error(error.message)
     }
     setIsDeleteModelOpen(false)

  }
  const columnDefs: ColDef<Series>[] = [
    {
      headerName: "Poster",
      field: "poster",
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
      cellRenderer: (params:any) => (
        <div className="action-buttons">
          <button className="edit-btn">
            <MdEdit size={15} />
          </button>
          <button className="delete-btn" onClick={()=>{setSelectedSeries(params.data);setIsDeleteModelOpen(true)}}><MdDelete size={15} /></button>
        </div>
      ),
      flex: 1,
      sortable: false,
      filter: false,
    },
  ];

  const handleOpenSeries = () => navigate("/add-series");
  const handleOpenEpisode = () => navigate("/add-episode");

  return (
    <div className="admin-container">
      <div className="content">
        <div className="content-card">
          <h2 className="dashboard-h2">Manage Series</h2>
          <div className="add-btn-container">
            <button className="add-episode-btn" onClick={handleOpenEpisode}>
              Add Episode
            </button>
            <button className="add-movie-btn" onClick={handleOpenSeries}>
              <MdAdd size={20} />
            </button>
          </div>
          <div className="ag-theme-quartz" style={{ height: "700px", width: "100%" }}>
            <AgGridReact
              rowData={series}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={pageSize}
              paginationPageSizeSelector={[15, 20, 40, 60, 100]}
              onGridReady={handleGridReady}
              rowHeight={60}
              headerHeight={60}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                filter: true,
                floatingFilter: false,
                sortable: true,
                headerStyle: { fontWeight: "bold", fontSize: "15px", textAlign: "center" },
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
  );
};

export default AdminDashboardSeries;
