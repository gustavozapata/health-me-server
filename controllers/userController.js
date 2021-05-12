const User = require("../models/userModel");

//testing endpoint
exports.getUser = async (req, res, next) => {
  const user = await User.find({fullname: "Gustavo Zapata"});

  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.getAllBookings = async (req, res, next) => {
  const bookings = await User.find({}).select({"_id": 0, "bookings": 1});

  bookings.map(book => {
    console.log(book)
  })

  res.status(200).json({
    status: "success",
    data: bookings
  })
}

//update personal details
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

//testing endpoint
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};