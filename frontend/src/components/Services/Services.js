import { useEffect, useState } from "react";
import { fetchServices } from "../../api/services";

// Hook do zarządzania usługami
export function useServices() {
  const [services, setServices] = useState([]); // Stan dla listy usług
  const [error, setError] = useState(""); // Stan dla błędów

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices(); // Pobranie usług z API
        setServices(data); // Ustawienie danych w stanie
      } catch (error) {
        setError(error.message || "Failed to load services."); // Obsługa błędów
      }
    };

    loadServices(); // Wywołanie funkcji po załadowaniu komponentu
  }, []);

  return { services, error }; // Zwracanie danych i błędów
}

