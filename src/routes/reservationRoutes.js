const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Create a new reservation
router.post("/", reservationController.createReservation);

// Get all reservations
router.get("/", reservationController.getAllReservations);

// Get reservation by ID
router.get("/:id", reservationController.getReservationById);

// Update reservation by ID
router.put("/:id", reservationController.updateReservation);

// Delete reservation by ID
router.delete("/:id", reservationController.deleteReservation);

// Get reservations by user ID
router.get("/user/:userId", reservationController.getReservationsByUserId);

module.exports = router;
