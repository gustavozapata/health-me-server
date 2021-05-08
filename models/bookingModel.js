const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  location: String,
  // station: { type: String}, //TODO: link to station??
  address: String,
  date: Date,
  time: String,
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BookingSchema;
