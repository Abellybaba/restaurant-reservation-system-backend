// app.js

//const bodyParser = require("body-parser");
//const config = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
//const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes"); // Import user routes

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://aokoh:youarenice@cluster0.ocxlxsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/restaurants", restaurantRoutes);
//app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes); // Use user routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(process.env.PORT || 9999, () => {
  console.log("Backend server is running!");
});
