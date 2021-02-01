const mongoose = require("mongoose");
const ResultSchema = require("./resultModel");
const MessageSchema = require("./messageModel");
const BookingSchema = require("./bookingModel");

const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "You must enter a name"],
  },
  email: {
    type: String,
    required: [true, "You must enter an email"],
    unique: true, //value must be unique
  },
  password: {
    type: String,
    required: [true, "You must enter a password"],
    minlength: 6, //password length must be minumum 6 character
    select: false, //hide this value
  },
  results: [ResultSchema],
  messages: [MessageSchema],
  bookings: [BookingSchema],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
