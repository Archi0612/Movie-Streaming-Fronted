import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";
import { vi } from "vitest";
describe("Button Component", () => {
  test("renders with correct label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument(); // ✅ Now it works!
  });

  test("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
