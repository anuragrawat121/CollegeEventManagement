const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: String,
    capacity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
