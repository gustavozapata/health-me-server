const User = require("../models/userModel");

//ADMIN LEVEL
exports.getUser = async (req, res, next) => {
  const user = await User.find({fullname: "Gustavo Zapata"});

  res.status(200).json({
    status: "success",
    data: user,
  });
};

//FIXME: replaced by getBookings on bookingController
exports.getAllBookings = async (req, res, next) => {
  const bookings = await User.find({}).select({"_id": 0, "bookings": 1});

  console.log(bookings) //[ { bookings: [ [Object], [Object] ] }, { bookings: [] } ]
  bookings.map(book => {
    console.log(book)
  })

  res.status(200).json({
    status: "success",
    data: bookings
  })
}

exports.updateDetails = async (req, res, next) => {
  try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("+password -__v");
    
    res.status(200).json({
      status: "success",
      data: user
    })
  } catch(err) {
    console.log(err)
  }
}

// USER LEVEL
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};