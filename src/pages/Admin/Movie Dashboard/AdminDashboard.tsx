import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule,PaginationModule,TextFilterModule,NumberFilterModule } from "ag-grid-community";
import { ColDef, GridReadyEvent, GridApi, ICellRendererParams } from "ag-grid-community"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import "./AdminDashboard.css";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import EditMovieModal from "./EditMovieModal";
import DeleteConfirmationModal from "../../../components/ConfirmationPopup/DeleteConfirmationModal";
import { deleteMovie, listAllMovie } from "../../../services/apis/adminService";
import { Movie } from "../../../interfaces/admin.interface";
import Loader from "../../../components/shimmerUI/Loader";
// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule, TextFilterModule, NumberFilterModule]);

// AdminDashboard Component
const AdminDashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12)
  const [loading, setLoading] = useState<boolean>(false)
  const gridApiRef = useRef<GridApi | null>(null);
  const navigate = useNavigate();

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsEditModalOpen(true);
  }

  const handleDelete = async () => {
    if (!selectedMovie) return;
    try {
     const response= await deleteMovie(selectedMovie.id);
     console.log(response)
      toast.success(response.message);
      fetchAllMovies();
    } catch (error: unknown) {
      console.log(error)
      if(error instanceof Error){toast.error(
        error.message||"Failed to delete Movie")}
    }
    setIsDeleteModelOpen(false)
  }
  const fetchAllMovies=async()=>{
      try {
        setLoading(true)
        const response=await listAllMovie(page,pageSize);
        const formattedMovies = response.data.data.movies.map((movie: {
          _id: string;
          poster: string;
          title: string;
          description: string;
          rating: number;
          cast: { name: string }[];
          director: { name: string }[];
        }) => ({
          id: movie._id,
          poster: movie.poster,
          title: movie.title,
          description: movie.description,
          rating: movie.rating,
          cast: movie.cast.map((c) => c.name).join(", "), 
          director: movie.director.map((d) => d.name).join(", ")
        }));
        setMovies(formattedMovies)
  
      } catch (error: unknown) {
        if(error instanceof Error){toast.error(
          error.message||"Error in fetching Movies")}
      }
      finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      fetchAllMovies();
    },[page,pageSize])
    const handleGridReady = (params: GridReadyEvent) => {
      gridApiRef.current = params.api;
    };
    const handleSaveChanges = async (updatedMovie:{
      _id: string;
      poster: string;
      title: string;
      description: string;
      rating: number;
      duration: string;
      cast: { value:string;label: string }[];
      director: { value:string; label: string }[];
    }) => {
      try {
        const formattedMovie: Movie = {
          id: updatedMovie._id,
          poster: updatedMovie.poster,
          title: updatedMovie.title,
          description: updatedMovie.description,
          rating: updatedMovie.rating,
          duration: updatedMovie.duration,
          cast: updatedMovie.cast.map((c): { _id: string; name: string } => ({ _id: c.value, name: c.label })),
          director: updatedMovie.director.map((d): { _id: string; name: string } => ({ _id: d.value, name: d.label }))
        };
        setMovies((prevMovies: Movie[]) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prevMovies.map((m: any) => (m.id === formattedMovie.id ? {
            ...formattedMovie,
            cast: formattedMovie.cast.map(c => c.name).join(", "), 
            director: formattedMovie.director.map(d => d.name).join(", ")
          } : m))
        );
    
        toast.success("Movie updated successfully");
        setIsEditModalOpen(false);
      } 
      catch (error) {
        toast.error("Failed to update movie");
      }
    };
  const columnDefs: ColDef<Movie>[] = [
    { headerName: "Poster", field: "poster", cellRenderer: (params: { value: string }) => <img src={params.value} alt="poster" className="poster-img" />, flex: 2, sortable: false, filter: false },
    { headerName: "Title", field: "title", flex: 2 },
    { headerName: "Description", field: "description", flex: 3 },
    { headerName: "Rating", field: "rating", flex: 1 },
    { headerName: "Cast", field: "cast", flex: 2 },
    { headerName: "Director", field: "director", flex: 1},
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params: ICellRendererParams<Movie>) => (
        <div className="action-buttons">
          <button className="edit-btn-dashboard" onClick={() => params.data && handleEdit(params.data)}><MdEdit size={15} /></button>
          <button className="delete-btn-dashboard" onClick={() => { setSelectedMovie(params.data ?? null); setIsDeleteModelOpen(true) }}><MdDelete size={15} /></button>
        </div>
      ),
      flex: 1,
      sortable: false,
      filter: false
    },
  ];
  const handleClick = () => {
    navigate("/add-movies");
  }
  const pagination = true;
  const paginationPageSize = 12;
  const paginationPageSizeSelector = [12, 20, 30, 50, 100];
  return (
    <div className="admin-container">
      {loading && <Loader/>}
      
      <div className="content">
        <div className="content-card">
          <h2 className="dashboard-h2">Manage Movies</h2>
          <div className="add-btn-container">
            <button className="add-movie-btn" onClick={handleClick}>
              <MdAdd size={20} />
            </button>
          </div>
          <div className="ag-theme-quartz" style={{ height: '600px', width: '100%', marginLeft:"20px" }}>
            <AgGridReact
              rowStyle={{ color: "white" }}
              rowData={movies}
              columnDefs={columnDefs}
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
              onPaginationChanged={(params) => {
                if (params.api) {
                  setPage(params.api.paginationGetCurrentPage() + 1);
                  setPageSize(params.api.paginationGetPageSize());
                }
              }}
              onGridReady={handleGridReady}
              domLayout="normal"
              rowHeight={60}
              headerHeight={60}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                filter: true,
                floatingFilter: false,
                sortable: true,
                headerStyle: { fontWeight: "bold", fontSize: "15px", textAlign: "center" }
              }}
            />
          </div>
        </div>
      </div>
      {

        isEditModalOpen && selectedMovie && (
          <EditMovieModal movieId={selectedMovie.id} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveChanges} />
        )}
      {
        isDeleteModelOpen && (
          <DeleteConfirmationModal isOpen={isDeleteModelOpen}
            onClose={() => setIsDeleteModelOpen(false)}
            onConfirm={handleDelete} />
        )
      }
    </div>
  );
};

export default AdminDashboard;