import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      const res = await fetchEvents();
      setEvents(res.data);
    };
    getEvents();
  }, []);

  const handleRegister = (event) => {
    navigate(`/register/${event._id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onRegister={handleRegister}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
