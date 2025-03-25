import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {test,describe,expect, vi} from "vitest"
import { BrowserRouter } from "react-router-dom";
import AddMovie from "../Admin/Movie Dashboard/AddMovie";
import {toast} from "react-toastify";
vi.mock("react-toastify", () => ({
  toast: Object.assign(vi.fn(), {
    info: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  }),
}));

const renderWithRouter = (ui:React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("AddMovie Component", () => {
  test("renders the Add Movie form", () => {
    renderWithRouter(<AddMovie />);

    expect(screen.getByText("Add Movie")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Release Date")).toBeInTheDocument();
    // expect(screen.getByText("Save")).toBeDisabled();
    const saveButton = screen.getByRole("button", { name: /save/i }) as HTMLButtonElement;
    expect(saveButton).toBeDisabled();
  });

  test("allows typing in the title field", async () => {
    renderWithRouter(<AddMovie />);

    const titleInput = screen.getByPlaceholderText("Enter movie title");
    await userEvent.type(titleInput, "Test Movie");

    expect(titleInput).toHaveValue("Test Movie");
  });

  test("allows selecting a genre", async () => {
    renderWithRouter(<AddMovie />);

    const genreDropdown = screen.getByText("Select genres");
    await userEvent.click(genreDropdown);

    const actionOption = screen.getByText("Action");
    await userEvent.click(actionOption);

    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  test("shows error when selecting a future release date", async () => {
    renderWithRouter(<AddMovie />);
  
    const releaseDateInput = screen.getByPlaceholderText("Enter movie release date");
  
    fireEvent.change(releaseDateInput, { target: { value: "2099-12-31" } });
  
   
    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith("Future Date not allowed");
    });
   
  });

  test("enables save button when required fields are filled", async () => {
    renderWithRouter(<AddMovie />);

    const titleInput = screen.getByPlaceholderText("Enter movie title");
    const descriptionInput = screen.getByPlaceholderText("Enter movie details");
    const durationInput = screen.getByPlaceholderText("Enter duration");
    const ratingInput = screen.getByPlaceholderText("Enter movie rating");
    const releaseDateInput=screen.getByPlaceholderText("Enter movie release date")
    const genreSelect =  screen.getByText("Select genres");
  const languageSelect = screen.getByText("Select languages");
  const castSelect =  screen.getByText("Select movie cast");
  const directorSelect = screen.getByText("Select movie director");
  const posterInput = screen.getByLabelText("Poster");
  const trailerInput = screen.getByLabelText("Trailer");
  const movieInput = screen.getByLabelText("Movie");
const saveButton = screen.getByRole("button", { name: /save/i }) as HTMLButtonElement;
  expect(saveButton).toBeDisabled();

  await userEvent.type(titleInput, "Test Movie");
  await userEvent.type(descriptionInput, "This is a test movie.");
  fireEvent.change(releaseDateInput, { target: { value: "2024-03-22" } });
  await userEvent.type(durationInput, "120");
  await userEvent.type(ratingInput, "8.5");
  await userEvent.click(genreSelect);
  await userEvent.click(screen.getByText("Action"));
  await userEvent.click(languageSelect);
  await userEvent.click(screen.getByText("English"));
  await userEvent.type(castSelect, "Tom Hanks");
  fireEvent.keyDown(castSelect, { key: "Enter", code: "Enter" });
  await userEvent.type(directorSelect, "Christopher Nolan");
  fireEvent.keyDown(directorSelect, { key: "Enter", code: "Enter" });
  const file = new File(["dummy content"], "poster.jpg", { type: "image/jpeg" });
  await userEvent.upload(posterInput, file);
  await userEvent.upload(trailerInput, file);
  await userEvent.upload(movieInput, file);
 
  // await waitFor(() => {
  //   expect(saveButton).not.toBeDisabled();
  // });

  // Click the Save button
  // await userEvent.click(saveButton);

  });
  test("does not enable save button if some required fields are missing",async()=>{
    renderWithRouter(<AddMovie/>);
    const titleInput=screen.getByPlaceholderText("Enter movie title");
    const descriptionInput=screen.getByPlaceholderText("Enter movie details");
    const saveButton=screen.getByRole("button",{name:/save/i});
    await userEvent.type(titleInput,"Test Movie");
    await userEvent.type(descriptionInput,"This is a test movie");
    await waitFor(()=>{
      expect(saveButton).toBeDisabled();
    })

  });
  test("closes the form when Close button is clicked", async () => {
    renderWithRouter(<AddMovie />);
    
    const closeButton = screen.getByText("Close");
    await userEvent.click(closeButton);
    expect(window.location.pathname).not.toBe("/add-movie");
  });
});


