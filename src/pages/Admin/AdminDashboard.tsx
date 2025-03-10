import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ColDef, GridReadyEvent } from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import "./AdminDashboard.css";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import EditMovieModal from "./EditMovieModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { deleteMovie, listAllMovie } from "../../services/apis/adminService";
// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);


// Movie Interface
interface Movie {
  id: string;
  poster: string;
  title: string;
  description: string;
  rating: number;
  duration: string;
  cast: {_id:string;name:string}[];
  director: {_id:string;name:string}[];
  action?: string;
}

// AdminDashboard Component
const AdminDashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const[selectedMovie,setSelectedMovie]=useState<Movie | null>(null);
  const[isEditModalOpen,setIsEditModalOpen]=useState(false)
  const[isDeleteModelOpen,setIsDeleteModelOpen]=useState(false)
  const[page,setPage]=useState(1);
  const[pageSize,setPageSize]=useState(12)
  const gridApiRef=useRef<any>(null);
  const navigate=useNavigate();

  const handleEdit=(movie:Movie)=>{
    setSelectedMovie(movie);
    setIsEditModalOpen(true);
  }
  
  const handleDelete=async()=>{
    if(!selectedMovie) return;
    try {
      await deleteMovie(selectedMovie.id);
      toast.success("Movie Deleted successfully");
      fetchAllMovies();
    } catch (error:any) {
      toast.error(error.message || "Failed to delete movie")
    }
    setIsDeleteModelOpen(false)
  }
  const fetchAllMovies=async()=>{
      try {
        const response=await listAllMovie(page,pageSize);
        const formattedMovies = response.data.data.movies.map((movie: any) => ({
          id: movie._id,
          poster: movie.poster,
          title: movie.title,
          description: movie.description,
          rating: movie.rating,
          cast: movie.cast.map((c: any) => c.name).join(", "), // Convert array to string
          director: movie.director.map((d: any) => d.name).join(", ") // Convert array to string
        }));
        setMovies(formattedMovies)
        // setMovies(response.data.data.movies)
        console.log(response.data.data.movies)
  
      } catch (error) {
        toast.error("Error in fetching Movies")
      }
    }
    useEffect(()=>{
      fetchAllMovies();
    },[page,pageSize])
    const handleGridReady = (params: GridReadyEvent) => {
      gridApiRef.current = params.api;
    };
  
    const handlePageSizeChange = (size: number) => {
      setPageSize(size);
      if (gridApiRef.current) {
        gridApiRef.current.paginationSetPageSize(size);
      }
    };
  
  const handleSaveChanges = async (updatedMovie: Movie) => {
    try {
      // // Simulate API call with Promise.all
      // await Promise.all([
      //   fetch(`https://api.example.com/movies/${updatedMovie.id}`, {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(updatedMovie),
      //   }),
      // ]);

      // // Update movie list in UI
      // setMovies((prevMovies) =>
      //   prevMovies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
      // );
      
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update movie", error);
    }
  };

  const columnDefs: ColDef<Movie>[] = [
    { headerName: "Poster", field: "poster", cellRenderer: (params: any) => <img src={params.value} alt="poster" className="poster-img" />, flex: 2, sortable: false,filter:false },
    { headerName: "Title", field: "title", flex: 2 },
    { headerName: "Description", field: "description", flex: 3 },
    { headerName: "Rating", field: "rating", flex: 1 },
    { headerName: "Cast", field: "cast", flex: 2 },
    { headerName: "Director", field: "director", flex: 1 },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params:any) => (
        <div className="action-buttons">
          <button className="edit-btn" onClick={() => handleEdit(params.data)}><MdEdit size={15} /></button>
          <button className="delete-btn" onClick={()=>{setSelectedMovie(params.data);setIsDeleteModelOpen(true)}}><MdDelete size={15} /></button>
        </div>
      ),
      flex: 1,
      sortable: false,
      filter: false
    },
  ];
  const handleClick=()=>{
    navigate("/add-movies");
  }
  return (
    <div className="admin-container">
      
      <div className="content">
        <div className="content-card">
          <h2 className="dashboard-h2">Manage Movies</h2>
          <div className="add-btn-container">
            <button className="add-movie-btn" onClick={handleClick}>
              <MdAdd size={20} />
            </button>
          </div>
          <div className="ag-theme-quartz" style={{ height: '800px', width: '100%' }}>
            <AgGridReact
            rowStyle={{color:"white"}}
              rowData={movies}
              columnDefs={columnDefs}
              pagination={true} 
              paginationPageSize={15}
              paginationPageSizeSelector={[12,20,40,60,100]}
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
        
      isEditModalOpen && selectedMovie &&(
        <EditMovieModal movieId={selectedMovie.id} onClose={()=>setIsEditModalOpen(false)} onSave={handleSaveChanges}/>
      )}
      {
        isDeleteModelOpen &&(
          <DeleteConfirmationModal  isOpen={isDeleteModelOpen}
          onClose={() => setIsDeleteModelOpen(false)}
          onConfirm={handleDelete}/>
        )
      }
    </div>
  );
};

export default AdminDashboard;
