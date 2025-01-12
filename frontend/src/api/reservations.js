const BASE_URL = "http://localhost:5000"; // Adres backendu
const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("csrf_access_token="))
  ?.split("=")[1]; // Pobranie tokena CSRF z ciasteczek

// Pobranie dostępnych terminów dla danego trenera
export async function fetchAvailableSlots(trainerId) {
  try {
    const response = await fetch(`${BASE_URL}/api/reservations/availability/${trainerId}`, {
      method: "GET",
      credentials: "include", // Uwzględnienie ciasteczek w żądaniu
    });

    if (!response.ok) {
      const errorData = await response.json(); // Pobranie szczegółów błędu
      throw new Error(errorData.message || "Failed to fetch available slots."); // Rzucenie błędu
    }

    const data = await response.json(); // Odczyt danych
    return data.availability.filter(
      (slot) =>
        slot.is_booked === 0 || // Filtrujemy dostępne terminy
        (slot.is_booked === 1 && slot.reservation_id !== null) // Uwzględniamy zarezerwowane terminy
    );
  } catch (error) {
    console.error("Error fetching available slots:", error.message); // Obsługa błędu
    throw error; // Rzucenie błędu
  }
}

// Rezerwacja terminu
export async function bookSlot(trainerId, startDate) {
  try {
    if (!csrfToken) {
      throw new Error("CSRF token not found"); // Sprawdzenie obecności tokena CSRF
    }

    const response = await fetch(`${BASE_URL}/api/reservations/book`, {
      method: "POST",
      credentials: "include", // Uwzględnienie ciasteczek
      headers: {
        "Content-Type": "application/json", // Typ danych wysyłanych w żądaniu
        "X-CSRF-TOKEN": csrfToken, // Token CSRF w nagłówku
      },
      body: JSON.stringify({ trainer_id: trainerId, date: startDate }), // Dane wysyłane w żądaniu
    });

    if (!response.ok) {
      const errorData = await response.json(); // Pobranie szczegółów błędu
      throw new Error(errorData.message || "Failed to book slot."); // Rzucenie błędu
    }

    return await response.json(); // Odczyt odpowiedzi w formacie JSON
  } catch (error) {
    console.error("Error booking slot:", error.message); // Obsługa błędu
    throw error; // Rzucenie błędu
  }
}

// Anulowanie rezerwacji
export async function cancelReservation(reservationId) {
  try {
    const response = await fetch(`${BASE_URL}/api/reservations/cancel/${reservationId}`, {
      method: "DELETE", // Żądanie typu DELETE
      credentials: "include", // Uwzględnienie ciasteczek
      headers: {
        "Content-Type": "application/json", // Typ danych wysyłanych w żądaniu
        "X-CSRF-TOKEN": csrfToken, // Token CSRF w nagłówku
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Pobranie szczegółów błędu
      throw new Error(errorData.message || "Failed to cancel reservation."); // Rzucenie błędu
    }

    return await response.json(); // Odczyt odpowiedzi w formacie JSON
  } catch (error) {
    console.error("Error canceling reservation:", error.message); // Obsługa błędu
    throw error; // Rzucenie błędu
  }
}
