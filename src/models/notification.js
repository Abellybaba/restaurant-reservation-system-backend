// models/notification.js

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Additional fields for future use
  status: {
    type: String,
    enum: ["read", "unread"],
    default: "unread",
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
