import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Employee from "./pages/Employee";
import Training from "./pages/Training";
import Accident from "./pages/Accident";
import RiskAssessment from "./pages/RiskAssessment";
import PeriodicCheck from "./pages/PeriodicCheck";
import Document from "./pages/Document";
import SignUp from "./pages/SingUp";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Employee />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/training" element={<Training />} />
            <Route path="/accident" element={<Accident />} />
            <Route path="/risk-assessment" element={<RiskAssessment />} />
            <Route path="/periodic-check" element={<PeriodicCheck />} />
            <Route path="/document" element={<Document />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
