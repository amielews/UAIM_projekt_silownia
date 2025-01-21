import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import * as RegisterModule from "../components/Auth/Register";

jest.mock("../components/Auth/Register", () => ({
  handleRegister: jest.fn(),
}));

describe("RegisterPage", () => {
  afterEach(() => {
    jest.resetAllMocks(); // Resetowanie mocków po każdym teście
  });

  it("should render registration form", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    // Sprawdzanie obecności wszystkich pól formularza
    expect(screen.getByLabelText("Name:", { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText("Surname:", { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email:", { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText("Password:", { selector: "input" })).toBeInTheDocument();

    // Sprawdzanie obecności przycisku "Register"
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("should call handleRegister on form submission", async () => {
    const mockHandleRegister = jest.fn();
    RegisterModule.handleRegister.mockImplementation(mockHandleRegister);

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    // Wypełnianie pól formularza
    fireEvent.change(screen.getByLabelText("Name:", { selector: "input" }), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Surname:", { selector: "input" }), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("Email:", { selector: "input" }), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password:", { selector: "input" }), { target: { value: "password123" } });

    // Kliknięcie przycisku "Register"
    const registerButton = screen.getByRole("button", { name: /register/i });

    await act(async () => {
      fireEvent.click(registerButton);
    });

    // Sprawdzanie, czy `handleRegister` został wywołany z odpowiednimi argumentami
    expect(mockHandleRegister).toHaveBeenCalledWith(
      "John",
      "Doe",
      "john@example.com",
      "password123",
      expect.any(Function)
    );
  });

  it("should display success message", async () => {
    // Mockowanie sukcesu rejestracji
    RegisterModule.handleRegister.mockImplementation((name, surname, email, password, setMessage) =>
      setMessage("Registration successful!")
    );

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    // Wypełnianie pól formularza
    fireEvent.change(screen.getByLabelText("Name:", { selector: "input" }), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Surname:", { selector: "input" }), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("Email:", { selector: "input" }), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password:", { selector: "input" }), { target: { value: "password123" } });

    // Kliknięcie przycisku "Register"
    const registerButton = screen.getByRole("button", { name: /register/i });

    await act(async () => {
      fireEvent.click(registerButton);
    });

    // Sprawdzanie, czy wiadomość sukcesu została wyświetlona
    expect(await screen.findByText("Registration successful!", { exact: false })).toBeInTheDocument();
  });

  it("should display error message", async () => {
    // Mockowanie błędu rejestracji
    RegisterModule.handleRegister.mockImplementation((name, surname, email, password, setMessage) =>
      setMessage("Registration failed: Email already in use")
    );

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    // Wypełnianie pól formularza
    fireEvent.change(screen.getByLabelText("Name:", { selector: "input" }), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Surname:", { selector: "input" }), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("Email:", { selector: "input" }), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password:", { selector: "input" }), { target: { value: "password123" } });

    // Kliknięcie przycisku "Register"
    const registerButton = screen.getByRole("button", { name: /register/i });

    await act(async () => {
      fireEvent.click(registerButton);
    });

    // Sprawdzanie, czy wiadomość błędu została wyświetlona
    expect(
      await screen.findByText("Registration failed: Email already in use", { exact: false })
    ).toBeInTheDocument();
  });
});
