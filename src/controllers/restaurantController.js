// controllers/restaurantController.js

const Restaurant = require("../models/restaurant");

// Create a new restaurant
exports.createRestaurant = async (req, res, next) => {
  try {
    const { name, address, contact, openingHours, menuItems, img, desc } =
      req.body;
    const restaurant = new Restaurant({
      name,
      address,
      contact,
      openingHours,
      menuItems,
      img,
      desc,
    });
    await restaurant.save();

    // Send email notification to the user
    const emailSubject = "New Restaurant Added";
    const emailText = `Your restaurant with ID ${restaurant.name} has been successfully created and added.`;
    const emailHtml = `<p>Your restaurant with ID <strong>${restaurant._id}</strong> has been successfully created.</p>`;
    await sendEmail(user.email, emailSubject, emailText, emailHtml);

    res
      .status(201)
      .json({ message: "Restaurant created successfully", restaurant });
  } catch (err) {
    next(err);
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

// Update restaurant by ID
exports.updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address, contact, openingHours, menuItems, img, desc } =
      req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, address, contact, openingHours, menuItems, img, desc },
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Send email notification to the user
    const emailSubject = "Your Restaurant Updated";
    const emailText = `Your request to update your restaurant with ID ${restaurant.name} has been successfully completed.`;
    const emailHtml = `<p>Your restaurant with ID <strong>${restaurant._id}</strong> has been successfully updated.</p>`;
    await sendEmail(user.email, emailSubject, emailText, emailHtml);

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (err) {
    next(err);
  }
};

// Delete restaurant by ID
exports.deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Send email notification to the user
    const emailSubject = "Your Restaurant Deleted";
    const emailText = `Your restaurant with ID ${restaurant._id} has been successfully deleted.`;
    const emailHtml = `<p>Your restaurant with ID <strong>${restaurant._id}</strong> has been successfully deleted.</p>`;
    await sendEmail(user.email, emailSubject, emailText, emailHtml);

    res.status(200).json({
      message: "Restaurant deleted successfully",
      restaurant: deletedRestaurant,
    });
  } catch (err) {
    next(err);
  }
};
