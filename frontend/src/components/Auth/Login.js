import { login } from "../../api/auth";

// Funkcja obsługująca proces logowania
export async function handleLogin(email, password, setMessage) {
  // Funkcja do walidacji adresu email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Wyrażenie regularne dla emaila
    return regex.test(email); // Zwraca true, jeśli email jest poprawny
  };

  if (!validateEmail(email)) {
    setMessage("Invalid email format."); // Komunikat o błędnym formacie emaila
    return null; // Przerwanie procesu logowania
  }

  try {
    const response = await login(email, password); // Próba logowania przez API
    setMessage(response.message); // Wyświetlenie wiadomości zwrotnej
    return response.message; // Zwrot wiadomości o sukcesie
  } catch (error) {
    setMessage(`Login failed: ${error.message}`); // Obsługa błędu logowania
    throw error; // Rzucenie błędu dalej
  }
}

