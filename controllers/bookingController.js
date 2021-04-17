// const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const {sendBookingMessage} = require('./messageController')
const dotenv = require('dotenv')

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.addBooking = async (req, res, next) => {
  //this solves the British Summer Time (BST) oddness where the time changes in summer https://stackoverflow.com/a/45908136/6099890
  var cleanDate = new Date(req.body.date);
  cleanDate.setTime( cleanDate.getTime() - cleanDate.getTimezoneOffset() * 60 * 1000 );
  req.body.date = cleanDate

  await User.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { bookings: req.body } },{ new: true }
  ).select("+password");

  req.body.booking = req.body
  req.body.code = 200
  sendBookingMessage(req, res, next)
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

exports.deleteBooking = async (req, res, next) => {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { bookings: {_id: req.body._id} } },
      { new: true }
    ).select("+password -__v");
    
    res.status(200).json({
      status: "success",
      data: user,
    });
}

exports.addPayment = async (req, res, next) => {
  const post = await User.findById(req.params.id);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `https://zona.gustavozapata.me`,
    cancel_url: `https://zona.gustavozapata.me`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    line_items: [
      {
        name: `${post.description}`,
        description: `${post.location}`,
        images: [`https://server.gustavozapata.me/zona/public/${post.image}`],
        amount: post.price * 100, //convert to cents (pens) since stripe expects cents
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  //2. create session as response
  res.status(200).json({
    status: "success",
    session,
  });
}