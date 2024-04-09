// models/restaurant.js

const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  img: { type: String },
  desc: { type: String },
  menuItems: [
    {
      name: {
        type: String,
        required: true,
      },
      description: String,
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
