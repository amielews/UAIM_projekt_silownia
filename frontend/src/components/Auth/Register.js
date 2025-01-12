import { register } from "../../api/auth";

// Funkcja obsługująca proces rejestracji
export async function handleRegister(name, surname, email, password, setMessage) {
  try {
    const response = await register(name, surname, email, password); // Próba rejestracji przez API
    setMessage(response.message); // Wyświetlenie wiadomości zwrotnej
  } catch (error) {
    setMessage(`Registration failed: ${error.message}`); // Obsługa błędu rejestracji
  }
}
