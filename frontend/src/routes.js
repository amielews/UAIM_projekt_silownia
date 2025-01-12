import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import TrainersPage from "./pages/TrainersPage";
import TrainerDetailsPage from "./pages/TrainerDetailsPage";
import ReservationsPage from "./pages/ReservationsPage";
import ServicesPage from "./pages/ServicesPage";
import HistoryPage from "./pages/HistoryPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/trainers/:trainerId" element={<TrainerDetailsPage />} />
        <Route path="/reservations/:trainerId" element={<ReservationsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
