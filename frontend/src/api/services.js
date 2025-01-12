const BASE_URL = "http://localhost:5000"; // Adres backendu

// Pobranie listy usług
export async function fetchServices() {
  try {
    const response = await fetch(`${BASE_URL}/api/services/list`, {
      method: "GET",
      credentials: "include", // Uwzględnienie ciasteczek
    });

    if (!response.ok) {
      const errorData = await response.json(); // Pobranie szczegółów błędu
      throw new Error(errorData.message || "Failed to fetch services."); // Rzucenie błędu
    }

    return await response.json(); // Odczyt odpowiedzi w formacie JSON
  } catch (error) {
    console.error("Error fetching services:", error.message); // Obsługa błędu
    throw error; // Rzucenie błędu
  }
}
