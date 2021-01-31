const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  location: String,
  // station: { type: String}, //TODO: link to station??
  address: String,
  date: String, //TODO: make it a Date
  time: String
})

module.exports = BookingSchema;
