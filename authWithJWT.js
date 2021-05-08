const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
const {promisify} = require("util")

/*
JWT_SECRET=healthmekufyp2021
JWT_EXPIRES_IN=20d
*/

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    data: user,
    token
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = async(req, res, next) => {
    const { email, password } = req.body;

    //check if email and password were entered (were sent)
  if (!email || !password) {
    return console.log("Please provide email and password");
  }

  let user = await User.findOne({ email }).select("+password");

  //check if user exists && password is correct
  if (!user || !(await user.checkPassword(password, user.password))) {
    res.status(401).json({
      status: "error",
      data: null,
      message: "Incorrect email or password"
    })
    return null
  }
    
  createSendToken(user, 200, req, res);
}

exports.signup = async(req, res, next) => {
    const { fullname, email, password } = req.body;

  //User.create(req.body) could allow users to enter details that are not allowed e.g. admin: true
  const newUser = await User.create({fullname, email, password});

  createSendToken(newUser, 201, req, res);
}

exports.protect = async (req, res, next) => {
  //getting the token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      status: "unauthorised"
    })
  }

  //verify token - jwt.verify(token sent by user, SECRET in .env)
  await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //node 'promisify' converts a method into a promise

  //by modifying the req.user we will be able to use it downwards
  req.user = currentUser; 

  //next then allows the protected end-points to be hit
  next();
};
