import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule, PaginationModule, TextFilterModule, NumberFilterModule, GridApi, ICellRendererParams } from "ag-grid-community";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../../components/ConfirmationPopup/DeleteConfirmationModal";
import { deleteSeries, listAllSeries } from "../../../services/apis/adminService";
import { toast } from "react-toastify";
import "../Movie Dashboard/AdminDashboard.css";
import EditSeriesModal from "./EditSeriesModal";
import { Series } from "../../../interfaces/admin.interface";
ModuleRegistry.registerModules([ClientSideRowModelModule,PaginationModule,TextFilterModule,NumberFilterModule]);

const AdminDashboardSeries: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [search, setSearch] = useState("");
  const gridApiRef = useRef<GridApi | null>(null);
  const navigate = useNavigate();

  const fetchAllSeries = async () => {
    try {
      const response = await listAllSeries(search, page, pageSize);
      const formattedSeries = response.data.seriesList.map((s:{
        _id: string;
        poster: string;
        title: string;
        description: string;
        rating: number;
        casts: { name: string }[];
        directors: { name: string }[];
      }) => ({
        id: s._id,
        poster: s.poster,
        title: s.title,
        description: s.description || "N/A",
        rating: s.rating || "N/A",
        cast: s.casts.map((c) => c.name).join(", "),
        director: s.directors.map((d) => d.name).join(", ")
      }));
      setSeries(formattedSeries);
    } catch (error:unknown) {
      if(error instanceof Error){
        toast.error(error.message||"Error in fetching series");
      }
    }
  };

  useEffect(() => {
    fetchAllSeries();
  }, [page, pageSize]);

  const handleGridReady = (params: GridReadyEvent) => {
    gridApiRef.current = params.api;
  };
  const handleDelete = async () => {
    if (!selectedSeries) return;
    try {
      debugger
      const response=await deleteSeries(selectedSeries.id);
      toast.success(response.data.message)
      fetchAllSeries();
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message||"Failed to delete series")
      }
    }
    setIsDeleteModelOpen(false)

  }
  const handleEdit = (ser: Series) => {
    setSelectedSeries(ser)
    setIsEditModalOpen(true)
  }
  const handleSaveChanges = async (updatedSeries:{
    _id: string;
      poster: string;
      title: string;
      description: string;
      rating: number;
      duration: string;
      casts: { value:string;label: string }[];
      directors: { value:string; label: string }[];
  }) => {
    try {
      const formattedMovie: Series = {
        id: updatedSeries._id,
        poster: updatedSeries.poster,
        title: updatedSeries.title,
        description: updatedSeries.description,
        rating: updatedSeries.rating,
        cast: updatedSeries.casts.map((c): { _id: string; name: string } => ({ _id: c.value, name: c.label })),
        director: updatedSeries.directors.map((d): { _id: string; name: string } => ({ _id: d.value, name: d.label }))
      };

      setSeries((prevSeries) =>
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prevSeries.map((m:any) => (m.id === formattedMovie.id ? {
          ...formattedMovie,
          cast: formattedMovie.cast.map(c => c.name).join(", "), 
          director: formattedMovie.director.map(d => d.name).join(", ")
        } : m))
      );

      toast.success("Series updated successfully");

      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update movie");
    }
  };
  const columnDefs: ColDef<Series>[] = [
    {
      headerName: "Poster",
      field: "poster",
      cellRenderer: (params: {value:string}) => (
        <img src={params.value} alt="poster" className="poster-img" />
      ),
      flex: 2,
      sortable: false,
      filter: false
    },
    { headerName: "Title", field: "title", flex: 2 },
    { headerName: "Description", field: "description", flex: 3 },
    { headerName: "Rating", field: "rating", flex: 1 },
    {
      headerName: "Cast",
      field: "cast",
      flex: 2,
    },
    {
      headerName: "Director",
      field: "director",
      flex: 1,
    },
    {
      headerName: "Action",
      cellRenderer: (params: ICellRendererParams<Series>) => (
        <div className="action-buttons">
          <button className="edit-btn-dashboard" onClick={() => params.data && handleEdit(params.data)}>
            <MdEdit size={15} />
          </button>
          <button className="delete-btn-dashboard" onClick={() => { setSelectedSeries(params.data ?? null); setIsDeleteModelOpen(true) }}><MdDelete size={15} /></button>
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
          <div className="ag-theme-quartz" style={{ height: "600px", width: "100%", marginLeft: "20px" }}>
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
      {
        isDeleteModelOpen && (
          <DeleteConfirmationModal isOpen={isDeleteModelOpen}
            onClose={() => setIsDeleteModelOpen(false)}
            onConfirm={handleDelete} />
        )
      }
      {isEditModalOpen && selectedSeries && (
        <EditSeriesModal
          seriesId={selectedSeries.id}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default AdminDashboardSeries;