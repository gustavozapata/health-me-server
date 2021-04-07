// const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

exports.addBooking = async (req, res, next) => {
  //this solves the British Summer Time (BST) oddness where the time changes in summer https://stackoverflow.com/a/45908136/6099890
  var cleanDate = new Date(req.body.date);
  cleanDate.setTime( cleanDate.getTime() - cleanDate.getTimezoneOffset() * 60 * 1000 );
  req.body.date = cleanDate

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