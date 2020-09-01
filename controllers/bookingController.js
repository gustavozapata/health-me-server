const Booking = require("../models/bookingModel");

exports.getBookings = async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: "success",
    data: bookings,
  });
};
