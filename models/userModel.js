const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: String,
    default: "user",
  },
  cars: [{ type: mongoose.Types.ObjectId, ref: "cars", required: true }],
  carsbook: [
    { type: mongoose.Types.ObjectId, ref: "carsbook", required: true },
  ],
  bookedcars: [
    { type: mongoose.Types.ObjectId, ref: "bookedcars", required: true },
  ],
});

module.exports = mongoose.model("Users", userSchema);



