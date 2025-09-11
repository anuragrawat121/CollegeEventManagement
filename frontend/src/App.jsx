import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import MyTickets from "./pages/MyTickets";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";

const AppContent = () => {
  const location = useLocation();
  const isAuth = location.pathname === "/";
  const isAdmin = location.pathname === "/admin";
  
  // Admin panel has its own layout
  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    );
  }
  
  return (
    <>
      {!isAuth && <Navbar />}
      <div className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register/:eventId" element={<Register />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      {!isAuth && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
