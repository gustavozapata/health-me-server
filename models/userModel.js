const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "You must enter a name"]
  },
  email: {
    type: String,
    required: [true, "You must enter an email"],
    unique: true //value must be unique
  },
  password: {
    type: String,
    required: [true, "You must enter a password"],
    minlength: 6, //password length must be minumum 6 character
    select: false, //no show this value
  },
  results: [Object],
  messages: [Object],
  bookings: [{
    location: String,
    date: Date,
    time: String
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
