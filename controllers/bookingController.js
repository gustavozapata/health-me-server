// const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const {sendBookingMessage} = require('./messageController')
const dotenv = require('dotenv');
const { handleError } = require("../utils/results");

//use environment variables
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.addBooking = async (req, res, next) => {
  try {
    //this solves the British Summer Time (BST) oddness when the time changes in summer https://stackoverflow.com/a/45908136/6099890
    var cleanDate = new Date(req.body.date);
    cleanDate.setTime( cleanDate.getTime() - cleanDate.getTimezoneOffset() * 60 * 1000 );
    req.body.date = cleanDate

    //find user and add booking
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { bookings: req.body } },{ new: true }
    ).select("+password");

    req.body.booking = req.body
    req.body.code = 200
    sendBookingMessage(req, res, next)
  } catch(err){
    handleError(res, err)
  }
};

//get all bookings from all users to check appointment availability
exports.getBookings = async (req, res, next) => {
  try {
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
  } catch(err){
    handleError(res, err)
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    let bookings = await User.findOne({_id: req.params.id}).select("bookings")
    bookings = bookings.bookings.sort((a, b) =>  b.bookedAt - a.bookedAt)

    //if booking is last being booked, delete the message action
    if(bookings.length > 0 && bookings[0]._id.equals(req.body._id)) {
      await User.findOneAndUpdate(
        {_id: req.params.id},
        {$pop: {messages: 1}},
        {new: true}
      )
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { bookings: {_id: req.body._id} } },
      { new: true }
    ).select("+password -__v");
    
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch(err){
    handleError(res, err)
  }
}

exports.addPayment = async (req, res, next) => {
  try {
    //register payment to stripe
    await stripe.charges.create({
      amount: 1000,
      currency: 'gbp',
      source: 'tok_visa',
      description: `Blood test booked for ${req.body.booking}`,
    });
  
    res.status(200).json({
      status: "success",
    });
  } catch(err) {
    handleError(res, err)
  }
}