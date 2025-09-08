import React, { useEffect, useState } from "react";
import { fetchAllParticipants, fetchEvents } from "../services/api";

const Dashboard = () => {
  const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [eventsRes, participantsRes] = await Promise.all([
          fetchEvents(),
          fetchAllParticipants(),
        ]);
        setEvents(eventsRes.data || []);
        setParticipants(participantsRes.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Organizer Dashboard</h1>

      {/* Events Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Events Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-600">📅 {event.date}</p>
              <p className="text-gray-700 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Participants Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Registered Participants</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Event</th>
                <th className="py-2 px-4 border">Ticket ID</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{p.name}</td>
                  <td className="py-2 px-4 border">{p.email}</td>
                  <td className="py-2 px-4 border">{p.eventName}</td>
                  <td className="py-2 px-4 border">{p._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
