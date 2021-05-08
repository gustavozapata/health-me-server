const User = require("../models/userModel");
const {sendAutoResponse} = require('./messageController')

exports.login = async(req, res, next) => {
    const { email, password } = req.body;

    //check if email and password were entered (were sent)
  if (!email || !password) {
    return console.log("Please provide email and password");
  }

  let user = await User.findOne({ email }).select("+password")
  let code = 200
  let status = "success"
  let message = ""
  let isLogged = true

  //check if user exists && password is correct
  if (!user || !(await user.checkPassword(password, user.password))) {
    code = 401
    status = "error"
    user = {}
    message = "Incorrect email or password"
    isLogged = false
  } else {
    //sort bookings for the past tests list
    user.bookings = user.bookings.sort((a, b) => b.date - a.date)
  }
    
  res.status(code).json({
    status,
    data: user,
    message,
    isLogged,
  });
}

exports.signup = async(req, res, next) => {
  const { fullname, email, password } = req.body;

  //User.create(req.body) could allow users to enter details that are not allowed e.g. admin: true
  const newUser = await User.create({fullname, email, password, messages: sendAutoResponse(1)});

  res.status(201).json({
    status: "success",
    data: newUser,
    isLogged: true,
  });
}
