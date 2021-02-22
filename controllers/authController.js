const User = require("../models/userModel");

exports.login = async(req, res, next) => {
    const { email, password } = req.body;

    //check if email and password were entered (were sent)
  if (!email || !password) {
    return console.log("Please provide email and password");
  }

  let user = await User.findOne({ email }).select("+password");
  let code = 200
  let status = "success"
  let message = ""
  let isLogged = true

  //check if user exists && password is correct
  if (!user || password !== user.password) {
    code = 401
    status = "error"
    user = {}
    message = "Incorrect email or password"
    isLogged = false
  }
    
  //TODO: IMPLEMENT JWT
    res.status(code).json({
      status,
      data: user,
      message,
      isLogged,
    });
}

exports.signup = async(req, res, next) => {
    const { fullname, email, password } = req.body;

  //TODO: the below replaces this: await User.create(req.body);
  //problem with the above is that the user can send a body to that route with say {admin: true}
  const newUser = await User.create({fullname, email, password});

  //TODO: IMPLEMENT JWT
  res.status(201).json({
    status: "success",
    data: newUser,
    isLogged: true,
});

}
