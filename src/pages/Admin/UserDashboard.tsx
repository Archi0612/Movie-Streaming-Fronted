import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { ModuleRegistry, ClientSideRowModelModule,PaginationModule,TextFilterModule,NumberFilterModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./AdminDashboard.css"; // Using the same styles as AdminDashboard
import "./AdminDashboard.css"
// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule,PaginationModule,TextFilterModule,NumberFilterModule]);

interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  role: string;
  isActive: boolean;
}

const UserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", contact: "123-456-7890", role: "admin", isActive: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", contact: "987-654-3210", role: "user", isActive: true },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", contact: "555-123-4567", role: "user", isActive: true },
  ]);
  const loggedInUserId=123   //here id is of logged in user from redux
  // Toggle Active Status (Remove/Suspend User)
  const handleActiveToggle = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user))
    );

    // Here, you would call the backend API to remove/suspend the user
    console.log(`User with ID ${id} is now ${users.find(u => u.id === id)?.isActive ? "Inactive" : "Active"}`);
  };
  const handleRoleChange = async (user: User, isChecked: boolean) => {
    const updatedRole = isChecked ? "Admin" : "User";
  
    try {
      await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: updatedRole }),
      });
  
      // Update UI immediately
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, role: updatedRole } : u
        )
      );
    } catch (error) {
      console.error("Error updating role", error);
    }
  };
  
  const columnDefs: ColDef<User>[] = [
    { headerName: "Name", field: "name", flex: 2, filter: true, sortable: true },
    { headerName: "Email", field: "email", flex: 2, filter: true, sortable: true },
    { headerName: "Contact", field: "contact", flex: 2, filter: true, sortable: true },
    {
        headerName: "Role",
        field: "role",
        cellRenderer: (params: any) => {
          const isAdmin = params.value === "Admin";
          const isCurrentUser = params.data.id === loggedInUserId; // Logged-in admin ID
    
          return (
            <input
              type="checkbox"
              checked={isAdmin}
              disabled={isAdmin || isCurrentUser} // Disable for existing Admins & self
              onChange={(e) => handleRoleChange(params.data, e.target.checked)}
            />
          );
        },
        flex: 1,
        cellStyle: { textAlign: "center" },
        filter:false
      },
    {
      headerName: "Active",
      field: "isActive",
      cellRenderer: (params: any) => (
        <input
          type="checkbox"
          checked={params.value}
          onChange={() => handleActiveToggle(params.data.id)}
          className="active-checkbox"
        />
      ),
      flex: 1,
      sortable: false,
      filter: false,
    },
  ];
  const pagination=true;
  const paginationPageSize=3;
  const paginationPageSizeSelector=[10,20,50,100];

  return (
    <div className="admin-container">
      <div className="content">
        <div className="content-card">
          <h2 className="dashboard-h2">User Management</h2>
          <div className="ag-theme-quartz" style={{ height: "500px", width: "100%",marginTop:"40px" }}>
            <AgGridReact
              rowStyle={{ color: "white" }}
              rowData={users}
              columnDefs={columnDefs}
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
              domLayout="normal"
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
    </div>
  );
};

export default UserDashboard;
