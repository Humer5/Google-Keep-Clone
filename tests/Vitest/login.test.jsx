import { render, screen, fireEvent } from "solid-testing-library";
import { vi } from "vitest";
import Login from "../../src/components/Login/login"; 

describe("Login Component", () => {
  test("should render login form correctly", async () => {
    render(() => <Login />);
    
    expect(await screen.findByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(await screen.findByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(await screen.findByText("Login")).toBeInTheDocument();
  });

  test("should handle form submission and call authentication function", async () => {
    const mockAuthFunction = vi.fn();
    render(() => <Login authenticate={mockAuthFunction} />);

    await fireEvent.input(screen.getByPlaceholderText("Enter your email"), { target: { value: "reshamhumer512@gmail.com" } });
    await fireEvent.input(screen.getByPlaceholderText("Enter your password"), { target: { value: "H5122001r" } });

    fireEvent.click(screen.getByText("Login"));

    expect(mockAuthFunction).toHaveBeenCalledWith("reshamhumer512@gmail.com", "H5122001r");
  });

  test("should show error messages for invalid input", async () => {
    render(() => <Login />);

    fireEvent.click(screen.getByText("Login"));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });
});
