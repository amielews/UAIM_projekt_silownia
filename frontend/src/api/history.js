const BASE_URL = "http://localhost:5000"; // Adres backendu

// Pobranie historii treningów
export async function fetchTrainingHistory() {
  try {
    const response = await fetch(`${BASE_URL}/api/training-history/list`, {
      method: "GET",
      credentials: "include", // Używamy ciasteczek do uwierzytelniania
      headers: {
        "Content-Type": "application/json", // Typ danych wysyłanych w żądaniu
      },
    });

    console.log("Response status:", response.status); // Debugowanie statusu odpowiedzi

    if (!response.ok) {
      const errorData = await response.json(); // Pobranie szczegółów błędu
      console.error("Error data:", errorData); // Debugowanie danych błędu
      throw new Error(errorData.message || "Failed to fetch training history."); // Rzucenie błędu
    }

    const data = await response.json(); // Odczyt danych z odpowiedzi
    console.log("Fetched training history:", data); // Debugowanie pobranych danych
    return data; // Zwrócenie pobranych danych
  } catch (error) {
    console.error("Error fetching training history:", error.message); // Obsługa błędu
    throw error; // Rzucenie błędu
  }
}
