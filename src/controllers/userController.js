// controllers/userController.js

const User = require("../models/user");

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    const user = new User({ username, password, email, role });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user by ID
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password, email, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

// Delete user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    next(err);
  }
};
