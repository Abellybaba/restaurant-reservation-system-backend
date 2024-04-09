// routes/restaurantRoutes.js

const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

// Create a new restaurant
router.post("/", restaurantController.createRestaurant);

// Get all restaurants
router.get("/", restaurantController.getAllRestaurants);

// Get restaurant by ID
router.get("/:id", restaurantController.getRestaurantById);

// Update restaurant by ID
router.put("/:id", restaurantController.updateRestaurant);

// Delete restaurant by ID
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
