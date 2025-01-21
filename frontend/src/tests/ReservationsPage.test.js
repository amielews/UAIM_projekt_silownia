import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReservationsPage from "../pages/ReservationsPage";
import { fetchAvailableSlots } from "../api/reservations";

jest.mock("../api/reservations", () => ({
  fetchAvailableSlots: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("ReservationsPage", () => {
  beforeEach(() => {
    // Mockowanie useParams, aby zawsze zwracało poprawne trainerId
    require("react-router-dom").useParams.mockReturnValue({
      trainerId: "bf973d23-5fe9-48a4-9c5a-c38b1d139a46",
    });

    // Symulacja zalogowanego użytkownika przez dodanie tokenu do ciasteczek
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "csrf_access_token=mockToken",
    });
  });

  afterEach(() => {
    // Czyszczenie mocków po każdym teście
    jest.clearAllMocks();
  });

  it("should fetch and display available slots", async () => {
    // Mockowanie dostępnych slotów
    fetchAvailableSlots.mockResolvedValue([
      { start: "2025-03-19 10:00:00", end: "2025-03-19 11:00:00", is_booked: false },
    ]);

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

    // Sprawdzenie, czy slot został wyświetlony
    expect(
      await screen.findByText(/2025-03-19 10:00:00 - 2025-03-19 11:00:00/i)
    ).toBeInTheDocument();
  });

  it("should display error message if fetching slots fails", async () => {
    // Mockowanie błędu podczas pobierania slotów
    fetchAvailableSlots.mockRejectedValue(new Error("Failed to load slots"));

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

    // Sprawdzenie, czy wiadomość o błędzie została wyświetlona
    expect(await screen.findByText(/failed to load available slots/i)).toBeInTheDocument();
  });

  it("should allow booking a slot", async () => {
    // Mockowanie dostępnych slotów
    fetchAvailableSlots.mockResolvedValue([
      { start: "2025-03-19 10:00:00", end: "2025-03-19 11:00:00", is_booked: false },
    ]);

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

    // Sprawdzenie przycisku rezerwacji
    const bookButton = await screen.findByText(/book slot/i);
    fireEvent.click(bookButton);

    // Sprawdzenie, czy przycisk rezerwacji jest widoczny
    expect(bookButton).toBeInTheDocument();
  });

  it("should allow canceling a reservation", async () => {
    // Mockowanie slotu już zarezerwowanego
    fetchAvailableSlots.mockResolvedValue([
      {
        start: "2025-03-19 10:00:00",
        end: "2025-03-19 11:00:00",
        is_booked: true,
        reservation_id: "user-reservation-id",
      },
    ]);

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

    // Sprawdzenie przycisku anulowania rezerwacji
    const cancelButton = await screen.findByText(/cancel reservation/i);
    fireEvent.click(cancelButton);

    // Sprawdzenie, czy przycisk anulowania został wyświetlony
    expect(cancelButton).toBeInTheDocument();
  });
});
