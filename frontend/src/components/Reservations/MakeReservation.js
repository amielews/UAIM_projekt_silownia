import { useEffect, useState, useCallback } from "react";
import { fetchAvailableSlots, bookSlot, cancelReservation } from "../../api/reservations";

// Hook do zarządzania rezerwacjami
export function useReservations(trainerId, isLoggedIn) {
  const [slots, setSlots] = useState([]); // Stan dla dostępnych terminów
  const [message, setMessage] = useState(""); // Stan dla komunikatów
  const [confirmingSlot, setConfirmingSlot] = useState(null); // Stan dla potwierdzanego terminu

  // Funkcja do ładowania dostępnych terminów
  const loadSlots = useCallback(async () => {
    if (!trainerId) {
      console.error("Trainer ID is missing. Cannot load slots."); // Walidacja obecności ID trenera
      return;
    }

    try {
      const data = await fetchAvailableSlots(trainerId); // Pobranie dostępnych terminów z API
      setSlots(data); // Ustawienie pobranych terminów w stanie
    } catch (error) {
      console.error("Error fetching slots:", error); // Obsługa błędów
      setMessage("Failed to load available slots."); // Komunikat o błędzie
    }
  }, [trainerId]);

  // Efekt do ładowania terminów po zalogowaniu
  useEffect(() => {
    if (isLoggedIn) {
      loadSlots();
    }
  }, [isLoggedIn, loadSlots]);

  // Obsługa potwierdzenia terminu
  const handleConfirm = async (slot) => {
    try {
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrf_access_token="))
        ?.split("=")[1]; // Pobranie tokena CSRF z ciasteczek

      if (!csrfToken) {
        console.error("Missing CSRF token.");
        setMessage("Failed to process slot. Please log in again."); // Komunikat o braku tokena
        return;
      }

      if (slot.is_booked) {
        await cancelReservation(slot.reservation_id); // Anulowanie rezerwacji
        setMessage("Reservation canceled.");
      } else {
        await bookSlot(trainerId, slot.start); // Rezerwacja terminu
        setMessage("Reservation successful!");
      }

      await loadSlots(); // Odświeżenie dostępnych terminów
      setConfirmingSlot(null); // Reset potwierdzanego terminu
    } catch (error) {
      console.error("Error processing slot:", error); // Obsługa błędów
      setMessage("Failed to process slot. Try refreshing the site"); // Komunikat o błędzie
      setConfirmingSlot(null); // Reset potwierdzanego terminu
    }
  };

  return {
    slots, // Lista dostępnych terminów
    message, // Komunikaty dla użytkownika
    confirmingSlot, // Obecnie potwierdzany termin
    setConfirmingSlot, // Funkcja do ustawiania potwierdzanego terminu
    handleConfirm, // Funkcja do obsługi potwierdzania terminu
  };
}
