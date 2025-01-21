import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { fetchTrainerRatings, addTrainerRating } from "../api/trainers";
import TrainerDetailsPage from "../pages/TrainerDetailsPage";

jest.mock("../api/trainers", () => ({
  fetchTrainerRatings: jest.fn(),
  addTrainerRating: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("TrainerDetailsPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mockowanie danych w useParams
    require("react-router-dom").useParams.mockReturnValue({
      trainerId: "bf973d23-5fe9-48a4-9c5a-c38b1d139a46",
    });

    // Mockowanie nawigacji
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    // Symulacja zalogowanego użytkownika przez token CSRF w ciasteczkach
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "csrf_access_token=mockToken",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and display trainer details", async () => {
    // Mock danych o trenerze
    fetchTrainerRatings.mockResolvedValueOnce([
      {
        comment: "Prawie idealnie.",
        rating: 4,
        created_at: "2025-01-21T16:27:00Z",
      },
    ]);

    render(
      <MemoryRouter>
        <TrainerDetailsPage />
      </MemoryRouter>
    );

    // Sprawdzenie, czy oceny i szczegóły trenera zostały wyświetlone
    expect(await screen.findByText(/Prawie idealnie/i)).toBeInTheDocument();
    expect(screen.getByText(/4\/5/i)).toBeInTheDocument();
    expect(screen.getByText(/21-01-2025, 17:27/i)).toBeInTheDocument();
  });

  it("should allow logged-in user to add a comment", async () => {
    // Mock danych o trenerze
    fetchTrainerRatings.mockResolvedValueOnce([]);
    addTrainerRating.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <TrainerDetailsPage />
      </MemoryRouter>
    );

    // Wprowadzenie komentarza i oceny
    const commentInput = await screen.findByLabelText(/comment/i);
    fireEvent.change(commentInput, { target: { value: "Great trainer!" } });

    const ratingInput = screen.getByLabelText(/rating/i);
    fireEvent.change(ratingInput, { target: { value: "5" } });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Sprawdzenie, czy mock został wywołany z poprawnymi danymi
    expect(addTrainerRating).toHaveBeenCalledWith("bf973d23-5fe9-48a4-9c5a-c38b1d139a46", {
      comment: "Great trainer!",
      rating: "5",
    });

    // Sprawdzenie, czy nowy komentarz został dodany do listy
    expect(await screen.findByText(/Great trainer!/i)).toBeInTheDocument();
    expect(screen.getByText(/5\/5/i)).toBeInTheDocument();
  });

  it("should display error message if adding a comment fails", async () => {
    // Mock danych o trenerze
    fetchTrainerRatings.mockResolvedValueOnce([]);
    addTrainerRating.mockRejectedValueOnce(new Error("Failed to add rating."));

    render(
      <MemoryRouter>
        <TrainerDetailsPage />
      </MemoryRouter>
    );

    // Wprowadzenie komentarza i oceny
    const commentInput = await screen.findByLabelText(/comment/i);
    fireEvent.change(commentInput, { target: { value: "Test comment" } });

    const ratingInput = screen.getByLabelText(/rating/i);
    fireEvent.change(ratingInput, { target: { value: "3" } });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Sprawdzenie, czy komunikat o błędzie został wyświetlony
    expect(
      await screen.findByText(/you cannot add another comment to this trainer/i)
    ).toBeInTheDocument();
  });

  it("should prompt user to log in if not logged in", async () => {
    // Usunięcie ciasteczka CSRF
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });

    render(
      <MemoryRouter>
        <TrainerDetailsPage />
      </MemoryRouter>
    );

    // Sprawdzenie komunikatu o konieczności logowania
    expect(
      screen.getByText(/please log in to add a comment and rating/i)
    ).toBeInTheDocument();

    // Kliknięcie przycisku logowania
    const loginButton = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(loginButton);

    // Sprawdzenie, czy nawigacja do strony logowania została wykonana
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
