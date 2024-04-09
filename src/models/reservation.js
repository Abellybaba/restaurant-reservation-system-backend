// models/reservation.js

const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  // Additional fields for future use
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  email: String,
  specialRequests: String,
  tableNumber: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
