// // controllers/authController.js

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sendEmail = require("../services/emailService");

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;

    // Create a new user
    const user = new User({ username, password, email, role });

    // Save the user to the database
    await user.save();

    // Send email notification to the newly registered user
    const emailSubject = "Welcome to Our Restaurant Reservation System";
    const emailText = `Welcome, ${username}! Your account has been successfully registered.`;
    const emailHtml = `<p>Welcome, ${username}! Your account has been successfully registered.</p>`;
    await sendEmail(email, emailSubject, emailText, emailHtml);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Sign JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    // Return user information along with the token
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        img: user.img,
        // Add other user properties as needed
      },
      message: "Login Successful",
    });
  } catch (err) {
    next(err);
  }
};

// Login a user
// exports.login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }
//     const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ token });
//     res.status(201).json({ message: "Login Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };
