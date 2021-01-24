const User = require("../models/userModel");

//ADMIN LEVEL
exports.getUser = async (req, res, next) => {
  const user = await User.find({fullname: "Gustavo Zapata"});

  res.status(200).json({
    status: "success",
    data: user,
  });
};

// USER LEVEL
exports.getMe = (req, res, next) => {
req.params.id = req.user.id;
next();
};