import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../Movie Dashboard/AdminDashboard.css";
import {
  getAllUser,
  updateActiveToggle,
  updateRole,
} from "../../../services/apis/adminService";
import { toast } from "react-toastify";
import { User } from "../../../interfaces/admin.interface";
import Loader from "../../../components/shimmerUI/Loader";
import ConfirmationModal from "../../../components/ConfirmationPopup/ConfirmationModal";
// Register AG Grid Modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
]);
const UserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const[modalOpen,setModalOpen]=useState(false);
  const[modalConfig,setModalConfig]=useState({
    message:"",
    onConfirm:()=>{},
  })
  // const loggedInUserId=123   //here id is of logged in user from redux

  // Toggle Active Status (Remove/Suspend User)
  const handleActiveToggle = (user: User) => {
    setModalConfig({
      message: `Are you sure you want to ${
        user.isActive ? "deactivate" : "activate"
      } this user?`,
      onConfirm: async () => {
        try {
          const response = await updateActiveToggle(user._id, !user.isActive);
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === user._id ? { ...u, isActive: !u.isActive } : u
            )
          );
          toast.success(
            response.data.message ||
              `User ${!user.isActive ? "activated" : "deactivated"} successfully`
          );
        } catch (error: unknown) {
          if(error instanceof Error){
          toast.error(error.message ||"Error updating user status");
          }
        } finally {
          setModalOpen(false);
        }
      },
    });
    setModalOpen(true);
  };


  // const handleActiveToggle = async (user: User) => {
    
  //   try {
  //     const response = await updateActiveToggle(user._id, !user.isActive);
  //     setUsers((prevUsers) =>
  //       prevUsers.map((u) =>
  //         u._id === user._id ? { ...u, isActive: !u.isActive } : u
  //       )
  //     );
  //     toast.success(
  //       response.data.message ||
  //         `User ${!user.isActive ? "activated" : "deactivated"} successfully`
  //     );
  //   } catch (error: any) {
  //     if (error.response && error.response.data.message) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error("Error updating user status");
  //     }
  //   }
  // };

  const handleRoleChange = (user: User, isChecked: boolean) => {
    const updatedRole = isChecked ? "admin" : "user";
    setModalConfig({
      message: `Are you sure you want to change this user's role to ${updatedRole}?`,
      onConfirm: async () => {
        try {
          const response = await updateRole(user._id, updatedRole);
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === user._id ? { ...u, role: updatedRole } : u
            )
          );
          toast.success(response.data.message);
        } catch (error) {
          toast.error("Error in updating role");
        } finally {
          setModalOpen(false);
        }
      },
    });
    setModalOpen(true);
  };

  // const handleRoleChange = async (user: User, isChecked: boolean) => {
  //   const updatedRole = isChecked ? "admin" : "user";
  //   try {
  //     const response = await updateRole(user._id, updatedRole);
  //     // Update UI immediately
  //     setUsers((prevUsers) =>
  //       prevUsers.map((u) =>
  //         u._id === user._id ? { ...u, role: updatedRole } : u
  //       )
  //     );
  //     toast.success(response.data.message);
  //   } catch (error) {
  //     toast.error("Error in updating role");
  //   }
  // };
  const fetchUsers = async () => {
    setError(null);
    try {
      setLoading(true);
      const response = await getAllUser();
      setUsers(response.data.data.userList);
    } catch (err: unknown) {
      if(err instanceof Error){
      setError(err.message);
      toast.error("Error in fetching data");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const columnDefs: ColDef<User>[] = [
    {
      headerName: "Name",
      field: "name",
      flex: 2,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Email",
      field: "email",
      flex: 2,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Contact",
      field: "contactNo",
      flex: 2,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Subscription",
      field: "subscription.plan",
      valueGetter: (params: any) => params.data.subscription?.plan,
      flex: 2,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Role",
      field: "role",
      cellRenderer: (params: any) => {
        const isAdmin = params.value === "admin";
        // const isCurrentUser = params.data.id === loggedInUserId; // Logged-in admin ID
        return (
          <input
            type="checkbox"
            checked={isAdmin}
            disabled={isAdmin}
            onChange={(e) => handleRoleChange(params.data, e.target.checked)}
          />
        );
      },
      flex: 1,
      cellStyle: { textAlign: "center" },
      filter: false,
    },
    {
      headerName: "Active",
      field: "isActive",
      cellRenderer: (params: any) => (
        <input
          type="checkbox"
          checked={params.data.isActive}
          onChange={() => handleActiveToggle(params.data)}
          className="active-checkbox"
        />
      ),
      flex: 1,
      sortable: false,
      filter: false,
    },
  ];
  const pagination = true;
  const paginationPageSize = 8;
  const paginationPageSizeSelector = [8, 10, 20, 50, 100];

  return (
    <div className="admin-container">
      {loading && (<Loader/>)}
      <div className="content">
        <div className="content-card">
          <h2 className="dashboard-h2">User Management</h2>
          <div
            className="ag-theme-quartz"
            style={{ height: "600px", width: "100%", marginTop: "40px" }}
          >
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
                headerStyle: {
                  fontWeight: "bold",
                  fontSize: "15px",
                  textAlign: "center",
                },
              }}
            />
          </div>
        </div>
        <ConfirmationModal isOpen={modalOpen} message={modalConfig.message} onConfirm={modalConfig.onConfirm} onClose={()=>setModalOpen(false)}/>
      </div>
    </div>
  );
};

export default UserDashboard;
