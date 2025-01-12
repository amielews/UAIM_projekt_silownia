import { useEffect, useState } from "react";
import { fetchTrainingHistory } from "../../api/history";

// Hook do zarządzania historią treningów
export function useTrainingHistory() {
  const [history, setHistory] = useState([]); // Stan dla danych historii treningów
  const [message, setMessage] = useState(""); // Stan dla komunikatów o błędach

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchTrainingHistory(); // Pobranie historii treningów z API
        console.log("Setting history data:", data); // Debugowanie pobranych danych
        setHistory(data); // Ustawienie pobranych danych w stanie
      } catch (error) {
        console.error("Error loading training history:", error.message); // Logowanie błędów
        setMessage("Failed to load training history."); // Ustawienie komunikatu o błędzie
      }
    };

    loadHistory(); // Wywołanie funkcji po załadowaniu komponentu
  }, []);

  return { history, message }; // Zwracanie stanu i komunikatów
}
