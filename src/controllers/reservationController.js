// controllers/reservationController.js

const Reservation = require("../models/reservation");
const sendEmail = require("../services/emailService"); // Import sendEmail function

// // Create a new reservation
// exports.createReservation = async (req, res, next) => {
//   try {
//     const {
//       user,
//       restaurant,
//       firstName,
//       lastName,
//       phone,
//       address,
//       email,
//       date,
//       time,
//       numberOfGuests,
//       partySize,
//       specialRequests,
//       tableNumber,
//     } = req.body;

//     // Create a new reservation
//     const reservation = new Reservation({
//       user,
//       restaurant,
//       firstName,
//       lastName,
//       phone,
//       address,
//       email,
//       date,
//       time,
//       numberOfGuests,
//       partySize,
//       specialRequests,
//       tableNumber,
//     });

//     // Save the reservation to the database
//     await reservation.save();

//     // Send email notification to the user
//     const emailSubject = "New Reservation Confirmation";
//     const emailText = `Your reservation with ID ${reservation._id} has been successfully created.`;
//     const emailHtml = `<p>Your reservation with ID <strong>${reservation._id}</strong> has been successfully created.</p>`;
//     await sendEmail(user.email, emailSubject, emailText, emailHtml);

//     // Send response with created reservation
//     res
//       .status(201)
//       .json({ message: "Reservation created successfully", reservation });
//   } catch (err) {
//     // Pass any errors to the error handling middleware
//     next(err);
//   }
// };

// Import the User model
const User = require("../models/user");

exports.createReservation = async (req, res, next) => {
  try {
    const {
      user,
      restaurant,
      firstName,
      lastName,
      phone,
      address,
      email,
      date,
      time,
      numberOfGuests,
      partySize,
      specialRequests,
      tableNumber,
    } = req.body;

    // Create a new reservation
    const reservation = new Reservation({
      user,
      restaurant,
      firstName,
      lastName,
      phone,
      address,
      email,
      date,
      time,
      numberOfGuests,
      partySize,
      specialRequests,
      tableNumber,
    });

    // Save the reservation to the database
    await reservation.save();

    // Update the user's reservations array
    await User.findByIdAndUpdate(user, {
      $push: { reservations: reservation._id },
    });

    // Send email notification to the user
    const emailSubject = "New Reservation Confirmation";
    const emailText = `Your reservation with ID ${reservation._id} has been successfully created.`;
    const emailHtml = `<p>Your reservation with ID <strong>${reservation._id}</strong> has been successfully created.</p>`;
    await sendEmail(user.email, emailSubject, emailText, emailHtml);

    // Send response with created reservation
    res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// get all reservation
// exports.createReservation = async (req, res, next) => {
//   try {
//     const {
//       user,
//       restaurant,
//       date,
//       time,
//       numberOfGuests,
//       partySize,
//       specialRequests,
//       tableNumber,
//     } = req.body;
//     const reservation = new Reservation({
//       user,
//       restaurant,
//       date,
//       time,
//       numberOfGuests,
//       partySize,
//       specialRequests,
//       tableNumber,
//     });
//     await reservation.save();
//     res
//       .status(201)
//       .json({ message: "Reservation created successfully", reservation });
//   } catch (err) {
//     next(err);
//   }
// };

// Get all reservations
exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

//Get by user id
exports.getReservationsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const reservations = await Reservation.find({ user: userId });
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

// Get reservation by ID
exports.getReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

// Update reservation by ID
exports.updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      user,
      restaurant,
      firstName,
      lastName,
      phone,
      address,
      email,
      date,
      time,
      numberOfGuests,
      partySize,
      specialRequests,
      tableNumber,
    } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      {
        user,
        restaurant,
        firstName,
        lastName,
        phone,
        address,
        email,
        date,
        time,
        numberOfGuests,
        partySize,
        specialRequests,
        tableNumber,
      },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Send email notification to the user
    const emailSubject = "Reservation Updated";
    const emailText = `Your reservation with ID ${reservation._id} has been successfully updated.`;
    const emailHtml = `<p>Your reservation with ID <strong>${reservation._id}</strong> has been successfully updated.</p>`;
    await sendEmail(user.email, emailSubject, emailText, emailHtml);

    res.status(200).json({
      message: "Reservation updated successfully",
      reservation: updatedReservation,
    });
  } catch (err) {
    next(err);
  }
};

// Delete reservation by ID
exports.deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({
      message: "Reservation deleted successfully",
      reservation: deletedReservation,
    });
  } catch (err) {
    next(err);
  }
};
