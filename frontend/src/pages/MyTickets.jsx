import React, { useEffect, useState } from "react";
import { fetchTickets } from "../services/api";
import QRCode from "react-qr-code";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const handleFetch = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!email) return;
    try {
      setLoading(true);
      const res = await fetchTickets(email);
      setTickets(res.data || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const showEmailError = touched && !email;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>

      <form onSubmit={handleFetch} className="max-w-md mb-6 flex gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className={`w-full p-2 border rounded ${showEmailError ? "border-red-500" : ""}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View
        </button>
      </form>
      {showEmailError && (
        <p className="text-sm text-red-600 mb-4">Please enter a valid email.</p>
      )}

      {loading && <p className="text-center mt-6">Loading tickets...</p>}

      {!loading && tickets.length === 0 && touched && email && (
        <p className="text-center mt-6">No tickets found for this email.</p>
      )}

      {!loading && tickets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-2">{ticket.eventName}</h2>
              <p className="text-gray-600 mb-4">📅 {ticket.date}</p>
              <QRCode value={ticket._id} size={128} />
              <p className="mt-4 text-sm text-gray-500">Ticket ID: {ticket._id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
