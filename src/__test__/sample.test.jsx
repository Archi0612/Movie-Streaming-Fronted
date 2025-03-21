import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect } from "vitest";
import DetailsPage from "../pages/Media/DetailsPage";
import { Sidebar } from "lucide-react";
import { BrowserRouter } from "react-router-dom";
// test("should button of watch button of sidebar page", () => {
//   render(
//       <Sidebar role="user" />
//   );
// //   const text = screen.findAllByText("/watch/");
//   const logoImage = screen.getByRole("img");
//   expect(logoImage).toBeInTheDocument();
//   //fireEvent.click(button);
// //   expect(text).toHaveClass("watch-button");
// });
test("should button of watch button of sidebar page", () => {
    render(
        <Sidebar role="user" />
    );
  //   const text = screen.findAllByText("/watch/");
    const logoImage = screen.getByRole("img");
    expect(logoImage).toBeInTheDocument();
    //fireEvent.click(button);
  //   expect(text).toHaveClass("watch-button");
  });
