// const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

exports.addBooking = async (req, res, next) => {
  const booking = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { bookings: req.body },
    },
    { new: true }
  ).select("+password");

  res.status(201).json({
    status: "success",
    data: booking,
  });
};

exports.getBookings = async (req, res, next) => {
  const response = await User.find().select("bookings");
  let allBookings = {bookings: []}
  response.map(booking => {
    booking.bookings.map(b => {
      allBookings.bookings.push(b)
    })
  })

  res.status(200).json({
    status: "success",
    data: allBookings,
  });
};