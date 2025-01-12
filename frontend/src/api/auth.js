const BASE_URL = "http://localhost:5000"; // Adres backendu

// Funkcja logowania
export async function login(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Nagłówki informujące o typie danych
      body: JSON.stringify({ email, password }), // Przesłanie danych logowania jako JSON
      credentials: "include", // Wysyłanie ciasteczek
    });

    if (!response.ok) {
      let errorMessage = "Login failed"; // Domyślny komunikat o błędzie
      try {
        const errorData = await response.json(); // Pobranie szczegółów błędu z odpowiedzi
        errorMessage = errorData.message || errorMessage;
      } catch (err) {
        console.error("Failed to parse error response:", err);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json(); // Odczyt danych z odpowiedzi
    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

// Funkcja rejestracji
export async function register(name, surname, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, email, password }), // Przesłanie danych rejestracyjnych jako JSON
    });

    if (!response.ok) {
      let errorMessage = "Registration failed";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (err) {
        console.error("Failed to parse error response:", err);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
}

// Funkcja do wylogowania
export async function logout() {
  try {
    // Pobranie wartości tokena CSRF z ciasteczek
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_access_token="))
      ?.split("=")[1];

    if (!csrfToken) {
      throw new Error("CSRF token not found"); // Jeśli brak tokena, rzucamy błąd
    }

    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken, // Token CSRF w nagłówku
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    return await response.json(); // Zwrot odpowiedzi w formacie JSON
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
}


