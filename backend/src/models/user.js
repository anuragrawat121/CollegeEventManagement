const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: function () { 
        return this.role !== "admin"; 
      } 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["participant", "organizer", "admin"], 
      required: true 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
