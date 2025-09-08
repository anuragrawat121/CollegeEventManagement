import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MyTickets from "./pages/MyTickets";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/:id" element={<Register />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
