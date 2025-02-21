import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import Modal from "react-modal";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import "./AdminDashboard.css";
import poster1 from "../../assets/kgf2poster.jpeg";
import poster2 from "../../assets/salar.jpeg";

// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);



// Movie Interface
interface Movie {
  id: number;
  img: string;
  title: string;
  description: string;
  rating: string;
  duration: string;
  cast: string;
  director: string;
  action?: string;
}

// AdminDashboard Component
const AdminDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([
    {
      id: 1,
      img: poster1,
      title: "Kgf Chapter 2",
      description: "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes...",
      rating: "8.2",
      duration: "2h 46min",
      cast: "Yash, Shrinidhi Shetty, Sanjay Dutt, Ravena Tondon",
      director: "Prashant Neel",
    },
    {
      id: 2,
      img: poster2,
      title: "Salaar: Part 1 - Ceasefire",
      description: "The fate of a violently contested kingdom hangs on the fraught bond...",
      rating: "6.6",
      duration: "2h 55min",
      cast: "Prabhas, Shruti Hasan, Prithviraj Sukumaran, Sriya Reddy",
      director: "Prashant Neel",
    },
  ]);

  const columnDefs: ColDef<Movie>[] = [
    { headerName: "Poster", field: "img", cellRenderer: (params: any) => <img src={params.value} alt="poster" className="poster-img" />, flex: 2, sortable: false },
    { headerName: "Title", field: "title", flex: 2 },
    { headerName: "Description", field: "description", flex: 3 },
    { headerName: "Rating", field: "rating", flex: 1 },
    { headerName: "Cast", field: "cast", flex: 2 },
    { headerName: "Director", field: "director", flex: 1 },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: () => (
        <div className="action-buttons">
          <button className="edit-btn"><MdEdit size={15} /></button>
          <button className="delete-btn"><MdDelete size={15} /></button>
        </div>
      ),
      flex: 1,
      sortable: false,
      filter: false
    },
  ];

  return (
    <div className="admin-container">
      
      <div className="content">
        <div className="content-card">
          <div className="add-btn-container">
            <button className="add-movie-btn" onClick={() => setIsModalOpen(true)}>
              <MdAdd size={20} />
            </button>
          </div>
          <div className="ag-theme-quartz" style={{ height: '500px', width: '100%' }}>
            <AgGridReact
            rowStyle={{color:"white"}}
              rowData={movies}
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
                sortable: true 
              }}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal">
        <h2 className="modal-title">Add Movie</h2>
        <input type="text" placeholder="Title" className="input-field" />
        <input type="file" className="input-field" />
        <textarea placeholder="Description" className="input-field"></textarea>
        <input type="text" placeholder="Duration" className="input-field" />
        <input type="text" placeholder="Cast" className="input-field" />
        <input type="text" placeholder="Director" className="input-field" />
        <div className="modal-actions">
          <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
