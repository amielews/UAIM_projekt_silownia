import { handleRegister } from "../components/Auth/Register";
import { register } from "../api/auth";

jest.mock("../api/auth", () => ({
  register: jest.fn(),
}));

describe("handleRegister", () => {
  it("should display success message on successful registration", async () => {
    const setMessage = jest.fn();
    register.mockResolvedValueOnce({ message: "Registration successful!" });

    await handleRegister("John", "Doe", "john@example.com", "password123", setMessage);

    expect(register).toHaveBeenCalledWith("John", "Doe", "john@example.com", "password123");
    expect(setMessage).toHaveBeenCalledWith("Registration successful!");
  });

  it("should display error message on registration failure", async () => {
    const setMessage = jest.fn();
    register.mockRejectedValueOnce(new Error("Email already in use"));

    await handleRegister("John", "Doe", "john@example.com", "password123", setMessage);

    expect(register).toHaveBeenCalledWith("John", "Doe", "john@example.com", "password123");
    expect(setMessage).toHaveBeenCalledWith("Registration failed: Email already in use");
  });
});
