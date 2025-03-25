import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {  beforeEach, describe, expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import UserDashboard from "../Admin/User Dashboard/UserDashboard";
import * as adminService from "../../services/apis/adminService";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
const mockUsers = [
  {
    _id: "1",
    name: "User One",
    email: "userone@example.com",
    contactNo: "1234567890",
    subscription: { plan: "Premium" },
    role: "user",
    isActive: true,
  },
  {
    _id: "2",
    name: "User Two",
    email: "usertwo@example.com",
    contactNo: "9876543210",
    subscription: { plan: "Basic" },
    role: "admin",
    isActive: false,
  },
];


const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};
vi.mock("framer-motion", () => ({
  motion: {
    div: "div",
    span: "span",
  },
}));
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
describe("UserDashboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    //Mocks the getAllUser function
    vi.spyOn(adminService, "getAllUser").mockImplementation(() =>
        Promise.resolve({
          data: { data: { userList: mockUsers } },
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: {} },
        } as AxiosResponse)
      );
      //Mocks the updateActiveToggle function
      vi.spyOn(adminService, "updateActiveToggle").mockImplementation(() =>
        Promise.resolve({
          data: { message: "User status updated" },
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: {} },
        } as AxiosResponse)
      );
      //Mocks the updateRole function
      vi.spyOn(adminService, "updateRole").mockImplementation(() =>
        Promise.resolve({
          data: { message: "Role updated successfully" },
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: {} },
        } as AxiosResponse)
      );
  });

  test("renders User Dashboard", async () => {
    renderWithRouter(<UserDashboard />);
    
    expect(screen.getByText("User Management")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("User One")).toBeInTheDocument();
      expect(screen.getByText("User Two")).toBeInTheDocument();
    });
    await waitFor(() => expect(adminService.getAllUser).toHaveBeenCalled());
  });
  test("displays error toast when fetching users fails", async () => {
    vi.spyOn(adminService, "getAllUser").mockRejectedValue(new Error("API Error"));
    
    renderWithRouter(<UserDashboard />);
    
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Error in fetching data"));
  });
  test("allows toggling user activation", async () => {
    renderWithRouter(<UserDashboard />);
    await waitFor(() => screen.getByText("User One"));

    const toggleButton = screen.getAllByRole("checkbox")[1];
    // await userEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    await waitFor(() => expect(adminService.updateActiveToggle).toHaveBeenCalled);
  });
  test("shows confirmation modal before toggling activation", async () => {
    renderWithRouter(<UserDashboard />);
    await waitFor(() => screen.getByText("User One"));

    const toggleButton = screen.getAllByRole("checkbox")[1];
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText(/Are you sure you want to deactivate/i)).toBeInTheDocument();
    });
  });
  test("allows updating user role", async () => {
    renderWithRouter(<UserDashboard />);
    await waitFor(() => screen.getByText("User One"));

    const roleCheckbox = screen.getAllByRole("checkbox")[0];
    await userEvent.click(roleCheckbox);
    await waitFor(() => expect(adminService.updateRole).toHaveBeenCalled);
  });
});



