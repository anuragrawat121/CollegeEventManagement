import React from "react";

const EventCard = ({ event, onRegister }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-1">
        {new Date(event.date).toDateString()}
      </p>
      <p className="text-gray-500 mb-4">{event.location}</p>
      <button
        onClick={() => onRegister(event)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </div>
  );
};

export default EventCard;
