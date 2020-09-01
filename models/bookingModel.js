const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: {
    type: Number,
  },
  station: {
    type: String,
  },
  date: Date,
  time: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
