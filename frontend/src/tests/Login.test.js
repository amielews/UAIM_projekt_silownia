import { handleLogin } from "../components/Auth/Login";
import { login } from "../api/auth";


jest.mock("../api/auth", () => ({
  login: jest.fn(),
}));

describe("handleLogin", () => {
  it("should validate email format", async () => {
    const setMessage = jest.fn();
    const result = await handleLogin("invalid-email", "password", setMessage);

    expect(result).toBeNull();
    expect(setMessage).toHaveBeenCalledWith("Invalid email format.");
  });

  it("should call login API and return success message", async () => {
    const setMessage = jest.fn();
    login.mockResolvedValue({ message: "Login successful!" });

    const result = await handleLogin("test@example.com", "password", setMessage);

    expect(login).toHaveBeenCalledWith("test@example.com", "password");
    expect(setMessage).toHaveBeenCalledWith("Login successful!");
    expect(result).toBe("Login successful!");
  });

  it("should handle login API error", async () => {
    const setMessage = jest.fn();
    login.mockRejectedValue(new Error("Invalid credentials"));

    await expect(
      handleLogin("test@example.com", "wrong-password", setMessage)
    ).rejects.toThrow("Invalid credentials");

    expect(setMessage).toHaveBeenCalledWith("Login failed: Invalid credentials");
  });
});
