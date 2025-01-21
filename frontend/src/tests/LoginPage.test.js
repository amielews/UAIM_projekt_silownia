import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import * as AuthModule from "../components/Auth/Login.js"; // Import modułu dla mockowania

jest.mock("../components/Auth/Login.js", () => ({
  handleLogin: jest.fn(), // Mockowanie funkcji handleLogin
}));

describe("LoginPage", () => {
  it("should render login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("should call handleLogin on form submit", async () => {
    const mockHandleLogin = jest.fn();
    AuthModule.handleLogin.mockImplementation(mockHandleLogin); // Powiązanie mocka z modułem

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    const loginButton = screen.getByTestId("login-button"); // Jednoznaczne wskazanie przycisku
    fireEvent.click(loginButton);

    expect(mockHandleLogin).toHaveBeenCalled(); // Sprawdzanie wywołania zamockowanej funkcji
  });
});
