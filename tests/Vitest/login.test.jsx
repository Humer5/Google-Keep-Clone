import { render, screen, fireEvent } from "solid-testing-library";
import { vi } from "vitest";
import Login from "../../src/components/Login/login"; 

describe("Login Component", () => {
  test("should render login form correctly", () => {
    render(() => <Login />);
    
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("should handle form submission and call authentication function", async () => {
    const mockAuthFunction = vi.fn();
    render(() => <Login authenticate={mockAuthFunction} />);

    fireEvent.input(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.input(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByText("Login"));

    expect(mockAuthFunction).toHaveBeenCalledWith("test@example.com", "password123");
  });

  test("should show error messages for invalid input", async () => {
    render(() => <Login />);

    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });
});
