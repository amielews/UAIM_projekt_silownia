const BASE_URL = "http://localhost:5000"; // Adres backendu

// Pobranie listy trenerów
export async function fetchTrainers() {
  const response = await fetch(`${BASE_URL}/api/trainers/list`);
  if (!response.ok) {
    throw new Error("Failed to fetch trainers."); // Rzucenie błędu w przypadku niepowodzenia
  }
  return await response.json(); // Odczyt danych z odpowiedzi
}

// Pobranie ocen trenera
export async function fetchTrainerRatings(trainerId) {
  const response = await fetch(`${BASE_URL}/api/trainers/ratings/${trainerId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch trainer ratings."); // Obsługa błędu
  }
  return await response.json(); // Odczyt danych z odpowiedzi
}

// Dodanie oceny i komentarza
export async function addTrainerRating(trainerId, data) {
  const response = await fetch(
    `${BASE_URL}/api/trainers/ratings/${trainerId}`,
    {
      method: "POST", // Żądanie POST
      headers: {
        "Content-Type": "application/json", // Typ danych wysyłanych w żądaniu
        "X-CSRF-TOKEN": document.cookie
          .split("; ")
          .find((row) => row.startsWith("csrf_access_token="))
          ?.split("=")[1], // Pobranie tokena CSRF
      },
      credentials: "include", // Uwzględnienie ciasteczek
      body: JSON.stringify(data), // Dane wysyłane w żądaniu
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add rating."); // Rzucenie błędu
  }
  return await response.json(); // Odczyt danych z odpowiedzi
}
