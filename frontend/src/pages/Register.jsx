import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { registerEvent } from "../services/api";
import QRCode from "react-qr-code";

const Register = () => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [ticket, setTicket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerEvent({ ...formData, eventId });
    setTicket(res.data.qrCode);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register for Event</h1>
      {!ticket ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Your Ticket</h2>
          <QRCode value={ticket} size={128} />
        </div>
      )}
    </div>
  );
};

export default Register;
