import React, { useEffect, useState } from "react";
import { fetchEvents, fetchAllParticipants } from "../services/api";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied. Admins only.");
      return;
    }

    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const eventsResponse = await fetchEvents();
        setEvents(eventsResponse.data);

        const participantsResponse = await fetchAllParticipants();
        setParticipants(participantsResponse.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        alert("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user || user.role !== "admin") {
    return <p className="text-center mt-10 text-red-600">Access Denied</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Events</h2>
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-1">Title</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Organizer</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td className="border px-2 py-1">{event.title}</td>
                  <td className="border px-2 py-1">
                    {new Date(event.date).toLocaleString()}
                  </td>
                  <td className="border px-2 py-1">{event.organizerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Participants</h2>
        {participants.length === 0 ? (
          <p>No participants found</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Registered Events</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p._id}>
                  <td className="border px-2 py-1">{p.name}</td>
                  <td className="border px-2 py-1">{p.email}</td>
                  <td className="border px-2 py-1">
                    {p.registeredEvents?.length || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
