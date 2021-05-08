const mongoose = require("mongoose");
const ResultSchema = require("./resultModel");
const MessageSchema = require("./messageModel");
const BookingSchema = require("./bookingModel");
const bcrypt = require("bcryptjs");

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

//pre 'save' runs before saving (create, post) into the db
UserSchema.pre("save", async function (next) {
  //hash the password with cost at 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//checks if the password is correct
UserSchema.methods.checkPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
